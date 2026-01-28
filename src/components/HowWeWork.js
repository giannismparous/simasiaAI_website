import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './HowWeWork.css';

const HowWeWork = () => {
  const { t } = useTranslation();
  const steps = t('howWeWork.steps');

  return (
    <section className="how-we-work">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('howWeWork.title')}
        </motion.h2>

        <div className="work-steps">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="work-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="step-number">{index + 1}</div>
              <p className="step-text">{step}</p>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="work-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#contact" className="btn btn-primary">
            {t('hero.talkToTeam')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
