import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './BookDemoPage.css';

const BookDemoPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: '', org: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect email service
    setSubmitted(true);
  };

  return (
    <div className="bdp-page">
      <section className="bdp-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bdp-eyebrow">30′ Demo</span>
            <h1>Αρχίστε τον διάλογο.</h1>
            <p className="bdp-hero-sub">Μία 30λεπτη συνάντηση για να δείτε πώς το SimaHermes AI θα εξυπηρετήσει τον οργανισμό σας.</p>
          </motion.div>
        </div>
      </section>

      <section className="bdp-form-section" ref={ref}>
        <div className="container">
          <div className="bdp-two-col">
            <motion.div className="bdp-left"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>Τι θα δείτε</h2>
              <ul className="bdp-list">
                <li>Σε ποιον απευθύνεται το SimaHermes AI</li>
                <li>Live αποδεικτικό με πραγματικές ερωτήσεις</li>
                <li>Αρχιτεκτονική EU AI Act συμβατότητα</li>
                <li>Τιμολόγιο ταιριασμένο για τον οργανισμό σας</li>
              </ul>
              <p className="bdp-note">contact@simasiaai.gr</p>
            </motion.div>

            <motion.div className="bdp-right"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {submitted ? (
                <div className="bdp-success">
                  <h3>Ευχαριστούμε!</h3>
                  <p>Θα επικοινωνήσουμε μαζί σας σύντομα.</p>
                </div>
              ) : (
                <form className="bdp-form" onSubmit={handleSubmit}>
                  <div className="bdp-field">
                    <label htmlFor="name">Όνομα</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Κώστας Παπαδόπουλος" />
                  </div>
                  <div className="bdp-field">
                    <label htmlFor="org">Οργανισμός</label>
                    <input id="org" name="org" type="text" required value={form.org} onChange={handleChange} placeholder="Ονομασία Οργανισμού" />
                  </div>
                  <div className="bdp-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@org.gr" />
                  </div>
                  <div className="bdp-field">
                    <label htmlFor="message">Μήνυμα (προαιρετικό)</label>
                    <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Περιγράψτε συνοπτικά την ανάγκη σας..." />
                  </div>
                  <button type="submit" className="bdp-submit">Αίτηση Demo</button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDemoPage;
