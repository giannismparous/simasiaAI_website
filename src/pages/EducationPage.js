import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './EducationPage.css';

const targetGroups = [
  {
    num: '01',
    title: 'Ιδιωτικά & Δημόσια Σχολεία',
    body: 'Εισαγωγή της Τεχνητής Νοημοσύνης στην τάξη με ασφάλεια, εκπαίδευση καθηγητών και διαδραστικά εργαστήρια για μαθητές.',
  },
  {
    num: '02',
    title: 'Φροντιστήρια & Κέντρα Μελέτης',
    body: 'Αναβάθμιση της εκπαιδευτικής διαδικασίας, αυτόματη δημιουργία θεμάτων και εξατομικευμένη υποστήριξη με AI.',
  },
  {
    num: '03',
    title: 'Εκπαιδευτικοί όλων των βαθμίδων',
    body: 'Σεμινάρια για τη σωστή χρήση των LLMs, τη δημιουργία έξυπνων πλάνων μαθήματος και τη μείωση του γραφειοκρατικού φόρτου.',
  },
];

const workshops = [
  {
    title: 'Εισαγωγικό Σεμινάριο (2 ώρες)',
    desc: 'Κατανόηση των βασικών αρχών της Τεχνητής Νοημοσύνης, των δυνατοτήτων και των περιορισμών της στην εκπαίδευση.',
    price: 'Τιμή Γνωριμίας',
  },
  {
    title: 'Hands-on Εργαστήριο (4 ώρες)',
    desc: 'Πρακτική εξάσκηση με εργαλεία AI για παραγωγή υλικού, διόρθωση γραπτών και εξατομικευμένη μάθηση.',
    price: 'Εξειδικευμένο',
  },
];

const EducationPage = () => {
  const heroRef = useRef(null);
  const groupsRef = useRef(null);
  const groupsInView = useInView(groupsRef, { once: true, margin: '100px' });
  const workshopsRef = useRef(null);
  const workshopsInView = useInView(workshopsRef, { once: true, margin: '100px' });

  return (
    <div className="edu-page">
      {/* Hero */}
      <section className="edu-hero" ref={heroRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="edu-eyebrow">Εκπαιδευτικές Παροχές</span>
            <h1>Τεχνητή Νοημοσύνη<br />για την Εκπαίδευση.</h1>
            <p className="edu-hero-sub">
              Σχεδιάζουμε σεμινάρια και εργαστήρια για σχολεία, φροντιστήρια και εκπαιδευτικούς.
              Ερχόμαστε στον χώρο σας ή συνδεόμαστε online για να φέρουμε το μέλλον της μάθησης στο σήμερα.
            </p>
            <div className="edu-hero-ctas">
              <Link to="/book-demo" className="btn btn-light">Κλείστε Ραντεβού</Link>
              <a href="#workshops" className="edu-ghost-link">
                Δείτε τα σεμινάρια <span>↓</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="edu-groups" ref={groupsRef}>
        <div className="container">
          <motion.div
            className="edu-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={groupsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Σε ποιους απευθυνόμαστε</h2>
            <p>Εξειδικευμένες λύσεις εκπαίδευσης για κάθε βαθμίδα και δομή.</p>
          </motion.div>

          <div className="edu-groups-list">
            {targetGroups.map((group, i) => (
              <motion.div
                key={i}
                className="edu-group-item"
                initial={{ opacity: 0, y: 20 }}
                animate={groupsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="edu-group-num">{group.num}</span>
                <div className="edu-group-body">
                  <h3>{group.title}</h3>
                  <p>{group.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops list */}
      <section className="edu-workshops-sec" id="workshops" ref={workshopsRef}>
        <div className="container">
          <motion.div
            className="edu-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={workshopsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Σεμινάρια & Εργαστήρια</h2>
            <p>Επιλέξτε το πρόγραμμα που ταιριάζει στις δικές σας ανάγκες.</p>
          </motion.div>

          <div className="edu-workshops-grid">
            {workshops.map((w, i) => (
              <motion.div
                key={i}
                className="edu-workshop-card"
                initial={{ opacity: 0, y: 24 }}
                animate={workshopsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <span className="edu-workshop-tag">{w.price}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <Link to="/book-demo" className="edu-workshop-cta">
                  Κράτηση Θέσης →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Empathy/Confidence Banner */}
      <section className="edu-banner">
        <div className="container">
          <h2>Η τεχνολογία στην υπηρεσία της γνώσης, όχι της αντικατάστασης.</h2>
          <p>
            Πιστεύουμε ότι η Τεχνητή Νοημοσύνη πρέπει να ενδυναμώνει τον δάσκαλο και τον καθηγητή,
            προσφέροντας περισσότερο χρόνο για την πραγματική, ανθρώπινη επαφή με τον μαθητή.
          </p>
          <Link to="/book-demo" className="btn btn-primary">Ξεκινήστε Σήμερα</Link>
        </div>
      </section>
    </div>
  );
};

export default EducationPage;
