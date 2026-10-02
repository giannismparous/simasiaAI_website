import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './FlowHomeBlocks.css';

/*
 * Home page blocks. fλow is introduced as an idea first ("what if care flowed?"),
 * not as a sales pitch: tangled channels on the left, the λ in the middle,
 * calm parallel streams on the right. Three doors lead into the builder.
 */

export const PRESS = [
  { outlet: 'news4health', title: { el: 'ΣΚΠ-i: Το νέο chatbot τεχνητής νοημοσύνης για τη Σκλήρυνση κατά Πλάκας', en: 'ΣΚΠ-i: the new AI chatbot for Multiple Sclerosis' }, url: 'https://www.news4health.gr/digital-health/skp-i-to-neo-chatbot-texnitis-noimosynis-gia-tous-pasxontes-apo-sklirynsi-kata-plakas' },
  { outlet: 'healthpharma', title: { el: 'Το νέο AI chatbot για τα άτομα με Σκλήρυνση κατά Πλάκας', en: 'The new AI chatbot for people with MS' }, url: 'https://healthpharma.gr/pathiseis/to-neo-ai-chatbot-gia-ta-atoma-me-sklirynsi-kata-plakas/' },
  { outlet: 'newsbeast', title: { el: 'Η Σκλήρυνση κατά Πλάκας αποκτά AI σύμμαχο', en: 'MS gets an AI ally' }, url: 'https://www.newsbeast.gr/health/arthro/13338274/i-sklirynsi-kata-plakas-apokta-ai-symmacho-to-skp-i-apanta-24-ores-to-24oro' },
  { outlet: 'ygeiamou', title: { el: 'Νέο Digital Hub για τη Σκλήρυνση κατά Πλάκας', en: 'A new digital hub for MS' }, url: 'https://www.ygeiamou.gr/idisis/585281/i-techniti-noimosini-ginete-simmachos-ton-atomon-me-sklirinsi-kata-plakas-me-neo-digital-hub-to-skp-i/' },
  { outlet: { el: 'Πανεπιστήμιο Κρήτης', en: 'University of Crete' }, title: { el: 'Τρεις ψηφιακοί βοηθοί για ανθρώπους που τους χρειάζονται', en: 'Three digital assistants for people who need them' }, url: 'https://fonimaleviziou.gr/2026/09/04/treis-psifiakoi-voithoi-gia-anthropous-pou-tous-chreiazontai-otan-i-ypologistiki-glossologia-vgainei-apo-to-amfitheatro/' },
];

const T = {
  el: {
    pressLabel: 'Έγραψαν για εμάς',
    teaserTitle: 'Κι αν η φροντίδα κυλούσε;',
    teaserLead: 'Τηλέφωνα, Viber, χαρτιά, λήξεις που ξεχνιούνται. Οι άνθρωποι που φροντίζουν άλλους δουλεύουν μέσα σε θόρυβο. Το fλow τα μαζεύει σε ένα ήσυχο ρεύμα.',
    left: ['Τηλέφωνα', 'Viber', 'Χαρτιά', 'Excel', 'Email', 'Ξεχασμένες λήξεις'],
    right: ['Απαντήσεις 24/7', 'Ένας φάκελος', 'Υπενθυμίσεις', 'Insights', 'Ήσυχες οικογένειες'],
    before: 'Σήμερα', after: 'Με fλow',
    aria: 'Έξι μπερδεμένα κανάλια μπαίνουν στο fλow και βγαίνουν ως πέντε ήρεμα, παράλληλα ρεύματα.',
    doorsTitle: 'Από πού ξεκινάτε;',
    doors: [
      { k: 'ngo', b: 'Είμαι οργανισμός ή ΜΚΟ', s: 'Insights για ομάδα και χορηγούς' },
      { k: 'med', b: 'Είμαι γιατρός ή κλινική', s: 'Ραντεβού και καρτέλες που γεμίζουν μόνες' },
      { k: 'sponsor', b: 'Θέλω να στηρίξω', s: 'Στήριξη που μετριέται ανά άνθρωπο' },
    ],
    open: 'Ανοίξτε το fλow',
    proofTitle: 'Ρέει ήδη.',
    proofLead: 'Το fλow γεννήθηκε μέσα σε δύο οργανισμούς που στηρίζουν ανθρώπους κάθε μέρα.',
    cases: [
      { n: 'Μυρτώ', org: 'Κάπα3, Κέντρο Καθοδήγησης Καρκινοπαθών', line: 'Ψηφιακός πλοηγός για ανθρώπους με καρκίνο και τις οικογένειές τους.', by: 'Με την υποστήριξη του Ιδρύματος ΤΙΜΑ', logo: '/logos/kapa3.png', href: 'https://www.kapa3.gr' },
      { n: 'ΣΚΠ-i', org: 'ΠΟΑμΣΚΠ', line: 'Απαντά 24 ώρες το 24ωρο στην κοινότητα της Σκλήρυνσης κατά Πλάκας.', by: 'Με την υποστήριξη φαρμακευτικών εταιρειών', logo: '/logos/poamskp.png', href: 'https://www.poamskp.gr' },
    ],
    numberLabel: 'Ο ένας αριθμός που μετράμε για κάθε οργανισμό',
    number: 'Ερωτήσεις που απαντήθηκαν από εγκεκριμένες πηγές, κάθε μήνα.',
    allCollabs: 'Όλες οι συνεργασίες',
  },
  en: {
    pressLabel: 'In the press',
    teaserTitle: 'What if care flowed?',
    teaserLead: 'Calls, Viber, paper, deadlines that slip. People who care for others work inside noise. fλow gathers it into one quiet stream.',
    left: ['Phone calls', 'Viber', 'Paper', 'Excel', 'Email', 'Missed deadlines'],
    right: ['Answers 24/7', 'One case file', 'Reminders', 'Insights', 'Calm families'],
    before: 'Today', after: 'With fλow',
    aria: 'Six tangled channels enter fλow and leave as five calm, parallel streams.',
    doorsTitle: 'Where do you start?',
    doors: [
      { k: 'ngo', b: 'I run an organisation or NGO', s: 'Insights for your team and sponsors' },
      { k: 'med', b: 'I am a doctor or clinic', s: 'Bookings and patient cards that fill themselves' },
      { k: 'sponsor', b: 'I want to support', s: 'Support you can measure per person' },
    ],
    open: 'Open fλow',
    proofTitle: 'Already flowing.',
    proofLead: 'fλow was born inside two organisations that support people every day.',
    cases: [
      { n: 'Myrto', org: 'Kapa3 Cancer Guidance Center', line: 'A digital navigator for people with cancer and their families.', by: 'Supported by the TIMA Foundation', logo: '/logos/kapa3.png', href: 'https://www.kapa3.gr' },
      { n: 'ΣΚΠ-i', org: 'POAmSKP', line: 'Answers the Multiple Sclerosis community around the clock.', by: 'Supported by pharmaceutical companies', logo: '/logos/poamskp.png', href: 'https://www.poamskp.gr' },
    ],
    numberLabel: 'The one number we track for every organisation',
    number: 'Questions answered from approved sources, every month.',
    allCollabs: 'All collaborations',
  },
};

const useT = () => { const { language } = useLanguage(); const lang = language === 'en' ? 'en' : 'el'; return [T[lang], lang]; };

/* Slim press line, used at the bottom of the home hero */
export const PressStrip = ({ dark = true }) => {
  const [t, lang] = useT();
  return (
    <nav className={`flh-press${dark ? ' is-dark' : ''}`} aria-label={t.pressLabel}>
      <span className="flh-press-l">{t.pressLabel}</span>
      <ul>
        {PRESS.map((p) => (
          <li key={p.url}><a href={p.url} target="_blank" rel="noopener noreferrer" title={p.title[lang]}>{typeof p.outlet === 'string' ? p.outlet : p.outlet[lang]}</a></li>
        ))}
      </ul>
    </nav>
  );
};

/* Chaos → λ → calm. Tangled lines on the left, calm streams on the right. */
const ChaosToFlow = ({ t }) => {
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = 1040; const H = 360; const NX = 520; const NY = 180;
  const ly = [46, 98, 152, 204, 258, 312];
  const ry = [70, 125, 180, 235, 290];
  const mix = [4, 2, 5, 0, 3, 1];
  const tangles = useMemo(() => ly.map((y, i) => {
    const t2 = NY - 40 + i * 16;
    return `M 190 ${y} C 270 ${ly[mix[i]]}, 330 ${ly[(i + 2) % 6]}, 380 ${(y + t2) / 2} S 440 ${t2}, ${NX - 58} ${NY - 20 + i * 8}`;
  }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const calm = ry.map((y, i) => `M ${NX + 58} ${NY - 16 + i * 8} C ${NX + 140} ${NY - 16 + i * 8}, ${NX + 170} ${y}, ${NX + 270} ${y} L ${NX + 300} ${y}`);
  const colors = ['#6a9bcc', '#9fb383', '#9fb383', '#d97757', '#faf9f5'];
  return (
    <svg className="flh-chaos" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.aria}>
      <defs>
        <radialGradient id="flhGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#d97757" stopOpacity="0.3" /><stop offset="1" stopColor="#d97757" stopOpacity="0" /></radialGradient>
      </defs>
      <text x="40" y="20" className="flh-cap">{t.before}</text>
      <text x={W - 40} y="20" textAnchor="end" className="flh-cap">{t.after}</text>
      {tangles.map((d, i) => <path key={i} d={d} className="flh-tangle" />)}
      {ly.map((y, i) => <text key={t.left[i]} x="176" y={y + 5} textAnchor="end" className="flh-l">{t.left[i]}</text>)}
      {calm.map((d, i) => <path key={i} id={`flhc${i}`} d={d} className="flh-calm" style={{ stroke: colors[i] }} />)}
      {ry.map((y, i) => <text key={t.right[i]} x={NX + 312} y={y + 5} className="flh-r">{t.right[i]}</text>)}
      {!reduce && ry.map((_, i) => (
        <circle key={i} r="3.5" className="flh-dot">
          <animateMotion dur={`${3.6 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.6}s`}><mpath href={`#flhc${i}`} /></animateMotion>
        </circle>
      ))}
      <circle cx={NX} cy={NY} r="140" fill="url(#flhGlow)" />
      <circle cx={NX} cy={NY} r="56" className="flh-node" />
      <text x={NX} y={NY + 12} textAnchor="middle" className="flh-node-t">f<tspan className="flh-node-l">λ</tspan>ow</text>
    </svg>
  );
};

export const FlowTeaser = () => {
  const [t] = useT();
  return (
    <section className="flh-teaser" aria-labelledby="flh-teaser-t">
      <div className="flh-in">
        <h2 id="flh-teaser-t">{t.teaserTitle}</h2>
        <p className="flh-lead">{t.teaserLead}</p>
      </div>
      <div className="flh-chaos-wrap"><ChaosToFlow t={t} /></div>
      <div className="flh-in">
        <h3 className="flh-doors-t">{t.doorsTitle}</h3>
        <ul className="flh-doors">
          {t.doors.map((d) => (
            <li key={d.k}><Link to={`/flow/build?for=${d.k}`} className={`flh-door flh-door-${d.k}`}><b>{d.b}</b><span>{d.s}</span></Link></li>
          ))}
        </ul>
        <Link to="/flow" className="flh-open">{t.open}</Link>
      </div>
    </section>
  );
};

export const FlowProof = () => {
  const [t] = useT();
  return (
    <section className="flh-proof" aria-labelledby="flh-proof-t">
      <div className="flh-in">
        <h2 id="flh-proof-t">{t.proofTitle}</h2>
        <p className="flh-lead">{t.proofLead}</p>
        <div className="flh-cases">
          {t.cases.map((c) => (
            <article key={c.n} className="flh-case">
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="flh-case-logo"><img src={c.logo} alt={c.org} loading="lazy" /></a>
              <h3>{c.n}</h3>
              <p className="flh-case-org">{c.org}</p>
              <p>{c.line}</p>
              <p className="flh-case-by">{c.by}</p>
            </article>
          ))}
        </div>
        <div className="flh-number">
          <p>{t.numberLabel}</p>
          <b>{t.number}</b>
        </div>
        <PressStrip dark={false} />
        <Link to="/collaborations" className="flh-more">{t.allCollabs}</Link>
      </div>
    </section>
  );
};
