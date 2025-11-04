import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';
import '../components/Mission.css';

const EducationPage = () => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const randomOffsets = useMemo(() => [
    Math.random() * 50 + 700,
    Math.random() * 50 + 700,
    Math.random() * 50 + 700,
    Math.random() * 50 + 700,
  ], []);

  const originalPoints = useMemo(() => [
    { cx: 200, cy: 350 + randomOffsets[0] },
    { cx: 550, cy: 280 },
    { cx: 1000, cy: 360 + randomOffsets[2] },
    { cx: 1100, cy: 240 + randomOffsets[3] },
  ], [randomOffsets]);

  const [currentPoints, setCurrentPoints] = useState(originalPoints);
  const animationDelays = useMemo(() => [0, 1.5, 3, 4.5], []);
  const animationDuration = 7.5;

  const remapPoint = useCallback((index, basePoint) => {
    const downOffset = Math.random() * 100;
    const sideOffset = (Math.random() * 200) - 100;

    setCurrentPoints(prev => {
      const newPoint = {
        cx: basePoint.cx + sideOffset,
        cy: basePoint.cy + downOffset,
      };
      if (prev[index] && 
          prev[index].cx === newPoint.cx && 
          prev[index].cy === newPoint.cy) {
        return prev;
      }
      const updated = [...prev];
      updated[index] = newPoint;
      return updated;
    });
  }, []);

  const timersRef = useRef([]);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const wrapper = ref.current?.closest('.education-page-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', handleMouseEnter);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    timersRef.current.forEach(timer => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
      } else {
        clearInterval(timer);
      }
    });
    timersRef.current = [];

    originalPoints.forEach((basePoint, index) => {
      const firstTimer = setTimeout(() => {
        remapPoint(index, basePoint);
        const intervalTimer = setInterval(() => {
          remapPoint(index, basePoint);
        }, animationDuration * 1000);
        timersRef.current.push(intervalTimer);
      }, (animationDelays[index] + animationDuration) * 1000);

      timersRef.current.push(firstTimer);
    });

    return () => {
      timersRef.current.forEach(timer => {
        if (typeof timer === 'number') {
          clearTimeout(timer);
        } else {
          clearInterval(timer);
        }
      });
      timersRef.current = [];
    };
  }, [originalPoints, remapPoint, animationDelays, animationDuration]);

  const features = [
    "Δημιουργία αξιολογήσεων για όλα τα μαθήματα και τάξεις",
    "Προσαρμογή δυσκολίας ανά μαθητή/τρια",
    "Αυτόματη διόρθωση με ανέβασμα φωτογραφίας ή PDF διαγωνίσματος",
    "Αναλυτική αναφορά επιδόσεων",
    "Εξατομικευμένη υποστήριξη για κάθε μαθητή"
  ];

  return (
    <div className="education-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="education-hero" style={{ padding: '8rem 0 4rem', position: 'relative' }}>
        <div className="container">
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}>
            <div 
              ref={ref}
              className="about-network-visualization"
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%) translateY(-50%)', width: '1200px', maxWidth: 'calc(100vw - 10%)', top: '50%', zIndex: 1, opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.5s ease-in-out' }}
            >
              <svg viewBox="0 0 1200 1200" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <defs>
                  <style>
                    {`
                      .hub-outer{ stroke: var(--secondary-warm, #5FB3B4); stroke-width: 10; fill: none; opacity: ${isHovered ? 0.4 : 0.12}; transition: opacity 0.5s ease-in-out; }
                      .hub-inner{ stroke: var(--accent-warm, #E07A5F); stroke-width: 2; fill: none; opacity: ${isHovered ? 0.35 : 0.1}; transition: opacity 0.5s ease-in-out; }
                      .hub-arc{ stroke: var(--primary-warm, #2C7A7B); stroke-width: 12; stroke-linecap: round; fill: none;
                                transform-origin: 600px 280px; animation: spin 10s linear infinite; opacity: ${isHovered ? 0.5 : 0.15}; transition: opacity 0.5s ease-in-out; }
                      .bridge-base{ stroke: var(--accent-warm, #E07A5F); stroke-width: 2; opacity: ${isHovered ? 0.3 : 0.08}; fill: none; transition: opacity 0.5s ease-in-out; }
                      .bridge-draw{ stroke: var(--primary-warm, #2C7A7B); stroke-width: 6; fill: none; stroke-linecap: round;
                                    stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 7.5s linear infinite; opacity: ${isHovered ? 0.5 : 0.15}; transition: opacity 0.5s ease-in-out; }
                      .care{ stroke: var(--primary-warm, #2C7A7B); stroke-width: 6; fill: none; stroke-linecap: round;
                             stroke-dasharray: 1 140; animation: flow 2.4s linear infinite; opacity: ${isHovered ? 0.6 : 0.18}; transition: opacity 0.5s ease-in-out; }
                      .person{ fill: var(--dark-text, #1F2D3D); opacity: ${isHovered ? 0.7 : 0.2}; transition: opacity 0.5s ease-in-out; }
                      .halo{ fill: none; stroke: var(--accent-warm, #E07A5F); stroke-width: 4; opacity: ${isHovered ? 0.3 : 0.08};
                             transform-origin: center; animation: breathe 3.2s ease-in-out infinite; transition: opacity 0.5s ease-in-out; }
                      @keyframes draw{ from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
                      @keyframes flow{ from{stroke-dashoffset:0} to{stroke-dashoffset:-140} }
                      @keyframes spin{ to{ transform: rotate(360deg) } }
                      @keyframes breathe{ 0%,100%{ transform:scale(1)} 50%{ transform:scale(1.18)} }
                      .person, .halo{ transition: cx 0.3s ease-out, cy 0.3s ease-out; }
                    `}
                  </style>
                </defs>

                <circle className="hub-outer" cx="600" cy="280" r="92"/>
                <circle className="hub-inner" cx="600" cy="280" r="64"/>
                <path className="hub-arc" d="M600,188 a92,92 0 0 1 70,38"/>

                {currentPoints.map((point, i) => (
                  <g key={i}>
                    <circle className="halo" cx={point.cx} cy={point.cy} r="18"/>
                    <circle className="person" cx={point.cx} cy={point.cy} r="7"/>
                    <g className={`b${i + 1}`}>
                      <path className="bridge-base" d={`M600,280 C${(600 + point.cx) / 2},${(280 + point.cy) / 2} ${point.cx},${point.cy}`} pathLength="1000"/>
                      <path className="bridge-draw" d={`M600,280 C${(600 + point.cx) / 2},${(280 + point.cy) / 2} ${point.cx},${point.cy}`} pathLength="1000"/>
                      <path className="care" d={`M600,280 C${(600 + point.cx) / 2},${(280 + point.cy) / 2} ${point.cx},${point.cy}`}/>
                    </g>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <SmoothReveal delay={0.1} yOffset={20}>
              <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
                Εκπαίδευση
              </h1>
            </SmoothReveal>
            <SmoothReveal delay={0.2} yOffset={15}>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray-medium)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
                <WordReveal 
                  text="Πλατφόρμα υποστήριξης εκπαιδευτικών και μαθητών με AI που ενδυναμώνει την εκπαιδευτική διαδικασία."
                  delay={0.25}
                  duration={0.25}
                />
              </p>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="education-product" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title">Ο Φροντιστηριάρχης</h2>
          </SmoothReveal>
          
          <motion.div
            className="product-item"
            style={{ maxWidth: '800px', margin: '3rem auto 0' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <SmoothReveal delay={0.25} yOffset={10}>
              <p style={{ fontSize: '1.1rem', color: 'var(--gray-medium)', marginBottom: '2rem', textAlign: 'center' }}>
                <WordReveal 
                  text="Η πλατφόρμα έχει σχεδιαστεί για να στηρίζει την εκπαιδευτική διαδικασία με έξυπνες λύσεις AI."
                  delay={0.3}
                  duration={0.25}
                />
              </p>
            </SmoothReveal>
            <ul className="product-features" style={{ marginTop: '1rem' }}>
              {features.map((feature, fIndex) => (
                <li key={fIndex}>
                  <WordReveal text={feature} delay={0.35 + (fIndex * 0.05)} duration={0.2} />
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '2rem', textAlign: 'center', fontStyle: 'italic', color: 'var(--gray-medium)' }}>
              Κοστολόγηση ανά χρήση
            </p>
          </motion.div>
        </div>
      </section>

      <CTA />
      <ContactForm />
    </div>
  );
};

export default EducationPage;

