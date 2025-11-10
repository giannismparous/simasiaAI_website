import React from 'react';
import './ProductAnimations.css';

// Map HTML colors to website CSS variables
const colors = {
  teal: 'var(--primary-warm)', // #2C7A7B
  coral: 'var(--accent-warm)',  // #E07A5F
  mint: '#9CC7BD', // Keep mint as is
  charcoal: 'var(--dark-text)', // #111111
};

export const ChatbotsAnimation = ({ logoStyle = false }) => (
  <div className={logoStyle ? "product-animation-logo" : "product-animation-container"} role="img" aria-label="Speech bubble with human profile, safety shield and language globe; subtle halo and animated check">
    <svg viewBox="0 0 512 512" aria-hidden="true">
      <defs>
        <style>{`.w14{stroke-width:14}`}</style>
      </defs>
      {/* Halo */}
      <ellipse fill="none" cx="256" cy="86" rx="108" ry="22" style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round', animation: 'pulse 3.5s ease-in-out infinite' }} />
      {/* Bubble */}
      <path fill="none" d="M110 132 h292 a84 84 0 0 1 0 168 h-60 l-36 28 v-28 h-196 a84 84 0 0 1 0 -168 z" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      {/* Human */}
      <circle fill="none" cx="230" cy="216" r="24" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <path fill="none" d="M202 274 c10 -28 34 -44 56 -44 s46 16 56 44" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      {/* Shield + check */}
      <path fill="none" d="M330 174 l72 24 v64 c0 46 -30 76 -72 92 c-42 -16 -72 -46 -72 -92 v-64 z" style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <path fill="none" d="M320 236 l20 20 l36 -42" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: '120', strokeDashoffset: '120', animation: 'draw 1.8s ease forwards 0.6s' }} />
      {/* Language globe */}
      <g transform="translate(76,86)">
        <circle fill="none" style={{ stroke: colors.teal, strokeWidth: 10, strokeLinecap: 'round', strokeLinejoin: 'round' }} cx="64" cy="0" r="26" />
        <path fill="none" style={{ stroke: colors.teal, strokeWidth: 10, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="M38 0 h52" />
        <path fill="none" style={{ stroke: colors.teal, strokeWidth: 10, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="M64 -24 a24 24 0 0 1 0 48 a24 24 0 0 1 0 -48" />
        <text x="52" y="6" style={{ font: '700 16px system-ui', fill: colors.teal }}>A</text>
        <text x="66" y="-6" style={{ font: '700 16px system-ui', fill: colors.teal }}>文</text>
      </g>
      {/* Bridge nodes */}
      <path fill="none" d="M52 392 C152 356, 210 408, 256 396 C304 384, 356 366, 460 396" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <circle style={{ fill: colors.mint, stroke: colors.coral, strokeWidth: 10, animation: 'pop 0.9s ease forwards' }} cx="120" cy="374" r="12" />
      <circle style={{ fill: colors.mint, stroke: colors.coral, strokeWidth: 10, animation: 'pop 1.1s ease 0.1s forwards' }} cx="208" cy="388" r="12" />
      <circle style={{ fill: colors.mint, stroke: colors.coral, strokeWidth: 10, animation: 'pop 1.1s ease 0.2s forwards' }} cx="320" cy="376" r="12" />
      <circle style={{ fill: colors.mint, stroke: colors.coral, strokeWidth: 10, animation: 'pop 1.1s ease 0.3s forwards' }} cx="408" cy="392" r="12" />
    </svg>
  </div>
);

export const StudioAnimation = ({ logoStyle = false }) => (
  <div className={logoStyle ? "product-animation-logo" : "product-animation-container"} role="img" aria-label="Document with lines, I-beam cursor and pencil underline; animated highlight sweep and check for accuracy">
    <svg viewBox="0 0 512 512" aria-hidden="true">
      {/* Document */}
      <rect x="96" y="96" width="248" height="296" rx="18" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      {/* Paragraph lines */}
      <g style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="120" y1="168" x2="316" y2="168" />
        <line x1="120" y1="204" x2="316" y2="204" />
        <line x1="120" y1="240" x2="276" y2="240" />
        <line x1="120" y1="276" x2="316" y2="276" />
      </g>
      {/* Sweep highlight */}
      <rect className="sweep" x="110" y="157" width="120" height="14" rx="7" style={{ fill: colors.coral, opacity: 0.15, filter: 'blur(0.2px)', animation: 'sweep 2.2s ease-in-out infinite' }} />
      {/* I-beam cursor */}
      <g style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="372" y1="148" x2="372" y2="340" />
        <line x1="344" y1="164" x2="400" y2="164" />
        <line x1="344" y1="324" x2="400" y2="324" />
      </g>
      {/* Pencil underline */}
      <line x1="120" y1="296" x2="300" y2="296" fill="none" style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round', animation: 'draw 1.6s ease forwards' }} />
      {/* Shield check for QA */}
      <path fill="none" style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="M364 300 l72 24 v64 c0 50 -34 82 -72 96 c-38 -14 -72 -46 -72 -96 v-64 z" />
      <path fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: '120', strokeDashoffset: '120', animation: 'draw 1.4s ease forwards 0.4s' }} d="M354 362 l20 20 l34 -40" />
    </svg>
  </div>
);

export const DailyAnimation = ({ logoStyle = false }) => (
  <div className={logoStyle ? "product-animation-logo" : "product-animation-container"} role="img" aria-label="Calendar with rotating gear and spark; bottom bridge nodes">
    <svg viewBox="0 0 512 512" aria-hidden="true">
      {/* Calendar frame */}
      <rect x="96" y="120" width="320" height="260" rx="24" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <line x1="96" y1="184" x2="416" y2="184" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      {/* Gear */}
      <g transform="translate(256,300)" style={{ transformOrigin: '256px 300px' }}>
        <circle r="42" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
        <circle r="12" fill="none" style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
        <g className="gear" style={{ animation: 'gear 5s linear infinite', transformOrigin: '256px 300px' }}>
          <line x1="0" y1="-62" x2="0" y2="-44" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
          <line x1="0" y1="44" x2="0" y2="62" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
          <line x1="-62" y1="0" x2="-44" y2="0" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
          <line x1="44" y1="0" x2="62" y2="0" fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
        </g>
      </g>
      {/* Spark */}
      <g style={{ animation: 'blink 2.6s ease-in-out infinite 0.6s' }}>
        <path fill="none" style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="M388 212 l14 -8 l-8 -14 l14 -8 l8 14 l14 -8 l8 14 l-14 8 l8 14 l-14 8 l-8 -14 l-14 8 z" />
      </g>
      {/* Bridge */}
      <path fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="M64 404 C160 372, 200 420, 256 408 C312 396, 340 372, 448 408" />
      <circle cx="120" cy="392" r="12" style={{ fill: colors.mint }} />
      <circle cx="208" cy="408" r="12" style={{ fill: colors.mint }} />
      <circle cx="304" cy="400" r="12" style={{ fill: colors.mint }} />
      <circle cx="392" cy="404" r="12" style={{ fill: colors.mint }} />
    </svg>
  </div>
);

export const EduAnimation = ({ logoStyle = false }) => (
  <div className={logoStyle ? "product-animation-logo" : "product-animation-container"} role="img" aria-label="Open book with center fold, animated checkmarks and a page-swipe highlight">
    <svg viewBox="0 0 512 512" aria-hidden="true">
      {/* Open book */}
      <path fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="M96 168 c64 -24 128 0 160 24 c32 -24 96 -48 160 -24 v192 c-64 -24 -128 0 -160 24 c-32 -24 -96 -48 -160 -24 z" />
      {/* Center fold */}
      <line x1="256" y1="192" x2="256" y2="376" fill="none" style={{ stroke: colors.coral, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      {/* Check marks */}
      <path fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: '120', strokeDashoffset: '120', animation: 'draw 1.2s ease forwards 0.2s' }} d="M142 236 l18 18 l30 -36" />
      <path fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: '120', strokeDashoffset: '120', animation: 'draw 1.2s ease forwards 0.7s' }} d="M142 292 l18 18 l30 -36" />
      {/* Page swipe highlight */}
      <rect x="280" y="208" width="120" height="14" rx="7" style={{ fill: colors.coral, opacity: 0.16, animation: 'sweep 2.4s ease-in-out infinite 0.4s' }} />
      {/* Bridge */}
      <path fill="none" style={{ stroke: colors.teal, strokeWidth: 14, strokeLinecap: 'round', strokeLinejoin: 'round' }} d="M64 420 C170 380, 226 430, 256 424 C290 418, 332 398, 448 420" />
      <circle cx="116" cy="408" r="12" style={{ fill: colors.mint }} />
      <circle cx="208" cy="424" r="12" style={{ fill: colors.mint }} />
      <circle cx="320" cy="412" r="12" style={{ fill: colors.mint }} />
      <circle cx="404" cy="420" r="12" style={{ fill: colors.mint }} />
    </svg>
  </div>
);

