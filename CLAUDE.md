# CLAUDE.md — DSGVO Website Checker

## Projekt-Überblick
Next.js 16 App Router · TypeScript · Tailwind CSS v4 · Vercel-Deployment
Ziel-URL: https://dsgvo-check.that-clicks.de
Owner: Manuel Schreiner, That Clicks Marketing

---

## Decision Gatekeeper

**Keine unnötigen Rückfragen an den Nutzer.**
Claude trifft sichere Standardentscheidungen selbst, dokumentiert sie und arbeitet weiter.

### Entscheidungskriterien (Priorität absteigend)
1. Sicherheit
2. DSGVO-Risiko minimieren
3. Vercel-Kompatibilität
4. Einfache Wartbarkeit
5. Geringe Kosten (kein paid tier ohne explizite Freigabe)
6. Geringe Token- und Code-Komplexität

### Dokumentationspflicht
- Jede Architektur-Entscheidung → `docs/DECISIONS.md`
- Offene Punkte / spätere Phasen → `docs/OPEN_POINTS.md`
- Aktueller Stand nach jedem Session-Ende → `docs/STATUS.md`
- Dateibeschreibung nach Änderungen → `docs/FILE_MAP.md`

---

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16+ App Router |
| Sprache | TypeScript strict |
| Styling | Tailwind CSS v4 |
| Schriftart | Montserrat (Google Fonts via next/font) |
| Hosting | Vercel (Free Tier) |
| Datenbank | keine (MVP) |
| Auth | keine (MVP) |
| KI-API | keine (MVP) |

---

## Design-System

```
Primärfarbe:  #43a9d1  (That Clicks Blau)
Grau:         #9aa7b5
Dunkel-BG:    #111827
Schwarz:      #000000
Weiß:         #ffffff
```

Schriftart: **Montserrat** (weights: 400, 500, 600, 700)
Sprache: **Deutsch** (lang="de")
Zielgruppe: Kleine Unternehmen, Handwerker, Ärzte, lokale Dienstleister, Shopbetreiber

---

## Wichtige Regeln

- **Kein Dark Mode** im MVP — einheitliches Design nach Marke
- **Kein unnötiger State** — Server Components bevorzugen
- **Route Handler** statt alter API Routes (`app/api/.../route.ts`)
- **Keine externen Tracking-Scripts** auf dem Tool selbst (wäre ironisch)
- **Rechtlicher Hinweis** immer sichtbar: Tool ist technische Ersteinschätzung, keine Rechtsberatung
- **URL-Fetch immer serverseitig** — Nutzer-URLs niemals im Browser direkt aufrufen
- **Timeout für externe Requests**: max 10 Sekunden

---

## Dateistruktur (Ziel-Stand)

```
app/
  layout.tsx          Root Layout (Montserrat, Meta, Lang="de")
  page.tsx            Landing Page (Hero + URL-Formular)
  globals.css         Tailwind + Brand-Variablen
  api/
    check/
      route.ts        POST-Handler: URL entgegennehmen, Checks ausführen
  check/
    page.tsx          Ergebnis-Seite (nach Scan)
  impressum/
    page.tsx          Impressum
  datenschutz/
    page.tsx          Datenschutzerklärung des Tools
components/
  CheckForm.tsx       URL-Eingabeformular (Client Component)
  ResultCard.tsx      Einzelnes Check-Ergebnis (ok/warn/error)
  ReportSummary.tsx   Gesamtbewertung + Lead-Angebot
  Header.tsx          Navigation
  Footer.tsx          Links + Disclaimer
lib/
  checks/             Check-Logik (eine Datei pro Check-Typ)
    ssl.ts
    cookies.ts
    tracking.ts
    legal-pages.ts
    external-scripts.ts
  types.ts            Shared TypeScript Types
  utils.ts            Hilfsfunktionen
docs/                 Projektdokumentation
```

---

## MVP-Grenzen (nicht in Phase 1)

- Keine Datenbank
- Keine User-Accounts / Auth
- Kein E-Mail-Versand (nur mailto: Links)
- Keine bezahlten APIs
- Keine KI-Integration
- Keine Mehrsprachigkeit
- Keine PDF-Exports
