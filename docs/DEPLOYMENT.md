# DEPLOYMENT.md

Schritt-für-Schritt Anleitung zum Deployment.

---

## Voraussetzungen

- Node.js 22+
- npm
- GitHub Account
- Vercel Account (kostenlos)
- Zugang zu DNS-Einstellungen für that-clicks.de

---

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
# → http://localhost:3000

# Build testen
npm run build
npm run start
```

---

## GitHub Repository anlegen

```bash
# Im Projektverzeichnis:
git init
git add .
git commit -m "feat: initial project setup"

# GitHub Repo erstellen (via GitHub.com oder CLI)
git remote add origin https://github.com/DEIN-USERNAME/dsgvo-checker.git
git push -u origin main
```

---

## Vercel Deployment

### Erstmalig (via Vercel Dashboard)

1. https://vercel.com → Dashboard → "Add New Project"
2. GitHub Repository verbinden: `dsgvo-checker`
3. Framework: **Next.js** (wird auto-erkannt)
4. Build Command: `npm run build` (Default)
5. Output Directory: `.next` (Default)
6. Root Directory: `/` (Default)
7. Environment Variables: keine im MVP
8. "Deploy" klicken

### Automatisches Re-Deployment

Jeder Push auf `main` löst automatisch ein neues Deployment aus.

---

## Custom Domain einrichten

### In Vercel

1. Projekt-Settings → Domains
2. "dsgvo-check.that-clicks.de" eingeben
3. Vercel zeigt den benötigten DNS-Eintrag

### Beim Domain-Provider (DNS)

```
Typ:   CNAME
Name:  dsgvo-check
Wert:  cname.vercel-dns.com
TTL:   Auto
```

Alternativ kann Vercel auch A-Records vorgeben (je nach Provider).

DNS-Propagation: 5 Minuten bis 24 Stunden.

---

## Umgebungsvariablen (MVP)

Keine notwendig. Für spätere Phasen:

```bash
# Beispiel für Phase 5 (E-Mail)
RESEND_API_KEY=re_...

# Beispiel für Rate Limiting
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Monitoring

- Vercel Dashboard zeigt: Deployments, Logs, Analytics
- Function Logs: Vercel Dashboard → Functions → Logs
- Fehler: automatische Benachrichtigung per E-Mail (Vercel-Einstellung)

---

## Rollback

Bei Problemen:
1. Vercel Dashboard → Deployments
2. Letztes funktionierendes Deployment → "Promote to Production"
