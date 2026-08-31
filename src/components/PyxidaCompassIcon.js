import React from 'react';

const INK = '#141413';

/**
 * Comic Pyxida compass — interior ink only (face, needle, hub, ticks). No outer ring.
 */
const PyxidaCompassIcon = ({ className = '', idSuffix = 'icon', needleRotate = -22, size }) => {
  const uid = `pyxida-comic-${idSuffix}`;
  const sizeStyle = size ? { width: size, height: size, display: 'block' } : undefined;

  const ticks = [0, 90, 180, 270].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const x1 = 60 + Math.sin(rad) * 38;
    const y1 = 60 - Math.cos(rad) * 38;
    const x2 = 60 + Math.sin(rad) * 47;
    const y2 = 60 - Math.cos(rad) * 47;
    return { deg, x1, y1, x2, y2 };
  });

  return (
    <svg
      className={className}
      style={sizeStyle}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${uid}-shine`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Face — interior outline only */}
      <circle cx="60" cy="60" r="44" fill="#dce8f7" stroke={INK} strokeWidth="2" />

      <circle
        cx="60"
        cy="60"
        r="34"
        fill="none"
        stroke="#6a9bcc"
        strokeWidth="1.6"
        strokeDasharray="6 5"
        strokeLinecap="round"
        opacity="0.5"
      />

      <ellipse cx="46" cy="44" rx="13" ry="9" fill={`url(#${uid}-shine)`} opacity="0.8" />

      {ticks.map(({ deg, x1, y1, x2, y2 }) => (
        <line
          key={deg}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={INK}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}

      <g transform={`rotate(${needleRotate} 60 60)`}>
        <path
          d="M60 24 L67 60 L53 60 Z"
          fill="#2d5a8a"
          stroke={INK}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M60 96 L67 60 L53 60 Z"
          fill="#8eb8e8"
          stroke={INK}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </g>

      <circle cx="60" cy="60" r="8" fill="#4a7ab5" stroke={INK} strokeWidth="1.8" />
      <circle cx="60" cy="60" r="3.5" fill="#fff" stroke={INK} strokeWidth="1.2" />

      <text
        x="60"
        y="35"
        textAnchor="middle"
        fill={INK}
        fontFamily="var(--font-sans, Inter, sans-serif)"
        fontSize="10"
        fontWeight="800"
        letterSpacing="0.04em"
      >
        N
      </text>
    </svg>
  );
};

export default PyxidaCompassIcon;
