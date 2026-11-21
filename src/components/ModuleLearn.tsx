import React, { useMemo, useState } from 'react';
import { Award, BookOpen, CheckCircle2, Search, XCircle } from 'lucide-react';
import type { DepthLevel, Language } from '../types/election';
import {
  GLOSSARY,
  MYTHS_FACTS,
  OFFICIAL_RESOURCES,
  QUIZ_QUESTIONS,
} from '../data/constants';
import { UI_STRINGS } from '../data/translations';
import { NextStepBar } from './NextStepBar';

interface ModuleLearnProps {
  language: Language;
  depth: DepthLevel;
  exploredModules: string[];
  mockVotesCompleted: number;
  quizBestScore: number;
  onQuizComplete: (score: number) => void;
  onMarkExplored: (id: string) => void;
  onOpenChat: () => void;
}

export const ModuleLearn: React.FC<ModuleLearnProps> = ({
  language,
  depth,
  exploredModules,
  mockVotesCompleted,
  quizBestScore,
  onQuizComplete,
  onMarkExplored,
  onOpenChat,
}) => {
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const [activeTab, setActiveTab] = useState<'myths' | 'glossary' | 'quiz' | 'resources'>('myths');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [revealedMyths, setRevealedMyths] = useState<string[]>([]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredGlossary = useMemo(() => {
    const q = glossarySearch.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(
      (g) =>
        g.term.en.toLowerCase().includes(q) ||
        g.term.kn.toLowerCase().includes(q) ||
        g.definition.en.toLowerCase().includes(q) ||
        g.definition.kn.toLowerCase().includes(q)
    );
  }, [glossarySearch]);

  const currentQuestion = QUIZ_QUESTIONS[quizIndex];

  const handleAnswer = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    onMarkExplored('learn');
    if (optIdx === currentQuestion.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 >= QUIZ_QUESTIONS.length) {
      setQuizFinished(true);
      onQuizComplete(quizScore);
    } else {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const toggleMyth = (id: string) => {
    onMarkExplored('learn');
    setRevealedMyths((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const journeyProgressPct = Math.min(100, Math.round((exploredModules.length / 7) * 100));

  return (
    <section
      id="learn"
      aria-labelledby="heading-learn"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            {isKn ? 'ಮಾಡ್ಯೂಲ್ 09 · ಕಲಿಕೆ, ರಸಪ್ರಶ್ನೆ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು' : 'Module 09 · Learn, Engage & Official Resources'}
          </p>
          <h2
            id="heading-learn"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
          >
            {isKn ? 'ಸತ್ಯ-ಮಿಥ್ಯ, 32 ಪದಕೋಶ, 15-ಪ್ರಶ್ನೆ ರಸಪ್ರಶ್ನೆ ಮತ್ತು ಪ್ರಗತಿ' : 'Myth vs Fact, 32-Term Glossary, 15-Question Quiz & Journey Tracker'}
          </h2>
        </div>

        {/* My Election Journey Progress Tracker */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span>{isKn ? 'ನನ್ನ ಚುನಾವಣಾ ಕಲಿಕಾ ಪಯಣ' : 'My Election Journey Progress'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isKn
                  ? `ಅಧ್ಯಯನ ಮಾಡಿದ ವಿಭಾಗಗಳು: ${exploredModules.length}/7 · ಅಣಕು ಮತಗಳು: ${mockVotesCompleted} · ಅತ್ಯುತ್ತಮ ರಸಪ್ರಶ್ನೆ: ${quizBestScore}/15`
                  : `Modules explored: ${exploredModules.length}/7 · Mock votes cast: ${mockVotesCompleted} · Best quiz score: ${quizBestScore}/15`}
              </p>
            </div>
            <div className="font-mono-tabular text-sm font-bold text-blue-700 dark:text-blue-400">
              {journeyProgressPct}%
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-700 dark:bg-blue-500 transition-all duration-300"
              style={{ width: `${journeyProgressPct}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6" role="tablist">
          {(
            [
              { id: 'myths', label: isKn ? 'ಸತ್ಯ vs ಮಿಥ್ಯ (12)' : 'Myth vs Fact (12)' },
              { id: 'glossary', label: isKn ? 'ಪದಕೋಶ (32)' : 'Glossary (32)' },
              { id: 'quiz', label: isKn ? 'ರಸಪ್ರಶ್ನೆ (15 ಪ್ರಶ್ನೆಗಳು)' : 'Adaptive Quiz (15)' },
              { id: 'resources', label: isKn ? 'ಅಧಿಕೃತ ಕೊಂಡಿಗಳು' : 'Official Resources' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                onMarkExplored('learn');
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Myth vs Fact */}
        {activeTab === 'myths' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MYTHS_FACTS.map((item) => {
              const revealed = revealedMyths.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleMyth(item.id)}
                  className="text-left p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-600 transition-colors cursor-pointer flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mb-1">
                      {isKn ? 'ಸಾಮಾನ್ಯ ತಪ್ಪು ಕಲ್ಪನೆ' : 'MYTH'}
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {isKn ? item.myth.kn : item.myth.en}
                    </p>
                  </div>
                  {revealed ? (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                      {isKn ? item.fact.kn : item.fact.en}
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                      {isKn ? 'ಸತ್ಯಾಂಶ ನೋಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ →' : 'Tap to reveal fact →'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* TAB 2: Glossary */}
        {activeTab === 'glossary' && (
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder={isKn ? 'ಪದಕೋಶದಲ್ಲಿ ಹುಡುಕಿ (EVM, Form 6, BLO)...' : 'Search glossary (EVM, Form 6, BLO)...'}
                aria-label="Search glossary"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGlossary.map((g) => (
                <div
                  key={g.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {g.category}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mt-0.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400 shrink-0" />
                    <span>{isKn ? g.term.kn : g.term.en}</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {isKn ? g.definition.kn : g.definition.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 15-Question Adaptive Quiz */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            {quizFinished ? (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {isKn ? 'ರಸಪ್ರಶ್ನೆ ಪೂರ್ಣಗೊಂಡಿದೆ' : 'Quiz Completed'}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-mono-tabular">
                  {isKn ? `ನಿಮ್ಮ ಅಂಕ: ${quizScore} / ${QUIZ_QUESTIONS.length}` : `Your Score: ${quizScore} / ${QUIZ_QUESTIONS.length}`}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {quizScore >= 12
                    ? isKn
                      ? 'ಅತ್ಯುತ್ತಮ! ನೀವು ಪ್ರಬುದ್ಧ ಮತದಾರರ ಬ್ಯಾಡ್ಜ್ ಗಳಿಸಿದ್ದೀರಿ.'
                      : 'Civic Champion Badge unlocked! You have strong mastery of Indian voting rules and EVM/VVPAT safeguards.'
                    : isKn
                      ? 'ಉತ್ತಮ ಪ್ರಯತ್ನ! ಹೆಚ್ಚಿನ ಅಂಕಕ್ಕಾಗಿ ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
                      : 'Good effort! Review the Journey & Rules modules and try again for the Civic Champion badge.'}
                </p>
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                >
                  {isKn ? 'ಮತ್ತೆ ಆಡಿ' : 'Retake Quiz'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono-tabular">
                  <span>
                    {isKn
                      ? `ಪ್ರಶ್ನೆ ${quizIndex + 1} / ${QUIZ_QUESTIONS.length}`
                      : `Question ${quizIndex + 1} of ${QUIZ_QUESTIONS.length}`}
                  </span>
                  <span>
                    {isKn ? `ಅಂಕ: ${quizScore}` : `Score: ${quizScore}`}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  {isKn ? currentQuestion.question.kn : currentQuestion.question.en}
                </h3>

                {depth === 'simple' && (
                  <p className="text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-lg">
                    {isKn ? 'ಸುಳಿವು:' : 'Simple Hint:'}{' '}
                    {isKn ? currentQuestion.hint.kn : currentQuestion.hint.en}
                  </p>
                )}

                <div className="space-y-2">
                  {(isKn ? currentQuestion.options.kn : currentQuestion.options.en).map(
                    (opt, idx) => {
                      const answered = selectedOption !== null;
                      const isCorrect = idx === currentQuestion.correctIndex;
                      const isSelected = idx === selectedOption;

                      let btnStyle =
                        'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';
                      if (answered && isCorrect) {
                        btnStyle =
                          'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-900 dark:text-emerald-200';
                      } else if (answered && isSelected && !isCorrect) {
                        btnStyle =
                          'bg-red-50 dark:bg-red-950/60 border-red-600 text-red-900 dark:text-red-200';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={answered}
                          onClick={() => handleAnswer(idx)}
                          className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg border transition-colors flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {answered && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {answered && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                {selectedOption !== null && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {isKn ? currentQuestion.explanation.kn : currentQuestion.explanation.en}
                    </p>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 cursor-pointer"
                    >
                      {quizIndex + 1 >= QUIZ_QUESTIONS.length
                        ? isKn
                          ? 'ಫಲಿತಾಂಶ ನೋಡಿ'
                          : 'Finish Quiz'
                        : isKn
                          ? 'ಮುಂದಿನ ಪ್ರಶ್ನೆ →'
                          : 'Next Question →'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Official Resources */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICIAL_RESOURCES.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between gap-3"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                    {isKn ? res.nameKn : res.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {isKn ? res.purpose.kn : res.purpose.en}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    {res.url.replace('https://', '')}
                  </a>
                  <span className="font-mono-tabular text-slate-400">
                    {res.lastVerified}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <NextStepBar language={language} label={t.nextToChat} onNext={onOpenChat} />
      </div>
    </section>
  );
};
