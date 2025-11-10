import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import { ChatbotsAnimation } from '../components/ProductAnimations';
import CTA from '../components/CTA';

const SimasiaChatbotsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const features = [
    "Προσβασιμότητα από σχεδιασμό: εναλλακτικοί τρόποι εισόδου/εξόδου (κείμενο/ήχος), WCAG-oriented επιλογές.",
    "Πολυγλωσσία: υποστήριξη πολλών ευρωπαϊκών και παγκόσμιων γλωσσών (ενδεικτικά: κινεζικά—μανδαρινικά/καντονέζικα, ιαπωνικά, κορεατικά, αραβικά, χίντι, μπενγκάλι κ.ά.) και τοπικές ελληνικές ποικιλίες (π.χ. κυπριακά, ποντιακά) όπου είναι εφικτό ή κατόπιν στοχευμένης εκπαίδευσης.",
    "Μείωση προκαταλήψεων: ροές αξιολόγησης και πολιτικές ισότητας/συμπερίληψης ενσωματωμένες στον σχεδιασμό.",
    "Εκπαίδευση σε δικό σας περιεχόμενο: τεκμηριωμένες πηγές, εγχειρίδια, οδηγίες για ειδικές καταστάσεις.",
    "Συνέπεια & ασφάλεια: απαντήσεις βασισμένες σε εγκεκριμένο περιεχόμενο με ελεγχόμενα αποδεικτικά.",
    "Κλιμάκωση και ειδοποιήσεις: δυνατότητα αποστολής ειδοποίησης (τηλεφωνικής/γραπτής) σε οριζόμενα πρόσωπα/υπηρεσίες όταν ανιχνεύονται ροές που το απαιτούν, μόνο κατόπιν ρητής συμφωνίας και πολιτικής κλιμάκωσης."
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
                SimasiaChatbots
              </h1>
            </SmoothReveal>
            <div style={{ marginBottom: '2rem', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChatbotsAnimation logoStyle={true} />
            </div>
            <SmoothReveal delay={0.2} yOffset={15}>
              <p style={{ fontSize: '1.5rem', color: 'var(--primary-warm)', marginBottom: '2rem' }}>
                Ασφαλή chatbots, σχεδιασμένα από ανθρώπους, για ανθρώπους
              </p>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="product-features" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
              Τα SimasiaChatbots προσφέρουν:
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

      <CTA />
    </div>
  );
};

export default SimasiaChatbotsPage;

