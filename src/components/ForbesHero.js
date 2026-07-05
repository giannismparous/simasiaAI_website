import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ForbesHero.css';

const ForbesHero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="hero-section" ref={ref}>
      <div className="container">
        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src="/logos/simasiaai.PNG"
            alt="SimasiaAI"
            className="hero-logo"
          />
          <h1>Μέτρο μας; Ο άνθρωπος.</h1>
          <p className="hero-sub">
            Στην εποχή των γενικών chatbot Τεχνητής Νοημοσύνης, σχεδιάζουμε τους ανθρωποκεντρικούς ψηφιακούς πλοηγούς <em>SimasiaDialogue</em>.
          </p>
          <div className="hero-ctas">
            <Link to="/book-demo" className="cta-primary">
              Κλείστε ένα Demo
            </Link>
            <a href="#live-demo" className="cta-link">
              Δείτε το SimasiaDialogue →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForbesHero;
