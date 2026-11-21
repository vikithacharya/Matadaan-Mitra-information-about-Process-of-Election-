import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type {
  BoothState,
  BoothTallyStore,
  Candidate,
  Language,
} from '../types/election';
import {
  KARNATAKA_CONSTITUENCIES,
  KARNATAKA_DISTRICTS,
  getAvatarDataUri,
  getCandidatesForConstituency,
  getPartyById,
} from '../data/karnatakaData';
import { UI_STRINGS } from '../data/translations';
import {
  playControlUnitReadyChime,
  playEvmBeep,
  playVvpatCutter,
} from '../utils/audio';
import { safeGetItem, safeSetItem } from '../utils/storage';
import { PartySymbolSvg } from './PartySymbolSvg';
import { NextStepBar } from './NextStepBar';

interface ModuleBoothSimProps {
  language: Language;
  muted: boolean;
  onSoundCaption: (caption: string | null) => void;
  selectedDistrictId: string;
  selectedConstituencyId: string;
  selectedBoothId: string;
  onSelectionChange: (districtId: string, constituencyId: string, boothId: string) => void;
  onVoteCompleted: () => void;
  onNext: () => void;
  onMarkExplored: (id: string) => void;
}

const TALLY_STORAGE_PREFIX = 'matadaan_mitra_tally_v1_';

function generateMockEpic(): string {
  const num = Math.floor(100000 + Math.random() * 899999);
  return `KRN/MOCK/${num}`;
}

function loadBoothTally(boothId: string): BoothTallyStore {
  if (!boothId) {
    return {
      boothId: '',
      isClosed: false,
      evmCounts: {},
      vvpatCounts: {},
      totalVotes: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
  const raw = safeGetItem(`${TALLY_STORAGE_PREFIX}${boothId}`);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as BoothTallyStore;
      if (parsed && typeof parsed.totalVotes === 'number') {
        return parsed;
      }
    } catch {
      // Ignore corrupt storage
    }
  }
  return {
    boothId,
    isClosed: false,
    evmCounts: {},
    vvpatCounts: {},
    totalVotes: 0,
    lastUpdated: new Date().toISOString(),
  };
}

function saveBoothTally(tally: BoothTallyStore): void {
  if (!tally.boothId) return;
  safeSetItem(`${TALLY_STORAGE_PREFIX}${tally.boothId}`, JSON.stringify(tally));
}

export const ModuleBoothSim: React.FC<ModuleBoothSimProps> = ({
  language,
  muted,
  onSoundCaption,
  selectedDistrictId,
  selectedConstituencyId,
  selectedBoothId,
  onSelectionChange,
  onVoteCompleted,
  onNext,
  onMarkExplored,
}) => {
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const [inVirtualBooth, setInVirtualBooth] = useState(false);
  const [boothState, setBoothState] = useState<BoothState>('IDLE');
  const [mockEpic, setMockEpic] = useState<string>(() => generateMockEpic());
  const [selectedIdDoc, setSelectedIdDoc] = useState<string>('EPIC');
  const [form17aSigned, setForm17aSigned] = useState(false);
  const [inkApplied, setInkApplied] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState<Candidate | null>(null);
  const [vvpatSecondsLeft, setVvpatSecondsLeft] = useState<number>(7);
  const [machineBusyNotice, setMachineBusyNotice] = useState<string | null>(null);
  const [showExplainerSidebar, setShowExplainerSidebar] = useState<boolean>(true);
  const [showPhotoEducationPopup, setShowPhotoEducationPopup] = useState<boolean>(false);
  const [showResultsPanel, setShowResultsPanel] = useState<boolean>(false);
  const [tally, setTally] = useState<BoothTallyStore>(() => loadBoothTally(selectedBoothId));

  const timerRef = useRef<number | null>(null);
  const dropTimerRef = useRef<number | null>(null);

  const constituenciesInDistrict = useMemo(
    () => KARNATAKA_CONSTITUENCIES.filter((c) => c.districtId === selectedDistrictId),
    [selectedDistrictId]
  );

  const activeConstituency = useMemo(
    () => KARNATAKA_CONSTITUENCIES.find((c) => c.id === selectedConstituencyId) || null,
    [selectedConstituencyId]
  );

  const activeBooth = useMemo(
    () => activeConstituency?.booths.find((b) => b.id === selectedBoothId) || null,
    [activeConstituency, selectedBoothId]
  );

  const candidates = useMemo(
    () => (selectedConstituencyId ? getCandidatesForConstituency(selectedConstituencyId) : []),
    [selectedConstituencyId]
  );

  const canEnterBooth = Boolean(selectedConstituencyId && selectedBoothId && activeConstituency && activeBooth);

  // Sync booth tally whenever boothId changes
  useEffect(() => {
    setTally(loadBoothTally(selectedBoothId));
    setShowResultsPanel(false);
    setBoothState('IDLE');
    setVotedCandidate(null);
    setInkApplied(false);
    setForm17aSigned(false);
  }, [selectedBoothId]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (dropTimerRef.current) window.clearTimeout(dropTimerRef.current);
    };
  }, []);

  const clearTimers = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (dropTimerRef.current) {
      window.clearTimeout(dropTimerRef.current);
      dropTimerRef.current = null;
    }
  };

  const handleEnterBooth = () => {
    if (!canEnterBooth) return;
    onMarkExplored('booth');
    setInVirtualBooth(true);
    setBoothState('IDLE');
    setVotedCandidate(null);
    setInkApplied(false);
    setForm17aSigned(false);
  };

  const handlePressCandidateButton = (candidate: Candidate) => {
    if (tally.isClosed) {
      setMachineBusyNotice(
        isKn ? 'ಮತದಾನ ಮುಕ್ತಾಯಗೊಂಡಿದೆ — ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿ ಪ್ಯಾನೆಲ್ ಪರಿಶೀಲಿಸಿ.' : 'Poll is closed by Presiding Officer.'
      );
      return;
    }

    if (boothState !== 'VOTING_COMPARTMENT') {
      setMachineBusyNotice(
        isKn
          ? 'ಯಂತ್ರ ಕಾರ್ಯನಿರತವಾಗಿದೆ / ಲಾಕ್ ಆಗಿದೆ — ದ್ವಿ-ಮತದಾನ ಸಾಧ್ಯವಿಲ್ಲ.'
          : 'Machine busy / locked — double-voting is prevented.'
      );
      window.setTimeout(() => setMachineBusyNotice(null), 2200);
      return;
    }

    clearTimers();
    setMachineBusyNotice(null);
    setVotedCandidate(candidate);
    setVvpatSecondsLeft(7);
    setBoothState('VVPAT_ACTIVE');

    // Long beep via Web Audio API directly inside user gesture
    playEvmBeep(muted, onSoundCaption);

    let remaining = 7;
    timerRef.current = window.setInterval(() => {
      remaining -= 1;
      setVvpatSecondsLeft(remaining);
      if (remaining <= 0) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setBoothState('SLIP_DROP');
        playVvpatCutter(muted, onSoundCaption);

        dropTimerRef.current = window.setTimeout(() => {
          // Record ONLY anonymous booth count — NEVER store voter EPIC -> candidate mapping
          setTally((prev) => {
            const nextEvm = { ...prev.evmCounts, [candidate.id]: (prev.evmCounts[candidate.id] || 0) + 1 };
            const nextVvpat = { ...prev.vvpatCounts, [candidate.id]: (prev.vvpatCounts[candidate.id] || 0) + 1 };
            const updated: BoothTallyStore = {
              ...prev,
              evmCounts: nextEvm,
              vvpatCounts: nextVvpat,
              totalVotes: prev.totalVotes + 1,
              lastUpdated: new Date().toISOString(),
            };
            saveBoothTally(updated);
            return updated;
          });
          setBoothState('LOCKED_RECORDED');
          setShowPhotoEducationPopup(true);
          onVoteCompleted();
        }, 1250);
      }
    }, 1000);
  };

  const handleNextVoter = () => {
    clearTimers();
    setBoothState('IDLE');
    setMockEpic(generateMockEpic());
    setVotedCandidate(null);
    setInkApplied(false);
    setForm17aSigned(false);
    setShowPhotoEducationPopup(false);
    setMachineBusyNotice(null);
  };

  const handleClosePoll = () => {
    const updated: BoothTallyStore = {
      ...tally,
      isClosed: true,
      lastUpdated: new Date().toISOString(),
    };
    setTally(updated);
    saveBoothTally(updated);
    setShowResultsPanel(true);
  };

  const handleResetBooth = () => {
    clearTimers();
    const fresh: BoothTallyStore = {
      boothId: selectedBoothId,
      isClosed: false,
      evmCounts: {},
      vvpatCounts: {},
      totalVotes: 0,
      lastUpdated: new Date().toISOString(),
    };
    setTally(fresh);
    saveBoothTally(fresh);
    setShowResultsPanel(false);
    handleNextVoter();
  };

  const getStepNarration = (): { title: string; body: string } => {
    switch (boothState) {
      case 'IDLE':
        return {
          title: isKn ? 'ಹಂತ 1: ಮತದಾರರ ಆಗಮನ ಮತ್ತು ಪಟ್ಟಿ ಪರಿಶೀಲನೆ' : 'Step 1: Voter Arrival & Roll Check',
          body: isKn
            ? 'ಮತದಾರರು ತಮ್ಮ ತಾತ್ಕಾಲಿಕ ಕಾಲ್ಪನಿಕ EPIC ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಮತಗಟ್ಟೆಗೆ ಬರುತ್ತಾರೆ. ಮೊದಲು ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.'
            : 'The mock voter arrives with a simulated EPIC number (no real personal data). Verify your entry in the booth electoral roll first.',
        };
      case 'OFFICER_1':
        return {
          title: isKn ? 'ಹಂತ 2: ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿ 1 (ಗುರುತು ಪರಿಶೀಲನೆ)' : 'Step 2: Polling Officer 1 (ID Verification)',
          body: isKn
            ? 'ಅಧಿಕಾರಿ 1 ನಿಮ್ಮ EPIC ಅಥವಾ ಮಾನ್ಯ ಪರ್ಯಾಯ ಫೋಟೋ ID ಯನ್ನು ಗುರುತಿಸಿದ ಪಟ್ಟಿಯೊಂದಿಗೆ ತಾಳೆ ನೋಡುತ್ತಾರೆ.'
            : 'Officer 1 verifies your EPIC or ECI-approved alternative photo ID against the marked copy of the electoral roll and calls out your serial number.',
        };
      case 'OFFICER_2':
        return {
          title: isKn ? 'ಹಂತ 3: ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿ 2 (ಶಾಯಿ ಮತ್ತು ಫಾರ್ಮ್ 17A)' : 'Step 3: Polling Officer 2 (Indelible Ink & Form 17A)',
          body: isKn
            ? 'ಎಡ ತೋರುಬೆರಳಿಗೆ ಅಳಿಸಲಾಗದ ಶಾಯಿ ಹಚ್ಚಲಾಗುತ್ತದೆ, ಫಾರ್ಮ್ 17A ವಹಿಯಲ್ಲಿ ಸಹಿ ಪಡೆಯಲಾಗುತ್ತದೆ ಮತ್ತು ಮತದಾರರ ಚೀಟಿ ನೀಡಲಾಗುತ್ತದೆ.'
            : 'Indelible ink is applied to your left forefinger, you sign the Form 17A Register of Voters, and Officer 2 issues a signed Voter Slip.',
        };
      case 'OFFICER_3':
        return {
          title: isKn ? 'ಹಂತ 4: ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿ 3 (ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್)' : 'Step 4: Polling Officer 3 (Control Unit Ballot Release)',
          body: isKn
            ? 'ಅಧಿಕಾರಿ 3 ಮತದಾರರ ಚೀಟಿ ಪಡೆದು ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್‌ನಲ್ಲಿ “Ballot” ಬಟನ್ ಒತ್ತುತ್ತಾರೆ. ಆಗ ಮತಯಂತ್ರದ ಹಸಿರು READY ದೀಪ ಬೆಳಗುತ್ತದೆ.'
            : 'Officer 3 collects the Voter Slip, checks your inked finger, and presses “Ballot” on the Control Unit—illuminating the green READY lamp on the Ballot Unit.',
        };
      case 'VOTING_COMPARTMENT':
        return {
          title: isKn ? 'ಹಂತ 5: ಮತದಾನದ ಕೊಠಡಿ (EVM ಬ್ಯಾಲೆಟ್ ಯೂನಿಟ್)' : 'Step 5: Voting Compartment (Press Blue Button)',
          body: isKn
            ? 'ನಿಮ್ಮ ಆಯ್ಕೆಯ ಅಭ್ಯರ್ಥಿ ಅಥವಾ NOTA ಪಕ್ಕದ ನೀಲಿ ಬಟನ್ ಅನ್ನು ಒಮ್ಮೆ ಒತ್ತಿ (Tab + Enter ಮೂಲಕವೂ ಒತ್ತಬಹುದು).'
            : 'Inside the private voting compartment, press the tactile blue button beside your chosen candidate or NOTA once (supports Tab + Enter).',
        };
      case 'VVPAT_ACTIVE':
        return {
          title: isKn ? 'ಹಂತ 6: VVPAT 7-ಸೆಕೆಂಡ್ ಪರಿಶೀಲನೆ' : 'Step 6: VVPAT 7-Second Verification Window',
          body: isKn
            ? 'ಕೆಂಪು ದೀಪ ಬೆಳಗಿ ದೀರ್ಘ BEEP ಶಬ್ದ ಬರುತ್ತದೆ. ಗಾಜಿನ ಕಿಟಕಿಯಲ್ಲಿ 7 ಸೆಕೆಂಡ್ ನಿಮ್ಮ ಆಯ್ಕೆಯ ಕ್ರಮಸಂಖ್ಯೆ, ಹೆಸರು ಮತ್ತು ಚಿಹ್ನೆ ಕಾಣಿಸುತ್ತದೆ.'
            : 'The red candidate lamp glows and a long BEEP sounds. Verify the printed slip (serial number, name, symbol) behind the VVPAT glass for 7 seconds.',
        };
      case 'SLIP_DROP':
        return {
          title: isKn ? 'ಹಂತ 7: ಚೀಟಿ ಕತ್ತರಿಸುವಿಕೆ ಮತ್ತು ಸೀಲ್ ಬಾಕ್ಸ್' : 'Step 7: Slip Cut & Drop into Sealed Box',
          body: isKn
            ? '7 ಸೆಕೆಂಡ್ ನಂತರ ಚೀಟಿ ಕತ್ತರಿಸಲ್ಪಟ್ಟು ಸೀಲ್ ಮಾಡಿದ VVPAT ಪೆಟ್ಟಿಗೆಗೆ ಬೀಳುತ್ತದೆ ಮತ್ತು ಮತಯಂತ್ರ ಲಾಕ್ ಆಗುತ್ತದೆ.'
            : 'After 7 seconds, the cutter detaches the slip and drops it into the sealed VVPAT box while the Ballot Unit locks automatically.',
        };
      case 'LOCKED_RECORDED':
        return {
          title: isKn ? 'ಹಂತ 8: ಮತ ದಾಖಲಾಗಿದೆ (ಗೌಪ್ಯತೆ ರಕ್ಷಿತ)' : 'Step 8: Vote Recorded (Secrecy Preserved)',
          body: isKn
            ? 'ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್ ಕೇವಲ ಒಟ್ಟು ಮತಗಳನ್ನು ಎಣಿಸುತ್ತದೆ—ಯಾರು ಯಾರಿಗೆ ಮತ ಹಾಕಿದರು ಎಂಬ ಮಾಹಿತಿಯನ್ನು ಎಂದಿಗೂ ಉಳಿಸುವುದಿಲ್ಲ.'
            : 'Your mock vote is recorded anonymously in the booth tally. Notice that your mock EPIC is NEVER stored alongside your candidate choice.',
        };
    }
  };

  const narration = getStepNarration();
  const totalEvm = Object.values(tally.evmCounts).reduce((a, b) => a + b, 0);
  const totalVvpat = Object.values(tally.vvpatCounts).reduce((a, b) => a + b, 0);
  const countsMatch = totalEvm === totalVvpat;

  return (
    <section
      id="booth"
      aria-labelledby="heading-booth"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {isKn
                ? 'ಮಾಡ್ಯೂಲ್ 06 & 07 · ಸ್ಥಳ ಆಯ್ಕೆ ಮತ್ತು ಅಣಕು ಮತಗಟ್ಟೆ'
                : 'Module 06 & 07 · Location Selection & Virtual Polling Booth'}
            </p>
            <h2
              id="heading-booth"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
            >
              {isKn
                ? 'ಜಿಲ್ಲೆ → ಕ್ಷೇತ್ರ → ಬೂತ್ ಆಯ್ಕೆ ಮತ್ತು ನೈಜ ಮಾದರಿಯ EVM / VVPAT ಅಭ್ಯಾಸ'
                : 'Select Constituency & Booth, then Practice on the EVM & VVPAT Simulator'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowExplainerSidebar(!showExplainerSidebar)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 cursor-pointer shrink-0"
          >
            {showExplainerSidebar ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showExplainerSidebar
                ? isKn
                  ? 'ವಿವರಣಾ ಫಲಕ ಮರೆಮಾಡಿ'
                  : 'Hide “What just happened?”'
                : isKn
                  ? 'ವಿವರಣಾ ಫಲಕ ತೋರಿಸಿ'
                  : 'Show “What just happened?”'}
            </span>
          </button>
        </div>

        {/* MODULE 6: Cascading District -> Constituency -> Booth Select */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div>
              <label
                htmlFor="sim-district"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
              >
                {isKn ? '1. ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ' : '1. Select District'}
              </label>
              <select
                id="sim-district"
                value={selectedDistrictId}
                onChange={(e) => {
                  const nextDist = e.target.value;
                  onSelectionChange(nextDist, '', '');
                  setInVirtualBooth(false);
                }}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
              >
                <option value="">{isKn ? '-- ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ --' : '-- Choose District --'}</option>
                {KARNATAKA_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {isKn ? d.nameKn : d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sim-constituency"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
              >
                {isKn ? '2. ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ ಆಯ್ಕೆಮಾಡಿ' : '2. Select Assembly Constituency'}
              </label>
              <select
                id="sim-constituency"
                value={selectedConstituencyId}
                disabled={!selectedDistrictId}
                onChange={(e) => {
                  onSelectionChange(selectedDistrictId, e.target.value, '');
                  setInVirtualBooth(false);
                }}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 disabled:opacity-50"
              >
                <option value="">{isKn ? '-- ಕ್ಷೇತ್ರ ಆಯ್ಕೆಮಾಡಿ --' : '-- Choose Constituency --'}</option>
                {constituenciesInDistrict.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} · {isKn ? c.nameKn : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sim-booth"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
              >
                {isKn ? '3. ಮಾದರಿ ಮತಗಟ್ಟೆ (ಬೂತ್) ಆಯ್ಕೆಮಾಡಿ' : '3. Select Sample Polling Station'}
              </label>
              <select
                id="sim-booth"
                value={selectedBoothId}
                disabled={!selectedConstituencyId}
                onChange={(e) => {
                  onSelectionChange(selectedDistrictId, selectedConstituencyId, e.target.value);
                  setInVirtualBooth(false);
                }}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 disabled:opacity-50"
              >
                <option value="">{isKn ? '-- ಬೂತ್ ಆಯ್ಕೆಮಾಡಿ --' : '-- Choose Sample Booth --'}</option>
                {(activeConstituency?.booths || []).map((b) => (
                  <option key={b.id} value={b.id}>
                    {isKn ? b.nameKn : b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              {canEnterBooth ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {isKn
                    ? `ಸಿದ್ಧವಾಗಿದೆ: ${activeConstituency?.nameKn} · ${activeBooth?.boothNumber} (${candidates.length} ಮತಪತ್ರ ಸಾಲುಗಳು)`
                    : `Ready: ${activeConstituency?.name} · ${activeBooth?.boothNumber} (${candidates.length} ballot rows loaded in ECI order)`}
                </span>
              ) : (
                <span className="text-amber-700 dark:text-amber-400 font-medium">
                  {isKn
                    ? 'ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ ಮತ್ತು ಮಾದರಿ ಮತಗಟ್ಟೆ ಎರಡನ್ನೂ ಆಯ್ಕೆಮಾಡಿ.'
                    : 'Please select BOTH an Assembly Constituency and a Sample Polling Station to enable the Virtual Booth.'}
                </span>
              )}
            </div>

            <button
              type="button"
              disabled={!canEnterBooth}
              onClick={handleEnterBooth}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed min-h-[42px]"
            >
              {isKn ? 'ಅಣಕು ಮತಗಟ್ಟೆ ಪ್ರವೇಶಿಸಿ' : 'Enter Virtual Booth'}
            </button>
          </div>
        </div>

        {/* Booth Floor-Plan SVG */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-8">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3">
            {isKn ? 'ಮತಗಟ್ಟೆ ಒಳಾಂಗಣ ನಕ್ಷೆ (ಹಂತಗಳ ಹರಿವು)' : 'Polling Booth Floor Plan (Live Flow)'}
          </h3>
          <svg
            viewBox="0 0 920 150"
            className="w-full h-auto"
            role="img"
            aria-label="Polling booth floor plan from queue through Officers 1, 2, 3 to voting compartment and exit"
          >
            {[
              { x: 14, label: isKn ? '1. ಸಾಲು & ಪಟ್ಟಿ' : '1. Queue & Roll', active: boothState === 'IDLE' },
              { x: 164, label: isKn ? '2. ಅಧಿಕಾರಿ 1 (ID)' : '2. Officer 1 (ID)', active: boothState === 'OFFICER_1' },
              { x: 314, label: isKn ? '3. ಅಧಿಕಾರಿ 2 (ಶಾಯಿ)' : '3. Officer 2 (Ink/17A)', active: boothState === 'OFFICER_2' },
              { x: 464, label: isKn ? '4. ಅಧಿಕಾರಿ 3 (CU)' : '4. Officer 3 (CU)', active: boothState === 'OFFICER_3' },
              {
                x: 614,
                label: isKn ? '5. ಮತ ಕೊಠಡಿ (EVM)' : '5. Voting Compartment',
                active:
                  boothState === 'VOTING_COMPARTMENT' ||
                  boothState === 'VVPAT_ACTIVE' ||
                  boothState === 'SLIP_DROP',
              },
              { x: 764, label: isKn ? '6. ನಿರ್ಗಮನ' : '6. Exit Recorded', active: boothState === 'LOCKED_RECORDED' },
            ].map((station, i) => (
              <g key={station.label}>
                <rect
                  x={station.x}
                  y="24"
                  width="136"
                  height="96"
                  rx="10"
                  fill={station.active ? '#1D4ED8' : 'currentColor'}
                  className={station.active ? '' : 'text-slate-100 dark:text-slate-800'}
                  stroke={station.active ? '#1E3A8A' : '#94A3B8'}
                  strokeWidth="1.5"
                />
                <text
                  x={station.x + 68}
                  y="76"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={station.active ? '#FFFFFF' : 'currentColor'}
                  className={station.active ? '' : 'text-slate-800 dark:text-slate-100'}
                >
                  {station.label}
                </text>
                {i < 5 && (
                  <path
                    d={`M${station.x + 138} 72 L${station.x + 162} 72`}
                    stroke="#64748B"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                )}
              </g>
            ))}
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#64748B" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* MODULE 7: VIRTUAL POLLING BOOTH */}
        {inVirtualBooth && canEnterBooth && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Interactive Booth Stage */}
            <div
              className={`${showExplainerSidebar ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}
            >
              {/* Screen-reader live state announcement */}
              <div className="sr-only" aria-live="polite">
                {narration.title}: {narration.body}
              </div>

              {/* Booth Header & EVM Working Condition Status */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400">
                      {activeConstituency?.code} · {isKn ? activeConstituency?.nameKn : activeConstituency?.name} · {activeBooth?.boothNumber}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mt-0.5">
                      {narration.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono-tabular font-semibold">
                    {tally.isClosed ? (
                      <span className="text-red-700 dark:text-red-400">
                        {isKn ? '● ಮತದಾನ ಮುಕ್ತಾಯ' : '● POLL CLOSED'}
                      </span>
                    ) : boothState === 'VOTING_COMPARTMENT' ? (
                      <span className="text-emerald-700 dark:text-emerald-400">
                        {isKn ? '● ಯಂತ್ರ ಸಿದ್ಧ (READY)' : '● BALLOT UNIT READY'}
                      </span>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-300">
                        {isKn ? `ಒಟ್ಟು ಅಣಕು ಮತಗಳು: ${tally.totalVotes}` : `Mock Votes Cast: ${tally.totalVotes}`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Live EVM Working Condition & Control Unit Hardware Strip */}
                <div className="mt-4 p-3 rounded-lg bg-slate-900 text-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-tabular">
                  <div>
                    <div className="text-[10px] text-slate-400">{isKn ? 'ವಿದ್ಯುತ್ ಮೂಲ' : 'POWER (STANDALONE)'}</div>
                    <div className="text-emerald-400 font-semibold mt-0.5">7.5V BATTERY OK</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">{isKn ? 'ಯಂತ್ರ ಸಂಪರ್ಕ' : 'CU ↔ BU ↔ VVPAT'}</div>
                    <div className="text-emerald-400 font-semibold mt-0.5">LINKED · NO WI-FI</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">{isKn ? 'ಬ್ಯಾಲೆಟ್ ಸ್ಥಿತಿ' : 'BALLOT LAMP'}</div>
                    <div className={`font-semibold mt-0.5 ${boothState === 'VOTING_COMPARTMENT' ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {tally.isClosed
                        ? 'CLOSED'
                        : boothState === 'VOTING_COMPARTMENT'
                          ? 'GREEN · READY'
                          : boothState === 'VVPAT_ACTIVE'
                            ? 'RED · BUSY'
                            : 'STANDBY / LOCKED'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">{isKn ? 'CU ಒಟ್ಟು ಮತಗಳು' : 'CU TOTAL VOTES'}</div>
                    <div className="text-white font-bold mt-0.5">{String(tally.totalVotes).padStart(4, '0')}</div>
                  </div>
                </div>

                {/* STATE: IDLE */}
                {boothState === 'IDLE' && !tally.isClosed && (
                  <div className="pt-5 space-y-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {isKn
                        ? 'ತಾತ್ಕಾಲಿಕ ಕಾಲ್ಪನಿಕ ಮತದಾರರ ವಿವರವನ್ನು ಸೃಷ್ಟಿಸಲಾಗಿದೆ (ನಿಜವಾದ ವೈಯಕ್ತಿಕ ಡೇಟಾ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ):'
                        : 'Simulated voter arrival with a generated mock EPIC (no real personal data collected):'}
                    </p>
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {isKn ? 'ಅಣಕು ಮತದಾರರ EPIC ಸಂಖ್ಯೆ' : 'Generated Mock EPIC'}
                        </div>
                        <div className="font-mono-tabular text-base font-bold text-slate-900 dark:text-slate-100">
                          {mockEpic}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setBoothState('OFFICER_1')}
                          className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                        >
                          {isKn ? 'ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಖಚಿತಪಡಿಸಿ → ಅಧಿಕಾರಿ 1' : 'Confirm Name in Roll → Officer 1'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setInkApplied(true);
                            setForm17aSigned(true);
                            playControlUnitReadyChime(muted, onSoundCaption);
                            setBoothState('VOTING_COMPARTMENT');
                          }}
                          className="px-4 py-2.5 text-sm font-semibold rounded-lg border border-emerald-700 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                        >
                          {isKn ? 'ನೇರ EVM ಪರೀಕ್ಷೆ (ಅಧಿಕಾರಿ 1-3 ದಾಟಿಸಿ)' : 'Quick EVM Test (Skip to Ballot Unit)'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STATE: OFFICER_1 */}
                {boothState === 'OFFICER_1' && (
                  <div className="pt-5 space-y-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {isKn
                        ? 'ಅಧಿಕಾರಿ 1: ಗುರುತಿನ ಚೀಟಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ (EPIC ಅಥವಾ ECI ಮಾನ್ಯ ಪರ್ಯಾಯ ಫೋಟೋ ID):'
                        : 'Polling Officer 1: Select an ID presented at the desk (EPIC or ECI-approved alternative photo ID):'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['EPIC', 'Passport', 'Driving Licence', 'Aadhaar', 'PAN Card'].map((doc) => (
                        <button
                          key={doc}
                          type="button"
                          onClick={() => setSelectedIdDoc(doc)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                            selectedIdDoc === doc
                              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900'
                              : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {doc}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setBoothState('OFFICER_2')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>
                        {isKn
                          ? `${selectedIdDoc} ಪರಿಶೀಲಿಸಿ → ಅಧಿಕಾರಿ 2`
                          : `Verify ${selectedIdDoc} → Officer 2`}
                      </span>
                    </button>
                  </div>
                )}

                {/* STATE: OFFICER_2 */}
                {boothState === 'OFFICER_2' && (
                  <div className="pt-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {isKn ? '1. ಎಡ ತೋರುಬೆರಳಿಗೆ ಶಾಯಿ' : '1. Left Forefinger Indelible Ink'}
                          </span>
                          {/* Finger SVG */}
                          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                            <rect x="11" y="5" width="10" height="22" rx="5" fill="#E8B896" stroke="#9A6B4C" />
                            <rect x="13" y="7" width="6" height="5" rx="2" fill="#FDE6D8" />
                            {inkApplied && (
                              <line x1="16" y1="6" x2="16" y2="14" stroke="#312E81" strokeWidth="3.5" strokeLinecap="round" />
                            )}
                          </svg>
                        </div>
                        <button
                          type="button"
                          onClick={() => setInkApplied(true)}
                          className={`w-full px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
                            inkApplied
                              ? 'bg-emerald-700 text-white'
                              : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {inkApplied
                            ? isKn
                              ? '✓ ಶಾಯಿ ಹಚ್ಚಲಾಗಿದೆ'
                              : '✓ Indelible Ink Applied'
                            : isKn
                              ? 'ಅಳಿಸಲಾಗದ ಶಾಯಿ ಹಚ್ಚಿ'
                              : 'Apply Indelible Ink'}
                        </button>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                          {isKn ? '2. ಫಾರ್ಮ್ 17A ಸಹಿ & ಮತದಾರರ ಚೀಟಿ' : '2. Form 17A Signature & Voter Slip'}
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm17aSigned(true)}
                          className={`w-full px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer ${
                            form17aSigned
                              ? 'bg-emerald-700 text-white'
                              : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {form17aSigned
                            ? isKn
                              ? '✓ ಫಾರ್ಮ್ 17A ಸಹಿ & ಚೀಟಿ ಸಿದ್ಧ'
                              : '✓ Form 17A Signed & Slip Issued'
                            : isKn
                              ? 'ಫಾರ್ಮ್ 17A ಸಹಿ ಮಾಡಿ'
                              : 'Sign Form 17A & Issue Slip'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!inkApplied || !form17aSigned}
                      onClick={() => setBoothState('OFFICER_3')}
                      className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isKn ? 'ಅಧಿಕಾರಿ 3 (ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್) ಕಡೆಗೆ ಸಾಗಿರಿ' : 'Proceed to Officer 3 (Control Unit)'}
                    </button>
                  </div>
                )}

                {/* STATE: OFFICER_3 */}
                {boothState === 'OFFICER_3' && (
                  <div className="pt-5 space-y-4">
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {isKn ? 'ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್ (Control Unit)' : 'Control Unit Console'}
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                          {isKn
                            ? 'ಅಧಿಕಾರಿ 3 ಮತದಾರರ ಚೀಟಿ ಸಂಗ್ರಹಿಸಿ, ಮತಯಂತ್ರವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು “Ballot” ಬಟನ್ ಒತ್ತುತ್ತಾರೆ.'
                            : 'Officer 3 collects the Voter Slip and presses “Release Ballot” to unlock one vote inside the compartment.'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          playControlUnitReadyChime(muted, onSoundCaption);
                          setBoothState('VOTING_COMPARTMENT');
                        }}
                        className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shrink-0 cursor-pointer"
                      >
                        {isKn ? 'ಬ್ಯಾಲೆಟ್ ಬಿಡುಗಡೆ ಮಾಡಿ (Ballot Ready)' : 'Release Ballot (Turn READY Lamp On)'}
                      </button>
                    </div>
                  </div>
                )}

                {/* STATE: VOTING_COMPARTMENT / VVPAT_ACTIVE / SLIP_DROP / LOCKED_RECORDED */}
                {(boothState === 'VOTING_COMPARTMENT' ||
                  boothState === 'VVPAT_ACTIVE' ||
                  boothState === 'SLIP_DROP' ||
                  boothState === 'LOCKED_RECORDED') && (
                  <div className="pt-5 space-y-5">
                    {machineBusyNotice && (
                      <div
                        role="alert"
                        className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{machineBusyNotice}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* EVM BALLOT UNIT */}
                      <div className="md:col-span-7 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-4">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-300 dark:border-slate-800">
                          <span className="text-xs font-bold tracking-wide text-slate-700 dark:text-slate-200">
                            {isKn ? 'EVM ಬ್ಯಾಲೆಟ್ ಯೂನಿಟ್ (Ballot Unit)' : 'EVM BALLOT UNIT'}
                          </span>
                          <div className="flex items-center gap-2 text-xs font-mono-tabular font-semibold">
                            <span
                              className={`inline-block w-3 h-3 rounded-full border ${
                                boothState === 'VOTING_COMPARTMENT'
                                  ? 'bg-emerald-500 border-emerald-700'
                                  : 'bg-slate-400 border-slate-500'
                              }`}
                              aria-hidden="true"
                            />
                            <span
                              className={
                                boothState === 'VOTING_COMPARTMENT'
                                  ? 'text-emerald-700 dark:text-emerald-400'
                                  : 'text-slate-500'
                              }
                            >
                              {boothState === 'VOTING_COMPARTMENT' ? 'READY' : 'LOCKED'}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {candidates.map((cand) => {
                            const party = getPartyById(cand.partyId);
                            const isChosen = votedCandidate?.id === cand.id;
                            const redLampOn =
                              isChosen &&
                              (boothState === 'VVPAT_ACTIVE' ||
                                boothState === 'SLIP_DROP' ||
                                boothState === 'LOCKED_RECORDED');

                            return (
                              <div
                                key={cand.id}
                                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="font-mono-tabular text-xs font-bold text-slate-500 w-5 text-center shrink-0">
                                    {String(cand.serialNo || 0).padStart(2, '0')}
                                  </span>
                                  <img
                                    src={getAvatarDataUri(cand.avatarSeed, cand.isNota)}
                                    alt=""
                                    width={34}
                                    height={34}
                                    className="rounded-md shrink-0 border border-slate-200 dark:border-slate-700"
                                  />
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                                      {isKn ? cand.fictionalNameKn : cand.fictionalName}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                      {party.shortName}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2.5 shrink-0">
                                  <PartySymbolSvg
                                    symbolKey={party.symbolKey}
                                    color={party.colour}
                                    size={28}
                                    label={party.shortName}
                                  />
                                  {/* Red Candidate LED */}
                                  <span
                                    aria-label={redLampOn ? 'Selected lamp lit' : 'Lamp off'}
                                    className={`w-3 h-3 rounded-full border transition-colors ${
                                      redLampOn
                                        ? 'bg-red-600 border-red-800 shadow-[0_0_8px_rgba(220,38,38,0.85)]'
                                        : 'bg-slate-200 dark:bg-slate-700 border-slate-400'
                                    }`}
                                  />
                                  {/* Tactile Blue Button */}
                                  <button
                                    type="button"
                                    onClick={() => handlePressCandidateButton(cand)}
                                    aria-label={`Vote for ${cand.fictionalName} (${party.shortName})`}
                                    className={`w-14 h-9 rounded-md font-semibold text-[11px] text-white transition-transform active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                                      boothState === 'VOTING_COMPARTMENT'
                                        ? 'bg-blue-700 hover:bg-blue-800 shadow-xs'
                                        : 'bg-blue-900/50 cursor-not-allowed'
                                    }`}
                                  >
                                    {isKn ? 'ಒತ್ತಿ' : 'VOTE'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* VVPAT UNIT */}
                      <div className="md:col-span-5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-4 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-300 dark:border-slate-800">
                          <span className="text-xs font-bold tracking-wide text-slate-700 dark:text-slate-200">
                            {isKn ? 'VVPAT ಪರಿಶೀಲನಾ ಕಿಟಕಿ' : 'VVPAT WINDOW'}
                          </span>
                          {boothState === 'VVPAT_ACTIVE' && (
                            <span className="font-mono-tabular text-xs font-bold text-red-700 dark:text-red-400">
                              {vvpatSecondsLeft}s
                            </span>
                          )}
                        </div>

                        {/* Transparent VVPAT Display Window */}
                        <div className="relative h-44 rounded-lg border-4 border-slate-400 dark:border-slate-700 bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-3">
                          {boothState === 'VOTING_COMPARTMENT' && (
                            <p className="text-xs text-slate-400 text-center">
                              {isKn
                                ? 'ಬಟನ್ ಒತ್ತಿದ ನಂತರ ಇಲ್ಲಿ 7 ಸೆಕೆಂಡ್ ಮತ ಚೀಟಿ ಕಾಣಿಸುತ್ತದೆ'
                                : 'Paper slip will appear here for 7 seconds after you press a blue button'}
                            </p>
                          )}

                          {(boothState === 'VVPAT_ACTIVE' || boothState === 'SLIP_DROP') &&
                            votedCandidate && (
                              <div
                                className={`w-44 bg-amber-50 text-slate-900 rounded border border-amber-300 p-3 shadow-md flex flex-col items-center text-center gap-1.5 ${
                                  boothState === 'SLIP_DROP' ? 'animate-vvpat-drop' : ''
                                }`}
                              >
                                <div className="text-[10px] font-mono font-bold text-slate-500">
                                  SLIP #{String(votedCandidate.serialNo || 0).padStart(2, '0')}
                                </div>
                                <PartySymbolSvg
                                  symbolKey={getPartyById(votedCandidate.partyId).symbolKey}
                                  color={getPartyById(votedCandidate.partyId).colour}
                                  size={34}
                                />
                                <div className="text-xs font-bold leading-tight">
                                  {isKn ? votedCandidate.fictionalNameKn : votedCandidate.fictionalName}
                                </div>
                                <div className="text-[10px] text-slate-600">
                                  {getPartyById(votedCandidate.partyId).shortName}
                                </div>
                              </div>
                            )}

                          {boothState === 'LOCKED_RECORDED' && (
                            <div className="text-center space-y-1">
                              <Lock className="w-6 h-6 text-emerald-400 mx-auto" />
                              <p className="text-xs font-semibold text-emerald-300">
                                {isKn ? 'ಚೀಟಿ ಸೀಲ್ ಬಾಕ್ಸ್‌ಗೆ ಬಿದ್ದಿದೆ' : 'Slip dropped into sealed box'}
                              </p>
                            </div>
                          )}
                        </div>

                        {boothState === 'VVPAT_ACTIVE' && (
                          <div className="space-y-1">
                            <div className="h-2 w-full rounded-full bg-slate-300 dark:bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-blue-700 transition-all duration-1000"
                                style={{ width: `${(vvpatSecondsLeft / 7) * 100}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 text-center">
                              {isKn
                                ? `BEEP ಶಬ್ದದೊಂದಿಗೆ ${vvpatSecondsLeft} ಸೆಕೆಂಡ್ ಪರಿಶೀಲಿಸಿ...`
                                : `Viewing printed slip (${vvpatSecondsLeft}s remaining)...`}
                            </p>
                          </div>
                        )}

                        {/* SIMULATION ONLY Confirmation Panel with Candidate Photo + Honest Education Callout */}
                        {boothState === 'LOCKED_RECORDED' && votedCandidate && (
                          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-3">
                            <div className="text-[11px] font-bold text-blue-700 dark:text-blue-400">
                              {isKn
                                ? 'ಸಿಮ್ಯುಲೇಶನ್ ಮಾತ್ರ – ದೃಢೀಕರಣ ಫಲಕ'
                                : 'SIMULATION ONLY – CONFIRMATION'}
                            </div>
                            <div className="flex items-center gap-3">
                              <img
                                src={getAvatarDataUri(votedCandidate.avatarSeed, votedCandidate.isNota)}
                                alt={votedCandidate.fictionalName}
                                width={44}
                                height={44}
                                className="rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                                  {isKn ? votedCandidate.fictionalNameKn : votedCandidate.fictionalName}
                                </div>
                                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                                  {getPartyById(votedCandidate.partyId).shortName} · #{votedCandidate.serialNo}
                                </div>
                              </div>
                            </div>

                            {showPhotoEducationPopup && (
                              <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                                <strong>{isKn ? 'ನಿಜಾಂಶ ತಿಳಿಯಿರಿ:' : 'Real-world fact:'}</strong>{' '}
                                {isKn
                                  ? 'ನಿಜವಾದ VVPAT ಕಾಗದದ ಚೀಟಿಯಲ್ಲಿ ಕ್ರಮಸಂಖ್ಯೆ, ಅಭ್ಯರ್ಥಿಯ ಹೆಸರು ಮತ್ತು ಪಕ್ಷದ ಚಿಹ್ನೆ ಮಾತ್ರ ಇರುತ್ತದೆ (ಫೋಟೋ ಇರುವುದಿಲ್ಲ). ಕಲಿಕೆಯ ದೃಢೀಕರಣಕ್ಕಾಗಿ ಮಾತ್ರ ಇಲ್ಲಿ ಚಿತ್ರ ತೋರಿಸಲಾಗಿದೆ.'
                                  : 'A real VVPAT slip prints ONLY the serial number, candidate name, and party symbol—never a photo. We display the avatar here strictly as a simulation learning aid.'}
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={handleNextVoter}
                              className="w-full px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 cursor-pointer"
                            >
                              {isKn ? 'ಮುಂದಿನ ಮತದಾರರು (Next Voter)' : 'Next Voter (Return to IDLE)'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {tally.isClosed && boothState === 'IDLE' && (
                  <div className="pt-5 text-sm text-slate-700 dark:text-slate-300">
                    {isKn
                      ? 'ಈ ಮತಗಟ್ಟೆಯಲ್ಲಿ ಮತದಾನ ಮುಕ್ತಾಯವಾಗಿದೆ. ಫಲಿತಾಂಶ ನೋಡಲು ಅಥವಾ ಮರುಹೊಂದಿಸಲು ಕೆಳಗಿನ ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿ ಪ್ಯಾನೆಲ್ ಬಳಸಿ.'
                      : 'Polling is closed for this booth. Use the Presiding Officer panel below to view results or reset the booth.'}
                  </div>
                )}
              </div>

              {/* PRESIDING OFFICER PANEL */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                      <span>{isKn ? 'ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿ ನಿಯಂತ್ರಣ ಫಲಕ' : 'Presiding Officer Panel'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {isKn
                        ? 'ಮತದಾನ ರಹಸ್ಯ: ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್ ಕೇವಲ ಬೂತ್‌ವಾರು ಒಟ್ಟು ಮತಗಳನ್ನು ಮಾತ್ರ ಉಳಿಸುತ್ತದೆ.'
                        : 'Vote secrecy enforced: Control Unit stores booth totals only—never which voter chose whom.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={tally.isClosed}
                      onClick={handleClosePoll}
                      className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 disabled:opacity-40 cursor-pointer"
                    >
                      {isKn ? 'ಮತದಾನ ಮುಕ್ತಾಯ (Close Poll)' : 'Close Poll'}
                    </button>
                    <button
                      type="button"
                      disabled={!tally.isClosed}
                      onClick={() => setShowResultsPanel(!showResultsPanel)}
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-blue-700 text-blue-700 dark:text-blue-400 dark:border-blue-500 disabled:opacity-40 cursor-pointer"
                    >
                      {isKn ? 'ಫಲಿತಾಂಶ ನೋಡಿ (Result)' : 'Result'}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetBooth}
                      className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isKn ? 'ಬೂತ್ ಮರುಹೊಂದಿಸಿ' : 'Reset Booth'}</span>
                    </button>
                  </div>
                </div>

                {showResultsPanel && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {isKn ? 'EVM vs VVPAT ತಾಳೆ ಪರಿಶೀಲನೆ:' : 'Mismatch Audit Check:'}
                      </span>
                      <span className="font-mono-tabular font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          EVM ({totalEvm}) = VVPAT ({totalVvpat}) · {countsMatch ? 'MATCHED' : 'MISMATCH'}
                        </span>
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                            <th className="py-2 pr-3">#</th>
                            <th className="py-2 pr-3">{isKn ? 'ಅಭ್ಯರ್ಥಿ (ಕಾಲ್ಪನಿಕ)' : 'Candidate (Fictional)'}</th>
                            <th className="py-2 pr-3">{isKn ? 'ಪಕ್ಷ' : 'Party'}</th>
                            <th className="py-2 pr-3 text-right">EVM</th>
                            <th className="py-2 text-right">VVPAT</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {candidates.map((cand) => {
                            const party = getPartyById(cand.partyId);
                            const evmC = tally.evmCounts[cand.id] || 0;
                            const vvpatC = tally.vvpatCounts[cand.id] || 0;
                            return (
                              <tr key={cand.id}>
                                <td className="py-2 pr-3 font-mono-tabular">{cand.serialNo}</td>
                                <td className="py-2 pr-3 font-medium text-slate-900 dark:text-slate-100">
                                  {isKn ? cand.fictionalNameKn : cand.fictionalName}
                                </td>
                                <td className="py-2 pr-3 text-slate-600 dark:text-slate-300">{party.shortName}</td>
                                <td className="py-2 pr-3 text-right font-mono-tabular font-semibold">{evmC}</td>
                                <td className="py-2 text-right font-mono-tabular font-semibold">{vvpatC}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live "What just happened?" Explainer Sidebar */}
            {showExplainerSidebar && (
              <aside className="lg:col-span-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  {isKn ? 'ಈಗ ಏನಾಯಿತು? (ನೇರ ವಿವರಣೆ)' : 'What just happened?'}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {narration.title}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {narration.body}
                </p>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
                  <p>
                    {isKn
                      ? '• ಕೀಬೋರ್ಡ್: Tab ಮತ್ತು Enter ಒತ್ತಿ ಮತ ಚಲಾಯಿಸಬಹುದು.'
                      : '• Keyboard accessible: use Tab & Enter to navigate and cast a mock vote.'}
                  </p>
                  <p>
                    {isKn
                      ? '• ಮತ ಗೌಪ್ಯತೆ: ನಿಮ್ಮ EPIC ಸಂಖ್ಯೆಯನ್ನು ಮತದೊಂದಿಗೆ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.'
                      : '• Vote secrecy: mock EPIC is never linked to your chosen candidate.'}
                  </p>
                </div>
              </aside>
            )}
          </div>
        )}

        <NextStepBar language={language} label={t.nextToCounting} onNext={onNext} />
      </div>
    </section>
  );
};
