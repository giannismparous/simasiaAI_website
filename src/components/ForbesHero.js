import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarCanvas from './StarCanvas';
import './ForbesHero.css';

const words = ['Μέτρο', 'μας;', 'Ο', 'άνθρωπος.'];

const ForbesHero = () => {
  const ref = useRef(null);
  return (
    <section className="fh-section" ref={ref}>
      <StarCanvas />
      <div className="fh-layout">
        <div className="fh-inner">
          <h1 className="fh-headline" aria-label="Μέτρο μας; Ο άνθρωπος.">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className={`fh-word ${word === 'άνθρωπος.' ? 'fh-word-human' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.div
            className="fh-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            className="fh-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Στην εποχή των γενικών chatbot Τεχνητής Νοημοσύνης, σχεδιάσαμε τον{' '}
            <em>ανθρωποκεντρικό ψηφιακό πλοηγό DialogosAI</em>.
          </motion.p>
          <motion.div
            className="fh-ctas"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/book-demo" className="fh-btn-primary">Κλείστε Demo</Link>
            <a href="#live-demo" className="fh-btn-ghost">
              Δείτε τον <em className="brand-dialogos">DialogosAI</em> <span className="fh-arrow">↓</span>
            </a>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="fh-coord"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        37.9795° N / 23.7162° E — Athens
      </motion.div>
      <motion.div
        className="fh-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <motion.div
          className="fh-scroll-line"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default ForbesHero;
