import React from 'react';

const SimakiAvatar = ({ size = 32, className = '' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <rect width="32" height="32" rx="8" fill="#d97757" />
    <circle cx="16" cy="14" r="7.5" fill="#fff5f0" />
    <circle cx="13" cy="13" r="1.35" fill="#141413" />
    <circle cx="19" cy="13" r="1.35" fill="#141413" />
    <circle cx="13.4" cy="12.6" r="0.4" fill="#fff" />
    <circle cx="19.4" cy="12.6" r="0.4" fill="#fff" />
    <path d="M12.5 16.5C14 18.2 18 18.2 19.5 16.5" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="11" cy="15" r="1.1" fill="#f4b8a4" opacity="0.7" />
    <circle cx="21" cy="15" r="1.1" fill="#f4b8a4" opacity="0.7" />
    <path d="M22 8.5L23.2 6.8L24.8 8.2" stroke="#fff5f0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SimakiAvatar;
