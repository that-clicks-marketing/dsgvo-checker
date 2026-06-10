# DECISIONS.md

Architektur- und Design-Entscheidungen mit Begründung.

---

## D-001 · Next.js App Router statt Pages Router
**Datum:** 2026-06-10
**Entschieden von:** Claude (Decision Gatekeeper)
**Begründung:** App Router ist der aktuelle Standard in Next.js, besser für
Server Components, Streaming und zukünftige Features. Pages Router ist legacy.

---

## D-002 · Server Component für Check-Seite (kein API-Route Pattern)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Die Ergebnis-Seite kann als Server Component den URL-Parameter
direkt lesen, die Checks ausführen und das Ergebnis rendern – ohne separaten
API-Aufruf. Einfacher, weniger Code, gleich schnell.
**Alternativen verworfen:** Route Handler + Client Component würde unnötige
Komplexität und ein zusätzliches Client-seitiges Fetch einführen.

---

## D-003 · Tailwind CSS v4 (nicht v3)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** create-next-app installiert standardmäßig Tailwind v4.
Keine tailwind.config.js nötig. Brand-Variablen via `@theme` in globals.css.
Kein Grund zu downgraden.

---

## D-004 · Keine Datenbank im MVP
**Datum:** 2026-06-10
**Entschieden von:** Manuel (explizite Vorgabe)
**Begründung:** Jeder Scan ist zustandslos. Keine Nutzerkonten, keine History.
Reduziert Komplexität und Kosten auf null.

---

## D-005 · HTML-Analyse via String-Matching (kein Headless Browser)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Playwright oder Puppeteer würden Vercel Free Tier sprengen
(Memory/Timeout). String-Analyse des rohen HTML ist ausreichend für 80% der
Checks und läuft in < 1s. Single-Page-Apps, die alles via JS rendern, können
nicht vollständig analysiert werden – wird als Einschränkung dokumentiert.

---

## D-006 · URL-Formular als HTML GET (kein JS-Submit)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** `<form method="GET" action="/check">` funktioniert ohne
JavaScript, ist barrierefrei und einfach zu implementieren. Keine Client
Component nötig auf der Landing Page.

---

## D-007 · Montserrat via next/font/google (nicht CDN-Link)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** next/font lädt Schriften selbst-hostend – keine Verbindung
zu Google-Servern beim Seitenaufruf. Das ist DSGVO-konform und konsistent mit
dem Toolzweck (wäre sonst ironisch).

---

## D-008 · Vercel Free Tier, Region Frankfurt
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Free Tier reicht für MVP und moderate Last vollständig aus.
Frankfurt (fra1) für minimale Latenz zu deutschen Nutzern.

---

## D-009 · Private IPs in Check-Logik blockieren (SSRF-Schutz)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Sicherheitsregel #1. Ohne Blockierung könnten Angreifer das
Tool nutzen, um interne Netzwerke zu scannen. Priorität über alle anderen Überlegungen.

---

## D-010 · Scoring: Punkteabzug-System statt Gewichtungs-Matrix
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Startpunkt 100, Abzüge je Schweregrad (critical -20, high -10, medium -5, low -2).
Einfacher zu verstehen und zu kommunizieren als gewichtete Scores. Nutzer sehen sofort,
wie viele kritische Punkte existieren. Gesamtscore kann nie > 100 oder < 0 werden.
**Alternativen verworfen:** Prozentual gewichtete Summe wäre schwerer erklärbar.

---

## D-011 · 63 Checks in 6 Kategorien, MVP = 30 Checks
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Die 30 MVP-Checks decken die häufigsten und schwersten DSGVO-Risiken
bei kleinen Websites ab (LEGAL, CONSENT, die 5 größten Tracker, GA4, GTM, Meta Pixel,
Google Fonts, Google Maps, YouTube, reCAPTCHA, HTTPS, Security Headers).
Die 33 Phase-3-Checks sind wertvolle Ergänzungen, aber nicht notwendig für den Launch.

---

## D-012 · Consent-Check kombiniert CMP-Erkennung + generische Muster
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Cookie-Banner werden häufig per JS eingefügt und sind im rohen HTML
nicht immer sichtbar. CMP-Skripte (Cookiebot, Borlabs etc.) sind jedoch verlässlich im
`<head>` zu finden. Daher: CMP-Detection ist Haupt-Signal, generische DOM-Patterns sind Backup.
Confidence bleibt "medium" — false negatives bei rein JS-basierten Lösungen möglich.

---

## D-013 · Tracking-Checks: "erkannt" ≠ "unzulässig"
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Ob ein Tracker hinter einem Consent-System liegt, kann ohne
JS-Rendering nicht zuverlässig geprüft werden. Report-Texte kommunizieren explizit:
"Erkannt — bitte prüfen ob hinter Consent" statt "Verstoß festgestellt".
Wichtig für rechtliche Absicherung des Tools (kein Falschvorwurf).

---

## D-015 · Dummy-Daten in separater lib/dummy-data.ts (nicht inline in Page)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Die Check-Seite (`app/check/page.tsx`) ruft `getDummyScanResult()` auf.
Wenn die echte Scan-Engine fertig ist, wird nur diese eine Zeile gegen den echten
Scanner-Aufruf getauscht. Alle Komponenten bleiben unverändert — sie akzeptieren
ein `ScanResult`-Objekt ohne Wissen ob es Dummy- oder Real-Daten sind.

---

## D-016 · SVG-Score-Ring statt CSS-only Lösung
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** SVG `stroke-dashoffset` ist die zuverlässigste, browserkompatible Methode
für einen Kreisring-Progress ohne externe Bibliothek. Funktioniert ohne JavaScript,
keine Dependencies, einfach zu animieren.

---

## D-017 · Ampel als eigenständige Visualisierung neben dem Score-Ring
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Zielgruppe sind Nicht-Techniker. Die Ampel kommuniziert "gut / mittel / schlecht"
ohne dass Nutzer die Score-Zahl interpretieren müssen. Die Kombination Score-Ring + Ampel
gibt zwei komplementäre Perspektiven auf dasselbe Ergebnis.

---

## D-018 · HTML-Fetch: Head (300 KB) + Tail (80 KB) statt nur Anfang
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Große Websites (>300 KB HTML) haben Footer-Inhalte (Datenschutz, Impressum-Links) nach
dem bisherigen 300-KB-Limit. Praxistest: www.session.de = 471 KB, Footer bei ~400 KB. Mit ausschließlichem
Head-Truncating wurden LEGAL-01/03 fälschlicherweise als "nicht gefunden" gemeldet. Lösung: Head-Teil
für `<head>`-Skripte (Tracking, CMPs) + Tail-Teil für Footer-Links. Maximales Speicherlimit: ~380 KB.
**Alternativen verworfen:** Gesamtes HTML laden (Memory-Risiko bei >1 MB Seiten auf Vercel), Range-Requests
(nicht universell unterstützt), nur Limit erhöhen (schiebt das Problem nach hinten ohne es zu lösen).

---

## D-019 · CMP-erkannte Banner: CONSENT-02/03 automatisch OK
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Bekannte CMPs (Usercentrics, Borlabs, Cookiebot, etc.) rendern Akzeptieren-/Ablehnen-Buttons
vollständig per JavaScript. Im statischen HTML ist kein Button-Text sichtbar. Ohne diese Regel würden
alle CMP-gesicherten Seiten fälschlicherweise "Kein Ablehnen-Button" melden (false positive).
Wenn CMP-Skript im HTML vorhanden: CMP stellt per Definition beide Optionen bereit.

---

## D-020 · Browser-ähnlicher User-Agent für Fetch-Requests
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** User-Agent `DSGVO-Checker/1.0` wurde von einigen Servern mit Bot-Schutz blockiert.
Realistischer UA mit Accept-/Accept-Language-Headers umgeht diese Blockierungen ohne User zu täuschen
(Zweck bleibt im UA transparent: `+https://dsgvo-check.that-clicks.de`).

---

## D-014 · Sie-Form in allen Report-Texten (nicht Du-Form)
**Datum:** 2026-06-10
**Entschieden von:** Claude
**Begründung:** Zielgruppe sind Kleinunternehmer, Ärzte, Handwerker — ein professioneller,
respektvoller Ton. Die Sie-Form signalisiert Seriosität und passt besser zur Marke
That Clicks Marketing im B2B/Agenturkontext.
**Korrigiert:** Initiale Vorgabe in SESSION 1 war Du-Form — wurde auf Sie-Form umgestellt.
