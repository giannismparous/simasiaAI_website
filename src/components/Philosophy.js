import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import './Philosophy.css';

const Philosophy = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const isTitleInView = useInView(titleRef, { once: true, margin: "200px" });
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isTitleInView) return;

    let dotCount = 0;
    const maxDots = 3;
    let direction = 1; // 1 for adding, -1 for removing

    const interval = setInterval(() => {
      if (direction === 1) {
        dotCount++;
        if (dotCount > maxDots) {
          direction = -1;
          dotCount = maxDots;
        }
      } else {
        dotCount--;
        if (dotCount < 0) {
          direction = 1;
          dotCount = 0;
        }
      }
      setDots('.'.repeat(dotCount));
    }, 500); // 500ms between each dot

    return () => clearInterval(interval);
  }, [isTitleInView]);

  return (
    <section className="philosophy" id="philosophy">
      <div className="container">
        <SmoothReveal delay={0.1} yOffset={15}>
          <h2 ref={titleRef} className="section-title">{t('philosophy.title')}<span className="animated-dots">{dots}</span></h2>
        </SmoothReveal>
        <motion.div 
          className="philosophy-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothReveal delay={0.15} yOffset={10}>
            <h3 className="section-subtitle" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-warm)' }}>{t('philosophy.vision.title')}</h3>
          </SmoothReveal>
          <p className="philosophy-quote">
            <WordReveal 
              text={t('philosophy.vision.text')}
              delay={0.2}
              duration={0.25}
            />
          </p>
          <SmoothReveal delay={0.3} yOffset={10}>
            <h3 className="section-subtitle" style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-warm)' }}>{t('philosophy.whatWeDo.title')}</h3>
          </SmoothReveal>
          <div className="philosophy-text">
            {t('philosophy.whatWeDo.items').map((item, index) => (
              <React.Fragment key={index}>
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p style={{ marginTop: '0.5rem', marginBottom: index < t('philosophy.whatWeDo.items').length - 1 ? '1.5rem' : '0' }}>
                  <WordReveal 
                    text={item.text}
                    delay={0.35 + (index * 0.05)}
                    duration={0.25}
                  />
                </p>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;

