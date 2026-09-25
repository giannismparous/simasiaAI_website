import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { isEmailJsConfigured, sendContactEmail } from '../services/emailService';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/');
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setStatus({ type: 'error', message: t('footer.newsletterError') });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      if (isEmailJsConfigured()) {
        await sendContactEmail({
          fromName: 'Newsletter Subscriber (Footer)',
          fromEmail: cleanEmail,
          organizationType: 'Newsletter Subscription',
          companyName: 'SimasiaAI Newsletter Subscriber',
          message: `Εγγραφή νέου συνδρομητή στο SimasiaAI Newsletter από το footer: ${cleanEmail}`,
        });
        setStatus({ type: 'success', message: t('footer.newsletterSuccess') });
        setEmail('');
      } else {
        const mailtoSubject = encodeURIComponent('Εγγραφή στο Newsletter SimasiaAI');
        const mailtoBody = encodeURIComponent(
          `Παρακαλώ όπως με εγγράψετε στο newsletter της SimasiaAI με το email: ${cleanEmail}`
        );
        window.location.href = `mailto:contact@simasiaai.gr?subject=${mailtoSubject}&body=${mailtoBody}`;
        setStatus({ type: 'success', message: t('footer.newsletterSuccess') });
        setEmail('');
      }
    } catch (err) {
      const mailtoSubject = encodeURIComponent('Εγγραφή στο Newsletter SimasiaAI');
      const mailtoBody = encodeURIComponent(
        `Παρακαλώ όπως με εγγράψετε στο newsletter της SimasiaAI με το email: ${cleanEmail}`
      );
      window.location.href = `mailto:contact@simasiaai.gr?subject=${mailtoSubject}&body=${mailtoBody}`;
      setStatus({ type: 'success', message: t('footer.newsletterSuccess') });
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-dots" aria-hidden="true" />
      <div className="container">
        {/* Newsletter Subscription Strip */}
        <div className="footer-newsletter-banner">
          <div className="footer-newsletter-text">
            <div className="footer-newsletter-tag">
              <span className="footer-newsletter-dot" />
              <span>{t('footer.newsletterLink') || 'Newsletter'}</span>
            </div>
            <h3 className="footer-newsletter-title">{t('footer.newsletterTitle')}</h3>
            <p className="footer-newsletter-sub">{t('footer.newsletterSub')}</p>
          </div>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <div className="footer-newsletter-input-wrap">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletterPlaceholder')}
                className="footer-newsletter-input"
                required
                aria-label={t('footer.newsletterPlaceholder')}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="footer-newsletter-btn"
              >
                {isSubmitting
                  ? (t('footer.newsletterSubmitting') || '...')
                  : (t('footer.newsletterButton') || 'Εγγραφή')}
              </button>
            </div>
            {status.message && (
              <p className={`footer-newsletter-msg footer-newsletter-msg--${status.type}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-lockup" onClick={handleBrandClick} aria-label="SimasiaAI">
              <img src="/logos/simasiaai.PNG" alt="" className="footer-logo" />
              <span className="footer-wordmark">imasiaAI</span>
            </Link>
            <p className="footer-phrase">{t('footer.phrase')}</p>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          <div className="footer-col">
            <h4>{t('footer.navTitle')}</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/ypodochi">{t('nav.ypodochi')}</Link>
            <Link to="/demo">{t('nav.demo')}</Link>
            <Link to="/team">{t('footer.teamLink')}</Link>
            <Link to="/collaborations">{t('nav.collaborations')}</Link>
            <Link to="/news">{t('footer.newsLink') || 'Νέα & Άρθρα'}</Link>
            <Link to="/newsletter">{t('footer.newsletterLink') || 'Newsletter'}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footer.companyTitle')}</h4>
            <p className="footer-legal-name">{t('footer.legalName')}</p>
            <p className="footer-legal-intl">{t('footer.legalIntl')}</p>
            <p>{t('footer.gemi')}</p>
            <p>{t('footer.afm')}</p>
            <p>{t('footer.taxOffice')}</p>
          </div>

          <div className="footer-col">
            <h4>Νομικά</h4>
            <Link to="/terms">Όροι Χρήσης</Link>
            <Link to="/privacy">Πολιτική Απορρήτου</Link>
            <Link to="/cookies">Πολιτική Cookies</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footer.contactTitle')}</h4>
            <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>
            <p>{t('footer.addressLine1')}</p>
            <p>{t('footer.addressLine2')}</p>
            <div className="footer-social-links">
              <a href="https://www.linkedin.com/company/simasiaai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/simasiaai/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} {t('footer.copyright')}</p>
          <span className="footer-badge">{t('footer.complianceBadge')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
