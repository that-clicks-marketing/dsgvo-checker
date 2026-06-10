import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impressum – DSGVO Checker',
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#f9fafb]">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-5 py-12 prose prose-gray">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Impressum</h1>

          <h2 className="text-base font-semibold text-gray-800 mt-6 mb-2">Angaben gemäß § 5 TMG</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            That Clicks Marketing<br />
            Manuel Schreiner<br />
            [Straße und Hausnummer]<br />
            [PLZ] [Stadt]
          </p>

          <h2 className="text-base font-semibold text-gray-800 mt-6 mb-2">Kontakt</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            E-Mail:{' '}
            <a href="mailto:info@that-clicks.de" className="text-[#43a9d1] hover:underline">
              info@that-clicks.de
            </a>
          </p>

          <h2 className="text-base font-semibold text-gray-800 mt-6 mb-2">Umsatzsteuer-ID</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
            [USt-ID]
          </p>

          <h2 className="text-base font-semibold text-gray-800 mt-6 mb-2">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Manuel Schreiner<br />
            [Adresse wie oben]
          </p>

          <h2 className="text-base font-semibold text-gray-800 mt-6 mb-2">Haftungsausschluss</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Die Ergebnisse des DSGVO Checkers sind automatisiert erstellt und stellen keine
            Rechtsberatung dar. Die Analysen dienen der Erstorientierung und erheben keinen Anspruch
            auf Vollständigkeit oder rechtliche Verbindlichkeit. Für eine rechtssichere Bewertung
            empfehlen wir die Konsultation eines qualifizierten Datenschutzbeauftragten oder Rechtsanwalts.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
