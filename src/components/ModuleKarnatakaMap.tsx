import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
} from '@vis.gl/react-google-maps';
import { ArrowDown, MapPin } from 'lucide-react';
import type { Constituency, Language, PollingBooth } from '../types/election';
import { ADMIN_HIERARCHY, KARNATAKA_FACTS, LAST_VERIFIED_DATE } from '../data/constants';
import { KARNATAKA_CONSTITUENCIES, KARNATAKA_DISTRICTS } from '../data/karnatakaData';
import { UI_STRINGS } from '../data/translations';
import { NextStepBar } from './NextStepBar';

interface ModuleKarnatakaMapProps {
  language: Language;
  mapsApiKey: string;
  selectedDistrictId: string;
  selectedConstituencyId: string;
  selectedBoothId: string;
  onSelectBooth: (districtId: string, constituencyId: string, boothId: string) => void;
  onEnterBoothFromMap: (districtId: string, constituencyId: string, boothId: string) => void;
  onNext: () => void;
  onMarkExplored: (id: string) => void;
}

interface BoothMarkerItemProps {
  booth: PollingBooth;
  constituency: Constituency;
  districtName: string;
  isSelected: boolean;
  isKn: boolean;
  onSelect: () => void;
  onLaunchSimulator: () => void;
}

const BoothMarkerItem: React.FC<BoothMarkerItemProps> = ({
  booth,
  constituency,
  districtName,
  isSelected,
  isKn,
  onSelect,
  onLaunchSimulator,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setInfoOpen(true);
    }
  }, [isSelected]);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: booth.lat, lng: booth.lng }}
        title={isKn ? booth.nameKn : booth.name}
        onClick={() => {
          onSelect();
          setInfoOpen(true);
        }}
      >
        <Pin
          background={isSelected ? '#1D4ED8' : '#0F766E'}
          borderColor={isSelected ? '#1E3A8A' : '#115E59'}
          glyphColor="#FFFFFF"
          scale={isSelected ? 1.2 : 1.0}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={280}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-slate-900 space-y-1.5">
            <div className="text-[11px] font-mono font-semibold text-blue-700">
              {constituency.code} · {districtName}
            </div>
            <div className="text-sm font-bold leading-snug">
              {isKn ? booth.nameKn : booth.name}
            </div>
            <div className="text-xs text-slate-600">
              {isKn ? booth.accessibility.kn : booth.accessibility.en}
            </div>
            <div className="text-[11px] text-slate-500">
              {isKn
                ? 'ಮಾದರಿ ಶೈಕ್ಷಣಿಕ ಡೇಟಾ — ನಿಜವಾದ ಬೂತ್ ಅನ್ನು voters.eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ'
                : 'Sample educational booth — verify real booth on voters.eci.gov.in'}
            </div>
            <button
              type="button"
              onClick={onLaunchSimulator}
              className="mt-1 w-full px-3 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold cursor-pointer"
            >
              {isKn ? 'ಈ ಬೂತ್ ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಮತ ಅಭ್ಯಾಸ ಮಾಡಿ' : 'Select Booth & Practice Vote'}
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

const MapCameraController: React.FC<{ center: { lat: number; lng: number }; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(zoom);
    }
  }, [map, center, zoom]);

  return null;
};

const MapStatusBanner: React.FC<{ isKn: boolean }> = ({ isKn }) => {
  const status = useApiLoadingStatus();
  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return (
      <div className="p-4 text-xs bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border-b border-amber-200 dark:border-amber-800">
        {isKn
          ? 'ಗೂಗಲ್ ನಕ್ಷೆ ಲೋಡ್ ಆಗಲಿಲ್ಲ. ಕೆಳಗಿನ ಕ್ಷೇತ್ರ ಮತ್ತು ಬೂತ್ ಪಟ್ಟಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿಯೂ ಲಭ್ಯವಿದೆ.'
          : 'Google Maps could not initialize right now. All Karnataka constituency and sample booth lists remain fully usable below.'}
      </div>
    );
  }
  return null;
};

export const ModuleKarnatakaMap: React.FC<ModuleKarnatakaMapProps> = ({
  language,
  mapsApiKey,
  selectedDistrictId,
  selectedConstituencyId,
  selectedBoothId,
  onSelectBooth,
  onEnterBoothFromMap,
  onNext,
  onMarkExplored,
}) => {
  const isKn = language === 'kn';
  const t = UI_STRINGS[language];

  const [mapDistrictId, setMapDistrictId] = useState<string>(
    selectedDistrictId || KARNATAKA_DISTRICTS[0].id
  );
  const [mapConstituencyId, setMapConstituencyId] = useState<string>(
    selectedConstituencyId || ''
  );

  useEffect(() => {
    if (selectedDistrictId) setMapDistrictId(selectedDistrictId);
  }, [selectedDistrictId]);

  useEffect(() => {
    if (selectedConstituencyId) setMapConstituencyId(selectedConstituencyId);
  }, [selectedConstituencyId]);

  const districtConstituencies = KARNATAKA_CONSTITUENCIES.filter(
    (c) => c.districtId === mapDistrictId
  );

  const activeConstituency =
    districtConstituencies.find((c) => c.id === mapConstituencyId) ||
    districtConstituencies[0];

  const activeDistrict =
    KARNATAKA_DISTRICTS.find((d) => d.id === mapDistrictId) || KARNATAKA_DISTRICTS[0];

  const activeBooth = activeConstituency?.booths.find((b) => b.id === selectedBoothId);

  const mapCenter = activeBooth
    ? { lat: activeBooth.lat, lng: activeBooth.lng }
    : activeConstituency
      ? { lat: activeConstituency.lat, lng: activeConstituency.lng }
      : { lat: activeDistrict.lat, lng: activeDistrict.lng };

  const mapZoom = activeBooth ? 14 : 12;

  return (
    <section
      id="karnataka"
      aria-labelledby="heading-karnataka"
      className="py-12 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {isKn
                ? 'ಮಾಡ್ಯೂಲ್ 04 · ಕರ್ನಾಟಕ ಚುನಾವಣಾ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಗೂಗಲ್ ನಕ್ಷೆ'
                : 'Module 04 · Karnataka Election Set-up & Google Maps Booth Explorer'}
            </p>
            <h2
              id="heading-karnataka"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
            >
              {isKn
                ? 'ಕರ್ನಾಟಕ ಕ್ಷೇತ್ರಗಳು, ಮಾದರಿ ಮತಗಟ್ಟೆ ನಕ್ಷೆ ಮತ್ತು ಆಡಳಿತ ಕ್ರಮ'
                : 'Karnataka Constituencies, Sample Booth Map & Electoral Hierarchy'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.verifyTag} · {t.lastVerifiedLabel}: {LAST_VERIFIED_DATE}
          </p>
        </div>

        {/* Karnataka Facts Strip (Full-Width 4-Column Row) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              value: String(KARNATAKA_FACTS.assemblySeats),
              label: isKn ? 'ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರಗಳು (ಪರಿಶೀಲಿಸಿ)' : 'Assembly Seats (verify on eci.gov.in)',
            },
            {
              value: String(KARNATAKA_FACTS.lokSabhaSeats),
              label: isKn ? 'ಲೋಕಸಭಾ ಕ್ಷೇತ್ರಗಳು (ಪರಿಶೀಲಿಸಿ)' : 'Lok Sabha Seats (verify on eci.gov.in)',
            },
            {
              value: String(KARNATAKA_FACTS.assemblyMajorityMark),
              label: isKn ? 'ವಿಧಾನಸಭೆ ಬಹುಮತದ ಗಡಿ' : 'Assembly Majority Mark',
            },
            {
              value: `${KARNATAKA_DISTRICTS.length} / ${KARNATAKA_CONSTITUENCIES.length}`,
              label: isKn ? 'ಮಾದರಿ ಜಿಲ್ಲೆ / ಕ್ಷೇತ್ರಗಳು' : 'Sample Districts / Constituencies',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="font-mono-tabular text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Google Maps Booth Explorer + District/Constituency Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-stretch">
          <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span>{isKn ? 'ಮಾದರಿ ಮತಗಟ್ಟೆ ಶೋಧಕ' : 'Sample Booth Map Explorer'}</span>
                </h3>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {isKn ? 'ಮಾದರಿ ಡೇಟಾ' : 'Sample Data'}
                </span>
              </div>

              <div>
                <label
                  htmlFor="map-district-select"
                  className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
                >
                  {isKn ? 'ಜಿಲ್ಲೆ (6 ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಗಳು)' : 'District (6 Karnataka Districts)'}
                </label>
                <select
                  id="map-district-select"
                  value={mapDistrictId}
                  onChange={(e) => {
                    const nextDist = e.target.value;
                    setMapDistrictId(nextDist);
                    const firstConst = KARNATAKA_CONSTITUENCIES.find((c) => c.districtId === nextDist);
                    if (firstConst) {
                      setMapConstituencyId(firstConst.id);
                    }
                    onMarkExplored('karnataka');
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                >
                  {KARNATAKA_DISTRICTS.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {isKn ? dist.nameKn : dist.name} ({isKn ? dist.hqKn : dist.hq})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="map-constituency-select"
                  className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
                >
                  {isKn ? 'ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ' : 'Assembly Constituency'}
                </label>
                <select
                  id="map-constituency-select"
                  value={activeConstituency?.id || ''}
                  onChange={(e) => {
                    setMapConstituencyId(e.target.value);
                    onMarkExplored('karnataka');
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                >
                  {districtConstituencies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} · {isKn ? c.nameKn : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {activeConstituency && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {isKn ? 'ಮಾದರಿ ಮತಗಟ್ಟೆಗಳು (ಪಿನ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ):' : 'Sample Polling Stations (click to inspect on map):'}
                  </p>
                  {activeConstituency.booths.map((booth) => {
                    const selected = selectedBoothId === booth.id;
                    return (
                      <button
                        key={booth.id}
                        type="button"
                        onClick={() => {
                          onSelectBooth(activeDistrict.id, activeConstituency.id, booth.id);
                          onMarkExplored('karnataka');
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                          selected
                            ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 dark:border-blue-500'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {isKn ? booth.nameKn : booth.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {isKn ? booth.areaKn : booth.area} · {isKn ? booth.accessibility.kn : booth.accessibility.en}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {activeConstituency && (
              <button
                type="button"
                onClick={() =>
                  onEnterBoothFromMap(
                    activeDistrict.id,
                    activeConstituency.id,
                    activeBooth?.id || activeConstituency.booths[0].id
                  )
                }
                className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors cursor-pointer"
              >
                {isKn ? 'ಆಯ್ದ ಬೂತ್‌ನೊಂದಿಗೆ ಅಣಕು ಮತಗಟ್ಟೆ ತೆರೆಯಿರಿ' : 'Open Selected Booth in Simulator'}
              </button>
            )}
          </div>

          {/* Right: Live Google Map */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
            {mapsApiKey ? (
              <APIProvider
                apiKey={mapsApiKey}
                language={isKn ? 'kn' : 'en'}
                region="IN"
                libraries={['marker']}
              >
                <MapStatusBanner isKn={isKn} />
                <div className="w-full h-[420px] lg:h-full min-h-[420px]">
                  <GoogleMap
                    mapId="DEMO_MAP_ID"
                    defaultCenter={mapCenter}
                    defaultZoom={12}
                    gestureHandling="greedy"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <MapCameraController center={mapCenter} zoom={mapZoom} />
                    {activeConstituency?.booths.map((booth) => (
                      <BoothMarkerItem
                        key={booth.id}
                        booth={booth}
                        constituency={activeConstituency}
                        districtName={isKn ? activeDistrict.nameKn : activeDistrict.name}
                        isSelected={selectedBoothId === booth.id}
                        isKn={isKn}
                        onSelect={() => {
                          onSelectBooth(activeDistrict.id, activeConstituency.id, booth.id);
                          onMarkExplored('karnataka');
                        }}
                        onLaunchSimulator={() =>
                          onEnterBoothFromMap(activeDistrict.id, activeConstituency.id, booth.id)
                        }
                      />
                    ))}
                  </GoogleMap>
                </div>
              </APIProvider>
            ) : (
              <div className="h-[420px] lg:h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950">
                <MapPin className="w-8 h-8 text-blue-700 dark:text-blue-400 mb-3" />
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {isKn ? 'ಗೂಗಲ್ ನಕ್ಷೆ ಕೀಲಿಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗುತ್ತಿದೆ' : 'Google Maps Interactive Canvas'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-1">
                  {isKn
                    ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್‌ನಲ್ಲಿಯೂ ನೀವು ಎಡಭಾಗದ ಪಟ್ಟಿಯಿಂದ ಜಿಲ್ಲೆ, ಕ್ಷೇತ್ರ ಮತ್ತು ಮಾದರಿ ಮತಗಟ್ಟೆಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಬಹುದು.'
                    : 'Set VITE_GOOGLE_MAPS_API_KEY in environment secrets to enable live interactive Google Maps pins. All 6 districts and 54 sample booths remain selectable on the left.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Administrative Hierarchy Diagram */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
            {isKn ? 'ಚುನಾವಣಾ ಆಡಳಿತ ಶ್ರೇಣಿ (ECI → ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿ)' : 'Electoral Administrative Hierarchy (ECI to Polling Booth)'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADMIN_HIERARCHY.map((node, index) => (
              <div
                key={node.role.en}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-mono-tabular font-semibold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index < ADMIN_HIERARCHY.length - 1 && (
                    <ArrowDown className="w-3.5 h-3.5 md:hidden" aria-hidden="true" />
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {isKn ? node.role.kn : node.role.en}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {isKn ? node.scope.kn : node.scope.en}
                </p>
              </div>
            ))}
          </div>
        </div>

        <NextStepBar language={language} label={t.nextToParties} onNext={onNext} />
      </div>
    </section>
  );
};
