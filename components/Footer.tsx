import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-white/10 py-10 px-5 mt-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-white font-semibold mb-1">
              DSGVO Checker · That Clicks Marketing
            </p>
            <p className="text-[#9aa7b5] text-sm max-w-sm leading-relaxed">
              Technische Ersteinschätzung — keine Rechtsberatung.
              Für rechtssichere DSGVO-Konformität empfehlen wir einen Fachanwalt für IT-Recht.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-[#9aa7b5]">
            <Link href="/impressum"   className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <a href="https://www.that-clicks.de" target="_blank" rel="noopener noreferrer"
               className="hover:text-white transition-colors">
              that-clicks.de
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-[#9aa7b5]">
          © {new Date().getFullYear()} That Clicks Marketing · Manuel Schreiner · info@that-clicks.de
        </div>
      </div>
    </footer>
  );
}
