import React from 'react';
import './Technology.css';

const Technology = () => {
  return (
    <section className="technology" id="technology">
      <div className="container">
        <h2 className="section-title">Πώς Λειτουργεί το AI μας</h2>
        <p className="section-subtitle">Διαφανής, αξιόπιστη και ανθρωποκεντρική τεχνολογία</p>
        
        <div className="tech-diagram">
          <div className="tech-flow">
            <div className="tech-step">
              <div className="tech-circle">📥</div>
              <h4>Είσοδος</h4>
              <p>Λαμβάνουμε τις ανάγκες και τα ερωτήματα του χρήστη</p>
            </div>
            
            <div className="tech-step">
              <div className="tech-circle">🧠</div>
              <h4>Επεξεργασία</h4>
              <p>Το AI αναλύει και κατανοεί το πλαίσιο</p>
            </div>
            
            <div className="tech-step">
              <div className="tech-circle">💬</div>
              <h4>Διάλογος</h4>
              <p>Φυσική συνομιλία με ενσυναίσθηση</p>
            </div>
            
            <div className="tech-step">
              <div className="tech-circle">✨</div>
              <h4>Λύση</h4>
              <p>Παρέχουμε προσαρμοσμένη υποστήριξη</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;

