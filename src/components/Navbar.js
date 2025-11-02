import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { href: "#about", text: "Ποιοι είμαστε" },
    { href: "#mission", text: "Αποστολή" },
    { href: "#products", text: "Τα προϊόντα μας" },
    { href: "#contact", text: "Επικοινωνία" }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <a 
          href="#home" 
          className="logo" 
          onClick={closeMobileMenu}
        >
          <img 
            src="/logos/simasiaai-logo.png" 
            alt="SimasiaAI Logo" 
            className="logo-img"
          />
        </a>
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
          {navLinks.map((link, index) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                onClick={closeMobileMenu}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;

