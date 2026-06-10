import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#111827] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#43a9d1] flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4V8C14 11.5 11.5 14.5 8 15.5C4.5 14.5 2 11.5 2 8V4L8 1Z"
                    stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M5.5 8L7 9.5L10.5 6" stroke="white" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm group-hover:text-[#43a9d1] transition-colors">
            DSGVO Checker
          </span>
        </Link>

        <a
          href="https://www.that-clicks.de"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9aa7b5] hover:text-white text-sm transition-colors hidden sm:block"
        >
          von That Clicks Marketing →
        </a>
      </div>
    </header>
  );
}
