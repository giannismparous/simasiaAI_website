// fλow catalogue: the parts, sizes, features and options of Go with the fλow, WITHOUT prices.
// This is what the browser loads. Prices live only in offerEngine.js, which only the server
// (netlify/functions/send-offer.mjs) imports to write the emailed PDF offer.

export const MODULE_IDS = ['dialogos', 'praxis', 'metron'];

const L = (el, en) => ({ el, en });

/* ───────── NGOs, associations, care services: three parts, alone or together ───────── */

export const NGO = {
  sizes: [
    { id: 's', label: L('Έως 50', 'Up to 50') },
    { id: 'm', label: L('50 – 200', '50 – 200') },
    { id: 'l', label: L('200 – 1.000', '200 – 1,000') },
    { id: 'xl', label: L('Πάνω από 1.000 ή πολλές δομές', 'Over 1,000 or several sites'), network: true },
  ],
  // what each part brings: `inc` = always included, the rest are options
  features: [
    // DialogosAI
    { id: 'd_answers', module: 'dialogos', inc: true, label: L('Απαντά 24/7 στο site σας', 'Answers 24/7 on your site') },
    { id: 'd_sources', module: 'dialogos', inc: true, label: L('Μόνο από τις δικές σας πηγές, με παραπομπή', 'Only from your own sources, with a citation') },
    { id: 'd_rights', module: 'dialogos', inc: true, label: L('Οδηγός δικαιωμάτων: ΚΕΠΑ, ΟΠΕΚΑ, ΕΟΠΥΥ', 'Rights guide: disability, benefits, insurance') },
    { id: 'd_crisis', module: 'dialogos', inc: true, label: L('Τα επείγοντα πάνε σε άνθρωπο', 'Urgent cases go to a person') },
    { id: 'viber', module: 'dialogos', includedWith: 2, label: L('Viber ή Messenger', 'Viber or Messenger') },
    { id: 'whatsapp', module: 'dialogos', label: L('WhatsApp', 'WhatsApp') },
    { id: 'lang2', module: 'dialogos', includedWith: 2, label: L('Δεύτερη γλώσσα', 'Second language') },
    { id: 'phone', module: 'dialogos', quote: true, label: L('Φωνή στο τηλέφωνό σας, 24/7', 'A voice on your phone line, 24/7') },
    // PraxisAI
    { id: 'p_registry', module: 'praxis', inc: true, label: L('Μητρώο μελών ή φάκελοι ωφελουμένων', 'Member registry or beneficiary files') },
    { id: 'p_tasks', module: 'praxis', inc: true, label: L('Εργασίες ανά άνθρωπο, με προθεσμίες', 'Tasks per person, with deadlines') },
    { id: 'p_protocol', module: 'praxis', inc: true, label: L('Πρωτόκολλο με αυτόματη αρίθμηση', 'Protocol book with automatic numbers') },
    { id: 'p_deadlines', module: 'praxis', inc: true, label: L('Υπενθυμίσεις προθεσμιών 60, 30 και 7 μέρες πριν', 'Deadline reminders 60, 30 and 7 days ahead') },
    { id: 'p_agent', module: 'praxis', inc: true, label: L('Ενέργειες που προτείνει και εκτελεί, με έγκριση', 'Actions it proposes and runs, with approval') },
    { id: 'shifts', module: 'praxis', label: L('Βάρδιες και ενημέρωση βάρδιας', 'Shifts and shift handover') },
    { id: 'family', module: 'praxis', requires: 'dialogos', label: L('Ενημερώσεις οικογενειών με έγκριση', 'Approved family updates') },
    { id: 'ocr', module: 'praxis', label: L('Σάρωση εγγράφων (OCR) στον φάκελο', 'Document scanning (OCR) into the file') },
    { id: 'voice', module: 'praxis', label: L('Καταγραφή με φωνή', 'Log by voice') },
    { id: 'dues', module: 'praxis', quote: true, label: L('Συνδρομές και πληρωμές μελών', 'Member dues and payments') },
    { id: 'donors', module: 'praxis', quote: true, label: L('Δωρητές και εθελοντές', 'Donors and volunteers') },
    // MetronAI
    { id: 'm_themes', module: 'metron', inc: true, label: L('Τι ρωτούν και τι λείπει, κάθε μήνα', 'What people ask and what is missing, monthly') },
    { id: 'm_comms', module: 'metron', inc: true, label: L('Στατιστικά επικοινωνίας: κανάλια, ώρες, εκτός ωραρίου', 'Communication stats: channels, hours, after-hours') },
    { id: 'm_report', module: 'metron', inc: true, label: L('Μηνιαία αναφορά για ομάδα και χορηγούς', 'Monthly report for team and sponsors') },
    { id: 'm_accuracy', module: 'metron', inc: true, label: L('Τεστ ακρίβειας κάθε μήνα', 'Monthly accuracy test') },
    { id: 'callcenter', module: 'metron', label: L('Στατιστικά τηλεφωνικού κέντρου', 'Call-centre statistics') },
    { id: 'impact', module: 'metron', label: L('Αναφορά κοινωνικού αντίκτυπου κάθε τρίμηνο', 'Quarterly social-impact report') },
    // the whole flow
    { id: 'greek', module: 'all', atCost: true, label: L('Ελληνικό μοντέλο σε υποδομή ΕΕ (Llama-Krikri)', 'Greek model on EU infrastructure (Llama-Krikri)') },
  ],
};

/* ───────── Practices & clinics: the whole fλow, in four levels ───────── */

export const MED = {
  sizes: [
    { id: '1', label: L('1 γιατρός', '1 doctor'), minTier: 1 },
    { id: '2-5', label: L('2 – 5 γιατροί', '2 – 5 doctors'), minTier: 2 },
    { id: '6+', label: L('6+ γιατροί ή πολλά σημεία', '6+ doctors or several sites'), custom: true },
  ],
  tiers: [
    { n: 1, name: L('Απαντάει', 'Answers') },
    { n: 2, name: L('Κλείνει', 'Books') },
    { n: 3, name: L('Φέρνει πίσω', 'Brings back') },
    { n: 4, name: L('Σηκώνει το τηλέφωνο', 'Picks up the phone') },
  ],
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
    { id: 'greek', group: 'extra', tag: L('Ελληνικό μοντέλο', 'Greek model'), atCost: true, label: L('Ελληνικό μοντέλο σε υποδομή ΕΕ', 'Greek model on EU infrastructure'), note: L('Llama-Krikri του ΙΕΛ. Φιλοξενία στο κόστος.', 'ILSP\'s Llama-Krikri. Hosting at cost.') },
    { id: 'hdyka', group: 'extra', tag: L('ΗΔΥΚΑ', 'e-health record'), soon: true, label: L('Σύνδεση με ΗΔΥΚΑ', 'National e-health record link'), note: L('Μόλις πιστοποιηθεί. Δηλώστε ενδιαφέρον, χωρίς χρέωση.', 'Once certified. Register interest, no charge.') },
  ],
};

/* ───────── Sponsors: pharma, foundations, CSR ───────── */

export const SPONSOR = {
  causes: [
    L('Ογκολογία', 'Oncology'), L('Σκλήρυνση κατά Πλάκας', 'Multiple sclerosis'), L('Αναπηρία', 'Disability'),
    L('Σπάνια νοσήματα', 'Rare diseases'), L('Ψυχική υγεία', 'Mental health'), L('Άλλο', 'Other'),
  ],
  orgs: [
    { id: '1', label: L('1 οργανισμός', '1 organisation'), count: 1 },
    { id: '2-5', label: L('2 – 5 οργανισμοί', '2 – 5 organisations'), count: 3 },
    { id: 'fed', label: L('Ομοσπονδία (6+)', 'Federation (6+)'), count: 8 },
  ],
  options: [
    { id: 'impact', tag: L('Αντίκτυπος', 'Impact'), locked: true, on: true, label: L('Αναφορά αντίκτυπου κάθε τρίμηνο', 'Quarterly impact report'), note: L('Ερωτήσεις που απαντήθηκαν, ανάγκες, κάλυψη.', 'Questions answered, needs, reach.') },
    { id: 'disclosure', tag: L('Δημοσιοποίηση', 'Disclosure'), locked: true, on: true, label: L('Φάκελος δημοσιοποίησης', 'Disclosure file'), note: L('Έτοιμος για τον κώδικα δεοντολογίας ΣΦΕΕ / EFPIA.', 'Ready for the SFEE / EFPIA transparency code.') },
    { id: 'lang2', tag: L('2η γλώσσα', '2nd language'), label: L('Δεύτερη γλώσσα', 'Second language'), note: L('Για μετανάστες, πρόσφυγες, επισκέπτες.', 'For migrants, refugees, visitors.') },
    { id: 'praxis', tag: L('PraxisAI', 'PraxisAI'), label: L('PraxisAI για τις δομές', 'PraxisAI for the services'), note: L('Φάκελοι και καταγραφή για δομές με ωφελούμενους κάθε μέρα.', 'Files and daily log for services with daily beneficiaries.') },
    { id: 'greek', tag: L('Ελληνικό μοντέλο', 'Greek model'), atCost: true, label: L('Ελληνικό μοντέλο σε υποδομή ΕΕ', 'Greek model on EU infrastructure'), note: L('Llama-Krikri του ΙΕΛ. Φιλοξενία στο κόστος.', 'ILSP\'s Llama-Krikri. Hosting at cost.') },
  ],
};
