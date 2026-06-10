# ARCHITECTURE.md

## Übersicht

```
Browser (Nutzer)
    │
    │  GET /  → Landing Page (Server Component, statisch)
    │  GET /check?url=... → Ergebnis-Seite (Server Component, dynamic)
    │         │
    │         └── Ruft intern auf: lib/checks/*.ts
    │                  │
    │                  └── fetch(url) → externe Website (serverseitig!)
    │
    ▼
Vercel Edge Network → Node.js Serverless Function
```

---

## Entscheidungen

### Server Components überall wo möglich

Die Ergebnis-Seite (`/check`) ist eine **Server Component**. Sie:
1. Liest `?url=` aus den Search Params
2. Ruft die Check-Funktionen auf (serverseitig)
3. Rendert das Ergebnis als HTML

Vorteile: Kein JS im Browser nötig, keine API-Route nötig, einfacher.
Nachteil: Keine Lade-Animation möglich (Streaming via Suspense als Alternative).

### URL-Fetch immer serverseitig

Nutzer-URLs werden **nie** im Browser direkt aufgerufen.
Gründe: CORS, Privacy, Kontrolle über Timeouts, Logging-Prävention.

### Kein State-Management (MVP)

Kein Redux, Zustand, Context API. Alles wird per URL-Parameter übergeben.
Ergebnis-Seite liest `?url=` und berechnet alles frisch.

### Tailwind CSS v4

Verwendet `@theme` Block in globals.css für Brand-Variablen.
Keine tailwind.config.js nötig in v4.

---

## Datenfluss

```
1. Nutzer gibt URL ein (z.B. https://example.de)
2. Form sendet GET /check?url=https%3A%2F%2Fexample.de
3. Server Component liest searchParams.url
4. Validierung: URL-Format prüfen, nur http/https erlauben
5. fetch(url, { signal: AbortSignal.timeout(10000) })
6. HTML-Response parsen (kein DOM – nur String-Analyse)
7. Checks paralell laufen lassen (Promise.all)
8. Ergebnis-Array → ResultCard-Komponenten
9. Seite wird gerendert und zurückgegeben
```

---

## Sicherheitsüberlegungen

### SSRF-Schutz (Server-Side Request Forgery)
- Nur `http://` und `https://` erlaubt (keine `file://`, `ftp://`, etc.)
- Private IP-Ranges blockieren (10.x, 192.168.x, 127.x, localhost)
- Maximale Redirect-Anzahl: 3
- Timeout: 10 Sekunden

### Keine Datenspeicherung
- Gescannte URLs werden nicht in Logs gespeichert
- Kein Datenbankschema im MVP
- Vercel Analytics (wenn überhaupt): anonymisiert

### Rate Limiting (Phase 2+)
- Vercel hat eingebautes Rate Limiting auf Free Tier
- Bei Bedarf: Upstash Redis für explizites Rate Limiting

---

## Vercel-Konfiguration

```
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Node Version: 22.x
Region: Frankfurt (fra1) — näher an deutschen Nutzern
```

Keine `vercel.json` nötig für MVP. Alle Defaults passen.

---

## Performance-Ziele

- Landing Page: < 1s LCP (statisch, kein JS nötig)
- Check-Seite: < 5s TTFB (abhängig von externem Fetch)
- Bundle-Größe: < 100KB First Load JS
