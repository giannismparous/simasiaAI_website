import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import './Mission.css';

const Obstacles = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const obstacles = t('obstacles.items');

  return (
    <section className="mission" id="obstacles">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothReveal delay={0.1} yOffset={15}>
            <h2 className="section-title">{t('obstacles.title')}</h2>
          </SmoothReveal>
          <div 
            className="obstacles-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginTop: '2rem' }}
          >
            <style>{`
              @media (max-width: 768px) {
                .obstacles-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
            {obstacles.map((obstacle, index) => (
              <motion.div
                key={index}
                className="obstacle-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
                }}
                style={{ 
                  padding: '2rem', 
                  background: 'linear-gradient(135deg, var(--light-bg) 0%, rgba(247, 243, 232, 0.5) 100%)',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(44, 122, 123, 0.1)',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  <WordReveal 
                    text={obstacle}
                    delay={0.25 + (index * 0.1)}
                    duration={0.25}
                  />
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Obstacles;

