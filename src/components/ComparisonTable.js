import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ComparisonTable.css';

const rows = [
  {
    feature: 'Γλωσσική Προσέγγιση',
    traditional: 'Τυποποιημένες λέξεις-κλειδιά',
    simasia: 'Φυσική γλώσσα & τοπικές διάλεκτοι',
  },
  {
    feature: 'Κανονιστική Συμμόρφωση',
    traditional: 'Ασαφής / Ρίσκο δεδομένων',
    simasia: 'Πλήρες EU AI Act Compliance',
  },
  {
    feature: 'Προσβασιμότητα',
    traditional: 'Σπάνια ή υποτυπώδης',
    simasia: 'Καθολική σχεδίαση για ΑμεΑ',
  },
  {
    feature: 'Ενεργειακό Αποτύπωμα',
    traditional: 'Υψηλό / Ανεξέλεγκτο',
    simasia: 'Eco-Friendly Optimized RAG',
  },
  {
    feature: 'Ρόλος στη Συζήτηση',
    traditional: 'Αντιδραστικός (Μόνο απαντήσεις)',
    simasia: 'Προληπτικός (Ψηφιακός Πλοηγός)',
  },
];

const ComparisonTable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section className="comparison-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Τι κάνει το Simaki διαφορετικό;</h2>
          <p className="comparison-subtitle">
            Σύγκριση με τα παραδοσιακά chatbot.
          </p>
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
                <th>Χαρακτηριστικό</th>
                <th>Παραδοσιακά Chatbots</th>
                <th>Simaki</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.feature}</td>
                  <td>{row.traditional}</td>
                  <td>{row.simasia}</td>
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
