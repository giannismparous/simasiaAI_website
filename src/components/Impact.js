import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Impact.css';

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="impact-wrapper" id="impact">
      <div className="impact" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Τρέχουσες συνεργασίες
        </motion.h2>
        
        <motion.div 
          className="impact-content"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="collaboration-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              ΠΟΑΜΣΚ
            </motion.h3>
            <motion.p 
              className="collaboration-description"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Σε συνεργασία με την <strong>ΠΟΑΜΣΚ</strong> (Πανελλήνια Ομοσπονδία Ατόμων με Σκλήρυνση Κατά Πλάκας): 
              υποστηρικτικό chatbot για έγκυρη ενημέρωση σχετικά με τη Σκλήρυνση Κατά Πλάκας.
            </motion.p>
            <motion.div 
              className="collaboration-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src="/Collaborations/Logos/poamsk_logo.png" 
                alt="ΠΟΑΜΣΚ Logo" 
                className="poamsk-logo"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Impact;

