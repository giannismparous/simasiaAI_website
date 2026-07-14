import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './MidCTA.css';

const MidCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });
  const { t } = useTranslation();

  return (
    <section className="mid-cta" ref={ref}>
      <motion.div
        className="mid-cta-inner"
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p>
          {t('midCta.bodyBefore')} <em className="brand-dialogos">DialogosAI</em> {t('midCta.bodyAfter')}
        </p>
        <Link to="/book-demo" className="cta-primary">
          {t('midCta.cta')}
        </Link>
      </motion.div>
    </section>
  );
};

export default MidCTA;
