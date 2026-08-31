import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import OfferLadderSection from '../components/OfferLadderSection';
import { useTranslation } from '../hooks/useTranslation';
import { DemoCtaStack } from '../components/DemoScarcityBanner';
import './YpodochiPage.css';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = { duration: 0.7, ease };

const splitCloseLine = (text, accent) => {
  if (!text) return { before: '', accent: '', after: '' };
  if (!accent || !text.includes(accent)) {
    return { before: text, accent: '', after: '' };
  }
  const [before, after] = text.split(accent);
  return { before, accent, after };
};

const PainHero = () => {
  const { t } = useTranslation();
  const bullets = t('ypodochiPage.pain.bullets') || [];
  const close = t('ypodochiPage.pain.close') || '';
  const closeParts = splitCloseLine(close, t('ypodochiPage.pain.closeAccent'));
  const titleDelay = 0.08;
  const listStart = 0.28;
  const itemStagger = 0.14;
  const closeDelay = listStart + bullets.length * itemStagger + 0.12;
  const orangeDelay = closeDelay + 0.45;
  const orangeDuration = 2.2;
  const arrowDelay = orangeDelay + 0.35;
  const bridgeRef = useRef(null);
  const [arrowReady, setArrowReady] = useState(false);
  const [hideArrow, setHideArrow] = useState(false);

  useEffect(() => {
    const tId = window.setTimeout(() => setArrowReady(true), arrowDelay * 1000);
    return () => window.clearTimeout(tId);
  }, [arrowDelay]);

  useEffect(() => {
    const el = bridgeRef.current;
    if (!el) return undefined;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const bridgeOnScreen = rect.top < vh * 0.9 && rect.bottom > vh * 0.08;
      const scrolledPast = rect.bottom <= 0;
      setHideArrow(bridgeOnScreen || scrolledPast);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const showArrow = arrowReady && !hideArrow;
  const arrow = (
    <div className={`ypd-hero-scroll${showArrow ? ' ypd-hero-scroll--visible' : ''}`} aria-hidden="true">
      <span className="ypd-hero-scroll-chevron">↓</span>
    </div>
  );

  return (
    <section className="ypd-hero">
      <div className="container">
        <div className="ypd-hero-inner">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...fadeUp, duration: 0.55, delay: titleDelay }}
          >
            {t('ypodochiPage.pain.title')}
          </motion.h1>
          <ul className="ypd-hero-list">
            {bullets.map((bullet, i) => (
              <motion.li
                key={bullet}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: listStart + i * itemStagger }}
              >
                {bullet}
              </motion.li>
            ))}
          </ul>
          <motion.p
            className="ypd-hero-close"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...fadeUp, duration: 0.6, delay: closeDelay }}
          >
            {closeParts.before}
            {closeParts.accent ? (
              <motion.span
                className="ypd-hero-close-accent"
                initial={{ color: 'rgba(250, 249, 245, 0.92)' }}
                animate={{ color: '#d97757' }}
                transition={{ delay: orangeDelay, duration: orangeDuration, ease: [0.22, 0.08, 0.25, 1] }}
              >
                {closeParts.accent}
              </motion.span>
            ) : null}
            {closeParts.after}
          </motion.p>
          <motion.p
            ref={bridgeRef}
            className="ypd-hero-bridge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.85, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.85, ease }}
          >
            {t('ypodochiPage.pain.bridge')}
          </motion.p>
        </div>
      </div>
      {typeof document !== 'undefined' ? createPortal(arrow, document.body) : null}
    </section>
  );
};

const YpodochiFaqItem = ({ item, index, isOpen, onToggle }) => (
  <div className={`ypd-faq-item${isOpen ? ' ypd-faq-item--open' : ''}`}>
    <button
      type="button"
      className="ypd-faq-q"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="ypd-faq-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="ypd-faq-q-text">{item.q}</span>
      <span className="ypd-faq-icon" aria-hidden="true" />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className="ypd-faq-a-wrap"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.34, ease }}
        >
          <p className="ypd-faq-a">
            {item.demoLink ? (
              <>
                {item.a}
                <Link to="/demo" className="ypd-faq-demo-link">{item.demoLink}</Link>
                {item.aAfter}
              </>
            ) : (
              item.a
            )}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const YpodochiPage = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(-1);

  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (!hash) return undefined;
    const scrollToHash = () => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const tId = window.setTimeout(scrollToHash, 450);
    return () => window.clearTimeout(tId);
  }, []);

  const faqItems = t('ypodochiPage.faq') || [];
  const faqLeft = faqItems.slice(0, 7);
  const faqRight = faqItems.slice(7);

  const heroPrefix = <PainHero />;

  return (
    <div className="ypd-page">
      <OfferLadderSection heroPrefix={heroPrefix} />

      <section className="ypd-ngo" id="ypd-ngo">
        <div className="container">
          <span className="ypd-ngo-label">{t('ypodochiPage.ngo.label')}</span>
          <h2 className="ypd-ngo-title">{t('ypodochiPage.ngo.title')}</h2>
          <p className="ypd-ngo-pain">{t('ypodochiPage.ngo.pain')}</p>
          <ul className="ypd-ngo-help">
            {(t('ypodochiPage.ngo.helpRows') || []).map((row) => (
              <li key={row.lead} className="ypd-ngo-help-item">
                <span className="ypd-ngo-help-icon" aria-hidden="true" />
                <div className="ypd-ngo-help-copy">
                  <p className="ypd-ngo-help-lead">{row.lead}</p>
                  <p className="ypd-ngo-help-text">{row.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="ypd-ngo-funding">{t('ypodochiPage.ngo.funding')}</p>
          <div className="ypd-ngo-cta-stack">
            <Link to="/demo" className="btn btn-primary btn-large">{t('ypodochiPage.ngo.cta')}</Link>
          </div>
        </div>
      </section>

      <section className="ypd-faq">
        <div className="container">
          <div className="ypd-faq-head">
            <span className="ypd-faq-eyebrow">{t('ypodochiPage.faqSection.eyebrow')}</span>
            <h2 className="ypd-faq-title">{t('ypodochiPage.faqSection.title')}</h2>
          </div>
          <div className="ypd-faq-columns">
            <div className="ypd-faq-col">
              {faqLeft.map((item, i) => (
                <YpodochiFaqItem
                  key={item.q}
                  item={item}
                  index={i}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
            <div className="ypd-faq-col">
              {faqRight.map((item, i) => (
                <YpodochiFaqItem
                  key={item.q}
                  item={item}
                  index={i + faqLeft.length}
                  isOpen={openFaq === i + faqLeft.length}
                  onToggle={() => setOpenFaq(openFaq === i + faqLeft.length ? -1 : i + faqLeft.length)}
                />
              ))}
            </div>
          </div>
          <div className="ypd-faq-cta">
            <DemoCtaStack>
              <Link to="/demo" className="btn btn-primary btn-large">{t('ypodochiPage.finalCta.cta')}</Link>
            </DemoCtaStack>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YpodochiPage;