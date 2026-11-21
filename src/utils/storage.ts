import type { SelfTestResult } from '../types/election';

const memoryStorage: Record<string, string> = {};
let storageAvailableCache: boolean | null = null;

export function isLocalStorageAvailable(): boolean {
  if (storageAvailableCache !== null) {
    return storageAvailableCache;
  }
  try {
    const testKey = '__matadaan_mitra_probe__';
    window.localStorage.setItem(testKey, '1');
    const readBack = window.localStorage.getItem(testKey);
    window.localStorage.removeItem(testKey);
    storageAvailableCache = readBack === '1';
  } catch {
    storageAvailableCache = false;
  }
  return storageAvailableCache;
}

export function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Fallback to in-memory storage if blocked
  }
  return Object.prototype.hasOwnProperty.call(memoryStorage, key)
    ? memoryStorage[key]
    : null;
}

export function safeSetItem(key: string, value: string): void {
  memoryStorage[key] = value;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Ignore storage quota or blocked third-party storage errors
  }
}

export function safeRemoveItem(key: string): void {
  delete memoryStorage[key];
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage errors
  }
}

export function runSelfTests(params: {
  districtCount: number;
  constituencyCount: number;
  boothCount: number;
  partyCount: number;
  sampleBallotSorted: boolean;
  notaIsLast: boolean;
}): SelfTestResult {
  const errors: string[] = [];

  if (params.districtCount < 5) {
    errors.push(`Expected at least 5 districts, found ${params.districtCount}.`);
  }
  if (params.constituencyCount < 15) {
    errors.push(`Expected at least 15 constituencies, found ${params.constituencyCount}.`);
  }
  if (params.boothCount < 45) {
    errors.push(`Expected at least 45 sample booths, found ${params.boothCount}.`);
  }
  if (params.partyCount < 6) {
    errors.push(`Expected at least 6 party entries, found ${params.partyCount}.`);
  }
  if (!params.sampleBallotSorted) {
    errors.push('ECI ballot order sort invariant check failed.');
  }
  if (!params.notaIsLast) {
    errors.push('NOTA must always appear as the final entry on the Ballot Unit.');
  }

  const storageAvailable = isLocalStorageAvailable();
  const audioSupported =
    typeof window !== 'undefined' &&
    Boolean(window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);

  return {
    passed: errors.length === 0,
    errors,
    storageAvailable,
    audioSupported,
  };
}
