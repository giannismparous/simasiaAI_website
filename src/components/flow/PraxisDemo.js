// PraxisDemo: an interactive, self-contained live demo of PraxisAI, the CRM inside fλow.
// All data is fictional and illustrative. No network, no storage. Classes are prefixed pxd-.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './PraxisDemo.css';

/* ------------------------------------------------------------------ copy */

const COPY = {
  el: {
    ed: { assoc: 'Σύλλογος / ΜΚΟ', care: 'Δομή φροντίδας', clinic: 'Ιατρείο / Κλινική' },
    edAria: 'Τύπος οργανισμού για το δείγμα',
    sample: 'Παράδειγμα',
    tryIt: 'Δοκιμάστε:',
    hints: {
      agent: { assoc: 'υπενθύμιση ανανέωσης', care: 'ενημέρωση βάρδιας', clinic: 'επιβεβαίωση ραντεβού' },
      reply: 'απάντηση σε πρωτόκολλο',
      scan: 'σάρωση εγγράφου',
      module: 'προσθήκη ενότητας',
    },
    winAria: 'Ζωντανό δείγμα του PraxisAI',
    search: 'Αναζήτηση',
    viewsAria: 'Ενότητες του PraxisAI',
    today: 'Σήμερα',
    registry: { assoc: 'Μητρώο μελών', care: 'Φάκελοι ωφελουμένων', clinic: 'Καρτέλες ασθενών' },
    protocol: { assoc: 'Πρωτόκολλο', care: 'Πρωτόκολλο', clinic: 'Πρωτόκολλο & αλληλογραφία' },
    work: { assoc: 'Εργασίες', care: 'Βάρδιες', clinic: 'Ραντεβού' },
    docs: 'Έγγραφα (OCR)',
    extra: 'Πρόσθετες',
    addModule: 'Προσθήκη ενότητας',
    addModuleSub: 'Ό,τι χρειάζεται ο οργανισμός σας',
    addedTag: 'υπάρχει',
    newTag: 'νέο',
    remove: (n) => `Αφαίρεση ενότητας: ${n}`,
    moduleText: 'Η ενότητα προστέθηκε στο fλow σας. Τη στήνουμε μαζί σας, με τα δικά σας πεδία.',
    moduleNote: 'Π.χ. πεδία, φόρμες και αυτοματισμοί στα μέτρα σας',
    feed: 'Δραστηριότητα',
    feedLive: 'ζωντανά',
    footer: 'Το PraxisAI προτείνει και εκτελεί· ό,τι φεύγει προς ανθρώπους περνά από έγκριση.',
    reset: 'Επαναφορά',
    hello: 'Καλημέρα, Ελένη',
    helloSub: (s, t) => `Προτάσεις: ${s} · Ανοιχτές εργασίες: ${t}`,
    suggestion: 'Πρόταση του PraxisAI',
    doneTag: 'Ολοκληρώθηκε',
    reviewTag: 'Περιμένει την έγκρισή σας',
    preview: 'Προεπισκόπηση μηνύματος',
    tasks: 'Εργασίες',
    status: { todo: 'Να γίνει', doing: 'Σε εξέλιξη', done: 'Έγινε' },
    due: 'Προθεσμία',
    dueLbl: (d) => (d === 0 ? 'σήμερα' : d === 1 ? 'αύριο' : `σε ${d} μέρες`),
    markDone: (t) => `Ολοκλήρωση: ${t}`,
    markOpen: (t) => `Επαναφορά: ${t}`,
    newRec: { assoc: 'Νέο μέλος', care: 'Νέος ωφελούμενος', clinic: 'Νέος ασθενής' },
    namePh: 'Ονοματεπώνυμο',
    add: 'Προσθήκη',
    cancel: 'Άκυρο',
    close: 'Κλείσιμο',
    recCount: (n) => `${n} εγγραφές`,
    fields: 'Στοιχεία',
    timeline: 'Ενιαίο ιστορικό',
    timelineSub: 'από DialogosAI, PraxisAI και MetronAI',
    quick: 'Γρήγορες ενέργειες',
    openRec: (n) => `Άνοιγμα καρτέλας: ${n}`,
    protoLine: 'Κάθε εισερχόμενο και εξερχόμενο παίρνει αριθμό πρωτοκόλλου αυτόματα.',
    protoCols: ['Αρ. Πρωτ.', 'Ημ/νία', 'Εισ./Εξ.', 'Από / Προς', 'Θέμα', 'Σχετ.', 'Κατάσταση'],
    dirIn: 'Εισ.',
    dirOut: 'Εξ.',
    newIncoming: 'Νέο εισερχόμενο',
    reply: 'Απάντηση',
    drafting: 'Το PraxisAI ετοιμάζει σχέδιο απάντησης…',
    drafted: 'Το PraxisAI ετοίμασε σχέδιο απάντησης',
    editable: 'Μπορείτε να το διορθώσετε πριν την έγκριση.',
    approveProto: 'Έγκριση και πρωτοκόλληση',
    pst: { open: (d) => `Προθεσμία ${d}`, progress: (d) => `Σε εξέλιξη · ${d}`, answered: 'Απαντήθηκε', sent: 'Στάλθηκε', filed: 'Αρχειοθετήθηκε' },
    to: 'Προς',
    rel: 'Σχετ.',
    assigned: 'Ανάθεση',
    docsLine: 'Σκαναρισμένα ή φωτογραφημένα έγγραφα γίνονται δομημένα στοιχεία, με αριθμό πρωτοκόλλου.',
    scan: 'Σάρωση',
    scanning: 'Ανάγνωση εγγράφου…',
    fieldsFound: 'Πεδία που αναγνωρίστηκαν',
    conf: 'βεβαιότητα',
    masked: 'Τα ευαίσθητα στοιχεία εμφανίζονται με απόκρυψη.',
    fileTo: 'Καταχώριση στον φάκελο',
    filedAs: (no) => `Καταχωρίστηκε · Πρωτ. ${no}`,
    forPerson: 'Φάκελος',
    pickDoc: 'Έγγραφα για ανάγνωση',
    boardCols: ['Να γίνει', 'Σε εξέλιξη', 'Έγινε'],
    boardHint: 'Πατήστε μια κάρτα για να προχωρήσει στην επόμενη στήλη.',
    moveTo: (t, c) => `${t}: μετακίνηση σε «${c}»`,
    shiftNow: 'Τώρα',
    handoverBtn: 'Ενημέρωση βάρδιας',
    received: 'Παρέλαβε ενημέρωση',
    shiftHint: 'Η ενημέρωση βάρδιας συντάσσεται από τις σημειώσεις της ημέρας.',
    famOpt: 'Ενημέρωση οικογενειών μέσω DialogosAI (με έγκριση)',
    approveHand: 'Έγκριση και αποστολή στην απογευματινή βάρδια',
    sending: 'Αποστολή…',
    agendaHint: 'Το σημερινό πρόγραμμα. Μια ακύρωση δεν μένει κενό για πολύ.',
    appt: { confirmed: 'Επιβεβαιώθηκε', pending: 'Αναμονή', cancelled: 'Ακύρωση', open: 'Ελεύθερο για online κράτηση' },
    cancelAppt: 'Ακύρωση',
    cancelAria: (t, n) => `Ακύρωση ραντεβού ${t}, ${n}`,
    gapTitle: (t, n) => (n ? `Κενό στις ${t} — ${n === 1 ? '1 ασθενής' : `${n} ασθενείς`} στη λίστα αναμονής` : `Κενό στις ${t} — η λίστα αναμονής είναι άδεια`),
    gapBody: 'Το DialogosAI μπορεί να το προτείνει αμέσως, με τη σειρά της λίστας.',
    gapBodyEmpty: 'Μπορεί να ανοίξει για online κράτηση από το DialogosAI.',
    gapBtn: 'Πρόταση μέσω DialogosAI',
    gapOpen: 'Άνοιγμα για online κράτηση',
    gapDone: (t) => `Το κενό στις ${t} καλύφθηκε`,
    waitlist: 'Λίστα αναμονής',
    fromWait: 'Από λίστα αναμονής',
    empty: 'κενή',
  },
  en: {
    ed: { assoc: 'Association / NGO', care: 'Care facility', clinic: 'Practice / Clinic' },
    edAria: 'Organisation type for the sample',
    sample: 'Example',
    tryIt: 'Try:',
    hints: {
      agent: { assoc: 'renewal reminder', care: 'shift handover', clinic: 'confirm appointments' },
      reply: 'reply to protocol',
      scan: 'scan a document',
      module: 'add a module',
    },
    winAria: 'Live sample of PraxisAI',
    search: 'Search',
    viewsAria: 'PraxisAI sections',
    today: 'Today',
    registry: { assoc: 'Members', care: 'Beneficiary files', clinic: 'Patient records' },
    protocol: { assoc: 'Protocol book', care: 'Protocol book', clinic: 'Protocol & letters' },
    work: { assoc: 'Tasks', care: 'Shifts', clinic: 'Appointments' },
    docs: 'Documents (OCR)',
    extra: 'Added',
    addModule: 'Add a module',
    addModuleSub: 'Whatever your organisation needs',
    addedTag: 'added',
    newTag: 'new',
    remove: (n) => `Remove module: ${n}`,
    moduleText: 'This module was added to your fλow. We set it up together with you, with your own fields.',
    moduleNote: 'e.g. fields, forms and automations shaped around you',
    feed: 'Activity',
    feedLive: 'live',
    footer: 'PraxisAI suggests and executes; anything going out to people needs approval.',
    reset: 'Reset',
    hello: 'Good morning, Eleni',
    helloSub: (s, t) => `Suggestions: ${s} · Open tasks: ${t}`,
    suggestion: 'PraxisAI suggests',
    doneTag: 'Done',
    reviewTag: 'Waiting for your approval',
    preview: 'Message preview',
    tasks: 'Tasks',
    status: { todo: 'To do', doing: 'In progress', done: 'Done' },
    due: 'Deadline',
    dueLbl: (d) => (d === 0 ? 'today' : d === 1 ? 'tomorrow' : `in ${d} days`),
    markDone: (t) => `Complete: ${t}`,
    markOpen: (t) => `Reopen: ${t}`,
    newRec: { assoc: 'New member', care: 'New beneficiary', clinic: 'New patient' },
    namePh: 'Full name',
    add: 'Add',
    cancel: 'Cancel',
    close: 'Close',
    recCount: (n) => `${n} records`,
    fields: 'Details',
    timeline: 'Unified timeline',
    timelineSub: 'from DialogosAI, PraxisAI and MetronAI',
    quick: 'Quick actions',
    openRec: (n) => `Open record: ${n}`,
    protoLine: 'Every incoming and outgoing document gets a protocol number automatically.',
    protoCols: ['Prot. no.', 'Date', 'In/Out', 'From / To', 'Subject', 'Ref.', 'Status'],
    dirIn: 'In',
    dirOut: 'Out',
    newIncoming: 'New incoming',
    reply: 'Reply',
    drafting: 'PraxisAI is drafting a reply…',
    drafted: 'PraxisAI drafted a reply',
    editable: 'You can edit it before approving.',
    approveProto: 'Approve and register',
    pst: { open: (d) => `Deadline ${d}`, progress: (d) => `In progress · ${d}`, answered: 'Answered', sent: 'Sent', filed: 'Filed' },
    to: 'To',
    rel: 'Ref.',
    assigned: 'Assigned',
    docsLine: 'Scanned or photographed documents become structured data, with a protocol number.',
    scan: 'Scan',
    scanning: 'Reading document…',
    fieldsFound: 'Fields recognised',
    conf: 'confidence',
    masked: 'Sensitive details are shown masked.',
    fileTo: 'File to record',
    filedAs: (no) => `Filed · Prot. ${no}`,
    forPerson: 'Record',
    pickDoc: 'Documents to read',
    boardCols: ['To do', 'In progress', 'Done'],
    boardHint: 'Click a card to move it to the next column.',
    moveTo: (t, c) => `${t}: move to “${c}”`,
    shiftNow: 'Now',
    handoverBtn: 'Shift handover',
    received: 'Handover received',
    shiftHint: 'The handover is written from the day’s notes.',
    famOpt: 'Update families via DialogosAI (with approval)',
    approveHand: 'Approve and send to the afternoon shift',
    sending: 'Sending…',
    agendaHint: 'Today’s agenda. A cancellation doesn’t stay empty for long.',
    appt: { confirmed: 'Confirmed', pending: 'Waiting', cancelled: 'Cancelled', open: 'Open for online booking' },
    cancelAppt: 'Cancel',
    cancelAria: (t, n) => `Cancel appointment ${t}, ${n}`,
    gapTitle: (t, n) => (n ? `Gap at ${t} — ${n === 1 ? '1 patient' : `${n} patients`} on the waiting list` : `Gap at ${t} — the waiting list is empty`),
    gapBody: 'DialogosAI can offer it right away, in waiting-list order.',
    gapBodyEmpty: 'It can be opened for online booking through DialogosAI.',
    gapBtn: 'Offer via DialogosAI',
    gapOpen: 'Open for online booking',
    gapDone: (t) => `The ${t} gap was filled`,
    waitlist: 'Waiting list',
    fromWait: 'From waiting list',
    empty: 'empty',
  },
};

const MODN = { dialogos: 'DialogosAI', praxis: 'PraxisAI', metron: 'MetronAI' };

const STAFF = {
  ek: { el: ['ΕΚ', 'Ελένη Κ.'], en: ['EK', 'Eleni K.'], tone: 'o' },
  km: { el: ['ΚΜ', 'Κώστας Μ.'], en: ['KM', 'Kostas M.'], tone: 'b' },
  ml: { el: ['ΜΛ', 'Μαρία Λ.'], en: ['ML', 'Maria L.'], tone: 'g' },
  gp: { el: ['ΓΠ', 'Γιώργος Π.'], en: ['GP', 'Giorgos P.'], tone: 'b' },
  at: { el: ['ΑΘ', 'Άννα Θ.'], en: ['AT', 'Anna T.'], tone: 'g' },
  da: { el: ['ΔΑ', 'Δήμητρα Α.'], en: ['DA', 'Dimitra A.'], tone: 's' },
  an: { el: ['ΑΝ', 'Δρ. Ανδρέας Ν.'], en: ['AN', 'Dr Andreas N.'], tone: 's' },
};

/* ------------------------------------------------------------------ icons */

const ICONS = {
  today: 'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 9.5h16M8 3v4M16 3v4M8.5 14h3v3h-3z',
  people: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.8 3.1 2.6 3.5 5.2',
  book: 'M6 3.5h11.5a1 1 0 0 1 1 1V20.5H7a2.5 2.5 0 0 1-2.5-2.5V5A1.5 1.5 0 0 1 6 3.5zM4.5 18A2.5 2.5 0 0 1 7 15.5h11.5M9 8h6M9 11h4',
  board: 'M4 4h4.5v16H4zM10 4h4.5v10H10zM16 4h4v7h-4z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.2 2',
  appts: 'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 9.5h16M8 3v4M16 3v4M9 14.5l2 2 4-4',
  doc: 'M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5M9 13h6M9 17h4',
  plus: 'M12 5v14M5 12h14',
  x: 'M6.5 6.5l11 11M17.5 6.5l-11 11',
  check: 'M5 12.5l4.5 4.5L19 7',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  arrowIn: 'M18 6L7 17M7 9.5V17h7.5',
  arrowOut: 'M6 18L17 7M9.5 7H17v7.5',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  hands: 'M8 11V6a1.5 1.5 0 0 1 3 0v4M11 10V4.5a1.5 1.5 0 0 1 3 0V10M14 10V6a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2-3.5a1.5 1.5 0 0 1 2.5-1.6L8 14',
  card: 'M3.5 6h17v12h-17zM3.5 10h17M7 14.5h4',
  form: 'M6 3h12v18H6zM9 8h6M9 12h6M9 16h3',
  box: 'M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16zM3.5 8L12 12.5 20.5 8M12 12.5v8',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  bell: 'M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',
  pill: 'M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7zM7 10l7 7',
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
  reset: 'M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4',
  spark: 'M12 4v4M12 16v4M4 12h4M16 12h4',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13v9.5h-13z',
};

function Icon({ n, s = 16 }) {
  return (
    <svg className="pxd-ic" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={ICONS[n]} />
    </svg>
  );
}

function Av({ id, lang, size }) {
  const p = STAFF[id];
  if (!p) return null;
  const [ini, name] = p[lang];
  return (
    <span className={`pxd-av pxd-av-${p.tone}${size === 'sm' ? ' pxd-av-sm' : ''}`} title={name} aria-hidden="true">
      {ini}
    </span>
  );
}

function Act({ mod }) {
  return (
    <span className={`pxd-act pxd-act-${mod}`} aria-hidden="true">
      {mod === 'dialogos' ? 'D' : mod === 'metron' ? 'M' : 'P'}
    </span>
  );
}

function Mod({ mod }) {
  return <span className={`pxd-mod pxd-mod-${mod}`}>{MODN[mod]}</span>;
}

function Spin() {
  return <span className="pxd-spin" aria-hidden="true" />;
}

function Ok({ s = 12 }) {
  return (
    <span className="pxd-ok" aria-hidden="true">
      <Icon n="check" s={s} />
    </span>
  );
}

/* ------------------------------------------------------------------ seed data */

const pad4 = (n) => String(n).padStart(4, '0');

function seed(ed, lang) {
  const s = seedRaw(ed, lang);
  return { ...s, feed: s.feed.map((f, i) => ({ ...f, id: `s${i}` })) };
}

function seedRaw(ed, lang) {
  const L = (el, en) => (lang === 'en' ? en : el);
  const P = {
    sofia: L('Σοφία Π.', 'Sofia P.'),
    nikos: L('Νίκος Δ.', 'Nikos D.'),
    angeliki: L('Αγγελική Ρ.', 'Angeliki R.'),
    giannis: L('Γιάννης Κ.', 'Giannis K.'),
    despina: L('Δέσποινα Μ.', 'Despina M.'),
    thanasis: L('Θανάσης Λ.', 'Thanasis L.'),
    maria: L('Μαρία Σ.', 'Maria S.'),
    vangelis: L('Ευάγγελος Τ.', 'Evangelos T.'),
    katerina: L('Αικατερίνη Β.', 'Aikaterini V.'),
    stelios: L('Στέλιος Χ.', 'Stelios Ch.'),
    ilias: L('Ηλίας Ζ.', 'Ilias Z.'),
  };
  const tl = (mod, text, when) => ({ mod, text, when });
  const ago = { y: L('χθες', 'yesterday'), d2: L('πριν 2 μέρες', '2 days ago'), w: L('πριν 1 εβδομάδα', '1 week ago'), m: L('πριν 1 μήνα', '1 month ago') };

  const common = { runs: {}, reply: null, handDraft: '', handFam: true, gap: null, modules: [], incomingIdx: 0, fresh: {} };

  if (ed === 'assoc') {
    const timeline = (name) => [
      tl('dialogos', L('Ρώτησε για τη βεβαίωση μέλους μέσω Viber', 'Asked about a membership certificate on Viber'), ago.y),
      tl('praxis', L('Πρωτόκολλο 2026/0140 εισερχόμενο: αίτημα βεβαίωσης', 'Protocol 2026/0140 incoming: certificate request'), ago.d2),
      tl('praxis', L('Εργασία: έκδοση βεβαίωσης (Ελένη Κ.)', 'Task: issue certificate (Eleni K.)'), ago.d2),
      tl('metron', L('Συμμετοχή σε 3 εκδηλώσεις φέτος', 'Joined 3 events this year'), ago.m),
    ];
    return {
      ...common,
      org: L('Σύλλογος Αλκυόνη', 'Alkyoni Association'),
      recPrefix: L('Μ-', 'M-'),
      recNext: 213,
      protoNext: 143,
      tasks: [
        { id: 't1', t: L('Βεβαίωση μέλους για τον Νίκο Δ.', 'Membership certificate for Nikos D.'), o: 'ek', s: 'todo', d: 0 },
        { id: 't2', t: L('Ενημέρωση λογιστή για δωρεές Σεπτεμβρίου', 'Send September donations to the accountant'), o: 'km', s: 'doing', d: 1 },
        { id: 't3', t: L('Προετοιμασία γενικής συνέλευσης', 'Prepare the general assembly'), o: 'ek', s: 'todo', d: 5 },
        { id: 'trenew', t: L('Υπενθύμιση ανανέωσης συνδρομών', 'Membership renewal reminders'), o: 'ml', s: 'todo', d: 7 },
        { id: 't5', t: L('Απάντηση στην Περιφέρεια (2026/0141)', 'Reply to the Region (2026/0141)'), o: 'km', s: 'doing', d: 12 },
      ],
      records: [
        { id: 'r212', no: 212, name: P.despina, sub: 'active', due: '18/01/2027', ch: 'Email', ph: '214', tl: timeline() },
        { id: 'r211', no: 211, name: P.nikos, sub: 'pending', due: '10/10/2026', dueD: 7, ch: 'Viber', ph: '587', tl: timeline() },
        { id: 'r210', no: 210, name: P.angeliki, sub: 'active', due: '05/06/2027', ch: 'WhatsApp', ph: '903', tl: timeline() },
        { id: 'r209', no: 209, name: P.giannis, sub: 'pending', due: '10/10/2026', dueD: 7, ch: 'SMS', ph: '118', tl: timeline() },
        { id: 'r208', no: 208, name: P.sofia, sub: 'active', due: '12/03/2027', ch: 'Viber', ph: '462', tl: timeline() },
        { id: 'r207', no: 207, name: P.thanasis, sub: 'active', due: '22/11/2026', ch: 'Email', ph: '730', tl: timeline() },
      ],
      protocol: [
        { no: 142, date: '02/10', dir: 'out', party: L('Υπ. Κοινωνικής Συνοχής', 'Ministry of Social Cohesion'), subject: L('Ετήσια έκθεση πεπραγμένων', 'Annual activity report'), st: 'sent' },
        { no: 141, date: '01/10', dir: 'in', party: L('Περιφέρεια Αττικής', 'Region of Attica'), subject: L('Πρόσκληση υποβολής πρότασης', 'Call for proposals'), st: 'open', due: '15/10', o: 'km' },
        { no: 140, date: '29/09', dir: 'in', party: P.nikos, subject: L('Αίτημα βεβαίωσης μέλους', 'Membership certificate request'), st: 'progress', due: '06/10', o: 'ek' },
        { no: 139, date: '26/09', dir: 'out', party: L('Δήμος Αθηναίων', 'City of Athens'), subject: L('Ευχαριστήριο για τη διάθεση αίθουσας', 'Thank-you for the venue'), rel: '0138', st: 'sent' },
        { no: 138, date: '24/09', dir: 'in', party: L('Δήμος Αθηναίων', 'City of Athens'), subject: L('Διάθεση αίθουσας για εκδήλωση', 'Venue offered for an event'), st: 'answered', o: 'ml' },
      ],
      incoming: [
        { party: L('ΔΥΠΑ', 'DYPA'), subject: L('Αίτημα ενημέρωσης για πρόγραμμα κοινωφελούς εργασίας', 'Information request on a community work programme') },
        { party: L('Δήμος Αθηναίων', 'City of Athens'), subject: L('Πρόσκληση σε ημερίδα του Δήμου', 'Invitation to a municipal workshop') },
        { party: L('Θάλπος Α.Ε.', 'Thalpos S.A.'), subject: L('Δωρεά υλικών από εταιρεία', 'Donation of supplies from a company') },
      ],
      board: [
        { id: 'b1', t: L('Αίτηση χρηματοδότησης στην Περιφέρεια', 'Funding application to the Region'), o: 'km', d: 12, c: 0 },
        { id: 'b2', t: L('Πρόσκληση γενικής συνέλευσης', 'General assembly invitation'), o: 'ek', d: 5, c: 0 },
        { id: 'b3', t: L('Νέες φωτογραφίες δράσεων στην ιστοσελίδα', 'New activity photos on the website'), o: 'ml', d: 9, c: 0 },
        { id: 'b4', t: L('Βεβαίωση μέλους (Νίκος Δ.)', 'Membership certificate (Nikos D.)'), o: 'ek', d: 0, c: 1 },
        { id: 'b5', t: L('Συγκέντρωση αποδείξεων δωρεών', 'Collect donation receipts'), o: 'km', d: 1, c: 1 },
        { id: 'b6', t: L('Ευχαριστήριο στον Δήμο', 'Thank-you letter to the City'), o: 'ml', d: null, c: 2 },
      ],
      docs: [
        { id: 'd1', file: L('Αίτηση εγγραφής μέλους.jpg', 'Membership application.jpg'), kind: 'jpg', rec: 'r209', person: P.giannis, src: P.giannis, st: 'idle', shown: 0,
          fields: [[L('Όνομα', 'Name'), P.giannis, 99], [L('Ημερομηνία', 'Date'), '29/09/2026', 98], [L('Τύπος εγγράφου', 'Document type'), L('Αίτηση εγγραφής μέλους', 'Membership application'), 97], ['ΑΜΚΑ', '•••••••4521', 95], [L('Τηλέφωνο', 'Phone'), '69•• ••• 118', 93]] },
        { id: 'd2', file: L('Γνωμάτευση ΚΕΠΑ.pdf', 'KEPA assessment.pdf'), kind: 'pdf', rec: 'r211', person: P.nikos, src: L('ΚΕΠΑ Αθηνών', 'KEPA Athens'), st: 'idle', shown: 0, stamp: true,
          fields: [[L('Όνομα', 'Name'), P.nikos, 99], [L('Ημερομηνία', 'Date'), '18/09/2026', 98], [L('Τύπος εγγράφου', 'Document type'), L('Γνωμάτευση ΚΕΠΑ', 'KEPA disability assessment'), 96], [L('Ποσοστό αναπηρίας', 'Disability rate'), '67%', 94], [L('Προθεσμία', 'Deadline'), L('Επανεξέταση έως 30/11/2026', 'Re-assessment by 30/11/2026'), 91]],
          task: L('Προθεσμία επανεξέτασης ΚΕΠΑ (Νίκος Δ.)', 'KEPA re-assessment deadline (Nikos D.)'), taskD: 58 },
        { id: 'd3', file: L('Απόδειξη δωρεάς.pdf', 'Donation receipt.pdf'), kind: 'pdf', rec: 'r208', person: P.sofia, src: P.sofia, st: 'idle', shown: 0,
          fields: [[L('Όνομα δωρητή', 'Donor'), P.sofia, 99], [L('Ημερομηνία', 'Date'), '27/09/2026', 98], [L('Τύπος εγγράφου', 'Document type'), L('Απόδειξη δωρεάς', 'Donation receipt'), 97], [L('Ποσό', 'Amount'), '150,00 €', 96], ['ΑΦΜ', '•••••3187', 95]] },
      ],
      feed: [
        { who: 'dialogos', mod: 'dialogos', time: '09:38', text: L('Απαντήθηκαν 4 ερωτήσεις μελών για την εκδήλωση της Κυριακής', 'Answered 4 member questions about Sunday’s event') },
        { who: 'praxis', mod: 'praxis', time: '09:35', text: L('Νέο εισερχόμενο 2026/0141 · Περιφέρεια Αττικής · ανάθεση: Κώστας Μ.', 'New incoming 2026/0141 · Region of Attica · assigned: Kostas M.') },
        { who: 'metron', mod: 'metron', time: '09:31', text: L('Η εβδομαδιαία αναφορά επαφών είναι έτοιμη', 'The weekly contacts report is ready') },
      ],
    };
  }

  if (ed === 'care') {
    const timeline = () => [
      tl('dialogos', L('Η οικογένεια ρώτησε για το ωράριο επισκέψεων', 'Family asked about visiting hours'), ago.y),
      tl('dialogos', L('Ρώτησε για ΚΕΠΑ', 'Asked about KEPA'), ago.d2),
      tl('praxis', L('Πρωτόκολλο 2026/0139 εξερχόμενο: αίτηση επανεξέτασης ΚΕΠΑ', 'Protocol 2026/0139 outgoing: KEPA re-assessment request'), ago.d2),
      tl('praxis', L('Εργασία: συνοδεία στο ραντεβού', 'Task: accompany to appointment'), ago.w),
      tl('metron', L('12 επαφές με την οικογένεια αυτό το τρίμηνο', '12 family contacts this quarter'), ago.m),
    ];
    return {
      ...common,
      org: L('Δομή Ηλιαχτίδα', 'Iliachtida Care Home'),
      recPrefix: L('Φ-', 'B-'),
      recNext: 119,
      protoNext: 143,
      handDraft: L(
        'Νίκος: ήρεμος, έφαγε καλά, φυσικοθεραπεία 11:00 ✓.\nΜαρία: χρειάζεται συνοδεία στο ραντεβού της Πέμπτης.\nΣοφία: φάρμακα 08:00 και 14:00 ✓. Επίσκεψη κόρης στις 17:30.\nΕκκρεμεί: παραλαβή υλικών φαρμακείου (Άννα).',
        'Nikos: calm, ate well, physiotherapy 11:00 ✓.\nMaria: needs someone to accompany her to Thursday’s appointment.\nSofia: medication 08:00 and 14:00 ✓. Daughter visiting at 17:30.\nPending: pharmacy supplies pick-up (Anna).'
      ),
      tasks: [
        { id: 'thand', t: L('Ενημέρωση απογευματινής βάρδιας', 'Afternoon shift handover'), o: 'ek', s: 'todo', d: 0 },
        { id: 't2', t: L('Παραγγελία υλικών φαρμακείου', 'Order pharmacy supplies'), o: 'at', s: 'doing', d: 1 },
        { id: 't3', t: L('Συνοδεία της Μαρίας Σ. στο ραντεβού', 'Accompany Maria S. to her appointment'), o: 'gp', s: 'todo', d: 2 },
        { id: 't4', t: L('Απάντηση στην Περιφέρεια για αδειοδότηση', 'Reply to the Region on licensing'), o: 'ek', s: 'todo', d: 4 },
        { id: 't5', t: L('Επανεξέταση ΚΕΠΑ: δικαιολογητικά (Νίκος Δ.)', 'KEPA re-assessment: documents (Nikos D.)'), o: 'km', s: 'doing', d: 9 },
      ],
      records: [
        { id: 'r118', no: 118, name: P.nikos, o: 'km', next: L('Επανεξέταση ΚΕΠΑ: δικαιολογητικά', 'KEPA re-assessment: documents'), d: 9, ch: L('Κόρη · Viber', 'Daughter · Viber'), tl: timeline() },
        { id: 'r117', no: 117, name: P.maria, o: 'gp', next: L('Συνοδεία σε ραντεβού', 'Accompany to appointment'), d: 2, ch: L('Γιος · WhatsApp', 'Son · WhatsApp'), tl: timeline() },
        { id: 'r116', no: 116, name: P.sofia, o: 'ek', next: L('Ενημέρωση οικογένειας', 'Family update'), d: 0, ch: L('Κόρη · Viber', 'Daughter · Viber'), tl: timeline() },
        { id: 'r115', no: 115, name: P.vangelis, o: 'at', next: L('Ανανέωση συνταγής', 'Prescription renewal'), d: 1, ch: L('Ανιψιά · SMS', 'Niece · SMS'), tl: timeline() },
        { id: 'r114', no: 114, name: P.katerina, o: 'km', next: L('Τριμηνιαία αξιολόγηση', 'Quarterly review'), d: 14, ch: L('Σύζυγος · τηλέφωνο', 'Husband · phone'), tl: timeline() },
      ],
      protocol: [
        { no: 142, date: '02/10', dir: 'out', party: L('ΚΕΠΑ Αθηνών', 'KEPA Athens'), subject: L('Αίτηση επανεξέτασης (Νίκος Δ.)', 'Re-assessment request (Nikos D.)'), st: 'sent' },
        { no: 141, date: '01/10', dir: 'in', party: L('Περιφέρεια Αττικής', 'Region of Attica'), subject: L('Έλεγχος αδειοδότησης: αίτημα στοιχείων', 'Licensing check: request for documents'), st: 'open', due: '15/10', o: 'ek' },
        { no: 140, date: '30/09', dir: 'in', party: L('ΕΦΚΑ', 'EFKA'), subject: L('Βεβαίωση συνταξιοδότησης ωφελούμενου', 'Beneficiary pension certificate'), st: 'progress', due: '07/10', o: 'km' },
        { no: 139, date: '28/09', dir: 'out', party: L('Δήμος Αθηναίων', 'City of Athens'), subject: L('Μηνιαία αναφορά φιλοξενούμενων', 'Monthly residents report'), st: 'sent' },
        { no: 138, date: '25/09', dir: 'in', party: L('Φαρμακείο Λαμπρόπουλου', 'Lampropoulos Pharmacy'), subject: L('Τιμολόγιο υλικών Σεπτεμβρίου', 'September supplies invoice'), st: 'filed' },
      ],
      incoming: [
        { party: L('ΔΥΠΑ', 'DYPA'), subject: L('Αίτημα ενημέρωσης για προσωπικό φροντίδας', 'Information request on care staff') },
        { party: L('Δήμος Αθηναίων', 'City of Athens'), subject: L('Πρόσκληση σε ημερίδα του Δήμου', 'Invitation to a municipal workshop') },
        { party: L('Θάλπος Α.Ε.', 'Thalpos S.A.'), subject: L('Δωρεά υλικών από εταιρεία', 'Donation of supplies from a company') },
      ],
      shifts: [
        { id: 'morning', n: L('Πρωί', 'Morning'), h: '07:00–15:00', staff: ['ek', 'km'], now: true, notes: [L('Φυσικοθεραπεία Νίκου 11:00 ✓', 'Nikos physiotherapy 11:00 ✓'), L('Φάρμακα 08:00 ✓ · 14:00 ✓', 'Medication 08:00 ✓ · 14:00 ✓')] },
        { id: 'afternoon', n: L('Απόγευμα', 'Afternoon'), h: '15:00–23:00', staff: ['gp', 'at'], notes: [L('Επίσκεψη κόρης (Σοφία) 17:30', 'Daughter visiting (Sofia) 17:30'), L('Βραδινή αγωγή 20:00', 'Evening medication 20:00')] },
        { id: 'night', n: L('Νύχτα', 'Night'), h: '23:00–07:00', staff: ['da'], notes: [L('Έλεγχος ανά 2 ώρες', 'Checks every 2 hours')] },
      ],
      docs: [
        { id: 'd1', file: L('Γνωμάτευση ΚΕΠΑ.pdf', 'KEPA assessment.pdf'), kind: 'pdf', rec: 'r118', person: P.nikos, src: L('ΚΕΠΑ Αθηνών', 'KEPA Athens'), st: 'idle', shown: 0, stamp: true,
          fields: [[L('Όνομα', 'Name'), P.nikos, 99], [L('Ημερομηνία', 'Date'), '18/09/2026', 98], [L('Τύπος εγγράφου', 'Document type'), L('Γνωμάτευση ΚΕΠΑ', 'KEPA disability assessment'), 96], ['ΑΜΚΑ', '•••••••4521', 95], [L('Προθεσμία', 'Deadline'), L('Επανεξέταση έως 30/11/2026', 'Re-assessment by 30/11/2026'), 91]],
          task: L('Προθεσμία επανεξέτασης ΚΕΠΑ (Νίκος Δ.)', 'KEPA re-assessment deadline (Nikos D.)'), taskD: 58 },
        { id: 'd2', file: L('Ιατρική οδηγία.pdf', 'Medical instruction.pdf'), kind: 'pdf', rec: 'r117', person: P.maria, src: L('Δρ. Ε. Καραγιάννη', 'Dr E. Karagianni'), st: 'idle', shown: 0,
          fields: [[L('Όνομα', 'Name'), P.maria, 99], [L('Ημερομηνία', 'Date'), '01/10/2026', 98], [L('Τύπος εγγράφου', 'Document type'), L('Οδηγία φαρμακευτικής αγωγής', 'Medication instruction'), 95], [L('Δοσολογία', 'Dosage'), L('1 δισκίο πρωί και βράδυ', '1 tablet morning and evening'), 92], [L('Προθεσμία', 'Deadline'), L('Επανέλεγχος έως 20/10/2026', 'Check-up by 20/10/2026'), 90]],
          task: L('Επανέλεγχος αγωγής (Μαρία Σ.)', 'Medication check-up (Maria S.)'), taskD: 17 },
        { id: 'd3', file: L('Συναίνεση οικογένειας.jpg', 'Family consent.jpg'), kind: 'jpg', rec: 'r116', person: P.sofia, src: L('Οικογένεια', 'Family'), st: 'idle', shown: 0,
          fields: [[L('Όνομα', 'Name'), P.sofia, 99], [L('Ημερομηνία', 'Date'), '30/09/2026', 97], [L('Τύπος εγγράφου', 'Document type'), L('Έντυπο συναίνεσης', 'Consent form'), 96], [L('Υπογραφή', 'Signature'), L('Εντοπίστηκε', 'Detected'), 92], ['ΑΜΚΑ', '•••••••7730', 94]] },
      ],
      feed: [
        { who: 'dialogos', mod: 'dialogos', time: '09:39', text: L('Οικογένεια (Σοφία Π.): ρώτησε για το ωράριο επισκέψεων · απαντήθηκε', 'Family (Sofia P.): asked about visiting hours · answered') },
        { who: 'km', mod: 'praxis', time: '09:34', text: L('Σημείωση βάρδιας: Νίκος Δ., φυσικοθεραπεία 11:00', 'Shift note: Nikos D., physiotherapy 11:00') },
        { who: 'metron', mod: 'metron', time: '09:30', text: L('12 επικοινωνίες με οικογένειες αυτή την εβδομάδα', '12 family conversations this week') },
      ],
    };
  }

  // clinic
  const timeline = () => [
    tl('dialogos', L('Ζήτησε αλλαγή ραντεβού μέσω WhatsApp', 'Asked to move an appointment on WhatsApp'), ago.y),
    tl('praxis', L('Πρωτόκολλο 2026/0140 εισερχόμενο: αποτελέσματα εξετάσεων', 'Protocol 2026/0140 incoming: lab results'), ago.d2),
    tl('praxis', L('Εργασία: ενημέρωση για τα αποτελέσματα (Δρ. Ανδρέας Ν.)', 'Task: discuss results (Dr Andreas N.)'), ago.d2),
    tl('metron', L('4 επισκέψεις τους τελευταίους 12 μήνες', '4 visits in the last 12 months'), ago.m),
  ];
  return {
    ...common,
    org: L('Ιατρείο Δρ. Ανδρέα Νικολάου', 'Dr Andreas Nikolaou Practice'),
    recPrefix: L('Α-', 'P-'),
    recNext: 1042,
    protoNext: 143,
    tasks: [
      { id: 'tconf', t: L('Επιβεβαίωση ραντεβού αύριο (3 εκκρεμή)', 'Confirm tomorrow’s appointments (3 pending)'), o: 'ek', s: 'todo', d: 0 },
      { id: 't2', t: L('Ενημέρωση κ. Σοφίας Π. για τα αποτελέσματα', 'Discuss results with Ms Sofia P.'), o: 'an', s: 'todo', d: 1 },
      { id: 't3', t: L('Παραγγελία εμβολίων γρίπης', 'Order flu vaccines'), o: 'ml', s: 'doing', d: 3 },
      { id: 't4', t: L('Εκκαθάριση παραπεμπτικών ΕΟΠΥΥ', 'EOPYY referrals reconciliation'), o: 'ek', s: 'doing', d: 5 },
    ],
    records: [
      { id: 'r1041', no: 1041, name: P.sofia, last: '28/09/2026', next: '28/12/2026', ch: 'Viber', ph: '462', amka: '7730', tl: timeline() },
      { id: 'r1040', no: 1040, name: P.giannis, last: '15/09/2026', next: '15/10/2026', nextD: 12, ch: 'SMS', ph: '118', amka: '4521', tl: timeline() },
      { id: 'r1039', no: 1039, name: P.despina, last: '02/07/2026', next: '06/10/2026', nextD: 3, ch: 'WhatsApp', ph: '214', amka: '2208', tl: timeline() },
      { id: 'r1038', no: 1038, name: P.vangelis, last: '11/08/2026', next: '11/11/2026', ch: 'Viber', ph: '655', amka: '9014', tl: timeline() },
      { id: 'r1037', no: 1037, name: P.thanasis, last: '30/06/2026', next: '30/12/2026', ch: 'Email', ph: '730', amka: '3361', tl: timeline() },
      { id: 'r1036', no: 1036, name: P.angeliki, last: '21/09/2026', next: '21/03/2027', ch: 'Viber', ph: '903', amka: '5847', tl: timeline() },
    ],
    protocol: [
      { no: 142, date: '02/10', dir: 'out', party: L('ΕΟΠΥΥ', 'EOPYY'), subject: L('Υποβολή παραπεμπτικών Σεπτεμβρίου', 'September referrals submission'), st: 'sent' },
      { no: 141, date: '01/10', dir: 'in', party: L('ΕΟΠΥΥ', 'EOPYY'), subject: L('Εκκαθάριση: αίτημα διευκρινίσεων', 'Reconciliation: clarification request'), st: 'open', due: '09/10', o: 'ek' },
      { no: 140, date: '30/09', dir: 'in', party: L('Εργαστήριο Ιπποκράτης', 'Hippocrates Lab'), subject: L('Αποτελέσματα εξετάσεων (Σοφία Π.)', 'Lab results (Sofia P.)'), st: 'progress', due: '04/10', o: 'an' },
      { no: 139, date: '29/09', dir: 'in', party: L('Ιατρικός Σύλλογος Αθηνών', 'Athens Medical Association'), subject: L('Ανανέωση άδειας: δικαιολογητικά', 'Licence renewal: documents'), st: 'answered', o: 'ek' },
      { no: 138, date: '25/09', dir: 'out', party: L('Ασφαλιστική Ασπίς', 'Aspis Insurance'), subject: L('Ιατρική βεβαίωση (Θανάσης Λ.)', 'Medical certificate (Thanasis L.)'), st: 'sent' },
    ],
    incoming: [
      { party: L('ΕΟΠΥΥ', 'EOPYY'), subject: L('Εγκύκλιος για ηλεκτρονικά παραπεμπτικά', 'Circular on e-referrals') },
      { party: L('Εργαστήριο Ιπποκράτης', 'Hippocrates Lab'), subject: L('Αποτελέσματα εξετάσεων (Γιάννης Κ.)', 'Lab results (Giannis K.)') },
      { party: L('Δήμος Αθηναίων', 'City of Athens'), subject: L('Πρόσκληση σε ημερίδα πρόληψης', 'Invitation to a prevention day') },
    ],
    appts: [
      { id: 'a1', t: '09:00', name: P.sofia, kind: L('Επανέλεγχος', 'Check-up'), st: 'confirmed' },
      { id: 'a2', t: '09:30', name: P.giannis, kind: L('Πρώτη επίσκεψη', 'First visit'), st: 'confirmed' },
      { id: 'a3', t: '10:15', name: P.angeliki, kind: L('Αποτελέσματα', 'Results'), st: 'pending' },
      { id: 'a4', t: '11:00', name: P.vangelis, kind: L('Επανέλεγχος', 'Check-up'), st: 'confirmed' },
      { id: 'a5', t: '12:00', name: P.despina, kind: L('Καρδιογράφημα', 'ECG'), st: 'confirmed' },
      { id: 'a6', t: '12:45', name: P.thanasis, kind: L('Συνταγογράφηση', 'Prescription'), st: 'pending' },
    ],
    waitlist: [P.stelios, P.ilias],
    docs: [
      { id: 'd1', file: L('Παραπεμπτικό.pdf', 'Referral.pdf'), kind: 'pdf', rec: 'r1040', person: P.giannis, src: L('ΕΟΠΥΥ', 'EOPYY'), st: 'idle', shown: 0, stamp: true,
        fields: [[L('Όνομα', 'Name'), P.giannis, 99], [L('Ημερομηνία', 'Date'), '29/09/2026', 98], [L('Τύπος εγγράφου', 'Document type'), L('Παραπεμπτικό ΕΟΠΥΥ', 'EOPYY referral'), 97], ['ΑΜΚΑ', '•••••••4521', 96], [L('Προθεσμία', 'Deadline'), L('Εκτέλεση έως 02/11/2026', 'To be used by 02/11/2026'), 92]],
        task: L('Προθεσμία παραπεμπτικού (Γιάννης Κ.)', 'Referral deadline (Giannis K.)'), taskD: 30 },
      { id: 'd2', file: L('Αποτελέσματα εξετάσεων.pdf', 'Lab results.pdf'), kind: 'pdf', rec: 'r1041', person: P.sofia, src: L('Εργαστήριο Ιπποκράτης', 'Hippocrates Lab'), st: 'idle', shown: 0,
        fields: [[L('Όνομα', 'Name'), P.sofia, 99], [L('Ημερομηνία', 'Date'), '30/09/2026', 98], [L('Τύπος εγγράφου', 'Document type'), L('Αιματολογικές εξετάσεις', 'Blood tests'), 97], [L('Εκτός ορίων', 'Out of range'), L('2 τιμές · σημειώθηκαν για τον ιατρό', '2 values · flagged for the doctor'), 94], ['ΑΜΚΑ', '•••••••7730', 95]] },
      { id: 'd3', file: L('Βεβαίωση ΕΟΠΥΥ.jpg', 'EOPYY certificate.jpg'), kind: 'jpg', rec: 'r1039', person: P.despina, src: L('ΕΟΠΥΥ', 'EOPYY'), st: 'idle', shown: 0,
        fields: [[L('Όνομα', 'Name'), P.despina, 99], [L('Ημερομηνία', 'Date'), '01/10/2026', 97], [L('Τύπος εγγράφου', 'Document type'), L('Βεβαίωση ασφαλιστικής ικανότητας', 'Insurance eligibility certificate'), 95], ['ΑΜΚΑ', '•••••••2208', 96], [L('Ισχύς', 'Valid'), L('Ισχύει έως 31/12/2026', 'Valid until 31/12/2026'), 93]] },
    ],
    feed: [
      { who: 'dialogos', mod: 'dialogos', time: '09:40', text: L('Νέο ραντεβού κλείστηκε online για Πέμπτη 10:00 (Αγγελική Ρ.)', 'New appointment booked online for Thursday 10:00 (Angeliki R.)') },
      { who: 'praxis', mod: 'praxis', time: '09:36', text: L('Email εργαστηρίου με συνημμένο αποτελέσματα · σε αναμονή σάρωσης', 'Lab email with results attached · waiting to be scanned') },
      { who: 'metron', mod: 'metron', time: '09:32', text: L('Προσέλευση Σεπτεμβρίου: 94% · 6 ακυρώσεις καλύφθηκαν', 'September attendance: 94% · 6 cancellations refilled') },
    ],
  };
}

/* agent flows (texts) */
function flowsFor(ed, lang) {
  const L = (el, en) => (lang === 'en' ? en : el);
  if (ed === 'assoc') {
    return {
      main: {
        id: 'renew',
        title: L('Προθεσμία ανανέωσης συνδρομής για 12 μέλη σε 7 μέρες', 'Membership renewal deadline for 12 members in 7 days'),
        body: L('Ετοίμασα προσωποποιημένη υπενθύμιση. Το DialogosAI τη στέλνει στο κανάλι που προτιμά κάθε μέλος.', 'I prepared a personal reminder. DialogosAI sends it on each member’s preferred channel.'),
        preview: L('«Καλημέρα Σοφία! Η συνδρομή σας στον Σύλλογο Αλκυόνη έχει προθεσμία ανανέωσης στις 10/10. Ανανέωση με ένα κλικ: alkyoni.gr/m/…»', '“Good morning Sofia! Your Alkyoni Association membership has a renewal deadline on 10/10. Renew in one click: alkyoni.gr/m/…”'),
        action: L('Αποστολή υπενθύμισης μέσω DialogosAI', 'Send reminder via DialogosAI'),
        steps: [
          { t: L('Το DialogosAI στέλνει υπενθύμιση σε 12 μέλη…', 'DialogosAI is sending the reminder to 12 members…'), feed: [['dialogos', L('Στάλθηκαν 12 υπενθυμίσεις ανανέωσης (Viber, email, SMS)', 'Sent 12 renewal reminders (Viber, email, SMS)')]] },
          { t: L('5 μέλη ανανέωσαν ήδη με τον σύνδεσμο', '5 members already renewed with the link'), feed: [['praxis', L('5 συνδρομές ενημερώθηκαν στο μητρώο', '5 memberships updated in the register')]] },
          { t: L('Για τα 7 υπόλοιπα: εργασία στη Μαρία Λ., νέα υπενθύμιση σε 3 μέρες', 'For the other 7: a task for Maria L., another reminder in 3 days'), feed: [['praxis', L('Νέα εργασία: τηλέφωνο στα 7 μέλη · ανάθεση: Μαρία Λ.', 'New task: call the 7 members · assigned: Maria L.')], ['metron', L('+12 επαφές καταγράφηκαν · 42% ανανέωσε την πρώτη ώρα', '+12 contacts logged · 42% renewed in the first hour')]] },
        ],
        doneText: L('Οι υπενθυμίσεις στάλθηκαν · 5 ανανεώσεις ήδη', 'Reminders sent · 5 renewals already'),
      },
      second: {
        id: 'grant',
        title: L('Νέα πρόσκληση από την Περιφέρεια Αττικής', 'New call for proposals from the Region of Attica'),
        body: L('Πρωτ. 2026/0141 · προθεσμία απάντησης 15/10 · ανάθεση: Κώστας Μ.', 'Prot. 2026/0141 · reply deadline 15/10 · assigned: Kostas M.'),
        action: L('Άνοιγμα στο πρωτόκολλο', 'Open in protocol book'),
        go: 'protocol',
        pulse: 'reply',
      },
    };
  }
  if (ed === 'care') {
    return {
      main: {
        id: 'handover',
        title: L('Η πρωινή βάρδια τελειώνει στις 15:00', 'The morning shift ends at 15:00'),
        body: L('Μπορώ να συντάξω την ενημέρωση βάρδιας από τις σημειώσεις της ημέρας. Εσείς την ελέγχετε και την εγκρίνετε.', 'I can write the shift handover from today’s notes. You review and approve it.'),
        action: L('Σύνταξη ενημέρωσης βάρδιας', 'Draft shift handover'),
        review: true,
        steps: [
          { t: L('Συλλογή σημειώσεων για 6 ωφελουμένους…', 'Collecting notes for 6 residents…') },
          { t: L('Σύνοψη 4 εργασιών που ολοκληρώθηκαν', 'Summarising 4 completed tasks') },
          { t: L('Το σχέδιο είναι έτοιμο για έλεγχο', 'The draft is ready for review'), feed: [['praxis', L('Σχέδιο ενημέρωσης βάρδιας · περιμένει έγκριση', 'Shift handover draft · waiting for approval')]] },
        ],
        doneText: L('Η ενημέρωση στάλθηκε στην απογευματινή βάρδια (Γιώργος Π., Άννα Θ.)', 'Handover sent to the afternoon shift (Giorgos P., Anna T.)'),
      },
      second: {
        id: 'kepa',
        title: L('Ήρθε σκαναρισμένη γνωμάτευση ΚΕΠΑ (Νίκος Δ.)', 'A scanned KEPA assessment arrived (Nikos D.)'),
        body: L('Μπορεί να διαβαστεί και να μπει στον φάκελο αυτόματα, με την προθεσμία επανεξέτασης.', 'It can be read and filed automatically, with its re-assessment deadline.'),
        action: L('Άνοιγμα στα έγγραφα', 'Open in documents'),
        go: 'docs',
        pulse: 'scan',
      },
    };
  }
  return {
    main: {
      id: 'confirm',
      title: L('3 ραντεβού αύριο χωρίς επιβεβαίωση', '3 appointments tomorrow are unconfirmed'),
      body: L('Γιάννης Κ. 09:30 · Δέσποινα Μ. 10:15 · Ευάγγελος Τ. 12:00', 'Giannis K. 09:30 · Despina M. 10:15 · Evangelos T. 12:00'),
      preview: L('«Καλημέρα! Σας περιμένουμε αύριο στις 09:30 στο ιατρείο. Απαντήστε ΝΑΙ για επιβεβαίωση ή ΑΛΛΑΓΗ για άλλη ώρα.»', '“Good morning! We expect you tomorrow at 09:30. Reply YES to confirm or CHANGE for another time.”'),
      action: L('Επιβεβαίωση με τους ασθενείς', 'Confirm with patients'),
      steps: [
        { t: L('Το DialogosAI στέλνει μήνυμα στους 3 ασθενείς…', 'DialogosAI is messaging the 3 patients…'), feed: [['dialogos', L('Στάλθηκαν 3 μηνύματα επιβεβαίωσης για αύριο', 'Sent 3 confirmation messages for tomorrow')]] },
        { t: L('2 επιβεβαίωσαν', '2 confirmed'), feed: [['dialogos', L('Επιβεβαίωσαν: Γιάννης Κ., Δέσποινα Μ.', 'Confirmed: Giannis K., Despina M.')]] },
        { t: L('1 ζήτησε αλλαγή → προτάθηκε νέα ώρα 11:30', '1 asked to change → new time 11:30 offered'), feed: [['dialogos', L('Ευάγγελος Τ.: ζήτησε αλλαγή · δέχτηκε τις 11:30', 'Evangelos T.: asked to change · accepted 11:30')], ['praxis', L('Το πρόγραμμα της αύριο ενημερώθηκε', 'Tomorrow’s schedule updated')], ['metron', L('+3 επαφές καταγράφηκαν', '+3 contacts logged')]] },
      ],
      doneText: L('Τα 3 ραντεβού τακτοποιήθηκαν · 1 μεταφέρθηκε στις 11:30', 'All 3 appointments settled · 1 moved to 11:30'),
    },
    second: {
      id: 'labs',
      title: L('Παραλήφθηκαν αποτελέσματα εξετάσεων (Σοφία Π.)', 'Lab results received (Sofia P.)'),
      body: L('Τα διαβάζω, σημειώνω τιμές εκτός ορίων και τα βάζω στην καρτέλα της.', 'I can read them, flag out-of-range values and file them to her record.'),
      action: L('Άνοιγμα στα έγγραφα', 'Open in documents'),
      go: 'docs',
      pulse: 'scan',
    },
  };
}

function modulesFor(ed, lang) {
  const L = (el, en) => (lang === 'en' ? en : el);
  if (ed === 'clinic') {
    return [
      { id: 'wait', n: L('Λίστα αναμονής', 'Waiting list'), icon: 'list' },
      { id: 'billing', n: L('Τιμολόγηση', 'Invoicing'), icon: 'card' },
      { id: 'history', n: L('Φόρμες ιστορικού', 'Medical history forms'), icon: 'form' },
      { id: 'recall', n: L('Υπενθυμίσεις επανελέγχου', 'Check-up reminders'), icon: 'bell' },
    ];
  }
  const base = [
    { id: 'donations', n: L('Δωρεές & δωρητές', 'Donations & donors'), icon: 'heart' },
    { id: 'volunteers', n: L('Εθελοντές', 'Volunteers'), icon: 'hands' },
  ];
  if (ed === 'care') {
    return [
      ...base,
      { id: 'meds', n: L('Φαρμακευτική αγωγή', 'Medication'), icon: 'pill' },
      { id: 'visits', n: L('Επισκέψεις οικογενειών', 'Family visits'), icon: 'home' },
      { id: 'forms', n: L('Φόρμες εγγραφής', 'Sign-up forms'), icon: 'form' },
      { id: 'stock', n: L('Αποθήκη υλικών', 'Supplies'), icon: 'box' },
    ];
  }
  return [
    ...base,
    { id: 'fees', n: L('Συνδρομές & πληρωμές', 'Fees & payments'), icon: 'card' },
    { id: 'events', n: L('Εκδηλώσεις', 'Events'), icon: 'today' },
    { id: 'forms', n: L('Φόρμες εγγραφής', 'Sign-up forms'), icon: 'form' },
    { id: 'stock', n: L('Αποθήκη υλικών', 'Supplies'), icon: 'box' },
  ];
}

const DOC_LINES = {
  d1: [62, 88, 74, 92, 40, 80, 66],
  d2: [70, 94, 82, 58, 90, 76, 48],
  d3: [54, 86, 90, 68, 78, 44, 72],
};

/* ------------------------------------------------------------------ component */

export default function PraxisDemo({ lang = 'el', ed = 'ngo' }) {
  const lg = lang === 'en' ? 'en' : 'el';
  const c = COPY[lg];
  const L = (el, en) => (lg === 'en' ? en : el);
  const startEd = ed === 'med' ? 'clinic' : 'assoc';

  const [edition, setEdition] = useState(startEd);
  const [db, setDb] = useState(() => seed(startEd, lg));
  const [view, setView] = useState('today');
  const [openRec, setOpenRec] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [pop, setPop] = useState(null); // {top|bottom, left}
  const [docSel, setDocSel] = useState(0);
  const [pulse, setPulse] = useState(null);

  const rootRef = useRef(null);
  const winRef = useRef(null);
  const addBtnRef = useRef(null);
  const popRef = useRef(null);
  const panelCloseRef = useRef(null);
  const timers = useRef([]);
  const clock = useRef(9 * 60 + 41);
  const uidRef = useRef(1);
  const protoRef = useRef(143);
  const recRef = useRef(0);
  const reduced = useRef(false);

  const flows = useMemo(() => flowsFor(edition, lg), [edition, lg]);
  const modDefs = useMemo(() => modulesFor(edition, lg), [edition, lg]);

  /* timers */
  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== id);
      fn();
    }, ms);
    timers.current.push(id);
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  // clear pending timers on unmount only (clearTimers just reads the timers ref)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    try {
      reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      reduced.current = false;
    }
  }, []);

  useEffect(() => {
    setEdition(ed === 'med' ? 'clinic' : 'assoc');
  }, [ed]);

  /* reseed on edition / language change */
  const reseed = (e) => {
    clearTimers();
    const s = seed(e, lg);
    clock.current = 9 * 60 + 41;
    protoRef.current = s.protoNext;
    recRef.current = s.recNext;
    setDb(s);
    setView('today');
    setOpenRec(null);
    setAdding(false);
    setNewName('');
    setPop(null);
    setDocSel(0);
    setPulse(null);
  };
  useEffect(() => {
    reseed(edition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edition, lg]);

  /* helpers (side effects stay outside state updaters) */
  const STEP = () => (reduced.current ? 260 : 650);
  const uid = () => `u${uidRef.current++}`;
  const tick = (n = 1) => {
    clock.current += n;
    const h = Math.floor(clock.current / 60) % 24;
    const m = clock.current % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };
  const F = (mod, text, who) => ({ id: uid(), time: tick(), mod, who: who || mod, text });
  const pushFeed = (...items) => {
    const list = items.slice().reverse();
    setDb((d) => ({ ...d, feed: [...list, ...d.feed].slice(0, 40) }));
  };
  const nextProto = () => {
    const n = protoRef.current;
    protoRef.current += 1;
    return n;
  };
  const pno = (n) => `2026/${pad4(n)}`;
  const staffName = (id) => (STAFF[id] ? STAFF[id][lg][1] : '');
  const dueChip = (d, withWord) => {
    if (d === null || d === undefined) return null;
    const cls = d === 0 ? ' pxd-due-hot' : d === 1 ? ' pxd-due-warm' : '';
    return (
      <span className={`pxd-due${cls}`} aria-label={`${c.due}: ${c.dueLbl(d)}`}>
        <Icon n="clock" s={12} />
        {withWord ? <span className="pxd-due-w">{c.due}</span> : null}
        {c.dueLbl(d)}
      </span>
    );
  };
  const setRun = (id, patch) => setDb((d) => ({ ...d, runs: { ...d.runs, [id]: { ...(d.runs[id] || {}), ...patch } } }));
  const markFresh = (key) => {
    setDb((d) => ({ ...d, fresh: { ...d.fresh, [key]: true } }));
    later(() => setDb((d) => {
      const f = { ...d.fresh };
      delete f[key];
      return { ...d, fresh: f };
    }), 2400);
  };
  const isFresh = (key) => (db.fresh[key] ? ' pxd-fresh' : '');

  /* generic agent runner */
  const runAgent = (id, steps, onFinish) => {
    setRun(id, { phase: 'running', step: 0 });
    steps.forEach((s, i) => {
      later(() => {
        setRun(id, { step: i + 1 });
        if (s.feed) pushFeed(...s.feed.map(([m, t, w]) => F(m, t, w)));
      }, STEP() * (i + 1));
    });
    later(onFinish, STEP() * steps.length + 280);
  };

  const startMain = () => {
    const fl = flows.main;
    if (edition === 'assoc') {
      runAgent(fl.id, fl.steps, () => {
        setRun(fl.id, { phase: 'done' });
        const tid = uid();
        setDb((d) => ({
          ...d,
          tasks: [
            ...d.tasks.map((t) => (t.id === 'trenew' ? { ...t, s: 'done' } : t)),
            { id: tid, t: L('Τηλέφωνο στα 7 μέλη χωρίς ανανέωση', 'Call the 7 members who haven’t renewed'), o: 'ml', s: 'todo', d: 3 },
          ],
          records: d.records.map((r) => (r.sub === 'pending' ? { ...r, sub: 'active', due: '10/10/2027', dueD: undefined } : r)),
        }));
        markFresh(tid);
        markFresh('renewed');
      });
    } else if (edition === 'care') {
      startHandover();
    } else {
      runAgent(fl.id, fl.steps, () => {
        setRun(fl.id, { phase: 'done' });
        setDb((d) => ({ ...d, tasks: d.tasks.map((t) => (t.id === 'tconf' ? { ...t, s: 'done' } : t)) }));
      });
    }
  };

  /* care: handover (shared by Today and Shifts) */
  const startHandover = () => {
    const fl = flowsFor('care', lg).main;
    runAgent('handover', fl.steps, () => setRun('handover', { phase: 'review' }));
  };
  const approveHandover = () => {
    setRun('handover', { phase: 'sending' });
    const fam = db.handFam;
    later(() => {
      setRun('handover', { phase: 'done' });
      setDb((d) => ({ ...d, tasks: d.tasks.map((t) => (t.id === 'thand' ? { ...t, s: 'done' } : t)) }));
      const items = [F('praxis', L('Η ενημέρωση βάρδιας στάλθηκε (Γιώργος Π., Άννα Θ.)', 'Shift handover sent (Giorgos P., Anna T.)'), 'ek')];
      if (fam) {
        items.push(F('dialogos', L('2 οικογένειες ενημερώθηκαν μέσω DialogosAI', '2 families updated via DialogosAI')));
        items.push(F('metron', L('+2 επαφές με οικογένειες', '+2 family contacts')));
      }
      pushFeed(...items);
    }, STEP());
  };

  /* clinic: gap refill */
  const cancelAppt = (a) => {
    setDb((d) => ({ ...d, appts: d.appts.map((x) => (x.id === a.id ? { ...x, st: 'cancelled' } : x)), gap: { id: a.id, t: a.t } , runs: { ...d.runs, gap: { phase: 'idle', step: 0 } } }));
    pushFeed(F('praxis', L(`Ακύρωση ραντεβού ${a.t} (${a.name})`, `Appointment ${a.t} cancelled (${a.name})`), 'ek'));
  };
  const fillGap = () => {
    const g = db.gap;
    if (!g) return;
    const wl = db.waitlist || [];
    if (!wl.length) {
      setDb((d) => ({ ...d, appts: d.appts.map((x) => (x.id === g.id ? { ...x, st: 'open', name: '—', kind: '' } : x)), gap: null }));
      markFresh(g.id);
      pushFeed(F('dialogos', L(`Η ώρα ${g.t} άνοιξε για online κράτηση`, `${g.t} opened for online booking`)));
      return;
    }
    const who = wl[0];
    const steps = [
      { t: L(`Το DialogosAI στέλνει πρόταση στους ${wl.length === 1 ? '1 ασθενή' : `${wl.length} ασθενείς`} της λίστας αναμονής…`, `DialogosAI is offering the slot to ${wl.length} waiting-list patient${wl.length === 1 ? '' : 's'}…`), feed: [['dialogos', L(`Πρόταση για τις ${g.t} στάλθηκε στη λίστα αναμονής`, `Offer for ${g.t} sent to the waiting list`)]] },
      { t: L(`${who}: αποδέχτηκε τις ${g.t}`, `${who}: accepted ${g.t}`), feed: [['dialogos', L(`${who} αποδέχτηκε το ραντεβού των ${g.t}`, `${who} accepted the ${g.t} slot`)]] },
      { t: L('Το ραντεβού μπήκε στο πρόγραμμα · η λίστα ενημερώθηκε', 'Booked into the agenda · waiting list updated'), feed: [['praxis', L(`Νέο ραντεβού ${g.t}: ${who}`, `New appointment ${g.t}: ${who}`)], ['metron', L('+1 κενό καλύφθηκε · 0 χαμένος χρόνος', '+1 gap filled · no lost time')]] },
    ];
    runAgent('gap', steps, () => {
      setRun('gap', { phase: 'done', doneT: g.t });
      setDb((d) => ({
        ...d,
        appts: d.appts.map((x) => (x.id === g.id ? { ...x, st: 'confirmed', name: who, kind: c.fromWait } : x)),
        waitlist: d.waitlist.slice(1),
        gap: null,
      }));
      markFresh(g.id);
    });
    setDb((d) => ({ ...d, gapSteps: steps }));
  };

  /* tasks */
  const toggleTask = (t) => {
    const done = t.s !== 'done';
    setDb((d) => ({ ...d, tasks: d.tasks.map((x) => (x.id === t.id ? { ...x, s: done ? 'done' : 'todo' } : x)) }));
    if (done) pushFeed(F('praxis', L(`Ολοκληρώθηκε: ${t.t}`, `Completed: ${t.t}`), 'ek'));
  };

  /* registry */
  const addRecord = (e) => {
    if (e) e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const no = recRef.current;
    recRef.current += 1;
    const id = `r${no}-${uid()}`;
    const created = tick();
    const base = { id, no, name, tl: [{ mod: 'praxis', text: L('Δημιουργήθηκε η καρτέλα', 'Record created'), when: created }], ch: 'Viber', ph: '•••', amka: '••••' };
    let rec;
    if (edition === 'assoc') rec = { ...base, sub: 'pending', due: '03/10/2027' };
    else if (edition === 'care') rec = { ...base, o: 'ek', next: L('Αρχική αξιολόγηση', 'Initial assessment'), d: 3, ch: L('Οικογένεια · Viber', 'Family · Viber') };
    else rec = { ...base, last: '—', next: L('Πρώτη επίσκεψη', 'First visit') };
    setDb((d) => ({ ...d, records: [rec, ...d.records] }));
    markFresh(id);
    const code = `${db.recPrefix}${edition === 'clinic' ? no : pad4(no)}`;
    pushFeed(
      F('praxis', `${c.newRec[edition]} ${code}: ${name}`, 'ek'),
      F('metron', edition === 'assoc' ? L(`+1 μέλος · σύνολο ${no}`, `+1 member · ${no} in total`) : L('+1 νέα καρτέλα αυτόν τον μήνα', '+1 new record this month'))
    );
    setNewName('');
    setAdding(false);
  };
  const recCode = (r) => `${db.recPrefix}${edition === 'clinic' ? r.no : pad4(r.no)}`;

  const quickActions = useMemo(() => {
    if (edition === 'assoc') {
      return [
        { k: 'remind', n: L('Υπενθύμιση μέσω DialogosAI', 'Reminder via DialogosAI'), mod: 'dialogos', tl: L('Στάλθηκε υπενθύμιση μέσω DialogosAI', 'Reminder sent via DialogosAI') },
        { k: 'task', n: L('Νέα εργασία', 'New task'), mod: 'praxis', tl: L('Εργασία: επικοινωνία (Ελένη Κ.)', 'Task: follow up (Eleni K.)') },
        { k: 'cert', n: L('Έκδοση βεβαίωσης', 'Issue certificate'), mod: 'praxis', tl: L('Βεβαίωση μέλους εκδόθηκε · πρωτοκολλήθηκε', 'Membership certificate issued · registered') },
      ];
    }
    if (edition === 'care') {
      return [
        { k: 'remind', n: L('Ενημέρωση οικογένειας μέσω DialogosAI', 'Update family via DialogosAI'), mod: 'dialogos', tl: L('Η οικογένεια ενημερώθηκε μέσω DialogosAI', 'Family updated via DialogosAI') },
        { k: 'task', n: L('Νέα εργασία', 'New task'), mod: 'praxis', tl: L('Εργασία: επικοινωνία (Ελένη Κ.)', 'Task: follow up (Eleni K.)') },
        { k: 'note', n: L('Σημείωση βάρδιας', 'Shift note'), mod: 'praxis', tl: L('Σημείωση βάρδιας προστέθηκε', 'Shift note added') },
      ];
    }
    return [
      { k: 'remind', n: L('Υπενθύμιση επανελέγχου μέσω DialogosAI', 'Check-up reminder via DialogosAI'), mod: 'dialogos', tl: L('Στάλθηκε υπενθύμιση επανελέγχου', 'Check-up reminder sent') },
      { k: 'appt', n: L('Νέο ραντεβού', 'New appointment'), mod: 'praxis', tl: L('Κλείστηκε ραντεβού για επανέλεγχο', 'Check-up appointment booked') },
      { k: 'task', n: L('Νέα εργασία', 'New task'), mod: 'praxis', tl: L('Εργασία: επικοινωνία (Ελένη Κ.)', 'Task: follow up (Eleni K.)') },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edition, lg]);

  const doQuick = (r, q) => {
    const time = tick();
    const tid = uid();
    setDb((d) => ({
      ...d,
      records: d.records.map((x) => (x.id === r.id ? { ...x, tl: [{ mod: q.mod, text: q.tl, when: time, fresh: true }, ...x.tl], used: { ...(x.used || {}), [q.k]: true } } : x)),
      tasks: q.k === 'task' ? [...d.tasks, { id: tid, t: L(`Επικοινωνία: ${r.name}`, `Follow up: ${r.name}`), o: 'ek', s: 'todo', d: 2 }] : d.tasks,
    }));
    pushFeed(F(q.mod, `${q.tl} · ${r.name}`, q.mod === 'dialogos' ? 'dialogos' : 'ek'));
  };

  /* protocol */
  const addIncoming = () => {
    const list = db.incoming;
    const it = list[db.incomingIdx % list.length];
    const no = nextProto();
    const owners = edition === 'clinic' ? ['ek', 'an', 'ml'] : edition === 'care' ? ['ek', 'km', 'gp'] : ['ek', 'km', 'ml'];
    const o = owners[db.incomingIdx % owners.length];
    const row = { no, date: '03/10', dir: 'in', party: it.party, subject: it.subject, st: 'open', due: '10/10', o };
    setDb((d) => ({ ...d, protocol: [row, ...d.protocol], incomingIdx: d.incomingIdx + 1 }));
    markFresh(`p${no}`);
    pushFeed(F('praxis', L(`Νέο εισερχόμενο ${pno(no)} · ανάθεση: ${staffName(o)} · Προθεσμία 10/10`, `New incoming ${pno(no)} · assigned: ${staffName(o)} · deadline 10/10`)));
  };
  const startReply = (row) => {
    const text = L(
      `Αξιότιμοι κύριοι,\nσε απάντηση του εγγράφου σας «${row.subject}» (αρ. πρωτ. ${pno(row.no)}), σας αποστέλλουμε τα ζητούμενα στοιχεία. Για κάθε διευκρίνιση είμαστε στη διάθεσή σας.\n\nΜε εκτίμηση,\n${db.org}`,
      `Dear Sir or Madam,\nin reply to your letter “${row.subject}” (prot. no. ${pno(row.no)}), please find the requested information attached. We remain at your disposal for any clarification.\n\nKind regards,\n${db.org}`
    );
    setDb((d) => ({ ...d, reply: { no: row.no, phase: 'drafting', text } }));
    later(() => setDb((d) => (d.reply && d.reply.no === row.no ? { ...d, reply: { ...d.reply, phase: 'ready' } } : d)), reduced.current ? 300 : 1100);
  };
  const approveReply = (row) => {
    const no = nextProto();
    const out = { no, date: '03/10', dir: 'out', party: row.party, subject: L(`Απάντηση: ${row.subject}`, `Reply: ${row.subject}`), rel: pad4(row.no), st: 'sent' };
    setDb((d) => ({
      ...d,
      reply: null,
      protocol: [out, ...d.protocol.map((p) => (p.no === row.no ? { ...p, st: 'answered' } : p))],
    }));
    markFresh(`p${no}`);
    pushFeed(
      F('praxis', L(`Εξερχόμενο ${pno(no)} · Σχετ. ${pad4(row.no)} · εγκρίθηκε και στάλθηκε`, `Outgoing ${pno(no)} · ref. ${pad4(row.no)} · approved and sent`), 'ek'),
      F('metron', L('Χρόνος απάντησης: 2 λεπτά (μ.ό. 4 μέρες)', 'Response time: 2 minutes (avg. 4 days)'))
    );
  };

  /* documents */
  const scanDoc = (i) => {
    const doc = db.docs[i];
    if (!doc || doc.st !== 'idle') return;
    const upd = (patch) => setDb((d) => ({ ...d, docs: d.docs.map((x, j) => (j === i ? { ...x, ...patch } : x)) }));
    upd({ st: 'scanning', shown: 0 });
    const scanMs = reduced.current ? 300 : 1200;
    later(() => upd({ st: 'reading' }), scanMs);
    doc.fields.forEach((f, k) => later(() => upd({ shown: k + 1 }), scanMs + (reduced.current ? 120 : 360) * (k + 1)));
    later(() => upd({ st: 'ready' }), scanMs + (reduced.current ? 120 : 360) * doc.fields.length + 150);
  };
  const fileDoc = (i) => {
    const doc = db.docs[i];
    const no = nextProto();
    const time = tick();
    const tid = uid();
    const typeField = doc.fields.find((f) => /Τύπος|type/i.test(f[0]));
    const dtype = typeField ? typeField[1] : doc.file;
    setDb((d) => ({
      ...d,
      docs: d.docs.map((x, j) => (j === i ? { ...x, st: 'filed', proto: no } : x)),
      protocol: [{ no, date: '03/10', dir: 'in', party: doc.src, subject: `${dtype} (${doc.person})`, st: 'filed' }, ...d.protocol],
      records: d.records.map((r) => (r.id === doc.rec ? { ...r, tl: [{ mod: 'praxis', text: L(`Έγγραφο: ${dtype} · Πρωτ. ${pno(no)}`, `Document: ${dtype} · Prot. ${pno(no)}`), when: time, fresh: true }, ...r.tl] } : r)),
      tasks: doc.task ? [...d.tasks, { id: tid, t: doc.task, o: 'ek', s: 'todo', d: doc.taskD }] : d.tasks,
    }));
    markFresh(`p${no}`);
    if (doc.task) markFresh(tid);
    pushFeed(
      F('praxis', L(`Καταχωρίστηκε στον φάκελο (${doc.person}): ${dtype} · Πρωτ. ${pno(no)}`, `Filed to record (${doc.person}): ${dtype} · Prot. ${pno(no)}`), 'ek'),
      ...(doc.task ? [F('praxis', L(`Νέα προθεσμία από το έγγραφο: ${doc.task}`, `New deadline from the document: ${doc.task}`))] : []),
      F('metron', L('+1 έγγραφο ψηφιοποιήθηκε', '+1 document digitised'))
    );
  };

  /* modules */
  const openPop = () => {
    if (pop) {
      setPop(null);
      return;
    }
    const b = addBtnRef.current;
    const w = winRef.current;
    if (!b || !w) return;
    const br = b.getBoundingClientRect();
    const wr = w.getBoundingClientRect();
    const width = Math.min(264, wr.width - 16);
    const left = Math.max(8, Math.min(br.left - wr.left, wr.width - width - 8));
    if (br.top - wr.top > 330) setPop({ bottom: wr.bottom - br.top + 6, left, width });
    else setPop({ top: br.bottom - wr.top + 6, left, width });
  };
  const addModule = (m) => {
    if (db.modules.includes(m.id)) return;
    setDb((d) => ({ ...d, modules: [...d.modules, m.id] }));
    setPop(null);
    setView(`m:${m.id}`);
    pushFeed(F('praxis', L(`Προστέθηκε η ενότητα «${m.n}»`, `Module added: “${m.n}”`), 'ek'));
  };
  const removeModule = (id) => {
    setDb((d) => ({ ...d, modules: d.modules.filter((x) => x !== id) }));
    if (view === `m:${id}`) setView('today');
  };

  useEffect(() => {
    if (!pop) return undefined;
    const onDown = (e) => {
      if (popRef.current && !popRef.current.contains(e.target) && addBtnRef.current && !addBtnRef.current.contains(e.target)) setPop(null);
    };
    document.addEventListener('mousedown', onDown);
    const first = popRef.current && popRef.current.querySelector('button:not([disabled])');
    if (first) first.focus({ preventScroll: true });
    return () => document.removeEventListener('mousedown', onDown);
  }, [pop]);

  useEffect(() => {
    const side = rootRef.current && rootRef.current.querySelector('.pxd-side');
    const on = side && side.querySelector('.pxd-nav.is-on');
    if (!side || !on || side.scrollWidth <= side.clientWidth + 1) return;
    const target = on.offsetLeft - (side.clientWidth - on.offsetWidth) / 2;
    try {
      side.scrollTo({ left: Math.max(0, target), behavior: reduced.current ? 'auto' : 'smooth' });
    } catch (e) {
      side.scrollLeft = Math.max(0, target);
    }
  }, [view]);

  useEffect(() => {
    if (openRec && panelCloseRef.current) panelCloseRef.current.focus({ preventScroll: true });
  }, [openRec]);

  useEffect(() => {
    if (!pop && !openRec) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (pop) {
        setPop(null);
        if (addBtnRef.current) addBtnRef.current.focus({ preventScroll: true });
      } else {
        setOpenRec(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [pop, openRec]);

  /* hints */
  const hint = (key) => {
    const target = key === 'agent' ? (edition === 'care' && view === 'work' ? 'work' : 'today') : key === 'reply' ? 'protocol' : key === 'scan' ? 'docs' : null;
    if (target) setView(target);
    setOpenRec(null);
    if (key === 'scan') {
      const idx = db.docs.findIndex((d) => d.st === 'idle');
      if (idx >= 0) setDocSel(idx);
    }
    setPulse(key);
    later(() => {
      const el = rootRef.current && rootRef.current.querySelector(`[data-pulse="${key}"]`);
      if (el) {
        try {
          el.scrollIntoView({ block: 'nearest', behavior: reduced.current ? 'auto' : 'smooth' });
        } catch (err) {
          /* ignore */
        }
        el.focus({ preventScroll: true });
      }
    }, 90);
    later(() => setPulse((p) => (p === key ? null : p)), 2800);
  };
  const pz = (key) => ({ 'data-pulse': key });
  const pc = (key) => (pulse === key ? ' pxd-pulse' : '');

  const go = (v, pulseKey) => {
    setView(v);
    setOpenRec(null);
    if (pulseKey) {
      if (pulseKey === 'scan') {
        const idx = db.docs.findIndex((d) => d.st === 'idle');
        if (idx >= 0) setDocSel(idx);
      }
      setPulse(pulseKey);
      later(() => setPulse((p) => (p === pulseKey ? null : p)), 2800);
    }
  };

  /* ------------------------------------------------------------ derived */
  const openTasks = db.tasks.filter((t) => t.s !== 'done').length;
  const openIncoming = db.protocol.filter((p) => p.dir === 'in' && (p.st === 'open' || p.st === 'progress')).length;
  const idleDocs = db.docs.filter((d) => d.st !== 'filed').length;
  const activeSuggestions = [flows.main, flows.second].filter((f) => !db.runs[f.id] || db.runs[f.id].phase !== 'done').length;

  const nav = [
    { id: 'today', n: c.today, icon: 'today', count: openTasks },
    { id: 'registry', n: c.registry[edition], icon: 'people', count: db.records.length },
    { id: 'protocol', n: c.protocol[edition], icon: 'book', count: openIncoming },
    { id: 'work', n: c.work[edition], icon: edition === 'assoc' ? 'board' : edition === 'care' ? 'clock' : 'appts' },
    { id: 'docs', n: c.docs, icon: 'doc', count: idleDocs },
  ];
  const addedMods = db.modules.map((id) => modDefs.find((m) => m.id === id)).filter(Boolean);

  /* ------------------------------------------------------------ render pieces */

  const renderSteps = (steps, run) => (
    <div className="pxd-steps" role="list">
      {steps.map((s, i) => {
        if (i > run.step) return null;
        const doneStep = i < run.step;
        return (
          <div role="listitem" key={i} className={`pxd-step${doneStep ? ' is-done' : ''}`}>
            {doneStep ? <Ok /> : <Spin />}
            <span>{s.t}</span>
          </div>
        );
      })}
    </div>
  );

  const renderHandoverReview = (run) => (
    <div className="pxd-review">
      <div className="pxd-review-h">
        <Icon n="lock" s={13} /> {c.reviewTag}
      </div>
      <textarea
        className="pxd-draft"
        value={db.handDraft}
        onChange={(e) => {
          const v = e.target.value;
          setDb((d) => ({ ...d, handDraft: v }));
        }}
        rows={Math.max(4, db.handDraft.split('\n').length + 1)}
        aria-label={L('Σχέδιο ενημέρωσης βάρδιας', 'Shift handover draft')}
        disabled={run.phase !== 'review'}
      />
      <div className="pxd-fine">{c.editable}</div>
      <span className="pxd-check">
        <input
          type="checkbox"
          id={`pxd-fam-${edition}`}
          checked={db.handFam}
          onChange={(e) => {
            const v = e.target.checked;
            setDb((d) => ({ ...d, handFam: v }));
          }}
          disabled={run.phase !== 'review'}
        />
        <label htmlFor={`pxd-fam-${edition}`}>{c.famOpt}</label>
      </span>
      <div className="pxd-row-actions">
        <button type="button" className="pxd-btn pxd-btn-ink" onClick={approveHandover} disabled={run.phase !== 'review'}>
          {run.phase === 'sending' ? <Spin /> : <Icon n="check" s={14} />}
          {run.phase === 'sending' ? c.sending : c.approveHand}
        </button>
      </div>
    </div>
  );

  const renderMainCard = (where) => {
    const fl = edition === 'care' ? flowsFor('care', lg).main : flows.main;
    const runId = edition === 'care' ? 'handover' : fl.id;
    const run = db.runs[runId] || { phase: 'idle', step: 0 };
    const isDone = run.phase === 'done';
    return (
      <div className={`pxd-agent${isDone ? ' is-done' : ''}${run.phase === 'running' ? ' is-run' : ''}${run.phase === 'review' || run.phase === 'sending' ? ' is-wide' : ''}`} key={`main-${where}`}>
        <div className="pxd-agent-top">
          <Act mod="praxis" />
          <span className="pxd-eyebrow">{isDone ? c.doneTag : c.suggestion}</span>
          {isDone ? <Ok s={11} /> : null}
        </div>
        <div className="pxd-agent-ttl">{isDone ? fl.doneText : fl.title}</div>
        {run.phase === 'idle' ? (
          <>
            <div className="pxd-agent-body">{fl.body}</div>
            {fl.preview ? (
              <div className="pxd-preview">
                <span className="pxd-preview-k">
                  <Mod mod="dialogos" /> {c.preview}
                </span>
                <span className="pxd-preview-t">{fl.preview}</span>
              </div>
            ) : null}
            <div className="pxd-row-actions">
              <button type="button" className={`pxd-btn pxd-btn-agent${pc('agent')}`} {...(where === 'today' ? pz('agent') : {})} onClick={startMain}>
                <Icon n={edition === 'care' ? 'doc' : 'arrowOut'} s={14} />
                {fl.action}
              </button>
            </div>
          </>
        ) : null}
        {run.phase !== 'idle' && !isDone ? renderSteps(fl.steps, run) : null}
        {edition === 'care' && (run.phase === 'review' || run.phase === 'sending') ? renderHandoverReview(run) : null}
      </div>
    );
  };

  const renderSecondCard = () => {
    const fl = flows.second;
    return (
      <div className="pxd-agent pxd-agent-quiet" key="second">
        <div className="pxd-agent-top">
          <Act mod="praxis" />
          <span className="pxd-eyebrow">{c.suggestion}</span>
        </div>
        <div className="pxd-agent-ttl">{fl.title}</div>
        <div className="pxd-agent-body">{fl.body}</div>
        <div className="pxd-row-actions">
          <button type="button" className="pxd-btn pxd-btn-ghost" onClick={() => go(fl.go, fl.pulse)}>
            {fl.action} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    );
  };

  const viewToday = () => (
    <div className="pxd-view">
      <div className="pxd-vhead">
        <div className="pxd-vtitle">{c.hello}</div>
        <div className="pxd-vsub">{c.helloSub(activeSuggestions, openTasks)}</div>
      </div>
      <div className="pxd-cards">
        {renderMainCard('today')}
        {renderSecondCard()}
      </div>
      <div className="pxd-sech">{c.tasks}</div>
      <div className="pxd-tasks" role="list">
        {db.tasks.map((t) => (
          <div role="listitem" key={t.id} className={`pxd-task${t.s === 'done' ? ' is-done' : ''}${isFresh(t.id)}`}>
            <button type="button" className="pxd-tick" onClick={() => toggleTask(t)} aria-label={t.s === 'done' ? c.markOpen(t.t) : c.markDone(t.t)} aria-pressed={t.s === 'done'}>
              {t.s === 'done' ? <Icon n="check" s={12} /> : null}
            </button>
            <span className="pxd-task-t">{t.t}</span>
            <span className="pxd-task-meta">
              <span className={`pxd-st pxd-st-${t.s}`}>{c.status[t.s]}</span>
              {t.s !== 'done' ? dueChip(t.d, true) : null}
              <Av id={t.o} lang={lg} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  /* registry */
  const regCols = edition === 'assoc'
    ? [L('Αρ. μητρώου', 'Member no.'), L('Όνομα', 'Name'), L('Συνδρομή', 'Membership'), L('Προθεσμία ανανέωσης', 'Renewal deadline')]
    : edition === 'care'
      ? [L('Αρ. φακέλου', 'File no.'), L('Όνομα', 'Name'), L('Υπεύθυνος', 'Key worker'), L('Επόμενη ενέργεια', 'Next action'), c.due]
      : [L('Αρ. καρτέλας', 'Record no.'), L('Όνομα', 'Name'), L('Τελευταία επίσκεψη', 'Last visit'), L('Επόμενος επανέλεγχος', 'Next check-up')];
  const subChip = (s) => <span className={`pxd-st pxd-st-${s === 'active' ? 'done' : 'todo'}`}>{s === 'active' ? L('ενεργή', 'active') : L('σε αναμονή', 'pending')}</span>;

  const regCells = (r) => {
    if (edition === 'assoc') {
      return [
        recCode(r),
        null,
        subChip(r.sub),
        <span className="pxd-dt">
          {r.due}
          {r.dueD !== undefined ? dueChip(r.dueD) : null}
        </span>,
      ];
    }
    if (edition === 'care') {
      return [
        recCode(r),
        null,
        <span className="pxd-person">
          <Av id={r.o} lang={lg} size="sm" />
          {staffName(r.o)}
        </span>,
        r.next,
        dueChip(r.d),
      ];
    }
    return [
      recCode(r),
      null,
      r.last,
      <span className="pxd-dt">
        {r.next}
        {r.nextD !== undefined ? dueChip(r.nextD) : null}
      </span>,
    ];
  };

  const viewRegistry = () => (
    <div className="pxd-view">
      <div className="pxd-vhead pxd-vhead-row">
        <div>
          <div className="pxd-vtitle">{c.registry[edition]}</div>
          <div className="pxd-vsub">{c.recCount(db.records.length)}</div>
        </div>
        {!adding ? (
          <button type="button" className="pxd-btn pxd-btn-ink" onClick={() => setAdding(true)}>
            <Icon n="plus" s={14} /> {c.newRec[edition]}
          </button>
        ) : null}
      </div>
      {adding ? (
        <form className="pxd-addform" onSubmit={addRecord}>
          <span className="pxd-addform-no">{`${db.recPrefix}${edition === 'clinic' ? recRef.current : pad4(recRef.current)}`}</span>
          <input
            className="pxd-input"
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={c.namePh}
            aria-label={c.namePh}
            maxLength={40}
          />
          <button type="submit" className="pxd-btn pxd-btn-ink" disabled={!newName.trim()}>
            {c.add}
          </button>
          <button type="button" className="pxd-btn pxd-btn-ghost" onClick={() => { setAdding(false); setNewName(''); }}>
            {c.cancel}
          </button>
        </form>
      ) : null}
      <div className={`pxd-tbl pxd-tbl-reg pxd-tbl-${edition}`} role="table" aria-label={c.registry[edition]}>
        <div className="pxd-tr pxd-thr" role="row">
          {regCols.map((h) => (
            <div role="columnheader" className="pxd-th" key={h}>{h}</div>
          ))}
        </div>
        {db.records.map((r) => {
          const cells = regCells(r);
          return (
            <div role="row" key={r.id} className={`pxd-tr pxd-tr-click${openRec === r.id ? ' is-open' : ''}${isFresh(r.id)}${db.fresh.renewed && r.due === '10/10/2027' ? ' pxd-fresh' : ''}`}>
              {cells.map((cell, i) => (
                <div role="cell" className={`pxd-td${i === 0 ? ' pxd-td-no' : ''}${i === 1 ? ' pxd-td-name' : ''}`} data-k={regCols[i]} key={i}>
                  {i === 1 ? (
                    <button type="button" className="pxd-rowlink" onClick={() => setOpenRec(r.id)} aria-label={c.openRec(r.name)}>
                      {r.name}
                    </button>
                  ) : (
                    cell
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const recFields = (r) => {
    if (edition === 'assoc') {
      return [[regCols[0], recCode(r)], [regCols[2], subChip(r.sub)], [regCols[3], r.due], [L('Κανάλι', 'Channel'), r.ch], [L('Τηλέφωνο', 'Phone'), `69•• ••• ${r.ph}`], [L('Υπεύθυνη', 'Contact'), staffName('ek')]];
    }
    if (edition === 'care') {
      return [[regCols[0], recCode(r)], [regCols[2], staffName(r.o)], [regCols[3], r.next], [c.due, c.dueLbl(r.d)], [L('Επαφή οικογένειας', 'Family contact'), r.ch], ['ΑΜΚΑ', '•••••••4521']];
    }
    return [[regCols[0], recCode(r)], ['ΑΜΚΑ', `•••••••${r.amka}`], [regCols[2], r.last], [regCols[3], r.next], [L('Κανάλι', 'Channel'), r.ch], [L('Τηλέφωνο', 'Phone'), `69•• ••• ${r.ph}`]];
  };

  const renderPanel = () => {
    const r = db.records.find((x) => x.id === openRec);
    if (!r) return null;
    return (
      <>
        <div className="pxd-scrim" onClick={() => setOpenRec(null)} aria-hidden="true" />
        <div className="pxd-panel" role="dialog" aria-modal="false" aria-label={r.name}>
          <div className="pxd-panel-top">
            <div className="pxd-panel-id">
              <span className="pxd-bigav" aria-hidden="true">{r.name.slice(0, 1)}</span>
              <div>
                <div className="pxd-panel-name">{r.name}</div>
                <div className="pxd-vsub">{recCode(r)} · {db.org}</div>
              </div>
            </div>
            <button type="button" className="pxd-iconbtn" onClick={() => setOpenRec(null)} aria-label={c.close} ref={panelCloseRef}>
              <Icon n="x" s={16} />
            </button>
          </div>
          <div className="pxd-panel-scroll">
            <div className="pxd-sech">{c.fields}</div>
            <div className="pxd-fields">
              {recFields(r).map(([k, v]) => (
                <div className="pxd-field" key={k}>
                  <span className="pxd-field-k">{k}</span>
                  <span className="pxd-field-v">{v}</span>
                </div>
              ))}
            </div>
            <div className="pxd-sech">{c.quick}</div>
            <div className="pxd-quick">
              {quickActions.map((q) => {
                const used = r.used && r.used[q.k];
                return (
                  <button type="button" key={q.k} className={`pxd-btn pxd-btn-sm ${used ? 'pxd-btn-done' : 'pxd-btn-ghost'}`} disabled={used} onClick={() => doQuick(r, q)}>
                    {used ? <Icon n="check" s={13} /> : <span className={`pxd-dot pxd-dot-${q.mod}`} aria-hidden="true" />}
                    {q.n}
                  </button>
                );
              })}
            </div>
            <div className="pxd-sech">
              {c.timeline} <span className="pxd-sech-sub">{c.timelineSub}</span>
            </div>
            <div className="pxd-tl" role="list">
              {r.tl.map((e, i) => (
                <div role="listitem" className={`pxd-tl-i${e.fresh ? ' pxd-fresh' : ''}`} key={`${e.text}-${i}`}>
                  <span className={`pxd-tl-dot pxd-dot-${e.mod}`} aria-hidden="true" />
                  <div className="pxd-tl-b">
                    <div className="pxd-tl-t">{e.text}</div>
                    <div className="pxd-tl-m">
                      <Mod mod={e.mod} /> <span>{e.when}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  /* protocol */
  const protoStatus = (p) => {
    const cls = p.st === 'open' ? 'hot' : p.st === 'progress' ? 'doing' : p.st === 'answered' || p.st === 'sent' ? 'done' : 'muted';
    const txt = p.st === 'open' ? c.pst.open(p.due) : p.st === 'progress' ? c.pst.progress(p.due) : c.pst[p.st];
    return <span className={`pxd-pst pxd-pst-${cls}`}>{txt}</span>;
  };

  const viewProtocol = () => {
    let firstReply = true;
    return (
      <div className="pxd-view">
        <div className="pxd-vhead pxd-vhead-row">
          <div>
            <div className="pxd-vtitle">{c.protocol[edition]}</div>
            <div className="pxd-vsub">{c.protoLine}</div>
          </div>
          <button type="button" className="pxd-btn pxd-btn-ink" onClick={addIncoming}>
            <Icon n="plus" s={14} /> {c.newIncoming}
          </button>
        </div>
        <div className="pxd-tbl pxd-tbl-proto" role="table" aria-label={c.protocol[edition]}>
          <div className="pxd-tr pxd-thr" role="row">
            {c.protoCols.map((h) => (
              <div role="columnheader" className="pxd-th" key={h}>{h}</div>
            ))}
          </div>
          {db.protocol.map((p) => {
            const canReply = p.dir === 'in' && (p.st === 'open' || p.st === 'progress');
            const pulseThis = canReply && firstReply;
            if (canReply) firstReply = false;
            const rep = db.reply && db.reply.no === p.no ? db.reply : null;
            return (
              <React.Fragment key={p.no}>
                <div role="row" className={`pxd-tr${isFresh(`p${p.no}`)}${rep ? ' is-open' : ''}`}>
                  <div role="cell" className="pxd-td pxd-td-no" data-k={c.protoCols[0]}>{pno(p.no)}</div>
                  <div role="cell" className="pxd-td pxd-td-date" data-k={c.protoCols[1]}>{p.date}</div>
                  <div role="cell" className="pxd-td" data-k={c.protoCols[2]}>
                    <span className={`pxd-dir pxd-dir-${p.dir}`}>
                      <Icon n={p.dir === 'in' ? 'arrowIn' : 'arrowOut'} s={12} />
                      {p.dir === 'in' ? c.dirIn : c.dirOut}
                    </span>
                  </div>
                  <div role="cell" className="pxd-td" data-k={c.protoCols[3]}>{p.party}</div>
                  <div role="cell" className="pxd-td pxd-td-subj" data-k={c.protoCols[4]}>
                    <span>{p.subject}</span>
                    {p.o && canReply ? (
                      <span className="pxd-person pxd-person-sm">
                        <Av id={p.o} lang={lg} size="sm" />
                        {staffName(p.o)}
                      </span>
                    ) : null}
                  </div>
                  <div role="cell" className="pxd-td pxd-td-rel" data-k={c.protoCols[5]}>{p.rel || '—'}</div>
                  <div role="cell" className="pxd-td pxd-td-st" data-k={c.protoCols[6]}>
                    {protoStatus(p)}
                    {canReply && !rep ? (
                      <button type="button" className={`pxd-btn pxd-btn-xs pxd-btn-agent${pulseThis ? pc('reply') : ''}`} {...(pulseThis ? pz('reply') : {})} onClick={() => startReply(p)}>
                        {c.reply}
                      </button>
                    ) : null}
                  </div>
                </div>
                {rep ? (
                  <div className="pxd-reply" role="region" aria-label={c.drafted}>
                    {rep.phase === 'drafting' ? (
                      <div className="pxd-step"><Spin /> <span>{c.drafting}</span></div>
                    ) : (
                      <>
                        <div className="pxd-agent-top">
                          <Act mod="praxis" />
                          <span className="pxd-eyebrow">{c.drafted}</span>
                        </div>
                        <div className="pxd-reply-meta">
                          {c.to}: <strong>{p.party}</strong> · {c.rel}: {pad4(p.no)} · {L('Νέος αρ.', 'New no.')}: {pno(protoRef.current)}
                        </div>
                        <textarea
                          className="pxd-draft"
                          rows={8}
                          value={rep.text}
                          onChange={(e) => {
                            const v = e.target.value;
                            setDb((d) => ({ ...d, reply: d.reply ? { ...d.reply, text: v } : d.reply }));
                          }}
                          aria-label={c.drafted}
                        />
                        <div className="pxd-fine">{c.editable}</div>
                        <div className="pxd-row-actions">
                          <button type="button" className="pxd-btn pxd-btn-ink" onClick={() => approveReply(p)}>
                            <Icon n="check" s={14} /> {c.approveProto}
                          </button>
                          <button type="button" className="pxd-btn pxd-btn-ghost" onClick={() => setDb((d) => ({ ...d, reply: null }))}>
                            {c.cancel}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  /* work views */
  const viewBoard = () => (
    <div className="pxd-view">
      <div className="pxd-vhead">
        <div className="pxd-vtitle">{c.work.assoc}</div>
        <div className="pxd-vsub">{c.boardHint}</div>
      </div>
      <div className="pxd-board">
        {c.boardCols.map((col, ci) => {
          const cards = db.board.filter((b) => b.c === ci);
          return (
            <div className={`pxd-col pxd-col-${ci}`} key={col}>
              <div className="pxd-col-h">
                <span className={`pxd-col-dot pxd-col-dot-${ci}`} aria-hidden="true" />
                {col}
                <span className="pxd-count">{cards.length}</span>
              </div>
              <div className="pxd-col-list" role="list" aria-label={col}>
                {cards.map((b) => {
                  const inner = (
                    <>
                      <span className="pxd-bcard-t">{b.t}</span>
                      <span className="pxd-bcard-m">
                        <Av id={b.o} lang={lg} size="sm" />
                        {ci < 2 ? dueChip(b.d) : <span className="pxd-st pxd-st-done"><Icon n="check" s={11} /> {c.status.done}</span>}
                      </span>
                    </>
                  );
                  return (
                    <div role="listitem" key={b.id} className={isFresh(b.id).trim()}>
                      {ci < 2 ? (
                        <button
                          type="button"
                          className="pxd-bcard"
                          aria-label={c.moveTo(b.t, c.boardCols[ci + 1])}
                          onClick={() => {
                            setDb((d) => ({ ...d, board: d.board.map((x) => (x.id === b.id ? { ...x, c: ci + 1 } : x)) }));
                            markFresh(b.id);
                            const items = [F('praxis', `${b.t} → ${c.boardCols[ci + 1]}`, 'ek')];
                            if (ci + 1 === 2) items.push(F('metron', L('+1 εργασία ολοκληρώθηκε αυτή την εβδομάδα', '+1 task completed this week')));
                            pushFeed(...items);
                          }}
                        >
                          {inner}
                        </button>
                      ) : (
                        <div className="pxd-bcard is-done">{inner}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const viewShifts = () => {
    const run = db.runs.handover || { phase: 'idle', step: 0 };
    return (
      <div className="pxd-view">
        <div className="pxd-vhead">
          <div className="pxd-vtitle">{c.work.care}</div>
          <div className="pxd-vsub">{c.shiftHint}</div>
        </div>
        <div className="pxd-shifts">
          {db.shifts.map((s) => (
            <div className={`pxd-shift${s.now ? ' is-now' : ''}`} key={s.id}>
              <div className="pxd-shift-h">
                <span className="pxd-shift-n">{s.n}</span>
                {s.now ? <span className="pxd-now">{c.shiftNow}</span> : null}
              </div>
              <div className="pxd-vsub">{s.h}</div>
              <div className="pxd-avs">
                {s.staff.map((id) => (
                  <span className="pxd-person" key={id}>
                    <Av id={id} lang={lg} size="sm" />
                    {staffName(id)}
                  </span>
                ))}
              </div>
              <div className="pxd-notes" role="list">
                {s.notes.map((n) => (
                  <div role="listitem" className="pxd-note" key={n}>{n}</div>
                ))}
              </div>
              {s.id === 'morning' && run.phase === 'idle' ? (
                <button type="button" className={`pxd-btn pxd-btn-agent pxd-btn-sm${pc('agent')}`} {...pz('agent')} onClick={startHandover}>
                  <Icon n="doc" s={13} /> {c.handoverBtn}
                </button>
              ) : null}
              {s.id === 'afternoon' && run.phase === 'done' ? (
                <span className="pxd-st pxd-st-done pxd-fresh"><Icon n="check" s={11} /> {c.received}</span>
              ) : null}
            </div>
          ))}
        </div>
        {run.phase !== 'idle' ? <div className="pxd-cards pxd-cards-gap">{renderMainCard('work')}</div> : null}
      </div>
    );
  };

  const viewAppts = () => {
    const run = db.runs.gap || { phase: 'idle', step: 0 };
    const wl = db.waitlist || [];
    return (
      <div className="pxd-view">
        <div className="pxd-vhead">
          <div className="pxd-vtitle">{c.work.clinic}</div>
          <div className="pxd-vsub">{c.agendaHint}</div>
        </div>
        {db.gap || run.phase === 'running' || run.phase === 'done' ? (
          <div className="pxd-cards pxd-cards-gap">
            <div className={`pxd-agent${run.phase === 'done' ? ' is-done' : ''}`}>
              <div className="pxd-agent-top">
                <Act mod="praxis" />
                <span className="pxd-eyebrow">{run.phase === 'done' ? c.doneTag : c.suggestion}</span>
                {run.phase === 'done' ? <Ok s={11} /> : null}
              </div>
              <div className="pxd-agent-ttl">
                {run.phase === 'done' ? c.gapDone(run.doneT) : db.gap ? c.gapTitle(db.gap.t, wl.length) : ''}
              </div>
              {run.phase === 'idle' && db.gap ? (
                <>
                  <div className="pxd-agent-body">{wl.length ? c.gapBody : c.gapBodyEmpty}</div>
                  <div className="pxd-row-actions">
                    <button type="button" className="pxd-btn pxd-btn-agent" onClick={fillGap}>
                      <Icon n="arrowOut" s={14} /> {wl.length ? c.gapBtn : c.gapOpen}
                    </button>
                  </div>
                </>
              ) : null}
              {run.phase === 'running' && db.gapSteps ? renderSteps(db.gapSteps, run) : null}
            </div>
          </div>
        ) : null}
        <div className="pxd-agenda" role="list">
          {db.appts.map((a) => (
            <div role="listitem" key={a.id} className={`pxd-slot pxd-slot-${a.st}${isFresh(a.id)}`}>
              <span className="pxd-slot-t">{a.t}</span>
              <span className="pxd-slot-b">
                <span className="pxd-slot-n">{a.st === 'open' ? c.appt.open : a.name}</span>
                {a.kind ? <span className="pxd-vsub">{a.kind}</span> : null}
              </span>
              <span className={`pxd-st pxd-st-${a.st === 'confirmed' ? 'done' : a.st === 'pending' ? 'todo' : a.st === 'cancelled' ? 'cancel' : 'open'}`}>
                {a.st === 'open' ? L('ελεύθερο', 'open') : c.appt[a.st]}
              </span>
              {a.st === 'confirmed' || a.st === 'pending' ? (
                <button type="button" className="pxd-btn pxd-btn-xs pxd-btn-ghost" disabled={!!db.gap || run.phase === 'running'} onClick={() => cancelAppt(a)} aria-label={c.cancelAria(a.t, a.name)}>
                  {c.cancelAppt}
                </button>
              ) : (
                <span className="pxd-slot-sp" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <div className="pxd-wait">
          <span className="pxd-wait-k">{c.waitlist}:</span>
          {wl.length ? wl.map((n) => <span className="pxd-chip" key={n}>{n}</span>) : <span className="pxd-vsub">{c.empty}</span>}
        </div>
      </div>
    );
  };

  /* documents */
  const renderPage = (doc, big) => {
    const lines = DOC_LINES[doc.id] || DOC_LINES.d1;
    const scanning = doc.st === 'scanning';
    const read = doc.st === 'reading' || doc.st === 'ready' || doc.st === 'filed';
    return (
      <span className={`pxd-page pxd-page-${doc.kind}${big ? ' pxd-page-big' : ''}`} aria-hidden="true">
        <span className="pxd-pg-head" />
        <span className="pxd-pg-sub" />
        {lines.map((w, i) => (
          <span key={i} className={`pxd-pg-line${read && big && i < (doc.shown + 1) * 1 && i % 2 === 0 ? ' is-hit' : ''}`} style={{ width: `${w}%` }} />
        ))}
        {doc.stamp ? <span className="pxd-pg-stamp" /> : null}
        <span className="pxd-pg-sign" />
        {big && scanning ? <span className="pxd-scanline" /> : null}
        {big && doc.st === 'filed' ? (
          <span className="pxd-pg-filed">
            <Icon n="check" s={12} /> {pno(doc.proto)}
          </span>
        ) : null}
      </span>
    );
  };

  const viewDocs = () => {
    const doc = db.docs[docSel] || db.docs[0];
    const i = db.docs.indexOf(doc);
    return (
      <div className="pxd-view">
        <div className="pxd-vhead">
          <div className="pxd-vtitle">{c.docs}</div>
          <div className="pxd-vsub">{c.docsLine}</div>
        </div>
        <div className="pxd-thumbs" role="tablist" aria-label={c.pickDoc}>
          {db.docs.map((d, j) => (
            <button
              type="button"
              role="tab"
              aria-selected={j === i}
              key={d.id}
              className={`pxd-thumb${j === i ? ' is-sel' : ''}`}
              onClick={() => setDocSel(j)}
            >
              {renderPage(d, false)}
              <span className="pxd-thumb-n">{d.file}</span>
              <span className="pxd-thumb-s">
                {d.st === 'filed' ? (
                  <span className="pxd-st pxd-st-done"><Icon n="check" s={10} /> {pno(d.proto)}</span>
                ) : (
                  <span className="pxd-vsub">{d.person}</span>
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="pxd-docpane" role="tabpanel" aria-label={doc.file}>
          <div className="pxd-docprev">{renderPage(doc, true)}</div>
          <div className="pxd-docinfo">
            <div className="pxd-docname">
              <Icon n="doc" s={15} /> {doc.file}
            </div>
            <div className="pxd-vsub">
              {c.forPerson}: {doc.person}
            </div>
            {doc.st === 'idle' ? (
              <div className="pxd-row-actions">
                <button type="button" className={`pxd-btn pxd-btn-agent${pc('scan')}`} {...pz('scan')} onClick={() => scanDoc(i)}>
                  <Icon n="search" s={14} /> {c.scan}
                </button>
              </div>
            ) : null}
            {doc.st === 'scanning' ? (
              <div className="pxd-step"><Spin /> <span>{c.scanning}</span></div>
            ) : null}
            {doc.st === 'reading' || doc.st === 'ready' || doc.st === 'filed' ? (
              <>
                <div className="pxd-sech">{c.fieldsFound}</div>
                <div className="pxd-ext" role="list">
                  {doc.fields.slice(0, doc.st === 'reading' ? doc.shown : doc.fields.length).map(([k, v, conf]) => (
                    <div role="listitem" className="pxd-ext-i" key={k}>
                      <span className="pxd-field-k">{k}</span>
                      <span className="pxd-ext-v">{v}</span>
                      <span className={`pxd-conf${conf < 93 ? ' is-low' : ''}`} aria-label={`${conf}% ${c.conf}`}>
                        <span className="pxd-conf-bar"><span style={{ width: `${conf}%` }} /></span>
                        {conf}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pxd-fine"><Icon n="lock" s={11} /> {c.masked}</div>
              </>
            ) : null}
            {doc.st === 'ready' ? (
              <div className="pxd-row-actions">
                <button type="button" className="pxd-btn pxd-btn-ink" onClick={() => fileDoc(i)}>
                  <Icon n="check" s={14} /> {c.fileTo} · {doc.person}
                </button>
              </div>
            ) : null}
            {doc.st === 'filed' ? (
              <div className="pxd-filed">
                <Ok /> {c.filedAs(pno(doc.proto))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const viewModule = (id) => {
    const m = modDefs.find((x) => x.id === id);
    if (!m) return null;
    return (
      <div className="pxd-view">
        <div className="pxd-vhead">
          <div className="pxd-vtitle">{m.n}</div>
        </div>
        <div className="pxd-modph">
          <span className="pxd-modph-ic"><Icon n={m.icon} s={26} /></span>
          <div className="pxd-modph-t">{c.moduleText}</div>
          <div className="pxd-vsub">{c.moduleNote}</div>
          <div className="pxd-skel" aria-hidden="true">
            <span /><span /><span />
          </div>
        </div>
      </div>
    );
  };

  const renderView = () => {
    if (view.startsWith('m:')) return viewModule(view.slice(2));
    if (view === 'registry') return viewRegistry();
    if (view === 'protocol') return viewProtocol();
    if (view === 'work') return edition === 'assoc' ? viewBoard() : edition === 'care' ? viewShifts() : viewAppts();
    if (view === 'docs') return viewDocs();
    return viewToday();
  };

  const hintKeys = ['agent', 'reply', 'scan', 'module'];
  const hintLabel = (k) => (k === 'agent' ? c.hints.agent[edition] : c.hints[k]);

  /* ------------------------------------------------------------ render */
  return (
    <div className="pxd" ref={rootRef} lang={lg}>
      <div className="pxd-bar">
        <div className="pxd-seg" role="group" aria-label={c.edAria}>
          {['assoc', 'care', 'clinic'].map((e) => (
            <button type="button" key={e} className={`pxd-seg-b${edition === e ? ' is-on' : ''}`} aria-pressed={edition === e} onClick={() => setEdition(e)}>
              {c.ed[e]}
            </button>
          ))}
        </div>
        <div className="pxd-hints">
          <span className="pxd-hints-k">{c.tryIt}</span>
          {hintKeys.map((k) => (
            <button type="button" key={k} className="pxd-hint" onClick={() => (k === 'module' ? (hint('module'), openPop()) : hint(k))}>
              {hintLabel(k)}
            </button>
          ))}
        </div>
      </div>

      <div className="pxd-win" ref={winRef} role="region" aria-label={c.winAria}>
        <div className="pxd-chrome">
          <span className="pxd-lights" aria-hidden="true"><i /><i /><i /></span>
          <span className="pxd-word">
            <span className="pxd-word-dot" aria-hidden="true" />
            PraxisAI
          </span>
          <span className="pxd-org">{db.org}</span>
          <span className="pxd-search" aria-hidden="true">
            <Icon n="search" s={13} />
            <span>{c.search}…</span>
            <kbd>⌘K</kbd>
          </span>
          <span className="pxd-me">
            <Av id="ek" lang={lg} />
          </span>
        </div>

        <div className="pxd-body">
          <nav className="pxd-side" aria-label={c.viewsAria}>
            {nav.map((n) => (
              <button type="button" aria-current={view === n.id ? 'page' : undefined} key={n.id} className={`pxd-nav${view === n.id ? ' is-on' : ''}`} onClick={() => { setView(n.id); setOpenRec(null); }}>
                <Icon n={n.icon} s={16} />
                <span className="pxd-nav-n">{n.n}</span>
                {n.count ? <span className="pxd-count">{n.count}</span> : null}
              </button>
            ))}
            {addedMods.length ? <div className="pxd-side-k">{c.extra}</div> : null}
            {addedMods.map((m) => (
              <span className={`pxd-navwrap${view === `m:${m.id}` ? ' is-on' : ''}`} key={m.id}>
                <button type="button" aria-current={view === `m:${m.id}` ? 'page' : undefined} className={`pxd-nav pxd-nav-mod${view === `m:${m.id}` ? ' is-on' : ''}`} onClick={() => { setView(`m:${m.id}`); setOpenRec(null); }}>
                  <Icon n={m.icon} s={16} />
                  <span className="pxd-nav-n">{m.n}</span>
                  <span className="pxd-new">{c.newTag}</span>
                </button>
                <button type="button" className="pxd-x" onClick={() => removeModule(m.id)} aria-label={c.remove(m.n)}>
                  <Icon n="x" s={12} />
                </button>
              </span>
            ))}
            <span className="pxd-side-sp" aria-hidden="true" />
            <button
              type="button"
              ref={addBtnRef}
              className={`pxd-nav pxd-nav-add${pc('module')}`}
              {...pz('module')}
              onClick={openPop}
              aria-expanded={!!pop}
              aria-haspopup="dialog"
            >
              <Icon n="plus" s={16} />
              <span className="pxd-nav-n">{c.addModule}</span>
            </button>
          </nav>

          <div className="pxd-mainwrap">
            <div className="pxd-main" key={`${edition}-${view}`}>
              {renderView()}
            </div>
            {openRec ? renderPanel() : null}
          </div>

          <div className="pxd-feed">
            <div className="pxd-feed-h">
              <span>{c.feed}</span>
              <span className="pxd-live"><i aria-hidden="true" />{c.feedLive}</span>
            </div>
            <div className="pxd-feed-list" role="list" aria-live="polite" aria-relevant="additions">
              {db.feed.map((f, i) => (
                <div role="listitem" className="pxd-fi" key={f.id || `seed-${i}`}>
                  {STAFF[f.who] ? <Av id={f.who} lang={lg} size="sm" /> : <Act mod={f.who} />}
                  <div className="pxd-fi-b">
                    <div className="pxd-fi-t">{f.text}</div>
                    <div className="pxd-fi-m">
                      <Mod mod={f.mod} />
                      <span>{f.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pxd-foot">
          <span className="pxd-foot-t">
            <Icon n="lock" s={12} /> {c.footer}
          </span>
          <span className="pxd-foot-r">
            <span className="pxd-sample">{c.sample}</span>
            <button type="button" className="pxd-btn pxd-btn-xs pxd-btn-ghost" onClick={() => reseed(edition)}>
              <Icon n="reset" s={12} /> {c.reset}
            </button>
          </span>
        </div>

        {pop ? (
          <div
            className="pxd-pop"
            ref={popRef}
            role="dialog"
            aria-label={c.addModule}
            style={{ left: pop.left, width: pop.width, ...(pop.top !== undefined ? { top: pop.top } : { bottom: pop.bottom }) }}
          >
            <div className="pxd-pop-h">{c.addModule}</div>
            <div className="pxd-vsub">{c.addModuleSub}</div>
            <div className="pxd-pop-list">
              {modDefs.map((m) => {
                const has = db.modules.includes(m.id);
                return (
                  <button type="button" key={m.id} className="pxd-pop-i" disabled={has} onClick={() => addModule(m)}>
                    <span className="pxd-pop-ic"><Icon n={m.icon} s={15} /></span>
                    <span className="pxd-nav-n">{m.n}</span>
                    {has ? <span className="pxd-vsub">{c.addedTag}</span> : <Icon n="plus" s={13} />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
