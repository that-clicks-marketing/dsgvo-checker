# STATUS.md

Aktueller Projektstatus – wird nach jeder Session aktualisiert.

---

## Stand: 2026-06-10 | Phase 3 – Echte Scan-Engine – Abgeschlossen

---

### Was ist fertig

**Phase 1 – App & Grundstruktur**
- [x] Next.js 16 Projekt (App Router, TypeScript strict, Tailwind v4)
- [x] Design-System (Montserrat via next/font, Brand-Farben, responsive)
- [x] `app/layout.tsx` — Root Layout, lang="de", OG-Metadata
- [x] `app/globals.css` — Tailwind @theme, Brand-Variablen

**Phase 1.5 – Checklisten-Spezifikation**
- [x] `docs/CHECKLIST_DSGVO.md` — 63 Checks, 6 Kategorien, alle Felder
- [x] `docs/REPORT_COPY.md` — alle deutschen UI-Texte für alle 63 Checks

**Phase 2 – Visuelles MVP**
- [x] `lib/types.ts` — vollständige TypeScript-Typen (Issue, ScanResult, CheckContext, ScanError)
- [x] `lib/dummy-data.ts` — 12 realistische Dummy-Issues
- [x] `components/Header.tsx` — sticky Navigation
- [x] `components/Hero.tsx` — Hero mit Trust-Grid
- [x] `components/UrlScannerForm.tsx` — Client Component, URL-Validierung, Loading
- [x] `components/ScoreCard.tsx` — SVG-Score-Ring + Ampel + Stat-Badges
- [x] `components/IssueCard.tsx` — Issue/OK-Anzeige, CTA
- [x] `components/CategorySection.tsx` — Kategorie-Gruppe mit Badge
- [x] `components/ReportSummary.tsx` — vollständiger Report-Zusammensteller
- [x] `components/OfferBlock.tsx` — 3 Pakete (290 / 590 / individuell) + CTAs
- [x] `components/Disclaimer.tsx` — rechtlicher Hinweis
- [x] `components/Footer.tsx` — Footer mit Links

**Phase 3 – Echte Scan-Engine (diese Session)**
- [x] `lib/utils.ts` — SSRF-Schutz (private IPs), URL-Validierung, extractFooterHtml, calculateScore, Issue-Factories (found/ok/warn)
- [x] `lib/checks/security.ts` — SEC-01 (HTTPS), SEC-02 (HTTP→HTTPS Redirect), SEC-03 (Mixed Content), SEC-05 (HSTS), SEC-06 (X-Content-Type-Options)
- [x] `lib/checks/legal.ts` — LEGAL-01 (Datenschutz vorhanden), LEGAL-02 (im Footer), LEGAL-03 (Impressum vorhanden), LEGAL-04 (im Footer)
- [x] `lib/checks/consent.ts` — CONSENT-01 (Banner), CONSENT-02 (Accept-Button), CONSENT-03 (Reject-Button), CONSENT-07–14 (8 CMPs: Borlabs, Complianz, Cookiebot, Usercentrics, Consentmanager, CCM19, OneTrust, iubenda)
- [x] `lib/checks/tracking.ts` — TRACK-01 (GA4), TRACK-02 (GTM), TRACK-03 (Meta Pixel), TRACK-04 (LinkedIn), TRACK-05 (TikTok), TRACK-06 (Clarity), TRACK-07 (Hotjar), TRACK-10 (Google Ads), TRACK-14 (HubSpot)
- [x] `lib/checks/external.ts` — EXT-01 (Google Fonts CDN), EXT-03 (YouTube Standard), EXT-04 (YouTube Nocookie), EXT-06 (Google Maps), EXT-07 (reCAPTCHA)
- [x] `lib/checks/forms.ts` — FORM-01 (Formular vorhanden), FORM-02 (Datenschutzhinweis)
- [x] `lib/scanner.ts` — Haupt-Orchestrator: SSRF → fetch → head+tail HTML → CheckContext → Promise.all → CONSENT-06 → calculateScore → ScanResult
- [x] `components/ErrorView.tsx` — Fehleranzeige für alle ScanErrorCodes
- [x] `app/check/loading.tsx` — Next.js Suspense Loading-Screen (animiert)
- [x] `app/check/page.tsx` — verwendet jetzt runScan() statt Dummy-Daten, ErrorView-Integration
- [x] `app/impressum/page.tsx` — Pflichtseite Impressum
- [x] `app/datenschutz/page.tsx` — Pflichtseite Datenschutz des Tools

**Bugfixes & Tests (diese Session)**
- [x] Bug: Große Seiten (>300 KB HTML) — Footer/Legal-Inhalte wurden abgeschnitten → Fix: Head (300 KB) + Tail (80 KB) kombinieren
- [x] Bug: CMP-gerenderte Banner-Buttons (z.B. Usercentrics) als fehlend gemeldet → Fix: Bei erkanntem CMP CONSENT-02/03 automatisch OK
- [x] Bug: Bot-User-Agent wurde von manchen Servern abgeblockt → Fix: Realistischer Browser-UA mit Accept-Headers
- [x] Getestet gegen: example.com, www.session.de (471 KB HTML, Usercentrics CMP)

---

### Was NOCH NICHT fertig ist (Phase 4 – nächste Session)

**Vor dem Launch zwingend:**
- [ ] Impressum in `app/impressum/page.tsx` mit echten Adressdaten ausfüllen (Straße, PLZ, Stadt, USt-ID)
- [ ] Vercel-Deployment einrichten (GitHub Push → Vercel verbinden → Domain dsgvo-check.that-clicks.de)

**Phase 4 – Qualität & Stabilität:**
- [ ] Charset-Erkennung: ISO-8859-1 / Windows-1252 Sites korrekt dekodieren
- [ ] `app/api/check/route.ts` als Alternative zu Server Component (für bessere UX mit Streaming/Progress)
- [ ] Rate-Limiting (z.B. max. 10 Scans/IP/Stunde) via Upstash oder simple In-Memory-Map
- [ ] Mehr CMP-Signaturen: Real Cookie Banner, Cookiehub, Termly, Piwik PRO Consent
- [ ] GDPR-Scan-Hinweis: Wenn JS-only-CMP erkannt → Hinweis "Vollständige Prüfung erfordert JavaScript-Rendering"
- [ ] Mehr Tracking-Checks: Matomo, Plausible, Heap, Mixpanel, Segment

---

## Dev-Server

Läuft auf Port **3009** (Port 3000 war belegt).
Start: `npm run dev` im Projektordner.

---

## Bekannte Tech-Schulden

- `AGENTS.md` im Root (auto-generiert von create-next-app) — kann gelöscht werden
- Dummy-Daten (`lib/dummy-data.ts`) können nach ausreichendem Testing entfernt werden
- `response.ok && response.status !== 200` Check in scanner.ts leicht redundant (korrekt, aber vereinfachbar)
