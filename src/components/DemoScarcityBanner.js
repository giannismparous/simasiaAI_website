import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { formatScarcityNote } from '../utils/scarcityCopy';
import './DemoScarcityBanner.css';

export { formatScarcityNote } from '../utils/scarcityCopy';

export default function DemoScarcityBanner({ className = '' }) {
  const { t } = useTranslation();
  const text = formatScarcityNote(t);
  if (!text) return null;
  return (
    <p className={`demo-scarcity-banner${className ? ` ${className}` : ''}`}>
      {text}
    </p>
  );
}

export function DemoCtaStack({ className = '', children }) {
  return (
    <div className={`demo-cta-stack${className ? ` ${className}` : ''}`}>
      <DemoScarcityBanner />
      {children}
    </div>
  );
}
