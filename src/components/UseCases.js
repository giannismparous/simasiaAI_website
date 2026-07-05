import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './UseCases.css';

const statusClass = (status) => {
  const s = status.toLowerCase();
  if (s.includes('live')) return 'live';
  if (s.includes('pilot')) return 'pilot';
  if (s.includes('tender')) return 'tender';
  return 'available';
};

const UseCases = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const categories = t('useCases.categories');
  const activeCategory = categories[activeTab];

  return (
    <section className="use-cases-section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('useCases.title')}
        </motion.h2>
        <motion.p
          className="usecases-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('useCases.subtitle')}
        </motion.p>

        {/* Tab Bar */}
        <motion.div
          className="usecases-tabs"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`usecases-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          className="usecases-content"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Desktop Table */}
              <table className="usecases-table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Sector</th>
                    <th style={{ width: '50%' }}>Use Case</th>
                    <th style={{ width: '20%' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCategory.items.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{item.name}</strong>
                        {item.detail && <span className="detail">{item.detail}</span>}
                      </td>
                      <td><span className="desc">{item.desc}</span></td>
                      <td>
                        <span className={`status-pill ${statusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="usecases-mobile-cards">
                {activeCategory.items.map((item, i) => (
                  <div key={i} className="usecase-mobile-card">
                    <h4>{item.name}</h4>
                    {item.detail && <div className="detail">{item.detail}</div>}
                    <div className="desc">{item.desc}</div>
                    <span className={`status-pill ${statusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="usecases-bottom-note"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('useCases.notYourDomain')}
        </motion.p>
      </div>
    </section>
  );
};

export default UseCases;
