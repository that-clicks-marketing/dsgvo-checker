# FILE_MAP.md

Übersicht aller Projektdateien mit Beschreibung.
Stand: 2026-06-10 (Phase 3 abgeschlossen)

---

## Konfiguration

| Datei | Zweck | Status |
|---|---|---|
| `package.json` | Abhängigkeiten, Scripts (dev/build/start/lint) | ✅ |
| `tsconfig.json` | TypeScript strict, path aliases (@/*) | ✅ |
| `next.config.ts` | Next.js-Konfiguration (minimal, Defaults) | ✅ |
| `postcss.config.mjs` | PostCSS für Tailwind v4 | ✅ |
| `eslint.config.mjs` | ESLint next/core-web-vitals | ✅ |
| `.gitignore` | Standard Next.js + node_modules, .next, .env | ✅ |
| `CLAUDE.md` | Arbeitsanweisungen, Decision Gatekeeper, Tech-Stack | ✅ |
| `README.md` | Projektdokumentation für Entwickler | ✅ |
| `AGENTS.md` | Auto-generiert (create-next-app) — kann gelöscht werden | ⚠️ |

---

## App (Next.js App Router)

| Datei | Zweck | Status |
|---|---|---|
| `app/layout.tsx` | Root Layout: Montserrat, lang="de", OG-Metadata | ✅ |
| `app/globals.css` | Tailwind v4 @theme: Brand-Farben, Font-Variable | ✅ |
| `app/page.tsx` | Landing Page: Header + Hero + CTA + Footer | ✅ |
| `app/check/page.tsx` | Report-Seite: searchParams.url → runScan() → Report oder ErrorView | ✅ |
| `app/check/loading.tsx` | Next.js Suspense Loading-Screen mit Scan-Animation | ✅ |
| `app/impressum/page.tsx` | Impressum (⚠️ Adressdaten noch Platzhalter — vor Launch ausfüllen) | ⚠️ |
| `app/datenschutz/page.tsx` | Datenschutzerklärung des Tools | ✅ |

---

## Komponenten

| Datei | Zweck | Status |
|---|---|---|
| `components/Header.tsx` | Sticky Navigation (Logo, That Clicks Link) | ✅ |
| `components/Hero.tsx` | Landing Hero: H1, Subheadline, Form, Trust-Grid | ✅ |
| `components/UrlScannerForm.tsx` | Client: URL-Eingabe, Validierung, Loading-State, Router-Push | ✅ |
| `components/ScoreCard.tsx` | SVG-Score-Ring, Ampel-Grafik, Severity-Stat-Badges | ✅ |
| `components/IssueCard.tsx` | Einzelner Check-Befund (Problem) oder OK-Zeile | ✅ |
| `components/CategorySection.tsx` | Kategorie-Gruppe: Header mit Badge + sortierte IssueCards | ✅ |
| `components/ReportSummary.tsx` | Vollständiger Report: ScoreCard + alle CategorySections | ✅ |
| `components/OfferBlock.tsx` | 3 Preispakete (290 / 590 / individuell) + CTAs | ✅ |
| `components/Disclaimer.tsx` | Rechtlicher Hinweis | ✅ |
| `components/Footer.tsx` | Footer mit Links, Disclaimer, Kontakt | ✅ |
| `components/ErrorView.tsx` | Fehleranzeige für alle ScanErrorCodes (invalid_url, timeout, etc.) | ✅ |

---

## Library / Scan-Engine

| Datei | Zweck | Status |
|---|---|---|
| `lib/types.ts` | Typen: Issue, ScanResult, Category, Severity, CheckContext, ScanError, CATEGORY_META, SEVERITY_META, Hilfsfunktionen | ✅ |
| `lib/dummy-data.ts` | 12 realistische Dummy-Issues + getDummyScanResult() (für Fallback/Tests) | ✅ |
| `lib/utils.ts` | validateUrl (SSRF-Schutz), extractFooterHtml, calculateScore, Issue-Factories (found/ok/warn) | ✅ |
| `lib/scanner.ts` | Haupt-Orchestrator: validate → fetch (head+tail) → CheckContext → Promise.all → score → ScanResult | ✅ |
| `lib/checks/legal.ts` | LEGAL-01–04: Datenschutz & Impressum vorhanden + im Footer | ✅ |
| `lib/checks/consent.ts` | CONSENT-01–03 (Banner/Buttons), CONSENT-06 (Tracking ohne CMP), CONSENT-07–14 (8 CMP-Signaturen) | ✅ |
| `lib/checks/tracking.ts` | TRACK-01/02 (GA4/GTM), TRACK-03 (Meta Pixel), TRACK-04 (LinkedIn), TRACK-05 (TikTok), TRACK-06 (Clarity), TRACK-07 (Hotjar), TRACK-10 (Google Ads), TRACK-14 (HubSpot) | ✅ |
| `lib/checks/external.ts` | EXT-01 (Google Fonts CDN), EXT-03 (YouTube Standard), EXT-04 (YouTube Nocookie), EXT-06 (Google Maps), EXT-07 (reCAPTCHA) | ✅ |
| `lib/checks/forms.ts` | FORM-01 (Formular erkannt), FORM-02 (Datenschutzhinweis fehlt) | ✅ |
| `lib/checks/security.ts` | SEC-01 (HTTPS), SEC-02 (HTTP→HTTPS Redirect), SEC-03 (Mixed Content), SEC-05 (HSTS), SEC-06 (X-Content-Type-Options) | ✅ |

---

## Scan-Engine: Schlüssel-Entscheidungen

### Wie der Scanner funktioniert (`lib/scanner.ts`)
1. `validateUrl()` → SSRF-Schutz, private IPs blockieren
2. `fetch()` + `checkHttpRedirect()` parallel → Response + Redirect-Boolean
3. Buffer in 2 Teilen dekodieren: **Head (300 KB) + Tail (80 KB)** → deckt `<head>`-Skripte UND Footer-Links ab
4. `CheckContext` aufbauen: html, htmlLower, footerHtml, headers, isHttps, httpRedirectsToHttps
5. Alle 6 Check-Module via `Promise.all` ausführen
6. CONSENT-06 nachträglich prüfen (Tracker ohne CMP)
7. Score berechnen, `ScanResult` zurückgeben

### Warum Head + Tail (nicht nur Head)
Große Websites (>380 KB HTML) haben Footer-Inhalte (Datenschutz, Impressum-Links) nach dem 300-KB-Limit. 
Nur den Anfang zu lesen würde Legal-Checks fälschlicherweise als "nicht gefunden" melden.
Getestet mit www.session.de (471 KB — footer ab Byte ~400.000).

### CMP-Erkennung und Button-Checks
Bekannte CMPs (Borlabs, Usercentrics, Cookiebot, etc.) rendern ihren Banner vollständig per JavaScript.
Im statischen HTML ist kein "Akzeptieren"- oder "Ablehnen"-Button-Text sichtbar.
→ Wenn CMP erkannt: CONSENT-02/03 automatisch als OK markieren.

---

## Dokumentation

| Datei | Inhalt | Stand |
|---|---|---|
| `docs/PROJECT_BRIEF.md` | Projektziele, Zielgruppe, Business-Logik, Phasen | 2026-06-10 |
| `docs/FEATURES.md` | 63 Feature-Checks nach Phase (MVP / Phase 3 / 4 / 5) | 2026-06-10 |
| `docs/CHECKLIST_DSGVO.md` | Vollständige Check-Spezifikation: 63 Checks, alle Felder | 2026-06-10 |
| `docs/ARCHITECTURE.md` | Technische Architektur, Datenfluss, SSRF, Performance | 2026-06-10 |
| `docs/FILE_MAP.md` | Diese Datei | 2026-06-10 |
| `docs/DECISIONS.md` | Architektur-Entscheidungen mit Begründung | 2026-06-10 |
| `docs/OPEN_POINTS.md` | Offene Punkte nach Priorität | 2026-06-10 |
| `docs/STATUS.md` | Aktueller Projektstatus, nächster Schritt | 2026-06-10 |
| `docs/TEST_PLAN.md` | Testplan für alle Phasen | 2026-06-10 |
| `docs/DEPLOYMENT.md` | GitHub + Vercel + DNS Schritt-für-Schritt | 2026-06-10 |
| `docs/REPORT_COPY.md` | Alle Report-Texte (Befund, Empfehlung, Fehlertexte) | 2026-06-10 |
| `docs/LEAD_OFFER.md` | CTA-Texte, Angebots-Formulierungen je Score | 2026-06-10 |
