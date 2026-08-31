import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarCanvas from './StarCanvas';
import HeroCareVisual from './HeroCareVisual';
import { useTranslation } from '../hooks/useTranslation';
import MissionReveal from './MissionReveal';
import './ForbesHero.css';

const COMPACT_MQ = '(max-width: 920px)';

const ForbesHero = () => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const words = t('forbesHero.words');
  const humanWord = t('forbesHero.humanWord');
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(COMPACT_MQ).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MQ);
    const sync = () => setIsCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <section className="fh-section" ref={ref}>
      <StarCanvas showFigure={false} />
      <div className="fh-layout">
        <div className="fh-inner">
          <h1 className="fh-headline" aria-label={t('forbesHero.ariaLabel')}>
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className={`fh-word ${word === humanWord ? 'fh-word-human' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.div
            className="fh-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            className="fh-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('forbesHero.subText')}
          </motion.p>
          {isCompact && (
            <motion.div
              className="fh-visual fh-visual--inline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.02, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroCareVisual />
            </motion.div>
          )}
          {isCompact && (
            <motion.div
              className="fh-mission-block fh-mission-block--inline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="fh-mission fh-mission-label">{t('forbesHero.missionLine')}</p>
              {t('forbesHero.missionLineBold') && (
                <MissionReveal text={t('forbesHero.missionLineBold')} />
              )}
            </motion.div>
          )}
          <motion.div
            className="fh-ctas"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/ypodochi" className="fh-btn-primary">{t('forbesHero.ctaPrimary')}</Link>
            <Link to="/demo" className="fh-btn-ghost">{t('forbesHero.ctaSecondary')} <span className="fh-arrow">→</span></Link>
          </motion.div>
        </div>
        {!isCompact && (
          <motion.div
            className="fh-right-col"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="fh-visual">
              <HeroCareVisual />
            </div>
            <aside className="fh-aside" aria-label={t('forbesHero.missionLine')}>
              <p className="fh-mission fh-mission-label">{t('forbesHero.missionLine')}</p>
              {t('forbesHero.missionLineBold') && (
                <MissionReveal text={t('forbesHero.missionLineBold')} />
              )}
            </aside>
          </motion.div>
        )}
      </div>
      <motion.div
        className="fh-coord"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        {t('forbesHero.coords')}
      </motion.div>
      <motion.div
        className="fh-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <motion.div
          className="fh-scroll-line"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default ForbesHero;
