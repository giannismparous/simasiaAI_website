import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import { ChatbotsAnimation, StudioAnimation, DailyAnimation, EduAnimation } from '../components/ProductAnimations';
import CTA from '../components/CTA';

const ProductsPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const products = [
    {
      name: t('products.chatbots.name'),
      title: t('products.chatbots.title'),
      link: "/products/simasia-chatbots",
      animation: ChatbotsAnimation
    },
    {
      name: t('products.studio.name'),
      title: t('products.studio.title'),
      link: "/products/simasia-studio",
      animation: StudioAnimation
    },
    {
      name: t('products.daily.name'),
      title: t('products.daily.title'),
      link: "/products/simasia-daily",
      animation: DailyAnimation
    },
    {
      name: t('products.edu.name'),
      title: t('products.edu.title'),
      link: "/products/simasia-edu",
      animation: EduAnimation
    }
  ];

  return (
    <div className="products-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="products-hero" style={{ padding: '8rem 0 2rem', position: 'relative' }}>
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <SmoothReveal delay={0.1} yOffset={20}>
              <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
                {t('products.title')}
              </h1>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="products-grid-section" style={{ padding: '2rem 0 6rem', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div 
            className="products-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', marginTop: '1rem' }}
          >
            <style>{`
              @media (max-width: 768px) {
                .products-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="product-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
                }}
                style={{
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, var(--light-bg) 0%, rgba(247, 243, 232, 0.5) 100%)',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(44, 122, 123, 0.1)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '380px',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <SmoothReveal delay={0.25 + (index * 0.1)} yOffset={10}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-warm)' }}>
                    {product.name}
                  </h3>
                </SmoothReveal>
                <div style={{ marginBottom: '1.5rem', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {product.animation && React.createElement(product.animation, { logoStyle: true })}
                </div>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 'auto', color: 'var(--gray-medium)', flexGrow: 1 }}>
                  <WordReveal text={product.title} delay={0.3 + (index * 0.1)} duration={0.25} />
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <Link to={product.link} className="btn btn-primary">
                    {t('common.learnMore')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default ProductsPage;

