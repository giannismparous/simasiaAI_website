import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './Values.css';

const Values = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="values" id="values">
      <div className="container">
        <SmoothReveal delay={0.1} yOffset={15}>
          <h2 className="section-title">Αξίες</h2>
        </SmoothReveal>
        
        <motion.div 
          className="values-grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="value-item"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="value-number">1</div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Ανθρωποκεντρική Τεχνολογία
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              Η τεχνολογία ενισχύει, δεν αντικαθιστά τις ανθρώπινες σχέσεις. Σχεδιάζουμε AI με τον άνθρωπο στο κέντρο.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="value-number">2</div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              Κοινωνική Συνεισφορά
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Κάθε έργο μας στοχεύει να ενισχύσει τις κοινότητες και να βελτιώσει την ποιότητα ζωής ατόμων που αντιμετωπίζουν πραγματικές προκλήσεις.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="value-number">3</div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Ενσυναίσθηση στην Καινοτομία
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              Ξεκινάμε από τις ανθρώπινες ανάγκες. Οι λύσεις μας τις ακούν, τις κατανοούν και προσαρμόζονται για να τις εξυπηρετούν.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="value-number">4</div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              Τεχνολογία που Ενδυναμώνει
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              Η τεχνολογία μας είναι πραγματικό εργαλείο ενδυνάμωσης. Δίνουμε πρακτικά εργαλεία που λειτουργούν ακριβώς εκεί όπου χρειάζονται: απλά • αξιόπιστα • μετρήσιμα.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Values;

