'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function UrlScannerForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let processed = url.trim();
    if (!processed) {
      setError('Bitte geben Sie eine URL ein.');
      return;
    }
    if (!/^https?:\/\//i.test(processed)) {
      processed = 'https://' + processed;
    }
    try {
      new URL(processed);
    } catch {
      setError('Bitte geben Sie eine gültige URL ein, z.B. www.ihre-website.de');
      return;
    }

    startTransition(() => {
      router.push(`/check?url=${encodeURIComponent(processed)}`);
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#9aa7b5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              placeholder="www.ihre-website.de"
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white
                         placeholder-white/35 text-base focus:outline-none focus:ring-2 focus:ring-[#43a9d1]
                         focus:border-transparent transition"
              disabled={isPending}
              autoComplete="url"
              inputMode="url"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="px-7 py-4 bg-[#43a9d1] hover:bg-[#2e8ab0] disabled:opacity-70 disabled:cursor-not-allowed
                       text-white font-semibold rounded-xl text-base transition-colors whitespace-nowrap
                       flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Prüfe...
              </>
            ) : (
              'Website prüfen →'
            )}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-400 text-sm pl-1">{error}</p>
        )}
      </form>

      <p className="mt-4 text-center text-xs text-white/40">
        Technische Ersteinschätzung · Keine Rechtsberatung · Keine Datenspeicherung
      </p>
    </div>
  );
}
