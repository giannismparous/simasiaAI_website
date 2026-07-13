import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveConstellation from '../components/InteractiveConstellation';
import './TeamPage.css';
import stergiosReal from '../assets/stergios-real.png';
import dimitrisReal from '../assets/dimitris-real.png';
import giannisReal from '../assets/giannis-real.png';
import anastasiaReal from '../assets/anastasia-real.png';
import pantelisImg from '../assets/pantelis.png';

const ceo = {
  name: 'Καθηγητής Στέργιος Χατζηκυριακίδης',
  role: 'Co-founder & CEO',
  avatar: stergiosReal,
  bio: 'Ο Καθηγητής Υπολογιστικής Γλωσσολογίας Στέργιος Χατζηκυριακίδης φέρνει στη SimasiaAI μια διεθνή ακαδημαϊκή και επιχειρηματική εμπειρία δύο δεκαετιών. Με θητεία σε ορισμένα από τα πιο αναγνωρισμένα ιδρύματα της Ευρώπης (University of London, CNRS, Πανεπιστήμιο Γκέτεμποργκ) και έχοντας διατελέσει Αναπληρωτής Διευθυντής του Κέντρου Αριστείας CLASP, αποτελεί σημείο αναφοράς στην Επεξεργασία Φυσικής Γλώσσας (NLP). Το έργο του περιλαμβάνει 4 μονογραφίες, 120+ επιστημονικά paper με συστηματική συνεισφορά στο ελληνικό NLP, και τη δημιουργία περισσότερων από 30 ready-to-market AI εφαρμογών, εγγυώμενος την επιστημονική εγκυρότητα και την τεχνολογική υπεροχή της SimasiaAI.',
  quote: '«Η τεχνητή νοημοσύνη αποκτά αξία όταν σχεδιάζεται με μέτρο τον άνθρωπο και λειτουργεί με διαφάνεια, ευθύνη και επιστημονική ακρίβεια.»',
};

const team = [
  {
    name: 'Δημήτρης Παπαδάκης',
    role: 'Co-founder & Head of Sales',
    avatar: dimitrisReal,
    imgClass: 'tp-img-dimitris',
    bio: 'Στην SimasiaAI, ο Δημήτρης γεφυρώνει τον κόσμο της προηγμένης τεχνολογίας του AI με την επιχειρηματική ανάπτυξη και τη στρατηγική πωλήσεων. Είναι αριστούχος κάτοχος M.A. στη Γλωσσολογία (Πανεπιστήμιο Κρήτης) με εκτενή ερευνητική εμπειρία στην ανάπτυξη ελληνικών γλωσσικών δεδομένων (NLP) και δημοσιεύσεις σε κορυφαία διεθνή συνέδρια τεχνητής νοημοσύνης (LREC, EACL). Έχει διεθνή εργασιακή εμπειρία στο γαλλικό ινστιτούτο τεχνητής νοημοσύνης LORIA, ενώ επίσης έχει εργαστεί ως αναλυτής δεδομένων, συντονιστής ευρωπαϊκών προγραμμάτων και ερευνητής στο Πανεπιστήμιο Κρήτης.',
  },
  {
    name: 'Γιάννης Μπαρούς',
    role: 'Co-founder & CTO',
    avatar: giannisReal,
    imgClass: 'tp-img-giannis',
    bio: 'Ο Γιάννης ηγείται του τεχνολογικού σχεδιασμού και των υποδομών της SimasiaAI. Είναι Υποψήφιος Διδάκτωρ (PhD candidate) στην Επιστήμη Υπολογιστών με έδρα το Σαν Φρανσίσκο, με εξειδίκευση σε συστήματα ιδιωτικότητας, ασφάλεια δεδομένων και αξιόπιστες υποδομές λογισμικού. Αριστούχος απόφοιτος του τμήματος Πληροφορικής του Οικονομικού Πανεπιστημίου Αθηνών (ΟΠΑ), διαθέτει εκτενή εμπειρία σε full-stack ανάπτυξη, βάσεις δεδομένων και αρχιτεκτονική συστημάτων AI/RAG, διασφαλίζοντας ότι οι λύσεις της εταιρείας είναι ασφαλείς, εύρωστες και enterprise-ready.',
  },
  {
    name: 'Αναπληρώτρια Καθ. Αναστασία Νάτσινα',
    role: 'Chief Communications Officer (CCO) & Co-Founder',
    avatar: anastasiaReal,
    imgClass: '',
    bio: 'Η Αναστασία ηγείται της στρατηγικής επικοινωνίας, των δημοσίων σχέσεων και της εξωστρέφειας της SimasiaAI. Είναι Αναπληρώτρια Καθηγήτρια Νεοελληνικής Φιλολογίας και Πρόεδρος του τμήματος Φιλολογίας του Πανεπιστημίου Κρήτης, ενώ διευθύνει το Ερευνητικό Εργαστήριο Λογοτεχνικών Ειδών και Ιστορίας της Λογοτεχνίας. Σπούδασε στα Πανεπιστήμια Αθήνας και Οξφόρδης, με τη διατριβή της να έχει τιμηθεί με το διεθνές Constantine Trypanis Award.',
  },
  {
    name: 'Παντελής Νικολόπουλος',
    role: 'Storyteller & Content Creator',
    avatar: pantelisImg,
    imgClass: '',
    bio: 'Ο Παντελής είναι ο δημιουργικός πυρήνας πίσω από την επικοινωνία και την ταυτότητα της SimasiaAI. Ως Storyteller και Content Creator, εξειδικεύεται στη δημιουργία αυθεντικού περιεχομένου με συναίσθημα και ξεκάθαρο σκοπό, μετατρέποντας την προηγμένη τεχνολογία σε ιστορίες που εμπνέουν και συνδέουν. Γεφυρώνοντας την τεχνητή νοημοσύνη με την ανθρώπινη εμπειρία, διασφαλίζει ότι το μήνυμα της SimasiaAI παραμένει πάντα ανθρωποκεντρικό, άμεσο και επιδραστικό.',
  },
];

const principles = [
  { num: '01', title: 'Ανθρωποκεντρικότητα', body: 'Ο σχεδιασμός μας ξεκινά και τελειώνει με την ανθρώπινη εμπειρία, όχι με την τεχνολογία.' },
  { num: '02', title: 'Υπευθυνότητα και Κανονιστική Συμμόρφωση', body: 'EU AI Act Compliance σε κάθε υλοποίηση. Ασφάλεια δεδομένων, διαφάνεια αποφάσεων και σεβασμός στον χρήστη.' },
  { num: '03', title: 'Οικολογική Καινοτομία', body: 'Eco-Friendly Optimized RAG: ελαχιστοποιούμε το ενεργειακό αποτύπωμα χωρίς να θυσιάζουμε την επίδοση.' },
  { num: '04', title: 'Με Επίκεντρο την Ελλάδα:', body: 'Σχεδιάζουμε για την ελληνική γλώσσα, τις τοπικές διαλέκτους και τις ανάγκες της ελληνικής κοινωνίας.' },
];

const ease = [0.16, 1, 0.3, 1];

const TeamPage = () => {
  const ceoRef = useRef(null);
  const teamRef = useRef(null);
  const principlesRef = useRef(null);

  const ceoInView = useInView(ceoRef, { once: true, margin: '100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '100px' });
  const principlesInView = useInView(principlesRef, { once: true, margin: '100px' });

  return (
    <div className="tp-page">
      {/* Hero */}
      <section className="tp-hero">
        <InteractiveConstellation pattern="people" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="tp-eyebrow">SimasiaAI</span>
            <h1>Η ομάδα μας</h1>
            <p className="tp-hero-sub">
              Η ομάδα, οι αρχές και η αποστολή πίσω από την SimasiaAI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="tp-ceo" ref={ceoRef}>
        <div className="container">
          <motion.div
            className="tp-ceo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={ceoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className="tp-ceo-layout">
              <div className="tp-ceo-portrait">
                <img src={ceo.avatar} alt={ceo.name} />
              </div>
              <div className="tp-ceo-copy">
                <span className="tp-badge">Executive Leadership</span>
                <blockquote className="tp-ceo-quote">
                  {ceo.quote}
                </blockquote>
                <h2>{ceo.name}</h2>
                <h3 className="tp-ceo-title">{ceo.role}</h3>
                <p className="tp-ceo-bio">{ceo.bio}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="tp-team" ref={teamRef}>
        <div className="container">
          <motion.div
            className="tp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Συνιδρυτές & Στρατηγική Ομάδα</h2>
            <p>Η ομάδα πίσω από την ανάπτυξη, το όραμα και την υλοποίηση της SimasiaAI.</p>
          </motion.div>

          <div className="tp-team-grid">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="tp-member-card"
                initial={{ opacity: 0, y: 24 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <div className="tp-member-portrait">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className={member.imgClass || ''}
                  />
                </div>
                <div className="tp-member-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p className="tp-member-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="tp-principles" ref={principlesRef}>
        <div className="container">
          <motion.div
            className="tp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Αρχές</h2>
            <p>Τέσσερις αρχές που καθορίζουν κάθε απόφαση που παίρνουμε.</p>
          </motion.div>
          <div className="tp-principles-list">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                className="tp-principle-item"
                initial={{ opacity: 0, y: 20 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <span className="tp-principle-num">{p.num}</span>
                <div className="tp-principle-body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="tp-mission">
        <div className="container">
          <motion.div
            className="tp-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Η Αποστολή μας</h2>
            <p className="tp-mission-text">
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

export default TeamPage;
