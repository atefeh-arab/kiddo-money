import React from 'react';

/* ============ Shared bits ============ */
export const Cloud = ({ x = 0, y = 0, s = 1, o = 0.9 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
    <ellipse cx="0" cy="0" rx="26" ry="14" fill="#fff" />
    <ellipse cx="-18" cy="4" rx="16" ry="10" fill="#fff" />
    <ellipse cx="18" cy="4" rx="16" ry="10" fill="#fff" />
  </g>
);

export const Sparkle = ({ x = 0, y = 0, s = 1, c = '#FFC244' }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M0 -8 L2.2 -2.2 L8 0 L2.2 2.2 L0 8 L-2.2 2.2 L-8 0 L-2.2 -2.2 Z" fill={c} />
  </g>
);

export const CoinArt = ({ x = 0, y = 0, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <circle r="11" fill="#F59E0B" />
    <circle r="8.5" fill="#FCD34D" />
    <circle r="8.5" fill="none" stroke="#F59E0B" strokeWidth="1.2" />
    <path d="M0 -4.5 L1.4 -1.2 L4.8 0 L1.4 1.2 L0 4.5 L-1.4 1.2 L-4.8 0 L-1.4 -1.2 Z" fill="#B45309" />
  </g>
);

/* Standalone coin for plain-HTML contexts (cannot be a <g>) */
export const CoinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="-12 -12 24 24" style={{ display: 'block', flexShrink: 0 }}>
    <circle r="11" fill="#F59E0B" />
    <circle r="8.5" fill="#FCD34D" />
    <circle r="8.5" fill="none" stroke="#F59E0B" strokeWidth="1.2" />
    <path d="M0 -4.5 L1.4 -1.2 L4.8 0 L1.4 1.2 L0 4.5 L-1.4 1.2 L-4.8 0 L-1.4 -1.2 Z" fill="#B45309" />
  </svg>
);

/* ============ Bee hero character (kiddo bee) ============ */
export const BeeHero = ({ size = 120, mood = 'happy', flip = false }) => {
  const mouth =
    mood === 'sad'
      ? 'M41 51 Q46 46 51 51'
      : mood === 'wow'
        ? <circle cx="46" cy="50" r="4" fill="#7C2D12" />
        : 'M40 48 Q46 54 52 48';

  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" style={{ display: 'block', transform: flip ? 'scaleX(-1)' : 'none' }}>
      {/* wings */}
      <ellipse cx="24" cy="30" rx="14" ry="20" fill="#FFFFFF" opacity="0.85" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(-24 24 30)" />
      <ellipse cx="72" cy="30" rx="14" ry="20" fill="#FFFFFF" opacity="0.85" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(24 72 30)" />

      {/* antennae */}
      <path d="M38 18 Q34 8 28 6" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M58 18 Q62 8 68 6" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="27" cy="6" r="4" fill="#FFC244" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="69" cy="6" r="4" fill="#FFC244" stroke="#1E293B" strokeWidth="1.5" />

      {/* body */}
      <ellipse cx="48" cy="48" rx="30" ry="32" fill="#FFC244" stroke="#1E293B" strokeWidth="2.5" />
      {/* stripes (kept low, below the face) */}
      <path d="M23 58 Q48 68 73 58 L73 66 Q48 76 23 66 Z" fill="#1E293B" />
      <path d="M28 74 Q48 81 68 74 L68 78 Q48 85 28 78 Z" fill="#1E293B" opacity="0.9" />

      {/* face patch */}
      <circle cx="48" cy="36" r="19" fill="#FFE08A" />
      {/* eyes */}
      <circle cx="40" cy="34" r="5.5" fill="#1E293B" />
      <circle cx="56" cy="34" r="5.5" fill="#1E293B" />
      <circle cx="41.8" cy="32.2" r="1.8" fill="#fff" />
      <circle cx="57.8" cy="32.2" r="1.8" fill="#fff" />
      {/* cheeks */}
      <circle cx="34" cy="42" r="3" fill="#FB923C" opacity="0.65" />
      <circle cx="62" cy="42" r="3" fill="#FB923C" opacity="0.65" />
      {/* mouth */}
      {typeof mouth === 'string'
        ? <path d={mouth} stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        : mouth}
      {/* sting */}
      <path d="M48 80 L44 90 L52 90 Z" fill="#1E293B" />
    </svg>
  );
};

/* ============ Choice art ============ */
export const ChoiceArt = ({ kind, size = 110 }) => {
  const art = () => {
    switch (kind) {
      case 'bread':
        return (
          <>
            <ellipse cx="60" cy="62" rx="34" ry="20" fill="#D97706" />
            <ellipse cx="60" cy="56" rx="34" ry="20" fill="#F59E0B" />
            <path d="M42 52 Q60 44 78 52" stroke="#FDE68A" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="94" rx="26" ry="6" fill="#00000012" />
          </>
        );
      case 'candy':
        return (
          <>
            <ellipse cx="60" cy="92" rx="24" ry="6" fill="#00000012" />
            <circle cx="60" cy="62" r="18" fill="#EF4444" />
            <circle cx="53" cy="56" r="5" fill="#FCA5A5" />
            <path d="M42 62 L26 50 L30 66 L26 80 Z" fill="#F87171" />
            <path d="M78 62 L94 50 L90 66 L94 80 Z" fill="#F87171" />
          </>
        );
      case 'sleep':
        return (
          <>
            <ellipse cx="60" cy="90" rx="30" ry="7" fill="#00000012" />
            <path d="M36 74 Q60 84 84 74 L84 80 Q60 90 36 80 Z" fill="#94A3B8" />
            <circle cx="60" cy="56" r="20" fill="#FFE08A" stroke="#1E293B" strokeWidth="2" />
            <path d="M48 56 Q52 60 56 56 M62 56 Q66 60 70 56" stroke="#1E293B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M52 66 Q60 62 68 66" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </>
        );
      case 'lemonade':
      case 'lemonade2':
        return (
          <>
            <ellipse cx="60" cy="92" rx="22" ry="6" fill="#00000012" />
            <path d="M44 40 L76 40 L72 86 Q60 92 48 86 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
            <path d="M46 58 L74 58 L72 86 Q60 92 48 86 Z" fill="#FCD34D" />
            <path d="M60 40 L60 20 M60 20 Q72 14 78 22" stroke="#84CC16" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="84" cy="24" r="6" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.6" />
            <path d="M40 36 L80 30" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          </>
        );
      case 'toy':
        return (
          <>
            <ellipse cx="60" cy="92" rx="26" ry="6" fill="#00000012" />
            <rect x="36" y="40" width="48" height="40" rx="10" fill="#F87171" stroke="#DC2626" strokeWidth="2" />
            <circle cx="50" cy="60" r="9" fill="#FDE68A" />
            <circle cx="70" cy="60" r="9" fill="#93C5FD" />
            <path d="M46 34 L60 22 L74 34" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        );
      case 'school':
        return (
          <>
            <ellipse cx="60" cy="92" rx="26" ry="6" fill="#00000012" />
            <rect x="34" y="36" width="52" height="44" rx="8" fill="#00A082" stroke="#00876E" strokeWidth="2" />
            <rect x="44" y="46" width="22" height="16" rx="4" fill="#fff" opacity="0.9" />
            <path d="M44 70 L76 70" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <path d="M70 30 L74 20 L82 28" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      case 'music':
        return (
          <>
            <ellipse cx="60" cy="92" rx="22" ry="6" fill="#00000012" />
            <path d="M50 78 L50 36 L78 30 L78 70" stroke="#7C3AED" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="44" cy="78" rx="9" ry="7" fill="#7C3AED" />
            <ellipse cx="72" cy="70" rx="9" ry="7" fill="#7C3AED" />
            <Sparkle x={88} y={30} s={0.9} c="#A78BFA" />
            <Sparkle x={30} y={40} s={0.7} c="#C4B5FD" />
          </>
        );
      case 'drop_coins':
        return (
          <>
            <ellipse cx="60" cy="92" rx="26" ry="6" fill="#00000012" />
            <path d="M34 60 Q48 52 60 58 Q72 64 86 56" stroke="#38BDF8" strokeWidth="4" fill="none" strokeLinecap="round" />
            <CoinArt x={46} y={72} s={0.8} />
            <CoinArt x={64} y={78} s={0.7} />
            <CoinArt x={76} y={68} s={0.6} />
          </>
        );
      case 'repair':
        return (
          <>
            <ellipse cx="60" cy="92" rx="30" ry="6" fill="#00000012" />
            <circle cx="40" cy="70" r="14" fill="none" stroke="#1E293B" strokeWidth="4" />
            <circle cx="80" cy="70" r="14" fill="none" stroke="#1E293B" strokeWidth="4" />
            <path d="M40 70 L56 48 L78 48 M56 48 L64 70 L80 70" stroke="#00A082" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M64 34 L70 44 M74 30 L80 40" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          </>
        );
      case 'expensive_bike':
        return (
          <>
            <ellipse cx="60" cy="94" rx="32" ry="6" fill="#00000012" />
            <circle cx="38" cy="72" r="14" fill="none" stroke="#7C3AED" strokeWidth="4" />
            <circle cx="82" cy="72" r="14" fill="none" stroke="#7C3AED" strokeWidth="4" />
            <path d="M38 72 L54 50 L76 50 L82 72 M54 50 L60 72" stroke="#A78BFA" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M70 42 L84 42 M77 36 L77 48" stroke="#EF4444" strokeWidth="3.4" strokeLinecap="round" />
            <CoinArt x={98} y={44} s={0.7} />
          </>
        );
      case 'treasure':
        return (
          <>
            <ellipse cx="60" cy="92" rx="30" ry="6" fill="#00000012" />
            <path d="M34 58 Q34 44 60 44 Q86 44 86 58 L86 78 Q60 88 34 78 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.4" />
            <path d="M34 58 Q60 66 86 58" stroke="#B45309" strokeWidth="2.4" fill="none" />
            <rect x="54" y="56" width="12" height="10" rx="2" fill="#FDE68A" stroke="#B45309" strokeWidth="1.6" />
            <Sparkle x={30} y={40} s={1} c="#FBBF24" />
            <Sparkle x={92} y={36} s={0.8} c="#FBBF24" />
          </>
        );
      case 'empty_box':
        return (
          <>
            <ellipse cx="60" cy="92" rx="24" ry="6" fill="#00000012" />
            <rect x="38" y="48" width="44" height="32" rx="4" fill="#D6D3D1" stroke="#78716C" strokeWidth="2.4" />
            <path d="M38 48 L60 34 L82 48" fill="#A8A29E" stroke="#78716C" strokeWidth="2.4" />
            <path d="M52 60 L68 76 M68 60 L52 76" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'friend':
        return (
          <>
            <ellipse cx="60" cy="92" rx="30" ry="6" fill="#00000012" />
            <circle cx="42" cy="50" r="14" fill="#FFD8B5" stroke="#1E293B" strokeWidth="2" />
            <circle cx="38" cy="48" r="2" fill="#1E293B" />
            <circle cx="46" cy="48" r="2" fill="#1E293B" />
            <path d="M37 55 Q42 59 47 55" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="78" cy="52" r="11" fill="#FFC244" stroke="#1E293B" strokeWidth="2" />
            <circle cx="75" cy="50" r="1.8" fill="#1E293B" />
            <circle cx="81" cy="50" r="1.8" fill="#1E293B" />
            <path d="M74 56 Q78 59 82 56" stroke="#1E293B" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M55 60 Q60 56 65 60" stroke="#38BDF8" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            <CoinArt x={60} y={70} s={0.8} />
          </>
        );
      case 'shield':
        return (
          <>
            <ellipse cx="60" cy="92" rx="26" ry="6" fill="#00000012" />
            <path d="M60 26 L86 36 L86 60 Q86 80 60 90 Q34 80 34 60 L34 36 Z" fill="#00A082" stroke="#00876E" strokeWidth="2.6" />
            <path d="M48 56 L57 66 L74 46" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 40 Q34 44 30 48" stroke="#94A3B8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M92 44 Q96 48 92 52" stroke="#94A3B8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </>
        );
      case 'trap':
        return (
          <>
            <ellipse cx="60" cy="92" rx="28" ry="6" fill="#00000012" />
            <path d="M36 60 Q40 40 60 40 Q80 40 84 60 L78 78 L42 78 Z" fill="#FCD34D" />
            <CoinArt x={48} y={56} s={0.75} />
            <CoinArt x={66} y={52} s={0.75} />
            <CoinArt x={58} y={66} s={0.7} />
            <path d="M30 34 L38 42 M90 34 L82 42" stroke="#EF4444" strokeWidth="3.4" strokeLinecap="round" />
          </>
        );
      case 'haggle':
        return (
          <>
            <ellipse cx="60" cy="92" rx="26" ry="6" fill="#00000012" />
            <rect x="40" y="46" width="26" height="20" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <path d="M40 46 L40 40 L56 34 L66 46 Z" fill="#0EA5E9" stroke="#0284C7" strokeWidth="2" />
            <rect x="72" y="58" width="22" height="16" rx="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
            <path d="M64 66 L72 66" stroke="#F59E0B" strokeWidth="2.6" strokeLinecap="round" />
            <Sparkle x={88} y={44} s={0.8} c="#38BDF8" />
          </>
        );
      case 'piggy':
        return (
          <>
            <ellipse cx="60" cy="92" rx="30" ry="6" fill="#00000012" />
            <ellipse cx="58" cy="62" rx="26" ry="20" fill="#F9A8D4" stroke="#DB2777" strokeWidth="2.4" />
            <circle cx="80" cy="58" r="9" fill="#F9A8D4" stroke="#DB2777" strokeWidth="2.4" />
            <circle cx="82" cy="56" r="1.8" fill="#1E293B" />
            <ellipse cx="60" cy="52" rx="6" ry="4" fill="#DB2777" opacity="0.5" />
            <path d="M88 58 Q94 58 94 62" stroke="#DB2777" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <rect x="54" y="50" width="8" height="3" rx="1.5" fill="#DB2777" />
            <CoinArt x={60} y={38} s={0.8} />
          </>
        );
      case 'shop':
        return (
          <>
            <ellipse cx="60" cy="92" rx="30" ry="6" fill="#00000012" />
            <path d="M34 52 L34 82 L86 82 L86 52" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.6" />
            <path d="M30 52 L34 34 L86 34 L90 52 Q90 58 82 58 Q76 58 76 52 Q76 58 68 58 Q60 58 60 52 Q60 58 52 58 Q44 58 44 52 Q44 58 36 58 Q28 58 30 52 Z" fill="#FB923C" stroke="#EA580C" strokeWidth="2.2" />
            <rect x="52" y="62" width="16" height="20" rx="2" fill="#FDBA74" stroke="#EA580C" strokeWidth="2" />
            <path d="M84 24 Q90 30 84 34" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" />
            <CoinArt x={94} y={26} s={0.7} />
          </>
        );
      case 'crown':
        return (
          <>
            <ellipse cx="60" cy="92" rx="28" ry="6" fill="#00000012" />
            <path d="M36 70 L36 46 L48 56 L60 40 L72 56 L84 46 L84 70 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="2.4" />
            <circle cx="60" cy="60" r="4" fill="#EF4444" />
            <circle cx="46" cy="63" r="3" fill="#38BDF8" />
            <circle cx="74" cy="63" r="3" fill="#10B981" />
            <Sparkle x={90} y={36} s={0.9} c="#F59E0B" />
          </>
        );
      default:
        return (
          <>
            <ellipse cx="60" cy="92" rx="26" ry="6" fill="#00000012" />
            <CoinArt x={60} y={60} s={1.6} />
          </>
        );
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 120 100" fill="none" style={{ display: 'block' }}>
      {art()}
    </svg>
  );
};

/* ============ Big scene illustrations ============ */
export const SceneArt = ({ scene, size = 170 }) => {
  const art = () => {
    switch (scene) {
      case 'bakery_line':
        return (
          <>
            {/* bakery storefront */}
            <rect x="30" y="40" width="100" height="55" rx="8" fill="#FFF1DB" stroke="#E8A85C" strokeWidth="2.5" />
            <path d="M24 42 L80 18 L136 42 Z" fill="#F8B26A" stroke="#E8A85C" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="48" y="60" width="26" height="35" rx="3" fill="#D97706" />
            <rect x="92" y="58" width="30" height="24" rx="3" fill="#BEE3F0" stroke="#E8A85C" strokeWidth="2" />
            <path d="M40 84 Q60 92 80 84 Q100 92 120 84" stroke="#F59E0B" strokeWidth="3" fill="none" />
            {/* queue kid (in front of the counter) */}
            <circle cx="146" cy="72" r="8" fill="#FFD8B5" stroke="#1E293B" strokeWidth="1.6" />
            <path d="M138 82 Q146 79 154 82 L154 91 L138 91 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.4" />
            {/* bee hero waiting (small, in front of the shop) */}
            <g transform="translate(16,36) scale(0.5)">
              <ellipse cx="48" cy="48" rx="30" ry="32" fill="#FFC244" stroke="#1E293B" strokeWidth="2.5" />
              <path d="M23 58 Q48 68 73 58 L73 66 Q48 76 23 66 Z" fill="#1E293B" />
              <circle cx="48" cy="36" r="19" fill="#FFE08A" />
              <circle cx="40" cy="34" r="5.5" fill="#1E293B" />
              <circle cx="56" cy="34" r="5.5" fill="#1E293B" />
              <circle cx="41.8" cy="32.2" r="1.8" fill="#fff" />
              <circle cx="57.8" cy="32.2" r="1.8" fill="#fff" />
              <path d="M40 48 Q46 54 52 48" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </g>
            <Sparkle x={22} y={20} s={0.8} />
          </>
        );
      case 'lemonade_stand':
        return (
          <>
            <rect x="52" y="44" width="56" height="52" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.4" />
            <path d="M40 44 L120 44 L112 32 L48 32 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.2" />
            <path d="M52 56 L108 56 M52 70 L108 70" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" />
            <path d="M44 96 L136 96" stroke="#84CC16" strokeWidth="4" strokeLinecap="round" />
            <path d="M80 20 L80 44 M80 20 Q92 14 98 22" stroke="#84CC16" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="100" cy="24" r="6" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.6" />
            <Sparkle x={30} y={26} s={0.9} c="#FBBF24" />
          </>
        );
      case 'toy_store':
        return (
          <>
            <rect x="34" y="38" width="92" height="58" rx="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
            <path d="M26 40 L80 16 L134 40 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="58" y="58" width="44" height="38" rx="4" fill="#fff" stroke="#EF4444" strokeWidth="2" />
            <circle cx="70" cy="76" r="8" fill="#93C5FD" />
            <circle cx="90" cy="76" r="8" fill="#FDE68A" />
            <text x="80" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill="#B91C1C">TOYS</text>
          </>
        );
      case 'street_performance':
        return (
          <>
            <path d="M20 92 L140 92" stroke="#A3E635" strokeWidth="5" strokeLinecap="round" />
            <path d="M52 78 L52 40 L84 34 L84 70" stroke="#7C3AED" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <ellipse cx="46" cy="78" rx="10" ry="8" fill="#7C3AED" />
            <ellipse cx="78" cy="70" rx="10" ry="8" fill="#7C3AED" />
            <CoinArt x={100} y={84} s={0.85} />
            <CoinArt x={114} y={88} s={0.7} />
            <Sparkle x={36} y={26} s={1} c="#A78BFA" />
            <Sparkle x={100} y={30} s={0.8} c="#C4B5FD" />
          </>
        );
      case 'broken_bike':
        return (
          <>
            <circle cx="42" cy="74" r="15" fill="none" stroke="#1E293B" strokeWidth="4" />
            <circle cx="92" cy="74" r="15" fill="none" stroke="#1E293B" strokeWidth="4" />
            <path d="M42 74 L60 50 L86 50 L92 74 M60 50 L66 74" stroke="#00A082" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M76 40 L92 40 M84 34 L84 46" stroke="#EF4444" strokeWidth="3.4" strokeLinecap="round" />
            <Sparkle x={24} y={40} s={0.8} c="#F87171" />
          </>
        );
      case 'two_doors':
        return (
          <>
            <rect x="34" y="30" width="44" height="62" rx="5" fill="#FCD34D" stroke="#B45309" strokeWidth="2.6" />
            <circle cx="70" cy="64" r="3" fill="#B45309" />
            <rect x="86" y="30" width="44" height="62" rx="5" fill="#94A3B8" stroke="#475569" strokeWidth="2.6" />
            <circle cx="92" cy="64" r="3" fill="#475569" />
            <Sparkle x={26} y={22} s={1} c="#FBBF24" />
          </>
        );
      case 'helping_friend':
        return (
          <>
            <circle cx="46" cy="52" r="14" fill="#FFD8B5" stroke="#1E293B" strokeWidth="2" />
            <circle cx="42" cy="50" r="2" fill="#1E293B" />
            <circle cx="50" cy="50" r="2" fill="#1E293B" />
            <path d="M41 57 Q46 61 51 57" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="88" cy="54" r="12" fill="#FFC244" stroke="#1E293B" strokeWidth="2" />
            <circle cx="84" cy="52" r="2" fill="#1E293B" />
            <circle cx="92" cy="52" r="2" fill="#1E293B" />
            <path d="M83 59 Q88 63 93 59" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M60 58 Q67 52 74 58" stroke="#38BDF8" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <CoinArt x={67} y={70} s={0.8} />
          </>
        );
      case 'money_trap':
        return (
          <>
            <path d="M36 62 Q40 42 60 42 Q80 42 84 62 L78 80 L42 80 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="2.4" />
            <CoinArt x={50} y={58} s={0.8} />
            <CoinArt x={68} y={54} s={0.8} />
            <CoinArt x={58} y={68} s={0.75} />
            <path d="M30 36 L38 44 M90 36 L82 44" stroke="#EF4444" strokeWidth="3.4" strokeLinecap="round" />
            <Sparkle x={100} y={40} s={0.9} c="#F87171" />
          </>
        );
      case 'market_fair':
        return (
          <>
            <path d="M32 50 L38 32 L126 32 L132 50 Q132 58 122 58 Q114 58 114 50 Q114 58 104 58 Q96 58 96 50 Q96 58 86 58 Q78 58 78 50 Q78 58 68 58 Q60 58 60 50 Q60 58 50 58 Q42 58 42 50 Q42 56 34 56 Q28 56 32 50 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2.2" />
            <rect x="44" y="58" width="76" height="34" rx="4" fill="#FFF7ED" stroke="#DB2777" strokeWidth="2.2" />
            <rect x="56" y="66" width="20" height="14" rx="2" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.6" />
            <rect x="88" y="66" width="20" height="14" rx="2" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.6" />
            <CoinArt x={34} y={80} s={0.8} />
            <Sparkle x={140} y={44} s={0.8} c="#F9A8D4" />
          </>
        );
      case 'final_offer':
        return (
          <>
            <ellipse cx="80" cy="60" rx="30" ry="24" fill="#F9A8D4" stroke="#DB2777" strokeWidth="2.6" />
            <circle cx="104" cy="56" r="10" fill="#F9A8D4" stroke="#DB2777" strokeWidth="2.4" />
            <circle cx="107" cy="54" r="1.8" fill="#1E293B" />
            <rect x="74" y="46" width="10" height="4" rx="2" fill="#DB2777" />
            <CoinArt x={40} y={44} s={0.85} />
            <CoinArt x={30} y={62} s={0.75} />
            <CoinArt x={46} y={76} s={0.7} />
            <Sparkle x={26} y={28} s={1} c="#FBBF24" />
          </>
        );
      case 'crown_choice':
        return (
          <>
            <path d="M42 70 L42 46 L54 56 L66 40 L78 56 L90 46 L90 70 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="2.4" />
            <circle cx="66" cy="60" r="4" fill="#EF4444" />
            <rect x="52" y="76" width="28" height="12" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <path d="M40 26 Q52 18 66 22" stroke="#A78BFA" strokeWidth="3" fill="none" strokeLinecap="round" />
            <Sparkle x={100} y={30} s={1} c="#FBBF24" />
          </>
        );
      case 'honey_pot':
        return (
          <>
            <ellipse cx="80" cy="86" rx="34" ry="8" fill="#00000014" />
            <path d="M52 46 Q80 38 108 46 L104 84 Q80 92 56 84 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.6" />
            <ellipse cx="80" cy="46" rx="28" ry="9" fill="#FDE68A" stroke="#B45309" strokeWidth="2.4" />
            <path d="M62 64 Q80 58 98 64" stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M64 74 Q80 70 96 74" stroke="#FDE68A" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
            <Sparkle x={40} y={36} s={1} />
            <Sparkle x={116} y={32} s={0.8} />
            <CoinArt x={124} y={70} s={0.8} />
            <CoinArt x={30} y={70} s={0.8} />
          </>
        );
      default:
        return <CoinArt x={80} y={60} s={2} />;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 160 100" fill="none" style={{ display: 'block' }}>
      {art()}
    </svg>
  );
};

/* ============ Background scenery per stage ============ */
export const StageBackdrop = ({ from, to, variant }) => (
  <svg
    viewBox="0 0 400 260"
    preserveAspectRatio="xMidYMax slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
  >
    <defs>
      <linearGradient id={`mpbg-${variant}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
    <rect width="400" height="260" fill={`url(#mpbg-${variant})`} />

    {variant === 1 && (
      <>
        <Cloud x={80} y={50} s={1} />
        <Cloud x={300} y={40} s={0.8} o={0.7} />
        <path d="M0 210 Q100 180 200 205 Q300 228 400 200 L400 260 L0 260 Z" fill="#A3E635" opacity="0.85" />
        <circle cx="40" cy="196" r="14" fill="#84CC16" />
        <rect x="37" y="204" width="6" height="14" rx="3" fill="#B45309" />
        <circle cx="356" cy="188" r="16" fill="#4ADE80" />
        <rect x="353" y="198" width="6" height="16" rx="3" fill="#B45309" />
        <circle cx="330" cy="52" r="24" fill="#FDE047" opacity="0.9" />
      </>
    )}
    {variant === 2 && (
      <>
        <Cloud x={110} y={46} s={0.9} />
        <Cloud x={280} y={60} s={0.7} o={0.6} />
        <path d="M0 214 L400 214 L400 260 L0 260 Z" fill="#94A3B8" opacity="0.5" />
        <path d="M20 214 L20 190 L60 190 L60 214 M80 214 L80 196 L118 196 L118 214 M140 214 L140 188 L178 188 L178 214" stroke="#64748B" strokeWidth="3" fill="#E2E8F0" />
        <path d="M230 214 L230 192 L268 192 L268 214 M290 214 L290 186 L330 186 L330 214 M350 214 L350 196 L386 196 L386 214" stroke="#64748B" strokeWidth="3" fill="#E2E8F0" />
      </>
    )}
    {(variant === 3 || variant === 4) && (
      <>
        <Cloud x={90} y={44} s={0.9} o={0.8} />
        <path d="M0 208 Q80 176 170 200 Q260 224 400 194 L400 260 L0 260 Z" fill="#34D399" opacity="0.8" />
        <path d="M60 196 C54 160 70 140 66 118 M100 200 C96 170 108 152 104 132" stroke="#16A34A" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="66" cy="112" r="18" fill="#22C55E" />
        <circle cx="104" cy="126" r="15" fill="#4ADE80" />
        <path d="M240 120 Q260 96 284 100 Q306 104 312 128" stroke="#60A5FA" strokeWidth="4" fill="none" opacity="0.7" />
      </>
    )}
    {variant === 5 && (
      <>
        <path d="M0 260 L60 120 Q100 84 150 116 L200 92 L250 120 Q300 88 340 120 L400 260 Z" fill="#8B5CF6" opacity="0.55" />
        <path d="M0 260 L400 260 L400 220 Q300 196 200 216 Q100 236 0 212 Z" fill="#6D28D9" opacity="0.5" />
        <Sparkle x={70} y={70} s={1.1} c="#C4B5FD" />
        <Sparkle x={300} y={56} s={0.9} c="#DDD6FE" />
        <Sparkle x={200} y={120} s={0.8} c="#C4B5FD" />
      </>
    )}
    {variant === 6 && (
      <>
        <rect x="120" y="90" width="160" height="130" rx="8" fill="#FCD34D" opacity="0.85" />
        <path d="M104 92 L200 30 L296 92 Z" fill="#F59E0B" />
        <path d="M164 140 L164 220 L200 220 L200 140 Z" fill="#B45309" opacity="0.7" />
        <rect x="136" y="120" width="22" height="22" rx="3" fill="#FEF3C7" />
        <rect x="242" y="120" width="22" height="22" rx="3" fill="#FEF3C7" />
        <rect x="136" y="160" width="22" height="22" rx="3" fill="#FEF3C7" />
        <rect x="242" y="160" width="22" height="22" rx="3" fill="#FEF3C7" />
        <Sparkle x={60} y={60} s={1.2} />
        <Sparkle x={340} y={70} s={1} />
        <Sparkle x={310} y={140} s={0.8} />
      </>
    )}
  </svg>
);

/* ============ Path map node ============ */
export const MapNode = ({ x, y, r = 26, color = '#FFC244', done, current, locked, children }) => (
  <g transform={`translate(${x},${y})`}>
    {current && <circle r={r + 9} fill="none" stroke={color} strokeWidth="3" opacity="0.45" strokeDasharray="6 6" />}
    <circle r={r} fill={locked ? '#E2E8F0' : color} stroke={locked ? '#CBD5E1' : '#fff'} strokeWidth="4" />
    {children}
    {done && (
      <g transform="translate(0,-r-4)">
        <circle r="10" fill="#10B981" stroke="#fff" strokeWidth="2.5" />
        <path d="M-4 0 L-1 3.4 L4.6 -3.6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )}
    {locked && (
      <g transform="translate(0,0)">
        <rect x="-7" y="-4" width="14" height="11" rx="2.5" fill="#94A3B8" />
        <path d="M-4 -4 L-4 -8 Q0 -12 4 -8 L4 -4" stroke="#94A3B8" strokeWidth="2.6" fill="none" />
      </g>
    )}
  </g>
);

/* ============ Small honey pot (the bee's piggy bank!) ============ */
export const HoneyPotArt = ({ x = 0, y = 0, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-14 0 Q-16 14 -12 18 Q0 24 12 18 Q16 14 14 0 Q0 -5 -14 0 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
    <ellipse cx="0" cy="-1" rx="15" ry="5" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
    <path d="M-8 8 Q0 12 8 8" stroke="#FDE68A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <rect x="-6" y="-13" width="12" height="5" rx="2" fill="#B45309" />
    <path d="M0 -13 L0 -18" stroke="#B45309" strokeWidth="1.8" />
  </g>
);

/* ============ Kiddo bee HOLDING a honey pot (map buddy) ============ */
export const BeeHoney = ({ size = 100, mood = 'happy' }) => {
  const mouth =
    mood === 'sad'
      ? 'M40 52 Q46 47 52 52'
      : 'M39 48 Q46 55 53 48';
  return (
    <svg width={size} height={size} viewBox="0 0 110 100" fill="none" style={{ display: 'block' }}>
      {/* wings */}
      <ellipse cx="26" cy="28" rx="13" ry="19" fill="#FFFFFF" opacity="0.85" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(-24 26 28)" />
      <ellipse cx="66" cy="28" rx="13" ry="19" fill="#FFFFFF" opacity="0.85" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(24 66 28)" />
      {/* antennae */}
      <path d="M36 18 Q32 9 26 7" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M54 18 Q58 9 64 7" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="7" r="3.6" fill="#FFC244" stroke="#1E293B" strokeWidth="1.4" />
      <circle cx="65" cy="7" r="3.6" fill="#FFC244" stroke="#1E293B" strokeWidth="1.4" />
      {/* body */}
      <ellipse cx="45" cy="48" rx="28" ry="30" fill="#FFC244" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M22 60 Q45 70 68 60 L68 68 Q45 78 22 68 Z" fill="#1E293B" />
      {/* face */}
      <circle cx="45" cy="38" r="17" fill="#FFE08A" />
      <circle cx="38" cy="36" r="5" fill="#1E293B" />
      <circle cx="52" cy="36" r="5" fill="#1E293B" />
      <circle cx="39.6" cy="34.4" r="1.6" fill="#fff" />
      <circle cx="53.6" cy="34.4" r="1.6" fill="#fff" />
      <circle cx="32" cy="43" r="2.8" fill="#FB923C" opacity="0.65" />
      <circle cx="58" cy="43" r="2.8" fill="#FB923C" opacity="0.65" />
      <path d={mouth} stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* little arm holding the jar */}
      <path d="M66 52 Q78 54 82 60" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M24 52 Q16 56 14 62" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* honey jar in hand */}
      <HoneyPotArt x={90} y={66} s={0.9} />
      {/* sting */}
      <path d="M45 78 L41 88 L49 88 Z" fill="#1E293B" />
    </svg>
  );
};

/* ============ Per-stage mini art for the map page ============ */
export const MapStageArt = ({ kind, size = 56 }) => {
  const art = () => {
    switch (kind) {
      case 'farm': // مزرعه شیرین — sunny farm
        return (
          <>
            <circle cx="92" cy="22" r="11" fill="#FDE047" />
            <circle cx="92" cy="22" r="11" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
            <path d="M28 62 L50 36 L72 62 Z" fill="#F8B26A" stroke="#E8A85C" strokeWidth="2.4" strokeLinejoin="round" />
            <rect x="36" y="62" width="28" height="18" rx="2" fill="#FFF1DB" stroke="#E8A85C" strokeWidth="2.4" />
            <path d="M84 80 L96 62 L108 80 Z" fill="#84CC16" opacity="0.9" />
            <rect x="87" y="80" width="6" height="8" rx="2" fill="#B45309" />
            <path d="M18 80 Q30 72 42 80" stroke="#A3E635" strokeWidth="5" fill="none" strokeLinecap="round" />
            <HoneyPotArt x={104} y={84} s={0.8} />
          </>
        );
      case 'market': // بازار شهر — market tent + toy
        return (
          <>
            <path d="M20 52 L26 36 L98 36 L104 52 Q104 60 96 60 Q88 60 88 52 Q88 60 78 60 Q70 60 70 52 Q70 60 60 60 Q52 60 52 52 Q52 60 42 60 Q34 60 34 52 Q34 58 24 58 Q16 58 20 52 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2.2" />
            <rect x="30" y="58" width="64" height="26" rx="3" fill="#FFF7ED" stroke="#DB2777" strokeWidth="2.2" />
            <rect x="38" y="66" width="14" height="12" rx="2" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.4" />
            <rect x="70" y="66" width="16" height="14" rx="6" fill="#F87171" stroke="#DC2626" strokeWidth="1.6" />
            <Sparkle x={110} y={44} s={0.8} c="#F9A8D4" />
            <CoinArt x={16} y={86} s={0.75} />
            <CoinArt x={104} y={88} s={0.7} />
          </>
        );
      case 'waterfall': // کنار آبشار — waterfall + piggy bank
        return (
          <>
            <path d="M52 22 Q66 18 80 22 L76 30 L56 30 Z" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2" />
            <path d="M58 30 L54 72 Q64 78 74 72 L70 30 Z" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
            <path d="M50 74 Q64 82 78 74" stroke="#38BDF8" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="46" cy="82" rx="7" ry="3" fill="#BAE6FD" />
            <ellipse cx="82" cy="84" rx="6" ry="3" fill="#BAE6FD" />
            <Sparkle x={38} y={40} s={0.7} c="#7DD3FC" />
            <ellipse cx="100" cy="72" rx="18" ry="14" fill="#F9A8D4" stroke="#DB2777" strokeWidth="2.2" />
            <rect x="96" y="62" width="8" height="3" rx="1.5" fill="#DB2777" />
            <CoinArt x={100} y={56} s={0.7} />
          </>
        );
      case 'jungle': // جنگل عجیب — jungle trees + door
        return (
          <>
            <circle cx="36" cy="44" r="16" fill="#22C55E" />
            <rect x="33" y="58" width="6" height="16" rx="2.5" fill="#B45309" />
            <circle cx="70" cy="34" r="13" fill="#4ADE80" />
            <rect x="67" y="46" width="6" height="12" rx="2.5" fill="#B45309" />
            <rect x="86" y="48" width="22" height="34" rx="4" fill="#FCD34D" stroke="#B45309" strokeWidth="2.2" />
            <circle cx="102" cy="66" r="2.4" fill="#B45309" />
            <Sparkle x={92} y={38} s={0.8} c="#BBF7D0" />
            <path d="M16 82 Q30 74 44 82" stroke="#16A34A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M58 84 Q72 76 86 84" stroke="#16A34A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </>
        );
      case 'crystal': // غار بلورین — crystals + warning
        return (
          <>
            <path d="M40 82 L30 44 L44 30 L54 48 L48 82 Z" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M58 82 L54 54 L64 42 L74 58 L70 82 Z" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2.2" strokeLinejoin="round" />
            <Sparkle x={44} y={22} s={0.8} c="#DDD6FE" />
            <Sparkle x={78} y={34} s={0.7} c="#DDD6FE" />
            <CoinArt x={22} y={84} s={0.7} />
            <CoinArt x={88} y={86} s={0.65} />
            <path d="M92 20 L104 38" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            <path d="M104 20 L92 38" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'castle': // قلعه طلایی — castle + crown
        return (
          <>
            <rect x="44" y="46" width="36" height="38" rx="3" fill="#FCD34D" stroke="#B45309" strokeWidth="2.4" />
            <path d="M38 46 L38 34 L48 34 L48 40 L56 40 L56 34 L68 34 L68 40 L76 40 L76 34 L86 34 L86 46 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.4" />
            <path d="M56 84 L56 66 Q62 60 68 66 L68 84 Z" fill="#B45309" opacity="0.85" />
            <path d="M92 74 L92 58 L99 65 L106 52 L113 65 L120 58 L120 74 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="2" />
            <circle cx="106" cy="67" r="2.4" fill="#EF4444" />
            <Sparkle x={28} y={30} s={0.9} c="#FBBF24" />
            <Sparkle x={118} y={36} s={0.7} c="#FBBF24" />
          </>
        );
      default:
        return <CoinArt x={62} y={56} s={1.6} />;
    }
  };
  return (
    <svg width={size} height={size * (100 / 124)} viewBox="0 0 124 100" fill="none" style={{ display: 'block' }}>
      {art()}
    </svg>
  );
};
