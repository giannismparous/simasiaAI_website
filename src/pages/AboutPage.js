import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const heroRef = useRef(null);
  const s1Ref = useRef(null);
  const s2Ref = useRef(null);
  const s1InView = useInView(s1Ref, { once: true, margin: '100px' });
  const s2InView = useInView(s2Ref, { once: true, margin: '100px' });

  const principles = [
    { num: '01', title: 'Ανθρωποκεντρικός', body: 'Ο σχεδιασμός μας ξεκινά και τελειώνει με την ανθρώπινη εμπειρία, όχι με την τεχνολογία.' },
    { num: '02', title: 'Υπεύθυνος', body: 'EU AI Act Compliance σε κάθε υλοποίηση. Ασφάλεια δεδομένων, διαφάνεια αποφάσεων και σεβασμός στον χρήστη.' },
    { num: '03', title: 'Πράσινος', body: 'Eco-Friendly Optimized RAG: ελαχιστοποιούμε το ενεργειακό αποτύπωμα χωρίς να θυσιάζουμε την επίδοση.' },
    { num: '04', title: 'Ελληνικός', body: 'Σχεδιασμένοι για την ελληνική γλώσσα, τις τοπικές διαλέκτους και τις ελληνικές ανάγκες.' },
  ];

  const marqueeWords = ['Ανθρωποκεντρικός', '·', 'Υπεύθυνος', '·', 'Πράσινος', '·', 'Ελληνικός', '·'];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="ap-hero" ref={heroRef}>
        <div className="container">
          <motion.div className="ap-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="ap-eyebrow">SimasiaAI</span>
            <h1>Μέτρο μας;<br />Ο άνθρωπος.</h1>
            <p className="ap-hero-sub">Σχεδιάζουμε τεχνητή νοημοσύνη με επίκεντρο τον άνθρωπο και βασισμένη στην ελληνική γλώσσα, την προσβασιμότητα και τη βιώσιμη τεχνολογία.</p>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="ap-marquee-wrap">
        <div className="ap-marquee-inner">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="ap-marquee-word">{w}</span>
          ))}
        </div>
      </div>

      {/* Principles */}
      <section className="ap-principles" ref={s1Ref}>
        <div className="container">
          <motion.div className="ap-principles-header"
            initial={{ opacity: 0, y: 20 }}
            animate={s1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Αρχές</h2>
            <p>Τέσσερις αρχές που καθορίζουν κάθε απόφαση που παίρνουμε.</p>
          </motion.div>
          <div className="ap-principles-list">
            {principles.map((p, i) => (
              <motion.div key={i} className="ap-principle-item"
                initial={{ opacity: 0, y: 20 }}
                animate={s1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <span className="ap-principle-num">{p.num}</span>
                <div className="ap-principle-body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="ap-mission" ref={s2Ref}>
        <div className="container">
          <motion.div className="ap-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={s2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Η Αποστολή μας</h2>
            <p className="ap-mission-text">Δεν σχεδιάζουμε απλές μηχανές απαντήσεων. Δημιουργούμε ψηφιακούς συνομιλητές και πλοηγούς που αναπτύσσουν έναν αυθεντικό, ασφαλή και προσαρμοσμένο διάλογο με τον χρήστη, με σεβασμό στην ελληνική γλώσσα, την προσβασιμότητα για όλες και όλους και την ευθύνη χρήση της τεχνολογίας.</p>
            <Link to="/book-demo" className="btn btn-primary">Κλείστε Demo</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
