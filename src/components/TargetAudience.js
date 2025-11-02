import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SmoothReveal } from './TextReveal';
import './TargetAudience.css';

const TargetAudience = () => {
  const [activeTab, setActiveTab] = useState('vulnerable-groups');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const tabs = [
    { id: 'vulnerable-groups', label: 'Οργανισμοί με ευάλωτες ομάδες' },
    { id: 'businesses', label: 'Επιχειρήσεις' },
    { id: 'content', label: 'Εκδοτικοί οίκοι / Μεταφραστές' },
    { id: 'b2c', label: 'B2C' }
  ];

  return (
    <section className="target-audience" id="target-audience">
      <div className="container">
        <SmoothReveal delay={0.2} yOffset={20}>
          <h2 className="section-title">Σε ποιους απευθυνόμαστε</h2>
        </SmoothReveal>

        <motion.div 
          className="audience-tabs"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`audience-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Vulnerable Groups Tab */}
        {activeTab === 'vulnerable-groups' && (
          <motion.div
            key="vulnerable-groups"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="audience-section">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Αν είστε εταιρεία, οργανισμός ή επαγγελματίας που απευθύνεται σε ευάλωτες ομάδες</h3>
              </SmoothReveal>
              
              <div className="vulnerable-list" style={{ marginTop: '2rem' }}>
                <SmoothReveal delay={0.15} yOffset={10}>
                  <p>Όπως:</p>
                </SmoothReveal>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li>Άτομα με αναπηρίες ή χρόνια νοσήματα</li>
                  <li>Άτομα που υφίστανται σωματική ή ψυχική κακοποίηση (π.χ. γυναίκες, ΛΟΑΤΚΙ+, έφηβοι/ες σε δυσλειτουργικά περιβάλλοντα)</li>
                  <li>Άτομα που υφίστανται ρατσισμό (πρόσφυγες/ισσες, μετανάστες/τριες) και δεν μιλούν ελληνικά</li>
                  <li>Άτομα με ψυχικά νοσήματα</li>
                  <li>Άτομα που αντιμετωπίζουν στιγμές κρίσης</li>
                </ul>
              </div>

              <div className="challenges-section" style={{ marginTop: '2.5rem' }}>
                <SmoothReveal delay={0.2} yOffset={10}>
                  <h4>Αν αντιμετωπίζετε:</h4>
                </SmoothReveal>
                
                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Δυσκολία στη διάδοση έγκυρης πληροφορίας</h5>
                  <p>Η ενημέρωση των ευάλωτων ομάδων είναι συχνά διάσπαρτη, δύσκολη να ελεγχθεί και μπορεί να αλλοιώνεται από παραπληροφόρηση online.</p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Έλλειψη ανθρώπινων πόρων</h5>
                  <p>Δεν υπάρχει πάντα διαθέσιμο προσωπικό να απαντά σε ερωτήσεις 24/7.</p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Δυσκολία συνέπειας στο μήνυμα</h5>
                  <p>Διαφορετικοί άνθρωποι απαντούν διαφορετικά — το μήνυμα δεν είναι πάντα ομοιόμορφο.</p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Ανάγκη για εκπαίδευση και ευαισθητοποίηση</h5>
                  <p>Χρειάζεστε συχνή επικαιροποίηση των πληροφοριών που παρέχετε και συνεχή εκπαίδευση τόσο των ευάλωτων ατόμων όσο και του περιβάλλοντός τους.</p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Έλλειψη εμπιστοσύνης στην τεχνητή νοημοσύνη</h5>
                  <p>Φοβάστε ότι θα παραπληροφορήσει ή θα εκφράσει λάθος αξίες.</p>
                </div>
              </div>

              <div className="solution-highlight" style={{ marginTop: '2.5rem', padding: '2rem', background: 'var(--light-bg)', borderRadius: '12px' }}>
                <SmoothReveal delay={0.25} yOffset={10}>
                  <h4>👉 Τα chatbots μας λειτουργούν 24/7 και:</h4>
                </SmoothReveal>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li>Προσφέρουν εναλλακτικές επιλογές πρόσβασης για άτομα με αναπηρίες</li>
                  <li>Μιλούν όλες τις ευρωπαϊκές και μεγάλες γλώσσες (κινέζικα –μανδαρινικά και καντονέζικα–, ιαπωνικά, κορέατικα, αραβικά, χίντι, μπενγκάλι, πακιστάνι, φαρσί, σουαχίλι), καθώς και ελληνικές διαλέκτους όπως τα κυπριακά και τα ποντιακά</li>
                  <li>Έχουν ελαχιστοποιημένες προκαταλήψεις φύλου, έμφυλων ταυτοτήτων, σεξουαλικότητας, σωματικής/ψυχικής κατάστασης, εθνικής καταγωγής, τάξης</li>
                  <li>Εκπαιδεύονται με βάση τις δικές σας τεκμηριωμένες πηγές καθώς και τα κείμενα/εγχειρίδια/guidelines που θα μας υποδείξετε</li>
                  <li>Απαντούν βασισμένα σε εγκεκριμένο περιεχόμενο, με συνέπεια και ασφάλεια</li>
                  <li>Μπορούν να στείλουν τηλεφωνικό ή γραπτό μήνυμα σε πρόσωπο ή υπηρεσία που θα υποδειχθεί σε περίπτωση που εντοπιστεί κίνδυνος ζωής</li>
                </ul>
                <p style={{ marginTop: '1.5rem', fontWeight: '600' }}>
                  👉 Η SimasiaAI σας δίνει τον έλεγχο — το chatbot μιλά με τη φωνή και τη φιλοσοφία του ίδιου του φορέα.
                </p>
                <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                  Δώστε φωνή στη γνώση σας - ενδυναμώστε το κοινό σας
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Businesses Tab */}
        {activeTab === 'businesses' && (
          <motion.div
            key="businesses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="audience-section">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Αν είστε επιχείρηση με επικοινωνία και υποστήριξη πελατών</h3>
              </SmoothReveal>
              
              <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                (Tourism, E-shops, Real Estate, Travel Agencies, Museums, Cultural Centers, Restaurants, Tech Companies)
              </p>

              <div className="challenges-section" style={{ marginTop: '2rem' }}>
                <SmoothReveal delay={0.15} yOffset={10}>
                  <h4>Προκλήσεις:</h4>
                </SmoothReveal>
                
                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Πίεση για άμεση και συνεχή εξυπηρέτηση</h5>
                  <p>Οι πελάτες θέλουν απαντήσεις τώρα, σε κάθε γλώσσα και οποιαδήποτε ώρα.</p>
                  <p style={{ marginTop: '0.5rem' }}>
                    👉 Το chatbot της SimasiaAI απαντά άμεσα, 24/7, σε όλες τις ευρωπαϊκές και μεγάλες γλώσσες, καθώς και ελληνικές διαλέκτους.
                  </p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Υψηλό κόστος ανθρώπινου customer support</h5>
                  <p>Οι επιχειρήσεις επενδύουν σε προσωπικό για ερωτήσεις ρουτίνας.</p>
                  <p style={{ marginTop: '0.5rem' }}>
                    👉 Με το chatbot, μειώνεται το κόστος χωρίς να χάνεται η ποιότητα ή η φωνή του brand.
                  </p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Απώλεια brand consistency</h5>
                  <p>Οι διαφορετικοί υπάλληλοι απαντούν με διαφορετικό ύφος ή πληροφορίες.</p>
                  <p style={{ marginTop: '0.5rem' }}>
                    👉 Η SimasiaAI διασφαλίζει ενιαίο ύφος, γλώσσα και πολιτική επικοινωνίας.
                  </p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Πολύπλοκη πληροφόρηση ή προϊόντα</h5>
                  <p>Τουριστικά πακέτα, τεχνολογικά προϊόντα ή υπηρεσίες έχουν πολλές λεπτομέρειες.</p>
                  <p style={{ marginTop: '0.5rem' }}>
                    👉 Το chatbot βασίζεται στη γνώση της επιχείρησης και παρέχει ακριβείς απαντήσεις. Εκπαιδεύεται με βάση τη στρατηγική marketing της εταιρείας.
                  </p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Ανάγκη για συνεχή παρουσία & engagement</h5>
                  <p>Θέλουν να "είναι εκεί" για τον πελάτη τους, ακόμα κι όταν δεν είναι online.</p>
                  <p style={{ marginTop: '0.5rem' }}>
                    👉 Η SimasiaAI προσφέρει συνεχή, αξιόπιστη παρουσία που χτίζει εμπιστοσύνη. Εντοπίζει την κατάλληλη στιγμή στον διάλογο για να αναζητήσει μια θετική κριτική.
                  </p>
                </div>

                <div className="challenge-item" style={{ marginTop: '1.5rem' }}>
                  <h5>Φόβος απώλειας του ελέγχου της πληροφορίας</h5>
                  <p>Οι επιχειρήσεις δεν θέλουν ένα chatbot που "απαντά ό,τι να 'ναι".</p>
                  <p style={{ marginTop: '0.5rem' }}>
                    👉 Η SimasiaAI τους δίνει πλήρη έλεγχο πάνω στο περιεχόμενο και τη φωνή του AI.
                  </p>
                </div>
              </div>

              <p style={{ marginTop: '2rem', fontWeight: '600', textAlign: 'center' }}>
                👉 Μετατρέψτε τη γνώση σας σε έξυπνη επικοινωνία. Κλείστε τώρα τη δική σας παρουσίαση.
              </p>
            </div>
          </motion.div>
        )}

        {/* Content/Translation Tab */}
        {activeTab === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="audience-section">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Αν είστε επιχείρηση, φορέας, εκδοτικός οίκος, μεταφραστής/τρια</h3>
              </SmoothReveal>
              
              <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--light-bg)', borderRadius: '12px', textAlign: 'center' }}>
                <SmoothReveal delay={0.15} yOffset={10}>
                  <h4 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Hammer</h4>
                </SmoothReveal>
                <p>
                  Ολιστικές λύσεις για το γραφείο: Το Hammer συγκεντρώνει σε μια εφαρμογή επιμελητή κειμένου, μεταφραστή, δημιουργό QR code, μετατροπέα αρχείων και φωτογραφιών, σύνοψη βιογραφικού.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* B2C Tab */}
        {activeTab === 'b2c' && (
          <motion.div
            key="b2c"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="b2c-card">
              <SmoothReveal delay={0.1} yOffset={15}>
                <h3>Πλατφόρμα υποστήριξης εκπαιδευτικών και μαθητών</h3>
              </SmoothReveal>
              <p style={{ marginTop: '1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                (logo-link — κοστολόγηση ανά χρήση)
              </p>
              <p>
                Η πλατφόρμα έχει σχεδιαστεί για να στηρίζει την εκπαιδευτική διαδικασία: δημιουργία αξιολογήσεων για όλα τα μαθήματα και τάξεις, προσαρμογή δυσκολίας ανά μαθητή/τρια και αυτόματη διόρθωση με ανέβασμα φωτογραφίας ή PDF πραγματικού διαγωνίσματος.
              </p>
              <div className="b2c-buttons" style={{ marginTop: '2rem' }}>
                <motion.a 
                  href="#contact" 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Μάθετε περισσότερα
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Επικοινωνήστε για πρόσβαση
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TargetAudience;

