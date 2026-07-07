import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import avatarFox from '../assets/avatar-fox.svg';
import avatarPanda from '../assets/avatar-panda.svg';
import avatarRabbit from '../assets/avatar-rabbit.svg';
import avatarOwl from '../assets/avatar-owl.svg';
import giannisReal from '../assets/giannis-real.png';
import dimitrisReal from '../assets/dimitris-real.png';
import anastasiaReal from '../assets/anastasia-real.png';
import stergiosReal from '../assets/stergios-real.png';

const AboutPage = () => {
  const heroRef = useRef(null);
  const s1Ref = useRef(null);
  const s2Ref = useRef(null);
  const teamRef = useRef(null);
  
  const s1InView = useInView(s1Ref, { once: true, margin: '100px' });
  const s2InView = useInView(s2Ref, { once: true, margin: '100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '100px' });

  const principles = [
    { num: '01', title: 'Ανθρωποκεντρικός', body: 'Ο σχεδιασμός μας ξεκινά και τελειώνει με την ανθρώπινη εμπειρία, όχι με την τεχνολογία.' },
    { num: '02', title: 'Υπεύθυνος', body: 'EU AI Act Compliance σε κάθε υλοποίηση. Ασφάλεια δεδομένων, διαφάνεια αποφάσεων και σεβασμός στον χρήστη.' },
    { num: '03', title: 'Πράσινος', body: 'Eco-Friendly Optimized RAG: ελαχιστοποιούμε το ενεργειακό αποτύπωμα χωρίς να θυσιάζουμε την επίδοση.' },
    { num: '04', title: 'Ελληνικός', body: 'Σχεδιασμένοι για την ελληνική γλώσσα, τις τοπικές διαλέκτους και τις ελληνικές ανάγκες.' },
  ];


  const team = [
    {
      name: 'Δημήτρης Παπαδάκης',
      role: 'Head of Sales, Co-Founder & Head of Operations',
      desc: 'Με εξειδικευμένες σπουδές στη γλωσσολογία και ερευνητικό έργο στην υπολογιστική γλωσσολογία. Διαθέτει εκτενή εργασιακή εμπειρία στην ανάλυση δεδομένων (Data Analysis), στον συντονισμό και τη διαχείριση σύνθετων έργων (Project Management), με ενεργή συμβολή στις ανθρωπιστικές επιστήμες, σε κέντρα λήψης αποφάσεων, εργαστήρια πληροφορικής και στη διδασκαλία.',
      avatar: dimitrisReal,
    },
    {
      name: 'Γιάννης',
      role: 'CTO & Co-Founder',
      desc: 'Υποψήφιος διδάκτωρ Πληροφορικής στο UCL στην California. Διαθέτει μακρά εργασιακή και ερευνητική εμπειρία στην ανάπτυξη enterprise εφαρμογών, στο software engineering και στην αρχιτεκτονική συστημάτων Τεχνητής Νοημοσύνης.',
      avatar: giannisReal,
      avatarClass: 'ap-avatar-giannis',
    },
    {
      name: 'Αναστασία',
      role: 'Chief Communications Officer (CCO) & Co-Founder',
      desc: 'Αναπληρώτρια Καθηγήτρια Νεοελληνικής Φιλολογίας και Πρόεδρος του τμήματος Φιλολογίας του Πανεπιστημίου Κρήτης. Υπεύθυνη για τις δημόσιες σχέσεις, την εταιρική εξωστρέφεια και τη στρατηγική συγγραφή κειμένων και θέσεων στον τύπο.',
      avatar: anastasiaReal,
    },
    {
      name: 'Έλενα',
      role: 'Marketing Strategist',
      desc: 'Πρώην Marketing Director στην EBAN (τον κορυφαίο ευρωπαϊκό φορέα σύνδεσης angel investors με startups). Διαθέτει βαθιά εμπειρία στο growth marketing, τη στρατηγική κοινωνικών δικτύων, το filmmaking και το premium copywriting.',
      avatar: avatarOwl,
    },
    {
      name: 'Στέφανος',
      role: 'Sales Manager',
      desc: 'Ιδιοκτήτης πρότυπου εκπαιδευτικού οργανισμού μέσης εκπαίδευσης και εξειδικευμένου κέντρου διδασκαλίας αγγλικής ορολογίας για στελέχη ασφαλιστικών εταιρειών. Διακρίνεται για τις άριστες επικοινωνιακές δεξιότητες και τη στρατηγική προσέγγιση B2B πωλήσεων.',
      avatar: avatarFox,
    },
    {
      name: 'Παντελής Νικολόπουλος',
      role: 'Content Creator & Storyteller',
      desc: 'Ένα πολυσχιδές 360° δημιουργικό ταλέντο, υπεύθυνος για την παραγωγή high-end οπτικοακουστικού περιεχομένου, το visual storytelling και την οργανική ανάπτυξη της ψηφιακής παρουσίας και των κοινωνικών δικτύων του brand.',
      avatar: avatarPanda,
    },
  ];

  const getInitials = (name) => {
    if (!name) return 'SI';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase();
  };

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

      {/* Executive Leadership (CEO focus) */}
      <section className="ap-ceo-section" ref={s2Ref}>
        <div className="container">
          <motion.div 
            className="ap-ceo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={s2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ap-ceo-layout">
              <div className="ap-ceo-copy">
                <span className="ap-ceo-badge">Executive Leadership</span>
                <blockquote className="ap-ceo-quote">
                  «Η τεχνητή νοημοσύνη αποκτά αξία όταν σχεδιάζεται με <span>μέτρο τον άνθρωπο</span> και λειτουργεί με διαφάνεια, ευθύνη και επιστημονική ακρίβεια.»
                </blockquote>
                <h2>Καθηγητής Στέργιος Χατζηκυριακίδης</h2>
                <h3 className="ap-ceo-title">Chief Executive Officer · Υπολογιστική Γλωσσολογία & Τεχνητή Νοημοσύνη</h3>
              </div>
              <div className="ap-ceo-portrait" aria-hidden="true">
                <img src={stergiosReal} alt="" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Co-Founders & Strategic Management Grid */}
      <section className="ap-team-section" ref={teamRef}>
        <div className="container">
          <motion.div 
            className="ap-team-header"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Συνιδρυτές & Στρατηγική Ομάδα</h2>
            <p>Η ομάδα πίσω από την ανάπτυξη, το όραμα και την υλοποίηση της SimasiaAI.</p>
          </motion.div>

          <div className="ap-team-grid ap-team-strip">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                className="ap-member-card"
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="ap-member-portrait" aria-hidden="true">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt=""
                      className={`${member.avatar.includes('avatar-') ? 'ap-avatar-illustration' : ''} ${member.avatarClass || ''}`.trim()}
                    />
                  ) : (
                    <span>{getInitials(member.name)}</span>
                  )}
                </div>
                <div className="ap-member-top">
                  <div className="ap-member-name-wrap">
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
      <section className="ap-mission">
        <div className="container">
          <motion.div className="ap-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
