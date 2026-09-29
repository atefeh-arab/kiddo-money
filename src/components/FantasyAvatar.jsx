import React from 'react';

export default function FantasyAvatar({ size = 48, variant = 'hero' }) {
  // SVG vector illustration of a fantasy cute kid hero (Glovo friendly, no emojis)
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: '50%' }}
    >
      <circle cx="50" cy="50" r="48" fill="#FFF8E7" stroke="#FFC244" strokeWidth="4" />
      
      {/* Little fantasy cape / collar */}
      <path d="M26 82 C34 68 66 68 74 82 C68 92 32 92 26 82 Z" fill="#00A082" />
      
      {/* Face */}
      <circle cx="50" cy="52" r="28" fill="#FDE68A" />
      
      {/* Fantasy Hero Hair (Teal / Amber stylized) */}
      <path 
        d="M26 44 C26 24 40 16 50 16 C60 16 74 24 74 44 C68 38 60 36 50 36 C40 36 32 38 26 44 Z" 
        fill="#0A3631" 
      />
      <path d="M42 22 C46 16 54 16 58 22 C52 20 48 20 42 22 Z" fill="#FFC244" />

      {/* Hero Headband */}
      <path d="M24 46 C32 40 68 40 76 46 L75 50 C67 44 33 44 25 50 Z" fill="#FFC244" />
      <circle cx="50" cy="46" r="4" fill="#00A082" stroke="#FFF" strokeWidth="1.5" />

      {/* Eyes with cheerful spark */}
      <circle cx="41" cy="55" r="3.5" fill="#1E293B" />
      <circle cx="42" cy="54" r="1.2" fill="#FFFFFF" />
      
      <circle cx="59" cy="55" r="3.5" fill="#1E293B" />
      <circle cx="60" cy="54" r="1.2" fill="#FFFFFF" />

      {/* Rosy cheeks */}
      <circle cx="36" cy="61" r="3" fill="#FCA5A5" opacity="0.6" />
      <circle cx="64" cy="61" r="3" fill="#FCA5A5" opacity="0.6" />

      {/* Cute Smile */}
      <path d="M45 64 Q50 69 55 64" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
