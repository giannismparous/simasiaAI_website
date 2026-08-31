import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const LearnIcon = ({ to, label, onNavigate, className = '' }) => (
  <Link
    to={to}
    className={`demo-offer-learn-icon${className ? ` ${className}` : ''}`}
    onClick={onNavigate}
    aria-label={label}
    title={label}
  >
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.15 6.15a1.85 1.85 0 1 1 2.35 1.75c-.45.22-.7.5-.7 1.05"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.15" r="0.7" fill="currentColor" />
    </svg>
  </Link>
);

function OfferHowItWorksModal({ open, onClose, t }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const steps = t('demoPage.offerHowItWorksSteps') || [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="demo-offer-help-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease }}
        >
          <button
            type="button"
            className="demo-offer-help-backdrop"
            aria-label={t('demoPage.offerHowItWorksClose')}
            onClick={onClose}
          />
          <motion.div
            className="demo-offer-help-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-offer-help-title"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease }}
          >
            <h3 id="demo-offer-help-title" className="demo-offer-help-title">
              {t('demoPage.offerHowItWorksTitle')}
            </h3>
            <p className="demo-offer-help-intro">{t('demoPage.offerHowItWorksIntro')}</p>
            <ol className="demo-offer-help-steps">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <button type="button" className="demo-offer-help-close" onClick={onClose}>
              {t('demoPage.offerHowItWorksClose')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PyxidaBaseCard({ tier, t, onNavigate }) {
  return (
    <div className="demo-offer-base-card">
      <div className="demo-offer-card-head">
        <span className="demo-offer-base-card-verb">{tier.verb}</span>
        <LearnIcon
          to="/ypodochi#tier-apanta"
          label={t('demoPage.offerCheckItOut')}
          onNavigate={onNavigate}
          className="demo-offer-card-help demo-offer-card-help--on-dark"
        />
      </div>
      <span className="demo-offer-base-card-role">{tier.productRole}</span>
      <span className="demo-offer-base-card-extras">{t('demoPage.offerExtrasIncluded')}</span>
    </div>
  );
}

function ModuleCard({ tier, selected, onToggle, t, onNavigate }) {
  return (
    <div className={`demo-offer-module-card${selected ? ' is-selected' : ''}`}>
      <div className="demo-offer-card-head">
        <span className="demo-offer-module-card-verb">{tier.verb}</span>
        <LearnIcon
          to={`/ypodochi#tier-${tier.id}`}
          label={t('demoPage.offerCheckItOut')}
          onNavigate={onNavigate}
          className="demo-offer-card-help"
        />
      </div>
      <button
        type="button"
        className="demo-offer-module-card-hit"
        aria-pressed={selected}
        onClick={onToggle}
      >
        <span className="demo-offer-module-card-role">{tier.productRole}</span>
        <span className="demo-offer-module-card-action">
          {selected ? t('demoPage.offerRemoveModule') : t('demoPage.offerAddModule')}
        </span>
      </button>
    </div>
  );
}

export default function DemoOfferPicker({
  t,
  tiers,
  offerMode,
  onOfferModeChange,
  selectedModules,
  onToggleModule,
  onNavigateToOffer,
  error,
}) {
  const pyxidaTier = tiers.find((tier) => tier.productKind === 'pyxida');
  const praxiTiers = tiers.filter((tier) => tier.productKind === 'praxi');
  const pyxidaActive = offerMode === 'pyxida';
  const [helpOpen, setHelpOpen] = useState(false);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  return (
    <fieldset className="demo-offer-fieldset demo-field--wide">
      <legend className="demo-offer-legend">{t('demoPage.offerLabel')}</legend>

      <div className="demo-offer-mode-grid" role="group" aria-label={t('demoPage.offerLabel')}>
        <button
          type="button"
          className={`demo-offer-mode-card demo-offer-mode-card--pyxida${pyxidaActive ? ' is-active' : ''}`}
          aria-pressed={pyxidaActive}
          onClick={() => onOfferModeChange('pyxida')}
        >
          <span className="demo-offer-mode-card-title">{t('demoPage.offerPyxida')}</span>
          <span className="demo-offer-mode-card-desc">{t('demoPage.offerPyxidaDesc')}</span>
        </button>
        <button
          type="button"
          className={`demo-offer-mode-card demo-offer-mode-card--other${offerMode === 'other' ? ' is-active' : ''}`}
          aria-pressed={offerMode === 'other'}
          onClick={() => onOfferModeChange('other')}
        >
          <span className="demo-offer-mode-card-title">{t('demoPage.offerOther')}</span>
          <span className="demo-offer-mode-card-desc">{t('demoPage.offerOtherDesc')}</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {pyxidaActive && pyxidaTier && (
          <motion.div
            key="pyxida-stack"
            className="demo-offer-stack is-live"
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.48, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div className="demo-offer-stack-inner">
              <div className="demo-offer-stack-head">
                <p className="demo-offer-stack-label">{t('demoPage.offerStackLabel')}</p>
                <button
                  type="button"
                  className="demo-offer-overview-link"
                  onClick={() => setHelpOpen(true)}
                >
                  {t('demoPage.offerHowItWorks')}
                </button>
              </div>

              <div className="demo-offer-stack-row">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.06, ease }}
                >
                  <PyxidaBaseCard tier={pyxidaTier} t={t} onNavigate={onNavigateToOffer} />
                </motion.div>

                {praxiTiers.map((tier, i) => (
                  <motion.div
                    key={tier.id}
                    className="demo-offer-stack-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.07, ease }}
                  >
                    <span className="demo-offer-plus" aria-hidden="true">
                      +
                    </span>
                    <ModuleCard
                      tier={tier}
                      selected={selectedModules.includes(tier.id)}
                      onToggle={() => onToggleModule(tier.id)}
                      t={t}
                      onNavigate={onNavigateToOffer}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="demo-form-error demo-offer-error" role="alert">
          {error}
        </p>
      )}

      <OfferHowItWorksModal open={helpOpen} onClose={closeHelp} t={t} />
    </fieldset>
  );
}
