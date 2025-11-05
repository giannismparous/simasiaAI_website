import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SimasiaAI / ΣημασίαΑΙ</h3>
            <p>AI από την πλευρά του ανθρώπου.</p>
          </div>
          
          <div className="footer-section">
            <h3>Πλοήγηση</h3>
            <a href="/">Αρχική</a>
            <a href="/about">Ποιοι είμαστε</a>
            <a href="/solutions">Λύσεις με σημασία</a>
            <a href="/collaborations">Συνεργασίες</a>
            <a href="/applications">Εφαρμογές</a>
          </div>
          
          <div className="footer-section">
            <h3>Επικοινωνία</h3>
            <a href="mailto:simasia.ai@gmail.com">simasia.ai@gmail.com</a>
            <p>Αθήνα, Ελλάδα</p>
          </div>
          
          <div className="footer-section">
            <h3>Social Media</h3>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; SimasiaAI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

