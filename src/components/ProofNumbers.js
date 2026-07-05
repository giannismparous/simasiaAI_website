import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './ProofNumbers.css';

const AnimatedNumber = ({ target, suffix, inView }) => {
  const [count, setCount] = useState(0);
  const isNumeric = !isNaN(parseFloat(target)) && !target.includes('.');

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const end = parseInt(target, 10);
    if (end === 0) { setCount(0); return; }
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (current >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target, isNumeric]);

  return (
    <span className="stat-number">
      {isNumeric ? count : target}
      {suffix && <span className="stat-suffix">{suffix}</span>}
    </span>
  );
};

const ProofNumbers = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  const stats = t('proofNumbers.stats');

  return (
    <section className="proof-numbers" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('proofNumbers.title')}
        </motion.h2>
        <motion.p
          className="proof-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('proofNumbers.subtitle')}
        </motion.p>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedNumber
                target={stat.number}
                suffix={stat.suffix}
                inView={isInView}
              />
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofNumbers;
