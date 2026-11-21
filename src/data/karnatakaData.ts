import type {
  Candidate,
  Constituency,
  District,
  Party,
  PartyCategory,
} from '../types/election';

export const PARTY_LIST_AS_OF = '2026-11-01';

export const KARNATAKA_DISTRICTS: District[] = [
  {
    id: 'blr-urban',
    name: 'Bengaluru Urban',
    nameKn: 'ಬೆಂಗಳೂರು ನಗರ',
    hq: 'Bengaluru',
    hqKn: 'ಬೆಂಗಳೂರು',
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    nameKn: 'ಮೈಸೂರು',
    hq: 'Mysuru',
    hqKn: 'ಮೈಸೂರು',
    lat: 12.2958,
    lng: 76.6394,
  },
  {
    id: 'dakshina-kannada',
    name: 'Dakshina Kannada',
    nameKn: 'ದಕ್ಷಿಣ ಕನ್ನಡ',
    hq: 'Mangaluru',
    hqKn: 'ಮಂಗಳೂರು',
    lat: 12.9141,
    lng: 74.856,
  },
  {
    id: 'dharwad',
    name: 'Dharwad',
    nameKn: 'ಧಾರವಾಡ',
    hq: 'Dharwad',
    hqKn: 'ಧಾರವಾಡ',
    lat: 15.3647,
    lng: 75.124,
  },
  {
    id: 'belagavi',
    name: 'Belagavi',
    nameKn: 'ಬೆಳಗಾವಿ',
    hq: 'Belagavi',
    hqKn: 'ಬೆಳಗಾವಿ',
    lat: 15.8497,
    lng: 74.4977,
  },
  {
    id: 'kalaburagi',
    name: 'Kalaburagi',
    nameKn: 'ಕಲಬುರಗಿ',
    hq: 'Kalaburagi',
    hqKn: 'ಕಲಬುರಗಿ',
    lat: 17.3297,
    lng: 76.8343,
  },
];

export const KARNATAKA_CONSTITUENCIES: Constituency[] = [
  // Bengaluru Urban
  {
    id: 'ac-173-jayanagar',
    name: 'Jayanagar',
    nameKn: 'ಜಯನಗರ',
    code: 'AC-173',
    districtId: 'blr-urban',
    reserved: 'General',
    lat: 12.9308,
    lng: 77.5838,
    booths: [
      {
        id: 'booth-173-01',
        boothNumber: 'Sample Booth 014',
        name: 'Govt. Model Primary School, 4th Block – Sample Booth 014',
        nameKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, 4ನೇ ಬ್ಲಾಕ್ – ಮಾದರಿ ಮತಗಟ್ಟೆ 014',
        area: 'Jayanagar 4th Block',
        areaKn: 'ಜಯನಗರ 4ನೇ ಬ್ಲಾಕ್',
        lat: 12.9296,
        lng: 77.5844,
        accessibility: { en: 'Sample ramp & ground-floor access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಮತ್ತು ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-173-02',
        boothNumber: 'Sample Booth 042',
        name: 'BBMP Civic Community Hall, Jayanagar – Sample Booth 042',
        nameKn: 'ಬಿಬಿಎಂಪಿ ಸಮುದಾಯ ಭವನ, ಜಯನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 042',
        area: 'Jayanagar 7th Block',
        areaKn: 'ಜಯನಗರ 7ನೇ ಬ್ಲಾಕ್',
        lat: 12.9234,
        lng: 77.5789,
        accessibility: { en: 'Sample wheelchair & Braille signposted', kn: 'ಮಾದರಿ ವೀಲ್‌ಚೇರ್ ಮತ್ತು ಬ್ರೈಲ್ ಸೂಚನೆ' },
      },
      {
        id: 'booth-173-03',
        boothNumber: 'Sample Booth 089',
        name: 'Govt. Pre-University College, Tilaknagar – Sample Booth 089',
        nameKn: 'ಸರ್ಕಾರಿ ಪದವಿ ಪೂರ್ವ ಕಾಲೇಜು, ತಿಲಕ್‌ನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 089',
        area: 'Tilaknagar',
        areaKn: 'ತಿಲಕ್‌ನಗರ',
        lat: 12.9288,
        lng: 77.5961,
        accessibility: { en: 'Sample drinking water & shaded queue', kn: 'ಮಾದರಿ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ನೆರಳಿನ ಸಾಲು' },
      },
    ],
  },
  {
    id: 'ac-157-malleshwaram',
    name: 'Malleshwaram',
    nameKn: 'ಮಲ್ಲೇಶ್ವರಂ',
    code: 'AC-157',
    districtId: 'blr-urban',
    reserved: 'General',
    lat: 13.0055,
    lng: 77.5692,
    booths: [
      {
        id: 'booth-157-01',
        boothNumber: 'Sample Booth 019',
        name: 'Govt. Girls High School, 13th Cross – Sample Booth 019',
        nameKn: 'ಸರ್ಕಾರಿ ಬಾಲಕಿಯರ ಪ್ರೌಢಶಾಲೆ, 13ನೇ ಕ್ರಾಸ್ – ಮಾದರಿ ಮತಗಟ್ಟೆ 019',
        area: 'Malleshwaram Central',
        areaKn: 'ಮಲ್ಲೇಶ್ವರಂ ಕೇಂದ್ರ',
        lat: 13.0041,
        lng: 77.5681,
        accessibility: { en: 'Sample ground-floor classroom', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಕೊಠಡಿ' },
      },
      {
        id: 'booth-157-02',
        boothNumber: 'Sample Booth 051',
        name: 'Civic Ward Office Annex, Subramanyanagar – Sample Booth 051',
        nameKn: 'ನಾಗರಿಕ ವಾರ್ಡ್ ಕಚೇರಿ, ಸುಬ್ರಹ್ಮಣ್ಯನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 051',
        area: 'Subramanyanagar',
        areaKn: 'ಸುಬ್ರಹ್ಮಣ್ಯನಗರ',
        lat: 13.0124,
        lng: 77.5582,
        accessibility: { en: 'Sample ramp & volunteer helpdesk', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಮತ್ತು ಸ್ವಯಂಸೇವಕ ಸಹಾಯ' },
      },
      {
        id: 'booth-157-03',
        boothNumber: 'Sample Booth 077',
        name: 'Govt. Higher Primary School, Yeshwanthpur – Sample Booth 077',
        nameKn: 'ಸರ್ಕಾರಿ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಯಶವಂತಪುರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 077',
        area: 'Yeshwanthpur East',
        areaKn: 'ಯಶವಂತಪುರ ಪೂರ್ವ',
        lat: 13.0196,
        lng: 77.5567,
        accessibility: { en: 'Sample priority queue for seniors', kn: 'ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಮಾದರಿ ಆದ್ಯತೆಯ ಸಾಲು' },
      },
    ],
  },
  {
    id: 'ac-176-bengaluru-south',
    name: 'Bengaluru South',
    nameKn: 'ಬೆಂಗಳೂರು ದಕ್ಷಿಣ',
    code: 'AC-176',
    districtId: 'blr-urban',
    reserved: 'General',
    lat: 12.8856,
    lng: 77.5955,
    booths: [
      {
        id: 'booth-176-01',
        boothNumber: 'Sample Booth 103',
        name: 'Govt. Higher Primary School, Konanakunte – Sample Booth 103',
        nameKn: 'ಸರ್ಕಾರಿ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಕೋಣನಕುಂಟೆ – ಮಾದರಿ ಮತಗಟ್ಟೆ 103',
        area: 'Konanakunte',
        areaKn: 'ಕೋಣನಕುಂಟೆ',
        lat: 12.8819,
        lng: 77.5681,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-176-02',
        boothNumber: 'Sample Booth 148',
        name: 'Panchayat Bhavan Wing B, Hulimavu – Sample Booth 148',
        nameKn: 'ಪಂಚಾಯತ್ ಭವನ ಬಿ ವಿಭಾಗ, ಹುಳಿಮಾವು – ಮಾದರಿ ಮತಗಟ್ಟೆ 148',
        area: 'Hulimavu',
        areaKn: 'ಹುಳಿಮಾವು',
        lat: 12.8774,
        lng: 77.6033,
        accessibility: { en: 'Sample ground floor & drinking water', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಮತ್ತು ಕುಡಿಯುವ ನೀರು' },
      },
      {
        id: 'booth-176-03',
        boothNumber: 'Sample Booth 211',
        name: 'Govt. High School, Begur – Sample Booth 211',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಬೇಗೂರು – ಮಾದರಿ ಮತಗಟ್ಟೆ 211',
        area: 'Begur',
        areaKn: 'ಬೇಗೂರು',
        lat: 12.8783,
        lng: 77.6249,
        accessibility: { en: 'Sample accessible entrance', kn: 'ಮಾದರಿ ಸುಗಮ ಪ್ರವೇಶ' },
      },
    ],
  },
  // Mysuru
  {
    id: 'ac-215-chamaraja',
    name: 'Chamaraja',
    nameKn: 'ಚಾಮರಾಜ',
    code: 'AC-215',
    districtId: 'mysuru',
    reserved: 'General',
    lat: 12.3133,
    lng: 76.6431,
    booths: [
      {
        id: 'booth-215-01',
        boothNumber: 'Sample Booth 012',
        name: 'Govt. Primary School, Gokulam – Sample Booth 012',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಗೋಕುಲಂ – ಮಾದರಿ ಮತಗಟ್ಟೆ 012',
        area: 'Gokulam 2nd Stage',
        areaKn: 'ಗೋಕುಲಂ 2ನೇ ಹಂತ',
        lat: 12.3278,
        lng: 76.6285,
        accessibility: { en: 'Sample ground-floor access', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-215-02',
        boothNumber: 'Sample Booth 037',
        name: 'Municipal Training Centre, V.V. Mohalla – Sample Booth 037',
        nameKn: 'ನಗರಪಾಲಿಕೆ ತರಬೇತಿ ಕೇಂದ್ರ, ವಿ.ವಿ. ಮೊಹಲ್ಲಾ – ಮಾದರಿ ಮತಗಟ್ಟೆ 037',
        area: 'V.V. Mohalla',
        areaKn: 'ವಿ.ವಿ. ಮೊಹಲ್ಲಾ',
        lat: 12.3204,
        lng: 76.6251,
        accessibility: { en: 'Sample wheelchair ramp', kn: 'ಮಾದರಿ ವೀಲ್‌ಚೇರ್ ರ‍್ಯಾಂಪ್' },
      },
      {
        id: 'booth-215-03',
        boothNumber: 'Sample Booth 064',
        name: 'Govt. High School, Metagalli – Sample Booth 064',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಮೇಟಗಳ್ಳಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 064',
        area: 'Metagalli',
        areaKn: 'ಮೇಟಗಳ್ಳಿ',
        lat: 12.3522,
        lng: 76.6319,
        accessibility: { en: 'Sample senior citizen priority desk', kn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಮಾದರಿ ಸಹಾಯ ಕೇಂದ್ರ' },
      },
    ],
  },
  {
    id: 'ac-216-krishnaraja',
    name: 'Krishnaraja',
    nameKn: 'ಕೃಷ್ಣರಾಜ',
    code: 'AC-216',
    districtId: 'mysuru',
    reserved: 'General',
    lat: 12.2901,
    lng: 76.6489,
    booths: [
      {
        id: 'booth-216-01',
        boothNumber: 'Sample Booth 021',
        name: 'Govt. Higher Primary School, Kuvempunagar – Sample Booth 021',
        nameKn: 'ಸರ್ಕಾರಿ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಕುವೆಂಪುನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 021',
        area: 'Kuvempunagar',
        areaKn: 'ಕುವೆಂಪುನಗರ',
        lat: 12.2881,
        lng: 76.6295,
        accessibility: { en: 'Sample ramp & wide doorway', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಮತ್ತು ಅಗಲ ದ್ವಾರ' },
      },
      {
        id: 'booth-216-02',
        boothNumber: 'Sample Booth 055',
        name: 'Civic Ward Hall, Vidyaranyapuram – Sample Booth 055',
        nameKn: 'ನಾಗರಿಕ ವಾರ್ಡ್ ಭವನ, ವಿದ್ಯಾರಣ್ಯಪುರಂ – ಮಾದರಿ ಮತಗಟ್ಟೆ 055',
        area: 'Vidyaranyapuram',
        areaKn: 'ವಿದ್ಯಾರಣ್ಯಪುರಂ',
        lat: 12.2839,
        lng: 76.6487,
        accessibility: { en: 'Sample shaded seating', kn: 'ಮಾದರಿ ನೆರಳಿನ ಆಸನ ವ್ಯವಸ್ಥೆ' },
      },
      {
        id: 'booth-216-03',
        boothNumber: 'Sample Booth 091',
        name: 'Govt. Model School, Agrahara – Sample Booth 091',
        nameKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಶಾಲೆ, ಅಗ್ರಹಾರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 091',
        area: 'Agrahara',
        areaKn: 'ಅಗ್ರಹಾರ',
        lat: 12.2974,
        lng: 76.6524,
        accessibility: { en: 'Sample ground-floor room', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಕೊಠಡಿ' },
      },
    ],
  },
  {
    id: 'ac-217-narasimharaja',
    name: 'Narasimharaja',
    nameKn: 'ನರಸಿಂಹರಾಜ',
    code: 'AC-217',
    districtId: 'mysuru',
    reserved: 'General',
    lat: 12.3237,
    lng: 76.6661,
    booths: [
      {
        id: 'booth-217-01',
        boothNumber: 'Sample Booth 008',
        name: 'Govt. Urdu & Kannada School, Mandi Mohalla – Sample Booth 008',
        nameKn: 'ಸರ್ಕಾರಿ ಉರ್ದು ಮತ್ತು ಕನ್ನಡ ಶಾಲೆ, ಮಂಡಿ ಮೊಹಲ್ಲಾ – ಮಾದರಿ ಮತಗಟ್ಟೆ 008',
        area: 'Mandi Mohalla',
        areaKn: 'ಮಂಡಿ ಮೊಹಲ್ಲಾ',
        lat: 12.3175,
        lng: 76.6542,
        accessibility: { en: 'Sample bilingual signage', kn: 'ಮಾದರಿ ದ್ವಿಭಾಷಾ ಸೂಚನಾ ಫಲಕ' },
      },
      {
        id: 'booth-217-02',
        boothNumber: 'Sample Booth 044',
        name: 'Civic Community Centre, N.R. Mohalla – Sample Booth 044',
        nameKn: 'ಸಮುದಾಯ ಕೇಂದ್ರ, ಎನ್.ಆರ್. ಮೊಹಲ್ಲಾ – ಮಾದರಿ ಮತಗಟ್ಟೆ 044',
        area: 'N.R. Mohalla',
        areaKn: 'ಎನ್.ಆರ್. ಮೊಹಲ್ಲಾ',
        lat: 12.3316,
        lng: 76.6637,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-217-03',
        boothNumber: 'Sample Booth 083',
        name: 'Govt. High School, Bannimantap – Sample Booth 083',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಬನ್ನಿಮಂಟಪ – ಮಾದರಿ ಮತಗಟ್ಟೆ 083',
        area: 'Bannimantap',
        areaKn: 'ಬನ್ನಿಮಂಟಪ',
        lat: 12.3292,
        lng: 76.6502,
        accessibility: { en: 'Sample drinking water & ramp', kn: 'ಮಾದರಿ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ರ‍್ಯಾಂಪ್' },
      },
    ],
  },
  // Dakshina Kannada
  {
    id: 'ac-203-mangaluru-south',
    name: 'Mangaluru City South',
    nameKn: 'ಮಂಗಳೂರು ನಗರ ದಕ್ಷಿಣ',
    code: 'AC-203',
    districtId: 'dakshina-kannada',
    reserved: 'General',
    lat: 12.8698,
    lng: 74.843,
    booths: [
      {
        id: 'booth-203-01',
        boothNumber: 'Sample Booth 011',
        name: 'Govt. Practising High School, Hampankatta – Sample Booth 011',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರಾಕ್ಟೀಸಿಂಗ್ ಪ್ರೌಢಶಾಲೆ, ಹಂಪನಕಟ್ಟೆ – ಮಾದರಿ ಮತಗಟ್ಟೆ 011',
        area: 'Hampankatta',
        areaKn: 'ಹಂಪನಕಟ್ಟೆ',
        lat: 12.8693,
        lng: 74.8434,
        accessibility: { en: 'Sample ground-floor access', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-203-02',
        boothNumber: 'Sample Booth 049',
        name: 'Corporation Hall, Kankanady – Sample Booth 049',
        nameKn: 'ಮಹಾನಗರ ಪಾಲಿಕೆ ಭವನ, ಕಂಕನಾಡಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 049',
        area: 'Kankanady',
        areaKn: 'ಕಂಕನಾಡಿ',
        lat: 12.8672,
        lng: 74.8588,
        accessibility: { en: 'Sample ramp & shaded queue', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಮತ್ತು ನೆರಳಿನ ಸಾಲು' },
      },
      {
        id: 'booth-203-03',
        boothNumber: 'Sample Booth 095',
        name: 'Govt. Higher Primary School, Attavar – Sample Booth 095',
        nameKn: 'ಸರ್ಕಾರಿ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಅತ್ತಾವರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 095',
        area: 'Attavar',
        areaKn: 'ಅತ್ತಾವರ',
        lat: 12.8629,
        lng: 74.8482,
        accessibility: { en: 'Sample priority desk', kn: 'ಮಾದರಿ ಆದ್ಯತೆ ಮೇಜು' },
      },
    ],
  },
  {
    id: 'ac-202-mangaluru-north',
    name: 'Mangaluru City North',
    nameKn: 'ಮಂಗಳೂರು ನಗರ ಉತ್ತರ',
    code: 'AC-202',
    districtId: 'dakshina-kannada',
    reserved: 'General',
    lat: 12.9774,
    lng: 74.8054,
    booths: [
      {
        id: 'booth-202-01',
        boothNumber: 'Sample Booth 023',
        name: 'Govt. Composite PU College, Surathkal – Sample Booth 023',
        nameKn: 'ಸರ್ಕಾರಿ ಸಂಯುಕ್ತ ಪದವಿ ಪೂರ್ವ ಕಾಲೇಜು, ಸುರತ್ಕಲ್ – ಮಾದರಿ ಮತಗಟ್ಟೆ 023',
        area: 'Surathkal',
        areaKn: 'ಸುರತ್ಕಲ್',
        lat: 12.9901,
        lng: 74.7989,
        accessibility: { en: 'Sample ramp & water facility', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಮತ್ತು ನೀರಿನ ಸೌಲಭ್ಯ' },
      },
      {
        id: 'booth-202-02',
        boothNumber: 'Sample Booth 061',
        name: 'Govt. High School, Kavoor – Sample Booth 061',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಕಾವೂರು – ಮಾದರಿ ಮತಗಟ್ಟೆ 061',
        area: 'Kavoor',
        areaKn: 'ಕಾವೂರು',
        lat: 12.9277,
        lng: 74.8551,
        accessibility: { en: 'Sample accessible hall', kn: 'ಮಾದರಿ ಸುಗಮ ಸಭಾಂಗಣ' },
      },
      {
        id: 'booth-202-03',
        boothNumber: 'Sample Booth 088',
        name: 'Civic Ward Room, Panambur – Sample Booth 088',
        nameKn: 'ನಾಗರಿಕ ವಾರ್ಡ್ ಕೊಠಡಿ, ಪಣಂಬೂರು – ಮಾದರಿ ಮತಗಟ್ಟೆ 088',
        area: 'Panambur',
        areaKn: 'ಪಣಂಬೂರು',
        lat: 12.9524,
        lng: 74.8059,
        accessibility: { en: 'Sample ground-floor access', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
    ],
  },
  {
    id: 'ac-201-moodabidri',
    name: 'Moodabidri',
    nameKn: 'ಮೂಡುಬಿದಿರೆ',
    code: 'AC-201',
    districtId: 'dakshina-kannada',
    reserved: 'General',
    lat: 13.0694,
    lng: 74.9963,
    booths: [
      {
        id: 'booth-201-01',
        boothNumber: 'Sample Booth 015',
        name: 'Govt. Model Primary School, Moodabidri Town – Sample Booth 015',
        nameKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಮೂಡುಬಿದಿರೆ – ಮಾದರಿ ಮತಗಟ್ಟೆ 015',
        area: 'Moodabidri Town',
        areaKn: 'ಮೂಡುಬಿದಿರೆ ಪಟ್ಟಣ',
        lat: 13.0688,
        lng: 74.9951,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-201-02',
        boothNumber: 'Sample Booth 046',
        name: 'Gram Panchayat Office, Mulki – Sample Booth 046',
        nameKn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಕಚೇರಿ, ಮೂಲ್ಕಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 046',
        area: 'Mulki',
        areaKn: 'ಮೂಲ್ಕಿ',
        lat: 13.0921,
        lng: 74.7945,
        accessibility: { en: 'Sample shaded waiting area', kn: 'ಮಾದರಿ ನೆರಳಿನ ಕಾಯುವ ಸ್ಥಳ' },
      },
      {
        id: 'booth-201-03',
        boothNumber: 'Sample Booth 072',
        name: 'Govt. High School, Kinnigoli – Sample Booth 072',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಕಿನ್ನಿಗೋಳಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 072',
        area: 'Kinnigoli',
        areaKn: 'ಕಿನ್ನಿಗೋಳಿ',
        lat: 13.0764,
        lng: 74.8728,
        accessibility: { en: 'Sample wheelchair helpdesk', kn: 'ಮಾದರಿ ವೀಲ್‌ಚೇರ್ ಸಹಾಯ' },
      },
    ],
  },
  // Dharwad
  {
    id: 'ac-73-hd-central',
    name: 'Hubballi-Dharwad Central',
    nameKn: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ ಕೇಂದ್ರ',
    code: 'AC-73',
    districtId: 'dharwad',
    reserved: 'General',
    lat: 15.3617,
    lng: 75.1342,
    booths: [
      {
        id: 'booth-73-01',
        boothNumber: 'Sample Booth 018',
        name: 'Govt. Primary School No. 4, Vidyanagar – Sample Booth 018',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ ಸಂಖ್ಯೆ 4, ವಿದ್ಯಾನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 018',
        area: 'Vidyanagar, Hubballi',
        areaKn: 'ವಿದ್ಯಾನಗರ, ಹುಬ್ಬಳ್ಳಿ',
        lat: 15.3694,
        lng: 75.1225,
        accessibility: { en: 'Sample ramp & ground floor', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಮತ್ತು ನೆಲಮಹಡಿ' },
      },
      {
        id: 'booth-73-02',
        boothNumber: 'Sample Booth 053',
        name: 'Municipal Civic Hall, Keshwapur – Sample Booth 053',
        nameKn: 'ನಗರಪಾಲಿಕೆ ಭವನ, ಕೇಶ್ವಾಪುರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 053',
        area: 'Keshwapur',
        areaKn: 'ಕೇಶ್ವಾಪುರ',
        lat: 15.3608,
        lng: 75.1516,
        accessibility: { en: 'Sample accessible entrance', kn: 'ಮಾದರಿ ಸುಗಮ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-73-03',
        boothNumber: 'Sample Booth 084',
        name: 'Govt. PU College, Deshpande Nagar – Sample Booth 084',
        nameKn: 'ಸರ್ಕಾರಿ ಪಿಯು ಕಾಲೇಜು, ದೇಶಪಾಂಡೆ ನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 084',
        area: 'Deshpande Nagar',
        areaKn: 'ದೇಶಪಾಂಡೆ ನಗರ',
        lat: 15.3526,
        lng: 75.1397,
        accessibility: { en: 'Sample senior citizen queue', kn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಮಾದರಿ ಸಾಲು' },
      },
    ],
  },
  {
    id: 'ac-74-hd-west',
    name: 'Hubballi-Dharwad West',
    nameKn: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ ಪಶ್ಚಿಮ',
    code: 'AC-74',
    districtId: 'dharwad',
    reserved: 'General',
    lat: 15.4589,
    lng: 75.0078,
    booths: [
      {
        id: 'booth-74-01',
        boothNumber: 'Sample Booth 027',
        name: 'Govt. Model School, Saptapur – Sample Booth 027',
        nameKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಶಾಲೆ, ಸಪ್ತಾಪುರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 027',
        area: 'Saptapur, Dharwad',
        areaKn: 'ಸಪ್ತಾಪುರ, ಧಾರವಾಡ',
        lat: 15.4541,
        lng: 74.9963,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-74-02',
        boothNumber: 'Sample Booth 068',
        name: 'Civic Community Centre, Malmaddi – Sample Booth 068',
        nameKn: 'ಸಮುದಾಯ ಕೇಂದ್ರ, ಮಾಳಮಡ್ಡಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 068',
        area: 'Malmaddi',
        areaKn: 'ಮಾಳಮಡ್ಡಿ',
        lat: 15.4488,
        lng: 75.0129,
        accessibility: { en: 'Sample wheelchair facility', kn: 'ಮಾದರಿ ವೀಲ್‌ಚೇರ್ ಸೌಲಭ್ಯ' },
      },
      {
        id: 'booth-74-03',
        boothNumber: 'Sample Booth 099',
        name: 'Govt. Primary School, Navanagar – Sample Booth 099',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ನವನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 099',
        area: 'Navanagar',
        areaKn: 'ನವನಗರ',
        lat: 15.4126,
        lng: 75.0644,
        accessibility: { en: 'Sample shaded waiting area', kn: 'ಮಾದರಿ ನೆರಳಿನ ಕಾಯುವ ಸ್ಥಳ' },
      },
    ],
  },
  {
    id: 'ac-71-dharwad',
    name: 'Dharwad',
    nameKn: 'ಧಾರವಾಡ',
    code: 'AC-71',
    districtId: 'dharwad',
    reserved: 'General',
    lat: 15.4697,
    lng: 75.0149,
    booths: [
      {
        id: 'booth-71-01',
        boothNumber: 'Sample Booth 009',
        name: 'Govt. Higher Primary School, Killa – Sample Booth 009',
        nameKn: 'ಸರ್ಕಾರಿ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಕಿಲ್ಲಾ – ಮಾದರಿ ಮತಗಟ್ಟೆ 009',
        area: 'Killa, Dharwad',
        areaKn: 'ಕಿಲ್ಲಾ, ಧಾರವಾಡ',
        lat: 15.4648,
        lng: 75.0112,
        accessibility: { en: 'Sample ground-floor access', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-71-02',
        boothNumber: 'Sample Booth 041',
        name: 'Gram Panchayat Bhavan, Garag – Sample Booth 041',
        nameKn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಭವನ, ಗರಗ – ಮಾದರಿ ಮತಗಟ್ಟೆ 041',
        area: 'Garag',
        areaKn: 'ಗರಗ',
        lat: 15.5683,
        lng: 74.9389,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-71-03',
        boothNumber: 'Sample Booth 076',
        name: 'Govt. High School, Narendra – Sample Booth 076',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ನರೇಂದ್ರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 076',
        area: 'Narendra',
        areaKn: 'ನರೇಂದ್ರ',
        lat: 15.5071,
        lng: 74.9854,
        accessibility: { en: 'Sample volunteer assistance', kn: 'ಮಾದರಿ ಸ್ವಯಂಸೇವಕ ನೆರವು' },
      },
    ],
  },
  // Belagavi
  {
    id: 'ac-11-belagavi-north',
    name: 'Belagavi North',
    nameKn: 'ಬೆಳಗಾವಿ ಉತ್ತರ',
    code: 'AC-11',
    districtId: 'belagavi',
    reserved: 'General',
    lat: 15.8692,
    lng: 74.5094,
    booths: [
      {
        id: 'booth-11-01',
        boothNumber: 'Sample Booth 016',
        name: 'Govt. Sardar High School, Camp Area – Sample Booth 016',
        nameKn: 'ಸರ್ಕಾರಿ ಸರ್ದಾರ್ ಪ್ರೌಢಶಾಲೆ, ಕ್ಯಾಂಪ್ ಪ್ರದೇಶ – ಮಾದರಿ ಮತಗಟ್ಟೆ 016',
        area: 'Belagavi Camp',
        areaKn: 'ಬೆಳಗಾವಿ ಕ್ಯಾಂಪ್',
        lat: 15.8594,
        lng: 74.4961,
        accessibility: { en: 'Sample ramp & wide doorway', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಮತ್ತು ಅಗಲ ದ್ವಾರ' },
      },
      {
        id: 'booth-11-02',
        boothNumber: 'Sample Booth 047',
        name: 'Civic Library Hall, Hanuman Nagar – Sample Booth 047',
        nameKn: 'ನಾಗರಿಕ ಗ್ರಂಥಾಲಯ ಭವನ, ಹನುಮಾನ್ ನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 047',
        area: 'Hanuman Nagar',
        areaKn: 'ಹನುಮಾನ್ ನಗರ',
        lat: 15.8778,
        lng: 74.5028,
        accessibility: { en: 'Sample ground-floor access', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-11-03',
        boothNumber: 'Sample Booth 092',
        name: 'Govt. Primary School, Ramteerth Nagar – Sample Booth 092',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ರಾಮತೀರ್ಥ ನಗರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 092',
        area: 'Ramteerth Nagar',
        areaKn: 'ರಾಮತೀರ್ಥ ನಗರ',
        lat: 15.8874,
        lng: 74.5396,
        accessibility: { en: 'Sample drinking water', kn: 'ಮಾದರಿ ಕುಡಿಯುವ ನೀರು' },
      },
    ],
  },
  {
    id: 'ac-12-belagavi-south',
    name: 'Belagavi South',
    nameKn: 'ಬೆಳಗಾವಿ ದಕ್ಷಿಣ',
    code: 'AC-12',
    districtId: 'belagavi',
    reserved: 'General',
    lat: 15.8351,
    lng: 74.5015,
    booths: [
      {
        id: 'booth-12-01',
        boothNumber: 'Sample Booth 022',
        name: 'Govt. Higher Primary School, Tilakwadi – Sample Booth 022',
        nameKn: 'ಸರ್ಕಾರಿ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ತಿಲಕವಾಡಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 022',
        area: 'Tilakwadi',
        areaKn: 'ತಿಲಕವಾಡಿ',
        lat: 15.8342,
        lng: 74.5037,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-12-02',
        boothNumber: 'Sample Booth 058',
        name: 'Community Hall, Shahapur – Sample Booth 058',
        nameKn: 'ಸಮುದಾಯ ಭವನ, ಶಹಾಪುರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 058',
        area: 'Shahapur',
        areaKn: 'ಶಹಾಪುರ',
        lat: 15.8445,
        lng: 74.5131,
        accessibility: { en: 'Sample senior citizen priority', kn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಮಾದರಿ ಆದ್ಯತೆ' },
      },
      {
        id: 'booth-12-03',
        boothNumber: 'Sample Booth 085',
        name: 'Govt. High School, Vadgaon – Sample Booth 085',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ವಡಗಾಂವ್ – ಮಾದರಿ ಮತಗಟ್ಟೆ 085',
        area: 'Vadgaon',
        areaKn: 'ವಡಗಾಂವ್',
        lat: 15.8295,
        lng: 74.5214,
        accessibility: { en: 'Sample accessible entrance', kn: 'ಮಾದರಿ ಸುಗಮ ಪ್ರವೇಶ' },
      },
    ],
  },
  {
    id: 'ac-16-bailhongal',
    name: 'Bailhongal',
    nameKn: 'ಬೈಲಹೊಂಗಲ',
    code: 'AC-16',
    districtId: 'belagavi',
    reserved: 'General',
    lat: 15.8147,
    lng: 74.8599,
    booths: [
      {
        id: 'booth-16-01',
        boothNumber: 'Sample Booth 007',
        name: 'Govt. Model School, Bailhongal Town – Sample Booth 007',
        nameKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಶಾಲೆ, ಬೈಲಹೊಂಗಲ ಪಟ್ಟಣ – ಮಾದರಿ ಮತಗಟ್ಟೆ 007',
        area: 'Bailhongal Town',
        areaKn: 'ಬೈಲಹೊಂಗಲ ಪಟ್ಟಣ',
        lat: 15.8142,
        lng: 74.8614,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-16-02',
        boothNumber: 'Sample Booth 034',
        name: 'Taluk Office Annex, Bailhongal – Sample Booth 034',
        nameKn: 'ತಾಲ್ಲೂಕು ಕಚೇರಿ, ಬೈಲಹೊಂಗಲ – ಮಾದರಿ ಮತಗಟ್ಟೆ 034',
        area: 'Station Road',
        areaKn: 'ಸ್ಟೇಷನ್ ರಸ್ತೆ',
        lat: 15.8186,
        lng: 74.8532,
        accessibility: { en: 'Sample ground-floor access', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-16-03',
        boothNumber: 'Sample Booth 069',
        name: 'Govt. Primary School, Nesargi – Sample Booth 069',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ನೇಸರಗಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 069',
        area: 'Nesargi',
        areaKn: 'ನೇಸರಗಿ',
        lat: 15.8768,
        lng: 74.7739,
        accessibility: { en: 'Sample shaded queue', kn: 'ಮಾದರಿ ನೆರಳಿನ ಸಾಲು' },
      },
    ],
  },
  // Kalaburagi
  {
    id: 'ac-45-kalaburagi-north',
    name: 'Kalaburagi North',
    nameKn: 'ಕಲಬುರಗಿ ಉತ್ತರ',
    code: 'AC-45',
    districtId: 'kalaburagi',
    reserved: 'General',
    lat: 17.3452,
    lng: 76.8312,
    booths: [
      {
        id: 'booth-45-01',
        boothNumber: 'Sample Booth 013',
        name: 'Govt. Higher Primary School, Super Market – Sample Booth 013',
        nameKn: 'ಸರ್ಕಾರಿ ಹಿರಿಯ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಸೂಪರ್ ಮಾರ್ಕೆಟ್ – ಮಾದರಿ ಮತಗಟ್ಟೆ 013',
        area: 'Super Market Area',
        areaKn: 'ಸೂಪರ್ ಮಾರ್ಕೆಟ್ ಪ್ರದೇಶ',
        lat: 17.3396,
        lng: 76.8277,
        accessibility: { en: 'Sample shaded queue & water', kn: 'ಮಾದರಿ ನೆರಳು ಮತ್ತು ನೀರು' },
      },
      {
        id: 'booth-45-02',
        boothNumber: 'Sample Booth 052',
        name: 'Civic Community Hall, Gazipura – Sample Booth 052',
        nameKn: 'ಸಮುದಾಯ ಭವನ, ಗಾಜಿಪುರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 052',
        area: 'Gazipura',
        areaKn: 'ಗಾಜಿಪುರ',
        lat: 17.3435,
        lng: 76.8398,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-45-03',
        boothNumber: 'Sample Booth 081',
        name: 'Govt. PU College, Aland Road – Sample Booth 081',
        nameKn: 'ಸರ್ಕಾರಿ ಪಿಯು ಕಾಲೇಜು, ಆಳಂದ ರಸ್ತೆ – ಮಾದರಿ ಮತಗಟ್ಟೆ 081',
        area: 'Aland Road',
        areaKn: 'ಆಳಂದ ರಸ್ತೆ',
        lat: 17.3587,
        lng: 76.8204,
        accessibility: { en: 'Sample ground-floor classroom', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಕೊಠಡಿ' },
      },
    ],
  },
  {
    id: 'ac-44-kalaburagi-south',
    name: 'Kalaburagi South',
    nameKn: 'ಕಲಬುರಗಿ ದಕ್ಷಿಣ',
    code: 'AC-44',
    districtId: 'kalaburagi',
    reserved: 'General',
    lat: 17.3147,
    lng: 76.8378,
    booths: [
      {
        id: 'booth-44-01',
        boothNumber: 'Sample Booth 025',
        name: 'Govt. Model School, Sedam Road – Sample Booth 025',
        nameKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಶಾಲೆ, ಸೇಡಂ ರಸ್ತೆ – ಮಾದರಿ ಮತಗಟ್ಟೆ 025',
        area: 'Sedam Road',
        areaKn: 'ಸೇಡಂ ರಸ್ತೆ',
        lat: 17.3198,
        lng: 76.8542,
        accessibility: { en: 'Sample wheelchair ramp', kn: 'ಮಾದರಿ ವೀಲ್‌ಚೇರ್ ರ‍್ಯಾಂಪ್' },
      },
      {
        id: 'booth-44-02',
        boothNumber: 'Sample Booth 063',
        name: 'Municipal Ward Hall, Jewargi Colony – Sample Booth 063',
        nameKn: 'ನಗರಪಾಲಿಕೆ ವಾರ್ಡ್ ಭವನ, ಜೇವರ್ಗಿ ಕಾಲೋನಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 063',
        area: 'Jewargi Colony',
        areaKn: 'ಜೇವರ್ಗಿ ಕಾಲೋನಿ',
        lat: 17.3095,
        lng: 76.8245,
        accessibility: { en: 'Sample shaded seating', kn: 'ಮಾದರಿ ನೆರಳಿನ ಆಸನ' },
      },
      {
        id: 'booth-44-03',
        boothNumber: 'Sample Booth 094',
        name: 'Govt. High School, Kusnoor – Sample Booth 094',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಕುಸನೂರು – ಮಾದರಿ ಮತಗಟ್ಟೆ 094',
        area: 'Kusnoor',
        areaKn: 'ಕುಸನೂರು',
        lat: 17.2958,
        lng: 76.8511,
        accessibility: { en: 'Sample ground-floor access', kn: 'ಮಾದರಿ ನೆಲಮಹಡಿ ಪ್ರವೇಶ' },
      },
    ],
  },
  {
    id: 'ac-40-chittapur',
    name: 'Chittapur (SC)',
    nameKn: 'ಚಿತ್ತಾಪುರ (SC)',
    code: 'AC-40',
    districtId: 'kalaburagi',
    reserved: 'SC',
    lat: 17.1165,
    lng: 77.0819,
    booths: [
      {
        id: 'booth-40-01',
        boothNumber: 'Sample Booth 005',
        name: 'Govt. Model Primary School, Chittapur – Sample Booth 005',
        nameKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಚಿತ್ತಾಪುರ – ಮಾದರಿ ಮತಗಟ್ಟೆ 005',
        area: 'Chittapur Town',
        areaKn: 'ಚಿತ್ತಾಪುರ ಪಟ್ಟಣ',
        lat: 17.1169,
        lng: 77.0801,
        accessibility: { en: 'Sample ramp access', kn: 'ಮಾದರಿ ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ' },
      },
      {
        id: 'booth-40-02',
        boothNumber: 'Sample Booth 039',
        name: 'Gram Panchayat Office, Wadi – Sample Booth 039',
        nameKn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಕಚೇರಿ, ವಾಡಿ – ಮಾದರಿ ಮತಗಟ್ಟೆ 039',
        area: 'Wadi',
        areaKn: 'ವಾಡಿ',
        lat: 17.0528,
        lng: 76.9935,
        accessibility: { en: 'Sample drinking water & ramp', kn: 'ಮಾದರಿ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ರ‍್ಯಾಂಪ್' },
      },
      {
        id: 'booth-40-03',
        boothNumber: 'Sample Booth 071',
        name: 'Govt. High School, Shahabad – Sample Booth 071',
        nameKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಶಹಾಬಾದ್ – ಮಾದರಿ ಮತಗಟ್ಟೆ 071',
        area: 'Shahabad',
        areaKn: 'ಶಹಾಬಾದ್',
        lat: 17.1292,
        lng: 76.9422,
        accessibility: { en: 'Sample priority queue', kn: 'ಮಾದರಿ ಆದ್ಯತೆಯ ಸಾಲು' },
      },
    ],
  },
];

// Party list strictly for civic identification and educational simulation; verify current ECI list on eci.gov.in
export const PARTIES: Party[] = [
  {
    id: 'party-aap',
    name: 'Aam Aadmi Party',
    nameKn: 'ಆಮ್ ಆದ್ಮಿ ಪಕ್ಷ',
    shortName: 'AAP',
    category: 'National',
    colour: '#0284C7',
    founded: '2012',
    ideology: {
      en: 'Focuses on anti-corruption, local public services, and governance transparency (verify party platform on official site).',
      kn: 'ಭ್ರಷ್ಟಾಚಾರ ವಿರೋಧಿ, ಸ್ಥಳೀಯ ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳು ಮತ್ತು ಪಾರದರ್ಶಕ ಆಡಳಿತದತ್ತ ಗಮನ (ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ).',
    },
    symbolKey: 'broom',
  },
  {
    id: 'party-bjp',
    name: 'Bharatiya Janata Party',
    nameKn: 'ಭಾರತೀಯ ಜನತಾ ಪಕ್ಷ',
    shortName: 'BJP',
    category: 'National',
    colour: '#EA580C',
    founded: '1980',
    ideology: {
      en: 'Focuses on cultural nationalism, infrastructure development, and market-oriented policies (verify party platform on official site).',
      kn: 'ಸಾಂಸ್ಕೃತಿಕ ರಾಷ್ಟ್ರೀಯತೆ, ಮೂಲಸೌಕರ್ಯ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಆರ್ಥಿಕ ನೀತಿಗಳತ್ತ ಗಮನ (ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ).',
    },
    symbolKey: 'lotus',
  },
  {
    id: 'party-bsp',
    name: 'Bahujan Samaj Party',
    nameKn: 'ಬಹುಜನ ಸಮಾಜ ಪಕ್ಷ',
    shortName: 'BSP',
    category: 'National',
    colour: '#1D4ED8',
    founded: '1984',
    ideology: {
      en: 'Focuses on social equality, representation for marginalised communities, and constitutional rights (verify on official site).',
      kn: 'ಸಾಮಾಜಿಕ ಸಮಾನತೆ, ಶೋಷಿತ ವರ್ಗಗಳ ಪ್ರಾತಿನಿಧ್ಯ ಮತ್ತು ಸಂವಿಧಾನಾತ್ಮಕ ಹಕ್ಕುಗಳತ್ತ ಗಮನ (ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ).',
    },
    symbolKey: 'elephant',
  },
  {
    id: 'party-cpim',
    name: 'Communist Party of India (Marxist)',
    nameKn: 'ಭಾರತ ಕಮ್ಯುನಿಸ್ಟ್ ಪಕ್ಷ (ಮಾರ್ಕ್ಸ್‌ವಾದಿ)',
    shortName: 'CPI(M)',
    category: 'National',
    colour: '#DC2626',
    founded: '1964',
    ideology: {
      en: 'Focuses on labour rights, agrarian reform, public-sector welfare, and secularism (verify on official site).',
      kn: 'ಕಾರ್ಮಿಕ ಹಕ್ಕುಗಳು, ಕೃಷಿ ಸುಧಾರಣೆ, ಸಾರ್ವಜನಿಕ ಕಲ್ಯಾಣ ಮತ್ತು ಜಾತ್ಯತೀತತೆಯತ್ತ ಗಮನ (ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ).',
    },
    symbolKey: 'hammer-sickle-star',
  },
  {
    id: 'party-inc',
    name: 'Indian National Congress',
    nameKn: 'ಭಾರತೀಯ ರಾಷ್ಟ್ರೀಯ ಕಾಂಗ್ರೆಸ್',
    shortName: 'INC',
    category: 'National',
    colour: '#0D9488',
    founded: '1885',
    ideology: {
      en: 'Focuses on social welfare, constitutional pluralism, and mixed-economy development (verify on official site).',
      kn: 'ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ, ಸಂವಿಧಾನಾತ್ಮಕ ಬಹುತ್ವ ಮತ್ತು ಮಿಶ್ರ ಆರ್ಥಿಕ ಅಭಿವೃದ್ಧಿಯತ್ತ ಗಮನ (ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ).',
    },
    symbolKey: 'hand',
  },
  {
    id: 'party-jds',
    name: 'Janata Dal (Secular)',
    nameKn: 'ಜನತಾ ದಳ (ಜಾತ್ಯತೀತ)',
    shortName: 'JD(S)',
    category: 'State',
    colour: '#15803D',
    founded: '1999',
    ideology: {
      en: 'Karnataka-recognised state party focusing on regional agrarian welfare and federal interests (verify on eci.gov.in).',
      kn: 'ಕೃಷಿ ಕಲ್ಯಾಣ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಹಿತಾಸಕ್ತಿಗಳತ್ತ ಗಮನಹರಿಸುವ ಕರ್ನಾಟಕದ ಮಾನ್ಯತೆ ಪಡೆದ ರಾಜ್ಯ ಪಕ್ಷ (eci.gov.in ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ).',
    },
    symbolKey: 'farmer-sheaf',
  },
  {
    id: 'party-krpp',
    name: 'Karnataka Civic Forum (Sample Regd.)',
    nameKn: 'ಕರ್ನಾಟಕ ನಾಗರಿಕ ವೇದಿಕೆ (ಮಾದರಿ ನೋಂದಾಯಿತ)',
    shortName: 'KCF',
    category: 'Registered-Unrecognised',
    colour: '#6D28D9',
    founded: '2021 (Sample)',
    ideology: {
      en: 'Fictional registered-unrecognised party placeholder demonstrating ECI ballot placement rules.',
      kn: 'ECI ಮತಪತ್ರ ಕ್ರಮವನ್ನು ವಿವರಿಸಲು ಬಳಸಿದ ಕಾಲ್ಪನಿಕ ನೋಂದಾಯಿತ-ಮಾನ್ಯತೆ ಪಡೆಯದ ಪಕ್ಷ.',
    },
    symbolKey: 'lamp',
  },
  {
    id: 'party-ind',
    name: 'Independent Candidate',
    nameKn: 'ಪಕ್ಷೇತರ ಅಭ್ಯರ್ಥಿ',
    shortName: 'IND',
    category: 'Independent',
    colour: '#475569',
    founded: 'N/A',
    ideology: {
      en: 'Individual contesting without affiliation to any political party, allotted a free symbol by the Returning Officer.',
      kn: 'ಯಾವುದೇ ರಾಜಕೀಯ ಪಕ್ಷಕ್ಕೆ ಸೇರದೆ ಚುನಾವಣಾಧಿಕಾರಿ ನೀಡಿದ ಮುಕ್ತ ಚಿಹ್ನೆಯೊಂದಿಗೆ ಸ್ಪರ್ಧಿಸುವ ವ್ಯಕ್ತಿ.',
    },
    symbolKey: 'kite',
  },
  {
    id: 'party-nota',
    name: 'None of the Above (NOTA)',
    nameKn: 'ಮೇಲಿನವರಲ್ಲಿ ಯಾರೂ ಅಲ್ಲ (NOTA)',
    shortName: 'NOTA',
    category: 'Independent',
    colour: '#334155',
    founded: '2013 (ECI)',
    ideology: {
      en: 'Official option allowing voters to record dissent by choosing none of the contesting candidates; always placed last.',
      kn: 'ಸ್ಪರ್ಧಿಸಿರುವ ಯಾವ ಅಭ್ಯರ್ಥಿಗೂ ಮತ ನೀಡಲು ಇಷ್ಟವಿಲ್ಲದಿದ್ದಾಗ ಮತದಾರರು ಬಳಸುವ ಅಧಿಕೃತ ಆಯ್ಕೆ; ಯಾವಾಗಲೂ ಕೊನೆಯಲ್ಲಿರುತ್ತದೆ.',
    },
    symbolKey: 'nota',
  },
];

const FIRST_NAMES_EN = [
  'Aarav', 'Ananya', 'Basavaraj', 'Bhavani', 'Chaitanya', 'Deepika',
  'Eshwar', 'Farida', 'Girish', 'Harshita', 'Irfan', 'Janaki',
  'Karthik', 'Lakshmi', 'Mahesh', 'Nandini', 'Omkar', 'Pallavi',
  'Raghavendra', 'Shruthi', 'Tariq', 'Usha', 'Vinayak', 'Zoya',
];

const LAST_NAMES_EN = [
  'Kulkarni', 'Gowda', 'Bhat', 'Patil', 'Shetty', 'Naik',
  'Hegde', 'Deshpande', 'Rao', 'Kamath', 'Joshi', 'Mirza',
];

const FIRST_NAMES_KN = [
  'ಆರವ್', 'ಅನನ್ಯಾ', 'ಬಸವರಾಜ್', 'ಭವಾನಿ', 'ಚೈತನ್ಯ', 'ದೀಪಿಕಾ',
  'ಈಶ್ವರ್', 'ಫರೀದಾ', 'ಗಿರೀಶ್', 'ಹರ್ಷಿತಾ', 'ಇರ್ಫಾನ್', 'ಜಾನಕಿ',
  'ಕಾರ್ತಿಕ್', 'ಲಕ್ಷ್ಮಿ', 'ಮಹೇಶ್', 'ನಂದಿನಿ', 'ಓಂಕಾರ್', 'ಪಲ್ಲವಿ',
  'ರಾಘವೇಂದ್ರ', 'ಶ್ರುತಿ', 'ತಾರೀಖ್', 'ಉಷಾ', 'ವಿನಾಯಕ್', 'ಜೋಯಾ',
];

const LAST_NAMES_KN = [
  'ಕುಲಕರ್ಣಿ', 'ಗೌಡ', 'ಭಟ್', 'ಪಾಟೀಲ್', 'ಶೆಟ್ಟಿ', 'ನಾಯಕ್',
  'ಹೆಗಡೆ', 'ದೇಶಪಾಂಡೆ', 'ರಾವ್', 'ಕಾಮತ್', 'ಜೋಶಿ', 'ಮಿರ್ಜಾ',
];

const EDUCATIONS: Array<{ en: string; kn: string }> = [
  { en: 'B.A. Public Policy (Fictional)', kn: 'ಬಿ.ಎ. ಸಾರ್ವಜನಿಕ ನೀತಿ (ಕಾಲ್ಪನಿಕ)' },
  { en: 'B.Com (Fictional)', kn: 'ಬಿ.ಕಾಂ (ಕಾಲ್ಪನಿಕ)' },
  { en: 'B.E. Civil Engineering (Fictional)', kn: 'ಬಿ.ಇ. ಸಿವಿಲ್ ಇಂಜಿನಿಯರಿಂಗ್ (ಕಾಲ್ಪನಿಕ)' },
  { en: 'M.Sc. Agriculture (Fictional)', kn: 'ಎಂ.ಎಸ್ಸಿ ಕೃಷಿ (ಕಾಲ್ಪನಿಕ)' },
  { en: 'LL.B. (Fictional)', kn: 'ಎಲ್‌ಎಲ್‌ಬಿ (ಕಾಲ್ಪನಿಕ)' },
  { en: 'Diploma in Education (Fictional)', kn: 'ಶಿಕ್ಷಣ ಡಿಪ್ಲೊಮಾ (ಕಾಲ್ಪನಿಕ)' },
];

const CATEGORY_RANK: Record<PartyCategory, number> = {
  National: 1,
  State: 2,
  'Registered-Unrecognised': 3,
  Independent: 4,
};

export function sortCandidatesByEciOrder(
  candidates: Candidate[],
  parties: Party[]
): Candidate[] {
  const partyLookup: Record<string, Party> = {};
  for (const p of parties) {
    partyLookup[p.id] = p;
  }

  const normalCandidates = candidates.filter((c) => !c.isNota);
  const notaCandidates = candidates.filter((c) => Boolean(c.isNota));

  const sorted = [...normalCandidates].sort((a, b) => {
    const pA = partyLookup[a.partyId];
    const pB = partyLookup[b.partyId];
    const rankA = pA ? CATEGORY_RANK[pA.category] : 99;
    const rankB = pB ? CATEGORY_RANK[pB.category] : 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.fictionalName.localeCompare(b.fictionalName);
  });

  const combined = [...sorted, ...notaCandidates];
  return combined.map((c, idx) => ({ ...c, serialNo: idx + 1 }));
}

function buildFictionalCandidates(): Candidate[] {
  const partyOrder = [
    'party-inc',
    'party-bjp',
    'party-aap',
    'party-jds',
    'party-krpp',
    'party-ind',
  ];

  const all: Candidate[] = [];

  KARNATAKA_CONSTITUENCIES.forEach((constituency, cIdx) => {
    partyOrder.forEach((partyId, pIdx) => {
      const nameIdx = (cIdx * 5 + pIdx * 3) % FIRST_NAMES_EN.length;
      const surnameIdx = (cIdx * 3 + pIdx * 2) % LAST_NAMES_EN.length;
      const edu = EDUCATIONS[(cIdx + pIdx) % EDUCATIONS.length];
      all.push({
        id: `cand-${constituency.id}-${partyId}`,
        fictionalName: `${FIRST_NAMES_EN[nameIdx]} ${LAST_NAMES_EN[surnameIdx]}`,
        fictionalNameKn: `${FIRST_NAMES_KN[nameIdx]} ${LAST_NAMES_KN[surnameIdx]}`,
        partyId,
        constituencyId: constituency.id,
        avatarSeed: cIdx * 17 + pIdx * 11 + 7,
        age: 28 + ((cIdx * 7 + pIdx * 5) % 36),
        education: edu,
      });
    });

    // Always add NOTA for every constituency
    all.push({
      id: `cand-${constituency.id}-nota`,
      fictionalName: 'None of the Above (NOTA)',
      fictionalNameKn: 'ಮೇಲಿನವರಲ್ಲಿ ಯಾರೂ ಅಲ್ಲ (NOTA)',
      partyId: 'party-nota',
      constituencyId: constituency.id,
      avatarSeed: 0,
      age: 0,
      education: { en: 'Official ECI Ballot Option', kn: 'ಅಧಿಕೃತ ECI ಮತಪತ್ರ ಆಯ್ಕೆ' },
      isNota: true,
    });
  });

  return all;
}

export const FICTIONAL_CANDIDATES: Candidate[] = buildFictionalCandidates();

export function getCandidatesForConstituency(constituencyId: string): Candidate[] {
  const filtered = FICTIONAL_CANDIDATES.filter((c) => c.constituencyId === constituencyId);
  return sortCandidatesByEciOrder(filtered, PARTIES);
}

export function getPartyById(partyId: string): Party {
  return PARTIES.find((p) => p.id === partyId) || PARTIES[PARTIES.length - 1];
}

export function getAvatarDataUri(seed: number, isNota?: boolean): string {
  if (isNota) {
    const notaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
      <rect width="80" height="80" rx="14" fill="#334155"/>
      <rect x="14" y="22" width="52" height="36" rx="4" fill="none" stroke="#F8FAFC" stroke-width="3"/>
      <line x1="22" y1="30" x2="58" y2="50" stroke="#F8FAFC" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="58" y1="30" x2="22" y2="50" stroke="#F8FAFC" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(notaSvg)}`;
  }

  const bgColors = ['#E0F2FE', '#FEF3C7', '#DCFCE7', '#EDE9FE', '#FCE7F3', '#F1F5F9'];
  const skinTones = ['#F5D0B5', '#E8B896', '#D49B72', '#B97C54', '#8D5534'];
  const shirtColors = ['#1E3A8A', '#0F766E', '#7C2D12', '#4338CA', '#334155', '#065F46'];
  const hairColors = ['#1E293B', '#27272A', '#3F2E21', '#475569'];

  const bg = bgColors[seed % bgColors.length];
  const skin = skinTones[(seed * 3) % skinTones.length];
  const shirt = shirtColors[(seed * 7) % shirtColors.length];
  const hair = hairColors[(seed * 5) % hairColors.length];
  const hasGlasses = seed % 3 === 0;
  const hasMustache = seed % 4 === 1;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
    <rect width="80" height="80" rx="14" fill="${bg}"/>
    <path d="M14 80 C14 58, 66 58, 66 80 Z" fill="${shirt}"/>
    <rect x="34" y="45" width="12" height="14" rx="4" fill="${skin}"/>
    <circle cx="40" cy="34" r="16" fill="${skin}"/>
    <path d="M24 31 C24 15, 56 15, 56 31 C53 24, 27 24, 24 31 Z" fill="${hair}"/>
    <circle cx="34" cy="33" r="1.8" fill="#0F172A"/>
    <circle cx="46" cy="33" r="1.8" fill="#0F172A"/>
    ${hasGlasses ? '<rect x="29" y="29" width="9" height="7" rx="2" fill="none" stroke="#0F172A" stroke-width="1.5"/><rect x="42" y="29" width="9" height="7" rx="2" fill="none" stroke="#0F172A" stroke-width="1.5"/><line x1="38" y1="32" x2="42" y2="32" stroke="#0F172A" stroke-width="1.5"/>' : ''}
    ${hasMustache ? '<path d="M35 39 Q40 37 45 39" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/>' : ''}
    <path d="M35 42 Q40 45 45 42" stroke="#7C2D12" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
