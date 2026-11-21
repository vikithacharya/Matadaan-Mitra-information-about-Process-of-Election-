import React, { useMemo, useState } from 'react';
import { HelpCircle, Search, Scale } from 'lucide-react';
import type { Candidate, Language } from '../types/election';
import {
  KARNATAKA_CONSTITUENCIES,
  PARTIES,
  PARTY_LIST_AS_OF,
  getAvatarDataUri,
  getCandidatesForConstituency,
  getPartyById,
} from '../data/karnatakaData';
import { UI_STRINGS } from '../data/translations';
import { PartySymbolSvg } from './PartySymbolSvg';
import { NextStepBar } from './NextStepBar';

interface ModulePartiesCandidatesProps {
  language: Language;
  selectedConstituencyId: string;
  onNext: () => void;
  onMarkExplored: (id: string) => void;
}

export const ModulePartiesCandidates: React.FC<ModulePartiesCandidatesProps> = ({
  language,
  selectedConstituencyId,
  onNext,
  onMarkExplored,
}) => {
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const [constituencyId, setConstituencyId] = useState<string>(
    selectedConstituencyId || KARNATAKA_CONSTITUENCIES[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [partyFilter, setPartyFilter] = useState<string>('all');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showOrderExplainer, setShowOrderExplainer] = useState(false);

  const constituencyCandidates = useMemo(
    () => getCandidatesForConstituency(constituencyId),
    [constituencyId]
  );

  const filteredCandidates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return constituencyCandidates.filter((cand) => {
      const party = getPartyById(cand.partyId);
      const matchesParty = partyFilter === 'all' || cand.partyId === partyFilter;
      const matchesQuery =
        !q ||
        cand.fictionalName.toLowerCase().includes(q) ||
        cand.fictionalNameKn.toLowerCase().includes(q) ||
        party.name.toLowerCase().includes(q) ||
        party.shortName.toLowerCase().includes(q);
      return matchesParty && matchesQuery;
    });
  }, [constituencyCandidates, partyFilter, searchQuery]);

  const toggleCompare = (cand: Candidate) => {
    onMarkExplored('parties');
    setCompareIds((prev) => {
      if (prev.includes(cand.id)) {
        return prev.filter((id) => id !== cand.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), cand.id];
      }
      return [...prev, cand.id];
    });
  };

  const comparedCandidates = constituencyCandidates.filter((c) => compareIds.includes(c.id));

  return (
    <section
      id="parties"
      aria-labelledby="heading-parties"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {isKn ? 'ಮಾಡ್ಯೂಲ್ 05 · ಪಕ್ಷಗಳು ಮತ್ತು ಕಾಲ್ಪನಿಕ ಅಭ್ಯರ್ಥಿಗಳು' : 'Module 05 · Parties & Fictional Candidates'}
            </p>
            <h2
              id="heading-parties"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
            >
              {isKn ? 'ಸಮಾನ ಗೌರವದ ಪಕ್ಷ ಪಟ್ಟಿ ಮತ್ತು ECI ಮತಪತ್ರ ಕ್ರಮ' : 'Equal-Weight Party Directory & ECI Ballot Order'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isKn
              ? `ದಿನಾಂಕ ${PARTY_LIST_AS_OF} ರಂತೆ, eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ`
              : `As of ${PARTY_LIST_AS_OF} · Verify categories on eci.gov.in`}
          </p>
        </div>

        {/* Equal-Weight Party Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {PARTIES.filter((p) => p.id !== 'party-nota').map((party) => (
            <article
              key={party.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <PartySymbolSvg
                  symbolKey={party.symbolKey}
                  color={party.colour}
                  size={44}
                  label={party.name}
                />
                <div className="min-w-0">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span>{party.category}</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>{party.shortName}</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>Est. {party.founded}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 leading-snug mt-0.5">
                    {isKn ? party.nameKn : party.name}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isKn ? party.ideology.kn : party.ideology.en}
              </p>
            </article>
          ))}
        </div>

        {/* Fictional Candidate Ballot Explorer */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                {isKn ? 'ಕಾಲ್ಪನಿಕ ಅಭ್ಯರ್ಥಿಗಳ ಮತಪತ್ರ ಪಟ್ಟಿ' : 'Fictional Candidate Directory (ECI Ballot Order)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isKn
                  ? 'ಎಲ್ಲಾ ಅಭ್ಯರ್ಥಿಗಳ ಹೆಸರು ಮತ್ತು ಭಾವಚಿತ್ರಗಳು ಶೈಕ್ಷಣಿಕ ಉದ್ದೇಶಕ್ಕಾಗಿ ಮಾತ್ರ ಸೃಷ್ಟಿಸಲಾದ ಕಾಲ್ಪನಿಕ ವಿವರಗಳಾಗಿವೆ.'
                  : 'All candidate names and procedurally generated SVG portraits are 100% fictional for educational simulation.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowOrderExplainer(!showOrderExplainer)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shrink-0"
            >
              <HelpCircle className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>{isKn ? 'ಈ ಕ್ರಮ ಏಕೆ?' : 'Why this order?'}</span>
            </button>
          </div>

          {showOrderExplainer && (
            <div className="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {isKn
                ? 'ECI ನಿಯಮದಂತೆ ಮತಪತ್ರದಲ್ಲಿ ಮೊದಲು ಮಾನ್ಯತೆ ಪಡೆದ ರಾಷ್ಟ್ರೀಯ ಪಕ್ಷಗಳು, ನಂತರ ರಾಜ್ಯ ಪಕ್ಷಗಳು, ನಂತರ ನೋಂದಾಯಿತ-ಮಾನ್ಯತೆ ಪಡೆಯದ ಪಕ್ಷಗಳು, ನಂತರ ಪಕ್ಷೇತರರು (ಪ್ರತಿ ಗುಂಪಿನಲ್ಲಿ ವರ್ಣಮಾಲೆ ಕ್ರಮ) ಮತ್ತು ಕೊನೆಯಲ್ಲಿ NOTA ಇರುತ್ತದೆ.'
                : 'By ECI convention, Ballot Units list: (1) Recognised National Parties, (2) Recognised State Parties, (3) Registered-Unrecognised Parties, (4) Independents — alphabetical within each group — and (5) NOTA always last.'}
            </div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div>
              <label htmlFor="cand-constituency-filter" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                {isKn ? 'ಕ್ಷೇತ್ರ' : 'Constituency'}
              </label>
              <select
                id="cand-constituency-filter"
                value={constituencyId}
                onChange={(e) => {
                  setConstituencyId(e.target.value);
                  setCompareIds([]);
                  onMarkExplored('parties');
                }}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
              >
                {KARNATAKA_CONSTITUENCIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} · {isKn ? c.nameKn : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cand-party-filter" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                {isKn ? 'ಪಕ್ಷ ಫಿಲ್ಟರ್' : 'Filter by Party'}
              </label>
              <select
                id="cand-party-filter"
                value={partyFilter}
                onChange={(e) => setPartyFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
              >
                <option value="all">{isKn ? 'ಎಲ್ಲಾ ಪಕ್ಷಗಳು ಮತ್ತು NOTA' : 'All Parties & NOTA'}</option>
                {PARTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.shortName} · {isKn ? p.nameKn : p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cand-search" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                {isKn ? 'ಅಭ್ಯರ್ಥಿ ಹುಡುಕಿ' : 'Search Candidate'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="cand-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isKn ? 'ಹೆಸರು ಅಥವಾ ಪಕ್ಷ...' : 'Name or party...'}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Equal-weight Candidate Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map((cand) => {
              const party = getPartyById(cand.partyId);
              const isCompared = compareIds.includes(cand.id);
              return (
                <div
                  key={cand.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={getAvatarDataUri(cand.avatarSeed, cand.isNota)}
                      alt={isKn ? cand.fictionalNameKn : cand.fictionalName}
                      width={52}
                      height={52}
                      className="rounded-lg shrink-0 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400">
                        #{String(cand.serialNo || 0).padStart(2, '0')} · {party.category}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                        {isKn ? cand.fictionalNameKn : cand.fictionalName}
                      </h4>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {isKn ? party.nameKn : party.name} ({party.shortName})
                      </div>
                    </div>
                    <PartySymbolSvg
                      symbolKey={party.symbolKey}
                      color={party.colour}
                      size={34}
                      label={party.shortName}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-slate-600 dark:text-slate-400 truncate">
                      {cand.isNota
                        ? isKn
                          ? 'ಅಧಿಕೃತ ಮತಪತ್ರ ಆಯ್ಕೆ'
                          : 'Official ballot option'
                        : `${isKn ? 'ವಯಸ್ಸು' : 'Age'} ${cand.age} · ${isKn ? cand.education.kn : cand.education.en}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleCompare(cand)}
                      className={`ml-2 px-2.5 py-1 rounded-md font-semibold shrink-0 cursor-pointer transition-colors ${
                        isCompared
                          ? 'bg-blue-700 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {isCompared ? (isKn ? 'ಆಯ್ದಿದೆ' : 'Added') : isKn ? 'ಹೋಲಿಸಿ' : 'Compare'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side-by-Side Compare View */}
          {comparedCandidates.length > 0 && (
            <div className="mt-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span>{isKn ? 'ಸಮಾನ ತಟಸ್ಥ ಹೋಲಿಕೆ (ಗರಿಷ್ಠ 3)' : 'Neutral Side-by-Side Comparison (up to 3)'}</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setCompareIds([])}
                  className="text-xs text-slate-600 dark:text-slate-300 underline cursor-pointer"
                >
                  {isKn ? 'ತೆರವುಗೊಳಿಸಿ' : 'Clear'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {comparedCandidates.map((cand) => {
                  const party = getPartyById(cand.partyId);
                  return (
                    <div
                      key={cand.id}
                      className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5"
                    >
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {isKn ? cand.fictionalNameKn : cand.fictionalName}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">
                        {isKn ? 'ಪಕ್ಷ:' : 'Party:'} {isKn ? party.nameKn : party.name}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">
                        {isKn ? 'ವರ್ಗ:' : 'Category:'} {party.category}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">
                        {isKn ? 'ಮತಪತ್ರ ಕ್ರಮ:' : 'Ballot Serial:'} #{cand.serialNo}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">
                        {isKn ? 'ವಿದ್ಯಾರ್ಹತೆ:' : 'Education:'} {isKn ? cand.education.kn : cand.education.en}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <NextStepBar language={language} label={t.nextToBooth} onNext={onNext} />
      </div>
    </section>
  );
};
