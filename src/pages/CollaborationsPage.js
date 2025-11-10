import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import { useTranslation } from '../hooks/useTranslation';
import CTA from '../components/CTA';
import '../components/Impact.css';

const CollaborationsPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div className="collaborations-page-wrapper" style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      <section className="collaborations-hero" style={{ paddingTop: '10rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <SmoothReveal delay={0.1} yOffset={20}>
              <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                {t('collaborations.title')}
              </h1>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="collaborations-content" style={{ padding: '0.5rem 0 6rem', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div 
            className="collaboration-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              {t('collaborations.current.poamsk.name')}
            </motion.h3>
            <motion.p 
              className="collaboration-description"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {t('collaborations.current.poamsk.description')}
            </motion.p>
            <motion.p 
              style={{ marginTop: '1rem', fontSize: '0.95rem', color: 'var(--gray-medium)', fontStyle: 'italic' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              (Διατίθεται περιγραφική παρουσίαση κατόπιν επικοινωνίας.)
            </motion.p>
            <motion.div 
              className="collaboration-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src="/Collaborations/Logos/poamsk_logo.png" 
                alt="ΠΟΑΜΣΚ Logo" 
                className="poamsk-logo"
              />
            </motion.div>
            <motion.div 
              className="collaboration-ctas"
              style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="#contact" 
                className="btn btn-primary"
              >
                Επικοινωνήστε για πρόσβαση
              </a>
              <Link 
                to="/book-demo" 
                className="btn btn-secondary"
              >
                Κλείστε demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="collaborations-process" style={{ padding: '6rem 0', position: 'relative', zIndex: 2, background: 'rgba(44, 122, 123, 0.02)' }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
              {t('collaborations.process.title')}
            </h2>
          </SmoothReveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {t('collaborations.process.steps').map((step, index) => (
              <motion.div
                key={index}
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
                  background: 'var(--light-bg)',
                  borderRadius: '12px',
                  border: '1px solid rgba(44, 122, 123, 0.1)',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-warm)' }}>{step.title}</h3>
                <p>
                  <WordReveal text={step.desc} delay={0.25 + (index * 0.1)} duration={0.25} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="collaborations-achievements" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
              {t('collaborations.achievements.title')}
            </h2>
          </SmoothReveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {t('collaborations.achievements.items').map((item, index) => (
              <motion.div
                key={index}
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
                  background: 'var(--light-bg)',
                  borderRadius: '12px',
                  border: '1px solid rgba(44, 122, 123, 0.1)',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  <WordReveal text={item} delay={0.25 + (index * 0.1)} duration={0.25} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', position: 'relative', zIndex: 2, background: 'rgba(44, 122, 123, 0.02)' }}>
        <div className="container">
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '900px', margin: '0 auto', textAlign: 'center', color: 'var(--gray-medium)' }}>
            <WordReveal 
              text={t('collaborations.commitment')}
              delay={0.15}
              duration={0.25}
            />
          </p>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default CollaborationsPage;
