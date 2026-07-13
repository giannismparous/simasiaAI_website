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
            <p className="footer-phrase">Μέτρο μας, ο Άνθρωπος.</p>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          <div className="footer-col">
            <h4>Πλοήγηση</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/applications/simasia-chatbots"><em className="brand-dialogos">DialogosAI</em></Link>
            <Link to="/services">Υπηρεσίες</Link>
            <Link to="/team">Η ομάδα μας</Link>
            <Link to="/collaborations">{t('nav.collaborations')}</Link>
            <Link to="/news">Νέα & Άρθρα</Link>
          </div>

          <div className="footer-col">
            <h4>Εταιρικά Στοιχεία</h4>
            <p className="footer-legal-name">Σημασία-ΑΙ Ι.Κ.Ε.</p>
            <p className="footer-legal-intl">(Simasia-AI P.C.)</p>
            <p>ΓΕΜΗ: 188174403000</p>
            <p>Α.Φ.Μ.: 803048250</p>
            <p>ΔΟΥ: ΚΕΦΟΔΕ Αττικής</p>
          </div>

          <div className="footer-col">
            <h4>{t('footer.contact')}</h4>
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
          <p>© {year} Σημασία ΑΙ (Simasia AI) · Ιδιωτική Κεφαλαιουχική Εταιρεία (Ι.Κ.Ε.)</p>
          <span className="footer-badge">EU AI Act Compliant</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
