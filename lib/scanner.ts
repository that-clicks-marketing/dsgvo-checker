import type { ScanResult, CheckContext } from './types';
import { ScanError } from './types';
import { validateUrl, extractFooterHtml, calculateScore } from './utils';
import { checkSecurity } from './checks/security';
import { checkLegal } from './checks/legal';
import { checkConsent, checkTrackingWithoutConsent } from './checks/consent';
import { checkTracking } from './checks/tracking';
import { checkExternal } from './checks/external';
import { checkForms } from './checks/forms';

const FETCH_TIMEOUT_MS = 10_000;
// Keep <head> region (scripts, meta, tracking) + tail region (footer, legal links).
// Many large pages have the footer beyond 300 KB, so we read head + last 80 KB.
const HEAD_BYTES = 300_000;
const TAIL_BYTES = 80_000;

async function fetchWithTimeout(url: string, opts: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new ScanError('timeout', `Request to ${url} timed out after ${FETCH_TIMEOUT_MS}ms`);
    }
    throw new ScanError('not_reachable', `Cannot reach ${url}: ${String(err)}`);
  } finally {
    clearTimeout(timer);
  }
}

async function checkHttpRedirect(domain: string): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(`http://${domain}`, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DSGVO-Checker/1.0; +https://dsgvo-check.that-clicks.de)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de,en;q=0.5',
      },
    });
    const loc = res.headers.get('location') ?? '';
    return (res.status >= 301 && res.status <= 308) && loc.startsWith('https://');
  } catch {
    return false;
  }
}

function detectCharset(contentType: string, buffer: ArrayBuffer): string {
  // 1. From Content-Type header (most reliable)
  const ctMatch = contentType.match(/charset=["']?([^"';\s,]+)/i);
  if (ctMatch) return normalizeCharset(ctMatch[1]);

  // 2. From HTML <meta charset> or <meta http-equiv="Content-Type"> in first 4 KB
  const preview = new TextDecoder('utf-8', { fatal: false }).decode(buffer.slice(0, 4096));
  const metaMatch =
    preview.match(/<meta[^>]+charset=["']?([^"';\s>]+)/i) ??
    preview.match(/content=["'][^"']*charset=([^"';\s]+)/i);
  if (metaMatch) return normalizeCharset(metaMatch[1]);

  return 'utf-8';
}

function normalizeCharset(raw: string): string {
  const c = raw.toLowerCase().replace(/[-_]/g, '');
  if (c === 'utf8') return 'utf-8';
  if (c === 'iso88591' || c === 'latin1' || c === 'latin-1') return 'iso-8859-1';
  if (c === 'windows1252' || c === 'cp1252' || c === 'win1252') return 'windows-1252';
  if (c === 'iso88592') return 'iso-8859-2';
  // Fall back to utf-8 for unknown charsets to avoid TextDecoder throwing
  try { new TextDecoder(raw); return raw; } catch { return 'utf-8'; }
}

export async function runScan(rawUrl: string): Promise<ScanResult> {
  // 1. Validate + SSRF guard
  const validation = validateUrl(rawUrl);
  if (!validation.ok) {
    throw new ScanError(validation.code);
  }

  const { url, domain } = validation;

  // 2. Fetch page HTML + check HTTP redirect in parallel
  const [response, httpRedirectsToHttps] = await Promise.all([
    fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DSGVO-Checker/1.0; +https://dsgvo-check.that-clicks.de)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de,en;q=0.5',
      },
    }),
    checkHttpRedirect(domain),
  ]);

  if (!response.ok && response.status !== 200) {
    throw new ScanError('http_error', `Server returned ${response.status}`);
  }

  // 3. Read HTML (size-limited)
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('html')) {
    throw new ScanError('http_error', 'URL does not return HTML content');
  }

  const buffer = await response.arrayBuffer();

  // Detect charset: check Content-Type header, then HTML meta tag in first 4 KB
  const charset = detectCharset(contentType, buffer);
  const decoder = new TextDecoder(charset, { fatal: false });

  let html: string;
  if (buffer.byteLength <= HEAD_BYTES + TAIL_BYTES) {
    html = decoder.decode(buffer);
  } else {
    // Large page: head (tracking scripts in <head>) + tail (footer/legal links)
    const head = decoder.decode(buffer.slice(0, HEAD_BYTES));
    const tail = decoder.decode(buffer.slice(buffer.byteLength - TAIL_BYTES));
    html = head + tail;
  }

  // 4. Build check context
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });

  const finalUrl = response.url || url;
  const ctx: CheckContext = {
    url,
    finalUrl,
    domain,
    html,
    htmlLower: html.toLowerCase(),
    footerHtml: extractFooterHtml(html),
    headers,
    isHttps: finalUrl.startsWith('https://'),
    httpRedirectsToHttps,
  };

  // 5. Run all checks in parallel
  const [
    securityIssues,
    legalIssues,
    consentIssues,
    trackingResult,
    externalIssues,
    formIssues,
  ] = await Promise.all([
    Promise.resolve(checkSecurity(ctx)),
    Promise.resolve(checkLegal(ctx)),
    Promise.resolve(checkConsent(ctx)),
    Promise.resolve(checkTracking(ctx)),
    Promise.resolve(checkExternal(ctx)),
    Promise.resolve(checkForms(ctx)),
  ]);

  // 6. CONSENT-06: tracking without CMP
  const hasCmp = consentIssues.some((i) => {
    const n = parseInt(i.id.replace('CONSENT-', ''), 10);
    return n >= 7 && n <= 19 && i.status === 'ok';
  });
  const consent06 = checkTrackingWithoutConsent(trackingResult.hasTrackers, hasCmp);

  const allIssues = [
    ...legalIssues,
    ...consentIssues,
    ...(consent06 ? [consent06] : []),
    ...trackingResult.issues,
    ...externalIssues,
    ...formIssues,
    ...securityIssues,
  ];

  // 7. Calculate score and return
  return {
    url,
    domain,
    scannedAt: new Date().toISOString(),
    score: calculateScore(allIssues),
    issues: allIssues,
    isDummy: false,
  };
}
