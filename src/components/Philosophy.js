import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './Philosophy.css';

const Philosophy = () => {
  const ref = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const isTitleInView = useInView(titleRef, { once: true, margin: "200px" });
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isTitleInView) return;

    let dotCount = 0;
    const maxDots = 3;
    let direction = 1; // 1 for adding, -1 for removing

    const interval = setInterval(() => {
      if (direction === 1) {
        dotCount++;
        if (dotCount > maxDots) {
          direction = -1;
          dotCount = maxDots;
        }
      } else {
        dotCount--;
        if (dotCount < 0) {
          direction = 1;
          dotCount = 0;
        }
      }
      setDots('.'.repeat(dotCount));
    }, 500); // 500ms between each dot

    return () => clearInterval(interval);
  }, [isTitleInView]);

  return (
    <section className="philosophy" id="philosophy">
      <div className="container">
        <SmoothReveal delay={0.1} yOffset={15}>
          <h2 ref={titleRef} className="section-title">Η φιλοσοφία μας<span className="animated-dots">{dots}</span></h2>
        </SmoothReveal>
        <motion.div 
          className="philosophy-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="philosophy-quote">
            <WordReveal 
              text="Στο ερώτημα «Ο άνθρωπος για την Τεχνητή Νοημοσύνη» ή «Η Τεχνητή Νοημοσύνη για τον Άνθρωπο», απαντάμε με υπευθυνότητα: Η Τεχνητή Νοημοσύνη για τον Άνθρωπο."
              delay={0.15}
              duration={0.25}
            />
          </p>
          <div className="philosophy-text">
            <p>
              <WordReveal 
                text="Ερχόμαστε σε επαφή με τις σύγχρονες ανάγκες και, σε συνεργασία με ειδικούς στο κάθε πεδίο (φορείς, επιχειρήσεις, οργανισμούς), αναπτύσσουμε βιώσιμες λύσεις AI με πραγματικό αντίκτυπο στο κοινωνικό σύνολο και με σεβασμό στην ανθρώπινη επικοινωνία."
                delay={0.25}
                duration={0.25}
              />
            </p>
            <p>
              <WordReveal 
                text="Σχεδιάζουμε ολιστικές λύσεις με κέντρο τον άνθρωπο και την κοινότητα, στην υγεία, την εκπαίδευση, την πολιτισμική διαμεσολάβηση και όπου αλλού μπορούμε να στηρίξουμε την ανθρώπινη ανάγκη μέσω της Τεχνητής Νοημοσύνης."
                delay={0.35}
                duration={0.25}
              />
            </p>
            <p className="philosophy-goal">
              <WordReveal 
                text="Στόχος μας: να αμβλύνουμε ανισότητες, να ενισχύσουμε τη συμπερίληψη και να βελτιώσουμε την καθημερινή ζωή."
                delay={0.45}
                duration={0.25}
              />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;

