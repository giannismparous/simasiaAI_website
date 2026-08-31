import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import PageHeroBackdrop from '../components/PageHeroBackdrop';
import DemoPhoneField from '../components/DemoPhoneField';
import DemoOfferPicker from '../components/DemoOfferPicker';
import DemoSubmitButton from '../components/DemoSubmitButton';
import { getDialForCountry } from '../constants/phoneCountries';
import { isEmailJsConfigured, mapEmailJsError, sendContactEmail } from '../services/emailService';
import { useTranslation } from '../hooks/useTranslation';
import { loadDemoDraft, saveDemoDraft, clearDemoDraft } from '../utils/demoFormDraft';
import './DemoPage.css';

const EMPTY_FORM = {
  name: '',
  role: '',
  org: '',
  siteUrl: '',
  phone: '',
  email: '',
};

const DemoPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const statusRef = useRef(null);
  const inView = useInView(ref, { once: true });
  const [orgType, setOrgType] = useState('clinic');
  const [phoneCountry, setPhoneCountry] = useState('GR');
  const [offerMode, setOfferMode] = useState('pyxida');
  const [selectedModules, setSelectedModules] = useState([]);
  const [offerError, setOfferError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });
  const [draftReady, setDraftReady] = useState(false);

  const tiers = t('ypodochiPage.tiers') || [];

  useEffect(() => {
    const draft = loadDemoDraft();
    if (draft) {
      setForm({ ...EMPTY_FORM, ...(draft.form || {}) });
      if (draft.orgType) setOrgType(draft.orgType);
      if (draft.phoneCountry) setPhoneCountry(draft.phoneCountry);
      if (draft.offerMode === 'other') setOfferMode('other');
      else setOfferMode('pyxida');
      if (Array.isArray(draft.selectedModules)) setSelectedModules(draft.selectedModules);
    }
    setDraftReady(true);
  }, []);

  const persistDraft = useCallback(() => {
    if (!draftReady || submitStatus.type === 'success') return;
    saveDemoDraft({
      form,
      orgType,
      phoneCountry,
      offerMode,
      selectedModules,
    });
  }, [
    draftReady,
    form,
    orgType,
    phoneCountry,
    offerMode,
    selectedModules,
    submitStatus.type,
  ]);

  useEffect(() => {
    persistDraft();
  }, [persistDraft]);

  useEffect(() => {
    if (submitStatus.type && statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [submitStatus.type]);

  const handleNavigateToOffer = useCallback(() => {
    persistDraft();
  }, [persistDraft]);

  const resetFormState = useCallback(() => {
    setForm(EMPTY_FORM);
    setOrgType('clinic');
    setPhoneCountry('GR');
    setOfferMode('pyxida');
    setSelectedModules([]);
    setOfferError('');
    setFieldErrors({});
    clearDemoDraft();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) errors.name = t('demoPage.nameRequired');
    if (!email) errors.email = t('demoPage.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('demoPage.emailInvalid');
    }

    if (!orgType) errors.orgType = t('demoPage.orgRequired');
    if (!offerMode) errors.offer = t('demoPage.offerRequired');

    return errors;
  };

  const handleOfferModeChange = (mode) => {
    if (mode === offerMode) return;
    setOfferMode(mode);
    setOfferError('');
  };

  const handleToggleModule = (id) => {
    if (offerMode !== 'pyxida') return;
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const orgLabelFor = (type) => {
    if (type === 'clinic') return t('demoPage.orgClinic');
    if (type === 'ngo') return t('demoPage.orgNgo');
    return t('demoPage.orgOther');
  };

  const buildOfferSummary = () => {
    if (offerMode === 'other') return t('demoPage.offerOther');

    const pyxidaTier = tiers.find((tier) => tier.productKind === 'pyxida');
    const parts = [pyxidaTier?.verb || 'Pyxida'];

    selectedModules.forEach((id) => {
      const tier = tiers.find((item) => item.id === id);
      if (tier) parts.push(tier.verb);
    });

    return parts.join(' + ');
  };

  const buildPhoneLine = () => {
    const local = form.phone.trim();
    if (!local) return '—';
    const dial = getDialForCountry(phoneCountry);
    if (!dial) return local;
    return `${dial} ${local}`;
  };

  const successMessageFor = (type, mode) => {
    if (type === 'clinic') return t('demoPage.successBodyClinic');
    if (type === 'ngo') return t('demoPage.successBodyOrg');
    if (mode === 'other') return t('demoPage.successBodyOfferOther');
    return t('demoPage.successBodyOther');
  };

  const buildEmailMessage = (orgLabel, offerSummary) => {
    const lines = [
      `Όνομα: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Τύπος οργανισμού: ${orgLabel}`,
      `Ενδιαφέρον: ${offerSummary}`,
    ];

    if (offerMode === 'pyxida' && selectedModules.length > 0) {
      const moduleNames = selectedModules.map((id) => {
        const tier = tiers.find((item) => item.id === id);
        return tier?.verb || id;
      });
      lines.push(`Modules: ${moduleNames.join(', ')}`);
    }

    lines.push(
      `Ρόλος: ${form.role.trim() || '—'}`,
      `Επωνυμία: ${form.org.trim() || '—'}`,
      `Ιστοσελίδα: ${form.siteUrl.trim() || '—'}`,
      `Τηλέφωνο: ${buildPhoneLine()}`,
      '',
      'Αίτηση demo μέσω /demo',
    );

    return lines.join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOfferError('');
    setFieldErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      if (errors.offer) setOfferError(errors.offer);
      setFieldErrors(errors);
      return;
    }

    if (!isEmailJsConfigured()) {
      setSubmitStatus({
        type: 'error',
        message: t('demoPage.configError'),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const submittedOrgType = orgType;
    const submittedOfferMode = offerMode;
    const orgLabel = orgLabelFor(submittedOrgType);
    const offerSummary = buildOfferSummary();
    const message = buildEmailMessage(orgLabel, offerSummary);

    try {
      await sendContactEmail({
        fromName: form.name.trim(),
        fromEmail: form.email.trim(),
        organizationType: orgLabel,
        companyName: form.org.trim() || 'N/A',
        message,
      });

      const successMessage = successMessageFor(submittedOrgType, submittedOfferMode);
      resetFormState();
      setSubmitStatus({
        type: 'success',
        message: successMessage,
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: mapEmailJsError(error, t('demoPage.errorFallback')),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const orgToggleLabel = [
    t('demoPage.orgClinic'),
    t('demoPage.orgNgo'),
    t('demoPage.orgOther'),
  ].join(' / ');

  return (
    <div className="demo-page">
      <section className="demo-hero">
        <PageHeroBackdrop />
        <div className="container">
          <motion.div
            className="demo-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>{t('demoPage.heroTitle')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="demo-form-section" ref={ref}>
        <div className="container demo-stack">
          <motion.div
            className="demo-form-col"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitStatus.type === 'success' ? (
              <div className="demo-success" ref={statusRef} role="status" aria-live="polite">
                <h3>{t('demoPage.successTitle')}</h3>
                <p>{submitStatus.message}</p>
                <button
                  type="button"
                  className="demo-submit demo-submit-secondary"
                  onClick={() => {
                    resetFormState();
                    setSubmitStatus({ type: null, message: '' });
                  }}
                >
                  {t('demoPage.newRequest')}
                </button>
              </div>
            ) : (
              <form className="demo-form" onSubmit={handleSubmit} noValidate>
                <p className="demo-form-kicker">{t('demoPage.siteUrlHint')}</p>

                <div className="demo-toggle demo-toggle--org" role="group" aria-label={orgToggleLabel}>
                  <button
                    type="button"
                    className={orgType === 'clinic' ? 'active' : ''}
                    aria-pressed={orgType === 'clinic'}
                    onClick={() => setOrgType('clinic')}
                  >
                    {t('demoPage.orgClinic')}
                  </button>
                  <button
                    type="button"
                    className={orgType === 'ngo' ? 'active' : ''}
                    aria-pressed={orgType === 'ngo'}
                    onClick={() => setOrgType('ngo')}
                  >
                    {t('demoPage.orgNgo')}
                  </button>
                  <button
                    type="button"
                    className={orgType === 'other' ? 'active' : ''}
                    aria-pressed={orgType === 'other'}
                    onClick={() => setOrgType('other')}
                  >
                    {t('demoPage.orgOther')}
                  </button>
                </div>

                <div className="demo-form-grid">
                  <DemoOfferPicker
                    t={t}
                    tiers={tiers}
                    offerMode={offerMode}
                    onOfferModeChange={handleOfferModeChange}
                    selectedModules={selectedModules}
                    onToggleModule={handleToggleModule}
                    onNavigateToOffer={handleNavigateToOffer}
                    error={offerError}
                  />

                  <div className="demo-field">
                    <label htmlFor="name">{t('demoPage.name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={fieldErrors.name ? 'true' : 'false'}
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('demoPage.namePh')}
                    />
                    {fieldErrors.name && (
                      <p className="demo-field-error" role="alert">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="demo-field">
                    <label htmlFor="role">{t('demoPage.role')}</label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      value={form.role}
                      onChange={handleChange}
                      placeholder={t('demoPage.rolePh')}
                    />
                  </div>

                  <div className="demo-field">
                    <label htmlFor="org">{t('demoPage.org')}</label>
                    <input
                      id="org"
                      name="org"
                      type="text"
                      value={form.org}
                      onChange={handleChange}
                      placeholder={t('demoPage.orgPh')}
                    />
                  </div>

                  <DemoPhoneField
                    label={t('demoPage.phone')}
                    countryLabel={t('demoPage.phoneCountryLabel')}
                    countryCode={phoneCountry}
                    onCountryChange={setPhoneCountry}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('demoPage.phonePh')}
                  />

                  <div className="demo-field demo-field--wide">
                    <label htmlFor="siteUrl">{t('demoPage.siteUrl')}</label>
                    <input
                      id="siteUrl"
                      name="siteUrl"
                      type="url"
                      value={form.siteUrl}
                      onChange={handleChange}
                      placeholder={t('demoPage.siteUrlPh')}
                    />
                  </div>

                  <div className="demo-field demo-field--wide">
                    <label htmlFor="email">{t('demoPage.email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={fieldErrors.email ? 'true' : 'false'}
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('demoPage.emailPh')}
                    />
                    {fieldErrors.email && (
                      <p className="demo-field-error" role="alert">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="demo-form-actions">
                    <DemoSubmitButton disabled={isSubmitting}>
                      {isSubmitting ? t('demoPage.submitting') : t('demoPage.submit')}
                    </DemoSubmitButton>
                  </div>

                  {submitStatus.type === 'error' && (
                    <p
                      className="demo-form-error demo-form-error--banner"
                      ref={statusRef}
                      role="alert"
                      aria-live="assertive"
                    >
                      {submitStatus.message}
                    </p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
