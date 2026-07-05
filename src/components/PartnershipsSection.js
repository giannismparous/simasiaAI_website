import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './PartnershipsSection.css';

const collabs = [
  { logo: '/logos/kapa3.png', product: 'Μυρτώ' },
  { logo: '/logos/poamskp.png', product: 'ΣΚΠ-i' },
  { logo: '/logos/bepan.png', product: 'BPAN AI Assistant' },
  { logo: '/logos/perfectaki.png', product: 'Perfectaki Able AI Assistant' },
];

const PartnershipsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section className="collabs-section" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Συνεργασίες
        </motion.h2>

        <div className="collabs-grid">
          {collabs.map((c, i) => (
            <motion.div
              key={i}
              className="collab-card"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <div className="collab-logo-wrap">
                <img src={c.logo} alt={c.product} />
              </div>
              <span className="collab-product-name">{c.product}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
