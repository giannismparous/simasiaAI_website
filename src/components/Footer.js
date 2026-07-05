import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>/ΣimasiaAI/</h3>
            <p>{t('footer.tagline')}</p>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.navigation')}</h3>
            <a href="/">{t('nav.home')}</a>
            <a href="/about">{t('nav.about')}</a>
            <a href="/applications/simasia-chatbots">{t('nav.chatbots')}</a>
            <a href="/collaborations">{t('nav.collaborations')}</a>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.contact')}</h3>
            <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>
            <p>{t('footer.location')}</p>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.social')}</h3>
            <a href="https://www.linkedin.com/company/simasiaai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/simasiaai/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            {t('footer.poweredBy')} • {t('footer.established')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

