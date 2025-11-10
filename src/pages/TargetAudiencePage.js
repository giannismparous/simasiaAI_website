import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import '../components/TargetAudience.css';

const TargetAudiencePage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div className="target-audience-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="target-audience-hero" style={{ padding: '8rem 0 2rem', position: 'relative' }}>
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
                {t('targetAudience.title')}
              </h1>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-content" style={{ padding: '2rem 0 4rem', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                {t('targetAudience.organizations.title')}
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text={t('targetAudience.organizations.description')}
                delay={0.15}
                duration={0.25}
              />
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', fontWeight: '600' }}>
              {t('targetAudience.organizations.note')}
            </p>
            <ul style={{ fontSize: '1.1rem', lineHeight: 2, marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              {t('targetAudience.organizations.groups').map((group, index) => (
                <li key={index}>{group}</li>
              ))}
            </ul>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--gray-medium)', marginBottom: '2rem' }}>
              {t('targetAudience.organizations.note2')}
            </p>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-chatbots" className="btn btn-primary">
                {t('targetAudience.chatbotsButton')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-businesses" style={{ padding: '4rem 0', position: 'relative', zIndex: 2, background: 'rgba(44, 122, 123, 0.02)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                {t('targetAudience.businesses.title')}
              </h2>
            </SmoothReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              {t('targetAudience.businesses.items').map((item, index) => (
                <motion.div
                  key={index}
                  className="business-type-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
                  }}
                  style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, var(--light-bg) 0%, rgba(247, 243, 232, 0.5) 100%)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(44, 122, 123, 0.1)',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-warm)' }}>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-chatbots" className="btn btn-primary">
                {t('targetAudience.chatbotsButton')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-translation" style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                {t('targetAudience.translation.title')}
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text={t('targetAudience.translation.description1')}
                delay={0.15}
                duration={0.25}
              />
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text={t('targetAudience.translation.description2')}
                delay={0.2}
                duration={0.25}
              />
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text={t('targetAudience.translation.description3')}
                delay={0.25}
                duration={0.25}
              />
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/products/simasia-studio" className="btn btn-primary">
                SimasiaStudio
              </Link>
              <Link to="/products/simasia-daily" className="btn btn-primary">
                SimasiaDaily
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-office" style={{ padding: '4rem 0', position: 'relative', zIndex: 2, background: 'rgba(44, 122, 123, 0.02)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                {t('targetAudience.office.title')}
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text={t('targetAudience.office.description')}
                delay={0.15}
                duration={0.25}
              />
            </p>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-daily" className="btn btn-primary">
                SimasiaDaily
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-education" style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                {t('targetAudience.education.title')}
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text={t('targetAudience.education.description')}
                delay={0.15}
                duration={0.25}
              />
            </p>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-edu" className="btn btn-primary">
                SimasiaEdu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TargetAudiencePage;

