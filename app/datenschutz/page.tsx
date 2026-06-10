import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – DSGVO Checker',
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#f9fafb]">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">1. Verantwortlicher</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              That Clicks Marketing, Manuel Schreiner<br />
              E-Mail: info@that-clicks.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              2. Verarbeitung personenbezogener Daten
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Dieses Tool speichert <strong>keine personenbezogenen Daten</strong>. Es werden keine
              Nutzerkonten, keine Analysedaten und keine Tracking-Cookies eingesetzt. Jeder Scan-Vorgang
              ist zustandslos und wird nicht protokolliert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">3. Scan-Funktion</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Wenn Sie eine URL zum Scannen eingeben, wird eine HTTP-Anfrage von unseren Servern
              (Vercel, Region Frankfurt) an die eingegebene Website gestellt. Die Antwort wird
              analysiert und das Ergebnis direkt angezeigt. Die gescannte URL wird nicht dauerhaft
              gespeichert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">4. Hosting</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 700, San Francisco, CA 94104,
              USA gehostet. Vercel verarbeitet technische Zugriffsdaten (IP-Adresse, Zeitstempel) im
              Rahmen des Hostings. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
              am sicheren Betrieb). Serverstandort: Frankfurt am Main, Deutschland.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">5. Schriftarten</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Wir verwenden die Schriftart Montserrat, die selbst-hostend über Next.js eingebunden ist.
              Es findet keine Verbindung zu Google-Servern statt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">6. Kontaktaufnahme</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Bei Kontaktaufnahme per E-Mail werden Ihre Angaben zur Bearbeitung der Anfrage gespeichert.
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden nach Abschluss des
              Vorgangs gelöscht.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">7. Ihre Rechte</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung
              sowie das Recht auf Datenübertragbarkeit. Beschwerden können an die zuständige
              Datenschutzaufsichtsbehörde gerichtet werden.
            </p>
          </section>

          <p className="text-gray-400 text-xs mt-10">Stand: Juni 2026</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
