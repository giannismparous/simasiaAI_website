import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import './Mission.css';

const AICapabilities = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="mission" id="ai-capabilities">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothReveal delay={0.1} yOffset={15}>
            <h2 className="section-title">{t('aiCapabilities.title')}</h2>
          </SmoothReveal>
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ padding: '2rem', background: 'rgba(44, 122, 123, 0.05)', borderRadius: '12px' }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-warm)' }}>{t('aiCapabilities.capabilities.title')}</h3>
              <p>
                <WordReveal 
                  text={t('aiCapabilities.capabilities.text')}
                  delay={0.25}
                  duration={0.25}
                />
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ padding: '2rem', background: 'rgba(224, 120, 86, 0.05)', borderRadius: '12px' }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-warm)' }}>{t('aiCapabilities.limits.title')}</h3>
              <p>
                <WordReveal 
                  text={t('aiCapabilities.limits.text')}
                  delay={0.35}
                  duration={0.25}
                />
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AICapabilities;

