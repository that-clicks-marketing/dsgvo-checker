import type { Issue, Category } from '@/lib/types';
import { CATEGORY_META } from '@/lib/types';
import IssueCard from './IssueCard';

interface Props {
  category: Category;
  issues: Issue[];
}

export default function CategorySection({ category, issues }: Props) {
  if (issues.length === 0) return null;

  const meta = CATEGORY_META[category];
  const problems = issues.filter((i) => i.status !== 'ok');
  const ok       = issues.filter((i) => i.status === 'ok');

  const criticalCount = problems.filter((i) => i.severity === 'critical').length;
  const highCount     = problems.filter((i) => i.severity === 'high').length;

  const badgeColor =
    criticalCount > 0 ? 'bg-red-100 text-red-700 border-red-200' :
    highCount     > 0 ? 'bg-orange-100 text-orange-700 border-orange-200' :
    problems.length > 0 ? 'bg-amber-100 text-amber-700 border-amber-200' :
    'bg-emerald-100 text-emerald-700 border-emerald-200';

  const badgeLabel =
    problems.length === 0 ? 'Alles OK' :
    `${problems.length} Befund${problems.length !== 1 ? 'e' : ''}`;

  return (
    <section>
      {/* Category header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{meta.icon}</span>
          <h2 className="text-lg font-bold text-[#111827]">{meta.label}</h2>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor}`}>
          {badgeLabel}
        </span>
      </div>

      {/* Issue cards */}
      <div className="flex flex-col gap-4">
        {problems.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
        {ok.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
}
