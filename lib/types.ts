export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type CheckStatus = 'found' | 'ok' | 'warning' | 'not_checked';

export type Category =
  | 'legal'
  | 'consent'
  | 'tracking'
  | 'external'
  | 'forms'
  | 'security';

export interface Issue {
  id: string;
  category: Category;
  title: string;
  severity: Severity;
  status: CheckStatus;
  description: string;
  recommendation: string;
}

export interface ScanResult {
  url: string;
  domain: string;
  scannedAt: string;
  score: number;
  issues: Issue[];
  isDummy: boolean;
}

export const CATEGORY_META: Record<
  Category,
  { label: string; icon: string; order: number }
> = {
  legal:    { label: 'Datenschutz & Rechtstexte',   icon: '📄', order: 1 },
  consent:  { label: 'Cookies & Consent',            icon: '🍪', order: 2 },
  tracking: { label: 'Tracking & Marketing Tools',   icon: '📊', order: 3 },
  external: { label: 'Externe Dienste',              icon: '🔗', order: 4 },
  forms:    { label: 'Formulare & Kontakt',           icon: '📝', order: 5 },
  security: { label: 'Technische Sicherheit',        icon: '🔒', order: 6 },
};

export const SEVERITY_META: Record<
  Severity,
  { label: string; color: string; dot: string; border: string; bg: string; text: string }
> = {
  critical: {
    label:  'Kritisch',
    color:  '#ef4444',
    dot:    'bg-red-500',
    border: 'border-l-red-500',
    bg:     'bg-red-50',
    text:   'text-red-700',
  },
  high: {
    label:  'Hoch',
    color:  '#f97316',
    dot:    'bg-orange-500',
    border: 'border-l-orange-500',
    bg:     'bg-orange-50',
    text:   'text-orange-700',
  },
  medium: {
    label:  'Mittel',
    color:  '#eab308',
    dot:    'bg-amber-500',
    border: 'border-l-amber-500',
    bg:     'bg-amber-50',
    text:   'text-amber-700',
  },
  low: {
    label:  'Niedrig',
    color:  '#43a9d1',
    dot:    'bg-blue-400',
    border: 'border-l-blue-400',
    bg:     'bg-blue-50',
    text:   'text-blue-700',
  },
  info: {
    label:  'Info',
    color:  '#9aa7b5',
    dot:    'bg-gray-400',
    border: 'border-l-gray-300',
    bg:     'bg-gray-50',
    text:   'text-gray-600',
  },
};

export function getScoreLabel(score: number): {
  label: string;
  sublabel: string;
  color: string;
  ring: string;
} {
  if (score >= 80) {
    return {
      label:    'Gut aufgestellt',
      sublabel: 'Wenige Risiken erkannt',
      color:    'text-emerald-600',
      ring:     '#10b981',
    };
  }
  if (score >= 50) {
    return {
      label:    'Verbesserungsbedarf',
      sublabel: 'Mehrere Risiken gefunden',
      color:    'text-amber-600',
      ring:     '#f59e0b',
    };
  }
  return {
    label:    'Handlungsbedarf',
    sublabel: 'Erhebliche Risiken gefunden',
    color:    'text-red-600',
    ring:     '#ef4444',
  };
}

export function countBySeverity(issues: Issue[]) {
  return {
    critical: issues.filter((i) => i.severity === 'critical' && i.status !== 'ok').length,
    high:     issues.filter((i) => i.severity === 'high'     && i.status !== 'ok').length,
    medium:   issues.filter((i) => i.severity === 'medium'   && i.status !== 'ok').length,
    low:      issues.filter((i) => i.severity === 'low'      && i.status !== 'ok').length,
    ok:       issues.filter((i) => i.status === 'ok').length,
  };
}

// ── Scan context ─────────────────────────────────────────────────────────────

export interface CheckContext {
  url: string;
  finalUrl: string;
  domain: string;
  html: string;
  htmlLower: string;
  footerHtml: string;
  headers: Record<string, string>;
  isHttps: boolean;
  httpRedirectsToHttps: boolean;
}

// ── Scanner errors ────────────────────────────────────────────────────────────

export type ScanErrorCode =
  | 'invalid_url'
  | 'private_host'
  | 'not_reachable'
  | 'timeout'
  | 'http_error'
  | 'unknown';

export class ScanError extends Error {
  constructor(public readonly code: ScanErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'ScanError';
  }
}
