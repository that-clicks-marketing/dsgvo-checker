# FEATURES.md

---

## Phase 1 – Projektstruktur & Landing Page ✅ Abgeschlossen

- [x] Next.js 16 App Router, TypeScript, Tailwind v4
- [x] Landing Page mit URL-Eingabeformular
- [x] Design-System (Montserrat, Brand-Farben #43a9d1)
- [x] Responsive Layout (Mobile-first)
- [x] Header, Footer mit Disclaimer
- [x] Vollständige Dokumentation (13 Docs-Dateien)
- [ ] Impressum-Seite (`/impressum`)
- [ ] Datenschutz-Seite des Tools (`/datenschutz`)

---

## Phase 2 – Scan Engine & Ergebnis-Seite (MVP)

### Infrastruktur
- [ ] `lib/types.ts` — Typen: CheckResult, ScanResult, Severity, CheckStatus
- [ ] `lib/utils.ts` — URL-Validierung, SSRF-Schutz (private IPs blockieren)
- [ ] `lib/scanner.ts` — Haupt-Orchestrator (Promise.all über alle Checks)
- [ ] `app/check/page.tsx` — Server Component: URL lesen → scannen → Report anzeigen
- [ ] Fehlerseite: ungültige URL, Timeout, nicht erreichbar
- [ ] Komponenten: ResultCard, ReportSummary, RiskScore

### Checks Phase 2 (30 Checks, automatisch erkennbar)

**Rechtstexte**
- [ ] LEGAL-01 · Datenschutzerklärung vorhanden
- [ ] LEGAL-02 · Datenschutzerklärung im Footer
- [ ] LEGAL-03 · Impressum vorhanden
- [ ] LEGAL-04 · Impressum im Footer

**Cookies & Consent**
- [ ] CONSENT-01 · Cookie-Banner erkennbar
- [ ] CONSENT-02 · Akzeptieren-Button erkennbar
- [ ] CONSENT-03 · Ablehnen-Button erkennbar
- [ ] CONSENT-06 · Tracking erkannt, aber kein Consent-Hinweis
- [ ] CONSENT-07 · CMP: Borlabs Cookie
- [ ] CONSENT-08 · CMP: Complianz
- [ ] CONSENT-09 · CMP: Cookiebot
- [ ] CONSENT-10 · CMP: Usercentrics
- [ ] CONSENT-11 · CMP: Consentmanager
- [ ] CONSENT-12 · CMP: CCM19
- [ ] CONSENT-13 · CMP: OneTrust
- [ ] CONSENT-14 · CMP: iubenda

**Tracking & Marketing**
- [ ] TRACK-01 · Google Analytics / GA4
- [ ] TRACK-02 · Google Tag Manager
- [ ] TRACK-03 · Meta / Facebook Pixel
- [ ] TRACK-04 · LinkedIn Insight Tag
- [ ] TRACK-05 · TikTok Pixel
- [ ] TRACK-06 · Microsoft Clarity
- [ ] TRACK-07 · Hotjar
- [ ] TRACK-10 · Google Ads Conversion
- [ ] TRACK-14 · HubSpot Tracking

**Externe Dienste**
- [ ] EXT-01 · Google Fonts extern
- [ ] EXT-03 · YouTube Embed (standard)
- [ ] EXT-04 · YouTube nocookie
- [ ] EXT-06 · Google Maps Embed
- [ ] EXT-07 · reCAPTCHA

**Formulare**
- [ ] FORM-01 · Kontaktformular vorhanden
- [ ] FORM-02 · Formular ohne Datenschutzhinweis

**Technische Sicherheit**
- [ ] SEC-01 · HTTPS aktiv
- [ ] SEC-02 · HTTP→HTTPS Redirect
- [ ] SEC-03 · Mixed Content
- [ ] SEC-05 · HSTS Header
- [ ] SEC-06 · X-Content-Type-Options Header

**Report-Logik**
- [ ] SCORE-01 · Risiko-Score berechnen (0–100)
- [ ] SCORE-02 · Issue-Priorisierung (critical → high → medium → low)
- [ ] SCORE-03 · CTA je Score-Bereich

---

## Phase 3 – Erweiterung Checks (28 weitere Checks)

**Rechtstexte**
- [ ] LEGAL-05 · Datenschutzseite nennt erkannte Drittanbieter
- [ ] LEGAL-06 · Impressum Pflichtangaben (grob)

**Consent**
- [ ] CONSENT-04 · Cookie-Einstellungen erkennbar
- [ ] CONSENT-05 · Widerruf / Consent ändern erkennbar

**Tracking**
- [ ] TRACK-08 · Mouseflow
- [ ] TRACK-09 · Pinterest Tag
- [ ] TRACK-11 · Floodlight
- [ ] TRACK-12 · Matomo
- [ ] TRACK-13 · Plausible Analytics

**Externe Dienste**
- [ ] EXT-02 · Adobe Fonts
- [ ] EXT-05 · Vimeo Embed
- [ ] EXT-08 · hCaptcha
- [ ] EXT-09 · Calendly
- [ ] EXT-10 · Typeform
- [ ] EXT-11 · HubSpot Forms
- [ ] EXT-12 · Mailchimp
- [ ] EXT-13 · Brevo / Sendinblue
- [ ] EXT-14 · Klaviyo
- [ ] EXT-15 · ActiveCampaign
- [ ] EXT-16 · Externe CDNs
- [ ] EXT-17 · Externe Skripte allgemein
- [ ] EXT-18 · Externe iframes allgemein

**Formulare**
- [ ] FORM-03 · Newsletter-Formular
- [ ] FORM-04 · Bewerbungsformular
- [ ] FORM-05 · Terminbuchung

**Sicherheit**
- [ ] SEC-04 · Content-Security-Policy
- [ ] SEC-07 · Referrer-Policy
- [ ] SEC-08 · Permissions-Policy
- [ ] SEC-09 · Externe Ressourcen ohne SRI

---

## Phase 4 – SEO, Design & Deployment

- [ ] robots.txt (Check-Endpunkt von Crawlern ausschließen)
- [ ] sitemap.xml
- [ ] OG-Image (1200×630px, Brand-Design)
- [ ] Vercel Production Deployment
- [ ] Domain `dsgvo-check.that-clicks.de` konfiguriert
- [ ] Lighthouse Score ≥ 90 (Performance, SEO, A11y)
- [ ] Ladezeit der Scan-Seite optimieren (Suspense / Streaming)

---

## Phase 5 – Erweiterungen (optional, nach Launch)

- [ ] E-Mail-Report (Resend API): Nutzer gibt E-Mail an, bekommt Report zugesandt
- [ ] PDF-Export des Reports
- [ ] Mehrere URLs gleichzeitig (Batch-Scan)
- [ ] "Ergebnis teilen" Link (Report-URL via URL-Hash, ohne Datenbank)
- [ ] CMS-Erkennung (WordPress, Shopify, TYPO3, Wix, Squarespace)
- [ ] Subdomain-Scan (Links auf gleicher Domain folgen)
- [ ] Vercel Analytics (privacy-first, kein Cookie nötig)
- [ ] API-Endpunkt für externe Integrationen
