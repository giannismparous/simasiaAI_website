import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Impact.css';

const EMPTY_COLLAB_ITEMS = [];

const Impact = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const collaborations = useMemo(() => {
    const items = t('collaborations.current.items');
    return Array.isArray(items) ? items : EMPTY_COLLAB_ITEMS;
  }, [t]);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [positionIndex, setPositionIndex] = useState(0);
  const [isInstantSnap, setIsInstantSnap] = useState(false);
  const ringRepeats = 9;
  const ringCenterCopy = Math.floor(ringRepeats / 2);

  const repeatedCollaborations = useMemo(() => {
    if (collaborations.length < 2) {
      return collaborations.map((item, idx) => ({ item, logicalIndex: idx, key: `single-${idx}` }));
    }

    const repeated = [];
    for (let repeat = 0; repeat < ringRepeats; repeat += 1) {
      collaborations.forEach((item, logicalIndex) => {
        repeated.push({
          item,
          logicalIndex,
          key: `repeat-${repeat}-${logicalIndex}`
        });
      });
    }
    return repeated;
  }, [collaborations]);

  const getLogicalIndex = (index, length) => {
    if (!length) return 0;
    return ((index % length) + length) % length;
  };

  useEffect(() => {
    if (!collaborations.length) return;
    if (collaborations.length < 2) {
      setPositionIndex(0);
      return;
    }
    setPositionIndex((ringCenterCopy * collaborations.length));
  }, [collaborations, ringCenterCopy]);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;
    if (!viewportEl || !trackEl || !repeatedCollaborations.length) return;

    const applySlide = () => {
      const slides = trackEl.querySelectorAll('.impact-collaboration-slide');
      if (!slides.length) return;

      const boundedIndex = Math.max(0, Math.min(positionIndex, slides.length - 1));
      const activeSlide = slides[boundedIndex];
      if (!activeSlide) return;

      const viewportWidth = viewportEl.clientWidth;
      const activeCenterX = activeSlide.offsetLeft + (activeSlide.offsetWidth / 2);
      const translateX = (viewportWidth / 2) - activeCenterX;

      trackEl.style.transform = `translateX(${translateX}px)`;

      slides.forEach((slide, idx) => {
        slide.classList.toggle('impact-collaboration-slide--active', idx === boundedIndex);
        slide.classList.toggle('impact-collaboration-slide--inactive', idx !== boundedIndex);
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => applySlide());
    });
    const resizeHandler = () => applySlide();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [positionIndex, repeatedCollaborations]);

  useEffect(() => {
    if (collaborations.length < 2) return;

    const n = collaborations.length;
    const safeMin = n * 2;
    const safeMax = (n * ringRepeats) - (n * 2) - 1;

    if (positionIndex >= safeMin && positionIndex <= safeMax) return;

    const logical = getLogicalIndex(positionIndex, n);
    const timeout = window.setTimeout(() => {
      setIsInstantSnap(true);
      setPositionIndex((ringCenterCopy * n) + logical);
      window.setTimeout(() => setIsInstantSnap(false), 40);
    }, 520);

    return () => window.clearTimeout(timeout);
  }, [positionIndex, collaborations, ringCenterCopy]);

  const showPrevious = () => {
    if (!collaborations.length) return;
    if (collaborations.length < 2) return;
    setPositionIndex((prev) => prev - 1);
  };

  const showNext = () => {
    if (!collaborations.length) return;
    if (collaborations.length < 2) return;
    setPositionIndex((prev) => prev + 1);
  };

  const activeLogicalIndex = collaborations.length
    ? (collaborations.length < 2 ? 0 : getLogicalIndex(positionIndex, collaborations.length))
    : 0;

  return (
    <section className="impact-wrapper" id="impact">
      <div className="impact" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('collaborations.current.title')}
        </motion.h2>
        
        <motion.div 
          className="impact-content"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={viewportRef}
            className={`impact-carousel-viewport ${isInstantSnap ? 'impact-carousel-viewport--instant' : ''}`}
          >
            <div ref={trackRef} className="impact-carousel-track">
              {repeatedCollaborations.map(({ item, key }) => (
                <div key={key} className="impact-collaboration-slide impact-collaboration-slide--inactive">
                  <motion.div 
                    className="collaboration-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                  >
                    <span className="collaboration-category-badge">
                      {item.category}
                    </span>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                    >
                      {item.name}
                    </motion.h3>
                    <motion.p 
                      className="collaboration-description"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {item.description}
                    </motion.p>
                    <motion.div 
                      className="collaboration-logo collaboration-logo--carousel"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img 
                        src={item.logo || "/Collaborations/Logos/poamsk_logo.png"}
                        alt={item.name}
                        className="poamsk-logo"
                      />
                    </motion.div>
                    <motion.div 
                      className="collaboration-ctas collaboration-ctas--carousel"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.45 }}
                    >
                      <a href="#contact" className="btn btn-primary">
                        {t('collaborations.current.contact')}
                      </a>
                      <Link 
                        to="/book-demo" 
                        className="btn btn-primary"
                        style={{ background: 'rgba(255, 255, 255, 0.2)', border: '2px solid rgba(255, 255, 255, 0.5)', color: 'var(--white)' }}
                      >
                        {t('collaborations.current.bookDemo')}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {collaborations.length > 1 && (
            <div className="impact-carousel-controls">
              <button type="button" className="impact-carousel-nav" onClick={showPrevious} aria-label="Previous collaboration">
                &#8592;
              </button>
              <div className="impact-carousel-dots">
                {collaborations.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`impact-carousel-dot ${index === activeLogicalIndex ? 'is-active' : ''}`}
                    onClick={() => setPositionIndex((ringCenterCopy * collaborations.length) + index)}
                    aria-label={`Go to collaboration ${index + 1}`}
                  />
                ))}
              </div>
              <button type="button" className="impact-carousel-nav" onClick={showNext} aria-label="Next collaboration">
                &#8594;
              </button>
            </div>
          )}
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Impact;

