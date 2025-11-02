import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div 
          ref={ref}
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title">Ποιοι είμαστε</h2>
            </SmoothReveal>
            <p>
              <WordReveal 
                text="Η /ΣimasiaAI/ αναπτύσσει καινοτόμες λύσεις τεχνητής νοημοσύνης που αναγνωρίζουν την ατομική ιδιαιτερότητα, ενισχύουν την συμπερίληψη, ενδυναμώνουν τον/την χρήστη/τρια, εκφράζουν το εταιρικό προφίλ με σεβασμό και ευθύνη." 
                delay={0.2}
                duration={0.25}
              />
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              <WordReveal 
                text="Συχνά δυσκολευόμαστε να εμπιστευτούμε την τεχνητή νοημοσύνη: Παραπληροφόρηση ('παραισθήσεις'), κολακεία του χρήστη, αναπαραγωγή προκαταλήψεων. Η αλήθεια όμως έχει σημασία, όταν αφορά ανθρώπους, υγεία, επικοινωνία, εκπαίδευση, πραγματικές ζωές." 
                delay={0.3}
                duration={0.25}
              />
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              <WordReveal 
                text="Στη ΣημασίαΑΙ δίνουμε εξειδικευμένες λύσεις σε άτομα, επιχειρήσεις, φορείς, και οργανισμούς: Chatbots, βοηθοί γραφείου και εκπαιδευτικοί βοηθοί είναι ενδεικτικοί τομείς στους οποίους δραστηριοποιούμαστε." 
                delay={0.4}
                duration={0.25}
              />
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

