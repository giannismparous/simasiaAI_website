import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ExplanationSection.css';

const ease = [0.25, 0.1, 0.25, 1];

const pillars = [
  {
    color: 'orange',
    num: '01',
    title: 'Ουσιαστικός Διάλογος',
    subtitle: 'Fluency & Context',
    text: 'Η AI σας δεν «πετάει» απλώς πληροφορίες. Κατανοεί το ύφος του οργανισμού, μιλάει με απόλυτη φυσικότητα τα ελληνικά (και τις διαλέκτους) και δομεί τη συζήτηση για να καθοδηγήσει τον χρήστη (Ψηφιακή Πλοήγηση).',
  },
  {
    color: 'blue',
    num: '02',
    title: 'Υπεύθυνος Διάλογος',
    subtitle: 'Ethics & Compliance',
    text: 'Ένας διάλογος στον οποίο μπορείς να βασιστείς. Νομική θωράκιση (EU AI Act), δικλείδες ασφαλείας για καταστάσεις κινδύνου, δραστική μείωση των παραισθήσεων (hallucinations) και καθολική προσβασιμότητα (ΑμεΑ).',
  },
  {
    color: 'green',
    num: '03',
    title: 'Πράσινος Διάλογος',
    subtitle: 'Eco-Friendly AI',
    text: 'Ηθική τεχνολογία σημαίνει και βιώσιμη τεχνολογία. Η αρχιτεκτονική της SimasiaAI (βελτιστοποίηση RAG) μειώνει το υπολογιστικό κόστος και το ενεργειακό αποτύπωμα.',
  },
];

const ExplanationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '100px' });

  return (
    <section className="explanation-section" id="explanation" ref={ref}>
      <div className="container">
        <motion.div
          className="explanation-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <h2>SimaHermes AI</h2>
          <p>
            Δεν σχεδιάζουμε απλές μηχανές απαντήσεων.
            Δημιουργούμε ψηφιακούς συνομιλητές και πλοηγούς που αναπτύσσουν
            έναν αυθεντικό, ασφαλή και προσαρμοσμένο διάλογο με τον χρήστη.
            Με σεβασμό στην ελληνική γλώσσα, την προσβασιμότητα για όλες και
            όλους και την απόλυτη νομική θωράκιση (EU AI Act).
          </p>
        </motion.div>

        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className={`pillar ${p.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease }}
            >
              <span className="pillar-number">{p.num} — {p.subtitle}</span>
              <h3>{p.title}</h3>
              <p className="pillar-concept">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplanationSection;
