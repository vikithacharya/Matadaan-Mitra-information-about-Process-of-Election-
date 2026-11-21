import React, { useState } from 'react';
import { ChevronRight, Shield } from 'lucide-react';
import type { Language } from '../types/election';
import { COUNTING_STEPS, EVM_SAFEGUARDS, LAST_VERIFIED_DATE } from '../data/constants';
import { UI_STRINGS } from '../data/translations';
import { NextStepBar } from './NextStepBar';

interface ModuleCountingProps {
  language: Language;
  onNext: () => void;
  onMarkExplored: (id: string) => void;
}

export const ModuleCounting: React.FC<ModuleCountingProps> = ({
  language,
  onNext,
  onMarkExplored,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const current = COUNTING_STEPS.find((s) => s.step === activeStep) || COUNTING_STEPS[0];

  return (
    <section
      id="counting"
      aria-labelledby="heading-counting"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {isKn ? 'ಮಾಡ್ಯೂಲ್ 08 · ಮತ ಎಣಿಕೆ ಮತ್ತು ಸುರಕ್ಷತೆ' : 'Module 08 · Counting & Results Explainer'}
            </p>
            <h2
              id="heading-counting"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
            >
              {isKn ? 'ಸ್ಟ್ರಾಂಗ್ ರೂಮ್‌ನಿಂದ ಫಲಿತಾಂಶ ಪ್ರಮಾಣಪತ್ರದವರೆಗೆ' : 'From Sealed Strong Room to Result Certificate'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.verifyTag} · {t.lastVerifiedLabel}: {LAST_VERIFIED_DATE}
          </p>
        </div>

        {/* Interactive Counting Flow */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {COUNTING_STEPS.map((item) => {
              const selected = item.step === activeStep;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => {
                    setActiveStep(item.step);
                    onMarkExplored('counting');
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    selected
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-mono-tabular text-[11px] opacity-80">
                    {isKn ? `ಹಂತ ${item.step}` : `Step ${item.step}`}
                  </div>
                  <div className="text-xs font-bold mt-0.5 leading-snug">
                    {isKn ? item.title.kn : item.title.en}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
                {current.step}. {isKn ? current.title.kn : current.title.en}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isKn ? current.desc.kn : current.desc.en}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveStep((prev) => (prev >= COUNTING_STEPS.length ? 1 : prev + 1));
                onMarkExplored('counting');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shrink-0 cursor-pointer"
            >
              <span>{isKn ? 'ಮುಂದಿನ ಹಂತ' : 'Next Stage'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* EVM Safeguards */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            <span>{isKn ? 'EVM ತಾಂತ್ರಿಕ ಮತ್ತು ಕಾರ್ಯವಿಧಾನದ ಸುರಕ್ಷತೆಗಳು' : 'EVM Technical & Procedural Safeguards'}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EVM_SAFEGUARDS.map((item) => (
              <div
                key={item.title.en}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {isKn ? item.title.kn : item.title.en}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isKn ? item.desc.kn : item.desc.en}
                </p>
              </div>
            ))}
          </div>
        </div>

        <NextStepBar language={language} label={t.nextToLearn} onNext={onNext} />
      </div>
    </section>
  );
};
