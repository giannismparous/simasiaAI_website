import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import LiveDemoSection from '../components/LiveDemoSection';
import ComparisonTable from '../components/ComparisonTable';
import { Link } from 'react-router-dom';
import './SimasiaChatbotsPage.css';

// CountUp Component for live increasing stats
const CountUp = ({ end, duration = 1500, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * end;
      setCount(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, inView]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
};

const sloganWords = [
  { text: 'Ο', italic: false, bold: false },
  { text: 'DialogosAI', italic: true, bold: false },
  { text: 'δεν', italic: false, bold: false },
  { text: 'μπορεί', italic: false, bold: false },
  { text: 'παρά', italic: false, bold: false },
  { text: 'να', italic: false, bold: false },
  { text: 'μην', italic: false, bold: false },
  { text: 'έχει', italic: false, bold: false },
  { text: 'μέτρο', italic: false, bold: true },
  { text: 'τον', italic: false, bold: true },
  { text: 'άνθρωπο', italic: false, bold: true },
  { text: 'στη', italic: false, bold: false },
  { text: 'συνθήκη', italic: false, bold: false },
  { text: 'αλληλεπίδρασης', italic: false, bold: false },
  { text: 'ανθρώπου', italic: false, bold: false },
  { text: 'με', italic: false, bold: false },
  { text: 'την', italic: false, bold: false },
  { text: 'Τεχνητή', italic: false, bold: false },
  { text: 'Νοημοσύνη.', italic: false, bold: false }
];

const dialogueSectors = [
  {
    num: '01',
    title: 'Υγεία & Κοινωνική Μέριμνα',
    badge: 'proven',
    badgeLabel: 'ΑΠΟΔΕΔΕΙΓΜΕΝΟ',
    desc: 'Υποστήριξη ασθενών και καθοδήγηση σε ευαίσθητα ιατρικά θέματα. Ήδη σε λειτουργία σε οργανισμούς υγείας με απόλυτη ενσυναίσθηση και εχεμύθεια.',
  },
  {
    num: '02',
    title: 'Δημόσιος Τομέας & Δήμοι',
    badge: 'proven',
    badgeLabel: 'ΑΠΟΔΕΔΕΙΓΜΕΝΟ',
    desc: 'Καθοδήγηση πολιτών, αυτόματη εύρεση εγγράφων και διαδικασιών. Δοκιμασμένο σε πραγματικές συνθήκες δημόσιας διοίκησης.',
  },
  {
    num: '03',
    title: 'Επιχειρήσεις & Οργανισμοί',
    badge: 'ready',
    badgeLabel: 'ΕΤΟΙΜΟ',
    desc: 'Αυθεντικός ψηφιακός διάλογος που μετατρέπει επισκέπτες σε υποστηρικτές, με 24/7 εξυπηρέτηση και μείωση κόστους λειτουργίας.',
  },
  {
    num: '04',
    title: 'Εκπαίδευση & Κατάρτιση',
    badge: 'ready',
    badgeLabel: 'ΕΤΟΙΜΟ',
    desc: 'Εξατομικευμένη υποστήριξη εκπαιδευομένων, γονέων και καθηγητών με πρόσβαση σε εγκεκριμένο υλικό.',
  },
];

const pillars = [
  {
    num: '01',
    title: 'Fluency & Context (Ουσιαστικός Διάλογος)',
    body: 'Βασισμένος στην <strong>υπολογιστική γλωσσολογία</strong>, ο <em className="brand-dialogos">DialogosAI</em> προσαρμόζεται στο ύφος του οργανισμού σας, αντιλαμβάνεται <strong>τοπικές διαλέκτους</strong> και καθοδηγεί τον χρήστη προληπτικά.',
  },
  {
    num: '02',
    title: 'Ethics & Compliance (Υπεύθυνος Διάλογος)',
    body: 'Σχεδιασμένος με απόλυτη συμμόρφωση στο <strong>EU AI Act</strong>. Εξασφαλίζει καθολική προσβασιμότητα για <strong>ΑμεΑ</strong>, φίλτρα ασφαλείας για κρίσιμες καταστάσεις και ελαχιστοποίηση ψευδαισθήσεων.',
  },
  {
    num: '03',
    title: 'Sustainable AI (Πράσινος Διάλογος)',
    body: 'Η έξυπνη RAG αρχιτεκτονική μας <strong>μειούμε δραστικά την κατανάλωση ενέργειας</strong> και το υπολογιστικό κόστος ανά ερώτημα, κάνοντας την τεχνολογία βιώσιμη.',
  },
];

const characteristics = [
  {
    num: '01',
    title: 'Φυσική Γλώσσα & Τοπικές Διάλεκτοι',
    body: 'Το μοναδικό σύστημα στην Ελλάδα που αντιλαμβάνεται τη γλώσσα μας ακριβώς όπως τη μιλάμε, μαζί με τοπικές ιδιαιτερότητες και συναισθηματικές αποχρώσεις.',
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
        <div className="scp-neural-bg" aria-hidden="true" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="scp-hero-content"
          >
            <h1>
              <em className="brand-dialogos">DialogosAI</em>
            </h1>
            <div className="scp-slogan-wrap">
              <motion.p 
                className="scp-slogan"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
                initial="hidden"
                animate="visible"
              >
                {sloganWords.map((word, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                    variants={{
                      hidden: { opacity: 0, y: 4 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                    className={word.italic ? 'brand-dialogos' : ''}
                  >
                    {word.bold ? <strong>{word.text}</strong> : word.text}
                  </motion.span>
                ))}
              </motion.p>
            </div>
            <div className="scp-hero-ctas">
              <Link to="/book-demo" className="btn btn-primary btn-large">Κλείστε ένα Demo</Link>
              <a href="#live-demo" className="btn btn-secondary btn-large">Δείτε το Live</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Indicator Bar */}
      <section className="scp-stats-bar">
        <div className="container scp-stats-grid">
          <div className="scp-stat-item">
            <span className="scp-stat-num">
              <CountUp end={99.4} decimals={1} suffix="%" />
            </span>
            <span className="scp-stat-label">Ακρίβεια Απαντήσεων (RAG Validation)</span>
          </div>
          <div className="scp-stat-item">
            <span className="scp-stat-num">
              <CountUp end={100} decimals={0} suffix="%" />
            </span>
            <span className="scp-stat-label">Συμμόρφωση με το EU AI Act</span>
          </div>
          <div className="scp-stat-item">
            <span className="scp-stat-num">
              <CountUp end={4} decimals={0} suffix="" />
            </span>
            <span className="scp-stat-label">Εβδομάδες Custom Pilot</span>
          </div>
        </div>
      </section>

      {/* Narrative Section - Anthropic UI inspired typographically clean layout */}
      <section className="scp-narrative" ref={narrativeRef}>
        <div className="container">
          <motion.div 
            className="scp-narrative-anthropic-text"
            initial={{ opacity: 0, y: 20 }}
            animate={narrativeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              Τα παραδοσιακά μοντέλα AI λειτουργούν αποκομμένα· απλώς προβλέπουν λέξεις. Ο <em className="brand-dialogos">DialogosAI</em> είναι σχεδιασμένος ως ένας αυτόνομος <strong>Ψηφιακός Πλοηγός Γλώσσας</strong>. Αντλώντας έμπνευση από τις ελληνικές ρίζες της επικοινωνίας και της ερμηνείας, λειτουργεί ως ο απόλυτος αγγελιοφόρος ανάμεσα στα σύνθετα δεδομένα ενός οργανισμού και τις <strong>πραγματικές ανθρώπινες ανάγκες</strong>. Συνδυάζει την ευφυΐα των γλωσσικών μοντέλων νέας γενιάς με την αυστηρή ακαδημαϊκή εγκυρότητα, καθοδηγώντας τον χρήστη με <strong>απόλυτη σαφήνεια, ενσυναίσθηση και δομική ακρίβεια</strong>.
            </p>
          </motion.div>
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
            <h2>Οι Τρεις Αρχιτεκτονικοί Πυλώνες</h2>
            <p>Το τεχνολογικό υπόβαθρο που καθιστά τον ψηφιακό μας πλοηγό ηγέτη στην αγορά.</p>
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
                  <p dangerouslySetInnerHTML={{ __html: p.body }} />
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
            <p>Γιατί ο <em className="brand-dialogos">DialogosAI</em> αποτελεί το πιο εξελιγμένο σύστημα διαλόγου στην ελληνική αγορά.</p>
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

      {/* Communication Framework */}
      <section className="scp-dialogue" ref={audienceRef}>
        <div className="container">
          <motion.div
            className="scp-dialogue-header"
            initial={{ opacity: 0, y: 20 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Κάθε οργανισμός επικοινωνεί.<br />Ο <em className="brand-dialogos">DialogosAI</em> εξασφαλίζει ότι αυτή η επικοινωνία είναι αξιόπιστη.</h2>
            <p>Ένα κανάλι ασφαλούς, υπεύθυνου και καθοδηγητικού διαλόγου ανάμεσα στον οργανισμό σας και τους ανθρώπους που εξυπηρετεί. Σχεδιασμένο ακριβώς όπως εσείς το οραματίζεστε.</p>
          </motion.div>

          {/* Communication Flow */}
          <motion.div
            className="scp-comm-flow"
            initial={{ opacity: 0, y: 16 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="scp-comm-node">
              <span className="scp-comm-label">Ο Οργανισμός σας</span>
            </div>
            <div className="scp-comm-arrow">
              <span>→</span>
            </div>
            <div className="scp-comm-node scp-comm-node--center">
              <span className="scp-comm-label"><em className="brand-dialogos">DialogosAI</em></span>
            </div>
            <div className="scp-comm-arrow">
              <span>→</span>
            </div>
            <div className="scp-comm-node">
              <span className="scp-comm-label">Οι Άνθρωποί σας</span>
            </div>
          </motion.div>

          {/* Sector Items */}
          <div className="scp-dialogue-items">
            {dialogueSectors.map((item, i) => (
              <motion.div
                key={i}
                className="scp-dialogue-item"
                initial={{ opacity: 0, y: 20 }}
                animate={audienceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="scp-dialogue-num">{item.num}</span>
                <div className="scp-dialogue-body">
                  <div className="scp-dialogue-title-row">
                    <h3>{item.title}</h3>
                    <span className={`scp-dialogue-badge scp-dialogue-badge--${item.badge}`}>
                      {item.badgeLabel}
                    </span>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connecting Narrative */}
          <motion.div
            className="scp-dialogue-closing"
            initial={{ opacity: 0, y: 16 }}
            animate={audienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p>
              Αν ο <em className="brand-dialogos">DialogosAI</em> εξασφαλίζει αξιόπιστο διάλογο στους πιο ευαίσθητους τομείς, φανταστείτε τι μπορεί να κάνει για τον δικό σας οργανισμό. Σχεδιάστε τον διάλογο που θέλετε — ασφαλή, υπεύθυνο, καθοδηγητικό — ακριβώς όπως τον οραματίζεστε.
            </p>
            <Link to="/book-demo" className="scp-dialogue-cta-link">
              Σχεδιάστε τον δικό σας <em className="brand-dialogos">DialogosAI</em> →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Confident CTA */}
      <section className="scp-cta">
        <div className="container">
          <h2>Αποκτήστε τον κορυφαίο ψηφιακό πλοηγό στην Ελλάδα.</h2>
          <p>
            Μην συμβιβάζεστε με απλά chatbots που μπερδεύουν τους χρήστες. Κάντε τη διαφορά με τον <em className="brand-dialogos">DialogosAI</em> και κερδίστε την εμπιστοσύνη των χρηστών σας από την πρώτη μέρα.
          </p>
          <div className="scp-cta-actions">
            <Link to="/book-demo" className="btn btn-primary btn-large">Ξεκινήστε Σήμερα — Book Demo</Link>
            <a href="mailto:contact@simasiaai.gr" className="scp-email-link">contact@simasiaai.gr</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimasiaChatbotsPage;
