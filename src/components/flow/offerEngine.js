// fλow offer engine: every price and feature of the builder lives here.
// Prices exclude VAT. Hosting and AI usage are billed at cost (as in all contracts).
//
// Sources
// - Clinics: the live /ypodochi tiers (Απαντάει 199/149, Κλείνει 249/199,
//   Φέρνει πίσω 299/249, Σηκώνει το τηλέφωνο 399/299; setup 490 €, free with annual).
// - NGOs: Oct 2026 pricing doc (Πλοηγός 119 + 2.400, Πλοηγός Insights 179 + 2.900,
//   Φροντίδα 249 + 4.500, Δίκτυο από 450 + 7.500; pilot 490 € for 60 days).
// - Sponsors: derived from the NGO Insights package per organisation (PROPOSAL, to confirm).
// - Size steps, add-on prices and the Greek-model tier are PROPOSALS (to confirm).

const L = (el, en) => ({ el, en });

/* ───────── NGOs: Insights (dashboard) is the product; PraxisAI for daily care ───────── */

export const NGO = {
  sizes: [
    { id: 's', label: L('Έως 50', 'Up to 50'), monthly: 0, setup: 0 },
    { id: 'm', label: L('50 – 200', '50 – 200'), monthly: 30, setup: 300 },
    { id: 'l', label: L('200 – 1.000', '200 – 1,000'), monthly: 70, setup: 600 },
    { id: 'xl', label: L('Πάνω από 1.000 ή πολλές δομές', 'Over 1,000 or several sites'), network: true },
  ],
  // tiers are cumulative; the highest selected module sets the base
  tiers: [
    { id: 'navigator', name: L('Πλοηγός', 'Navigator'), monthly: 119, setup: 2400, worth: L('3.550 € + 135 €/μήνα', '€3,550 + €135/month') },
    { id: 'insights', name: L('Πλοηγός Insights', 'Navigator Insights'), monthly: 179, setup: 2900, worth: L('4.450 € + 255 €/μήνα', '€4,450 + €255/month') },
    { id: 'care', name: L('Φροντίδα', 'Care'), monthly: 249, setup: 4500, worth: L('6.900 € + 495 €/μήνα', '€6,900 + €495/month') },
  ],
  network: { name: L('Δίκτυο', 'Network'), monthly: 450, setup: 7500 },
  features: [
    { id: 'dialogos', group: 'logos', tag: L('DialogosAI 24/7', 'DialogosAI 24/7'), tier: 'navigator', locked: true, on: true,
      label: L('DialogosAI στο site σας, 24/7', 'DialogosAI on your site, 24/7'),
      note: L('Απαντά μόνο από τις δικές σας εγκεκριμένες πηγές, με παραπομπή.', 'Answers only from your approved sources, with a citation.') },
    { id: 'rights', group: 'logos', tag: L('Δικαιώματα', 'Rights guide'), tier: 'navigator', locked: true, on: true,
      label: L('Οδηγός δικαιωμάτων', 'Rights guide'),
      note: L('ΚΕΠΑ, ΟΠΕΚΑ, ΕΟΠΥΥ, εργασιακά. Κοινό για όλους, ενημερώνεται συνεχώς.', 'Disability, benefits, insurance, work rights. Shared and kept up to date.') },
    { id: 'insights', group: 'insights', tag: L('Insights', 'Insights'), tier: 'insights', on: true, recommended: true,
      label: L('Πίνακας Insights και αναφορά για χορηγούς', 'Insights dashboard and funder report'),
      note: L('Τι ρωτούν, τι λείπει, πώς νιώθουν. Κάθε μήνα, έτοιμο για χορηγούς.', 'What people ask, what is missing, how they feel. Monthly, funder-ready.') },
    { id: 'viber', group: 'logos', tag: L('Viber', 'Viber'), monthly: 20, setup: 200, includedFrom: 'insights',
      label: L('Viber ή Messenger', 'Viber or Messenger'), note: L('Εκεί που ήδη γράφουν οι άνθρωποί σας.', 'Where your people already write.') },
    { id: 'whatsapp', group: 'logos', tag: L('WhatsApp', 'WhatsApp'), monthly: 20, setup: 200,
      label: L('WhatsApp', 'WhatsApp'), note: L('Δεύτερο κανάλι συνομιλίας.', 'A second chat channel.') },
    { id: 'lang2', group: 'logos', tag: L('2η γλώσσα', '2nd language'), monthly: 20, setup: 300, includedFrom: 'insights',
      label: L('Δεύτερη γλώσσα', 'Second language'), note: L('Π.χ. αγγλικά, αραβικά, ουκρανικά.', 'E.g. English, Arabic, Ukrainian.') },
    { id: 'praxis', group: 'praxis', tag: L('PraxisAI', 'PraxisAI'), tier: 'care',
      label: L('PraxisAI: φάκελοι, καταγραφή, λήξεις', 'PraxisAI: files, daily log, expiries'),
      note: L('Για δομές με ανθρώπους κάθε μέρα. Υπενθυμίσεις 60, 30, 7 μέρες πριν.', 'For services with people every day. Reminders 60, 30, 7 days ahead.') },
    { id: 'family', group: 'praxis', tag: L('Οικογένειες', 'Families'), requires: 'praxis', includedFrom: 'care',
      label: L('Ενημερώσεις οικογενειών με έγκριση', 'Approved family updates'), note: L('Η οικογένεια ξέρει «πώς ήταν σήμερα».', 'Families know "how today was".') },
    { id: 'voice', group: 'praxis', tag: L('Φωνή', 'Voice'), requires: 'praxis', monthly: 30, setup: 0,
      label: L('Καταγραφή με φωνή', 'Log by voice'), note: L('Μιλάτε, το PraxisAI γράφει.', 'You speak, PraxisAI writes.') },
    { id: 'greek', group: 'extra', tag: L('Ελληνικό μοντέλο', 'Greek model'), setup: 1500, atCost: true,
      label: L('Ελληνικό μοντέλο σε υποδομή ΕΕ', 'Greek model on EU infrastructure'),
      note: L('Llama-Krikri του ΙΕΛ. Για φορείς που ζητούν κυριαρχία δεδομένων. Φιλοξενία στο κόστος.', 'ILSP\'s Llama-Krikri. For bodies that ask for data sovereignty. Hosting at cost.') },
  ],
  pilot: 490,
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
    { id: 'report', group: 'insights', tag: L('Insights', 'Insights'), tier: 1, locked: true, on: true, label: L('Μηνιαία αναφορά Insights', 'Monthly Insights report'), note: L('Τι ζητούν οι ασθενείς που δεν προσφέρετε.', 'What patients ask for that you don\'t offer.') },
    { id: 'booking', group: 'praxis', tag: L('Ραντεβού', 'Bookings'), tier: 2, label: L('Κλείνει ραντεβού στο ημερολόγιό σας', 'Books into your calendar'), note: L('Κλείνει, αλλάζει, ακυρώνει. doctoranytime, Google Calendar.', 'Books, moves, cancels. Works with your calendar.') },
    { id: 'channels', group: 'logos', tag: L('Viber, WhatsApp', 'Viber, WhatsApp'), tier: 2, label: L('Viber, WhatsApp, Instagram, Facebook', 'Viber, WhatsApp, Instagram, Facebook'), note: L('Εκεί που γράφουν πραγματικά οι ασθενείς.', 'Where patients actually write.') },
    { id: 'forms', group: 'praxis', tag: L('Έντυπα', 'Intake forms'), tier: 2, label: L('Έντυπα εγγραφής πριν την επίσκεψη', 'Intake forms before the visit'), note: L('Φεύγουν μόλις κλειστεί το ραντεβού.', 'Sent as soon as the visit is booked.') },
    { id: 'missed', group: 'praxis', tag: L('Αναπάντητες', 'Missed calls'), tier: 3, label: L('Αναπάντητη κλήση, αμέσως Viber ή SMS', 'Missed call, instant Viber or SMS'), note: L('«Συνεχίστε εδώ». Κανένας ασθενής δεν χάνεται.', '"Continue here". No patient lost.') },
    { id: 'reminders', group: 'praxis', tag: L('Recall', 'Recall'), tier: 3, label: L('Υπενθυμίσεις και recall', 'Reminders and recall'), note: L('24 ώρες πριν, ετήσιος έλεγχος, ημιτελείς θεραπείες.', '24 hours ahead, annual check-ups, unfinished treatments.') },
    { id: 'reviews', group: 'insights', tag: L('Κριτικές', 'Reviews'), tier: 3, label: L('Γνώμη ιδιωτικά, πριν το Google review', 'Private feedback before Google reviews'), note: L('Οι ευχαριστημένοι πάνε στο Google, τα παράπονα σε εσάς.', 'Happy patients go to Google, complaints come to you.') },
    { id: 'voice', group: 'logos', tag: L('Φωνή 24/7', 'Voice 24/7'), tier: 4, label: L('Ζωντανή φωνή στον αριθμό σας', 'A live voice on your number'), note: L('Σηκώνει το τηλέφωνο 24/7, φιλτράρει spam.', 'Picks up 24/7, filters spam.') },
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
  perOrg: { monthly: 179, setup: 2900 }, // Πλοηγός Insights
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

const tierIndex = (id) => NGO.tiers.findIndex((t) => t.id === id);

export function computeNgo(sel) {
  const size = NGO.sizes.find((s) => s.id === sel.size) || NGO.sizes[0];
  const on = (id) => !!sel.features[id];
  if (on('family') || on('voice')) sel = { ...sel, features: { ...sel.features, praxis: true } };
  if (sel.features.praxis) sel = { ...sel, features: { ...sel.features, insights: true } };
  const f = sel.features;
  let tier = NGO.tiers[0];
  NGO.features.forEach((ft) => { if (f[ft.id] && ft.tier && tierIndex(ft.tier) > tierIndex(tier.id)) tier = NGO.tiers[tierIndex(ft.tier)]; });
  const lines = [];
  let monthly; let setup; let name; let from = false;
  if (size.network) {
    monthly = NGO.network.monthly; setup = NGO.network.setup; name = NGO.network.name; from = true;
  } else {
    monthly = tier.monthly; setup = tier.setup; name = tier.name;
    if (size.monthly || size.setup) lines.push({ key: 'size', monthly: size.monthly, setup: f.praxis ? size.setup : 0 });
    monthly += size.monthly; setup += f.praxis ? size.setup : 0;
  }
  let atCost = false;
  NGO.features.forEach((ft) => {
    if (!f[ft.id] || ft.tier) return;
    const included = ft.includedFrom && tierIndex(tier.id) >= tierIndex(ft.includedFrom);
    if (ft.atCost) atCost = true;
    if (included) { lines.push({ key: ft.id, included: true }); return; }
    const m = ft.monthly || 0; const s = ft.setup || 0;
    monthly += m; setup += s;
    lines.push({ key: ft.id, monthly: m, setup: s, atCost: ft.atCost });
  });
  return { audience: 'ngo', name, monthly, setup, from, firstYear: setup + monthly * 12, worth: size.network ? null : tier.worth, atCost, pilot: NGO.pilot, lines, features: f, tierId: size.network ? 'network' : tier.id };
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
