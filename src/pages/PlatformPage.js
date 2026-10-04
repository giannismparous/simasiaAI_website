import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MODULES, GoLabel } from '../components/flow/modules';
import '../components/flow/GoPage.css';
import './PlatformPage.css';

/*
 * /platform: the door to the fλow client platform, where organisations and practices
 * connect DialogosAI, PraxisAI and MetronAI. When the platform is live, set
 * REACT_APP_FLOW_PLATFORM_URL (Netlify env) and this page shows the sign-in button.
 */
export const PLATFORM_URL = process.env.REACT_APP_FLOW_PLATFORM_URL || '';

const COPY = {
  el: {
    eyebrow: 'Πλατφόρμα fλow',
    title: 'Όλη η ροή σας, σε ένα σημείο.',
    lead: 'Εδώ συνδέονται οι οργανισμοί και τα ιατρεία που δουλεύουν με το fλow. Από ένα σημείο βλέπετε τι απάντησε το DialogosAI, τι κρατά το PraxisAI και τι δείχνουν τα δεδομένα στο MetronAI.',
    signIn: 'Είσοδος στην πλατφόρμα',
    soon: 'Η πλατφόρμα ανοίγει σύντομα για τους πελάτες μας.',
    client: 'Είστε ήδη πελάτης; Γράψτε μας και σας στέλνουμε πρόσβαση.',
    ask: 'Ζητήστε πρόσβαση',
    notClient: 'Δεν έχετε ακόμα fλow;',
    connect: 'συνδέεται με',
  },
  en: {
    eyebrow: 'fλow platform',
    title: 'Your whole flow, in one place.',
    lead: 'This is where organisations and practices working with fλow sign in. From one place you see what DialogosAI answered, what PraxisAI keeps, and what the data in MetronAI shows.',
    signIn: 'Sign in to the platform',
    soon: 'The platform opens to our clients soon.',
    client: 'Already a client? Write to us and we will send you access.',
    ask: 'Request access',
    notClient: 'No fλow yet?',
    connect: 'connects to',
  },
};

const PlatformPage = () => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'el';
  const c = COPY[lang];
  return (
    <div className="pf">
      <section className="pf-hero">
        <div className="go-in pf-grid">
          <div>
            <p className="pf-eyebrow">{c.eyebrow}</p>
            <h1>{c.title}</h1>
            <p className="pf-lead">{c.lead}</p>
            <div className="pf-actions">
              {PLATFORM_URL ? (
                <a className="go-btn" href={PLATFORM_URL} rel="noopener">{c.signIn} →</a>
              ) : (
                <>
                  <span className="pf-soon">{c.soon}</span>
                  <p className="pf-client">{c.client}</p>
                  <a className="go-btn" href={`mailto:contact@simasiaai.gr?subject=${encodeURIComponent(lang === 'en' ? 'fλow platform access' : 'Πρόσβαση στην πλατφόρμα fλow')}`}>{c.ask}</a>
                </>
              )}
            </div>
            <p className="pf-not">{c.notClient} <Link to="/go"><GoLabel /></Link></p>
          </div>

          {/* a calm sketch of the platform: three parts around one flow */}
          <div className="pf-sketch" aria-hidden="true">
            <div className="pf-window">
              <div className="pf-bar"><i /><i /><i /><span>fλow</span></div>
              <div className="pf-body">
                {MODULES.map((m) => (
                  <div key={m.id} className="pf-tile" style={{ '--c': m.color }}>
                    <b>{m.name}</b>
                    <span>{m.role[lang]}</span>
                    <div className="pf-lines"><i /><i /><i /></div>
                  </div>
                ))}
                <svg className="pf-links" viewBox="0 0 300 60" preserveAspectRatio="none"><path d="M50 8 C 50 40, 150 30, 150 52 M150 8 L150 52 M250 8 C 250 40, 150 30, 150 52" /></svg>
                <div className="pf-core">f<span>λ</span>ow</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlatformPage;
