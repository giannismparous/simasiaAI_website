import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeroBackdrop from '../components/PageHeroBackdrop';
import PrincipleIcon from '../components/PrincipleIcons';
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

const wrapAtWidth = (text, maxChars) => {
  if (!text) return [];
  const lines = [];
  let remaining = text;
  const limit = Math.max(16, maxChars);
  while (remaining.length > 0) {
    if (remaining.length <= limit) {
      lines.push(remaining);
      break;
    }
    let breakAt = remaining.lastIndexOf(' ', limit);
    if (breakAt <= 0) breakAt = limit;
    lines.push(remaining.slice(0, breakAt));
    remaining = remaining.slice(breakAt).trimStart();
  }
  return lines;
};

// Live-coding typewriter — IDE-style with line numbers sized to the editor width
const LiveCodingText = ({ text }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [maxChars, setMaxChars] = useState(72);
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    setCharIndex(0);
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    const probe = measureRef.current;
    if (!el || !probe) return;

    const update = () => {
      const available = el.clientWidth - 48; // gutter + padding
      const charW = probe.getBoundingClientRect().width || 8;
      setMaxChars(Math.max(16, Math.floor(available / charW)));
    };

    update();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro?.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!isInView || charIndex >= text.length) return;
    const delay = text.charAt(charIndex) === '.' ? 120 : text.charAt(charIndex) === ',' ? 80 : 22;
    const timer = setTimeout(() => setCharIndex((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [isInView, charIndex, text]);

  const displayed = text.slice(0, charIndex);
  const lines = wrapAtWidth(displayed, maxChars);

  return (
    <div ref={containerRef} className="tp-code-lines">
      <span ref={measureRef} className="tp-char-probe" aria-hidden="true">
        M
      </span>
      {lines.map((line, i) => (
        <div key={i} className="tp-code-line">
          <span className="tp-line-num">{String(i + 1).padStart(2, ' ')}</span>
          <span className="tp-line-text">{line}</span>
          {i === lines.length - 1 && charIndex < text.length && (
            <span className="tp-cursor">▌</span>
          )}
        </div>
      ))}
      {charIndex >= text.length && (
        <div className="tp-code-line tp-code-done">
          <span className="tp-line-num">{String(Math.max(lines.length, 1) + 1).padStart(2, ' ')}</span>
          <span className="tp-line-text tp-done-mark">✓ complete</span>
        </div>
      )}
    </div>
  );
};

const TeamPage = () => {
  const { t } = useTranslation();
  const ceoRef = useRef(null);
  const teamRef = useRef(null);
  const principlesRef = useRef(null);
  const missionRef = useRef(null);

  const ceoInView = useInView(ceoRef, { once: true, margin: '100px' });
  const principlesInView = useInView(principlesRef, { once: true, margin: '100px' });
  const missionInView = useInView(missionRef, { once: true, margin: '100px' });

  const [flippedCards, setFlippedCards] = useState({});
  const toggleFlip = (id) => setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  const teamMembers = Array.isArray(t('teamPage.team')) ? t('teamPage.team') : [];
  const principles = Array.isArray(t('teamPage.principles')) ? t('teamPage.principles') : [];

  return (
    <div className="tp-page">
      {/* Hero */}
      <section className="tp-hero">
        <PageHeroBackdrop />
        <div className="container">
          <motion.div
            className="tp-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: Math.min(i * 0.08, 0.4), ease }}
                  onClick={() => toggleFlip(member.id)}
                >
                  <div className={`tp-card-flip ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* Front */}
                    <div className="tp-card-front">
                      <div className="tp-member-portrait">
                        <img
                          src={AVATARS[member.id]}
                          alt={member.name}
                          className={member.id === 'pantelis' ? 'tp-avatar-pantelis' : undefined}
                        />
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

          <div className="tp-principles-list">
            {principles.map((p, idx) => (
              <motion.div
                key={p.num}
                className="tp-principle-item"
                initial={{ opacity: 0, y: 16 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + idx * 0.08, ease }}
              >
                <span className="tp-principle-num">{p.num}</span>
                <div className="tp-principle-body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
                <PrincipleIcon num={p.num} className="tp-principle-icon" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission — live coding */}
      <section className="tp-mission" ref={missionRef}>
        <div className="container">
          <motion.div
            className="tp-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('teamPage.missionTitle')}</h2>
            <div className="tp-editor-box">
              <div className="tp-editor-titlebar">
                <span className="tp-dot red"></span>
                <span className="tp-dot yellow"></span>
                <span className="tp-dot green"></span>
              </div>
              <div className="tp-editor-tabs">
                <div className="tp-tab active">
                  <span className="tp-tab-icon">📄</span>
                  <span>{t('teamPage.terminalFile')}</span>
                </div>
              </div>
              <div className="tp-editor-body">
                <LiveCodingText text={t('teamPage.missionText')} />
              </div>
            </div>
            <div className="tp-mission-cta">
              <Link to="/demo" className="btn btn-primary btn-large">{t('teamPage.missionCta')}</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
