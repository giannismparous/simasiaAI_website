import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ArchitectureSection.css';

const ease = [0.16, 1, 0.3, 1];

const tiers = [
  {
    color: 'terracotta',
    icon: '📱',
    level: '1.',
    title: 'Ψηφιακός Πλοηγός «Μυρτώ»',
    desc: (
      <>
        Κατευθύνει με υπευθυνότητα και πλήρη προσβασιμότητα τη χρήστρια και τον χρήστη,
        έχοντας συγκεντρώσει πληροφορίες που σήμερα είναι διάσπαρτες:{' '}
        <strong>ΚΕΠΑ, παροχές, μετακινήσεις, εξετάσεις, δικαιώματα, οδηγούς και διαδικασίες</strong>.
      </>
    ),
    target: 'Target: Ογκολογικός Ασθενής',
  },
  {
    color: 'kapa',
    icon: '⚡',
    level: '2.',
    title: 'AI Triage System',
    desc: (
      <>
        Αυτόματη κατηγοριοποίηση και αξιολόγηση περιστατικών. Μειώνει δραστικά τον φόρτο
        εργασίας και{' '}
        <strong>ενημερώνει άμεσα την Κοινωνική Υπηρεσία του ΚΑΠΑ3</strong> για περιπτώσεις
        που χρήζουν επείγουσας ανθρώπινης παρέμβασης.
      </>
    ),
    target: 'Target: Ομάδα ΚΑΠΑ3',
  },
  {
    color: 'sage',
    icon: '📊',
    level: '3.',
    title: 'Dashboard & Reporting',
    desc: (
      <>
        Εσωτερικός πίνακας στατιστικών δεδομένων των συνομιλιών. Συγκεντρώνει δεδομένα ανά{' '}
        <strong>θεματική, κατηγορία και ανάλυση συναισθήματος</strong>, προσφέροντας στη
        διοίκηση πλήρη εικόνα των αναγκών των ωφελουμένων.
      </>
    ),
    target: 'Target: Ομάδα Διοίκησης',
  },
];

const ArchitectureSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '200px' });

  return (
    <section className="architecture-section" id="architecture" ref={ref}>
      <div className="container">
        <motion.div
          className="architecture-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-overline">Μέρος Γ — Μυρτώ AI Πλοηγός</span>
          <h2 className="forbes-section-title">
            Ολιστική Προσέγγιση Υποστήριξης σε 3 Επίπεδα
          </h2>
          <p className="architecture-lead">
            Συναναπτύσσουμε μια πολύπλευρη τεχνολογική σύμπραξη που ενισχύει την εξατομικευμένη,
            συνεχή υποστήριξη στα άτομα με βίωμα καρκίνου, προσφέροντας τρία συμπληρωματικά
            επίπεδα αξίας.
          </p>
        </motion.div>

        <div className="architecture-grid">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`arch-card color-${tier.color}`}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.15, ease }}
            >
              <div className="arch-icon">{tier.icon}</div>
              <h3>{tier.level} {tier.title}</h3>
              <p>{tier.desc}</p>
              <span className="arch-target">{tier.target}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
