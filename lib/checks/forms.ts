import type { CheckContext } from '../types';
import { found, ok, warn } from '../utils';
import type { Issue } from '../utils';

const FORM_PATTERNS = [
  '<form',
  'type="submit"',
  'type="email"',
  'name="email"',
  'kontaktformular',
  'contact-form',
  'wpcf7', // CF7
  'gform_', // Gravity Forms
  'frm_form', // Formidable
  'ninja-forms',
];

const PRIVACY_NOTICE_PATTERNS = [
  'datenschutz', 'datenschutzerklärung', 'privacy policy',
  'dsgvo', 'gdpr', 'einwilligung', 'einverständnis',
  'ich habe die datenschutz', 'ich stimme der datenschutz',
  'datenschutzhinweis', 'verarbeitung ihrer daten',
];

export function checkForms(ctx: CheckContext): Issue[] {
  const issues: Issue[] = [];
  const hl = ctx.htmlLower;

  // FORM-01 · Kontaktformular vorhanden?
  const hasForm = FORM_PATTERNS.some((p) => hl.includes(p.toLowerCase()));

  if (!hasForm) {
    issues.push(ok({
      id: 'FORM-01', category: 'forms',
      title: 'Kein Kontaktformular erkannt',
      description: 'Auf dieser Seite wurde kein Kontaktformular gefunden.',
    }));
    // FORM-02 doesn't apply without a form
    return issues;
  }

  issues.push(ok({
    id: 'FORM-01', category: 'forms',
    title: 'Kontaktformular erkannt',
    description: 'Ein Kontaktformular wurde auf der Seite gefunden.',
  }));

  // FORM-02 · Datenschutzhinweis beim Formular
  // We check in the general HTML since forms and privacy notices might be near each other
  const hasPrivacyNotice = PRIVACY_NOTICE_PATTERNS.some((p) => hl.includes(p));

  if (hasPrivacyNotice) {
    issues.push(ok({
      id: 'FORM-02', category: 'forms',
      title: 'Datenschutzhinweis beim Formular erkannt',
      description:
        'In der Nähe des Formulars wurde ein Datenschutzhinweis oder -link erkannt.',
    }));
  } else {
    issues.push(warn({
      id: 'FORM-02', category: 'forms', severity: 'high',
      title: 'Kein Datenschutzhinweis beim Formular erkannt',
      description:
        'Es wurde kein Datenschutzhinweis in Verbindung mit dem Kontaktformular gefunden. ' +
        'Formulare, die personenbezogene Daten erheben, benötigen nach Art. 13 DSGVO ' +
        'einen Hinweis auf die Datenverarbeitung.',
      recommendation:
        'Ergänzen Sie Ihr Kontaktformular um einen Hinweis wie: ' +
        '"Ihre Daten werden gemäß unserer [Datenschutzerklärung] verarbeitet." ' +
        'Optional: Checkbox mit aktiver Einwilligung (bei nicht zwingend notwendiger Verarbeitung).',
    }));
  }

  return issues;
}
