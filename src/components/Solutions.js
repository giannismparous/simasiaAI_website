import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './Solutions.css';

const Solutions = () => {
  const ref = useRef(null);
  const processRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "200px" });

  const achievementItems = [
    {
      title: "Σαφείς απαντήσεις",
      description: "Λιγότερη χρονοτριβή σε συχνές ερωτήσεις και σύνθετες διαδικασίες.",
      tag: "Problem solving"
    },
    {
      title: "Διαφάνεια γνώσης",
      description: "Απαντήσεις που τεκμηριώνονται από τις σωστές πηγές.",
      tag: "AI ethics"
    },
    {
      title: "Προσβασιμότητα",
      description: "Συμπερίληψη στην ψηφιακή επικοινωνία.",
      tag: "Human Centered AI"
    },
    {
      title: "Ενδυνάμωση κοινοτήτων",
      description: "Έγκυρη, ανθρώπινη καθοδήγηση σε συνεργασία με ειδικούς (υγεία, εκπαίδευση, κοινωνικές υπηρεσίες, πολιτισμός κ.ά.).",
      tag: "Domain Specific Solution"
    },
    {
      title: "Ομαλή ενσωμάτωση",
      description: "Στις υπάρχουσες ροές και συστήματα.",
      tag: "Full Integration"
    }
  ];

  const processSteps = [
    {
      icon: "🔍",
      title: "Discovery",
      description: "Χαρτογραφούμε μαζί τις ανθρώπινες ανάγκες, το περιεχόμενο και τις ροές πληροφοριών."
    },
    {
      icon: "🧪",
      title: "Prototype/Pilot",
      description: "Δοκιμή τεχνολογικών λύσεων σε περιορισμένο εύρος με πραγματικά σενάρια."
    },
    {
      icon: "🚀",
      title: "Rollout & Integrations",
      description: "Προσαρμογή στο περιβάλλον σας και εκπαίδευση ομάδων."
    },
    {
      icon: "🔄",
      title: "Support & Evolution",
      description: "Συνεχής βελτίωση και δυνατότητα επέκτασης."
    }
  ];

  return (
    <section className="solutions" id="solutions">
      <div className="container">
        <SmoothReveal delay={0.2} yOffset={20}>
          <h2 className="section-title">Πώς συνεργαζόμαστε</h2>
        </SmoothReveal>

        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="achievements-section">
            <SmoothReveal delay={0.2} yOffset={10}>
              <h3 className="subsection-title">Τι πετυχαίνουμε μαζί</h3>
            </SmoothReveal>
            <motion.div 
              className="achievements-grid"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {achievementItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="achievement-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                >
                  <SmoothReveal delay={0.35 + (index * 0.05)} yOffset={8}>
                    <h4>{item.title}</h4>
                  </SmoothReveal>
                  <p>
                    <WordReveal text={item.description} delay={0.4 + (index * 0.05)} duration={0.25} />
                  </p>
                  <span className="achievement-tag">{item.tag}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="collaboration-process" ref={processRef}>
            <motion.h3 
              className="subsection-title"
              initial={{ opacity: 0, y: 15 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Πώς συνεργαζόμαστε
            </motion.h3>
            <motion.div 
              className="process-steps"
              initial={{ opacity: 0 }}
              animate={isProcessInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="process-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                >
                  <div className="process-icon">{step.icon}</div>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.25 + (index * 0.05), duration: 0.3 }}
                  >
                    {step.title}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isProcessInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
            <motion.p 
              className="process-note"
              initial={{ opacity: 0 }}
              animate={isProcessInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              Σήμερα εστιάζουμε σε συνομιλιακές λύσεις (chatbots). Η αρχιτεκτονική μας επιτρέπει να επεκταθούμε σε επιπλέον εφαρμογές AI, ανάλογα με την ανθρώπινη ανάγκη που συν-εξυπηρετούμε.
            </motion.p>
            <motion.p 
              className="process-cta"
              initial={{ opacity: 0 }}
              animate={isProcessInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              Προτείνετέ μας τη λύση που οραματίζεστε να συνδημιουργήσουμε.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Solutions;

