import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './WhatWeOffer.css';

const WhatWeOffer = () => {
  const { t } = useTranslation();
  const cards = t('whatWeOffer.cards');

  return (
    <section className="what-we-offer">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('whatWeOffer.title')}
        </motion.h2>

        <div className="offer-cards-grid">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="offer-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(44, 122, 123, 0.15)' }}
            >
              <h3 className="offer-card-name">{card.name}</h3>
              <p className="offer-card-desc">{card.desc}</p>
              <Link to={card.link} className="offer-card-link">
                {t('common.learnMore')} →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="offer-ctas"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/applications" className="btn btn-secondary">
            {t('whatWeOffer.seeAll')}
          </Link>
          <a href="#contact" className="btn btn-primary">
            {t('hero.talkToTeam')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
