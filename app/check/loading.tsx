export default function CheckLoading() {
  return (
    <div className="flex flex-col min-h-full bg-[#f9fafb]">
      {/* Header skeleton */}
      <div className="bg-[#111827] border-b border-white/10 px-5 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Scan banner skeleton */}
      <div className="bg-[#111827] border-b border-white/10">
        <div className="max-w-3xl mx-auto px-5 py-5">
          <div className="h-3 w-24 bg-white/10 rounded animate-pulse mb-2" />
          <div className="h-6 w-48 bg-white/10 rounded animate-pulse mb-1" />
          <div className="h-3 w-32 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Loading indicator */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-5">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="#43a9d1"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="213.6"
                strokeDashoffset="160"
                className="animate-spin origin-center"
                style={{ animationDuration: '1.5s' }}
              />
            </svg>
          </div>
          <p className="text-gray-700 font-semibold text-lg mb-1">Website wird geprüft …</p>
          <p className="text-gray-400 text-sm">Bis zu 10 Sekunden. Bitte warten.</p>

          {/* Progress steps */}
          <div className="mt-8 space-y-2 text-left max-w-xs mx-auto">
            {[
              'Verbindung wird aufgebaut',
              'HTML wird analysiert',
              'DSGVO-Checks werden ausgeführt',
              'Bericht wird erstellt',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                <div
                  className="w-4 h-4 rounded-full bg-gray-200 animate-pulse flex-shrink-0"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                {step}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
