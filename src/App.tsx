import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Download } from 'lucide-react';
import type { AudienceMode, DepthLevel, Language, SelfTestResult } from './types/election';
import {
  KARNATAKA_CONSTITUENCIES,
  KARNATAKA_DISTRICTS,
  PARTIES,
  getCandidatesForConstituency,
} from './data/karnatakaData';
import { UI_STRINGS } from './data/translations';
import { runSelfTests, safeGetItem, safeSetItem } from './utils/storage';
import { downloadStandaloneOfflineHtml } from './utils/offlineExporter';
import { Header } from './components/Header';
import { ModuleJourney } from './components/ModuleJourney';
import { ModuleReady } from './components/ModuleReady';
import { ModuleRules } from './components/ModuleRules';
import { ModuleKarnatakaMap } from './components/ModuleKarnatakaMap';
import { ModulePartiesCandidates } from './components/ModulePartiesCandidates';
import { ModuleBoothSim } from './components/ModuleBoothSim';
import { ModuleCounting } from './components/ModuleCounting';
import { ModuleLearn } from './components/ModuleLearn';
import { AskMitraChat } from './components/AskMitraChat';

const PREFS_KEY = 'matadaan_mitra_prefs_v1';

interface StoredPrefs {
  language?: Language;
  darkMode?: boolean;
  muted?: boolean;
  audience?: AudienceMode;
  depth?: DepthLevel;
  selectedDistrictId?: string;
  selectedConstituencyId?: string;
  selectedBoothId?: string;
  exploredModules?: string[];
  mockVotesCompleted?: number;
  quizBestScore?: number;
}

function loadPrefs(): StoredPrefs {
  const raw = safeGetItem(PREFS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as StoredPrefs;
  } catch {
    return {};
  }
}

export default function App() {
  const initial = useMemo(() => loadPrefs(), []);

  const [language, setLanguage] = useState<Language>(initial.language === 'kn' ? 'kn' : 'en');
  const [darkMode, setDarkMode] = useState<boolean>(Boolean(initial.darkMode));
  const [muted, setMuted] = useState<boolean>(Boolean(initial.muted));
  const [audience, setAudience] = useState<AudienceMode>(initial.audience || 'first-time');
  const [depth, setDepth] = useState<DepthLevel>(initial.depth || 'standard');

  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(
    initial.selectedDistrictId || KARNATAKA_DISTRICTS[0].id
  );
  const [selectedConstituencyId, setSelectedConstituencyId] = useState<string>(
    initial.selectedConstituencyId || KARNATAKA_CONSTITUENCIES[0].id
  );
  const [selectedBoothId, setSelectedBoothId] = useState<string>(
    initial.selectedBoothId || KARNATAKA_CONSTITUENCIES[0].booths[0].id
  );

  const [exploredModules, setExploredModules] = useState<string[]>(
    Array.isArray(initial.exploredModules) ? initial.exploredModules : []
  );
  const [mockVotesCompleted, setMockVotesCompleted] = useState<number>(
    typeof initial.mockVotesCompleted === 'number' ? initial.mockVotesCompleted : 0
  );
  const [quizBestScore, setQuizBestScore] = useState<number>(
    typeof initial.quizBestScore === 'number' ? initial.quizBestScore : 0
  );

  const [soundCaption, setSoundCaption] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState<boolean>(false);
  const [mapsApiKey, setMapsApiKey] = useState<string>(
    () => (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || ''
  );

  // Run startup self-test silently; show panel ONLY if any check fails
  const selfTest: SelfTestResult = useMemo(() => {
    const sampleBallot = getCandidatesForConstituency(KARNATAKA_CONSTITUENCIES[0].id);
    const notaIsLast = Boolean(sampleBallot[sampleBallot.length - 1]?.isNota);
    const totalBooths = KARNATAKA_CONSTITUENCIES.reduce((sum, c) => sum + c.booths.length, 0);
    return runSelfTests({
      districtCount: KARNATAKA_DISTRICTS.length,
      constituencyCount: KARNATAKA_CONSTITUENCIES.length,
      boothCount: totalBooths,
      partyCount: PARTIES.length,
      sampleBallotSorted: sampleBallot.length > 0 && sampleBallot[0].serialNo === 1,
      notaIsLast,
    });
  }, []);

  // Listen for Google Maps Platform quota events
  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Load server-provided Maps key fallback if Vite build-time env var was empty
  useEffect(() => {
    if (mapsApiKey) return;
    fetch('/api/public-config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { mapsApiKey?: string } | null) => {
        if (data?.mapsApiKey) {
          setMapsApiKey(data.mapsApiKey);
        }
      })
      .catch(() => {
        // Offline or static-only mode; Maps fallback UI remains intact
      });
  }, [mapsApiKey]);

  // Sync Tailwind .dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Adjust default depth subtly when audience mode changes if user switches to quick facts
  const handleAudienceChange = (mode: AudienceMode) => {
    setAudience(mode);
    if (mode === 'first-time') setDepth('simple');
    if (mode === 'regular') setDepth('standard');
    if (mode === 'quick') setDepth('simple');
  };

  // Persist user preferences safely
  useEffect(() => {
    const payload: StoredPrefs = {
      language,
      darkMode,
      muted,
      audience,
      depth,
      selectedDistrictId,
      selectedConstituencyId,
      selectedBoothId,
      exploredModules,
      mockVotesCompleted,
      quizBestScore,
    };
    safeSetItem(PREFS_KEY, JSON.stringify(payload));
  }, [
    language,
    darkMode,
    muted,
    audience,
    depth,
    selectedDistrictId,
    selectedConstituencyId,
    selectedBoothId,
    exploredModules,
    mockVotesCompleted,
    quizBestScore,
  ]);

  const markExplored = (moduleId: string) => {
    setExploredModules((prev) => (prev.includes(moduleId) ? prev : [...prev, moduleId]));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const t = UI_STRINGS[language];
  const isKn = language === 'kn';

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Google Maps Platform Demo Key Quota Banner */}
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Self-test failure panel (hidden unless an invariant fails) */}
      {!selfTest.passed && (
        <div
          role="alert"
          className="bg-red-50 dark:bg-red-950 border-b border-red-300 dark:border-red-800 px-4 py-3 text-xs text-red-900 dark:text-red-200"
        >
          <div className="max-w-7xl mx-auto flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Self-Test Diagnostics Failed:</strong> {selfTest.errors.join(' ')}
            </div>
          </div>
        </div>
      )}

      <Header
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        muted={muted}
        setMuted={setMuted}
        audience={audience}
        setAudience={handleAudienceChange}
        depth={depth}
        setDepth={setDepth}
        soundCaption={soundCaption}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400">
                {t.heroKicker}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToSection('booth')}
                  className="px-5 py-3 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors cursor-pointer min-h-[44px]"
                >
                  {t.heroPrimaryBtn}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('journey')}
                  className="px-5 py-3 text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[44px]"
                >
                  {t.heroSecondaryBtn}
                </button>
              </div>
            </div>

            {/* Clean Civic Vector EVM/VVPAT Preview Diagram */}
            <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <svg
                viewBox="0 0 420 250"
                className="w-full h-auto"
                role="img"
                aria-label="Illustration of Indian EVM Control Unit, Ballot Unit, and VVPAT workflow"
              >
                {/* Control Unit */}
                <rect x="16" y="34" width="110" height="170" rx="10" fill="#1E293B" />
                <rect x="28" y="48" width="86" height="34" rx="4" fill="#0F172A" />
                <text x="71" y="69" textAnchor="middle" fontSize="11" fill="#34D399" fontFamily="monospace">
                  CU READY
                </text>
                <rect x="36" y="102" width="70" height="28" rx="6" fill="#1D4ED8" />
                <text x="71" y="120" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="600">
                  BALLOT
                </text>
                <text x="71" y="186" textAnchor="middle" fontSize="10" fill="#94A3B8">
                  Officer 3
                </text>

                {/* Cable CU -> BU */}
                <path d="M126 116 C142 116, 142 116, 158 116" stroke="#64748B" strokeWidth="3" fill="none" />

                {/* Ballot Unit */}
                <rect x="158" y="20" width="130" height="205" rx="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="176" cy="36" r="4.5" fill="#10B981" />
                <text x="188" y="40" fontSize="10" fill="#0F172A" fontWeight="700">
                  BALLOT UNIT
                </text>
                {[56, 92, 128, 164].map((y, idx) => (
                  <g key={y}>
                    <rect x="168" y={y} width="110" height="28" rx="4" fill="#E2E8F0" />
                    <text x="176" y={y + 18} fontSize="10" fill="#334155" fontFamily="monospace">
                      {idx < 3 ? `0${idx + 1} · Sample` : '04 · NOTA'}
                    </text>
                    <circle cx="242" cy={y + 14} r="3.5" fill={idx === 0 ? '#DC2626' : '#94A3B8'} />
                    <rect x="252" y={y + 5} width="20" height="18" rx="3" fill="#1D4ED8" />
                  </g>
                ))}

                {/* Cable BU -> VVPAT */}
                <path d="M288 116 C302 116, 302 116, 314 116" stroke="#64748B" strokeWidth="3" fill="none" />

                {/* VVPAT */}
                <rect x="314" y="34" width="90" height="170" rx="10" fill="#334155" />
                <rect x="326" y="50" width="66" height="66" rx="6" fill="#0F172A" stroke="#64748B" />
                <rect x="338" y="58" width="42" height="48" rx="3" fill="#FEF3C7" />
                <text x="359" y="79" textAnchor="middle" fontSize="8.5" fill="#0F172A" fontWeight="700">
                  VVPAT
                </text>
                <text x="359" y="92" textAnchor="middle" fontSize="8" fill="#475569">
                  7s Slip
                </text>
                <text x="359" y="186" textAnchor="middle" fontSize="10" fill="#CBD5E1">
                  Sealed Box
                </text>
              </svg>
            </div>
          </div>
        </section>

        <ModuleJourney
          language={language}
          depth={depth}
          audience={audience}
          onNext={() => scrollToSection('ready')}
          onMarkExplored={markExplored}
        />

        <ModuleReady
          language={language}
          depth={depth}
          onNext={() => scrollToSection('rules')}
          onMarkExplored={markExplored}
        />

        <ModuleRules
          language={language}
          depth={depth}
          onNext={() => scrollToSection('karnataka')}
          onMarkExplored={markExplored}
        />

        <ModuleKarnatakaMap
          language={language}
          mapsApiKey={mapsApiKey}
          selectedDistrictId={selectedDistrictId}
          selectedConstituencyId={selectedConstituencyId}
          selectedBoothId={selectedBoothId}
          onSelectBooth={(dId, cId, bId) => {
            setSelectedDistrictId(dId);
            setSelectedConstituencyId(cId);
            setSelectedBoothId(bId);
          }}
          onEnterBoothFromMap={(dId, cId, bId) => {
            setSelectedDistrictId(dId);
            setSelectedConstituencyId(cId);
            setSelectedBoothId(bId);
            scrollToSection('booth');
          }}
          onNext={() => scrollToSection('parties')}
          onMarkExplored={markExplored}
        />

        <ModulePartiesCandidates
          language={language}
          selectedConstituencyId={selectedConstituencyId}
          onNext={() => scrollToSection('booth')}
          onMarkExplored={markExplored}
        />

        <ModuleBoothSim
          language={language}
          muted={muted}
          onSoundCaption={setSoundCaption}
          selectedDistrictId={selectedDistrictId}
          selectedConstituencyId={selectedConstituencyId}
          selectedBoothId={selectedBoothId}
          onSelectionChange={(dId, cId, bId) => {
            setSelectedDistrictId(dId);
            setSelectedConstituencyId(cId);
            setSelectedBoothId(bId);
          }}
          onVoteCompleted={() => setMockVotesCompleted((prev) => prev + 1)}
          onNext={() => scrollToSection('counting')}
          onMarkExplored={markExplored}
        />

        <ModuleCounting
          language={language}
          onNext={() => scrollToSection('learn')}
          onMarkExplored={markExplored}
        />

        <ModuleLearn
          language={language}
          depth={depth}
          exploredModules={exploredModules}
          mockVotesCompleted={mockVotesCompleted}
          quizBestScore={quizBestScore}
          onQuizComplete={(score) =>
            setQuizBestScore((prev) => (score > prev ? score : prev))
          }
          onMarkExplored={markExplored}
          onOpenChat={() => setChatOpen(true)}
        />
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="space-y-1">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {t.brandTitle} · {t.simBanner}
            </p>
            <p>
              {isKn
                ? 'ಎಲ್ಲಾ ಅಧಿಕೃತ ದಿನಾಂಕಗಳು, ನಮೂನೆಗಳು ಮತ್ತು ಕ್ಷೇತ್ರ ವಿವರಗಳನ್ನು eci.gov.in ಹಾಗೂ ceo.karnataka.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.'
                : 'Verify all official dates, forms, and constituency rolls on eci.gov.in, voters.eci.gov.in, and ceo.karnataka.gov.in.'}
            </p>
          </div>
          <button
            type="button"
            onClick={downloadStandaloneOfflineHtml}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.offlineExportBtn}</span>
          </button>
        </div>
      </footer>

      <AskMitraChat
        language={language}
        depth={depth}
        audience={audience}
        isOpen={chatOpen}
        setIsOpen={setChatOpen}
      />
    </div>
  );
}
