import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LegalPage.css';

const ease = [0.16, 1, 0.3, 1];

const CookiesPage = () => (
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
            Πολιτική Cookies
          </motion.h1>
          <p className="legal-meta">
            <strong>Τελευταία ενημέρωση:</strong> Σεπτέμβριος 2026 &nbsp;·&nbsp; Οδηγία ePrivacy 2002/58/ΕΚ &nbsp;·&nbsp; GDPR
          </p>
        </div>
      </div>
    </section>

    <motion.div className="legal-body"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: 0.15 }}>

      <div className="legal-section">
        <h2>1. Τι είναι τα Cookies</h2>
        <p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε έναν ιστότοπο. Χρησιμοποιούνται ευρέως για τη σωστή λειτουργία των ιστοτόπων, τη βελτίωση της εμπειρίας χρήστη και την παροχή πληροφοριών στους διαχειριστές.</p>
        <p>Ο ιστότοπός μας χρησιμοποιεί επίσης τεχνολογία <strong>localStorage</strong> του προγράμματος περιήγησης για την αποθήκευση προτιμήσεων (π.χ. αποδοχή cookies, γλώσσα).</p>
      </div>

      <div className="legal-section">
        <h2>2. Κατηγορίες Cookies που Χρησιμοποιούμε</h2>
        <ul>
          <li><strong>Αναγκαία:</strong> Απαραίτητα για τη βασική λειτουργία της Υπηρεσίας. Δεν απαιτούν συγκατάθεση.</li>
          <li><strong>Λειτουργικά:</strong> Αποθηκεύουν τις επιλογές σας (γλώσσα, προτιμήσεις) για καλύτερη εμπειρία.</li>
          <li><strong>Στατιστικά / Αναλυτικά:</strong> Μας βοηθούν να κατανοήσουμε πώς χρησιμοποιείται η Υπηρεσία (π.χ. Google Analytics). Απαιτούν τη συγκατάθεσή σας.</li>
          <li><strong>Marketing:</strong> Αυτή τη στιγμή δεν χρησιμοποιούμε cookies marketing / τρίτων για διαφημιστικούς σκοπούς.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Αναλυτική Λίστα Cookies</h2>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Όνομα</th>
                <th>Τύπος</th>
                <th>Διάρκεια</th>
                <th>Σκοπός</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>simasiaai_cookie_consent</code></td>
                <td>Αναγκαίο</td>
                <td>1 έτος</td>
                <td>Αποθήκευση της επιλογής συγκατάθεσης για cookies (localStorage)</td>
              </tr>
              <tr>
                <td><code>simasiaai_lang</code></td>
                <td>Λειτουργικό</td>
                <td>Συνεδρία</td>
                <td>Αποθήκευση επιλογής γλώσσας (ΕΛ / EN)</td>
              </tr>
              <tr>
                <td><code>_ga</code></td>
                <td>Στατιστικό</td>
                <td>2 έτη</td>
                <td>Google Analytics — διάκριση μοναδικών επισκεπτών (εφόσον έχετε δώσει συγκατάθεση)</td>
              </tr>
              <tr>
                <td><code>_ga_*</code></td>
                <td>Στατιστικό</td>
                <td>2 έτη</td>
                <td>Google Analytics — διατήρηση κατάστασης συνεδρίας</td>
              </tr>
              <tr>
                <td><code>session</code></td>
                <td>Αναγκαίο</td>
                <td>Συνεδρία</td>
                <td>Λειτουργία εφαρμογής — λήγει με το κλείσιμο του browser</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="legal-section">
        <h2>4. Διαχείριση Cookies από τον Browser σας</h2>
        <p>Μπορείτε να ελέγξετε ή να διαγράψετε cookies μέσω των ρυθμίσεων του προγράμματος περιήγησής σας:</p>
        <ul>
          <li><strong>Google Chrome:</strong> Ρυθμίσεις → Απόρρητο και ασφάλεια → Cookies και άλλα δεδομένα ιστοτόπων</li>
          <li><strong>Mozilla Firefox:</strong> Ρυθμίσεις → Απόρρητο &amp; Ασφάλεια → Cookies και δεδομένα ιστοτόπων</li>
          <li><strong>Safari:</strong> Προτιμήσεις → Απόρρητο → Διαχείριση δεδομένων ιστοτόπου</li>
          <li><strong>Microsoft Edge:</strong> Ρυθμίσεις → Cookies και δεδομένα ιστοτόπου</li>
        </ul>
        <div className="legal-highlight">
          Η απενεργοποίηση των αναγκαίων cookies ενδέχεται να επηρεάσει τη σωστή λειτουργία της Υπηρεσίας.
        </div>
        <p>Μπορείτε επίσης να ανακαλέσετε ή να αλλάξετε τη συγκατάθεσή σας για cookies ανά πάσα στιγμή, κάνοντας κλικ στο σχετικό κουμπί που εμφανίζεται στη βάση της σελίδας.</p>
      </div>

      <div className="legal-section">
        <h2>5. Αλλαγές στην Πολιτική Cookies</h2>
        <p>Ενδέχεται να τροποποιούμε την παρούσα Πολιτική Cookies όταν εισάγουμε νέες λειτουργίες ή αλλάζουν οι κανονιστικές απαιτήσεις. Η ημερομηνία τελευταίας ενημέρωσης εμφανίζεται στην κορυφή της σελίδας.</p>
        <p>Για οποιαδήποτε απορία: Δείτε επίσης την <Link to="/privacy">Πολιτική Απορρήτου</Link>.</p>
      </div>
    </motion.div>
  </div>
);

export default CookiesPage;
