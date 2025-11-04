import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SmoothReveal } from './TextReveal';
import './TargetAudience.css';

const TargetAudience = () => {
  const [activeTab, setActiveTab] = useState('vulnerable-groups');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const tabs = [
    { id: 'vulnerable-groups', label: 'Οργανισμοί με ευάλωτες ομάδες' },
    { id: 'businesses', label: 'Επιχειρήσεις' },
    { id: 'content', label: 'Εκδοτικοί οίκοι / Μεταφραστές' },
    { id: 'b2c', label: 'B2C' }
  ];

  return (
    <section className="target-audience" id="target-audience">
      <div className="container">
        <SmoothReveal delay={0.2} yOffset={20}>
          <h2 className="section-title">Σε ποιους απευθυνόμαστε</h2>
        </SmoothReveal>

        <motion.div 
          className="audience-tabs"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`audience-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Vulnerable Groups Tab */}
        {activeTab === 'vulnerable-groups' && (
          <motion.div
            key="vulnerable-groups"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="audience-section">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Αν είστε εταιρεία, οργανισμός ή επαγγελματίας που απευθύνεται σε ευάλωτες ομάδες</h3>
              </SmoothReveal>
              
              <div className="solution-highlight" style={{ marginTop: '2rem', padding: '2rem', background: 'var(--light-bg)', borderRadius: '12px' }}>
                <SmoothReveal delay={0.15} yOffset={10}>
                  <p style={{ marginBottom: '1rem' }}>
                    Αντιμετωπίζετε προκλήσεις όπως έλλειψη ανθρώπινων πόρων για 24/7 υποστήριξη, δυσκολία στη διάδοση έγκυρης πληροφορίας, ή φόβος ότι το AI θα παραπληροφορήσει.
                  </p>
                  <p style={{ fontWeight: '600' }}>
                    👉 Τα chatbots μας λειτουργούν 24/7, μιλούν πολλές γλώσσες, έχουν ελαχιστοποιημένες προκαταλήψεις, και εκπαιδεύονται με βάση τις δικές σας τεκμηριωμένες πηγές. Η SimasiaAI σας δίνει τον έλεγχο — το chatbot μιλά με τη φωνή και τη φιλοσοφία του ίδιου του φορέα.
                  </p>
                </SmoothReveal>
              </div>
            </div>
          </motion.div>
        )}

        {/* Businesses Tab */}
        {activeTab === 'businesses' && (
          <motion.div
            key="businesses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="audience-section">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Αν είστε επιχείρηση με επικοινωνία και υποστήριξη πελατών</h3>
              </SmoothReveal>
              
              <p style={{ marginTop: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                (Tourism, E-shops, Real Estate, Travel Agencies, Museums, Cultural Centers, Restaurants, Tech Companies)
              </p>

              <div className="solution-highlight" style={{ padding: '2rem', background: 'var(--light-bg)', borderRadius: '12px' }}>
                <SmoothReveal delay={0.15} yOffset={10}>
                  <p style={{ marginBottom: '1rem' }}>
                    Αντιμετωπίζετε προκλήσεις όπως υψηλό κόστος customer support, απώλεια brand consistency, ή φόβος απώλειας ελέγχου της πληροφορίας.
                  </p>
                  <p style={{ fontWeight: '600' }}>
                    👉 Το chatbot της SimasiaAI απαντά άμεσα 24/7, διασφαλίζει ενιαίο ύφος και γλώσσα, και σας δίνει πλήρη έλεγχο πάνω στο περιεχόμενο. Μετατρέψτε τη γνώση σας σε έξυπνη επικοινωνία.
                  </p>
                </SmoothReveal>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content/Translation Tab */}
        {activeTab === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="audience-section">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Αν είστε επιχείρηση, φορέας, εκδοτικός οίκος, μεταφραστής/τρια</h3>
              </SmoothReveal>
              
              <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--light-bg)', borderRadius: '12px', textAlign: 'center' }}>
                <SmoothReveal delay={0.15} yOffset={10}>
                  <h4 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Hammer</h4>
                </SmoothReveal>
                <p>
                  Ολιστικές λύσεις για το γραφείο: επιμελητής κειμένου, μεταφραστής, δημιουργός QR code, μετατροπέας αρχείων και φωτογραφιών, σύνοψη βιογραφικού.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* B2C Tab */}
        {activeTab === 'b2c' && (
          <motion.div
            key="b2c"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="b2c-card">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Πλατφόρμα υποστήριξης εκπαιδευτικών και μαθητών</h3>
              </SmoothReveal>
              <p style={{ marginTop: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                (logo-link — κοστολόγηση ανά χρήση)
              </p>
              <p>
                Η πλατφόρμα έχει σχεδιαστεί για να στηρίζει την εκπαιδευτική διαδικασία: δημιουργία αξιολογήσεων για όλα τα μαθήματα και τάξεις, προσαρμογή δυσκολίας ανά μαθητή/τρια και αυτόματη διόρθωση με ανέβασμα φωτογραφίας ή PDF πραγματικού διαγωνίσματος.
              </p>
              <div className="b2c-buttons" style={{ marginTop: '2rem' }}>
                <motion.a 
                  href="#contact" 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Μάθετε περισσότερα
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Επικοινωνήστε για πρόσβαση
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TargetAudience;

