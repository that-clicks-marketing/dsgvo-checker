import type { CheckContext } from '../types';
import { found, ok, warn } from '../utils';
import type { Issue } from '../utils';

interface TrackerDef {
  id: string;
  name: string;
  patterns: string[];
  article: string;
}

const TRACKERS: TrackerDef[] = [
  {
    id: 'TRACK-01', name: 'Google Analytics 4 (GA4)',
    patterns: ['gtag/js', 'google-analytics.com/g/', 'googletagmanager.com/gtag', 'gtag("config"', "gtag('config'"],
    article: 'Art. 6 DSGVO, Schrems-II-Beschlüsse',
  },
  {
    id: 'TRACK-02', name: 'Google Tag Manager (GTM)',
    patterns: ['googletagmanager.com/gtm.js', 'gtm_auth=', 'googletagmanager.com/ns.html'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-03', name: 'Meta Pixel (Facebook)',
    patterns: [
      'connect.facebook.net', 'fbevents.js',
      'facebook-pixel', 'fb-pixel', 'fbq=function', "fbq('init'", 'fbq("init"',
    ],
    article: 'Art. 6, 49 DSGVO, Schrems-II',
  },
  {
    id: 'TRACK-04', name: 'LinkedIn Insight Tag',
    patterns: ['snap.licdn.com', 'linkedin-insight', 'licdn.com/in.js', '_linkedin_partner_id'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-05', name: 'TikTok Pixel',
    patterns: ['analytics.tiktok.com', 'tiktok-pixel', 'ttq.load(', 'business.tiktok.com'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-06', name: 'Microsoft Clarity',
    patterns: ['clarity.ms', 'microsoft.com/clarity'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-07', name: 'Hotjar',
    patterns: ['hotjar.com', 'static.hotjar.com', 'vars.hotjar.com'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-08', name: 'Matomo (Piwik)',
    patterns: ['matomo.js', 'piwik.js', '_paq.push', 'matomo.php', 'piwik.php'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-09', name: 'Plausible Analytics',
    patterns: ['plausible.io/js', 'plausible.io/api'],
    article: 'Art. 6 DSGVO (datenschutzfreundlich, oft ohne Consent einsetzbar)',
  },
  {
    id: 'TRACK-10', name: 'Google Ads / Conversion Tracking',
    patterns: [
      'googleadservices.com', 'googlesyndication.com',
      'google_conversion_id', "gtag('event','conversion", 'gtag("event","conversion',
    ],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-11', name: 'Pinterest Tag',
    patterns: ['pintrk(', 'ct.pinterest.com', 'pinterest-pixel', 's.pinimg.com/ct'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-12', name: 'X (Twitter) Pixel',
    patterns: ['static.ads-twitter.com', 'analytics.twitter.com', 'twq(', 'twitter-pixel'],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-13', name: 'Snapchat Pixel',
    patterns: ['tr.snapchat.com', 'snapchat-pixel', 'sc_project', 'snaptr('],
    article: 'Art. 6 DSGVO',
  },
  {
    id: 'TRACK-14', name: 'HubSpot Tracking',
    patterns: [
      'js.hs-scripts.com', 'hs-analytics.net', 'js.hubspot.com',
      'hs-scripts', 'hbspt.',
    ],
    article: 'Art. 6 DSGVO',
  },
];

// Attributes and patterns that indicate a script is blocked until consent is given
const CONSENT_BLOCK_ATTRIBUTES = [
  'type="text/plain"',       // Universal CMP technique — browser ignores non-JS script types
  "type='text/plain'",
  'type="text/template"',    // Alternative blocking type
  "type='text/template'",
  'data-usercentrics=',      // Usercentrics
  'data-borlabs-cookie',     // Borlabs Cookie
  'data-cookieconsent=',     // Cookiebot
  'data-cookiegroup=',       // Various CMPs
  'data-category=',          // OneTrust, Termly
  'data-consent=',           // Generic
  'data-ccm19cookie=',       // CCM19
  'class="cmplz-',           // Complianz
  'data-iub-purposes=',      // iubenda
  'data-cmp-vendor=',        // Consentmanager
  'data-cli-class=',         // Cookie Law Info
];

// GTM Consent Mode: gtag('consent','default',...) before GTM means consent-aware setup
const GTM_CONSENT_MODE_PATTERNS = [
  "gtag('consent','default'",
  'gtag("consent","default"',
  "gtag('consent', 'default'",
  'gtag("consent", "default"',
];

type ConsentStatus = 'behind' | 'likely_behind' | 'unclear' | 'not_behind';

function checkConsentStatus(html: string, hl: string, trackerPatterns: string[], trackerId: string): ConsentStatus {
  // Find the position of the first matching pattern in the HTML
  let matchPos = -1;
  for (const p of trackerPatterns) {
    const pos = hl.indexOf(p.toLowerCase());
    if (pos !== -1) { matchPos = pos; break; }
  }
  if (matchPos === -1) return 'unclear';

  // Extract surrounding script tag context (~800 chars before to catch opening <script ...>)
  const contextStart = Math.max(0, matchPos - 800);
  const contextEnd   = Math.min(html.length, matchPos + 300);
  const context      = html.slice(contextStart, contextEnd).toLowerCase();

  // Strong signal: script tag has a consent-blocking attribute
  if (CONSENT_BLOCK_ATTRIBUTES.some((a) => context.includes(a.toLowerCase()))) {
    return 'behind';
  }

  // GTM-specific: Consent Mode configured globally
  if (trackerId === 'TRACK-02' || trackerId === 'TRACK-01') {
    if (GTM_CONSENT_MODE_PATTERNS.some((p) => hl.includes(p.toLowerCase()))) {
      return 'likely_behind';
    }
  }

  // Soft signal: script is inside a function/callback (loaded on demand)
  // Look for common CMP callback patterns near the tracker
  const callbackPatterns = [
    'uc_ui.showfirstlayer',
    'borlabscookie.cookiegroups',
    'cookiebot.onaccept',
    'onetrust.onconsent',
    'function(consent)',
    'consentgiven',
    'onconsentchange',
  ];
  if (callbackPatterns.some((p) => context.includes(p))) {
    return 'likely_behind';
  }

  return 'unclear';
}

export interface TrackingResult {
  issues: Issue[];
  hasTrackers: boolean;
}

export function checkTracking(ctx: CheckContext): TrackingResult {
  const issues: Issue[] = [];
  let hasTrackers = false;
  const hl = ctx.htmlLower;

  for (const tracker of TRACKERS) {
    const detected = tracker.patterns.some((p) => hl.includes(p.toLowerCase()));

    if (!detected) {
      issues.push(ok({
        id: tracker.id, category: 'tracking',
        title: `${tracker.name} nicht erkannt`,
        description: `${tracker.name} wurde auf dieser Seite nicht gefunden.`,
      }));
      continue;
    }

    // Plausible: privacy-friendly, no cross-site tracking, no consent obligation
    if (tracker.id === 'TRACK-09') {
      issues.push(found({
        id: tracker.id, category: 'tracking', severity: 'low',
        title: `${tracker.name} erkannt`,
        description: `${tracker.name} ist datenschutzfreundlich und benötigt in der Regel keine Einwilligung (${tracker.article}).`,
        recommendation: `Erwähnen Sie ${tracker.name} in Ihrer Datenschutzerklärung.`,
      }));
      continue;
    }

    hasTrackers = true;
    const consentStatus = checkConsentStatus(ctx.html, hl, tracker.patterns, tracker.id);

    if (consentStatus === 'behind') {
      issues.push(ok({
        id: tracker.id, category: 'tracking',
        title: `${tracker.name} erkannt — hinter Consent ✓`,
        description:
          `${tracker.name} wurde erkannt, ist aber durch ein Consent-System blockiert ` +
          `(script-Attribut zeigt, dass das Skript erst nach Einwilligung geladen wird). ✓`,
      }));
    } else if (consentStatus === 'likely_behind') {
      issues.push(warn({
        id: tracker.id, category: 'tracking', severity: 'low',
        title: `${tracker.name} erkannt — Consent Mode aktiv`,
        description:
          `${tracker.name} wurde erkannt. GTM Consent Mode ist konfiguriert, ` +
          `was auf eine datenschutzkonforme Einbindung hindeutet. ` +
          `Eine vollständige Prüfung erfordert JavaScript-Rendering.`,
        recommendation:
          `Prüfen Sie im Google Tag Manager, ob alle Trigger korrekt auf Consent-Signale reagieren.`,
      }));
    } else {
      // unclear or not_behind — report as issue
      issues.push(found({
        id: tracker.id, category: 'tracking', severity: 'high',
        title: `${tracker.name} erkannt — Consent-Status unklar`,
        description:
          `${tracker.name} wurde auf dieser Seite gefunden (${tracker.article}). ` +
          `Es konnten keine Hinweise im statischen HTML gefunden werden, dass das Skript ` +
          `erst nach aktiver Einwilligung geladen wird.`,
        recommendation:
          `Prüfen Sie, ob ${tracker.name} über Ihr Consent-Management-System eingebunden ist. ` +
          `Das Skript darf erst nach expliziter Zustimmung laden. ` +
          `Sicheres Zeichen: Das script-Tag hat das Attribut type="text/plain" oder data-usercentrics/data-cookieconsent etc.`,
      }));
    }
  }

  return { issues, hasTrackers };
}
