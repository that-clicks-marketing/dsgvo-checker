import type { ScanResult, Category } from '@/lib/types';
import { CATEGORY_META } from '@/lib/types';
import ScoreCard from './ScoreCard';
import CategorySection from './CategorySection';

interface Props {
  result: ScanResult;
}

const CATEGORY_ORDER: Category[] = [
  'legal',
  'consent',
  'tracking',
  'external',
  'forms',
  'security',
];

export default function ReportSummary({ result }: Props) {
  return (
    <div className="space-y-10">
      {/* Score */}
      <ScoreCard result={result} />

      {/* Category sections */}
      {CATEGORY_ORDER.map((cat) => {
        const issues = result.issues.filter((i) => i.category === cat);
        if (issues.length === 0) return null;
        return (
          <div key={cat} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <CategorySection category={cat} issues={issues} />
          </div>
        );
      })}

      {/* Empty state — all checks passed */}
      {result.issues.filter((i) => i.status !== 'ok').length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Keine Probleme gefunden</h2>
          <p className="text-[#9aa7b5]">
            Ihre Website hat alle geprüften Punkte bestanden. Gut gemacht!
          </p>
        </div>
      )}
    </div>
  );
}
