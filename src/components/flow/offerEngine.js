// fλow offer engine: every price and feature of the builder lives here.
// Prices are never shown on the website. The /go page uses the features; the server
// (netlify/offer, function send-offer) uses the prices to write the emailed PDF offer.
// Prices exclude VAT. Hosting and AI usage are billed at cost (as in all contracts).
//
// Sources
// - Clinics: the live /ypodochi tiers (Απαντάει 199/149, Κλείνει 249/199,
//   Φέρνει πίσω 299/249, Σηκώνει το τηλέφωνο 399/299; setup 490 €, free with annual).
// - NGOs: Oct 2026 pricing doc, now per part (see NGO.combos). Pilot: 199 € for 60 days.
// - Sponsors: derived from the NGO Insights package per organisation (PROPOSAL, to confirm).
// - Size steps, add-on prices and the Greek-model tier are PROPOSALS (to confirm).

const L = (el, en) => ({ el, en });

/* ───────── NGOs, associations, care services: three parts, priced alone, cheaper together ─────────
 * The two- and three-part prices keep the Oct 2026 plans: DialogosAI = Πλοηγός (119 + 2.400),
 * DialogosAI + MetronAI = 179 + 2.900, all three = Φροντίδα (249 + 4.500).
 * PraxisAI alone, MetronAI alone and the other pairs are PROPOSALS (to confirm). */

export const MODULE_IDS = ['dialogos', 'praxis', 'metron'];

const comboKey = (m) => MODULE_IDS.filter((id) => m[id]).map((id) => id[0]).join('');

export const NGO = {
  sizes: [
    { id: 's', label: L('Έως 50', 'Up to 50'), monthly: 0, setup: 0 },
    { id: 'm', label: L('50 – 200', '50 – 200'), monthly: 30, setup: 300 },
    { id: 'l', label: L('200 – 1.000', '200 – 1,000'), monthly: 70, setup: 600 },
    { id: 'xl', label: L('Πάνω από 1.000 ή πολλές δομές', 'Over 1,000 or several sites'), network: true },
  ],
  // d = DialogosAI, p = PraxisAI, m = MetronAI
  combos: {
    d: { monthly: 119, setup: 2400 },
    p: { monthly: 119, setup: 2400 },
    m: { monthly: 89, setup: 1400 },
    dm: { monthly: 179, setup: 2900 },
    dp: { monthly: 199, setup: 3600 },
    pm: { monthly: 179, setup: 3000 },
    dpm: { monthly: 249, setup: 4500 },
  },
  network: { name: L('Δίκτυο', 'Network'), monthly: 450, setup: 7500 },
  // what each part brings: `inc` = always included, the rest are options
  features: [
    // DialogosAI
    { id: 'd_answers', module: 'dialogos', inc: true, label: L('Απαντά 24/7 στο site σας', 'Answers 24/7 on your site') },
    { id: 'd_sources', module: 'dialogos', inc: true, label: L('Μόνο από τις δικές σας πηγές, με παραπομπή', 'Only from your own sources, with a citation') },
    { id: 'd_rights', module: 'dialogos', inc: true, label: L('Οδηγός δικαιωμάτων: ΚΕΠΑ, ΟΠΕΚΑ, ΕΟΠΥΥ', 'Rights guide: disability, benefits, insurance') },
    { id: 'd_crisis', module: 'dialogos', inc: true, label: L('Τα επείγοντα πάνε σε άνθρωπο', 'Urgent cases go to a person') },
    { id: 'viber', module: 'dialogos', monthly: 20, setup: 200, includedWith: 2, label: L('Viber ή Messenger', 'Viber or Messenger') },
    { id: 'whatsapp', module: 'dialogos', monthly: 20, setup: 200, label: L('WhatsApp', 'WhatsApp') },
    { id: 'lang2', module: 'dialogos', monthly: 20, setup: 300, includedWith: 2, label: L('Δεύτερη γλώσσα', 'Second language') },
    { id: 'phone', module: 'dialogos', quote: true, label: L('Φωνή στο τηλέφωνό σας, 24/7', 'A voice on your phone line, 24/7') },
    // PraxisAI
    { id: 'p_registry', module: 'praxis', inc: true, label: L('Μητρώο μελών ή φάκελοι ωφελουμένων', 'Member registry or beneficiary files') },
    { id: 'p_tasks', module: 'praxis', inc: true, label: L('Εργασίες ανά άνθρωπο, με προθεσμίες', 'Tasks per person, with deadlines') },
    { id: 'p_protocol', module: 'praxis', inc: true, label: L('Πρωτόκολλο με αυτόματη αρίθμηση', 'Protocol book with automatic numbers') },
    { id: 'p_deadlines', module: 'praxis', inc: true, label: L('Υπενθυμίσεις προθεσμιών 60, 30 και 7 μέρες πριν', 'Deadline reminders 60, 30 and 7 days ahead') },
    { id: 'p_agent', module: 'praxis', inc: true, label: L('Ενέργειες που προτείνει και εκτελεί, με έγκριση', 'Actions it proposes and runs, with approval') },
    { id: 'shifts', module: 'praxis', monthly: 30, setup: 0, label: L('Βάρδιες και ενημέρωση βάρδιας', 'Shifts and shift handover') },
    { id: 'family', module: 'praxis', monthly: 20, setup: 0, requires: 'dialogos', label: L('Ενημερώσεις οικογενειών με έγκριση', 'Approved family updates') },
    { id: 'ocr', module: 'praxis', monthly: 30, setup: 300, label: L('Σάρωση εγγράφων (OCR) στον φάκελο', 'Document scanning (OCR) into the file') },
    { id: 'voice', module: 'praxis', monthly: 30, setup: 0, label: L('Καταγραφή με φωνή', 'Log by voice') },
    { id: 'dues', module: 'praxis', quote: true, label: L('Συνδρομές και πληρωμές μελών', 'Member dues and payments') },
    { id: 'donors', module: 'praxis', quote: true, label: L('Δωρητές και εθελοντές', 'Donors and volunteers') },
    // MetronAI
    { id: 'm_themes', module: 'metron', inc: true, label: L('Τι ρωτούν και τι λείπει, κάθε μήνα', 'What people ask and what is missing, monthly') },
    { id: 'm_comms', module: 'metron', inc: true, label: L('Στατιστικά επικοινωνίας: κανάλια, ώρες, εκτός ωραρίου', 'Communication stats: channels, hours, after-hours') },
    { id: 'm_report', module: 'metron', inc: true, label: L('Μηνιαία αναφορά για ομάδα και χορηγούς', 'Monthly report for team and sponsors') },
    { id: 'm_accuracy', module: 'metron', inc: true, label: L('Τεστ ακρίβειας κάθε μήνα', 'Monthly accuracy test') },
    { id: 'callcenter', module: 'metron', monthly: 30, setup: 300, label: L('Στατιστικά τηλεφωνικού κέντρου', 'Call-centre statistics') },
    { id: 'impact', module: 'metron', monthly: 50, setup: 0, label: L('Αναφορά κοινωνικού αντίκτυπου κάθε τρίμηνο', 'Quarterly social-impact report') },
    // the whole flow
    { id: 'greek', module: 'all', setup: 1500, atCost: true, label: L('Ελληνικό μοντέλο σε υποδομή ΕΕ (Llama-Krikri)', 'Greek model on EU infrastructure (Llama-Krikri)') },
  ],
  pilot: { price: 199, days: 60 },
};

export const comboPrice = (mods) => NGO.combos[comboKey(mods)] || null;
export const comboSaving = (mods) => {
  const k = comboKey(mods);
  if (k.length < 2) return null;
  const sum = k.split('').reduce((a, ch) => ({ monthly: a.monthly + NGO.combos[ch].monthly, setup: a.setup + NGO.combos[ch].setup }), { monthly: 0, setup: 0 });
  const c = NGO.combos[k];
  return { monthly: sum.monthly - c.monthly, setup: sum.setup - c.setup };
};

/* ───────── Practices & clinics: PraxisAI (CRM) is the core; live /ypodochi tiers ───────── */

export const MED = {
  sizes: [
    { id: '1', label: L('1 γιατρός', '1 doctor'), minTier: 1 },
    { id: '2-5', label: L('2 – 5 γιατροί', '2 – 5 doctors'), minTier: 2 },
    { id: '6+', label: L('6+ γιατροί ή πολλά σημεία', '6+ doctors or several sites'), custom: true },
  ],
  tiers: [
    { n: 1, name: L('Απαντάει', 'Answers'), monthly: 199, annual: 149 },
    { n: 2, name: L('Κλείνει', 'Books'), monthly: 249, annual: 199 },
    { n: 3, name: L('Φέρνει πίσω', 'Brings back'), monthly: 299, annual: 249 },
    { n: 4, name: L('Σηκώνει το τηλέφωνο', 'Picks up the phone'), monthly: 399, annual: 299 },
  ],
  custom: { name: L('Κλινική Global', 'Clinic Global'), from: 590, setupFrom: 4500 },
  setup: 490, // free with annual billing
  worth: L('≈ 4.700 €', '≈ €4,700'),
  features: [
    { id: 'answers', group: 'logos', tag: L('DialogosAI 24/7', 'DialogosAI 24/7'), tier: 1, locked: true, on: true, label: L('DialogosAI 24/7, και σε Greeklish', 'DialogosAI 24/7, Greeklish too'), note: L('Ώρες, τιμές, ΕΟΠΥΥ, παραπεμπτικά, από τη βάση σας.', 'Hours, prices, insurance, referrals, from your base.') },
    { id: 'card', group: 'praxis', tag: L('Καρτέλα ασθενούς', 'Patient card'), tier: 1, locked: true, on: true, label: L('PraxisAI: καρτέλα για κάθε ασθενή', 'PraxisAI: a card for every patient'), note: L('Κάθε αίτημα γίνεται καρτέλα. Ικανοποίηση, παράπονα, ρουτίνες.', 'Every request becomes a card. Satisfaction, complaints, routines.') },
    { id: 'report', group: 'insights', tag: L('MetronAI', 'MetronAI'), tier: 1, locked: true, on: true, label: L('Μηνιαία αναφορά MetronAI', 'Monthly MetronAI report'), note: L('Τι ζητούν οι ασθενείς που δεν προσφέρετε.', 'What patients ask for that you don\'t offer.') },
    { id: 'tasks', group: 'praxis', tag: L('Εργασίες', 'Tasks'), tier: 1, locked: true, on: true, label: L('Εργασίες γραμματείας, με προθεσμίες', 'Front-desk tasks, with deadlines'), note: L('Ποιος κάνει τι, ως πότε. Το PraxisAI θυμίζει.', 'Who does what, by when. PraxisAI reminds.') },
    { id: 'booking', group: 'praxis', tag: L('Ραντεβού', 'Bookings'), tier: 2, label: L('Κλείνει ραντεβού στο ημερολόγιό σας', 'Books into your calendar'), note: L('Κλείνει, αλλάζει, ακυρώνει. doctoranytime, Google Calendar.', 'Books, moves, cancels. Works with your calendar.') },
    { id: 'channels', group: 'logos', tag: L('Viber, WhatsApp', 'Viber, WhatsApp'), tier: 2, label: L('Viber, WhatsApp, Instagram, Facebook', 'Viber, WhatsApp, Instagram, Facebook'), note: L('Εκεί που γράφουν πραγματικά οι ασθενείς.', 'Where patients actually write.') },
    { id: 'forms', group: 'praxis', tag: L('Έντυπα', 'Intake forms'), tier: 2, label: L('Έντυπα εγγραφής πριν την επίσκεψη', 'Intake forms before the visit'), note: L('Φεύγουν μόλις κλειστεί το ραντεβού.', 'Sent as soon as the visit is booked.') },
    { id: 'missed', group: 'praxis', tag: L('Αναπάντητες', 'Missed calls'), tier: 3, label: L('Αναπάντητη κλήση, αμέσως Viber ή SMS', 'Missed call, instant Viber or SMS'), note: L('«Συνεχίστε εδώ». Κανένας ασθενής δεν χάνεται.', '"Continue here". No patient lost.') },
    { id: 'reminders', group: 'praxis', tag: L('Recall', 'Recall'), tier: 3, label: L('Υπενθυμίσεις και recall', 'Reminders and recall'), note: L('24 ώρες πριν, ετήσιος έλεγχος, ημιτελείς θεραπείες.', '24 hours ahead, annual check-ups, unfinished treatments.') },
    { id: 'reviews', group: 'insights', tag: L('Κριτικές', 'Reviews'), tier: 3, label: L('Γνώμη ιδιωτικά, πριν το Google review', 'Private feedback before Google reviews'), note: L('Οι ευχαριστημένοι πάνε στο Google, τα παράπονα σε εσάς.', 'Happy patients go to Google, complaints come to you.') },
    { id: 'voice', group: 'logos', tag: L('Φωνή 24/7', 'Voice 24/7'), tier: 4, label: L('Ζωντανή φωνή στον αριθμό σας', 'A live voice on your number'), note: L('Σηκώνει το τηλέφωνο 24/7, φιλτράρει spam.', 'Picks up 24/7, filters spam.') },
    { id: 'protocol', group: 'praxis', tag: L('Πρωτόκολλο', 'Protocol'), quote: true, label: L('Πρωτόκολλο και αλληλογραφία', 'Protocol book and correspondence'), note: L('ΕΟΠΥΥ, εργαστήρια, ασφαλιστικές, με αυτόματη αρίθμηση.', 'Insurers, labs, letters, with automatic numbers.') },
    { id: 'ocr', group: 'praxis', tag: L('OCR', 'OCR'), quote: true, label: L('Σάρωση παραπεμπτικών και εξετάσεων (OCR)', 'Scanning referrals and results (OCR)'), note: L('Το έγγραφο γίνεται πεδία στην καρτέλα.', 'The document becomes fields in the record.') },
    { id: 'callstats', group: 'insights', tag: L('Τηλεφωνικό κέντρο', 'Call centre'), quote: true, label: L('Στατιστικά τηλεφωνικού κέντρου', 'Call-centre statistics'), note: L('Κλήσεις, αναμονή, ώρες αιχμής.', 'Calls, waiting, peak hours.') },
    { id: 'greek', group: 'extra', tag: L('Ελληνικό μοντέλο', 'Greek model'), setupExtra: 1500, atCost: true, label: L('Ελληνικό μοντέλο σε υποδομή ΕΕ', 'Greek model on EU infrastructure'), note: L('Llama-Krikri του ΙΕΛ. Φιλοξενία στο κόστος.', 'ILSP\'s Llama-Krikri. Hosting at cost.') },
    { id: 'hdyka', group: 'extra', tag: L('ΗΔΥΚΑ', 'e-health record'), soon: true, label: L('Σύνδεση με ΗΔΥΚΑ', 'National e-health record link'), note: L('Μόλις πιστοποιηθεί. Δηλώστε ενδιαφέρον, χωρίς χρέωση.', 'Once certified. Register interest, no charge.') },
  ],
};

/* ───────── Sponsors: pharma, foundations, CSR (PROPOSAL derived from NGO Insights) ───────── */

export const SPONSOR = {
  causes: [
    L('Ογκολογία', 'Oncology'), L('Σκλήρυνση κατά Πλάκας', 'Multiple sclerosis'), L('Αναπηρία', 'Disability'),
    L('Σπάνια νοσήματα', 'Rare diseases'), L('Ψυχική υγεία', 'Mental health'), L('Άλλο', 'Other'),
  ],
  orgs: [
    { id: '1', label: L('1 οργανισμός', '1 organisation'), count: 1, setupDiscount: 0, coord: 0 },
    { id: '2-5', label: L('2 – 5 οργανισμοί', '2 – 5 organisations'), count: 3, setupDiscount: 0.2, coord: 0 },
    { id: 'fed', label: L('Ομοσπονδία (6+)', 'Federation (6+)'), count: 8, setupDiscount: 0.35, coord: 150 },
  ],
  perOrg: { monthly: 179, setup: 2900 }, // Πλοηγός + MetronAI
  impactPackYear: 600, // quarterly impact report + disclosure file
  options: [
    { id: 'impact', tag: L('Αντίκτυπος', 'Impact'), locked: true, on: true, label: L('Αναφορά αντίκτυπου κάθε τρίμηνο', 'Quarterly impact report'), note: L('Ερωτήσεις που απαντήθηκαν, ανάγκες, κάλυψη.', 'Questions answered, needs, reach.') },
    { id: 'disclosure', tag: L('Δημοσιοποίηση', 'Disclosure'), locked: true, on: true, label: L('Φάκελος δημοσιοποίησης', 'Disclosure file'), note: L('Έτοιμος για τον κώδικα δεοντολογίας ΣΦΕΕ / EFPIA.', 'Ready for the SFEE / EFPIA transparency code.') },
    { id: 'lang2', tag: L('2η γλώσσα', '2nd language'), perOrgMonthly: 20, label: L('Δεύτερη γλώσσα', 'Second language'), note: L('Για μετανάστες, πρόσφυγες, επισκέπτες.', 'For migrants, refugees, visitors.') },
    { id: 'praxis', tag: L('PraxisAI', 'PraxisAI'), perOrgMonthly: 70, perOrgSetup: 1600, label: L('PraxisAI για τις δομές', 'PraxisAI for the services'), note: L('Φάκελοι και καταγραφή για δομές με ωφελούμενους κάθε μέρα.', 'Files and daily log for services with daily beneficiaries.') },
    { id: 'greek', tag: L('Ελληνικό μοντέλο', 'Greek model'), setup: 1500, atCost: true, label: L('Ελληνικό μοντέλο σε υποδομή ΕΕ', 'Greek model on EU infrastructure'), note: L('Llama-Krikri του ΙΕΛ. Φιλοξενία στο κόστος.', 'ILSP\'s Llama-Krikri. Hosting at cost.') },
  ],
};

/* ───────── Compute ───────── */

export function computeNgo(sel) {
  const size = NGO.sizes.find((s) => s.id === sel.size) || NGO.sizes[0];
  const mods = sel.modules;
  const count = MODULE_IDS.filter((id) => mods[id]).length;
  const base = comboPrice(mods) || { monthly: 0, setup: 0 };
  let monthly; let setup; let from = false;
  if (size.network) { monthly = NGO.network.monthly; setup = NGO.network.setup; from = true; } else {
    monthly = base.monthly + size.monthly;
    setup = base.setup + (mods.praxis ? size.setup : 0);
  }
  let atCost = false; const quotes = [];
  const lines = [];
  NGO.features.forEach((ft) => {
    if (ft.inc || !sel.features[ft.id]) return;
    if (ft.module !== 'all' && !mods[ft.module]) return;
    if (ft.quote) { quotes.push(ft); return; }
    if (ft.atCost) atCost = true;
    if (ft.includedWith && count >= ft.includedWith) { lines.push({ ft, included: true }); return; }
    if (!size.network) { monthly += ft.monthly || 0; setup += ft.setup || 0; }
    lines.push({ ft, monthly: ft.monthly || 0, setup: ft.setup || 0 });
  });
  const names = MODULE_IDS.filter((id) => mods[id]).map((id) => ({ dialogos: 'DialogosAI', praxis: 'PraxisAI', metron: 'MetronAI' }[id]));
  const name = size.network ? NGO.network.name : (count === 3 ? L('Ολόκληρο το fλow', 'The whole fλow') : L(names.join(' + '), names.join(' + ')));
  return { audience: 'ngo', name, monthly, setup, from, firstYear: setup + monthly * 12, atCost, quotes, lines, count, saving: size.network ? null : comboSaving(mods), pilot: NGO.pilot };
}

export function computeMed(sel, annual) {
  const size = MED.sizes.find((s) => s.id === sel.size) || MED.sizes[0];
  const f = sel.features;
  let n = size.minTier || 1;
  MED.features.forEach((ft) => { if (f[ft.id] && ft.tier && ft.tier > n) n = ft.tier; });
  const tier = MED.tiers[n - 1];
  let atCost = false; let extraSetup = 0;
  MED.features.forEach((ft) => { if (f[ft.id] && ft.atCost) { atCost = true; extraSetup += ft.setupExtra || 0; } });
  if (size.custom) {
    return { audience: 'med', name: MED.custom.name, monthly: MED.custom.from, setup: MED.custom.setupFrom + extraSetup, from: true, firstYear: MED.custom.setupFrom + extraSetup + MED.custom.from * 12, worth: null, atCost, tierN: 5, features: f, annual };
  }
  const monthly = annual ? tier.annual : tier.monthly;
  const setup = (annual ? 0 : MED.setup) + extraSetup;
  return { audience: 'med', name: tier.name, monthly, monthlyList: tier.monthly, setup, from: false, firstYear: setup + monthly * 12, worth: MED.worth, atCost, tierN: n, features: f, annual };
}

export function computeSponsor(sel) {
  const org = SPONSOR.orgs.find((o) => o.id === sel.orgs) || SPONSOR.orgs[0];
  const years = sel.years || 1;
  const o = sel.options;
  const c = org.count;
  let perOrgMonthly = SPONSOR.perOrg.monthly + (o.lang2 ? 20 : 0) + (o.praxis ? 70 : 0);
  let perOrgSetup = SPONSOR.perOrg.setup + (o.praxis ? 1600 : 0);
  const setupTotal = perOrgSetup + perOrgSetup * (1 - org.setupDiscount) * (c - 1) + (o.greek ? 1500 : 0);
  const monthlyTotal = perOrgMonthly * c + org.coord;
  const total = setupTotal + monthlyTotal * 12 * years + SPONSOR.impactPackYear * years;
  const people = Math.max(1, sel.people) * years;
  return {
    audience: 'sponsor', orgCount: c, orgLabel: org.label, years, setup: setupTotal, monthly: monthlyTotal,
    impact: SPONSOR.impactPackYear * years, total, perPerson: total / people, atCost: !!o.greek, from: org.id === 'fed',
  };
}
