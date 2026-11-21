import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Language } from '../types/election';
import { UI_STRINGS } from '../data/translations';

interface NextStepBarProps {
  language: Language;
  label: string;
  onNext: () => void;
}

export const NextStepBar: React.FC<NextStepBarProps> = ({ language, label, onNext }) => {
  const t = UI_STRINGS[language];

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-xs text-slate-500 dark:text-slate-400">
        <span>{t.verifyTag}</span>
        <span aria-hidden="true" className="mx-2">·</span>
        <span>{t.lastVerifiedLabel}: 2026-11-01</span>
      </div>
      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
      >
        <span>{t.nextStepLabel}: {label}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
