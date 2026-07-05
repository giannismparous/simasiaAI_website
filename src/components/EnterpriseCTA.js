import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './EnterpriseCTA.css';

const EnterpriseCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section className="enterprise-cta" ref={ref}>
      <motion.div
        className="enterprise-cta-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2>Είστε έτοιμοι να ξεκινήσετε;</h2>
        <p className="enterprise-cta-lead">
          Φέρτε την Τεχνητή Νοημοσύνη στα μέτρα του οργανισμού σας.
          Δημιουργήστε ένα SimasiaDialogue προσαρμοσμένο στις πραγματικές
          ανάγκες των χρηστών σας.
        </p>
        <div className="enterprise-cta-buttons">
          <Link to="/book-demo" className="btn-cta-primary">
            Κλείστε ένα Demo
          </Link>
          <a href="mailto:contact@simasiaai.gr" className="btn-cta-secondary">
            contact@simasiaai.gr
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default EnterpriseCTA;
