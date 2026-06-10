# OPEN_POINTS.md

Offene Fragen und Punkte für spätere Sessions.

---

## Kritisch (muss vor Live-Gang)

- [ ] **Impressum des Tools erstellen** — vollständige Pflichtangaben nach § 5 TMG für dsgvo-check.that-clicks.de
- [ ] **Datenschutzerklärung des Tools erstellen** — was wird verarbeitet (nur URL, kein Speichern), Server in Frankfurt (Vercel), keine Cookies auf dem Tool selbst
- [ ] **SSRF-Schutz implementieren** — private IPs (10.x, 192.168.x, 127.x, ::1, fd...) in `lib/utils.ts` blockieren bevor fetch() aufgerufen wird
- [ ] **Rate Limiting** — mindestens IP-basiert, Vercel-seitig konfigurierbar; vor Launch aktivieren
- [ ] **Rechtlichen Hinweis auf Ergebnis-Seite** — "technische Ersteinschätzung, keine Rechtsberatung" — MUSS auf der Check-Seite sichtbar sein
- [ ] **robots.txt** — `Disallow: /check` und `Disallow: /api/` um Crawler vom Missbrauch des Scan-Endpunkts abzuhalten

---

## Phase 2 – Scan Engine

- [ ] `lib/types.ts` — CheckResult, ScanResult, CheckStatus, Severity Typen
- [ ] `lib/utils.ts` — URL-Validierung, SSRF-Schutz, Domain-Extraktion
- [ ] `lib/scanner.ts` — Orchestrator, Promise.all, Timeout-Handling
- [ ] `lib/checks/legal.ts` — LEGAL-01 bis LEGAL-04
- [ ] `lib/checks/consent.ts` — CONSENT-01 bis CONSENT-14
- [ ] `lib/checks/tracking.ts` — TRACK-01 bis TRACK-07, TRACK-10, TRACK-14
- [ ] `lib/checks/external.ts` — EXT-01, EXT-03, EXT-04, EXT-06, EXT-07
- [ ] `lib/checks/forms.ts` — FORM-01, FORM-02
- [ ] `lib/checks/security.ts` — SEC-01 bis SEC-03, SEC-05, SEC-06
- [ ] `app/check/page.tsx` — Server Component mit Suspense für Ladezeit
- [ ] Fehlerbehandlung: timeout, nicht erreichbar, ungültige URL, SSRF-Block
- [ ] Komponenten: ResultCard, ReportSummary, RiskScore-Badge

---

## Phase 3 – Report & Lead

- [ ] Vollständige Check-Library (28 weitere Checks)
- [ ] CTA-Logik je Score (SCORE-03 aus Checklist)
- [ ] Lead-CTA finalisieren (siehe docs/LEAD_OFFER.md)
- [ ] OG-Image (1200×630, Brand-Design)
- [ ] Share-Button: Report-URL kodieren

---

## Phase 4 – Deployment

- [ ] GitHub Repository erstellen und pushen
- [ ] Vercel Projekt mit GitHub verbinden
- [ ] Domain `dsgvo-check.that-clicks.de` in Vercel konfigurieren
- [ ] DNS CNAME beim Domain-Provider: `dsgvo-check` → `cname.vercel-dns.com`
- [ ] Vercel Region auf `fra1` (Frankfurt) setzen

---

## Offen – kein akuter Handlungsbedarf

- [ ] Sollen gescannte URLs aus Vercel Function Logs herausgefiltert werden? (Privacy-Overlogging)
- [ ] Vercel Analytics aktivieren? (cookielos, DSGVO-freundlich, Privacy-First-Modus)
- [ ] E-Mail-Report via Resend (Phase 5)?
- [ ] Soll das Tool die gescannte URL nach dem Check speichern für "letzte Scans"-Anzeige? (erfordert temporären State / KV → kein MVP)
- [ ] Branding: Logo als SVG erstellen statt Text-Placeholder im Header?
- [ ] Hintergrund-Farbwahl für Score-Seite: weißer Hintergrund oder dunkler Hintergrund (#111827)?
