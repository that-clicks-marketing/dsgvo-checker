import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const CATEGORIES = [
  { icon: '🍪', label: 'Cookie- & Tracking-Check' },
  { icon: '📄', label: 'Datenschutzerklärung & Impressum' },
  { icon: '🔗', label: 'Externe Dienste & Skripte' },
  { icon: '📊', label: 'Tracking & Marketing Tools' },
  { icon: '📝', label: 'Formulare & Kontakt' },
  { icon: '🔒', label: 'Technische Sicherheit' },
];

const TARGET_GROUPS = [
  'Handwerker', 'Ärzte & Therapeuten', 'Restaurants & Cafés',
  'Rechtsanwälte & Steuerberater', 'Online-Shops', 'Agenturen',
  'Lokale Dienstleister', 'Vereine',
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Wave */}
        <div className="bg-[#111827]">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 0L1440 0L1440 16C1200 48 960 48 720 32C480 16 240 16 0 32L0 0Z" fill="#f9fafb" />
          </svg>
        </div>

        {/* What gets checked */}
        <section className="bg-[#f9fafb] py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-3">
                Was wird geprüft?
              </h2>
              <p className="text-[#9aa7b5] max-w-md mx-auto text-sm leading-relaxed">
                Der Check analysiert Ihre Startseite auf die häufigsten DSGVO-Risiken —
                ohne Fachanwalt, ohne technisches Vorwissen.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CATEGORIES.map((c) => (
                <div key={c.label}
                     className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#43a9d1]/30
                                hover:shadow-md transition-all text-center">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <p className="text-sm font-semibold text-[#111827] leading-tight">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="bg-white py-20 px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-4">
              Für wen ist dieses Tool?
            </h2>
            <p className="text-[#9aa7b5] text-sm mb-10 max-w-md mx-auto">
              Für alle, die keine eigene IT-Abteilung haben — aber trotzdem auf der sicheren Seite sein wollen.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {TARGET_GROUPS.map((label) => (
                <span key={label}
                      className="bg-[#f9fafb] border border-gray-200 text-[#111827] text-sm
                                 px-4 py-2 rounded-full font-medium">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-[#43a9d1] py-14 px-5">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Jetzt Website prüfen
            </h2>
            <p className="text-white/80 mb-8 text-sm">
              Kostenlos · Ohne Anmeldung · Sofortiges Ergebnis
            </p>
            <a href="#top"
               className="inline-block bg-white text-[#43a9d1] font-semibold px-8 py-4
                          rounded-xl hover:bg-white/90 transition-colors">
              Zurück zum Check ↑
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
