import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import './Hero.css';

const Hero = () => {
  const [isMouseInHero, setIsMouseInHero] = useState(false);
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

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-logo" variants={itemVariants}>
            <TypewriterText text="/ΣimasiaAI/" speed={90} delay={400} />
          </motion.div>
          <motion.div 
            className="hero-tagline" 
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            AI → «AI από την πλευρά του ανθρώπου»
          </motion.div>
          <div className="hero-heading-wrapper">
            <motion.div 
              className="hero-network-visualization hero-network-left"
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
              <section className="simasia-network simasia-network-flipped" aria-label="Network visualization left">
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
            <motion.div 
              className="hero-network-visualization hero-network-right"
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
              <section className="simasia-network" aria-label="Hands supporting a branching human network">
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
            <motion.h1 
              variants={itemVariants}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Το AI έχει σημασία όταν το δούμε <span className="highlight">ανάποδα</span>
            </motion.h1>
          </div>
          <motion.p 
            className="hero-subtitle" 
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            Από την πλευρά του ανθρώπου.
          </motion.p>
          <motion.div 
            className="hero-network-text"
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.4 }}
          >
            <p className="network-quote">
              Η ΤΝ υφαίνει γέφυρες προς τους ανθρώπους όταν έρχεται στα μέτρα μας για να εξυπηρετήσει τις ανάγκες μας.
            </p>
            <p className="network-quote-en">
              AI builds bridges to people when it comes to serving our needs.
            </p>
          </motion.div>
          <motion.div 
            className="cta-buttons" 
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            <motion.a 
              href="#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Μιλήστε με την ομάδα
            </motion.a>
            <motion.a 
              href="#solutions" 
              className="btn btn-secondary"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Λύσεις μας
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

