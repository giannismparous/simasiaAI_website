import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';
import '../components/Mission.css';

const SolutionsPage = () => {
  const ref = useRef(null);
  const wrapperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  // Generate fixed random offsets for each person circle
  const randomOffsets = useMemo(() => [
    Math.random() * 50 + 800,
    Math.random() * 50 + 800,
    Math.random() * 50 + 800,
    Math.random() * 50 + 800,
    Math.random() * 50 + 800,
  ], []);

  const originalPoints = useMemo(() => [
    { cx: 150, cy: 400 + randomOffsets[0] },
    { cx: 80, cy: 280 + randomOffsets[1] },
    { cx: 600, cy: 300 },
    { cx: 1050, cy: 380 + randomOffsets[3] },
    { cx: 1120, cy: 260 + randomOffsets[4] },
  ], [randomOffsets]);

  const [currentPoints, setCurrentPoints] = useState(originalPoints);
  const animationDelays = useMemo(() => [0, 1.2, 2.4, 3.6, 4.8], []);
  const animationDuration = 8;

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

    const wrapper = ref.current?.closest('.solutions-page-wrapper');
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

  const products = [
    {
      title: "Chatbots που μιλούν όπως εσείς",
      features: [
        "Εντοπισμός συναισθήματος για καλύτερη κατανόηση",
        "Εκπαίδευση με βάση τις δικές σας πηγές και guidelines",
        "Πολλαπλές γλώσσες και ελληνικές διάλεκτοι",
        "Εναλλακτικές επιλογές πρόσβασης για άτομα με αναπηρία",
        "Ελαχιστοποιημένες προκαταλήψεις"
      ]
    },
    {
      title: "Hammer",
      subtitle: "Ολιστικές λύσεις για το γραφείο",
      features: [
        "Επιμελητής κειμένου για άμεση διόρθωση",
        "Μεταφραστής πολλαπλών γλωσσών",
        "Δημιουργός QR codes και μετατροπέας αρχείων",
        "Σύνοψη βιογραφικού"
      ]
    }
  ];

  const audiences = [
    {
      title: "Οργανισμοί με ευάλωτες ομάδες",
      description: "Chatbots 24/7 που μιλούν πολλές γλώσσες, έχουν ελαχιστοποιημένες προκαταλήψεις, και εκπαιδεύονται με βάση τις δικές σας τεκμηριωμένες πηγές. Έλεγχος πλήρους περιεχομένου."
    },
    {
      title: "Επιχειρήσεις",
      description: "Άμεση εξυπηρέτηση 24/7, ενιαίο ύφος και γλώσσα, μείωση κόστους χωρίς απώλεια ποιότητας. Μετατρέψτε τη γνώση σας σε έξυπνη επικοινωνία."
    },
    {
      title: "Εκδοτικοί οίκοι / Μεταφραστές",
      description: "Το Hammer προσφέρει ολιστικές λύσεις για το γραφείο: επιμελητής κειμένου, μεταφραστής, δημιουργός QR codes, μετατροπέας αρχείων."
    }
  ];

  return (
    <div className="solutions-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="solutions-hero" style={{ padding: '8rem 0 4rem', position: 'relative' }}>
        <div className="container">
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}>
            <div 
              ref={ref}
              className="about-network-visualization"
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%) translateY(-50%)', width: '1200px', maxWidth: 'calc(100vw - 10%)', top: '50%', zIndex: 1, opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.5s ease-in-out' }}
            >
              <svg viewBox="0 0 1200 1400" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <defs>
                  <style>
                    {`
                      .hub-outer{ stroke: var(--secondary-warm, #5FB3B4); stroke-width: 10; fill: none; opacity: ${isHovered ? 0.4 : 0.12}; transition: opacity 0.5s ease-in-out; }
                      .hub-inner{ stroke: var(--accent-warm, #E07A5F); stroke-width: 2; fill: none; opacity: ${isHovered ? 0.35 : 0.1}; transition: opacity 0.5s ease-in-out; }
                      .hub-arc{ stroke: var(--primary-warm, #2C7A7B); stroke-width: 12; stroke-linecap: round; fill: none;
                                transform-origin: 600px 300px; animation: spin 10s linear infinite; opacity: ${isHovered ? 0.5 : 0.15}; transition: opacity 0.5s ease-in-out; }
                      .bridge-base{ stroke: var(--accent-warm, #E07A5F); stroke-width: 2; opacity: ${isHovered ? 0.3 : 0.08}; fill: none; transition: opacity 0.5s ease-in-out; }
                      .bridge-draw{ stroke: var(--primary-warm, #2C7A7B); stroke-width: 6; fill: none; stroke-linecap: round;
                                    stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 8s linear infinite; opacity: ${isHovered ? 0.5 : 0.15}; transition: opacity 0.5s ease-in-out; }
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
                  <filter id="softGlow2">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                <circle className="hub-outer" cx="600" cy="300" r="92"/>
                <circle className="hub-inner" cx="600" cy="300" r="64"/>
                <path className="hub-arc" d="M600,208 a92,92 0 0 1 70,38"/>

                {currentPoints.map((point, i) => (
                  <g key={i}>
                    <circle className="halo" cx={point.cx} cy={point.cy} r="18"/>
                    <circle className="person" cx={point.cx} cy={point.cy} r="7"/>
                    <g className={`b${i + 1}`}>
                      <path className="bridge-base" d={`M600,300 Q${(600 + point.cx) / 2},${(300 + point.cy) / 2} ${point.cx},${point.cy}`} pathLength="1000"/>
                      <path className="bridge-draw" d={`M600,300 Q${(600 + point.cx) / 2},${(300 + point.cy) / 2} ${point.cx},${point.cy}`} pathLength="1000"/>
                      <path className="care" d={`M600,300 Q${(600 + point.cx) / 2},${(300 + point.cy) / 2} ${point.cx},${point.cy}`}/>
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
                Λύσεις για Οργανισμούς
              </h1>
            </SmoothReveal>
            <SmoothReveal delay={0.2} yOffset={15}>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray-medium)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
                <WordReveal 
                  text="Ανάπτυξη AI λύσεων που αναγνωρίζουν την ατομική ιδιαιτερότητα, ενισχύουν την συμπερίληψη και εκφράζουν το εταιρικό προφίλ με σεβασμό."
                  delay={0.25}
                  duration={0.25}
                />
              </p>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="solutions-products" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title">Τα προϊόντα μας</h2>
          </SmoothReveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="product-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <SmoothReveal delay={0.25 + (index * 0.1)} yOffset={10}>
                  <h3>{product.title}</h3>
                </SmoothReveal>
                {product.subtitle && (
                  <SmoothReveal delay={0.3 + (index * 0.1)} yOffset={8}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-warm)', marginTop: '0.5rem', marginBottom: '1rem' }}>{product.subtitle}</h4>
                  </SmoothReveal>
                )}
                <ul className="product-features" style={{ marginTop: '1rem' }}>
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex}>
                      <WordReveal text={feature} delay={0.35 + (index * 0.1) + (fIndex * 0.05)} duration={0.2} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-audiences" style={{ padding: '6rem 0', background: 'var(--light-bg)' }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title">Σε ποιους απευθυνόμαστε</h2>
          </SmoothReveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                className="challenge-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <SmoothReveal delay={0.25 + (index * 0.1)} yOffset={10}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{audience.title}</h3>
                </SmoothReveal>
                <p>
                  <WordReveal text={audience.description} delay={0.3 + (index * 0.1)} duration={0.25} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <ContactForm />
    </div>
  );
};

export default SolutionsPage;

