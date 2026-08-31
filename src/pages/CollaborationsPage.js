import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import PageHeroBackdrop from '../components/PageHeroBackdrop';
import CollaborationsIntroCopy from '../components/CollaborationsIntroCopy';
import './CollaborationsPage.css';

const LOGO_MAP = {
  'ΠΟΑμΣΚΠ': '/logos/poamskp.png',
  'POAMSKP': '/logos/poamskp.png',
  'ΠΟΑΜΣΚΠ': '/logos/poamskp.png',
  'BPAN': '/logos/bepan.png',
  'bepan': '/logos/bepan.png',
  'Bpan': '/logos/bepan.png',
  'Perfectaki': '/logos/perfectaki.png',
  'Μυρτώ': '/logos/kapa3.png',
  'ΚΑΠΑ3': '/logos/kapa3.png',
  'Κ3': '/logos/kapa3.png',
  'Cancer': '/logos/kapa3.png',
};

const LINK_MAP = {
  'Κ3': 'https://www.kapa3.gr',
  'ΚΑΠΑ3': 'https://www.kapa3.gr',
  'Cancer': 'https://www.kapa3.gr',
  'ΠΟΑμΣΚΠ': 'https://www.poamskp.gr',
  'POAMSKP': 'https://www.poamskp.gr',
  'ΠΟΑΜΣΚΠ': 'https://www.poamskp.gr',
  'BPAN': 'https://bpanheroes.gr',
  'bepan': 'https://bpanheroes.gr',
  'Bpan': 'https://bpanheroes.gr',
  'Perfectaki': 'https://perfectaki.com',
};

const getLogoForCollab = (name) => {
  for (const [key, path] of Object.entries(LOGO_MAP)) {
    if (name?.includes(key)) return path;
  }
  return null;
};

const getLinkForCollab = (name) => {
  for (const [key, url] of Object.entries(LINK_MAP)) {
    if (name?.includes(key)) return url;
  }
  return null;
};

const CollaborationsPage = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: '100px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '100px' });
  const collaborations = t('collaborations.current.items') || [];

  return (
    <div className="collabs-page">
      {/* Hero */}
      <section className="cp-hero">
        <PageHeroBackdrop />
        <div className="container" ref={heroRef}>
          <motion.div
            className="cp-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>{t('collaborationsPage.title')}</h1>
            <p className="cp-hero-sub">{t('collaborationsPage.heroSub')}</p>
          </motion.div>
        </div>
      </section>

      <section className="cp-intro" ref={introRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <CollaborationsIntroCopy />
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="cp-cards" ref={cardsRef}>
        <div className="container">
          <div className="cp-cards-grid">
            {collaborations.map((collab, i) => {
              const logoSrc = collab.logo || getLogoForCollab(collab.name);
              const collabLink = getLinkForCollab(collab.name) || collab.link;
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
                      {collabLink ? (
                        <a href={collabLink} target="_blank" rel="noopener noreferrer">
                          <img src={logoSrc} alt={collab.name} className="cp-card-logo" />
                        </a>
                      ) : (
                        <img src={logoSrc} alt={collab.name} className="cp-card-logo" />
                      )}
                    </div>
                  )}
                  {collab.category && (
                    <span className="cp-card-badge">{collab.category}</span>
                  )}
                  <h3 className="cp-card-name">{collab.name}</h3>
                  {collab.product && <p className="cp-card-product">{collab.product}</p>}
                  {collab.description && <p className="cp-card-desc">{collab.description}</p>}
                  <div className="cp-card-footer">
                    {collabLink && (
                      <a href={collabLink} target="_blank" rel="noopener noreferrer" className="cp-card-cta">
                        {t('collaborationsPage.more')}
                      </a>
                    )}
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
