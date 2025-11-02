import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './CTA.css';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="cta-section">
      <div className="container">
        <motion.div 
          ref={ref}
          className="cta-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <SmoothReveal delay={0.1} yOffset={10}>
              <h2>Ζητήστε πρόταση συνεργασίας</h2>
            </SmoothReveal>
            <p>
              <WordReveal 
                text="Ας δημιουργήσουμε μαζί λύσεις με σημασία για τον άνθρωπο"
                delay={0.15}
                duration={0.25}
              />
            </p>
            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.a 
                href="#contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Ζητήστε πρόταση
              </motion.a>
              <motion.a 
                href="#solutions" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Δείτε τις λύσεις μας
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

