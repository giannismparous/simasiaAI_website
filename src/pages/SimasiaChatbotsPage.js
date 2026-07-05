import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import ChatbotShowcase from '../components/ChatbotShowcase';
import ProofNumbers from '../components/ProofNumbers';
import UseCases from '../components/UseCases';
import GreenAI from '../components/GreenAI';
import ComplianceSection from '../components/ComplianceSection';
import CTA from '../components/CTA';

const SimasiaChatbotsPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const features = t('products.chatbots.features');

  return (
    <div className="product-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      {/* Hero */}
      <section className="product-hero" style={{ padding: '8rem 0 4rem', position: 'relative' }}>
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: 'rgba(44, 122, 123, 0.08)',
                color: 'var(--primary-warm)',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}
            >
              {t('hero.badge')}
            </motion.div>
            <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              {t('products.chatbots.name')}
            </h1>
            <p style={{ fontSize: '1.35rem', color: 'var(--primary-warm)', marginBottom: '1rem', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
              {t('products.chatbots.title')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="product-features" style={{ padding: '1.5rem 0 4rem', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.h2
            className="section-title"
            style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('products.chatbots.offers')}
          </motion.h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '1.25rem' }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.08) }}
                whileHover={{ 
                  y: -6, 
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  boxShadow: '0 16px 48px rgba(224, 120, 86, 0.2)'
                }}
                style={{
                  padding: '1.5rem',
                  background: 'var(--light-bg)',
                  borderRadius: '12px',
                  border: '1px solid rgba(44, 122, 123, 0.1)',
                  borderLeft: '3px solid var(--primary-warm)',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ChatbotShowcase />
      <ProofNumbers />
      <UseCases />
      <GreenAI />
      <ComplianceSection />
      <CTA />
    </div>
  );
};

export default SimasiaChatbotsPage;
