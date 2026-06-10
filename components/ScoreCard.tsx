import type { ScanResult } from '@/lib/types';
import { getScoreLabel, countBySeverity } from '@/lib/types';

interface Props {
  result: ScanResult;
}

function ScoreRing({ score, ringColor }: { score: number; ringColor: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="flex-shrink-0">
      {/* Track */}
      <circle cx="70" cy="70" r={r} fill="none" stroke="#1f2937" strokeWidth="10" />
      {/* Progress */}
      <circle
        cx="70" cy="70" r={r}
        fill="none"
        stroke={ringColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      {/* Score number */}
      <text x="70" y="65" textAnchor="middle" dominantBaseline="middle"
            fontSize="28" fontWeight="700" fontFamily="Montserrat, sans-serif"
            fill="white">
        {score}
      </text>
      <text x="70" y="86" textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="Montserrat, sans-serif" fill="#9aa7b5">
        von 100
      </text>
    </svg>
  );
}

function Ampel({ score }: { score: number }) {
  const isRed    = score < 50;
  const isYellow = score >= 50 && score < 80;
  const isGreen  = score >= 80;

  return (
    <div className="flex flex-col items-center gap-1.5 bg-[#1f2937] rounded-2xl px-5 py-5">
      <div className={`w-8 h-8 rounded-full transition-all ${isRed ? 'bg-red-500 shadow-[0_0_12px_#ef4444]' : 'bg-red-900/50'}`} />
      <div className={`w-8 h-8 rounded-full transition-all ${isYellow ? 'bg-amber-400 shadow-[0_0_12px_#f59e0b]' : 'bg-amber-900/30'}`} />
      <div className={`w-8 h-8 rounded-full transition-all ${isGreen ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-emerald-900/30'}`} />
    </div>
  );
}

export default function ScoreCard({ result }: Props) {
  const { label, sublabel, color, ring } = getScoreLabel(result.score);
  const counts = countBySeverity(result.issues);

  return (
    <div className="bg-[#111827] rounded-2xl border border-white/10 p-6 sm:p-8">
      {/* Demo banner */}
      {result.isDummy && (
        <div className="mb-6 bg-[#43a9d1]/10 border border-[#43a9d1]/20 rounded-xl px-4 py-3
                        flex items-center gap-3 text-sm">
          <span className="text-[#43a9d1] text-lg">🔬</span>
          <div>
            <span className="text-[#43a9d1] font-semibold">Demo-Modus: </span>
            <span className="text-[#9aa7b5]">
              Dies sind Beispieldaten. Die echte Scan-Logik folgt in der nächsten Version.
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Score ring */}
        <ScoreRing score={result.score} ringColor={ring} />

        {/* Ampel */}
        <Ampel score={result.score} />

        {/* Label + stats */}
        <div className="flex-1 text-center sm:text-left">
          <p className={`text-2xl font-bold mb-1 ${color}`}>{label}</p>
          <p className="text-[#9aa7b5] text-sm mb-5">{sublabel}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {counts.critical > 0 && (
              <StatBadge count={counts.critical} label="Kritisch" color="bg-red-500/15 text-red-400 border-red-500/20" />
            )}
            {counts.high > 0 && (
              <StatBadge count={counts.high} label="Hoch" color="bg-orange-500/15 text-orange-400 border-orange-500/20" />
            )}
            {counts.medium > 0 && (
              <StatBadge count={counts.medium} label="Mittel" color="bg-amber-500/15 text-amber-400 border-amber-500/20" />
            )}
            {counts.ok > 0 && (
              <StatBadge count={counts.ok} label="OK" color="bg-emerald-500/15 text-emerald-400 border-emerald-500/20" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({
  count,
  label,
  color,
}: {
  count: number;
  label: string;
  color: string;
}) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-center ${color}`}>
      <div className="text-2xl font-bold leading-none">{count}</div>
      <div className="text-xs mt-1 opacity-80">{label}</div>
    </div>
  );
}
