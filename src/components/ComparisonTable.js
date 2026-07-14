import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import './ComparisonTable.css';

const ComparisonTable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });
  const { t } = useTranslation();
  const rows = t('comparison.rows');
  const headers = t('comparison.headers');

  return (
    <section className="comparison-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>
            {t('comparison.titleBefore')}{' '}
            <em className="brand-dialogos">DialogosAI</em>{' '}
            {t('comparison.titleAfter')}
          </h2>
          <p className="comparison-subtitle">{t('comparison.subtitle')}</p>
        </motion.div>

        <motion.div
          className="comparison-table-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{headers.feature}</th>
                <th>{headers.traditional}</th>
                <th><em className="brand-dialogos">{headers.dialogos}</em></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.traditional}</td>
                  <td>{row.dialogos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
