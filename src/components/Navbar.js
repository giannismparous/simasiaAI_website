import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const isDarkHero = DARK_HERO_ROUTES.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 53);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const handleBrandClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/');
  };

  const navLinks = [
    { path: '/', text: t('nav.home') },
    { path: '/ypodochi', text: t('nav.ypodochi') },
    { path: '/collaborations', text: t('nav.collaborations') },
    { path: '/news', text: t('nav.news') },
    { path: '/team', text: t('nav.team') },
    { path: '/demo', text: t('nav.demo'), isButton: true },
  ];

  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}${isDarkHero && !scrolled ? ' dark-hero' : ''}`}
      >
        <div className="container">
          <Link to="/" className="logo" onClick={handleBrandClick} aria-label="SimasiaAI">
            <span className="logo-lockup">
              <img src="/logos/simasiaai.PNG" alt="" className="logo-img" />
              <span className="logo-wordmark">imasiaAI</span>
            </span>
          </Link>
          <button
            className={`mobile-menu-toggle${isMobileMenuOpen ? ' open' : ''}`}
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.toggleMenu')}
            aria-expanded={isMobileMenuOpen}
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
                    className={
                      location.pathname === link.path
                      || (link.path === '/news' && location.pathname.startsWith('/news/'))
                        ? 'active'
                        : ''
                    }>
                    {link.text}
                  </Link>
                )}
              </li>
            ))}
            <li className="nav-lang-item">
              <button onClick={toggleLanguage} className="language-switcher" aria-label={t('nav.switchLanguage')}>
                {language === 'el'
                  ? <ReactCountryFlag countryCode="GR" svg style={{ width: '26px', height: '26px' }} />
                  : <ReactCountryFlag countryCode="GB" svg style={{ width: '26px', height: '26px' }} />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
