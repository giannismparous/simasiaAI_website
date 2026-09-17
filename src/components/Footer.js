import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/');
  };

  return (
    <footer className="site-footer">
      <div className="footer-dots" aria-hidden="true" />
      <div className="container">
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
