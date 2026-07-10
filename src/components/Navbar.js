import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { DARK_HERO_ROUTES } from '../constants/darkHeroRoutes';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const isDarkHero = DARK_HERO_ROUTES.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 48);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const handleLogoClick = (e) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const navLinks = [
    { path: '/', text: t('nav.home') },
    { path: '/applications/simasia-chatbots', text: <em className="brand-dialogos">DialogosAI</em> },
    { path: '/services', text: 'Υπηρεσίες' },
    { path: '/collaborations', text: t('nav.collaborations') },
    { path: '/book-demo', text: t('nav.bookDemo'), isButton: true },
  ];

  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}${isDarkHero && !scrolled ? ' dark-hero' : ''}`}
      >
        <div className="container">
          <Link to="/" className="logo" onClick={handleLogoClick} aria-label="SimasiaAI">
            <span className="logo-lockup">
              <img src="/logos/simasiaai.PNG" alt="" className="logo-img" />
              <span className="logo-wordmark">imasiaAI</span>
            </span>
          </Link>
          <button
            className={`mobile-menu-toggle${isMobileMenuOpen ? ' open' : ''}`}
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
          <ul className={`nav-links${isMobileMenuOpen ? ' open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.path}>
                {link.isButton ? (
                  <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className={`nav-demo-button${location.pathname === link.path ? ' active' : ''}`}>
                    {link.text}
                  </Link>
                ) : (
                  <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === link.path ? 'active' : ''}>
                    {link.text}
                  </Link>
                )}
              </li>
            ))}
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={toggleLanguage} className="language-switcher" aria-label="Switch language">
                {language === 'el'
                  ? <ReactCountryFlag countryCode="GR" svg style={{ width: '24px', height: '24px' }} />
                  : <ReactCountryFlag countryCode="GB" svg style={{ width: '24px', height: '24px' }} />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
