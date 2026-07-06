import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/logos/simasiaai.PNG" alt="SimasiaAI" className="footer-logo" />
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.navigation')}</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/applications/simasia-chatbots">Simaki</Link>
            <Link to="/collaborations">{t('nav.collaborations')}</Link>
          </div>
          <div className="footer-col">
            <h4>{t('footer.contact')}</h4>
            <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>
            <p>{t('footer.location')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.social')}</h4>
            <a href="https://www.linkedin.com/company/simasiaai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/simasiaai/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} SimasiaAI · {t('footer.poweredBy')}</p>
          <span className="footer-badge">EU AI Act Compliant</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
