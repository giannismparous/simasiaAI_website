import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './MyrtoSection.css';

const ease = [0.16, 1, 0.3, 1];

const principles = [
  {
    icon: '✅',
    title: 'Αν έχει έγκυρη πληροφορία',
    text: 'την εξηγεί απλά, δομημένα, με πηγές.',
  },
  {
    icon: '🤐',
    title: 'Αν δεν έχει αρκετή πληροφορία',
    text: 'δεν προσποιείται ότι ξέρει. Δεν παράγει hallucinations.',
  },
  {
    icon: '🚨',
    title: 'Αν εντοπίσει κάτι σοβαρό',
    text: 'παραπέμπει άμεσα σε άνθρωπο και ειδοποιεί την κοινωνική υπηρεσία.',
  },
  {
    icon: '❓',
    title: 'Αν η ερώτηση είναι ασαφής',
    text: 'ζητά διευκρίνιση, αποφεύγοντας αυθαίρετες υποθέσεις.',
  },
];

const stats = [
  { name: 'Έγγραφα στη βάση γνώσης', val: '1.766', sublabel: 'verified documents' },
  { name: 'Χρόνος απόκρισης', val: '< 6s', sublabel: 'average response time' },
  { name: 'Αποτυχία παρεμβολής', val: '0', sublabel: 'zero hallucination incidents' },
  { name: 'Ερωτήσεις αξιολόγησης', val: '75%', sublabel: 'accuracy on eval set' },
];

const MyrtoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '200px' });

  return (
    <section className="myrto-section" ref={ref}>
      <div className="container">
        <div className="myrto-inner">

          {/* Left */}
          <motion.div
            className="myrto-left"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="section-overline">Μέρος Γ — Μυρτώ AI Πλοηγός</span>
            <h2 className="forbes-section-title">Ποια είναι η Μυρτώ;</h2>
            <p className="myrto-lead">
              Ψηφιακός πλοηγός που συγκεντρώνει πληροφορίες σήμερα διάσπαρτες: ΚΕΠΑ, παροχές,
              μετακινήσεις, εξετάσεις, δικαιώματα, οδηγούς και διαδικασίες. Το σημαντικό δεν
              είναι μόνο ότι απαντάει — είναι <strong>πώς</strong> απαντάει:
            </p>

            <div className="myrto-principles">
              {principles.map((p, i) => (
                <motion.div
                  key={i}
                  className="myrto-principle"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}
                >
                  <div className="principle-icon">{p.icon}</div>
                  <div className="principle-content">
                    <strong>{p.title}</strong>
                    <span>{p.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="myrto-quote"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.6, ease }}
            >
              <p>
                Η Μυρτώ παίρνει τον τρόπο εργασίας του ΚΑΠΑ3 και τον κάνει διαθέσιμο
                σε πολύ μεγαλύτερη κλίμακα.
              </p>
              <cite>Τεχνητή Νοημοσύνη από τον άνθρωπο για τον συνάνθρωπο.</cite>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="myrto-right"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            {/* Stats table */}
            <div className="myrto-stat-stack">
              {stats.map((s, i) => (
                <div key={i} className="myrto-stat-row">
                  <div>
                    <span className="stat-name">{s.name}</span>
                    <span className="stat-sublabel">{s.sublabel}</span>
                  </div>
                  <span className="stat-val">{s.val}</span>
                </div>
              ))}
            </div>

            {/* KAPA3 callout */}
            <div className="kapa3-callout">
              <h4>Σε λειτουργία: ΚΑΠΑ3 × SimasiaAI</h4>
              <p>
                Η Μυρτώ είναι ήδη σε παραγωγική χρήση στο Κέντρο Καθοδήγησης Καρκινοπαθών
                ΚΑΠΑ3. Επικοινωνία:{' '}
                <a href="tel:2105221424">210 52 21 424</a> ·{' '}
                <a href="https://kapa3.gr" target="_blank" rel="noopener noreferrer">kapa3.gr</a>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MyrtoSection;
