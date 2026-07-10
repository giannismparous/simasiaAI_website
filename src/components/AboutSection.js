import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutSection.css';
import avatarFox from '../assets/avatar-fox.svg';
import avatarPanda from '../assets/avatar-panda.svg';
import avatarOwl from '../assets/avatar-owl.svg';
import giannisReal from '../assets/giannis-real.png';
import dimitrisReal from '../assets/dimitris-real.png';
import anastasiaReal from '../assets/anastasia-real.png';
import stergiosReal from '../assets/stergios-real.png';

const principles = [
  { num: '01', title: 'Ανθρωποκεντρικότητα', body: 'Ο σχεδιασμός μας ξεκινά και τελειώνει με την ανθρώπινη εμπειρία, όχι με την τεχνολογία.' },
  { num: '02', title: 'Υπευθυνότητα και Κανονιστική Συμμόρφωση', body: 'EU AI Act Compliance σε κάθε υλοποίηση. Ασφάλεια δεδομένων, διαφάνεια αποφάσεων και σεβασμός στον χρήστη.' },
  { num: '03', title: 'Οικολογική Καινοτομία', body: 'Eco-Friendly Optimized RAG: ελαχιστοποιούμε το ενεργειακό αποτύπωμα χωρίς να θυσιάζουμε την επίδοση.' },
  { num: '04', title: 'Με Επίκεντρο την Ελλάδα:', body: 'Σχεδιάζουμε για την ελληνική γλώσσα, τις τοπικές διαλέκτους και τις ανάγκες της ελληνικής κοινωνίας.' },
];

const team = [
  {
    name: 'Δημήτρης Παπαδάκης',
    role: 'Head of Sales, Co-Founder & Head of Operations',
    avatar: dimitrisReal,
  },
  {
    name: 'Γιάννης',
    role: 'CTO & Co-Founder',
    avatar: giannisReal,
    avatarClass: 'as-avatar-giannis',
  },
  {
    name: 'Αναστασία',
    role: 'Chief Communications Officer (CCO) & Co-Founder',
    avatar: anastasiaReal,
  },
  {
    name: 'Έλενα',
    role: 'Marketing Strategist',
    avatar: avatarOwl,
  },
  {
    name: 'Στέφανος',
    role: 'Sales Manager',
    avatar: avatarFox,
  },
  {
    name: 'Παντελής Νικολόπουλος',
    role: 'Content Creator & Storyteller',
    avatar: avatarPanda,
  },
];

const AboutSection = () => {
  const ceoRef = useRef(null);
  const teamRef = useRef(null);
  const principlesRef = useRef(null);

  const ceoInView = useInView(ceoRef, { once: true, margin: '100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '100px' });
  const principlesInView = useInView(principlesRef, { once: true, margin: '100px' });

  return (
    <div id="about" className="about-section-wrap">
      {/* Section Title */}
      <div className="as-section-title">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ποιοι Είμαστε</h2>
            <p>Η ομάδα, οι αρχές και η αποστολή πίσω από την SimasiaAI.</p>
          </motion.div>
        </div>
      </div>

      {/* Executive Leadership (CEO focus) */}
      <section className="as-ceo-section" ref={ceoRef}>
        <div className="container">
          <motion.div
            className="as-ceo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={ceoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="as-ceo-layout">
              <div className="as-ceo-copy">
                <span className="as-ceo-badge">Executive Leadership</span>
                <blockquote className="as-ceo-quote">
                  «Η τεχνητή νοημοσύνη αποκτά αξία όταν σχεδιάζεται με <span>μέτρο τον άνθρωπο</span> και λειτουργεί με διαφάνεια, ευθύνη και επιστημονική ακρίβεια.»
                </blockquote>
                <h2>Καθηγητής Στέργιος Χατζηκυριακίδης</h2>
                <h3 className="as-ceo-title">Chief Executive Officer · Υπολογιστική Γλωσσολογία & Τεχνητή Νοημοσύνη</h3>
              </div>
              <div className="as-ceo-portrait" aria-hidden="true">
                <img src={stergiosReal} alt="" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Co-Founders & Strategic Management Grid */}
      <section className="as-team-section" ref={teamRef}>
        <div className="container">
          <motion.div
            className="as-team-header"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Συνιδρυτές & Στρατηγική Ομάδα</h2>
            <p>Η ομάδα πίσω από την ανάπτυξη, το όραμα και την υλοποίηση της SimasiaAI.</p>
          </motion.div>

          <div className="as-team-grid as-team-strip">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="as-member-card"
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="as-member-portrait" aria-hidden="true">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt=""
                      className={`${member.avatar.includes && member.avatar.includes('avatar-') ? 'as-avatar-illustration' : ''} ${member.avatarClass || ''}`.trim()}
                    />
                  ) : (
                    <span>{member.name.split(' ').map(p => p[0]).join('').toUpperCase()}</span>
                  )}
                </div>
                <div className="as-member-top">
                  <div className="as-member-name-wrap">
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="as-principles" ref={principlesRef}>
        <div className="container">
          <motion.div
            className="as-principles-header"
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Αρχές</h2>
            <p>Τέσσερις αρχές που καθορίζουν κάθε απόφαση που παίρνουμε.</p>
          </motion.div>
          <div className="as-principles-list">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                className="as-principle-item"
                initial={{ opacity: 0, y: 20 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <span className="as-principle-num">{p.num}</span>
                <div className="as-principle-body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="as-mission">
        <div className="container">
          <motion.div
            className="as-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Η Αποστολή μας</h2>
            <p className="as-mission-text">
              Δεν σχεδιάζουμε μία απλή μηχανή απαντήσεων.{' '}
              Δημιουργήσαμε τον ανθρωποκεντρικό πλοηγό <em className="brand-dialogos">DialogosAI</em> που αναπτύσσει έναν αυθεντικό, ασφαλή και προσαρμοσμένο διάλογο με τους χρήστες, με σεβασμό στην ελληνική γλώσσα, την προσβασιμότητα για όλες και όλους, αναλαμβάνοντας την ευθύνη της χρήσης της τεχνολογίας που συνδράμει σε πραγματικές ανάγκες.
            </p>
            <Link to="/book-demo" className="btn btn-primary">Κλείστε Demo</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
