import React from 'react';
import greeceOutline from '../assets/greece-outline.svg';
import './PrincipleIcons.css';

const INK = '#141413';
const INK_SOFT = 'rgba(20, 20, 19, 0.38)';
const ORANGE = '#d97757';
const GREEN = '#5a8a62';

export const PrincipleHumanIcon = ({ className = '' }) => (
  <svg className={`pi-svg ${className}`} viewBox="0 0 80 88" fill="none" aria-hidden="true">
    <g className="pi-human-supported">
      <circle cx="52" cy="18" r="7.2" stroke={INK} strokeWidth="1.5" />
      <path d="M52 25.5v22" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 34 L62 46" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 47.5 L44 68" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 47.5 L60 67" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <g className="pi-human-caregiver">
      <circle cx="28" cy="16" r="8" stroke={INK} strokeWidth="1.5" />
      <path d="M28 24.2v24" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 34 L16 48" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 48.2 L20 72" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 48.2 L38 71" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <path
      className="pi-human-link"
      d="M28 34 L40 40 L52 34"
      stroke={ORANGE}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 74 Q40 80 66 74" stroke={INK_SOFT} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const PrincipleShieldIcon = ({ className = '' }) => (
  <svg className={`pi-svg ${className}`} viewBox="0 0 80 88" fill="none" aria-hidden="true">
    {/* Notepad */}
    <rect
      x="14"
      y="18"
      width="42"
      height="54"
      rx="3.5"
      fill="rgba(20, 20, 19, 0.04)"
      stroke={INK}
      strokeWidth="1.5"
    />
    <path d="M22 18 V12.5" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M35 18 V12.5" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M48 18 V12.5" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 28 H50" stroke={INK_SOFT} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M32 38 H50" stroke={INK_SOFT} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M32 48 H42" stroke={INK_SOFT} strokeWidth="1.2" strokeLinecap="round" />

    {/* Checklist ticks */}
    <path d="M20 25.5 L23.2 29.2 L29.5 21.5" stroke={ORANGE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 35.5 L23.2 39.2 L29.5 31.5" stroke={ORANGE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 45.5 L23.2 49.2 L29.5 41.5" stroke={ORANGE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />

    {/* Lock over the corner */}
    <rect
      x="42"
      y="56"
      width="24"
      height="20"
      rx="3.5"
      fill="#faf9f5"
      stroke={INK}
      strokeWidth="1.55"
    />
    <path
      d="M48 56 V50.5 a6 6 0 0 1 12 0 V56"
      stroke={INK}
      strokeWidth="1.55"
      strokeLinecap="round"
    />
    <circle cx="54" cy="65" r="2" fill={INK} />
    <path d="M54 67 v4" stroke={INK} strokeWidth="1.45" strokeLinecap="round" />
  </svg>
);

export const PrincipleLeafIcon = ({ className = '' }) => (
  <svg className={`pi-svg pi-plant ${className}`} viewBox="0 0 80 88" fill="none" aria-hidden="true">
    <path d="M18 74 Q40 80 62 74" stroke={INK_SOFT} strokeWidth="1.3" strokeLinecap="round" />
    <path
      className="pi-plant-stem"
      d="M40 74 V28"
      stroke={GREEN}
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      className="pi-plant-leaf pi-plant-leaf--l"
      d="M40 52 C26 50 20 38 24 28 C36 32 42 42 40 52Z"
      fill="rgba(90, 138, 98, 0.16)"
      stroke={GREEN}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      className="pi-plant-leaf pi-plant-leaf--r"
      d="M40 44 C54 40 62 30 58 20 C46 26 40 36 40 44Z"
      fill="rgba(90, 138, 98, 0.22)"
      stroke={GREEN}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      className="pi-plant-sprout"
      d="M40 28 C36 22 34 16 36 12 C40 16 42 22 40 28Z"
      fill="rgba(217, 119, 87, 0.18)"
      stroke={ORANGE}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

export const PrincipleGreeceIcon = ({ className = '' }) => (
  <img
    src={greeceOutline}
    alt=""
    className={`pi-greece-img ${className}`}
    aria-hidden="true"
  />
);

const ICONS_BY_NUM = {
  '01': PrincipleHumanIcon,
  '02': PrincipleShieldIcon,
  '03': PrincipleLeafIcon,
  '04': PrincipleGreeceIcon,
};

export const PrincipleIcon = ({ num, className = '' }) => {
  const Icon = ICONS_BY_NUM[num];
  if (!Icon) return null;
  return <Icon className={className} />;
};

export default PrincipleIcon;
