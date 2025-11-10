import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';

const ApplicationsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div className="applications-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="applications-hero" style={{ padding: '8rem 0 4rem', position: 'relative' }}>
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
                Εφαρμογές
              </h1>
            </SmoothReveal>
            <SmoothReveal delay={0.2} yOffset={15}>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray-medium)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
                <WordReveal 
                  text="Διαθέσιμες για άμεση χρήση"
                  delay={0.25}
                  duration={0.25}
                />
              </p>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="applications-content" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div 
            className="application-card"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, var(--light-bg) 0%, rgba(247, 243, 232, 0.5) 100%)',
              borderRadius: '24px',
              padding: '4rem 3rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(44, 122, 123, 0.1)'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -8, 
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
            }}
          >
            <SmoothReveal delay={0.25} yOffset={10}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--dark-text)' }}>
                Πλατφόρμα υποστήριξης εκπαιδευτικών & μαθητών/τριών
              </h2>
            </SmoothReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--gray-medium)' }}>
                <WordReveal 
                  text="Δημιουργία αξιολογήσεων για όλα τα μαθήματα/τάξεις, εξατομίκευση δυσκολίας, αυτόματη διόρθωση με ανέβασμα φωτογραφίας ή PDF πραγματικού διαγωνίσματος."
                  delay={0.35}
                  duration={0.25}
                />
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <button 
                  type="button"
                  className="btn btn-primary"
                  style={{ textDecoration: 'none', cursor: 'pointer', border: 'none', background: 'inherit', fontFamily: 'inherit', fontSize: 'inherit' }}
                  disabled
                  aria-label="Link coming soon"
                >
                  Άνοιξε, δοκίμασε, χρησιμοποίησε τώρα εδώ
                </button>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a 
                  href="#contact" 
                  className="btn btn-secondary"
                >
                  Επικοινωνήστε για πρόσβαση
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CTA />
      <ContactForm />
    </div>
  );
};

export default ApplicationsPage;

