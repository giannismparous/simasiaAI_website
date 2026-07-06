import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './CollaborationsPage.css';

const LOGO_MAP = {
  'ΠΟΑμΣΚΠ': '/logos/poamskp.png',
  'BPAN Heroes': '/logos/bepan.png',
  'Perfectaki Able': '/logos/perfectaki.png',
  'Μυρτώ': '/logos/kapa3.png',
  'ΚΑΠΑ3': '/logos/kapa3.png',
};

const getLogoForCollab = (name) => {
  for (const [key, path] of Object.entries(LOGO_MAP)) {
    if (name?.includes(key)) return path;
  }
  return null;
};

const CollaborationsPage = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '100px' });
  const collaborations = t('collaborations.current.items') || [];

  return (
    <div className="collabs-page">
      {/* Hero */}
      <section className="cp-hero">
        <div className="container" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="cp-eyebrow">SimasiaAI</span>
            <h1>Συνεργασίες</h1>
            <p className="cp-hero-sub">Τέσσερα προγράμματα Simaki σε υλοποίηση για οργανισμούς που εργάζονται με εμπάθεια και ανθρώπινη μέριμνα.</p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="cp-cards" ref={cardsRef}>
        <div className="container">
          <div className="cp-cards-grid">
            {collaborations.map((collab, i) => {
              const logoSrc = getLogoForCollab(collab.name);
              return (
                <motion.div
                  key={i}
                  className="cp-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  {logoSrc && (
                    <div className="cp-card-logo-wrap">
                      <img src={logoSrc} alt={collab.name} className="cp-card-logo" />
                    </div>
                  )}
                  {collab.category && (
                    <span className="cp-card-badge">{collab.category}</span>
                  )}
                  <h3 className="cp-card-name">{collab.name}</h3>
                  {collab.product && <p className="cp-card-product">{collab.product}</p>}
                  {collab.description && <p className="cp-card-desc">{collab.description}</p>}
                  <div className="cp-card-footer">
                    {collab.link && (
                      <a href={collab.link} target="_blank" rel="noopener noreferrer" className="cp-card-link">
                        Περισσότερα →
                      </a>
                    )}
                    <Link to="/book-demo" className="cp-card-cta">ενδιαφέρομαι</Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollaborationsPage;
