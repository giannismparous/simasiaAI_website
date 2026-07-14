import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './InsightsDashboardSection.css';

const ease = [0.16, 1, 0.3, 1];

const CHART_W = 300;
const CHART_H = 108;
const CHART_PAD = { top: 10, right: 10, bottom: 6, left: 10 };

const normalizeSeries = (values) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values.map((v) => ((v - min) / range) * 100);
};

const seriesToPath = (values) => {
  const plotW = CHART_W - CHART_PAD.left - CHART_PAD.right;
  const plotH = CHART_H - CHART_PAD.top - CHART_PAD.bottom;
  const normalized = normalizeSeries(values);

  return normalized
    .map((v, i) => {
      const x = CHART_PAD.left + (i / (normalized.length - 1)) * plotW;
      const y = CHART_PAD.top + plotH - (v / 100) * plotH;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
};

const TrendsChart = ({ items, weeks, inView }) => (
  <div className="idb-trends-chart">
    <div className="idb-trends-plot">
      <svg className="idb-trends-svg" viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {[25, 50, 75].map((pct) => {
          const y = CHART_PAD.top + (CHART_H - CHART_PAD.top - CHART_PAD.bottom) * (1 - pct / 100);
          return (
            <line
              key={pct}
              x1={CHART_PAD.left}
              x2={CHART_W - CHART_PAD.right}
              y1={y}
              y2={y}
              className="idb-trends-grid"
            />
          );
        })}
        {items.map((item) => (
          <motion.path
            key={item.label}
            d={seriesToPath(item.values)}
            fill="none"
            stroke={item.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.1, ease }}
          />
        ))}
      </svg>
      <div className="idb-trends-weeks">
        {weeks.map((week) => (
          <div className="idb-trends-week" key={week.date}>
            <span className="idb-trends-week-date">{week.date}</span>
            <span className="idb-trends-week-label">{week.label}</span>
          </div>
        ))}
      </div>
    </div>
    <ul className="idb-trends-legend">
      {items.map((item) => (
        <li key={item.label}>
          <span className="idb-trends-swatch" style={{ background: item.color }} />
          <span className="idb-trends-legend-label">{item.label}</span>
          <span className="idb-trends-legend-delta">{item.delta}</span>
        </li>
      ))}
    </ul>
  </div>
);

const InsightsDashboardSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const live = useInView(sectionRef, { margin: '-20% 0px -20% 0px' });

  const navItems = t('insightsDashboard.nav');
  const panels = t('insightsDashboard.panels');
  const locale = t('insightsDashboard.locale') || 'el-GR';
  const panelContent = {
    categories: {
      total: 1284,
      totalLabel: panels.categories.totalLabel,
      bars: panels.categories.bars,
    },
    topics: {
      weeks: panels.topics.weeks,
      items: panels.topics.items,
    },
    unanswered: {
      successRate: 94,
      improved: 38,
      ...panels.unanswered,
    },
    escalations: {
      count: 12,
      resolved: 9,
      ...panels.escalations,
    },
    struggles: panels.struggles,
    sources: {
      max: 142,
      items: panels.sources.items,
    },
    autoSync: {
      syncing: 3,
      ...panels.autoSync,
    },
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const pauseUntilRef = useRef(0);
  const panelKeys = ['categories', 'topics', 'unanswered', 'escalations', 'struggles', 'sources', 'autoSync'];

  useEffect(() => {
    if (!live) return undefined;
    const id = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveIndex((prev) => (prev + 1) % panelKeys.length);
    }, 4200);
    return () => clearInterval(id);
  }, [live, panelKeys.length]);

  const handleSelect = (index) => {
    setActiveIndex(index);
    pauseUntilRef.current = Date.now() + 8000;
  };

  const activeKey = panelKeys[activeIndex];

  const renderPanel = () => {
    switch (activeKey) {
      case 'categories':
        return (
          <div className="idb-panel idb-panel-categories">
            <div className="idb-cat-summary">
              <span className="idb-cat-total">{panelContent.categories.total.toLocaleString(locale)}</span>
              <span className="idb-cat-total-label">{panelContent.categories.totalLabel}</span>
            </div>
            <div className="idb-cat-chart">
              {panelContent.categories.bars.map((bar, i) => (
                <div className="idb-cat-row" key={bar.label}>
                  <div className="idb-cat-meta">
                    <span className="idb-cat-rank" style={{ color: bar.color }}>{bar.icon}</span>
                    <span className="idb-cat-label">{bar.label}</span>
                    <span className="idb-cat-pct">{bar.value}%</span>
                  </div>
                  <div className="idb-cat-track">
                    <motion.div
                      className="idb-cat-fill"
                      style={{ background: `linear-gradient(90deg, ${bar.color}, ${bar.color}99)` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${bar.value}%` } : { width: 0 }}
                      transition={{ duration: 0.85, delay: 0.12 + i * 0.07, ease }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'topics':
        return (
          <div className="idb-panel idb-panel-trends">
            <TrendsChart
              items={panelContent.topics.items}
              weeks={panelContent.topics.weeks}
              inView={inView}
            />
          </div>
        );

      case 'unanswered':
        return (
          <div className="idb-panel idb-panel-answers">
            <div className="idb-answer-stats">
              <div className="idb-answer-stat idb-answer-stat--ok">
                <span className="idb-answer-letter">A</span>
                <div>
                  <strong>{panelContent.unanswered.successRate}%</strong>
                  <span>{panelContent.unanswered.successRateLabel}</span>
                </div>
              </div>
              <div className="idb-answer-stat idb-answer-stat--warn">
                <span className="idb-answer-letter">B+</span>
                <div>
                  <strong>{panelContent.unanswered.improved}</strong>
                  <span>{panelContent.unanswered.improvedLabel}</span>
                </div>
              </div>
            </div>
            <div className="idb-answer-cols">
              <div className="idb-answer-col idb-answer-col--gap">
                <h4>{panelContent.unanswered.gapsTitle}</h4>
                {panelContent.unanswered.gaps.map((item) => (
                  <div className={`idb-answer-item idb-answer-item--${item.status}`} key={item.text}>
                    <span className="idb-answer-icon" aria-hidden="true">{item.status === 'gap' ? '!' : '↻'}</span>
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="idb-answer-col idb-answer-col--ok">
                <h4>{panelContent.unanswered.successTitle}</h4>
                {panelContent.unanswered.recentSuccess.map((item) => (
                  <div className="idb-answer-item idb-answer-item--ok" key={item}>
                    <span className="idb-answer-icon" aria-hidden="true">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'escalations':
        return (
          <div className="idb-panel idb-panel-escalations">
            <div className="idb-esc-header">
              <div className="idb-esc-hero">
                <motion.span
                  className="idb-esc-count"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {panelContent.escalations.count}
                </motion.span>
                <div>
                  <strong>{panelContent.escalations.countLabel}</strong>
                  <span>{panelContent.escalations.resolved} {panelContent.escalations.resolvedLine} {panelContent.escalations.avgWait}</span>
                </div>
              </div>
              <div className="idb-esc-flow" aria-hidden="true">
                <span>AI</span>
                <span className="idb-esc-arrow">→</span>
                <span className="idb-esc-human">{panelContent.escalations.human}</span>
              </div>
            </div>
            <ul className="idb-esc-cards">
              {panelContent.escalations.items.map((item, i) => (
                <motion.li
                  key={item.time}
                  className={`idb-esc-card idb-esc-card--${item.priority}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease }}
                >
                  <div className="idb-esc-card-top">
                    <time>{item.time}</time>
                    <span className={`idb-esc-priority idb-esc-priority--${item.priority}`}>
                      {item.priority === 'high' ? panelContent.escalations.high : panelContent.escalations.medium}
                    </span>
                  </div>
                  <blockquote className="idb-esc-question">{item.question}</blockquote>
                  <p className="idb-esc-note">{item.note}</p>
                  <span className="idb-esc-agent">→ {item.agent}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        );

      case 'struggles':
        return (
          <div className="idb-panel idb-panel-struggles">
            <div className="idb-struggle-grid">
              {panelContent.struggles.categories.map((cat, i) => (
                <motion.div
                  className={`idb-struggle-card idb-struggle-card--${cat.tone}`}
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease }}
                >
                  <span className="idb-struggle-cat">{cat.label}</span>
                  <span className="idb-struggle-pct">{cat.pct}%</span>
                  <span className="idb-struggle-count">{cat.count} {panelContent.struggles.frictionLabel}</span>
                  <div className="idb-struggle-meter">
                    <motion.div
                      className="idb-struggle-meter-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${cat.pct}%` } : { width: 0 }}
                      transition={{ duration: 0.75, delay: 0.15 + i * 0.08, ease }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="idb-struggle-hotspots">
              <span className="idb-struggle-hot-label">{panelContent.struggles.hotLabel}</span>
              <div className="idb-struggle-tags">
                {panelContent.struggles.hotspots.map((spot) => (
                  <span className="idb-struggle-tag" key={spot}>{spot}</span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'sources':
        return (
          <div className="idb-panel idb-panel-sources">
            {panelContent.sources.items.map((item, i) => (
              <motion.div
                className="idb-source-row"
                key={item.label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease }}
              >
                <div className="idb-source-labels">
                  <span className="idb-source-type">{item.type}</span>
                  <span className="idb-source-name">{item.label}</span>
                </div>
                <div className="idb-source-bar-wrap">
                  <div className="idb-source-bar-track">
                    <motion.div
                      className="idb-source-bar-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(item.uses / panelContent.sources.max) * 100}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
                    />
                  </div>
                  <span className="idb-source-count">{item.uses}</span>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'autoSync':
        return (
          <div className="idb-panel idb-panel-sync">
            <div className="idb-sync-header">
              <span className="idb-sync-badge">
                <span className="idb-sync-spinner" aria-hidden="true" />
                {panelContent.autoSync.syncing} {panelContent.autoSync.badge}
              </span>
            </div>
            <ul className="idb-sync-feed">
              {panelContent.autoSync.items.map((item, i) => (
                <motion.li
                  key={item.label}
                  className={`idb-sync-item idb-sync-item--${item.status}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease }}
                >
                  <span className={`idb-sync-status idb-sync-status--${item.status}`} aria-hidden="true">
                    {item.status === 'syncing' ? '↻' : '✓'}
                  </span>
                  <div className="idb-sync-body">
                    <strong>{item.label}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <time>{item.ago}</time>
                </motion.li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="insights-dashboard-section" ref={sectionRef} aria-labelledby="insights-dashboard-title">
      <div className="container insights-dashboard-grid">
        <motion.div
          className="insights-dashboard-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <span className="insights-dashboard-overline">{t('insightsDashboard.overline')}</span>
          <h2 id="insights-dashboard-title" className="forbes-section-title">
            {t('insightsDashboard.title')}
          </h2>
          <p className="insights-dashboard-lead">{t('insightsDashboard.lead')}</p>
          <p className="insights-dashboard-body">{t('insightsDashboard.body')}</p>

          <div className="insights-dashboard-nav" role="tablist" aria-label={t('insightsDashboard.aria')}>
            {navItems.map((item, i) => (
              <button
                key={item}
                type="button"
                role="tab"
                className={`insights-nav-item ${activeIndex === i ? 'is-active' : ''}`}
                aria-selected={activeIndex === i}
                onClick={() => handleSelect(i)}
              >
                <span className="insights-nav-num">{i + 1}</span>
                <span className="insights-nav-text">{item}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="insights-dashboard-visual"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease }}
        >
          <div className="idb-app" role="img" aria-label={t('insightsDashboard.aria')}>
            <div className="idb-app-chrome">
              <span className="idb-dot idb-dot-red" />
              <span className="idb-dot idb-dot-amber" />
              <span className="idb-dot idb-dot-green" />
              <span className="idb-app-title">
                <em className="brand-dialogos">DialogosAI</em> {t('insightsDashboard.appTitle')}
              </span>
              <span className="idb-live-badge">
                <span className="idb-live-pulse" aria-hidden="true" />
                {t('insightsDashboard.live')}
              </span>
            </div>

            <div className="idb-app-body">
              <div className="idb-main">
                <div className="idb-main-head">
                  <h3>{navItems[activeIndex]}</h3>
                  <span className="idb-main-updated">{t('insightsDashboard.updated')}</span>
                </div>

                <motion.div
                  key={activeKey}
                  className={`idb-panel-wrap idb-panel-wrap--${activeKey}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  {renderPanel()}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsDashboardSection;
