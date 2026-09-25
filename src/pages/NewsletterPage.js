import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeroBackdrop from '../components/PageHeroBackdrop';
import { useTranslation } from '../hooks/useTranslation';
import './NewsletterPage.css';

const ease = [0.16, 1, 0.3, 1];

const NewsletterPage = () => {
  const { t, language } = useTranslation();

  // Active edition follows site language
  const selectedEdition = language === 'en' ? 'en' : 'el';
  // View mode: default spread (two-page book reader)
  const viewMode = 'spread';
  // Zoom modal state
  const [zoomImg, setZoomImg] = useState(null);

  // Handle ESC key to close zoom modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const folioRef = useRef(null);

  const editionPrefix = selectedEdition === 'en' ? 'en' : 'el';
  const page1Src = `/newsletter-files/page-${editionPrefix}-1.png`;
  const page2Src = `/newsletter-files/page-${editionPrefix}-2.png`;

  const pdfHref =
    selectedEdition === 'en'
      ? '/newsletter-files/simasiaai-newsletter-issue-1-en.pdf'
      : '/newsletter-files/simasiaai-newsletter-issue-1-el.pdf';

  return (
    <div className="nlp-oxford-page">
      {/* Editorial Hero Header */}
      <header className="nlp-hero-scholarly">
        <PageHeroBackdrop />
        <div className="container">
          <motion.div
            className="nlp-hero-inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="nlp-hero-preamble">
              <span className="nlp-hero-pub-id">{t('newsletterPage.masthead.volume')}</span>
            </div>

            <h1 className="nlp-hero-title">{t('newsletterPage.heroTitle')}</h1>
            <p className="nlp-hero-sub">{t('newsletterPage.heroSub')}</p>

            <div className="nlp-hero-quick-bar">
              <a href="#folio-viewer" className="nlp-btn-scholarly">
                {t('newsletterPage.viewer.heading')} ↓
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Interactive Folio Reader Section */}
      <section className="nlp-folio-section" id="folio-viewer" ref={folioRef}>
        <div className="container">
          {/* Journal Masthead Header Rule */}
          <div className="nlp-journal-masthead">
            <div className="nlp-masthead-top-rule" />
            <div className="nlp-masthead-meta-row">
              <span className="nlp-masthead-item">
                <strong>{selectedEdition === 'en' ? 'SimasiaAI Periodical Publications' : 'Περιοδικές Εκδόσεις SimasiaAI'}</strong>
              </span>
              <span className="nlp-masthead-item nlp-masthead-center">
                {selectedEdition === 'en' ? 'Vol. I · No. 1 · Autumn 2026' : 'Τόμος I · Τεύχος 1 · Φθινόπωρο 2026'}
              </span>
              <span className="nlp-masthead-item nlp-masthead-right">
                {t('newsletterPage.masthead.classification')}
              </span>
            </div>
            <div className="nlp-masthead-bottom-rule" />
          </div>

          {/* Folio Control Toolbar */}
          <div className="nlp-folio-toolbar">
            <div className="nlp-download-actions">
              <a
                href={pdfHref}
                download
                className="nlp-folio-download-btn"
                title="Download original high-resolution PDF"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>
                  {selectedEdition === 'en'
                    ? t('newsletterPage.viewer.downloadPdfEn')
                    : t('newsletterPage.viewer.downloadPdfEl')}
                </span>
              </a>
            </div>
          </div>

          {/* Realistic Editorial Folio Display */}
          <div className="nlp-folio-desk">
            <div className={`nlp-folio-spread nlp-folio-spread--${viewMode}`}>
              {/* Page 1 (Recto) */}
              {(viewMode === 'spread' || viewMode === 'page1') && (
                <div
                  className="nlp-folio-page-leaf nlp-folio-page-leaf--left"
                  onClick={() => setZoomImg(page1Src)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setZoomImg(page1Src)}
                  aria-label={`${t('newsletterPage.viewer.page1')} - ${t('newsletterPage.viewer.enlarge')}`}
                >
                  <div className="nlp-leaf-inner">
                    <img
                      src={page1Src}
                      alt={`${t('newsletterPage.issue1.title')} - Page 1`}
                      className="nlp-folio-img"
                      loading="lazy"
                    />
                    <div className="nlp-folio-hover-hint">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>{t('newsletterPage.viewer.enlarge')}</span>
                    </div>
                  </div>
                  <div className="nlp-page-footer-mark">
                    <span>SimasiaAI · {selectedEdition.toUpperCase()}</span>
                    <span className="nlp-page-num">— 1 —</span>
                  </div>
                </div>
              )}

              {/* Book Spine / Binding Fold (Visible in Spread mode) */}
              {viewMode === 'spread' && <div className="nlp-folio-gutter" aria-hidden="true" />}

              {/* Page 2 (Verso) */}
              {(viewMode === 'spread' || viewMode === 'page2') && (
                <div
                  className="nlp-folio-page-leaf nlp-folio-page-leaf--right"
                  onClick={() => setZoomImg(page2Src)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setZoomImg(page2Src)}
                  aria-label={`${t('newsletterPage.viewer.page2')} - ${t('newsletterPage.viewer.enlarge')}`}
                >
                  <div className="nlp-leaf-inner">
                    <img
                      src={page2Src}
                      alt={`${t('newsletterPage.issue1.title')} - Page 2`}
                      className="nlp-folio-img"
                      loading="lazy"
                    />
                    <div className="nlp-folio-hover-hint">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>{t('newsletterPage.viewer.enlarge')}</span>
                    </div>
                  </div>
                  <div className="nlp-page-footer-mark">
                    <span>SimasiaAI · {selectedEdition.toUpperCase()}</span>
                    <span className="nlp-page-num">— 2 —</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Click-to-Enlarge Lightbox Modal */}
      {zoomImg && (
        <div
          className="nlp-lightbox-backdrop"
          onClick={() => setZoomImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Folio Zoom"
        >
          <div className="nlp-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <div className="nlp-lightbox-bar">
              <span className="nlp-lightbox-title">
                {selectedEdition === 'en' ? 'Folio Inspection View (200 DPI)' : 'Προβολή Υψηλής Ανάλυσης Folio (200 DPI)'}
              </span>
              <div className="nlp-lightbox-bar-actions">
                <a
                  href={pdfHref}
                  download
                  className="nlp-lightbox-dl"
                >
                  PDF ↓
                </a>
                <button
                  type="button"
                  className="nlp-lightbox-close"
                  onClick={() => setZoomImg(null)}
                  aria-label={t('newsletterPage.viewer.closeModal')}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="nlp-lightbox-content">
              <img src={zoomImg} alt="Enlarged Folio Page" className="nlp-lightbox-img" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterPage;
