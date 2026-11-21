import React, { useState } from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import type { AudienceMode, DepthLevel, Language } from '../types/election';
import { ELECTION_STAGES, LAST_VERIFIED_DATE } from '../data/constants';
import { UI_STRINGS } from '../data/translations';
import { NextStepBar } from './NextStepBar';

interface ModuleJourneyProps {
  language: Language;
  depth: DepthLevel;
  audience: AudienceMode;
  onNext: () => void;
  onMarkExplored: (moduleId: string) => void;
}

function addDays(dateStr: string, offsetDays: number): string {
  const base = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(base.getTime())) return '—';
  base.setDate(base.getDate() + offsetDays);
  return base.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export const ModuleJourney: React.FC<ModuleJourneyProps> = ({
  language,
  depth,
  audience,
  onNext,
  onMarkExplored,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [samplePollDate, setSamplePollDate] = useState<string>('2027-05-10');
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const activeStage = ELECTION_STAGES.find((s) => s.id === selectedStageId) || ELECTION_STAGES[0];

  const handleSelectStage = (id: number) => {
    setSelectedStageId(id);
    onMarkExplored('journey');
  };

  return (
    <section
      id="journey"
      aria-labelledby="heading-journey"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {isKn ? 'ಮಾಡ್ಯೂಲ್ 01 · ಚುನಾವಣಾ ಪಯಣ' : 'Module 01 · Election Journey'}
            </p>
            <h2
              id="heading-journey"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
            >
              {isKn ? 'ಮತದಾರರ ಪಟ್ಟಿಯಿಂದ ಸರ್ಕಾರ ರಚನೆಯವರೆಗೆ 11 ಹಂತಗಳು' : '11 Stages from Electoral Roll to Government Formation'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {audience === 'first-time'
              ? isKn
                ? 'ಮೊದಲ ಬಾರಿ ಮತದಾರರಿಗೆ: ಪ್ರತಿ ಹಂತವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ಸರಳವಾಗಿ ತಿಳಿಯಿರಿ'
                : 'First-time guide: click any stage to see what happens and what you can do'
              : isKn
                ? `ಆಳ: ${t.depthStandard} · ಕೊನೆಯ ಪರಿಶೀಲನೆ: ${LAST_VERIFIED_DATE}`
                : `Verify official dates on eci.gov.in · Last verified: ${LAST_VERIFIED_DATE}`}
          </p>
        </div>

        {/* Interactive 2-Zone Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 11-Stage Stepper */}
          <div className="lg:col-span-5 space-y-2" role="tablist" aria-label="Election stages">
            {ELECTION_STAGES.map((stage) => {
              const active = stage.id === selectedStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectStage(stage.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 dark:border-blue-500 text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono-tabular text-xs font-semibold w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                        active
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {String(stage.id).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold truncate">
                      {isKn ? stage.title.kn : stage.title.en}
                    </span>
                  </div>
                  <span className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400 shrink-0">
                    {stage.daysBeforePoll > 0
                      ? `-${stage.daysBeforePoll}d`
                      : stage.daysBeforePoll === 0
                        ? 'Poll'
                        : `+${Math.abs(stage.daysBeforePoll)}d`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Stage Details + Date Explorer */}
          <div className="lg:col-span-7 space-y-6">
            <div
              role="tabpanel"
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                <span>
                  {isKn ? `ಹಂತ ${activeStage.id} / 11` : `Stage ${activeStage.id} of 11`}
                  <span aria-hidden="true" className="mx-2">·</span>
                  {isKn ? activeStage.duration.kn : activeStage.duration.en}
                </span>
                <span>{t.verifyTag}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                {isKn ? activeStage.title.kn : activeStage.title.en}
              </h3>

              <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    {isKn ? 'ಏನಾಗುತ್ತದೆ?' : 'What happens'}
                  </h4>
                  <p>{isKn ? activeStage.whatHappens[depth].kn : activeStage.whatHappens[depth].en}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {isKn ? 'ಯಾರು ನಿರ್ವಹಿಸುತ್ತಾರೆ?' : 'Who does it'}
                    </h4>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {isKn ? activeStage.whoDoesIt.kn : activeStage.whoDoesIt.en}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {isKn ? 'ಅಧಿಕೃತ ನಮೂನೆ / ಆ್ಯಪ್' : 'Official form / app'}
                    </h4>
                    <p className="font-mono-tabular text-xs font-semibold text-blue-700 dark:text-blue-400">
                      {activeStage.officialTool}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isKn ? 'ನೀವು ಏನು ಮಾಡಬಹುದು?' : 'What YOU can do'}</span>
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200">
                    {isKn ? activeStage.whatYouCanDo.kn : activeStage.whatYouCanDo.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Date Explorer */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                    <span>{isKn ? 'ದಿನಾಂಕ ಅನ್ವೇಷಕ (ಉದಾಹರಣೆ ವೇಳಾಪಟ್ಟಿ)' : 'Date Explorer (Illustrative Schedule)'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {isKn
                      ? 'ಮಾದರಿ ಮತದಾನ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ — ಉದಾಹರಣೆ ವೇಳಾಪಟ್ಟಿ ಮಾತ್ರ, ನಿಜವಾದ ದಿನಾಂಕಗಳನ್ನು eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.'
                      : 'Pick a sample poll date to see an illustrative backward/forward timeline. Always verify official dates on eci.gov.in.'}
                  </p>
                </div>
                <div className="shrink-0">
                  <label htmlFor="sample-poll-date" className="sr-only">
                    Sample poll date
                  </label>
                  <input
                    id="sample-poll-date"
                    type="date"
                    value={samplePollDate}
                    onChange={(e) => setSamplePollDate(e.target.value)}
                    className="px-3 py-2 text-sm font-mono-tabular rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {[
                  { label: isKn ? 'ಪಟ್ಟಿ ಪರಿಷ್ಕರಣೆ (-60 ದಿನ)' : 'Roll revision window (-60d)', offset: -60 },
                  { label: isKn ? 'ವೇಳಾಪಟ್ಟಿ & MCC (-40 ದಿನ)' : 'Schedule + MCC starts (-40d)', offset: -40 },
                  { label: isKn ? 'ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆ (-28 ದಿನ)' : 'Gazette notification (-28d)', offset: -28 },
                  { label: isKn ? 'ನಾಮಪತ್ರ ಕೊನೆ (-21 ದಿನ)' : 'Nominations close (-21d)', offset: -21 },
                  { label: isKn ? 'ಹಿಂಪಡೆಯುವಿಕೆ ಕೊನೆ (-16 ದಿನ)' : 'Withdrawal deadline (-16d)', offset: -16 },
                  { label: isKn ? 'ಮೌನ ಅವಧಿ ಆರಂಭ (-48 ಗಂಟೆ)' : '48h Silence period begins (-2d)', offset: -2 },
                  { label: isKn ? 'ಮತದಾನದ ದಿನ (Poll Day)' : 'Sample Polling Day (Day 0)', offset: 0 },
                  { label: isKn ? 'ಮತ ಎಣಿಕೆ (+3 ದಿನ)' : 'Counting & Results (+3d)', offset: 3 },
                  { label: isKn ? 'ಸರ್ಕಾರ ರಚನೆ (+7 ದಿನ)' : 'Govt formation window (+7d)', offset: 7 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="text-slate-500 dark:text-slate-400">{item.label}</div>
                    <div className="font-mono-tabular font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                      {addDays(samplePollDate, item.offset)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <NextStepBar language={language} label={t.nextToReady} onNext={onNext} />
      </div>
    </section>
  );
};
