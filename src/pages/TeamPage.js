import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveConstellation from '../components/InteractiveConstellation';
import { useTranslation } from '../hooks/useTranslation';
import './TeamPage.css';
import stergiosReal from '../assets/stergios-real.png';
import dimitrisReal from '../assets/dimitris-real.png';
import giannisReal from '../assets/giannis-real.png';
import anastasiaReal from '../assets/anastasia-real.png';
import pantelisImg from '../assets/pantelis.png';

const AVATARS = {
  stergios: stergiosReal,
  dimitris: dimitrisReal,
  giannis: giannisReal,
  anastasia: anastasiaReal,
  pantelis: pantelisImg,
};

const ease = [0.16, 1, 0.3, 1];

// Typewriter component for the Mission section
const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={containerRef}>
      {displayedText}
      <span className="tp-cursor">|</span>
    </span>
  );
};

const TeamPage = () => {
  const { t } = useTranslation();
  const ceoRef = useRef(null);
  const teamRef = useRef(null);
  const principlesRef = useRef(null);
  const missionRef = useRef(null);

  const ceoInView = useInView(ceoRef, { once: true, margin: '100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '100px' });
  const principlesInView = useInView(principlesRef, { once: true, margin: '100px' });
  const missionInView = useInView(missionRef, { once: true, margin: '100px' });

  const [flippedCards, setFlippedCards] = useState({});
  const toggleFlip = (id) => setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  const [activePrinciple, setActivePrinciple] = useState(0);

  const teamMembers = t('teamPage.team');
  const principles = t('teamPage.principles');

  return (
    <div className="tp-page">
      {/* Hero */}
      <section className="tp-hero">
        <InteractiveConstellation pattern="people" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="tp-eyebrow">{t('teamPage.eyebrow')}</span>
            <h1>{t('teamPage.heroTitle')}</h1>
            <p className="tp-hero-sub">{t('teamPage.heroSub')}</p>
          </motion.div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="tp-ceo" ref={ceoRef}>
        <div className="container">
          <motion.div
            className="tp-ceo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={ceoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className="tp-ceo-layout">
              <div className="tp-ceo-portrait">
                <img src={stergiosReal} alt={t('teamPage.ceoName')} />
              </div>
              <div className="tp-ceo-copy">
                <span className="tp-badge">{t('teamPage.ceoBadge')}</span>
                <blockquote className="tp-ceo-quote">
                  {t('teamPage.ceoQuoteStart')}
                  <span className="tp-highlight-wrap">
                    <span className="tp-underline">{t('teamPage.ceoQuoteHighlight')}</span>
                  </span>
                  {t('teamPage.ceoQuoteEnd')}
                </blockquote>
                <h2>{t('teamPage.ceoName')}</h2>
                <h3 className="tp-ceo-title">{t('teamPage.ceoRole')}</h3>
                <p className="tp-ceo-bio">{t('teamPage.ceoBio')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Team Grid with 3D Flip Cards */}
      <section className="tp-team" ref={teamRef}>
        <div className="container">
          <motion.div
            className="tp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('teamPage.teamTitle')}</h2>
            <p>{t('teamPage.teamSub')}</p>
          </motion.div>

          <div className="tp-team-grid">
            {teamMembers.map((member, i) => {
              const isFlipped = !!flippedCards[member.id];
              return (
                <motion.div
                  key={member.id}
                  className="tp-card-scene"
                  initial={{ opacity: 0, y: 24 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  onClick={() => toggleFlip(member.id)}
                >
                  <div className={`tp-card-flip ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* Front */}
                    <div className="tp-card-front">
                      <div className="tp-member-portrait">
                        <img src={AVATARS[member.id]} alt={member.name} />
                        <div className="tp-flip-indicator">
                          <span>{t('teamPage.flipLabel')}</span>
                        </div>
                      </div>
                      <div className="tp-member-info">
                        <h3>{member.name}</h3>
                        <h4>{member.role}</h4>
                        <p className="tp-member-short">{member.shortBio}</p>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="tp-card-back">
                      <div className="tp-back-header">
                        <h3>{member.name}</h3>
                        <h4>{member.role}</h4>
                      </div>
                      <div className="tp-back-body">
                        <p>{member.bio}</p>
                        <div className="tp-skills-container">
                          <h5>{t('teamPage.skillsLabel')}</h5>
                          <div className="tp-skills-list">
                            {member.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="tp-skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="tp-back-footer">
                        <span>{t('teamPage.flipBack')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles with interactive tabs */}
      <section className="tp-principles" ref={principlesRef}>
        <div className="container">
          <motion.div
            className="tp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('teamPage.principlesTitle')}</h2>
            <p>{t('teamPage.principlesSub')}</p>
          </motion.div>

          <div className="tp-interactive-principles">
            <div className="tp-principles-nav">
              {principles.map((p, idx) => (
                <button
                  key={p.num}
                  className={`tp-principle-tab ${activePrinciple === idx ? 'active' : ''}`}
                  onClick={() => setActivePrinciple(idx)}
                >
                  <span className="tp-tab-num">{p.num}</span>
                  <span className="tp-tab-title">{p.title}</span>
                </button>
              ))}
            </div>

            <div className="tp-principles-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrinciple}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="tp-active-principle-card"
                >
                  <div className="tp-active-icon">{principles[activePrinciple].icon}</div>
                  <h3>{principles[activePrinciple].title}</h3>
                  <p>{principles[activePrinciple].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mission with typewriter */}
      <section className="tp-mission" ref={missionRef}>
        <div className="container">
          <motion.div
            className="tp-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('teamPage.missionTitle')}</h2>
            <div className="tp-mission-writer-box">
              <div className="tp-terminal-header">
                <span className="tp-dot red"></span>
                <span className="tp-dot yellow"></span>
                <span className="tp-dot green"></span>
                <span className="tp-terminal-title">{t('teamPage.terminalFile')}</span>
              </div>
              <div className="tp-terminal-body">
                <p className="tp-mission-text">
                  <TypewriterText text={t('teamPage.missionText')} />
                </p>
              </div>
            </div>
            <div className="tp-mission-cta">
              <Link to="/book-demo" className="btn btn-primary btn-large">{t('teamPage.missionCta')}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
