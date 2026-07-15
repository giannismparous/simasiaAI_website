import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      {/* Subtle floating dots background */}
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
            <Link to="/services">{t('nav.services') || 'Υπηρεσίες'}</Link>
            <Link to="/team">{t('footer.teamLink')}</Link>
            <Link to="/collaborations">{t('nav.collaborations')}</Link>
            <Link to="/news">{t('footer.newsLink')}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footer.companyTitle')}</h4>
            <p className="footer-legal-name">Σημασία-ΑΙ Ι.Κ.Ε.</p>
            <p className="footer-legal-intl">(Simasia-AI P.C.)</p>
            <p>ΓΕΜΗ: 188174403000</p>
            <p>Α.Φ.Μ.: 803048250</p>
            <p>ΔΟΥ: ΚΕΦΟΔΕ Αττικής</p>
          </div>

          <div className="footer-col">
            <h4>{t('footer.contactTitle')}</h4>
            <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>
            <p>Ναρκίσσου 26, 15452</p>
            <p>Παλαιό Ψυχικό, Αττική</p>
            <div className="footer-social-links">
              <a href="https://www.linkedin.com/company/simasiaai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/simasiaai/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} {t('footer.copyright')}</p>
          <span className="footer-badge">{t('footer.complianceBadge') || 'EU AI Act Compliant'}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
