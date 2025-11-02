import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For now, we'll use mailto as a fallback
    const subject = encodeURIComponent(`Συνεργασία - ${formData.companyName || formData.organizationType}`);
    const body = encodeURIComponent(`
Όνομα: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Φορέας/Ιδιότητα: ${formData.organizationType}
Επωνυμία: ${formData.companyName || formData.organization}
Περιγραφή: ${formData.description}
    `);
    window.location.href = `mailto:info@simasia.ai?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-form-section" id="contact">
      <div className="container">
        <h2 className="section-title">Ελάτε σε επαφή μαζί μας</h2>
        <p className="form-subtitle">Συμπληρώστε την παρακάτω φόρμα. Απαντάμε εντός 24 ωρών.</p>
        
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

          <button type="submit" className="btn btn-primary submit-btn">
            Αποστολή αιτήματος
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

