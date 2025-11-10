import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div 
          ref={ref}
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-title-wrapper">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h2 className="section-title">{t('about.title')}</h2>
              </SmoothReveal>
            </div>
            <p>
              <WordReveal 
                text={t('about.text')}
                delay={0.2}
                duration={0.25}
              />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

