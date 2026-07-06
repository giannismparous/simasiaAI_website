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
    desc: 'Άμεση εξυπηρέτηση δημοτών, εύρεση δικαιολογητικών και ψηφιακή καθοδήγηση χωρίς γραφειοκρατία.',
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
    title: 'Fluency & Context (Ουσιαστικός Διάλογος)',
    body: 'Driven by advanced computational linguistics, Simaki adapts perfectly to institutional tone, masters complex Greek dialects, and maps out user interactions proactively.',
  },
  {
    num: '02',
    title: 'Ethics & Compliance (Υπεύθυνος Διάλογος)',
    body: 'Built with absolute EU AI Act Compliance. Features universal accessibility for individuals with disabilities (PwD/ΑμεΑ), strict safety guardrails for crisis scenarios, and an engineered minimization of hallucinations.',
  },
  {
    num: '03',
    title: 'Sustainable AI (Πράσινος Διάλογος)',
    body: 'Ethical engineering means environmental responsibility. Through our proprietary Optimized RAG architecture, Simaki slashes computational strain and carbon footprint per query, ensuring eco-friendly enterprise scaling.',
  },
];

const characteristics = [
  {
    num: '01',
    title: 'Φυσική Γλώσσα & Τοπικές Διάλεκτοι',
    body: 'Το μοναδικό σύστημα στην Ελλάδα που αντιλαμβάνεται τη γλώσσα μας ακριβώς όπως τη μιλάμε, μαζί με τοπικές διαλέκτους και συναισθηματικές αποχρώσεις.',
  },
  {
    num: '02',
    title: 'Απόλυτη Κανονιστική Συμμόρφωση',
    body: 'Σχεδιασμένο εξαρχής με βάση τους αυστηρότερους ευρωπαϊκούς κανονισμούς (EU AI Act) για την ασφάλεια και την προστασία των προσωπικών δεδομένων.',
  },
  {
    num: '03',
    title: 'Καθολική Σχεδίαση για ΑμεΑ',
    body: 'Πλήρης προσβασιμότητα για άτομα με οπτικές, ακουστικές ή κινητικές δυσκολίες, εξασφαλίζοντας ίση πρόσβαση στην πληροφορία.',
  },
  {
    num: '04',
    title: 'Eco-Friendly Optimized RAG',
    body: 'Μειώνουμε δραστικά την κατανάλωση ενέργειας και το αποτύπωμα άνθρακα ανά ερώτημα με την έξυπνη υβριδική μας αρχιτεκτονική.',
  },
  {
    num: '05',
    title: 'Προληπτικός Ψηφιακός Πλοηγός',
    body: 'Δεν απαντά απλώς σε ερωτήσεις· προβλέπει τις ανάγκες του χρήστη και τον καθοδηγεί με ακρίβεια στα επόμενα βήματα.',
  },
];

const SimasiaChatbotsPage = () => {
  const heroRef = useRef(null);
  const narrativeRef = useRef(null);
  const featRef = useRef(null);
  const audienceRef = useRef(null);

  const narrativeInView = useInView(narrativeRef, { once: true, margin: '100px' });
  const featInView = useInView(featRef, { once: true, margin: '100px' });
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
            <span className="scp-eyebrow">The era of generic chatbots is over.</span>
            <h1>Meet Simaki.</h1>
            <p className="scp-hero-sub">
              An autonomous Language Navigator that bridge the gap between complex organizational data and real human needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="scp-narrative" ref={narrativeRef}>
        <div className="container">
          <div className="scp-narrative-grid">
            <motion.div 
              className="scp-narrative-block en"
              initial={{ opacity: 0, x: -30 }}
              animate={narrativeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="lang-tag">EN</span>
              <p>
                Traditional AI models operate in isolation; they merely predict words. <strong>Simaki</strong> is engineered as an autonomous Language Navigator. Inspired by the Greek roots of communication and interpretation, it acts as the ultimate messenger between complex organizational data and real human needs. It combines the intuitive intelligence of next-generation language entities with rigorous academic validation, guiding users through critical workflows with absolute clarity, empathy, and structural precision.
              </p>
            </motion.div>
            <motion.div 
              className="scp-narrative-block el"
              initial={{ opacity: 0, x: 30 }}
              animate={narrativeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="lang-tag">EL</span>
              <p>
                Τα παραδοσιακά μοντέλα AI λειτουργούν αποκομμένα· απλώς προβλέπουν λέξεις. Το <strong>Simaki</strong> είναι σχεδιασμένο ως ένας αυτόνομος Ψηφιακός Πλοηγός Γλώσσας. Αντλώντας έμπνευση από τις ελληνικές ρίζες της επικοινωνίας και της ερμηνείας, λειτουργεί ως ο απόλυτος αγγελιοφόρος ανάμεσα στα σύνθετα δεδομένα ενός οργανισμού και τις πραγματικές ανθρώπινες ανάγκες. Συνδυάζει την ευφυΐα των γλωσσικών μοντέλων νέας γενιάς με την αυστηρή ακαδημαϊκή εγκυρότητα, καθοδηγώντας τον χρήστη με απόλυτη σαφήνεια, ενσυναίσθηση και δομική ακρίβεια.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Three Architectural Pillars */}
      <section className="scp-pillars" ref={featRef}>
        <div className="container">
          <motion.div className="scp-pillars-header"
            initial={{ opacity: 0, y: 20 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>The Three Architectural Pillars</h2>
            <p>Our core framework driving next-generation enterprise conversational architecture.</p>
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

      {/* Product Characteristics */}
      <section className="scp-chars">
        <div className="container">
          <div className="scp-pillars-header">
            <h2>5 Μοναδικά Χαρακτηριστικά</h2>
            <p>Γιατί το Simaki αποτελεί το πιο εξελιγμένο σύστημα διαλόγου στην Ελλάδα.</p>
          </div>
          <div className="scp-pillars-list">
            {characteristics.map((char, i) => (
              <div key={i} className="scp-pillar">
                <span className="scp-pillar-num">{char.num}</span>
                <div className="scp-pillar-body">
                  <h3>{char.title}</h3>
                  <p>{char.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <p>Το Simaki προσαρμόζεται στις ιδιαίτερες απαιτήσεις κάθε κλάδου.</p>
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
          <h2>Αποκτήστε το κορυφαίο Simaki στην Ελλάδα.</h2>
          <p>
            Μην συμβιβάζεστε με generic λύσεις που μπερδεύουν τους χρήστες σας. 
            Κάντε τη διαφορά με το Simaki και κερδίστε την εμπιστοσύνη των πελατών σας από την πρώτη μέρα.
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
