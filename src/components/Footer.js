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
            <a href="/target-audience">{t('nav.targetAudience')}</a>
            <a href="/products">{t('nav.products')}</a>
            <a href="/collaborations">{t('nav.collaborations')}</a>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.contact')}</h3>
            <a href="mailto:simasia.ai@gmail.com">simasia.ai@gmail.com</a>
            <p>{t('footer.location')}</p>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.social')}</h3>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">Χ</a>
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

