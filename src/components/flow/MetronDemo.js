import React, { useCallback, useEffect, useRef, useState } from 'react';
import './FlowDemos.css';

/* MetronAI live demo: a calm analytics window fed by DialogosAI and PraxisAI.
   Self-contained: React hooks + FlowDemos.css, no storage, no network.
   All numbers are illustrative test data. */

const COPY = {
  el: {
    month: 'Σεπτέμβριος',
    quarter: 'Τρίμηνο',
    periodLabel: 'Περίοδος',
    periodFull: { month: 'Σεπτέμβριος 2026', quarter: 'Ιούλιος έως Σεπτέμβριος 2026' },
    sources: 'Πηγές δεδομένων',
    tabsLabel: 'Ενότητες του MetronAI',
    foot: 'Τα δεδομένα έρχονται από το DialogosAI και το PraxisAI · ανώνυμα, συγκεντρωτικά, στην ΕΕ',
    sample: 'Παράδειγμα',
    channels: 'Από πού έρχονται',
    hours: 'Επαφές ανά ώρα της ημέρας',
    inHours: 'εντός ωραρίου',
    afterHours: 'εκτός ωραρίου',
    peak: 'Αιχμή',
    contacts: 'επαφές',
    firstReply: 'Μέσος χρόνος πρώτης απάντησης',
    firstReplyV: '4 δευτ.',
    handed: 'Παραδόθηκαν σε άνθρωπο',
    handedSub: 'επείγοντα και σύνθετα, με όλο το ιστορικό',
    unanswered: 'Αναπάντητες κλήσεις που πήραν μήνυμα',
    oneHistory: 'Ένα κοινό ιστορικό για κάθε άνθρωπο, από όποιο κανάλι κι αν έρθει.',
    themesNote: (n) => `Από ${n} συνομιλίες · ταξινόμηση από το MetronAI, χωρίς ονόματα`,
    gapsLead: 'Ερωτήσεις που οι πηγές σας δεν καλύπτουν ακόμη',
    insightTag: 'Παρατήρηση του MetronAI',
    questions: 'ερωτήσεις',
    toProposal: 'Μετατροπή σε πρόταση',
    drafting: 'Γράφω το προσχέδιο…',
    draftReady: 'Προσχέδιο έτοιμο',
    draftAgain: 'Ξανά',
    draftTag: 'Προσχέδιο από το MetronAI',
    report: 'Δημιουργία…',
    reportSteps: ['Συγκεντρώνω τα δεδομένα', 'Υπολογίζω τον αντίκτυπο', 'Στήνω τη σελίδα'],
    reportReady: 'Έτοιμη σε PDF',
    period: { month: 'τον Σεπτέμβριο', quarter: 'το τρίμηνο' },
    live: 'συνδεδεμένο',
  },
  en: {
    month: 'September',
    quarter: 'Quarter',
    periodLabel: 'Period',
    periodFull: { month: 'September 2026', quarter: 'July to September 2026' },
    sources: 'Data sources',
    tabsLabel: 'MetronAI sections',
    foot: 'Data comes from DialogosAI and PraxisAI · anonymous, aggregated, in the EU',
    sample: 'Example',
    channels: 'Where people come from',
    hours: 'Contacts by hour of day',
    inHours: 'office hours',
    afterHours: 'after hours',
    peak: 'Peak',
    contacts: 'contacts',
    firstReply: 'Average time to first reply',
    firstReplyV: '4 sec',
    handed: 'Handed to a human',
    handedSub: 'urgent and complex cases, with full history',
    unanswered: 'Missed calls that got a message',
    oneHistory: 'One shared history per person, whichever channel they use.',
    themesNote: (n) => `From ${n} conversations · sorted by MetronAI, no names`,
    gapsLead: 'Questions your sources do not cover yet',
    insightTag: 'MetronAI noticed',
    questions: 'questions',
    toProposal: 'Turn into a proposal',
    drafting: 'Drafting…',
    draftReady: 'Draft ready',
    draftAgain: 'Again',
    draftTag: 'Draft by MetronAI',
    report: 'Generating…',
    reportSteps: ['Gathering the data', 'Calculating the impact', 'Laying out the page'],
    reportReady: 'Ready as PDF',
    period: { month: 'in September', quarter: 'this quarter' },
    live: 'connected',
  },
};

const CH_COLORS = { site: '#6a9bcc', viber: '#7360f2', whatsapp: '#25d366', phone: '#b0aea5' };

// conversations per hour (shape only; scaled to the period total)
const HOURS = {
  ngo: { open: [9, 17], data: [4, 2, 1, 1, 1, 2, 4, 10, 22, 76, 84, 86, 80, 72, 74, 80, 76, 40, 44, 58, 82, 90, 56, 24] },
  med: { open: [[9, 14], [17, 20]], data: [3, 1, 0, 0, 0, 1, 3, 9, 20, 56, 60, 60, 52, 44, 24, 20, 22, 50, 54, 48, 50, 64, 36, 12] },
};
const isOpen = (E, h) => {
  const o = HOURS[E].open;
  const ranges = Array.isArray(o[0]) ? o : [o];
  return ranges.some(([a, b]) => h >= a && h < b);
};

const DATA = {
  ngo: {
    el: {
      org: 'Σύλλογος Αλκυόνη',
      tabs: ['Επικοινωνία', 'Τι ρωτούν', 'Τι λείπει', 'Κοινωνικός αντίκτυπος'],
      channels: [['site', 'Site'], ['viber', 'Viber'], ['whatsapp', 'WhatsApp'], ['phone', 'Τηλέφωνο']],
      themes: ['Πιστοποίηση ΚΕΠΑ', 'Επιδόματα ΟΠΕΚΑ', 'Ραντεβού και νοσοκομεία', 'Ψυχολογική στήριξη', 'Δωρεές και εθελοντισμός'],
      gaps: ['Μεταφορά προς θεραπείες', 'Ομάδες στήριξης γονέων', 'Φροντίδα το Σαββατοκύριακο'],
      insight: 'Οι ερωτήσεις για ΚΕΠΑ σχεδόν διπλασιάζονται μετά τις 20:00, όταν το γραφείο είναι κλειστό.',
      gapLine: 'Αυτό γίνεται η επόμενη πρότασή σας για χρηματοδότηση.',
      draft: (p, n, b) => ({
        title: 'Πρόταση: Υπηρεσία μεταφοράς προς θεραπείες',
        rows: [`${n} αιτήματα ${p}`, `εκτιμώμενοι ωφελούμενοι ${b}`, 'τεκμηρίωση: ανώνυμα αποσπάσματα από το DialogosAI'],
      }),
      impact: ['άνθρωποι πήραν απάντηση', 'ώρες επέστρεψαν στην ομάδα', 'γλώσσες', 'απαντήσεις εκτός ωραρίου'],
      barsTitle: 'Ανά περιφέρεια',
      bars: ['Αττική', 'Κεντρική Μακεδονία', 'Κρήτη', 'Δυτική Ελλάδα', 'Άλλες'],
      reportBtn: 'Αναφορά για χορηγούς',
      reportTitle: 'Αναφορά κοινωνικού αντικτύπου',
    },
    en: {
      org: 'Alkyoni Association',
      tabs: ['Communication', 'What they ask', 'What’s missing', 'Social impact'],
      channels: [['site', 'Site'], ['viber', 'Viber'], ['whatsapp', 'WhatsApp'], ['phone', 'Phone']],
      themes: ['Disability certification', 'Welfare benefits', 'Appointments and hospitals', 'Psychological support', 'Donations and volunteering'],
      gaps: ['Transport to therapy', 'Parent support groups', 'Weekend care'],
      insight: 'Questions about disability certification nearly double after 20:00, when the office is closed.',
      gapLine: 'This becomes your next funding proposal.',
      draft: (p, n, b) => ({
        title: 'Proposal: Transport-to-therapy service',
        rows: [`${n} requests ${p}`, `estimated beneficiaries ${b}`, 'evidence: anonymous excerpts from DialogosAI'],
      }),
      impact: ['people got an answer', 'hours returned to the team', 'languages', 'answers after hours'],
      barsTitle: 'By region',
      bars: ['Attica', 'Central Macedonia', 'Crete', 'Western Greece', 'Other'],
      reportBtn: 'Report for sponsors',
      reportTitle: 'Social impact report',
    },
    kpis: {
      month: [1284, 41, 87, 312],
      quarter: [3790, 39, 88, 941],
    },
    kpiLabels: {
      el: { month: ['συνομιλίες τον μήνα', 'έξω από το ωράριο', 'απαντήθηκαν από τις πηγές σας', 'κλήσεις στο τηλέφωνο'], quarter: ['συνομιλίες το τρίμηνο', 'έξω από το ωράριο', 'απαντήθηκαν από τις πηγές σας', 'κλήσεις στο τηλέφωνο'] },
      en: { month: ['conversations a month', 'outside office hours', 'answered from your sources', 'phone calls'], quarter: ['conversations this quarter', 'outside office hours', 'answered from your sources', 'phone calls'] },
    },
    kpiSuffix: ['', '%', '%', ''],
    total: { month: 1284, quarter: 3790 },
    split: { month: [437, 346, 189, 312], quarter: [1290, 1021, 538, 941] },
    handed: { month: 23, quarter: 71 },
    unanswered: { month: 64, quarter: 188 },
    themes: [31, 22, 17, 12, 8],
    gaps: { month: [14, 9, 6], quarter: [42, 27, 18] },
    draftBenef: { month: 40, quarter: 110 },
    impact: { month: [846, 96, 4, '1/3'], quarter: [2490, 281, 5, '1/3'] },
    bars: [38, 21, 14, 11, 16],
  },
  med: {
    el: {
      org: 'Ιατρείο Δρ. Νικολάου',
      tabs: ['Επικοινωνία', 'Τι ρωτούν', 'Τι λείπει', 'Αποτέλεσμα για το ιατρείο'],
      channels: [['site', 'Site'], ['viber', 'Viber'], ['whatsapp', 'WhatsApp'], ['phone', 'Τηλέφωνο']],
      themes: ['Ραντεβού και διαθεσιμότητα', 'Τιμές και ΕΟΠΥΥ', 'Προετοιμασία εξετάσεων', 'Αποτελέσματα', 'Επανάληψη συνταγής'],
      gaps: ['Ραντεβού Σάββατο πρωί', 'Τηλεϊατρική', 'Αγγλικά για επισκέπτες'],
      insight: 'Οι ερωτήσεις για ραντεβού κορυφώνονται την Κυριακή το βράδυ, για την εβδομάδα που έρχεται.',
      gapLine: 'Αυτό γίνεται η επόμενη υπηρεσία σας.',
      draft: (p, n, b) => ({
        title: 'Πρόταση: Ραντεβού Σάββατο πρωί',
        rows: [`${n} αιτήματα ${p}`, `εκτιμώμενα νέα ραντεβού ${b}`, 'ώρες: 09:00 με 13:00, δύο Σάββατα τον μήνα'],
      }),
      impact: ['ραντεβού εκτός ωραρίου', 'ακυρώσεις αντικαταστάθηκαν', 'ώρες τηλεφώνων λιγότερες την εβδομάδα', 'μέση αξιολόγηση'],
      barsTitle: 'Ραντεβού ανά κανάλι',
      bars: ['Site', 'WhatsApp', 'Τηλέφωνο', 'Viber'],
      reportBtn: 'Μηνιαία αναφορά',
      reportTitle: 'Μηνιαία αναφορά ιατρείου',
    },
    en: {
      org: 'Dr Nikolaou’s practice',
      tabs: ['Communication', 'What they ask', 'What’s missing', 'Results for the practice'],
      channels: [['site', 'Site'], ['viber', 'Viber'], ['whatsapp', 'WhatsApp'], ['phone', 'Phone']],
      themes: ['Appointments and availability', 'Prices and insurance', 'Exam preparation', 'Results', 'Repeat prescriptions'],
      gaps: ['Saturday morning slots', 'Telemedicine', 'English for visitors'],
      insight: 'Questions about appointments peak on Sunday evening, for the week ahead.',
      gapLine: 'This becomes your next service.',
      draft: (p, n, b) => ({
        title: 'Proposal: Saturday morning appointments',
        rows: [`${n} requests ${p}`, `estimated new appointments ${b}`, 'hours: 09:00 to 13:00, two Saturdays a month'],
      }),
      impact: ['bookings after hours', 'cancellations refilled', 'fewer hours on the phone a week', 'average rating'],
      barsTitle: 'Bookings by channel',
      bars: ['Site', 'WhatsApp', 'Phone', 'Viber'],
      reportBtn: 'Monthly report',
      reportTitle: 'Monthly practice report',
    },
    kpis: {
      month: [962, 38, 41, 9],
      quarter: [2851, 37, 118, 26],
    },
    kpiLabels: {
      el: { month: ['επαφές τον μήνα', 'εκτός ωραρίου', 'ραντεβού από επαφές εκτός ωραρίου', 'κενά που γέμισαν'], quarter: ['επαφές το τρίμηνο', 'εκτός ωραρίου', 'ραντεβού από επαφές εκτός ωραρίου', 'κενά που γέμισαν'] },
      en: { month: ['contacts a month', 'after hours', 'bookings from after-hours contacts', 'empty slots filled'], quarter: ['contacts this quarter', 'after hours', 'bookings from after-hours contacts', 'empty slots filled'] },
    },
    kpiSuffix: ['', '%', '', ''],
    total: { month: 962, quarter: 2851 },
    split: { month: [394, 173, 212, 183], quarter: [1169, 513, 627, 542] },
    handed: { month: 23, quarter: 68 },
    unanswered: { month: 57, quarter: 171 },
    themes: [38, 21, 16, 14, 11],
    gaps: { month: [22, 11, 7], quarter: [66, 33, 21] },
    draftBenef: { month: 30, quarter: 90 },
    impact: { month: [41, 9, 7.5, 4.8], quarter: [118, 26, 7.5, 4.8] },
    bars: [44, 26, 18, 12],
  },
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener('change', on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', on); else mq.removeListener(on); };
  }, []);
  return reduced;
}

const fmt = (v, L, dec = 0) => new Intl.NumberFormat(L === 'el' ? 'el-GR' : 'en-GB', {
  minimumFractionDigits: dec, maximumFractionDigits: dec,
}).format(v);

function useCountUp(target, reduced, dur = 900) {
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    if (reduced || typeof window === 'undefined' || !window.requestAnimationFrame) {
      cur.current = target; setV(target); return undefined;
    }
    const from = cur.current;
    if (from === target) return undefined;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const val = from + (target - from) * e;
      cur.current = val;
      setV(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, dur]);
  return v;
}

function Num({ value, L, dec = 0, suffix = '', reduced }) {
  const isNum = typeof value === 'number';
  const v = useCountUp(isNum ? value : 0, reduced);
  if (!isNum) return <>{value}</>;
  return <>{fmt(dec ? v : Math.round(v), L, dec)}{suffix}</>;
}

export default function MetronDemo({ lang = 'el', ed = 'ngo' }) {
  const L = lang === 'en' ? 'en' : 'el';
  const E = ed === 'med' ? 'med' : 'ngo';
  const t = COPY[L];
  const D = DATA[E];
  const d = D[L];
  const reduced = usePrefersReducedMotion();

  const [period, setPeriod] = useState('month');
  const [tab, setTab] = useState(0);
  const [hover, setHover] = useState(null);
  const [draft, setDraft] = useState('idle'); // idle | busy | ready
  const [rep, setRep] = useState({ state: 'idle', step: 0 }); // idle | busy | ready
  const [announce, setAnnounce] = useState('');
  const timers = useRef(new Set());
  const tabRefs = useRef([]);

  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => { timers.current.delete(id); fn(); }, ms);
    timers.current.add(id);
  }, []);
  const clearTimers = useCallback(() => { timers.current.forEach(clearTimeout); timers.current.clear(); }, []);
  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    clearTimers(); setTab(0); setPeriod('month'); setDraft('idle'); setRep({ state: 'idle', step: 0 }); setHover(null);
  }, [E, L, clearTimers]);

  const kpis = D.kpis[period];
  const kLabels = D.kpiLabels[L][period];
  const total = D.total[period];

  const changePeriod = (p) => {
    if (p === period) return;
    setPeriod(p);
    const k = D.kpis[p];
    const lab = D.kpiLabels[L][p];
    setAnnounce(`${t.periodFull[p]}: ${k.map((v, i) => `${fmt(v, L)}${D.kpiSuffix[i]} ${lab[i]}`).join(', ')}`);
  };

  const onTabKey = (e, i) => {
    const n = d.tabs.length;
    let j = null;
    if (e.key === 'ArrowRight') j = (i + 1) % n;
    if (e.key === 'ArrowLeft') j = (i - 1 + n) % n;
    if (e.key === 'Home') j = 0;
    if (e.key === 'End') j = n - 1;
    if (j !== null) { e.preventDefault(); setTab(j); if (tabRefs.current[j]) tabRefs.current[j].focus(); }
  };

  const makeDraft = () => {
    if (draft === 'busy') return;
    setDraft('busy');
    later(() => { setDraft('ready'); setAnnounce(t.draftReady); }, reduced ? 50 : 1100);
  };

  const makeReport = () => {
    if (rep.state === 'busy') return;
    if (reduced) { setRep({ state: 'ready', step: 3 }); setAnnounce(t.reportReady); return; }
    setRep({ state: 'busy', step: 0 });
    later(() => setRep({ state: 'busy', step: 1 }), 520);
    later(() => setRep({ state: 'busy', step: 2 }), 1040);
    later(() => { setRep({ state: 'ready', step: 3 }); setAnnounce(t.reportReady); }, 1600);
  };

  /* hours, scaled to the period total of chat contacts */
  const hrs = HOURS[E].data;
  const hSum = hrs.reduce((a, b) => a + b, 0);
  const scale = total / hSum;
  const split = D.split[period];
  const pct = split.map((v) => Math.round((v / total) * 100));
  const hMax = Math.max(...hrs);
  const peakH = hrs.indexOf(hMax);
  const shownH = hover === null ? peakH : hover;
  const hh = (h) => `${String(h).padStart(2, '0')}:00`;

  const panelId = (i) => `mtd-panel-${E}-${i}`;
  const tabId = (i) => `mtd-tab-${E}-${i}`;

  const draftData = d.draft(t.period[period], D.gaps[period][0], D.draftBenef[period]);
  const imp = D.impact[period].map((v) => (v === '1/3' ? (L === 'el' ? '1 στις 3' : '1 in 3') : v));

  const renderPanel = () => {
    if (tab === 0) {
      return (
        <div className="mtd-comm">
          <div className="mtd-block mtd-split">
            <div className="mtd-block-title">{t.channels}</div>
            <div className="mtd-stack" role="img" aria-label={d.channels.map(([, n], i) => `${n} ${pct[i]}%`).join(', ')}>
              {pct.map((p, i) => (
                <span key={i} style={{ '--w': `${p}%`, '--c': CH_COLORS[d.channels[i][0]], '--i': i }} />
              ))}
            </div>
            <div className="mtd-legend">
              {d.channels.map(([k, n], i) => (
                <div key={k} className="mtd-legend-row">
                  <i style={{ background: CH_COLORS[k] }} aria-hidden="true" />
                  <span>{n}</span>
                  <strong><Num value={pct[i]} L={L} suffix="%" reduced={reduced} /></strong>
                  <em><Num value={split[i]} L={L} reduced={reduced} /></em>
                </div>
              ))}
            </div>
            <div className="mtd-split-note">{t.oneHistory}</div>
          </div>

          <div className="mtd-block mtd-facts">
            <div className="mtd-fact">
              <strong>{t.firstReplyV}</strong>
              <span>{t.firstReply}</span>
            </div>
            <div className="mtd-fact">
              <strong><Num value={D.handed[period]} L={L} reduced={reduced} /></strong>
              <span>{t.handed}<em>{t.handedSub}</em></span>
            </div>
            <div className="mtd-fact">
              <strong><Num value={D.unanswered[period]} L={L} reduced={reduced} /></strong>
              <span>{t.unanswered}</span>
            </div>
          </div>

          <div className="mtd-block mtd-hours">
            <div className="mtd-hours-head">
              <div className="mtd-block-title">{t.hours}</div>
              <div className="mtd-hours-read" aria-hidden="true">
                <span>{hover === null ? `${t.peak} · ` : ''}{hh(shownH)}</span>
                <strong>{fmt(Math.round(hrs[shownH] * scale), L)} {t.contacts}</strong>
                <i className={isOpen(E, shownH) ? 'is-in' : 'is-out'}>{isOpen(E, shownH) ? t.inHours : t.afterHours}</i>
              </div>
            </div>
            <div
              className="mtd-strip"
              role="img"
              aria-label={`${t.hours}. ${t.peak} ${hh(peakH)}, ${fmt(Math.round(hMax * scale), L)} ${t.contacts}.`}
              onMouseLeave={() => setHover(null)}
            >
              {hrs.map((v, h) => (
                <span
                  key={h}
                  className={`mtd-hbar ${isOpen(E, h) ? 'is-in' : 'is-out'}${h === shownH ? ' is-hot' : ''}`}
                  style={{ '--h': `${Math.max(3, (v / hMax) * 100)}%`, '--i': h }}
                  onMouseEnter={() => setHover(h)}
                />
              ))}
            </div>
            <div className="mtd-axis" aria-hidden="true">
              {['00', '06', '12', '18', '23'].map((x) => <span key={x}>{x}</span>)}
            </div>
            <div className="mtd-keys">
              <span><i className="is-in" aria-hidden="true" />{t.inHours}</span>
              <span><i className="is-out" aria-hidden="true" />{t.afterHours}</span>
            </div>
          </div>
        </div>
      );
    }
    if (tab === 1) {
      return (
        <div className="mtd-block">
          <div className="mtd-bars">
            {d.themes.map((name, i) => (
              <div className="mtd-bar-row" key={name} style={{ '--i': i }}>
                <span className="mtd-bar-name">{name}</span>
                <span className="mtd-bar-track"><span style={{ '--w': `${(D.themes[i] / D.themes[0]) * 100}%` }} /></span>
                <strong className="mtd-bar-v"><Num value={D.themes[i]} L={L} suffix="%" reduced={reduced} /></strong>
                <em className="mtd-bar-n"><Num value={Math.round(total * D.themes[i] / 100)} L={L} reduced={reduced} /></em>
              </div>
            ))}
          </div>
          <div className="mtd-note">{t.themesNote(fmt(total, L))}</div>
          <div className="mtd-insight">
            <span className="mtd-insight-tag"><i aria-hidden="true" />{t.insightTag}</span>
            <span className="mtd-insight-text">{d.insight}</span>
          </div>
        </div>
      );
    }
    if (tab === 2) {
      return (
        <div className="mtd-gapgrid">
          <div className="mtd-block">
            <div className="mtd-block-title">{t.gapsLead}</div>
            <div className="mtd-gaps">
              {d.gaps.map((g, i) => (
                <div className="mtd-gap" key={g} style={{ '--i': i }}>
                  <span className="mtd-gap-dot" aria-hidden="true" />
                  <span className="mtd-gap-name">{g}</span>
                  <strong><Num value={D.gaps[period][i]} L={L} reduced={reduced} /></strong>
                  <em>{t.questions}</em>
                </div>
              ))}
            </div>
            <div className="mtd-gapline">{d.gapLine}</div>
            <button type="button" className="mtd-btn" onClick={makeDraft} disabled={draft === 'busy'}>
              {draft === 'busy' ? t.drafting : draft === 'ready' ? `${t.draftReady} · ${t.draftAgain}` : t.toProposal}
            </button>
          </div>
          <div className={`mtd-draft is-${draft}`} aria-live="polite">
            {draft === 'idle' && (
              <div className="mtd-draft-ghost" aria-hidden="true"><i /><i /><i /><i /></div>
            )}
            {draft === 'busy' && (
              <div className="mtd-draft-ghost is-busy" aria-hidden="true"><i /><i /><i /><i /></div>
            )}
            {draft === 'ready' && (
              <div className="mtd-draft-card">
                <span className="mtd-draft-badge">{t.draftTag}</span>
                <strong className="mtd-draft-heading">{draftData.title}</strong>
                {draftData.rows.map((r, i) => (
                  <div key={i} className="mtd-draft-row" style={{ '--i': i }}>{r}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
    // tab 3: impact
    const impDec = E === 'med' ? [0, 0, 1, 1] : [0, 0, 0, 0];
    const impSuf = E === 'med' ? ['', '', '', '★'] : ['', '', '', ''];
    const repBars = D.bars.slice(0, 2);
    return (
      <div className="mtd-impgrid">
        <div className="mtd-block">
          <div className="mtd-imp">
            {imp.map((v, i) => (
              <div className="mtd-imp-cell" key={i}>
                <strong><Num value={v} L={L} dec={impDec[i]} suffix={impSuf[i]} reduced={reduced} /></strong>
                <span>{d.impact[i]}</span>
              </div>
            ))}
          </div>
          <div className="mtd-block-title mtd-mt">{d.barsTitle}</div>
          <div className="mtd-bars is-small">
            {d.bars.map((name, i) => (
              <div className="mtd-bar-row" key={name} style={{ '--i': i }}>
                <span className="mtd-bar-name">{name}</span>
                <span className="mtd-bar-track"><span style={{ '--w': `${(D.bars[i] / Math.max(...D.bars)) * 100}%` }} /></span>
                <strong className="mtd-bar-v">{D.bars[i]}%</strong>
              </div>
            ))}
          </div>
          <button type="button" className="mtd-btn mtd-mt" onClick={makeReport} disabled={rep.state === 'busy'}>
            {rep.state === 'busy' ? t.report : d.reportBtn}
          </button>
        </div>
        <div className={`mtd-report is-${rep.state}`} aria-live="polite">
          {rep.state === 'idle' && <div className="mtd-draft-ghost is-doc" aria-hidden="true"><i /><i /><i /><i /><i /></div>}
          {rep.state === 'busy' && (
            <div className="mtd-rep-progress">
              <div className="mtd-rep-meter"><span style={{ width: `${((rep.step + 1) / 3) * 100}%` }} /></div>
              <div className="mtd-rep-steps">
                {t.reportSteps.map((s, i) => (
                  <span key={s} className={i < rep.step ? 'is-done' : i === rep.step ? 'is-now' : ''}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {rep.state === 'ready' && (
            <div className="mtd-doc">
              <div className="mtd-doc-top">
                <span className="mtd-doc-brand"><i aria-hidden="true" />MetronAI</span>
                <span className="mtd-doc-badge">{t.reportReady}</span>
              </div>
              <strong className="mtd-doc-heading">{d.reportTitle}</strong>
              <span className="mtd-doc-sub">{d.org} · {t.periodFull[period]}</span>
              <div className="mtd-doc-nums">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <strong>{typeof imp[i] === 'number' ? fmt(imp[i], L, impDec[i]) : imp[i]}{impSuf[i]}</strong>
                    <span>{d.impact[i]}</span>
                  </div>
                ))}
              </div>
              <div className="mtd-doc-bars">
                {repBars.map((v, i) => (
                  <div key={i} className="mtd-doc-bar">
                    <span>{d.bars[i]}</span>
                    <i style={{ '--w': `${(v / Math.max(...D.bars)) * 100}%` }} />
                    <b>{v}%</b>
                  </div>
                ))}
              </div>
              <span className="mtd-doc-foot">{t.sample}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mtd" data-ed={E}>
      <div className="mtd-win">
        <div className="mtd-top">
          <div className="mtd-brand">
            <span className="mtd-wordmark"><i aria-hidden="true" />MetronAI</span>
            <span className="mtd-org">{d.org} · {t.periodFull[period]}</span>
          </div>
          <div className="mtd-period" role="group" aria-label={t.periodLabel}>
            {['month', 'quarter'].map((p) => (
              <button key={p} type="button" aria-pressed={period === p} className={period === p ? 'is-on' : ''} onClick={() => changePeriod(p)}>
                {t[p]}
              </button>
            ))}
          </div>
        </div>

        <div className="mtd-sources">
          <span className="mtd-sources-k">{t.sources}</span>
          <span className="mtd-src is-dialogos"><i aria-hidden="true" />DialogosAI</span>
          <span className="mtd-src is-praxis"><i aria-hidden="true" />PraxisAI</span>
          <span className="mtd-wire" aria-hidden="true"><span /></span>
          <span className="mtd-src is-metron"><i aria-hidden="true" />MetronAI <em>{t.live}</em></span>
        </div>

        <div className="mtd-kpis">
          {kpis.map((v, i) => (
            <div className="mtd-kpi" key={i}>
              <strong><Num value={v} L={L} suffix={D.kpiSuffix[i]} reduced={reduced} /></strong>
              <span>{kLabels[i]}</span>
            </div>
          ))}
        </div>

        <div className="mtd-tabs" role="tablist" aria-label={t.tabsLabel}>
          {d.tabs.map((name, i) => (
            <button
              key={name}
              ref={(el) => { tabRefs.current[i] = el; }}
              id={tabId(i)}
              type="button"
              role="tab"
              aria-selected={tab === i}
              aria-controls={panelId(i)}
              tabIndex={tab === i ? 0 : -1}
              className={`mtd-tab${tab === i ? ' is-on' : ''}`}
              onClick={() => setTab(i)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mtd-panel" role="tabpanel" id={panelId(tab)} aria-labelledby={tabId(tab)} key={`${tab}-${E}-${L}`} tabIndex={0}>
          {renderPanel()}
        </div>
      </div>

      <div className="mtd-sr" aria-live="polite" aria-atomic="true">{announce}</div>

      <div className="mtd-foot">
        <span>{t.foot}</span>
        <span className="mtd-sample-badge">{t.sample}</span>
      </div>
    </div>
  );
}
