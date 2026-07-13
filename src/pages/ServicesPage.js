import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveConstellation from '../components/InteractiveConstellation';
import './ServicesPage.css';

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
      'Εγκατάσταση <em class="brand-dialogos">DialogosAI</em>',
      'Εκπαίδευση όλου του προσωπικού',
      'Συνεχής στρατηγική υποστήριξη',
      'SLA & dedicated support team',
      'Αξιολόγηση EU AI Act compliance',
    ],
    cta: 'Επικοινωνήστε μαζί μας',
  },
];

const consultingSteps = [
  { num: '01', title: 'Κλείστε ραντεβού', body: 'Επιλέξτε ημερομηνία & μέθοδο (δια ζώσης ή online). Απαντάμε εντός 24 ωρών.' },
  { num: '02', title: 'Αναλύουμε την επιχείρησή σας', body: 'Πριν έρθουμε, μαθαίνουμε τη δουλειά σας για να προσαρμόσουμε ακριβώς τι θα δείξουμε.' },
  { num: '03', title: 'Το σεμινάριο / συμβουλευτική', body: 'Πρακτική, hands-on συνεδρία. Δείχνουμε εργαλεία, λύσεις, και φτιάχνουμε μαζί ένα roadmap.' },
  { num: '04', title: 'Παρακολούθηση & Υποστήριξη', body: 'Δεν σας αφήνουμε μόνους. Follow-up session και email support για οποιαδήποτε ερώτηση.' },
];

const eduTargetGroups = [
  { num: '01', title: 'Ιδιωτικά & Δημόσια Σχολεία', body: 'Εισαγωγή της Τεχνητής Νοημοσύνης στην τάξη με ασφάλεια, εκπαίδευση καθηγητών και διαδραστικά εργαστήρια για μαθητές.' },
  { num: '02', title: 'Φροντιστήρια & Κέντρα Μελέτης', body: 'Αναβάθμιση της εκπαιδευτικής διαδικασίας, αυτόματη δημιουργία θεμάτων και εξατομικευμένη υποστήριξη με AI.' },
  { num: '03', title: 'Ιδιωτικά Πανεπιστήμια & ΙΕΚ', body: 'Σχεδιασμός εξειδικευμένων εκπαιδευτικών προγραμμάτων AI, ενσωμάτωση σε υπάρχοντα curricula και εργαστηριακές ασκήσεις.' },
  { num: '04', title: 'Εκπαιδευτικοί όλων των βαθμίδων', body: 'Σεμινάρια για τη σωστή χρήση των LLMs, τη δημιουργία έξυπνων πλάνων μαθήματος και τη μείωση του γραφειοκρατικού φόρτου.' },
];

const workshops = [
  {
    title: 'Εισαγωγικό Σεμινάριο (2 ώρες)',
    desc: 'Κατανόηση των βασικών αρχών της Τεχνητής Νοημοσύνης, των δυνατοτήτων και των περιορισμών της στην εκπαίδευση.',
  },
  {
    title: 'Hands-on Εργαστήριο (4 ώρες)',
    desc: 'Πρακτική εξάσκηση με εργαλεία AI για παραγωγή υλικού, διόρθωση γραπτών και εξατομικευμένη μάθηση.',
  },
];

const ease = [0.16, 1, 0.3, 1];

const ServicesPage = () => {
  const heroRef = useRef(null);
  const offersRef = useRef(null);
  const howRef = useRef(null);
  const packagesRef = useRef(null);
  const eduGroupsRef = useRef(null);
  const eduWorkshopsRef = useRef(null);

  const offersInView = useInView(offersRef, { once: true, margin: '100px' });
  const howInView = useInView(howRef, { once: true, margin: '100px' });
  const packagesInView = useInView(packagesRef, { once: true, margin: '100px' });
  const eduGroupsInView = useInView(eduGroupsRef, { once: true, margin: '100px' });
  const eduWorkshopsInView = useInView(eduWorkshopsRef, { once: true, margin: '100px' });

  const [activePackage, setActivePackage] = useState(null);

  return (
    <div className="svc-page">
      {/* Hero */}
      <section className="svc-hero" ref={heroRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="svc-eyebrow">SimasiaAI</span>
            <h1>Φέρνουμε την Τεχνητή Νοημοσύνη<br />στην πράξη.</h1>
            <p className="svc-hero-sub">
              Δύο εξειδικευμένες υπηρεσίες. Μία αποστολή: να σας βοηθήσουμε να αξιοποιήσετε πραγματικά την AI.
            </p>
            <div className="svc-hero-ctas">
              <Link to="/book-demo" className="btn btn-light">Κλείστε Ραντεβού</Link>
              <a href="#offers" className="svc-ghost-link">
                Δείτε τις υπηρεσίες <span>↓</span>
              </a>
            </div>
          </motion.div>
        </div>
        <InteractiveConstellation pattern="briefcase" />
      </section>

      {/* Two Offers Introduction */}
      <section className="svc-offers" id="offers" ref={offersRef}>
        <div className="container">
          <div className="svc-offers-grid">
            <motion.a
              href="#consulting"
              className="svc-offer-card"
              initial={{ opacity: 0, y: 24 }}
              animate={offersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              whileHover={{ y: -4 }}
            >
              <span className="svc-offer-num">01</span>
              <h3>Για Επιχειρήσεις & Οργανισμούς</h3>
              <h4>AI Συμβουλευτική</h4>
              <p>Σας δείχνουμε πώς η Τεχνητή Νοημοσύνη μπορεί να ενσωματωθεί στις καθημερινές λειτουργίες του οργανισμού σας.</p>
              <span className="svc-offer-link">Μάθετε περισσότερα ↓</span>
            </motion.a>

            <motion.a
              href="#education"
              className="svc-offer-card"
              initial={{ opacity: 0, y: 24 }}
              animate={offersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              whileHover={{ y: -4 }}
            >
              <span className="svc-offer-num">02</span>
              <h3>Για Εκπαίδευση</h3>
              <h4>AI Εκπαίδευση</h4>
              <p>Οργανώνουμε εκπαιδευτικά σεμινάρια, ομιλίες και εργαστήρια για σχολεία, ΙΕΚ και πανεπιστήμια.</p>
              <span className="svc-offer-link">Μάθετε περισσότερα ↓</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===== SECTION A: AI CONSULTING ===== */}
      <section className="svc-consulting" id="consulting">
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>AI Συμβουλευτική</h2>
            <p>Σας δείχνουμε πώς η Τεχνητή Νοημοσύνη αλλάζει τον τρόπο που δουλεύετε — με απλά λόγια, χωρίς ορολογία, με πρακτικά αποτελέσματα.</p>
          </motion.div>

          {/* How it works */}
          <div className="svc-how" ref={howRef}>
            <motion.h3
              className="svc-how-title"
              initial={{ opacity: 0, y: 20 }}
              animate={howInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Πώς λειτουργεί
            </motion.h3>
            <div className="svc-steps">
              {consultingSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="svc-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={howInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="svc-step-num">{step.num}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="svc-packages" id="packages" ref={packagesRef}>
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Πακέτα Συμβουλευτικής</h2>
            <p>Διαλέξτε αυτό που ταιριάζει στην επιχείρησή σας. Όλα περιλαμβάνουν προσωπική επαφή.</p>
          </motion.div>

          <div className="svc-packages-grid">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                className={`svc-pkg-card${pkg.highlight ? ' svc-pkg-card--highlight' : ''}${activePackage === pkg.id ? ' svc-pkg-card--active' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={packagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease }}
                onHoverStart={() => setActivePackage(pkg.id)}
                onHoverEnd={() => setActivePackage(null)}
              >
                {pkg.tag && (
                  <span className={`svc-pkg-tag${pkg.highlight ? ' svc-pkg-tag--orange' : ''}`}>
                    {pkg.tag}
                  </span>
                )}
                <div className="svc-pkg-header">
                  <h3 className="svc-pkg-name">{pkg.name}</h3>
                  <div className="svc-pkg-price">{pkg.price}</div>
                  <div className="svc-pkg-duration">{pkg.duration}</div>
                </div>
                <ul className="svc-pkg-features">
                  {pkg.features.map((f, j) => (
                    <li key={j}>
                      <span className="svc-pkg-check">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-demo"
                  className={`svc-pkg-cta${pkg.highlight ? ' svc-pkg-cta--primary' : ''}`}
                >
                  {pkg.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION B: AI EDUCATION ===== */}
      <section className="svc-education" id="education">
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>AI Εκπαίδευση</h2>
            <p>Σεμινάρια, ομιλίες και εργαστήρια για την Τεχνητή Νοημοσύνη στον χώρο της εκπαίδευσης.</p>
          </motion.div>

          {/* Target Groups */}
          <div ref={eduGroupsRef}>
            <motion.h3
              className="svc-how-title"
              initial={{ opacity: 0, y: 20 }}
              animate={eduGroupsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Σε ποιους απευθυνόμαστε
            </motion.h3>
            <div className="svc-steps">
              {eduTargetGroups.map((group, i) => (
                <motion.div
                  key={i}
                  className="svc-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={eduGroupsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="svc-step-num">{group.num}</span>
                  <div>
                    <h4>{group.title}</h4>
                    <p>{group.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="svc-workshops" ref={eduWorkshopsRef}>
        <div className="container">
          <motion.div
            className="svc-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={eduWorkshopsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Σεμινάρια & Εργαστήρια</h2>
            <p>Επιλέξτε το πρόγραμμα που ταιριάζει στις δικές σας ανάγκες.</p>
          </motion.div>

          <div className="svc-workshops-grid">
            {workshops.map((w, i) => (
              <motion.div
                key={i}
                className="svc-workshop-card"
                initial={{ opacity: 0, y: 24 }}
                animate={eduWorkshopsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                whileHover={{ y: -4 }}
              >
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <Link to="/book-demo" className="svc-workshop-cta">
                  Κράτηση Θέσης →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Empathy Banner */}
      <section className="svc-empathy-banner">
        <InteractiveConstellation pattern="minimal" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Η τεχνολογία στην υπηρεσία της γνώσης, όχι της αντικατάστασης.</h2>
            <p>
              Πιστεύουμε ότι η Τεχνητή Νοημοσύνη πρέπει να ενδυναμώνει τον δάσκαλο και τον καθηγητή,
              προσφέροντας περισσότερο χρόνο για την πραγματική, ανθρώπινη επαφή με τον μαθητή.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="svc-final-cta">
        <InteractiveConstellation pattern="minimal" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ας ξεκινήσουμε μαζί.</h2>
            <p>Στείλτε μας email ή κλείστε ραντεβού και σε λιγότερο από 24 ώρες θα σας προτείνουμε την καλύτερη λύση.</p>
            <div className="svc-final-ctas">
              <a href="mailto:contact@simasiaai.gr" className="svc-btn-dark">
                contact@simasiaai.gr
              </a>
              <Link to="/book-demo" className="svc-btn-outline">
                Κλείστε Ραντεβού
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
