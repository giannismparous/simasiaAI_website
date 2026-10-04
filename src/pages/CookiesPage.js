import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './LegalPage.css';

const ease = [0.16, 1, 0.3, 1];

const CookiesEl = () => (
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
            <strong>Τελευταία ενημέρωση:</strong> 3 Οκτωβρίου 2026 &nbsp;·&nbsp; Οδηγία ePrivacy 2002/58/ΕΚ &nbsp;·&nbsp; GDPR
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
        <p>Ο ιστότοπός μας χρησιμοποιεί επίσης τις τεχνολογίες <strong>localStorage</strong> και <strong>sessionStorage</strong> του προγράμματος περιήγησης για την αποθήκευση προτιμήσεων (π.χ. επιλογή για τα cookies, γλώσσα). Οι συνομιλίες με το DialogosAI δεν αποθηκεύονται στον browser σας.</p>
      </div>

      <div className="legal-section">
        <h2>2. Κατηγορίες Cookies που Χρησιμοποιούμε</h2>
        <ul>
          <li><strong>Αναγκαία:</strong> Απαραίτητα για τη βασική λειτουργία της Υπηρεσίας. Δεν απαιτούν συγκατάθεση.</li>
          <li><strong>Λειτουργικά:</strong> Αποθηκεύουν τις επιλογές σας (γλώσσα, προτιμήσεις) για καλύτερη εμπειρία.</li>
          <li><strong>Στατιστικά / Αναλυτικά:</strong> Μας βοηθούν να κατανοήσουμε πώς χρησιμοποιείται η Υπηρεσία (Google Analytics 4). Απαιτούν τη συγκατάθεσή σας: το Google Analytics φορτώνεται μόνο αφού επιλέξετε «Αποδοχή Όλων». Τα δεδομένα αναλυτικής διατηρούνται στο Google Analytics έως 14 μήνες.</li>
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
                <td>Αναγκαίο (localStorage)</td>
                <td>Έως ότου αλλάξετε την επιλογή σας ή διαγράψετε τα δεδομένα του browser</td>
                <td>Αποθήκευση της επιλογής σας για τα cookies (<code>all</code> ή <code>necessary</code>)</td>
              </tr>
              <tr>
                <td><code>language</code></td>
                <td>Λειτουργικό (localStorage)</td>
                <td>Έως ότου διαγράψετε τα δεδομένα του browser</td>
                <td>Αποθήκευση επιλογής γλώσσας (ΕΛ / EN)</td>
              </tr>
              <tr>
                <td><code>simasia-pyxida-billing-cycle</code>, <code>simasia-pyxida-annual-hint-seen</code></td>
                <td>Λειτουργικό (sessionStorage)</td>
                <td>Συνεδρία — διαγράφεται με το κλείσιμο της καρτέλας</td>
                <td>Απομνημόνευση της προβολής τιμών (μηνιαία / ετήσια) στη σελίδα τιμολόγησης</td>
              </tr>
              <tr>
                <td><code>_ga</code></td>
                <td>Στατιστικό (cookie Google Analytics 4)</td>
                <td>2 έτη</td>
                <td>Διάκριση μοναδικών επισκεπτών. Τίθεται μόνο εφόσον επιλέξετε «Αποδοχή Όλων».</td>
              </tr>
              <tr>
                <td><code>_ga_&lt;ID&gt;</code></td>
                <td>Στατιστικό (cookie Google Analytics 4)</td>
                <td>2 έτη</td>
                <td>Διατήρηση της κατάστασης της συνεδρίας. Τίθεται μόνο εφόσον επιλέξετε «Αποδοχή Όλων».</td>
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
        <p>Μπορείτε επίσης να ανακαλέσετε ή να αλλάξετε τη συγκατάθεσή σας για cookies ανά πάσα στιγμή, μέσω του κουμπιού «Ρυθμίσεις cookies» στο κάτω μέρος κάθε σελίδας. Αν ανακαλέσετε τη συγκατάθεσή σας, η συλλογή στατιστικών σταματά και τα cookies <code>_ga</code> διαγράφονται.</p>
      </div>

      <div className="legal-section">
        <h2>5. Αλλαγές στην Πολιτική Cookies</h2>
        <p>Ενδέχεται να τροποποιούμε την παρούσα Πολιτική Cookies όταν εισάγουμε νέες λειτουργίες ή αλλάζουν οι κανονιστικές απαιτήσεις. Η ημερομηνία τελευταίας ενημέρωσης εμφανίζεται στην κορυφή της σελίδας.</p>
        <p>Για οποιαδήποτε απορία: Δείτε επίσης την <Link to="/privacy">Πολιτική Απορρήτου</Link>.</p>
      </div>
    </motion.div>
  </div>
);

const CookiesEn = () => (
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
            Cookie Policy
          </motion.h1>
          <p className="legal-meta">
            <strong>Last updated:</strong> 3 October 2026 &nbsp;·&nbsp; ePrivacy Directive 2002/58/EC &nbsp;·&nbsp; GDPR
          </p>
        </div>
      </div>
    </section>

    <motion.div className="legal-body"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: 0.15 }}>

      <div className="legal-section">
        <h2>1. What Cookies Are</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work properly, to improve the user experience and to provide information to site operators.</p>
        <p>Our website also uses the browser’s <strong>localStorage</strong> and <strong>sessionStorage</strong> technologies to store preferences (e.g. your cookie choice, language). Conversations with DialogosAI are not stored in your browser.</p>
      </div>

      <div className="legal-section">
        <h2>2. Categories of Cookies We Use</h2>
        <ul>
          <li><strong>Necessary:</strong> Required for the basic operation of the Service. They do not require consent.</li>
          <li><strong>Functional:</strong> Store your choices (language, preferences) for a better experience.</li>
          <li><strong>Statistics / Analytics:</strong> Help us understand how the Service is used (Google Analytics 4). They require your consent: Google Analytics is loaded only after you choose “Accept all”. Analytics data is retained in Google Analytics for up to 14 months.</li>
          <li><strong>Marketing:</strong> We do not currently use marketing / third-party cookies for advertising purposes.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Detailed List of Cookies</h2>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>simasiaai_cookie_consent</code></td>
                <td>Necessary (localStorage)</td>
                <td>Until you change your choice or clear your browser data</td>
                <td>Stores your cookie choice (<code>all</code> or <code>necessary</code>)</td>
              </tr>
              <tr>
                <td><code>language</code></td>
                <td>Functional (localStorage)</td>
                <td>Until you clear your browser data</td>
                <td>Stores your language choice (EL / EN)</td>
              </tr>
              <tr>
                <td><code>simasia-pyxida-billing-cycle</code>, <code>simasia-pyxida-annual-hint-seen</code></td>
                <td>Functional (sessionStorage)</td>
                <td>Session — deleted when the tab is closed</td>
                <td>Remembers the price view (monthly / annual) on the pricing page</td>
              </tr>
              <tr>
                <td><code>_ga</code></td>
                <td>Statistics (Google Analytics 4 cookie)</td>
                <td>2 years</td>
                <td>Distinguishes unique visitors. Set only if you choose “Accept all”.</td>
              </tr>
              <tr>
                <td><code>_ga_&lt;ID&gt;</code></td>
                <td>Statistics (Google Analytics 4 cookie)</td>
                <td>2 years</td>
                <td>Maintains session state. Set only if you choose “Accept all”.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="legal-section">
        <h2>4. Managing Cookies in Your Browser</h2>
        <p>You can control or delete cookies through your browser settings:</p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
          <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
          <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions</li>
        </ul>
        <div className="legal-highlight">
          Disabling necessary cookies may affect the proper operation of the Service.
        </div>
        <p>You can also withdraw or change your cookie consent at any time using the “Cookie settings” button at the bottom of every page. If you withdraw your consent, analytics collection stops and the <code>_ga</code> cookies are deleted.</p>
      </div>

      <div className="legal-section">
        <h2>5. Changes to this Cookie Policy</h2>
        <p>We may amend this Cookie Policy when we introduce new features or when regulatory requirements change. The last updated date is shown at the top of the page.</p>
        <p>For any questions, please also see the <Link to="/privacy">Privacy Policy</Link>.</p>
        <p>This English text is a translation for convenience. In case of any discrepancy, the Greek text prevails.</p>
      </div>
    </motion.div>
  </div>
);

const CookiesPage = () => {
  const { language } = useLanguage();
  return language === 'en' ? <CookiesEn /> : <CookiesEl />;
};

export default CookiesPage;
