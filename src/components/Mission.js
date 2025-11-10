import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import './Mission.css';

const Mission = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="mission" id="mission">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothReveal delay={0.1} yOffset={15}>
            <h2 className="section-title">{t('mission.title')}</h2>
          </SmoothReveal>
          <p className="mission-description">
            <WordReveal 
              text={t('mission.text')}
              delay={0.15}
              duration={0.25}
            />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;

