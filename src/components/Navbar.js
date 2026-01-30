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
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", text: t('nav.home') },
    { path: "/about", text: t('nav.about') },
    { path: "/target-audience", text: t('nav.targetAudience') },
    { path: "/applications", text: t('nav.products') },
    { path: "/collaborations", text: t('nav.collaborations') },
    { path: "/book-demo", text: t('nav.bookDemo'), isButton: true }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <Link 
          to="/" 
          className="logo" 
          onClick={closeMobileMenu}
        >
          <img 
            src="/logos/simasiaai-logo.png" 
            alt="SimasiaAI Logo" 
            className="logo-img"
          />
        </Link>
        <motion.button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              {link.isButton ? (
                <Link 
                  to={link.path} 
                  onClick={closeMobileMenu}
                  className={`nav-demo-button ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.text}
                </Link>
              ) : (
                <Link 
                  to={link.path} 
                  onClick={closeMobileMenu}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.text}
                </Link>
              )}
            </li>
          ))}
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={toggleLanguage}
              className="language-switcher"
              aria-label="Switch language"
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            >
              {language === 'el' ? (
                <ReactCountryFlag countryCode="GR" svg style={{ width: '24px', height: '24px' }} />
              ) : (
                <ReactCountryFlag countryCode="GB" svg style={{ width: '24px', height: '24px' }} />
              )}
            </button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;

