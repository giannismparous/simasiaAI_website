import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveConstellation from './InteractiveConstellation';
import { useTranslation } from '../hooks/useTranslation';
import './EnterpriseCTA.css';

const EnterpriseCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });
  const { t } = useTranslation();

  return (
    <section className="enterprise-cta" ref={ref}>
      <InteractiveConstellation pattern="minimal" />
      <motion.div
        className="enterprise-cta-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2>{t('enterpriseCta.title')}</h2>
        <p className="enterprise-cta-lead">
          {t('enterpriseCta.leadBefore')}{' '}
          <strong>{t('enterpriseCta.brand')}</strong>{' '}
          {t('enterpriseCta.leadAfter')}
        </p>
        <div className="enterprise-cta-buttons">
          <Link to="/demo" className="btn-cta-primary">
            {t('enterpriseCta.cta')}
          </Link>
          <a href="mailto:contact@simasiaai.gr" className="btn-cta-secondary">
            contact@simasiaai.gr
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default EnterpriseCTA;
