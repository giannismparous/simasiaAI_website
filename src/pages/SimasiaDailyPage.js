import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import { DailyAnimation } from '../components/ProductAnimations';
import CTA from '../components/CTA';

const SimasiaDailyPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const toolCategories = [
    {
      category: "Μετρητής Κειμένου",
      tools: ["Λέξεις, χαρακτήρες, προτάσεις."]
    },
    {
      category: "Αναδιατύπωση Κειμένου",
      tools: ["Από ανεπίσημο → επίσημο με AI."]
    },
    {
      category: "Έξυπνος Δημιουργός Τιμολογίων",
      tools: ["Στοιχεία εκδότη/λήπτη, γραμμές ειδών, υπολογισμός φόρων, εξαγωγή PDF."]
    },
    {
      category: "Προγραμματιστής Συναντήσεων Πολλαπλών Ζωνών Ώρας",
      tools: ["Προγραμματισμός σε πολλές ζώνες, έξυπνες προτάσεις χρόνου, εξαγωγή ημερολογίου (.ics)."]
    },
    {
      category: "Πρότυπο Πρακτικών Συνάντησης",
      tools: ["Συμμετέχοντες, θέματα ημερήσιας διάταξης, σημεία συζήτησης, ενέργειες, επόμενη συνάντηση, επιλογές εξαγωγής."]
    },
    {
      category: "Μετατροπέας Αρχείων (15+ μετατροπές)",
      tools: ["DOCX↔PDF, LaTeX↔PDF/DOCX, TXT→PDF, DOC→PDF, CSV↔JSON, MP3↔WAV, PNG↔JPEG, PDF→εικόνα."]
    },
    {
      category: "Εργαλεία Εικόνας (3)",
      tools: ["Δημιουργία «σκαναρισμένης» εικόνας, αλλαγή μεγέθους, μετατροπή εικόνας σε Base64."]
    },
    {
      category: "Εργαλεία επεξεργασία κειμένου",
      tools: ["Μετατροπή γραμμάτων σε κεφαλαία, πεζά, μετατροπή τίτλων σε κεφαλαίων, αφαίρεση περιττών κενών, δημιουργία αρκτικολέξων με AI."]
    },
    {
      category: "Εργαλεία Δεδομένων & Κώδικα",
      tools: ["Μορφοποίηση JSON, περίληψη κειμένου/μελέτης (ανέβασμα .txt → σύνοψη + λέξεις-κλειδιά)."]
    },
    {
      category: "Βοηθητικά Εργαλεία",
      tools: ["Δημιουργός QR κωδικών, δημιουργός κωδικών πρόσβασης, προηγμένο OCR (εξαγωγή κειμένου + περιγραφή εικόνας με AI)."]
    },
    {
      category: "Διασκεδαστικά/Πειραματικά Εργαλεία",
      tools: ["Αυτόματη επιστολή συγγνώμης (AI), μεταφραστής «εταιρικής» σε ανθρώπινη γλώσσα (jargon → απλά), τυχαίος δημιουργός ψευδωνύμων, δημιουργός κομπλιμέντων (AI), μετατροπέας CV σε σύντομο βιογραφικό (AI) (επερχόμενες προσθήκες)."]
    }
  ];

  return (
    <div className="product-page-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
      <section className="product-hero" style={{ padding: '8rem 0 4rem', position: 'relative' }}>
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
          >
            <SmoothReveal delay={0.1} yOffset={20}>
              <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                SimasiaDaily
              </h1>
            </SmoothReveal>
            <div style={{ marginBottom: '2rem', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DailyAnimation logoStyle={true} />
            </div>
            <SmoothReveal delay={0.2} yOffset={15}>
              <p style={{ fontSize: '1.5rem', color: 'var(--primary-warm)', marginBottom: '2rem' }}>
                Μικρά εργαλεία, μεγάλη διαφορά.
              </p>
            </SmoothReveal>
          </motion.div>
        </div>
      </section>

      <section className="product-features" style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <SmoothReveal delay={0.1} yOffset={20}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
              Το SimasiaDaily προσφέρει:
            </h2>
          </SmoothReveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {toolCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.05) }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  boxShadow: '0 20px 60px rgba(224, 120, 86, 0.3)'
                }}
                style={{
                  padding: '2rem',
                  background: 'var(--light-bg)',
                  borderRadius: '12px',
                  border: '1px solid rgba(44, 122, 123, 0.1)',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-warm)' }}>
                  {category.category}
                </h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex} style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                      <WordReveal text={tool} delay={0.25 + (index * 0.05) + (toolIndex * 0.05)} duration={0.25} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/book-demo" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Προγραμματίστε ένα demo άμεσα
          </Link>
          <a href="#contact" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Ζητήστε πρόσβαση
          </a>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default SimasiaDailyPage;

