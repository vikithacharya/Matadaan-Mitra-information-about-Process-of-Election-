import React from 'react';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import type { AudienceMode, DepthLevel, Language } from '../types/election';
import { UI_STRINGS } from '../data/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  audience: AudienceMode;
  setAudience: (mode: AudienceMode) => void;
  depth: DepthLevel;
  setDepth: (depth: DepthLevel) => void;
  soundCaption: string | null;
  onNavigate: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  muted,
  setMuted,
  audience,
  setAudience,
  depth,
  setDepth,
  soundCaption,
  onNavigate,
}) => {
  const t = UI_STRINGS[language];

  return (
    <>
      {/* Balanced 2px civic tricolor rule */}
      <div className="h-1 w-full grid grid-cols-3" aria-hidden="true">
        <div className="bg-orange-600" />
        <div className="bg-white dark:bg-slate-200" />
        <div className="bg-emerald-700" />
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line brand wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 rounded"
          >
            {t.brandTitle}
          </a>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label={language === 'kn' ? 'ಪ್ರಮುಖ ವಿಭಾಗಗಳು' : 'Primary sections'}
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <button
              type="button"
              onClick={() => onNavigate('journey')}
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.navGuide}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('karnataka')}
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.navMap}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('parties')}
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.navParties}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('booth')}
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.navBooth}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('learn')}
              className="hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.navLearn}
            </button>
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('booth')}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              {t.ctaEnterBooth}
            </button>
          </div>
        </div>
      </header>

      {/* Permanent Non-Partisan Banner & Civic Workspace Controls */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
            {t.simBanner}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Audience Mode Selector */}
            <div
              role="group"
              aria-label={t.audienceLabel}
              className="flex items-center p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 gap-1"
            >
              {(
                [
                  { id: 'first-time', label: t.audienceFirstTime },
                  { id: 'regular', label: t.audienceRegular },
                  { id: 'quick', label: t.audienceQuick },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAudience(item.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    audience === item.id
                      ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Depth Selector */}
            <div
              role="group"
              aria-label={t.depthLabel}
              className="flex items-center p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 gap-1"
            >
              {(
                [
                  { id: 'simple', label: t.depthSimple },
                  { id: 'standard', label: t.depthStandard },
                  { id: 'detailed', label: t.depthDetailed },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDepth(item.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    depth === item.id
                      ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language Toggle */}
            <div
              role="group"
              aria-label="Language"
              className="flex items-center p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 gap-1"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('kn')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === 'kn'
                    ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Sound Mute Toggle */}
            <button
              type="button"
              onClick={() => setMuted(!muted)}
              aria-pressed={muted}
              aria-label={muted ? t.soundMuted : t.soundOn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[34px]"
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{muted ? t.soundMuted : t.soundOn}</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-pressed={darkMode}
              aria-label={darkMode ? t.themeDark : t.themeLight}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[34px]"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{darkMode ? t.themeLight : t.themeDark}</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick Nav Row */}
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center gap-4 overflow-x-auto text-xs font-medium text-slate-700 dark:text-slate-300">
          <button type="button" onClick={() => onNavigate('journey')} className="whitespace-nowrap shrink-0 hover:underline">
            {t.navGuide}
          </button>
          <button type="button" onClick={() => onNavigate('karnataka')} className="whitespace-nowrap shrink-0 hover:underline">
            {t.navMap}
          </button>
          <button type="button" onClick={() => onNavigate('parties')} className="whitespace-nowrap shrink-0 hover:underline">
            {t.navParties}
          </button>
          <button type="button" onClick={() => onNavigate('booth')} className="whitespace-nowrap shrink-0 hover:underline">
            {t.navBooth}
          </button>
          <button type="button" onClick={() => onNavigate('learn')} className="whitespace-nowrap shrink-0 hover:underline">
            {t.navLearn}
          </button>
        </div>
      </div>

      {/* Accessible Visual Audio Caption Toast (Live BEEP / CUTTER / READY) */}
      {soundCaption && (
        <div
          role="status"
          aria-live="assertive"
          className="fixed bottom-24 left-4 sm:left-6 z-50 px-4 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-mono-tabular font-semibold shadow-lg border border-slate-700 dark:border-slate-300"
        >
          {soundCaption}
        </div>
      )}
    </>
  );
};
