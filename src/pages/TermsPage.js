import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './LegalPage.css';

const ease = [0.16, 1, 0.3, 1];

const TermsEl = () => (
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
            Όροι Χρήσης
          </motion.h1>
          <p className="legal-meta">
            <strong>Τελευταία ενημέρωση:</strong> 3 Οκτωβρίου 2026
          </p>
        </div>
      </div>
    </section>

    <motion.div className="legal-body"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: 0.15 }}>

      <div className="legal-section">
        <h2>1. Γενικά — Αποδοχή Όρων</h2>
        <p>Η πρόσβαση και η χρήση του διαδικτυακού τόπου <strong>simasiaai.gr</strong> και των υπηρεσιών που παρέχονται μέσω αυτού προϋποθέτουν την ανεπιφύλακτη αποδοχή των παρόντων Όρων Χρήσης από κάθε επισκέπτη ή χρήστη. Εάν δεν αποδέχεστε τους παρόντες όρους, παρακαλείστε να μην κάνετε χρήση της Υπηρεσίας.</p>
        <p>Η Εταιρεία διατηρεί το δικαίωμα να τροποποιεί οποτεδήποτε τους παρόντες Όρους χωρίς προηγούμενη προειδοποίηση του χρήστη. Η συνέχιση της χρήσης της Υπηρεσίας μετά από οποιαδήποτε τροποποίηση συνιστά αποδοχή των νέων όρων.</p>
      </div>

      <div className="legal-section">
        <h2>2. Ορισμοί</h2>
        <ul>
          <li><strong>«Υπηρεσία»</strong>: ο διαδικτυακός τόπος simasiaai.gr και το σύνολο των ψηφιακών υπηρεσιών της Εταιρείας, συμπεριλαμβανομένης της πλατφόρμας fλow και των συστημάτων DialogosAI, PraxisAI και MetronAI.</li>
          <li><strong>«Εταιρεία»</strong>: η εταιρεία με την επωνυμία <em>«Σημασία-ΑΙ Ιδιωτική Κεφαλαιουχική Εταιρεία»</em> και διακριτικό τίτλο <em>«Σημασία-ΑΙ Ι.Κ.Ε.»</em> (SimasiaAI P.C.), με έδρα επί της οδού Ναρκίσσου 26, 15452 Παλαιό Ψυχικό, Αττική, αριθμό Γ.Ε.ΜΗ. 188174403000, ΑΦΜ 803048250, ΔΟΥ ΚΕΦΟΔΕ Αττικής.</li>
          <li><strong>«Χρήστης»</strong>: κάθε φυσικό ή νομικό πρόσωπο που επισκέπτεται ή χρησιμοποιεί την Υπηρεσία.</li>
          <li><strong>«Συστήματα ΤΝ»</strong>: τα συστήματα τεχνητής νοημοσύνης της Εταιρείας, ιδίως το DialogosAI (ψηφιακός βοηθός συνομιλίας), καθώς και οι λειτουργίες ΤΝ του PraxisAI και του MetronAI.</li>
          <li><strong>«Απαντήσεις»</strong>: κάθε κείμενο, σύνοψη, πρόταση ή άλλο αποτέλεσμα που παράγεται αυτόματα από τα Συστήματα ΤΝ.</li>
          <li><strong>«Περιεχόμενο»</strong>: κείμενα, εικόνες, γραφικά, λογισμικό, βάσεις δεδομένων και κάθε άλλο υλικό που εμφανίζεται στην Υπηρεσία.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Χρήση της Υπηρεσίας</h2>
        <p>Ο Χρήστης δεσμεύεται να κάνει χρήση της Υπηρεσίας αποκλειστικά για νόμιμους σκοπούς και με τρόπο που δεν παραβιάζει δικαιώματα τρίτων. Απαγορεύεται ρητά:</p>
        <ul>
          <li>Η αντιγραφή, αναπαραγωγή ή αναδιανομή Περιεχομένου χωρίς γραπτή άδεια της Εταιρείας.</li>
          <li>Η χρήση αυτοματοποιημένων μεθόδων (bots, scrapers) άντλησης δεδομένων.</li>
          <li>Η προσπάθεια παράκαμψης μέτρων ασφαλείας του συστήματος.</li>
          <li>Η μετάδοση περιεχομένου επιβλαβούς, παράνομου ή προσβλητικού χαρακτήρα.</li>
          <li>Η χρήση της Υπηρεσίας κατά τρόπο που δύναται να βλάψει, απενεργοποιήσει ή υπερφορτώσει τους διακομιστές της Εταιρείας.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. Πνευματική Ιδιοκτησία</h2>
        <p>Το σύνολο του Περιεχομένου της Υπηρεσίας — συμπεριλαμβανομένων λογοτύπων, σχεδιαστικών στοιχείων, κειμένων, βάσεων δεδομένων και λογισμικού — αποτελεί πνευματική ιδιοκτησία της <strong>Σημασία-ΑΙ Ι.Κ.Ε.</strong> ή τρίτων αδειοδοτών και προστατεύεται από την ελληνική και ενωσιακή νομοθεσία περί πνευματικής ιδιοκτησίας.</p>
        <p>Απαγορεύεται η χρήση εμπορικών σημάτων και λογοτύπων της Εταιρείας χωρίς την έγγραφη συναίνεσή της.</p>
      </div>

      <div className="legal-section">
        <h2>5. Συστήματα Τεχνητής Νοημοσύνης — Ειδική Δήλωση</h2>
        <div className="legal-highlight">
          Το DialogosAI και τα λοιπά συστήματα ΤΝ της Εταιρείας παρέχουν πληροφορίες γενικού πληροφοριακού χαρακτήρα. <strong>Δεν υποκαθιστούν επαγγελματική ιατρική, νομική ή χρηματοοικονομική συμβουλή.</strong> Για την ακρίβεια των απαντήσεων και τα όρια ευθύνης της Εταιρείας, βλ. την ενότητα 6.
        </div>
        <p>Η λειτουργία των συστημάτων ΤΝ της Εταιρείας σχεδιάζεται και παρακολουθείται με σκοπό τη συμμόρφωση με τον Κανονισμό (ΕΕ) 2024/1689 για την τεχνητή νοημοσύνη (EU AI Act), τον Κανονισμό (ΕΕ) 2016/679 (ΓΚΠΔ / GDPR) και την κείμενη ελληνική και ενωσιακή νομοθεσία.</p>
      </div>

      <div className="legal-section" id="ai-accuracy">
        <h2>6. Ακρίβεια απαντήσεων των συστημάτων Τεχνητής Νοημοσύνης</h2>
        <p><strong>Διαφάνεια.</strong> Σύμφωνα με τον Κανονισμό (ΕΕ) 2024/1689 (AI Act), ενημερώνεστε ότι, όταν συνομιλείτε με το DialogosAI ή με άλλο σύστημα ΤΝ της Εταιρείας, αλληλεπιδράτε με σύστημα τεχνητής νοημοσύνης και όχι με άνθρωπο.</p>
        <p><strong>Αυτόματη παραγωγή.</strong> Οι Απαντήσεις δημιουργούνται αυτόματα και σε πραγματικό χρόνο, με τη χρήση μοντέλων τεχνητής νοημοσύνης. Λόγω της πιθανοκρατικής φύσης της τεχνολογίας αυτής, οι Απαντήσεις ενδέχεται να είναι ανακριβείς, ελλιπείς ή παρωχημένες και να μην αντανακλούν τις πιο πρόσφατες πληροφορίες, ακόμη και όταν διατυπώνονται με βεβαιότητα.</p>
        <p><strong>Εγκεκριμένες πηγές και ανθρώπινος έλεγχος.</strong> Τα συστήματα ΤΝ της Εταιρείας έχουν σχεδιαστεί ώστε να απαντούν μόνο βάσει των πηγών που έχει εγκρίνει κάθε συνεργαζόμενος οργανισμός, και ο άνθρωπος παραμένει σε έλεγχο: οι ουσιώδεις ενέργειες και αποφάσεις ανήκουν πάντοτε στους αρμόδιους ανθρώπους του οργανισμού. Ο σχεδιασμός αυτός περιορίζει, αλλά δεν αποκλείει, την πιθανότητα σφάλματος.</p>
        <p><strong>Τι πρέπει να κάνει ο Χρήστης.</strong></p>
        <ul>
          <li>Να μη βασίζεται στις Απαντήσεις ως μοναδική πηγή αλήθειας ή πραγματικών πληροφοριών.</li>
          <li>Να μη χρησιμοποιεί τις Απαντήσεις ως υποκατάστατο επαγγελματικής συμβουλής (ιατρικής, νομικής, χρηματοοικονομικής ή άλλης).</li>
          <li>Να επαληθεύει κάθε σημαντική πληροφορία με κατάλληλα αδειοδοτημένο επαγγελματία ή απευθείας με τον οικείο οργανισμό, πριν προβεί σε οποιαδήποτε ενέργεια.</li>
        </ul>
        <div className="legal-highlight">
          <strong>Σε περίπτωση έκτακτης ανάγκης μην χρησιμοποιείτε το chatbot.</strong> Καλέστε αμέσως το <strong>112</strong> (Ευρωπαϊκός Αριθμός Έκτακτης Ανάγκης) ή το <strong>166</strong> (ΕΚΑΒ).
        </div>
        <p><strong>Περιορισμός ευθύνης.</strong> Στον μέγιστο βαθμό που επιτρέπεται από το εφαρμοστέο δίκαιο, η Εταιρεία δεν φέρει ευθύνη για αποφάσεις ή ενέργειες που λαμβάνονται αποκλειστικά βάσει των Απαντήσεων των συστημάτων ΤΝ. Ο περιορισμός αυτός δεν θίγει την ευθύνη της Εταιρείας για δόλο ή βαριά αμέλεια, ούτε δικαιώματα που ο Χρήστης έχει ως καταναλωτής βάσει αναγκαστικού δικαίου.</p>
      </div>

      <div className="legal-section">
        <h2>7. Νομική αξιολόγηση και συμμόρφωση</h2>
        <p>Κάθε έργο της Εταιρείας αξιολογείται χωριστά από συνεργαζόμενη νομική εταιρεία. Η συμμόρφωση με τον Κανονισμό (ΕΕ) 2024/1689 (EU AI Act) και τον Κανονισμό (ΕΕ) 2016/679 (ΓΚΠΔ / GDPR) αποτελεί ύψιστη προτεραιότητα για την Εταιρεία. Για την επεξεργασία προσωπικών δεδομένων, βλ. την <Link to="/privacy">Πολιτική Απορρήτου</Link>.</p>
      </div>

      <div className="legal-section">
        <h2>8. Αποποίηση Ευθύνης</h2>
        <p>Η Υπηρεσία παρέχεται «ως έχει» χωρίς οποιασδήποτε μορφής εγγύηση, ρητή ή σιωπηρή. Η Εταιρεία δεν εγγυάται την αδιάλειπτη, αλάνθαστη ή ασφαλή λειτουργία της Υπηρεσίας.</p>
        <p>Στον μέγιστο βαθμό που επιτρέπεται από το εφαρμοστέο δίκαιο, η Εταιρεία δεν ευθύνεται για οποιαδήποτε άμεση, έμμεση, τυχαία, ειδική ή παρεπόμενη ζημία που προκύπτει από τη χρήση ή την αδυναμία χρήσης της Υπηρεσίας, με την επιφύλαξη της ευθύνης της για δόλο ή βαριά αμέλεια.</p>
      </div>

      <div className="legal-section">
        <h2>9. Σύνδεσμοι προς Τρίτους</h2>
        <p>Η Υπηρεσία ενδέχεται να περιλαμβάνει συνδέσμους (links) προς δικτυακούς τόπους τρίτων. Οι σύνδεσμοι αυτοί παρέχονται αποκλειστικά για διευκόλυνση των Χρηστών. Η Εταιρεία δεν ελέγχει το περιεχόμενο των εν λόγω ιστοτόπων και δεν φέρει ευθύνη για αυτό.</p>
      </div>

      <div className="legal-section">
        <h2>10. Εφαρμοστέο Δίκαιο — Δικαιοδοσία</h2>
        <p>Οι παρόντες Όροι Χρήσης διέπονται από το Ελληνικό Δίκαιο. Για κάθε διαφορά που ανακύπτει από ή σε σχέση με τους παρόντες Όρους αρμόδια ορίζονται τα Δικαστήρια Αθηνών.</p>
        <p>Σε περίπτωση που κάποια διάταξη των παρόντων Όρων κριθεί άκυρη ή ανεφάρμοστη, η εν λόγω διάταξη θεωρείται ότι αντικαθίσταται από έγκυρη διάταξη που πλησιάζει περισσότερο στο οικονομικό αποτέλεσμα της ακυρωθείσας, ενώ οι υπόλοιποι Όροι παραμένουν σε πλήρη ισχύ.</p>
      </div>

      <div className="legal-section">
        <h2>11. Επικοινωνία</h2>
        <p>Για οποιαδήποτε ερώτηση ή παρατήρηση σχετικά με τους παρόντες Όρους Χρήσης, μπορείτε να επικοινωνήσετε με την Εταιρεία:</p>
        <p>
          <strong>Σημασία-ΑΙ Ιδιωτική Κεφαλαιουχική Εταιρεία</strong> (Σημασία-ΑΙ Ι.Κ.Ε.)<br />
          Έδρα: Ναρκίσσου 26, 15452 Παλαιό Ψυχικό, Αττική<br />
          Αρ. Γ.Ε.ΜΗ.: 188174403000 &nbsp;|&nbsp; ΑΦΜ: 803048250, ΔΟΥ ΚΕΦΟΔΕ Αττικής<br />
          Email: <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>
        </p>
      </div>
    </motion.div>
  </div>
);

const TermsEn = () => (
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
            Terms of Use
          </motion.h1>
          <p className="legal-meta">
            <strong>Last updated:</strong> 3 October 2026
          </p>
        </div>
      </div>
    </section>

    <motion.div className="legal-body"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease, delay: 0.15 }}>

      <div className="legal-section">
        <h2>1. General — Acceptance of the Terms</h2>
        <p>Access to and use of the website <strong>simasiaai.gr</strong> and of the services provided through it are subject to the unconditional acceptance of these Terms of Use by every visitor or user. If you do not accept these terms, please do not use the Service.</p>
        <p>The Company reserves the right to amend these Terms at any time without prior notice to the user. Continued use of the Service after any amendment constitutes acceptance of the new terms.</p>
      </div>

      <div className="legal-section">
        <h2>2. Definitions</h2>
        <ul>
          <li><strong>“Service”</strong>: the website simasiaai.gr and all digital services of the Company, including the fλow platform and the DialogosAI, PraxisAI and MetronAI systems.</li>
          <li><strong>“Company”</strong>: the company with the corporate name <em>“Σημασία-ΑΙ Ιδιωτική Κεφαλαιουχική Εταιρεία”</em> and distinctive title <em>“Σημασία-ΑΙ Ι.Κ.Ε.”</em> (SimasiaAI P.C., a Greek private company), with its registered office at Narkissou 26, 15452 Palaio Psychiko, Attica, Greece, G.E.MI. (General Commercial Registry) no. 188174403000, VAT no. 803048250, Tax office: KEFODE Attica.</li>
          <li><strong>“User”</strong>: any natural or legal person who visits or uses the Service.</li>
          <li><strong>“AI Systems”</strong>: the Company’s artificial intelligence systems, in particular DialogosAI (conversational digital assistant), as well as the AI features of PraxisAI and MetronAI.</li>
          <li><strong>“Outputs”</strong>: any text, summary, suggestion or other result generated automatically by the AI Systems.</li>
          <li><strong>“Content”</strong>: texts, images, graphics, software, databases and any other material displayed on the Service.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Use of the Service</h2>
        <p>The User undertakes to use the Service solely for lawful purposes and in a manner that does not infringe the rights of third parties. The following are expressly prohibited:</p>
        <ul>
          <li>Copying, reproducing or redistributing Content without the Company’s written permission.</li>
          <li>Using automated methods (bots, scrapers) to extract data.</li>
          <li>Attempting to circumvent the system’s security measures.</li>
          <li>Transmitting harmful, unlawful or offensive content.</li>
          <li>Using the Service in a way that may damage, disable or overload the Company’s servers.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. Intellectual Property</h2>
        <p>All Content of the Service — including logos, design elements, texts, databases and software — is the intellectual property of <strong>Σημασία-ΑΙ Ι.Κ.Ε. (SimasiaAI P.C.)</strong> or of third-party licensors and is protected by Greek and EU intellectual property law.</p>
        <p>Use of the Company’s trademarks and logos without its written consent is prohibited.</p>
      </div>

      <div className="legal-section">
        <h2>5. Artificial Intelligence Systems — Special Statement</h2>
        <div className="legal-highlight">
          DialogosAI and the Company’s other AI systems provide information of a general informational nature. <strong>They do not replace professional medical, legal or financial advice.</strong> For the accuracy of outputs and the limits of the Company’s liability, see section 6.
        </div>
        <p>The Company’s AI systems are designed and monitored with the aim of complying with Regulation (EU) 2024/1689 on artificial intelligence (EU AI Act), Regulation (EU) 2016/679 (GDPR) and applicable Greek and EU law.</p>
      </div>

      <div className="legal-section" id="ai-accuracy">
        <h2>6. Accuracy of Artificial Intelligence Outputs</h2>
        <p><strong>Transparency.</strong> In accordance with Regulation (EU) 2024/1689 (AI Act), you are informed that when you chat with DialogosAI or any other AI system of the Company, you are interacting with an artificial intelligence system and not with a human.</p>
        <p><strong>Automatic generation.</strong> Outputs are generated automatically and in real time using artificial intelligence models. Because of the probabilistic nature of this technology, Outputs may be inaccurate, incomplete or out of date and may not reflect the latest information, even when they are phrased with confidence.</p>
        <p><strong>Approved sources and human control.</strong> The Company’s AI systems are designed to answer only on the basis of the sources approved by each partner organisation, and the human remains in control: material actions and decisions always rest with the responsible people of the organisation. This design reduces, but does not eliminate, the possibility of error.</p>
        <p><strong>What the User should do.</strong></p>
        <ul>
          <li>Do not rely on Outputs as the sole source of truth or factual information.</li>
          <li>Do not use Outputs as a substitute for professional advice (medical, legal, financial or other).</li>
          <li>Verify any important information with an appropriately qualified professional or directly with the relevant organisation before taking any action.</li>
        </ul>
        <div className="legal-highlight">
          <strong>In an emergency, do not use the chatbot.</strong> Call <strong>112</strong> (European emergency number) or <strong>166</strong> (Greek National Emergency Medical Service, EKAB) immediately.
        </div>
        <p><strong>Limitation of liability.</strong> To the maximum extent permitted by applicable law, the Company is not liable for decisions or actions taken solely on the basis of the Outputs of the AI systems. This limitation does not affect the Company’s liability for wilful misconduct or gross negligence, nor any rights the User has as a consumer under mandatory law.</p>
      </div>

      <div className="legal-section">
        <h2>7. Legal Review and Compliance</h2>
        <p>Every project of the Company is reviewed separately by a partner law firm. Compliance with Regulation (EU) 2024/1689 (EU AI Act) and Regulation (EU) 2016/679 (GDPR) is a top priority for the Company. For the processing of personal data, see the <Link to="/privacy">Privacy Policy</Link>.</p>
      </div>

      <div className="legal-section">
        <h2>8. Disclaimer</h2>
        <p>The Service is provided “as is”, without any warranty of any kind, express or implied. The Company does not guarantee that the Service will operate uninterrupted, error-free or securely.</p>
        <p>To the maximum extent permitted by applicable law, the Company is not liable for any direct, indirect, incidental, special or consequential damage arising from the use of, or inability to use, the Service, without prejudice to its liability for wilful misconduct or gross negligence.</p>
      </div>

      <div className="legal-section">
        <h2>9. Links to Third Parties</h2>
        <p>The Service may contain links to third-party websites. These links are provided solely for the convenience of Users. The Company does not control the content of those websites and bears no responsibility for it.</p>
      </div>

      <div className="legal-section">
        <h2>10. Governing Law — Jurisdiction</h2>
        <p>These Terms of Use are governed by Greek law. The Courts of Athens shall have jurisdiction over any dispute arising out of or in connection with these Terms.</p>
        <p>If any provision of these Terms is held invalid or unenforceable, that provision shall be deemed replaced by a valid provision that comes closest to the economic effect of the invalidated one, while the remaining Terms remain in full force.</p>
      </div>

      <div className="legal-section">
        <h2>11. Contact</h2>
        <p>For any question or comment about these Terms of Use, you can contact the Company:</p>
        <p>
          <strong>Σημασία-ΑΙ Ιδιωτική Κεφαλαιουχική Εταιρεία</strong> (SimasiaAI P.C.)<br />
          Registered office: Narkissou 26, 15452 Palaio Psychiko, Attica, Greece<br />
          G.E.MI. no.: 188174403000 &nbsp;|&nbsp; VAT no.: 803048250, Tax office: KEFODE Attica<br />
          Email: <a href="mailto:contact@simasiaai.gr">contact@simasiaai.gr</a>
        </p>
        <p>This English text is a translation for convenience. In case of any discrepancy, the Greek text prevails.</p>
      </div>
    </motion.div>
  </div>
);

const TermsPage = () => {
  const { language } = useLanguage();
  return language === 'en' ? <TermsEn /> : <TermsEl />;
};

export default TermsPage;
