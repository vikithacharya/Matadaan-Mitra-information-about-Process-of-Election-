export type Language = 'en' | 'kn';

export type AudienceMode = 'first-time' | 'regular' | 'quick';

export type DepthLevel = 'simple' | 'standard' | 'detailed';

export type PartyCategory =
  | 'National'
  | 'State'
  | 'Registered-Unrecognised'
  | 'Independent';

export type BoothState =
  | 'IDLE'
  | 'OFFICER_1'
  | 'OFFICER_2'
  | 'OFFICER_3'
  | 'VOTING_COMPARTMENT'
  | 'VVPAT_ACTIVE'
  | 'SLIP_DROP'
  | 'LOCKED_RECORDED';

export type SectionId =
  | 'journey'
  | 'ready'
  | 'rules'
  | 'karnataka'
  | 'parties'
  | 'booth'
  | 'counting'
  | 'learn';

export interface BilingualText {
  en: string;
  kn: string;
}

export interface AdaptiveText {
  simple: BilingualText;
  standard: BilingualText;
  detailed: BilingualText;
}

export interface Party {
  id: string;
  name: string;
  nameKn: string;
  shortName: string;
  category: PartyCategory;
  colour: string;
  founded: string;
  ideology: BilingualText;
  symbolKey: string;
}

export interface Candidate {
  id: string;
  fictionalName: string;
  fictionalNameKn: string;
  partyId: string;
  constituencyId: string;
  serialNo?: number;
  avatarSeed: number;
  age: number;
  education: BilingualText;
  isNota?: boolean;
}

export interface PollingBooth {
  id: string;
  name: string;
  nameKn: string;
  boothNumber: string;
  area: string;
  areaKn: string;
  lat: number;
  lng: number;
  accessibility: BilingualText;
}

export interface Constituency {
  id: string;
  name: string;
  nameKn: string;
  code: string;
  districtId: string;
  reserved: 'General' | 'SC' | 'ST';
  lat: number;
  lng: number;
  booths: PollingBooth[];
}

export interface District {
  id: string;
  name: string;
  nameKn: string;
  hq: string;
  hqKn: string;
  lat: number;
  lng: number;
}

export interface ElectionStage {
  id: number;
  title: BilingualText;
  whatHappens: AdaptiveText;
  whoDoesIt: BilingualText;
  duration: BilingualText;
  whatYouCanDo: BilingualText;
  officialTool: string;
  daysBeforePoll: number;
}

export interface ReadyFlow {
  id: string;
  title: BilingualText;
  formCode: string;
  summary: AdaptiveText;
  steps: { en: string[]; kn: string[] };
  portal: string;
}

export interface ScenarioCard {
  id: string;
  situation: BilingualText;
  action: BilingualText;
  formOrTool: string;
}

export interface RuleAccordionItem {
  id: string;
  title: BilingualText;
  summary: BilingualText;
  example: BilingualText;
  detailedLegal: BilingualText;
  legalSource: string;
}

export interface MythFactItem {
  id: string;
  myth: BilingualText;
  fact: BilingualText;
}

export interface GlossaryItem {
  id: string;
  term: BilingualText;
  definition: BilingualText;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: BilingualText;
  options: { en: string[]; kn: string[] };
  correctIndex: number;
  explanation: BilingualText;
  hint: BilingualText;
}

export interface BoothTallyStore {
  boothId: string;
  isClosed: boolean;
  evmCounts: Record<string, number>;
  vvpatCounts: Record<string, number>;
  totalVotes: number;
  lastUpdated: string;
}

export interface SelfTestResult {
  passed: boolean;
  errors: string[];
  storageAvailable: boolean;
  audioSupported: boolean;
}
