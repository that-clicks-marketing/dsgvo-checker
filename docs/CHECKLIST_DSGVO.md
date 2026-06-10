# CHECKLIST_DSGVO.md

Vollständige technische Spezifikation aller DSGVO-Checks.
Grundlage für die Implementierung der Scan Engine in Phase 2.

---

## Legende

| Feld | Mögliche Werte |
|---|---|
| Automatisch prüfbar | `ja` · `teilweise` · `nein` |
| Schweregrad | `critical` · `high` · `medium` · `low` · `info` |
| Confidence | `high` · `medium` · `low` |
| MVP | `✅ Phase 2` · `🔵 Phase 3` · `⚪ Phase 4+` |

**Schweregrad-Bedeutung:**
- `critical` — klare DSGVO-Pflichtverletzung, hohes Bußgeldrisiko
- `high` — wahrscheinliche DSGVO-Verletzung, Handlungsbedarf
- `medium` — potenzielles Risiko, abhängig von Nutzung
- `low` — Best-Practice-Empfehlung, kein akutes Risiko
- `info` — datenschutzfreundliche Alternative vorhanden oder neutral

**Confidence-Bedeutung:**
- `high` — Signal ist eindeutig, Falsch-Positive sehr selten
- `medium` — Signal ist zuverlässig, aber Kontext kann Ergebnis ändern
- `low` — nur Indikator, manuelles Nachprüfen empfohlen

---

## Übersicht (alle Checks)

| ID | Name | Schweregrad | Prüfbar | MVP |
|---|---|---|---|---|
| LEGAL-01 | Datenschutzerklärung vorhanden | critical | ja | ✅ |
| LEGAL-02 | Datenschutzerklärung im Footer | high | ja | ✅ |
| LEGAL-03 | Impressum vorhanden | critical | ja | ✅ |
| LEGAL-04 | Impressum im Footer | high | ja | ✅ |
| LEGAL-05 | Datenschutzseite nennt Drittanbieter | medium | teilweise | 🔵 |
| LEGAL-06 | Impressum Pflichtangaben (grob) | medium | teilweise | 🔵 |
| CONSENT-01 | Cookie-Banner erkennbar | high | teilweise | ✅ |
| CONSENT-02 | Akzeptieren-Button erkennbar | medium | teilweise | ✅ |
| CONSENT-03 | Ablehnen-Button erkennbar | high | teilweise | ✅ |
| CONSENT-04 | Cookie-Einstellungen erkennbar | medium | teilweise | 🔵 |
| CONSENT-05 | Consent ändern / Widerruf erkennbar | medium | teilweise | 🔵 |
| CONSENT-06 | Tracking ohne Consent-Hinweis | high | teilweise | ✅ |
| CONSENT-07 | CMP: Borlabs Cookie | info | ja | ✅ |
| CONSENT-08 | CMP: Complianz | info | ja | ✅ |
| CONSENT-09 | CMP: Cookiebot | info | ja | ✅ |
| CONSENT-10 | CMP: Usercentrics | info | ja | ✅ |
| CONSENT-11 | CMP: Consentmanager | info | ja | ✅ |
| CONSENT-12 | CMP: CCM19 | info | ja | ✅ |
| CONSENT-13 | CMP: OneTrust | info | ja | ✅ |
| CONSENT-14 | CMP: iubenda | info | ja | ✅ |
| TRACK-01 | Google Analytics / GA4 | critical | ja | ✅ |
| TRACK-02 | Google Tag Manager | high | ja | ✅ |
| TRACK-03 | Meta / Facebook Pixel | critical | ja | ✅ |
| TRACK-04 | LinkedIn Insight Tag | high | ja | ✅ |
| TRACK-05 | TikTok Pixel | high | ja | ✅ |
| TRACK-06 | Microsoft Clarity | high | ja | ✅ |
| TRACK-07 | Hotjar | high | ja | ✅ |
| TRACK-08 | Mouseflow | medium | ja | 🔵 |
| TRACK-09 | Pinterest Tag | medium | ja | 🔵 |
| TRACK-10 | Google Ads Conversion | high | ja | ✅ |
| TRACK-11 | Floodlight (DoubleClick) | medium | ja | 🔵 |
| TRACK-12 | Matomo | info | ja | 🔵 |
| TRACK-13 | Plausible Analytics | info | ja | 🔵 |
| TRACK-14 | HubSpot Tracking | high | ja | ✅ |
| EXT-01 | Google Fonts extern | high | ja | ✅ |
| EXT-02 | Adobe Fonts / Typekit | medium | ja | 🔵 |
| EXT-03 | YouTube Embed (standard) | high | ja | ✅ |
| EXT-04 | YouTube nocookie Embed | low | ja | ✅ |
| EXT-05 | Vimeo Embed | medium | ja | 🔵 |
| EXT-06 | Google Maps Embed | high | ja | ✅ |
| EXT-07 | reCAPTCHA | medium | ja | ✅ |
| EXT-08 | hCaptcha | low | ja | 🔵 |
| EXT-09 | Calendly | medium | ja | 🔵 |
| EXT-10 | Typeform | medium | ja | 🔵 |
| EXT-11 | HubSpot Forms | high | ja | 🔵 |
| EXT-12 | Mailchimp | medium | ja | 🔵 |
| EXT-13 | Brevo / Sendinblue | medium | ja | 🔵 |
| EXT-14 | Klaviyo | medium | ja | 🔵 |
| EXT-15 | ActiveCampaign | medium | ja | 🔵 |
| EXT-16 | Externe CDNs (jsdelivr, unpkg, cdnjs) | low | ja | 🔵 |
| EXT-17 | Externe Skripte allgemein | low | teilweise | 🔵 |
| EXT-18 | Externe iframes allgemein | medium | teilweise | 🔵 |
| FORM-01 | Kontaktformular vorhanden | info | ja | ✅ |
| FORM-02 | Formular ohne Datenschutzhinweis | high | teilweise | ✅ |
| FORM-03 | Newsletter-Formular erkennbar | medium | teilweise | 🔵 |
| FORM-04 | Bewerbungsformular erkennbar | medium | teilweise | 🔵 |
| FORM-05 | Terminbuchung erkennbar | medium | teilweise | 🔵 |
| SEC-01 | HTTPS aktiv | critical | ja | ✅ |
| SEC-02 | HTTP→HTTPS Redirect | high | ja | ✅ |
| SEC-03 | Mixed Content | medium | teilweise | ✅ |
| SEC-04 | Content-Security-Policy Header | low | ja | 🔵 |
| SEC-05 | Strict-Transport-Security Header | medium | ja | ✅ |
| SEC-06 | X-Content-Type-Options Header | low | ja | ✅ |
| SEC-07 | Referrer-Policy Header | medium | ja | 🔵 |
| SEC-08 | Permissions-Policy Header | low | ja | 🔵 |
| SEC-09 | Unsichere externe Ressourcen | medium | teilweise | 🔵 |

**Gesamt: 63 Checks** | MVP (Phase 2): 30 | Phase 3: 28 | Phase 4+: 5

---

---

# KATEGORIE 1: Rechtstexte

---

### LEGAL-01 · Datenschutzerklärung vorhanden
**Schweregrad:** critical | **Prüfbar:** ja | **Confidence:** medium | **MVP:** ✅ Phase 2

**Beschreibung:**
Prüft, ob auf der Startseite ein Link zu einer Datenschutzerklärung zu finden ist.
Rechtliche Pflicht nach Art. 13/14 DSGVO und § 13 TMG.

**Prüflogik:**
```
Suche im gesamten HTML nach Links (<a href=...>) mit folgenden Textmustern:
  - "datenschutz" (case-insensitive)
  - "datenschutzerklärung"
  - "datenschutzrichtlinie"
  - "privacy policy"
  - "privacy"
Oder nach href-Attributen mit:
  - "/datenschutz"
  - "/privacy"
  - "datenschutz" im Pfad
```

**Mögliche Evidence:**
- `<a href="/datenschutz">Datenschutz</a>`
- `<a href="/datenschutzerklärung">Datenschutzerklärung</a>`
- `<a href="/privacy-policy">Privacy Policy</a>`

**Befund (FEHLER):** Keine Datenschutzerklärung gefunden.
**Befund (OK):** Datenschutzerklärung-Link gefunden.
**Empfehlung:** Eine Datenschutzerklärung ist Pflicht. Erstellen Sie eine und verlinken Sie sie gut sichtbar (Footer).

---

### LEGAL-02 · Datenschutzerklärung im Footer
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** medium | **MVP:** ✅ Phase 2

**Beschreibung:**
Prüft speziell den Footer-Bereich auf einen Datenschutz-Link. Der Footer ist der erwartete und rechtlich anerkannte Ort für diesen Pflichtlink.

**Prüflogik:**
```
Suche im HTML nach einem <footer>-Element oder Elementen mit
class/id "footer", "site-footer", "page-footer".
Innerhalb dieser Bereiche: Link-Suche wie LEGAL-01.
Falls kein Footer-Element: Warnung (schwächer als LEGAL-01-FEHLER).
```

**Mögliche Evidence:** `<footer><a href="/datenschutz">...</a></footer>`

**Befund (WARNUNG):** Datenschutz-Link nicht im Footer gefunden.
**Befund (OK):** Datenschutz-Link im Footer vorhanden.
**Empfehlung:** Platzieren Sie den Datenschutz-Link im Footer jeder Seite — das ist die rechtlich anerkannte Position.

---

### LEGAL-03 · Impressum vorhanden
**Schweregrad:** critical | **Prüfbar:** ja | **Confidence:** medium | **MVP:** ✅ Phase 2

**Beschreibung:**
Prüft, ob ein Impressum-Link auf der Startseite vorhanden ist. Pflicht nach § 5 TMG für geschäftsmäßige Websites.

**Prüflogik:**
```
Suche im HTML nach Links mit Textmustern:
  - "impressum"
  - "imprint"
  - "kontakt / impressum"
Oder href-Attributen mit:
  - "/impressum"
  - "/imprint"
  - "impressum" im Pfad
```

**Mögliche Evidence:** `<a href="/impressum">Impressum</a>`

**Befund (FEHLER):** Kein Impressum-Link gefunden.
**Befund (OK):** Impressum-Link gefunden.
**Empfehlung:** Das Impressum ist gesetzlich vorgeschrieben. Erstellen Sie eines mit vollständigen Pflichtangaben und verlinken Sie es im Footer.

---

### LEGAL-04 · Impressum im Footer
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** medium | **MVP:** ✅ Phase 2

**Beschreibung:**
Prüft speziell den Footer-Bereich auf einen Impressum-Link.

**Prüflogik:** Analog zu LEGAL-02, aber mit Impressum-Mustern.

**Mögliche Evidence:** `<footer><a href="/impressum">Impressum</a></footer>`

**Befund (WARNUNG):** Impressum-Link nicht im Footer.
**Befund (OK):** Impressum-Link im Footer vorhanden.
**Empfehlung:** Platzieren Sie das Impressum im Footer für maximale Erreichbarkeit.

---

### LEGAL-05 · Datenschutzseite nennt erkannte Drittanbieter
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Beschreibung:**
Prüft, ob die Datenschutzseite Hinweise zu den erkannten Drittanbietern enthält.
Nur sinnvoll nach LEGAL-01 bestanden und nach Abschluss der Tracking-Checks.

**Prüflogik:**
```
Falls Datenschutz-URL bekannt (aus LEGAL-01):
  Fetch der Datenschutz-URL.
  Suche nach Namen erkannter Tracker (Google, Meta, etc.) im Text.
  Einfache String-Übereinstimmung, keine semantische Analyse.
```

**Mögliche Evidence:** "Google Analytics" im Text der Datenschutzseite.

**Befund (WARNUNG):** Erkannter Tracker [Name] nicht in Datenschutzerklärung erwähnt.
**Befund (OK):** Erkannte Drittanbieter scheinen erwähnt zu sein.
**Empfehlung:** Jeder Drittanbieter muss in der Datenschutzerklärung mit Zweck und Rechtsgrundlage beschrieben sein.

---

### LEGAL-06 · Impressum Pflichtangaben (grob)
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Beschreibung:**
Prüft grob, ob die Impressum-Seite typische Pflichtangaben enthält.
Keine vollständige rechtliche Prüfung möglich.

**Prüflogik:**
```
Falls Impressum-URL bekannt:
  Fetch der Impressum-URL.
  Suche nach: E-Mail-Muster, Telefonnummer-Muster, Adress-Muster (Straße, PLZ).
  Treffer = wahrscheinlich vollständig.
  Kein Treffer = Hinweis auf möglicherweise unvollständiges Impressum.
```

**Mögliche Evidence:** Regex für E-Mail, Tel., PLZ im Seitentext.

**Befund (WARNUNG):** Impressum könnte unvollständig sein (keine E-Mail oder Adresse erkannt).
**Befund (OK):** Impressum enthält typische Pflichtangaben.
**Empfehlung:** Prüfen Sie, ob Name, Adresse, E-Mail, ggf. Handelsregisternummer und USt-ID enthalten sind.

---

---

# KATEGORIE 2: Cookies & Consent

---

### CONSENT-01 · Cookie-Banner erkennbar
**Schweregrad:** high | **Prüfbar:** teilweise | **Confidence:** medium | **MVP:** ✅ Phase 2

**Beschreibung:**
Prüft, ob ein Cookie-Consent-Banner im HTML vorhanden ist.
Wichtig: Banner wird oft per JS nach dem Laden eingefügt → im rohen HTML nicht immer erkennbar.
Dieser Check kombiniert CMP-Erkennung (CONSENT-07–14) mit generischen Mustern.

**Prüflogik:**
```
Treffer wenn eines der CMP-Signale (CONSENT-07–14) erkannt ODER:
  HTML enthält Elemente mit id/class/data-Attributen wie:
    "cookie", "consent", "gdpr", "dsgvo", "cookiebanner",
    "cc-window", "cookie-notice", "cookie-law"
  ODER: Inline-Script enthält "cookieconsent", "CookieConsent"
```

**Mögliche Evidence:** `<div id="cookiebanner">`, `class="cookie-consent"`, CMP-Script

**Befund (WARNUNG):** Kein Cookie-Banner oder CMP erkannt — bei Einsatz von Tracking ein Problem.
**Befund (OK):** Cookie-Banner oder CMP erkannt.
**Empfehlung:** Falls Sie Tracking-Tools einsetzen, ist ein DSGVO-konformer Cookie-Manager Pflicht.

---

### CONSENT-02 · Akzeptieren-Button erkennbar
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** ✅ Phase 2

**Beschreibung:**
Prüft, ob ein Akzeptieren-Button im Kontext eines Cookie-Banners vorhanden ist.

**Prüflogik:**
```
Nur relevant wenn CONSENT-01 positiv.
Suche nach Button/Link mit Text:
  "akzeptieren", "zustimmen", "accept", "agree", "ok", "alle akzeptieren",
  "ich stimme zu", "einverstanden"
(case-insensitive, innerhalb ±2000 Zeichen um erkannte Banner-Region)
```

**Befund (INFO):** Akzeptieren-Option erkannt.
**Befund (WARNUNG):** Kein Akzeptieren-Button gefunden (nur relevant bei erkanntem Banner).
**Empfehlung:** Der Akzeptieren-Button muss klar erkennbar und gleichwertig zum Ablehnen sein.

---

### CONSENT-03 · Ablehnen-Button erkennbar
**Schweregrad:** high | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** ✅ Phase 2

**Beschreibung:**
Prüft, ob eine Ablehnen-Option im Cookie-Banner erkennbar ist.
Seit EuGH-Urteilen (Planet49, etc.) und Abmahnwellen ist ein gleichwertiger Ablehnen-Button Pflicht.

**Prüflogik:**
```
Nur relevant wenn CONSENT-01 positiv.
Suche nach Button/Link mit Text:
  "ablehnen", "nicht zustimmen", "decline", "reject", "deny",
  "nur notwendige", "necessary only", "verweigern"
(case-insensitive)
```

**Befund (WARNUNG):** Kein Ablehnen-Button im Banner erkannt.
**Befund (OK):** Ablehnen-Option erkannt.
**Empfehlung:** Ein gleichwertiger Ablehnen-Button im ersten Banner-Layer ist nach aktueller Rechtsprechung Pflicht.

---

### CONSENT-04 · Cookie-Einstellungen erkennbar
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Beschreibung:**
Prüft, ob differenzierte Cookie-Einstellungen (granulare Kontrolle) angeboten werden.

**Prüflogik:**
```
Suche nach Text/Links: "einstellungen", "settings", "konfigurieren",
  "anpassen", "customize", "mehr optionen", "preferences"
im Kontext des erkannten Banners.
```

**Befund (INFO):** Cookie-Einstellungen erkennbar.
**Empfehlung:** Granulare Einstellungen (einzelne Kategorien) sind Best Practice und empfehlenswert.

---

### CONSENT-05 · Consent ändern / Widerruf erkennbar
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Beschreibung:**
Prüft, ob Nutzer ihre Einwilligung nachträglich ändern oder widerrufen können.
Nach Art. 7 Abs. 3 DSGVO muss der Widerruf so einfach sein wie die Einwilligung.

**Prüflogik:**
```
Suche nach Text: "widerruf", "einwilligung widerrufen", "consent ändern",
  "datenschutz-einstellungen", "cookie-einstellungen öffnen",
  Link zu Datenschutz-Seite mit Consent-Management-Bereich.
```

**Befund (WARNUNG):** Kein erkennbarer Weg, Consent zu ändern.
**Empfehlung:** Stellen Sie sicher, dass Nutzer ihre Einwilligung jederzeit widerrufen können (z.B. via Footer-Link oder Cookie-Einstellungs-Button).

---

### CONSENT-06 · Tracking erkannt, aber kein Consent-Hinweis
**Schweregrad:** high | **Prüfbar:** teilweise | **Confidence:** medium | **MVP:** ✅ Phase 2

**Beschreibung:**
Kombinierter Check: Wenn Tracking-Scripts erkannt werden (TRACK-01–14),
aber KEIN Cookie-Banner erkannt wird (CONSENT-01 negativ) → kritische Warnung.

**Prüflogik:**
```
IF (mindestens ein TRACK-Check positiv) AND (CONSENT-01 negativ)
  THEN: Hochrisiko-Befund ausgeben
```

**Befund (HIGH):** Tracking erkannt, aber kein Cookie-Consent-System gefunden.
**Empfehlung:** Sie nutzen Tracking-Tools ohne erkennbare Einwilligungslösung. Das ist ein klarer DSGVO-Verstoß.

---

### CONSENT-07 · CMP: Borlabs Cookie
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script-src oder inline Script enthält `borlabs-cookie`, `BorlabsCookie`; Cookie `borlabs-cookie` gesetzt.

**Befund (INFO):** Borlabs Cookie erkannt — bekannter DSGVO-konformer Cookie-Manager für WordPress.
**Hinweis:** Nur weil ein CMP vorhanden ist, bedeutet das nicht automatisch korrekte Konfiguration.

---

### CONSENT-08 · CMP: Complianz
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script enthält `complianz`, `cmplz`; Link zu complianz.io; class `cmplz-`.

**Befund (INFO):** Complianz erkannt — Cookie-Manager für WordPress.

---

### CONSENT-09 · CMP: Cookiebot
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script-src enthält `cookiebot.com` oder `consent.cookiebot.com`; data-Attribute `data-cookieconsent`.

**Befund (INFO):** Cookiebot erkannt — weit verbreitete europäische CMP.

---

### CONSENT-10 · CMP: Usercentrics
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script-src enthält `app.usercentrics.eu`, `usercentrics.eu`; id `usercentrics-root`.

**Befund (INFO):** Usercentrics erkannt — professionelle CMP (kostenpflichtig).

---

### CONSENT-11 · CMP: Consentmanager
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script-src enthält `cdn.consentmanager.net` oder `delivery.consentmanager.net`.

**Befund (INFO):** Consentmanager.net erkannt.

---

### CONSENT-12 · CMP: CCM19
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script enthält `ccm19.de`; Element `#ccm19`; Cookie `ccm_consent`.

**Befund (INFO):** CCM19 erkannt — deutsche CMP von Papoo Software.

---

### CONSENT-13 · CMP: OneTrust
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script-src enthält `cdn.cookielaw.org`, `onetrust`; id `onetrust-banner-sdk`.

**Befund (INFO):** OneTrust erkannt — Enterprise-CMP, auch bei größeren Websites.

---

### CONSENT-14 · CMP: iubenda
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** Script-src enthält `cdn.iubenda.com`; class `iubenda`; iubenda-Links im HTML.

**Befund (INFO):** iubenda erkannt — CMP mit integrierten Datenschutz-Dokumenten.

---

---

# KATEGORIE 3: Tracking & Marketing

*Wichtiger Hinweis zu allen Tracking-Checks:*
*Der Befund ist immer "erkannt" oder "nicht erkannt" — ob das Tool DSGVO-konform*
*eingebunden ist (z.B. hinter Consent), kann ohne JS-Rendering nicht zuverlässig*
*geprüft werden. Report-Text soll das kommunizieren.*

---

### TRACK-01 · Google Analytics / GA4
**Schweregrad:** critical | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Beschreibung:**
Google Analytics ist das meistverwendete Tracking-Tool. Ohne valide Einwilligung (aktiv, informiert, freiwillig) ist der Einsatz nach aktueller Rechtslage (u.a. DSB Austria, LfDI BW) unzulässig.

**Prüflogik:**
```
Script-src enthält:
  - "google-analytics.com/analytics.js"
  - "google-analytics.com/ga.js"
  - "googletagmanager.com/gtag/js"
  - "googletagmanager.com/gtm.js" (→ TRACK-02)
Inline-Script enthält:
  - "gtag(" oder "ga(" mit gängigen GA-Parametern
  - "G-XXXXXXXXXX" (GA4 Mess-ID Muster)
  - "UA-XXXXXXXX" (Universal Analytics ID Muster)
```

**Mögliche Evidence:** `<script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX">`

**Befund (FUND):** Google Analytics / GA4 erkannt (ID: {ID falls extrahierbar}).
**Befund (NICHT ERKANNT):** Kein Google Analytics im HTML-Quelltext erkannt.
**Empfehlung:** GA4 darf nur nach aktiver Einwilligung laden. Binden Sie es in Ihren Cookie-Manager ein.

---

### TRACK-02 · Google Tag Manager
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Beschreibung:**
GTM selbst ist kein Tracking-Tool, aber ein Container für beliebige Scripts (inkl. GA, Meta Pixel etc.). Sein Vorhandensein ist ein starker Indikator für datenschutzrelevante Tags.

**Prüflogik:**
```
Script-src oder inline-Script enthält:
  - "googletagmanager.com/gtm.js"
  - "GTM-" gefolgt von Großbuchstaben/Zahlen
  - noscript-iframe mit "googletagmanager.com/ns.html"
```

**Mögliche Evidence:** `<!-- Google Tag Manager -->` + `GTM-XXXXXXX`

**Befund (FUND):** Google Tag Manager erkannt (Container-ID: {GTM-ID}).
**Empfehlung:** GTM lädt häufig Tracking-Scripts. Stellen Sie sicher, dass alle darin enthaltenen Tags korrekt via Consent gesteuert werden.

---

### TRACK-03 · Meta / Facebook Pixel
**Schweregrad:** critical | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "connect.facebook.net"
Inline-Script enthält: "fbq(" oder "facebook pixel" oder "_fbp"
noscript-img mit: "facebook.com/tr?"
```

**Mögliche Evidence:** `<script src="https://connect.facebook.net/en_US/fbevents.js">`

**Befund (FUND):** Meta Pixel (Facebook Tracking) erkannt.
**Empfehlung:** Meta Pixel darf nur nach Einwilligung laden. Über den Consent-Manager steuern.

---

### TRACK-04 · LinkedIn Insight Tag
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "snap.licdn.com" oder "platform.linkedin.com/in.js"
Inline-Script enthält: "_linkedin_partner_id" oder "lintrk("
img-src enthält: "px.ads.linkedin.com"
```

**Befund (FUND):** LinkedIn Insight Tag erkannt.
**Empfehlung:** LinkedIn-Tracking nur nach Einwilligung laden.

---

### TRACK-05 · TikTok Pixel
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "analytics.tiktok.com" oder "tiktok-pixel"
Inline-Script enthält: "ttq.load(" oder "TiktokAnalyticsObject"
```

**Befund (FUND):** TikTok Pixel erkannt.
**Empfehlung:** TikTok-Tracking nur nach Einwilligung.

---

### TRACK-06 · Microsoft Clarity
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "clarity.ms"
Inline-Script enthält: "clarity(" oder "ms.clarity"
```

**Befund (FUND):** Microsoft Clarity (Session-Recording / Heatmap) erkannt.
**Empfehlung:** Clarity zeichnet Mausklicks und Seitenverhalten auf — nur nach expliziter Einwilligung zulässig.

---

### TRACK-07 · Hotjar
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "static.hotjar.com" oder "script.hotjar.com"
Inline-Script enthält: "hjSetting" oder "(h,o,t,j,a,r)"
```

**Befund (FUND):** Hotjar (Session-Recording / Heatmap) erkannt.
**Empfehlung:** Hotjar zeichnet Nutzerverhalten auf. Nur nach Einwilligung zulässig.

---

### TRACK-08 · Mouseflow
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script-src enthält `cdn.mouseflow.com`; inline enthält `mouseflow.start`.

**Befund (FUND):** Mouseflow (Session-Aufzeichnung) erkannt.

---

### TRACK-09 · Pinterest Tag
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script-src enthält `ct.pinterest.com`; inline enthält `pintrk(`.

**Befund (FUND):** Pinterest Conversion Tag erkannt.

---

### TRACK-10 · Google Ads Conversion Tracking
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** medium | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "googleadservices.com/pagead/conversion"
Inline-Script enthält: "AW-" (Google Ads Conversion-ID Muster) + gtag-Aufruf
img-src enthält: "googleadservices.com"
```

**Befund (FUND):** Google Ads Conversion Tracking erkannt.
**Empfehlung:** Auch Google Ads Conversion Tracking ist nur nach Einwilligung zulässig.

---

### TRACK-11 · Floodlight (DoubleClick / Campaign Manager)
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** medium | **MVP:** 🔵 Phase 3

**Prüflogik:** Script oder img-src enthält `doubleclick.net`, `fls.doubleclick.net`, `floodlight`.

**Befund (FUND):** DoubleClick Floodlight erkannt.

---

### TRACK-12 · Matomo
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** medium | **MVP:** 🔵 Phase 3

**Beschreibung:**
Matomo ist datenschutzfreundlicher als GA4, kann aber je nach Konfiguration trotzdem
consent-pflichtig sein (IP-Tracking, Cross-Site-Tracking deaktiviert?).

**Prüflogik:** Script-src oder inline enthält `matomo.js`, `piwik.js`, `Matomo.`, `_paq.push`.

**Befund (INFO):** Matomo Analytics erkannt — datenschutzfreundlichere Alternative, aber Konfiguration prüfen.
**Empfehlung:** Matomo kann DSGVO-konform ohne Consent betrieben werden (anonymisierte IPs, kein Fingerprinting). Prüfen Sie Ihre Konfiguration.

---

### TRACK-13 · Plausible Analytics
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script-src enthält `plausible.io/js`.

**Befund (INFO):** Plausible Analytics erkannt — cookielose, datenschutzfreundliche Alternative.
**Hinweis:** Plausible benötigt in der Regel keinen Cookie-Consent.

---

### TRACK-14 · HubSpot Tracking
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "js.hs-scripts.com" oder "js.hubspot.com" oder "js.hsforms.net"
Inline-Script enthält: "_hsq" oder "hubspot"
```

**Befund (FUND):** HubSpot Tracking Script erkannt.
**Empfehlung:** HubSpot-Tracking (inkl. Besucher-Tracking) nur nach Einwilligung.

---

---

# KATEGORIE 4: Externe Dienste

---

### EXT-01 · Google Fonts extern
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Beschreibung:**
Externe Google Fonts übermitteln die IP-Adresse des Besuchers an Google.
Das LG München I hat dies 2022 mit 100 € Schadensersatz sanktioniert (Az. 3 O 17493/20).

**Prüflogik:**
```
Link-href enthält: "fonts.googleapis.com"
Style-Attribut oder <style>-Block enthält: "@import url('https://fonts.googleapis.com"
Preconnect-Link zu: "fonts.googleapis.com" oder "fonts.gstatic.com"
```

**Mögliche Evidence:** `<link href="https://fonts.googleapis.com/css?family=...">`

**Befund (FUND):** Google Fonts werden direkt von Google-Servern geladen.
**Empfehlung:** Schriftarten lokal hosten (google-webfonts-helper.herokuapp.com) oder next/font nutzen. Kein Consent nötig bei lokalem Hosting.

---

### EXT-02 · Adobe Fonts / Typekit
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script/link-src enthält `use.typekit.net` oder `use.typekit.com`.

**Befund (FUND):** Adobe Fonts (Typekit) erkannt — lädt von externen Adobe-Servern.
**Empfehlung:** Adobe Fonts in Datenschutzerklärung erwähnen und ggf. lokal hosten.

---

### EXT-03 · YouTube Embed (standard)
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Beschreibung:**
Standard-YouTube-Embeds (`youtube.com/embed/`) setzen sofort Cookies und übermitteln
Daten an Google/YouTube — auch ohne Play-Button.

**Prüflogik:**
```
iframe-src enthält: "youtube.com/embed/" oder "www.youtube.com/embed/"
(nicht: youtube-nocookie.com → das ist EXT-04)
```

**Befund (FUND):** YouTube-Video eingebettet (Standard-URL — setzt sofort Cookies).
**Empfehlung:** Wechseln Sie zu youtube-nocookie.com oder nutzen Sie eine Zwei-Klick-Lösung (Video lädt erst nach Klick).

---

### EXT-04 · YouTube nocookie Embed
**Schweregrad:** low | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** iframe-src enthält `youtube-nocookie.com`.

**Befund (INFO):** YouTube-Video mit datenschutzfreundlicher nocookie-URL eingebettet. ✓
**Hinweis:** Auch youtube-nocookie sendet Daten beim Abspielen — ggf. Zwei-Klick-Lösung erwägen.

---

### EXT-05 · Vimeo Embed
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** iframe-src enthält `player.vimeo.com`.

**Befund (FUND):** Vimeo-Video eingebettet — überträgt Daten an Vimeo/Fastly-Server.
**Empfehlung:** In Datenschutzerklärung erwähnen, ggf. Zwei-Klick-Lösung nutzen.

---

### EXT-06 · Google Maps Embed
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Beschreibung:**
Google Maps-Einbettungen senden die IP-Adresse und weitere Daten an Google.
Ohne Consent nicht DSGVO-konform.

**Prüflogik:**
```
iframe-src enthält: "maps.google.com" oder "google.com/maps" oder "maps.googleapis.com"
Script-src enthält: "maps.googleapis.com/maps/api/js"
```

**Befund (FUND):** Google Maps eingebettet — überträgt Daten an Google.
**Empfehlung:** Nutzen Sie eine datenschutzfreundliche Kartenalternative (z.B. OpenStreetMap) oder laden Sie Google Maps nur nach Einwilligung.

---

### EXT-07 · reCAPTCHA
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:**
```
Script-src enthält: "google.com/recaptcha" oder "recaptcha/api.js"
HTML enthält: "g-recaptcha" class/attribute
```

**Befund (FUND):** Google reCAPTCHA erkannt — überträgt Verhaltensdaten an Google.
**Empfehlung:** reCAPTCHA in der Datenschutzerklärung erwähnen. Alternativ: hCaptcha (EXT-08) oder honeypot-basierter Spam-Schutz.

---

### EXT-08 · hCaptcha
**Schweregrad:** low | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script-src enthält `hcaptcha.com`; HTML enthält `h-captcha`.

**Befund (INFO):** hCaptcha erkannt — datenschutzfreundlichere Alternative zu reCAPTCHA.

---

### EXT-09 · Calendly
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** iframe-src oder script enthält `calendly.com`; Link mit `calendly.com`.

**Befund (FUND):** Calendly-Terminbuchung erkannt — US-amerikanischer Anbieter.
**Empfehlung:** Calendly in Datenschutzerklärung erwähnen. Datenübertragung in USA (Standard-Contractual Clauses prüfen).

---

### EXT-10 · Typeform
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** iframe-src oder script enthält `typeform.com`; embed.typeform.com.

**Befund (FUND):** Typeform-Formular erkannt — US-amerikanischer Anbieter.

---

### EXT-11 · HubSpot Forms
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script-src enthält `js.hsforms.net` oder `forms.hsforms.com`; HTML enthält `hbspt.forms.create`.

**Befund (FUND):** HubSpot-Formular erkannt — überträgt Formular-Daten + Tracking an HubSpot (US).

---

### EXT-12 · Mailchimp
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script oder link-src enthält `list-manage.com`, `mailchimp.com`, `chimpstatic.com`.

**Befund (FUND):** Mailchimp erkannt (Newsletter-Embed oder Tracking).

---

### EXT-13 · Brevo / Sendinblue
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script enthält `sibautomation.com`, `brevo.com`, `sendinblue.com`.

**Befund (FUND):** Brevo / Sendinblue erkannt.

---

### EXT-14 · Klaviyo
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script-src enthält `static.klaviyo.com`; inline enthält `klaviyo.push`.

**Befund (FUND):** Klaviyo (E-Commerce-Marketing) erkannt.

---

### EXT-15 · ActiveCampaign
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** Script-src enthält `trackcmp.net` oder `activehosted.com`.

**Befund (FUND):** ActiveCampaign Tracking erkannt.

---

### EXT-16 · Externe CDNs
**Schweregrad:** low | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:**
```
Script/link-src enthält: "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com",
  "ajax.googleapis.com", "maxcdn.bootstrapcdn.com", "stackpath.bootstrapcdn.com"
```

**Befund (INFO):** Externe CDN-Ressourcen erkannt — übermitteln IP-Adressen an Drittanbieter.
**Empfehlung:** Bibliotheken lokal hosten, besonders bei höherem Traffic.

---

### EXT-17 · Externe Skripte allgemein
**Schweregrad:** low | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Prüflogik:** Alle Script-src-Attribute, die nicht zur eigenen Domain gehören und nicht bereits durch andere Checks erfasst sind. Limit: max 10 unbekannte externe Domains melden.

**Befund (INFO):** {N} externe Script-Quellen erkannt: {Liste}.

---

### EXT-18 · Externe iframes allgemein
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Prüflogik:** Alle iframe-src-Attribute, die nicht zur eigenen Domain gehören und nicht bereits durch andere Checks erfasst sind.

**Befund (INFO):** {N} externe iframes erkannt.

---

---

# KATEGORIE 5: Formulare

---

### FORM-01 · Kontaktformular vorhanden
**Schweregrad:** info | **Prüfbar:** ja | **Confidence:** medium | **MVP:** ✅ Phase 2

**Beschreibung:**
Reine Detektion. Kontaktformulare verarbeiten personenbezogene Daten und müssen in der Datenschutzerklärung erwähnt sein.

**Prüflogik:**
```
HTML enthält <form>-Element mit:
  - input type="email" oder input type="text" mit name-Attribut
  - UND: kein data-* Attribut das auf Suche/Filter hindeutet
  - UND: kein class/action der auf Login/Register hindeutet
  Oder: Klasse/ID enthält "contact", "kontakt"
```

**Befund (INFO):** Kontaktformular erkannt — stellt sicher, dass es in der Datenschutzerklärung erwähnt ist.

---

### FORM-02 · Formular ohne sichtbaren Datenschutzhinweis
**Schweregrad:** high | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** ✅ Phase 2

**Beschreibung:**
Bei Formularen ist ein Hinweis auf die Datenverarbeitung direkt am Formular Pflicht (Art. 13 DSGVO).

**Prüflogik:**
```
Falls FORM-01 positiv:
  Prüfe ±500 Zeichen um das <form>-Element auf:
    - Links mit "datenschutz", "privacy"
    - Text wie "Daten", "DSGVO", "Datenschutzhinweis", "Einwilligung"
    - <input type="checkbox"> mit Datenschutz-bezogenem Label
  Kein Treffer → Warnung
```

**Befund (WARNUNG):** Formular ohne erkennbaren Datenschutzhinweis.
**Empfehlung:** Fügen Sie direkt am Formular einen Hinweis hinzu: wer die Daten verarbeitet, zu welchem Zweck und einen Link zur Datenschutzerklärung.

---

### FORM-03 · Newsletter-Formular erkennbar
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** medium | **MVP:** 🔵 Phase 3

**Prüflogik:**
```
Form/Section enthält Schlüsselwörter: "newsletter", "anmeldung", "subscribe",
  "e-mail" + "abonnieren", "kostenlos" + input[type=email]
```

**Befund (INFO):** Newsletter-Anmeldung erkannt.
**Empfehlung:** Double-Opt-In ist für Newsletter Pflicht. Datenschutzhinweis direkt am Formular notwendig.

---

### FORM-04 · Bewerbungsformular erkennbar
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Prüflogik:** Formular + Schlüsselwörter: "bewerbung", "stellenangebot", "karriere", "lebenslauf", input[type=file].

**Befund (INFO):** Bewerbungsformular erkennbar — besonderer Datenschutzbedarf (Bewerberdaten).
**Empfehlung:** Für Bewerberdaten gelten besondere DSGVO-Anforderungen (Löschfristen, Zweckbindung).

---

### FORM-05 · Terminbuchung erkennbar
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Prüflogik:** Formular oder Links mit: "termin", "buchung", "appointment", "reservierung"; Calendly/Typeform bereits in EXT-09/10 abgedeckt.

**Befund (INFO):** Terminbuchung erkennbar.
**Empfehlung:** Terminbuchungssysteme verarbeiten Gesundheitsdaten (bei Ärzten) oder Kontaktdaten — in Datenschutzerklärung erwähnen.

---

---

# KATEGORIE 6: Technische Sicherheit

---

### SEC-01 · HTTPS aktiv
**Schweregrad:** critical | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Beschreibung:**
HTTPS ist Pflicht nach Art. 32 DSGVO (technische Sicherheit) und seit 2018 Standard.
Ohne HTTPS werden alle Daten im Klartext übertragen.

**Prüflogik:** Prüfe das Protokoll der eingegebenen (oder aufgelösten) URL: `http://` → Fehler, `https://` → OK.

**Befund (FEHLER):** Ihre Website läuft nicht über HTTPS.
**Befund (OK):** HTTPS aktiv. ✓
**Empfehlung:** Aktivieren Sie ein SSL-Zertifikat (kostenlos via Let's Encrypt) bei Ihrem Hoster.

---

### SEC-02 · HTTP→HTTPS Redirect
**Schweregrad:** high | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Beschreibung:**
Auch wenn HTTPS aktiv ist, muss `http://` automatisch auf `https://` weitergeleitet werden.

**Prüflogik:**
```
Fetch: http://{domain} mit max 1 Redirect
  Response Status 301/302 AND Location-Header enthält https:// → OK
  Response Status 200 ohne Redirect → WARNUNG
  Verbindungsfehler → nicht prüfbar
```

**Befund (WARNUNG):** Kein automatischer Redirect von HTTP auf HTTPS.
**Befund (OK):** HTTP wird automatisch auf HTTPS weitergeleitet. ✓
**Empfehlung:** Richten Sie eine permanente 301-Weiterleitung von HTTP auf HTTPS ein.

---

### SEC-03 · Mixed Content
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** ✅ Phase 2

**Beschreibung:**
Mixed Content: eine HTTPS-Seite lädt Ressourcen über HTTP. Browser blockieren das, Nutzer sehen Fehler.

**Prüflogik:**
```
Nur relevant wenn SEC-01 OK.
HTML-Scan nach: src="http://", href="http://", url('http://
Ausnahmen: localhost, 127.0.0.1
Max. 5 Treffer melden.
```

**Befund (WARNUNG):** {N} unsichere HTTP-Ressourcen auf HTTPS-Seite gefunden.
**Empfehlung:** Ersetzen Sie alle http:// Ressourcen-URLs durch https://.

---

### SEC-04 · Content-Security-Policy Header
**Schweregrad:** low | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** HTTP-Response-Header `Content-Security-Policy` vorhanden.

**Befund (INFO):** Content-Security-Policy Header nicht gesetzt.
**Empfehlung:** CSP schützt vor XSS-Angriffen und kann externe Script-Quellen einschränken.

---

### SEC-05 · Strict-Transport-Security (HSTS)
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** HTTP-Response-Header `Strict-Transport-Security` vorhanden.

**Befund (WARNUNG):** HSTS-Header nicht gesetzt.
**Befund (OK):** HSTS aktiv. ✓
**Empfehlung:** HSTS verhindert Downgrade-Angriffe auf HTTP. Bei Ihrem Hoster oder in der Server-Konfiguration aktivieren.

---

### SEC-06 · X-Content-Type-Options
**Schweregrad:** low | **Prüfbar:** ja | **Confidence:** high | **MVP:** ✅ Phase 2

**Prüflogik:** HTTP-Response-Header `X-Content-Type-Options: nosniff` vorhanden.

**Befund (INFO):** X-Content-Type-Options Header nicht gesetzt.
**Empfehlung:** `nosniff` verhindert MIME-Type-Sniffing. Einfach und schnell aktivierbar.

---

### SEC-07 · Referrer-Policy
**Schweregrad:** medium | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Beschreibung:**
Ohne Referrer-Policy werden vollständige URLs der Besucher an externe Dienste weitergegeben.

**Prüflogik:** HTTP-Response-Header `Referrer-Policy` vorhanden. Wert prüfen: `strict-origin-when-cross-origin` oder restriktiver gilt als OK.

**Befund (WARNUNG):** Kein Referrer-Policy Header — URLs werden ggf. an Drittanbieter übermittelt.
**Befund (OK):** Referrer-Policy gesetzt. ✓

---

### SEC-08 · Permissions-Policy
**Schweregrad:** low | **Prüfbar:** ja | **Confidence:** high | **MVP:** 🔵 Phase 3

**Prüflogik:** HTTP-Response-Header `Permissions-Policy` vorhanden.

**Befund (INFO):** Permissions-Policy Header nicht gesetzt.
**Empfehlung:** Erlaubt granulare Kontrolle über Browser-APIs (Kamera, Mikrofon, Geolocation).

---

### SEC-09 · Unsichere externe Ressourcen
**Schweregrad:** medium | **Prüfbar:** teilweise | **Confidence:** low | **MVP:** 🔵 Phase 3

**Beschreibung:**
Externe Skripte oder Stylesheets ohne Subresource Integrity (SRI) können bei einem Angriff auf den externen Server manipuliert werden.

**Prüflogik:**
```
Script/link-Tags mit externem src/href ohne integrity-Attribut.
Nur externe Ressourcen, nicht die eigene Domain.
```

**Befund (INFO):** {N} externe Ressourcen ohne Integritätsprüfung (SRI).

---

---

# Systemlogik: Score & Priorisierung

---

### SCORE-01 · DSGVO-Risiko-Score
**Berechnung:**
```
Startpunkt: 100 (maximale Punktzahl = kein Risiko)
Abzüge je Befund:
  critical:  -20 Punkte
  high:      -10 Punkte
  medium:     -5 Punkte
  low:        -2 Punkte
  info:        0 Punkte
Minimum: 0

Score 80–100: Gut (grün)
Score 50–79:  Verbesserungsbedarf (gelb)
Score 0–49:   Handlungsbedarf (rot)
```

---

### SCORE-02 · Issue-Priorisierung im Report
```
Reihenfolge der Befunde im Report:
1. critical (rot) — zuerst
2. high (orange)
3. medium (gelb)
4. low (blau)
5. info (grau)
Innerhalb gleicher Schwere: alphabetisch nach ID
```

---

### SCORE-03 · CTA-Logik je Score
```
Score 0–49:   "Dringende Empfehlung" → direkter CTA + Kontaktformular
Score 50–79:  "Empfehlung" → Standard-CTA
Score 80–100: "Herzlichen Glückwunsch" + Soft-CTA
```

---

## Technische Einschränkungen

1. **Kein JS-Rendering** — reine HTML-Analyse. SPAs mit komplett dynamischem Inhalt können viele Checks falsch-negativ liefern.
2. **Nur Startseite** — keine Unterseiten, keine Unterseiten-Formulare.
3. **Kein Cookie-Interaktion** — Cookie-Banner der zu prüfenden Website wird nicht angeklickt. Tracking-Scripts können durch den Banner blockiert sein und werden trotzdem im Quelltext gefunden.
4. **Timeout 10 Sekunden** — langsame oder nicht erreichbare Websites führen zu Abbruch.
5. **Keine Rechtsberatung** — alle Befunde sind technische Indikatoren, keine Rechtsgutachten.
6. **Geoblocking** — Websites, die EU-Traffic blockieren, können nicht analysiert werden.
