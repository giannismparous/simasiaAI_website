import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './Mission.css';

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="mission" id="mission">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothReveal delay={0.1} yOffset={15}>
            <h2 className="section-title">Η αποστολή μας</h2>
          </SmoothReveal>
          <p className="mission-description">
            <WordReveal 
              text="Δημιουργούμε τεχνολογικές λύσεις με επίκεντρο τον άνθρωπο που ενδυναμώνουν την κοινωνική συνοχή. Κάθε λύση μας λειτουργεί ως γέφυρα κατανόησης: απλή στη χρήση, αξιόπιστη στην πράξη, ουσιαστική για το κοινωνικό σύνολο."
              delay={0.15}
              duration={0.25}
            />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;

