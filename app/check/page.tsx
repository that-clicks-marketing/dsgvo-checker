import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import ReportSummary from '@/components/ReportSummary';
import OfferBlock from '@/components/OfferBlock';
import Disclaimer from '@/components/Disclaimer';
import Footer from '@/components/Footer';
import ErrorView from '@/components/ErrorView';
import { runScan } from '@/lib/scanner';
import { ScanError } from '@/lib/types';
import type { ScanErrorCode } from '@/lib/types';

interface Props {
  searchParams: Promise<{ url?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { url = '' } = await searchParams;
  const domain = url ? new URL(url.startsWith('http') ? url : `https://${url}`).hostname : '';
  return {
    title: domain ? `DSGVO-Report für ${domain}` : 'DSGVO-Report',
    robots: { index: false },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', {
    day:   '2-digit',
    month: 'long',
    year:  'numeric',
  });
}

export default async function CheckPage({ searchParams }: Props) {
  const { url = '' } = await searchParams;

  if (!url) redirect('/');

  const decodedUrl = decodeURIComponent(url);

  let result;
  let errorCode: ScanErrorCode | null = null;

  try {
    result = await runScan(decodedUrl);
  } catch (err) {
    if (err instanceof ScanError) {
      errorCode = err.code;
    } else {
      errorCode = 'unknown';
    }
  }

  if (errorCode) {
    return (
      <div className="flex flex-col min-h-full bg-[#f9fafb]">
        <Header />
        <ErrorView code={errorCode} url={decodedUrl} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f9fafb]">
      <Header />

      {/* Report banner */}
      <div className="bg-[#111827] border-b border-white/10">
        <div className="max-w-3xl mx-auto px-5 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-[#9aa7b5] text-xs uppercase tracking-widest mb-1">DSGVO-Report</p>
              <h1 className="text-white font-bold text-lg truncate max-w-xs sm:max-w-sm">
                {result!.domain}
              </h1>
              <p className="text-[#9aa7b5] text-xs mt-0.5">{formatDate(result!.scannedAt)}</p>
            </div>
            <Link
              href="/"
              className="text-sm text-[#43a9d1] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Neue Prüfung
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 py-8 space-y-8">
          <ReportSummary result={result!} />
          <OfferBlock />
          <Disclaimer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
