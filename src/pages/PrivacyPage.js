import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './LegalPage.css';

const ease = [0.16, 1, 0.3, 1];

const PrivacyEl = () => (
  <div className="legal-page">
    <section className="legal-hero">
      <div className="container">
        <div className="legal-hero-inner">
          <motion.span className="legal-hero-eyebrow"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
            Νομικά Έγγραφα
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.08 }}>
            Πολιτική Απορρήτου
          </motion.h1>
          <p className="legal-meta">
            <strong>Τελευταία ενημέρωση:</strong> Σεπτέμβριος 2026 &nbsp;·&nbsp; Κανονισμός (ΕΕ) 2016/679 (GDPR) &nbsp;·&nbsp; Ν. 4624/2019
          </p>
        </div>
      </div>
    </section>

    <motion.div className="legal-body"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: 0.15 }}>

      <div className="legal-section">
        <h2>1. Υπεύθυνος Επεξεργασίας</h2>
        <p>Υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων είναι:</p>
        <p>
          <strong>Σημασία-ΑΙ Ιδιωτική Κεφαλαιουχική Εταιρεία (Ι.Κ.Ε.)</strong><br />
          Ναρκίσσου 26, 15452 Παλαιό Ψυχικό, Αττική<br />
          ΓΕΜΗ: 188174403000 &nbsp;|&nbsp; ΑΦΜ: 803048250<br />
          Email: <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a><br />
          Υπεύθυνος Προστασίας Δεδομένων (DPO): <a href="mailto:dpo@simasiaai.gr">dpo@simasiaai.gr</a>
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Δεδομένα που Συλλέγουμε</h2>
        <p>Συλλέγουμε τις ακόλουθες κατηγορίες δεδομένων:</p>
        <ul>
          <li><strong>Στοιχεία επικοινωνίας:</strong> Ονοματεπώνυμο, email, τηλέφωνο, οργανισμός — όταν συμπληρώνετε φόρμα επικοινωνίας ή αίτηση demo.</li>
          <li><strong>Δεδομένα chatbot:</strong> Περιεχόμενο συνομιλιών με το DialogosAI — αποκλειστικά για τη βελτίωση της υπηρεσίας, σύμφωνα με τη νόμιμη βάση της συγκατάθεσης ή της εκτέλεσης σύμβασης.</li>
          <li><strong>Δεδομένα πλοήγησης:</strong> Διεύθυνση IP, τύπος προγράμματος περιήγησης, σελίδες επίσκεψης, χρόνος παραμονής — μέσω cookies αναλυτικής (εφόσον έχετε δώσει συγκατάθεση).</li>
          <li><strong>Cookies:</strong> Βλ. <Link to="/cookies">Πολιτική Cookies</Link>.</li>
        </ul>
        <div className="legal-highlight">
          Δεν επεξεργαζόμαστε ευαίσθητα δεδομένα (ειδικές κατηγορίες του άρθρου 9 GDPR), όπως δεδομένα υγείας, εκτός εάν ρητά και εγγράφως συμφωνηθεί στο πλαίσιο σύμβασης παροχής υπηρεσιών.
        </div>
      </div>

      <div className="legal-section">
        <h2>3. Σκοπός και Νόμιμη Βάση Επεξεργασίας</h2>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Σκοπός</th>
                <th>Νόμιμη Βάση (Άρθρο 6 GDPR)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Απάντηση σε αίτημα επικοινωνίας</td><td>Άρθρο 6(1)(β) — Εκτέλεση σύμβασης / προσυμβατικά μέτρα</td></tr>
              <tr><td>Αποστολή ενημερωτικού υλικού (newsletter)</td><td>Άρθρο 6(1)(α) — Συγκατάθεση</td></tr>
              <tr><td>Βελτίωση της Υπηρεσίας (ανάλυση χρήσης)</td><td>Άρθρο 6(1)(στ) — Έννομο συμφέρον</td></tr>
              <tr><td>Παροχή υπηρεσιών DialogosAI σε συμβαλλόμενους φορείς</td><td>Άρθρο 6(1)(β) — Εκτέλεση σύμβασης</td></tr>
              <tr><td>Συμμόρφωση με νομικές υποχρεώσεις</td><td>Άρθρο 6(1)(γ) — Νομική υποχρέωση</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="legal-section">
        <h2>4. Χρόνος Διατήρησης Δεδομένων</h2>
        <ul>
          <li>Δεδομένα επικοινωνίας: έως 3 έτη από την τελευταία επαφή.</li>
          <li>Δεδομένα chatbot: έως 12 μήνες, εκτός αν άλλως ορίζεται στη σύμβαση.</li>
          <li>Δεδομένα αναλυτικής: έως 14 μήνες (ρύθμιση διατήρησης δεδομένων του Google Analytics 4).</li>
          <li>Φορολογικά/λογιστικά δεδομένα: 5 έτη βάσει ελληνικής φορολογικής νομοθεσίας.</li>
        </ul>
        <p>Μετά τη λήξη της περιόδου διατήρησης, τα δεδομένα διαγράφονται ή ανωνυμοποιούνται μόνιμα.</p>
      </div>

      <div className="legal-section">
        <h2>5. Διαβίβαση σε Τρίτους</h2>
        <p>Δεν πωλούμε, ενοικιάζουμε ή εμπορευόμαστε τα προσωπικά σας δεδομένα. Ενδέχεται να τα κοινοποιήσουμε σε:</p>
        <ul>
          <li><strong>Εκτελούντες επεξεργασία (processors):</strong> παρόχους φιλοξενίας, υπηρεσίες ανάλυσης, παρόχους μοντέλων ΤΝ — αποκλειστικά βάσει σύμβασης επεξεργασίας δεδομένων (DPA) που διασφαλίζει GDPR-συμμόρφωση.</li>
          <li><strong>Αρμόδιες αρχές:</strong> σε περίπτωση νόμιμης υποχρέωσης ή δικαστικής εντολής.</li>
        </ul>
        <p>Ορισμένοι εκτελούντες επεξεργασία εδρεύουν εκτός ΕΟΧ. Σε αυτές τις περιπτώσεις η διαβίβαση γίνεται βάσει κατάλληλων εγγυήσεων (Τυποποιημένες Συμβατικές Ρήτρες ΕΕ — SCCs).</p>
      </div>

      <div className="legal-section">
        <h2>6. Δικαιώματα Υποκειμένου Δεδομένων</h2>
        <p>Βάσει του GDPR (Άρθρα 15–22) έχετε τα ακόλουθα δικαιώματα:</p>
        <ul>
          <li><strong>Πρόσβαση (Άρθρο 15):</strong> Να λάβετε αντίγραφο των δεδομένων που τηρούμε για εσάς.</li>
          <li><strong>Διόρθωση (Άρθρο 16):</strong> Να ζητήσετε τη διόρθωση ανακριβών δεδομένων.</li>
          <li><strong>Διαγραφή (Άρθρο 17):</strong> Να ζητήσετε τη διαγραφή των δεδομένων σας («δικαίωμα στη λήθη»).</li>
          <li><strong>Περιορισμός επεξεργασίας (Άρθρο 18):</strong> Να ζητήσετε τον περιορισμό της επεξεργασίας υπό ορισμένες συνθήκες.</li>
          <li><strong>Φορητότητα (Άρθρο 20):</strong> Να λάβετε τα δεδομένα σας σε δομημένο, κοινώς χρησιμοποιούμενο μορφότυπο.</li>
          <li><strong>Εναντίωση (Άρθρο 21):</strong> Να αντιταχθείτε στην επεξεργασία που βασίζεται σε έννομο συμφέρον ή για σκοπούς απευθείας εμπορικής προώθησης.</li>
          <li><strong>Ανάκληση συγκατάθεσης:</strong> Να ανακαλέσετε οποτεδήποτε τη συγκατάθεσή σας, χωρίς αυτό να επηρεάζει τη νομιμότητα της προηγούμενης επεξεργασίας.</li>
          <li><strong>Καταγγελία:</strong> Να υποβάλετε καταγγελία στην <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer">Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)</a>.</li>
        </ul>
        <p>Για την άσκηση οποιουδήποτε δικαιώματος αποστείλατε αίτημα στο: <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>. Θα απαντήσουμε εντός 30 ημερολογιακών ημερών.</p>
      </div>

      <div className="legal-section">
        <h2>7. Ασφάλεια Δεδομένων</h2>
        <p>Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων σας από μη εξουσιοδοτημένη πρόσβαση, απώλεια ή καταστροφή, συμπεριλαμβανομένης της κρυπτογράφησης δεδομένων σε κατάσταση ηρεμίας και μεταφοράς (TLS), καθώς και ελέγχων πρόσβασης βάσει αρχής ελαχίστων δικαιωμάτων.</p>
      </div>

      <div className="legal-section">
        <h2>8. Cookies</h2>
        <p>Η Υπηρεσία χρησιμοποιεί cookies. Για αναλυτικές πληροφορίες, ανατρέξτε στην <Link to="/cookies">Πολιτική Cookies</Link>.</p>
      </div>

      <div className="legal-section">
        <h2>9. Αλλαγές στην Πολιτική</h2>
        <p>Η παρούσα Πολιτική Απορρήτου ενδέχεται να τροποποιείται περιοδικά. Σε περίπτωση ουσιαστικών αλλαγών, θα σας ενημερώνουμε μέσω email ή εμφανούς ανακοίνωσης στην Υπηρεσία. Η ημερομηνία «Τελευταίας ενημέρωσης» στην κορυφή της σελίδας υποδηλώνει την τελευταία αναθεώρηση.</p>
      </div>

      <div className="legal-section">
        <h2>10. Επικοινωνία</h2>
        <p>Για οποιοδήποτε ερώτημα σχετικά με την επεξεργασία των προσωπικών σας δεδομένων:<br />
        <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a></p>
      </div>
    </motion.div>
  </div>
);

const PrivacyEn = () => (
  <div className="legal-page">
    <section className="legal-hero">
      <div className="container">
        <div className="legal-hero-inner">
          <motion.span className="legal-hero-eyebrow"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
            Legal documents
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.08 }}>
            Privacy Policy
          </motion.h1>
          <p className="legal-meta">
            <strong>Last updated:</strong> September 2026 &nbsp;·&nbsp; Regulation (EU) 2016/679 (GDPR) &nbsp;·&nbsp; Greek Law 4624/2019
          </p>
        </div>
      </div>
    </section>

    <motion.div className="legal-body"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: 0.15 }}>

      <div className="legal-section">
        <h2>1. Data Controller</h2>
        <p>The controller of your personal data is:</p>
        <p>
          <strong>Simasia-AI P.C. (Σημασία-ΑΙ Ι.Κ.Ε.)</strong><br />
          Narkissou 26, 15452 Palaio Psychiko, Attica, Greece<br />
          G.E.MI. (General Commercial Registry): 188174403000 &nbsp;|&nbsp; Tax ID (AFM): 803048250<br />
          Email: <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a><br />
          Data Protection Officer (DPO): <a href="mailto:dpo@simasiaai.gr">dpo@simasiaai.gr</a>
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Data We Collect</h2>
        <p>We collect the following categories of data:</p>
        <ul>
          <li><strong>Contact details:</strong> Full name, email, phone number, organisation — when you fill in a contact form or a demo request.</li>
          <li><strong>Chatbot data:</strong> The content of conversations with DialogosAI — solely to improve the service, on the legal basis of consent or performance of a contract.</li>
          <li><strong>Browsing data:</strong> IP address, browser type, pages visited, time spent — through analytics cookies (provided you have given your consent).</li>
          <li><strong>Cookies:</strong> See the <Link to="/cookies">Cookie Policy</Link>.</li>
        </ul>
        <div className="legal-highlight">
          We do not process sensitive data (special categories under Article 9 GDPR), such as health data, unless this has been expressly agreed in writing within a service agreement.
        </div>
      </div>

      <div className="legal-section">
        <h2>3. Purpose and Legal Basis of Processing</h2>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Legal basis (Article 6 GDPR)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Responding to a contact request</td><td>Article 6(1)(b) — Performance of a contract / pre-contractual steps</td></tr>
              <tr><td>Sending informational material (newsletter)</td><td>Article 6(1)(a) — Consent</td></tr>
              <tr><td>Improving the Service (usage analysis)</td><td>Article 6(1)(f) — Legitimate interest</td></tr>
              <tr><td>Providing DialogosAI services to contracting organisations</td><td>Article 6(1)(b) — Performance of a contract</td></tr>
              <tr><td>Compliance with legal obligations</td><td>Article 6(1)(c) — Legal obligation</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="legal-section">
        <h2>4. Data Retention</h2>
        <ul>
          <li>Contact data: up to 3 years from the last contact.</li>
          <li>Chatbot data: up to 12 months, unless otherwise specified in the contract.</li>
          <li>Analytics data: up to 14 months (Google Analytics 4 data retention setting).</li>
          <li>Tax/accounting data: 5 years, under Greek tax legislation.</li>
        </ul>
        <p>Once the retention period ends, the data is permanently deleted or anonymised.</p>
      </div>

      <div className="legal-section">
        <h2>5. Disclosure to Third Parties</h2>
        <p>We do not sell, rent or trade your personal data. We may share it with:</p>
        <ul>
          <li><strong>Processors:</strong> hosting providers, analytics services, AI model providers — only under a data processing agreement (DPA) that ensures GDPR compliance.</li>
          <li><strong>Competent authorities:</strong> where there is a legal obligation or a court order.</li>
        </ul>
        <p>Some processors are based outside the EEA. In those cases, transfers take place on the basis of appropriate safeguards (EU Standard Contractual Clauses — SCCs).</p>
      </div>

      <div className="legal-section">
        <h2>6. Data Subject Rights</h2>
        <p>Under the GDPR (Articles 15–22) you have the following rights:</p>
        <ul>
          <li><strong>Access (Article 15):</strong> To receive a copy of the data we hold about you.</li>
          <li><strong>Rectification (Article 16):</strong> To request the correction of inaccurate data.</li>
          <li><strong>Erasure (Article 17):</strong> To request the deletion of your data (the “right to be forgotten”).</li>
          <li><strong>Restriction of processing (Article 18):</strong> To request that processing be restricted under certain conditions.</li>
          <li><strong>Portability (Article 20):</strong> To receive your data in a structured, commonly used format.</li>
          <li><strong>Objection (Article 21):</strong> To object to processing based on legitimate interest or carried out for direct marketing purposes.</li>
          <li><strong>Withdrawal of consent:</strong> To withdraw your consent at any time, without affecting the lawfulness of processing carried out before the withdrawal.</li>
          <li><strong>Complaint:</strong> To lodge a complaint with the <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer">Hellenic Data Protection Authority (HDPA)</a>.</li>
        </ul>
        <p>To exercise any of these rights, send your request to: <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>. We will respond within 30 calendar days.</p>
      </div>

      <div className="legal-section">
        <h2>7. Data Security</h2>
        <p>We apply appropriate technical and organisational measures to protect your data against unauthorised access, loss or destruction, including encryption of data at rest and in transit (TLS), and access controls based on the principle of least privilege.</p>
      </div>

      <div className="legal-section">
        <h2>8. Cookies</h2>
        <p>The Service uses cookies. For detailed information, please see the <Link to="/cookies">Cookie Policy</Link>.</p>
      </div>

      <div className="legal-section">
        <h2>9. Changes to this Policy</h2>
        <p>This Privacy Policy may be amended from time to time. If there are material changes, we will inform you by email or by a prominent notice on the Service. The “Last updated” date at the top of the page shows the most recent revision.</p>
      </div>

      <div className="legal-section">
        <h2>10. Contact</h2>
        <p>For any question about the processing of your personal data:<br />
        <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a></p>
        <p>This English text is a translation for convenience. In case of any discrepancy, the Greek text prevails.</p>
      </div>
    </motion.div>
  </div>
);

const PrivacyPage = () => {
  const { language } = useLanguage();
  return language === 'en' ? <PrivacyEn /> : <PrivacyEl />;
};

export default PrivacyPage;
