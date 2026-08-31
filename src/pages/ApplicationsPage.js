import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SmoothReveal } from '../components/TextReveal';
import HorizontalScrollCards from '../components/HorizontalScrollCards';
import CTA from '../components/CTA';
import { useTranslation } from '../hooks/useTranslation';
import './ApplicationsPage.css';

const ProductSection = ({ product, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });
  const { t } = useTranslation();

  // Get features based on product type
  const getFeatures = () => {
    if (product.features) {
      return product.features;
    }
    if (product.toolCategories) {
      return product.toolCategories.map(cat => `${cat.category}: ${cat.tools.join(', ')}`);
    }
    return [];
  };

  const features = getFeatures();

  return (
    <section 
      ref={ref}
      className="product-section" 
      style={{ 
        padding: index === 0 ? '2rem 0 4rem' : '4rem 0', 
        borderBottom: index < 3 ? '1px solid rgba(44, 122, 123, 0.1)' : 'none' 
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <SmoothReveal delay={0.1} yOffset={15}>
            <h2 className="product-name" style={{ 
              fontSize: '2rem', 
              color: 'var(--primary-deep)', 
              marginBottom: '0.75rem',
              fontStyle: 'italic'
            }}>
              {product.name}
            </h2>
          </SmoothReveal>
          
          <SmoothReveal delay={0.15} yOffset={10}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem', 
              color: 'var(--dark-text)',
              fontWeight: '500'
            }}>
              {product.title}
            </h3>
          </SmoothReveal>

          {product.offers && (
            <SmoothReveal delay={0.2} yOffset={10}>
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'var(--gray-medium)', 
                marginBottom: '1.5rem' 
              }}>
                {product.offers}
              </p>
            </SmoothReveal>
          )}

          {/* Horizontal Scroll Cards for Features */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ marginBottom: '2rem' }}
            >
              <HorizontalScrollCards cardWidth={300} gap={20}>
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="feature-card"
                    style={{
                      minWidth: '300px',
                      maxWidth: '300px',
                      padding: '1.5rem',
                      background: 'linear-gradient(135deg, var(--light-bg) 0%, rgba(247, 243, 232, 0.5) 100%)',
                      borderRadius: '16px',
                      border: '1px solid rgba(44, 122, 123, 0.1)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                    }}
                    whileHover={{ 
                      y: -4, 
                      boxShadow: '0 8px 30px rgba(44, 122, 123, 0.15)' 
                    }}
                  >
                    <p style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: 1.7, 
                      color: 'var(--dark-text)',
                      margin: 0
                    }}>
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </HorizontalScrollCards>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link 
              to="/demo" 
              className="btn btn-primary"
              style={{ display: 'inline-flex' }}
            >
              {t('applications.requestProposal') || 'Ζητήστε πρόταση συνεργασίας'}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ApplicationsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const { t } = useTranslation();

  // Get all products from translations
  const products = [
    t('products.chatbots'),
    t('products.studio'),
    t('products.daily'),
    t('products.edu')
  ];

  return (
    <div className="applications-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      {/* Hero Section */}
      <section className="applications-hero" style={{ padding: '8rem 0 2rem', position: 'relative' }}>
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <SmoothReveal delay={0.1} yOffset={20}>
              <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                {t('applications.title') || '-Εφαρμογές-'}
              </h1>
            </SmoothReveal>

          </motion.div>
        </div>
      </section>

      {/* Product Sections */}
      <section className="applications-content" style={{ position: 'relative', zIndex: 2 }}>
        {products.map((product, index) => (
          <ProductSection key={index} product={product} index={index} />
        ))}
      </section>

      <CTA />
    </div>
  );
};

export default ApplicationsPage;
