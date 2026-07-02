import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const legalItems = [
    { label: t('footer.legal.companyNameLabel'), value: t('footer.legal.companyNameValue') },
    { label: t('footer.legal.gemiLabel'), value: t('footer.legal.gemiValue') },
    { label: t('footer.legal.vatLabel'), value: t('footer.legal.vatValue') },
    { label: t('footer.legal.legalFormLabel'), value: t('footer.legal.legalFormValue') },
    { label: t('footer.legal.headquartersLabel'), value: t('footer.legal.headquartersValue') },
    { label: t('footer.legal.capitalLabel'), value: t('footer.legal.capitalValue') },
    { label: t('footer.legal.sharesLabel'), value: t('footer.legal.sharesValue') },
    { label: t('footer.legal.managerLabel'), value: t('footer.legal.managerValue') },
    { label: t('footer.legal.partnersLabel'), value: t('footer.legal.partnersValue') },
    { label: t('footer.legal.liquidationLabel'), value: t('footer.legal.liquidationValue') }
  ];

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
            <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>
            <p>{t('footer.location')}</p>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.social')}</h3>
            <a href="https://www.linkedin.com/company/simasiaai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/simasiaai/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-legal" data-nosnippet="true">
          <details className="footer-legal-details">
            <summary>{t('footer.legal.title')}</summary>
            <ul className="footer-legal-list" data-nosnippet="true">
              {legalItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label.replace(/^\d+\.\s*/, '')}:</strong> {item.value}
                </li>
              ))}
            </ul>
          </details>
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

