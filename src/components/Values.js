import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SmoothReveal } from './TextReveal';
import './Values.css';

const Values = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
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
            <h3>
              Ανθρωποκεντρική Τεχνολογία
            </h3>
            <p>
              Η τεχνολογία ενισχύει, δεν αντικαθιστά τις ανθρώπινες σχέσεις. Σχεδιάζουμε AI με τον άνθρωπο στο κέντρο.
            </p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="value-number">2</div>
            <h3>
              Κοινωνική Συνεισφορά
            </h3>
            <p>
              Κάθε έργο μας στοχεύει να ενισχύσει τις κοινότητες και να βελτιώσει την ποιότητα ζωής ατόμων που αντιμετωπίζουν πραγματικές προκλήσεις.
            </p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="value-number">3</div>
            <h3>
              Ενσυναίσθηση στην Καινοτομία
            </h3>
            <p>
              Ξεκινάμε από τις ανθρώπινες ανάγκες. Οι λύσεις μας τις ακούν, τις κατανοούν και προσαρμόζονται για να τις εξυπηρετούν.
            </p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="value-number">4</div>
            <h3>
              Τεχνολογία που Ενδυναμώνει
            </h3>
            <p>
              Η τεχνολογία μας είναι πραγματικό εργαλείο ενδυνάμωσης. Δίνουμε πρακτικά εργαλεία που λειτουργούν ακριβώς εκεί όπου χρειάζονται: απλά • αξιόπιστα • μετρήσιμα.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Values;

