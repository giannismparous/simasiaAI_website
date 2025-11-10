import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SmoothReveal } from './TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import './Values.css';

const Values = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="values" id="values">
      <div className="container">
        <SmoothReveal delay={0.1} yOffset={15}>
          <h2 className="section-title">{t('values.title')}</h2>
        </SmoothReveal>
        
        <motion.div 
          className="values-grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {t('values.items').map((value, index) => (
            <motion.div 
              key={index}
              className="value-item"
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
              }}
            >
              <div className="value-number">{index + 1}</div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;

