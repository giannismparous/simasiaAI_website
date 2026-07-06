import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LiveDemoSection from '../components/LiveDemoSection';
import ComparisonTable from '../components/ComparisonTable';
import { Link } from 'react-router-dom';
import './SimasiaChatbotsPage.css';

const targetAudience = [
  {
    icon: '🏥',
    title: 'Υγεία & Κοινωνική Μέριμνα',
    desc: 'Υποστήριξη ασθενών, ενημέρωση για παροχές και καθοδήγηση σε ευαίσθητα κοινωνικά θέματα με απόλυτη ενσυναίσθηση.',
  },
  {
    icon: '🏛️',
    title: 'Δημόσιος Τομέας & Δήμοι',
    desc: 'Αμεση εξυπηρέτηση δημοτών, εύρεση δικαιολογητικών και ψηφιακή καθοδήγηση χωρίς γραφειοκρατία.',
  },
  {
    icon: '💼',
    title: 'Επιχειρήσεις & E-commerce',
    desc: 'Μετατροπή των απλών επισκεπτών σε πελάτες, υποστήριξη 24/7 και αύξηση πωλήσεων με φυσικό διάλογο.',
  },
  {
    icon: '🎓',
    title: 'Εκπαιδευτικοί Φορείς',
    desc: 'Υποστήριξη μαθητών, γονέων και καθηγητών με άμεση πρόσβαση σε εκπαιδευτικό υλικό και πληροφορίες.',
  },
];

const pillars = [
  {
    num: '01',
    title: 'Φυσική Γλώσσα & Τοπικές Διάλεκτοι',
    body: 'Το μοναδικό chatbot στην Ελλάδα που αντιλαμβάνεται τη γλώσσα μας ακριβώς όπως τη μιλάμε, μαζί με τοπικές διαλέκτους και συναισθηματικές αποχρώσεις.',
  },
  {
    num: '02',
    title: 'EU AI Act Compliance',
    body: 'Απόλυτη ασφάλεια δεδομένων. Σχεδιασμένο από την αρχή με βάση τους αυστηρότερους ευρωπαϊκούς κανονισμούς για την τεχνητή νοημοσύνη.',
  },
  {
    num: '03',
    title: 'Καθολική Σχεδίαση για ΑμεΑ',
    body: 'Προσβάσιμο σε όλους. Ενσωματώνει πρότυπα προσβασιμότητας για άτομα με οπτικές, ακουστικές ή κινητικές δυσκολίες.',
  },
  {
    num: '04',
    title: 'Eco-Friendly Optimized RAG',
    body: 'Πράσινη τεχνολογία. Βελτιστοποιημένο σύστημα ανάκτησης δεδομένων (RAG) που μειώνει δραστικά την κατανάλωση ενέργειας και το αποτύπωμα άνθρακα.',
  },
  {
    num: '05',
    title: 'Προληπτικός Ψηφιακός Πλοηγός',
    body: 'Δεν απαντά απλώς σε ερωτήσεις. Καθοδηγεί ενεργά τον χρήστη, προβλέπει τις ανάγκες του και προσφέρει λύσεις πριν καν ζητηθούν.',
  },
];

const SimasiaChatbotsPage = () => {
  const heroRef = useRef(null);
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: '100px' });
  const audienceRef = useRef(null);
  const audienceInView = useInView(audienceRef, { once: true, margin: '100px' });

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
            <span className="scp-eyebrow">Το Πιο Εξειδικευμένο Chatbot στην Ελλάδα</span>
            <h1>SimasiaDialogue</h1>
            <p className="scp-hero-sub">
              Σχεδιάζουμε τον μοναδικό, ανθρωποκεντρικό ψηφιακό πλοηγό που συνδυάζει 
              κορυφαία τεχνολογία, ελληνική εντοπιότητα και απόλυτη συμμόρφωση.
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
            <h2>5 Μοναδικά Χαρακτηριστικά</h2>
            <p>Γιατί το SimasiaDialogue διαφέρει από οποιοδήποτε άλλο chatbot της αγοράς.</p>
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

      {/* Whom it concerns */}
      <section className="scp-audience" ref={audienceRef}>
        <div className="container">
          <motion.div
            className="scp-audience-header"
            initial={{ opacity: 0, y: 20 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Ποιους αφορά</h2>
            <p>Το SimasiaDialogue προσαρμόζεται στις ιδιαίτερες απαιτήσεις κάθε κλάδου.</p>
          </motion.div>

          <div className="scp-audience-grid">
            {targetAudience.map((item, i) => (
              <motion.div
                key={i}
                className="scp-audience-card"
                initial={{ opacity: 0, y: 24 }}
                animate={audienceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <span className="scp-audience-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Confident CTA "Έλα πάρτο" */}
      <section className="scp-cta">
        <div className="container">
          <h2>Αποκτήστε το κορυφαίο Chatbot στην Ελλάδα.</h2>
          <p>
            Μην συμβιβάζεστε με generic λύσεις που μπερδεύουν τους χρήστες σας. 
            Κάντε τη διαφορά με το SimasiaDialogue και κερδίστε την εμπιστοσύνη των πελατών σας από την πρώτη μέρα.
          </p>
          <div className="scp-cta-actions">
            <Link to="/book-demo" className="btn btn-primary btn-large">Έλα πάρτο — Κλείστε Demo</Link>
            <a href="mailto:contact@simasiaai.gr" className="scp-email-link">contact@simasiaai.gr</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimasiaChatbotsPage;
