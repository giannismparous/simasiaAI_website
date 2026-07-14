import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import InteractiveConstellation from '../components/InteractiveConstellation';
import { mapEmailJsError, sendContactEmail } from '../services/emailService';
import { useTranslation } from '../hooks/useTranslation';
import './BookDemoPage.css';

const BookDemoPage = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: '', org: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await sendContactEmail({
        fromName: form.name.trim(),
        fromEmail: form.email.trim(),
        organizationType: 'Demo Request',
        companyName: form.org.trim() || 'N/A',
        message: form.message.trim() || t('bookDemoPage.defaultMessage'),
        attachment: 'N/A',
      });

      setSubmitStatus({
        type: 'success',
        message: t('bookDemoPage.successBody'),
      });
      setForm({ name: '', org: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: mapEmailJsError(error, t('bookDemoPage.errorFallback')),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bdp-page">
      <section className="bdp-hero">
        <InteractiveConstellation pattern="calendar" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bdp-eyebrow">{t('bookDemoPage.eyebrow')}</span>
            <h1>{t('bookDemoPage.heroTitle')}</h1>
            <p className="bdp-hero-sub">
              {t('bookDemoPage.heroSubBefore')}{' '}
              <em className="brand-dialogos">DialogosAI</em>{' '}
              {t('bookDemoPage.heroSubAfter')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bdp-form-section" id="contact" ref={ref}>
        <div className="container">
          <div className="bdp-two-col">
            <motion.div
              className="bdp-left"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>{t('bookDemoPage.whatTitle')}</h2>
              <ul className="bdp-list">
                {t('bookDemoPage.whatItems').map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="bdp-note">contact@simasiaai.gr</p>
            </motion.div>

            <motion.div
              className="bdp-right"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {submitStatus.type === 'success' ? (
                <div className="bdp-success">
                  <h3>{t('bookDemoPage.successTitle')}</h3>
                  <p>{submitStatus.message}</p>
                  <button
                    type="button"
                    className="bdp-submit bdp-submit-secondary"
                    onClick={() => setSubmitStatus({ type: null, message: '' })}
                  >
                    {t('bookDemoPage.newRequest')}
                  </button>
                </div>
              ) : (
                <form className="bdp-form" onSubmit={handleSubmit}>
                  <div className="bdp-field">
                    <label htmlFor="name">{t('bookDemoPage.name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('bookDemoPage.namePh')}
                    />
                  </div>
                  <div className="bdp-field">
                    <label htmlFor="org">{t('bookDemoPage.org')}</label>
                    <input
                      id="org"
                      name="org"
                      type="text"
                      required
                      value={form.org}
                      onChange={handleChange}
                      placeholder={t('bookDemoPage.orgPh')}
                    />
                  </div>
                  <div className="bdp-field">
                    <label htmlFor="email">{t('bookDemoPage.email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('bookDemoPage.emailPh')}
                    />
                  </div>
                  <div className="bdp-field">
                    <label htmlFor="message">{t('bookDemoPage.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('bookDemoPage.messagePh')}
                    />
                  </div>
                  <button type="submit" className="bdp-submit" disabled={isSubmitting}>
                    {isSubmitting ? t('bookDemoPage.submitting') : t('bookDemoPage.submit')}
                  </button>
                  {submitStatus.type === 'error' && (
                    <p className="bdp-form-error" role="alert">
                      {submitStatus.message}
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDemoPage;
