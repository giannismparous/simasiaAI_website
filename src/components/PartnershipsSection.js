import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './PartnershipsSection.css';

const HOME_LOGOS = [
  { src: '/logos/kapa3.png', alt: 'Μυρτώ / ΚΑΠΑ3', href: 'https://www.kapa3.gr' },
  { src: '/logos/poamskp.png', alt: 'ΣΚΠ-i / ΠΟΑμΣΚΠ', href: 'https://www.poamskp.gr' },
  { src: '/logos/bepan.png', alt: 'BPAN Heroes', href: 'https://bpanheroes.gr' },
  { src: '/logos/perfectaki.png', alt: 'Perfectaki Able', href: 'https://perfectaki.com' },
];

const ease = [0.16, 1, 0.3, 1];

const PartnershipsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section className="collabs-section" ref={ref}>
      <div className="container">
        <motion.div
          className="collabs-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <h2 dangerouslySetInnerHTML={{ __html: t('collaborations.home.headline') }} />
          <p dangerouslySetInnerHTML={{ __html: t('collaborations.home.paragraph1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('collaborations.home.paragraph2') }} />
          <p dangerouslySetInnerHTML={{ __html: t('collaborations.home.paragraph3') }} />
          <a href="/collaborations" className="collabs-view-all">
            {t('collaborations.home.viewAll')}
          </a>
        </motion.div>

        <motion.div
          className="collabs-logo-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          {HOME_LOGOS.map((logo, i) => (
            <a
              key={logo.src}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="collab-logo-cell collab-logo-link"
              title={logo.alt}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
