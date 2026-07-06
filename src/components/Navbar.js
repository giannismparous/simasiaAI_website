import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const isDarkHero = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const handleLogoClick = (e) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const navLinks = [
    { path: '/', text: t('nav.home') },
    { path: '/about', text: t('nav.about') },
    { path: '/applications/simasia-chatbots', text: 'SimasiaDialogue' },
    { path: '/collaborations', text: t('nav.collaborations') },
    { path: '/book-demo', text: t('nav.bookDemo'), isButton: true },
  ];

  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}${isDarkHero && !scrolled ? ' dark-hero' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container">
          <Link to="/" className="logo" onClick={handleLogoClick}>
            <img src="/logos/simasiaai.PNG" alt="SimasiaAI" className="logo-img" />
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
                  ? <ReactCountryFlag countryCode="GR" svg style={{ width: '22px', height: '22px' }} />
                  : <ReactCountryFlag countryCode="GB" svg style={{ width: '22px', height: '22px' }} />}
              </button>
            </li>
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
