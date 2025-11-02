import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SimasiaAI</h3>
            <p>Τεχνητή Νοημοσύνη με ανθρώπινο DNA. Λύσεις που ενισχύουν την συμπερίληψη, την ισότητα και την ανθρώπινη επικοινωνία.</p>
          </div>
          
          <div className="footer-section">
            <h3>Πλοήγηση</h3>
            <a href="#about">Για εμάς</a>
            <a href="#mission">Αποστολή</a>
            <a href="#values">Αξίες</a>
            <a href="#solutions">Λύσεις</a>
            <a href="#impact">Συνεργασίες</a>
          </div>
          
          <div className="footer-section">
            <h3>Επικοινωνία</h3>
            <a href="mailto:info@simasia.ai">info@simasia.ai</a>
            <p>Ελλάδα</p>
          </div>
          
          <div className="footer-section">
            <h3>Social Media</h3>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 SimasiaAI. Όλα τα δικαιώματα κατοχυρωμένα.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

