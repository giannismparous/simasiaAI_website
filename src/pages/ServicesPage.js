import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeroBackdrop from '../components/PageHeroBackdrop';
import InteractiveConstellation from '../components/InteractiveConstellation';
import { useTranslation } from '../hooks/useTranslation';
import './ServicesPage.css';

const OFFER_HREFS = ['#consulting', '#education'];

const ease = [0.16, 1, 0.3, 1];

const ServicesPage = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const offersRef = useRef(null);
  const howRef = useRef(null);
  const packagesRef = useRef(null);
  const eduGroupsRef = useRef(null);
  const eduWorkshopsRef = useRef(null);

  const offersInView = useInView(offersRef, { once: true, margin: '100px' });
  const howInView = useInView(howRef, { once: true, margin: '100px' });
  const packagesInView = useInView(packagesRef, { once: true, margin: '100px' });
  const eduGroupsInView = useInView(eduGroupsRef, { once: true, margin: '100px' });
  const eduWorkshopsInView = useInView(eduWorkshopsRef, { once: true, margin: '100px' });

  const [activePackage, setActivePackage] = useState(null);

  const packages = t('servicesPage.packages') || [];
  const consultingSteps = t('servicesPage.consultingSteps') || [];
  const eduTargetGroups = t('servicesPage.eduTargetGroups') || [];
  const workshops = t('servicesPage.workshops') || [];
  const offers = t('servicesPage.offers') || [];

  return (
    <div className="svc-page">
      {/* Hero */}
      <section className="svc-hero" ref={heroRef}>
        <PageHeroBackdrop />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="svc-eyebrow">{t('servicesPage.eyebrow')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('servicesPage.heroTitleHtml') }} />
            <p className="svc-hero-sub">
              {t('servicesPage.heroSub')}
            </p>
            <div className="svc-hero-ctas">
              <Link to="/demo" className="btn btn-light">{t('servicesPage.bookAppointment')}</Link>
              <a href="#offers" className="svc-ghost-link">
                {t('servicesPage.seeServices')} <span>↓</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two Offers Introduction */}
      <section className="svc-offers" id="offers" ref={offersRef}>
        <div className="container">
          <div className="svc-offers-grid">
            {offers.map((offer, i) => (
              <motion.a
                key={i}
                href={OFFER_HREFS[i]}
                className="svc-offer-card"
                initial={{ opacity: 0, y: 24 }}
                animate={offersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                whileHover={{ y: -4 }}
              >
                <span className="svc-offer-num">{offer.num}</span>
                <h3>{offer.audience}</h3>
                <h4>{offer.title}</h4>
                <p>{offer.body}</p>
                <span className="svc-offer-link">{offer.link}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION A: AI CONSULTING ===== */}
      <section className="svc-consulting" id="consulting">
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('servicesPage.consultingTitle')}</h2>
            <p>{t('servicesPage.consultingSub')}</p>
          </motion.div>

          {/* How it works */}
          <div className="svc-how" ref={howRef}>
            <motion.h3
              className="svc-how-title"
              initial={{ opacity: 0, y: 20 }}
              animate={howInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {t('servicesPage.howItWorks')}
            </motion.h3>
            <div className="svc-steps">
              {consultingSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="svc-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={howInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="svc-step-num">{step.num}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="svc-packages" id="packages" ref={packagesRef}>
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('servicesPage.packagesTitle')}</h2>
            <p>{t('servicesPage.packagesSub')}</p>
          </motion.div>

          <div className="svc-packages-grid">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                className={`svc-pkg-card${pkg.highlight ? ' svc-pkg-card--highlight' : ''}${activePackage === pkg.id ? ' svc-pkg-card--active' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={packagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease }}
                onHoverStart={() => setActivePackage(pkg.id)}
                onHoverEnd={() => setActivePackage(null)}
              >
                {pkg.tag && (
                  <span className={`svc-pkg-tag${pkg.highlight ? ' svc-pkg-tag--orange' : ''}`}>
                    {pkg.tag}
                  </span>
                )}
                <div className="svc-pkg-header">
                  <h3 className="svc-pkg-name">{pkg.name}</h3>
                  <div className="svc-pkg-price">{pkg.price}</div>
                  <div className="svc-pkg-duration">{pkg.duration}</div>
                </div>
                <ul className="svc-pkg-features">
                  {pkg.features.map((f, j) => (
                    <li key={j}>
                      <span className="svc-pkg-check">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>
                <Link
                  to="/demo"
                  className={`svc-pkg-cta${pkg.highlight ? ' svc-pkg-cta--primary' : ''}`}
                >
                  {pkg.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION B: AI EDUCATION ===== */}
      <section className="svc-education" id="education">
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('servicesPage.educationTitle')}</h2>
            <p>{t('servicesPage.educationSub')}</p>
          </motion.div>

          {/* Target Groups */}
          <div ref={eduGroupsRef}>
            <motion.h3
              className="svc-how-title"
              initial={{ opacity: 0, y: 20 }}
              animate={eduGroupsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {t('servicesPage.eduTargetTitle')}
            </motion.h3>
            <div className="svc-steps">
              {eduTargetGroups.map((group, i) => (
                <motion.div
                  key={i}
                  className="svc-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={eduGroupsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="svc-step-num">{group.num}</span>
                  <div>
                    <h4>{group.title}</h4>
                    <p>{group.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="svc-workshops" ref={eduWorkshopsRef}>
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={eduWorkshopsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('servicesPage.workshopsTitle')}</h2>
            <p>{t('servicesPage.workshopsSub')}</p>
          </motion.div>

          <div className="svc-workshops-grid">
            {workshops.map((w, i) => (
              <motion.div
                key={i}
                className="svc-workshop-card"
                initial={{ opacity: 0, y: 24 }}
                animate={eduWorkshopsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                whileHover={{ y: -4 }}
              >
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <Link to="/demo" className="svc-workshop-cta">
                  {t('servicesPage.workshopCta')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Empathy Banner */}
      <section className="svc-empathy-banner">
        <InteractiveConstellation pattern="minimal" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('servicesPage.empathyTitle')}</h2>
            <p>{t('servicesPage.empathyBody')}</p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="svc-final-cta">
        <InteractiveConstellation pattern="minimal" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('servicesPage.finalTitle')}</h2>
            <p>{t('servicesPage.finalBody')}</p>
            <div className="svc-final-ctas">
              <a href="mailto:contact@simasiaai.gr" className="svc-btn-dark">
                contact@simasiaai.gr
              </a>
              <Link to="/demo" className="svc-btn-outline">
                {t('servicesPage.finalCta')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
