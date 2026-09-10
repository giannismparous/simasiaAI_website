import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/simasiaai',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75a1.75 1.75 0 0 0-1.75 1.75c0 .97.78 1.76 1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/simasiaai/',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61584445269687',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@simasiaai?is_from_webapp=1&sender_device=pc',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.91 2.91 0 0 1-2.9-2.89 2.9 2.9 0 0 1 2.9-2.9c.35 0 .69.07 1 .19V8.9a6.38 6.38 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.16a6.35 6.35 0 0 0 6.39 6.34 6.36 6.36 0 0 0 6.35-6.34V8.71a8.3 8.3 0 0 0 4.85 1.54V6.78a4.85 4.85 0 0 1-1-.09z" />
      </svg>
    ),
  },
];

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
            <h4>{t('footer.legalTitle') || 'Νομικά'}</h4>
            <Link to="/terms">{t('footer.termsLink') || 'Όροι Χρήσης'}</Link>
            <Link to="/privacy">{t('footer.privacyLink') || 'Πολιτική Απορρήτου'}</Link>
            <Link to="/cookies">{t('footer.cookiesLink') || 'Πολιτική Cookies'}</Link>
          </div>

          <div className="footer-col">
            <h4>{t('footer.contactTitle')}</h4>
            <a href="mailto:contact@simasiaai.gr" className="footer-contact-link">contact@simasiaai.gr</a>
            <p>{t('footer.addressLine1')}</p>
            <p>{t('footer.addressLine2')}</p>

            <div className="footer-social-wrap">
              <span className="footer-social-label">{t('footer.socialTitle') || 'Social Media'}</span>
              <div className="footer-social-grid">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-badge"
                    aria-label={`SimasiaAI on ${item.name}`}
                  >
                    <span className="footer-social-icon">{item.icon}</span>
                    <span className="footer-social-name">{item.name}</span>
                    <span className="footer-social-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
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
