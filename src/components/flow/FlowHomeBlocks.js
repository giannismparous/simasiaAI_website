import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { MODULES, ORGS, moduleById, GoLabel } from './modules';
import './FlowHomeBlocks.css';

/*
 * Home page blocks. fλow is introduced as an idea first: the noise of a care day on
 * the left, the λ in the middle, calm parallel streams on the right that add up to
 * holistic care. Three doors lead into /go (build your own fλow).
 */

export const PRESS = [
  { outlet: 'news4health', title: { el: 'ΣΚΠ-i: Το νέο chatbot τεχνητής νοημοσύνης για τη Σκλήρυνση κατά Πλάκας', en: 'ΣΚΠ-i: the new AI chatbot for Multiple Sclerosis' }, url: 'https://www.news4health.gr/digital-health/skp-i-to-neo-chatbot-texnitis-noimosynis-gia-tous-pasxontes-apo-sklirynsi-kata-plakas' },
  { outlet: 'healthpharma', title: { el: 'Το νέο AI chatbot για τα άτομα με Σκλήρυνση κατά Πλάκας', en: 'The new AI chatbot for people with MS' }, url: 'https://healthpharma.gr/pathiseis/to-neo-ai-chatbot-gia-ta-atoma-me-sklirynsi-kata-plakas/' },
  { outlet: 'newsbeast', title: { el: 'Η Σκλήρυνση κατά Πλάκας αποκτά AI σύμμαχο', en: 'MS gets an AI ally' }, url: 'https://www.newsbeast.gr/health/arthro/13338274/i-sklirynsi-kata-plakas-apokta-ai-symmacho-to-skp-i-apanta-24-ores-to-24oro' },
  { outlet: 'ygeiamou', title: { el: 'Νέο Digital Hub για τη Σκλήρυνση κατά Πλάκας', en: 'A new digital hub for MS' }, url: 'https://www.ygeiamou.gr/idisis/585281/i-techniti-noimosini-ginete-simmachos-ton-atomon-me-sklirinsi-kata-plakas-me-neo-digital-hub-to-skp-i/' },
  { outlet: { el: 'Φωνή Μαλεβιζίου', en: 'Foni Maleviziou' }, title: { el: 'Τρεις ψηφιακοί βοηθοί για ανθρώπους που τους χρειάζονται', en: 'Three digital assistants for people who need them' }, url: 'https://fonimaleviziou.gr/2026/09/04/treis-psifiakoi-voithoi-gia-anthropous-pou-tous-chreiazontai-otan-i-ypologistiki-glossologia-vgainei-apo-to-amfitheatro/' },
];

const T = {
  el: {
    pressLabel: 'Έγραψαν για εμάς',
    teaserTitle: 'Παραμένετε σε Ροή και προσφέρετε φροντίδα',
    teaserLead: 'Συνεχή τηλέφωνα, αδιάβαστα μηνύματα στο Viber, στίβες με χαρτιά και αναφορές, συνταγογραφήσεις, προθεσμίες, ενημερώσεις, ραντεβού το ένα μετά το άλλο. Οι άνθρωποι που φροντίζουν άλλους δουλεύουν μέσα σε έναν ασταμάτητο θόρυβο. Το fλow αντικαθιστά τον θόρυβο με ροή.',
    left: ['Τηλέφωνα', 'Viber', 'Χαρτιά', 'Excel', 'Email', 'Προθεσμίες'],
    right: ['Έγκυρες και ακριβείς Απαντήσεις 24/7', 'Όλα σε μία πλατφόρμα', 'Υπενθυμίσεις', 'Συλλογή δεδομένων Ανάλυσης', 'Ήσυχες οικογένειες'],
    result: ['Ολιστική', 'φροντίδα'],
    before: 'Σήμερα', after: 'Με fλow',
    aria: 'Έξι μπερδεμένα κανάλια μπαίνουν στο fλow και βγαίνουν ως πέντε ήρεμα, παράλληλα ρεύματα που μαζί δίνουν ολιστική φροντίδα.',
    doorsTitle: 'Από πού ξεκινάτε;',
    doors: [
      { k: 'ngo', b: 'Είμαι οργανισμός ή ΜΚΟ', s: 'Απαντήσεις για τους ανθρώπους σας, δεδομένα για ομάδα και χορηγούς' },
      { k: 'med', b: 'Είμαι γιατρός ή κλινική', s: 'Ραντεβού και καρτέλες που γεμίζουν μόνες' },
      { k: 'sponsor', b: 'Θέλω να στηρίξω', s: 'Στήριξη που μετριέται ανά άνθρωπο' },
    ],
    goHint: 'Φτιάξτε τη ροή σας σε 3 λεπτά. Η προσφορά βγαίνει μπροστά σας.',
    proofTitle: 'Οργανισμοί με Ροή:',
    proofLead: 'Το fλow γεννήθηκε μέσα σε δύο οργανισμούς που υποστηρίζουν ανθρώπους καθημερινά.',
    adoptTitle: 'Το fλow υλοποιείται ήδη σε οργανισμούς με κοινωνικό αντίκτυπο',
    adoptLead: 'Κάθε οργανισμός ξεκινά από ένα κομμάτι. Όταν η ροή σταθεροποιηθεί, προσθέτει το επόμενο, στην ίδια πλατφόρμα, με τα ίδια δεδομένα.',
    live: 'Σε λειτουργία', building: 'Σε υλοποίηση',
    has: 'Έχει', next: 'Επόμενο βήμα', full: 'Ολόκληρο το fλow: απαντήσεις και ανάλυση δεδομένων',
    allCollabs: 'Όλες οι συνεργασίες',
  },
  en: {
    pressLabel: 'In the press',
    teaserTitle: 'Stay in flow and give care',
    teaserLead: 'Constant phone calls, unread Viber messages, piles of paper and reports, prescriptions, deadlines, updates, one appointment after another. People who care for others work inside endless noise. fλow replaces the noise with flow.',
    left: ['Phone calls', 'Viber', 'Paper', 'Excel', 'Email', 'Deadlines'],
    right: ['Accurate, reliable answers 24/7', 'Everything on one platform', 'Reminders', 'Data collected for analysis', 'Calm families'],
    result: ['Holistic', 'care'],
    before: 'Today', after: 'With fλow',
    aria: 'Six tangled channels enter fλow and leave as five calm, parallel streams that together make holistic care.',
    doorsTitle: 'Where do you start?',
    doors: [
      { k: 'ngo', b: 'I run an organisation or NGO', s: 'Answers for your people, data for your team and sponsors' },
      { k: 'med', b: 'I am a doctor or clinic', s: 'Bookings and patient records that fill themselves' },
      { k: 'sponsor', b: 'I want to support', s: 'Support you can measure per person' },
    ],
    goHint: 'Build your flow in 3 minutes. Your offer appears as you go.',
    proofTitle: 'Organisations in flow:',
    proofLead: 'fλow was born inside two organisations that support people every day.',
    adoptTitle: 'fλow already runs in organisations with social impact',
    adoptLead: 'Every organisation starts with one part. When the flow settles, it adds the next one, on the same platform, with the same data.',
    live: 'Live', building: 'Being built',
    has: 'Has', next: 'Next step', full: 'The whole fλow: answers and data analysis',
    allCollabs: 'All collaborations',
  },
};

const useT = () => { const { language } = useLanguage(); const lang = language === 'en' ? 'en' : 'el'; return [T[lang], lang]; };

/* Calm press band, placed just above the footer */
export const PressStrip = ({ dark = false }) => {
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

export const PressBand = () => (
  <section className="flh-pressband"><div className="flh-in"><PressStrip /></div></section>
);

const COLORS = ['#6a9bcc', '#9fb383', '#9fb383', '#d97757', '#faf9f5'];

/* Desktop: noise → λ → five calm streams → holistic care. */
const ChaosToFlow = ({ t }) => {
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = 1250; const H = 380; const NX = 470; const NY = 190;
  const ly = [52, 106, 160, 214, 268, 322];
  const ry = [82, 136, 190, 244, 298];
  const mix = [4, 2, 5, 0, 3, 1];
  const tangles = useMemo(() => ly.map((y, i) => {
    const t2 = NY - 40 + i * 16;
    return `M 186 ${y} C 262 ${ly[mix[i]]}, 318 ${ly[(i + 2) % 6]}, 366 ${(y + t2) / 2} S 424 ${t2}, ${NX - 58} ${NY - 20 + i * 8}`;
  }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const SX = NX + 230;
  const calm = ry.map((y, i) => `M ${NX + 58} ${NY - 16 + i * 8} C ${NX + 130} ${NY - 16 + i * 8}, ${NX + 150} ${y}, ${SX - 20} ${y} L ${SX} ${y}`);
  const BX = 1046;
  return (
    <svg className="flh-chaos" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.aria}>
      <defs>
        <radialGradient id="flhGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#d97757" stopOpacity="0.3" /><stop offset="1" stopColor="#d97757" stopOpacity="0" /></radialGradient>
      </defs>
      <text x="40" y="18" className="flh-cap">{t.before}</text>
      <text x={SX + 12} y="18" className="flh-cap">{t.after}</text>
      {tangles.map((d, i) => <path key={i} d={d} className="flh-tangle" />)}
      {ly.map((y, i) => <text key={t.left[i]} x="172" y={y + 5} textAnchor="end" className="flh-l">{t.left[i]}</text>)}
      {calm.map((d, i) => <path key={i} id={`flhc${i}`} d={d} className="flh-calm" style={{ stroke: COLORS[i] }} />)}
      {ry.map((y, i) => <text key={t.right[i]} x={SX + 12} y={y + 5} className="flh-r">{t.right[i]}</text>)}
      {!reduce && ry.map((_, i) => (
        <circle key={i} r="3.5" className="flh-dot">
          <animateMotion dur={`${3.4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.6}s`}><mpath href={`#flhc${i}`} /></animateMotion>
        </circle>
      ))}
      {/* the five streams add up to one result */}
      <path d={`M ${BX} ${ry[0] - 6} Q ${BX + 16} ${ry[0] - 6}, ${BX + 16} ${ry[0] + 14} L ${BX + 16} ${NY - 14} Q ${BX + 16} ${NY}, ${BX + 28} ${NY} Q ${BX + 16} ${NY}, ${BX + 16} ${NY + 14} L ${BX + 16} ${ry[4] - 14} Q ${BX + 16} ${ry[4] + 6}, ${BX} ${ry[4] + 6}`} className="flh-brace" />
      <text x={BX + 36} y={NY - 4} className="flh-result">{t.result[0]}</text>
      <text x={BX + 36} y={NY + 22} className="flh-result">{t.result[1]}</text>
      <circle cx={NX} cy={NY} r="140" fill="url(#flhGlow)" />
      <circle cx={NX} cy={NY} r="56" className="flh-node" />
      <text x={NX} y={NY + 12} textAnchor="middle" className="flh-node-t">f<tspan className="flh-node-l">λ</tspan>ow</text>
    </svg>
  );
};

/* Phone: the same story, top to bottom, in readable type. */
const ChaosToFlowMobile = ({ t }) => (
  <div className="flh-m" aria-hidden="true">
    <p className="flh-m-cap">{t.before}</p>
    <ul className="flh-m-noise">{t.left.map((l, i) => <li key={l} style={{ transform: `rotate(${[-3, 2, -1.5, 3, -2, 1.5][i]}deg)` }}>{l}</li>)}</ul>
    <svg className="flh-m-lambda" viewBox="0 0 120 120"><circle cx="60" cy="60" r="44" className="flh-node" /><text x="60" y="70" textAnchor="middle" className="flh-node-t" style={{ fontSize: 28 }}>f<tspan className="flh-node-l">λ</tspan>ow</text></svg>
    <p className="flh-m-cap">{t.after}</p>
    <ul className="flh-m-calm">{t.right.map((r, i) => <li key={r}><span style={{ background: COLORS[i] }} />{r}</li>)}</ul>
    <p className="flh-m-result">= {t.result.join(' ')}</p>
  </div>
);

export const FlowTeaser = () => {
  const [t] = useT();
  return (
    <section className="flh-teaser" aria-labelledby="flh-teaser-t">
      <div className="flh-in">
        <h2 id="flh-teaser-t">{t.teaserTitle}</h2>
        <p className="flh-lead">{t.teaserLead}</p>
      </div>
      <div className="flh-chaos-wrap"><ChaosToFlow t={t} /><ChaosToFlowMobile t={t} /></div>
      <div className="flh-in">
        <h3 className="flh-doors-t">{t.doorsTitle}</h3>
        <ul className="flh-doors">
          {t.doors.map((d) => (
            <li key={d.k}><Link to={`/go?for=${d.k}`} className={`flh-door flh-door-${d.k}`}><b>{d.b}</b><span>{d.s}</span><i aria-hidden="true">→</i></Link></li>
          ))}
        </ul>
        <div className="flh-go-row">
          <Link to="/go" className="go-btn"><GoLabel /></Link>
          <span>{t.goHint}</span>
        </div>
      </div>
    </section>
  );
};

/* One organisation's path through the three parts: filled = has it, dashed = next step */
const OrgPath = ({ org, t, lang }) => {
  const order = ['dialogos', 'praxis', 'metron'].sort((a, b) => {
    const rank = (id) => (org.has.includes(id) ? 0 : id === org.next ? 1 : 2);
    return rank(a) - rank(b);
  });
  return (
    <ol className="flh-path" aria-label={`${org.name[lang]}: ${org.has.map((h) => moduleById(h).name).join(', ')}`}>
      {order.map((id) => {
        const m = moduleById(id);
        const state = org.has.includes(id) ? 'has' : id === org.next ? 'next' : 'later';
        return (
          <li key={id} className={`flh-step is-${state}`} style={{ '--c': m.color }}>
            <span className="flh-step-dot" aria-hidden="true" />
            <b>{m.name}</b>
            <small>{state === 'has' ? m.role[lang] : state === 'next' ? t.next : ''}</small>
          </li>
        );
      })}
    </ol>
  );
};

export const FlowAdoption = ({ heading = true }) => {
  const [t, lang] = useT();
  return (
    <div className="flh-adopt">
      {heading && (
        <>
          <h3 className="flh-adopt-t">{t.adoptTitle}</h3>
          <p className="flh-adopt-l">{t.adoptLead}</p>
        </>
      )}
      <ul className="flh-legend">
        {MODULES.map((m) => (
          <li key={m.id} style={{ '--c': m.color }}><span aria-hidden="true" /><b>{m.name}</b> {m.role[lang]}</li>
        ))}
      </ul>
      <div className="flh-orgs">
        {ORGS.map((o) => (
          <article key={o.id} className={`flh-org${o.full ? ' is-full' : ''}`}>
            <header>
              <a href={o.href} target="_blank" rel="noopener noreferrer" className="flh-org-logo"><img src={o.logo} alt={o.name[lang]} loading="lazy" /></a>
              <span className={`flh-tag${o.live ? ' is-live' : ''}`}>{o.live ? t.live : t.building}</span>
            </header>
            <h4>{typeof o.product === 'string' ? o.product : o.product[lang]}</h4>
            <p className="flh-org-name">{o.name[lang]}</p>
            <p className="flh-org-what">{o.what[lang]}</p>
            <OrgPath org={o} t={t} lang={lang} />
            {o.full && <p className="flh-org-full">{t.full}</p>}
          </article>
        ))}
      </div>
    </div>
  );
};

export const FlowProof = () => {
  const [t] = useT();
  return (
    <section className="flh-proof" aria-labelledby="flh-proof-t">
      <div className="flh-in">
        <h2 id="flh-proof-t">{t.proofTitle}</h2>
        <p className="flh-lead">{t.proofLead}</p>
        <FlowAdoption />
        <Link to="/collaborations" className="flh-more">{t.allCollabs} →</Link>
      </div>
    </section>
  );
};
