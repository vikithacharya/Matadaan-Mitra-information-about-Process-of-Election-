import React, { useState } from 'react';

interface PartySymbolSvgProps {
  symbolKey: string;
  color: string;
  size?: number;
  label?: string;
}

export const PartySymbolSvg: React.FC<PartySymbolSvgProps> = ({
  symbolKey,
  color,
  size = 36,
  label,
}) => {
  const [assetFailed, setAssetFailed] = useState(false);

  // Optional /assets override with automatic inline SVG fallback if file is absent
  const assetSrc = `/assets/symbols/${symbolKey}.svg`;

  if (!assetFailed && typeof window !== 'undefined' && window.location.protocol !== 'file:') {
    // Wait: to avoid unnecessary 404 console errors in dev/browser when /assets is not supplied,
    // render inline SVG directly unless an explicit window.__MATADAAN_ASSETS_ENABLED__ flag is set.
    if ((window as unknown as { __MATADAAN_ASSETS_ENABLED__?: boolean }).__MATADAAN_ASSETS_ENABLED__) {
      return (
        <img
          src={assetSrc}
          alt={label || symbolKey}
          width={size}
          height={size}
          referrerPolicy="no-referrer"
          onError={() => setAssetFailed(true)}
          className="object-contain shrink-0"
        />
      );
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={label || symbolKey}
      className="shrink-0"
    >
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="10"
        fill="currentColor"
        className="text-slate-100 dark:text-slate-800"
      />
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="10"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      {symbolKey === 'lotus' && (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 12 C28 18, 28 26, 24 31 C20 26, 20 18, 24 12 Z" />
          <path d="M24 31 C16 28, 12 22, 14 16 C18 18, 21 23, 24 31 Z" />
          <path d="M24 31 C32 28, 36 22, 34 16 C30 18, 27 23, 24 31 Z" />
          <path d="M13 33 Q24 36 35 33" />
        </g>
      )}
      {symbolKey === 'hand' && (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 26 V15 A1.8 1.8 0 0 1 20.6 15 V23" />
          <path d="M20.6 22 V12 A1.8 1.8 0 0 1 24.2 12 V22" />
          <path d="M24.2 22 V13 A1.8 1.8 0 0 1 27.8 13 V23" />
          <path d="M27.8 24 V17 A1.8 1.8 0 0 1 31.4 17 V28 C31.4 33, 27.5 36, 23 36 C18.5 36, 15 32.5, 14 27 L12.5 23 A1.8 1.8 0 0 1 15.8 21.5 L17 25" />
        </g>
      )}
      {symbolKey === 'broom' && (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="36" x2="26" y2="22" />
          <path d="M24 20 L34 12 L36 14 L28 24 Z" />
          <path d="M26 22 L35 19 M28 24 L36 25" />
        </g>
      )}
      {symbolKey === 'elephant' && (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 29 V21 C14 16, 19 14, 24 14 H30 C34 14, 36 17, 36 22 V25 C36 27, 38 28, 39 27" />
          <path d="M14 29 H18 V35 H22 V29 H28 V35 H32 V27" />
          <circle cx="31" cy="19" r="1" fill={color} />
        </g>
      )}
      {symbolKey === 'hammer-sickle-star' && (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 31 C24 34, 33 28, 32 19 C31 15, 27 13, 24 14" />
          <line x1="16" y1="16" x2="32" y2="32" />
          <path d="M14 18 L18 14 L21 17 L17 21 Z" />
          <circle cx="24" cy="11" r="1.5" fill={color} />
        </g>
      )}
      {symbolKey === 'farmer-sheaf' && (
        <g fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="15" r="3" />
          <path d="M18 35 V24 C18 21, 30 21, 30 24 V35" />
          <path d="M13 28 Q16 20 19 18 M35 28 Q32 20 29 18" />
        </g>
      )}
      {symbolKey === 'lamp' && (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 12 C27 16, 26 20, 24 22 C22 20, 21 16, 24 12 Z" />
          <path d="M14 26 H34 C32 32, 28 34, 24 34 C20 34, 16 32, 14 26 Z" />
        </g>
      )}
      {symbolKey === 'kite' && (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="24,11 35,22 24,33 13,22" />
          <line x1="24" y1="11" x2="24" y2="37" />
          <line x1="13" y1="22" x2="35" y2="22" />
        </g>
      )}
      {symbolKey === 'nota' && (
        <g fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="13" y="15" width="22" height="18" rx="2" />
          <line x1="17" y1="19" x2="31" y2="29" />
          <line x1="31" y1="19" x2="17" y2="29" />
        </g>
      )}
    </svg>
  );
};
