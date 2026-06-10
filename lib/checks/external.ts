import type { CheckContext } from '../types';
import { found, ok, warn } from '../utils';
import type { Issue } from '../utils';

export function checkExternal(ctx: CheckContext): Issue[] {
  const issues: Issue[] = [];
  const hl = ctx.htmlLower;

  // EXT-01 · Google Fonts
  const hasGoogleFontsCdn = hl.includes('fonts.googleapis.com') || hl.includes('fonts.gstatic.com');
  if (hasGoogleFontsCdn) {
    issues.push(found({
      id: 'EXT-01', category: 'external', severity: 'high',
      title: 'Google Fonts über CDN geladen (IP-Übertragung)',
      description:
        'Google Fonts wird über fonts.googleapis.com oder fonts.gstatic.com eingebunden. ' +
        'Dabei werden IP-Adressen der Besucher an Google-Server übertragen. ' +
        'Seit dem LG-München-Urteil (2022) ist dies ohne Einwilligung unzulässig.',
      recommendation:
        'Laden Sie Schriftarten lokal (self-hosted): Schrift von fonts.google.com herunterladen, ' +
        'in /public/fonts/ ablegen und per @font-face einbinden. ' +
        'In Next.js: next/font/google nutzen — hostet Schriften automatisch lokal.',
    }));
  } else {
    issues.push(ok({
      id: 'EXT-01', category: 'external',
      title: 'Google Fonts CDN nicht erkannt',
      description: 'Google Fonts wird nicht über das CDN geladen — keine IP-Übertragung an Google.',
    }));
  }

  // EXT-03 / EXT-04 · YouTube Einbettung
  const hasYoutubeStandard = hl.includes('youtube.com/embed') && !hl.includes('youtube-nocookie.com');
  const hasYoutubeNocookie = hl.includes('youtube-nocookie.com');
  const hasYoutubeAny = hasYoutubeStandard || hasYoutubeNocookie;

  if (hasYoutubeStandard) {
    issues.push(found({
      id: 'EXT-03', category: 'external', severity: 'high',
      title: 'YouTube Standard-Einbettung (mit Cookies)',
      description:
        'YouTube-Videos werden über youtube.com/embed eingebunden. ' +
        'Das setzt sofort Tracking-Cookies und überträgt Daten an Google, auch ohne Videostart.',
      recommendation:
        'Wechseln Sie auf youtube-nocookie.com/embed oder implementieren Sie ' +
        'einen "Klick-zum-Abspielen"-Mechanismus (2-Klick-Lösung) mit Einwilligung.',
    }));
  }

  if (hasYoutubeNocookie) {
    issues.push(ok({
      id: 'EXT-04', category: 'external',
      title: 'YouTube Nocookie-Variante verwendet',
      description: 'YouTube-Videos werden über youtube-nocookie.com eingebunden — datenschutzfreundlicher.',
    }));
  } else if (hasYoutubeAny && !hasYoutubeStandard) {
    // Edge case: already handled above
  } else if (!hasYoutubeAny) {
    issues.push(ok({
      id: 'EXT-03', category: 'external',
      title: 'Kein YouTube eingebettet',
      description: 'Es wurden keine eingebetteten YouTube-Videos auf der Seite gefunden.',
    }));
  }

  // EXT-06 · Google Maps
  const hasGoogleMaps =
    hl.includes('maps.googleapis.com') ||
    hl.includes('maps.google.com/maps') ||
    hl.includes('google.com/maps/embed');
  if (hasGoogleMaps) {
    issues.push(found({
      id: 'EXT-06', category: 'external', severity: 'high',
      title: 'Google Maps eingebettet',
      description:
        'Google Maps ist auf der Seite eingebettet. Beim Laden der Karte werden ' +
        'IP-Adresse und ggf. Standortdaten an Google übertragen — ohne Einwilligung unzulässig.',
      recommendation:
        'Ersetzen Sie Google Maps durch eine datenschutzfreundliche Alternative ' +
        '(OpenStreetMap / Leaflet) oder nutzen Sie eine 2-Klick-Lösung mit Einwilligung vor dem Laden.',
    }));
  } else {
    issues.push(ok({
      id: 'EXT-06', category: 'external',
      title: 'Google Maps nicht erkannt',
      description: 'Google Maps wurde auf der Seite nicht gefunden.',
    }));
  }

  // EXT-07 · Google reCAPTCHA
  const hasRecaptcha =
    hl.includes('recaptcha') ||
    hl.includes('google.com/recaptcha') ||
    hl.includes('www.gstatic.com/recaptcha');
  if (hasRecaptcha) {
    issues.push(warn({
      id: 'EXT-07', category: 'external', severity: 'medium',
      title: 'Google reCAPTCHA erkannt',
      description:
        'Google reCAPTCHA überträgt Nutzerdaten (Browserdaten, Mausbewegungen, IP) an Google. ' +
        'Bei der unsichtbaren Variante (v3) geschieht das ohne sichtbaren Hinweis.',
      recommendation:
        'Erwähnen Sie den Einsatz von reCAPTCHA in Ihrer Datenschutzerklärung. ' +
        'Erwägen Sie die datenschutzfreundliche Alternative hCaptcha oder Friendly Captcha (DSGVO-konform).',
    }));
  } else {
    issues.push(ok({
      id: 'EXT-07', category: 'external',
      title: 'Google reCAPTCHA nicht erkannt',
      description: 'Kein Google reCAPTCHA auf der Seite gefunden.',
    }));
  }

  return issues;
}
