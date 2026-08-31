import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import HorizontalScrollCards from '../components/HorizontalScrollCards';
import './TargetAudiencePage.css';

const TargetAudiencePage = () => {
  const { t } = useTranslation();
  const audienceCards = t('targetAudience.audienceCards');

  return (
    <div className="target-audience-page">
      <section className="target-audience-hero">
        <div className="container">
          <motion.h1 
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('targetAudience.title')}
          </motion.h1>
        </div>
      </section>

      <section className="target-audience-cards-section">
        <div className="container">
          <HorizontalScrollCards cardWidth={350} gap={24}>
            {audienceCards.map((card, index) => (
              <motion.div
                key={index}
                className="audience-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(44, 122, 123, 0.15)' }}
              >
                <h3 className="audience-card-title">{card.title}</h3>
                <div className="audience-card-product">
                  <span className="product-badge">{card.product}</span>
                </div>
                <Link to={card.link} className="audience-card-link">
                  {t('common.learnMore')} →
                </Link>
              </motion.div>
            ))}
          </HorizontalScrollCards>
        </div>
      </section>

      <section className="target-audience-cta">
        <div className="container">
          <motion.div 
            className="cta-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/demo" className="btn btn-primary">
              {t('nav.bookDemo')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TargetAudiencePage;
