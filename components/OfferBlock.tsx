const PACKAGES = [
  {
    name: 'Quick Fix Check',
    price: 'ab 290 € netto',
    description: 'Schnelle Analyse und klare Handlungsanleitung für Einsteiger.',
    features: [
      'Manuelle Prüfung Ihrer Website',
      'Detaillierter Befundbericht',
      'Priorisierte To-Do-Liste',
      '30 Min. Beratungsgespräch',
    ],
    highlight: false,
    cta: 'Jetzt anfragen',
  },
  {
    name: 'DSGVO Tracking Setup',
    price: 'ab 590 € netto',
    description: 'Vollständige technische Umsetzung der häufigsten Datenschutzprobleme.',
    features: [
      'Alles aus Quick Fix Check',
      'Cookie-Manager einrichten',
      'Tracking DSGVO-konform konfigurieren',
      'Google Fonts lokal hosten',
      'Datenschutzerklärung überarbeiten',
    ],
    highlight: true,
    cta: 'Jetzt anfragen',
  },
  {
    name: 'Komplett Audit & Umsetzung',
    price: 'Individuelles Angebot',
    description: 'Vollständiger DSGVO-Audit und Umsetzung aller Maßnahmen.',
    features: [
      'Vollständiger DSGVO-Audit',
      'Umsetzung aller Befunde',
      'Laufende Betreuung möglich',
      'Datenschutzbeauftragter auf Anfrage',
      'Prüfung rechtlicher Dokumente',
    ],
    highlight: false,
    cta: 'Angebot anfragen',
  },
];

export default function OfferBlock() {
  const mailto =
    'mailto:info@that-clicks.de?subject=DSGVO-Check%20Anfrage&body=Hallo%2C%0D%0Aich%20habe%20Ihren%20DSGVO-Checker%20genutzt%20und%20m%C3%B6chte%20ein%20Erstgespr%C3%A4ch%20vereinbaren.%0D%0A%0D%0AMeine%20Website%3A%20';

  return (
    <section className="bg-[#111827] rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 text-center border-b border-white/10">
        <p className="text-[#43a9d1] text-xs font-semibold uppercase tracking-widest mb-3">
          That Clicks Marketing
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Wir beheben Ihre DSGVO- und Tracking-Risiken
        </h2>
        <p className="text-[#9aa7b5] max-w-lg mx-auto text-sm leading-relaxed">
          Kein technisches Vorwissen nötig. Wir kümmern uns um alles —
          von der Analyse bis zur sauberen Umsetzung.
        </p>
      </div>

      {/* Packages */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative rounded-xl p-6 flex flex-col gap-4 border transition-all
              ${pkg.highlight
                ? 'bg-[#43a9d1] border-[#43a9d1] text-white shadow-lg shadow-[#43a9d1]/20'
                : 'bg-white/5 border-white/10 text-white hover:border-white/20'
              }`}
          >
            {pkg.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-[#43a9d1] text-xs font-bold px-3 py-1 rounded-full">
                  Empfohlen
                </span>
              </div>
            )}

            <div>
              <h3 className={`font-bold text-lg mb-1 ${pkg.highlight ? 'text-white' : 'text-white'}`}>
                {pkg.name}
              </h3>
              <p className={`text-2xl font-bold mb-2 ${pkg.highlight ? 'text-white' : 'text-[#43a9d1]'}`}>
                {pkg.price}
              </p>
              <p className={`text-sm ${pkg.highlight ? 'text-white/80' : 'text-[#9aa7b5]'}`}>
                {pkg.description}
              </p>
            </div>

            <ul className="flex-1 space-y-2">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className={`mt-0.5 flex-shrink-0 ${pkg.highlight ? 'text-white' : 'text-[#43a9d1]'}`}>
                    ✓
                  </span>
                  <span className={pkg.highlight ? 'text-white/90' : 'text-[#9aa7b5]'}>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={mailto}
              className={`block text-center py-3 px-4 rounded-xl font-semibold text-sm transition-colors
                ${pkg.highlight
                  ? 'bg-white text-[#43a9d1] hover:bg-white/90'
                  : 'bg-[#43a9d1]/15 text-[#43a9d1] border border-[#43a9d1]/30 hover:bg-[#43a9d1]/25'
                }`}
            >
              {pkg.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 text-center">
        <p className="text-[#9aa7b5] text-sm mb-4">
          Noch unsicher? Stellen Sie uns einfach eine Frage.
        </p>
        <a
          href="mailto:info@that-clicks.de?subject=DSGVO-Check%20Frage"
          className="inline-flex items-center gap-2 text-[#43a9d1] font-semibold text-sm
                     hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Kostenloses Erstgespräch anfragen → info@that-clicks.de
        </a>
      </div>
    </section>
  );
}
