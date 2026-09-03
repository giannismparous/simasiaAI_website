import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './CookieBanner.css';

const STORAGE_KEY = 'simasiaai_cookie_consent';

const CookieBanner = () => {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setConsent(stored);
    } catch (e) {
      // localStorage not available
    }
  }, []);

  const handleAccept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'all'); } catch (e) {}
    setConsent('all');
  };

  const handleNecessary = () => {
    try { localStorage.setItem(STORAGE_KEY, 'necessary'); } catch (e) {}
    setConsent('necessary');
  };

  const show = consent === null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="cb-banner"
          role="dialog"
          aria-label="Αποδοχή cookies"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cb-inner">
            <p className="cb-text">
              Χρησιμοποιούμε cookies για να βελτιώνουμε την εμπειρία σας και να αναλύουμε τη χρήση της υπηρεσίας μας.
              Δείτε την <Link to="/cookies">Πολιτική Cookies</Link> και την <Link to="/privacy">Πολιτική Απορρήτου</Link> μας.
            </p>
            <div className="cb-actions">
              <button type="button" className="cb-btn-accept" onClick={handleAccept}>
                Αποδοχή Όλων
              </button>
              <button type="button" className="cb-btn-necessary" onClick={handleNecessary}>
                Μόνο Αναγκαία
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
