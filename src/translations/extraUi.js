import { pageI18nEl, pageI18nEn } from './pageI18n';

/** Extra UI copy missing from the rebuilt homepage / key pages (EL + EN). */
export const extraUiEl = {
  nav: {
    services: 'Υπηρεσίες',
    toggleMenu: 'Άνοιγμα μενού',
    switchLanguage: 'Αλλαγή γλώσσας',
  },
  footer: {
    complianceBadge: 'EU AI Act Compliant',
  },
  partnerships: {
    logos: {
      kapa3: 'Μυρτώ / ΚΑΠΑ3',
      poamskp: 'ΣΚΠ-i / ΠΟΑμΣΚΠ',
      bepan: 'BPAN Heroes',
      perfectaki: 'Perfectaki Able',
    },
  },
  forbesHero: {
    words: ['Μέτρο', 'μας;', 'Ο', 'άνθρωπος.'],
    ariaLabel: 'Μέτρο μας; Ο άνθρωπος.',
    humanWord: 'άνθρωπος.',
    subBefore: 'Στην εποχή των γενικών chatbot Τεχνητής Νοημοσύνης, σχεδιάσαμε τον',
    subEm: 'ανθρωποκεντρικό ψηφιακό πλοηγό DialogosAI',
    ctaDemo: 'Κλείστε Demo',
    ctaLiveBefore: 'Δείτε τον',
    ctaLiveAfter: '',
    coords: '37.9795° N / 23.7162° E — Αθήνα',
  },
  midCta: {
    bodyBefore: 'Δοκιμάστε τον',
    bodyAfter: 'στον οργανισμό σας. 30 λεπτά αρκούν για να δείτε πώς λειτουργεί.',
    cta: 'Προγραμματίστε Demo',
  },
  enterpriseCta: {
    title: 'Είστε έτοιμοι να ξεκινήσετε;',
    leadBefore: 'Μαζί, φέρνουμε την Τεχνητή Νοημοσύνη στα μέτρα του οργανισμού σας. Προσαρμόστε σήμερα τον',
    leadAfter: 'στις πραγματικές ανάγκες των χρηστών σας.',
    cta: 'Κλείστε ένα Demo',
  },
  aboutSection: {
    title: 'Ποιοι Είμαστε',
    subtitle: 'Η ομάδα, οι αρχές και η αποστολή πίσω από την SimasiaAI.',
    ceoBadge: 'Executive Leadership',
    ceoQuote: '«Η τεχνητή νοημοσύνη αποκτά αξία όταν σχεδιάζεται με μέτρο τον άνθρωπο και λειτουργεί με διαφάνεια, ευθύνη και επιστημονική ακρίβεια.»',
    ceoName: 'Καθηγητής Στέργιος Χατζηκυριακίδης',
    ceoTitle: 'Chief Executive Officer · Υπολογιστική Γλωσσολογία & Τεχνητή Νοημοσύνη',
    teamTitle: 'Συνιδρυτές & Στρατηγική Ομάδα',
    teamSubtitle: 'Η ομάδα πίσω από την ανάπτυξη, το όραμα και την υλοποίηση της SimasiaAI.',
    principlesTitle: 'Αρχές',
    principlesSubtitle: 'Τέσσερις αρχές που καθορίζουν κάθε απόφαση που παίρνουμε.',
    principles: [
      { num: '01', title: 'Ανθρωποκεντρικότητα', body: 'Ο σχεδιασμός μας ξεκινά και τελειώνει με την ανθρώπινη εμπειρία, όχι με την τεχνολογία.' },
      { num: '02', title: 'Υπευθυνότητα και Κανονιστική Συμμόρφωση', body: 'EU AI Act Compliance σε κάθε υλοποίηση. Ασφάλεια δεδομένων, διαφάνεια αποφάσεων και σεβασμός στον χρήστη.' },
      { num: '03', title: 'Οικολογική Καινοτομία', body: 'Eco-Friendly Optimized RAG: ελαχιστοποιούμε το ενεργειακό αποτύπωμα χωρίς να θυσιάζουμε την επίδοση.' },
      { num: '04', title: 'Με Επίκεντρο την Ελλάδα', body: 'Σχεδιάζουμε για την ελληνική γλώσσα, τις τοπικές διαλέκτους και τις ανάγκες της ελληνικής κοινωνίας.' },
    ],
    missionTitle: 'Η Αποστολή μας',
    missionBefore: 'Δεν σχεδιάζουμε μία απλή μηχανή απαντήσεων. Δημιουργήσαμε τον ανθρωποκεντρικό πλοηγό',
    missionAfter: 'που αναπτύσσει έναν αυθεντικό, ασφαλή και προσαρμοσμένο διάλογο με τους χρήστες, με σεβασμό στην ελληνική γλώσσα, την προσβασιμότητα για όλες και όλους, αναλαμβάνοντας την ευθύνη της χρήσης της τεχνολογίας που συνδράμει σε πραγματικές ανάγκες.',
    cta: 'Κλείστε Demo',
    team: [
      { name: 'Δημήτρης', role: 'Head of Sales, Co-Founder & Head of Operations' },
      { name: 'Γιάννης', role: 'CTO & Co-Founder' },
      { name: 'Αναστασία', role: 'Chief Communications Officer (CCO) & Co-Founder' },
      { name: 'Έλενα', role: 'Marketing Strategist' },
      { name: 'Στέφανος', role: 'Sales Manager' },
      { name: 'Παντελής Νικολόπουλος', role: 'Content Creator & Storyteller' },
    ],
  },
  bookDemoPage: {
    eyebrow: '30′ Demo',
    heroTitle: 'Αρχίστε τον διάλογο.',
    heroSubBefore: 'Μία 30λεπτη συνάντηση για να δείτε πώς ο',
    heroSubAfter: 'θα εξυπηρετήσει τον οργανισμό σας.',
    whatTitle: 'Τι θα δείτε',
    whatItems: [
      'Σε ποιον απευθύνεται ο DialogosAI',
      'Live αποδεικτικό με πραγματικές ερωτήσεις',
      'Αρχιτεκτονική EU AI Act συμβατότητα',
      'Τιμολόγιο ταιριασμένο για τον οργανισμό σας',
    ],
    name: 'Όνομα',
    org: 'Οργανισμός',
    email: 'Email',
    message: 'Μήνυμα (προαιρετικό)',
    namePh: 'Κώστας Παπαδόπουλος',
    orgPh: 'Ονομασία Οργανισμού',
    emailPh: 'you@org.gr',
    messagePh: 'Περιγράψτε συνοπτικά την ανάγκη σας...',
    submit: 'Αίτηση Demo',
    submitting: 'Αποστολή...',
    successTitle: 'Ευχαριστούμε!',
    successBody: 'Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε σύντομα.',
    newRequest: 'Νέα αίτηση',
    errorFallback: 'Υπήρξε πρόβλημα με την αποστολή. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε στο contact@simasiaai.gr',
    defaultMessage: 'Αίτημα για 30′ Demo μέσω /book-demo',
  },
  collaborationsPage: {
    title: 'Συνεργασίες',
    heroSubBefore: 'Τέσσερα προγράμματα',
    heroSubAfter: 'σε υλοποίηση για οργανισμούς που εργάζονται με εμπάθεια και ανθρώπινη μέριμνα.',
    more: 'Περισσότερα →',
    interest: 'ενδιαφέρομαι',
  },
  comparison: {
    titleBefore: 'Τι κάνει τον',
    titleAfter: 'διαφορετικό;',
    subtitle: 'Σύγκριση με παραδοσιακά chatbots.',
    headers: { feature: 'Χαρακτηριστικό', traditional: 'Παραδοσιακά chatbots', dialogos: 'DialogosAI' },
    rows: [
      { feature: 'Γλώσσα', traditional: 'Λέξεις-κλειδιά / πρότυπα', dialogos: 'Φυσικά ελληνικά + διάλεκτοι' },
      { feature: 'Συμμόρφωση', traditional: 'Αόριστη / ρίσκο δεδομένων', dialogos: 'Πλήρης EU AI Act' },
      { feature: 'Προσβασιμότητα', traditional: 'Σπάνια / επιφανειακή', dialogos: 'Universal design για ΑμεΑ' },
      { feature: 'Ενέργεια', traditional: 'Υψηλή / ανεξέλεγκτη', dialogos: 'Eco-Friendly Optimized RAG' },
      { feature: 'Ρόλος', traditional: 'Απαντά μόνο', dialogos: 'Προληπτικός ψηφιακός πλοηγός' },
    ],
  },
  liveDemo: {
    subtitle: 'Live Demonstration',
    thinking: 'Σκέφτεται...',
    sources: 'Πηγές',
    placeholder: 'Γράψτε ένα μήνυμα...',
    a11y: {
      back: 'Πίσω',
      menu: 'Μενού',
      expand: 'Ανάπτυξη',
      send: 'Αποστολή',
      input: 'Μήνυμα',
    },
  },
  insightsDashboard: {
    appTitle: 'Insights',
    live: 'Live',
    updated: 'Ενημερώθηκε πριν 2 λεπτά',
    locale: 'el-GR',
    panels: {
      categories: {
        totalLabel: 'ερωτήσεις αναλύθηκαν',
        bars: [
          { label: 'Δικαιώματα & παροχές', value: 84, color: '#d97757', icon: '◆' },
          { label: 'Διαδικασίες αίτησης', value: 67, color: '#6a9bcc', icon: '◇' },
          { label: 'Ιατρική καθοδήγηση', value: 52, color: '#788c5d', icon: '○' },
          { label: 'Ψυχολογική υποστήριξη', value: 38, color: '#b0aea5', icon: '△' },
        ],
      },
      topics: {
        weeks: [
          { date: '16–22 Ιουν', label: 'Εβδ. 1' },
          { date: '23–29 Ιουν', label: 'Εβδ. 2' },
          { date: '30 Ιουν – 6 Ιουλ', label: 'Εβδ. 3' },
          { date: '7–12 Ιουλ', label: 'Τρέχουσα' },
        ],
        items: [
          { label: 'Επίδομα βαρύτητας', delta: '+34%', color: '#d97757', values: [18, 28, 42, 51] },
          { label: 'Κάλυψη φαρμακευτικής', delta: '+28%', color: '#6a9bcc', values: [24, 30, 38, 44] },
          { label: 'Νέα εγκύκλιος ΕΟΠΥΥ', delta: '+21%', color: '#788c5d', values: [10, 14, 19, 27] },
          { label: 'Ανανέωση ΚΕΠΑ', delta: '+17%', color: '#b0aea5', values: [16, 18, 23, 29] },
        ],
      },
      unanswered: {
        successRateLabel: 'επαρκείς απαντήσεις',
        improvedLabel: 'βελτιώθηκαν αυτή την εβδομάδα',
        gapsTitle: 'Χρειάζονται προσοχή',
        successTitle: 'Πρόσφατες επιτυχίες',
        gaps: [
          { text: 'Χρονοδιάγραμμα έκδοσης απόφασης ΚΕΠΑ', status: 'gap' },
          { text: 'Διαφορά επίδομα vs σύνταξη — απαντήθηκε μετά από 2η προσπάθεια', status: 'retry' },
          { text: 'Απαιτούμενα δικαιολογητικά ανανέωσης', status: 'gap' },
        ],
        recentSuccess: [
          'Δικαίωμα φαρμακευτικής κάλυψης ΕΟΠΥΥ',
          'Διαδικασία αίτησης ΚΕΠΑ βήμα-βήμα',
          'Επικοινωνία κοινωνικού λειτουργού',
        ],
      },
      escalations: {
        countLabel: 'παραπομπές σήμερα',
        resolvedLine: 'ολοκληρώθηκαν · μέσος χρόνος',
        avgWait: '4 λεπτά',
        human: 'Άνθρωπος',
        high: 'Υψηλή',
        medium: 'Μέτρια',
        items: [
          {
            time: '09:14',
            question: '«Νιώθω πολύ άγχος για την έναρξη θεραπείας — μπορεί κάποιος να με καλέσει;»',
            note: 'Κρίσιμη συναισθηματική κατάσταση',
            priority: 'high',
            agent: 'Μ. Παπαδοπούλου',
          },
          {
            time: '11:42',
            question: '«Θέλω να μιλήσω με άνθρωπο για την αίτηση ΚΕΠΑ που υπέβαλα.»',
            note: 'Αίτημα άμεσης ανθρώπινης επικοινωνίας',
            priority: 'medium',
            agent: 'Ομάδα triage',
          },
          {
            time: '16:08',
            question: '«Δεν καταλαβαίνω αν δικαιούμαι επίδομα ή σύνταξη — η περίπτωσή μου είναι περίπλοκη.»',
            note: 'Ασαφής περίπτωση — υψηλή προτεραιότητα',
            priority: 'high',
            agent: 'Κοινωνική Υπηρεσία',
          },
        ],
      },
      struggles: {
        frictionLabel: 'σημεία τριβής',
        hotLabel: 'Κορυφαία σημεία τριβής',
        categories: [
          { label: 'Διαδικασίες', pct: 68, count: 214, tone: 'high' },
          { label: 'Έγγραφα & δικαιολογητικά', pct: 54, count: 176, tone: 'mid' },
          { label: 'Ψηφιακές πλατφόρμες', pct: 47, count: 142, tone: 'mid' },
          { label: 'Νομική ορολογία', pct: 32, count: 89, tone: 'low' },
        ],
        hotspots: ['Συλλογή δικαιολογητικών', 'Υποβολή στην πλατφόρμα', 'Παρακολούθηση κατάστασης'],
      },
      sources: {
        items: [
          { label: 'ΦΕΚ 1256/Β/2017', uses: 142, type: 'ΦΕΚ' },
          { label: 'Εγκύκλιος ΕΟΠΥΥ 2024/32', uses: 118, type: 'PDF' },
          { label: 'Οδηγός ΟΠΕΚΑ — Άρθρο 22', uses: 96, type: 'Web' },
          { label: 'Ν.4387/2016 — Αναπηρία', uses: 74, type: 'Νόμος' },
        ],
      },
      autoSync: {
        badge: 'ενεργές συγχρονίσεις',
        items: [
          { label: 'ΦΕΚ 1847/Β/2025', detail: 'Νέα παροχή — προστέθηκε αυτόματα', ago: '12 λεπτά', status: 'done' },
          { label: 'eopyy.gov.gr', detail: 'Σαρώθηκαν 3 νέες σελίδες', ago: 'Τώρα', status: 'syncing' },
          { label: 'Εγκύκλιος ΟΠΕΚΑ 2025/08', detail: 'Ενημερώθηκε στη βάση γνώσης', ago: '1 ώρα', status: 'done' },
          { label: 'efka.gov.gr — ΚΕΠΑ', detail: 'Αυτόματος έλεγχος αλλαγών', ago: 'Τώρα', status: 'syncing' },
        ],
      },
    },
  },
};

export const extraUiEn = {
  nav: {
    services: 'Services',
    toggleMenu: 'Toggle menu',
    switchLanguage: 'Switch language',
  },
  footer: {
    complianceBadge: 'EU AI Act Compliant',
  },
  partnerships: {
    logos: {
      kapa3: 'Myrto / KAPA3',
      poamskp: 'SKP-i / POAMSKP',
      bepan: 'BPAN Heroes',
      perfectaki: 'Perfectaki Able',
    },
  },
  forbesHero: {
    words: ['Our', 'measure?', 'The', 'human.'],
    ariaLabel: 'Our measure? The human.',
    humanWord: 'human.',
    subBefore: 'In the age of generic AI chatbots, we designed the',
    subEm: 'human-centered digital navigator DialogosAI',
    ctaDemo: 'Book a Demo',
    ctaLiveBefore: 'See',
    ctaLiveAfter: '',
    coords: '37.9795° N / 23.7162° E — Athens',
  },
  midCta: {
    bodyBefore: 'Try',
    bodyAfter: 'in your organization. 30 minutes is enough to see how it works.',
    cta: 'Schedule a Demo',
  },
  enterpriseCta: {
    title: 'Ready to get started?',
    leadBefore: 'Together, we bring AI to the scale of your organization. Adapt',
    leadAfter: 'today to the real needs of your users.',
    cta: 'Book a Demo',
  },
  aboutSection: {
    title: 'Who We Are',
    subtitle: 'The team, principles, and mission behind SimasiaAI.',
    ceoBadge: 'Executive Leadership',
    ceoQuote: '“Artificial intelligence gains value when it is designed with the human as its measure — and operates with transparency, responsibility, and scientific precision.”',
    ceoName: 'Professor Stergios Chatzikyriakidis',
    ceoTitle: 'Chief Executive Officer · Computational Linguistics & Artificial Intelligence',
    teamTitle: 'Co-Founders & Strategic Team',
    teamSubtitle: 'The team behind the development, vision, and delivery of SimasiaAI.',
    principlesTitle: 'Principles',
    principlesSubtitle: 'Four principles that shape every decision we make.',
    principles: [
      { num: '01', title: 'Human-centered design', body: 'Our design begins and ends with the human experience — not with technology.' },
      { num: '02', title: 'Responsibility & regulatory compliance', body: 'EU AI Act compliance in every deployment. Data safety, decision transparency, and respect for the user.' },
      { num: '03', title: 'Ecological innovation', body: 'Eco-Friendly Optimized RAG: we minimize energy footprint without sacrificing performance.' },
      { num: '04', title: 'Centered on Greece', body: 'We design for the Greek language, local dialects, and the needs of Greek society.' },
    ],
    missionTitle: 'Our Mission',
    missionBefore: 'We do not design a simple answering machine. We created the human-centered navigator',
    missionAfter: 'that builds authentic, safe, adapted dialogue with users — with respect for the Greek language, accessibility for everyone, and responsibility for technology that serves real needs.',
    cta: 'Book a Demo',
    team: [
      { name: 'Dimitris', role: 'Head of Sales, Co-Founder & Head of Operations' },
      { name: 'Giannis', role: 'CTO & Co-Founder' },
      { name: 'Anastasia', role: 'Chief Communications Officer (CCO) & Co-Founder' },
      { name: 'Elena', role: 'Marketing Strategist' },
      { name: 'Stefanos', role: 'Sales Manager' },
      { name: 'Pantelis Nikolopoulos', role: 'Content Creator & Storyteller' },
    ],
  },
  bookDemoPage: {
    eyebrow: '30′ Demo',
    heroTitle: 'Start the dialogue.',
    heroSubBefore: 'A 30-minute meeting to see how',
    heroSubAfter: 'will serve your organization.',
    whatTitle: 'What you will see',
    whatItems: [
      'Who DialogosAI is for',
      'Live proof with real questions',
      'EU AI Act compatible architecture',
      'Pricing tailored to your organization',
    ],
    name: 'Name',
    org: 'Organization',
    email: 'Email',
    message: 'Message (optional)',
    namePh: 'Kostas Papadopoulos',
    orgPh: 'Organization name',
    emailPh: 'you@org.gr',
    messagePh: 'Briefly describe your need...',
    submit: 'Request Demo',
    submitting: 'Sending...',
    successTitle: 'Thank you!',
    successBody: 'Your message was sent successfully! We will get back to you soon.',
    newRequest: 'New request',
    errorFallback: 'There was a problem sending. Please try again or email contact@simasiaai.gr',
    defaultMessage: 'Demo request via /book-demo',
  },
  collaborationsPage: {
    title: 'Collaborations',
    heroSubBefore: 'Four',
    heroSubAfter: 'programs in delivery for organizations working with empathy and human care.',
    more: 'More →',
    interest: 'I am interested',
  },
  comparison: {
    titleBefore: 'What makes',
    titleAfter: 'different?',
    subtitle: 'Compared with traditional chatbots.',
    headers: { feature: 'Dimension', traditional: 'Traditional chatbots', dialogos: 'DialogosAI' },
    rows: [
      { feature: 'Language', traditional: 'Keywords / templates', dialogos: 'Natural Greek + dialects' },
      { feature: 'Compliance', traditional: 'Vague / data risk', dialogos: 'Full EU AI Act' },
      { feature: 'Accessibility', traditional: 'Rare / superficial', dialogos: 'Universal design for accessibility' },
      { feature: 'Energy', traditional: 'High / uncontrolled', dialogos: 'Eco-Friendly Optimized RAG' },
      { feature: 'Role', traditional: 'Answers only', dialogos: 'Proactive digital navigator' },
    ],
  },
  liveDemo: {
    subtitle: 'Live Demonstration',
    thinking: 'Thinking...',
    sources: 'Sources',
    placeholder: 'Type a message...',
    a11y: {
      back: 'Back',
      menu: 'Menu',
      expand: 'Expand',
      send: 'Send',
      input: 'Message',
    },
  },
  insightsDashboard: {
    appTitle: 'Insights',
    live: 'Live',
    updated: 'Updated 2 minutes ago',
    locale: 'en-GB',
    panels: {
      categories: {
        totalLabel: 'questions analyzed',
        bars: [
          { label: 'Rights & benefits', value: 84, color: '#d97757', icon: '◆' },
          { label: 'Application processes', value: 67, color: '#6a9bcc', icon: '◇' },
          { label: 'Medical guidance', value: 52, color: '#788c5d', icon: '○' },
          { label: 'Psychological support', value: 38, color: '#b0aea5', icon: '△' },
        ],
      },
      topics: {
        weeks: [
          { date: '16–22 Jun', label: 'Wk 1' },
          { date: '23–29 Jun', label: 'Wk 2' },
          { date: '30 Jun – 6 Jul', label: 'Wk 3' },
          { date: '7–12 Jul', label: 'Current' },
        ],
        items: [
          { label: 'Severity allowance', delta: '+34%', color: '#d97757', values: [18, 28, 42, 51] },
          { label: 'Medication coverage', delta: '+28%', color: '#6a9bcc', values: [24, 30, 38, 44] },
          { label: 'New EOPYY circular', delta: '+21%', color: '#788c5d', values: [10, 14, 19, 27] },
          { label: 'KEPA renewal', delta: '+17%', color: '#b0aea5', values: [16, 18, 23, 29] },
        ],
      },
      unanswered: {
        successRateLabel: 'adequate answers',
        improvedLabel: 'improved this week',
        gapsTitle: 'Need attention',
        successTitle: 'Recent successes',
        gaps: [
          { text: 'Timeline for KEPA decision issuance', status: 'gap' },
          { text: 'Benefit vs pension difference — answered after 2nd attempt', status: 'retry' },
          { text: 'Required documents for renewal', status: 'gap' },
        ],
        recentSuccess: [
          'EOPYY medication coverage entitlement',
          'KEPA application process step-by-step',
          'Contacting a social worker',
        ],
      },
      escalations: {
        countLabel: 'escalations today',
        resolvedLine: 'completed · avg wait',
        avgWait: '4 min',
        human: 'Human',
        high: 'High',
        medium: 'Medium',
        items: [
          {
            time: '09:14',
            question: '“I feel very anxious about starting treatment — can someone call me?”',
            note: 'Critical emotional situation',
            priority: 'high',
            agent: 'M. Papadopoulou',
          },
          {
            time: '11:42',
            question: '“I want to speak with a human about the KEPA application I submitted.”',
            note: 'Request for immediate human contact',
            priority: 'medium',
            agent: 'Triage team',
          },
          {
            time: '16:08',
            question: '“I don’t understand if I am entitled to a benefit or a pension — my case is complex.”',
            note: 'Ambiguous case — high priority',
            priority: 'high',
            agent: 'Social Services',
          },
        ],
      },
      struggles: {
        frictionLabel: 'friction points',
        hotLabel: 'Top friction points',
        categories: [
          { label: 'Processes', pct: 68, count: 214, tone: 'high' },
          { label: 'Documents & paperwork', pct: 54, count: 176, tone: 'mid' },
          { label: 'Digital platforms', pct: 47, count: 142, tone: 'mid' },
          { label: 'Legal terminology', pct: 32, count: 89, tone: 'low' },
        ],
        hotspots: ['Collecting documents', 'Submitting on the platform', 'Tracking status'],
      },
      sources: {
        items: [
          { label: 'FEK 1256/B/2017', uses: 142, type: 'FEK' },
          { label: 'EOPYY Circular 2024/32', uses: 118, type: 'PDF' },
          { label: 'OPEKA Guide — Article 22', uses: 96, type: 'Web' },
          { label: 'Law 4387/2016 — Disability', uses: 74, type: 'Law' },
        ],
      },
      autoSync: {
        badge: 'active syncs',
        items: [
          { label: 'FEK 1847/B/2025', detail: 'New benefit — added automatically', ago: '12 min', status: 'done' },
          { label: 'eopyy.gov.gr', detail: '3 new pages scanned', ago: 'Now', status: 'syncing' },
          { label: 'OPEKA Circular 2025/08', detail: 'Updated in knowledge base', ago: '1 hour', status: 'done' },
          { label: 'efka.gov.gr — KEPA', detail: 'Automatic change check', ago: 'Now', status: 'syncing' },
        ],
      },
    },
  },
};

const deepMerge = (target, source) => {
  const out = { ...target };
  Object.keys(source || {}).forEach((key) => {
    const sv = source[key];
    const tv = target[key];
    if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {
      out[key] = deepMerge(tv, sv);
    } else {
      out[key] = sv;
    }
  });
  return out;
};

export const mergeExtraUi = (el, en) => ({
  el: deepMerge(deepMerge(el, extraUiEl), pageI18nEl),
  en: deepMerge(deepMerge(en, extraUiEn), pageI18nEn),
});
