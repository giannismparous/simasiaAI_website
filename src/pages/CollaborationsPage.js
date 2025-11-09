import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import CTA from '../components/CTA';
import '../components/Impact.css';

const CollaborationsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div className="collaborations-page-wrapper" style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      <section className="collaborations-hero" style={{ padding: '8rem 0 4rem', position: 'relative' }}>
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
                Συνεργασίες
              </h1>
            </SmoothReveal>
            <SmoothReveal delay={0.2} yOffset={15}>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray-medium)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
                <WordReveal 
                  text="Τρέχουσες συνεργασίες & Μελέτες Περίπτωσης"
                  delay={0.25}
                  duration={0.25}
                />
              </p>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="collaborations-content" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
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
              ΠΟΑΜΣΚ — Πανελλήνια Ομοσπονδία Ατόμων με Σκλήρυνση Κατά Πλάκας
            </motion.h3>
            <motion.p 
              className="collaboration-description"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Υποστηρικτικό chatbot για έγκυρη ενημέρωση σχετικά με τη Σκλήρυνση Κατά Πλάκας.
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

      <CTA />
    </div>
  );
};

export default CollaborationsPage;
