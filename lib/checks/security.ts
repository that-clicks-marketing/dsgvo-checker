import type { CheckContext } from '../types';
import { found, ok, warn } from '../utils';
import type { Issue } from '../utils';

export function checkSecurity(ctx: CheckContext): Issue[] {
  const issues: Issue[] = [];

  // SEC-01 · HTTPS aktiv
  if (ctx.isHttps) {
    issues.push(ok({ id: 'SEC-01', category: 'security', title: 'HTTPS aktiv' ,
      description: 'Ihre Website ist über HTTPS verschlüsselt.' }));
  } else {
    issues.push(found({
      id: 'SEC-01', category: 'security', severity: 'critical',
      title: 'Kein HTTPS – Website nicht verschlüsselt',
      description:
        'Ihre Website läuft ohne SSL/HTTPS. Alle übertragenen Daten (Formulareingaben, Cookies) ' +
        'sind im Klartext lesbar. Das verstößt gegen Art. 32 DSGVO.',
      recommendation:
        'Aktivieren Sie ein SSL-Zertifikat bei Ihrem Hosting-Anbieter. ' +
        'In den meisten Fällen ist Let\'s Encrypt kostenlos.',
    }));
  }

  // SEC-02 · HTTP→HTTPS Redirect
  if (ctx.isHttps) {
    if (ctx.httpRedirectsToHttps) {
      issues.push(ok({ id: 'SEC-02', category: 'security',
        title: 'HTTP → HTTPS Weiterleitung aktiv',
        description: 'HTTP-Aufrufe werden automatisch auf HTTPS umgeleitet.' }));
    } else {
      issues.push(warn({
        id: 'SEC-02', category: 'security', severity: 'high',
        title: 'Kein automatischer HTTP → HTTPS Redirect',
        description:
          'Besucher, die http:// eingeben, werden nicht auf die verschlüsselte Version weitergeleitet. ' +
          'Das ermöglicht unverschlüsselte Verbindungen.',
        recommendation:
          'Richten Sie eine permanente 301-Weiterleitung ein: ' +
          '.htaccess (Apache) oder beim Hoster als Option aktivieren.',
      }));
    }
  }

  // SEC-03 · Mixed Content
  if (ctx.isHttps) {
    const httpRefs = findMixedContent(ctx.html);
    if (httpRefs.length === 0) {
      issues.push(ok({ id: 'SEC-03', category: 'security',
        title: 'Kein Mixed Content erkannt',
        description: 'Keine unsicheren HTTP-Ressourcen auf der HTTPS-Seite gefunden.' }));
    } else {
      issues.push(warn({
        id: 'SEC-03', category: 'security', severity: 'medium',
        title: `Mixed Content: ${httpRefs.length} unsichere Ressource${httpRefs.length > 1 ? 'n' : ''} gefunden`,
        description:
          `Auf Ihrer HTTPS-Seite werden Ressourcen über HTTP geladen: ${httpRefs.slice(0, 3).join(', ')}${httpRefs.length > 3 ? ' …' : ''}. ` +
          'Browser können diese blockieren.',
        recommendation:
          'Ersetzen Sie alle http:// Ressourcen-URLs durch https://',
      }));
    }
  }

  // SEC-05 · HSTS
  const hsts = ctx.headers['strict-transport-security'];
  if (hsts) {
    issues.push(ok({ id: 'SEC-05', category: 'security',
      title: 'HSTS Header gesetzt',
      description: `Strict-Transport-Security ist aktiv (${hsts}).` }));
  } else if (ctx.isHttps) {
    issues.push(warn({
      id: 'SEC-05', category: 'security', severity: 'medium',
      title: 'HSTS Header fehlt',
      description:
        'Strict-Transport-Security ist nicht gesetzt. Browser merken sich dadurch nicht, ' +
        'dass immer HTTPS verwendet werden soll.',
      recommendation:
        'HSTS aktivieren. Empfohlen: Strict-Transport-Security: max-age=31536000; includeSubDomains',
    }));
  }

  // SEC-06 · X-Content-Type-Options
  const xcto = ctx.headers['x-content-type-options'];
  if (xcto?.toLowerCase().includes('nosniff')) {
    issues.push(ok({ id: 'SEC-06', category: 'security',
      title: 'X-Content-Type-Options: nosniff gesetzt',
      description: 'MIME-Type-Sniffing wird durch den Sicherheits-Header verhindert.' }));
  } else {
    issues.push(warn({
      id: 'SEC-06', category: 'security', severity: 'low',
      title: 'X-Content-Type-Options Header fehlt',
      description: 'Der Header X-Content-Type-Options: nosniff ist nicht gesetzt.',
      recommendation:
        'In der Server-Konfiguration oder per .htaccess: Header set X-Content-Type-Options "nosniff"',
    }));
  }

  return issues;
}

function findMixedContent(html: string): string[] {
  const matches = new Set<string>();
  const patterns = [
    /\bsrc="(http:\/\/[^"]{5,60})"/gi,
    /\bhref="(http:\/\/[^"]{5,60})"/gi,
    /url\('(http:\/\/[^']{5,60})'\)/gi,
  ];
  for (const p of patterns) {
    let m: RegExpExecArray | null;
    while ((m = p.exec(html)) !== null && matches.size < 8) {
      const u = m[1];
      // Exclude obvious non-resources (anchors, mailto)
      if (!u.startsWith('http://mailto') && !u.includes('#')) {
        matches.add(u);
      }
    }
  }
  return [...matches];
}
