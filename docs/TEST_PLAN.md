# TEST_PLAN.md

Testplan für den DSGVO Website Checker.

---

## Phase 1 – Landing Page

### Manuell zu testen (lokal)

- [ ] `npm run dev` startet ohne Fehler
- [ ] Landing Page lädt auf http://localhost:3000
- [ ] URL-Formular ist sichtbar und ausfüllbar
- [ ] Formular-Submit leitet korrekt zu `/check?url=...` weiter
- [ ] Responsive: Mobile (375px), Tablet (768px), Desktop (1280px)
- [ ] Schriftart Montserrat wird korrekt geladen
- [ ] Farben stimmen mit Brand-Vorgaben überein
- [ ] Footer-Links (Impressum, Datenschutz) sind klickbar
- [ ] Link zu that-clicks.de öffnet in neuem Tab

---

## Phase 2 – Check-Logik

### Unit Tests (lib/checks/*.ts)

Für jeden Check: Mindestens 3 Fälle testen:
1. Positiv (Problem vorhanden → sollte erkannt werden)
2. Negativ (kein Problem → sollte OK zurückgeben)
3. Edge Case (leere Seite, Timeout, ungültiger HTML)

#### Beispiel-URLs für manuelle Tests

| Website | Erwartetes Problem |
|---|---|
| Eine typische Handwerker-Website ohne Cookie-Banner | COOKIE-01 |
| Website mit Google Analytics ohne Consent | TRACK-01 |
| Website ohne HTTPS | SSL-01 |
| Website ohne Datenschutzerklärung | LEGAL-02 |
| Website mit Google Fonts CDN | EXT-01 |

### Integrations-Tests

- [ ] Scan einer bekannten sauberen Website → alle Checks grün
- [ ] Scan einer Website mit bekannten Problemen → korrekte Befunde
- [ ] Timeout-Test: Website antwortet nicht in 10s → Fehlermeldung
- [ ] Ungültige URL → Fehlermeldung, kein Server-Crash
- [ ] Private IP-Adresse als URL → blockiert (SSRF-Schutz)

---

## Phase 3 – Report

- [ ] Ampel-Score wird korrekt berechnet
- [ ] Rote Befunde werden oben angezeigt
- [ ] Lead-CTA erscheint am Ende des Reports
- [ ] Handlungsempfehlungen sind verständlich (Test mit Nicht-Technikern)

---

## Deployment-Test

- [ ] `npm run build` ohne Fehler
- [ ] Vercel Preview Deployment erfolgreich
- [ ] Subdomain erreichbar: https://dsgvo-check.that-clicks.de
- [ ] HTTPS aktiv auf der eigenen Domain
- [ ] Lighthouse Score: Performance ≥ 90, SEO ≥ 90

---

## Nicht-technische Qualitätsprüfung

- [ ] Alle Texte auf Deutsch
- [ ] Kein "Lorem ipsum"
- [ ] Rechtlicher Hinweis sichtbar
- [ ] Kein eigenes Google Analytics / Tracking auf dem Tool
