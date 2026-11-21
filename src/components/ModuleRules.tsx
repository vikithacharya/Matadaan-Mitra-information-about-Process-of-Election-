import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { DepthLevel, Language } from '../types/election';
import { LAST_VERIFIED_DATE, RULES_ACCORDION } from '../data/constants';
import { UI_STRINGS } from '../data/translations';
import { NextStepBar } from './NextStepBar';

interface ModuleRulesProps {
  language: Language;
  depth: DepthLevel;
  onNext: () => void;
  onMarkExplored: (id: string) => void;
}

export const ModuleRules: React.FC<ModuleRulesProps> = ({
  language,
  depth,
  onNext,
  onMarkExplored,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['rule-mcc', 'rule-nota']);
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const toggleItem = (id: string) => {
    onMarkExplored('rules');
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="rules"
      aria-labelledby="heading-rules"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {isKn ? 'ಮಾಡ್ಯೂಲ್ 03 · ನಿಯಮಗಳು ಮತ್ತು ಹಕ್ಕುಗಳು' : 'Module 03 · Rules, Rights & Regulations'}
            </p>
            <h2
              id="heading-rules"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
            >
              {isKn ? 'ನೀತಿ ಸಂಹಿತೆ, ಮತದಾರರ ಹಕ್ಕುಗಳು, ಅಪರಾಧಗಳು ಮತ್ತು NOTA' : 'Model Code of Conduct, Voter Rights, Offences & NOTA'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.verifyTag} · {t.lastVerifiedLabel}: {LAST_VERIFIED_DATE}
          </p>
        </div>

        <div className="space-y-3">
          {RULES_ACCORDION.map((rule) => {
            const isOpen = openIds.includes(rule.id);
            return (
              <div
                key={rule.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(rule.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
                      {isKn ? rule.title.kn : rule.title.en}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {isKn ? rule.summary.kn : rule.summary.en}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 text-sm space-y-3">
                    <p className="text-slate-800 dark:text-slate-200">
                      {isKn ? rule.example.kn : rule.example.en}
                    </p>
                    {depth === 'detailed' && (
                      <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800">
                        {isKn ? rule.detailedLegal.kn : rule.detailedLegal.en}
                      </p>
                    )}
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <span>{isKn ? 'ಕಾನೂನು ಆಧಾರ:' : 'Legal source:'} {rule.legalSource}</span>
                      <span aria-hidden="true" className="mx-2">·</span>
                      <span>{t.verifyTag}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <NextStepBar language={language} label={t.nextToMap} onNext={onNext} />
      </div>
    </section>
  );
};
