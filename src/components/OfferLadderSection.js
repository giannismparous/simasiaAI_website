import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, easeInOut } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { useBillingPreference } from '../contexts/BillingPreferenceContext';
import { formatEuroSuffix } from '../utils/formatEuro';
import DemoScarcityBanner from './DemoScarcityBanner';
import PageHeroBackdrop from './PageHeroBackdrop';
import { ProductVisualLanguageProvider } from '../contexts/ProductVisualLanguageContext';
import ModuleVisual, { VisualStage, PyxidaSceneVisual } from './PyxidaProductVisuals';
import './DemoScarcityBanner.css';
import './OfferLadderSection.css';

const MOBILE_OFFER_MQ = '(max-width: 960px)';

const useCompactOfferPanels = () => {
  const getMatch = () =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_OFFER_MQ).matches;

  const [compact, setCompact] = useState(getMatch);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_OFFER_MQ);
    const onChange = (event) => setCompact(event.matches);
    setCompact(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return compact;
};

const ease = [0.16, 1, 0.3, 1];
const SCENE_CROSSFADE = 0.024;
const CONTENT_REVEAL = 0.36; // stagger content in first 36% of each scene; rest is hold
const INTRO_CONTENT_REVEAL = 0.26;
const OFFER_CONTENT_REVEAL = 0.58; // offer scene needs more scroll room for long bullet lists + tail exit
const scrollEase = easeInOut;
const PYXIDA_FEAT_START = 0.11;
const PYXIDA_FEAT_END = 0.44;

const JOURNEY = {
  intro: [0, PYXIDA_FEAT_START],
  pyxidaOffer: [0.44, 0.785],
  lead: [0.796, 0.844],
  modKleinei: [0.844, 0.894],
  modules: [
    [0.894, 0.956],
    [0.956, 1.0],
  ],
};

const LEAD_MODULE_CROSSFADE = 0.014;

const LEAD_START = JOURNEY.lead[0];
const LEAD_END = JOURNEY.lead[1];
const PRAXI_MODULE_START = JOURNEY.modKleinei[0];
const PYXIDA_OFFER_START = JOURNEY.pyxidaOffer[0];
const PYXIDA_OFFER_END = JOURNEY.pyxidaOffer[1];

const getPyxidaFeatureRanges = (sceneCount) => {
  const span = (PYXIDA_FEAT_END - PYXIDA_FEAT_START) / Math.max(sceneCount, 1);
  return Array.from({ length: sceneCount }, (_, i) => [
    PYXIDA_FEAT_START + i * span,
    PYXIDA_FEAT_START + (i + 1) * span,
  ]);
};

/** Map step index → [fadeIn, fadeOut] scroll keys inside a scene window */
const sceneStep = (start, end, step, totalSteps, revealRatio = CONTENT_REVEAL) => {
  const span = end - start;
  const revealSpan = span * revealRatio;
  const slot = revealSpan / Math.max(totalSteps, 1);
  const fadeIn = start + step * slot;
  const fadeOut = fadeIn + slot * 0.92;
  return [fadeIn, fadeOut];
};
const towerSpring = { type: 'spring', stiffness: 280, damping: 26, mass: 0.82 };
const badgeSpring = { type: 'spring', stiffness: 420, damping: 22, delay: 0.06 };

const JOURNEY_NAV_OFFSET = 101;

const scrollToJourneyProgress = (journeyEl, progress, offset = JOURNEY_NAV_OFFSET) => {
  if (!journeyEl) return;
  const journeyTop = journeyEl.getBoundingClientRect().top + window.scrollY;
  const scrollSpan = Math.max(journeyEl.offsetHeight - window.innerHeight, 1);
  const clamped = Math.min(1, Math.max(0, progress));
  const target = journeyTop - offset + scrollSpan * clamped;
  window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
};

const journeySceneCenter = (start, end) => start + (end - start) * 0.5;

const journeySceneEntry = (start, end, holdFactor = 0.5) =>
  start + (end - start) * CONTENT_REVEAL * holdFactor;

const getPyxidaScrollTarget = () => journeySceneCenter(...JOURNEY.intro);

const getModuleScrollTarget = (index) => {
  if (index === 0) return journeySceneCenter(...JOURNEY.modKleinei);
  if (JOURNEY.modules[index - 1]) return journeySceneCenter(...JOURNEY.modules[index - 1]);
  return null;
};

const sceneRange = (start, end) => ({
  fadeIn: start - SCENE_CROSSFADE,
  holdIn: start,
  holdOut: end - SCENE_CROSSFADE,
  fadeOut: end,
});

const BrandWordmark = ({ name, subtitle, variant = 'pyxida', size = 'hero' }) => (
  <div className={`ol-brand ol-brand--${variant} ol-brand--${size}`}>
    <span className="ol-brand-name">{name}</span>
    {subtitle && <span className="ol-brand-sub">{subtitle}</span>}
  </div>
);

const moduleIndexLabel = (prefix, index) => `${prefix || 'Module'} ${index + 1}`;

const CenterStackTower = ({ tiers, activeIndex, moduleIndexPrefix = 'Module', onChapterSelect }) => {
  const praxiTiers = tiers.filter((t) => t.productKind === 'praxi');
  return (
  <div className="ol-tower" aria-label="Product stack">
    <div className="ol-tower-track">
      {tiers.map((tier, index) => {
        const isPyxida = tier.productKind === 'pyxida';
        const isIncluded = index <= activeIndex;
        const isNew = index === activeIndex && index > 0;
        const isPast = isIncluded && index < activeIndex;
        const showPlusBadge = isNew;
        const praxiIndex = praxiTiers.findIndex((t) => t.id === tier.id);
        const handleSelect = () => {
          if (!onChapterSelect) return;
          if (isPyxida) onChapterSelect('pyxida');
          else onChapterSelect('module', praxiIndex);
        };

        return (
          <motion.button
            key={tier.id}
            type="button"
            layout
            className={`ol-tower-slab ol-tower-slab--${isPyxida ? 'pyxida' : 'praxi'}${isIncluded ? ' is-included' : ''}${isPast ? ' is-past' : ''}${isNew ? ' is-new' : ''}`}
            style={{
              '--tower-i': index,
              zIndex: isNew ? 120 + index : isIncluded ? 20 + index : index,
            }}
            initial={false}
            animate={{
              opacity: 1,
              y: isIncluded ? 0 : 6,
              scale: isIncluded ? (isNew ? 1.02 : 1) : 0.985,
            }}
            transition={towerSpring}
            onClick={handleSelect}
            aria-label={isPyxida ? 'Pyxida' : moduleIndexLabel(moduleIndexPrefix, praxiIndex)}
          >
            {isPyxida ? (
              <>
                <span className="ol-tower-slab-brand">Pyxida</span>
                <span className="ol-tower-slab-verb">{tier.verb}</span>
              </>
            ) : (
              <>
                <span className="ol-tower-slab-brand">{moduleIndexLabel(moduleIndexPrefix, praxiIndex)}</span>
                <span className="ol-tower-slab-verb">{tier.verb}</span>
                <span className="ol-tower-slab-sub">{tier.layerSub}</span>
              </>
            )}
            {showPlusBadge && (
              <span className="ol-tower-slab-new" aria-hidden="true">
                <motion.span
                  className="ol-tower-slab-new-ring"
                  initial={isNew ? { scale: 0, opacity: 0 } : false}
                  animate={{
                    scale: isNew ? 1 : 0.92,
                    opacity: isNew ? 1 : 0,
                  }}
                  transition={isNew ? badgeSpring : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className={`ol-tower-slab-new-glyph${isNew ? ' is-current' : ' is-past'}`}
                  initial={isNew ? { scale: 0, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: isNew ? 1 : 0.82 }}
                  transition={isNew ? badgeSpring : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  +
                </motion.span>
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
    <div className="ol-tower-base-shadow" aria-hidden="true" />
  </div>
  );
};

/** Crossfade handoff — next scene enters as previous exits, with a longer eased blend */
const useSceneMotion = (scrollYProgress, start, end, { flip = false, holdAtEnd = false } = {}) => {
  const { fadeIn, holdIn, holdOut, fadeOut } = sceneRange(start, end);
  const opacity = useTransform(
    scrollYProgress,
    holdAtEnd ? [fadeIn, holdIn, 1] : [fadeIn, holdIn, holdOut, fadeOut],
    holdAtEnd ? [0, 1, 1] : [0, 1, 1, 0],
    { ease: scrollEase }
  );
  const y = useTransform(
    scrollYProgress,
    holdAtEnd ? [fadeIn, holdIn, 1] : [fadeIn, holdIn, holdOut, fadeOut],
    holdAtEnd ? [10, 0, 0] : [10, 0, 0, -8],
    { ease: scrollEase }
  );
  const scale = useTransform(scrollYProgress, [fadeIn, holdIn], [0.99, 1], { ease: scrollEase });
  const copyX = useTransform(
    scrollYProgress,
    holdAtEnd ? [fadeIn, holdIn, 1] : [fadeIn, holdIn, holdOut, fadeOut],
    holdAtEnd
      ? [flip ? 16 : -16, 0, 0]
      : [flip ? 16 : -16, 0, 0, flip ? 8 : -8],
    { ease: scrollEase }
  );
  const visualX = useTransform(
    scrollYProgress,
    holdAtEnd ? [fadeIn, holdIn, 1] : [fadeIn, holdIn, holdOut, fadeOut],
    holdAtEnd
      ? [flip ? -16 : 16, 0, 0]
      : [flip ? -16 : 16, 0, 0, flip ? -8 : 8],
    { ease: scrollEase }
  );
  const visibility = useTransform(opacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));
  return { opacity, y, scale, copyX, visualX, visibility, fadeIn, holdIn };
};

/** Lead scene — enters only after the offer shell has fully exited */
const useLeadSceneMotion = (scrollYProgress, start, end) => {
  const fadeIn = start + SCENE_CROSSFADE;
  const holdIn = start + (end - start) * 0.34;
  const holdOut = end - LEAD_MODULE_CROSSFADE;
  const fadeOut = end;
  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [0, 1, 1, 0],
    { ease: scrollEase }
  );
  const y = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [18, 0, 0, -8],
    { ease: scrollEase }
  );
  const scale = useTransform(scrollYProgress, [fadeIn, holdIn], [0.99, 1], { ease: scrollEase });
  const copyX = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [-16, 0, 0, -8],
    { ease: scrollEase }
  );
  const visualX = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [16, 0, 0, 8],
    { ease: scrollEase }
  );
  const visibility = useTransform(opacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));
  return { opacity, y, scale, copyX, visualX, visibility, fadeIn, holdIn };
};

/** First Praxi module — delayed entry until lead is mostly done */
const useFirstModuleSceneMotion = (scrollYProgress, start, end) => {
  const fadeIn = start - LEAD_MODULE_CROSSFADE;
  const { holdIn, holdOut, fadeOut } = sceneRange(start, end);
  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [0, 1, 1, 0],
    { ease: scrollEase }
  );
  const y = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [10, 0, 0, -8],
    { ease: scrollEase }
  );
  const scale = useTransform(scrollYProgress, [fadeIn, holdIn], [0.99, 1], { ease: scrollEase });
  const copyX = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [-16, 0, 0, -8],
    { ease: scrollEase }
  );
  const visualX = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, holdOut, fadeOut],
    [16, 0, 0, 8],
    { ease: scrollEase }
  );
  const visibility = useTransform(opacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));
  return { opacity, y, scale, copyX, visualX, visibility, fadeIn, holdIn };
};

const COMPASS_THEMES = {
  pyxida: {
    face: ['#eef4fb', '#d4e4f4', '#a8c4e4'],
    ring: ['#2d5a8a', '#6a9bcc', '#4a7ab5'],
    needle: ['#2d5a8a', '#4a7ab5', '#6a9bcc', '#b8d4ef'],
    tickMajor: '#2d5a8a',
    tickMinor: 'rgba(74, 122, 181, 0.42)',
    dashRing: 'rgba(106, 155, 204, 0.32)',
    innerRing: 'rgba(45, 90, 138, 0.16)',
    needleStroke: '#2d5a8a',
    hubDot: '#eef4fb',
  },
  praxi: {
    face: ['#fff8f5', '#fdeee8', '#f4d4c8'],
    ring: ['#c0603e', '#d97757', '#e8a090'],
    needle: ['#c0603e', '#d97757', '#e8a090', '#fdeee8'],
    tickMajor: '#c0603e',
    tickMinor: 'rgba(217, 119, 87, 0.45)',
    dashRing: 'rgba(217, 119, 87, 0.34)',
    innerRing: 'rgba(192, 96, 62, 0.18)',
    needleStroke: '#c0603e',
    hubDot: '#fff8f5',
  },
};

const PyxidaCompassSvg = ({ needleRotate, idSuffix, theme = 'pyxida' }) => {
  const colors = COMPASS_THEMES[theme] || COMPASS_THEMES.pyxida;
  const uid = `${idSuffix}-${theme}`;

  return (
    <svg className="ol-pyxida-compass-svg" viewBox="0 0 120 120" role="presentation">
      <defs>
        <radialGradient id={`ol-compass-face-${uid}`} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor={colors.face[0]} />
          <stop offset="48%" stopColor={colors.face[1]} />
          <stop offset="100%" stopColor={colors.face[2]} />
        </radialGradient>
        <linearGradient id={`ol-compass-ring-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.ring[0]} />
          <stop offset="50%" stopColor={colors.ring[1]} />
          <stop offset="100%" stopColor={colors.ring[2]} />
        </linearGradient>
        <linearGradient id={`ol-compass-needle-${uid}`} x1="60" y1="24" x2="60" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.needle[0]} />
          <stop offset="42%" stopColor={colors.needle[1]} />
          <stop offset="58%" stopColor={colors.needle[2]} />
          <stop offset="100%" stopColor={colors.needle[3]} />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill={`url(#ol-compass-face-${uid})`} stroke={`url(#ol-compass-ring-${uid})`} strokeWidth="2.8" />
      <circle cx="60" cy="60" r="56" fill="none" stroke={colors.dashRing} strokeWidth="1.5" strokeDasharray="4 5" />
      <circle cx="60" cy="60" r="48" fill="none" stroke={colors.innerRing} strokeWidth="1" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const inner = i % 3 === 0 ? 42 : 45;
        const outer = 50;
        const x1 = 60 + Math.sin(angle) * inner;
        const y1 = 60 - Math.cos(angle) * inner;
        const x2 = 60 + Math.sin(angle) * outer;
        const y2 = 60 - Math.cos(angle) * outer;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 3 === 0 ? colors.tickMajor : colors.tickMinor}
            strokeWidth={i % 3 === 0 ? 2 : 1.2}
            strokeLinecap="round"
          />
        );
      })}
      <motion.g style={{ rotate: needleRotate, transformOrigin: '60px 60px' }}>
        <path
          d="M60 24 L67.5 60 L60 96 L52.5 60 Z"
          fill={`url(#ol-compass-needle-${uid})`}
          stroke={colors.needleStroke}
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </motion.g>
      <circle cx="60" cy="60" r="6" fill={`url(#ol-compass-ring-${uid})`} />
      <circle cx="60" cy="60" r="2.4" fill={colors.hubDot} />
    </svg>
  );
};

const PRAXI_COMPASS_NEEDLE_SPEED = 3;

const getCompassNeedleRotation = (variant, pyxidaStart, leadStart, exitEnd) => {
  const pyxidaSpan = leadStart - pyxidaStart;
  const praxiSpan = exitEnd - leadStart;
  const denom = pyxidaSpan + PRAXI_COMPASS_NEEDLE_SPEED * praxiSpan;

  if (variant === 'bl') {
    const start = -66;
    const total = 96;
    const rate = total / denom;
    return {
      keys: [pyxidaStart, leadStart, exitEnd],
      values: [start, start + rate * pyxidaSpan, start + total],
    };
  }

  const total = 108;
  const rate = total / denom;
  return {
    keys: [pyxidaStart, leadStart, exitEnd],
    values: [0, rate * pyxidaSpan, total],
  };
};

const PyxidaScrollCompass = ({ scrollYProgress, variant = 'tr' }) => {
  const pyxidaStart = JOURNEY.intro[0];
  const journeyEnd = JOURNEY.modules[JOURNEY.modules.length - 1][1];
  const exitStart = journeyEnd - SCENE_CROSSFADE;
  const exitEnd = journeyEnd;
  const { keys: needleKeys, values: needleValues } = getCompassNeedleRotation(
    variant,
    pyxidaStart,
    LEAD_START,
    exitEnd
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.01, 0.035, exitStart, exitEnd],
    [0, 0.44, 0.44, 0],
    { ease: scrollEase }
  );
  const y = useTransform(
    scrollYProgress,
    [0.01, 0.035],
    [10, 0],
    { ease: scrollEase }
  );
  const needleRotate = useTransform(scrollYProgress, needleKeys, needleValues);
  const praxiBlend = useTransform(
    scrollYProgress,
    [LEAD_START, LEAD_END],
    [0, 1],
    { clamp: true, ease: scrollEase }
  );
  const pyxidaLayerOpacity = useTransform(praxiBlend, (b) => 1 - b);
  const praxiLayerOpacity = praxiBlend;

  return (
    <motion.div
      className={`ol-pyxida-compass ol-pyxida-compass--${variant}`}
      style={{ opacity, y }}
      aria-hidden="true"
    >
      <div className="ol-pyxida-compass-stack">
        <motion.div className="ol-pyxida-compass-layer" style={{ opacity: pyxidaLayerOpacity }}>
          <PyxidaCompassSvg needleRotate={needleRotate} idSuffix={variant} theme="pyxida" />
        </motion.div>
        <motion.div className="ol-pyxida-compass-layer" style={{ opacity: praxiLayerOpacity }}>
          <PyxidaCompassSvg needleRotate={needleRotate} idSuffix={variant} theme="praxi" />
        </motion.div>
      </div>
    </motion.div>
  );
};

/** Offer shell fades out only after CTA finishes — never before shellFadeEnd */
const useOfferSceneMotion = (scrollYProgress, start, end, shellFadeStart, shellFadeEnd) => {
  const { fadeIn, holdIn } = sceneRange(start, end);
  const fadeStart = shellFadeStart ?? end;
  const fadeOut = Math.min(shellFadeEnd ?? end, end);
  const fadeMid = fadeStart + (fadeOut - fadeStart) * 0.48;
  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, fadeStart, fadeMid, fadeOut],
    [0, 1, 1, 0.35, 0],
    { ease: scrollEase }
  );
  const y = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, fadeStart, fadeMid, fadeOut],
    [10, 0, 0, -6, -14],
    { ease: scrollEase }
  );
  const scale = useTransform(scrollYProgress, [fadeIn, holdIn], [0.99, 1], { ease: scrollEase });
  const copyX = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, fadeStart, fadeOut],
    [-16, 0, 0, -8],
    { ease: scrollEase }
  );
  const visualX = useTransform(
    scrollYProgress,
    [fadeIn, holdIn, fadeStart, fadeOut],
    [16, 0, 0, 8],
    { ease: scrollEase }
  );
  const visibility = useTransform(opacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));
  return { opacity, y, scale, copyX, visualX, visibility, fadeIn, holdIn };
};

const PyxidaScene = ({ opacity, y, scale, visibility, zIndex, className = '', id, children }) => (
  <motion.div
    id={id}
    className={`ol-pyxida-scene${className ? ` ${className}` : ''}`}
    style={{ opacity, y, scale, visibility, zIndex }}
  >
    {children}
  </motion.div>
);

const useScrollReveal = (scrollYProgress, start, end, step, totalSteps, revealRatio = CONTENT_REVEAL) => {
  const [fadeIn, fadeOut] = sceneStep(start, end, step, totalSteps, revealRatio);
  const opacity = useTransform(scrollYProgress, [fadeIn, fadeOut], [0, 1], { ease: scrollEase });
  const y = useTransform(scrollYProgress, [fadeIn, fadeOut], [10, 0], { ease: scrollEase });
  return { opacity, y };
};

/** Intro scene — visible as soon as the journey pins (no blank scroll-in) */
const useIntroReveal = (scrollYProgress, start, end, step, totalSteps, revealRatio = INTRO_CONTENT_REVEAL) => {
  const [, fadeOut] = sceneStep(start, end, step, totalSteps, revealRatio);
  const opacity = useTransform(scrollYProgress, [0, fadeOut, end], [1, 1, 1], { ease: scrollEase });
  const y = useTransform(scrollYProgress, [0, fadeOut], [0, 0], { ease: scrollEase });
  return { opacity, y };
};

/** Intro shell — visible before the journey pins so the handoff from hero is not blank */
const useIntroShellMotion = (scrollYProgress, start, end) => {
  const { holdIn, holdOut, fadeOut } = sceneRange(start, end);
  const opacity = useTransform(
    scrollYProgress,
    [-0.08, holdIn, holdOut, fadeOut],
    [1, 1, 1, 0],
    { ease: scrollEase }
  );
  const y = useTransform(
    scrollYProgress,
    [-0.08, holdIn, holdOut, fadeOut],
    [0, 0, 0, -8],
    { ease: scrollEase }
  );
  const scale = useTransform(scrollYProgress, [-0.08, holdIn], [1, 1], { ease: scrollEase });
  const copyX = useTransform(
    scrollYProgress,
    [-0.08, holdIn, holdOut, fadeOut],
    [0, 0, 0, -8],
    { ease: scrollEase }
  );
  const visualX = useTransform(
    scrollYProgress,
    [-0.08, holdIn, holdOut, fadeOut],
    [0, 0, 0, 8],
    { ease: scrollEase }
  );
  const visibility = useTransform(opacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));
  return { opacity, y, scale, copyX, visualX, visibility, fadeIn: start, holdIn };
};

const useStickyScrollReveal = (scrollYProgress, start, end, step, totalSteps, revealRatio = CONTENT_REVEAL) => {
  const [fadeIn, fadeOut] = sceneStep(start, end, step, totalSteps, revealRatio);
  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, fadeOut, end],
    [0, 1, 1],
    { ease: scrollEase }
  );
  const y = useTransform(scrollYProgress, [fadeIn, fadeOut], [10, 0], { ease: scrollEase });
  return { opacity, y };
};

const useOfferSettleMotion = (scrollYProgress, tailTiming) => {
  const {
    listsFadeStart,
    listsFadeEnd,
    costFadeInStart,
    costFadeInEnd,
    costFadeOutStart,
    costFadeOutEnd,
    eraseStart,
    eraseEnd,
    solutionRevealStart,
    solutionRevealEnd,
    winFadeInStart,
    winFadeInEnd,
    scarcityFadeStart,
    scarcityFadeEnd,
    ctaButtonFadeStart,
    ctaButtonFadeEnd,
    priceTravelStart,
    settleEnd,
  } = tailTiming;

  const settleY = useTransform(
    scrollYProgress,
    [priceTravelStart, settleEnd],
    [0, SETTLE_Y_FINAL],
    { clamp: true, ease: scrollEase }
  );
  const listsOpacity = useTransform(
    scrollYProgress,
    [listsFadeStart, listsFadeEnd],
    [1, 0],
    { clamp: true, ease: scrollEase }
  );
  const listsY = useTransform(
    scrollYProgress,
    [listsFadeStart, listsFadeEnd],
    [0, -36],
    { clamp: true, ease: scrollEase }
  );
  const listsScale = useTransform(
    scrollYProgress,
    [listsFadeStart, listsFadeEnd],
    [1, 0.94],
    { clamp: true, ease: scrollEase }
  );
  const costOpacity = useTransform(
    scrollYProgress,
    [listsFadeEnd, costFadeInStart, costFadeInEnd, costFadeOutStart, costFadeOutEnd],
    [0, 0, 1, 1, 0],
    { clamp: true, ease: scrollEase }
  );
  const costY = useTransform(
    scrollYProgress,
    [costFadeInStart, costFadeInEnd, costFadeOutStart, costFadeOutEnd],
    [28, 0, 0, -28],
    { clamp: true, ease: scrollEase }
  );
  const costScale = useTransform(
    scrollYProgress,
    [costFadeInStart, costFadeInEnd, costFadeOutStart, costFadeOutEnd],
    [0.96, 1, 1, 0.94],
    { clamp: true, ease: scrollEase }
  );
  const eraseProgress = useTransform(
    scrollYProgress,
    [eraseStart, eraseEnd],
    [0, 1],
    { clamp: true, ease: scrollEase }
  );
  const solutionOpacity = useTransform(
    scrollYProgress,
    [solutionRevealStart, solutionRevealEnd, costFadeOutStart, costFadeOutEnd],
    [0, 1, 1, 0],
    { clamp: true, ease: scrollEase }
  );
  const solutionY = useTransform(
    scrollYProgress,
    [solutionRevealStart, solutionRevealEnd],
    [22, 0],
    { clamp: true, ease: scrollEase }
  );
  const solutionScale = useTransform(
    scrollYProgress,
    [solutionRevealStart, solutionRevealEnd],
    [0.9, 1],
    { clamp: true, ease: scrollEase }
  );
  const winOpacity = useTransform(
    scrollYProgress,
    [winFadeInStart, winFadeInEnd],
    [0, 1],
    { clamp: true, ease: scrollEase }
  );
  const winY = useTransform(
    scrollYProgress,
    [winFadeInStart, winFadeInEnd],
    [18, 0],
    { clamp: true, ease: scrollEase }
  );
  const scarcityMid = scarcityFadeStart + (scarcityFadeEnd - scarcityFadeStart) * 0.58;
  const ctaButtonMid = ctaButtonFadeStart + (ctaButtonFadeEnd - ctaButtonFadeStart) * 0.55;

  const scarcityOpacity = useTransform(
    scrollYProgress,
    [scarcityFadeStart, scarcityMid, scarcityFadeEnd],
    [0, 0.32, 1],
    { clamp: true, ease: scrollEase }
  );
  const scarcityY = useTransform(
    scrollYProgress,
    [scarcityFadeStart, scarcityFadeEnd],
    [16, 0],
    { clamp: true, ease: scrollEase }
  );
  const ctaButtonOpacity = useTransform(
    scrollYProgress,
    [ctaButtonFadeStart, ctaButtonMid, ctaButtonFadeEnd],
    [0, 0.28, 1],
    { clamp: true, ease: scrollEase }
  );
  const ctaButtonY = useTransform(
    scrollYProgress,
    [ctaButtonFadeStart, ctaButtonFadeEnd],
    [20, 0],
    { clamp: true, ease: scrollEase }
  );
  const listsPointerEvents = useTransform(listsOpacity, (v) => (v < 0.08 ? 'none' : 'auto'));
  const costPointerEvents = useTransform(costOpacity, (v) => (v < 0.08 ? 'none' : 'auto'));
  const ctaPointerEvents = useTransform(ctaButtonOpacity, (v) => (v < 0.35 ? 'none' : 'auto'));

  return {
    settleY,
    listsOpacity,
    listsY,
    listsScale,
    costOpacity,
    costY,
    costScale,
    eraseProgress,
    solutionOpacity,
    solutionY,
    solutionScale,
    winOpacity,
    winY,
    scarcityOpacity,
    scarcityY,
    ctaButtonOpacity,
    ctaButtonY,
    listsPointerEvents,
    costPointerEvents,
    ctaPointerEvents,
  };
};

const SETTLE_Y_FINAL = 96;

const getSettleYOffset = (scroll, { priceTravelStart, settleEnd }) => {
  if (scroll <= priceTravelStart) return 0;
  if (scroll >= settleEnd) return SETTLE_Y_FINAL;
  const raw = (scroll - priceTravelStart) / (settleEnd - priceTravelStart);
  return scrollEase(raw) * SETTLE_Y_FINAL;
};

const getOfferPriceMorphProgress = (scroll, morphStart, morphEnd) => {
  if (scroll <= morphStart) return 0;
  if (scroll >= morphEnd) return 1;
  const raw = (scroll - morphStart) / (morphEnd - morphStart);
  return scrollEase(raw);
};

const useOfferFloatingPrice = (scrollYProgress, tailTiming, offerOpenRef, costSlotRef, settleSlotRef) => {
  const {
    solutionRevealStart,
    solutionRevealEnd,
    costFadeOutStart,
    priceTravelStart,
    settleEnd,
  } = tailTiming;
  const morphStartAnchorRef = useRef(null);
  const morphEndAnchorRef = useRef(null);

  useEffect(() => {
    const resetAnchors = () => {
      morphStartAnchorRef.current = null;
      morphEndAnchorRef.current = null;
    };
    window.addEventListener('resize', resetAnchors);
    return () => window.removeEventListener('resize', resetAnchors);
  }, []);

  const measureCostAnchor = () => {
    const open = offerOpenRef.current;
    const cost = costSlotRef.current;
    if (!open || !cost) return null;

    const openRect = open.getBoundingClientRect();
    const costRect = cost.getBoundingClientRect();

    return {
      y: costRect.top - openRect.top,
      x: costRect.left - openRect.left + costRect.width / 2,
    };
  };

  const measureFinalSettleAnchor = (scroll) => {
    const open = offerOpenRef.current;
    const settle = settleSlotRef.current;
    if (!open || !settle) return null;

    const openRect = open.getBoundingClientRect();
    const settleRect = settle.getBoundingClientRect();
    const settleYNow = getSettleYOffset(scroll, tailTiming);

    return {
      y: settleRect.top - openRect.top + (SETTLE_Y_FINAL - settleYNow),
      x: settleRect.left - openRect.left + settleRect.width / 2,
    };
  };

  const lockMorphAnchors = (scroll) => {
    if (morphStartAnchorRef.current && morphEndAnchorRef.current) return;
    const start = measureCostAnchor();
    const end = measureFinalSettleAnchor(scroll);
    if (!start || !end) return;
    morphStartAnchorRef.current = start;
    morphEndAnchorRef.current = end;
  };

  const priceOpacity = useTransform(scrollYProgress, (scroll) => {
    if (scroll <= solutionRevealStart) return 0;
    if (scroll >= solutionRevealEnd) return 1;
    return (scroll - solutionRevealStart) / (solutionRevealEnd - solutionRevealStart);
  });

  const priceTop = useTransform(scrollYProgress, (scroll) => {
    if (scroll < priceTravelStart) {
      morphStartAnchorRef.current = null;
      morphEndAnchorRef.current = null;
      return measureCostAnchor()?.y ?? 0;
    }

    lockMorphAnchors(scroll);
    const start = morphStartAnchorRef.current;
    const end = morphEndAnchorRef.current;
    if (!start || !end) return measureCostAnchor()?.y ?? 0;

    const progress = getOfferPriceMorphProgress(scroll, priceTravelStart, settleEnd);
    return start.y + (end.y - start.y) * progress;
  });

  const priceLeft = useTransform(scrollYProgress, (scroll) => {
    if (scroll < priceTravelStart) {
      return measureCostAnchor()?.x ?? 0;
    }

    lockMorphAnchors(scroll);
    const start = morphStartAnchorRef.current;
    const end = morphEndAnchorRef.current;
    if (!start || !end) return measureCostAnchor()?.x ?? 0;

    const progress = getOfferPriceMorphProgress(scroll, priceTravelStart, settleEnd);
    return start.x + (end.x - start.x) * progress;
  });

  return { priceOpacity, priceTop, priceLeft };
};

const getOfferGiftsHeaderTiming = (start, end, giftHeaderStep, totalSteps) => {
  const [fadeIn, fadeOut] = sceneStep(start, end, giftHeaderStep, totalSteps, OFFER_CONTENT_REVEAL);
  return { fadeIn, fadeOut };
};

const useGiftsHeaderReveal = (scrollYProgress, start, end, giftHeaderStep, totalSteps) => {
  const { fadeIn, fadeOut } = getOfferGiftsHeaderTiming(start, end, giftHeaderStep, totalSteps);
  const opacity = useTransform(scrollYProgress, [fadeIn, fadeOut], [0, 1], { ease: scrollEase });
  const x = useTransform(scrollYProgress, [fadeIn, fadeOut], [64, 0], { ease: scrollEase });
  const y = useTransform(scrollYProgress, [fadeIn, fadeOut], [-56, 0], { ease: scrollEase });
  const rotate = useTransform(scrollYProgress, [fadeIn, fadeOut], [-22, 0], { ease: scrollEase });
  const scale = useTransform(scrollYProgress, [fadeIn, fadeOut], [0.82, 1], { ease: scrollEase });
  return { opacity, x, y, rotate, scale, headerFadeOut: fadeOut };
};

/** Mobile offer — crossfade included vs extras in one viewport slot */
const useOfferMobilePanelOpacity = (scrollYProgress, start, end, giftHeaderStep, totalSteps, compact) => {
  const { fadeIn: giftsFadeIn } = getOfferGiftsHeaderTiming(start, end, giftHeaderStep, totalSteps);
  const span = end - start;
  const crossStart = Math.max(start, giftsFadeIn - span * 0.02);
  const crossEnd = giftsFadeIn + span * 0.05;

  const includedOpacity = useTransform(
    scrollYProgress,
    compact ? [crossStart, crossEnd] : [0, 1],
    compact ? [1, 0] : [1, 1],
    { clamp: true, ease: scrollEase }
  );
  const giftsOpacity = useTransform(
    scrollYProgress,
    compact ? [crossStart, crossEnd] : [0, 1],
    compact ? [0, 1] : [1, 1],
    { clamp: true, ease: scrollEase }
  );
  const includedVisibility = useTransform(includedOpacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));
  const giftsVisibility = useTransform(giftsOpacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));

  return { includedOpacity, giftsOpacity, includedVisibility, giftsVisibility };
};

const getOfferListsCompleteStep = (features, giftRows) => {
  const includedHeaderStep = 4;
  const giftHeaderStep = includedHeaderStep + features.length;
  if (giftRows.length > 0) return giftHeaderStep + giftRows.length;
  if (features.length > 0) return includedHeaderStep + features.length;
  return includedHeaderStep;
};

/** Tail beats share the scroll *remaining* after lists — never overflow the scene window */
const OFFER_TAIL_PHASES = {
  listsFadePad: 0.008,
  listsFade: 0.040,
  costInPad: 0.012,
  costIn: 0.072,
  erase: 0.102,
  solution: 0.090,
  costOut: 0.082,
  priceTravel: 0.108,
  scarcityPad: 0.024,
  scarcity: 0.122,
  ctaPad: 0.028,
  cta: 0.166,
  shellPad: 0.028,
  shell: 0.106,
};

const getOfferTailTiming = (start, end, totalSteps, listsCompleteStep) => {
  const [, listsContentComplete] = sceneStep(start, end, listsCompleteStep, totalSteps, OFFER_CONTENT_REVEAL);
  const tailSpan = Math.max(end - listsContentComplete, 0.001);
  const phaseSpan = (key) => tailSpan * OFFER_TAIL_PHASES[key];

  let cursor = listsContentComplete;
  const listsFadeStart = cursor + phaseSpan('listsFadePad');
  cursor = listsFadeStart + phaseSpan('listsFade');
  const listsFadeEnd = cursor;

  cursor += phaseSpan('costInPad');
  const costFadeInStart = cursor;
  cursor += phaseSpan('costIn');
  const costFadeInEnd = cursor;

  cursor += phaseSpan('erase');
  const eraseStart = costFadeInEnd;
  const eraseEnd = cursor;

  cursor += phaseSpan('solution');
  const solutionRevealStart = eraseEnd;
  const solutionRevealEnd = cursor;

  cursor += phaseSpan('costOut');
  const costFadeOutStart = solutionRevealEnd;
  const costFadeOutEnd = cursor;

  cursor += phaseSpan('priceTravel');
  const priceTravelStart = costFadeOutEnd;
  const settleEnd = cursor;

  cursor += phaseSpan('scarcityPad');
  const scarcityFadeStart = cursor;
  cursor += phaseSpan('scarcity');
  const scarcityFadeEnd = cursor;

  cursor += phaseSpan('ctaPad');
  const ctaButtonFadeStart = cursor;
  cursor += phaseSpan('cta');
  const ctaButtonFadeEnd = cursor;

  cursor += phaseSpan('shellPad');
  const shellFadeStart = cursor;
  cursor += phaseSpan('shell');
  const shellFadeEnd = Math.min(cursor, end);

  const winFadeInStart = costFadeOutStart;
  const winFadeInEnd = priceTravelStart;

  return {
    listsFadeStart,
    listsFadeEnd,
    costFadeInStart,
    costFadeInEnd,
    costFadeOutStart,
    costFadeOutEnd,
    eraseStart,
    eraseEnd,
    solutionRevealStart,
    solutionRevealEnd,
    winFadeInStart,
    winFadeInEnd,
    scarcityFadeStart,
    scarcityFadeEnd,
    ctaButtonFadeStart,
    ctaButtonFadeEnd,
    priceTravelStart,
    settleEnd,
    shellFadeStart,
    shellFadeEnd,
  };
};

const PyxidaIntroScene = ({ scrollYProgress, offer, shellMotion }) => {
  const [start, end] = JOURNEY.intro;
  const span = end - start;
  const settleEnd = start + span * 0.36;
  const colorEnd = start + span * 0.38;
  const copyStart = start + span * 0.32;
  const titleText = offer.pyxidaTitle || 'Pyxida';
  const zoomStart = -0.045;

  const blockY = useTransform(scrollYProgress, [zoomStart, settleEnd], [-220, -40], { ease: scrollEase });
  const titleY = useTransform(scrollYProgress, [zoomStart, settleEnd], [8, 0], { ease: scrollEase });
  const titleScale = useTransform(scrollYProgress, [zoomStart, settleEnd], [0.46, 1], { ease: scrollEase });
  const whiteOp = useTransform(scrollYProgress, [zoomStart, colorEnd], [1, 0], { ease: scrollEase });
  const blueOp = useTransform(scrollYProgress, [zoomStart, colorEnd], [0, 1], { ease: scrollEase });
  const sub = useScrollReveal(scrollYProgress, copyStart, end, 0, 2, 0.55);
  const lead = useScrollReveal(scrollYProgress, copyStart, end, 1, 2, 0.55);

  return (
    <PyxidaScene {...shellMotion} zIndex={1}>
      <div className="ol-pyxida-scene-intro">
        <motion.div className="ol-pyxida-intro-copy" style={{ y: blockY }}>
          <motion.div
            className="ol-pyxida-intro-title"
            style={{ y: titleY, scale: titleScale }}
          >
            <span className="ol-pyxida-title-stack" aria-label={titleText}>
              <motion.span className="ol-pyxida-title-word ol-pyxida-title-word--light" style={{ opacity: whiteOp }}>
                {titleText}
              </motion.span>
              <motion.span className="ol-pyxida-title-word ol-pyxida-title-word--blue" style={{ opacity: blueOp }}>
                {titleText}
              </motion.span>
            </span>
          </motion.div>
          <motion.p className="ol-brand-sub ol-brand-sub--solo ol-pyxida-intro-sub" style={{ opacity: sub.opacity, y: sub.y }}>
            {offer.pyxidaDesc}
          </motion.p>
          <motion.p className="ol-chapter-lead ol-pyxida-intro-lead" style={{ opacity: lead.opacity, y: lead.y }}>
            {offer.pyxidaChapterLead}
          </motion.p>
        </motion.div>
      </div>
    </PyxidaScene>
  );
};

const PyxidaFeatureScene = ({ scene, index, sceneCount, sceneMotion: motionValues, sceneStart, sceneEnd, scrollYProgress, botLabel, crmLabel }) => {
  const label = scene.kind === 'crm' ? crmLabel : botLabel;
  const accent = scene.kind === 'crm' ? 'crm' : 'bot';
  const { copyX, visualX, ...shellMotion } = motionValues;
  const start = sceneStart;
  const end = sceneEnd;
  const totalSteps = 4;
  const stackZ = (sceneCount || 6) - index;

  const indexMotion = useScrollReveal(scrollYProgress, start, end, 0, totalSteps);
  const labelMotion = useScrollReveal(scrollYProgress, start, end, 1, totalSteps);
  const titleMotion = useScrollReveal(scrollYProgress, start, end, 2, totalSteps);
  const bodyMotion = useScrollReveal(scrollYProgress, start, end, 3, totalSteps);

  return (
    <PyxidaScene {...shellMotion} zIndex={stackZ} className="ol-pyxida-scene--feature" data-scene-id={scene.id}>
      <div className="ol-pyxida-scene-block">
        <motion.div
          className={`ol-pyxida-scene-visual-wrap ol-pyxida-scene-visual-wrap--${accent}`}
          style={{ x: visualX }}
        >
          <VisualStage accent={accent} variant={scene.visual}>
            <PyxidaSceneVisual visual={scene.visual} />
          </VisualStage>
        </motion.div>
        <motion.div className="ol-pyxida-scene-caption" style={{ x: copyX }}>
          <motion.span className="ol-scene-index" style={{ opacity: indexMotion.opacity, y: indexMotion.y }}>
            {String(index + 1).padStart(2, '0')}
          </motion.span>
          <motion.span className={`ol-scene-label ol-scene-label--${scene.kind}`} style={{ opacity: labelMotion.opacity, y: labelMotion.y }}>
            {label}
          </motion.span>
          <motion.h3 className="ol-scene-title" style={{ opacity: titleMotion.opacity, y: titleMotion.y }}>
            {scene.title}
          </motion.h3>
          <motion.p className="ol-scene-body" style={{ opacity: bodyMotion.opacity, y: bodyMotion.y }}>
            {scene.body}
          </motion.p>
        </motion.div>
      </div>
    </PyxidaScene>
  );
};

const PyxidaFeatureSceneMotion = ({
  scene,
  index,
  sceneCount,
  range,
  scrollYProgress,
  botLabel,
  crmLabel,
}) => {
  const flip = index % 2 === 1;
  const sceneMotion = useSceneMotion(scrollYProgress, range[0], range[1], { flip });

  if (!range) return null;

  return (
    <PyxidaFeatureScene
      scene={scene}
      index={index}
      sceneCount={sceneCount}
      sceneMotion={sceneMotion}
      sceneStart={range[0]}
      sceneEnd={range[1]}
      scrollYProgress={scrollYProgress}
      botLabel={botLabel}
      crmLabel={crmLabel}
    />
  );
};

const BrandInline = ({ name, variant = 'pyxida', onClick }) => {
  const className = `ol-brand-inline ol-brand-inline--${variant}${onClick ? ' ol-brand-inline--link' : ''}`;
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {name}
      </button>
    );
  }
  return <span className={className}>{name}</span>;
};

const PraxiLeadScene = ({ offer, shellMotion, scrollYProgress, sceneStart, sceneEnd, journeyRef }) => {
  const start = sceneStart ?? LEAD_START;
  const end = sceneEnd ?? LEAD_END;
  const title = useScrollReveal(scrollYProgress, start, end, 0, 2);
  const desc = useScrollReveal(scrollYProgress, start, end, 1, 2);
  const navOffset = JOURNEY_NAV_OFFSET;
  const goPyxida = () => {
    if (!journeyRef?.current) return;
    scrollToJourneyProgress(
      journeyRef.current,
      getPyxidaScrollTarget(),
      navOffset
    );
  };
  const goPraxi = () => {
    if (!journeyRef?.current) return;
    scrollToJourneyProgress(
      journeyRef.current,
      journeySceneCenter(...JOURNEY.modKleinei),
      navOffset
    );
  };

  return (
    <PyxidaScene {...shellMotion} zIndex={5} className="ol-pyxida-scene--interactive">
      <div className="ol-pyxida-scene-intro ol-praxi-lead">
        <motion.h2 className="ol-praxi-lead-title" style={{ opacity: title.opacity, y: title.y }}>
          {offer.praxiLeadTitle}
        </motion.h2>
        <motion.p className="ol-praxi-lead-desc" style={{ opacity: desc.opacity, y: desc.y }}>
          {offer.praxiLeadDescBefore}{' '}
          <BrandInline name={offer.praxiLeadDescPraxi || 'Praxi'} variant="praxi" onClick={goPraxi} />
          {' '}{offer.praxiLeadDescMid}{' '}
          <BrandInline name={offer.praxiLeadDescPyxida || 'Pyxida'} variant="pyxida" onClick={goPyxida} />
          {offer.praxiLeadDescAfter}
        </motion.p>
      </div>
    </PyxidaScene>
  );
};

const renderOfferTextWithBrand = (text, brandName, variant = 'pyxida') => {
  if (!text || !brandName || !text.includes(brandName)) return text;
  const parts = text.split(brandName);
  const nodes = [];
  parts.forEach((part, i) => {
    if (i > 0) {
      nodes.push(<BrandInline key={`brand-${i}`} name={brandName} variant={variant} />);
    }
    if (part) nodes.push(part);
  });
  return nodes;
};

const PyxidaOfferFeature = ({ feature, scrollYProgress, fadeIn, fadeOut }) => {
  const itemOpacity = useTransform(scrollYProgress, [fadeIn, fadeOut], [0, 1], { ease: scrollEase });
  const itemY = useTransform(scrollYProgress, [fadeIn, fadeOut], [10, 0], { ease: scrollEase });
  const itemX = useTransform(scrollYProgress, [fadeIn, fadeOut], [-4, 0], { ease: scrollEase });
  return (
    <motion.li style={{ opacity: itemOpacity, y: itemY, x: itemX }}>
      <span className="ol-pyxida-offer-feature-copy">{feature}</span>
    </motion.li>
  );
};

const staggerEraseProgress = (progress, index, total) => {
  const gap = 0.12;
  const window = Math.max(0.42, 0.88 - gap * Math.max(total - 1, 0));
  const start = index * gap;
  if (progress <= start) return 0;
  if (progress >= start + window) return 1;
  return (progress - start) / window;
};

const BillingCycleSwitch = ({ offer, tone = 'blue', className = '' }) => {
  const { billingCycle, setBillingCycle, showAnnualHint } = useBillingPreference();
  const isAnnual = billingCycle === 'annual';
  const toneClass = tone === 'orange' ? ' ol-pyxida-offer-billing-switch--orange' : '';

  return (
    <span
      className={`ol-pyxida-offer-billing-switch${toneClass}${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={`${offer.billingMonthlyLabel || 'Monthly'}, ${offer.billingAnnualLabel || 'Annual'}`}
    >
      <button
        type="button"
        className={`ol-pyxida-offer-billing-switch-btn${!isAnnual ? ' is-active' : ''}`}
        aria-pressed={!isAnnual}
        onClick={() => setBillingCycle('monthly')}
      >
        {offer.billingMonthlyLabel || 'Monthly'}
      </button>
      <span className="ol-pyxida-offer-billing-switch-sep" aria-hidden="true">/</span>
      <span className="ol-pyxida-offer-billing-switch-btn-wrap">
        <button
          type="button"
          className={`ol-pyxida-offer-billing-switch-btn ol-pyxida-offer-billing-switch-btn--annual${isAnnual ? ' is-active' : ''}`}
          aria-pressed={isAnnual}
          onClick={() => setBillingCycle('annual')}
        >
          {offer.billingAnnualLabel || 'Annual'}
        </button>
        {showAnnualHint && (
          <span className="ol-pyxida-offer-billing-hint-badge" aria-hidden="true">
            !
          </span>
        )}
      </span>
    </span>
  );
};

const PyxidaOfferPriceDisplay = ({
  tier,
  setupPrice,
  offer,
  variant = 'offer',
  showToggle = false,
}) => {
  const { billingCycle } = useBillingPreference();
  const annualPrice = tier.annualPrice || tier.founding;
  const monthlyAmount = tier.priceMonthly || tier.price;
  const isCost = variant === 'cost';
  const isAnnual = billingCycle === 'annual';
  const displayAmount = formatEuroSuffix(isAnnual ? annualPrice : monthlyAmount);
  const priceClass = isCost ? 'ol-pyxida-offer-cost-solution-price' : 'ol-pyxida-offer-price';
  const setupClass = isCost ? 'ol-pyxida-offer-cost-solution-setup' : 'ol-pyxida-offer-price ol-pyxida-offer-price--setup';
  const sepClass = isCost ? 'ol-pyxida-offer-cost-solution-sep' : 'ol-pyxida-offer-price-sep';
  const perMonth = offer.billingPerMonth || '/mo';
  const setupSuffix = setupPrice ? formatEuroSuffix(setupPrice) : null;

  return (
    <div className={`ol-pyxida-offer-price-stack${isCost ? ' ol-pyxida-offer-price-stack--cost' : ''}`}>
      <div className="ol-pyxida-offer-cost-solution-price-row ol-pyxida-offer-morph-price-row">
        <div className="ol-pyxida-offer-price-main-row">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={billingCycle}
              className={priceClass}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: scrollEase }}
            >
              {displayAmount}
              <span className="ol-pyxida-offer-billing-period">{perMonth}</span>
            </motion.span>
          </AnimatePresence>

          {setupSuffix && (
            <>
              <span className={sepClass} aria-hidden="true">+</span>
              <span className={setupClass}>{setupSuffix}</span>
            </>
          )}
        </div>

        {showToggle && (
          <BillingCycleSwitch offer={offer} tone="blue" />
        )}
      </div>
    </div>
  );
};

const PyxidaOfferMorphPrice = ({ tier, setupPrice, offer, showToggle }) => (
  <PyxidaOfferPriceDisplay
    tier={tier}
    setupPrice={setupPrice}
    offer={offer}
    variant="cost"
    showToggle={showToggle}
  />
);

const PraxiModulePriceDisplay = ({
  tier,
  setupPrice,
  offer,
}) => {
  const { billingCycle } = useBillingPreference();
  const annualPrice = tier.annualPrice;
  const monthlyAmount = tier.priceMonthly || tier.price;
  const isAnnual = billingCycle === 'annual';
  const displayAmount = formatEuroSuffix(isAnnual && annualPrice ? annualPrice : monthlyAmount);
  const perMonth = offer.billingPerMonth || '/μήνα';
  const setupFormatted = setupPrice ? formatEuroSuffix(setupPrice) : null;

  return (
    <div className="ol-praxi-module-price-stack">
      <div className="ol-praxi-module-price-row">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={billingCycle}
            className="ol-tier-price"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: scrollEase }}
          >
            {displayAmount}
            <span className="ol-pyxida-offer-billing-period">{perMonth}</span>
          </motion.span>
        </AnimatePresence>

        {setupFormatted && (
          <>
            <span className="ol-praxi-module-price-sep" aria-hidden="true">+</span>
            <span className="ol-praxi-module-setup">{setupFormatted}</span>
          </>
        )}

        {annualPrice && (
          <BillingCycleSwitch offer={offer} tone="orange" className="ol-pyxida-offer-billing-switch--module" />
        )}
      </div>
    </div>
  );
};

const PyxidaCostAltPrice = ({ item, eraseProgress, index, total }) => {
  const priceErase = useTransform(eraseProgress, (progress) => staggerEraseProgress(progress, index, total));
  const strikeScale = useTransform(priceErase, [0, 1], [0, 1], { clamp: true });

  return (
    <span
      className="ol-pyxida-offer-cost-alt-price-value-wrap"
      aria-label={formatEuroSuffix(`${item.price}${item.suffix ? ` ${item.suffix}` : ''}`)}
    >
      <span className="ol-pyxida-offer-cost-alt-price-value">{formatEuroSuffix(item.price)}</span>
      <motion.span
        className="ol-pyxida-offer-cost-alt-price-strike"
        style={{ scaleX: strikeScale }}
        aria-hidden="true"
      />
    </span>
  );
};

const PyxidaOfferScene = ({
  tier,
  offer,
  costCompare,
  sceneMotion,
  sceneStart,
  sceneEnd,
  scrollYProgress,
}) => {
  const navigate = useNavigate();
  const { ...shellMotion } = sceneMotion;
  const start = sceneStart ?? PYXIDA_OFFER_START;
  const end = sceneEnd ?? PYXIDA_OFFER_END;
  const features = tier.scrollFeatures || tier.features.slice(0, 6);
  const giftRows = offer.giftRows || [];
  const pyxidaName = offer.pyxidaTitle || 'Pyxida';
  const includedHeaderStep = 4;
  const giftHeaderStep = includedHeaderStep + features.length;
  const listsCompleteStep = getOfferListsCompleteStep(features, giftRows);
  const totalSteps = listsCompleteStep + 1;
  const setupPrice = (tier.setup || '').replace(/^\+\s*/, '');
  const tailTiming = getOfferTailTiming(start, end, totalSteps, listsCompleteStep);
  const offerReveal = OFFER_CONTENT_REVEAL;

  const label = useStickyScrollReveal(scrollYProgress, start, end, 0, totalSteps, offerReveal);
  const verb = useStickyScrollReveal(scrollYProgress, start, end, 1, totalSteps, offerReveal);
  const includedHeader = useScrollReveal(scrollYProgress, start, end, includedHeaderStep, totalSteps, offerReveal);
  const giftsHeader = useGiftsHeaderReveal(scrollYProgress, start, end, giftHeaderStep, totalSteps);
  const compactOfferPanels = useCompactOfferPanels();
  const mobilePanelOpacity = useOfferMobilePanelOpacity(
    scrollYProgress,
    start,
    end,
    giftHeaderStep,
    totalSteps,
    compactOfferPanels
  );
  const settleMotion = useOfferSettleMotion(scrollYProgress, tailTiming);
  const offerOpenRef = useRef(null);
  const costPriceSlotRef = useRef(null);
  const settlePriceSlotRef = useRef(null);
  const floatingPrice = useOfferFloatingPrice(
    scrollYProgress,
    tailTiming,
    offerOpenRef,
    costPriceSlotRef,
    settlePriceSlotRef
  );
  const hasCostCompare = costCompare?.costs?.length > 0;

  const goDemo = () => navigate('/demo');

  return (
    <PyxidaScene {...shellMotion} zIndex={6} className="ol-pyxida-scene--offer">
      <div ref={offerOpenRef} className="ol-pyxida-offer-open">
        <motion.div
          className="ol-pyxida-offer-settle"
          style={{ y: settleMotion.settleY }}
        >
          <div className="ol-pyxida-offer-core">
            <motion.span className="ol-tier-label" style={{ opacity: label.opacity, y: label.y }}>
              {offer.coreOfferLabel || 'Core offer'}
            </motion.span>
            <motion.h2 className="ol-pyxida-offer-verb" style={{ opacity: verb.opacity, y: verb.y }}>
              {tier.verb}
            </motion.h2>
          </div>

          <div className="ol-pyxida-offer-settle-float">
            {hasCostCompare ? (
              <div ref={settlePriceSlotRef} className="ol-pyxida-offer-price-slot" aria-hidden="true">
                <PyxidaOfferMorphPrice
                  tier={tier}
                  setupPrice={setupPrice}
                  offer={offer}
                />
              </div>
            ) : (
              <motion.div
                className="ol-pyxida-offer-price-block ol-pyxida-offer-price-block--recap"
                style={{ opacity: settleMotion.winOpacity, y: settleMotion.winY }}
              >
                <PyxidaOfferPriceDisplay
                  tier={tier}
                  setupPrice={setupPrice}
                  offer={offer}
                  showToggle
                />
              </motion.div>
            )}

            {(costCompare?.win?.subline || costCompare?.guarantee || costCompare?.slogan) && (
              <motion.div
                className="ol-pyxida-offer-win"
                style={{ opacity: settleMotion.winOpacity, y: settleMotion.winY }}
              >
                {costCompare.win?.subline && (
                  <p className="ol-pyxida-offer-win-sub">{costCompare.win.subline}</p>
                )}
                {costCompare.guarantee && (
                  <p className="ol-pyxida-offer-cost-guarantee">{costCompare.guarantee}</p>
                )}
                {costCompare.slogan && (
                  <p className="ol-pyxida-offer-cost-slogan">{costCompare.slogan}</p>
                )}
              </motion.div>
            )}

            <motion.div
              className="ol-pyxida-offer-cta-wrap demo-cta-stack demo-cta-stack--offer"
              style={{ pointerEvents: settleMotion.ctaPointerEvents }}
            >
              <motion.div
                style={{
                  opacity: settleMotion.scarcityOpacity,
                  y: settleMotion.scarcityY,
                  width: '100%',
                }}
              >
                <DemoScarcityBanner />
              </motion.div>
              <motion.button
                type="button"
                className="ol-pyxida-offer-cta"
                style={{
                  opacity: settleMotion.ctaButtonOpacity,
                  y: settleMotion.ctaButtonY,
                }}
                onClick={goDemo}
              >
                {offer.interestedCta || "I'm interested"}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <div className="ol-pyxida-offer-body">
          <motion.div
            className="ol-pyxida-offer-lists-wrap"
            style={{
              opacity: settleMotion.listsOpacity,
              y: settleMotion.listsY,
              scale: settleMotion.listsScale,
              pointerEvents: settleMotion.listsPointerEvents,
            }}
          >
            <div className={`ol-pyxida-offer-lists${compactOfferPanels ? ' ol-offer-lists--mobile-panels' : ''}`}>
              <motion.div
                className="ol-pyxida-offer-col ol-pyxida-offer-col--included"
                style={compactOfferPanels ? {
                  opacity: mobilePanelOpacity.includedOpacity,
                  visibility: mobilePanelOpacity.includedVisibility,
                } : undefined}
              >
                <motion.div
                  className="ol-pyxida-offer-col-head"
                  style={{ opacity: includedHeader.opacity, y: includedHeader.y }}
                >
                  <span className="ol-pyxida-offer-included-title">
                    {offer.includedEyebrow || 'Included'}
                  </span>
                </motion.div>
                <ul className="ol-pyxida-offer-features">
                  {features.map((feature, i) => {
                    const [fadeIn, fadeOut] = sceneStep(
                      start,
                      end,
                      includedHeaderStep + 1 + i,
                      totalSteps,
                      offerReveal
                    );
                    return (
                      <PyxidaOfferFeature
                        key={feature}
                        feature={feature}
                        scrollYProgress={scrollYProgress}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                      />
                    );
                  })}
                </ul>
              </motion.div>

              {giftRows.length > 0 && (
                <motion.div
                  className="ol-pyxida-offer-col ol-pyxida-offer-col--gifts"
                  style={compactOfferPanels ? {
                    opacity: mobilePanelOpacity.giftsOpacity,
                    visibility: mobilePanelOpacity.giftsVisibility,
                  } : undefined}
                >
                  <motion.div
                    className="ol-pyxida-offer-col-head ol-pyxida-offer-col-head--gifts"
                    style={{
                      opacity: giftsHeader.opacity,
                      x: giftsHeader.x,
                      y: giftsHeader.y,
                      rotate: giftsHeader.rotate,
                      scale: giftsHeader.scale,
                    }}
                  >
                    <span className="ol-pyxida-offer-gifts-title">
                      {offer.giftsEyebrow || '+ Free extras'}
                    </span>
                  </motion.div>
                  <ul className="ol-pyxida-offer-features ol-praxi-module-features">
                    {giftRows.map((row, i) => {
                      const [fadeIn, fadeOut] = sceneStep(
                        start,
                        end,
                        giftHeaderStep + 1 + i,
                        totalSteps,
                        offerReveal
                      );
                      return (
                        <PyxidaOfferFeature
                          key={row.label}
                          feature={renderOfferTextWithBrand(row.label, pyxidaName)}
                          scrollYProgress={scrollYProgress}
                          fadeIn={fadeIn}
                          fadeOut={fadeOut}
                        />
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>

          {costCompare?.costs?.length > 0 && (
            <motion.div
              className="ol-pyxida-offer-cost-wrap"
              style={{
                opacity: settleMotion.costOpacity,
                y: settleMotion.costY,
                scale: settleMotion.costScale,
                pointerEvents: settleMotion.costPointerEvents,
              }}
            >
              <div className="ol-pyxida-offer-cost">
                <header className="ol-pyxida-offer-cost-head">
                  <span className="ol-pyxida-offer-cost-eyebrow">{costCompare.eyebrow}</span>
                  {costCompare.title && <h3 className="ol-pyxida-offer-cost-title">{costCompare.title}</h3>}
                </header>

                {costCompare.compareLead && (
                  <p className="ol-pyxida-offer-cost-lead">{costCompare.compareLead}</p>
                )}

                <div className="ol-pyxida-offer-cost-alts">
                  {costCompare.costs.map((item, index) => (
                    <div key={item.label} className="ol-pyxida-offer-cost-alt">
                      {item.type && (
                        <span className="ol-pyxida-offer-cost-alt-type">{item.type}</span>
                      )}
                      <p className="ol-pyxida-offer-cost-alt-label">{item.label}</p>
                      <PyxidaCostAltPrice
                        item={item}
                        index={index}
                        total={costCompare.costs.length}
                        eraseProgress={settleMotion.eraseProgress}
                      />
                      {item.suffix && (
                        <span className="ol-pyxida-offer-cost-alt-suffix">{item.suffix}</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.div
                  className="ol-pyxida-offer-cost-solution"
                  style={{
                    opacity: settleMotion.solutionOpacity,
                    y: settleMotion.solutionY,
                    scale: settleMotion.solutionScale,
                  }}
                >
                  <div className="ol-pyxida-offer-cost-vs" aria-hidden="true">
                    <span>{costCompare.vsLabel || 'vs'}</span>
                  </div>
                  {costCompare.solution?.label && (
                    <p className="ol-pyxida-offer-cost-solution-label">{costCompare.solution.label}</p>
                  )}
                  <div ref={costPriceSlotRef} className="ol-pyxida-offer-price-slot" aria-hidden="true">
                    <PyxidaOfferMorphPrice
                      tier={tier}
                      setupPrice={setupPrice}
                      offer={offer}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        {hasCostCompare && (
          <motion.div
            className="ol-pyxida-offer-floating-price"
            style={{
              opacity: floatingPrice.priceOpacity,
              top: floatingPrice.priceTop,
              left: floatingPrice.priceLeft,
              x: '-50%',
            }}
            aria-live="polite"
          >
            <PyxidaOfferMorphPrice
              tier={tier}
              setupPrice={setupPrice}
              offer={offer}
              showToggle
            />
          </motion.div>
        )}
      </div>
    </PyxidaScene>
  );
};


const getModuleIndexAtProgress = (progress, moduleCount) => {
  if (progress < PRAXI_MODULE_START - SCENE_CROSSFADE) return -1;
  if (moduleCount <= 0) return -1;
  if (moduleCount >= 3 && progress >= JOURNEY.modules[1][0] - SCENE_CROSSFADE) return 2;
  if (moduleCount >= 2 && progress >= JOURNEY.modules[0][0] - SCENE_CROSSFADE) return 1;
  return 0;
};

const getNavActiveId = (progress, praxiTiers) => {
  const moduleIndex = getModuleIndexAtProgress(progress, praxiTiers.length);
  if (moduleIndex >= 0) return praxiTiers[moduleIndex].id;
  return 'pyxida';
};

const OfferChapterNav = ({ visible, offer, journeyRef, praxiTiers }) => {
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ['start start', 'end end'],
  });

  const [activeId, setActiveId] = useState('pyxida');
  const praxiTierIds = praxiTiers.map((tier) => tier.id).join(',');
  const moduleCount = praxiTiers.length;

  const seg0Scale = useTransform(
    scrollYProgress,
    [JOURNEY.intro[0], JOURNEY.modKleinei[0]],
    [0, 1],
    { clamp: true }
  );
  const seg1Scale = useTransform(
    scrollYProgress,
    [JOURNEY.modKleinei[0], JOURNEY.modules[0][0]],
    [0, 1],
    { clamp: true }
  );
  const seg2Scale = useTransform(
    scrollYProgress,
    [JOURNEY.modules[0][0], JOURNEY.modules[1][0]],
    [0, 1],
    { clamp: true }
  );
  const segmentScales = moduleCount >= 3
    ? [seg0Scale, seg1Scale, seg2Scale]
    : moduleCount === 2
      ? [seg0Scale, seg1Scale]
      : [seg0Scale];

  useEffect(() => {
    const syncActive = (progress) => {
      setActiveId(getNavActiveId(progress, praxiTiers));
    };

    syncActive(scrollYProgress.get());

    const unsub = scrollYProgress.on('change', syncActive);
    return () => unsub();
  }, [scrollYProgress, praxiTierIds, praxiTiers]);

  useEffect(() => {
    if (visible) {
      setActiveId(getNavActiveId(scrollYProgress.get(), praxiTiers));
    }
  }, [visible, scrollYProgress, praxiTierIds, praxiTiers]);

  const goProgress = (progress) => {
    if (journeyRef?.current && progress != null) {
      scrollToJourneyProgress(journeyRef.current, progress, JOURNEY_NAV_OFFSET);
    }
  };

  const goPyxida = () => goProgress(getPyxidaScrollTarget());
  const goModule = (index) => goProgress(getModuleScrollTarget(index));

  const modulePrefix = offer.praxiModuleIndexPrefix || 'Module';
  const navItems = [
    {
      id: 'pyxida',
      label: <BrandInline name={offer.pyxidaTitle || 'Pyxida'} variant="pyxida" />,
      onClick: goPyxida,
      variant: 'pyxida',
    },
    ...praxiTiers.map((tier, i) => ({
      id: tier.id,
      label: moduleIndexLabel(modulePrefix, i),
      onClick: () => goModule(i),
      variant: 'module',
    })),
  ];

  const activeModuleIndex = praxiTiers.findIndex((tier) => tier.id === activeId);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="offer-chapter-nav"
          className="ol-chapter-nav"
          aria-label="Offer chapters"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.32, ease }}
        >
          <nav
            className="ol-chapter-nav-track"
            style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
          >
            <div className="ol-chapter-nav-rail-segments" aria-hidden="true">
              {segmentScales.map((scale, i) => (
                <div key={i} className="ol-chapter-nav-rail-segment">
                  <motion.div
                    className="ol-chapter-nav-rail-segment-fill"
                    style={{ scaleX: scale }}
                  />
                </div>
              ))}
            </div>

            {navItems.map((item) => {
              const itemModuleIndex = item.variant === 'module'
                ? praxiTiers.findIndex((tier) => tier.id === item.id)
                : -1;
              const isActive = item.id === activeId;
              const isPast = item.variant === 'pyxida'
                ? activeModuleIndex >= 0
                : activeModuleIndex >= 0 && itemModuleIndex < activeModuleIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`ol-chapter-nav-item ol-chapter-nav-item--${item.variant}${isActive ? ' is-active' : ''}${isPast ? ' is-past' : ''}`}
                  onClick={item.onClick}
                >
                  <span className="ol-chapter-nav-marker-wrap">
                    {isActive && <span className="ol-chapter-nav-marker-pulse" aria-hidden="true" />}
                    <span className="ol-chapter-nav-marker" aria-hidden="true" />
                  </span>
                  <span className="ol-chapter-nav-label">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

const useChapterJourneyScroll = (chapterRef, heroRef, enabled) => {
  const [heroKickoff, setHeroKickoff] = useState(0.06);

  useEffect(() => {
    if (!enabled) return undefined;
    const measure = () => {
      const chapter = chapterRef?.current;
      const hero = heroRef?.current;
      if (!chapter || !hero) return;
      const scrollSpan = Math.max(chapter.offsetHeight - window.innerHeight, 1);
      const heroFraction = hero.offsetHeight / scrollSpan;
      setHeroKickoff(Math.min(0.18, heroFraction * 0.38));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [chapterRef, heroRef, enabled]);

  const { scrollYProgress: chapterProgress } = useScroll({
    target: chapterRef,
    offset: ['start start', 'end end'],
  });

  const scrollYProgress = useTransform(
    chapterProgress,
    enabled ? [heroKickoff, 1] : [0, 1],
    enabled ? [-0.05, 1] : [0, 1],
    { clamp: true }
  );

  const [introStart, introEnd] = JOURNEY.intro;
  const introSpan = introEnd - introStart;
  const journeyDarkBg = useTransform(
    scrollYProgress,
    [-0.05, introStart + introSpan * 0.42],
    [1, 0],
    { ease: scrollEase }
  );
  const heroContentOpacity = useTransform(
    journeyDarkBg,
    [1, 0.52, 0.1],
    [1, 0.35, 0],
    { ease: scrollEase }
  );

  return {
    scrollYProgress,
    journeyDarkBg,
    heroContentOpacity,
  };
};

const OfferScrollJourney = ({
  tier,
  tiers,
  praxiTiers,
  offer,
  costCompare,
  insteadLabel,
  journeyRef: externalJourneyRef,
  chapterRef,
  heroRef,
  scrollYProgress: externalScrollYProgress,
  sharedBackdrop = false,
}) => {
  const internalJourneyRef = useRef(null);
  const journeyRef = externalJourneyRef || internalJourneyRef;
  const [towerActive, setTowerActive] = useState(1);
  const baseSetupPrice = (tier?.setup || '').replace(/^\+\s*/, '');

  const internalScroll = useScroll({
    target: journeyRef,
    offset: ['start start', 'end end'],
  });
  const fallbackScrollYProgress = internalScroll.scrollYProgress;
  const scrollYProgress = externalScrollYProgress ?? fallbackScrollYProgress;

  const scenes = offer.pyxidaScrollScenes || [];
  const botLabel = offer.pyxidaBotLabel || 'Bot · Pyxida';
  const crmLabel = offer.pyxidaCrmLabel || 'CRM · Pyxida';
  const pyxidaFeatureRanges = getPyxidaFeatureRanges(scenes.length);
  const journeyVh = 340 + scenes.length * 22 + praxiTiers.length * 118;

  const handleChapterSelect = useCallback((kind, moduleIndex = 0) => {
    const el = journeyRef?.current;
    if (!el) return;
    const progress = kind === 'pyxida'
      ? getPyxidaScrollTarget()
      : getModuleScrollTarget(moduleIndex);
    if (progress != null) {
      scrollToJourneyProgress(el, progress, JOURNEY_NAV_OFFSET);
    }
  }, [journeyRef]);

  const offerShellFade = useMemo(() => {
    const [start, end] = JOURNEY.pyxidaOffer;
    const features = tier?.scrollFeatures || tier?.features?.slice(0, 6) || [];
    const giftRows = offer.giftRows || [];
    const listsCompleteStep = getOfferListsCompleteStep(features, giftRows);
    const totalSteps = listsCompleteStep + 1;
    const timing = getOfferTailTiming(start, end, totalSteps, listsCompleteStep);
    return {
      shellFadeStart: timing.shellFadeStart,
      shellFadeEnd: timing.shellFadeEnd,
    };
  }, [tier, offer.giftRows]);

  const intro = useIntroShellMotion(scrollYProgress, ...JOURNEY.intro);

  const leadScene = useLeadSceneMotion(scrollYProgress, LEAD_START, LEAD_END);
  const pyxidaOfferScene = useOfferSceneMotion(
    scrollYProgress,
    JOURNEY.pyxidaOffer[0],
    JOURNEY.pyxidaOffer[1],
    offerShellFade.shellFadeStart,
    offerShellFade.shellFadeEnd
  );
  const modKleinei = useFirstModuleSceneMotion(scrollYProgress, ...JOURNEY.modKleinei);
  const modFernei = useSceneMotion(scrollYProgress, ...JOURNEY.modules[0], { flip: false });
  const modSikonei = useSceneMotion(scrollYProgress, ...JOURNEY.modules[1], { flip: false, holdAtEnd: true });
  const praxiSceneMotions = [modKleinei, modFernei, modSikonei];
  const praxiSceneStarts = [JOURNEY.modKleinei[0], JOURNEY.modules[0][0], JOURNEY.modules[1][0]];
  const praxiSceneEnds = [JOURNEY.modKleinei[1], JOURNEY.modules[0][1], JOURNEY.modules[1][1]];

  const [introStart, introEnd] = JOURNEY.intro;
  const introSpan = introEnd - introStart;
  const journeyDarkBg = useTransform(
    scrollYProgress,
    [-0.05, introStart + introSpan * 0.42],
    [1, 0],
    { ease: scrollEase }
  );
  const moduleFadeIn = PRAXI_MODULE_START - LEAD_MODULE_CROSSFADE;
  const moduleLayerOpacity = useTransform(scrollYProgress, [moduleFadeIn, PRAXI_MODULE_START], [0, 1], { ease: scrollEase });
  const moduleLayerY = useTransform(scrollYProgress, [moduleFadeIn, PRAXI_MODULE_START], [14, 0], { ease: scrollEase });
  const moduleLayerScale = useTransform(scrollYProgress, [moduleFadeIn, PRAXI_MODULE_START], [0.99, 1], { ease: scrollEase });
  const towerOpacity = useTransform(scrollYProgress, [moduleFadeIn, PRAXI_MODULE_START], [0, 1], { ease: scrollEase });
  const towerY = useTransform(scrollYProgress, [moduleFadeIn, PRAXI_MODULE_START], [12, 0], { ease: scrollEase });
  const towerScale = useTransform(scrollYProgress, [moduleFadeIn, PRAXI_MODULE_START], [0.96, 1], { ease: scrollEase });
  const moduleLayerVisibility = useTransform(moduleLayerOpacity, (v) => (v < 0.04 ? 'hidden' : 'visible'));
  useEffect(() => {
    const syncTower = (v) => {
      const moduleIndex = getModuleIndexAtProgress(v, praxiTiers.length);
      const idx = moduleIndex < 0 ? 0 : moduleIndex + 1;
      setTowerActive((prev) => (prev === idx ? prev : idx));
    };

    syncTower(scrollYProgress.get());

    const unsub = scrollYProgress.on('change', syncTower);
    return () => unsub();
  }, [scrollYProgress, praxiTiers.length]);

  return (
    <section
      className="ol-pyxida-journey ol-offer-journey"
      ref={journeyRef}
      id="tier-apanta"
      aria-label="Pyxida and Praxi"
      style={{ height: `${journeyVh}vh` }}
    >
      <div id="ol-praxi-journey" className="ol-offer-journey-anchor" aria-hidden="true" />
      <div className="ol-pyxida-sticky">
        {!sharedBackdrop && (
          <>
            <div className="ol-journey-bg ol-journey-bg--light" aria-hidden="true" />
            <motion.div
              className="ol-journey-bg ol-journey-bg--dark"
              style={{ opacity: journeyDarkBg }}
              aria-hidden="true"
            />
          </>
        )}
        <PyxidaScrollCompass scrollYProgress={scrollYProgress} variant="tr" />
        <PyxidaScrollCompass scrollYProgress={scrollYProgress} variant="bl" />
        <div className="ol-pyxida-scene-slot container">
          <PyxidaIntroScene
            scrollYProgress={scrollYProgress}
            offer={offer}
            shellMotion={intro}
          />

          {scenes.map((scene, i) => (
            <PyxidaFeatureSceneMotion
              key={scene.id}
              scene={scene}
              index={i}
              sceneCount={scenes.length}
              range={pyxidaFeatureRanges[i]}
              scrollYProgress={scrollYProgress}
              botLabel={botLabel}
              crmLabel={crmLabel}
            />
          ))}

          <PyxidaOfferScene
            tier={tier}
            offer={offer}
            costCompare={costCompare}
            sceneMotion={pyxidaOfferScene}
            sceneStart={PYXIDA_OFFER_START}
            sceneEnd={PYXIDA_OFFER_END}
            scrollYProgress={scrollYProgress}
          />

          <PraxiLeadScene
            offer={offer}
            shellMotion={leadScene}
            scrollYProgress={scrollYProgress}
            sceneStart={LEAD_START}
            sceneEnd={LEAD_END}
            journeyRef={journeyRef}
          />

          <motion.div
            className="ol-praxi-module-layer"
            style={{ opacity: moduleLayerOpacity, y: moduleLayerY, scale: moduleLayerScale, visibility: moduleLayerVisibility }}
          >
            <div className="ol-praxi-scene-layout">
              <motion.div
                className="ol-praxi-tower-panel"
                style={{ opacity: towerOpacity, y: towerY, scale: towerScale }}
                aria-hidden="false"
              >
                <CenterStackTower
                  tiers={tiers}
                  activeIndex={towerActive}
                  moduleIndexPrefix={offer.praxiModuleIndexPrefix}
                  onChapterSelect={handleChapterSelect}
                />
              </motion.div>
              <div className="ol-praxi-scenes-panel">
                {praxiTiers.map((praxiTier, i) => (
                  <PraxiModuleScene
                    key={praxiTier.id}
                    tier={praxiTier}
                    index={i}
                    moduleCount={praxiTiers.length}
                    sceneMotion={praxiSceneMotions[i]}
                    sceneStart={praxiSceneStarts[i]}
                    sceneEnd={praxiSceneEnds[i]}
                    scrollYProgress={scrollYProgress}
                    offer={offer}
                    setupPrice={baseSetupPrice}
                    moduleIndexPrefix={offer.praxiModuleIndexPrefix}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PraxiModuleFeature = ({ feature, scrollYProgress, fadeIn, fadeOut }) => {
  const itemOpacity = useTransform(scrollYProgress, [fadeIn, fadeOut], [0, 1], { ease: scrollEase });
  return (
    <motion.li style={{ opacity: itemOpacity }}>
      {feature}
    </motion.li>
  );
};

const PraxiModuleScene = ({
  tier,
  index,
  moduleCount,
  sceneMotion: motionValues,
  sceneStart,
  sceneEnd,
  scrollYProgress,
  offer,
  setupPrice,
  moduleIndexPrefix = 'Module',
}) => {
  const { copyX, visualX, ...shellMotion } = motionValues;
  const start = sceneStart;
  const end = sceneEnd;
  const features = tier.scrollFeatures || tier.features.slice(0, 4);
  const totalSteps = 5 + features.length;
  const stackZ = index + 5;

  const indexMotion = useScrollReveal(scrollYProgress, start, end, 0, totalSteps);
  const verbMotion = useScrollReveal(scrollYProgress, start, end, 1, totalSteps);
  const focusMotion = useScrollReveal(scrollYProgress, start, end, 2, totalSteps);
  const tagMotion = useScrollReveal(scrollYProgress, start, end, 3, totalSteps);
  const priceMotion = useScrollReveal(scrollYProgress, start, end, 4, totalSteps);

  return (
    <PyxidaScene {...shellMotion} zIndex={stackZ} className="ol-pyxida-scene--feature" id={`tier-${tier.id}`}>
      <div className="ol-pyxida-scene-grid ol-praxi-module-grid">
        <motion.div className="ol-pyxida-scene-copy ol-praxi-module-copy" style={{ x: copyX }}>
          <motion.span className="ol-module-index" style={{ opacity: indexMotion.opacity, y: indexMotion.y }}>
            {moduleIndexLabel(moduleIndexPrefix, index)}
          </motion.span>
          <motion.h3 className="ol-scene-title ol-praxi-module-verb" style={{ opacity: verbMotion.opacity, y: verbMotion.y }}>
            {tier.verb}
          </motion.h3>
          <motion.p className="ol-scene-body ol-praxi-module-focus" style={{ opacity: focusMotion.opacity, y: focusMotion.y }}>
            {tier.productRole}
          </motion.p>
          <motion.p className="ol-scene-body ol-praxi-module-tagline" style={{ opacity: tagMotion.opacity, y: tagMotion.y }}>
            {tier.tagline}
          </motion.p>
          <motion.div className="ol-praxi-module-pricing" style={{ opacity: priceMotion.opacity, y: priceMotion.y }}>
            <PraxiModulePriceDisplay
              tier={tier}
              setupPrice={setupPrice}
              offer={offer}
            />
          </motion.div>
          <ul className="ol-pyxida-offer-features ol-praxi-module-features">
            {features.map((feature, i) => {
              const [fadeIn, fadeOut] = sceneStep(start, end, 5 + i, totalSteps);
              return (
                <PraxiModuleFeature
                  key={feature}
                  feature={feature}
                  scrollYProgress={scrollYProgress}
                  fadeIn={fadeIn}
                  fadeOut={fadeOut}
                />
              );
            })}
          </ul>
        </motion.div>
        <motion.div
          className="ol-pyxida-scene-visual-wrap ol-pyxida-scene-visual-wrap--praxi ol-pyxida-scene-visual-wrap--crm"
          style={{ x: visualX }}
        >
          <VisualStage accent="crm" variant={`praxi-${tier.id}`}>
            <ModuleVisual tierId={tier.id} />
          </VisualStage>
        </motion.div>
      </div>
    </PyxidaScene>
  );
};

const OfferLadderSection = ({ heroPrefix = null }) => {
  const { t, language } = useTranslation();
  const offerJourneyRef = useRef(null);
  const offerSectionRef = useRef(null);
  const chapterRef = useRef(null);
  const heroRef = useRef(null);

  const [navVisible, setNavVisible] = useState(false);

  const tiers = t('ypodochiPage.tiers') || [];
  const offer = t('ypodochiPage.offer') || {};
  const costCompare = t('ypodochiPage.costCompare') || {};
  const insteadLabel = t('ypodochiPage.insteadLabel') || 'αντί';

  const pyxidaTier = tiers[0];
  const praxiTiers = tiers.slice(1);
  const chapterScroll = useChapterJourneyScroll(chapterRef, heroRef, Boolean(heroPrefix));

  useEffect(() => {
    const navOffset = JOURNEY_NAV_OFFSET;

    const updateNav = () => {
      const journey = offerJourneyRef.current;
      const section = offerSectionRef.current;
      if (!journey) return;

      const rect = journey.getBoundingClientRect();
      const sectionRect = section?.getBoundingClientRect() ?? rect;
      const journeyScroll = Math.max(0, navOffset - rect.top);
      const progress = journeyScroll / Math.max(journey.offsetHeight - window.innerHeight, 1);

      const entered = rect.top <= navOffset + 8;
      const inStickyJourney = rect.bottom > navOffset + 72;
      const stillInOfferSection = sectionRect.bottom > navOffset + 72;
      const lastModuleStart = JOURNEY.modules[JOURNEY.modules.length - 1][0] - SCENE_CROSSFADE;
      const reachedLastModule = progress >= lastModuleStart;

      const inJourney = entered && (
        inStickyJourney || (reachedLastModule && stillInOfferSection)
      );

      setNavVisible(inJourney);
    };

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    return () => {
      window.removeEventListener('scroll', updateNav);
      window.removeEventListener('resize', updateNav);
    };
  }, [pyxidaTier, praxiTiers.length]);

  return (
    <ProductVisualLanguageProvider language={language}>
    <section className="offer-ladder" id="offer" ref={offerSectionRef}>
      <OfferChapterNav
        visible={navVisible}
        offer={offer}
        journeyRef={offerJourneyRef}
        praxiTiers={praxiTiers}
      />

      <div className="ol-chapter" ref={chapterRef}>
        {heroPrefix && chapterScroll && (
          <>
            <div className="ol-chapter-bg ol-chapter-bg--light" aria-hidden="true" />
            <motion.div
              className="ol-chapter-bg ol-chapter-bg--dark"
              style={{ opacity: chapterScroll.journeyDarkBg }}
              aria-hidden="true"
            >
              <PageHeroBackdrop />
            </motion.div>
          </>
        )}

        {heroPrefix && (
          <motion.div
            ref={heroRef}
            className="ol-chapter-hero"
            style={{ opacity: chapterScroll?.heroContentOpacity }}
          >
            {heroPrefix}
          </motion.div>
        )}

        {pyxidaTier && (
          <OfferScrollJourney
            tier={pyxidaTier}
            tiers={tiers}
            praxiTiers={praxiTiers}
            offer={offer}
            costCompare={costCompare}
            insteadLabel={insteadLabel}
            journeyRef={offerJourneyRef}
            chapterRef={chapterRef}
            heroRef={heroRef}
            scrollYProgress={chapterScroll?.scrollYProgress}
            sharedBackdrop={Boolean(heroPrefix)}
          />
        )}
      </div>
    </section>
    </ProductVisualLanguageProvider>
  );
};

export default OfferLadderSection;
