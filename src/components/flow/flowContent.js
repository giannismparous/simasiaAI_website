// fλow home page: every word on the page lives here (Greek + English).
// fλow = DialogosAI (the assistant, «Λόγος») + PraxisAI (the CRM, «Πράξη»).
// No prices on the site: the priced offer is emailed as a PDF from /go.

export const flowContent = {
  el: {
    hero: {
      by: 'της SimasiaAI',
      title: 'Πολύπλευρη Φροντίδα με ροή.',
      sub: [
        ['Το DialogosAI', ' απαντά στους ανθρώπους σας, μέρα και νύχτα. '],
        ['Το PraxisAI', ' κρατά όλες τις πληροφορίες συγκεντρωμένες. '],
        ['', 'Διάλογος και πράξη είναι συνδεδεμένα. Μαζί, η μέρα σας κυλά πιο ήσυχα. Κυλάει με ροή.'],
      ],
      cta: 'Φτιάξτε το fλow σας',
      link: 'Δείτε πώς δουλεύει',
      aria: 'Τρία ρεύματα, ο Λόγος (DialogosAI), η Πράξη (PraxisAI) και η Καταγραφή (MetronAI), ενώνονται σε σχήμα λ και γίνονται ένα ήρεμο ποτάμι. Χάρτινα καραβάκια μεταφέρουν ερωτήσεις που φτάνουν ως απαντήσεις.',
      logos: ['Λόγος', 'Το DialogosAI απαντά'],
      praxis: ['Πράξη', 'Το PraxisAI ενεργεί'],
      metron: ['Καταγραφή', 'Το MetronAI καταγράφει'],
      roi: ['Ροή', 'μία ήσυχη μέρα'],
      boats: [
        { q: 'Πώς ήταν σήμερα ο Νίκος;', a: 'Ήρεμος. Έφτιαξε ένα βάζο στην κεραμική.' },
        { q: 'Προθεσμία για την πιστοποίηση της Μαρίας', a: 'Η υπενθύμιση έφυγε 60 μέρες πριν.' },
        { q: 'Υπάρχει ραντεβού το Σάββατο;', a: 'Ναι, στις 10:30. Σας το κράτησα.' },
      ],
    },

    parts: {
      title: 'Λόγος και Πράξη, σε ένα ρεύμα',
      lead: 'Δύο εργαλεία που δουλεύουν και μόνα τους. Όταν ενωθούν, το ένα ξέρει ό,τι κάνει το άλλο, και τίποτα δεν φεύγει χωρίς άνθρωπο.',
      logos: {
        name: 'DialogosAI', word: 'Λόγος',
        line: 'Μιλά με τους ανθρώπους σας.',
        items: ['Απαντά 24/7 στο site, στο Viber και στο WhatsApp', 'Μόνο από τις δικές σας εγκεκριμένες πηγές', 'Λέει «δεν ξέρω» και σας φωνάζει όταν χρειάζεται', 'Καταλαβαίνει Greeklish και βιαστικά μηνύματα'],
      },
      praxis: {
        name: 'PraxisAI', word: 'Πράξη',
        line: 'Κρατά τη δουλειά της ομάδας.',
        items: ['Φάκελος για κάθε άνθρωπο, σε κινητό και υπολογιστή', 'Καταγραφή με κουμπιά ή με φωνή', 'Θυμάται κάθε προθεσμία, 60, 30 και 7 μέρες πριν', 'Αναφορές για χορηγούς και ΕΣΠΑ με ένα κλικ'],
      },
      joint: {
        word: 'Ροή', name: 'fλow',
        gate: 'Έγκριση από άνθρωπο',
        items: ['Ενημερώσεις οικογενειών που εγκρίνατε', 'Το DialogosAI ξέρει «πώς ήταν σήμερα»', 'MetronAI: τι ρωτούν και τι λείπει'],
      },
    },

    day: {
      title: 'Η ίδια μέρα, με άλλο ρυθμό',
      lead: 'Πατήστε για να δείτε τη διαφορά. Τα σημεία είναι τα ίδια· αλλάζει το πόσο σας ταρακουνούν.',
      toggle: ['Σήμερα', 'Με fλow'],
      aria: 'Γραμμή της μέρας από τις 8 το πρωί ως τις 8 το βράδυ. Χωρίς fλow είναι ταραγμένη, με fλow ομαλή.',
    },

    editions: { aria: 'Τύπος οργανισμού', ngo: 'ΜΚΟ και δομές φροντίδας', med: 'Ιατρεία και κλινικές' },

    insights: {
      title: 'Ό,τι ακούει, το θυμάται',
      lead: {
        ngo: 'Κάθε μήνα βλέπετε τι ρωτούν οι άνθρωποί σας και τι μένει αναπάντητο. Το δίνετε όπως είναι στους χορηγούς σας.',
        med: 'Κάθε μήνα βλέπετε τι ζητούν οι ασθενείς σας, τι χάνεται εκτός ωραρίου και πού μένουν κενά στο πρόγραμμα.',
      },
      sample: 'Δείγμα με δοκιμαστικά δεδομένα',
      conv: ['1.284', 'συνομιλίες τον μήνα'], after: ['41%', 'έξω από το ωράριο'], answered: ['87%', 'απαντήθηκαν από τις πηγές σας'],
      themes: 'Τι ρωτούν', needs: 'Τι λείπει', needsNote: 'Αυτό γίνεται η επόμενη πρότασή σας για χρηματοδότηση.', q: 'ερωτήσεις',
    },

    crossing: {
      title: 'Περνάμε το ποτάμι μαζί',
      lead: 'Δεν πληρώνετε εγκατάσταση. Πληρώνετε τη μετάβαση, και την κάνουμε εμείς.',
      steps: [
        ['Ακούμε', 'Ερωτηματολόγιο 5 λεπτών για την ομάδα και ένα εργαστήριο.'],
        ['Στήνουμε', 'Η γνώση σας, το όνομα, το ύφος, τα κανάλια. Χωρίς κώδικα για εσάς.'],
        ['Μαθαίνουμε μαζί', 'Συναντήσεις, οδηγός στα ελληνικά, ένας άνθρωπος-σημείο αναφοράς σε κάθε ομάδα.'],
        ['Μένουμε δίπλα σας', '90 μέρες με μηνιαίο τεστ ακρίβειας, ώσπου η ροή να σταθεί.'],
      ],
    },

    trust: {
      title: 'Το AI βοηθά. Οι άνθρωποι αποφασίζουν.',
      items: [
        ['Μιλά μόνο από ό,τι εγκρίνατε.', 'Με παραπομπή στην πηγή. Όταν δεν ξέρει, το λέει.'],
        ['Τίποτα δεν φεύγει χωρίς άνθρωπο.', 'Κάθε ενημέρωση προς οικογένεια περνά από έγκριση.'],
        ['Ποτέ ιατρική συμβουλή.', 'Ούτε διάγνωση, ούτε αλλαγή αγωγής. Τα επείγοντα πάνε σε άνθρωπο.'],
        ['Σύμφωνο με EU AI Act και GDPR.', 'Δηλώνει ότι είναι AI. Τα δεδομένα μένουν στην ΕΕ. Η συμμόρφωση είναι η πρώτη μας προτεραιότητα.'],
        ['Νομικός συνεργάτης σε κάθε έργο.', 'Συνεργαζόμενη νομική εταιρεία αξιολογεί ξεχωριστά κάθε υλοποίηση, πριν βγει στους ανθρώπους σας.'],
        ['Ελέγχουμε την ακρίβεια, κάθε μήνα.', 'Κανένα σύστημα AI δεν είναι αλάθητο. Γι\' αυτό: τεστ αποδοχής πριν το live, μηνιαίο τεστ μετά, και σαφής ενημέρωση των χρηστών.'],
      ],
      termsLink: 'Ακρίβεια απαντήσεων: τι ισχύει',
    },

    final: {
      title: 'Ας δούμε πού εμποδίζεται η ροή σας.',
      lead: 'Ξεκινήστε με λίγες ερωτήσεις για τη μέρα σας. Βλέπετε πού χάνεται χρόνος, το fλow σας σχεδιάζεται από τις απαντήσεις σας, και η προσφορά σας έρχεται στο email σας. Δωρεάν, χωρίς δέσμευση.',
      build: 'Φτιάξτε το fλow σας',
      cta: 'ή κλείστε 30 λεπτά μαζί μας',
      mail: 'ή γράψτε μας στο',
    },
  },

  en: {
    hero: {
      by: 'by SimasiaAI',
      title: 'Many-sided care, in flow.',
      sub: [
        ['DialogosAI', ' answers your people, day and night. '],
        ['PraxisAI', ' keeps all your information in one place. '],
        ['', 'Dialogue and action are connected. Together, your day runs more quietly. It runs in flow.'],
      ],
      cta: 'Build your fλow',
      link: 'See how it works',
      aria: 'Three streams, Logos (DialogosAI), Praxis (PraxisAI) and Record (MetronAI), meet in the shape of λ and become one calm river. Paper boats carry questions that arrive as answers.',
      logos: ['Logos', 'DialogosAI answers'],
      praxis: ['Praxis', 'PraxisAI acts'],
      metron: ['Record', 'MetronAI records'],
      roi: ['Flow', 'one quiet day'],
      boats: [
        { q: 'How was Nikos today?', a: 'Calm. He made a vase in pottery class.' },
        { q: 'Deadline for Maria\'s certificate', a: 'The reminder went out 60 days ahead.' },
        { q: 'Any slot on Saturday?', a: 'Yes, at 10:30. I held it for you.' },
      ],
    },
    parts: {
      title: 'Word and action, in one stream',
      lead: 'Two tools that work on their own. Joined, each knows what the other does, and nothing leaves without a person.',
      logos: { name: 'DialogosAI', word: 'Logos', line: 'Talks with your people.', items: ['Answers 24/7 on your site, Viber and WhatsApp', 'Only from your approved sources', 'Says "I don\'t know" and calls you in when needed', 'Understands Greeklish and hurried messages'] },
      praxis: { name: 'PraxisAI', word: 'Praxis', line: 'Holds your team\'s work.', items: ['A file for every person, on phone and desktop', 'Log by tap or by voice', 'Remembers every deadline, 60, 30 and 7 days ahead', 'Funder and grant reports in one click'] },
      joint: { word: 'Flow', name: 'fλow', gate: 'Human approval', items: ['Family updates you approved', 'DialogosAI knows "how today was"', 'MetronAI: what people ask and what is missing'] },
    },
    day: { title: 'The same day, at a different pace', lead: 'Tap to see the difference. The moments are the same; what changes is how much they shake you.', toggle: ['Today', 'With fλow'], aria: 'A line of the day from 8am to 8pm. Without fλow it is turbulent, with fλow it is smooth.' },
    editions: { aria: 'Type of organisation', ngo: 'NGOs and care services', med: 'Practices and clinics' },
    insights: {
      title: 'What it hears, it remembers',
      lead: { ngo: 'Every month you see what your people ask and what stays unanswered. Hand it to your funders as it is.', med: 'Every month you see what patients ask for, what is lost after hours and where your schedule has gaps.' },
      sample: 'Sample with test data', conv: ['1,284', 'conversations a month'], after: ['41%', 'outside office hours'], answered: ['87%', 'answered from your sources'],
      themes: 'What they ask', needs: 'What is missing', needsNote: 'This becomes your next funding proposal.', q: 'questions',
    },
    crossing: {
      title: 'We cross the river together',
      lead: 'You don\'t pay for installation. You pay for the transition, and we do it.',
      steps: [['We listen', 'A 5-minute team survey and one workshop.'], ['We set up', 'Your knowledge, name, tone and channels. No code on your side.'], ['We learn together', 'Sessions, a guide in your language, one go-to person per team.'], ['We stay close', '90 days with a monthly accuracy test, until the flow holds.']],
    },
    trust: {
      title: 'AI assists. People decide.',
      items: [['It only speaks from what you approved.', 'With a source. When it doesn\'t know, it says so.'], ['Nothing leaves without a person.', 'Every family update goes through approval.'], ['Never medical advice.', 'No diagnosis, no treatment changes. Urgent cases go to a person.'], ['EU AI Act and GDPR compliant.', 'It says it is AI. Data stays in the EU. Compliance is our first priority.'], ['A legal partner on every project.', 'A partner law firm reviews every implementation separately, before it reaches your people.'], ['We check accuracy, every month.', 'No AI system is infallible. So: an acceptance test before going live, a monthly test after, and clear notice to users.']],
      termsLink: 'Answer accuracy: what applies',
    },
    final: {
      title: 'Let\'s see where your flow is blocked.',
      lead: 'Start with a few questions about your day. You see where time is lost, your fλow is designed from your answers, and your offer arrives in your inbox. Free, no commitment.',
      build: 'Build your fλow',
      cta: 'or book 30 minutes with us', mail: 'or write to us at',
    },
  },
};

// Edition data. Day rows: [time, without fλow, with fλow, intensity 0..1]
export const editions = {
  el: {
    ngo: {
      day: [
        ['08:00', 'Η βάρδια ψάχνει σημειώσεις σε τετράδια', 'Η παράδοση βάρδιας είναι σε μία οθόνη', 0.7],
        ['10:30', 'Τρία τηλέφωνα «πώς είναι;», η δουλειά σταματά', 'Το DialogosAI απαντά από την εγκεκριμένη σύνοψη', 0.9],
        ['13:00', 'Χρειάζεται μια αλλεργία, ο φάκελος είναι στο γραφείο', 'Αγωγή και αλλεργίες με ένα πάτημα', 0.6],
        ['16:00', 'Μια πιστοποίηση αναπηρίας έληξε χωρίς να το δει κανείς', 'Η υπενθύμιση ήρθε 60 μέρες πριν', 1],
        ['18:30', 'Η αναφορά για τον χορηγό, δύο βράδια σε Excel', 'Η μηνιαία αναφορά βγαίνει μόνη της', 0.8],
      ],
      th: [['Πιστοποίηση ΚΕΠΑ', 31], ['Επιδόματα ΟΠΕΚΑ', 22], ['Ραντεβού και νοσοκομεία', 17], ['Ψυχολογική στήριξη', 12], ['Δωρεές και εθελοντισμός', 8]],
      nd: [['Μεταφορά προς θεραπείες', 14], ['Ομάδες στήριξης γονέων', 9], ['Φροντίδα το Σαββατοκύριακο', 6]],
    },
    med: {
      day: [
        ['08:00', 'Τέσσερις αναπάντητες κλήσεις από χθες βράδυ', 'Τα ραντεβού έκλεισαν τη νύχτα, στο Viber', 0.8],
        ['09:30', 'Ο ασθενής γράφει ιστορικό στην αναμονή', 'Το ερωτηματολόγιο ήρθε συμπληρωμένο από χθες', 0.6],
        ['12:00', 'Μια ακύρωση αφήνει κενό μισή ώρα', 'Η λίστα αναμονής το γέμισε', 0.9],
        ['15:00', 'Ερωτήσεις για ΕΟΠΥΥ ενώ εξετάζετε', 'Το DialogosAI απάντησε από τον τιμοκατάλογό σας', 0.7],
        ['19:00', 'Οι ετήσιοι έλεγχοι ξεχνιούνται', 'Το recall έφυγε με σύνδεσμο για ραντεβού', 1],
      ],
      th: [['Ραντεβού και διαθεσιμότητα', 38], ['Τιμές και ΕΟΠΥΥ', 21], ['Προετοιμασία εξετάσεων', 16], ['Αποτελέσματα', 14], ['Επανάληψη συνταγής', 11]],
      nd: [['Ραντεβού Σάββατο πρωί', 22], ['Τηλεϊατρική', 11], ['Αγγλικά για επισκέπτες', 7]],
    },
  },
  en: {
    ngo: {
      day: [
        ['08:00', 'The shift digs through notebooks', 'The shift handover is on one screen', 0.7],
        ['10:30', 'Three "how is he?" calls, work stops', 'DialogosAI answers from the approved summary', 0.9],
        ['13:00', 'An allergy is needed, the file is in the office', 'Medication and allergies in one tap', 0.6],
        ['16:00', 'A disability certificate deadline slipped by', 'The reminder came 60 days ahead', 1],
        ['18:30', 'The funder report, two evenings in Excel', 'The monthly report builds itself', 0.8],
      ],
      th: [['Disability certification', 31], ['Welfare benefits', 22], ['Appointments and hospitals', 17], ['Psychological support', 12], ['Donations and volunteering', 8]],
      nd: [['Transport to therapy', 14], ['Parent support groups', 9], ['Weekend care', 6]],
    },
    med: {
      day: [
        ['08:00', 'Four missed calls from last night', 'Bookings closed overnight, on Viber', 0.8],
        ['09:30', 'The patient fills in history in the waiting room', 'The intake form arrived yesterday', 0.6],
        ['12:00', 'A cancellation leaves a 30-minute gap', 'The waiting list filled it', 0.9],
        ['15:00', 'Insurance questions while you examine', 'DialogosAI answered from your price list', 0.7],
        ['19:00', 'Annual check-ups get forgotten', 'The recall went out with a booking link', 1],
      ],
      th: [['Appointments and availability', 38], ['Prices and insurance', 21], ['Exam preparation', 16], ['Results', 14], ['Repeat prescriptions', 11]],
      nd: [['Saturday morning slots', 22], ['Telemedicine', 11], ['English for visitors', 7]],
    },
  },
};
