import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { mapEmailJsError, sendContactEmail } from '../services/emailService';
import './ContactForm.css';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  organizationType: '',
  companyName: '',
  description: '',
  attachment: '',
};

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await sendContactEmail({
        fromName: `${formData.firstName} ${formData.lastName}`.trim(),
        fromEmail: formData.email,
        organizationType: formData.organizationType,
        companyName: formData.companyName || formData.organization || 'N/A',
        message: formData.description || 'N/A',
        attachment: formData.attachment.trim() || undefined,
      });

      setSubmitStatus({
        type: 'success',
        message: t('contactForm.successMessage'),
      });
      setFormData(emptyForm);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: mapEmailJsError(error, t('contactForm.errorMessage')),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section" id="contact">
      <div className="container">
        <h2 className="section-title">{t('contactForm.title')}</h2>
        <p className="form-subtitle">{t('contactForm.subtitle')}</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">{t('contactForm.firstName')} *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">{t('contactForm.lastName')} *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">{t('contactForm.email')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizationType">{t('contactForm.organizationType')} *</label>
              <select
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                required
              >
                <option value="">{t('contactForm.selectOption')}</option>
                <option value={t('contactForm.organization')}>{t('contactForm.organization')}</option>
                <option value={t('contactForm.organization2')}>{t('contactForm.organization2')}</option>
                <option value={t('contactForm.organization3')}>{t('contactForm.organization3')}</option>
                <option value={t('contactForm.organization4')}>{t('contactForm.organization4')}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="companyName">{t('contactForm.companyName')}</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">{t('contactForm.description')}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder={t('contactForm.descriptionPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="attachment">{t('contactForm.attachment')}</label>
            <input
              type="url"
              id="attachment"
              name="attachment"
              value={formData.attachment}
              onChange={handleChange}
              placeholder={t('contactForm.attachmentPlaceholder')}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contactForm.submitting') : t('contactForm.submit')}
          </button>

          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--gray-medium)', textAlign: 'center' }}>
            {t('contactForm.privacyNote')}
          </p>

          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`submit-message ${submitStatus.type === 'success' ? 'success' : 'error'}`}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                backgroundColor: submitStatus.type === 'success'
                  ? 'rgba(217, 119, 87, 0.12)'
                  : 'rgba(217, 119, 87, 0.1)',
                color: 'var(--orange, #d97757)',
                fontWeight: '500',
              }}
            >
              {submitStatus.message}
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
