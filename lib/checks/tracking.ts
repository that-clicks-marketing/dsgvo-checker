import type { CheckContext } from '../types';
import { found, ok } from '../utils';
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
    patterns: ['plausible.io/js', 'plausible.io/api', 'data-domain'],
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

    if (detected) {
      // Plausible is privacy-friendly — no personal data, no cross-site tracking
      const isPrivacyFriendly = tracker.id === 'TRACK-09';
      if (!isPrivacyFriendly) hasTrackers = true;

      issues.push(found({
        id: tracker.id, category: 'tracking',
        severity: isPrivacyFriendly ? 'low' : 'high',
        title: `${tracker.name} erkannt`,
        description: isPrivacyFriendly
          ? `${tracker.name} wurde erkannt. Dieses Tool ist datenschutzfreundlich und benötigt in der Regel keine Einwilligung (${tracker.article}).`
          : `${tracker.name} wurde auf dieser Seite erkannt. ` +
            `Dieses Tool überträgt Nutzerdaten an Dritte (${tracker.article}). ` +
            `Bitte prüfen Sie, ob dieses Skript erst nach aktiver Einwilligung geladen wird.`,
        recommendation: isPrivacyFriendly
          ? `Erwähnen Sie ${tracker.name} dennoch in Ihrer Datenschutzerklärung.`
          : `Binden Sie ${tracker.name} ausschließlich über Ihr Consent-Management-System ein. ` +
            `Das Skript darf erst nach expliziter Zustimmung des Nutzers geladen werden.`,
      }));
    } else {
      issues.push(ok({
        id: tracker.id, category: 'tracking',
        title: `${tracker.name} nicht erkannt`,
        description: `${tracker.name} wurde auf dieser Seite nicht gefunden.`,
      }));
    }
  }

  return { issues, hasTrackers };
}
