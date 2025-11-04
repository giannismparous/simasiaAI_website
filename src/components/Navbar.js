import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    { path: "/", text: "Αρχική" },
    { path: "/solutions", text: "Λύσεις" },
    { path: "/education", text: "Εκπαίδευση" },
    { path: "/about", text: "Ποιοι είμαστε" },
    { path: "/book-demo", text: "Κλείστε ένα demo", isButton: true }
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
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;

