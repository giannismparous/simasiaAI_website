import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './GreenAI.css';

const GreenAI = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const steps = t('greenAI.steps');
  const cards = t('greenAI.cards');

  return (
    <section className="green-ai-section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('greenAI.title')}
        </motion.h2>
        <motion.p
          className="greenai-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('greenAI.subtitle')}
        </motion.p>

        {/* Escalation Ladder */}
        <motion.div
          className="ladder-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="ladder-title">{t('greenAI.ladderTitle')}</h3>
          <p className="ladder-subtitle">{t('greenAI.ladderSubtitle')}</p>

          <div className="ladder-steps">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`ladder-step step-${step.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="ladder-step-number">{step.level}.</div>
                <div className="ladder-step-content">
                  <strong>{step.title}</strong>
                  <span>{step.description}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="ladder-disclaimer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <strong>{t('greenAI.disclaimer').split('.')[0]}.</strong>
            {t('greenAI.disclaimer').substring(t('greenAI.disclaimer').indexOf('.') + 1)}
          </motion.p>
        </motion.div>

        {/* Bottom Cards */}
        <div className="greenai-cards">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="greenai-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GreenAI;
