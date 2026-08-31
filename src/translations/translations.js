import { mergeExtraUi } from './extraUi';

const baseTranslations = {
  el: {
    // Common
    common: {
      learnMore: "Μάθετε περισσότερα",
      requestProposal: "Ζητήστε πρόταση συνεργασίας",
      requestAccess: "Ζητήστε πρόσβαση",
      scheduleDemoNow: "Προγραμματίστε ένα demo άμεσα",
      scheduleDemoToday: "Ζητήστε πρόταση συνεργασίας σήμερα",
      contactForAccess: "Επικοινωνήστε για πρόσβαση",
      bookDemo: "Κλείστε demo"
    },
    // Navigation
    nav: {
      home: "Αρχική",
      about: "Σχετικά με εμάς",
      chatbots: "SimasiaChatbots",
      collaborations: "Συνεργασίες",
      bookDemo: "Ας συνεργαστούμε"
    },
    hero: {
      badge: "★ Live deployment · Κέντρο Καθοδήγησης Καρκινοπαθών Κάπα3",
      line1a: "AI που αποδεικνύει",
      line1b: "ότι είναι σωστό.",
      line2: "Ελληνόφωνα AI chatbots για υγεία, νομικά, δημόσιο τομέα, τουρισμό και επιχειρήσεις. Κάθε απάντηση συνοδεύεται από την πηγή της.",
      talkToTeam: "Δείτε live demo",
      seeApplications: "Πώς δουλεύει"
    },
    // Applications Page
    applications: {
      title: "SimasiaChatbots",
      subtitle: "Ψηφιακοί Πλοηγοί με Τεχνητή Νοημοσύνη",
      requestProposal: "Ζητήστε πρόταση συνεργασίας"
    },
    // Book Demo Page
    bookDemo: {
      title: "Κλείστε ένα demo",
      description: "Φέρτε 3 πραγματικές ερωτήσεις από τους χρήστες σας. 30 λεπτά demo call — θα τις απαντήσει live το chatbot μας με cited sources. Αν σας πείσει, ξεκινάμε pilot στο δικό σας domain σε 4 εβδομάδες."
    },
    // What We Offer — now SimasiaChatbots focused
    whatWeOffer: {
      title: "SimasiaChatbots",
      subtitle: "Ψηφιακοί Πλοηγοί — Δεν λέμε «πιθανόν είναι σωστό». Εγγυόμαστε μέσω κώδικα.",
      seeAll: "Δείτε αναλυτικά τα SimasiaChatbots",
      cards: [
        { name: "SimasiaChatbots", desc: "Ψηφιακοί πλοηγοί με νομική θωράκιση, φυσική ελληνική γλώσσα και αποδεικτικά σε κάθε απάντηση.", link: "/applications/simasia-chatbots" }
      ]
    },
    // Chatbot Showcase — 3 core promises
    chatbotShowcase: {
      title: "Τρεις υποσχέσεις. Καμία πιθανότητα.",
      subtitle: "Δεν λέμε «πιθανόν είναι σωστό» — εγγυόμαστε μέσω κώδικα.",
      promises: [
        {
          icon: "📄",
          title: "Αποδείξιμα σωστό",
          description: "Κάθε πρόταση που γράφει έχει αριθμό αναφοράς που οδηγεί στο ακριβές PDF ή ιστοσελίδα. Ο χρήστης κάνει click και ανοίγει το έγγραφο. Δεν μπορεί να επινοήσει πηγή — ο κώδικας το εμποδίζει.",
          example: "«Δικαιούστε επίδομα 67% [ΦΕΚ 932/Β 2023]» → ο χρήστης κάνει click στο [ΦΕΚ 932/Β] → ανοίγει το ίδιο το ΦΕΚ."
        },
        {
          icon: "🇬🇷",
          title: "Καταλαβαίνει ελληνικά. Αληθινά.",
          description: "Δεν είναι μεταφρασμένο ChatGPT. Είναι χτισμένο γύρω από το ελληνικό νομικό και ιατρικό πλαίσιο. Αναγνωρίζει ΚΕΠΑ, ΕΟΠΥΥ, ΑΑΔΕ, ΦΕΚ. Σαρώνει αυτόματα ελληνικά κρατικά portal για ενημερώσεις.",
          example: "Ρωτήστε «Τι είναι το ΚΕΑ;» → ξέρει ότι εννοείτε Κοινωνικό Εισόδημα Αλληλεγγύης (όχι την Κάρτα Ελευθερίας Άδειας)."
        },
        {
          icon: "🛡️",
          title: "Ποτέ δεν επικίνδυνο",
          description: "Αν κάποιος γράψει «πονάει το στήθος μου» ή εκφράσει αυτοκτονικότητα, το σύστημα δίνει ΑΜΕΣΑ τα τηλέφωνα έκτακτης ανάγκης (ΕΚΑΒ 166, Γραμμή Ζωής 1018). Χωρίς να ρωτήσει το AI πρώτα. Είναι γραμμή κώδικα, όχι «ελπίζουμε ότι θα κάνει το σωστό».",
          example: "Εγγυημένη συμπεριφορά σε 7 κατηγορίες κρίσης. Audit-able από οποιονδήποτε compliance officer."
        }
      ],
      featurePills: [
        "EU AI Act ✓",
        "WCAG ✓",
        "Πολυγλωσσία ✓",
        "GDPR ✓",
        "Ελληνικές Διάλεκτοι ✓",
        "Eco-Friendly ✓",
        "Νομική Θωράκιση ✓",
        "RAG Citations ✓"
      ],
      chatDemo: {
        userMessage: "Τι δικαιώματα έχω ως ασθενής με σκλήρυνση κατά πλάκας;",
        botReply: "Σύμφωνα με τον Ν.4387/2016 και τις εγκυκλίους ΕΦΚΑ, δικαιούστε:\n\n• Αναπηρική σύνταξη μέσω ΚΕΠΑ [ΦΕΚ 1256/Β/2017]\n• Κάλυψη φαρμακευτικής αγωγής από ΕΟΠΥΥ [Εγκύκλιος 2024/32]\n• Επίδομα βαρύτητας αναπηρίας [ΟΠΕΚΑ – Άρθρο 22]\n\nΘέλετε να σας καθοδηγήσω στη διαδικασία αίτησης;",
        sources: "3 πηγές · 4.2s"
      }
    },
    // Proof Numbers
    proofNumbers: {
      title: "Από το πραγματικό deployment μας",
      subtitle: "MYRTO chatbot στο Κέντρο Καθοδήγησης Καρκινοπαθών Κάπα3. Αξιολογήθηκαν 84 πραγματικές ερωτήσεις ασθενών από πιστοποιημένο reviewer.",
      stats: [
        { number: "75", suffix: "%", label: "Verified-correct απαντήσεις (από 49% στο πρώτο iteration)" },
        { number: "0", suffix: "", label: "Αποτυχίες σύνδεσης σε 84-query batch" },
        { number: "1.766", suffix: "", label: "Indexed έγγραφα + σελίδες με αυτόματη ανανέωση" },
        { number: "6", suffix: "s", label: "Μέσος χρόνος απόκρισης" }
      ]
    },
    // Use Cases
    useCases: {
      title: "Για ποιους είναι",
      subtitle: "Παντού όπου η σωστή απάντηση έχει συνέπεια — και η λάθος έχει κόστος.",
      notYourDomain: "Δεν βλέπετε το δικό σας domain; Αν έχετε έγγραφα που οι χρήστες σας πρέπει να διαβάζουν, μπορούμε να χτίσουμε.",
      categories: [
        {
          icon: "🏥",
          name: "Υγεία",
          items: [
            { name: "ΜΚΟ υγείας", detail: "π.χ. Κάπα3, ΕΛΛΟΚ, ΑγκαΛιάζω, Φλόγα", desc: "Καθοδήγηση ασθενών: επιδόματα, ΚΕΠΑ, παροχές, διαδικασίες", status: "Live deployment" },
            { name: "Νοσοκομεία", detail: "δημόσια / ιδιωτικά", desc: "Εσωτερική υποστήριξη: ΕΟΠΥΥ updates, ΦΕΚ alerts, αποζημιώσεις", status: "Available" },
            { name: "Διαγνωστικά κέντρα", detail: "", desc: "Patient-facing: ραντεβού, οδηγίες, ασφαλιστική κάλυψη", status: "Available" },
            { name: "Φαρμακευτικές", detail: "", desc: "Branded patient companion · κανονιστική επικοινωνία · παρενέργειες", status: "Available" },
            { name: "Φαρμακεία (αλυσίδες)", detail: "", desc: "Αλληλεπιδράσεις φαρμάκων, οδηγίες χρήσης, ΕΟΠΥΥ συμμετοχή", status: "Available" },
            { name: "Ασφαλιστικές υγείας", detail: "", desc: "Επεξήγηση συμβολαίων, διαδικασίες αποζημίωσης, κάλυψη", status: "Available" }
          ]
        },
        {
          icon: "✈️",
          name: "Τουρισμός & Φιλοξενία",
          items: [
            { name: "Αεροδρόμια", detail: "MyrtoFly · Digital Gate V pilot", desc: "Cancer-aware airport companion · PRM assistance · multilingual", status: "Active pilot" },
            { name: "Ξενοδοχεία / Resorts", detail: "", desc: "Concierge AI 24/7 · 5+ γλώσσες · cross-sell υπηρεσιών", status: "Available" },
            { name: "Tour operators / agencies", detail: "", desc: "Pre-trip Q&A · destination info · visa · travel updates", status: "Available" },
            { name: "Medical tourism", detail: "", desc: "Inbound patient navigation: νοσοκομεία, ΕΟΠΥΥ S2, διασυνοριακή περίθαλψη", status: "Available" },
            { name: "Cruise lines / ναυτιλία", detail: "", desc: "Εκδρομές, υπηρεσίες onboard, customs, ΑμεΑ accessibility", status: "Available" },
            { name: "Προορισμοί / Περιφέρειες", detail: "", desc: "Visit-X bot: αξιοθέατα, εκδηλώσεις, μεταφορές — branded ανά περιοχή", status: "Available" }
          ]
        },
        {
          icon: "🏢",
          name: "Επιχειρήσεις",
          items: [
            { name: "HR / Onboarding", detail: "", desc: "Εταιρικές πολιτικές, παροχές, διαδικασίες αδειών, ΕΦΚΑ", status: "Available" },
            { name: "Customer support", detail: "", desc: "Multi-language tier-1 support: products, returns, warranty — citation-backed", status: "Available" },
            { name: "Internal knowledge base", detail: "", desc: "Q&A πάνω σε χιλιάδες εσωτερικά έγγραφα", status: "Available" },
            { name: "B2B sales support", detail: "", desc: "Product specs, pricing rules, contract terms — σε δευτερόλεπτα", status: "Available" },
            { name: "Λογιστικά γραφεία", detail: "", desc: "Φορολογικός σύμβουλος: μεταβολές, ΦΠΑ, ΑΑΔΕ/myCAR", status: "Available" }
          ]
        },
        {
          icon: "🏛️",
          name: "Δημόσιος Τομέας",
          items: [
            { name: "Κεντρικές υπηρεσίες", detail: "ΕΦΚΑ, ΟΠΕΚΑ, ΑΑΔΕ, ΔΥΠΑ", desc: "Citizen-facing assistant: μείωση φόρτου call-center 30-50%", status: "Tender" },
            { name: "Δήμοι / Περιφέρειες", detail: "", desc: "Δημοτικά τέλη, ΚΕΑ, ΕΕΕ, ΑμεΑ παροχές, εκδηλώσεις", status: "Available" },
            { name: "Εκπαίδευση", detail: "πανεπιστήμια, ΙΕΚ", desc: "Student services: γραμματεία FAQ, υποτροφίες, εγγραφές", status: "Available" },
            { name: "Κλειστά επαγγέλματα", detail: "Δικηγορικός / Ιατρικός / ΤΕΕ Σύλλογος", desc: "Ασφαλιστικά, εφημερίες, δεοντολογία, εγκύκλιοι", status: "Available" }
          ]
        },
        {
          icon: "💼",
          name: "Χρηματοοικονομικά",
          items: [
            { name: "Τράπεζες / fintech", detail: "", desc: "Λογαριασμοί, κάρτες, δάνεια, KYC — citation-backed", status: "Available" },
            { name: "Ασφαλιστικές (γενικές)", detail: "", desc: "Παροχές, αποζημιώσεις, ζημιές, αναγγελίες", status: "Available" },
            { name: "Real estate / property mgmt", detail: "", desc: "Συμβόλαια, ΕΝΦΙΑ, μισθώσεις, E9", status: "Available" },
            { name: "Επενδυτικές πλατφόρμες", detail: "", desc: "Investor Q&A: prospectus, φορολογία — όλα cited", status: "Available" }
          ]
        },
        {
          icon: "🌐",
          name: "Λοιπές",
          items: [
            { name: "Energy / utilities", detail: "ΔΕΗ, ΕΥΔΑΠ, gas providers", desc: "Λογαριασμοί, τιμολόγηση, κοινωνικά τιμολόγια", status: "Available" },
            { name: "Telecom / ISPs", detail: "", desc: "Πακέτα, χρεώσεις, τεχνικά, φορητότητα", status: "Available" },
            { name: "Retail / e-commerce", detail: "", desc: "Pre-sale Q&A · Post-sale: επιστροφές, εγγυήσεις", status: "Available" },
            { name: "Εκκλησιαστικοί φορείς", detail: "μητροπόλεις, ΜΚΟ", desc: "Εκδηλώσεις, μυστήρια, φιλανθρωπικά", status: "Available" },
            { name: "Συνδικαλιστικοί φορείς", detail: "", desc: "Εργατικά δικαιώματα, ασφαλιστικά, νομική υποστήριξη", status: "Available" },
            { name: "Ομογένεια / Greeks abroad", detail: "", desc: "Συντάξεις εξωτερικού, διπλή υπηκοότητα, προξενεία", status: "Available" }
          ]
        }
      ]
    },
    // Green AI
    greenAI: {
      title: "Green & Reliable AI",
      subtitle: "Το πιο πράσινο token είναι αυτό που δεν παράγεις ποτέ. Φτιάχνουμε bots φθηνά να τρέχουν και φθηνά σε ενέργεια — χωρίς να θυσιάζουμε ποιότητα frontier μοντέλου.",
      ladderTitle: "Η αρχή: escalation ladder",
      ladderSubtitle: "Κάθε query σερβίρεται στο φθηνότερο επίπεδο που μπορεί να το απαντήσει σωστά. Ανεβαίνει στο επόμενο μόνο όταν το προηγούμενο δηλώσει αβεβαιότητα.",
      steps: [
        { level: "1", title: "Cache", description: "Έχει ήδη απαντηθεί παρόμοια ερώτηση; Επιστροφή. Ένα φθηνό embedding, μηδέν generation.", color: "green" },
        { level: "2", title: "Symbolic", description: "Factual/relational query; Classifier δρομολογεί σε DB ή knowledge graph. Καμία hallucination, ακριβές αποτέλεσμα.", color: "green" },
        { level: "3", title: "Small model", description: "In-domain, routine NL; Quantized, domain-tuned μικρό μοντέλο. Συχνά καλύτερο από γενικό giant μοντέλο, στο 1/10 της ενέργειας.", color: "gold" },
        { level: "4", title: "Frontier", description: "Πραγματικά novel ή reasoning-heavy; Καλούμε το καλύτερο διαθέσιμο μοντέλο. Δεν το σπαταλάμε σε «τι ώρα κλείνετε».", color: "coral" }
      ],
      disclaimer: "Δεν είναι quality compromise. Symbolic lookups δίνουν ακριβείς απαντήσεις αντί για πιθανοφανείς εικασίες. Templated responses δεν drift-άρουν. Και κρατάμε το frontier για queries που πραγματικά το χρειάζονται.",
      cards: [
        { title: "Μετράμε, δεν ισχυριζόμαστε", desc: "Self-hosted: πραγματική ενέργεια από GPU + CPU, live grid carbon intensity. Energy & CO₂ per query, attributed across pipeline." },
        { title: "Headline metric", desc: "Ποιο ποσοστό του traffic εξυπηρετήθηκε σε ποιο tier. Όσο πιο χαμηλά στη σκάλα, τόσο μεγαλύτερη η οικονομία." },
        { title: "Economic retrieval", desc: "Cache-augmented generation για μικρά stable corpora. KV-caching static prompt prefixes. Top-2 retrieval. Λιγότερα tokens, ίδιες απαντήσεις." }
      ]
    },
    // Who It's For (Homepage) — now chatbot focused
    whoItsFor: {
      title: "Ποιους αφορά",
      items: [
        "Φορείς & οργανισμοί υγείας",
        "Δημόσιος τομέας & αυτοδιοίκηση",
        "Τουρισμός & φιλοξενία",
        "Επιχειρήσεις με μεγάλη απεύθυνση"
      ]
    },
    // How We Work
    howWeWork: {
      title: "Πώς δουλεύουμε",
      steps: [
        "Χαρτογραφούμε τις ανάγκες σας, το περιεχόμενο και τις ροές πληροφορίας.",
        "Δοκιμάζουμε λύσεις σε πραγματικά σενάρια με μετρήσεις και ανατροφοδότηση.",
        "Παραδίδουμε pilot στο δικό σας domain σε 4 εβδομάδες."
      ]
    },
    learningLoop: {
      index: "06",
      title: "Τι κάνει το <em class=\"brand-dialogos\">DialogosAI</em> ξεχωριστό;",
      lead: "Το <em class=\"brand-dialogos\">DialogosAI</em> εξελίσσεται με κάθε αλληλεπίδραση. Κάθε συνομιλία τροφοδοτεί έναν κύκλο συνεχούς βελτίωσης: ανάλυση, εκπαίδευση, δοκιμή και περαιτέρω ανάπτυξη.",
      body: "Έτσι, το <em class=\"brand-dialogos\">DialogosAI</em> γίνεται τελικά ο διάλογος που εσείς θέλετε να έχετε με τους ανθρώπους που σχετίζεται ο οργανισμός σας, με τις απαντήσεις να γίνονται πιο ακριβείς, πιο χρήσιμες και πιο προσαρμοσμένες στις πραγματικές τους ανάγκες.",
      aria: "Κύκλος συνεχούς βελτίωσης",
      steps: ["Ανάλυση", "Εκπαίδευση", "Δοκιμή", "Ανάπτυξη"]
    },
    insightsDashboard: {
      overline: "Insights για οργανισμούς",
      title: "Τι χρειάζονται πραγματικά οι άνθρωποι;",
      lead: "Ακούστε τις ανάγκες των ανθρώπων, σε κλίμακα.",
      body: "Οι ανώνυμες συνομιλίες αποκαλύπτουν τι ζητούν οι χρήστες, πού δυσκολεύονται και ποια πληροφόρηση λείπει — χωρίς να μετατρέπουν την υποστήριξη σε απρόσωπους αριθμούς.",
      aria: "Προεπισκόπηση πίνακα αναλυτικών στοιχείων DialogosAI",
      nav: [
        "Δημοφιλέστερες κατηγορίες αναγκών",
        "Νέα ή αυξανόμενα θέματα",
        "Ερωτήσεις που δεν απαντήθηκαν επαρκώς",
        "Περιπτώσεις που παραπέμφθηκαν σε άνθρωπο",
        "Σημεία όπου οι χρήστες δυσκολεύονται",
        "Πηγές που χρησιμοποιούνται περισσότερο",
        "Αυτόματες ενημερώσεις & νέες πηγές"
      ]
    },
    controlledImprovement: {
      overline: "Βελτίωση με έλεγχο",
      title: "Βελτιώνεται με κάθε πραγματική ανάγκη — πάντα με τον δικό σας έλεγχο.",
      lead: "Οι συνομιλίες αναδεικνύουν κενά γνώσης και προτείνουν συγκεκριμένες βελτιώσεις. Όμως τίποτα δεν περνά στην παραγωγή χωρίς επιβεβαίωση.",
      body: "Η βελτίωση δεν σημαίνει «εκπαίδευση πάνω σε προσωπικές συνομιλίες». Σημαίνει ότι αναλύουμε ανώνυμα μοτίβα, εντοπίζουμε τι λείπει, και χτίζουμε ενημερώσεις που περνούν από έλεγχο, δοκιμές και έγκριση.",
      guards: [
        "Ανώνυμα & συγκεντρωτικά insights — όχι αποθήκευση προσωπικών δεδομένων by default.",
        "Προτάσεις βελτίωσης που ελέγχονται από την ομάδα σας (human review).",
        "Δοκιμές σε πραγματικά σενάρια πριν ενεργοποίηση (QA & safety).",
        "Έγκριση πριν από κάθε αλλαγή — εσείς ορίζετε τι «μπαίνει»."
      ],
      flywheel: {
        aria: "Flywheel ελεγχόμενης βελτίωσης DialogosAI",
        gate: "Έλεγχος & Έγκριση",
        gateSub: "Έλεγχος, δοκιμή, έγκριση πριν την παραγωγή",
        steps: [
          { kicker: "Συνομιλίες", title: "Ανώνυμα μοτίβα αναγκών & δυσκολιών" },
          { kicker: "Κενά γνώσης", title: "Τι λείπει, τι μπερδεύει, τι αλλάζει" },
          { kicker: "Βελτιώσεις", title: "Πηγές, ροές καθοδήγησης, κανόνες ασφαλείας" },
          { kicker: "Ανάπτυξη", title: "Νέα έκδοση — με μετρήσιμη επίδραση" }
        ]
      }
    },
    // Obstacles
    obstacles: {
      title: "Εμπόδια που συναντούμε όλες και όλοι",
      items: [
        "Κοινωνικές ανισότητες στην πρόσβαση στην πληροφορία (γλώσσα, αναπηρία, γραμματισμός).",
        "Ψηφιακά εμπόδια και πολύπλοκες διαδικασίες που μπερδεύουν αντί να βοηθούν.",
        "Πολιτισμικοί φραγμοί και παραπληροφόρηση σε κρίσιμες στιγμές.",
        "Έλλειψη συνεχούς υποστήριξης όταν τη χρειαζόμαστε."
      ]
    },
    // AI Capabilities
    aiCapabilities: {
      title: "Τεχνητή Νοημοσύνη σήμερα: δυνατότητες & όρια",
      capabilities: {
        title: "Δυνατότητες",
        text: "Η ΤΝ αλλάζει ριζικά τις δυνατότητες της πληροφόρησης, της επικοινωνίας, του marketing, της εκπαίδευσης, της οργάνωσης, της ατομικής ενδυνάμωσης και της κοινωνικής συνοχής."
      },
      limits: {
        title: "Όρια & Κίνδυνοι",
        text: "Ταυτόχρονα, φέρνει κινδύνους: ανακρίβειες («παραισθήσεις»), αναπαραγωγή ή ενίσχυση προκαταλήψεων, κολακεία προς τους χρήστες και τις χρήστριες και πιο απρόσωπη επικοινωνία."
      }
    },
    // Mission
    mission: {
      title: "Η αποστολή μας",
      text: "Να δημιουργούμε ανθρωποκεντρικές εφαρμογές τεχνητής νοημοσύνης — εφαρμογές με επίκεντρο τον άνθρωπο και την κοινωνία, που λύνουν προβλήματα στο μέτρο που εξυπηρετούν τις πραγματικές ανθρώπινες ανάγκες. Διαμεσολαβούμε μεταξύ των ανθρωπίνων αναγκών και της τεχνητής νοημοσύνης, μαζί με τους ειδικούς πεδίου, φέρνοντας την ΤΝ στα μέτρα κάθε φορέα."
    },
    // Values
    values: {
      title: "Αξίες",
      items: [
        {
          title: "Ανθρωποκεντρική Τεχνολογία",
          text: "Η τεχνολογία ενισχύει, δεν αντικαθιστά τις ανθρώπινες σχέσεις. Σχεδιάζουμε AI με τον άνθρωπο στο κέντρο."
        },
        {
          title: "Κοινωνική Συνεισφορά",
          text: "Εστιάζουμε σε πραγματικές ανάγκες, ενδυναμώνοντας κοινότητες και βελτιώνοντας την ποιότητα ζωής."
        },
        {
          title: "Ενσυναίσθηση στην Καινοτομία",
          text: "Ξεκινάμε από τις ανθρώπινες ανάγκες. Οι λύσεις μας τις ακούν, τις κατανοούν και προσαρμόζονται για να τις εξυπηρετούν."
        },
        {
          title: "Τεχνολογία που Ενδυναμώνει",
          text: "Παρέχουμε πρακτικά εργαλεία εκεί που χρειάζονται: απλά • αξιόπιστα • μετρήσιμα."
        }
      ]
    },
    // Philosophy
    philosophy: {
      title: "Η φιλοσοφία μας",
      vision: {
        title: "Φιλοσοφία & Όραμα",
        text: "Η ΤΝ για τον άνθρωπο. Οραματιζόμαστε μια πραγματικότητα όπου η ΤΝ υπηρετεί με ευθύνη τις ανθρώπινες ανάγκες και χτίζει γέφυρες κατανόησης στις ανθρώπινες κοινότητες."
      },
      whatWeDo: {
        title: "Τι κάνουμε",
        items: [
          {
            title: "1) Συνδιαμορφώνουμε",
            text: "Με οργανισμούς, φορείς και επιχειρήσεις συστήματα ΤΝ που κατανοούν, δείχνουν ενσυναίσθηση και επικοινωνούν φυσικά, με πραγματικό κοινωνικό αντίκτυπο και σεβασμό στην ανθρώπινη επικοινωνία."
          },
          {
            title: "2) Σχεδιάζουμε",
            text: "Ολιστικές, προσβάσιμες εφαρμογές για την υγεία, την εκπαίδευση, την πολιτισμική διαμεσολάβηση και τους άλλους τομείς, όπου η ΤΝ μπορεί να στηρίξει την ανθρώπινη ανάγκη."
          },
          {
            title: "3) Ενισχύουμε",
            text: "Την κοινωνική συνοχή, αμβλύνουμε τις κοινωνικές ανισότητες, προωθούμε τη συμπερίληψη και βελτιώνουμε την καθημερινότητα των ατόμων."
          }
        ]
      }
    },
    // About
    about: {
      title: "Ποιοι είμαστε",
      text: "Είμαστε μια ελληνική startup με διεπιστημονική ομάδα ερευνητών και ερευνητριών, προγραμματιστών και επαγγελματιών στους τομείς της Τεχνητής Νοημοσύνης, της Γλωσσολογίας και της Ανάπτυξης Λογισμικού. Η εμπειρία μας στην έρευνα, στην ανάπτυξη εφαρμογών και στις πωλήσεις μάς βοηθά να κατανοούμε σε βάθος τις ανάγκες των ανθρώπων και να δημιουργούμε εξατομικευμένα και αξιόπιστα συστήματα Τεχνητής Νοημοσύνης."
    },
    // Products — kept for SimasiaChatbots product page
    products: {
      title: "SimasiaChatbots",
      chatbots: {
        name: "SimasiaChatbots",
        title: "Ψηφιακοί Πλοηγοί — AI που αποδεικνύει ότι είναι σωστό",
        offers: "Τι προσφέρουμε",
        features: [
          "Νομική θωράκιση σύμφωνα με το EU AI Act, χωρίς μαύρα κουτιά.",
          "Προσβασιμότητα από σχεδιασμό: WCAG-oriented, εναλλακτικοί τρόποι εισόδου/εξόδου.",
          "Φυσικότητα στη χρήση της ελληνικής γλώσσας — και σε ελληνικές διαλέκτους (κυπριακά, ποντιακά).",
          "Πολυγλωσσία: 20+ ευρωπαϊκές και παγκόσμιες γλώσσες.",
          "Δικλείδες ασφαλείας για καταστάσεις κινδύνου — ΕΚΑΒ 166, Γραμμή Ζωής 1018 αυτόματα.",
          "Μείωση παραισθήσεων μέσω RAG με citations σε κάθε απάντηση.",
          "Eco-friendly: escalation ladder που εξοικονομεί ενέργεια χωρίς θυσία ποιότητας.",
          "Ακριβείς πληροφορίες πάνω στο περιεχόμενο που εκπαιδεύονται — τεκμηριωμένες πηγές.",
          "Προσαρμογή στο ύφος και τις ειδικές οδηγίες κάθε φορέα.",
          "Λειτουργούν ως ψηφιακοί πλοηγοί — δεν απλά απαντούν, καθοδηγούν."
        ]
      },
      studio: {
        name: "SimasiaStudio",
        title: "Τεκμηριωμένη μετάφραση, επιμέλεια με ευθύνη",
        offers: "Τι προσφέρουμε",
        features: [
          "Ανέβασμα και επιλογή οδηγών ύφους στη μετάφραση και στην επιμέλεια κειμένου.",
          "Πρόσβαση σε έγκριτη ορολογία/γλωσσάρια.",
          "Επιμέλεια ελληνικών κειμένων με το Λεξικό Τριανταφυλλίδη.",
          "Αναλυτικές προτάσεις διόρθωσης και εξαγωγή αρχείων \"Παρακολούθησης αλλαγών\" (DOCX/PDF).",
          "Εξειδικευμένη μετάφραση/επιμέλεια ανά πεδίο.",
          "Μαζική επεξεργασία και συνδέσεις (Google Drive/Dropbox/S3).",
          "Ρυθμιζόμενη ευαισθησία σε προκαταλήψεις γένους, κοινωνικών ομάδων, στερεοτύπων.",
          "Προσαρμοσμένος ορθογραφικός/γραμματικός έλεγχος για EL/EN και ελληνικές διαλέκτους."
        ]
      },
      daily: {
        name: "SimasiaDaily",
        title: "Μικρά και αξιόπιστα εργαλεία, μεγάλη διαφορά.",
        offers: "Τι προσφέρουμε",
        toolCategories: []
      },
      edu: {
        name: "SimasiaEdu",
        title: "Θέματα διαγωνισμάτων, διορθώσεις, εξηγήσεις και λύσεις με συνέπεια",
        offers: "Τι προσφέρουμε",
        features: []
      }
    },
    // Target Audience
    targetAudience: {
      title: "Ποιους αφορά",
      audienceCards: [
        { 
          title: "Φορείς Υγείας & ΜΚΟ", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        },
        { 
          title: "Δημόσιος Τομέας & Αυτοδιοίκηση", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        },
        { 
          title: "Τουρισμός & Φιλοξενία", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        },
        { 
          title: "Επιχειρήσεις & Χρηματοοικονομικά", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        }
      ]
    },
    // Collaborations
    collaborations: {
      title: "Συνεργασίες",
      home: {
        headline: "Το <strong>Pyxida</strong> υλοποιείται ήδη σε οργανισμούς με κοινωνικό αντίκτυπο",
        paragraph1: "Οι συνεργασίες μας περιλαμβάνουν το Κέντρο Καθοδήγησης Καρκινοπαθών (Μυρτώ), την ΠΟΑμΣΚΠ (ΣΚΠ-i), ενώ χαράσσουμε κοινή πορεία για άλλους δύο <strong>Pyxida</strong> μαζί με την Bpanheroes και το Perfectaki Able.",
        paragraph2: "Εργαζόμαστε σε τομείς Τεχνητής Νοημοσύνης ρυθμιζόμενου ρίσκου όπου η ακρίβεια, η προσβασιμότητα και η ανθρώπινη κλιμάκωση είναι κρίσιμες, όπως η υγεία, η εκπαίδευση και οι κοινωνικές υπηρεσίες.",
        paragraph3: "Μαζί πετυχαίνουμε σαφείς απαντήσεις σε σύνθετες διαδικασίες, διαφάνεια γνώσης από εγκεκριμένες πηγές και ψηφιακή ένταξη για κοινότητες που το χρειάζονται. Γι' αυτήν την υπεύθυνη και αξιόπιστη εφαρμογή, το <strong>Pyxida</strong> μπορεί να προσαρμοστεί σε μεγάλο εύρος πεδίων όπου χρειάζεται καθοδήγηση χρηστών.",
        viewAll: "Όλες οι συνεργασίες →"
      },
      current: {
        title: "Συνεργασίες",
        contact: "Επικοινωνήστε για πρόσβαση",
        bookDemo: "Κλείστε demo",
        items: [
          {
            name: "Κέντρο Καθοδήγησης Καρκινοπαθών (Κ3)",
            description: "Ο Ψηφιακός Πλοηγός Υγείας «Μυρτώ» προσφέρει έγκυρη καθοδήγηση και άμεση ενημέρωση για ασθενείς και οικογένειες.",
            logo: "/Collaborations/Logos/Kapa3_logo.png",
            category: "υγεία"
          },
          {
            name: "Πανελλήνια Ομοσπονδία Ατόμων με Σκλήρυνση Κατά Πλάκας (ΠΟΑΜΣΚΠ)",
            description: "Το υποστηρικτικό chatbot «ΣΚΠ-i» παρέχει αξιόπιστη πληροφόρηση και καθημερινή ψηφιακή υποστήριξη για την κοινότητα της ΣΚΠ.",
            logo: "/Collaborations/Logos/poamsk_logo.png",
            category: "υγεία"
          },
          {
            name: "Bpanheroes",
            description: "Ψηφιακός πλοηγός για την κοινότητα BPAN — σε εξέλιξη.",
            logo: "/logos/bepan.png",
            category: "υγεία"
          },
          {
            name: "Perfectaki Able",
            description: "Ψηφιακός πλοηγός για προσβάσιμη εκπαίδευση — σε εξέλιξη.",
            logo: "/logos/perfectaki.png",
            category: "εκπαίδευση"
          }
        ]
      },
      process: {
        title: "Πώς συνεργαζόμαστε",
        steps: [
          { title: "Διερεύνηση", desc: "Χαρτογραφούμε τις ανάγκες σας, το περιεχόμενο και τις ροές πληροφορίας." },
          { title: "Πιλοτική εφαρμογή", desc: "Δοκιμάζουμε λύσεις σε πραγματικά σενάρια, κάνουμε μετρήσεις, εξάγουμε αποτελέσματα και λαμβάνουμε ανατροφοδότηση." },
          { title: "Παραγωγική ένταξη & Ενσωμάτωση", desc: "Προσαρμόζουμε τις λύσεις στο περιβάλλον σας, εκπαιδεύουμε την ομάδα σας, SSO/CRM/Helpdesk." },
          { title: "Υποστήριξη & Εξέλιξη", desc: "Προσφέρουμε διαρκή υποστήριξη και δυνατότητα εξέλιξης των εφαρμογών." }
        ]
      },
      achievements: {
        title: "Τι πετυχαίνουμε μαζί",
        items: [
          "Σαφείς απαντήσεις σε συχνές ερωτήσεις/σύνθετες διαδικασίες.",
          "Διαφάνεια γνώσης με τεκμηρίωση από εγκεκριμένες πηγές.",
          "Προσβασιμότητα & συμπερίληψη στην ψηφιακή επικοινωνία.",
          "Ενδυνάμωση κοινοτήτων (υγεία, εκπαίδευση, κοινωνικές υπηρεσίες, πολιτισμός κ.ά.)",
          "Ομαλή ενσωμάτωση στις υπάρχουσες ροές και συστήματα."
        ]
      },
      commitment: "Η \\ΣimasiaAI\\ αναλαμβάνει έργα όταν υπάρχει σαφής κοινωνικός προσανατολισμός: συν-σχεδιασμός με ειδικούς/ες και κοινότητες, προσβασιμότητα από τον σχεδιασμό, πολυγλωσσία/πολιτισμική επάρκεια, τεκμηριωμένες πηγές και ανθρώπινη κλιμάκωση όπου χρειάζεται."
    },
    // Footer
    footer: {
      tagline: "",
      navigation: "Πλοήγηση",
      contact: "Επικοινωνία",
      social: "Social Media",
      location: "Αθήνα, Ελλάδα",
      poweredBy: "Powered by Empathy",
      established: "Est. 2025",
      copyright: "SimasiaAI — Μέτρο μας ο Άνθρωπος"
    },
    // CTA
    cta: {
      title: "Φέρτε 3 πραγματικές ερωτήσεις από τους χρήστες σας.",
      subtitle: "30 λεπτά demo call. Θα τις απαντήσει live το chatbot μας με cited sources. Αν σας πείσει, ξεκινάμε pilot στο δικό σας domain σε 4 εβδομάδες.",
      button: "Κλείστε demo →"
    },
    // Contact Form
    contactForm: {
      title: "Φόρμα Επικοινωνίας",
      subtitle: "Φέρτε 3 πραγματικές ερωτήσεις από τους χρήστες σας. Απαντάμε εντός 24 ωρών.",
      firstName: "Όνομα",
      lastName: "Επίθετο",
      email: "Email",
      organizationType: "Φορέας/Ιδιότητα",
      selectOption: "Επιλέξτε...",
      organization: "Επιχείρηση",
      organization2: "Οργανισμός",
      organization3: "Φορέας",
      organization4: "Άλλο",
      companyName: "Επωνυμία",
      description: "Σύντομη περιγραφή ανάγκης/ιδέας",
      descriptionPlaceholder: "Περιγράψτε την ανάγκη σας ή τη λύση που οραματίζεστε...",
      attachment: "(Προαιρετικά) Αρχείο/Σύνδεσμος",
      attachmentPlaceholder: "https://...",
      submit: "Αποστολή αιτήματος",
      submitting: "Αποστολή...",
      successMessage: "Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.",
      errorMessage: "Υπήρξε πρόβλημα με την αποστολή. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας στο contact@simasiaai.gr",
      privacyNote: "Με την υποβολή συμφωνείτε ότι θα επικοινωνήσουμε για το αίτημά σας. Τα στοιχεία σας δεν κοινοποιούνται σε τρίτους."
    }
  },
  en: {
    // Common
    common: {
      learnMore: "Learn more",
      requestProposal: "Request a collaboration proposal",
      requestAccess: "Request access",
      scheduleDemoNow: "Schedule a demo now",
      scheduleDemoToday: "Request a collaboration proposal today",
      contactForAccess: "Contact for access",
      bookDemo: "Book demo"
    },
    // Navigation
    nav: {
      home: "Home",
      about: "About Us",
      chatbots: "SimasiaChatbots",
      collaborations: "Collaborations",
      bookDemo: "Let's collaborate"
    },
    hero: {
      badge: "★ Live deployment · Cancer Guidance Center Κάπα3",
      line1a: "AI that proves",
      line1b: "it's right.",
      line2: "Domain-specific AI chatbots for healthcare, legal, public sector, tourism & enterprise. Every answer comes with its source.",
      talkToTeam: "See live demo",
      seeApplications: "How it works"
    },
    // Applications Page
    applications: {
      title: "SimasiaChatbots",
      subtitle: "AI-Powered Digital Navigators",
      requestProposal: "Request collaboration proposal"
    },
    // Book Demo Page
    bookDemo: {
      title: "Book a demo",
      description: "Bring 3 real questions from your users. 30-minute demo call — our chatbot will answer them live with cited sources. If it convinces you, we start a pilot on your domain in 4 weeks."
    },
    // What We Offer — now SimasiaChatbots focused
    whatWeOffer: {
      title: "SimasiaChatbots",
      subtitle: "Digital Navigators — We don't say 'probably correct'. We guarantee it through code.",
      seeAll: "See SimasiaChatbots in detail",
      cards: [
        { name: "SimasiaChatbots", desc: "Digital navigators with legal compliance, natural Greek language, and citations in every answer.", link: "/applications/simasia-chatbots" }
      ]
    },
    // Chatbot Showcase — 3 core promises
    chatbotShowcase: {
      title: "Three promises. Zero probability.",
      subtitle: "We don't say 'probably correct' — we guarantee it through code.",
      promises: [
        {
          icon: "📄",
          title: "Provably correct",
          description: "Every sentence it writes has a reference number leading to the exact PDF or webpage. The user clicks and opens the document. It cannot fabricate a source — the code prevents it.",
          example: "'You are entitled to a 67% benefit [FEK 932/B 2023]' → the user clicks [FEK 932/B] → the actual government gazette opens."
        },
        {
          icon: "🇬🇷",
          title: "Understands Greek. Truly.",
          description: "It's not translated ChatGPT. It's built around the Greek legal and medical framework. It recognizes KEPA, EOPYY, AADE, FEK. It automatically scans Greek government portals for updates.",
          example: "Ask 'What is KEA?' → it knows you mean Social Solidarity Income (not Freedom License Card)."
        },
        {
          icon: "🛡️",
          title: "Never dangerous",
          description: "If someone writes 'my chest hurts' or expresses suicidality, the system IMMEDIATELY provides emergency numbers (EKAV 166, Life Line 1018). Without asking AI first. It's a line of code, not 'hoping it does the right thing'.",
          example: "Guaranteed behavior in 7 crisis categories. Audit-able by any compliance officer."
        }
      ],
      featurePills: [
        "EU AI Act ✓",
        "WCAG ✓",
        "Multilingual ✓",
        "GDPR ✓",
        "Greek Dialects ✓",
        "Eco-Friendly ✓",
        "Legal Compliance ✓",
        "RAG Citations ✓"
      ],
      chatDemo: {
        userMessage: "What rights do I have as a patient with multiple sclerosis?",
        botReply: "According to Law 4387/2016 and EFKA circulars, you are entitled to:\n\n• Disability pension through KEPA [FEK 1256/B/2017]\n• Medication coverage from EOPYY [Circular 2024/32]\n• Disability severity benefit [OPEKA – Article 22]\n\nWould you like me to guide you through the application process?",
        sources: "3 sources · 4.2s"
      }
    },
    // Proof Numbers
    proofNumbers: {
      title: "From our real deployment",
      subtitle: "MYRTO chatbot at Cancer Guidance Center Kapa3. 84 real patient questions evaluated by a certified reviewer.",
      stats: [
        { number: "75", suffix: "%", label: "Verified-correct answers (from 49% in first iteration)" },
        { number: "0", suffix: "", label: "Connection failures in 84-query batch" },
        { number: "1,766", suffix: "", label: "Indexed documents + pages with auto-refresh" },
        { number: "6", suffix: "s", label: "Average response time" }
      ]
    },
    // Use Cases
    useCases: {
      title: "Who it's for",
      subtitle: "Wherever the right answer has consequence — and the wrong one has cost.",
      notYourDomain: "Don't see your domain? If you have documents your users need to read, we can build it.",
      categories: [
        {
          icon: "🏥",
          name: "Healthcare",
          items: [
            { name: "Health NGOs", detail: "e.g. Kapa3, ELLOK, AgkaLiazo, Floga", desc: "Patient guidance: benefits, KEPA, provisions, procedures", status: "Live deployment" },
            { name: "Hospitals", detail: "public / private", desc: "Internal support: EOPYY updates, FEK alerts, reimbursements", status: "Available" },
            { name: "Diagnostic centers", detail: "", desc: "Patient-facing: appointments, preparation guidelines, insurance coverage", status: "Available" },
            { name: "Pharmaceuticals", detail: "", desc: "Branded patient companion · regulatory communication · side effects", status: "Available" },
            { name: "Pharmacy chains", detail: "", desc: "Drug interactions, usage instructions, EOPYY co-pay", status: "Available" },
            { name: "Health insurers", detail: "", desc: "Contract explanation, reimbursement procedures, coverage", status: "Available" }
          ]
        },
        {
          icon: "✈️",
          name: "Tourism & Hospitality",
          items: [
            { name: "Airports", detail: "MyrtoFly · Digital Gate V pilot", desc: "Cancer-aware airport companion · PRM assistance · multilingual", status: "Active pilot" },
            { name: "Hotels / Resorts", detail: "", desc: "24/7 AI concierge · 5+ languages · service cross-sell", status: "Available" },
            { name: "Tour operators / agencies", detail: "", desc: "Pre-trip Q&A · destination info · visa · travel updates", status: "Available" },
            { name: "Medical tourism", detail: "", desc: "Inbound patient navigation: hospitals, EOPYY S2, cross-border care", status: "Available" },
            { name: "Cruise lines / shipping", detail: "", desc: "Excursions, onboard services, customs, accessibility", status: "Available" },
            { name: "Destinations / Regions", detail: "", desc: "Visit-X bot: attractions, events, transport — branded per area", status: "Available" }
          ]
        },
        {
          icon: "🏢",
          name: "Enterprise",
          items: [
            { name: "HR / Onboarding", detail: "", desc: "Corporate policies, benefits, leave procedures, EFKA", status: "Available" },
            { name: "Customer support", detail: "", desc: "Multi-language tier-1 support: products, returns, warranty — citation-backed", status: "Available" },
            { name: "Internal knowledge base", detail: "", desc: "Q&A across thousands of internal documents", status: "Available" },
            { name: "B2B sales support", detail: "", desc: "Product specs, pricing rules, contract terms — in seconds", status: "Available" },
            { name: "Accounting firms", detail: "", desc: "Tax advisor: changes, VAT, AADE/myCAR procedures", status: "Available" }
          ]
        },
        {
          icon: "🏛️",
          name: "Public Sector",
          items: [
            { name: "Central agencies", detail: "EFKA, OPEKA, AADE, DYPA", desc: "Citizen-facing assistant: 30-50% call-center load reduction", status: "Tender" },
            { name: "Municipalities / Regions", detail: "", desc: "Municipal fees, KEA, EEE, disability benefits, events", status: "Available" },
            { name: "Education", detail: "universities, vocational", desc: "Student services: registrar FAQ, scholarships, enrollment", status: "Available" },
            { name: "Professional associations", detail: "Bar / Medical / Engineering", desc: "Insurance, on-call, ethics, legislation, circulars", status: "Available" }
          ]
        },
        {
          icon: "💼",
          name: "Finance",
          items: [
            { name: "Banks / fintech", detail: "", desc: "Accounts, cards, loans, KYC — citation-backed", status: "Available" },
            { name: "Insurance (general)", detail: "", desc: "Benefits, claims, damages, notifications", status: "Available" },
            { name: "Real estate / property mgmt", detail: "", desc: "Contracts, ENFIA, leases, E9", status: "Available" },
            { name: "Investment platforms", detail: "", desc: "Investor Q&A: prospectus, taxation — all cited", status: "Available" }
          ]
        },
        {
          icon: "🌐",
          name: "Others",
          items: [
            { name: "Energy / utilities", detail: "DEI, EYDAP, gas providers", desc: "Bills, pricing, social tariffs, provider switching", status: "Available" },
            { name: "Telecom / ISPs", detail: "", desc: "Plans, charges, technical, portability", status: "Available" },
            { name: "Retail / e-commerce", detail: "", desc: "Pre-sale Q&A · Post-sale: returns, warranties", status: "Available" },
            { name: "Religious organizations", detail: "dioceses, NGOs", desc: "Events, sacraments, charity programs", status: "Available" },
            { name: "Trade unions", detail: "", desc: "Labor rights, insurance, legal support", status: "Available" },
            { name: "Diaspora / Greeks abroad", detail: "", desc: "Pensions abroad, dual citizenship, consular procedures", status: "Available" }
          ]
        }
      ]
    },
    // Green AI
    greenAI: {
      title: "Green & Reliable AI",
      subtitle: "The greenest token is the one you never generate. We build bots that are cheap to run and cheap on energy — without sacrificing frontier model quality.",
      ladderTitle: "The principle: escalation ladder",
      ladderSubtitle: "Every query is served at the cheapest level that can answer it correctly. It escalates only when the previous level declares uncertainty.",
      steps: [
        { level: "1", title: "Cache", description: "Has a similar question already been answered? Return it. One cheap embedding, zero generation.", color: "green" },
        { level: "2", title: "Symbolic", description: "Factual/relational query; Classifier routes to DB or knowledge graph. Zero hallucination, exact result.", color: "green" },
        { level: "3", title: "Small model", description: "In-domain, routine NL; Quantized, domain-tuned small model. Often better than a generic giant model, at 1/10 the energy.", color: "gold" },
        { level: "4", title: "Frontier", description: "Truly novel or reasoning-heavy; We call the best available model. We don't waste it on 'what time do you close'.", color: "coral" }
      ],
      disclaimer: "This is not a quality compromise. Symbolic lookups give exact answers instead of probabilistic guesses. Templated responses don't drift. And we reserve the frontier for queries that truly need it.",
      cards: [
        { title: "We measure, not claim", desc: "Self-hosted: real energy from GPU + CPU, live grid carbon intensity. Energy & CO₂ per query, attributed across pipeline." },
        { title: "Headline metric", desc: "What percentage of traffic was served at which tier. The lower on the ladder, the greater the economy." },
        { title: "Economic retrieval", desc: "Cache-augmented generation for small stable corpora. KV-caching static prompt prefixes. Top-2 retrieval. Fewer tokens, same answers." }
      ]
    },
    // Who It's For (Homepage) — now chatbot focused
    whoItsFor: {
      title: "Who it's for",
      items: [
        "Healthcare institutions & NGOs",
        "Public sector & local government",
        "Tourism & hospitality",
        "Customer-facing businesses at scale"
      ]
    },
    // How We Work
    howWeWork: {
      title: "How we work",
      steps: [
        "We map your needs, content, and information flows.",
        "We test solutions in real scenarios with measurements and feedback.",
        "We deliver a pilot on your domain in 4 weeks."
      ]
    },
    learningLoop: {
      index: "06",
      title: "What makes <em class=\"brand-dialogos\">DialogosAI</em> stand out?",
      lead: "<em class=\"brand-dialogos\">DialogosAI</em> improves with every interaction. Every conversation feeds a continuous improvement loop: analyze, train, test, and further develop.",
      body: "<em class=\"brand-dialogos\">DialogosAI</em> ultimately becomes the dialogue you want to have with the people your organization serves, with responses growing more accurate, more useful, and better aligned with their real needs.",
      aria: "Continuous improvement cycle",
      steps: ["Analyze", "Train", "Test", "Deploy"]
    },
    insightsDashboard: {
      overline: "Insights for organizations",
      title: "What do people actually need?",
      lead: "Hear people's needs at scale.",
      body: "Anonymous conversations reveal what users ask for, where they struggle, and what information is missing — without turning support into impersonal numbers.",
      aria: "DialogosAI analytics dashboard preview",
      nav: [
        "Most popular need categories",
        "New or rising topics",
        "Questions not answered adequately",
        "Cases escalated to a human",
        "Points where users struggle",
        "Most-used sources",
        "Automatic updates & new sources"
      ]
    },
    controlledImprovement: {
      overline: "Improvement with control",
      title: "Improves with real needs — always under your control.",
      lead: "Conversations surface knowledge gaps and generate concrete improvement recommendations. But nothing ships without verification.",
      body: "Improvement does not mean “secretly training on personal conversations”. It means analyzing anonymous patterns, identifying what’s missing, and building updates that go through review, testing, and approval.",
      guards: [
        "Anonymous, aggregated insights — no personal data stored by default.",
        "Improvement suggestions reviewed by your team (human review).",
        "Tested on real scenarios before enabling (QA & safety).",
        "Approval before every change — you decide what goes live."
      ],
      flywheel: {
        aria: "DialogosAI controlled improvement flywheel",
        gate: "Review & Approval",
        gateSub: "Review, test, approve before production",
        steps: [
          { kicker: "Conversations", title: "Anonymous patterns of needs & friction" },
          { kicker: "Gaps", title: "What’s missing, confusing, or changing" },
          { kicker: "Updates", title: "Sources, guidance flows, safety rules" },
          { kicker: "Release", title: "New version — with measurable impact" }
        ]
      }
    },
    // Obstacles
    obstacles: {
      title: "Obstacles we all encounter",
      items: [
        "Social inequalities in access to information (language, disability, literacy).",
        "Digital barriers and complex processes that confuse rather than help.",
        "Cultural barriers and misinformation in critical moments.",
        "Lack of continuous support when we need it."
      ]
    },
    // AI Capabilities
    aiCapabilities: {
      title: "Artificial Intelligence today: capabilities & limits",
      capabilities: {
        title: "Capabilities",
        text: "AI is fundamentally changing the possibilities of information, communication, marketing, education, organization, individual empowerment, and social cohesion."
      },
      limits: {
        title: "Limits & Risks",
        text: "At the same time, it brings risks: inaccuracies ('hallucinations'), reproduction or reinforcement of biases, flattery towards users, and more impersonal communication."
      }
    },
    // Mission
    mission: {
      title: "Our mission",
      text: "To create human-centered AI applications — technology centered on people and society, solving problems to the extent they serve real human needs. We mediate between human needs and artificial intelligence, together with domain experts, bringing AI to the measure of every organization."
    },
    // Values
    values: {
      title: "Values",
      items: [
        {
          title: "Human-Centered Technology",
          text: "Technology enhances, it does not replace human relationships. We design AI with people at the center."
        },
        {
          title: "Social Contribution",
          text: "We focus on real needs, empowering communities and improving quality of life."
        },
        {
          title: "Empathy in Innovation",
          text: "We start from human needs. Our solutions listen to them, understand them, and adapt to serve them."
        },
        {
          title: "Empowering Technology",
          text: "We provide practical tools where needed: simple • reliable • measurable."
        }
      ]
    },
    // Philosophy
    philosophy: {
      title: "Our philosophy",
      vision: {
        title: "Philosophy & Vision",
        text: "AI for people. We envision a reality where AI serves human needs responsibly and builds bridges of understanding in human communities."
      },
      whatWeDo: {
        title: "What we do",
        items: [
          {
            title: "1) We co-shape",
            text: "With organizations, bodies, and businesses, AI systems that understand, show empathy, and communicate naturally, with real social impact and respect for human communication."
          },
          {
            title: "2) We design",
            text: "Holistic, accessible applications for health, education, cultural mediation, and other sectors where AI can support human needs."
          },
          {
            title: "3) We strengthen",
            text: "Social cohesion, we mitigate social inequalities, promote inclusion, and improve people's daily lives."
          }
        ]
      }
    },
    // About
    about: {
      title: "Who we are",
      text: "We are a Greek startup with an interdisciplinary team of researchers, developers, and professionals in the fields of Artificial Intelligence, Linguistics, and Software Development. Our experience in research, application development, and sales helps us deeply understand people's needs and create customized and reliable Artificial Intelligence systems."
    },
    // Products — kept for SimasiaChatbots product page
    products: {
      title: "SimasiaChatbots",
      chatbots: {
        name: "SimasiaChatbots",
        title: "Digital Navigators — AI that proves it's right",
        offers: "What we offer",
        features: [
          "Legal compliance with the EU AI Act, no black boxes.",
          "Accessibility by design: WCAG-oriented, alternative input/output methods.",
          "Natural Greek language usage — including Greek dialects (Cypriot, Pontic).",
          "Multilingual: 20+ European and global languages.",
          "Safety guardrails for crisis situations — EKAV 166, Life Line 1018 automatically.",
          "Hallucination reduction through RAG with citations in every answer.",
          "Eco-friendly: escalation ladder that saves energy without sacrificing quality.",
          "Accurate information on trained content — documented sources.",
          "Adaptation to the style and specific guidelines of each organization.",
          "Function as digital navigators — they don't just answer, they guide."
        ]
      },
      studio: {
        name: "SimasiaStudio",
        title: "Documented translation, editing with responsibility",
        offers: "What we offer",
        features: [
          "Upload and selection of style guides for translation and text editing.",
          "Access to approved terminology/glossaries.",
          "Editing of Greek texts with the Triantafyllidis Dictionary.",
          "Detailed correction suggestions and export of \"Track Changes\" files (DOCX/PDF).",
          "Specialized translation/editing by field.",
          "Bulk processing and connections (Google Drive/Dropbox/S3).",
          "Adjustable sensitivity to gender biases, social groups, stereotypes.",
          "Customized spelling/grammar check for EL/EN and Greek dialects."
        ]
      },
      daily: {
        name: "SimasiaDaily",
        title: "Small and reliable tools, big difference.",
        offers: "What we offer",
        toolCategories: []
      },
      edu: {
        name: "SimasiaEdu",
        title: "Exam topics, corrections, explanations, and solutions with consistency",
        offers: "What we offer",
        features: []
      }
    },
    // Target Audience
    targetAudience: {
      title: "Who It's For",
      audienceCards: [
        { 
          title: "Healthcare Organizations & NGOs", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        },
        { 
          title: "Public Sector & Local Government", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        },
        { 
          title: "Tourism & Hospitality", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        },
        { 
          title: "Enterprise & Financial Services", 
          product: "SimasiaChatbots",
          link: "/applications/simasia-chatbots"
        }
      ]
    },
    // Collaborations
    collaborations: {
      title: "Collaborations",
      home: {
        headline: "<strong>Pyxida</strong> is already deployed in organizations with social impact",
        paragraph1: "Our collaborations include the Cancer Guidance Center (Myrto), POAMSKP (SKP-i), while we are charting a shared path for two more <strong>Pyxida</strong> instances together with Bpanheroes and Perfectaki Able.",
        paragraph2: "We work in regulated-risk AI sectors where accuracy, accessibility, and human escalation are critical — health, education, and social services.",
        paragraph3: "Together we deliver clear answers to complex processes, knowledge transparency from approved sources, and digital inclusion for communities that need it. For this responsible and reliable deployment, <strong>Pyxida</strong> can be adapted to a wide range of fields where user guidance is needed.",
        viewAll: "View all collaborations →"
      },
      current: {
        title: "Collaborations",
        contact: "Contact for access",
        bookDemo: "Book demo",
        items: [
          {
            name: "Cancer Guidance Center (K3)",
            description: "The \"Myrto\" Digital Health Navigator provides trusted guidance and timely information for patients and their families.",
            logo: "/Collaborations/Logos/Kapa3_logo.png",
            category: "health"
          },
          {
            name: "Panhellenic Federation of Persons with Multiple Sclerosis (POAMSKP)",
            description: "The \"SKP-i\" supportive chatbot delivers reliable information and everyday digital support for the MS community.",
            logo: "/Collaborations/Logos/poamsk_logo.png",
            category: "health"
          },
          {
            name: "Bpanheroes",
            description: "Digital navigator for the BPAN community — in progress.",
            logo: "/logos/bepan.png",
            category: "health"
          },
          {
            name: "Perfectaki Able",
            description: "Digital navigator for accessible education — in progress.",
            logo: "/logos/perfectaki.png",
            category: "education"
          }
        ]
      },
      process: {
        title: "How we collaborate",
        steps: [
          { title: "Exploration", desc: "We map your needs, content, and information flows." },
          { title: "Pilot application", desc: "We test solutions in real scenarios, make measurements, extract results, and receive feedback." },
          { title: "Production integration & Integration", desc: "We adapt solutions to your environment, train your team, SSO/CRM/Helpdesk." },
          { title: "Support & Evolution", desc: "We offer continuous support and the ability to evolve applications." }
        ]
      },
      achievements: {
        title: "What we achieve together",
        items: [
          "Clear answers to frequent questions/complex procedures.",
          "Knowledge transparency with documentation from approved sources.",
          "Accessibility & inclusion in digital communication.",
          "Community empowerment (health, education, social services, culture, etc.)",
          "Smooth integration into existing flows and systems."
        ]
      },
      commitment: "\\SimasiaAI\\ undertakes projects when there is a clear social orientation: co-design with experts and communities, accessibility from design, multilingualism/cultural competence, documented sources, and human escalation where needed."
    },
    // Footer
    footer: {
      tagline: "",
      navigation: "Navigation",
      contact: "Contact",
      social: "Social Media",
      location: "Athens, Greece",
      poweredBy: "Powered by Empathy",
      established: "Est. 2025",
      copyright: "SimasiaAI — The Human Standard"
    },
    // CTA
    cta: {
      title: "Bring 3 real questions from your users.",
      subtitle: "30-minute demo call. Our chatbot will answer them live with cited sources. If it convinces you, we start a pilot on your domain in 4 weeks.",
      button: "Book demo →"
    },
    // Contact Form
    contactForm: {
      title: "Contact Form",
      subtitle: "Bring 3 real questions from your users. We respond within 24 hours.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      organizationType: "Organization/Type",
      selectOption: "Select...",
      organization: "Business",
      organization2: "Organization",
      organization3: "Entity",
      organization4: "Other",
      companyName: "Company Name",
      description: "Brief description of need/idea",
      descriptionPlaceholder: "Describe your need or the solution you envision...",
      attachment: "(Optional) File/Link",
      attachmentPlaceholder: "https://...",
      submit: "Submit Request",
      submitting: "Submitting...",
      successMessage: "Your message has been sent successfully! We will contact you soon.",
      errorMessage: "There was a problem sending. Please try again or contact us at contact@simasiaai.gr",
      privacyNote: "By submitting, you agree that we will contact you regarding your request. Your information is not shared with third parties."
    }
  }
};

export const translations = mergeExtraUi(baseTranslations.el, baseTranslations.en);
