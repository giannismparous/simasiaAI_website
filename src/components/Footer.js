import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-dots" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logos/simasiaai.PNG" alt="SimasiaAI" className="footer-logo" />
            <p className="footer-phrase">{t('footer.phrase')}</p>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          <div className="footer-col">
            <h4>{t('footer.navTitle')}</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/applications/simasia-chatbots"><em className="brand-dialogos">DialogosAI</em></Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/team">{t('footer.teamLink')}</Link>
            <Link to="/collaborations">{t('nav.collaborations')}</Link>
            <Link to="/news">{t('footer.newsLink')}</Link>
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
