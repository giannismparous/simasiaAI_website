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
          <SmoothReveal delay={0.15} yOffset={10}>
            <h3 className="section-subtitle" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-warm)' }}>Σκοπός</h3>
          </SmoothReveal>
          <p className="philosophy-quote">
            <WordReveal 
              text="Αναπτύσσουμε συστήματα ΤΝ που κατανοούν, επιδεικνύουν ενσυναίσθηση και επικοινωνούν φυσικά, πάντα με επίκεντρο τον Άνθρωπο, για να αμβλύνουμε ανισότητες, να ενισχύσουμε τη συμπερίληψη και να βελτιώσουμε την καθημερινότητα."
              delay={0.2}
              duration={0.25}
            />
          </p>
          <SmoothReveal delay={0.3} yOffset={10}>
            <h3 className="section-subtitle" style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-warm)' }}>Φιλοσοφία</h3>
          </SmoothReveal>
          <p className="philosophy-quote">
            <WordReveal 
              text="Στο δίλημμα «Ο άνθρωπος για την ΤΝ ή η ΤΝ για τον άνθρωπο;» απαντάμε καθαρά: Η ΤΝ για τον Άνθρωπο."
              delay={0.35}
              duration={0.25}
            />
          </p>
          <SmoothReveal delay={0.45} yOffset={10}>
            <h3 className="section-subtitle" style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-warm)' }}>Όραμα</h3>
          </SmoothReveal>
          <p className="philosophy-quote">
            <WordReveal 
              text="Μια πραγματικότητα όπου η ΤΝ υπηρετεί με ευθύνη τις ανθρώπινες ανάγκες και χτίζει γέφυρες κατανόησης."
              delay={0.5}
              duration={0.25}
            />
          </p>
          <SmoothReveal delay={0.6} yOffset={10}>
            <h3 className="section-subtitle" style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-warm)' }}>Τι κάνουμε</h3>
          </SmoothReveal>
          <div className="philosophy-text">
            <p>
              <WordReveal 
                text="Συνδιαμορφώνουμε με οργανισμούς λύσεις ΤΝ με πραγματικό κοινωνικό αντίκτυπο και σεβασμό στην ανθρώπινη επικοινωνία."
                delay={0.65}
                duration={0.25}
              />
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              <WordReveal 
                text="Σχεδιάζουμε ολιστικές, προσβάσιμες λύσεις για υγεία, εκπαίδευση, πολιτισμική διαμεσολάβηση και άλλους τομείς όπου η ΤΝ μπορεί να στηρίξει την ανθρώπινη ανάγκη."
                delay={0.75}
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

