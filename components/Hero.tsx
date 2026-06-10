import UrlScannerForm from './UrlScannerForm';

const TRUST_ITEMS = [
  { icon: '🍪', label: 'Cookie- & Tracking-Check' },
  { icon: '📄', label: 'Datenschutzerklärung & Impressum' },
  { icon: '🔗', label: 'Externe Dienste & Skripte' },
  { icon: '💡', label: 'Konkrete Handlungsempfehlungen' },
];

export default function Hero() {
  return (
    <section className="bg-[#111827] pt-16 pb-24 px-5">
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#43a9d1]/15 text-[#43a9d1] text-xs font-semibold
                        px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#43a9d1] animate-pulse" />
          Kostenloser Website-Check
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
          Kostenloser{' '}
          <span className="text-[#43a9d1]">DSGVO Website</span>
          {' '}Check
        </h1>

        {/* Subheadline */}
        <p className="text-[#9aa7b5] text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Prüfe deine Website auf Cookie-, Tracking- und Datenschutz-Risiken.
          Ergebnis in Sekunden — ohne Anmeldung.
        </p>

        {/* Form */}
        <UrlScannerForm />

        {/* Trust grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 bg-white/5 rounded-xl px-3 py-4
                         border border-white/10 hover:border-[#43a9d1]/30 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-[#9aa7b5] text-center leading-tight font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
