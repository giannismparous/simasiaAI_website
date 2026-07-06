import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './PartnershipsSection.css';

const HOME_LOGOS = [
  { src: '/logos/kapa3.png', alt: 'Μυρτώ / ΚΑΠΑ3' },
  { src: '/logos/poamskp.png', alt: 'ΣΚΠ-i / ΠΟΑμΣΚΠ' },
  { src: '/Collaborations/Logos/dia_zwsis.png', alt: 'Δια ζώση' },
  { src: '/logos/bepan.png', alt: 'BPAN Heroes' },
  { src: '/logos/perfectaki.png', alt: 'Perfectaki Able' },
];

const ease = [0.16, 1, 0.3, 1];

const PartnershipsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section className="collabs-section" ref={ref}>
      <div className="container">
        <motion.div
          className="collabs-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <h2>{t('collaborations.home.headline')}</h2>
          <p>{t('collaborations.home.paragraph1')}</p>
          <p>{t('collaborations.home.paragraph2')}</p>
          <p>{t('collaborations.home.paragraph3')}</p>
          <Link to="/collaborations" className="collabs-view-all">
            {t('collaborations.home.viewAll')}
          </Link>
        </motion.div>

        <motion.div
          className="collabs-logo-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          {HOME_LOGOS.map((logo, i) => (
            <div key={logo.src} className="collab-logo-cell">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                style={{ transitionDelay: `${i * 40}ms` }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
