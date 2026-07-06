import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LiveDemoSection from '../components/LiveDemoSection';
import ComparisonTable from '../components/ComparisonTable';
import { Link } from 'react-router-dom';
import './SimasiaChatbotsPage.css';

const SimasiaChatbotsPage = () => {
  const heroRef = useRef(null);
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: '100px' });

  const pillars = [
    {
      num: '01',
      title: 'Φυσική Γλώσσα & Τοπικές Διάλεκτοι',
      body: 'Αντιλαμβάνεται την ελληνική γλώσσα όπως μιλιέται — με τοπικισμούς, ιδιωματισμούς και συναισθηματικές αποχρώσεις.',
    },
    {
      num: '02',
      title: 'EU AI Act Compliance',
      body: 'Πλήρης κανονιστική συμμόρφωση. Τα δεδομένα σας είναι ασφαλή, διαφανή και ελέγξιμα.',
    },
    {
      num: '03',
      title: 'Καθολική Σχεδίαση για ΑμεΑ',
      body: 'Σχεδιασμένο για να είναι προσβάσιμο σε όλους: άτομα με κινητικές, οπτικές ή γνωστικές δυσκολίες.',
    },
    {
      num: '04',
      title: 'Eco-Friendly Optimized RAG',
      body: 'Ελαχιστοποιούμε το ενεργειακό αποτύπωμα χωρίς να θυσιάζουμε την επίδοση.',
    },
    {
      num: '05',
      title: 'Προληπτικός Ψηφιακός Πλοηγός',
      body: 'Δεν απαντά μόνο — καθοδηγεί, ενημερώνει, και προβλέπει την επόμενη ανάγκη του χρήστη.',
    },
  ];

  return (
    <div className="scp-page">
      {/* Hero */}
      <section className="scp-hero" ref={heroRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="scp-eyebrow">Flagship Product</span>
            <h1>SimasiaDialogue</h1>
            <p className="scp-hero-sub">
              Ανθρωποκεντρικοί ψηφιακοί πλοηγοί για οργανισμούς που νοιάζονται.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="scp-pillars" ref={featRef}>
        <div className="container">
          <motion.div className="scp-pillars-header"
            initial={{ opacity: 0, y: 20 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Τι κάνει το SimasiaDialogue μοναδικό</h2>
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
                  <p>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <LiveDemoSection />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* CTA */}
      <section className="scp-cta">
        <div className="container">
          <h2>Έτοιμοι να ξεκινήσετε;</h2>
          <p>Κλείστε ένα 30λεπτο demo και δείτε το SimasiaDialogue σε πραγματικό διάλογο.</p>
          <div className="scp-cta-actions">
            <Link to="/book-demo" className="btn btn-primary">Κλείστε Demo</Link>
            <a href="mailto:contact@simasiaai.gr" className="scp-email-link">contact@simasiaai.gr</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimasiaChatbotsPage;
