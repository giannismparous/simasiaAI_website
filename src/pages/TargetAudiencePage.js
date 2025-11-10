import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import '../components/TargetAudience.css';

const TargetAudiencePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div className="target-audience-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="target-audience-hero" style={{ padding: '8rem 0 2rem', position: 'relative' }}>
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <SmoothReveal delay={0.1} yOffset={20}>
              <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                Ποιους αφορά;
              </h1>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-content" style={{ padding: '2rem 0 4rem', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                Φορείς, Οργανισμοί & Επιχειρήσεις με κοινωνικό ρόλο
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text="Συνεργαζόμαστε για λύσεις βοηθών επικοινωνίας (chatbots) που ενισχύουν την κοινωνική συνοχή με σεβασμό στη διαφορετικότητα και τις ανάγκες των κοινοτήτων (για περισσότερες πληροφορίες δείτε στο link product)."
                delay={0.15}
                duration={0.25}
              />
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', fontWeight: '600' }}>
              Αν απευθύνεστε ή στηρίζετε ομάδες όπως:
            </p>
            <ul style={{ fontSize: '1.1rem', lineHeight: 2, marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li>Άτομα με αναπηρίες ή χρόνια νοσήματα, καθώς και φροντιστές/ριες.</li>
              <li>ΛΟΑΤΚΙ+ άτομα και επιζώντες/επιζώσες έμφυλης ή ενδοοικογενειακής βίας.</li>
              <li>Πρόσφυγες/ισσες και μετανάστες/τριες, μη ελληνόφωνες/οι & πολυγλωσσικές κοινότητες.</li>
              <li>Άτομα με ζητήματα ψυχικής υγείας.</li>
              <li>Παιδιά/έφηβους/ες σε δυσλειτουργικά περιβάλλοντα.</li>
              <li>Άτομα που αντιμετωπίζουν στιγμές κρίσης.</li>
            </ul>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--gray-medium)', marginBottom: '2rem' }}>
              Σημείωση: Η παραπάνω λίστα είναι ενδεικτική· συνεργαζόμαστε και με άλλες κοινότητες με παρόμοιες ανάγκες πρόσβασης.
            </p>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-chatbots" className="btn btn-primary">
                SimasiaChatbots: Ασφαλή chatbots, σχεδιασμένα από ανθρώπους, για ανθρώπους
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-businesses" style={{ padding: '4rem 0', position: 'relative', zIndex: 2, background: 'rgba(44, 122, 123, 0.02)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Επιχειρήσεις, φορείς και υπηρεσίες με ευρεία απεύθυνση και ανάγκες εξατομίκευσης
              </h2>
            </SmoothReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              {[
                { title: "Ταξιδιωτικά Γραφεία & Ξενοδοχεία", desc: "που επενδύουν στον συμπεριληπτικό τουρισμό (πληροφορία χωρίς εμπόδια και προκαταλήψεις, σαφείς διαδικασίες βοήθειας)." },
                { title: "Πρεσβείες και Προξενεία", desc: "που χρειάζονται 24/7 αξιόπιστο βοηθό επικοινωνίας (chatbot) για πολίτες των χωρών τους που χρειάζονται καθοδήγηση σε διαδικασίες ή αντιμετωπίζουν καταστάσεις κρίσης." },
                { title: "Real Estate", desc: "που εξυπηρετεί διαφορετικά γλωσσικά/πολιτισμικά περιβάλλοντα με σαφή, ανθρώπινη ενημέρωση." },
                { title: "E-shops", desc: "που επιθυμούν να διευρύνουν το κοινό τους ή εστιάζουν σε κοινό με ανάγκες προσβασιμότητας (απλοποίηση κειμένου, πολυγλωσσική καθοδήγηση με βάση Web Content Accessibility Guidelines)." },
                { title: "Tech Companies", desc: "που δεσμεύονται σε υπεύθυνη, συμπεριληπτική επικοινωνία με χρήστριες/χρήστες και κοινότητες." },
                { title: "Μουσεία & Κέντρα Πολιτισμού", desc: "που επιδιώκουν πρόσβαση για όλους/ες (προσβάσιμες εκθέσεις, απλοποιημένη γλώσσα, πολυγλωσσία)." },
                { title: "Καταστήματα εστίασης", desc: "με ανάγκη για προσβάσιμα μενού/οδηγίες και πολιτισμική διαμεσολάβηση." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="business-type-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
                  }}
                  style={{
                    padding: '2rem',
                    background: 'linear-gradient(135deg, var(--light-bg) 0%, rgba(247, 243, 232, 0.5) 100%)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(44, 122, 123, 0.1)',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-warm)' }}>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-chatbots" className="btn btn-primary">
                SimasiaChatbots: Ασφαλή chatbots, σχεδιασμένα από ανθρώπους, για ανθρώπους
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-translation" style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Πρεσβείες, Προξενεία, Εκδοτικοί Οίκοι, Μεταφραστικά κέντρα, Εταιρείες με διεθνείς συναλλαγές
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text="Μετάφραση και επιμέλεια κειμένου με βάση τις δικές σας προδιαγραφές, λεξικά της επιλογής σας, και εξειδικευμένη ορολογία."
                delay={0.15}
                duration={0.25}
              />
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text="Μικρά και αξιόπιστα εργαλεία για τις καθημερινές δουλειές γραφείου."
                delay={0.2}
                duration={0.25}
              />
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text="Το SimasiaStudio και το SimasiaDaily προσαρμόζονται στις ανάγκες σας και προσφέρουν ακριβή και αξιόπιστα αποτελέσματα."
                delay={0.25}
                duration={0.25}
              />
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/products/simasia-studio" className="btn btn-primary">
                SimasiaStudio
              </Link>
              <Link to="/products/simasia-daily" className="btn btn-primary">
                SimasiaDaily
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-office" style={{ padding: '4rem 0', position: 'relative', zIndex: 2, background: 'rgba(44, 122, 123, 0.02)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Επιχειρήσεις, Φορείς, Ατομική χρήση
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text="Το SimasiaDaily προσαρμόζεται στις ανάγκες σας και απλουστεύει μια σειρά από καθημερινές δουλειές γραφείου: Έκδοση τιμολογίων, μετατροπή μεταξύ όλων των τύπων αρχείων, μετατροπή μεγέθους και μορφής φωτογραφιών, δημιουργία QR code, προσαρμογή του logo/template της επιχείρησης ή του φορέα σε παρουσιάσεις και αλληλογραφία κ.ά."
                delay={0.15}
                duration={0.25}
              />
            </p>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-daily" className="btn btn-primary">
                SimasiaDaily
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="target-audience-education" style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SmoothReveal delay={0.1} yOffset={15}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Εκπαιδευτικοί οργανισμοί, Καθηγητές/τριες, Μαθητές/τριες
              </h2>
            </SmoothReveal>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--gray-medium)' }}>
              <WordReveal 
                text="Το SimasiaEdu προτείνει θέματα εξετάσεων με βάση επιλεγμένα πρότυπα (π.χ. τράπεζα θεμάτων), προτείνει διορθώσεις στις απαντήσεις σας (αρκεί η ανάρτηση του εγγράφου ή μια απλή φωτογραφία του γραπτού) και δίνει πρότυπες λύσεις, εξηγώντας βήμα-βήμα."
                delay={0.15}
                duration={0.25}
              />
            </p>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/products/simasia-edu" className="btn btn-primary">
                SimasiaEdu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TargetAudiencePage;

