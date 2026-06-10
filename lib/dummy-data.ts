import type { Issue, ScanResult } from './types';

const DUMMY_ISSUES: Issue[] = [
  // --- KRITISCH ---
  {
    id: 'TRACK-01',
    category: 'tracking',
    title: 'Google Analytics / GA4 erkannt',
    severity: 'critical',
    status: 'found',
    description:
      'Google Analytics (GA4) wurde auf Ihrer Website erkannt. Tracking-Tools dürfen erst nach aktiver, informierter Einwilligung geladen werden. Der Einsatz ohne Consent-Management ist nach aktueller Rechtslage unzulässig.',
    recommendation:
      'GA4 in Ihren Cookie-Manager einbinden. Das Script darf erst nach "Analytics"-Einwilligung ausgeführt werden. Aktivieren Sie zusätzlich die IP-Anonymisierung und begrenzen Sie die Datenspeicherung.',
  },
  {
    id: 'TRACK-03',
    category: 'tracking',
    title: 'Meta Pixel erkannt',
    severity: 'critical',
    status: 'found',
    description:
      'Der Meta Pixel (Facebook/Instagram-Werbepixel) wurde erkannt. Ohne rechtsgültige Einwilligung ist dieser Verstoß gegen die DSGVO ein häufiges Abmahn-Ziel und kann Bußgelder auslösen.',
    recommendation:
      'Meta Pixel ausschließlich nach "Marketing"-Einwilligung laden. In den Cookie-Manager integrieren und in der Datenschutzerklärung vollständig beschreiben.',
  },
  // --- HOCH ---
  {
    id: 'CONSENT-01',
    category: 'consent',
    title: 'Kein Cookie-Consent-System erkannt',
    severity: 'high',
    status: 'found',
    description:
      'Auf Ihrer Website wurde kein Cookie-Banner und kein bekannter Cookie-Manager gefunden — obwohl Tracking-Scripts aktiv sind. Das ist ein klarer DSGVO-Verstoß.',
    recommendation:
      'Richten Sie sofort einen DSGVO-konformen Cookie-Manager ein. Empfehlungen: Borlabs Cookie (WordPress), Cookiebot oder CCM19.',
  },
  {
    id: 'EXT-01',
    category: 'external',
    title: 'Google Fonts direkt von Google-Servern geladen',
    severity: 'high',
    status: 'found',
    description:
      'Schriftarten werden live von fonts.googleapis.com eingebunden. Dabei wird die IP-Adresse jedes Besuchers an Google übertragen. Das LG München I hat dies 2022 mit 100 € Schadensersatz geahndet (Az. 3 O 17493/20).',
    recommendation:
      'Schriftarten herunterladen und lokal hosten. Tool: google-webfonts-helper.herokuapp.com. Alternativ: next/font (Next.js) oder font-face mit self-hosted Files.',
  },
  {
    id: 'EXT-06',
    category: 'external',
    title: 'Google Maps eingebettet',
    severity: 'high',
    status: 'found',
    description:
      'Google Maps ist auf Ihrer Seite eingebettet. Beim Laden der Seite — ohne Klick — werden IP-Adresse und Standortdaten an Google übertragen.',
    recommendation:
      'Wechseln Sie zu OpenStreetMap (kostenlos, datenschutzfreundlich) oder implementieren Sie eine Zwei-Klick-Lösung, bei der die Karte erst nach Einwilligung lädt.',
  },
  {
    id: 'EXT-03',
    category: 'external',
    title: 'YouTube Video eingebettet (Standard-URL)',
    severity: 'high',
    status: 'found',
    description:
      'Ein YouTube-Video wurde mit der Standard-Embed-URL (youtube.com) eingebettet. Dabei werden sofort Cookies gesetzt — auch ohne dass der Besucher auf Play drückt.',
    recommendation:
      'Wechseln Sie auf youtube-nocookie.com/embed/ oder setzen Sie eine Zwei-Klick-Lösung ein, bei der das Video erst nach Klick auf ein Vorschaubild lädt.',
  },
  {
    id: 'TRACK-14',
    category: 'tracking',
    title: 'HubSpot Tracking Script erkannt',
    severity: 'high',
    status: 'found',
    description:
      'Das HubSpot Tracking Script trackt Besucher sitzungsübergreifend und übermittelt Verhaltensdaten an HubSpot-Server in den USA.',
    recommendation:
      'HubSpot Tracking in Cookie-Manager einbinden (Kategorie "Marketing/Analytics"). In der Datenschutzerklärung als Drittanbieter mit US-Datenübertragung erwähnen.',
  },
  // --- MITTEL ---
  {
    id: 'FORM-02',
    category: 'forms',
    title: 'Kontaktformular ohne Datenschutzhinweis',
    severity: 'medium',
    status: 'warning',
    description:
      'Es wurde ein Kontaktformular gefunden, aber kein sichtbarer Datenschutzhinweis direkt am Formular. Nach Art. 13 DSGVO müssen Nutzer vor der Eingabe über die Datenverarbeitung informiert werden.',
    recommendation:
      'Ergänzen Sie direkt unter dem Formular einen Hinweis: "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Weitere Infos in unserer [Datenschutzerklärung]."',
  },
  {
    id: 'LEGAL-02',
    category: 'legal',
    title: 'Datenschutzerklärung nicht im Footer verlinkt',
    severity: 'medium',
    status: 'warning',
    description:
      'Eine Datenschutzerklärung wurde gefunden, ist aber nicht dauerhaft im Footer aller Seiten verlinkt. Der Footer ist die rechtlich anerkannte Position für diesen Pflichtlink.',
    recommendation:
      'Datenschutz-Link in den Footer jeder Seite aufnehmen — sichtbar, ohne zu scrollen.',
  },
  {
    id: 'SEC-05',
    category: 'security',
    title: 'HSTS Header nicht gesetzt',
    severity: 'medium',
    status: 'warning',
    description:
      'Der Strict-Transport-Security (HSTS) Header fehlt. Browser können sich dadurch nicht merken, dass die Website immer über HTTPS aufgerufen werden soll.',
    recommendation:
      'HSTS in der Hosting-Konfiguration oder per .htaccess aktivieren. Empfohlener Wert: max-age=31536000; includeSubDomains.',
  },
  // --- OK ---
  {
    id: 'SEC-01',
    category: 'security',
    title: 'HTTPS aktiv und korrekt konfiguriert',
    severity: 'info',
    status: 'ok',
    description: 'Ihre Website ist über HTTPS verschlüsselt.',
    recommendation: '',
  },
  {
    id: 'LEGAL-03',
    category: 'legal',
    title: 'Impressum vorhanden',
    severity: 'info',
    status: 'ok',
    description: 'Ein Impressum wurde auf Ihrer Startseite gefunden.',
    recommendation: '',
  },
  {
    id: 'SEC-02',
    category: 'security',
    title: 'HTTP wird auf HTTPS weitergeleitet',
    severity: 'info',
    status: 'ok',
    description: 'HTTP-Aufrufe werden automatisch auf HTTPS umgeleitet.',
    recommendation: '',
  },
];

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function getDummyScanResult(url: string): ScanResult {
  const problems = DUMMY_ISSUES.filter((i) => i.status !== 'ok');
  const score = Math.max(
    0,
    100 -
      problems.reduce((acc, i) => {
        if (i.severity === 'critical') return acc + 20;
        if (i.severity === 'high')     return acc + 10;
        if (i.severity === 'medium')   return acc + 5;
        return acc + 2;
      }, 0),
  );

  return {
    url,
    domain: extractDomain(url),
    scannedAt: new Date().toISOString(),
    score,
    issues: DUMMY_ISSUES,
    isDummy: true,
  };
}
