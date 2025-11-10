import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import { StudioAnimation } from '../components/ProductAnimations';
import CTA from '../components/CTA';

const SimasiaStudioPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const features = [
    "Ανέβασμα και επιλογή οδηγών ύφους στη μετάφραση και στην επιμέλεια κειμένου.",
    "Πρόσβαση σε έγκριτη ορολογία/γλωσσάρια.",
    "Επιμέλεια ελληνικών κειμένων με το Λεξικό Τριανταφυλλίδη (υποστήριξη/ενσωμάτωση εναλλακτικών λεξικών- επέκταση σε επιπλέον γλώσσα κατ' επιλογή).",
    "Αναλυτικές προτάσεις διόρθωσης και εξαγωγή αρχείων \"Παρακολούθησης αλλαγών\" (DOCX/PDF).",
    "Εξειδικευμένη μετάφραση/επιμέλεια ανά πεδίο, με σαφή μεταφραστική κατεύθυνση και τεκμηριωμένη ορολογία (ιατρική, νομική, ακαδημαϊκή γραφή, λογοτεχνικό ύφος), με προσαρμογή ύφους και ορολογίας κατ' επιλογή.",
    "Μαζική επεξεργασία και συνδέσεις (Google Drive/Dropbox/S3).",
    "Ρυθμιζόμενη ευαισθησία σε προκαταλήψεις γένους, κοινωνικών ομάδων, στερεοτύπων.",
    "Προσαρμοσμένος ορθογραφικός/γραμματικός έλεγχος για EL/EN, άλλες γλώσσες και ελληνικές διαλέκτους."
  ];

  return (
    <div className="product-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="product-hero" style={{ padding: '8rem 0 4rem', position: 'relative' }}>
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
          >
            <SmoothReveal delay={0.1} yOffset={20}>
              <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                SimasiaStudio
              </h1>
            </SmoothReveal>
            <div style={{ marginBottom: '2rem', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <StudioAnimation logoStyle={true} />
            </div>
            <SmoothReveal delay={0.2} yOffset={15}>
              <p style={{ fontSize: '1.5rem', color: 'var(--primary-warm)', marginBottom: '2rem' }}>
                Τεκμηριωμένη μετάφραση, επιμέλεια με ευθύνη
              </p>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="product-features" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
              Το SimasiaStudio προσφέρει:
            </h2>
          </SmoothReveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
                }}
                style={{
                  padding: '2rem',
                  background: 'var(--light-bg)',
                  borderRadius: '12px',
                  border: '1px solid rgba(44, 122, 123, 0.1)',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  <WordReveal text={feature} delay={0.25 + (index * 0.1)} duration={0.25} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/book-demo" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Προγραμματίστε ένα demo άμεσα
          </Link>
          <a href="#contact" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Ζητήστε πρόσβαση
          </a>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default SimasiaStudioPage;

