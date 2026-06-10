export default function Disclaimer() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-xs text-gray-500 leading-relaxed">
      <strong className="text-gray-700 font-semibold">Rechtlicher Hinweis: </strong>
      Diese Analyse ist eine automatisierte technische Ersteinschätzung auf Basis des HTML-Quellcodes
      der eingegebenen URL. Sie ersetzt keine Rechtsberatung und gibt keine Garantie auf Vollständigkeit
      oder Richtigkeit. Nur weil ein Check kein Problem meldet, bedeutet das keine rechtliche
      Unbedenklichkeit. Für eine rechtssichere DSGVO-Beratung empfehlen wir einen Fachanwalt für IT-Recht
      oder einen zertifizierten Datenschutzbeauftragten.
      {' '}—{' '}
      <a href="https://www.that-clicks.de" className="underline hover:text-gray-700 transition-colors"
         target="_blank" rel="noopener noreferrer">
        That Clicks Marketing
      </a>
    </div>
  );
}
