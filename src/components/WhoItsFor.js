import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './WhoItsFor.css';

const WhoItsFor = () => {
  const { t } = useTranslation();
  const items = t('whoItsFor.items');

  return (
    <section className="who-its-for">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('whoItsFor.title')}
        </motion.h2>

        <div className="who-chips">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="who-chip"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="who-chip-bullet">•</span>
              <span className="who-chip-text">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
