import React, { useState } from 'react';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import type { DepthLevel, Language } from '../types/election';
import {
  LAST_VERIFIED_DATE,
  OFFICIAL_RESOURCES,
  QUALIFYING_DATES,
  READY_FLOWS,
  SCENARIO_CARDS,
} from '../data/constants';
import { UI_STRINGS } from '../data/translations';
import { NextStepBar } from './NextStepBar';

interface ModuleReadyProps {
  language: Language;
  depth: DepthLevel;
  onNext: () => void;
  onMarkExplored: (id: string) => void;
}

export const ModuleReady: React.FC<ModuleReadyProps> = ({
  language,
  depth,
  onNext,
  onMarkExplored,
}) => {
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const [isCitizen, setIsCitizen] = useState(true);
  const [ageGroup, setAgeGroup] = useState<'under17' | '17plus' | '18plus'>('18plus');
  const [isOrdinaryResident, setIsOrdinaryResident] = useState(true);
  const [activeFlowId, setActiveFlowId] = useState<string>(READY_FLOWS[0].id);

  const activeFlow = READY_FLOWS.find((f) => f.id === activeFlowId) || READY_FLOWS[0];

  const getEligibilityMessage = () => {
    if (!isCitizen) {
      return {
        status: 'not-eligible',
        text: isKn
          ? 'ಭಾರತೀಯ ನಾಗರಿಕತ್ವ ಕಡ್ಡಾಯವಾಗಿದೆ (ಸಂವಿಧಾನದ 326ನೇ ವಿಧಿ). eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.'
          : 'Indian citizenship is required to register as a voter (Constitution Art. 326). Verify on eci.gov.in.',
      };
    }
    if (ageGroup === 'under17') {
      return {
        status: 'wait',
        text: isKn
          ? 'ನೀವು 17+ ವಯಸ್ಸು ತಲುಪಿದಾಗ ಮುಂಗಡ ಫಾರ್ಮ್ 6 ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.'
          : 'You can apply in advance once you are 17+, and will be enrolled after turning 18 on the next qualifying date.',
      };
    }
    if (ageGroup === '17plus') {
      return {
        status: 'advance',
        text: isKn
          ? 'ನೀವು ಈಗಲೇ ಮುಂಗಡ ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಸಬಹುದು! ಮುಂದಿನ ಅರ್ಹತಾ ದಿನಾಂಕದಂದು (ಜನ 1 / ಏಪ್ರಿ 1 / ಜುಲೈ 1 / ಅಕ್ಟೋ 1) 18 ತುಂಬಿದಾಗ ಹೆಸರು ಸೇರುತ್ತದೆ.'
          : 'Eligible for Advance Application! Submit Form 6 now—your name enters the roll in the quarter (Jan 1 / Apr 1 / Jul 1 / Oct 1) you turn 18.',
      };
    }
    if (!isOrdinaryResident) {
      return {
        status: 'resident',
        text: isKn
          ? 'ನೀವು ಸಾಮಾನ್ಯವಾಗಿ ವಾಸಿಸುವ ವಿಳಾಸದ ಕ್ಷೇತ್ರದಲ್ಲಿ ಮಾತ್ರ ನೋಂದಾಯಿಸಬಹುದು (ವಿದೇಶದಲ್ಲಿದ್ದರೆ NRI ಫಾರ್ಮ್ 6A).'
          : 'Register in the constituency where you are an ordinary resident (or use Form 6A if you are an Overseas/NRI citizen).',
      };
    }
    return {
      status: 'ready',
      text: isKn
        ? 'ನೀವು ನೋಂದಣಿಗೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ! voters.eci.gov.in ನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಸಿ.'
        : 'You meet the baseline criteria! Search your name on voters.eci.gov.in or submit Form 6 if not yet enrolled.',
    };
  };

  const eligibility = getEligibilityMessage();

  return (
    <section
      id="ready"
      aria-labelledby="heading-ready"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            {isKn ? 'ಮಾಡ್ಯೂಲ್ 02 · ಮತದಾನಕ್ಕೆ ಸಿದ್ಧತೆ' : 'Module 02 · Am I Ready to Vote?'}
          </p>
          <h2
            id="heading-ready"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
          >
            {isKn ? 'ಅರ್ಹತೆ ಪರಿಶೀಲನೆ, 4 ಅರ್ಹತಾ ದಿನಾಂಕಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಿ' : 'Eligibility Checklist, Four Qualifying Dates & Guided Flows'}
          </h2>
        </div>

        {/* Interactive Eligibility Checker + 4 Qualifying Dates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-6 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
              {isKn ? 'ತ್ವರಿತ ಅರ್ಹತೆ ಪರಿಶೀಲಕ' : 'Quick Eligibility Checker'}
            </h3>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300">
                  {isKn ? '1. ನೀವು ಭಾರತೀಯ ನಾಗರಿಕರೇ?' : '1. Are you an Indian citizen?'}
                </span>
                <input
                  type="checkbox"
                  checked={isCitizen}
                  onChange={(e) => {
                    setIsCitizen(e.target.checked);
                    onMarkExplored('ready');
                  }}
                  className="w-5 h-5 accent-blue-700 cursor-pointer"
                />
              </label>

              <div>
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  {isKn ? '2. ನಿಮ್ಮ ವಯಸ್ಸಿನ ಗುಂಪು:' : '2. Your age bracket:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: 'under17', label: isKn ? '17ಕ್ಕಿಂತ ಕಡಿಮೆ' : 'Under 17' },
                      { id: '17plus', label: isKn ? '17+ (ಮುಂಗಡ ಅರ್ಜಿ)' : '17+ (Advance)' },
                      { id: '18plus', label: isKn ? '18+ ವಯಸ್ಕರು' : '18+ Adult' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setAgeGroup(opt.id);
                        onMarkExplored('ready');
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        ageGroup === opt.id
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300">
                  {isKn
                    ? '3. ಕರ್ನಾಟಕದ ಕ್ಷೇತ್ರದಲ್ಲಿ ಸಾಮಾನ್ಯ ನಿವಾಸಿಯಾಗಿದ್ದೀರಾ?'
                    : '3. Ordinarily resident in a constituency?'}
                </span>
                <input
                  type="checkbox"
                  checked={isOrdinaryResident}
                  onChange={(e) => {
                    setIsOrdinaryResident(e.target.checked);
                    onMarkExplored('ready');
                  }}
                  className="w-5 h-5 accent-blue-700 cursor-pointer"
                />
              </label>

              <div
                role="status"
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {eligibility.text}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Qualifying Dates */}
          <div className="lg:col-span-6 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">
              {isKn ? 'ನಾಲ್ಕು ಅರ್ಹತಾ ದಿನಾಂಕಗಳು (ಮತ್ತು 17+ ಮುಂಗಡ ಅರ್ಜಿ)' : 'Four Qualifying Dates & 17+ Advance Applications'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {isKn
                ? '18 ವರ್ಷ ತುಂಬುವ ಯುವಕರು ವರ್ಷ ಪೂರ್ತಿ ಕಾಯಬೇಕಾಗಿಲ್ಲ. ಈ 4 ದಿನಾಂಕಗಳಲ್ಲಿ ಯಾವುದೇ ದಿನಾಂಕಕ್ಕೆ 18 ತುಂಬಿದರೆ ನೋಂದಣಿಯಾಗುತ್ತದೆ:'
                : 'Instead of waiting once a year for Jan 1, ECI provides four quarterly qualifying dates. Citizens aged 17+ can apply in advance:'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {QUALIFYING_DATES.map((qd) => (
                <div
                  key={qd.date}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center"
                >
                  <div className="font-mono-tabular text-base font-bold text-blue-700 dark:text-blue-400">
                    {qd.date}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {isKn ? qd.label.kn : qd.label.en}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.verifyTag} · {t.lastVerifiedLabel}: {LAST_VERIFIED_DATE}
            </p>
          </div>
        </div>

        {/* Guided "What to do" Flows */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
            {isKn ? 'ನಮೂನೆಗಳು ಮತ್ತು ಮತದಾರರ ಸೇವೆಗಳು' : 'Guided Voter Workflows (Forms 6, 7, 8, 6A, 12D)'}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Voter workflows">
            {READY_FLOWS.map((flow) => (
              <button
                key={flow.id}
                type="button"
                role="tab"
                aria-selected={activeFlowId === flow.id}
                onClick={() => {
                  setActiveFlowId(flow.id);
                  onMarkExplored('ready');
                }}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFlowId === flow.id
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {flow.formCode} · {isKn ? flow.title.kn : flow.title.en}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-mono-tabular font-semibold text-blue-700 dark:text-blue-400">
                {activeFlow.formCode}
              </span>
              <span>{activeFlow.portal} · {t.verifyTag}</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              {isKn ? activeFlow.title.kn : activeFlow.title.en}
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
              {isKn ? activeFlow.summary[depth].kn : activeFlow.summary[depth].en}
            </p>
            <ol className="space-y-2 text-sm text-slate-800 dark:text-slate-200 list-decimal list-inside">
              {(isKn ? activeFlow.steps.kn : activeFlow.steps.en).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Scenario Cards */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
            {isKn ? 'ಸಾಮಾನ್ಯ ಸನ್ನಿವೇಶಗಳು' : 'Common Voter Scenarios'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIO_CARDS.map((card) => (
              <div
                key={card.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <HelpCircle className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-1" />
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {isKn ? card.situation.kn : card.situation.en}
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  {isKn ? card.action.kn : card.action.en}
                </p>
                <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                  {card.formOrTool}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Official ECI Tools */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-3">
            {isKn ? 'ಅಧಿಕೃತ ECI ಉಪಕರಣಗಳು ಮತ್ತು ಸಹಾಯವಾಣಿ' : 'Official ECI Tools & Helplines'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {OFFICIAL_RESOURCES.slice(0, 4).concat(OFFICIAL_RESOURCES.slice(4)).map((res) => (
              <div key={res.id} className="space-y-1">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                >
                  {isKn ? res.nameKn : res.name}
                </a>
                <p className="text-slate-600 dark:text-slate-300">
                  {isKn ? res.purpose.kn : res.purpose.en}
                </p>
                <p className="text-slate-400 dark:text-slate-500 font-mono-tabular">
                  {t.lastVerifiedLabel}: {res.lastVerified}
                </p>
              </div>
            ))}
          </div>
        </div>

        <NextStepBar language={language} label={t.nextToRules} onNext={onNext} />
      </div>
    </section>
  );
};
