import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './ControlledImprovementSection.css';

const ease = [0.16, 1, 0.3, 1];

const ControlledImprovementSection = () => {
  const { t } = useTranslation();
  const steps = t('controlledImprovement.flywheel.steps');

  return (
    <section className="controlled-improvement-section" aria-labelledby="controlled-improvement-title">
      <div className="container controlled-improvement-grid">
        <motion.div
          className="controlled-improvement-visual"
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          role="img"
          aria-label={t('controlledImprovement.flywheel.aria')}
        >
          <div className="cig-flywheel">
            <svg className="cig-orbit" viewBox="0 0 400 400" aria-hidden="true">
              <circle className="cig-orbit-ring" cx="200" cy="200" r="118" />
              <path className="cig-orbit-flow" d="M200 82 A118 118 0 0 1 318 200" />
              <path className="cig-orbit-flow cig-orbit-flow-2" d="M318 200 A118 118 0 0 1 200 318" />
              <path className="cig-orbit-flow cig-orbit-flow-3" d="M200 318 A118 118 0 0 1 82 200" />
              <path className="cig-orbit-flow cig-orbit-flow-4" d="M82 200 A118 118 0 0 1 200 82" />
            </svg>

            <div className="cig-board">
              <div className="cig-node cig-node-1">
                <span className="cig-num">1</span>
                <div className="cig-node-text">
                  <span className="cig-node-kicker">{steps[0].kicker}</span>
                  <span className="cig-node-title">{steps[0].title}</span>
                </div>
              </div>

              <div className="cig-node cig-node-2">
                <span className="cig-num">2</span>
                <div className="cig-node-text">
                  <span className="cig-node-kicker">{steps[1].kicker}</span>
                  <span className="cig-node-title">{steps[1].title}</span>
                </div>
              </div>

              <div className="cig-gate">
                <span className="cig-gate-pill">{t('controlledImprovement.flywheel.gate')}</span>
                <span className="cig-gate-sub">{t('controlledImprovement.flywheel.gateSub')}</span>
              </div>

              <div className="cig-node cig-node-4">
                <span className="cig-num">4</span>
                <div className="cig-node-text">
                  <span className="cig-node-kicker">{steps[3].kicker}</span>
                  <span className="cig-node-title">{steps[3].title}</span>
                </div>
              </div>

              <div className="cig-node cig-node-3">
                <span className="cig-num">3</span>
                <div className="cig-node-text">
                  <span className="cig-node-kicker">{steps[2].kicker}</span>
                  <span className="cig-node-title">{steps[2].title}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="controlled-improvement-copy"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.08 }}
        >
          <span className="controlled-improvement-overline">{t('controlledImprovement.overline')}</span>
          <h2 id="controlled-improvement-title" className="forbes-section-title">
            {t('controlledImprovement.title')}
          </h2>
          <p className="controlled-improvement-lead">{t('controlledImprovement.lead')}</p>
          <p className="controlled-improvement-body">{t('controlledImprovement.body')}</p>

          <ul className="controlled-improvement-guards">
            {t('controlledImprovement.guards').map((g) => (
              <li key={g}>
                <span className="cig-dot" aria-hidden="true" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ControlledImprovementSection;
