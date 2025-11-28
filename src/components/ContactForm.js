import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './ContactForm.css';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    organizationType: '',
    companyName: '',
    description: '',
    attachment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // EmailJS configuration
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Validate configuration
      if (serviceID === 'your_service_id' || templateID === 'your_template_id' || publicKey === 'your_public_key') {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        organization_type: formData.organizationType,
        company_name: formData.companyName || formData.organization || 'N/A',
        message: formData.description || 'N/A',
        attachment: formData.attachment || 'N/A',
        to_email: 'contact@simasiaai.gr',
        reply_to: formData.email
      };

      // Send email with retry logic for network errors
      let retries = 2;
      let lastError = null;
      
      while (retries >= 0) {
        try {
          await emailjs.send(serviceID, templateID, templateParams, publicKey);
          break; // Success, exit retry loop
        } catch (error) {
          lastError = error;
          if (retries > 0 && (error.text?.includes('fetch') || error.message?.includes('fetch'))) {
            // Network error, retry after a short delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            retries--;
          } else {
            throw error; // Not a network error or no retries left
          }
        }
      }
      
      if (lastError && retries < 0) {
        throw lastError; // All retries failed
      }

      setSubmitStatus({ 
        type: 'success', 
        message: t('contactForm.successMessage')
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        organizationType: '',
        companyName: '',
        description: '',
        attachment: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Provide more specific error messages
      let errorMessage = t('contactForm.errorMessage');
      if (error.text?.includes('fetch') || error.message?.includes('fetch') || error.message?.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.text?.includes('Public Key')) {
        errorMessage = 'Email configuration error. Please contact support.';
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
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
                  ? 'rgba(44, 122, 123, 0.1)' 
                  : 'rgba(224, 120, 86, 0.1)',
                color: submitStatus.type === 'success' 
                  ? 'var(--primary-warm)' 
                  : 'var(--accent-warm)',
                fontWeight: '500'
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

