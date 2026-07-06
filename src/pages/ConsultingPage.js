import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ConsultingPage.css';

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: '490€',
    tag: 'Τιμή γνωριμίας',
    duration: '2 ώρες',
    highlight: false,
    features: [
      '2ωρο σεμινάριο εισαγωγής στην ΤΝ',
      'Ανάλυση τρεχουσών εργαλείων ΤΝ',
      'Live demo εργαλείων',
      'Στον χώρο σας ή online',
      'Παρουσίαση PDF με συμπεράσματα',
    ],
    cta: 'Κλείστε Ραντεβού',
  },
  {
    id: 'business',
    name: 'Business',
    price: '990€',
    tag: 'Πιο δημοφιλές',
    duration: '4 ώρες',
    highlight: true,
    features: [
      'Όλα του Starter',
      'Ανάλυση workflows επιχείρησης',
      'Πρότυπα ενσωμάτωσης ΤΝ',
      'Custom AI roadmap για την εταιρεία σας',
      'Follow-up συνεδρία (60\')',
      'Πρόσβαση σε resources & templates',
    ],
    cta: 'Κλείστε Ραντεβού',
  },
  {
    id: 'team',
    name: 'Team',
    price: '1.790€',
    tag: 'Για ομάδες',
    duration: '6 ώρες',
    highlight: false,
    features: [
      'Όλα του Business',
      'Εκπαίδευση ομάδας (έως 15 άτομα)',
      'Hands-on workshops με εργαλεία',
      'Δύο follow-up συνεδρίες',
      'Priority email support (1 μήνας)',
    ],
    cta: 'Κλείστε Ραντεβού',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '2.990€',
    tag: 'Ολοκληρωμένο',
    duration: '3 μήνες',
    highlight: false,
    features: [
      'Όλα του Team',
      'Μηνιαία στρατηγική ΤΝ session',
      'Αξιολόγηση αποτελεσμάτων',
      'Custom AI policy & governance',
      'Dedicated consultant',
      'Unlimited email support',
    ],
    cta: 'Κλείστε Ραντεβού',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Κατόπιν συνεννόησης',
    tag: 'Για μεγάλους οργανισμούς',
    duration: 'Προσαρμοσμένο',
    highlight: false,
    features: [
      'Πλήρης AI transformation',
      'Εγκατάσταση SimasiaDialogue',
      'Εκπαίδευση όλου του προσωπικού',
      'Συνεχής στρατηγική υποστήριξη',
      'SLA & dedicated support team',
      'Αξιολόγηση EU AI Act compliance',
    ],
    cta: 'Επικοινωνήστε μαζί μας',
  },
];

const ConsultingPage = () => {
  const heroRef = useRef(null);
  const packagesRef = useRef(null);
  const packagesInView = useInView(packagesRef, { once: true, margin: '100px' });
  const howRef = useRef(null);
  const howInView = useInView(howRef, { once: true, margin: '100px' });
  const [activePackage, setActivePackage] = useState(null);

  return (
    <div className="consulting-page">
      {/* Hero */}
      <section className="consulting-hero" ref={heroRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="consulting-eyebrow">Συμβουλευτικές Παροχές</span>
            <h1>Η Τεχνητή Νοημοσύνη<br />στη δουλειά σας.</h1>
            <p className="consulting-hero-sub">
              Ερχόμαστε στον χώρο σας ή online. Δείχνουμε πώς η ΤΝ αλλάζει
              πραγματικά τον τρόπο που δουλεύετε — με απλά λόγια, χωρίς ορολογία,
              με πρακτικά αποτελέσματα.
            </p>
            <div className="consulting-hero-ctas">
              <Link to="/book-demo" className="btn btn-light">Κλείστε 2ωρό Σεμινάριο</Link>
              <a href="#packages" className="consulting-ghost-link">
                Δείτε τα πακέτα <span>↓</span>
              </a>
            </div>
          </motion.div>
        </div>
        {/* Background grid decoration */}
        <div className="consulting-hero-grid" aria-hidden="true" />
      </section>

      {/* Intro strip */}
      <div className="consulting-strip">
        <div className="container">
          <div className="consulting-strip-inner">
            <div className="consulting-strip-item">
              <span className="strip-icon">📍</span>
              <span>Στον χώρο σας</span>
            </div>
            <div className="consulting-strip-divider" />
            <div className="consulting-strip-item">
              <span className="strip-icon">💻</span>
              <span>Ή online — όπου σας βολεύει</span>
            </div>
            <div className="consulting-strip-divider" />
            <div className="consulting-strip-item">
              <span className="strip-icon">🎯</span>
              <span>Προσαρμοσμένο στη δική σας επιχείρηση</span>
            </div>
            <div className="consulting-strip-divider" />
            <div className="consulting-strip-item">
              <span className="strip-icon">✅</span>
              <span>EU AI Act συμβατό</span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="consulting-how" ref={howRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Πώς λειτουργεί</h2>
          </motion.div>
          <div className="consulting-steps">
            {[
              { num: '01', title: 'Κλείστε ραντεβού', body: 'Επιλέξτε ημερομηνία & μέθοδο (δια ζώσης ή online). Απαντάμε εντός 24 ωρών.' },
              { num: '02', title: 'Αναλύουμε την επιχείρησή σας', body: 'Πριν έρθουμε, μαθαίνουμε τη δουλειά σας για να προσαρμόσουμε ακριβώς τι θα δείξουμε.' },
              { num: '03', title: 'Το σεμινάριο / συμβουλευτική', body: 'Πρακτική, hands-on συνεδρία. Δείχνουμε εργαλεία, λύσεις, και φτιάχνουμε μαζί ένα roadmap.' },
              { num: '04', title: 'Παρακολούθηση & Υποστήριξη', body: 'Δεν σας αφήνουμε μόνους. Follow-up session και email support για οποιαδήποτε ερώτηση.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="consulting-step"
                initial={{ opacity: 0, y: 20 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="consulting-step-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="consulting-packages" id="packages" ref={packagesRef}>
        <div className="container">
          <motion.div
            className="consulting-packages-header"
            initial={{ opacity: 0, y: 20 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Πακέτα Συμβουλευτικής</h2>
            <p>Διαλέξτε αυτό που ταιριάζει στην επιχείρησή σας. Όλα περιλαμβάνουν προσωπική επαφή.</p>
          </motion.div>

          <div className="consulting-packages-grid">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                className={`pkg-card${pkg.highlight ? ' pkg-card--highlight' : ''}${activePackage === pkg.id ? ' pkg-card--active' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={packagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setActivePackage(pkg.id)}
                onHoverEnd={() => setActivePackage(null)}
              >
                {pkg.tag && (
                  <span className={`pkg-tag${pkg.highlight ? ' pkg-tag--orange' : ''}`}>
                    {pkg.tag}
                  </span>
                )}
                <div className="pkg-header">
                  <h3 className="pkg-name">{pkg.name}</h3>
                  <div className="pkg-price">{pkg.price}</div>
                  <div className="pkg-duration">{pkg.duration}</div>
                </div>
                <ul className="pkg-features">
                  {pkg.features.map((f, j) => (
                    <li key={j}>
                      <span className="pkg-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-demo"
                  className={`pkg-cta${pkg.highlight ? ' pkg-cta--primary' : ''}`}
                >
                  {pkg.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="consulting-final-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Δεν ξέρετε ποιο πακέτο;<br />Μιλήστε μας.</h2>
            <p>Στείλτε μας email και σε λιγότερο από 24 ώρες θα σας προτείνουμε την καλύτερη λύση για εσάς.</p>
            <div className="consulting-final-ctas">
              <a href="mailto:contact@simasiaai.gr" className="btn-consulting-dark">
                contact@simasiaai.gr
              </a>
              <Link to="/book-demo" className="btn-consulting-outline">
                Κλείστε Ραντεβού
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConsultingPage;
