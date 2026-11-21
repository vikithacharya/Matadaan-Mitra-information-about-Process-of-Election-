import type {
  BilingualText,
  ElectionStage,
  GlossaryItem,
  MythFactItem,
  QuizQuestion,
  ReadyFlow,
  RuleAccordionItem,
  ScenarioCard,
} from '../types/election';

// ============================================================================
// SINGLE CONSTANTS BLOCK — Update verifiable facts & dates here
// ============================================================================
export const LAST_VERIFIED_DATE = '2026-11-01';

export const KARNATAKA_FACTS = {
  assemblySeats: 224,
  lokSabhaSeats: 28,
  assemblyMajorityMark: 113,
  nominatedSeatsNote: 'Check current constitutional status & ECI notifications',
  vvpatDisplaySeconds: 7,
  silencePeriodHours: 48,
};

export const QUALIFYING_DATES: Array<{ date: string; label: BilingualText }> = [
  { date: '01 Jan', label: { en: 'January 1', kn: 'ಜನವರಿ 1' } },
  { date: '01 Apr', label: { en: 'April 1', kn: 'ಏಪ್ರಿಲ್ 1' } },
  { date: '01 Jul', label: { en: 'July 1', kn: 'ಜುಲೈ 1' } },
  { date: '01 Oct', label: { en: 'October 1', kn: 'ಅಕ್ಟೋಬರ್ 1' } },
];

export const OFFICIAL_RESOURCES = [
  {
    id: 'eci',
    name: 'Election Commission of India (ECI)',
    nameKn: 'ಭಾರತೀಯ ಚುನಾವಣಾ ಆಯೋಗ (ECI)',
    url: 'https://eci.gov.in',
    purpose: {
      en: 'Press notes, Model Code of Conduct, party symbols, EVM/VVPAT manuals, and official rules.',
      kn: 'ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳು, ಮಾದರಿ ನೀತಿ ಸಂಹಿತೆ, ಪಕ್ಷದ ಚಿಹ್ನೆಗಳು ಮತ್ತು ಅಧಿಕೃತ ನಿಯಮಗಳು.',
    },
    lastVerified: LAST_VERIFIED_DATE,
  },
  {
    id: 'voters-portal',
    name: 'Voters’ Service Portal',
    nameKn: 'ಮತದಾರರ ಸೇವಾ ಪೋರ್ಟಲ್',
    url: 'https://voters.eci.gov.in',
    purpose: {
      en: 'Online Form 6, 7, 8, 6A, electoral roll search, and EPIC download (e-EPIC).',
      kn: 'ಆನ್‌ಲೈನ್ ನಮೂನೆ 6, 7, 8, 6A, ಮತದಾರರ ಪಟ್ಟಿ ಹುಡುಕಾಟ ಮತ್ತು e-EPIC ಡೌನ್‌ಲೋಡ್.',
    },
    lastVerified: LAST_VERIFIED_DATE,
  },
  {
    id: 'ceo-karnataka',
    name: 'Chief Electoral Officer, Karnataka',
    nameKn: 'ಮುಖ್ಯ ಚುನಾವಣಾಧಿಕಾರಿ, ಕರ್ನಾಟಕ',
    url: 'https://ceo.karnataka.gov.in',
    purpose: {
      en: 'Karnataka constituency rolls, BLO directories, state press releases, and polling booth lists.',
      kn: 'ಕರ್ನಾಟಕ ಕ್ಷೇತ್ರದ ಪಟ್ಟಿಗಳು, BLO ವಿವರಗಳು ಮತ್ತು ರಾಜ್ಯದ ಮತಗಟ್ಟೆ ಪಟ್ಟಿಗಳು.',
    },
    lastVerified: LAST_VERIFIED_DATE,
  },
  {
    id: 'vha',
    name: 'Voter Helpline App (VHA)',
    nameKn: 'ವೋಟರ್ ಹೆಲ್ಪ್‌ಲೈನ್ ಆ್ಯಪ್',
    url: 'https://eci.gov.in',
    purpose: {
      en: 'Official ECI mobile app to verify your name, track applications, and find your polling station.',
      kn: 'ಹೆಸರು ಪರಿಶೀಲನೆ, ಅರ್ಜಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಮತಗಟ್ಟೆ ಹುಡುಕಲು ಅಧಿಕೃತ ಆ್ಯಪ್.',
    },
    lastVerified: LAST_VERIFIED_DATE,
  },
  {
    id: 'cvigil',
    name: 'cVIGIL App',
    nameKn: 'ಸಿವಿಜಿಲ್ (cVIGIL) ಆ್ಯಪ್',
    url: 'https://eci.gov.in',
    purpose: {
      en: 'Geo-tagged photo/video citizen reporting of Model Code of Conduct violations.',
      kn: 'ಮಾದರಿ ನೀತಿ ಸಂಹಿತೆ ಉಲ್ಲಂಘನೆಗಳನ್ನು ಜಿಯೋ-ಟ್ಯಾಗ್ ಫೋಟೋ/ವಿಡಿಯೋ ಮೂಲಕ ವರದಿ ಮಾಡಲು.',
    },
    lastVerified: LAST_VERIFIED_DATE,
  },
  {
    id: 'kyc',
    name: 'Know Your Candidate (KYC) App',
    nameKn: 'ನಿಮ್ಮ ಅಭ್ಯರ್ಥಿಯನ್ನು ತಿಳಿಯಿರಿ (KYC)',
    url: 'https://eci.gov.in',
    purpose: {
      en: 'View official Form 26 affidavits (declared assets, education, criminal cases) of contesting candidates.',
      kn: 'ಅಭ್ಯರ್ಥಿಗಳ ಅಧಿಕೃತ ಫಾರ್ಮ್ 26 ಅಫಿಡವಿಟ್ (ಆಸ್ತಿ, ಶಿಕ್ಷಣ, ಕ್ರಿಮಿನಲ್ ಪ್ರಕರಣ) ನೋಡಲು.',
    },
    lastVerified: LAST_VERIFIED_DATE,
  },
  {
    id: 'helpline-1950',
    name: 'Toll-Free Voter Helpline 1950',
    nameKn: 'ಉಚಿತ ಮತದಾರರ ಸಹಾಯವಾಣಿ 1950',
    url: 'https://voters.eci.gov.in',
    purpose: {
      en: 'Call 1950 (with STD code if needed) for voter registration help and booth queries.',
      kn: 'ಮತದಾರರ ನೋಂದಣಿ ಮತ್ತು ಮತಗಟ್ಟೆ ಮಾಹಿತಿಗಾಗಿ 1950ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
    },
    lastVerified: LAST_VERIFIED_DATE,
  },
];

// ============================================================================
// MODULE 1: 11 ELECTION STAGES
// ============================================================================
export const ELECTION_STAGES: ElectionStage[] = [
  {
    id: 1,
    title: { en: 'Electoral Roll Revision', kn: 'ಮತದಾರರ ಪಟ್ಟಿ ಪರಿಷ್ಕರಣೆ' },
    daysBeforePoll: 60,
    whatHappens: {
      simple: {
        en: 'Officials update the master voter list—adding 18+ citizens, fixing typos, and updating addresses before elections.',
        kn: 'ಚುನಾವಣೆಗೆ ಮುನ್ನ 18+ ನಾಗರಿಕರನ್ನು ಸೇರಿಸಿ, ತಪ್ಪುಗಳನ್ನು ತಿದ್ದಿ ಮತದಾರರ ಪಟ್ಟಿಯನ್ನು ನವೀಕರಿಸಲಾಗುತ್ತದೆ.',
      },
      standard: {
        en: 'Summary/continuous revision of electoral rolls across booths. Draft roll published, claims/objections invited, then final roll published.',
        kn: 'ಮತಗಟ್ಟೆ ಮಟ್ಟದಲ್ಲಿ ಪಟ್ಟಿ ಪರಿಷ್ಕರಣೆ; ಕರಡು ಪಟ್ಟಿ ಪ್ರಕಟಣೆ, ಆಕ್ಷೇಪಣೆ ಸ್ವೀಕಾರ ಮತ್ತು ಅಂತಿಮ ಪಟ್ಟಿ ಪ್ರಕಟಣೆ.',
      },
      detailed: {
        en: 'Conducted under RPA 1950 (Sec 21–23) & Registration of Electors Rules 1960. Ongoing revision drives follow ECI guidelines—verify current drive details neutrally on eci.gov.in.',
        kn: 'ಪ್ರಜಾ ಪ್ರಾತಿನಿಧ್ಯ ಕಾಯ್ದೆ 1950 (ಸೆಕ್ಷನ್ 21-23) ಅಡಿಯಲ್ಲಿ ನಡೆಯುತ್ತದೆ. ನಡೆಯುತ್ತಿರುವ ಪರಿಷ್ಕರಣೆ ವಿವರಗಳನ್ನು eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
      },
    },
    whoDoesIt: { en: 'ECI, CEO Karnataka, ERO & Booth Level Officers (BLOs)', kn: 'ECI, ರಾಜ್ಯ CEO, ERO ಮತ್ತು BLO ಗಳು' },
    duration: { en: 'Illustrative: 4–8 weeks (continuous updates year-round)', kn: 'ಉದಾಹರಣೆಗೆ: 4–8 ವಾರಗಳು (ವರ್ಷವಿಡೀ ನಿರಂತರ ನವೀಕರಣ)' },
    whatYouCanDo: {
      en: 'Check if your name appears accurately in the roll on voters.eci.gov.in.',
      kn: 'voters.eci.gov.in ನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಸರಿಯಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.',
    },
    officialTool: 'Form 6 / 7 / 8 · voters.eci.gov.in',
  },
  {
    id: 2,
    title: { en: 'ECI Schedule & Model Code of Conduct', kn: 'ವೇಳಾಪಟ್ಟಿ ಪ್ರಕಟಣೆ & ನೀತಿ ಸಂಹಿತೆ' },
    daysBeforePoll: 40,
    whatHappens: {
      simple: {
        en: 'The Election Commission announces polling and counting dates. Fair-play rules (Model Code of Conduct) begin immediately.',
        kn: 'ಚುನಾವಣಾ ಆಯೋಗ ದಿನಾಂಕಗಳನ್ನು ಪ್ರಕಟಿಸುತ್ತದೆ. ತಕ್ಷಣವೇ ಮಾದರಿ ನೀತಿ ಸಂಹಿತೆ (MCC) ಜಾರಿಯಾಗುತ್ತದೆ.',
      },
      standard: {
        en: 'Press note announces phases, nomination windows, poll day, and counting day. MCC restricts government announcements and misuse of public resources.',
        kn: 'ಪತ್ರಿಕಾಗೋಷ್ಠಿಯಲ್ಲಿ ಹಂತಗಳು ಮತ್ತು ದಿನಾಂಕ ಘೋಷಣೆ; ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಘೋಷಣೆಗೆ ನಿರ್ಬಂಧ.',
      },
      detailed: {
        en: 'ECI exercises superintendence under Article 324 of the Constitution. MCC is an agreed code of conduct enforced until completion of the election process.',
        kn: 'ಸಂವಿಧಾನದ 324ನೇ ವಿಧಿಯ ಅಡಿಯಲ್ಲಿ ಆಯೋಗವು ಚುನಾವಣೆ ಪ್ರಕ್ರಿಯೆ ಮುಗಿಯುವವರೆಗೆ ನೀತಿ ಸಂಹಿತೆ ಜಾರಿಗೊಳಿಸುತ್ತದೆ.',
      },
    },
    whoDoesIt: { en: 'Election Commission of India (ECI)', kn: 'ಭಾರತೀಯ ಚುನಾವಣಾ ಆಯೋಗ (ECI)' },
    duration: { en: 'Illustrative: Day 0 of public election schedule', kn: 'ಉದಾಹರಣೆಗೆ: ವೇಳಾಪಟ್ಟಿ ಘೋಷಣೆಯ ದಿನ' },
    whatYouCanDo: {
      en: 'Note your constituency polling date and use cVIGIL to report MCC violations.',
      kn: 'ನಿಮ್ಮ ಕ್ಷೇತ್ರದ ಮತದಾನ ದಿನವನ್ನು ಗುರುತಿಸಿಕೊಳ್ಳಿ; ಉಲ್ಲಂಘನೆ ಕಂಡರೆ cVIGIL ಬಳಸಿ.',
    },
    officialTool: 'eci.gov.in · cVIGIL App',
  },
  {
    id: 3,
    title: { en: 'Official Gazette Notification', kn: 'ಅಧಿಕೃತ ಅಧಿಸೂಚನೆ (ಗೆಜೆಟ್)' },
    daysBeforePoll: 28,
    whatHappens: {
      simple: {
        en: 'The formal legal notice starts the election clock in each constituency so candidates can apply to contest.',
        kn: 'ಪ್ರತಿ ಕ್ಷೇತ್ರದಲ್ಲಿ ಅಭ್ಯರ್ಥಿಗಳು ನಾಮಪತ್ರ ಸಲ್ಲಿಸಲು ಕಾನೂನುಬದ್ಧ ಅಧಿಸೂಚನೆ ಹೊರಡಿಸಲಾಗುತ್ತದೆ.',
      },
      standard: {
        en: 'Governor (for Assembly) or President (for Lok Sabha) issues the Gazette notification on ECI recommendation, opening nominations.',
        kn: 'ರಾಜ್ಯಪಾಲರು ಅಥವಾ ರಾಷ್ಟ್ರಪತಿಗಳು ಅಧಿಸೂಚನೆ ಹೊರಡಿಸುವುದರೊಂದಿಗೆ ನಾಮಪತ್ರ ಸಲ್ಲಿಕೆ ಆರಂಭ.',
      },
      detailed: {
        en: 'Issued under Section 14 (Lok Sabha) or Section 15 (State Assembly) of the Representation of the People Act, 1951. Verify specific notification dates on eci.gov.in.',
        kn: 'RPA 1951ರ ಸೆಕ್ಷನ್ 14 ಅಥವಾ 15ರ ಅಡಿಯಲ್ಲಿ ಅಧಿಸೂಚನೆ ಪ್ರಕಟವಾಗುತ್ತದೆ.',
      },
    },
    whoDoesIt: { en: 'Governor / President & Returning Officer (RO)', kn: 'ರಾಜ್ಯಪಾಲರು / ರಾಷ್ಟ್ರಪತಿ & ಚುನಾವಣಾಧಿಕಾರಿ (RO)' },
    duration: { en: 'Illustrative: ~28 days before polling', kn: 'ಉದಾಹರಣೆಗೆ: ಮತದಾನಕ್ಕೆ ~28 ದಿನಗಳ ಮೊದಲು' },
    whatYouCanDo: {
      en: 'Verify your final polling booth assignment before nominations close.',
      kn: 'ನಾಮಪತ್ರ ಪ್ರಕ್ರಿಯೆ ಮುಗಿಯುವ ಮುನ್ನ ನಿಮ್ಮ ಮತಗಟ್ಟೆ ವಿವರ ಪರಿಶೀಲಿಸಿ.',
    },
    officialTool: 'Official Gazette · ceo.karnataka.gov.in',
  },
  {
    id: 4,
    title: { en: 'Filing of Nominations', kn: 'ನಾಮಪತ್ರ ಸಲ್ಲಿಕೆ' },
    daysBeforePoll: 21,
    whatHappens: {
      simple: {
        en: 'Candidates submit their application papers, security deposit, and public background details (assets, education, court cases).',
        kn: 'ಅಭ್ಯರ್ಥಿಗಳು ತಮ್ಮ ಅರ್ಜಿ, ಠೇವಣಿ ಹಾಗೂ ಆಸ್ತಿ-ಶಿಕ್ಷಣ-ಪ್ರಕರಣಗಳ ಅಫಿಡವಿಟ್ ಸಲ್ಲಿಸುತ್ತಾರೆ.',
      },
      standard: {
        en: 'Candidates file Form 2A/2B before the Returning Officer along with Form 26 affidavit and required proposers.',
        kn: 'ಅಭ್ಯರ್ಥಿಗಳು ಚುನಾವಣಾಧಿಕಾರಿ ಮುಂದೆ ಫಾರ್ಮ್ 2A/2B ಮತ್ತು ಫಾರ್ಮ್ 26 ಅಫಿಡವಿಟ್ ಸಲ್ಲಿಸುತ್ತಾರೆ.',
      },
      detailed: {
        en: 'Governed by RPA 1951 Sec 30–34 & Conduct of Elections Rules 1961. Affidavits are uploaded publicly on ECI’s Affidavit Portal and KYC App.',
        kn: 'RPA 1951 ಸೆಕ್ಷನ್ 30-34 ಅಡಿಯಲ್ಲಿ ನಾಮಪತ್ರ ಮತ್ತು ಫಾರ್ಮ್ 26 ಅಫಿಡವಿಟ್ ಸಲ್ಲಿಕೆ ನಡೆಯುತ್ತದೆ.',
      },
    },
    whoDoesIt: { en: 'Candidates & Returning Officer (RO)', kn: 'ಅಭ್ಯರ್ಥಿಗಳು ಮತ್ತು ಚುನಾವಣಾಧಿಕಾರಿ (RO)' },
    duration: { en: 'Illustrative: 7–8 days window', kn: 'ಉದಾಹರಣೆಗೆ: 7–8 ದಿನಗಳ ಅವಧಿ' },
    whatYouCanDo: {
      en: 'Read candidate affidavits neutrally via the Know Your Candidate (KYC) app.',
      kn: 'KYC ಆ್ಯಪ್ ಮೂಲಕ ಅಭ್ಯರ್ಥಿಗಳ ಅಫಿಡವಿಟ್ ವಿವರಗಳನ್ನು ಓದಿ ತಿಳಿಯಿರಿ.',
    },
    officialTool: 'Form 2A/2B · Form 26 · KYC App',
  },
  {
    id: 5,
    title: { en: 'Scrutiny of Nominations', kn: 'ನಾಮಪತ್ರಗಳ ಪರಿಶೀಲನೆ' },
    daysBeforePoll: 19,
    whatHappens: {
      simple: {
        en: 'The Returning Officer checks every candidate’s paperwork to make sure it is complete and legally valid.',
        kn: 'ಸಲ್ಲಿಸಿದ ಎಲ್ಲಾ ನಾಮಪತ್ರಗಳು ಕಾನೂನುಬದ್ಧವಾಗಿ ಮತ್ತು ಸರಿಯಾಗಿವೆಯೇ ಎಂದು ಅಧಿಕಾರಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.',
      },
      standard: {
        en: 'RO examines nomination papers in the presence of candidates/agents and accepts or rejects invalid filings with written reasons.',
        kn: 'ಅಭ್ಯರ್ಥಿಗಳು/ಏಜೆಂಟರ ಸಮ್ಮುಖದಲ್ಲಿ ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ; ದೋಷಪೂರಿತ ಅರ್ಜಿಗಳ ತಿರಸ್ಕಾರ.',
      },
      detailed: {
        en: 'Conducted under Section 36 of RPA 1951. Only substantive defects can lead to rejection; clerical errors are checked at filing.',
        kn: 'RPA 1951 ಸೆಕ್ಷನ್ 36ರ ಅಡಿಯಲ್ಲಿ ನಾಮಪತ್ರಗಳ ಕಾನೂನುಬದ್ಧ ಪರಿಶೀಲನೆ ನಡೆಯುತ್ತದೆ.',
      },
    },
    whoDoesIt: { en: 'Returning Officer (RO)', kn: 'ಚುನಾವಣಾಧಿಕಾರಿ (RO)' },
    duration: { en: 'Illustrative: 1 day after nomination closes', kn: 'ಉದಾಹರಣೆಗೆ: ನಾಮಪತ್ರ ಕೊನೆಯ ದಿನದ ಮರುದಿನ (1 ದಿನ)' },
    whatYouCanDo: {
      en: 'Track the updated list of validly nominated candidates on the ECI portal.',
      kn: 'ಅಂಗೀಕೃತ ಅಭ್ಯರ್ಥಿಗಳ ಪಟ್ಟಿಯನ್ನು ECI ತಾಣದಲ್ಲಿ ಗಮನಿಸಿ.',
    },
    officialTool: 'RO Notice Board · eci.gov.in',
  },
  {
    id: 6,
    title: { en: 'Withdrawal & Final Contesting List', kn: 'ನಾಮಪತ್ರ ಹಿಂಪಡೆಯುವಿಕೆ ಮತ್ತು ಅಂತಿಮ ಪಟ್ಟಿ' },
    daysBeforePoll: 16,
    whatHappens: {
      simple: {
        en: 'Candidates who choose to step back can withdraw. Afterwards, the final ballot order and symbols are locked.',
        kn: 'ಸ್ಪರ್ಧೆಯಿಂದ ಹಿಂದೆ ಸರಿಯುವವರು ನಾಮಪತ್ರ ಹಿಂಪಡೆಯಬಹುದು. ನಂತರ ಅಂತಿಮ ಮತಪತ್ರ ಪಟ್ಟಿ ಸಿದ್ಧವಾಗುತ್ತದೆ.',
      },
      standard: {
        en: 'Last date for withdrawal (Form 5), followed by publication of Form 7A (final list of contesting candidates) and symbol allotment.',
        kn: 'ಫಾರ್ಮ್ 5 ಮೂಲಕ ಹಿಂಪಡೆಯುವಿಕೆ; ನಂತರ ಫಾರ್ಮ್ 7A ಅಂತಿಮ ಅಭ್ಯರ್ಥಿಗಳ ಪಟ್ಟಿ ಮತ್ತು ಚಿಹ್ನೆ ಹಂಚಿಕೆ.',
      },
      detailed: {
        en: 'RPA 1951 Sec 37–38 & Election Symbols (Reservation and Allotment) Order 1968 govern ballot ordering: National, State, Regd.-Unrecognised, Independents, NOTA last.',
        kn: 'RPA 1951 ಸೆಕ್ಷನ್ 37-38ರ ಅಡಿಯಲ್ಲಿ ಫಾರ್ಮ್ 7A ಪ್ರಕಟಣೆ ಮತ್ತು ಚಿಹ್ನೆ ಹಂಚಿಕೆ ನಡೆಯುತ್ತದೆ.',
      },
    },
    whoDoesIt: { en: 'Returning Officer (RO)', kn: 'ಚುನಾವಣಾಧಿಕಾರಿ (RO)' },
    duration: { en: 'Illustrative: 2 days after scrutiny', kn: 'ಉದಾಹರಣೆಗೆ: ಪರಿಶೀಲನೆಯ 2 ದಿನಗಳ ನಂತರ' },
    whatYouCanDo: {
      en: 'Review the final candidate serial numbers and symbols for your constituency.',
      kn: 'ನಿಮ್ಮ ಕ್ಷೇತ್ರದ ಅಂತಿಮ ಅಭ್ಯರ್ಥಿಗಳ ಕ್ರಮಸಂಖ್ಯೆ ಮತ್ತು ಚಿಹ್ನೆಗಳನ್ನು ನೋಡಿ.',
    },
    officialTool: 'Form 5 · Form 7A · KYC App',
  },
  {
    id: 7,
    title: { en: 'Campaigning & 48-Hour Silence Period', kn: 'ಪ್ರಚಾರ ಮತ್ತು 48 ಗಂಟೆಗಳ ಮೌನ ಅವಧಿ' },
    daysBeforePoll: 2,
    whatHappens: {
      simple: {
        en: 'Candidates share their ideas with voters. Public rallies, loudspeakers, and campaign ads must stop 48 hours before voting ends.',
        kn: 'ಅಭ್ಯರ್ಥಿಗಳು ಪ್ರಚಾರ ನಡೆಸುತ್ತಾರೆ. ಮತದಾನ ಮುಗಿಯುವ 48 ಗಂಟೆ ಮೊದಲು ಬಹಿರಂಗ ಪ್ರಚಾರ ನಿಲ್ಲುತ್ತದೆ.',
      },
      standard: {
        en: 'Public campaigning runs up to 48 hours prior to close of poll. During the silence period, public meetings, processions, and electronic ads are prohibited.',
        kn: 'ಮತದಾನ ಅಂತ್ಯಕ್ಕೆ 48 ಗಂಟೆ ಮೊದಲು ಬಹಿರಂಗ ಪ್ರಚಾರ, ಸಭೆ, ಮೈಕ್ ಮತ್ತು ವಿದ್ಯುನ್ಮಾನ ಜಾಹೀರಾತು ನಿಷೇಧ.',
      },
      detailed: {
        en: 'Section 126 of RPA 1951 prohibits public meetings, cinematograph/TV/digital campaigning, and exit polls during the 48-hour silence window.',
        kn: 'RPA 1951 ಸೆಕ್ಷನ್ 126ರ ಅಡಿಯಲ್ಲಿ 48 ಗಂಟೆಗಳ ಮೌನ ಅವಧಿಯಲ್ಲಿ ಸಾರ್ವಜನಿಕ ಪ್ರಚಾರ ಮತ್ತು ಎಕ್ಸಿಟ್ ಪೋಲ್ ನಿಷಿದ್ಧ.',
      },
    },
    whoDoesIt: { en: 'Parties, Candidates, Media & MCC Flying Squads', kn: 'ಪಕ್ಷಗಳು, ಅಭ್ಯರ್ಥಿಗಳು ಮತ್ತು ಚುನಾವಣಾ ತಂಡಗಳು' },
    duration: { en: 'Illustrative: ~14 days campaign; final 48h silence', kn: 'ಉದಾಹರಣೆಗೆ: ~14 ದಿನಗಳ ಪ್ರಚಾರ; ಕೊನೆಯ 48 ಗಂಟೆ ಮೌನ ಅವಧಿ' },
    whatYouCanDo: {
      en: 'Compare manifestos calmly during the silence period and check your polling slip.',
      kn: 'ಮೌನ ಅವಧಿಯಲ್ಲಿ ಶಾಂತವಾಗಿ ಪ್ರಣಾಳಿಕೆಗಳನ್ನು ಹೋಲಿಸಿ, ನಿಮ್ಮ ಮತದಾರರ ಚೀಟಿ ಸಿದ್ಧಪಡಿಸಿ.',
    },
    officialTool: 'cVIGIL App · 1950 Helpline',
  },
  {
    id: 8,
    title: { en: 'Polling Day', kn: 'ಮತದಾನದ ದಿನ' },
    daysBeforePoll: 0,
    whatHappens: {
      simple: {
        en: 'Voters visit their booth with a valid photo ID, get inked, press the blue EVM button, and verify the 7-second VVPAT paper slip.',
        kn: 'ಮತದಾರರು ಗುರುತಿನ ಚೀಟಿಯೊಂದಿಗೆ ಮತಗಟ್ಟೆಗೆ ತೆರಳಿ, ಶಾಯಿ ಹಚ್ಚಿಸಿಕೊಂಡು, EVM ಬಟನ್ ಒತ್ತಿ 7 ಸೆಕೆಂಡ್ VVPAT ಚೀಟಿ ನೋಡುತ್ತಾರೆ.',
      },
      standard: {
        en: 'Mock poll at dawn with agents, then polling opens (typically 7 AM–6 PM; verify local hours). 3 polling officers verify ID, ink, Form 17A, and release EVM ballot.',
        kn: 'ಬೆಳಿಗ್ಗೆ ಅಣಕು ಮತದಾನದ ನಂತರ ಮತದಾನ ಆರಂಭ. 3 ಅಧಿಕಾರಿಗಳು ID, ಶಾಯಿ, ಫಾರ್ಮ್ 17A ಮತ್ತು EVM ನಿಯಂತ್ರಣ ನಿರ್ವಹಿಸುತ್ತಾರೆ.',
      },
      detailed: {
        en: 'Conduct of Elections Rules 1961 (Rules 35–49X) govern identification, Form 17A Register of Voters, tendered/challenged votes, and EVM/VVPAT sealing at close.',
        kn: 'ಚುನಾವಣಾ ನಿಯಮಗಳು 1961 (ನಿಯಮ 35-49X) ಅಡಿಯಲ್ಲಿ ಫಾರ್ಮ್ 17A, ಗುರುತು ಪರಿಶೀಲನೆ ಮತ್ತು EVM ಸೀಲಿಂಗ್ ನಡೆಯುತ್ತದೆ.',
      },
    },
    whoDoesIt: { en: 'Presiding Officer, Polling Officers 1–3 & Voters', kn: 'ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿ, ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ಮತದಾರರು' },
    duration: { en: 'Illustrative: 1 day (typically 7:00 AM to 6:00 PM)', kn: 'ಉದಾಹರಣೆಗೆ: 1 ದಿನ (ಸಾಮಾನ್ಯವಾಗಿ ಬೆಳಿಗ್ಗೆ 7 ರಿಂದ ಸಂಜೆ 6)' },
    whatYouCanDo: {
      en: 'Carry your EPIC or approved alternative photo ID and vote independently.',
      kn: 'ನಿಮ್ಮ EPIC ಅಥವಾ ಮಾನ್ಯ ಫೋಟೋ ಗುರುತಿನ ಚೀಟಿ ಕೊಂಡೊಯ್ದು ಮತ ಚಲಾಯಿಸಿ.',
    },
    officialTool: 'Form 17A · EVM & VVPAT · Booth Helpline',
  },
  {
    id: 9,
    title: { en: 'Counting of Votes', kn: 'ಮತ ಎಣಿಕೆ' },
    daysBeforePoll: -3,
    whatHappens: {
      simple: {
        en: 'Sealed machines are opened under CCTV and agent watch. Postal ballots are counted first, then EVM rounds and random VVPAT slip checks.',
        kn: 'ಸೀಲ್ ಮಾಡಿದ ಯಂತ್ರಗಳನ್ನು ಏಜೆಂಟರ ಸಮ್ಮುಖದಲ್ಲಿ ತೆರೆದು ಅಂಚೆ ಮತಗಳು, ನಂತರ EVM ಸುತ್ತುಗಳು ಮತ್ತು VVPAT ಚೀಟಿಗಳ ಎಣಿಕೆ ನಡೆಯುತ್ತದೆ.',
      },
      standard: {
        en: 'Strong rooms open before observers and agents. Postal/ETPBS ballots start at 8 AM, followed by EVM Control Unit rounds and mandatory random VVPAT tallying.',
        kn: 'ವೀಕ್ಷಕರ ಮುಂದೆ ಸ್ಟ್ರಾಂಗ್ ರೂಮ್ ತೆರೆಯಲಾಗುತ್ತದೆ. ಅಂಚೆ ಮತಗಳ ನಂತರ EVM ಸುತ್ತುಗಳು ಹಾಗೂ ಆಯ್ದ VVPAT ಚೀಟಿ ತಾಳೆ ಮಾಡಲಾಗುತ್ತದೆ.',
      },
      detailed: {
        en: 'RPA 1951 Sec 64–66 & Conduct of Elections Rules 1961 Rules 50–66. Check current mandatory random VVPAT polling-station count per assembly segment on eci.gov.in.',
        kn: 'RPA 1951 ಸೆಕ್ಷನ್ 64-66 ಅಡಿಯಲ್ಲಿ ಮತ ಎಣಿಕೆ; ಪ್ರಸ್ತುತ VVPAT ಪರಿಶೀಲನಾ ಸಂಖ್ಯೆಯನ್ನು eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
      },
    },
    whoDoesIt: { en: 'Returning Officer, Counting Supervisors & Observers', kn: 'ಚುನಾವಣಾಧಿಕಾರಿ, ಎಣಿಕೆ ಸಿಬ್ಬಂದಿ ಮತ್ತು ವೀಕ್ಷಕರು' },
    duration: { en: 'Illustrative: Usually 1 full day', kn: 'ಉದಾಹರಣೆಗೆ: ಸಾಮಾನ್ಯವಾಗಿ 1 ಪೂರ್ಣ ದಿನ' },
    whatYouCanDo: {
      en: 'Follow official round-wise verified tallies on results.eci.gov.in.',
      kn: 'results.eci.gov.in ನಲ್ಲಿ ಸುತ್ತುವಾರು ಅಧಿಕೃತ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ.',
    },
    officialTool: 'Form 20 · results.eci.gov.in',
  },
  {
    id: 10,
    title: { en: 'Declaration of Results', kn: 'ಫಲಿತಾಂಶ ಘೋಷಣೆ' },
    daysBeforePoll: -3,
    whatHappens: {
      simple: {
        en: 'The candidate with the highest valid votes wins under the First-Past-the-Post system and receives an official election certificate.',
        kn: 'ಅತಿ ಹೆಚ್ಚು ಮಾನ್ಯ ಮತ ಪಡೆದ ಅಭ್ಯರ್ಥಿ ವಿಜೇತರಾಗಿ ಘೋಷಿಸಲ್ಪಟ್ಟು ಅಧಿಕೃತ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯುತ್ತಾರೆ.',
      },
      standard: {
        en: 'After completing all rounds and VVPAT verification, the RO fills Form 21C/21E and hands the Certificate of Election (Form 22) to the winner.',
        kn: 'ಎಲ್ಲಾ ಸುತ್ತುಗಳ ನಂತರ ಚುನಾವಣಾಧಿಕಾರಿ ಫಾರ್ಮ್ 21C/21E ಪೂರ್ಣಗೊಳಿಸಿ ವಿಜೇತರಿಗೆ ಫಾರ್ಮ್ 22 ಪ್ರಮಾಣಪತ್ರ ನೀಡುತ್ತಾರೆ.',
      },
      detailed: {
        en: 'Declared under RPA 1951 Section 66. Winner does not need 50%+1 votes—simple plurality suffices; NOTA votes do not trigger re-election even if highest (verify current ECI rules).',
        kn: 'RPA 1951 ಸೆಕ್ಷನ್ 66ರ ಅಡಿಯಲ್ಲಿ ಘೋಷಣೆ; ಅತಿ ಹೆಚ್ಚು ಮತ ಪಡೆದವರು ವಿಜೇತರಾಗುತ್ತಾರೆ.',
      },
    },
    whoDoesIt: { en: 'Returning Officer (RO) & ECI', kn: 'ಚುನಾವಣಾಧಿಕಾರಿ (RO) ಮತ್ತು ECI' },
    duration: { en: 'Illustrative: Immediately after final round', kn: 'ಉದಾಹರಣೆಗೆ: ಅಂತಿಮ ಸುತ್ತಿನ ತಕ್ಷಣ' },
    whatYouCanDo: {
      en: 'Review final constituency vote shares and turnout statistics on ECI portals.',
      kn: 'ECI ತಾಣದಲ್ಲಿ ಕ್ಷೇತ್ರದ ಮತದಾನ ಪ್ರಮಾಣ ಮತ್ತು ಅಂತಿಮ ಅಂಕಿಅಂಶಗಳನ್ನು ಗಮನಿಸಿ.',
    },
    officialTool: 'Form 21C/21E · Form 22',
  },
  {
    id: 11,
    title: { en: 'Government Formation', kn: 'ಸರ್ಕಾರ ರಚನೆ' },
    daysBeforePoll: -7,
    whatHappens: {
      simple: {
        en: 'Elected MLAs or MPs meet; the party or coalition with a majority forms the government, and MCC ends.',
        kn: 'ಚುನಾಯಿತ ಪ್ರತಿನಿಧಿಗಳು ಸೇರಿ ಬಹುಮತವಿರುವ ಪಕ್ಷ ಅಥವಾ ಮೈತ್ರಿ ಸರ್ಕಾರ ರಚಿಸುತ್ತದೆ.',
      },
      standard: {
        en: 'ECI notifies the newly constituted House; the Governor/President invites the leader commanding majority support (e.g., 113+ in Karnataka’s 224-seat Assembly) to take oath.',
        kn: 'ಹೊಸ ಸದನ ರಚನೆ ಅಧಿಸೂಚನೆ; ಬಹುಮತ (ಕರ್ನಾಟಕದಲ್ಲಿ 224 ರಲ್ಲಿ 113+) ಹೊಂದಿರುವ ನಾಯಕರಿಗೆ ಪ್ರಮಾಣವಚನ ಆಹ್ವಾನ.',
      },
      detailed: {
        en: 'Governed by Constitutional Articles 75 (Union) & 164 (States), plus RPA 1951 Sec 73 notification of duly constituted legislative body.',
        kn: 'ಸಂವಿಧಾನದ 75 ಮತ್ತು 164ನೇ ವಿಧಿಗಳು ಹಾಗೂ RPA 1951 ಸೆಕ್ಷನ್ 73ರ ಅಡಿಯಲ್ಲಿ ಸರ್ಕಾರ ರಚನೆಯಾಗುತ್ತದೆ.',
      },
    },
    whoDoesIt: { en: 'Governor / President & Elected Legislators', kn: 'ರಾಜ್ಯಪಾಲರು / ರಾಷ್ಟ್ರಪತಿ ಮತ್ತು ಚುನಾಯಿತ ಶಾಸಕರು' },
    duration: { en: 'Illustrative: Within days of result declaration', kn: 'ಉದಾಹರಣೆಗೆ: ಫಲಿತಾಂಶದ ಕೆಲವೇ ದಿನಗಳಲ್ಲಿ' },
    whatYouCanDo: {
      en: 'Stay engaged with your elected representative and local civic issues year-round.',
      kn: 'ವರ್ಷವಿಡೀ ನಿಮ್ಮ ಜನಪ್ರತಿನಿಧಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿದ್ದು ನಾಗರಿಕ ವಿಷಯಗಳಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ.',
    },
    officialTool: 'Gazette · State Legislature / Parliament',
  },
];

// ============================================================================
// MODULE 2: AM I READY TO VOTE?
// ============================================================================
export const READY_FLOWS: ReadyFlow[] = [
  {
    id: 'flow-new',
    title: { en: 'New Voter Registration', kn: 'ಹೊಸ ಮತದಾರರ ನೋಂದಣಿ' },
    formCode: 'Form 6',
    summary: {
      simple: {
        en: 'Turning 18 soon or registering for the first time? Submit Form 6 online with age and address proof.',
        kn: '18 ವರ್ಷ ತುಂಬುತ್ತಿದೆಯೇ ಅಥವಾ ಮೊದಲ ಬಾರಿಗೆ ನೋಂದಾಯಿಸುತ್ತಿದ್ದೀರಾ? ವಯಸ್ಸು ಮತ್ತು ವಿಳಾಸದ ದಾಖಲೆಯೊಂದಿಗೆ ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಸಿ.',
      },
      standard: {
        en: 'Indian citizens aged 18+ on any of the four qualifying dates (1 Jan, 1 Apr, 1 Jul, 1 Oct) can apply via Form 6. Youth aged 17+ can apply in advance.',
        kn: 'ನಾಲ್ಕು ಅರ್ಹತಾ ದಿನಾಂಕಗಳಲ್ಲಿ (ಜನ 1, ಏಪ್ರಿ 1, ಜುಲೈ 1, ಅಕ್ಟೋ 1) 18 ವರ್ಷ ಪೂರ್ಣಗೊಳ್ಳುವವರು ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಸಬಹುದು; 17+ ವಯಸ್ಸಿನವರು ಮುಂಗಡ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.',
      },
      detailed: {
        en: 'Filed under RPA 1950 Sec 19–20 & Registration of Electors Rules 1960. Advance 17+ applications are processed in the quarter you turn 18 (verify on eci.gov.in).',
        kn: 'RPA 1950 ಸೆಕ್ಷನ್ 19-20 ಅಡಿಯಲ್ಲಿ ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಕೆ; 18 ತುಂಬುವ ತ್ರೈಮಾಸಿಕದಲ್ಲಿ ಪಟ್ಟಿಗೆ ಸೇರ್ಪಡೆಯಾಗುತ್ತದೆ.',
      },
    },
    steps: {
      en: [
        'Visit voters.eci.gov.in or open Voter Helpline App.',
        'Select Form 6 (New Voter Registration) and upload photo, age proof, and residence proof.',
        'Note the Reference ID and track BLO field verification.',
      ],
      kn: [
        'voters.eci.gov.in ಅಥವಾ ವೋಟರ್ ಹೆಲ್ಪ್‌ಲೈನ್ ಆ್ಯಪ್ ತೆರೆಯಿರಿ.',
        'ಫಾರ್ಮ್ 6 ಆಯ್ಕೆಮಾಡಿ, ಭಾವಚಿತ್ರ, ವಯಸ್ಸು ಮತ್ತು ವಿಳಾಸದ ಪುರಾವೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
        'ರೆಫರೆನ್ಸ್ ಸಂಖ್ಯೆ ಉಳಿಸಿಕೊಂಡು BLO ಪರಿಶೀಲನೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
      ],
    },
    portal: 'voters.eci.gov.in',
  },
  {
    id: 'flow-shift',
    title: { en: 'Shifting Address / Corrections', kn: 'ವಿಳಾಸ ಬದಲಾವಣೆ / ತಿದ್ದುಪಡಿ' },
    formCode: 'Form 8',
    summary: {
      simple: {
        en: 'Moved to a new home or spotted a spelling error in your Voter ID? Use Form 8 to update it.',
        kn: 'ಹೊಸ ಮನೆಗೆ ಸ್ಥಳಾಂತರವಾಗಿದ್ದೀರಾ ಅಥವಾ ಗುರುತಿನ ಚೀಟಿಯಲ್ಲಿ ತಪ್ಪಿದೆಯೇ? ಫಾರ್ಮ್ 8 ಬಳಸಿ ಸರಿಪಡಿಸಿ.',
      },
      standard: {
        en: 'Form 8 handles shifting residence (within or across constituencies), correcting personal details, replacing damaged EPIC, and marking PwD status.',
        kn: 'ವಿಳಾಸ ಬದಲಾವಣೆ, ಹೆಸರು/ಜನ್ಮ ದಿನಾಂಕ ತಿದ್ದುಪಡಿ, ಹಾನಿಗೊಳಗಾದ EPIC ಬದಲಿ ಮತ್ತು PwD ಗುರುತಿಗೆ ಫಾರ್ಮ್ 8 ಬಳಸಲಾಗುತ್ತದೆ.',
      },
      detailed: {
        en: 'Consolidated single Form 8 under updated Registration of Electors Rules replaces older separate forms for shifting and corrections (verify on eci.gov.in).',
        kn: 'ಪರಿಷ್ಕೃತ ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ಸ್ಥಳಾಂತರ, ತಿದ್ದುಪಡಿ ಮತ್ತು ಬದಲಿ EPIC ಗಾಗಿ ಒಂದೇ ಫಾರ್ಮ್ 8 ಲಭ್ಯವಿದೆ.',
      },
    },
    steps: {
      en: [
        'Log in to voters.eci.gov.in with your EPIC number.',
        'Choose Form 8 → Shifting of Residence or Correction of Entries.',
        'Upload current residence proof and submit without creating a duplicate Form 6.',
      ],
      kn: [
        'ನಿಮ್ಮ EPIC ಸಂಖ್ಯೆಯೊಂದಿಗೆ voters.eci.gov.in ಗೆ ಲಾಗಿನ್ ಆಗಿ.',
        'ಫಾರ್ಮ್ 8 → ವಿಳಾಸ ಸ್ಥಳಾಂತರ ಅಥವಾ ವಿವರ ತಿದ್ದುಪಡಿ ಆಯ್ಕೆಮಾಡಿ.',
        'ಹೊಸ ವಿಳಾಸದ ಪುರಾವೆ ಸಲ್ಲಿಸಿ (ದ್ವಿ-ನೋಂದಣಿಗಾಗಿ ಹೊಸ ಫಾರ್ಮ್ 6 ಹಾಕಬೇಡಿ).',
      ],
    },
    portal: 'voters.eci.gov.in',
  },
  {
    id: 'flow-delete',
    title: { en: 'Objections & Deletions', kn: 'ಆಕ್ಷೇಪಣೆ ಮತ್ತು ಹೆಸರು ತೆಗೆದುಹಾಕುವಿಕೆ' },
    formCode: 'Form 7',
    summary: {
      simple: {
        en: 'Used to request removing a duplicate entry or reporting a deceased/permanently shifted voter.',
        kn: 'ನಕಲಿ ಹೆಸರು ತೆಗೆದುಹಾಕಲು ಅಥವಾ ಮೃತಪಟ್ಟ/ಶಾಶ್ವತವಾಗಿ ಸ್ಥಳಾಂತರವಾದವರ ಹೆಸರು ಅಳಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.',
      },
      standard: {
        en: 'Any enrolled elector of a constituency can file Form 7 to delete their own entry or object to an ineligible/duplicate entry with verification.',
        kn: 'ಕ್ಷೇತ್ರದ ನೋಂದಾಯಿತ ಮತದಾರರು ತಮ್ಮ ಅಥವಾ ಅನರ್ಹ/ನಕಲಿ ಹೆಸರನ್ನು ತೆಗೆದುಹಾಕಲು ಫಾರ್ಮ್ 7 ಸಲ್ಲಿಸಬಹುದು.',
      },
      detailed: {
        en: 'Processed by the ERO after statutory notice and hearing under Rules 13–21 of the Registration of Electors Rules 1960.',
        kn: '1960ರ ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ERO ವಿಚಾರಣೆ ಮತ್ತು ನೋಟಿಸ್ ನಂತರವೇ ಹೆಸರು ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.',
      },
    },
    steps: {
      en: [
        'Open Form 7 on voters.eci.gov.in.',
        'Specify reason (shifted, deceased, duplicate, or self-deletion request).',
        'ERO verifies via BLO before any change is made.',
      ],
      kn: [
        'voters.eci.gov.in ನಲ್ಲಿ ಫಾರ್ಮ್ 7 ತೆರೆಯಿರಿ.',
        'ಕಾರಣವನ್ನು (ಸ್ಥಳಾಂತರ, ನಿಧನ, ನಕಲಿ) ನಮೂದಿಸಿ.',
        'BLO ಪರಿಶೀಲನೆಯ ನಂತರವೇ ERO ಕ್ರಮ ಕೈಗೊಳ್ಳುತ್ತಾರೆ.',
      ],
    },
    portal: 'voters.eci.gov.in',
  },
  {
    id: 'flow-search',
    title: { en: 'Find Name, Booth & Lost EPIC', kn: 'ಹೆಸರು, ಮತಗಟ್ಟೆ ಮತ್ತು ಕಳೆದ EPIC ಹುಡುಕಾಟ' },
    formCode: 'e-EPIC / Search',
    summary: {
      simple: {
        en: 'Check if your name is in the roll before polling day, find your booth address, or download a digital e-EPIC.',
        kn: 'ಮತದಾನಕ್ಕೆ ಮುನ್ನ ಪಟ್ಟಿಯಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಮತಗಟ್ಟೆ ವಿಳಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ, ಅಥವಾ e-EPIC ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
      },
      standard: {
        en: 'Search by EPIC number, name/relative details, or mobile OTP. Even if your physical EPIC is lost, you can still vote if your name is in the roll and you carry an ECI-approved photo ID.',
        kn: 'EPIC ಸಂಖ್ಯೆ ಅಥವಾ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ. ಭೌತಿಕ EPIC ಕಳೆದಿದ್ದರೂ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರಿದ್ದರೆ ECI ಮಾನ್ಯ ಪರ್ಯಾಯ ಫೋಟೋ ID ತೋರಿಸಿ ಮತ ಚಲಾಯಿಸಬಹುದು.',
      },
      detailed: {
        en: 'Important distinction: Possession of EPIC alone does not entitle voting—your name MUST be in the electoral roll. Conversely, if listed in the roll, ECI notifies alternative photo IDs (Passport, Driving Licence, Aadhaar, PAN, etc. — verify current list on eci.gov.in).',
        kn: 'EPIC ಇದ್ದ ಮಾತ್ರಕ್ಕೆ ಮತದಾನಕ್ಕೆ ಅವಕಾಶವಿಲ್ಲ—ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರಿರಬೇಕು. ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರಿದ್ದರೆ ಪರ್ಯಾಯ ಫೋಟೋ ಗುರುತಿನ ಚೀಟಿ ಬಳಸಬಹುದು.',
      },
    },
    steps: {
      en: [
        'Go to electoralsearch.eci.gov.in or Voter Helpline App.',
        'Verify your Assembly Constituency and Polling Station number.',
        'Carry EPIC or any ECI-notified alternative photo ID on polling day.',
      ],
      kn: [
        'electoralsearch.eci.gov.in ಅಥವಾ ವೋಟರ್ ಹೆಲ್ಪ್‌ಲೈನ್ ಆ್ಯಪ್ ತೆರೆಯಿರಿ.',
        'ನಿಮ್ಮ ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ ಮತ್ತು ಮತಗಟ್ಟೆ ಸಂಖ್ಯೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
        'ಮತದಾನದ ದಿನ EPIC ಅಥವಾ ಮಾನ್ಯ ಪರ್ಯಾಯ ಫೋಟೋ ID ಕೊಂಡೊಯ್ಯಿರಿ.',
      ],
    },
    portal: 'electoralsearch.eci.gov.in',
  },
  {
    id: 'flow-special',
    title: { en: 'NRIs, Service Voters & Home Voting', kn: 'ಅನಿವಾಸಿ ಭಾರತೀಯರು (NRI), ಸೇವಾ ಮತ್ತು ಮನೆ ಮತದಾನ' },
    formCode: 'Form 6A / 12D',
    summary: {
      simple: {
        en: 'Special categories exist for Indian citizens living abroad (NRIs), armed forces/service voters, and eligible senior/PwD voters.',
        kn: 'ವಿದೇಶದಲ್ಲಿರುವ ಭಾರತೀಯರು (NRI), ಸಶಸ್ತ್ರ ಪಡೆಗಳ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಅರ್ಹ ಹಿರಿಯ/PwD ಮತದಾರರಿಗೆ ವಿಶೇಷ ಸೌಲಭ್ಯಗಳಿವೆ.',
      },
      standard: {
        en: 'NRIs register via Form 6A (voting in person with original passport). Service voters use ETPBS postal ballots. Eligible 85+ seniors & 40%+ PwD voters can opt for Form 12D home voting.',
        kn: 'NRI ಗಳು ಫಾರ್ಮ್ 6A ಮೂಲಕ ನೋಂದಾಯಿಸಿ ಮೂಲ ಪಾಸ್‌ಪೋರ್ಟ್‌ನೊಂದಿಗೆ ಮತ ಹಾಕುತ್ತಾರೆ. 85+ ಹಿರಿಯರು ಮತ್ತು 40%+ PwD ಮತದಾರರು ಫಾರ್ಮ್ 12D ಮೂಲಕ ಮನೆ ಮತದಾನ ಆಯ್ಕೆ ಮಾಡಬಹುದು.',
      },
      detailed: {
        en: 'Governed by RPA 1950 Sec 20A (Overseas Electors) and Conduct of Elections Rules 1961 (Absentee Voters Form 12D). Always verify current age/disability thresholds on eci.gov.in.',
        kn: 'RPA 1950 ಸೆಕ್ಷನ್ 20A ಮತ್ತು 1961ರ ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ವಿಶೇಷ ಮತದಾರರ ವರ್ಗಗಳಿವೆ; ಪ್ರಸ್ತುತ ಅರ್ಹತೆಯನ್ನು eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
      },
    },
    steps: {
      en: [
        'NRIs: Submit Form 6A online with passport details; vote in person at booth with original passport.',
        '85+ / PwD: Submit Form 12D through BLO within the notified window after election notification.',
        'Service voters: Register via employer/record office for ETPBS postal ballot.',
      ],
      kn: [
        'NRI: ಪಾಸ್‌ಪೋರ್ಟ್ ವಿವರದೊಂದಿಗೆ ಫಾರ್ಮ್ 6A ಸಲ್ಲಿಸಿ; ಮತದಾನದ ದಿನ ಮೂಲ ಪಾಸ್‌ಪೋರ್ಟ್‌ನೊಂದಿಗೆ ಬೂತ್‌ಗೆ ಬನ್ನಿ.',
        '85+ / PwD: ಅಧಿಸೂಚನೆಯ ನಂತರ ನಿಗದಿತ ಅವಧಿಯಲ್ಲಿ BLO ಮೂಲಕ ಫಾರ್ಮ್ 12D ಸಲ್ಲಿಸಿ.',
        'ಸೇವಾ ಮತದಾರರು: ETPBS ಅಂಚೆ ಮತಕ್ಕಾಗಿ ಕಚೇರಿ ಮೂಲಕ ನೋಂದಾಯಿಸಿ.',
      ],
    },
    portal: 'eci.gov.in · Form 6A / 12D',
  },
];

export const SCENARIO_CARDS: ScenarioCard[] = [
  {
    id: 'scen-moved',
    situation: { en: '“I moved from Mysuru to Bengaluru last year.”', kn: '“ನಾನು ಕಳೆದ ವರ್ಷ ಮೈಸೂರಿನಿಂದ ಬೆಂಗಳೂರಿಗೆ ಸ್ಥಳಾಂತರಗೊಂಡೆ.”' },
    action: {
      en: 'Do NOT submit a brand-new Form 6. File Form 8 (Shifting of Residence) so your old entry transfers cleanly without creating a duplicate.',
      kn: 'ಹೊಸ ಫಾರ್ಮ್ 6 ಹಾಕಬೇಡಿ. ನಕಲಿ ಎಂಟ್ರಿ ತಪ್ಪಿಸಲು ಫಾರ್ಮ್ 8 (ವಿಳಾಸ ಸ್ಥಳಾಂತರ) ಸಲ್ಲಿಸಿ.',
    },
    formOrTool: 'Form 8 · voters.eci.gov.in',
  },
  {
    id: 'scen-july18',
    situation: { en: '“I turn 18 on July 18 this year.”', kn: '“ನನಗೆ ಈ ವರ್ಷ ಜುಲೈ 18 ರಂದು 18 ವರ್ಷ ತುಂಬುತ್ತದೆ.”' },
    action: {
      en: 'You can submit Form 6 in advance at 17+. Since July 18 falls after July 1, your eligibility aligns with the Oct 1 qualifying date (verify cutoff dates on eci.gov.in).',
      kn: 'ನೀವು 17+ ವಯಸ್ಸಿನಲ್ಲೇ ಮುಂಗಡ ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಸಬಹುದು. ಜುಲೈ 18ರ ಜನ್ಮದಿನಕ್ಕೆ ಅಕ್ಟೋಬರ್ 1 ಅರ್ಹತಾ ದಿನಾಂಕ ಅನ್ವಯವಾಗುತ್ತದೆ.',
    },
    formOrTool: 'Form 6 (Advance 17+) · 4 Qualifying Dates',
  },
  {
    id: 'scen-lost-id',
    situation: { en: '“I lost my physical Voter ID card before polling day.”', kn: '“ಮತದಾನದ ಮುನ್ನ ನನ್ನ ಭೌತಿಕ ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಕಳೆದುಹೋಗಿದೆ.”' },
    action: {
      en: 'First confirm your name is in the electoral roll. You can download e-EPIC or carry any ECI-approved alternative photo ID (Passport, Aadhaar, Driving Licence, PAN, etc.).',
      kn: 'ಮೊದಲು ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರಿದೆಯೇ ನೋಡಿ. e-EPIC ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಮಾನ್ಯ ಪರ್ಯಾಯ ಫೋಟೋ ID (ಆಧಾರ್, ಪಾಸ್‌ಪೋರ್ಟ್, ಡಿಎಲ್ ಇತ್ಯಾದಿ) ಕೊಂಡೊಯ್ಯಿರಿ.',
    },
    formOrTool: 'electoralsearch.eci.gov.in · Alternative Photo ID',
  },
  {
    id: 'scen-hostel',
    situation: { en: '“I am a college student staying in a hostel in another city.”', kn: '“ನಾನು ಬೇರೆ ನಗರದ ಹಾಸ್ಟೆಲ್‌ನಲ್ಲಿ ಓದುತ್ತಿರುವ ವಿದ್ಯಾರ್ಥಿ.”' },
    action: {
      en: 'You may choose to remain registered at your permanent home address OR register at your hostel address if ordinarily residing there (never in two places at once).',
      kn: 'ನೀವು ಸ್ವಂತ ಊರು ಅಥವಾ ವಾಸವಿರುವ ಹಾಸ್ಟೆಲ್ ವಿಳಾಸ—ಎರಡರಲ್ಲಿ ಒಂದೇ ಕಡೆ ಮಾತ್ರ ನೋಂದಾಯಿಸಬಹುದು.',
    },
    formOrTool: 'Form 6 / Form 8 · One Constituency Only',
  },
];

// ============================================================================
// MODULE 3: RULES, RIGHTS & REGULATIONS
// ============================================================================
export const RULES_ACCORDION: RuleAccordionItem[] = [
  {
    id: 'rule-mcc',
    title: { en: 'Model Code of Conduct (MCC) Dos & Don’ts', kn: 'ಮಾದರಿ ನೀತಿ ಸಂಹಿತೆ (MCC) ಮಾಡಬೇಕಾದ್ದು ಮತ್ತು ಮಾಡಬಾರದ್ದು' },
    summary: {
      en: 'Keeps elections fair from the moment dates are announced by banning misuse of government machinery and hate speech.',
      kn: 'ಚುನಾವಣಾ ದಿನಾಂಕ ಘೋಷಣೆಯಾದ ತಕ್ಷಣ ಸರ್ಕಾರಿ ಯಂತ್ರದ ದುರುಪಯೋಗ ಮತ್ತು ದ್ವೇಷ ಭಾಷಣವನ್ನು ತಡೆಯುತ್ತದೆ.',
    },
    example: {
      en: 'Example: Ministers cannot announce new public grants or use official vehicles for party campaigning once MCC starts.',
      kn: 'ಉದಾಹರಣೆ: MCC ಜಾರಿಯಾದ ನಂತರ ಸಚಿವರು ಹೊಸ ಯೋಜನೆಗಳನ್ನು ಘೋಷಿಸುವಂತಿಲ್ಲ ಅಥವಾ ಸರ್ಕಾರಿ ವಾಹನವನ್ನು ಪ್ರಚಾರಕ್ಕೆ ಬಳಸುವಂತಿಲ್ಲ.',
    },
    detailedLegal: {
      en: 'MCC is an ECI-enforced consensus code backed by IPC/BNS and RPA 1951 provisions for corrupt practices and electoral offences. Verify full MCC manual on eci.gov.in.',
      kn: 'MCC ಎಂಬುದು ECI ಜಾರಿಗೊಳಿಸುವ ನಿಯಮಾವಳಿಯಾಗಿದ್ದು, RPA 1951 ಮತ್ತು ದಂಡ ಸಂಹಿತೆಯ ಬೆಂಬಲ ಹೊಂದಿದೆ.',
    },
    legalSource: 'ECI Model Code of Conduct · RPA 1951',
  },
  {
    id: 'rule-secrecy',
    title: { en: 'Voter Rights, Duties & Secrecy of Vote', kn: 'ಮತದಾರರ ಹಕ್ಕುಗಳು, ಕರ್ತವ್ಯಗಳು ಮತ್ತು ಮತದ ಗೌಪ್ಯತೆ' },
    summary: {
      en: 'Every eligible adult citizen has one equal vote, and nobody can legally force or verify who you voted for.',
      kn: 'ಪ್ರತಿ ಅರ್ಹ ವಯಸ್ಕ ನಾಗರಿಕನಿಗೂ ಒಂದು ಸಮಾನ ಮತದ ಹಕ್ಕಿದೆ; ನೀವು ಯಾರಿಗೆ ಮತ ಹಾಕಿದಿರಿ ಎಂದು ಯಾರೂ ತಿಳಿಯುವಂತಿಲ್ಲ.',
    },
    example: {
      en: 'Example: Taking a photo of the Ballot Unit or VVPAT slip inside the voting compartment violates vote secrecy and booth rules.',
      kn: 'ಉದಾಹರಣೆ: ಮತದಾನದ ಕೊಠಡಿಯೊಳಗೆ EVM ಅಥವಾ VVPAT ಫೋಟೋ ತೆಗೆಯುವುದು ಮತದ ಗೌಪ್ಯತೆಯ ಉಲ್ಲಂಘನೆಯಾಗಿದೆ.',
    },
    detailedLegal: {
      en: 'Article 326 guarantees adult suffrage; RPA 1951 Section 128 mandates maintenance of secrecy of voting by officers, agents, and voters.',
      kn: 'ಸಂವಿಧಾನದ 326ನೇ ವಿಧಿ ವಯಸ್ಕ ಮತದಾನವನ್ನು ನೀಡುತ್ತದೆ; RPA 1951 ಸೆಕ್ಷನ್ 128 ಮತದ ಗೌಪ್ಯತೆಯನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ.',
    },
    legalSource: 'Constitution Art. 326 · RPA 1951 Sec 128',
  },
  {
    id: 'rule-offences',
    title: { en: 'Electoral Offences (Bribery, Impersonation, Voting Twice)', kn: 'ಚುನಾವಣಾ ಅಪರಾಧಗಳು (ಲಂಚ, ನಕಲಿ ಮತ, ಎರಡು ಬಾರಿ ಮತದಾನ)' },
    summary: {
      en: 'Offering cash/gifts for votes, pretending to be another voter, booth capturing, paid news, or voting more than once are punishable offences.',
      kn: 'ಹಣ/ಉಡುಗೊರೆ ನೀಡುವುದು, ಬೇರೆಯವರ ಹೆಸರಿನಲ್ಲಿ ಮತ ಹಾಕುವುದು, ಮತಗಟ್ಟೆ ವಶ, ಮತ್ತು ಎರಡು ಬಾರಿ ಮತ ಹಾಕುವುದು ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧ.',
    },
    example: {
      en: 'Example: Even if your name appears twice by mistake in two booths, voting twice is a crime—submit Form 7 to delete the duplicate.',
      kn: 'ಉದಾಹರಣೆ: ಆಕಸ್ಮಿಕವಾಗಿ ಎರಡು ಕಡೆ ಹೆಸರಿದ್ದರೂ ಎರಡು ಬಾರಿ ಮತ ಹಾಕುವುದು ಅಪರಾಧ; ಫಾರ್ಮ್ 7 ಮೂಲಕ ಒಂದನ್ನು ಅಳಿಸಿ.',
    },
    detailedLegal: {
      en: 'Covered under RPA 1951 Sec 62(3)-(4), Sec 123 (Corrupt Practices), Sec 135A (Booth Capturing), and BNS/IPC bribery & impersonation sections.',
      kn: 'RPA 1951 ಸೆಕ್ಷನ್ 62, 123, 135A ಮತ್ತು ಭಾರತೀಯ ನ್ಯಾಯ ಸಂಹಿತೆ ಅಡಿಯಲ್ಲಿ ಕಠಿಣ ಶಿಕ್ಷೆ ಇದೆ.',
    },
    legalSource: 'RPA 1951 Sec 62, 123, 135A',
  },
  {
    id: 'rule-silence',
    title: { en: 'Campaign Rules & 48-Hour Silence Period', kn: 'ಪ್ರಚಾರ ನಿಯಮಗಳು ಮತ್ತು 48 ಗಂಟೆಗಳ ಮೌನ ಅವಧಿ' },
    summary: {
      en: 'Public rallies, loudspeakers, and broadcast/digital ads must stop 48 hours before voting concludes so voters can decide calmly.',
      kn: 'ಮತದಾರರು ಶಾಂತವಾಗಿ ನಿರ್ಧರಿಸಲು ಮತದಾನ ಮುಗಿಯುವ 48 ಗಂಟೆ ಮೊದಲು ಸಾರ್ವಜನಿಕ ಪ್ರಚಾರ ನಿಲ್ಲಬೇಕು.',
    },
    example: {
      en: 'Example: If polling ends at 6:00 PM on Friday, public campaigning must stop by 6:00 PM on Wednesday.',
      kn: 'ಉದಾಹರಣೆ: ಶುಕ್ರವಾರ ಸಂಜೆ 6ಕ್ಕೆ ಮತದಾನ ಮುಗಿದರೆ, ಬುಧವಾರ ಸಂಜೆ 6ಕ್ಕೆ ಬಹಿರಂಗ ಪ್ರಚಾರ ನಿಲ್ಲಬೇಕು.',
    },
    detailedLegal: {
      en: 'Section 126 of RPA 1951 bans public meetings and propagation via TV/cinematograph/similar apparatus; Section 126A restricts exit polls until final phase closes.',
      kn: 'RPA 1951 ಸೆಕ್ಷನ್ 126 ಮತ್ತು 126A ಅಡಿಯಲ್ಲಿ ಮೌನ ಅವಧಿ ಮತ್ತು ಎಕ್ಸಿಟ್ ಪೋಲ್ ನಿರ್ಬಂಧ ಜಾರಿಯಲ್ಲಿದೆ.',
    },
    legalSource: 'RPA 1951 Sec 126 & 126A',
  },
  {
    id: 'rule-nota',
    title: { en: 'NOTA (None of the Above)', kn: 'ಮೇಲಿನವರಲ್ಲಿ ಯಾರೂ ಅಲ್ಲ (NOTA)' },
    summary: {
      en: 'Always the last button on the Ballot Unit, allowing voters to formally reject all contesting candidates while keeping their vote secret.',
      kn: 'ಮತಯಂತ್ರದ ಕೊನೆಯ ಬಟನ್ ಆಗಿದ್ದು, ಯಾವ ಅಭ್ಯರ್ಥಿಗೂ ಮತ ನೀಡದಿರಲು ರಹಸ್ಯವಾಗಿ ಆಯ್ಕೆ ಮಾಡಬಹುದು.',
    },
    example: {
      en: 'Example: Pressing NOTA still prints a VVPAT slip showing NOTA and increments the total poll count.',
      kn: 'ಉದಾಹರಣೆ: NOTA ಒತ್ತಿದಾಗಲೂ VVPAT ನಲ್ಲಿ NOTA ಚೀಟಿ ಮುದ್ರಣವಾಗಿ ಒಟ್ಟು ಮತಗಳಲ್ಲಿ ಲೆಕ್ಕವಾಗುತ್ತದೆ.',
    },
    detailedLegal: {
      en: 'Introduced following the 2013 Supreme Court judgment (PUCL vs Union of India). Placed last after Independents. Verify current effect of NOTA tally on eci.gov.in.',
      kn: '2013ರ ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ತೀರ್ಪಿನ ನಂತರ ಜಾರಿಗೆ ಬಂದಿತು; ಯಾವಾಗಲೂ ಮತಪತ್ರದ ಕೊನೆಯಲ್ಲಿರುತ್ತದೆ.',
    },
    legalSource: 'PUCL v. UOI (2013) · ECI Directives',
  },
  {
    id: 'rule-special-votes',
    title: { en: 'Tendered Vote, Challenged Vote & Form 17A', kn: 'ಟೆಂಡರ್ ಮತ, ಚಾಲೆಂಜ್ ಮತ ಮತ್ತು ಫಾರ್ಮ್ 17A' },
    summary: {
      en: 'Form 17A records every voter’s signature/thumbprint at the booth. Special procedures protect genuine voters if someone already impersonated them.',
      kn: 'ಫಾರ್ಮ್ 17A ಪ್ರತಿಯೊಬ್ಬ ಮತದಾರರ ಸಹಿಯನ್ನು ದಾಖಲಿಸುತ್ತದೆ; ಬೇರೆಯವರು ನಿಮ್ಮ ಹೆಸರಲ್ಲಿ ಮತ ಹಾಕಿದ್ದರೆ ಟೆಂಡರ್ ಮತದ ಅವಕಾಶವಿದೆ.',
    },
    example: {
      en: 'Example: If you arrive and find your vote was already cast fraudulently, after proving your identity to the Presiding Officer, you can cast a Tendered Vote on a paper ballot (Form 17B).',
      kn: 'ಉದಾಹರಣೆ: ನಿಮ್ಮ ಹೆಸರಲ್ಲಿ ಬೇರೆಯವರು ಮತ ಹಾಕಿದ್ದರೆ, ಗುರುತು ಸಾಬೀತುಪಡಿಸಿ ಕಾಗದದ ಬ್ಯಾಲೆಟ್ (ಟೆಂಡರ್ ವೋಟ್) ಮೂಲಕ ಮತ ಹಾಕಬಹುದು.',
    },
    detailedLegal: {
      en: 'Conduct of Elections Rules 1961: Rule 49L (Form 17A Register), Rule 36 (Challenged Vote with ₹2 deposit), and Rule 49P (Tendered Vote recorded separately in Form 17B).',
      kn: 'ಚುನಾವಣಾ ನಿಯಮಗಳು 1961ರ ನಿಯಮ 49L (ಫಾರ್ಮ್ 17A), ನಿಯಮ 36 ಮತ್ತು ನಿಯಮ 49P ಅಡಿಯಲ್ಲಿ ರಕ್ಷಣೆ ಇದೆ.',
    },
    legalSource: 'Conduct of Elections Rules 1961 (Rules 36, 49L, 49P)',
  },
  {
    id: 'rule-affidavits',
    title: { en: 'Expenditure Limits & Candidate Affidavits', kn: 'ವೆಚ್ಚದ ಮಿತಿ ಮತ್ತು ಅಭ್ಯರ್ಥಿಗಳ ಅಫಿಡವಿಟ್' },
    summary: {
      en: 'Candidates must disclose assets, liabilities, education, and pending/convicted criminal cases, and stay within statutory campaign spending caps.',
      kn: 'ಅಭ್ಯರ್ಥಿಗಳು ತಮ್ಮ ಆಸ್ತಿ, ಸಾಲ, ಶಿಕ್ಷಣ ಮತ್ತು ಕ್ರಿಮಿನಲ್ ಪ್ರಕರಣಗಳನ್ನು ಘೋಷಿಸಬೇಕು ಹಾಗೂ ನಿಗದಿತ ಖರ್ಚಿನ ಮಿತಿ ಪಾಲಿಸಬೇಕು.',
    },
    example: {
      en: 'Example: Every voter can inspect any candidate’s Form 26 affidavit on ECI’s Know Your Candidate (KYC) mobile app before voting.',
      kn: 'ಉದಾಹರಣೆ: ಮತದಾನಕ್ಕೂ ಮುನ್ನ KYC ಆ್ಯಪ್‌ನಲ್ಲಿ ಅಭ್ಯರ್ಥಿಯ ಫಾರ್ಮ್ 26 ಅಫಿಡವಿಟ್ ನೋಡಬಹುದು.',
    },
    detailedLegal: {
      en: 'RPA 1951 Sec 33A & Sec 77 require Form 26 affidavits and day-to-day expenditure accounts; verify current statutory rupee limits per state on eci.gov.in.',
      kn: 'RPA 1951 ಸೆಕ್ಷನ್ 33A ಮತ್ತು 77ರ ಅಡಿಯಲ್ಲಿ ಅಫಿಡವಿಟ್ ಮತ್ತು ವೆಚ್ಚದ ಲೆಕ್ಕ ಕಡ್ಡಾಯ; ಪ್ರಸ್ತುತ ಮಿತಿಯನ್ನು eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
    },
    legalSource: 'RPA 1951 Sec 33A & Sec 77',
  },
  {
    id: 'rule-complain',
    title: { en: 'How to Report Violations (cVIGIL, 1950, RO)', kn: 'ದೂರು ನೀಡುವುದು ಹೇಗೆ (cVIGIL, 1950, RO)' },
    summary: {
      en: 'Citizens can report illegal inducements, paid rallies during silence period, or booth issues directly to ECI flying squads.',
      kn: 'ಅಕ್ರಮ ಆಮಿಷಗಳು, ಮೌನ ಅವಧಿಯ ಪ್ರಚಾರ ಅಥವಾ ಮತಗಟ್ಟೆ ಸಮಸ್ಯೆಗಳನ್ನು ನೇರವಾಗಿ ECI ಗೆ ವರದಿ ಮಾಡಬಹುದು.',
    },
    example: {
      en: 'Example: Snap a live geo-tagged photo on cVIGIL; flying squads aim for rapid field verification (check current SLA on eci.gov.in).',
      kn: 'ಉದಾಹರಣೆ: cVIGIL ಆ್ಯಪ್‌ನಲ್ಲಿ ಲೈವ್ ಜಿಯೋ-ಟ್ಯಾಗ್ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದರೆ ಫ್ಲೈಯಿಂಗ್ ಸ್ಕ್ವಾಡ್ ತಕ್ಷಣ ಪರಿಶೀಲಿಸುತ್ತದೆ.',
    },
    detailedLegal: {
      en: 'Complaints can be lodged via cVIGIL App, National Grievance Service Portal (NGSP), Helpline 1950, or in writing to the Returning Officer / District Election Officer.',
      kn: 'cVIGIL ಆ್ಯಪ್, NGSP ಪೋರ್ಟಲ್, ಸಹಾಯವಾಣಿ 1950 ಅಥವಾ ಚುನಾವಣಾಧಿಕಾರಿ (RO) ಮೂಲಕ ದೂರು ದಾಖಲಿಸಬಹುದು.',
    },
    legalSource: 'ECI Grievance Redressal · cVIGIL / 1950',
  },
];

// ============================================================================
// MODULE 4: KARNATAKA HIERARCHY
// ============================================================================
export const ADMIN_HIERARCHY = [
  {
    role: { en: 'Election Commission of India (ECI)', kn: 'ಭಾರತೀಯ ಚುನಾವಣಾ ಆಯೋಗ (ECI)' },
    scope: { en: 'National constitutional authority supervising all Parliament & Assembly elections.', kn: 'ಸಂಸತ್ ಮತ್ತು ವಿಧಾನಸಭಾ ಚುನಾವಣೆಗಳ ರಾಷ್ಟ್ರೀಯ ಸಾಂವಿಧಾನಿಕ ಪ್ರಾಧಿಕಾರ.' },
  },
  {
    role: { en: 'Chief Electoral Officer (CEO – Karnataka)', kn: 'ಮುಖ್ಯ ಚುನಾವಣಾಧಿಕಾರಿ (CEO – ಕರ್ನಾಟಕ)' },
    scope: { en: 'Leads state-wide roll revision, training, and election execution across Karnataka.', kn: 'ರಾಜ್ಯಾದ್ಯಂತ ಮತದಾರರ ಪಟ್ಟಿ ಮತ್ತು ಚುನಾವಣಾ ನಿರ್ವಹಣೆಯ ಮುಖ್ಯಸ್ಥರು.' },
  },
  {
    role: { en: 'District Election Officer (DEO / Deputy Commissioner)', kn: 'ಜಿಲ್ಲಾ ಚುನಾವಣಾಧಿಕಾರಿ (DEO / ಜಿಲ್ಲಾಧಿಕಾರಿ)' },
    scope: { en: 'Coordinates logistics, strong rooms, and law-and-order across all constituencies in a district.', kn: 'ಜಿಲ್ಲೆಯ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳ ಸಿದ್ಧತೆ, ಸ್ಟ್ರಾಂಗ್ ರೂಮ್ ಮತ್ತು ಭದ್ರತೆಯ ಸಮನ್ವಯ.' },
  },
  {
    role: { en: 'Returning Officer (RO)', kn: 'ಚುನಾವಣಾಧಿಕಾರಿ (RO)' },
    scope: { en: 'Handles nominations, scrutiny, ballot order, counting, and result declaration for a constituency.', kn: 'ಕ್ಷೇತ್ರದ ನಾಮಪತ್ರ, ಪರಿಶೀಲನೆ, ಮತಪತ್ರ, ಎಣಿಕೆ ಮತ್ತು ಫಲಿತಾಂಶ ಘೋಷಣೆ.' },
  },
  {
    role: { en: 'Electoral Registration Officer (ERO)', kn: 'ಮತದಾರರ ನೋಂದಣಾಧಿಕಾರಿ (ERO)' },
    scope: { en: 'Maintains and updates the electoral roll (approving Form 6, 7, 8) for an Assembly constituency.', kn: 'ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರದ ಮತದಾರರ ಪಟ್ಟಿಯ ನಿರ್ವಹಣೆ (ಫಾರ್ಮ್ 6, 7, 8 ಅನುಮೋದನೆ).' },
  },
  {
    role: { en: 'Booth Level Officer (BLO)', kn: 'ಬೂತ್ ಮಟ್ಟದ ಅಧಿಕಾರಿ (BLO)' },
    scope: { en: 'Local government representative verifying voter addresses door-to-door for 1–2 polling booths.', kn: '1-2 ಮತಗಟ್ಟೆಗಳ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಮನೆಮನೆಗೆ ಭೇಟಿ ನೀಡಿ ವಿವರ ಪರಿಶೀಲಿಸುವ ಅಧಿಕಾರಿ.' },
  },
  {
    role: { en: 'Presiding Officer (PrO) & Polling Officers 1–3', kn: 'ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿ ಮತ್ತು ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿಗಳು 1-3' },
    scope: { en: 'Conducts mock poll, verifies IDs, applies ink, operates Control Unit, and seals EVM/VVPAT on poll day.', kn: 'ಮತದಾನದ ದಿನ ಅಣಕು ಮತದಾನ, ಗುರುತು ಪರಿಶೀಲನೆ, ಶಾಯಿ, EVM ನಿರ್ವಹಣೆ ಮತ್ತು ಸೀಲಿಂಗ್.' },
  },
];

// ============================================================================
// MODULE 8: COUNTING & EVM SAFEGUARDS
// ============================================================================
export const COUNTING_STEPS = [
  {
    step: 1,
    title: { en: 'Sealed Strong Room', kn: 'ಸೀಲ್ ಮಾಡಿದ ಸ್ಟ್ರಾಂಗ್ ರೂಮ್' },
    desc: {
      en: 'After polling closes, EVMs & VVPATs are sealed with candidate agents’ signatures and stored in 24×7 guarded, CCTV-monitored strong rooms.',
      kn: 'ಮತದಾನ ಮುಗಿದ ನಂತರ ಏಜೆಂಟರ ಸಹಿಯೊಂದಿಗೆ ಸೀಲ್ ಮಾಡಿ 24×7 ಭದ್ರತೆ ಮತ್ತು CCTV ಕಣ್ಗಾವಲಿನ ಸ್ಟ್ರಾಂಗ್ ರೂಮ್‌ನಲ್ಲಿ ಇಡಲಾಗುತ್ತದೆ.',
    },
  },
  {
    step: 2,
    title: { en: 'Counting Hall & Observers', kn: 'ಮತ ಎಣಿಕೆ ಕೇಂದ್ರ ಮತ್ತು ವೀಕ್ಷಕರು' },
    desc: {
      en: 'On counting morning, strong room seals are verified and opened in the presence of the RO, ECI Observers, and candidate agents.',
      kn: 'ಎಣಿಕೆಯ ದಿನ ಬೆಳಿಗ್ಗೆ ವೀಕ್ಷಕರು, RO ಮತ್ತು ಅಭ್ಯರ್ಥಿಗಳ ಏಜೆಂಟರ ಸಮ್ಮುಖದಲ್ಲಿ ಸೀಲ್ ಪರಿಶೀಲಿಸಿ ಬಾಗಿಲು ತೆರೆಯಲಾಗುತ್ತದೆ.',
    },
  },
  {
    step: 3,
    title: { en: 'Postal & ETPBS Ballots First', kn: 'ಮೊದಲು ಅಂಚೆ ಮತ್ತು ETPBS ಮತಗಳು' },
    desc: {
      en: 'Counting starts at 8:00 AM with postal ballots and electronically transmitted postal ballots (ETPBS) for service/absentee voters.',
      kn: 'ಬೆಳಿಗ್ಗೆ 8 ಗಂಟೆಗೆ ಸೇವಾ ಮತದಾರರ ಅಂಚೆ ಮತಗಳು ಮತ್ತು ETPBS ಮತಗಳ ಎಣಿಕೆ ಮೊದಲು ಆರಂಭವಾಗುತ್ತದೆ.',
    },
  },
  {
    step: 4,
    title: { en: 'EVM Rounds with Agent Watch', kn: 'ಏಜೆಂಟರ ಸಮ್ಮುಖದಲ್ಲಿ EVM ಸುತ್ತುಗಳು' },
    desc: {
      en: 'Control Units are brought round-by-round (typically 14 tables). Agents verify unique serial numbers & paper seals before the “Result” button is pressed.',
      kn: 'ಸುತ್ತುವಾರು ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್‌ಗಳನ್ನು ತಂದು ಸೀಲ್ ಪರಿಶೀಲಿಸಿ, ಏಜೆಂಟರ ಮುಂದೆ “Result” ಬಟನ್ ಒತ್ತಲಾಗುತ್ತದೆ.',
    },
  },
  {
    step: 5,
    title: { en: 'Random VVPAT Slip Audit', kn: 'ಯಾದೃಚ್ಛಿಕ VVPAT ಚೀಟಿ ತಾಳೆ' },
    desc: {
      en: 'VVPAT paper slips of randomly selected polling stations per assembly segment are hand-counted and matched against the EVM tally (check current number of polling stations with ECI).',
      kn: 'ಪ್ರತಿ ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರದಲ್ಲಿ ಯಾದೃಚ್ಛಿಕವಾಗಿ ಆಯ್ಕೆ ಮಾಡಿದ ಮತಗಟ್ಟೆಗಳ VVPAT ಚೀಟಿಗಳನ್ನು ಕೈಯಿಂದ ಎಣಿಸಿ EVM ಲೆಕ್ಕದೊಂದಿಗೆ ತಾಳೆ ಮಾಡಲಾಗುತ್ತದೆ (ಪ್ರಸ್ತುತ ಸಂಖ್ಯೆಯನ್ನು ECI ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ).',
    },
  },
  {
    step: 6,
    title: { en: 'Result Declaration & Certificate', kn: 'ಫಲಿತಾಂಶ ಘೋಷಣೆ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ' },
    desc: {
      en: 'After completing Form 20 final sheet and Form 21C/21E, the Returning Officer declares the winner and issues the Certificate of Election (Form 22).',
      kn: 'ಫಾರ್ಮ್ 20 ಮತ್ತು 21C/21E ಪೂರ್ಣಗೊಂಡ ನಂತರ RO ವಿಜೇತರನ್ನು ಘೋಷಿಸಿ ಫಾರ್ಮ್ 22 ಚುನಾವಣಾ ಪ್ರಮಾಣಪತ್ರ ನೀಡುತ್ತಾರೆ.',
    },
  },
];

export const EVM_SAFEGUARDS = [
  {
    title: { en: 'Standalone & Non-Networked', kn: 'ನೆಟ್‌ವರ್ಕ್ ರಹಿತ ಸ್ವತಂತ್ರ ಯಂತ್ರ' },
    desc: {
      en: 'Indian EVMs have no Wi-Fi, Bluetooth, cellular modem, or internet connection—they operate purely on an internal 7.5V battery.',
      kn: 'ಭಾರತೀಯ EVM ಗಳಲ್ಲಿ Wi-Fi, ಬ್ಲೂಟೂತ್ ಅಥವಾ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಇರುವುದಿಲ್ಲ; ಆಂತರಿಕ ಬ್ಯಾಟರಿಯಿಂದ ಮಾತ್ರ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.',
    },
  },
  {
    title: { en: 'First-Level Checking (FLC) & Randomisation', kn: 'ಪ್ರಥಮ ಹಂತದ ತಪಾಸಣೆ ಮತ್ತು ಯಾದೃಚ್ಛಿಕ ಹಂಚಿಕೆ' },
    desc: {
      en: 'Engineers inspect every machine months ahead in front of party representatives, followed by two rounds of software randomisation so no one knows which machine goes to which booth.',
      kn: 'ಪಕ್ಷಗಳ ಪ್ರತಿನಿಧಿಗಳ ಮುಂದೆ ತಪಾಸಣೆ ನಡೆಸಿ, ಎರಡು ಹಂತದ ಯಾದೃಚ್ಛಿಕ ಹಂಚಿಕೆ ಮಾಡಲಾಗುತ್ತದೆ.',
    },
  },
  {
    title: { en: 'Pre-Poll Mock Poll (50+ Votes)', kn: 'ಮತದಾನ ಪೂರ್ವ ಅಣಕು ಮತದಾನ (50+ ಮತಗಳು)' },
    desc: {
      en: 'Before voting starts at dawn, Presiding Officers conduct a mock poll of at least 50 votes with polling agents, match EVM vs VVPAT slips, clear the mock votes, and seal the machine.',
      kn: 'ಮತದಾನಕ್ಕೂ ಮುನ್ನ ಏಜೆಂಟರ ಮುಂದೆ ಕನಿಷ್ಠ 50 ಅಣಕು ಮತಗಳನ್ನು ಹಾಕಿ EVM-VVPAT ತಾಳೆ ನೋಡಿ, ಡೇಟಾ ಅಳಿಸಿ ಸೀಲ್ ಮಾಡಲಾಗುತ್ತದೆ.',
    },
  },
  {
    title: { en: 'One-Time Programmable Chip', kn: 'ಒಮ್ಮೆ ಮಾತ್ರ ಪ್ರೋಗ್ರಾಮ್ ಮಾಡಬಹುದಾದ ಚಿಪ್' },
    desc: {
      en: 'The EVM microcontroller uses fused one-time programmable memory that cannot be rewritten after manufacture.',
      kn: 'EVM ಮೈಕ್ರೋಕಂಟ್ರೋಲರ್ ತಯಾರಿಕೆಯ ಸಮಯದಲ್ಲೇ ಲಾಕ್ ಆದ ಬದಲಾಯಿಸಲಾಗದ ಚಿಪ್ ಹೊಂದಿರುತ್ತದೆ.',
    },
  },
];

// ============================================================================
// MODULE 9: MYTH VS FACT, GLOSSARY, QUIZ & OFFLINE FAQ
// ============================================================================
export const MYTHS_FACTS: MythFactItem[] = [
  {
    id: 'mf-1',
    myth: { en: '“If I have an EPIC card, I can automatically walk in and vote.”', kn: '“ನನ್ನ ಬಳಿ ವೋಟರ್ ಐಡಿ (EPIC) ಇದ್ದರೆ ಸಾಕು, ನೇರವಾಗಿ ಮತ ಹಾಕಬಹುದು.”' },
    fact: { en: 'Fact: Your name MUST appear in the active electoral roll for that booth. Always verify on electoralsearch.eci.gov.in before poll day.', kn: 'ಸತ್ಯ: ಆ ಮತಗಟ್ಟೆಯ ಸಕ್ರಿಯ ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಕಡ್ಡಾಯವಾಗಿ ಇರಬೇಕು.' },
  },
  {
    id: 'mf-2',
    myth: { en: '“EVMs connect to the internet or Wi-Fi to transmit results.”', kn: '“ಫಲಿತಾಂಶ ಕಳುಹಿಸಲು EVM ಗಳು ಇಂಟರ್ನೆಟ್ ಅಥವಾ Wi-Fi ಬಳಸುತ್ತವೆ.”' },
    fact: { en: 'Fact: EVMs are standalone battery-powered machines with zero radio, Wi-Fi, Bluetooth, or network hardware.', kn: 'ಸತ್ಯ: EVM ಗಳು ಯಾವುದೇ Wi-Fi, ಬ್ಲೂಟೂತ್ ಅಥವಾ ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲದ ಸ್ವತಂತ್ರ ಯಂತ್ರಗಳಾಗಿವೆ.' },
  },
  {
    id: 'mf-3',
    myth: { en: '“If I lost my EPIC card, I cannot vote at all.”', kn: '“ನನ್ನ EPIC ಕಾರ್ಡ್ ಕಳೆದುಹೋದರೆ ನಾನು ಮತ ಹಾಕುವಂತೆಯೇ ಇಲ್ಲ.”' },
    fact: { en: 'Fact: As long as your name is in the electoral roll, you can carry any ECI-notified alternative photo ID (Passport, Aadhaar, Driving Licence, etc.).', kn: 'ಸತ್ಯ: ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರಿದ್ದರೆ ಆಧಾರ್, ಪಾಸ್‌ಪೋರ್ಟ್, ಡಿಎಲ್ ಮುಂತಾದ ECI ಮಾನ್ಯ ಪರ್ಯಾಯ ಫೋಟೋ ID ತೋರಿಸಿ ಮತ ಹಾಕಬಹುದು.' },
  },
  {
    id: 'mf-4',
    myth: { en: '“VVPAT slips show the candidate’s photograph.”', kn: '“VVPAT ಚೀಟಿಯಲ್ಲಿ ಅಭ್ಯರ್ಥಿಯ ಫೋಟೋ ಮುದ್ರಣವಾಗುತ್ತದೆ.”' },
    fact: { en: 'Fact: Real VVPAT slips print ONLY the serial number, candidate name, and party symbol—never a photograph.', kn: 'ಸತ್ಯ: ನೈಜ VVPAT ಚೀಟಿಯಲ್ಲಿ ಕ್ರಮಸಂಖ್ಯೆ, ಅಭ್ಯರ್ಥಿಯ ಹೆಸರು ಮತ್ತು ಪಕ್ಷದ ಚಿಹ್ನೆ ಮಾತ್ರ ಇರುತ್ತದೆ, ಫೋಟೋ ಇರುವುದಿಲ್ಲ.' },
  },
  {
    id: 'mf-5',
    myth: { en: '“Only January 1 is the qualifying date for turning 18.”', kn: '“18 ವರ್ಷ ತುಂಬಲು ಜನವರಿ 1 ಒಂದೇ ಅರ್ಹತಾ ದಿನಾಂಕವಾಗಿದೆ.”' },
    fact: { en: 'Fact: There are now FOUR qualifying dates every year: Jan 1, Apr 1, Jul 1, and Oct 1, plus advance applications for 17+.', kn: 'ಸತ್ಯ: ಈಗ ವರ್ಷದಲ್ಲಿ ನಾಲ್ಕು ಅರ್ಹತಾ ದಿನಾಂಕಗಳಿವೆ (ಜನ 1, ಏಪ್ರಿ 1, ಜುಲೈ 1, ಅಕ್ಟೋ 1) ಹಾಗೂ 17+ ಮುಂಗಡ ಅರ್ಜಿ ಲಭ್ಯ.' },
  },
  {
    id: 'mf-6',
    myth: { en: '“Pressing a candidate’s blue button repeatedly casts multiple votes.”', kn: '“ನೀಲಿ ಬಟನ್ ಅನ್ನು ಪದೇ ಪದೇ ಒತ್ತಿದರೆ ಹೆಚ್ಚು ಮತಗಳು ಬೀಳುತ್ತವೆ.”' },
    fact: { en: 'Fact: After one press, the Ballot Unit locks completely until the Polling Officer presses Ballot on the Control Unit for the next voter.', kn: 'ಸತ್ಯ: ಒಮ್ಮೆ ಒತ್ತಿದ ತಕ್ಷಣ ಯಂತ್ರ ಲಾಕ್ ಆಗುತ್ತದೆ; ಮುಂದಿನ ಮತದಾರರಿಗಾಗಿ ಅಧಿಕಾರಿ ಅನುಮತಿ ನೀಡುವವರೆಗೆ ಕೆಲಸ ಮಾಡುವುದಿಲ್ಲ.' },
  },
  {
    id: 'mf-7',
    myth: { en: '“The Control Unit stores my EPIC number next to whom I voted for.”', kn: '“ನಾನು ಯಾರಿಗೆ ಮತ ಹಾಕಿದೆ ಎಂಬುದನ್ನು ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್ ನನ್ನ EPIC ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಉಳಿಸುತ್ತದೆ.”' },
    fact: { en: 'Fact: The Control Unit only increments anonymous candidate counters. Your identity in Form 17A is never linked to your EVM vote.', kn: 'ಸತ್ಯ: ಯಂತ್ರವು ಅನಾಮಧೇಯ ಮತಗಳ ಸಂಖ್ಯೆಯನ್ನು ಮಾತ್ರ ಎಣಿಸುತ್ತದೆ; ನಿಮ್ಮ ಗುರುತನ್ನು ಮತದೊಂದಿಗೆ ಜೋಡಿಸುವುದಿಲ್ಲ.' },
  },
  {
    id: 'mf-8',
    myth: { en: '“Public campaigning is allowed right up to the night before voting.”', kn: '“ಮತದಾನದ ಹಿಂದಿನ ರಾತ್ರಿಯವರೆಗೂ ಬಹಿರಂಗ ಪ್ರಚಾರ ಮಾಡಬಹುದು.”' },
    fact: { en: 'Fact: All public rallies, loudspeakers, and campaign ads must stop 48 hours before polling closes (Silence Period).', kn: 'ಸತ್ಯ: ಮತದಾನ ಅಂತ್ಯಗೊಳ್ಳುವ 48 ಗಂಟೆಗಳ ಮೊದಲೇ ಬಹಿರಂಗ ಪ್ರಚಾರ ನಿಲ್ಲಬೇಕು.' },
  },
  {
    id: 'mf-9',
    myth: { en: '“Parties are listed on the EVM in random or lottery order.”', kn: '“EVM ನಲ್ಲಿ ಪಕ್ಷಗಳ ಹೆಸರುಗಳನ್ನು ಲಾಟರಿ ಮೂಲಕ ಯಾದೃಚ್ಛಿಕವಾಗಿ ಹಾಕಲಾಗುತ್ತದೆ.”' },
    fact: { en: 'Fact: ECI follows a strict rule: Recognised National & State parties first, then Registered-Unrecognised, then Independents (alphabetical within each), and NOTA last.', kn: 'ಸತ್ಯ: ಮಾನ್ಯತೆ ಪಡೆದ ರಾಷ್ಟ್ರೀಯ/ರಾಜ್ಯ ಪಕ್ಷಗಳು ಮೊದಲು, ನಂತರ ನೋಂದಾಯಿತ, ನಂತರ ಪಕ್ಷೇತರರು (ವರ್ಣಮಾಲೆ ಕ್ರಮ) ಮತ್ತು ಕೊನೆಯಲ್ಲಿ NOTA ಇರುತ್ತದೆ.' },
  },
  {
    id: 'mf-10',
    myth: { en: '“If I move to a new city, I should register fresh using Form 6.”', kn: '“ಬೇರೆ ನಗರಕ್ಕೆ ಹೋದರೆ ಹೊಸದಾಗಿ ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಸಬೇಕು.”' },
    fact: { en: 'Fact: Use Form 8 (Shifting of Residence) to move your existing registration instead of creating duplicate entries.', kn: 'ಸತ್ಯ: ದ್ವಿ-ನೋಂದಣಿ ತಪ್ಪಿಸಲು ಹಳೆಯ ಹೆಸರನ್ನು ವರ್ಗಾಯಿಸಲು ಫಾರ್ಮ್ 8 ಬಳಸಬೇಕು.' },
  },
  {
    id: 'mf-11',
    myth: { en: '“Only the Returning Officer can file a complaint about campaign violations.”', kn: '“ಪ್ರಚಾರ ನಿಯಮ ಉಲ್ಲಂಘನೆಯ ಬಗ್ಗೆ ಅಧಿಕಾರಿಗಳು ಮಾತ್ರ ದೂರು ನೀಡಬಹುದು.”' },
    fact: { en: 'Fact: Any citizen can report violations directly using ECI’s cVIGIL mobile app or Helpline 1950.', kn: 'ಸತ್ಯ: ಯಾವುದೇ ನಾಗರಿಕರು cVIGIL ಆ್ಯಪ್ ಅಥವಾ 1950 ಸಹಾಯವಾಣಿ ಮೂಲಕ ದೂರು ನೀಡಬಹುದು.' },
  },
  {
    id: 'mf-12',
    myth: { en: '“If someone already cast a fake vote in my name, I lose my right to vote.”', kn: '“ಬೇರೆಯವರು ನನ್ನ ಹೆಸರಲ್ಲಿ ಮತ ಹಾಕಿದ್ದರೆ ನನಗೆ ಮತ ಹಾಕಲು ಸಾಧ್ಯವೇ ಇಲ್ಲ.”' },
    fact: { en: 'Fact: After proving your identity to the Presiding Officer, you can cast a Tendered Vote on a paper ballot (Form 17B).', kn: 'ಸತ್ಯ: ಅಧಿಕಾರಿಗೆ ಗುರುತು ಸಾಬೀತುಪಡಿಸಿ ಕಾಗದದ ಬ್ಯಾಲೆಟ್ (ಟೆಂಡರ್ ವೋಟ್) ಮೂಲಕ ಮತ ಚಲಾಯಿಸಬಹುದು.' },
  },
];

export const GLOSSARY: GlossaryItem[] = [
  { id: 'g1', term: { en: 'EPIC', kn: 'EPIC (ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ)' }, definition: { en: 'Electors Photo Identity Card issued by ECI with a unique 10-character alphanumeric number.', kn: 'ECI ನೀಡುವ ವಿಶಿಷ್ಟ ಸಂಖ್ಯೆಯುಳ್ಳ ಮತದಾರರ ಫೋಟೋ ಗುರುತಿನ ಚೀಟಿ.' }, category: 'Identity' },
  { id: 'g2', term: { en: 'e-EPIC', kn: 'e-EPIC (ಡಿಜಿಟಲ್ ಗುರುತಿನ ಚೀಟಿ)' }, definition: { en: 'Official non-editable PDF version of EPIC downloadable from voters.eci.gov.in.', kn: 'voters.eci.gov.in ನಿಂದ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದಾದ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಮತದಾರರ ಚೀಟಿ.' }, category: 'Identity' },
  { id: 'g3', term: { en: 'EVM', kn: 'EVM (ವಿದ್ಯುನ್ಮಾನ ಮತಯಂತ್ರ)' }, definition: { en: 'Electronic Voting Machine comprising a Control Unit (with Officer 3) and Ballot Unit(s) (inside voting compartment).', kn: 'ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್ ಮತ್ತು ಬ್ಯಾಲೆಟ್ ಯೂನಿಟ್ ಒಳಗೊಂಡ ವಿದ್ಯುನ್ಮಾನ ಮತಯಂತ್ರ.' }, category: 'Machines' },
  { id: 'g4', term: { en: 'VVPAT', kn: 'VVPAT (ಮತದಾನ ದೃಢೀಕರಣ ಯಂತ್ರ)' }, definition: { en: 'Voter Verifiable Paper Audit Trail printer displaying a paper slip for 7 seconds before cutting it into a sealed box.', kn: 'ಮತ ಹಾಕಿದ ಅಭ್ಯರ್ಥಿಯ ವಿವರವನ್ನು 7 ಸೆಕೆಂಡ್ ತೋರಿಸಿ ಸೀಲ್ ಮಾಡಿದ ಪೆಟ್ಟಿಗೆಯಲ್ಲಿ ಸಂಗ್ರಹಿಸುವ ಯಂತ್ರ.' }, category: 'Machines' },
  { id: 'g5', term: { en: 'Control Unit (CU)', kn: 'ಕಂಟ್ರೋಲ್ ಯೂನಿಟ್ (CU)' }, definition: { en: 'EVM module operated by Polling Officer 3 to release one ballot at a time and store anonymous candidate totals.', kn: 'ಒಮ್ಮೆಗೆ ಒಂದು ಮತಕ್ಕೆ ಅನುಮತಿ ನೀಡುವ ಮತ್ತು ಮತ ಎಣಿಕೆ ಸಂಗ್ರಹಿಸುವ ಅಧಿಕಾರಿಯ ಯಂತ್ರ ಭಾಗ.' }, category: 'Machines' },
  { id: 'g6', term: { en: 'Ballot Unit (BU)', kn: 'ಬ್ಯಾಲೆಟ್ ಯೂನಿಟ್ (BU)' }, definition: { en: 'EVM unit inside the voting compartment showing candidate serials, names, symbols, and blue vote buttons.', kn: 'ಮತದಾನ ಕೊಠಡಿಯೊಳಗೆ ಅಭ್ಯರ್ಥಿಗಳ ಹೆಸರು, ಚಿಹ್ನೆ ಮತ್ತು ನೀಲಿ ಬಟನ್ ಹೊಂದಿರುವ ಯಂತ್ರ ಭಾಗ.' }, category: 'Machines' },
  { id: 'g7', term: { en: 'NOTA', kn: 'NOTA (ಮೇಲಿನವರಲ್ಲಿ ಯಾರೂ ಅಲ್ಲ)' }, definition: { en: 'None of the Above—always the last option on the ballot unit to register disapproval of all candidates.', kn: 'ಯಾವ ಅಭ್ಯರ್ಥಿಗೂ ಮತ ನೀಡದಿರಲು ಇರುವ ಕೊನೆಯ ಅಧಿಕೃತ ಆಯ್ಕೆ.' }, category: 'Ballot' },
  { id: 'g8', term: { en: 'Form 6', kn: 'ನಮೂನೆ 6 (Form 6)' }, definition: { en: 'Application form for enrolling as a new voter (or advance 17+ application).', kn: 'ಹೊಸ ಮತದಾರರಾಗಿ ಹೆಸರು ಸೇರಿಸಲು ಸಲ್ಲಿಸುವ ಅರ್ಜಿ.' }, category: 'Forms' },
  { id: 'g9', term: { en: 'Form 6A', kn: 'ನಮೂನೆ 6A (Form 6A)' }, definition: { en: 'Registration form for Overseas (NRI) Electors holding Indian passports.', kn: 'ವಿದೇಶದಲ್ಲಿರುವ ಭಾರತೀಯ (NRI) ಮತದಾರರ ನೋಂದಣಿ ಅರ್ಜಿ.' }, category: 'Forms' },
  { id: 'g10', term: { en: 'Form 7', kn: 'ನಮೂನೆ 7 (Form 7)' }, definition: { en: 'Application for objection to inclusion or deletion of a name in the electoral roll.', kn: 'ಮತದಾರರ ಪಟ್ಟಿಯಿಂದ ಹೆಸರು ತೆಗೆದುಹಾಕಲು ಅಥವಾ ಆಕ್ಷೇಪಿಸಲು ಸಲ್ಲಿಸುವ ಅರ್ಜಿ.' }, category: 'Forms' },
  { id: 'g11', term: { en: 'Form 8', kn: 'ನಮೂನೆ 8 (Form 8)' }, definition: { en: 'Unified form for address shifting, roll corrections, replacement EPIC, and PwD marking.', kn: 'ವಿಳಾಸ ಬದಲಾವಣೆ, ತಿದ್ದುಪಡಿ ಮತ್ತು ಬದಲಿ EPIC ಪಡೆಯಲು ಸಲ್ಲಿಸುವ ಏಕೀಕೃತ ಅರ್ಜಿ.' }, category: 'Forms' },
  { id: 'g12', term: { en: 'Form 12D', kn: 'ನಮೂನೆ 12D (Form 12D)' }, definition: { en: 'Application for postal/home voting by eligible senior citizens (85+), PwDs, or essential services.', kn: 'ಅರ್ಹ ಹಿರಿಯ ನಾಗರಿಕರು (85+) ಮತ್ತು PwD ಮತದಾರರ ಮನೆ ಮತದಾನ ಅರ್ಜಿ.' }, category: 'Forms' },
  { id: 'g13', term: { en: 'Form 17A', kn: 'ನಮೂನೆ 17A (ಮತದಾರರ ವಹಿ)' }, definition: { en: 'Register of Voters maintained by Polling Officer 2 where every voter signs or gives a thumb impression.', kn: 'ಮತಗಟ್ಟೆಯಲ್ಲಿ ಪ್ರತಿಯೊಬ್ಬ ಮತದಾರರ ಸಹಿ/ಹೆಬ್ಬೆಟ್ಟು ಗುರುತು ಪಡೆಯುವ ವಹಿ.' }, category: 'Booth' },
  { id: 'g14', term: { en: 'Form 26', kn: 'ನಮೂನೆ 26 (ಅಫಿಡವಿಟ್)' }, definition: { en: 'Sworn affidavit submitted by candidates declaring assets, liabilities, education, and criminal cases.', kn: 'ಅಭ್ಯರ್ಥಿಗಳು ಆಸ್ತಿ, ಶಿಕ್ಷಣ ಮತ್ತು ಕ್ರಿಮಿನಲ್ ಪ್ರಕರಣಗಳನ್ನು ಘೋಷಿಸುವ ಪ್ರಮಾಣಪತ್ರ.' }, category: 'Candidates' },
  { id: 'g15', term: { en: 'MCC', kn: 'ಮಾದರಿ ನೀತಿ ಸಂಹಿತೆ (MCC)' }, definition: { en: 'Model Code of Conduct enforced from schedule announcement until election completion.', kn: 'ವೇಳಾಪಟ್ಟಿ ಘೋಷಣೆಯಿಂದ ಚುನಾವಣೆ ಮುಗಿಯುವವರೆಗೆ ಜಾರಿಯಾಗುವ ನ್ಯಾಯಸಮ್ಮತ ನೀತಿ ನಿಯಮ.' }, category: 'Rules' },
  { id: 'g16', term: { en: 'Silence Period', kn: 'ಮೌನ ಅವಧಿ (48 ಗಂಟೆ)' }, definition: { en: '48-hour period ending with the conclusion of polling during which public campaigning is banned.', kn: 'ಮತದಾನ ಅಂತ್ಯಕ್ಕೆ 48 ಗಂಟೆ ಮೊದಲು ಪ್ರಚಾರ ನಿಷೇಧಿಸುವ ಶಾಂತ ಅವಧಿ.' }, category: 'Rules' },
  { id: 'g17', term: { en: 'Qualifying Date', kn: 'ಅರ್ಹತಾ ದಿನಾಂಕ' }, definition: { en: 'Jan 1, Apr 1, Jul 1, or Oct 1 on which an applicant must be 18+ to be enrolled.', kn: '18 ವರ್ಷ ಪೂರ್ಣಗೊಳ್ಳಲು ನಿಗದಿತ ನಾಲ್ಕು ವಾರ್ಷಿಕ ದಿನಾಂಕಗಳು (ಜನ 1, ಏಪ್ರಿ 1, ಜುಲೈ 1, ಅಕ್ಟೋ 1).' }, category: 'Eligibility' },
  { id: 'g18', term: { en: 'Electoral Roll', kn: 'ಮತದಾರರ ಪಟ್ಟಿ' }, definition: { en: 'Official constituency- and booth-wise list of registered voters eligible to vote.', kn: 'ಮತದಾನಕ್ಕೆ ಅರ್ಹರಾದ ನೋಂದಾಯಿತ ಮತದಾರರ ಅಧಿಕೃತ ಬೂತ್‌ವಾರು ಪಟ್ಟಿ.' }, category: 'Eligibility' },
  { id: 'g19', term: { en: 'BLO', kn: 'BLO (ಬೂತ್ ಮಟ್ಟದ ಅಧಿಕಾರಿ)' }, definition: { en: 'Booth Level Officer responsible for field verification and helping residents with roll updates.', kn: 'ಬೂತ್ ಮಟ್ಟದಲ್ಲಿ ಮನೆಮನೆ ಪರಿಶೀಲನೆ ನಡೆಸುವ ಸ್ಥಳೀಯ ಸರ್ಕಾರಿ ಅಧಿಕಾರಿ.' }, category: 'Officials' },
  { id: 'g20', term: { en: 'ERO', kn: 'ERO (ಮತದಾರರ ನೋಂದಣಾಧಿಕಾರಿ)' }, definition: { en: 'Electoral Registration Officer who prepares and revises the constituency electoral roll.', kn: 'ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರದ ಮತದಾರರ ಪಟ್ಟಿ ಸಿದ್ಧಪಡಿಸುವ ಮತ್ತು ತಿದ್ದುವ ಅಧಿಕಾರಿ.' }, category: 'Officials' },
  { id: 'g21', term: { en: 'Returning Officer (RO)', kn: 'ಚುನಾವಣಾಧಿಕಾರಿ (RO)' }, definition: { en: 'Statutory officer conducting nominations, scrutiny, poll logistics, counting, and result declaration.', kn: 'ನಾಮಪತ್ರ ಸ್ವೀಕಾರದಿಂದ ಫಲಿತಾಂಶ ಘೋಷಣೆಯವರೆಗೆ ಕ್ಷೇತ್ರದ ಚುನಾವಣೆ ನಡೆಸುವ ಅಧಿಕಾರಿ.' }, category: 'Officials' },
  { id: 'g22', term: { en: 'Presiding Officer', kn: 'ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿ' }, definition: { en: 'Head of a polling station responsible for fair conduct, mock poll, and sealing machines.', kn: 'ಮತಗಟ್ಟೆಯ ಮುಖ್ಯಸ್ಥರು; ಶಾಂತಿಯುತ ಮತದಾನ ಮತ್ತು ಯಂತ್ರ ಸೀಲಿಂಗ್ ಜವಾಬ್ದಾರಿ.' }, category: 'Officials' },
  { id: 'g23', term: { en: 'Polling Agent', kn: 'ಮತಗಟ್ಟೆ ಏಜೆಂಟ್' }, definition: { en: 'Candidate-appointed representative observing mock poll, voter identification, and EVM sealing inside the booth.', kn: 'ಮತಗಟ್ಟೆಯಲ್ಲಿ ಪಾರದರ್ಶಕತೆ ಗಮನಿಸಲು ಅಭ್ಯರ್ಥಿಗಳು ನೇಮಿಸುವ ಪ್ರತಿನಿಧಿ.' }, category: 'Booth' },
  { id: 'g24', term: { en: 'Indelible Ink', kn: 'ಅಳಿಸಲಾಗದ ಶಾಯಿ' }, definition: { en: 'Silver-nitrate ink applied on the left forefinger to prevent double voting.', kn: 'ಎರಡು ಬಾರಿ ಮತ ಹಾಕುವುದನ್ನು ತಡೆಯಲು ಎಡ ತೋರುಬೆರಳಿಗೆ ಹಚ್ಚುವ ವಿಶೇಷ ಶಾಯಿ.' }, category: 'Booth' },
  { id: 'g25', term: { en: 'Tendered Vote', kn: 'ಟೆಂಡರ್ ಮತ' }, definition: { en: 'Paper ballot vote cast under Rule 49P when an imposter has already voted in a voter’s name.', kn: 'ತಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಬೇರೆಯವರು ಈಗಾಗಲೇ ಮತ ಹಾಕಿದ್ದಾಗ ನೈಜ ಮತದಾರರು ಕಾಗದದ ಮೂಲಕ ಹಾಕುವ ಮತ.' }, category: 'Booth' },
  { id: 'g26', term: { en: 'Challenged Vote', kn: 'ಚಾಲೆಂಜ್ ಮತ' }, definition: { en: 'Formal challenge by a polling agent questioning a voter’s identity before the Presiding Officer.', kn: 'ಮತದಾರರ ಗುರುತಿನ ಬಗ್ಗೆ ಏಜೆಂಟರು ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿಗೆ ಸಲ್ಲಿಸುವ ಅಧಿಕೃತ ಆಕ್ಷೇಪಣೆ.' }, category: 'Booth' },
  { id: 'g27', term: { en: 'Mock Poll', kn: 'ಅಣಕು ಮತದಾನ' }, definition: { en: 'Mandatory pre-poll test of 50+ votes in front of agents before actual voting opens.', kn: 'ನಿಜವಾದ ಮತದಾನಕ್ಕೂ ಮುನ್ನ ಏಜೆಂಟರ ಮುಂದೆ ಕನಿಷ್ಠ 50 ಮತಗಳೊಂದಿಗೆ ನಡೆಸುವ ಯಂತ್ರ ಪರೀಕ್ಷೆ.' }, category: 'Booth' },
  { id: 'g28', term: { en: 'Strong Room', kn: 'ಸ್ಟ್ರಾಂಗ್ ರೂಮ್' }, definition: { en: 'Guarded, double-locked room storing sealed EVMs/VVPATs between poll close and counting day.', kn: 'ಮತದಾನ ಮತ್ತು ಎಣಿಕೆಯ ನಡುವೆ ಸೀಲ್ ಮಾಡಿದ EVM ಗಳನ್ನು ಭದ್ರವಾಗಿಡುವ ಕೊಠಡಿ.' }, category: 'Counting' },
  { id: 'g29', term: { en: 'ETPBS', kn: 'ETPBS (ವಿದ್ಯುನ್ಮಾನ ಅಂಚೆ ಮತ)' }, definition: { en: 'Electronically Transmitted Postal Ballot System used for service voters.', kn: 'ಸೇವಾ ಮತದಾರರಿಗೆ ವಿದ್ಯುನ್ಮಾನವಾಗಿ ಅಂಚೆ ಮತಪತ್ರ ಕಳುಹಿಸುವ ವ್ಯವಸ್ಥೆ.' }, category: 'Counting' },
  { id: 'g30', term: { en: 'First-Past-the-Post', kn: 'ಅತಿ ಹೆಚ್ಚು ಮತ ವಿಧಾನ (FPTP)' }, definition: { en: 'Electoral system where the candidate with the most valid votes wins, even without an absolute 50%+ majority.', kn: '50%ಕ್ಕಿಂತ ಹೆಚ್ಚು ಬೇಕಿಲ್ಲದೆ, ಸ್ಪರ್ಧಿಗಳಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಮತ ಪಡೆದವರು ಗೆಲ್ಲುವ ಪದ್ಧತಿ.' }, category: 'Counting' },
  { id: 'g31', term: { en: 'cVIGIL', kn: 'cVIGIL ಆ್ಯಪ್' }, definition: { en: 'ECI smartphone app enabling citizens to submit time- and geo-stamped MCC violation reports.', kn: 'ನೀತಿ ಸಂಹಿತೆ ಉಲ್ಲಂಘನೆಗಳನ್ನು ಜಿಯೋ-ಟ್ಯಾಗ್ ಮೂಲಕ ವರದಿ ಮಾಡುವ ನಾಗರಿಕ ಆ್ಯಪ್.' }, category: 'Tools' },
  { id: 'g32', term: { en: 'Vidhana Sabha', kn: 'ವಿಧಾನ ಸಭೆ (ಕರ್ನಾಟಕ)' }, definition: { en: 'Karnataka’s Lower House Legislative Assembly consisting of 224 elected constituency seats.', kn: 'ಕರ್ನಾಟಕದ 224 ಚುನಾಯಿತ ಕ್ಷೇತ್ರಗಳನ್ನು ಒಳಗೊಂಡ ವಿಧಾನಸಭೆ.' }, category: 'Karnataka' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: { en: 'How many elected Assembly (Vidhana Sabha) constituencies are in Karnataka?', kn: 'ಕರ್ನಾಟಕ ವಿಧಾನಸಭೆಯಲ್ಲಿ ಎಷ್ಟು ಚುನಾಯಿತ ಕ್ಷೇತ್ರಗಳಿವೆ?' },
    options: { en: ['180', '224', '250', '288'], kn: ['180', '224', '250', '288'] },
    correctIndex: 1,
    hint: { en: 'The majority mark is 113 seats (half of 224 plus one).', kn: 'ಬಹುಮತದ ಗಡಿ 113 ಸ್ಥಾನಗಳು.' },
    explanation: { en: 'Karnataka’s Legislative Assembly has 224 elected constituencies (and 28 Lok Sabha seats).', kn: 'ಕರ್ನಾಟಕ ವಿಧಾನಸಭೆಯಲ್ಲಿ 224 ಚುನಾಯಿತ ಸ್ಥಾನಗಳಿವೆ (ಲೋಕಸಭೆ 28).' },
  },
  {
    id: 'q2',
    question: { en: 'Which form should you submit to register as a new voter?', kn: 'ಹೊಸ ಮತದಾರರಾಗಿ ನೋಂದಾಯಿಸಲು ಯಾವ ನಮೂನೆ (Form) ಸಲ್ಲಿಸಬೇಕು?' },
    options: { en: ['Form 6', 'Form 7', 'Form 8', 'Form 17A'], kn: ['ನಮೂನೆ 6', 'ನಮೂನೆ 7', 'ನಮೂನೆ 8', 'ನಮೂನೆ 17A'] },
    correctIndex: 0,
    hint: { en: 'Forms 7 and 8 are for deletions and corrections/shifting.', kn: 'ನಮೂನೆ 7 ಅಳಿಸಲು ಮತ್ತು ನಮೂನೆ 8 ತಿದ್ದುಪಡಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ.' },
    explanation: { en: 'Form 6 is used for new voter enrollment on voters.eci.gov.in or via the Voter Helpline App.', kn: 'ಹೊಸ ನೋಂದಣಿಗಾಗಿ ನಮೂನೆ 6 (Form 6) ಸಲ್ಲಿಸಬೇಕು.' },
  },
  {
    id: 'q3',
    question: { en: 'How many qualifying dates exist each year to turn 18 and enrol?', kn: '18 ವರ್ಷ ತುಂಬಿ ನೋಂದಾಯಿಸಲು ವರ್ಷದಲ್ಲಿ ಎಷ್ಟು ಅರ್ಹತಾ ದಿನಾಂಕಗಳಿವೆ?' },
    options: { en: ['One (Jan 1)', 'Two (Jan 1 & Jul 1)', 'Four (Jan 1, Apr 1, Jul 1, Oct 1)', 'Twelve (every month)'], kn: ['ಒಂದು (ಜನ 1)', 'ಎರಡು (ಜನ 1 & ಜುಲೈ 1)', 'ನಾಲ್ಕು (ಜನ 1, ಏಪ್ರಿ 1, ಜುಲೈ 1, ಅಕ್ಟೋ 1)', 'ಹನ್ನೆರಡು'] },
    correctIndex: 2,
    hint: { en: 'One at the start of every calendar quarter.', kn: 'ಪ್ರತಿ ತ್ರೈಮಾಸಿಕದ ಮೊದಲ ದಿನಾಂಕ.' },
    explanation: { en: 'ECI provides four qualifying dates—Jan 1, Apr 1, Jul 1, and Oct 1—and 17+ youth can apply in advance.', kn: 'ಜನವರಿ 1, ಏಪ್ರಿಲ್ 1, ಜುಲೈ 1 ಮತ್ತು ಅಕ್ಟೋಬರ್ 1 ಎಂಬ 4 ಅರ್ಹತಾ ದಿನಾಂಕಗಳಿವೆ.' },
  },
  {
    id: 'q4',
    question: { en: 'If you moved to a different constituency in Karnataka, which form transfers your vote?', kn: 'ನೀವು ಬೇರೆ ಕ್ಷೇತ್ರಕ್ಕೆ ಸ್ಥಳಾಂತರವಾದರೆ ಯಾವ ನಮೂನೆ ಬಳಸಬೇಕು?' },
    options: { en: ['Form 6 (fresh registration)', 'Form 8 (Shifting of Residence)', 'Form 12D', 'Form 26'], kn: ['ನಮೂನೆ 6', 'ನಮೂನೆ 8 (ವಿಳಾಸ ಸ್ಥಳಾಂತರ)', 'ನಮೂನೆ 12D', 'ನಮೂನೆ 26'] },
    correctIndex: 1,
    hint: { en: 'Avoid duplicate registrations by using the unified correction/shift form.', kn: 'ತಿದ್ದುಪಡಿ ಮತ್ತು ಸ್ಥಳಾಂತರಕ್ಕೆ ಒಂದೇ ಏಕೀಕೃತ ಫಾರ್ಮ್ ಇದೆ.' },
    explanation: { en: 'Form 8 handles residence shifting, corrections, and replacement EPIC without creating duplicate entries.', kn: 'ವಿಳಾಸ ಬದಲಾವಣೆ ಮತ್ತು ತಿದ್ದುಪಡಿಗೆ ನಮೂನೆ 8 (Form 8) ಬಳಸಬೇಕು.' },
  },
  {
    id: 'q5',
    question: { en: 'How long is the campaign “Silence Period” before polling concludes?', kn: 'ಮತದಾನ ಮುಗಿಯುವ ಮುನ್ನ ಪ್ರಚಾರ ನಿಷೇಧದ “ಮೌನ ಅವಧಿ” ಎಷ್ಟು ಗಂಟೆಗಳಿರುತ್ತದೆ?' },
    options: { en: ['12 hours', '24 hours', '48 hours', '72 hours'], kn: ['12 ಗಂಟೆ', '24 ಗಂಟೆ', '48 ಗಂಟೆ', '72 ಗಂಟೆ'] },
    correctIndex: 2,
    hint: { en: 'Equivalent to two full days before the close of poll.', kn: 'ಮತದಾನ ಮುಗಿಯುವ ಮುನ್ನ ಎರಡು ಪೂರ್ಣ ದಿನಗಳು.' },
    explanation: { en: 'Under RPA 1951 Sec 126, public meetings and media campaigns stop 48 hours before poll close.', kn: 'RPA 1951 ಸೆಕ್ಷನ್ 126ರ ಅಡಿಯಲ್ಲಿ 48 ಗಂಟೆಗಳ ಮೌನ ಅವಧಿ ಇರುತ್ತದೆ.' },
  },
  {
    id: 'q6',
    question: { en: 'Which option always appears LAST on an Indian EVM Ballot Unit?', kn: 'ಭಾರತೀಯ EVM ಬ್ಯಾಲೆಟ್ ಯೂನಿಟ್‌ನಲ್ಲಿ ಯಾವ ಆಯ್ಕೆ ಯಾವಾಗಲೂ ಕೊನೆಯಲ್ಲಿರುತ್ತದೆ?' },
    options: { en: ['Youngest candidate', 'Independent candidate', 'NOTA (None of the Above)', 'State party'], kn: ['ಕಿರಿಯ ಅಭ್ಯರ್ಥಿ', 'ಪಕ್ಷೇತರ ಅಭ್ಯರ್ಥಿ', 'NOTA (ಮೇಲಿನವರಲ್ಲಿ ಯಾರೂ ಅಲ್ಲ)', 'ರಾಜ್ಯ ಪಕ್ಷ'] },
    correctIndex: 2,
    hint: { en: 'Ordered National → State → Regd.-Unrecognised → Independent → ?', kn: 'ರಾಷ್ಟ್ರೀಯ → ರಾಜ್ಯ → ನೋಂದಾಯಿತ → ಪಕ್ಷೇತರ → ?' },
    explanation: { en: 'ECI rules mandate National, State, Regd.-Unrecognised, Independents (alphabetical in each), and NOTA always last.', kn: 'NOTA ಯಾವಾಗಲೂ ಮತಪತ್ರದ ಕೊನೆಯ ಆಯ್ಕೆಯಾಗಿರುತ್ತದೆ.' },
  },
  {
    id: 'q7',
    question: { en: 'For how many seconds is the VVPAT paper slip visible behind the glass window?', kn: 'VVPAT ಗಾಜಿನ ಕಿಟಕಿಯಲ್ಲಿ ಕಾಗದದ ಚೀಟಿ ಎಷ್ಟು ಸೆಕೆಂಡ್‌ಗಳ ಕಾಲ ಕಾಣಿಸುತ್ತದೆ?' },
    options: { en: ['3 seconds', '5 seconds', '7 seconds', '15 seconds'], kn: ['3 ಸೆಕೆಂಡ್', '5 ಸೆಕೆಂಡ್', '7 ಸೆಕೆಂಡ್', '15 ಸೆಕೆಂಡ್'] },
    correctIndex: 2,
    hint: { en: 'Roughly the duration of a slow breath after the EVM beep.', kn: 'EVM ಬೀಪ್ ಶಬ್ದದ ನಂತರ 7 ಎಣಿಕೆಗಳ ಕಾಲ.' },
    explanation: { en: 'The VVPAT slip stays visible for 7 seconds before being cut and dropped into the sealed compartment.', kn: 'ಚೀಟಿಯು 7 ಸೆಕೆಂಡ್ ಕಾಣಿಸಿ ನಂತರ ಕತ್ತರಿಸಲ್ಪಟ್ಟು ಸೀಲ್ ಮಾಡಿದ ಪೆಟ್ಟಿಗೆಗೆ ಬೀಳುತ್ತದೆ.' },
  },
  {
    id: 'q8',
    question: { en: 'What is printed on a real VVPAT paper slip?', kn: 'ನಿಜವಾದ VVPAT ಚೀಟಿಯಲ್ಲಿ ಏನು ಮುದ್ರಣವಾಗಿರುತ್ತದೆ?' },
    options: { en: ['Voter EPIC number & time', 'Serial No., Candidate Name & Party Symbol', 'Candidate photo & signature', 'Booth address only'], kn: ['ಮತದಾರರ EPIC ಸಂಖ್ಯೆ', 'ಕ್ರಮಸಂಖ್ಯೆ, ಅಭ್ಯರ್ಥಿ ಹೆಸರು ಮತ್ತು ಪಕ್ಷದ ಚಿಹ್ನೆ', 'ಅಭ್ಯರ್ಥಿಯ ಫೋಟೋ', 'ಮತಗಟ್ಟೆ ವಿಳಾಸ'] },
    correctIndex: 1,
    hint: { en: 'Real VVPAT slips do NOT print a candidate photo or any voter ID.', kn: 'ನಿಜವಾದ VVPAT ಚೀಟಿಯಲ್ಲಿ ಫೋಟೋ ಅಥವಾ ಮತದಾರರ ಗುರುತು ಇರುವುದಿಲ್ಲ.' },
    explanation: { en: 'Real VVPAT slips contain only serial number, candidate name, and party symbol—never a photo or voter identity.', kn: 'ಕ್ರಮಸಂಖ್ಯೆ, ಅಭ್ಯರ್ಥಿಯ ಹೆಸರು ಮತ್ತು ಪಕ್ಷದ ಚಿಹ್ನೆ ಮಾತ್ರ ಮುದ್ರಣವಾಗಿರುತ್ತದೆ.' },
  },
  {
    id: 'q9',
    question: { en: 'Which polling booth register records every voter’s signature/thumbprint?', kn: 'ಮತಗಟ್ಟೆಯಲ್ಲಿ ಪ್ರತಿಯೊಬ್ಬ ಮತದಾರರ ಸಹಿಯನ್ನು ಯಾವ ವಹಿಯಲ್ಲಿ ಪಡೆಯಲಾಗುತ್ತದೆ?' },
    options: { en: ['Form 6', 'Form 17A', 'Form 20', 'Form 26'], kn: ['ನಮೂನೆ 6', 'ನಮೂನೆ 17A', 'ನಮೂನೆ 20', 'ನಮೂನೆ 26'] },
    correctIndex: 1,
    hint: { en: 'Maintained by Polling Officer 2 right after applying indelible ink.', kn: 'ಎರಡನೇ ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿ ಶಾಯಿ ಹಚ್ಚಿದ ನಂತರ ನಿರ್ವಹಿಸುವ ವಹಿ.' },
    explanation: { en: 'Form 17A (Register of Voters) is maintained by Polling Officer 2, separate from the anonymous EVM counts.', kn: 'ಫಾರ್ಮ್ 17A ಮತದಾರರ ವಹಿಯನ್ನು ಎರಡನೇ ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿ ನಿರ್ವಹಿಸುತ್ತಾರೆ.' },
  },
  {
    id: 'q10',
    question: { en: 'Which official app lets citizens report Model Code of Conduct violations?', kn: 'ನೀತಿ ಸಂಹಿತೆ ಉಲ್ಲಂಘನೆಯನ್ನು ನಾಗರಿಕರು ಯಾವ ಆ್ಯಪ್ ಮೂಲಕ ವರದಿ ಮಾಡಬಹುದು?' },
    options: { en: ['KYC App', 'cVIGIL App', 'ETPBS', 'Form 22'], kn: ['KYC ಆ್ಯಪ್', 'cVIGIL ಆ್ಯಪ್', 'ETPBS', 'ನಮೂನೆ 22'] },
    correctIndex: 1,
    hint: { en: 'Stands for Citizens’ Vigilance.', kn: 'ನಾಗರಿಕರ ಜಾಗರೂಕತೆ (Citizens’ Vigilance).' },
    explanation: { en: 'cVIGIL lets voters submit live geo-tagged photos/videos of MCC violations to election flying squads.', kn: 'cVIGIL ಆ್ಯಪ್ ಮೂಲಕ ನಾಗರಿಕರು ಜಿಯೋ-ಟ್ಯಾಗ್ ದೂರುಗಳನ್ನು ಸಲ್ಲಿಸಬಹುದು.' },
  },
  {
    id: 'q11',
    question: { en: 'Which ballots are counted FIRST on counting day (starting 8:00 AM)?', kn: 'ಮತ ಎಣಿಕೆಯ ದಿನ ಬೆಳಿಗ್ಗೆ 8 ಗಂಟೆಗೆ ಮೊದಲು ಯಾವ ಮತಗಳನ್ನು ಎಣಿಸಲಾಗುತ್ತದೆ?' },
    options: { en: ['VVPAT slips', 'Postal & ETPBS ballots', 'NOTA votes', 'Tendered votes'], kn: ['VVPAT ಚೀಟಿಗಳು', 'ಅಂಚೆ ಮತ್ತು ETPBS ಮತಗಳು', 'NOTA ಮತಗಳು', 'ಟೆಂಡರ್ ಮತಗಳು'] },
    correctIndex: 1,
    hint: { en: 'Used by service voters and eligible absentee voters.', kn: 'ಸೇವಾ ಮತದಾರರು ಮತ್ತು ಅಂಚೆ ಮತದಾರರು ಬಳಸುವ ಮತಗಳು.' },
    explanation: { en: 'Postal and ETPBS ballots are opened first at 8:00 AM, followed by EVM Control Unit rounds.', kn: 'ಮೊದಲು ಅಂಚೆ ಮತ್ತು ETPBS ಮತಗಳನ್ನು ಎಣಿಸಿ ನಂತರ EVM ಸುತ್ತುಗಳನ್ನು ಆರಂಭಿಸಲಾಗುತ್ತದೆ.' },
  },
  {
    id: 'q12',
    question: { en: 'What is the toll-free ECI Voter Helpline number across India?', kn: 'ಭಾರತದಾದ್ಯಂತ ಉಚಿತ ECI ಮತದಾರರ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ ಯಾವುದು?' },
    options: { en: ['108', '112', '1950', '1947'], kn: ['108', '112', '1950', '1947'] },
    correctIndex: 2,
    hint: { en: 'Matches the year India became a Republic & enacted the Representation of the People Act 1950.', kn: 'ಭಾರತ ಗಣರಾಜ್ಯವಾದ ವರ್ಷದ ಸಂಖ್ಯೆ (1950).' },
    explanation: { en: '1950 is the dedicated toll-free Voter Helpline number.', kn: '1950 ಮತದಾರರ ಉಚಿತ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಯಾಗಿದೆ.' },
  },
  {
    id: 'q13',
    question: { en: 'What protects a genuine voter if an imposter has already voted in their name?', kn: 'ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಬೇರೆಯವರು ಈಗಾಗಲೇ ಮತ ಹಾಕಿದ್ದರೆ ಯಾವ ವ್ಯವಸ್ಥೆ ರಕ್ಷಿಸುತ್ತದೆ?' },
    options: { en: ['Re-voting on EVM', 'Tendered Vote (paper ballot)', 'Form 6A', 'Silence period'], kn: ['EVM ನಲ್ಲಿ ಮರು ಮತದಾನ', 'ಟೆಂಡರ್ ಮತ (ಕಾಗದದ ಬ್ಯಾಲೆಟ್)', 'ನಮೂನೆ 6A', 'ಮೌನ ಅವಧಿ'] },
    correctIndex: 1,
    hint: { en: 'Cast on a paper ballot (Form 17B) after identity verification with the Presiding Officer.', kn: 'ಪ್ರಿಸೈಡಿಂಗ್ ಅಧಿಕಾರಿಗೆ ಗುರುತು ಸಾಬೀತುಪಡಿಸಿ ಕಾಗದದಲ್ಲಿ ಹಾಕುವ ಮತ.' },
    explanation: { en: 'Rule 49P allows a verified voter to cast a Tendered Vote on a paper ballot kept in a separate cover.', kn: 'ನಿಯಮ 49P ಅಡಿಯಲ್ಲಿ ಟೆಂಡರ್ ಮತ (ಕಾಗದದ ಬ್ಯಾಲೆಟ್) ಚಲಾಯಿಸಬಹುದು.' },
  },
  {
    id: 'q14',
    question: { en: 'Where can you inspect a candidate’s declared assets and criminal cases?', kn: 'ಅಭ್ಯರ್ಥಿಗಳ ಆಸ್ತಿ ಮತ್ತು ಕ್ರಿಮಿನಲ್ ಪ್ರಕರಣಗಳ ವಿವರವನ್ನು ಎಲ್ಲಿ ನೋಡಬಹುದು?' },
    options: { en: ['On the VVPAT slip', 'In the Know Your Candidate (KYC) app / Form 26', 'Inside Form 17A', 'On the indelible ink bottle'], kn: ['VVPAT ಚೀಟಿಯಲ್ಲಿ', 'KYC ಆ್ಯಪ್ / ಫಾರ್ಮ್ 26 ಅಫಿಡವಿಟ್‌ನಲ್ಲಿ', 'ಫಾರ್ಮ್ 17A ನಲ್ಲಿ', 'ಶಾಯಿ ಬಾಟಲಿಯಲ್ಲಿ'] },
    correctIndex: 1,
    hint: { en: 'Sworn affidavits filed during nomination are published by ECI.', kn: 'ನಾಮಪತ್ರದೊಂದಿಗೆ ಸಲ್ಲಿಸುವ ಫಾರ್ಮ್ 26 ಅಫಿಡವಿಟ್.' },
    explanation: { en: 'All Form 26 affidavits are public on ECI’s Affidavit Portal and the Know Your Candidate (KYC) app.', kn: 'KYC ಆ್ಯಪ್ ಮತ್ತು ECI ತಾಣದಲ್ಲಿ ಅಭ್ಯರ್ಥಿಗಳ ಫಾರ್ಮ್ 26 ಅಫಿಡವಿಟ್ ಲಭ್ಯವಿದೆ.' },
  },
  {
    id: 'q15',
    question: { en: 'Who verifies voter addresses door-to-door for 1–2 local polling booths?', kn: 'ಸ್ಥಳೀಯ 1-2 ಮತಗಟ್ಟೆಗಳ ಮತದಾರರ ವಿಳಾಸವನ್ನು ಮನೆಮನೆಗೆ ಭೇಟಿ ನೀಡಿ ಯಾರು ಪರಿಶೀಲಿಸುತ್ತಾರೆ?' },
    options: { en: ['Returning Officer (RO)', 'Booth Level Officer (BLO)', 'Chief Electoral Officer (CEO)', 'Counting Supervisor'], kn: ['ಚುನಾವಣಾಧಿಕಾರಿ (RO)', 'ಬೂತ್ ಮಟ್ಟದ ಅಧಿಕಾರಿ (BLO)', 'ಮುಖ್ಯ ಚುನಾವಣಾಧಿಕಾರಿ (CEO)', 'ಎಣಿಕೆ ಮೇಲ್ವಿಚಾರಕ'] },
    correctIndex: 1,
    hint: { en: 'Your grassroots contact person at the booth level.', kn: 'ಬೂತ್ ಮಟ್ಟದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಸ್ಥಳೀಯ ಅಧಿಕಾರಿ.' },
    explanation: { en: 'The Booth Level Officer (BLO) conducts door-to-door roll verification and assists local voters.', kn: 'BLO (ಬೂತ್ ಮಟ್ಟದ ಅಧಿಕಾರಿ) ಮನೆಮನೆಗೆ ಭೇಟಿ ನೀಡಿ ಪಟ್ಟಿ ಪರಿಶೀಲನೆ ಮಾಡುತ್ತಾರೆ.' },
  },
];

export function answerOfflineFaq(query: string, lang: 'en' | 'kn'): string {
  const q = query.toLowerCase();
  const isKn = lang === 'kn';

  if (q.includes('form 6') || q.includes('register') || q.includes('new voter') || q.includes('18') || q.includes('ನೋಂದಣಿ')) {
    return isKn
      ? 'ಹೊಸ ಮತದಾರರ ನೋಂದಣಿಗೆ voters.eci.gov.in ಅಥವಾ ವೋಟರ್ ಹೆಲ್ಪ್‌ಲೈನ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ಫಾರ್ಮ್ 6 ಸಲ್ಲಿಸಿ. 4 ಅರ್ಹತಾ ದಿನಾಂಕಗಳು: ಜನ 1, ಏಪ್ರಿ 1, ಜುಲೈ 1, ಅಕ್ಟೋ 1 (17+ ಮುಂಗಡ ಅರ್ಜಿ ಲಭ್ಯ). ಅಧಿಕೃತ ವಿವರಗಳಿಗೆ eci.gov.in ಪರಿಶೀಲಿಸಿ.'
      : 'To register as a new voter, submit Form 6 on voters.eci.gov.in or the Voter Helpline App. India has four qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1) and 17+ citizens can apply in advance. Verify latest details on eci.gov.in.';
  }
  if (q.includes('shift') || q.includes('address') || q.includes('correct') || q.includes('form 8') || q.includes('ವಿಳಾಸ')) {
    return isKn
      ? 'ವಿಳಾಸ ಬದಲಾವಣೆ, ತಿದ್ದುಪಡಿ ಅಥವಾ ಹಾನಿಗೊಳಗಾದ EPIC ಬದಲಿಸಲು ಫಾರ್ಮ್ 8 ಬಳಸಿ (ಹೊಸ ಫಾರ್ಮ್ 6 ಹಾಕಬೇಡಿ). voters.eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.'
      : 'Use Form 8 on voters.eci.gov.in to shift your address, correct spelling/details, or request a replacement EPIC. Do not submit a duplicate Form 6.';
  }
  if (q.includes('vvpat') || q.includes('7 second') || q.includes('slip') || q.includes('photo') || q.includes('ಚೀಟಿ')) {
    return isKn
      ? 'ಮತ ಒತ್ತಿದ ನಂತರ VVPAT ಕಿಟಕಿಯಲ್ಲಿ 7 ಸೆಕೆಂಡ್‌ಗಳ ಕಾಲ ಕ್ರಮಸಂಖ್ಯೆ, ಅಭ್ಯರ್ಥಿ ಹೆಸರು ಮತ್ತು ಚಿಹ್ನೆ ಕಾಣಿಸುತ್ತದೆ (ಫೋಟೋ ಇರುವುದಿಲ್ಲ). ನಂತರ ಅದು ಸೀಲ್ ಮಾಡಿದ ಪೆಟ್ಟಿಗೆಗೆ ಬೀಳುತ್ತದೆ.'
      : 'After pressing the blue EVM button, a paper slip appears in the VVPAT window for 7 seconds showing only serial number, candidate name, and party symbol (no photo), then drops into the sealed box.';
  }
  if (q.includes('lost') || q.includes('epic') || q.includes('id') || q.includes('aadhaar') || q.includes('ಕಳೆದ')) {
    return isKn
      ? 'ನಿಮ್ಮ ಹೆಸರು ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ಇದ್ದರೆ, EPIC ಕಳೆದುಹೋಗಿದ್ದರೂ e-EPIC ಅಥವಾ ECI ಮಾನ್ಯ ಪರ್ಯಾಯ ಫೋಟೋ ID (ಆಧಾರ್, ಪಾಸ್‌ಪೋರ್ಟ್, ಡಿಎಲ್, ಪ್ಯಾನ್ ಇತ್ಯಾದಿ) ತೋರಿಸಿ ಮತ ಹಾಕಬಹುದು.'
      : 'As long as your name is in the electoral roll, you can vote with e-EPIC or any ECI-notified alternative photo ID (Passport, Driving Licence, Aadhaar, PAN, etc.). Verify current accepted IDs on eci.gov.in.';
  }
  if (q.includes('nota') || q.includes('last') || q.includes('order')) {
    return isKn
      ? 'NOTA (ಮೇಲಿನವರಲ್ಲಿ ಯಾರೂ ಅಲ್ಲ) ಯಾವಾಗಲೂ ಬ್ಯಾಲೆಟ್ ಯೂನಿಟ್‌ನ ಕೊನೆಯ ಆಯ್ಕೆಯಾಗಿರುತ್ತದೆ. ರಾಷ್ಟ್ರೀಯ → ರಾಜ್ಯ → ನೋಂದಾಯಿತ → ಪಕ್ಷೇತರರು → NOTA ಕ್ರಮವಿರುತ್ತದೆ.'
      : 'NOTA (None of the Above) is always placed last on the Ballot Unit after National, State, Registered-Unrecognised, and Independent candidates.';
  }
  if (q.includes('karnataka') || q.includes('224') || q.includes('seats') || q.includes('ಕರ್ನಾಟಕ')) {
    return isKn
      ? 'ಕರ್ನಾಟಕದಲ್ಲಿ 224 ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರಗಳು (ಬಹುಮತಕ್ಕೆ 113) ಮತ್ತು 28 ಲೋಕಸಭಾ ಕ್ಷೇತ್ರಗಳಿವೆ. ವಿವರಗಳನ್ನು ceo.karnataka.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.'
      : 'Karnataka has 224 Assembly (Vidhana Sabha) constituencies (majority mark 113) and 28 Lok Sabha seats. Verify official constituency maps on ceo.karnataka.gov.in.';
  }
  if (q.includes('silence') || q.includes('48') || q.includes('complain') || q.includes('cvigil') || q.includes('1950')) {
    return isKn
      ? 'ಮತದಾನ ಮುಗಿಯುವ 48 ಗಂಟೆ ಮೊದಲು ಬಹಿರಂಗ ಪ್ರಚಾರ ನಿಲ್ಲುತ್ತದೆ (ಮೌನ ಅವಧಿ). ಉಲ್ಲಂಘನೆಗಳಿದ್ದರೆ cVIGIL ಆ್ಯಪ್ ಅಥವಾ 1950ಕ್ಕೆ ದೂರು ನೀಡಿ.'
      : 'Public campaigning ends 48 hours before polling closes (Silence Period). Report violations via the cVIGIL app or call Voter Helpline 1950.';
  }

  return isKn
    ? 'ನನಗೆ ಈ ನಿರ್ದಿಷ್ಟ ಪ್ರಶ್ನೆಗೆ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ನಿಖರ ಮಾಹಿತಿ ಸಿಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು eci.gov.in, voters.eci.gov.in, ceo.karnataka.gov.in ನೋಡಿ ಅಥವಾ 1950ಕ್ಕೆ ಕರೆ ಮಾಡಿ.'
    : 'I could not find a specific offline match for that question. Please check official ECI sources at eci.gov.in, voters.eci.gov.in, ceo.karnataka.gov.in, or call Helpline 1950.';
}
