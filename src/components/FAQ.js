import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './FAQ.css';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const concerns = [
    {
      concern: "«Δεν μπορούμε να εμπιστευτούμε ένα chatbot με ευαίσθητα δεδομένα.»",
      response: "Η SimasiaAI βασίζει τις απαντήσεις σε εγκεκριμένο, δικό σας περιεχόμενο και τηρεί πλήρως το GDPR."
    },
    {
      concern: "«Η ΤΝ κάνει λάθη — δεν μπορούμε να ρισκάρουμε.»",
      response: "Οι απαντήσεις βασίζονται στη γνώση του ίδιου του οργανισμού, όχι σε ανοικτά μοντέλα."
    },
    {
      concern: "«Θα ακουγόμαστε απρόσωποι / ρομποτικοί.»",
      response: "Η SimasiaAI διαμορφώνει το ύφος, τη φωνή και τη γλώσσα του chatbot στο στυλ που θα επιλέξετε εσείς ή και οι ίδιοι οι χρήστες/τριές σας."
    },
    {
      concern: "«Φοβόμαστε ότι θα αντικαταστήσει ανθρώπους.»",
      response: "Η ΤΝ συμπληρώνει την ανθρώπινη υποστήριξη, δεν την αντικαθιστά — κάνει τη δουλειά τους πιο ουσιαστική."
    },
    {
      concern: "«Έχουμε ήδη δοκιμάσει ένα chatbot και δεν λειτούργησε.»",
      response: "Το chatbot της SimasiaAI δεν είναι \"γενικό\"· μαθαίνει τη δική σας γνώση, πολιτική και πληροφορία."
    }
  ];

  return (
    <section className="faq" id="faq">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothReveal delay={0.1} yOffset={15}>
            <h2 className="section-title">Ναι μεν αλλά: Ας ξεκαθαρίσουμε τους φόβους</h2>
          </SmoothReveal>

          <div className="concerns-list">
            {concerns.map((item, index) => (
              <motion.div
                key={index}
                className="concern-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
              >
                <SmoothReveal delay={0.25 + (index * 0.1)} yOffset={10}>
                  <div className="concern-question">
                    <p className="concern-text">{item.concern}</p>
                  </div>
                </SmoothReveal>
                <div className="concern-answer">
                  <p className="answer-text">
                    <WordReveal text={`→ ${item.response}`} delay={0.3 + (index * 0.1)} duration={0.25} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

