import type { CheckContext } from '../types';
import { found, ok, warn } from '../utils';
import type { Issue } from '../utils';

// Known CMP signatures (script src, inline markers, class names)
const CMP_PATTERNS: { id: string; name: string; patterns: string[] }[] = [
  {
    id: 'CONSENT-07', name: 'Borlabs Cookie',
    patterns: ['borlabs-cookie', 'borlabscookie', 'borlabs.io'],
  },
  {
    id: 'CONSENT-08', name: 'Complianz',
    patterns: ['complianz', 'cmplz-', 'complianz-gdpr'],
  },
  {
    id: 'CONSENT-09', name: 'Cookiebot / Cybot',
    patterns: ['cookiebot', 'cybot.com', 'cookie-declaration'],
  },
  {
    id: 'CONSENT-10', name: 'Usercentrics',
    patterns: ['usercentrics', 'usercentrics.eu', 'uc-banner', 'app.usercentrics.eu'],
  },
  {
    id: 'CONSENT-11', name: 'Consentmanager',
    patterns: ['consentmanager.net', 'consentmanager.mgr.consensu.org'],
  },
  {
    id: 'CONSENT-12', name: 'CCM19',
    patterns: ['ccm19.de', 'ccm19-'],
  },
  {
    id: 'CONSENT-13', name: 'OneTrust',
    patterns: ['onetrust', 'optanon', 'cookiepro', 'otsdkstub'],
  },
  {
    id: 'CONSENT-14', name: 'iubenda',
    patterns: ['iubenda.com', 'iub.cs.com', 'iubenda-'],
  },
  {
    id: 'CONSENT-15', name: 'Real Cookie Banner',
    patterns: ['real-cookie-banner', 'realcookiebanner', 'rcb-banner', 'rcb-cookie'],
  },
  {
    id: 'CONSENT-16', name: 'Cookiehub',
    patterns: ['cookiehub.com', 'cookiehub.js', 'cch.cookiehub'],
  },
  {
    id: 'CONSENT-17', name: 'Termly',
    patterns: ['termly.io', 'app.termly.io', 'termly-embed'],
  },
  {
    id: 'CONSENT-18', name: 'Klaro',
    patterns: ['klaro.js', 'klaro-', 'kiprotect.com', 'kiprotect.js'],
  },
  {
    id: 'CONSENT-19', name: 'Piwik PRO Consent',
    patterns: ['ppms.eu', 'piwik.pro/consent', 'consent-manager.piwik'],
  },
];

// Generic cookie banner signals (not CMP-specific)
const GENERIC_BANNER_PATTERNS = [
  'cookie-banner', 'cookie-consent', 'cookie-notice', 'cookie-bar',
  'cookiebanner', 'cookieconsent', 'gdpr-banner', 'gdpr-consent',
  'consent-banner', 'cookiepopup', 'cookie-popup',
];

const ACCEPT_PATTERNS = [
  'alle akzeptieren', 'alle cookies akzeptieren', 'akzeptieren und schließen',
  'accept all', 'accept cookies', 'ich stimme zu', 'zustimmen',
  'alle annehmen', 'einverstanden',
];

const REJECT_PATTERNS = [
  'ablehnen', 'nur notwendige', 'nur essentielle', 'alle ablehnen',
  'reject all', 'decline', 'notwendige cookies', 'ohne tracking',
  'optionale ablehnen', 'nein danke', 'nicht akzeptieren',
];

export function checkConsent(ctx: CheckContext): Issue[] {
  const issues: Issue[] = [];
  const hl = ctx.htmlLower;

  // CMP detection
  let detectedCmp: string | null = null;
  for (const cmp of CMP_PATTERNS) {
    if (cmp.patterns.some((p) => hl.includes(p))) {
      detectedCmp = cmp.name;
      issues.push(ok({
        id: cmp.id, category: 'consent',
        title: `${cmp.name} erkannt`,
        description: `Das Consent-Management-System ${cmp.name} wurde auf der Seite gefunden.`,
      }));
    }
  }

  // CONSENT-01 · Cookie-Banner vorhanden
  const hasGenericBanner = GENERIC_BANNER_PATTERNS.some((p) => hl.includes(p));
  const hasBanner = detectedCmp !== null || hasGenericBanner;

  if (hasBanner) {
    issues.push(ok({
      id: 'CONSENT-01', category: 'consent',
      title: 'Cookie-Consent-Banner erkannt',
      description: detectedCmp
        ? `${detectedCmp} wurde als Consent-Management-System erkannt.`
        : 'Ein generisches Cookie-Banner wurde auf der Seite gefunden.',
    }));
  } else {
    issues.push(found({
      id: 'CONSENT-01', category: 'consent', severity: 'critical',
      title: 'Kein Cookie-Consent-Banner erkannt',
      description:
        'Auf der Seite wurde kein Cookie-Consent-Banner gefunden. ' +
        'Werden auf Ihrer Website Tracking-Cookies oder Marketing-Skripte eingesetzt, ' +
        'ist eine vorherige Einwilligung nach Art. 6 DSGVO und dem TTDSG zwingend erforderlich.',
      recommendation:
        'Implementieren Sie ein DSGVO-konformes Consent-Management-System (CMS) wie ' +
        'Borlabs Cookie, Cookiebot, Usercentrics oder iubenda.',
    }));
  }

  // CONSENT-02 · Akzeptieren-Button
  // Known CMPs render buttons via JS — skip static-HTML check when CMP is confirmed
  const hasAccept = ACCEPT_PATTERNS.some((p) => hl.includes(p));
  if (hasBanner) {
    if (hasAccept || detectedCmp !== null) {
      issues.push(ok({
        id: 'CONSENT-02', category: 'consent',
        title: '"Alle akzeptieren"-Option vorhanden',
        description: detectedCmp
          ? `${detectedCmp} rendert den Akzeptieren-Button dynamisch.`
          : 'Ein Akzeptieren-Button im Cookie-Banner wurde erkannt.',
      }));
    } else {
      issues.push(warn({
        id: 'CONSENT-02', category: 'consent', severity: 'medium',
        title: 'Kein "Akzeptieren"-Button im Banner erkannt',
        description:
          'Es wurde kein klarer Akzeptieren-Button gefunden. ' +
          'Möglicherweise wird der Banner per JavaScript dynamisch eingefügt und war im statischen HTML nicht sichtbar.',
        recommendation:
          'Stellen Sie sicher, dass Ihr Banner einen klaren "Alle akzeptieren"-Button enthält.',
      }));
    }
  }

  // CONSENT-03 · Ablehnen-Button
  const hasReject = REJECT_PATTERNS.some((p) => hl.includes(p));
  if (hasBanner) {
    if (hasReject || detectedCmp !== null) {
      issues.push(ok({
        id: 'CONSENT-03', category: 'consent',
        title: '"Ablehnen"-Option vorhanden',
        description: detectedCmp
          ? `${detectedCmp} bietet eine Ablehnungsoption im Banner.`
          : 'Eine Möglichkeit, Cookies abzulehnen, wurde im Banner erkannt.',
      }));
    } else {
      issues.push(found({
        id: 'CONSENT-03', category: 'consent', severity: 'high',
        title: 'Kein "Ablehnen"-Button im Banner erkannt',
        description:
          'Es wurde keine einfach zugängliche Option gefunden, um Cookies abzulehnen. ' +
          'Nach EuGH-Rechtsprechung (Planet49) muss das Ablehnen genauso einfach sein wie das Akzeptieren.',
        recommendation:
          'Fügen Sie auf der ersten Ebene Ihres Cookie-Banners einen gleichwertigen "Ablehnen"-Button hinzu.',
      }));
    }
  }

  return issues;
}

// Checks if known trackers are present but no CMP was found — called by scanner after all checks
export function checkTrackingWithoutConsent(
  hasTrackers: boolean,
  hasCmp: boolean,
): Issue | null {
  if (!hasTrackers) return null;
  if (hasCmp) return null;

  return found({
    id: 'CONSENT-06', category: 'consent', severity: 'critical',
    title: 'Tracking ohne erkennbares Consent-System',
    description:
      'Es wurden Tracking-Skripte erkannt, aber kein Consent-Management-System (CMP). ' +
      'Das bedeutet, Tracking könnte ohne vorherige Einwilligung stattfinden — ' +
      'ein klarer Verstoß gegen Art. 6 DSGVO und das TTDSG.',
    recommendation:
      'Implementieren Sie sofort ein Consent-Management-System (z. B. Borlabs Cookie, Cookiebot) ' +
      'und binden Sie alle Tracking-Skripte erst nach aktiver Einwilligung ein.',
  });
}
