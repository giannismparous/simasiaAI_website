import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './CookieBanner.css';

// Read in public/index.html too (GA loads only when this is 'all') — keep the names in sync.
const STORAGE_KEY = 'simasiaai_cookie_consent';
export const COOKIE_SETTINGS_EVENT = 'simasia:cookie-settings';

const loadAnalytics = () => {
  try {
    if (typeof window.__simasiaLoadAnalytics === 'function') window.__simasiaLoadAnalytics();
  } catch (e) {}
};

const revokeAnalytics = () => {
  try {
    if (typeof window.__simasiaRevokeAnalytics === 'function') window.__simasiaRevokeAnalytics();
  } catch (e) {}
};

const COPY = {
  el: {
    aria: 'Ρυθμίσεις cookies',
    text: 'Χρησιμοποιούμε cookies για να βελτιώνουμε την εμπειρία σας και να αναλύουμε τη χρήση της υπηρεσίας μας.',
    seeThe: 'Δείτε την',
    cookies: 'Πολιτική Cookies',
    and: 'και την',
    privacy: 'Πολιτική Απορρήτου',
    ours: 'μας.',
    current: (c) => (c === 'all' ? 'Τρέχουσα επιλογή: Αποδοχή όλων.' : 'Τρέχουσα επιλογή: Μόνο αναγκαία.'),
    accept: 'Αποδοχή Όλων',
    necessary: 'Μόνο Αναγκαία',
  },
  en: {
    aria: 'Cookie settings',
    text: 'We use cookies to improve your experience and to analyse how our service is used.',
    seeThe: 'See our',
    cookies: 'Cookie Policy',
    and: 'and',
    privacy: 'Privacy Policy',
    ours: '.',
    current: (c) => (c === 'all' ? 'Current choice: accept all.' : 'Current choice: necessary only.'),
    accept: 'Accept all',
    necessary: 'Necessary only',
  },
};

const CookieBanner = () => {
  const { language } = useLanguage();
  const copy = COPY[language === 'en' ? 'en' : 'el'];
  const [consent, setConsent] = useState(null);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setConsent(stored);
    } catch (e) {
      // localStorage not available
    }
  }, []);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  const handleAccept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'all'); } catch (e) {}
    loadAnalytics();
    setConsent('all');
    setReopened(false);
  };

  const handleNecessary = () => {
    try { localStorage.setItem(STORAGE_KEY, 'necessary'); } catch (e) {}
    revokeAnalytics();
    setConsent('necessary');
    setReopened(false);
  };

  const show = consent === null || reopened;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="cb-banner"
          role="dialog"
          aria-label={copy.aria}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cb-inner">
            <p className="cb-text">
              {copy.text}{' '}
              {copy.seeThe} <Link to="/cookies">{copy.cookies}</Link> {copy.and}{' '}
              <Link to="/privacy">{copy.privacy}</Link>
              {language === 'en' ? copy.ours : ` ${copy.ours}`}
              {reopened && consent ? <> {copy.current(consent)}</> : null}
            </p>
            <div className="cb-actions">
              <button type="button" className="cb-btn-accept" onClick={handleAccept}>
                {copy.accept}
              </button>
              <button type="button" className="cb-btn-necessary" onClick={handleNecessary}>
                {copy.necessary}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
