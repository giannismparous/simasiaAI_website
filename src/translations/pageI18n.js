/** Full bilingual page copy for Live Demo, Chatbots, Services, and Solutions (EL + EN). */

export const pageI18nEl = {
  liveDemo: {
    subtitle: 'Live Demonstration',
    thinking: 'Σκέφτεται...',
    sources: 'Πηγές',
    placeholder: 'Γράψτε ένα μήνυμα...',
    internalsLabel: 'Εσωτερική διαδικασία',
    a11y: {
      back: 'Πίσω',
      menu: 'Μενού',
      expand: 'Ανάπτυξη',
      send: 'Αποστολή',
      input: 'Μήνυμα',
    },
    conversations: [
      {
        turns: [
          {
            user: 'Πώς μπορεί η ΠΟΑμΣΚΠ να με βοηθήσει;',
            bot: 'Η ΠΟΑμΣΚΠ διενεργεί πανελλαδική έρευνα για τις ανάγκες των ατόμων με ΣΚΠ και στηρίζει την κοινότητα με ενημέρωση και υποστήριξη. Θα θέλατε κάτι πιο συγκεκριμένο;',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Parse user intent · οργανισμός / υποστήριξη' },
                  { icon: 'dot', text: 'Match domain → υγεία · ΣΚΠ', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'nodes', text: 'Retrieve verified sources (poamskp.gr)' },
                  { icon: 'branch', text: 'RAG context assembled · 3 chunks' },
                ],
              },
              {
                stepId: '03',
                lines: [
                  { icon: 'branch', text: 'Generate response · ελληνικά · cited' },
                  { icon: 'dot', text: 'Compliance check passed', accent: true },
                ],
              },
            ],
          },
          {
            user: 'Ναι, τι δράσεις ενημέρωσης έχει;',
            bot: 'Οργανώνει ημερίδες, webinars και εκπαιδευτικό υλικό για οικογένειες και επαγγελματίες. Μπορείτε να δείτε το ημερολόγιο στο poamskp.gr.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Follow-up intent · ενημέρωση / δράσεις' },
                  { icon: 'dot', text: 'Context carry-over · POAMSKP', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'branch', text: 'Generate response · events calendar' },
                  { icon: 'dot', text: 'Ready to respond', accent: true },
                ],
              },
            ],
          },
        ],
      },
      {
        turns: [
          {
            user: 'Ποιες υπηρεσίες προσφέρει το ΚΑΠΑ3;',
            bot: 'Το Κέντρο Καθοδήγησης Καρκινοπαθών «Κάπα3» παρέχει πλοήγηση σε δικαιώματα και παροχές, διοικητική υποστήριξη και ψυχοκοινωνική καθοδήγηση. Επικοινωνία: 210 52 21 424.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Classify query · υπηρεσίες φορέα' },
                  { icon: 'dot', text: 'Entity match → ΚΑΠΑ3 / Μυρτώ', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'nodes', text: 'Load approved knowledge base' },
                  { icon: 'branch', text: 'Cross-check kapa3.gr sources' },
                ],
              },
              {
                stepId: '03',
                lines: [
                  { icon: 'branch', text: 'Draft answer · προσβασιμότητα ON' },
                  { icon: 'dot', text: 'Ready to respond', accent: true },
                ],
              },
            ],
          },
          {
            user: 'Μπορώ να κλείσω ραντεβού;',
            bot: 'Ναι — καλέστε 210 52 21 424 ή στείλτε email. Η ομάδα σας καθοδηγεί βήμα-βήμα στα δικαιώματα και τις παροχές.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Intent · ραντεβού / επικοινωνία' },
                  { icon: 'dot', text: 'Entity lock → ΚΑΠΑ3', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'branch', text: 'Return contact workflow' },
                  { icon: 'dot', text: 'Ready to respond', accent: true },
                ],
              },
            ],
          },
        ],
      },
      {
        turns: [
          {
            user: 'Τι είναι η BPAN;',
            bot: 'Η BPAN είναι σπάνια νευροεκφυλιστική νόσος από μετάλλαξη WDR45. Ο Σύλλογος «Ήρωες της BPAN» στηρίζει παιδιά και οικογένειες στην Ελλάδα.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Detect medical terminology · BPAN' },
                  { icon: 'dot', text: 'Risk tier → elevated · safety layer', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'nodes', text: 'Fetch cited documents [4, 7, 12]' },
                  { icon: 'branch', text: 'Attach mandatory disclaimer' },
                ],
              },
              {
                stepId: '03',
                lines: [
                  { icon: 'branch', text: 'Generate response · sources linked' },
                  { icon: 'dot', text: 'Human escalation flag · standby', accent: true },
                ],
              },
            ],
          },
          {
            user: 'Υπάρχουν θεραπείες;',
            bot: 'Η έρευνα εξελίσσεται — υπάρχουν κλινικές δοκιμές και συμπτωματική υποστήριξη. Ο σύλλογος BPAN μπορεί να σας συνδέσει με ειδικούς.',
            warning: 'Είμαι βοηθός ΤΝ. Οι πληροφορίες δεν υποκαθιστούν ιατρικές συμβουλές.',
            sources: 'Πηγές: ΣΥΛΛΟΓΟΣ-BPAN · Wilson-Consensus-Guideline',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Medical follow-up · θεραπείες' },
                  { icon: 'dot', text: 'Safety layer · disclaimer required', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'branch', text: 'Attach sources · clinical trials' },
                  { icon: 'dot', text: 'Escalation flag · standby', accent: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  chatbotsPage: {
    sloganWords: [
      { text: 'Ο', italic: false, bold: false },
      { text: 'DialogosAI', italic: true, bold: false },
      { text: 'δεν', italic: false, bold: false },
      { text: 'μπορεί', italic: false, bold: false },
      { text: 'παρά', italic: false, bold: false },
      { text: 'να', italic: false, bold: false },
      { text: 'μην', italic: false, bold: false },
      { text: 'έχει', italic: false, bold: false },
      { text: 'μέτρο', italic: false, bold: true },
      { text: 'τον', italic: false, bold: true },
      { text: 'άνθρωπο', italic: false, bold: true },
      { text: 'στη', italic: false, bold: false },
      { text: 'συνθήκη', italic: false, bold: false },
      { text: 'αλληλεπίδρασης', italic: false, bold: false },
      { text: 'ανθρώπου', italic: false, bold: false },
      { text: 'με', italic: false, bold: false },
      { text: 'την', italic: false, bold: false },
      { text: 'Τεχνητή', italic: false, bold: false },
      { text: 'Νοημοσύνη.', italic: false, bold: false },
    ],
    bookDemo: 'Κλείστε ένα Demo',
    seeLive: 'Δείτε το Live',
    stats: [
      'Ακρίβεια Απαντήσεων (RAG Validation)',
      'Συμμόρφωση με το EU AI Act',
      'Εβδομάδες Custom Pilot',
    ],
    narrativeHtml:
      'Τα παραδοσιακά μοντέλα AI λειτουργούν αποκομμένα· απλώς προβλέπουν λέξεις. Το <em class="brand-dialogos">DialogosAI</em> είναι σχεδιασμένο ως ένα αυτόνομο <strong>Ψηφιακό Σύστημα Πλοήγησης Γλώσσας</strong>. Αντλώντας έμπνευση από τις ελληνικές ρίζες της επικοινωνίας και της ερμηνείας, λειτουργεί ως απόλυτος αγγελιοφόρος ανάμεσα στα σύνθετα δεδομένα ενός οργανισμού και τις <strong>πραγματικές ανθρώπινες ανάγκες</strong>. Συνδυάζει την ευφυΐα των γλωσσικών μοντέλων νέας γενιάς με την αυστηρή ακαδημαϊκή εγκυρότητα, καθοδηγώντας τον χρήστη με <strong>απόλυτη σαφήνεια, ενσυναίσθηση και δομική ακρίβεια</strong>.',
    pillarsHeader: 'Οι Τρεις Αρχιτεκτονικοί Πυλώνες',
    pillarsSub: 'Το τεχνολογικό υπόβαθρο που καθιστά τον ψηφιακό μας πλοηγό ηγέτη στην αγορά.',
    pillars: [
      {
        num: '01',
        title: 'Fluency & Context (Ουσιαστικός Διάλογος)',
        body: 'Βασισμένο στην <strong>υπολογιστική γλωσσολογία</strong>, το <em class="brand-dialogos">DialogosAI</em> προσαρμόζεται στο ύφος του οργανισμού σας, αντιλαμβάνεται <strong>τοπικές διαλέκτους</strong> και καθοδηγεί τον χρήστη προληπτικά.',
      },
      {
        num: '02',
        title: 'Ethics & Compliance (Υπεύθυνος Διάλογος)',
        body: 'Σχεδιασμένος με απόλυτη συμμόρφωση στο <strong>EU AI Act</strong>. Εξασφαλίζει καθολική προσβασιμότητα για <strong>ΑμεΑ</strong>, φίλτρα ασφαλείας για κρίσιμες καταστάσεις και ελαχιστοποίηση ψευδαισθήσεων.',
      },
      {
        num: '03',
        title: 'Sustainable AI (Πράσινος Διάλογος)',
        body: 'Η έξυπνη RAG αρχιτεκτονική μας <strong>μειώνει δραστικά την κατανάλωση ενέργειας</strong> και το υπολογιστικό κόστος ανά ερώτημα, κάνοντας την τεχνολογία βιώσιμη.',
      },
    ],
    charsHeader: '5 Μοναδικά Χαρακτηριστικά',
    charsSubHtml:
      'Γιατί το <em class="brand-dialogos">DialogosAI</em> αποτελεί το πιο εξελιγμένο σύστημα διαλόγου στην ελληνική αγορά.',
    characteristics: [
      {
        num: '01',
        title: 'Φυσική Γλώσσα & Τοπικές Διάλεκτοι',
        body: 'Το μοναδικό σύστημα στην Ελλάδα που αντιλαμβάνεται τη γλώσσα μας ακριβώς όπως τη μιλάμε, μαζί με τοπικές ιδιαιτερότητες και συναισθηματικές αποχρώσεις.',
      },
      {
        num: '02',
        title: 'Απόλυτη Κανονιστική Συμμόρφωση',
        body: 'Σχεδιασμένο εξαρχής με βάση τους αυστηρότερους ευρωπαϊκούς κανονισμούς (EU AI Act) για την ασφάλεια και την προστασία των προσωπικών δεδομένων.',
      },
      {
        num: '03',
        title: 'Καθολική Σχεδίαση για ΑμεΑ',
        body: 'Πλήρης προσβασιμότητα για άτομα με οπτικές, ακουστικές ή κινητικές δυσκολίες, εξασφαλίζοντας ίση πρόσβαση στην πληροφορία.',
      },
      {
        num: '04',
        title: 'Eco-Friendly Optimized RAG',
        body: 'Μειώνουμε δραστικά την κατανάλωση ενέργειας και το αποτύπωμα άνθρακα ανά ερώτημα με την έξυπνη υβριδική μας αρχιτεκτονική.',
      },
      {
        num: '05',
        title: 'Προληπτικό Ψηφιακό Σύστημα Πλοήγησης',
        body: 'Δεν απαντά απλώς σε ερωτήσεις· προβλέπει τις ανάγκες του χρήστη και τον καθοδηγεί με ακρίβεια στα επόμενα βήματα.',
      },
    ],
    dialogueHeaderHtml:
      'Κάθε οργανισμός επικοινωνεί.<br />Το <em class="brand-dialogos">DialogosAI</em> εξασφαλίζει ότι αυτή η επικοινωνία είναι αξιόπιστη.',
    dialogueSub:
      'Ένα κανάλι ασφαλούς, υπεύθυνου και καθοδηγητικού διαλόγου ανάμεσα στον οργανισμό σας και τους ανθρώπους που εξυπηρετεί. Σχεδιασμένο ακριβώς όπως εσείς το οραματίζεστε.',
    flowOrg: 'Ο Οργανισμός σας',
    flowPeople: 'Οι Άνθρωποί σας',
    sectors: [
      {
        num: '01',
        title: 'Υγεία & Κοινωνική Μέριμνα',
        badge: 'proven',
        badgeLabel: 'ΑΠΟΔΕΔΕΙΓΜΕΝΟ',
        desc: 'Υποστήριξη ασθενών και καθοδήγηση σε ευαίσθητα ιατρικά θέματα. Ήδη σε λειτουργία σε οργανισμούς υγείας με απόλυτη ενσυναίσθηση και εχεμύθεια.',
      },
      {
        num: '02',
        title: 'Δημόσιος Τομέας & Δήμοι',
        badge: 'proven',
        badgeLabel: 'ΑΠΟΔΕΔΕΙΓΜΕΝΟ',
        desc: 'Καθοδήγηση πολιτών, αυτόματη εύρεση εγγράφων και διαδικασιών. Δοκιμασμένο σε πραγματικές συνθήκες δημόσιας διοίκησης.',
      },
      {
        num: '03',
        title: 'Επιχειρήσεις & Οργανισμοί',
        badge: 'ready',
        badgeLabel: 'ΕΤΟΙΜΟ',
        desc: 'Αυθεντικός ψηφιακός διάλογος που μετατρέπει επισκέπτες σε υποστηρικτές, με 24/7 εξυπηρέτηση και μείωση κόστους λειτουργίας.',
      },
      {
        num: '04',
        title: 'Εκπαίδευση & Κατάρτιση',
        badge: 'ready',
        badgeLabel: 'ΕΤΟΙΜΟ',
        desc: 'Εξατομικευμένη υποστήριξη εκπαιδευομένων, γονέων και καθηγητών με πρόσβαση σε εγκεκριμένο υλικό.',
      },
    ],
    dialogueClosingHtml:
      'Αν το <em class="brand-dialogos">DialogosAI</em> εξασφαλίζει αξιόπιστο διάλογο στους πιο ευαίσθητους τομείς, φανταστείτε τι μπορεί να κάνει για τον δικό σας οργανισμό. Σχεδιάστε τον διάλογο που θέλετε — ασφαλή, υπεύθυνο, καθοδηγητικό — ακριβώς όπως τον οραματίζεστε.',
    dialogueCtaHtml:
      'Σχεδιάστε τον δικό σας <em class="brand-dialogos">DialogosAI</em> →',
    finalTitle: 'Αποκτήστε το κορυφαίο ψηφιακό σύστημα πλοήγησης στην Ελλάδα.',
    finalBodyHtml:
      'Μην συμβιβάζεστε με απλά chatbots που μπερδεύουν τους χρήστες. Κάντε τη διαφορά με το <em class="brand-dialogos">DialogosAI</em> και κερδίστε την εμπιστοσύνη των χρηστών σας από την πρώτη μέρα.',
    finalCta: 'Ξεκινήστε Σήμερα — Book Demo',
  },

  servicesPage: {
    eyebrow: 'SimasiaAI',
    heroTitleHtml: 'Φέρνουμε την Τεχνητή Νοημοσύνη<br />στην πράξη.',
    heroSub:
      'Δύο εξειδικευμένες υπηρεσίες. Μία αποστολή: να σας βοηθήσουμε να αξιοποιήσετε πραγματικά την AI.',
    bookAppointment: 'Κλείστε Ραντεβού',
    seeServices: 'Δείτε τις υπηρεσίες',
    offers: [
      {
        num: '01',
        audience: 'Για Επιχειρήσεις & Οργανισμούς',
        title: 'AI Συμβουλευτική',
        body: 'Σας δείχνουμε πώς η Τεχνητή Νοημοσύνη μπορεί να ενσωματωθεί στις καθημερινές λειτουργίες του οργανισμού σας.',
        link: 'Μάθετε περισσότερα ↓',
      },
      {
        num: '02',
        audience: 'Για Εκπαίδευση',
        title: 'AI Εκπαίδευση',
        body: 'Οργανώνουμε εκπαιδευτικά σεμινάρια, ομιλίες και εργαστήρια για σχολεία, ΙΕΚ και πανεπιστήμια.',
        link: 'Μάθετε περισσότερα ↓',
      },
    ],
    consultingTitle: 'AI Συμβουλευτική',
    consultingSub:
      'Σας δείχνουμε πώς η Τεχνητή Νοημοσύνη αλλάζει τον τρόπο που δουλεύετε — με απλά λόγια, χωρίς ορολογία, με πρακτικά αποτελέσματα.',
    howItWorks: 'Πώς λειτουργεί',
    consultingSteps: [
      {
        num: '01',
        title: 'Κλείστε ραντεβού',
        body: 'Επιλέξτε ημερομηνία & μέθοδο (δια ζώσης ή online). Απαντάμε εντός 24 ωρών.',
      },
      {
        num: '02',
        title: 'Αναλύουμε την επιχείρησή σας',
        body: 'Πριν έρθουμε, μαθαίνουμε τη δουλειά σας για να προσαρμόσουμε ακριβώς τι θα δείξουμε.',
      },
      {
        num: '03',
        title: 'Το σεμινάριο / συμβουλευτική',
        body: 'Πρακτική, hands-on συνεδρία. Δείχνουμε εργαλεία, λύσεις, και φτιάχνουμε μαζί ένα roadmap.',
      },
      {
        num: '04',
        title: 'Παρακολούθηση & Υποστήριξη',
        body: 'Δεν σας αφήνουμε μόνους. Follow-up session και email support για οποιαδήποτε ερώτηση.',
      },
    ],
    packagesTitle: 'Πακέτα Συμβουλευτικής',
    packagesSub:
      'Διαλέξτε αυτό που ταιριάζει στην επιχείρησή σας. Όλα περιλαμβάνουν προσωπική επαφή.',
    packages: [
      {
        id: 'starter',
        name: 'Starter',
        price: '490€',
        tag: 'Τιμή γνωριμίας',
        duration: '2 ώρες',
        highlight: false,
        features: [
          '2ωρο σεμινάριο εισαγωγής στην ΤΝ',
          'Ανάλυση τρεχουσών εργαλείων ΤΝ',
          'Live demo εργαλείων',
          'Στον χώρο σας ή online',
          'Παρουσίαση PDF με συμπεράσματα',
        ],
        cta: 'Κλείστε Ραντεβού',
      },
      {
        id: 'business',
        name: 'Business',
        price: '990€',
        tag: 'Πιο δημοφιλές',
        duration: '4 ώρες',
        highlight: true,
        features: [
          'Όλα του Starter',
          'Ανάλυση workflows επιχείρησης',
          'Πρότυπα ενσωμάτωσης ΤΝ',
          'Custom AI roadmap για την εταιρεία σας',
          "Follow-up συνεδρία (60')",
          'Πρόσβαση σε resources & templates',
        ],
        cta: 'Κλείστε Ραντεβού',
      },
      {
        id: 'team',
        name: 'Team',
        price: '1.790€',
        tag: 'Για ομάδες',
        duration: '6 ώρες',
        highlight: false,
        features: [
          'Όλα του Business',
          'Εκπαίδευση ομάδας (έως 15 άτομα)',
          'Hands-on workshops με εργαλεία',
          'Δύο follow-up συνεδρίες',
          'Priority email support (1 μήνας)',
        ],
        cta: 'Κλείστε Ραντεβού',
      },
      {
        id: 'growth',
        name: 'Growth',
        price: '2.990€',
        tag: 'Ολοκληρωμένο',
        duration: '3 μήνες',
        highlight: false,
        features: [
          'Όλα του Team',
          'Μηνιαία στρατηγική ΤΝ session',
          'Αξιολόγηση αποτελεσμάτων',
          'Custom AI policy & governance',
          'Dedicated consultant',
          'Unlimited email support',
        ],
        cta: 'Κλείστε Ραντεβού',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'Κατόπιν συνεννόησης',
        tag: 'Για μεγάλους οργανισμούς',
        duration: 'Προσαρμοσμένο',
        highlight: false,
        features: [
          'Πλήρης AI transformation',
          'Εγκατάσταση <em class="brand-dialogos">DialogosAI</em>',
          'Εκπαίδευση όλου του προσωπικού',
          'Συνεχής στρατηγική υποστήριξη',
          'SLA & dedicated support team',
          'Αξιολόγηση EU AI Act compliance',
        ],
        cta: 'Επικοινωνήστε μαζί μας',
      },
    ],
    educationTitle: 'AI Εκπαίδευση',
    educationSub:
      'Σεμινάρια, ομιλίες και εργαστήρια για την Τεχνητή Νοημοσύνη στον χώρο της εκπαίδευσης.',
    eduTargetTitle: 'Σε ποιους απευθυνόμαστε',
    eduTargetGroups: [
      {
        num: '01',
        title: 'Ιδιωτικά & Δημόσια Σχολεία',
        body: 'Εισαγωγή της Τεχνητής Νοημοσύνης στην τάξη με ασφάλεια, εκπαίδευση καθηγητών και διαδραστικά εργαστήρια για μαθητές.',
      },
      {
        num: '02',
        title: 'Φροντιστήρια & Κέντρα Μελέτης',
        body: 'Αναβάθμιση της εκπαιδευτικής διαδικασίας, αυτόματη δημιουργία θεμάτων και εξατομικευμένη υποστήριξη με AI.',
      },
      {
        num: '03',
        title: 'Ιδιωτικά Πανεπιστήμια & ΙΕΚ',
        body: 'Σχεδιασμός εξειδικευμένων εκπαιδευτικών προγραμμάτων AI, ενσωμάτωση σε υπάρχοντα curricula και εργαστηριακές ασκήσεις.',
      },
      {
        num: '04',
        title: 'Εκπαιδευτικοί όλων των βαθμίδων',
        body: 'Σεμινάρια για τη σωστή χρήση των LLMs, τη δημιουργία έξυπνων πλάνων μαθήματος και τη μείωση του γραφειοκρατικού φόρτου.',
      },
    ],
    workshopsTitle: 'Σεμινάρια & Εργαστήρια',
    workshopsSub: 'Επιλέξτε το πρόγραμμα που ταιριάζει στις δικές σας ανάγκες.',
    workshops: [
      {
        title: 'Εισαγωγικό Σεμινάριο (2 ώρες)',
        desc: 'Κατανόηση των βασικών αρχών της Τεχνητής Νοημοσύνης, των δυνατοτήτων και των περιορισμών της στην εκπαίδευση.',
      },
      {
        title: 'Hands-on Εργαστήριο (4 ώρες)',
        desc: 'Πρακτική εξάσκηση με εργαλεία AI για παραγωγή υλικού, διόρθωση γραπτών και εξατομικευμένη μάθηση.',
      },
    ],
    workshopCta: 'Κράτηση Θέσης →',
    empathyTitle: 'Η τεχνολογία στην υπηρεσία της γνώσης, όχι της αντικατάστασης.',
    empathyBody:
      'Πιστεύουμε ότι η Τεχνητή Νοημοσύνη πρέπει να ενδυναμώνει τον δάσκαλο και τον καθηγητή, προσφέροντας περισσότερο χρόνο για την πραγματική, ανθρώπινη επαφή με τον μαθητή.',
    finalTitle: 'Ας ξεκινήσουμε μαζί.',
    finalBody:
      'Στείλτε μας email ή κλείστε ραντεβού και σε λιγότερο από 24 ώρες θα σας προτείνουμε την καλύτερη λύση.',
    finalCta: 'Κλείστε Ραντεβού',
  },

  solutionsPage: {
    heroTitle: 'Λύσεις με Σημασία',
    heroSub:
      'Για Επιχειρήσεις, Φορείς, Οργανισμούς. Συνεργαζόμαστε για λύσεις που ενισχύουν την κοινωνική συνοχή και υποστηρίζουν καθαρή, προσβάσιμη επικοινωνία.',
    outcomesTitle: 'Τι πετυχαίνουμε μαζί',
    outcomes: [
      'Σαφείς απαντήσεις και λιγότερη χρονοτριβή σε συχνές ερωτήσεις/σύνθετες διαδικασίες.',
      'Διαφάνεια γνώσης με τεκμηρίωση από εγκεκριμένες πηγές.',
      'Προσβασιμότητα & συμπερίληψη στην ψηφιακή επικοινωνία.',
      'Ενδυνάμωση κοινοτήτων (υγεία, εκπαίδευση, κοινωνικές υπηρεσίες, πολιτισμός κ.ά.) με έγκυρη, ανθρώπινη καθοδήγηση σε συνεργασία με ειδικούς/ες.',
      'Ομαλή ενσωμάτωση στις υπάρχουσες ροές και συστήματα.',
    ],
    processTitle: 'Πώς συνεργαζόμαστε',
    processSteps: [
      {
        title: 'Διερεύνηση',
        desc: 'Χαρτογραφούμε ανάγκες ανθρώπων/ομάδων, περιεχόμενο και ροές πληροφορίας.',
      },
      {
        title: 'Πιλοτική εφαρμογή',
        desc: 'Δοκιμή λύσεων σε πραγματικά σενάρια, μετρήσεις και ανατροφοδότηση.',
      },
      {
        title: 'Παραγωγική ένταξη & Ενσωματώσεις',
        desc: 'Προσαρμογή στο περιβάλλον σας, εκπαίδευση ομάδων, SSO/CRM/Helpdesk.',
      },
      {
        title: 'Υποστήριξη & Εξέλιξη',
        desc: 'Συνεχής βελτίωση και επεκτασιμότητα.',
      },
    ],
    focusText:
      'Σήμερα εστιάζουμε σε συνομιλιακές λύσεις (chatbots). Η αρχιτεκτονική μας επιτρέπει επεκτάσεις σε επιπλέον εφαρμογές AI, ανάλογα με την ανάγκη.',
    capabilitiesTitle: 'Τι μπορούμε να αναπτύξουμε για εσάς (ενδεικτικά)',
    capabilities: [
      'Υποστηρικτικά chatbots 24/7 για ενημέρωση, υποδοχή αιτημάτων, καθοδήγηση διαδικασιών.',
      'Εξειδικευμένα assistants (π.χ., πολιτικές/κανονισμοί οργανισμού, onboarding προσωπικού, knowledge bases).',
      'Εκπαιδευτικά εργαλεία AI (αυτόματη δημιουργία/διόρθωση αξιολογήσεων, εξατομίκευση δυσκολίας, υποστήριξη εκπαιδευτικών).',
      'Πολυγλωσσική διαμεσολάβηση & προσβασιμότητα (π.χ., απλούστευση κειμένου, μετατροπή μορφών).',
    ],
    whyTitle: 'Γιατί να επιλέξετε τα chatbots της SimasiaAI',
    whyItems: [
      {
        title: 'Προσβασιμότητα από σχεδιασμό',
        desc: 'Εναλλακτικοί τρόποι εισόδου/εξόδου (κείμενο/ήχος), WCAG-oriented επιλογές.',
      },
      {
        title: 'Πολυγλωσσία',
        desc: 'Υποστήριξη πολλών ευρωπαϊκών και παγκόσμιων γλωσσών (ενδεικτικά: κινεζικά—μανδαρινικά/καντονέζικα, ιαπωνικά, κορεατικά, αραβικά, χίντι, μπενγκάλι κ.ά.) και τοπικές ελληνικές ποικιλίες (π.χ. κυπριακά, ποντιακά) όπου είναι εφικτό ή κατόπιν στοχευμένης εκπαίδευσης.',
      },
      {
        title: 'Μείωση προκαταλήψεων',
        desc: 'Ροές αξιολόγησης και πολιτικές ισότητας/συμπερίληψης ενσωματωμένες στο design.',
      },
      {
        title: 'Εκπαίδευση σε δικό σας περιεχόμενο',
        desc: 'Τεκμηριωμένες πηγές, εγχειρίδια, guidelines για ειδικές καταστάσεις.',
      },
      {
        title: 'Συνέπεια & ασφάλεια',
        desc: 'Απαντήσεις βασισμένες σε εγκεκριμένο περιεχόμενο με ελεγχόμενα αποδεικτικά.',
      },
      {
        title: 'Κλιμάκωση και ειδοποιήσεις',
        desc: 'Δυνατότητα αποστολής ειδοποίησης (τηλεφωνικής/γραπτής) σε οριζόμενα πρόσωπα/υπηρεσίες όταν ανιχνεύονται ροές που το απαιτούν—μόνο κατόπιν ρητής συμφωνίας και πολιτικής κλιμάκωσης.',
      },
    ],
  },
};

export const pageI18nEn = {
  liveDemo: {
    subtitle: 'Live Demonstration',
    thinking: 'Thinking...',
    sources: 'Sources',
    placeholder: 'Type a message...',
    internalsLabel: 'Internal process',
    a11y: {
      back: 'Back',
      menu: 'Menu',
      expand: 'Expand',
      send: 'Send',
      input: 'Message',
    },
    conversations: [
      {
        turns: [
          {
            user: 'How can ΠΟΑμΣΚΠ help me?',
            bot: 'ΠΟΑμΣΚΠ conducts nationwide research on the needs of people with MS and supports the community with information and assistance. Would you like something more specific?',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Parse user intent · organization / support' },
                  { icon: 'dot', text: 'Match domain → health · MS', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'nodes', text: 'Retrieve verified sources (poamskp.gr)' },
                  { icon: 'branch', text: 'RAG context assembled · 3 chunks' },
                ],
              },
              {
                stepId: '03',
                lines: [
                  { icon: 'branch', text: 'Generate response · Greek · cited' },
                  { icon: 'dot', text: 'Compliance check passed', accent: true },
                ],
              },
            ],
          },
          {
            user: 'Yes — what awareness actions does it run?',
            bot: 'It organizes conferences, webinars, and educational material for families and professionals. You can view the calendar at poamskp.gr.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Follow-up intent · awareness / actions' },
                  { icon: 'dot', text: 'Context carry-over · POAMSKP', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'branch', text: 'Generate response · events calendar' },
                  { icon: 'dot', text: 'Ready to respond', accent: true },
                ],
              },
            ],
          },
        ],
      },
      {
        turns: [
          {
            user: 'What services does ΚΑΠΑ3 offer?',
            bot: 'The Cancer Patient Guidance Center “Κάπα3” provides navigation through rights and benefits, administrative support, and psychosocial guidance. Contact: 210 52 21 424.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Classify query · organization services' },
                  { icon: 'dot', text: 'Entity match → ΚΑΠΑ3 / Μυρτώ', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'nodes', text: 'Load approved knowledge base' },
                  { icon: 'branch', text: 'Cross-check kapa3.gr sources' },
                ],
              },
              {
                stepId: '03',
                lines: [
                  { icon: 'branch', text: 'Draft answer · accessibility ON' },
                  { icon: 'dot', text: 'Ready to respond', accent: true },
                ],
              },
            ],
          },
          {
            user: 'Can I book an appointment?',
            bot: 'Yes — call 210 52 21 424 or send an email. The team guides you step by step through rights and benefits.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Intent · appointment / contact' },
                  { icon: 'dot', text: 'Entity lock → ΚΑΠΑ3', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'branch', text: 'Return contact workflow' },
                  { icon: 'dot', text: 'Ready to respond', accent: true },
                ],
              },
            ],
          },
        ],
      },
      {
        turns: [
          {
            user: 'What is BPAN?',
            bot: 'BPAN is a rare neurodegenerative disease caused by a WDR45 mutation. The “Heroes of BPAN” association supports children and families in Greece.',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Detect medical terminology · BPAN' },
                  { icon: 'dot', text: 'Risk tier → elevated · safety layer', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'nodes', text: 'Fetch cited documents [4, 7, 12]' },
                  { icon: 'branch', text: 'Attach mandatory disclaimer' },
                ],
              },
              {
                stepId: '03',
                lines: [
                  { icon: 'branch', text: 'Generate response · sources linked' },
                  { icon: 'dot', text: 'Human escalation flag · standby', accent: true },
                ],
              },
            ],
          },
          {
            user: 'Are there treatments?',
            bot: 'Research is ongoing — there are clinical trials and symptomatic support. The BPAN association can connect you with specialists.',
            warning: 'I am an AI assistant. This information does not replace medical advice.',
            sources: 'Sources: ΣΥΛΛΟΓΟΣ-BPAN · Wilson-Consensus-Guideline',
            internals: [
              {
                stepId: '01',
                lines: [
                  { icon: 'nodes', text: 'Medical follow-up · treatments' },
                  { icon: 'dot', text: 'Safety layer · disclaimer required', accent: true },
                ],
              },
              {
                stepId: '02',
                lines: [
                  { icon: 'branch', text: 'Attach sources · clinical trials' },
                  { icon: 'dot', text: 'Escalation flag · standby', accent: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  chatbotsPage: {
    sloganWords: [
      { text: 'DialogosAI', italic: true, bold: false },
      { text: 'cannot', italic: false, bold: false },
      { text: 'but', italic: false, bold: false },
      { text: 'take', italic: false, bold: false },
      { text: 'the', italic: false, bold: true },
      { text: 'human', italic: false, bold: true },
      { text: 'as', italic: false, bold: true },
      { text: 'its', italic: false, bold: true },
      { text: 'measure', italic: false, bold: true },
      { text: 'in', italic: false, bold: false },
      { text: 'the', italic: false, bold: false },
      { text: 'condition', italic: false, bold: false },
      { text: 'of', italic: false, bold: false },
      { text: 'human–AI', italic: false, bold: false },
      { text: 'interaction.', italic: false, bold: false },
    ],
    bookDemo: 'Book a Demo',
    seeLive: 'See it Live',
    stats: [
      'Answer Accuracy (RAG Validation)',
      'EU AI Act Compliance',
      'Weeks to Custom Pilot',
    ],
    narrativeHtml:
      'Traditional AI models operate in isolation; they merely predict words. <em class="brand-dialogos">DialogosAI</em> is designed as an autonomous <strong>Digital Language Navigator</strong>. Drawing inspiration from the Greek roots of communication and interpretation, it acts as the definitive messenger between an organization’s complex data and <strong>real human needs</strong>. It combines the intelligence of next-generation language models with rigorous academic validity, guiding the user with <strong>absolute clarity, empathy, and structural precision</strong>.',
    pillarsHeader: 'The Three Architectural Pillars',
    pillarsSub: 'The technology foundation that makes our digital navigator a market leader.',
    pillars: [
      {
        num: '01',
        title: 'Fluency & Context (Meaningful Dialogue)',
        body: 'Grounded in <strong>computational linguistics</strong>, <em class="brand-dialogos">DialogosAI</em> adapts to your organization’s tone, understands <strong>local dialects</strong>, and guides the user proactively.',
      },
      {
        num: '02',
        title: 'Ethics & Compliance (Responsible Dialogue)',
        body: 'Designed for full compliance with the <strong>EU AI Act</strong>. It ensures universal accessibility for <strong>people with disabilities</strong>, safety filters for critical situations, and minimized hallucinations.',
      },
      {
        num: '03',
        title: 'Sustainable AI (Green Dialogue)',
        body: 'Our intelligent RAG architecture <strong>drastically reduces energy consumption</strong> and compute cost per query, making the technology sustainable.',
      },
    ],
    charsHeader: '5 Distinctive Characteristics',
    charsSubHtml:
      'Why <em class="brand-dialogos">DialogosAI</em> is the most advanced dialogue system in the Greek market.',
    characteristics: [
      {
        num: '01',
        title: 'Natural Language & Local Dialects',
        body: 'The only system in Greece that understands our language exactly as we speak it — including local particularities and emotional nuance.',
      },
      {
        num: '02',
        title: 'Full Regulatory Compliance',
        body: 'Designed from the ground up to the strictest European regulations (EU AI Act) for safety and protection of personal data.',
      },
      {
        num: '03',
        title: 'Universal Design for Accessibility',
        body: 'Full accessibility for people with visual, hearing, or mobility challenges, ensuring equal access to information.',
      },
      {
        num: '04',
        title: 'Eco-Friendly Optimized RAG',
        body: 'We drastically reduce energy consumption and carbon footprint per query through our intelligent hybrid architecture.',
      },
      {
        num: '05',
        title: 'Proactive Digital Navigation System',
        body: 'It does not merely answer questions; it anticipates user needs and guides them precisely through the next steps.',
      },
    ],
    dialogueHeaderHtml:
      'Every organization communicates.<br /><em class="brand-dialogos">DialogosAI</em> ensures that communication is trustworthy.',
    dialogueSub:
      'A channel for safe, responsible, and guiding dialogue between your organization and the people it serves. Designed exactly as you envision it.',
    flowOrg: 'Your Organization',
    flowPeople: 'Your People',
    sectors: [
      {
        num: '01',
        title: 'Health & Social Care',
        badge: 'proven',
        badgeLabel: 'PROVEN',
        desc: 'Patient support and guidance on sensitive medical topics. Already operating in health organizations with absolute empathy and confidentiality.',
      },
      {
        num: '02',
        title: 'Public Sector & Municipalities',
        badge: 'proven',
        badgeLabel: 'PROVEN',
        desc: 'Citizen guidance and automatic discovery of documents and procedures. Proven in real public-administration conditions.',
      },
      {
        num: '03',
        title: 'Businesses & Organizations',
        badge: 'ready',
        badgeLabel: 'READY',
        desc: 'Authentic digital dialogue that turns visitors into advocates — with 24/7 service and lower operating costs.',
      },
      {
        num: '04',
        title: 'Education & Training',
        badge: 'ready',
        badgeLabel: 'READY',
        desc: 'Personalized support for learners, parents, and teachers with access to approved material.',
      },
    ],
    dialogueClosingHtml:
      'If <em class="brand-dialogos">DialogosAI</em> delivers trustworthy dialogue in the most sensitive domains, imagine what it can do for your own organization. Design the dialogue you want — safe, responsible, guiding — exactly as you envision it.',
    dialogueCtaHtml:
      'Design your own <em class="brand-dialogos">DialogosAI</em> →',
    finalTitle: 'Get Greece’s leading digital navigation system.',
    finalBodyHtml:
      'Don’t settle for simple chatbots that confuse users. Make the difference with <em class="brand-dialogos">DialogosAI</em> and earn your users’ trust from day one.',
    finalCta: 'Start Today — Book Demo',
  },

  servicesPage: {
    eyebrow: 'SimasiaAI',
    heroTitleHtml: 'We bring Artificial Intelligence<br />into practice.',
    heroSub:
      'Two specialized services. One mission: to help you truly put AI to work.',
    bookAppointment: 'Book an Appointment',
    seeServices: 'See the services',
    offers: [
      {
        num: '01',
        audience: 'For Businesses & Organizations',
        title: 'AI Consulting',
        body: 'We show you how Artificial Intelligence can be embedded in your organization’s day-to-day operations.',
        link: 'Learn more ↓',
      },
      {
        num: '02',
        audience: 'For Education',
        title: 'AI Education',
        body: 'We organize educational seminars, talks, and workshops for schools, vocational institutes, and universities.',
        link: 'Learn more ↓',
      },
    ],
    consultingTitle: 'AI Consulting',
    consultingSub:
      'We show you how Artificial Intelligence changes the way you work — in plain language, without jargon, with practical results.',
    howItWorks: 'How it works',
    consultingSteps: [
      {
        num: '01',
        title: 'Book an appointment',
        body: 'Choose a date and format (in person or online). We respond within 24 hours.',
      },
      {
        num: '02',
        title: 'We analyze your business',
        body: 'Before we arrive, we learn your work so we can tailor exactly what we will show you.',
      },
      {
        num: '03',
        title: 'The seminar / consulting session',
        body: 'A practical, hands-on session. We demonstrate tools and solutions, and build a roadmap together.',
      },
      {
        num: '04',
        title: 'Follow-up & Support',
        body: 'We don’t leave you on your own. Follow-up session and email support for any question.',
      },
    ],
    packagesTitle: 'Consulting Packages',
    packagesSub:
      'Choose what fits your business. All packages include personal contact.',
    packages: [
      {
        id: 'starter',
        name: 'Starter',
        price: '490€',
        tag: 'Introductory price',
        duration: '2 hours',
        highlight: false,
        features: [
          '2-hour AI introduction seminar',
          'Analysis of current AI tools',
          'Live demo of tools',
          'On-site or online',
          'PDF presentation with takeaways',
        ],
        cta: 'Book an Appointment',
      },
      {
        id: 'business',
        name: 'Business',
        price: '990€',
        tag: 'Most popular',
        duration: '4 hours',
        highlight: true,
        features: [
          'Everything in Starter',
          'Business workflow analysis',
          'AI integration patterns',
          'Custom AI roadmap for your company',
          "Follow-up session (60')",
          'Access to resources & templates',
        ],
        cta: 'Book an Appointment',
      },
      {
        id: 'team',
        name: 'Team',
        price: '1.790€',
        tag: 'For teams',
        duration: '6 hours',
        highlight: false,
        features: [
          'Everything in Business',
          'Team training (up to 15 people)',
          'Hands-on workshops with tools',
          'Two follow-up sessions',
          'Priority email support (1 month)',
        ],
        cta: 'Book an Appointment',
      },
      {
        id: 'growth',
        name: 'Growth',
        price: '2.990€',
        tag: 'Comprehensive',
        duration: '3 months',
        highlight: false,
        features: [
          'Everything in Team',
          'Monthly AI strategy session',
          'Results evaluation',
          'Custom AI policy & governance',
          'Dedicated consultant',
          'Unlimited email support',
        ],
        cta: 'Book an Appointment',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'Upon request',
        tag: 'For large organizations',
        duration: 'Custom',
        highlight: false,
        features: [
          'Full AI transformation',
          'Installation of <em class="brand-dialogos">DialogosAI</em>',
          'Training for all staff',
          'Ongoing strategic support',
          'SLA & dedicated support team',
          'EU AI Act compliance assessment',
        ],
        cta: 'Contact us',
      },
    ],
    educationTitle: 'AI Education',
    educationSub:
      'Seminars, talks, and workshops on Artificial Intelligence in education.',
    eduTargetTitle: 'Who we serve',
    eduTargetGroups: [
      {
        num: '01',
        title: 'Private & Public Schools',
        body: 'Introducing Artificial Intelligence into the classroom safely — teacher training and interactive student workshops.',
      },
      {
        num: '02',
        title: 'Tutoring Centers & Study Centers',
        body: 'Upgrading the learning process, automatic creation of exercises, and personalized AI support.',
      },
      {
        num: '03',
        title: 'Private Universities & Vocational Institutes',
        body: 'Design of specialized AI education programs, integration into existing curricula, and laboratory exercises.',
      },
      {
        num: '04',
        title: 'Educators at every level',
        body: 'Seminars on proper use of LLMs, creation of smart lesson plans, and reducing bureaucratic load.',
      },
    ],
    workshopsTitle: 'Seminars & Workshops',
    workshopsSub: 'Choose the program that fits your needs.',
    workshops: [
      {
        title: 'Introductory Seminar (2 hours)',
        desc: 'Understanding the core principles of Artificial Intelligence — its capabilities and limits in education.',
      },
      {
        title: 'Hands-on Workshop (4 hours)',
        desc: 'Practical training with AI tools for material production, essay correction, and personalized learning.',
      },
    ],
    workshopCta: 'Reserve a Spot →',
    empathyTitle: 'Technology in service of knowledge — not replacement.',
    empathyBody:
      'We believe Artificial Intelligence should empower teachers and professors, giving them more time for real, human contact with the student.',
    finalTitle: 'Let’s get started together.',
    finalBody:
      'Send us an email or book an appointment — and in less than 24 hours we will propose the best solution.',
    finalCta: 'Book an Appointment',
  },

  solutionsPage: {
    heroTitle: 'Solutions with Meaning',
    heroSub:
      'For Businesses, Institutions, Organizations. We collaborate on solutions that strengthen social cohesion and support clear, accessible communication.',
    outcomesTitle: 'What we achieve together',
    outcomes: [
      'Clear answers and less time spent on frequent questions and complex processes.',
      'Knowledge transparency with documentation from approved sources.',
      'Accessibility & inclusion in digital communication.',
      'Empowering communities (health, education, social services, culture, and more) with accurate, human guidance in collaboration with specialists.',
      'Smooth integration into existing workflows and systems.',
    ],
    processTitle: 'How we work together',
    processSteps: [
      {
        title: 'Discovery',
        desc: 'We map the needs of people and teams, content, and information flows.',
      },
      {
        title: 'Pilot deployment',
        desc: 'Testing solutions in real scenarios, with metrics and feedback.',
      },
      {
        title: 'Production rollout & Integrations',
        desc: 'Adaptation to your environment, team training, SSO/CRM/Helpdesk.',
      },
      {
        title: 'Support & Evolution',
        desc: 'Continuous improvement and scalability.',
      },
    ],
    focusText:
      'Today we focus on conversational solutions (chatbots). Our architecture allows extensions into further AI applications, depending on need.',
    capabilitiesTitle: 'What we can build for you (indicative)',
    capabilities: [
      '24/7 support chatbots for information, request intake, and process guidance.',
      'Specialized assistants (e.g., organizational policies/regulations, staff onboarding, knowledge bases).',
      'AI education tools (automatic creation/correction of assessments, difficulty personalization, educator support).',
      'Multilingual mediation & accessibility (e.g., text simplification, format conversion).',
    ],
    whyTitle: 'Why choose SimasiaAI chatbots',
    whyItems: [
      {
        title: 'Accessibility by design',
        desc: 'Alternative input/output modes (text/audio), WCAG-oriented options.',
      },
      {
        title: 'Multilingualism',
        desc: 'Support for many European and global languages (indicatively: Chinese—Mandarin/Cantonese, Japanese, Korean, Arabic, Hindi, Bengali, and more) and local Greek varieties (e.g. Cypriot, Pontic) where feasible or following targeted training.',
      },
      {
        title: 'Bias reduction',
        desc: 'Evaluation flows and equality/inclusion policies embedded in the design.',
      },
      {
        title: 'Training on your own content',
        desc: 'Documented sources, manuals, and guidelines for special situations.',
      },
      {
        title: 'Consistency & safety',
        desc: 'Answers based on approved content with controlled citations.',
      },
      {
        title: 'Escalation and alerts',
        desc: 'Ability to send alerts (phone/written) to designated people/services when flows that require it are detected—only under explicit agreement and an escalation policy.',
      },
    ],
  },
};
