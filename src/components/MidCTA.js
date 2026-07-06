import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './MidCTA.css';

const MidCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section className="mid-cta" ref={ref}>
      <motion.div
        className="mid-cta-inner"
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p>
          Δοκιμάστε το SimaHermes AI στον οργανισμό σας.
          30 λεπτά αρκούν για να δείτε πώς λειτουργεί.
        </p>
        <Link to="/book-demo" className="cta-primary">
          Προγραμματίστε Demo
        </Link>
      </motion.div>
    </section>
  );
};

export default MidCTA;
