import type { Issue, Severity } from './types';

// ── URL validation & SSRF protection ─────────────────────────────────────────

const PRIVATE_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^169\.254\./,
  /^0\.0\.0\.0$/,
  /^::1$/,
  /^fe80:/i,
  /^fd[0-9a-f]{2}:/i,
];

export function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal')) return true;
  return PRIVATE_PATTERNS.some((p) => p.test(h));
}

export type UrlResult =
  | { ok: true; url: string; domain: string }
  | { ok: false; code: 'invalid_url' | 'private_host' };

export function validateUrl(raw: string): UrlResult {
  let input = raw.trim();
  if (!input) return { ok: false, code: 'invalid_url' };
  if (!/^https?:\/\//i.test(input)) input = 'https://' + input;

  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return { ok: false, code: 'invalid_url' };
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { ok: false, code: 'invalid_url' };
  }

  if (isPrivateHost(parsed.hostname)) {
    return { ok: false, code: 'private_host' };
  }

  return {
    ok: true,
    url: parsed.href,
    domain: parsed.hostname.replace(/^www\./, ''),
  };
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// ── HTML helpers ──────────────────────────────────────────────────────────────

export function extractFooterHtml(html: string): string {
  const footerTag = html.match(/<footer[\s\S]*?<\/footer>/i);
  if (footerTag) return footerTag[0];

  const footerClass = html.match(
    /<[^>]+(?:id|class)="[^"]*footer[^"]*"[^>]*>[\s\S]{0,8000}/i,
  );
  if (footerClass) return footerClass[0];

  // Fallback: last quarter of the document
  return html.slice(Math.floor(html.length * 0.75));
}

// ── Score ─────────────────────────────────────────────────────────────────────

const SEVERITY_DEDUCTION: Record<Severity, number> = {
  critical: 20,
  high:     10,
  medium:    5,
  low:       2,
  info:      0,
};

export function calculateScore(issues: Issue[]): number {
  const total = issues
    .filter((i) => i.status !== 'ok')
    .reduce((sum, i) => sum + (SEVERITY_DEDUCTION[i.severity] ?? 0), 0);
  return Math.max(0, 100 - total);
}

// ── Issue factory helpers ─────────────────────────────────────────────────────

export function found(
  partial: Omit<Issue, 'status'>,
): Issue {
  return { ...partial, status: 'found' };
}

export function ok(
  partial: Omit<Issue, 'status' | 'severity' | 'recommendation'>,
): Issue {
  return { ...partial, status: 'ok', severity: 'info', recommendation: '' };
}

export function warn(
  partial: Omit<Issue, 'status'>,
): Issue {
  return { ...partial, status: 'warning' };
}

// ── Re-export Issue type so check files only need one import ──────────────────
export type { Issue };
