# REPORT_COPY.md

Alle Texte für den Scan-Report.
Sprache: Deutsch, Sie-Form.
Zielgruppe: Kleinunternehmer ohne technisches Wissen.

---

## Seiten-Kopf

```
Titel:        DSGVO-Check für {DOMAIN}
Untertitel:   Technische Ersteinschätzung vom {DATUM}
Einleitung:   Wir haben {DOMAIN} auf häufige Datenschutz- und DSGVO-Risiken geprüft.
              Die Analyse basiert auf dem HTML-Quelltext Ihrer Startseite.
              [Score-Badge]  [Anzahl Befunde]
```

---

## Gesamtbewertung (Score-Texte)

| Score | Label | Farbe | Kurztext | Langtext |
|---|---|---|---|---|
| 80–100 | Gut | grün | "Ihre Website ist gut aufgestellt." | "Wenige oder keine kritischen Datenschutzprobleme gefunden. Einige Details sollten dennoch überprüft werden — kein System ist perfekt." |
| 50–79 | Verbesserungsbedarf | gelb | "Es gibt Handlungsbedarf." | "Wir haben mehrere Punkte gefunden, die ein DSGVO-Risiko darstellen. Eine Überprüfung ist empfehlenswert." |
| 0–49 | Dringender Handlungsbedarf | rot | "Bitte handeln Sie zeitnah." | "Ihre Website hat erhebliche Datenschutzrisiken. Bei einer Abmahnung oder Prüfung könnten diese Punkte zu Problemen führen." |

---

## Status-Labels für einzelne Befunde

| Status | Icon | Label |
|---|---|---|
| ok | ✅ | Kein Problem erkannt |
| found | ⚠️ | Erkannt |
| warning | 🟡 | Warnung |
| error | 🔴 | Problem gefunden |
| info | 💡 | Hinweis |
| not_checked | ⚪ | Nicht geprüft |

---

## Befund-Texte nach Check-ID

---

### LEGAL-01 · Datenschutzerklärung vorhanden

**ok:** "Datenschutzerklärung gefunden. ✅"
**error:**
> Keine Datenschutzerklärung erkannt
>
> Auf Ihrer Startseite wurde kein Link zu einer Datenschutzerklärung gefunden.
> Eine Datenschutzerklärung ist nach Art. 13 DSGVO gesetzlich vorgeschrieben.
>
> **Empfehlung:** Erstellen Sie eine Datenschutzerklärung und verlinken Sie diese gut sichtbar im Footer Ihrer Website. Für den Anfang eignen sich Generatoren wie datenschutz-generator.de — bitte jedoch von einem Fachmann prüfen lassen.

---

### LEGAL-02 · Datenschutzerklärung im Footer

**ok:** "Datenschutz-Link im Footer vorhanden. ✅"
**warning:**
> Datenschutz-Link nicht im Footer
>
> Eine Datenschutzerklärung scheint vorhanden zu sein, aber nicht im Footer verlinkt.
>
> **Empfehlung:** Der Footer jeder Seite ist der rechtlich anerkannte Ort für den Datenschutz-Link. Ergänzen Sie diesen Link in Ihrem Footer.

---

### LEGAL-03 · Impressum vorhanden

**ok:** "Impressum gefunden. ✅"
**error:**
> Kein Impressum erkannt
>
> Kein Impressum-Link auf Ihrer Startseite gefunden. Ein Impressum ist nach § 5 TMG für alle geschäftsmäßigen Websites in Deutschland gesetzlich Pflicht.
>
> **Empfehlung:** Erstellen Sie ein vollständiges Impressum (Name, Adresse, E-Mail, ggf. Handelsregister) und verlinken Sie es von jeder Seite aus.

---

### LEGAL-04 · Impressum im Footer

**ok:** "Impressum-Link im Footer vorhanden. ✅"
**warning:**
> Impressum-Link nicht im Footer
>
> **Empfehlung:** Das Impressum sollte im Footer stehen — das ist die erwartete Position und erleichtert das Auffinden.

---

### LEGAL-05 · Datenschutzseite nennt Drittanbieter

**ok:** "Erkannte Drittanbieter in Datenschutzerklärung erwähnt. ✅"
**warning:**
> Erkannte Dienste möglicherweise nicht in Datenschutzerklärung erwähnt
>
> Wir haben {DIENSTE} auf Ihrer Website erkannt, aber keinen klaren Hinweis darauf in Ihrer Datenschutzerklärung gefunden.
>
> **Empfehlung:** Jeder Drittanbieter muss in der Datenschutzerklärung mit Zweck, Anbieter und Rechtsgrundlage beschrieben sein.

---

### LEGAL-06 · Impressum Pflichtangaben

**ok:** "Impressum enthält typische Pflichtangaben. ✅"
**warning:**
> Impressum könnte unvollständig sein
>
> Einige typische Pflichtangaben (E-Mail-Adresse, Anschrift) wurden nicht erkannt.
>
> **Empfehlung:** Ein vollständiges Impressum enthält: Vor- und Nachname / Firma, vollständige Anschrift, E-Mail-Adresse, Telefonnummer, ggf. Handelsregisternummer und USt-ID.

---

### CONSENT-01 · Cookie-Banner erkennbar

**ok:** "Cookie-Banner oder CMP erkannt. ✅"
**warning:**
> Kein Cookie-Consent-System erkannt
>
> Auf Ihrer Website wurde kein Cookie-Banner und kein bekannter Cookie-Manager gefunden.
>
> **Empfehlung:** Falls Sie Tracking-Tools (Analytics, Werbepixel) einsetzen, ist ein DSGVO-konformer Cookie-Manager Pflicht. Empfehlungen: Borlabs Cookie (WordPress), Cookiebot, Usercentrics oder CCM19.

---

### CONSENT-02 · Akzeptieren-Button

**ok:** "Akzeptieren-Option im Cookie-Banner erkannt. ✅"
**warning:**
> Kein Akzeptieren-Button im Banner erkannt
>
> **Empfehlung:** Der Akzeptieren-Button muss klar sichtbar und gleichwertig zum Ablehnen-Button sein.

---

### CONSENT-03 · Ablehnen-Button

**ok:** "Ablehnen-Option erkannt. ✅"
**warning:**
> Kein Ablehnen-Button im Cookie-Banner erkannt
>
> Ein Cookie-Banner ohne gleichwertigen Ablehnen-Button ist nach aktueller Rechtsprechung unzulässig. Abmahnungen hierfür sind häufig.
>
> **Empfehlung:** Der "Alle ablehnen"-Button muss im ersten Layer des Banners sichtbar sein — genauso prominent wie "Alle akzeptieren".

---

### CONSENT-06 · Tracking ohne Consent

**error:**
> Tracking erkannt — aber kein Cookie-Consent-System gefunden!
>
> Auf Ihrer Website wurden Tracking-Scripts erkannt ({TRACKER}), aber kein Cookie-Consent-System. Das bedeutet, dass diese Scripts ohne Einwilligung der Besucher laufen — ein klarer DSGVO-Verstoß.
>
> **Empfehlung:** Richten Sie sofort einen Cookie-Manager ein und binden Sie alle Tracking-Scripts darin ein.

---

### CONSENT-07–14 · CMP erkannt (generisch)

**info:**
> {CMP-NAME} erkannt
>
> Auf Ihrer Website läuft {CMP-NAME} — ein bekanntes Cookie-Consent-System.
>
> **Hinweis:** Das bloße Vorhandensein eines Cookie-Managers bedeutet nicht automatisch DSGVO-Konformität. Die Konfiguration (Tracking wirklich blockiert? Ablehnen-Option vorhanden?) muss korrekt sein.

---

### TRACK-01 · Google Analytics / GA4

**not_found:** "Kein Google Analytics erkannt. ✅"
**found:**
> Google Analytics / GA4 erkannt {ID}
>
> Google Analytics überträgt Nutzerdaten (Seitenaufrufe, Standort, Gerät) an Google-Server in den USA. Der Einsatz ohne gültige Einwilligung ist unzulässig.
>
> **Empfehlung:** GA4 darf erst nach aktiver Nutzer-Einwilligung laden. Binden Sie GA4 in Ihren Cookie-Manager ein und aktivieren Sie IP-Anonymisierung und Data Retention-Einstellungen.

---

### TRACK-02 · Google Tag Manager

**not_found:** "Google Tag Manager nicht erkannt. ✅"
**found:**
> Google Tag Manager erkannt {ID}
>
> GTM ist ein Container für weitere Tracking-Scripts. Ob alle darin enthaltenen Tags korrekt via Consent gesteuert werden, kann ohne JS-Ausführung nicht geprüft werden.
>
> **Empfehlung:** Stellen Sie sicher, dass alle Tags in GTM mit Consent-Trigger versehen sind. Nutzen Sie den GTM-Preview-Modus zur Überprüfung.

---

### TRACK-03 · Meta Pixel

**not_found:** "Kein Meta Pixel erkannt. ✅"
**found:**
> Meta Pixel (Facebook Tracking) erkannt
>
> Der Meta Pixel übermittelt Besucherdaten an Meta (Facebook/Instagram). Ohne Einwilligung ist er unzulässig — und ein häufiges Abmahn-Ziel.
>
> **Empfehlung:** Binden Sie den Meta Pixel in Ihren Cookie-Manager ein. Er darf erst nach "Marketing"-Einwilligung laden.

---

### TRACK-04 · LinkedIn Insight Tag

**not_found:** "Kein LinkedIn Insight Tag erkannt. ✅"
**found:**
> LinkedIn Insight Tag erkannt
>
> Das LinkedIn Insight Tag überträgt Besucherdaten an LinkedIn (Microsoft). Nur nach Einwilligung zulässig.
>
> **Empfehlung:** In Cookie-Manager einbinden, Kategorie "Marketing".

---

### TRACK-05 · TikTok Pixel

**not_found:** "Kein TikTok Pixel erkannt. ✅"
**found:**
> TikTok Pixel erkannt
>
> Der TikTok Pixel überträgt Nutzerdaten an ByteDance-Server (TikTok). Datenschutzrechtlich besonders kritisch wegen unklarer Datenverarbeitungs-Standorte.
>
> **Empfehlung:** Nur nach expliziter Marketing-Einwilligung laden.

---

### TRACK-06 · Microsoft Clarity

**not_found:** "Microsoft Clarity nicht erkannt. ✅"
**found:**
> Microsoft Clarity erkannt (Session-Aufzeichnung / Heatmaps)
>
> Microsoft Clarity zeichnet Mausklicks, Scrollverhalten und Seitennavigation auf — de facto eine vollständige Aufzeichnung des Nutzerverhaltens. Nur nach expliziter Einwilligung zulässig.
>
> **Empfehlung:** Clarity in Cookie-Manager einbinden. Klare Information der Nutzer, dass ihr Verhalten aufgezeichnet wird.

---

### TRACK-07 · Hotjar

**not_found:** "Hotjar nicht erkannt. ✅"
**found:**
> Hotjar erkannt (Session-Aufzeichnung / Heatmaps)
>
> Hotjar zeichnet Nutzerverhalten auf (Mausbewegungen, Klicks, Scrolltiefe) und erstellt Heatmaps. Nur nach Einwilligung zulässig.
>
> **Empfehlung:** Hotjar in Cookie-Manager einbinden.

---

### TRACK-08 · Mouseflow

**not_found:** "Mouseflow nicht erkannt. ✅"
**found:** > Mouseflow erkannt (Session-Aufzeichnung). Nur nach Einwilligung zulässig.

---

### TRACK-09 · Pinterest Tag

**not_found:** "Pinterest Tag nicht erkannt. ✅"
**found:** > Pinterest Conversion Tag erkannt. In Cookie-Manager einbinden.

---

### TRACK-10 · Google Ads Conversion

**not_found:** "Kein Google Ads Conversion Tracking erkannt. ✅"
**found:**
> Google Ads Conversion Tracking erkannt
>
> Google Ads Conversion Tracking überträgt Conversion-Daten an Google. Auch dieses Tool ist nur nach Einwilligung zulässig.
>
> **Empfehlung:** In Cookie-Manager einbinden, zusammen mit GA4.

---

### TRACK-11 · Floodlight

**not_found:** "Floodlight nicht erkannt. ✅"
**found:** > DoubleClick Floodlight (Google Campaign Manager) erkannt. In Cookie-Manager einbinden.

---

### TRACK-12 · Matomo

**found:**
> Matomo Analytics erkannt
>
> Matomo ist eine datenschutzfreundlichere Alternative zu Google Analytics — besonders wenn selbst gehostet. Aber auch Matomo kann consent-pflichtig sein (z.B. wenn IP-Adressen gespeichert werden).
>
> **Hinweis:** Prüfen Sie Ihre Matomo-Konfiguration: IP-Anonymisierung aktiv? Kein Cross-Site-Tracking? Dann ist kein Consent nötig.

---

### TRACK-13 · Plausible Analytics

**found:**
> Plausible Analytics erkannt
>
> Plausible ist ein cookieloser, datenschutzfreundlicher Analytics-Dienst. In der Regel kein Cookie-Consent erforderlich.
>
> **Hinweis:** ✅ Gute Wahl für datenschutzfreundliches Tracking.

---

### TRACK-14 · HubSpot Tracking

**not_found:** "HubSpot Tracking nicht erkannt. ✅"
**found:**
> HubSpot Tracking Script erkannt
>
> HubSpot trackt Besucher über mehrere Seiten und Sitzungen hinweg (Visitor Identification). Nur nach Einwilligung zulässig.
>
> **Empfehlung:** HubSpot-Tracking in Cookie-Manager einbinden, Kategorie "Marketing/Analytics".

---

### EXT-01 · Google Fonts extern

**not_found:** "Google Fonts werden nicht extern von Google-Servern geladen. ✅"
**found:**
> Google Fonts werden direkt von Google-Servern eingebunden
>
> Beim Laden der Seite wird eine Verbindung zu fonts.googleapis.com hergestellt. Dabei wird die IP-Adresse des Besuchers an Google übertragen. Das Landgericht München I hat dies 2022 mit 100 € Schadensersatz sanktioniert (Az. 3 O 17493/20).
>
> **Empfehlung:** Laden Sie die Schriftarten herunter und hosten Sie sie auf Ihrem eigenen Server. Tool: google-webfonts-helper.herokuapp.com. Alternativ: Next.js next/font (selbst-hostend per Default).

---

### EXT-02 · Adobe Fonts

**found:** > Adobe Fonts (Typekit) erkannt — lädt von Adobe-Servern. In Datenschutzerklärung erwähnen.

---

### EXT-03 · YouTube Embed (standard)

**not_found:** "Kein Standard-YouTube-Embed erkannt. ✅"
**found:**
> YouTube-Video eingebettet (Standard-URL)
>
> Standard-YouTube-Embeds (youtube.com/embed/) setzen beim Seitenaufruf sofort Cookies und übermitteln Daten an Google/YouTube — ohne dass der Nutzer auf Play drückt.
>
> **Empfehlung:** Wechseln Sie auf youtube-nocookie.com/embed/ oder nutzen Sie eine Zwei-Klick-Lösung (Video lädt erst nach Klick auf Vorschaubild).

---

### EXT-04 · YouTube nocookie

**found:**
> YouTube nocookie-URL erkannt
>
> ✅ Sie nutzen die datenschutzfreundlichere youtube-nocookie.com URL.
>
> **Hinweis:** Auch diese überträgt beim Abspielen Daten. Eine Zwei-Klick-Lösung wäre noch besser.

---

### EXT-05 · Vimeo

**found:** > Vimeo-Video eingebettet. In Datenschutzerklärung erwähnen. Ggf. Zwei-Klick-Lösung erwägen.

---

### EXT-06 · Google Maps

**not_found:** "Kein Google Maps Embed erkannt. ✅"
**found:**
> Google Maps eingebettet
>
> Google Maps überträgt beim Laden die IP-Adresse und Standortdaten des Besuchers an Google — ohne dass der Nutzer die Karte berührt.
>
> **Empfehlung:** Nutzen Sie OpenStreetMap (z.B. via OpenLayers oder Leaflet) als datenschutzfreundliche Alternative. Oder: Google Maps nur nach Einwilligung laden (Zwei-Klick).

---

### EXT-07 · reCAPTCHA

**not_found:** "Kein reCAPTCHA erkannt. ✅"
**found:**
> Google reCAPTCHA erkannt
>
> reCAPTCHA übermittelt Verhaltensdaten (Mausbewegungen, Tippverhalten) an Google zur Bot-Erkennung. In der Datenschutzerklärung zu erwähnen.
>
> **Empfehlung:** reCAPTCHA in der Datenschutzerklärung erwähnen. Alternative: hCaptcha (EXT-08) oder honeypot-Felder (kein Drittanbieter nötig).

---

### EXT-08 · hCaptcha

**found:** > hCaptcha erkannt — datenschutzfreundlichere Alternative zu reCAPTCHA. ✅

---

### EXT-09 · Calendly

**found:**
> Calendly-Terminbuchung erkannt
>
> Calendly ist ein US-amerikanischer Anbieter. Termindaten werden auf US-Servern verarbeitet.
>
> **Empfehlung:** In Datenschutzerklärung erwähnen (Zweck, Anbieter, Datenübertragung USA, Standard-Vertragsklauseln).

---

### EXT-10–15 · Marketing-Tools (Typeform, HubSpot, Mailchimp, Brevo, Klaviyo, ActiveCampaign)

**found:** > {TOOL-NAME} erkannt — US-amerikanischer Anbieter, der {Formulardaten / Kontaktdaten / E-Mail-Adressen} verarbeitet. In der Datenschutzerklärung mit Anbieter, Zweck und Rechtsgrundlage angeben.

---

### EXT-16 · Externe CDNs

**found:** > Externe CDN-Ressourcen erkannt ({LISTE}). IP-Adressen werden an diese Server übermittelt. Bei DSGVO-Audit erwähnen. Besser: Bibliotheken lokal hosten.

---

### EXT-17 · Externe Skripte allgemein

**found:** > {N} unbekannte externe Script-Quellen erkannt: {DOMAINS}. Bitte prüfen, ob diese in der Datenschutzerklärung erwähnt sind.

---

### EXT-18 · Externe iframes

**found:** > {N} externe iframes erkannt ({DOMAINS}). Externe iframes laden Inhalte von Dritten und können Daten übertragen.

---

### FORM-01 · Kontaktformular

**found:** > Kontaktformular erkannt. Stellen Sie sicher, dass die Datenverarbeitung in Ihrer Datenschutzerklärung beschrieben ist.

---

### FORM-02 · Formular ohne Datenschutzhinweis

**ok:** "Datenschutzhinweis am Formular erkannt. ✅"
**warning:**
> Formular ohne erkennbaren Datenschutzhinweis
>
> Bei Kontaktformularen ist ein Hinweis auf die Datenverarbeitung direkt am Formular Pflicht (Art. 13 DSGVO).
>
> **Empfehlung:** Ergänzen Sie direkt unter dem Formular: "Ihre Daten werden zur Bearbeitung Ihrer Anfrage verarbeitet. Weitere Infos finden Sie in unserer [Datenschutzerklärung]."

---

### FORM-03 · Newsletter

**found:** > Newsletter-Formular erkannt. Double-Opt-In Pflicht. Datenschutzhinweis direkt am Formular notwendig.

---

### FORM-04 · Bewerbungsformular

**found:** > Bewerbungsformular erkannt. Besondere DSGVO-Anforderungen (Löschfristen: 6 Monate nach Absage, Zweckbindung). In Datenschutzerklärung beschreiben.

---

### FORM-05 · Terminbuchung

**found:** > Terminbuchungs-Funktion erkannt. Verarbeitung in Datenschutzerklärung beschreiben.

---

### SEC-01 · HTTPS

**ok:** "HTTPS aktiv. Verbindung ist verschlüsselt. ✅"
**error:**
> Keine HTTPS-Verschlüsselung
>
> Ihre Website läuft ohne SSL/HTTPS. Alle übertragenen Daten (Formulareingaben, Cookies) sind unverschlüsselt. Das verstößt gegen Art. 32 DSGVO (technische Sicherheit) und wird von Browsern mit Warnung angezeigt.
>
> **Empfehlung:** SSL-Zertifikat bei Ihrem Hoster aktivieren. In den meisten Fällen kostenlos via Let's Encrypt.

---

### SEC-02 · HTTPS-Redirect

**ok:** "HTTP wird automatisch auf HTTPS weitergeleitet. ✅"
**warning:**
> Kein automatischer HTTP→HTTPS Redirect
>
> Besucher, die http:// aufrufen, werden nicht auf die sichere Version weitergeleitet.
>
> **Empfehlung:** 301-Weiterleitung in .htaccess (Apache) oder nginx-Konfiguration einrichten — oder beim Hoster als Option aktivieren.

---

### SEC-03 · Mixed Content

**ok:** "Kein Mixed Content erkannt. ✅"
**warning:**
> {N} unsichere HTTP-Ressourcen gefunden
>
> Auf Ihrer HTTPS-Seite werden Ressourcen über unverschlüsselte HTTP-URLs geladen. Browser blockieren das und zeigen Sicherheitswarnungen.
>
> **Empfehlung:** Ersetzen Sie alle http:// Ressourcen-URLs durch https://.

---

### SEC-04 · Content-Security-Policy

**ok:** "CSP Header gesetzt. ✅"
**info:** > Content-Security-Policy Header nicht gesetzt. Empfehlenswert für XSS-Schutz.

---

### SEC-05 · HSTS

**ok:** "Strict-Transport-Security (HSTS) aktiv. ✅"
**warning:** > HSTS nicht gesetzt. Browser merken sich nicht, dass immer HTTPS genutzt werden soll. Beim Hoster oder in der Server-Konfiguration aktivieren.

---

### SEC-06 · X-Content-Type-Options

**ok:** "X-Content-Type-Options: nosniff gesetzt. ✅"
**info:** > X-Content-Type-Options Header nicht gesetzt. Einfacher Sicherheits-Header, der MIME-Sniffing verhindert.

---

### SEC-07 · Referrer-Policy

**ok:** "Referrer-Policy gesetzt. ✅"
**warning:** > Kein Referrer-Policy Header. Vollständige URLs können beim Klick auf externe Links an Dritte weitergegeben werden. Empfehlung: `strict-origin-when-cross-origin`.

---

### SEC-08 · Permissions-Policy

**ok:** "Permissions-Policy gesetzt. ✅"
**info:** > Permissions-Policy Header nicht gesetzt. Optional — ermöglicht granulare Kontrolle über Browser-APIs.

---

### SEC-09 · SRI

**info:** > {N} externe Ressourcen ohne Subresource Integrity. Bei sicherheitskritischen Skripten empfehlenswert.

---

## Fehlerseiten-Texte

### URL nicht erreichbar
```
Ihre Website konnte nicht abgerufen werden.

Mögliche Ursachen:
• Die URL enthält einen Tippfehler
• Die Website ist gerade offline
• Die Website blockiert automatische Abfragen

Bitte prüfen Sie die URL und versuchen Sie es erneut.
```

### Ungültige URL
```
Die eingegebene URL ist ungültig.

Bitte geben Sie eine vollständige Website-URL ein,
zum Beispiel: https://www.ihre-website.de
```

### Timeout
```
Die Prüfung hat zu lange gedauert.

Ihre Website hat nicht innerhalb von 10 Sekunden geantwortet.
Das kann an einer langsamen Serverantwort liegen.

Bitte versuchen Sie es später erneut.
```

---

## Disclaimer (immer am Ende des Reports)

```
Rechtlicher Hinweis

Diese Analyse ist eine automatisierte technische Ersteinschätzung auf Basis des
HTML-Quellcodes Ihrer Startseite. Sie ersetzt keine Rechtsberatung und gibt keine
Garantie auf Vollständigkeit oder Richtigkeit.

Für eine rechtssichere DSGVO-Beratung empfehlen wir:
• Einen Fachanwalt für IT-Recht
• Einen zertifizierten Datenschutzbeauftragten (DSB)

— That Clicks Marketing · Manuel Schreiner · info@that-clicks.de
   www.that-clicks.de
```
