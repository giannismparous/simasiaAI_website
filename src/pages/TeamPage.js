import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  quoteStart: '«Η τεχνητή νοημοσύνη αποκτά αξία όταν σχεδιάζεται ',
  quoteUnderline: 'με μέτρο τον άνθρωπο',
  quoteEnd: ' και λειτουργεί με διαφάνεια, ευθύνη και επιστημονική ακρίβεια.»',
};

const team = [
  {
    id: 'stergios',
    name: 'Στέργιος Χατζηκυριακίδης',
    role: 'Co-founder & CEO, simasiaAI',
    avatar: stergiosReal,
    shortBio: 'Καθηγητής Υπολογιστικής Γλωσσολογίας με 20 έτη διεθνούς εμπειρίας (London, Gothenburg, CLASP).',
    bio: 'Ο Καθηγητής Υπολογιστικής Γλωσσολογίας Στέργιος Χατζηκυριακίδης φέρνει στη SimasiaAI μια διεθνή ακαδημαϊκή και επιχειρηματική εμπειρία δύο δεκαετιών. Με θητεία σε ορισμένα από τα πιο αναγνωρισμένα ιδρύματα της Ευρώπης (University of London, CNRS, Πανεπιστήμιο Γκέτεμποργκ) και έχοντας διατελέσει Αναπληρωτής Διευθυντής του Κέντρου Αριστείας CLASP, αποτελεί σημείο αναφοράς στην Επεξεργασία Φυσικής Γλώσσας (NLP). Το έργο του περιλαμβάνει 4 μονογραφίες, 120+ επιστημονικά paper με συστηματική συνεισφορά στο ελληνικό NLP, και τη δημιουργία περισσότερων από 30 ready-to-market AI εφαρμογών, εγγυώμενος την επιστημονική εγκυρότητα και την τεχνολογική υπεροχή της SimasiaAI.',
    skills: ['Υπολογιστική Γλωσσολογία', 'Επεξεργασία Φυσικής Γλώσσας (NLP)', 'AI Architecture', 'Έρευνα & Ανάπτυξη'],
  },
  {
    id: 'dimitris',
    name: 'Δημήτρης Παπαδάκης',
    role: 'Co-founder & Head of Sales',
    avatar: dimitrisReal,
    shortBio: 'Γλωσσολόγος (M.A. NLP) με ερευνητικό έργο σε διεθνή συνέδρια AI και εμπειρία στο LORIA (Γαλλία).',
    bio: 'Στην SimasiaAI, ο Δημήτρης γεφυρώνει τον κόσμο της προηγμένης τεχνολογίας του AI με την επιχειρηματική ανάπτυξη και τη στρατηγική πωλήσεων της SimasiaAI. Είναι αριστούχος κάτοχος M.A. στη Γλωσσολογία (Πανεπιστήμιο Κρήτης) με εκτενή ερευνητική εμπειρία στην ανάπτυξη ελληνικών γλωσσικών δεδομένων (NLP) και δημοσιεύσεις σε κορυφαία διεθνή συνέδρια τεχνητής νοημοσύνης (LREC, EACL). Έχει διεθνή εργασιακή εμπειρία στο γαλλικό ινστιτούτο τεχνητής νοημοσύνης LORIA, ενώ επίσης έχει εργαστεί ως αναλυτής δεδομένων, συντονιστής ευρωπαϊκών προγραμμάτων και ερευνητής στο Πανεπιστήμιο Κρήτης.',
    skills: ['Business Development', 'NLP Research', 'Στρατηγική Πωλήσεων', 'Project Management'],
  },
  {
    id: 'giannis',
    name: 'Γιάννης Μπαρούς',
    role: 'Co-founder & CTO',
    avatar: giannisReal,
    shortBio: 'Υποψήφιος Διδάκτωρ Πληροφορικής (San Francisco), ειδικός σε ασφάλεια δεδομένων και RAG.',
    bio: 'Ο Γιάννης ηγείται του τεχνολογικού σχεδιασμού και των υποδομών της SimasiaAI. Είναι Υποψήφιος Διδάκτωρ (PhD candidate) στην Επιστήμη Υπολογιστών με έδρα το Σαν Φρανσίσκο, με εξειδίκευση σε συστήματα ιδιωτικότητας, ασφάλεια δεδομένων και αξιόπιστες υποδομές λογισμικού. Αριστούχος απόφοιτος του τμήματος Πληροφορικής του Οικονομικού Πανεπιστημίου Αθηνών (ΟΠΑ), διαθέτει εκτενή εμπειρία σε full-stack ανάπτυξη, βάσεις δεδομένων και αρχιτεκτονική συστημάτων AI/RAG, διασφαλίζοντας ότι οι λύσεις της εταιρείας είναι ασφαλείς, εύρωστες και enterprise-ready.',
    skills: ['Full Stack Development', 'AI Security & Privacy', 'RAG Architectures', 'Infrastructure Scaling'],
  },
  {
    id: 'anastasia',
    name: 'Αναπληρώτρια Καθ. Αναστασία Νάτσινα',
    role: 'Chief Communications Officer (CCO) & Co-Founder',
    avatar: anastasiaReal,
    shortBio: 'Αναπλ. Καθηγήτρια Πανεπιστημίου Κρήτης, απόφοιτος Οξφόρδης με Constantine Trypanis Award.',
    bio: 'Η Αναστασία ηγείται της στρατηγικής επικοινωνίας, των δημοσίων σχέσεων και της εξωστρέφειας της SimasiaAI. Είναι Αναπληρώτρια Καθηγήτρια Νεοελληνικής Φιλολογίας και Πρόεδρος του τμήματος Φιλολογίας του Πανεπιστημίου Κρήτης, ενώ διευθύνει το Ερευνητικό Εργαστήριο Λογοτεχνικών Ειδών και Ιστορίας της Λογοτεχνίας. Σπούδασε στα Πανεπιστήμια Αθήνας και Οξφόρδης, με τη διατριβή της να έχει τιμηθεί με το διεθνές Constantine Trypanis Award. Με μακρά διδακτική και ερευνητική πορεία (Πανεπιστήμιο Πατρών, Ε.Α.Π.), η Αναστασία φέρνει στη SimasiaAI κορυφαία εμπειρία στη συγγραφή κειμένων υψηλού κύρους και τη διαχείριση της δημόσιας εικόνας της εταιρείας στον τύπο και τα ΜΜΕ.',
    skills: ['Strategic Communications', 'Public Relations', 'Public Image', 'Text Composition'],
  },
  {
    id: 'pantelis',
    name: 'Παντελής Νικολόπουλος',
    role: 'Storyteller & Content Creator',
    avatar: pantelisImg,
    shortBio: 'Storyteller & Content Creator, εστιάζοντας στην ανθρωποκεντρική επικοινωνία της AI τεχνολογίας.',
    bio: 'Ο Παντελής είναι ο δημιουργικός πυρήνας πίσω από την επικοινωνία και την ταυτότητα της SimasiaAI. Ως Storyteller και Content Creator, εξειδικεύεται στη δημιουργία αυθεντικού περιεχομένου με συναίσθημα και ξεκάθαρο σκοπό, μετατρέποντας την προηγμένη τεχνολογία σε ιστορίες που εμπνέουν και συνδέουν. Γεφυρώνοντας την τεχνητή νοημοσύνη με την ανθρώπινη εμπειρία, ο Παντελής διασφαλίζει ότι το μήνυμα της SimasiaAI παραμένει πάντα ανθρωποκεντρικό, άμεσο και επιδραστικό στην αγορά.',
    skills: ['Content Strategy', 'Brand Storytelling', 'Creative Writing', 'Media Creation'],
  },
];

const principles = [
  { num: '01', title: 'Ανθρωποκεντρικότητα', body: 'Ο σχεδιασμός μας ξεκινά και τελειώνει με την ανθρώπινη εμπειρία, όχι με την τεχνολογία. Θέτουμε τις ανάγκες των χρηστών στο επίκεντρο κάθε γραμμής κώδικα.', icon: '👥' },
  { num: '02', title: 'Υπευθυνότητα & Συμμόρφωση', body: 'Πλήρης εναρμόνιση με το EU AI Act σε κάθε υλοποίηση. Εγγυόμαστε απόλυτη ασφάλεια δεδομένων, διαφάνεια αποφάσεων και σεβασμό στην ιδιωτικότητα.', icon: '⚖️' },
  { num: '03', title: 'Οικολογική Καινοτομία', body: 'Eco-Friendly Optimized RAG: Εφαρμόζουμε πράσινες τεχνολογίες για να ελαχιστοποιήσουμε το ενεργειακό αποτύπωμα των γλωσσικών μοντέλων.', icon: '🌱' },
  { num: '04', title: 'Με Επίκεντρο την Ελλάδα', body: 'Σχεδιάζουμε ειδικά για την ελληνική γλώσσα, υποστηρίζοντας τοπικές ιδιαιτερότητες, ορολογία και πολιτισμικές αποχρώσεις.', icon: '🇬🇷' },
];

const missionStatement = "Δεν σχεδιάζουμε μία απλή μηχανή απαντήσεων. Δημιουργήσαμε τον ανθρωποκεντρικό πλοηγό DialogosAI που αναπτύσσει έναν αυθεντικό, ασφαλή και προσαρμοσμένο διάλογο με τους χρήστες, με σεβασμό στην ελληνική γλώσσα, την προσβασιμότητα για όλες και όλους, αναλαμβάνοντας την ευθύνη της χρήσης της τεχνολογίας που συνδράμει σε πραγματικές ανάγκες.";

const ease = [0.16, 1, 0.3, 1];

// Typewriter component for the Mission section to simulate live writing
const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={containerRef}>
      {displayedText}
      <span className="tp-cursor">|</span>
    </span>
  );
};

const TeamPage = () => {
  const ceoRef = useRef(null);
  const teamRef = useRef(null);
  const principlesRef = useRef(null);
  const missionRef = useRef(null);

  const ceoInView = useInView(ceoRef, { once: true, margin: '100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '100px' });
  const principlesInView = useInView(principlesRef, { once: true, margin: '100px' });
  const missionInView = useInView(missionRef, { once: true, margin: '100px' });

  // Flipped card states
  const [flippedCards, setFlippedCards] = useState({});
  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Principles active index tab
  const [activePrinciple, setActivePrinciple] = useState(0);

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
              Οι άνθρωποι, οι αρχές και η αποστολή πίσω από την τεχνολογική υπεροχή της SimasiaAI.
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
                  {ceo.quoteStart}
                  <span className="tp-highlight-wrap">
                    <span className="tp-underline">{ceo.quoteUnderline}</span>
                  </span>
                  {ceo.quoteEnd}
                </blockquote>
                <h2>{ceo.name}</h2>
                <h3 className="tp-ceo-title">{ceo.role}</h3>
                <p className="tp-ceo-bio">{ceo.bio}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Team Grid with 3D Flip Cards */}
      <section className="tp-team" ref={teamRef}>
        <div className="container">
          <motion.div
            className="tp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Συνιδρυτές & Στρατηγική Ομάδα</h2>
            <p>Πατήστε πάνω στη φωτογραφία ή την κάρτα για να αναποδογυρίσει και να δείτε το αναλυτικό βιογραφικό και τις δεξιότητες.</p>
          </motion.div>

          <div className="tp-team-grid">
            {team.map((member, i) => {
              const isFlipped = !!flippedCards[member.id];
              return (
                <motion.div
                  key={member.id}
                  className="tp-card-scene"
                  initial={{ opacity: 0, y: 24 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  onClick={() => toggleFlip(member.id)}
                >
                  <div className={`tp-card-flip ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* Front of Card */}
                    <div className="tp-card-front">
                      <div className="tp-member-portrait">
                        <img
                          src={member.avatar}
                          alt={member.name}
                        />
                        <div className="tp-flip-indicator">
                          <span>Δείτε το CV ↻</span>
                        </div>
                      </div>
                      <div className="tp-member-info">
                        <h3>{member.name}</h3>
                        <h4>{member.role}</h4>
                        <p className="tp-member-short">{member.shortBio}</p>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="tp-card-back">
                      <div className="tp-back-header">
                        <h3>{member.name}</h3>
                        <h4>{member.role}</h4>
                      </div>
                      <div className="tp-back-body">
                        <p>{member.bio}</p>
                        <div className="tp-skills-container">
                          <h5>Εξειδίκευση:</h5>
                          <div className="tp-skills-list">
                            {member.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="tp-skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="tp-back-footer">
                        <span>Επιστροφή ↺</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles Section with interactive sliding layout */}
      <section className="tp-principles" ref={principlesRef}>
        <div className="container">
          <motion.div
            className="tp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Οι Αρχές μας</h2>
            <p>Οι τέσσερις πυλώνες πάνω στους οποίους βασίζεται η ανάπτυξη της SimasiaAI.</p>
          </motion.div>

          <div className="tp-interactive-principles">
            <div className="tp-principles-nav">
              {principles.map((p, idx) => (
                <button
                  key={p.num}
                  className={`tp-principle-tab ${activePrinciple === idx ? 'active' : ''}`}
                  onClick={() => setActivePrinciple(idx)}
                >
                  <span className="tp-tab-num">{p.num}</span>
                  <span className="tp-tab-title">{p.title}</span>
                </button>
              ))}
            </div>

            <div className="tp-principles-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrinciple}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="tp-active-principle-card"
                >
                  <div className="tp-active-icon">{principles[activePrinciple].icon}</div>
                  <h3>{principles[activePrinciple].title}</h3>
                  <p>{principles[activePrinciple].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Live Writing typewriter effect */}
      <section className="tp-mission" ref={missionRef}>
        <div className="container">
          <motion.div
            className="tp-mission-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Η Αποστολή μας</h2>
            <div className="tp-mission-writer-box">
              <div className="tp-terminal-header">
                <span className="tp-dot red"></span>
                <span className="tp-dot yellow"></span>
                <span className="tp-dot green"></span>
                <span className="tp-terminal-title">mission_statement.txt</span>
              </div>
              <div className="tp-terminal-body">
                <p className="tp-mission-text">
                  <TypewriterText text={missionStatement} />
                </p>
              </div>
            </div>
            <div className="tp-mission-cta">
              <Link to="/book-demo" className="btn btn-primary btn-large">Κλείστε ένα Demo</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
