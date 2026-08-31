import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal } from './TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import './CTA.css';

const CTA = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="cta-section">
      <div className="container">
        <motion.div 
          ref={ref}
          className="cta-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <SmoothReveal delay={0.1} yOffset={10}>
              <h2>{t('cta.title')}</h2>
            </SmoothReveal>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
              {t('cta.subtitle')}
            </p>
            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to="/demo" className="btn btn-primary">
                  {t('cta.button')}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

