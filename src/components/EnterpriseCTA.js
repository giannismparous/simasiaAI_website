import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveConstellation from './InteractiveConstellation';
import { useTranslation } from '../hooks/useTranslation';
import { GoLabel } from './flow/modules';
import './EnterpriseCTA.css';

// Closing invitation: build your fλow (primary) or book 30 minutes (secondary).
const EnterpriseCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });
  const { t } = useTranslation();
  const reassure = t('enterpriseCta.reassure');

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
          <strong>f<span className="go-l">λ</span>ow</strong>{' '}
          {t('enterpriseCta.leadAfter')}
        </p>
        <div className="enterprise-cta-buttons">
          <Link to="/go" className="go-btn"><GoLabel /></Link>
          <Link to="/go#book" className="btn-cta-secondary">{t('enterpriseCta.cta')}</Link>
        </div>
        {Array.isArray(reassure) && (
          <ul className="enterprise-cta-reassure">{reassure.map((r) => <li key={r}>{r}</li>)}</ul>
        )}
        <a href="mailto:contact@simasiaai.gr" className="enterprise-cta-mail">contact@simasiaai.gr</a>
      </motion.div>
    </section>
  );
};

export default EnterpriseCTA;
