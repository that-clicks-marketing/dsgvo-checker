import type { CheckContext } from '../types';
import { found, ok } from '../utils';
import type { Issue } from '../utils';

const PRIVACY_PATTERNS = [
  'datenschutzerklärung',
  'datenschutz',
  'datenschutzhinweise',
  'privacy policy',
  'privacy-policy',
  'datenschutzrichtlinie',
];

const IMPRINT_PATTERNS = [
  'impressum',
  'imprint',
  'anbieterkennzeichnung',
];

export function checkLegal(ctx: CheckContext): Issue[] {
  const issues: Issue[] = [];
  const hl = ctx.htmlLower;
  const fl = ctx.footerHtml.toLowerCase();

  // LEGAL-01 · Datenschutzerklärung vorhanden
  const hasPrivacy = PRIVACY_PATTERNS.some((p) => hl.includes(p));
  if (hasPrivacy) {
    issues.push(ok({ id: 'LEGAL-01', category: 'legal',
      title: 'Datenschutzerklärung gefunden',
      description: 'Auf der Seite wurde ein Link zur Datenschutzerklärung erkannt.' }));
  } else {
    issues.push(found({
      id: 'LEGAL-01', category: 'legal', severity: 'critical',
      title: 'Keine Datenschutzerklärung erkannt',
      description:
        'Es wurde kein Link zu einer Datenschutzerklärung auf dieser Seite gefunden. ' +
        'Eine Datenschutzerklärung ist nach Art. 13 DSGVO zwingend vorgeschrieben.',
      recommendation:
        'Fügen Sie eine vollständige Datenschutzerklärung hinzu und verlinken Sie diese ' +
        'im Footer und ggf. in Formularen. Tools: datenschutz-generator.de (kostenlos).',
    }));
  }

  // LEGAL-02 · Datenschutzerklärung im Footer
  const hasPrivacyInFooter = PRIVACY_PATTERNS.some((p) => fl.includes(p));
  if (hasPrivacy) {
    if (hasPrivacyInFooter) {
      issues.push(ok({ id: 'LEGAL-02', category: 'legal',
        title: 'Datenschutzerklärung im Footer verlinkt',
        description: 'Der Link zur Datenschutzerklärung befindet sich im Footer — wie erwartet.' }));
    } else {
      issues.push(found({
        id: 'LEGAL-02', category: 'legal', severity: 'medium',
        title: 'Datenschutzerklärung nicht im Footer gefunden',
        description:
          'Die Datenschutzerklärung ist auf der Seite vorhanden, wurde aber nicht im Footer erkannt. ' +
          'Best Practice: Datenschutz-Link immer im Footer platzieren, damit er auf jeder Seite sichtbar ist.',
        recommendation:
          'Platzieren Sie den Link zur Datenschutzerklärung im Footer Ihrer Website.',
      }));
    }
  }

  // LEGAL-03 · Impressum vorhanden
  const hasImprint = IMPRINT_PATTERNS.some((p) => hl.includes(p));
  if (hasImprint) {
    issues.push(ok({ id: 'LEGAL-03', category: 'legal',
      title: 'Impressum gefunden',
      description: 'Ein Link zum Impressum wurde auf der Seite erkannt.' }));
  } else {
    issues.push(found({
      id: 'LEGAL-03', category: 'legal', severity: 'critical',
      title: 'Kein Impressum erkannt',
      description:
        'Es wurde kein Impressum auf dieser Seite gefunden. ' +
        'Das Impressum ist in Deutschland nach § 5 TMG Pflicht für alle gewerblichen Websites.',
      recommendation:
        'Erstellen Sie ein vollständiges Impressum mit Anbieterangaben und verlinken Sie es ' +
        'auf jeder Seite (z. B. im Footer).',
    }));
  }

  // LEGAL-04 · Impressum im Footer
  const hasImprintInFooter = IMPRINT_PATTERNS.some((p) => fl.includes(p));
  if (hasImprint) {
    if (hasImprintInFooter) {
      issues.push(ok({ id: 'LEGAL-04', category: 'legal',
        title: 'Impressum im Footer verlinkt',
        description: 'Das Impressum ist im Footer der Website verlinkt.' }));
    } else {
      issues.push(found({
        id: 'LEGAL-04', category: 'legal', severity: 'low',
        title: 'Impressum nicht im Footer gefunden',
        description:
          'Das Impressum wurde auf der Seite erkannt, aber nicht im Footer-Bereich. ' +
          'Best Practice: Impressum-Link immer im Footer.',
        recommendation:
          'Fügen Sie den Impressum-Link in den Footer-Bereich Ihrer Website ein.',
      }));
    }
  }

  return issues;
}
