import React from 'react';

/*
 * The three parts of fλow, one place for names, colours and one-word roles.
 * Rename a part here and it changes across home, /flow, /go and /collaborations.
 */
export const MODULES = [
  { id: 'dialogos', name: 'DialogosAI', color: '#6a9bcc', role: { el: 'απαντά', en: 'answers' }, line: { el: 'Απαντά στους ανθρώπους σας 24/7, μόνο από τις δικές σας εγκεκριμένες πηγές.', en: 'Answers your people 24/7, only from your own approved sources.' } },
  { id: 'praxis', name: 'PraxisAI', color: '#9fb383', role: { el: 'ενεργεί', en: 'acts' }, line: { el: 'Κρατά όλες τις πληροφορίες συγκεντρωμένες και κάνει τη δουλειά να προχωρά: εργασίες, πρωτόκολλο, προθεσμίες.', en: 'Keeps all information in one place and moves the work forward: tasks, protocol book, deadlines.' } },
  { id: 'metron', name: 'MetronAI', color: '#d97757', role: { el: 'καταγράφει', en: 'records' }, line: { el: 'Καταγράφει κάθε επαφή και αναλύει: τι ρωτούν, τι λείπει, τι άλλαξε. Έτοιμο για ομάδα και χορηγούς.', en: 'Records every contact and analyses it: what people ask, what is missing, what changed. Ready for your team and sponsors.' } },
];
export const moduleById = (id) => MODULES.find((m) => m.id === id);

/* Where fλow already runs, and which part each organisation has taken so far. */
export const ORGS = [
  {
    id: 'kapa3', name: { el: 'Κάπα3', en: 'Kapa3' }, product: { el: 'Μυρτώ', en: 'Myrto' },
    what: { el: 'Κέντρο Καθοδήγησης Καρκινοπαθών. Η Μυρτώ στηρίζει ανθρώπους με καρκίνο και τις οικογένειές τους.', en: 'Cancer Guidance Center. Myrto supports people with cancer and their families.' },
    logo: '/logos/kapa3.png', href: 'https://www.kapa3.gr', live: true,
    has: ['dialogos', 'metron'], next: null, full: true,
  },
  {
    id: 'poamskp', name: { el: 'ΠΟΑμΣΚΠ', en: 'POAmSKP' }, product: 'ΣΚΠ-i',
    what: { el: 'Πανελλήνια Ομοσπονδία Ατόμων με Σκλήρυνση κατά Πλάκας. Απαντά στην κοινότητα 24 ώρες το 24ωρο.', en: 'Hellenic Federation of People with Multiple Sclerosis. Answers the community around the clock.' },
    logo: '/logos/poamskp.png', href: 'https://www.poamskp.gr', live: true,
    has: ['dialogos'], next: 'metron',
  },
  {
    id: 'bpan', name: { el: 'Ήρωες της BPAN', en: 'BPAN Heroes' }, product: 'BPAN Companion',
    what: { el: 'Βοηθός σε 60 γλώσσες για οικογένειες που ζουν με τη σπάνια νόσο BPAN.', en: 'An assistant in 60 languages for families living with the rare disease BPAN.' },
    logo: '/logos/bepan.png', href: 'https://bpanheroes.gr', live: true,
    has: ['dialogos'], next: 'metron',
  },
  {
    id: 'perfectaki', name: { el: 'Perfectaki Able', en: 'Perfectaki Able' }, product: 'Perfectaki Able',
    what: { el: 'Ψηφιακός πλοηγός για προσβάσιμη εκπαίδευση.', en: 'A digital navigator for accessible education.' },
    logo: '/logos/perfectaki.png', href: 'https://perfectaki.com', live: false,
    has: ['dialogos'], next: 'metron',
  },
];

/* "Go with the fλow" with the orange λ, for buttons */
export const GoLabel = () => <span className="go-label">Go with the f<span className="go-l">λ</span>ow</span>;
