let sharedAudioCtx: AudioContext | null = null;

function getOrCreateAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;

  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {
      // Browser autoplay gate will resume on next user gesture
    });
  }
  return sharedAudioCtx;
}

export function playEvmBeep(
  muted: boolean,
  onCaption?: (caption: string | null) => void
): void {
  onCaption?.('BEEP — Vote Recorded Tone (2000 Hz)');
  window.setTimeout(() => {
    onCaption?.(null);
  }, 1900);

  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate([120, 40, 120]);
    } catch {
      // Ignore vibration errors on unsupported browsers
    }
  }

  if (muted) return;

  try {
    const ctx = getOrCreateAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
    gain.gain.setValueAtTime(0.18, now + 1.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.75);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.8);
  } catch {
    // Graceful no-op if Web Audio is blocked
  }
}

export function playVvpatCutter(
  muted: boolean,
  onCaption?: (caption: string | null) => void
): void {
  onCaption?.('CUTTER — VVPAT Slip Dropped');
  window.setTimeout(() => {
    onCaption?.(null);
  }, 1400);

  if (muted) return;

  try {
    const ctx = getOrCreateAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.14);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Graceful no-op
  }
}

export function playControlUnitReadyChime(
  muted: boolean,
  onCaption?: (caption: string | null) => void
): void {
  onCaption?.('READY — Ballot Unit Unlocked');
  window.setTimeout(() => {
    onCaption?.(null);
  }, 1200);

  if (muted) return;

  try {
    const ctx = getOrCreateAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1174, now + 0.09);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  } catch {
    // Graceful no-op
  }
}
