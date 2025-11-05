import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    organizationType: '',
    companyName: '',
    description: '',
    attachment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // EmailJS configuration
      // You'll need to set these up in your EmailJS account
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        organization_type: formData.organizationType,
        company_name: formData.companyName || formData.organization || 'N/A',
        message: formData.description || 'N/A',
        attachment: formData.attachment || 'N/A',
        to_email: 'simasia.ai@gmail.com',
        reply_to: formData.email
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setSubmitStatus({ 
        type: 'success', 
        message: 'Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.' 
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        organizationType: '',
        companyName: '',
        description: '',
        attachment: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Υπήρξε πρόβλημα με την αποστολή. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας στο simasia.ai@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section" id="contact">
      <div className="container">
        <h2 className="section-title">Φόρμα Επικοινωνίας</h2>
        <p className="form-subtitle">Προτείνετέ μας τη λύση που οραματίζεστε να συνδημιουργήσουμε. Απαντάμε εντός 24 ωρών.</p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Όνομα *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Επίθετο *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="organizationType">Φορέας/Ιδιότητα *</label>
              <select
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                required
              >
                <option value="">Επιλέξτε...</option>
                <option value="Επιχείρηση">Επιχείρηση</option>
                <option value="Οργανισμός">Οργανισμός</option>
                <option value="Φορέας">Φορέας</option>
                <option value="Άλλο">Άλλο</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Επωνυμία</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Σύντομη περιγραφή ανάγκης/ιδέας</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Περιγράψτε την ανάγκη σας ή τη λύση που οραματίζεστε..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="attachment">(Προαιρετικά) Αρχείο/Σύνδεσμος</label>
            <input
              type="url"
              id="attachment"
              name="attachment"
              value={formData.attachment}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Αποστολή...' : 'Αποστολή αιτήματος'}
          </button>
          
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--gray-medium)', textAlign: 'center' }}>
            Με την υποβολή συμφωνείτε ότι θα επικοινωνήσουμε για το αίτημά σας. Τα στοιχεία σας δεν κοινοποιούνται σε τρίτους.
          </p>

          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`submit-message ${submitStatus.type === 'success' ? 'success' : 'error'}`}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                backgroundColor: submitStatus.type === 'success' 
                  ? 'rgba(44, 122, 123, 0.1)' 
                  : 'rgba(224, 120, 86, 0.1)',
                color: submitStatus.type === 'success' 
                  ? 'var(--primary-warm)' 
                  : 'var(--accent-warm)',
                fontWeight: '500'
              }}
            >
              {submitStatus.message}
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

