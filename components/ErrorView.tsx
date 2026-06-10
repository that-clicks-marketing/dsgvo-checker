import Link from 'next/link';
import type { ScanErrorCode } from '@/lib/types';

const ERROR_MESSAGES: Record<ScanErrorCode, { title: string; body: string }> = {
  invalid_url: {
    title: 'Ungültige URL',
    body: 'Die eingegebene URL ist nicht gültig. Bitte prüfen Sie die Adresse und versuchen Sie es erneut.',
  },
  private_host: {
    title: 'Private Netzwerkadresse',
    body: 'Diese URL verweist auf eine private oder interne Adresse, die nicht gescannt werden kann.',
  },
  not_reachable: {
    title: 'Website nicht erreichbar',
    body: 'Die Website konnte nicht erreicht werden. Möglicherweise ist sie offline oder blockiert automatisierte Anfragen.',
  },
  timeout: {
    title: 'Zeitüberschreitung',
    body: 'Die Website hat nicht innerhalb von 10 Sekunden geantwortet. Bitte prüfen Sie, ob die Seite erreichbar ist.',
  },
  http_error: {
    title: 'Server-Fehler',
    body: 'Die Website hat einen Fehler zurückgegeben. Bitte versuchen Sie es später erneut.',
  },
  unknown: {
    title: 'Unbekannter Fehler',
    body: 'Beim Scannen ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.',
  },
};

interface ErrorViewProps {
  code: ScanErrorCode;
  url: string;
}

export default function ErrorView({ code, url }: ErrorViewProps) {
  const { title, body } = ERROR_MESSAGES[code] ?? ERROR_MESSAGES.unknown;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full p-8 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <h2 className="text-gray-900 font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-500 text-sm mb-1">{body}</p>
        {url && (
          <p className="text-gray-400 text-xs mt-2 break-all">{url}</p>
        )}

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 bg-[#43a9d1] hover:bg-[#2e8ab0] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Neue Prüfung starten
        </Link>
      </div>
    </div>
  );
}
