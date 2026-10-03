import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import PageHeroBackdrop from '../components/PageHeroBackdrop';
import { FlowAdoption } from '../components/flow/FlowHomeBlocks';
import { GoLabel } from '../components/flow/modules';
import './CollaborationsPage.css';

// /collaborations: where fλow already runs, which part each organisation has, and the next step.
const CollaborationsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="collabs-page">
      <section className="cp-hero">
        <PageHeroBackdrop />
        <div className="container">
          <motion.div
            className="cp-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>{t('collaborationsPage.title')}</h1>
            <p className="cp-hero-sub">{t('collaborationsPage.heroSub')}</p>
          </motion.div>
        </div>
      </section>

      <section className="flh-proof cp-adopt">
        <div className="flh-in">
          <FlowAdoption />
          <div className="cp-adopt-go"><Link to="/go" className="go-btn is-ink"><GoLabel /></Link></div>
        </div>
      </section>
    </div>
  );
};

export default CollaborationsPage;
