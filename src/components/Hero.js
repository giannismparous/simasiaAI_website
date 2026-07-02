import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { useTranslation } from '../hooks/useTranslation';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const [isMouseInHero, setIsMouseInHero] = useState(false);
  const [useSimpleBrandAnimation, setUseSimpleBrandAnimation] = useState(false);
  const [macTypeDone, setMacTypeDone] = useState(false);
  const heroRef = useRef(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  useEffect(() => {
    const handleMouseEnter = () => setIsMouseInHero(true);
    const handleMouseLeave = () => setIsMouseInHero(false);

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mouseenter', handleMouseEnter);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const platform = navigator.userAgentData?.platform || navigator.platform || '';
    const isMac = /Mac|Macintosh|MacIntel/i.test(platform) || /Macintosh|Mac OS X/i.test(ua);
    setUseSimpleBrandAnimation(isMac);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Network visualization ABOVE text */}
          <motion.div 
            className="hero-network-visualization hero-network-top"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ 
                opacity: isMouseInHero ? 1 : 0.4, 
                scale: 1 
              }}
              transition={{ 
                delay: 0.85, 
                duration: 0.8,
                opacity: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
              }}
            >
            <section className="simasia-network simasia-network-flipped" aria-label="Network visualization top">
                <svg viewBox="0 0 960 640" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
                  <defs>
                    <style>
                      {`
                      .simasia-network {
                        --bg: transparent;
                        --dark: var(--dark-text, #1F2D3D);
                        --p: var(--primary-warm, #2C7A7B);
                        --s: var(--secondary-warm, #5FB3B4);
                        --a: var(--accent-warm, #E07A5F);
                        --warm: var(--primary-warm, #2C7A7B);
                      }

                      .stem {
                        stroke: var(--warm);
                        stroke-width: 8;
                        fill: none;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        opacity: ${isMouseInHero ? 0.5 : 0.15};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .base {
                        opacity: ${isMouseInHero ? 0.3 : 0.08};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .draw {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: draw 4.8s ease-in-out infinite alternate;
                        opacity: ${isMouseInHero ? 0.6 : 0.25};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .nodes circle {
                        transform-box: fill-box;
                        transform-origin: center;
                        transform: scale(0);
                        animation: pop 0.6s ease-out forwards;
                        opacity: ${isMouseInHero ? 0.7 : 0.3};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .n1 { animation-delay: 0.6s; }
                      .n2 { animation-delay: 0.8s; }
                      .n3 { animation-delay: 1.0s; }
                      .n4 { animation-delay: 1.2s; }
                      .n5 { animation-delay: 1.4s; }
                      .n6 { animation-delay: 1.6s; }
                      .n7 { animation-delay: 1.8s; }

                      .halo {
                        fill: none;
                        stroke: var(--a);
                        stroke-width: 3;
                        opacity: ${isMouseInHero ? 0.3 : 0.08};
                        transform-origin: center;
                        animation: ring 3s ease-in-out infinite;
                        transition: opacity 0.5s ease-in-out;
                      }

                      .h1 { animation-delay: 0.7s; }
                      .h2 { animation-delay: 0.9s; }
                      .h3 { animation-delay: 1.1s; }
                      .h4 { animation-delay: 1.3s; }
                      .h5 { animation-delay: 1.5s; }
                      .h6 { animation-delay: 1.7s; }
                      .h7 { animation-delay: 1.9s; }

                      @keyframes draw {
                        from { stroke-dashoffset: 1000; }
                        to { stroke-dashoffset: 0; }
                      }

                      @keyframes pop {
                        60% { transform: scale(1.15); }
                        100% { transform: scale(1); }
                      }

                      @keyframes ring {
                        0%, 100% {
                          transform: scale(1);
                          opacity: ${isMouseInHero ? 0.3 : 0.08};
                        }
                        50% {
                          transform: scale(1.22);
                          opacity: ${isMouseInHero ? 0.4 : 0.15};
                        }
                      }

                      @media (prefers-reduced-motion: reduce) {
                        .draw, .nodes circle, .halo {
                          animation: none !important;
                          stroke-dashoffset: 0;
                          transform: none;
                          opacity: 0.15;
                        }
                      }
                    `}
                    </style>
                  </defs>

                  <rect x="0" y="0" width="960" height="640" fill="transparent"/>

                  <path
                    className="stem base"
                    d="M480 520 C480 460 482 410 486 370 C490 330 520 310 560 290 C600 270 612 240 600 220 C585 198 552 200 540 214"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M480 520 C480 460 482 410 486 370 C490 330 520 310 560 290 C600 270 612 240 600 220 C585 198 552 200 540 214"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M486 370 C450 352 425 330 410 305 C395 280 372 270 350 268"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M486 370 C450 352 425 330 410 305 C395 280 372 270 350 268"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M560 290 C600 300 630 310 660 310 C690 310 720 298 730 280"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M560 290 C600 300 630 310 660 310 C690 310 720 298 730 280"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M540 214 C510 205 490 188 470 164 C450 140 430 132 408 130"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M540 214 C510 205 490 188 470 164 C450 140 430 132 408 130"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M540 214 C560 200 585 185 610 170 C635 155 660 150 682 152"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M540 214 C560 200 585 185 610 170 C635 155 660 150 682 152"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M486 370 C495 350 510 338 525 330"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M486 370 C495 350 510 338 525 330"
                    pathLength="1000"
                  />

                  <g className="nodes" aria-hidden="true">
                    <circle className="halo h1" cx="480" cy="520" r="18"/>
                    <circle className="halo h2" cx="350" cy="268" r="18"/>
                    <circle className="halo h3" cx="730" cy="280" r="18"/>
                    <circle className="halo h4" cx="408" cy="130" r="18"/>
                    <circle className="halo h5" cx="682" cy="152" r="18"/>
                    <circle className="halo h6" cx="525" cy="330" r="18"/>
                    <circle className="halo h7" cx="540" cy="214" r="18"/>

                    <circle className="n1" cx="480" cy="520" r="9" fill="var(--p)"/>
                    <circle className="n2" cx="350" cy="268" r="9" fill="var(--s)"/>
                    <circle className="n3" cx="730" cy="280" r="9" fill="var(--a)"/>
                    <circle className="n4" cx="408" cy="130" r="9" fill="var(--p)"/>
                    <circle className="n5" cx="682" cy="152" r="9" fill="var(--s)"/>
                    <circle className="n6" cx="525" cy="330" r="9" fill="var(--a)"/>
                    <circle className="n7" cx="540" cy="214" r="9" fill="var(--p)"/>
                  </g>
                </svg>
              </section>
            </motion.div>
          
          {/* Brand Animation in its own centered container */}
          <div className="brand-anim-container">
            <section className={`simasia-brand-anim ${useSimpleBrandAnimation ? 'brand-anim-simple' : 'brand-anim-rich'}`} aria-label="Σimasia → /ΣimasiaAI/ with tagline">
              <div className="taglines">
                <div className="line1-wrapper">
                  <p className="line1a">{t('hero.line1a')}</p>
                  <p className="line1b">{t('hero.line1b')}</p>
                </div>
                <div className="line2-wrapper">
                  <p className="line2-placeholder" aria-hidden="true">{t('hero.line2')}</p>
                  <p className="line2">{t('hero.line2')}</p>
                </div>
              </div>

              {useSimpleBrandAnimation ? (
                <div className="brandline brandline-mac" aria-hidden="true">
                  {macTypeDone ? (
                    <span className="typewriter-text mac-static-brand">
                      <span className="mac-dark">/Σimas</span>
                      <span className="mac-accent">i</span>
                      <span className="mac-primary">aA</span>
                      <span className="mac-accent">I</span>
                      <span className="mac-dark">/</span>
                    </span>
                  ) : (
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString('/ΣimasiaAI/')
                          .callFunction(() => {
                            setMacTypeDone(true);
                          })
                          .start();
                      }}
                      options={{
                        autoStart: true,
                        loop: false,
                        delay: 85,
                        cursor: '',
                        wrapperClassName: 'typewriter-text',
                        cursorClassName: 'typewriter-cursor'
                      }}
                    />
                  )}
                  <span className="typewriter-cursor typewriter-cursor-persistent">|</span>
                </div>
              ) : (
                <div className="brandline brandline-rich" aria-hidden="true">
                  <span className="slash-left">/</span><span className="prefix-s">Σ</span><span className="prefix-i">i</span><span className="prefix-m">m</span><span className="prefix-a">a</span><span className="prefix-s2">s</span><span className="ia-i">i</span><span className="ia-a">a</span><span className="word"><span className="AI-A">A</span><span className="AI-I">I</span></span><span className="slash-right">/</span><span className="cursor">|</span>
                </div>
              )}
            </section>
          </div>
          
          {/* Network visualization BELOW text on the RIGHT */}
            <motion.div 
            className="hero-network-visualization hero-network-bottom"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ 
                opacity: isMouseInHero ? 1 : 0.4, 
                scale: 1 
              }}
              transition={{ 
                delay: 0.85, 
                duration: 0.8,
                opacity: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
              }}
            >
            <section className="simasia-network simasia-network-bottom-rotated" aria-label="Network visualization bottom right">
              <svg viewBox="0 0 960 640" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" transform="scale(1, -1) translate(0, -640)">
                  <defs>
                    <style>
                      {`
                      .simasia-network {
                        --bg: transparent;
                        --dark: var(--dark-text, #1F2D3D);
                        --p: var(--primary-warm, #2C7A7B);
                        --s: var(--secondary-warm, #5FB3B4);
                        --a: var(--accent-warm, #E07A5F);
                        --warm: var(--primary-warm, #2C7A7B);
                      }

                      .stem {
                        stroke: var(--warm);
                        stroke-width: 8;
                        fill: none;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        opacity: ${isMouseInHero ? 0.5 : 0.15};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .base {
                        opacity: ${isMouseInHero ? 0.3 : 0.08};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .draw {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: draw 4.8s ease-in-out infinite alternate;
                        opacity: ${isMouseInHero ? 0.6 : 0.25};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .nodes circle {
                        transform-box: fill-box;
                        transform-origin: center;
                        transform: scale(0);
                        animation: pop 0.6s ease-out forwards;
                        opacity: ${isMouseInHero ? 0.7 : 0.3};
                        transition: opacity 0.5s ease-in-out;
                      }

                      .n1 { animation-delay: 0.6s; }
                      .n2 { animation-delay: 0.8s; }
                      .n3 { animation-delay: 1.0s; }
                      .n4 { animation-delay: 1.2s; }
                      .n5 { animation-delay: 1.4s; }
                      .n6 { animation-delay: 1.6s; }
                      .n7 { animation-delay: 1.8s; }

                      .halo {
                        fill: none;
                        stroke: var(--a);
                        stroke-width: 3;
                        opacity: ${isMouseInHero ? 0.3 : 0.08};
                        transform-origin: center;
                        animation: ring 3s ease-in-out infinite;
                        transition: opacity 0.5s ease-in-out;
                      }

                      .h1 { animation-delay: 0.7s; }
                      .h2 { animation-delay: 0.9s; }
                      .h3 { animation-delay: 1.1s; }
                      .h4 { animation-delay: 1.3s; }
                      .h5 { animation-delay: 1.5s; }
                      .h6 { animation-delay: 1.7s; }
                      .h7 { animation-delay: 1.9s; }

                      @keyframes draw {
                        from { stroke-dashoffset: 1000; }
                        to { stroke-dashoffset: 0; }
                      }

                      @keyframes pop {
                        60% { transform: scale(1.15); }
                        100% { transform: scale(1); }
                      }

                      @keyframes ring {
                        0%, 100% {
                          transform: scale(1);
                          opacity: ${isMouseInHero ? 0.3 : 0.08};
                        }
                        50% {
                          transform: scale(1.22);
                          opacity: ${isMouseInHero ? 0.4 : 0.15};
                        }
                      }

                      @media (prefers-reduced-motion: reduce) {
                        .draw, .nodes circle, .halo {
                          animation: none !important;
                          stroke-dashoffset: 0;
                          transform: none;
                          opacity: 0.15;
                        }
                      }
                    `}
                    </style>
                  </defs>

                  <rect x="0" y="0" width="960" height="640" fill="transparent"/>

                  <path
                    className="stem base"
                    d="M480 520 C480 460 482 410 486 370 C490 330 520 310 560 290 C600 270 612 240 600 220 C585 198 552 200 540 214"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M480 520 C480 460 482 410 486 370 C490 330 520 310 560 290 C600 270 612 240 600 220 C585 198 552 200 540 214"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M486 370 C450 352 425 330 410 305 C395 280 372 270 350 268"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M486 370 C450 352 425 330 410 305 C395 280 372 270 350 268"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M560 290 C600 300 630 310 660 310 C690 310 720 298 730 280"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M560 290 C600 300 630 310 660 310 C690 310 720 298 730 280"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M540 214 C510 205 490 188 470 164 C450 140 430 132 408 130"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M540 214 C510 205 490 188 470 164 C450 140 430 132 408 130"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M540 214 C560 200 585 185 610 170 C635 155 660 150 682 152"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M540 214 C560 200 585 185 610 170 C635 155 660 150 682 152"
                    pathLength="1000"
                  />

                  <path
                    className="stem base"
                    d="M486 370 C495 350 510 338 525 330"
                    pathLength="1000"
                  />
                  <path
                    className="stem draw"
                    d="M486 370 C495 350 510 338 525 330"
                    pathLength="1000"
                  />

                  <g className="nodes" aria-hidden="true">
                    <circle className="halo h1" cx="480" cy="520" r="18"/>
                    <circle className="halo h2" cx="350" cy="268" r="18"/>
                    <circle className="halo h3" cx="730" cy="280" r="18"/>
                    <circle className="halo h4" cx="408" cy="130" r="18"/>
                    <circle className="halo h5" cx="682" cy="152" r="18"/>
                    <circle className="halo h6" cx="525" cy="330" r="18"/>
                    <circle className="halo h7" cx="540" cy="214" r="18"/>

                    <circle className="n1" cx="480" cy="520" r="9" fill="var(--p)"/>
                    <circle className="n2" cx="350" cy="268" r="9" fill="var(--s)"/>
                    <circle className="n3" cx="730" cy="280" r="9" fill="var(--a)"/>
                    <circle className="n4" cx="408" cy="130" r="9" fill="var(--p)"/>
                    <circle className="n5" cx="682" cy="152" r="9" fill="var(--s)"/>
                    <circle className="n6" cx="525" cy="330" r="9" fill="var(--a)"/>
                    <circle className="n7" cx="540" cy="214" r="9" fill="var(--p)"/>
                  </g>
                </svg>
              </section>
            </motion.div>
          
          <motion.div 
            className="cta-buttons" 
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.4 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <motion.a 
              href="#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t('hero.talkToTeam')}
            </motion.a>
            <motion.a 
              href="/applications" 
              className="btn btn-secondary"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t('hero.seeApplications')}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero-network-top{
          position: absolute;
          width: 100%;
          max-width: 500px;
          height: auto;
          top: 20%;
          left: -5%;
          z-index: 1;
          pointer-events: none;
          opacity: 0.4;
        }
        .hero-network-bottom{
          position: absolute;
          width: 100%;
          max-width: 500px;
          height: auto;
          bottom: 20%;
          right: -5%;
          left: auto;
          z-index: 1;
          pointer-events: none;
          opacity: 0.4;
        }
        @media (max-width: 768px){
          .hero-network-top{
            max-width: 300px;
            top: 10%;
            left: -10%;
            opacity: 0.25;
          }
          .hero-network-bottom{
            max-width: 300px;
            bottom: 10%;
            right: -10%;
            opacity: 0.25;
          }
          /* Fix mobile spacing */
          .simasia-brand-anim .taglines {
            min-height: auto !important;
          }
          .simasia-brand-anim .line1-wrapper {
            margin-bottom: 0.5rem !important;
            min-height: auto !important;
          }
          /* Fix ghost text spacing: overlay line2 on top of placeholder */
          .simasia-brand-anim .line2 {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
        .simasia-network-bottom-rotated {
          transform: rotate(180deg) !important;
          transform-origin: center center;
        }
        .simasia-network-bottom-rotated svg {
          transform: rotate(180deg) !important;
          transform-origin: center center;
        }
        .brand-anim-container{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2rem 0;
          position: relative;
          z-index: 3;
        }
        .simasia-brand-anim{
          --bg: transparent;
          --dark: var(--dark-text, #111111);
          --primary: var(--primary-warm, #2C7A7B);
          --secondary: var(--secondary-warm, #5FB3B4);
          --accent: var(--accent-warm, #E07A5F);
          background: transparent;
          color: var(--dark);
          font-family: "Crimson Pro", Georgia, serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1rem 0;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 100%;
          overflow: visible;
          box-sizing: border-box;
        }
        .simasia-brand-anim .taglines{
          text-align: center;
          line-height: 1.4;
          max-width: 100%;
          width: 100%;
          min-height: calc(clamp(1.5rem, 3vw, 3.5rem) * 1.15 + 0.5rem + clamp(1.25rem, 2.5vw, 1.25rem) * 1.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
          box-sizing: border-box;
          margin: 0 auto;
        }
        .simasia-brand-anim .line1-wrapper{
          width: 100%;
          max-width: 800px;
          margin: 0 auto 0.5rem auto;
          text-align: center;
          position: relative;
          z-index: 10;
          left: 50%;
          transform: translateX(-50%);
          min-height: calc(clamp(1.5rem, 3vw, 3.5rem) * 1.3 * 2);
        }
        .simasia-brand-anim .line1a{
          font-size: clamp(1.5rem, 3vw, 3.5rem);
          white-space: normal;
          overflow: hidden;
          display: block;
          border-right: none;
          font-family: "Crimson Pro", Georgia, serif;
          font-weight: 600;
          color: var(--dark-text);
          letter-spacing: -0.02em;
          line-height: 1.3;
          clip-path: inset(0 100% 0 0);
          animation: type1a 0.8s 0.1s steps(36,end) forwards;
          text-align: center;
          width: 100%;
          word-wrap: break-word;
          margin: 0;
        }
        .simasia-brand-anim .line1b{
          font-size: clamp(1.5rem, 3vw, 3.5rem);
          white-space: normal;
          overflow: hidden;
          display: block;
          border-right: none;
          font-family: "Crimson Pro", Georgia, serif;
          font-weight: 600;
          color: var(--dark-text);
          letter-spacing: -0.02em;
          line-height: 1.3;
          clip-path: inset(0 100% 0 0);
          animation: type1b 0.6s 0.6s steps(20,end) forwards;
          text-align: center;
          width: 100%;
          word-wrap: break-word;
          margin: 0;
        }
        .simasia-brand-anim .line2-wrapper{
          position: relative;
          display: block;
          min-height: 1.5em;
          width: 100%;
          text-align: center;
        }
        .simasia-brand-anim .line2-placeholder{
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-family: "Inter", sans-serif;
          font-weight: 500;
          letter-spacing: 0.01em;
          visibility: hidden;
          margin: 0 auto;
          display: block;
          white-space: normal;
        }
        .simasia-brand-anim .line2{
          position: relative;
          top: 0;
          left: 0;
          transform: none;
          font-size: clamp(1rem, 2vw, 1.15rem);
          white-space: normal;
          overflow: visible;
          display: block;
          border-right: none;
          color: var(--primary-warm);
          font-family: "Inter", sans-serif;
          font-weight: 500;
          letter-spacing: 0.01em;
          max-width: 100%;
          opacity: 0;
          animation: fadeIn2 0.5s 1.1s ease-out forwards;
          margin: 0;
          text-align: center;
          line-height: 1.5;
        }
        @keyframes fadeIn2 {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes type1a{
          from{ 
            clip-path: inset(0 100% 0 0);
          }
          to{ 
            clip-path: inset(0 0% 0 0);
          }
        }
        @keyframes type1b{
          from{ 
            clip-path: inset(0 100% 0 0);
          }
          to{ 
            clip-path: inset(0 0% 0 0);
          }
        }
        @keyframes type2{
          from{ max-width: 0 }
          to{ max-width: 100% }
        }

        .brandline{
          display: flex;
          align-items: center;
          gap: 0;
          font-weight: 700;
          font-size: clamp(2.5rem, 6vw, 4rem);
          letter-spacing: -0.01em;
          font-family: "Crimson Pro", Georgia, serif;
          width: 100%;
          max-width: 100%;
          justify-content: center;
          flex-wrap: wrap;
          overflow: visible;
          padding: 0 1rem;
          box-sizing: border-box;
          opacity: 0;
          animation: brandlineFadeIn 0.45s 0.25s ease-out forwards;
        }
        .brandline-mac .typewriter-text{
          color: var(--dark-text);
          font-family: "Crimson Pro", Georgia, serif;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .brandline-mac .typewriter-cursor{
          color: var(--secondary-warm);
          font-weight: 600;
          animation: blink 1s steps(1, end) infinite;
        }
        .brandline-mac .mac-static-brand{
          display: inline-flex;
          align-items: baseline;
          gap: 0;
        }
        .brandline-mac .mac-dark{
          color: var(--dark-text);
        }
        .brandline-mac .mac-primary{
          color: var(--dark-text);
          animation: macColorToPrimary 0.55s ease-out forwards;
        }
        .brandline-mac .mac-accent{
          color: var(--dark-text);
          animation: macColorToAccent 0.55s ease-out forwards;
        }
        .brandline-mac .typewriter-cursor-persistent{
          margin-left: 0.08em;
        }
        @keyframes macColorToPrimary{
          from { color: var(--dark-text); }
          to { color: var(--primary-warm); }
        }
        @keyframes macColorToAccent{
          from { color: var(--dark-text); }
          to { color: var(--accent-warm); }
        }
        .word{
          position: relative;
          display: inline-flex;
          align-items: baseline;
          gap: 0;
          margin-left: -0.05em;
          vertical-align: baseline;
          letter-spacing: 0;
          font-size: 0;
        }
        .word > * {
          font-size: clamp(2.5rem, 6vw, 4rem);
        }
        .ia-i, .ia-a{
          letter-spacing: 0;
          margin: 0;
          padding: 0;
        }
        .ia-i{
          margin-right: -0.2em;
        }
        .ia-a{
          margin-left: -0.2em;
        }
        .prefix-typed, .ia, .AI, .slash.right, .cursor{
          margin: 0;
          padding: 0;
        }
        .prefix-s, .prefix-i, .prefix-m, .prefix-a, .prefix-s2{
          color: var(--dark-text);
          display: inline-block;
          border-right: .08em solid transparent;
          margin-right: -0.05em;
          vertical-align: baseline;
          margin-left: 0;
          padding: 0;
          position: relative;
          opacity: 1 !important;
          transform: translateY(0);
          will-change: auto;
          animation: none !important;
          clip-path: none !important;
          -webkit-clip-path: none !important;
        }
        .prefix-s{
          animation: none !important;
        }
        .prefix-i{
          animation: none !important;
        }
        .prefix-m{
          animation: none !important;
        }
        .prefix-a{
          animation: none !important;
        }
        .prefix-s2{
          animation: none !important;
        }
        .prefix-typed{
          display: none;
        }
        @keyframes typeChar{
          from{
            opacity: 0;
            transform: translateY(.06em);
          }
          to{ 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ia-i, .ia-a{
          display: inline-block;
          border-right: .08em solid transparent;
          margin-right: -0.05em;
          vertical-align: baseline;
          margin-left: 0;
          padding: 0;
          opacity: 1 !important;
          transform: translateY(0);
          animation: none !important;
          clip-path: none !important;
          -webkit-clip-path: none !important;
        }
        .ia-i{
          color: var(--accent-warm);
          animation: none !important;
        }
        .ia-a{
          color: var(--primary-warm);
          margin-left: -0.05em;
          animation: none !important;
        }
        @keyframes typeIaChar{
          from{
            opacity: 0;
            transform: translateY(.06em);
          }
          to{
            opacity: 1;
            transform: translateY(0);
          }
        }
        .prefix{
          color: var(--dark-text);
        }
        .AI-A, .AI-I{
          transform: none;
          animation: none !important;
          margin-left: 0;
          opacity: 1 !important;
        }
        .AI-A{
          color: var(--primary-warm);
        }
        .AI-I{
          color: var(--accent-warm);
        }
        @keyframes iaPulse{
          from{ color: var(--dark-text) }
          to{ color: var(--primary-warm) }
        }
        @keyframes iaFadeGreen{
          to{ 
            opacity: .25;
            color: var(--primary-warm);
          }
        }
        @keyframes iaFadeRed{
          to{ 
            opacity: .25;
            color: var(--accent-warm);
          }
        }
        @keyframes aiPop{
          to{ transform: translateX(0) scale(1) }
        }

        .slash{
          opacity: 0;
          color: var(--accent-warm);
          transform: translateY(.2em);
        }
        .slash-left, .slash-right{
          opacity: 1;
          color: var(--dark-text);
          transform: none;
        }
        .slash-left{
          animation: none !important;
        }
        .slash-right{
          animation: none !important;
        }
        @keyframes slashIn{
          to{
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cursor{
          color: var(--secondary-warm);
          opacity: 1;
          margin-left: .1em;
          animation: blink 1.0s steps(1,end) infinite;
        }

        /* Rich animation mode for non-Mac/non-Safari devices */
        .brand-anim-rich .brandline{
          opacity: 1;
          animation: none;
        }
        .brand-anim-rich .prefix-s, .brand-anim-rich .prefix-i, .brand-anim-rich .prefix-m, .brand-anim-rich .prefix-a, .brand-anim-rich .prefix-s2{
          opacity: 0 !important;
          transform: none;
          animation: none;
          clip-path: inset(0 100% 0 0) !important;
          -webkit-clip-path: inset(0 100% 0 0) !important;
          will-change: clip-path;
        }
        .brand-anim-rich .prefix-s{ animation: typeChar 0.2s 0.2s steps(1,end) forwards !important; }
        .brand-anim-rich .prefix-i{ animation: typeChar 0.2s 0.4s steps(1,end) forwards !important; }
        .brand-anim-rich .prefix-m{ animation: typeChar 0.2s 0.6s steps(1,end) forwards !important; }
        .brand-anim-rich .prefix-a{ animation: typeChar 0.2s 0.8s steps(1,end) forwards !important; }
        .brand-anim-rich .prefix-s2{ animation: typeChar 0.2s 1.0s steps(1,end) forwards !important; }
        .brand-anim-rich .ia-i, .brand-anim-rich .ia-a{
          opacity: 0 !important;
          transform: none;
          animation: none;
          clip-path: inset(0 100% 0 0) !important;
          -webkit-clip-path: inset(0 100% 0 0) !important;
        }
        .brand-anim-rich .ia-i{
          animation: typeIaChar 0.25s 1.2s ease-out forwards, iaFadeRed .4s 1.6s ease-out forwards !important;
        }
        .brand-anim-rich .ia-a{
          animation: typeIaChar 0.25s 1.4s ease-out forwards, iaFadeGreen .4s 1.8s ease-out forwards !important;
        }
        .brand-anim-rich .AI-A, .brand-anim-rich .AI-I{
          opacity: 1 !important;
          transform: translateX(-0.6em) scale(0);
          animation: aiPop .6s 1.8s cubic-bezier(.2,.9,.15,1.1) forwards !important;
        }
        .brand-anim-rich .slash-left, .brand-anim-rich .slash-right{
          opacity: 0;
          transform: translateY(.2em);
        }
        .brand-anim-rich .slash-left{ animation: slashIn .35s 0s ease-out forwards !important; }
        .brand-anim-rich .slash-right{ animation: slashIn .35s 1.4s ease-out forwards !important; }
        .brand-anim-rich .cursor{
          opacity: 0;
          animation: blink 1.0s 2.2s steps(1,end) infinite !important;
        }

        /* Simple/typewriter-safe mode for Mac/Safari devices */
        .brand-anim-simple .brandline{
          opacity: 1;
          animation: brandlineFadeIn 0.35s 0.1s ease-out forwards;
        }
        .brand-anim-simple .prefix-s, .brand-anim-simple .prefix-i, .brand-anim-simple .prefix-m, .brand-anim-simple .prefix-a, .brand-anim-simple .prefix-s2,
        .brand-anim-simple .ia-i, .brand-anim-simple .ia-a, .brand-anim-simple .AI-A, .brand-anim-simple .AI-I{
          opacity: 0 !important;
          transform: translateY(.04em);
          animation: simpleCharIn 0.18s ease-out forwards !important;
          clip-path: none !important;
          -webkit-clip-path: none !important;
        }
        .brand-anim-simple .prefix-s{ animation-delay: 0.18s !important; }
        .brand-anim-simple .prefix-i{ animation-delay: 0.34s !important; }
        .brand-anim-simple .prefix-m{ animation-delay: 0.50s !important; }
        .brand-anim-simple .prefix-a{ animation-delay: 0.66s !important; }
        .brand-anim-simple .prefix-s2{ animation-delay: 0.82s !important; }
        .brand-anim-simple .ia-i{ animation-delay: 0.98s !important; }
        .brand-anim-simple .ia-a{ animation-delay: 1.12s !important; }
        .brand-anim-simple .AI-A{ animation-delay: 1.28s !important; }
        .brand-anim-simple .AI-I{ animation-delay: 1.44s !important; }
        .brand-anim-simple .slash-left, .brand-anim-simple .slash-right{
          opacity: 1;
          transform: none;
          animation: none !important;
        }
        .brand-anim-simple .cursor{
          opacity: 0;
          animation: blink 0.95s 1.6s steps(1,end) infinite !important;
        }
        @keyframes simpleCharIn{
          from { opacity: 0; transform: translateY(.04em); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes brandlineFadeIn{
          from { opacity: 0; transform: translateY(.08em); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink{
          0%, 49%{ opacity: 1 }
          50%, 100%{ opacity: 0 }
        }

        @media (prefers-reduced-motion: reduce){
          .prefix-s, .prefix-i, .prefix-m, .prefix-a, .prefix-s2,
          .ia-i, .ia-a, .AI-A, .AI-I,
          .slash-left, .slash-right, .cursor,
          .line1a, .line1b, .line2{
            animation: none !important;
            opacity: 1;
            transform: none;
            clip-path: none !important;
            -webkit-clip-path: none !important;
          }
          .ia-i, .ia-a{
            color: var(--dark-text) !important;
          }
        }

        @media (max-width: 950px) {
          .simasia-brand-anim .line2 {
             white-space: normal !important;
             height: auto !important;
             overflow: visible !important;
             opacity: 1 !important; /* Ensure it's visible if animation fails or clips */
             animation: fadeIn2 0.5s 0.5s ease-out forwards !important;
          }
          .simasia-brand-anim .line2-wrapper {
             height: auto !important;
             min-height: auto !important;
          }
        }

        @media (max-width: 768px){
          .hero-network-top,
          .hero-network-bottom {
            display: none !important;
          }
          .simasia-brand-anim{
            padding: 0.5rem 0;
            gap: 1rem;
          }
          .simasia-brand-anim .line1-wrapper{
            width: 100%;
            max-width: 100%;
            padding: 0 0.5rem;
            min-height: auto;
          }
          .simasia-brand-anim .line1a,
          .simasia-brand-anim .line1b{
            font-size: 1.5rem;
            line-height: 1.3;
          }
          .simasia-brand-anim .line2{
            font-size: 1rem;
            white-space: normal;
          }
          .simasia-brand-anim .line2-placeholder{
            font-size: 1rem;
          }
          .brandline{
            font-size: 2rem;
            padding: 0 0.5rem;
          }
          .word > *,
          .prefix-s, .prefix-i, .prefix-m, .prefix-a, .prefix-s2,
          .ia-i, .ia-a, .AI-A, .AI-I{
            font-size: 2rem;
          }
          /* Mobile fix: ensure characters are visible */
          .brand-anim-simple .prefix-s, .brand-anim-simple .prefix-i, .brand-anim-simple .prefix-m, .brand-anim-simple .prefix-a, .brand-anim-simple .prefix-s2{
            clip-path: none !important;
            -webkit-clip-path: none !important;
            width: auto !important;
            opacity: 0;
            animation: typeCharMobile 0.2s ease-out forwards;
          }
          .brand-anim-simple .prefix-s{
            animation-delay: 0.2s;
          }
          .brand-anim-simple .prefix-i{
            animation-delay: 0.4s;
          }
          .brand-anim-simple .prefix-m{
            animation-delay: 0.6s;
          }
          .brand-anim-simple .prefix-a{
            animation-delay: 0.8s;
          }
          .brand-anim-simple .prefix-s2{
            animation-delay: 1.0s;
          }
          @keyframes typeCharMobile{
            from{ opacity: 0; }
            to{ opacity: 1; }
          }
          .brand-anim-container{
            margin: 1rem 0;
          }
          .simasia-brand-anim .taglines{
            padding: 0 0.5rem;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
