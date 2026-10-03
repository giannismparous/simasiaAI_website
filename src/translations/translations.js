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
      collaborations: "Συνεργασίες",
      bookDemo: "Ας συνεργαστούμε"
    },
    // Collaborations
    collaborations: {
      title: "Συνεργασίες",
      home: {
        headline: "Το <strong>fλow</strong> υλοποιείται ήδη σε οργανισμούς με κοινωνικό αντίκτυπο",
        paragraph1: "Οι συνεργασίες μας περιλαμβάνουν το Κέντρο Καθοδήγησης Καρκινοπαθών (Μυρτώ), την ΠΟΑμΣΚΠ (ΣΚΠ-i), ενώ χαράσσουμε κοινή πορεία για άλλους δύο <strong>DialogosAI</strong> μαζί με την Bpanheroes και το Perfectaki Able.",
        paragraph2: "Εργαζόμαστε σε τομείς Τεχνητής Νοημοσύνης ρυθμιζόμενου ρίσκου όπου η ακρίβεια, η προσβασιμότητα και η ανθρώπινη κλιμάκωση είναι κρίσιμες, όπως η υγεία, η εκπαίδευση και οι κοινωνικές υπηρεσίες.",
        paragraph3: "Μαζί πετυχαίνουμε σαφείς απαντήσεις σε σύνθετες διαδικασίες, διαφάνεια γνώσης από εγκεκριμένες πηγές και ψηφιακή ένταξη για κοινότητες που το χρειάζονται. Γι' αυτήν την υπεύθυνη και αξιόπιστη εφαρμογή, το <strong>DialogosAI</strong> μπορεί να προσαρμοστεί σε μεγάλο εύρος πεδίων όπου χρειάζεται καθοδήγηση χρηστών.",
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
            description: "BPAN Companion: βοηθός σε 60 γλώσσες για οικογένειες που ζουν με τη σπάνια νόσο BPAN. Σε λειτουργία.",
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
      collaborations: "Collaborations",
      bookDemo: "Let's collaborate"
    },
    // Collaborations
    collaborations: {
      title: "Collaborations",
      home: {
        headline: "<strong>fλow</strong> already runs in organisations with social impact",
        paragraph1: "Our collaborations include the Cancer Guidance Center (Myrto), POAMSKP (SKP-i), while we are charting a shared path for two more <strong>DialogosAI</strong> instances together with Bpanheroes and Perfectaki Able.",
        paragraph2: "We work in regulated-risk AI sectors where accuracy, accessibility, and human escalation are critical — health, education, and social services.",
        paragraph3: "Together we deliver clear answers to complex processes, knowledge transparency from approved sources, and digital inclusion for communities that need it. For this responsible and reliable deployment, <strong>DialogosAI</strong> can be adapted to a wide range of fields where user guidance is needed.",
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
            description: "BPAN Companion: an assistant in 60 languages for families living with the rare disease BPAN. Live.",
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
  }
};

export const translations = mergeExtraUi(baseTranslations.el, baseTranslations.en);
