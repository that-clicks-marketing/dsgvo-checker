import type { Issue } from '@/lib/types';
import { SEVERITY_META } from '@/lib/types';

interface Props {
  issue: Issue;
}

const SEVERITY_ICON: Record<string, string> = {
  critical: '🔴',
  high:     '🟠',
  medium:   '🟡',
  low:      '🔵',
  info:     '⚪',
};

export default function IssueCard({ issue }: Props) {
  /* OK-items: compact green row */
  if (issue.status === 'ok') {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3">
        <span className="text-emerald-500 text-lg flex-shrink-0">✅</span>
        <span className="text-emerald-800 font-medium text-sm flex-1">{issue.title}</span>
        <span className="text-emerald-600 text-xs font-semibold uppercase tracking-wide">OK</span>
      </div>
    );
  }

  const meta = SEVERITY_META[issue.severity];

  return (
    <div className={`rounded-2xl border border-l-4 ${meta.border} bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
         style={{ borderColor: '#e5e7eb', borderLeftColor: meta.color }}>
      {/* Header */}
      <div className={`px-5 py-3 flex items-center justify-between ${meta.bg}`}>
        <div className="flex items-center gap-2.5">
          <span className="text-base">{SEVERITY_ICON[issue.severity]}</span>
          <span className={`text-xs font-bold uppercase tracking-wider ${meta.text}`}>
            {meta.label}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-mono">{issue.id}</span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <h3 className="font-semibold text-[#111827] text-base mb-2">{issue.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{issue.description}</p>

        {issue.recommendation && (
          <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              💡 Empfehlung
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{issue.recommendation}</p>
          </div>
        )}

        <a
          href="mailto:info@that-clicks.de?subject=DSGVO-Check%20Anfrage"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#43a9d1]
                     hover:text-[#2e8ab0] transition-colors"
        >
          Jetzt beheben lassen
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
