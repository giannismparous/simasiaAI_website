import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './HeroCareVisual.css';

const STROKE = 'rgba(250, 249, 245, 0.38)';
const STROKE_SOFT = 'rgba(250, 249, 245, 0.18)';

const CONNECTION = { x: 112, y: 88 };

const mix = (a, b, t) => a + (b - a) * t;

const mixStroke = (t) => {
  const r = Math.round(mix(250, 217, t));
  const g = Math.round(mix(249, 119, t));
  const b = Math.round(mix(245, 87, t));
  const a = mix(0.38, 0.88, t);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const mixGroundStroke = (t) => {
  const r = Math.round(mix(250, 217, t));
  const g = Math.round(mix(249, 119, t));
  const b = Math.round(mix(245, 87, t));
  const a = mix(0.18, 0.62, t);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const HeroCareVisual = ({ className = '' }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const spring = useSpring(0, { stiffness: 78, damping: 22, mass: 0.5 });

  const [render, setRender] = useState({
    caregiverHandX: 100,
    caregiverHandY: 92,
    supportedHandX: 120,
    supportedHandY: 104,
    linkStroke: STROKE,
    linkWidth: 1.2,
    groundStroke: STROKE_SOFT,
    groundWidth: 1,
  });

  useEffect(() => {
    return spring.on('change', (p) => {
      setRender({
        caregiverHandX: mix(100, CONNECTION.x, p),
        caregiverHandY: mix(92, CONNECTION.y, p),
        supportedHandX: mix(120, CONNECTION.x, p),
        supportedHandY: mix(104, CONNECTION.y, p),
        linkStroke: mixStroke(p),
        linkWidth: mix(1.2, 1.45, p),
        groundStroke: mixGroundStroke(p),
        groundWidth: mix(1, 1.35, p),
      });
    });
  }, [spring]);

  const handleEnter = () => spring.set(1);
  const handleLeave = () => spring.set(0);

  return (
    <motion.div
      ref={containerRef}
      className={`fh-care-visual${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={t('forbesHero.careVisualAlt')}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 220 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="fh-care-svg">
        <circle cx="28" cy="42" r="1.2" fill={STROKE_SOFT} className="fh-care-star" />
        <circle cx="196" cy="58" r="1" fill={STROKE_SOFT} className="fh-care-star fh-care-star--delay" />
        <circle cx="182" cy="248" r="1.3" fill={STROKE_SOFT} className="fh-care-star fh-care-star--delay2" />
        <circle cx="36" cy="210" r="0.9" fill={STROKE_SOFT} />

        <g className="fh-care-person fh-care-person--supported">
          <circle cx="138" cy="52" r="13" stroke={STROKE} strokeWidth="1.2" />
          <path d="M138 65v52" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
          <path
            d={`M138 82 L${render.supportedHandX} ${render.supportedHandY}`}
            stroke={render.linkStroke}
            strokeWidth={render.linkWidth}
            strokeLinecap="round"
            className="fh-care-hand"
          />
          <path d="M138 82 L152 104" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M138 117 L124 168" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M138 117 L152 166" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
        </g>

        <g className="fh-care-person fh-care-person--caregiver">
          <circle cx="78" cy="44" r="14" stroke={STROKE} strokeWidth="1.2" />
          <path d="M78 58v58" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M78 76 L58 102" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
          <path
            d={`M78 76 L${render.caregiverHandX} ${render.caregiverHandY}`}
            stroke={render.linkStroke}
            strokeWidth={render.linkWidth}
            strokeLinecap="round"
            className="fh-care-hand"
          />
          <path d="M78 116 L64 176" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M78 116 L94 174" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
        </g>

        <path
          d="M48 176 Q110 184 172 176"
          stroke={render.groundStroke}
          strokeWidth={render.groundWidth}
          strokeLinecap="round"
          className="fh-care-ground"
        />
      </svg>
    </motion.div>
  );
};

export default HeroCareVisual;
