import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PyxidaAudienceSplit.css';

const ease = [0.16, 1, 0.3, 1];

const clinicBullets = [
  { icon: '⏱', text: 'Προστασία του ιατρικού χρόνου — εξετάστε απερίσπαστοι, χωρίς τον θόρυβο του τηλεφώνου.' },
  { icon: '📅', text: 'Μηδέν χαμένα περιστατικά — ο ασθενής κλείνει ραντεβού 24/7, ακόμα και το βράδυ.' },
  { icon: '📣', text: 'Πλήρης αξιοποίηση της διαφήμισης — κάθε κλικ μετατρέπεται σε καταχωρημένο ραντεβού.' },
  { icon: '✦', text: 'Αναβάθμιση κύρους — επαγγελματική εξυπηρέτηση από το πρώτο δευτερόλεπτο.' },
];

const ngoBullets = [
  { icon: '🤝', text: 'Συνεχής καθοδήγηση ωφελουμένων — έγκυρη πληροφόρηση για δικαιώματα οποιαδήποτε στιγμή.' },
  { icon: '💼', text: 'Αποσυμφόρηση στελεχών & εθελοντών — απαλλαγή από μηχανικά τηλεφωνήματα ρουτίνας.' },
  { icon: '📋', text: 'Οργανωμένη καταγραφή αιτημάτων — συστηματική συλλογή αναγκών με ασφάλεια και διαφάνεια.' },
  { icon: '❤', text: 'Μεγιστοποίηση κοινωνικού αντικτύπου — κανένας ευάλωτος άνθρωπος χωρίς σημείο αναφοράς.' },
];

const cardVariants = {
  rest: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease, delay: 0.1 + i * 0.14 },
  }),
};

const bulletVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.38, ease, delay: i * 0.07 },
  }),
};

const Card = ({ index, tag, tagClass, headline, sub, bullets, cta, ctaTo, hovered, onHover, onLeave }) => (
  <motion.article
    className={`pas-card${hovered ? ' pas-card--active' : ''}`}
    custom={index}
    initial="rest"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={cardVariants}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onFocus={onHover}
    onBlur={onLeave}
  >
    <div className={`pas-card-tag ${tagClass}`}>{tag}</div>
    <h3 className="pas-card-headline">{headline}</h3>
    <p className="pas-card-sub">{sub}</p>
    <ul className="pas-card-bullets">
      {bullets.map((b, i) => (
        <motion.li key={i} className="pas-bullet" custom={i}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} variants={bulletVariants}>
          <span className="pas-bullet-icon" aria-hidden="true">{b.icon}</span>
          <span className="pas-bullet-text">{b.text}</span>
        </motion.li>
      ))}
    </ul>
    <Link to={ctaTo} className="pas-card-cta">
      {cta}
      <span className="pas-cta-arrow" aria-hidden="true">→</span>
    </Link>
  </motion.article>
);

const PyxidaAudienceSplit = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="pas-section">
      <div className="container">
        <motion.div className="pas-eyebrow-wrap"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.55, ease }}>
          <span className="pas-eyebrow">Η Pyxida μιλά απευθείας σε εσάς</span>
          <p className="pas-lead">Δύο αγορές. Μία λύση. Επιλέξτε τον χώρο σας.</p>
        </motion.div>
        <motion.div className="pas-divider"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.8, ease, delay: 0.2 }} />
        <div className="pas-grid">
          <Card index={0} tag="Εκδοχή Α" tagClass="pas-tag--clinic"
            headline="Ιατρεία, Κλινικές & Διαγνωστικά Κέντρα"
            sub="Η Pyxida στην κλινική σας πράξη:"
            bullets={clinicBullets} cta="Δείτε ένα Demo για Ιατρεία (15′)" ctaTo="/demo"
            hovered={hovered === 'clinic'} onHover={() => setHovered('clinic')} onLeave={() => setHovered(null)} />
          <div className="pas-sep" aria-hidden="true">
            <div className="pas-sep-line" />
            <span className="pas-sep-label">ή</span>
            <div className="pas-sep-line" />
          </div>
          <Card index={1} tag="Εκδοχή Β" tagClass="pas-tag--ngo"
            headline="ΜΚΟ & Οργανισμοί Υποστήριξης Ασθενών"
            sub="Η Pyxida στην υπηρεσία της κοινότητάς σας:"
            bullets={ngoBullets} cta="Δείτε πώς εφαρμόζεται σε Οργανισμούς" ctaTo="/demo"
            hovered={hovered === 'ngo'} onHover={() => setHovered('ngo')} onLeave={() => setHovered(null)} />
        </div>
      </div>
    </section>
  );
};

export default PyxidaAudienceSplit;
