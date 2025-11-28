import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WordReveal, SmoothReveal } from './TextReveal';
import './Products.css';

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const products = [
    {
      title: "Chatbots που μιλούν όπως εσείς",
      features: [
        "Εντοπισμός συναισθήματος",
        "Εκπαίδευση μοντέλων ελαχιστοποιώντας τις προκαταλήψεις",
        "Εκπαίδευση με βάση υλικό που μας υποδεικνύετε (guidelines/στρατηγικές διαχείρισης καταστάσεων, στρατηγική marketing της εταιρείας)",
        "Πολλαπλές γλώσσες (και ελληνικές διάλεκτοι, όπως τα κυπριακά)",
        "Εναλλακτικές επιλογές πρόσβασης για άτομα με αναπηρία"
      ]
    },
    {
      title: "Ολιστικές λύσεις για το γραφείο",
      subtitle: "Hammer",
      features: [
        "Επιμελητής κειμένου για άμεση διόρθωση και βελτίωση",
        "Μεταφραστής πολλαπλών γλωσσών",
        "Δημιουργός QR codes και μετατροπέας αρχείων",
        "Σύνοψη βιογραφικού για αποτελεσματική προβολή"
      ]
    },
    {
      title: "Εκπαιδευτικός βοηθός",
      subtitle: "Ο Φροντιστηριάρχης",
      features: [
        "Δημιουργία αξιολογήσεων για όλα τα μαθήματα και τάξεις",
        "Προσαρμογή δυσκολίας ανά μαθητή/τρια",
        "Αυτόματη διόρθωση με ανέβασμα φωτογραφίας ή PDF διαγωνίσματος"
      ]
    }
  ];

  return (
    <section className="products" id="products">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothReveal delay={0.1} yOffset={15}>
            <h2 className="section-title">Οι υπηρεσίες μας</h2>
          </SmoothReveal>

          <div className="products-grid">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="product-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <SmoothReveal delay={0.25 + (index * 0.1)} yOffset={10}>
                  <h3>{product.title}</h3>
                </SmoothReveal>
                {product.subtitle && (
                  <SmoothReveal delay={0.3 + (index * 0.1)} yOffset={8}>
                    <h4 className="product-subtitle">{product.subtitle}</h4>
                  </SmoothReveal>
                )}
                {product.features && (
                  <ul className="product-features">
                    {product.features.map((feature, fIndex) => (
                      <li key={fIndex}>
                        <WordReveal text={feature} delay={0.35 + (index * 0.1) + (fIndex * 0.05)} duration={0.2} />
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;

