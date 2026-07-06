import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutPage.css';

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

  const marqueeWords = ['Ανθρωποκεντρικός', '·', 'Υπεύθυνος', '·', 'Πράσινος', '·', 'Ελληνικός', '·'];

  const team = [
    {
      name: 'Δημήτρης Παπαδάκης',
      role: 'Head of Sales, Co-Founder & Head of Operations',
      desc: 'Με εξειδικευμένες σπουδές στη γλωσσολογία και ερευνητικό έργο στην υπολογιστική γλωσσολογία. Διαθέτει εκτενή εργασιακή εμπειρία στην ανάλυση δεδομένων (Data Analysis), στον συντονισμό και τη διαχείριση σύνθετων έργων (Project Management), με ενεργή συμβολή στις ανθρωπιστικές επιστήμες, σε κέντρα λήψης αποφάσεων, εργαστήρια πληροφορικής και στη διδασκαλία.',
    },
    {
      name: 'Γιάννης',
      role: 'CTO & Co-Founder',
      desc: 'Υποψήφιος διδάκτωρ Πληροφορικής στο UCL στην California. Διαθέτει μακρά εργασιακή και ερευνητική εμπειρία στην ανάπτυξη enterprise εφαρμογών, στο software engineering και στην αρχιτεκτονική συστημάτων Τεχνητής Νοημοσύνης.',
    },
    {
      name: 'Αναστασία',
      role: 'Chief Communications Officer (CCO) & Co-Founder',
      desc: 'Αναπληρώτρια Καθηγήτρια Νεοελληνικής Φιλολογίας και Πρόεδρος του τμήματος Φιλολογίας του Πανεπιστημίου Κρήτης. Υπεύθυνη για τις δημόσιες σχέσεις, την εταιρική εξωστρέφεια και τη στρατηγική συγγραφή κειμένων και θέσεων στον τύπο.',
    },
    {
      name: 'Έλενα',
      role: 'Marketing Strategist',
      desc: 'Πρώην Marketing Director στην EBAN (τον κορυφαίο ευρωπαϊκό φορέα σύνδεσης angel investors με startups). Διαθέτει βαθιά εμπειρία στο growth marketing, τη στρατηγική κοινωνικών δικτύων, το filmmaking και το premium copywriting.',
    },
    {
      name: 'Στέφανος',
      role: 'Sales Manager',
      desc: 'Ιδιοκτήτης πρότυπου εκπαιδευτικού οργανισμού μέσης εκπαίδευσης και εξειδικευμένου κέντρου διδασκαλίας αγγλικής ορολογίας για στελέχη ασφαλιστικών εταιρειών. Διακρίνεται για τις άριστες επικοινωνιακές δεξιότητες και τη στρατηγική προσέγγιση B2B πωλήσεων.',
    },
    {
      name: 'Παντελής Νικολόπουλος',
      role: 'Content Creator & Storyteller',
      desc: 'Ένα πολυσχιδές 360° δημιουργικό ταλέντο, υπεύθυνος για την παραγωγή high-end οπτικοακουστικού περιεχομένου, το visual storytelling και την οργανική ανάπτυξη της ψηφιακής παρουσίας και των κοινωνικών δικτύων του brand.',
    },
  ];

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

      {/* Executive Leadership (CEO focus) */}
      <section className="ap-ceo-section" ref={s2Ref}>
        <div className="container">
          <motion.div 
            className="ap-ceo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={s2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="ap-ceo-badge">Executive Leadership</span>
            <h2>Καθηγητής Στέργιος Χατζηκυριακίδης</h2>
            <h3 className="ap-ceo-title">Chief Executive Officer / Πρωτοπόρος Καθηγητής Υπολογιστικής Γλωσσολογίας, Μηχανικής Μάθησης και Τεχνητής Νοημοσύνης στο Πανεπιστήμιο Κρήτης</h3>
            <p className="ap-ceo-desc">
              Με σπουδαίο διεθνές ερευνητικό και διδακτικό έργο, ο καθηγητής Στέργιος Χατζηκυριακίδης 
              κατέχει καθοριστική συμβολή στην εξέλιξη των ανθρωπιστικών επιστημών και στην εκλαϊκευση 
              της Τεχνητής Νοημοσύνης στην Ελλάδα, θέτοντας τα θεμέλια για την ακαδημαϊκή εγκυρότητα της SimasiaAI.
            </p>
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

          <div className="ap-team-grid">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                className="ap-member-card"
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.desc}</p>
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
