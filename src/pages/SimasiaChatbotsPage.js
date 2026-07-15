import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import LiveDemoSection from '../components/LiveDemoSection';
import ComparisonTable from '../components/ComparisonTable';
import InsightsDashboardSection from '../components/InsightsDashboardSection';
import ControlledImprovementSection from '../components/ControlledImprovementSection';
import InteractiveConstellation from '../components/InteractiveConstellation';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './SimasiaChatbotsPage.css';

// CountUp Component for live increasing stats
const CountUp = ({ end, duration = 1500, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * end;
      setCount(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, inView]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
};

const SimasiaChatbotsPage = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const narrativeRef = useRef(null);
  const featRef = useRef(null);
  const audienceRef = useRef(null);

  const narrativeInView = useInView(narrativeRef, { once: true, margin: '100px' });
  const featInView = useInView(featRef, { once: true, margin: '100px' });
  const audienceInView = useInView(audienceRef, { once: true, margin: '100px' });

  const sloganWords = t('chatbotsPage.sloganWords') || [];
  const pillars = t('chatbotsPage.pillars') || [];
  const characteristics = t('chatbotsPage.characteristics') || [];
  const dialogueSectors = t('chatbotsPage.sectors') || [];
  const stats = t('chatbotsPage.stats') || [];

  return (
    <div className="scp-page">
      {/* Hero */}
      <section className="scp-hero" ref={heroRef}>
        <InteractiveConstellation pattern="neural" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="scp-hero-content"
          >
            <h1>
              <em className="brand-dialogos">DialogosAI</em>
            </h1>
            <div className="scp-slogan-wrap">
              <motion.p 
                className="scp-slogan"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
                initial="hidden"
                animate="visible"
              >
                {sloganWords.map((word, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                    variants={{
                      hidden: { opacity: 0, y: 4 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                    className={word.italic ? 'brand-dialogos' : ''}
                  >
                    {word.bold ? <strong>{word.text}</strong> : word.text}
                  </motion.span>
                ))}
              </motion.p>
            </div>
            <div className="scp-hero-ctas">
              <Link to="/book-demo" className="btn btn-primary btn-large">{t('chatbotsPage.bookDemo')}</Link>
              <a href="#live-demo" className="btn btn-secondary btn-large">
                {t('chatbotsPage.seeLive')} <span className="scp-btn-arrow">↓</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Indicator Bar */}
      <section className="scp-stats-bar">
        <div className="container scp-stats-grid">
          <div className="scp-stat-item">
            <span className="scp-stat-num">
              <CountUp end={99.4} decimals={1} suffix="%" />
            </span>
            <span className="scp-stat-label">{stats[0]}</span>
          </div>
          <div className="scp-stat-item">
            <span className="scp-stat-num">
              <CountUp end={100} decimals={0} suffix="%" />
            </span>
            <span className="scp-stat-label">{stats[1]}</span>
          </div>
          <div className="scp-stat-item">
            <span className="scp-stat-num">
              <CountUp end={4} decimals={0} suffix="" />
            </span>
            <span className="scp-stat-label">{stats[2]}</span>
          </div>
        </div>
      </section>

      {/* Narrative Section - Anthropic UI inspired typographically clean layout */}
      <section className="scp-narrative" ref={narrativeRef}>
        <div className="container">
          <motion.div 
            className="scp-narrative-anthropic-text"
            initial={{ opacity: 0, y: 20 }}
            animate={narrativeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p dangerouslySetInnerHTML={{ __html: t('chatbotsPage.narrativeHtml') }} />
          </motion.div>
        </div>
      </section>

      {/* The Three Architectural Pillars */}
      <section className="scp-pillars" ref={featRef}>
        <div className="container">
          <motion.div className="scp-pillars-header"
            initial={{ opacity: 0, y: 20 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('chatbotsPage.pillarsHeader')}</h2>
            <p>{t('chatbotsPage.pillarsSub')}</p>
          </motion.div>
          <div className="scp-pillars-list">
            {pillars.map((p, i) => (
              <motion.div key={i} className="scp-pillar"
                initial={{ opacity: 0, y: 20 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="scp-pillar-num">{p.num}</span>
                <div className="scp-pillar-body">
                  <h3>{p.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: p.body }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <LiveDemoSection />

      {/* Product Characteristics */}
      <section className="scp-chars">
        <div className="container">
          <div className="scp-pillars-header">
            <h2>{t('chatbotsPage.charsHeader')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('chatbotsPage.charsSubHtml') }} />
          </div>
          <div className="scp-pillars-list">
            {characteristics.map((char, i) => (
              <div key={i} className="scp-pillar">
                <span className="scp-pillar-num">{char.num}</span>
                <div className="scp-pillar-body">
                  <h3>{char.title}</h3>
                  <p>{char.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Communication Framework */}
      <section className="scp-dialogue" ref={audienceRef}>
        <div className="container">
          <motion.div
            className="scp-dialogue-header"
            initial={{ opacity: 0, y: 20 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 dangerouslySetInnerHTML={{ __html: t('chatbotsPage.dialogueHeaderHtml') }} />
            <p>{t('chatbotsPage.dialogueSub')}</p>
          </motion.div>

          {/* Communication Flow */}
          <motion.div
            className="scp-comm-flow"
            initial={{ opacity: 0, y: 16 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="scp-comm-node">
              <span className="scp-comm-label">{t('chatbotsPage.flowOrg')}</span>
            </div>
            <div className="scp-comm-arrow">
              <span>→</span>
            </div>
            <div className="scp-comm-node scp-comm-node--center">
              <span className="scp-comm-label"><em className="brand-dialogos">DialogosAI</em></span>
            </div>
            <div className="scp-comm-arrow">
              <span>→</span>
            </div>
            <div className="scp-comm-node">
              <span className="scp-comm-label">{t('chatbotsPage.flowPeople')}</span>
            </div>
          </motion.div>

          {/* Sector Items */}
          <div className="scp-dialogue-items">
            {dialogueSectors.map((item, i) => (
              <motion.div
                key={i}
                className="scp-dialogue-item"
                initial={{ opacity: 0, y: 20 }}
                animate={audienceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="scp-dialogue-num">{item.num}</span>
                <div className="scp-dialogue-body">
                  <div className="scp-dialogue-title-row">
                    <h3>{item.title}</h3>
                    <span className={`scp-dialogue-badge scp-dialogue-badge--${item.badge}`}>
                      {item.badgeLabel}
                    </span>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connecting Narrative */}
          <motion.div
            className="scp-dialogue-closing"
            initial={{ opacity: 0, y: 16 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p dangerouslySetInnerHTML={{ __html: t('chatbotsPage.dialogueClosingHtml') }} />
            <Link
              to="/book-demo"
              className="scp-dialogue-cta-link"
              dangerouslySetInnerHTML={{ __html: t('chatbotsPage.dialogueCtaHtml') }}
            />
          </motion.div>
        </div>
      </section>

      {/* Insights Dashboard — what people actually need */}
      <InsightsDashboardSection />

      {/* Controlled Improvement flywheel */}
      <ControlledImprovementSection />

      {/* Confident CTA */}
      <section className="scp-cta">
        <InteractiveConstellation pattern="minimal" />
        <div className="container">
          <h2>{t('chatbotsPage.finalTitle')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('chatbotsPage.finalBodyHtml') }} />
          <div className="scp-cta-actions">
            <Link to="/book-demo" className="btn btn-primary btn-large">{t('chatbotsPage.finalCta')}</Link>
            <a href="mailto:contact@simasiaai.gr" className="scp-email-link">contact@simasiaai.gr</a>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default SimasiaChatbotsPage;
