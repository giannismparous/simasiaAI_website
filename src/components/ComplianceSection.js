import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './ComplianceSection.css';

const icons = ['🔒', '⚖️', '🔍'];

const ComplianceSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const cards = t('compliance.cards');

  return (
    <section className="compliance-section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('compliance.title')}
        </motion.h2>
        <motion.p
          className="compliance-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('compliance.subtitle')}
        </motion.p>

        <div className="compliance-grid">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="compliance-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="compliance-icon">{icons[index]}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
