import React, { useCallback, useEffect, useRef, useState } from 'react';
import './FlowDemos.css';

/* DialogosAI live demo: a scripted conversation that shows what happens
   behind every answer (source, rules, and the ripple into PraxisAI and MetronAI).
   Self-contained: React hooks + FlowDemos.css, no storage, no network. */

const CHANNELS = [
  { id: 'site', name: 'Site', color: '#6a9bcc' },
  { id: 'viber', name: 'Viber', color: '#7360f2' },
  { id: 'whatsapp', name: 'WhatsApp', color: '#25d366' },
];

const COPY = {
  el: {
    status: 'Απαντά 24/7 · AI',
    via: 'μέσω',
    ask: 'Ρωτήστε κάτι',
    askHint: 'Πατήστε μια ερώτηση. Δείτε την απάντηση και τι γίνεται πίσω της.',
    otherLang: 'Και σε άλλη γλώσσα',
    what: 'Τι μόλις έγινε',
    whatEmpty: 'Διαλέξτε μια ερώτηση. Εδώ θα δείτε τι έκανε το DialogosAI πίσω από την απάντηση.',
    reset: 'Νέα συζήτηση',
    typing: 'Ο βοηθός γράφει',
    input: 'Γράψτε ή διαλέξτε μια ερώτηση δεξιά',
    inputNarrow: 'Γράψτε ή διαλέξτε μια ερώτηση',
    quick: 'Γρήγορες ερωτήσεις',
    send: 'Αποστολή',
    source: 'Πηγή',
    you: 'Εσείς',
    foot: 'Το DialogosAI δηλώνει ότι είναι AI · απαντά μόνο από εγκεκριμένες πηγές · μπορεί να κάνει λάθη, γι᾽ αυτό ελέγχουμε κάθε μήνα',
    sample: 'Παράδειγμα',
    flowTitle: 'Μία ροή',
    flow: [
      { k: 'dialogos', name: 'DialogosAI', role: 'Λόγος', unit: ['απάντηση', 'απαντήσεις'] },
      { k: 'praxis', name: 'PraxisAI', role: 'Πράξη', unit: ['ενέργεια', 'ενέργειες'] },
      { k: 'metron', name: 'MetronAI', role: 'Καταγραφή', unit: ['καταγραφή', 'καταγραφές'] },
    ],
    chatLabel: 'Συνομιλία με τον βοηθό',
    channelLabel: 'Κανάλι',
    pickSlot: 'Διαλέξτε ώρα',
  },
  en: {
    status: 'Replies 24/7 · AI',
    via: 'via',
    ask: 'Ask something',
    askHint: 'Tap a question. See the answer and what happens behind it.',
    otherLang: 'In another language too',
    what: 'What just happened',
    whatEmpty: 'Pick a question. Here you will see what DialogosAI did behind the answer.',
    reset: 'New conversation',
    typing: 'The assistant is typing',
    input: 'Type, or pick a question on the right',
    inputNarrow: 'Type, or pick a question',
    quick: 'Quick questions',
    send: 'Send',
    source: 'Source',
    you: 'You',
    foot: 'DialogosAI says it is an AI · answers only from approved sources · it can make mistakes, so we review it every month',
    sample: 'Example',
    flowTitle: 'One flow',
    flow: [
      { k: 'dialogos', name: 'DialogosAI', role: 'Logos', unit: ['answer', 'answers'] },
      { k: 'praxis', name: 'PraxisAI', role: 'Praxis', unit: ['action', 'actions'] },
      { k: 'metron', name: 'MetronAI', role: 'Record', unit: ['record', 'records'] },
    ],
    chatLabel: 'Conversation with the assistant',
    channelLabel: 'Channel',
    pickSlot: 'Pick a time',
  },
};

/* ---------- scripted content (fictional organisations and people) ---------- */

const CONTENT = {
  ngo: {
    el: {
      assistant: 'Βοηθός του Συλλόγου Αλκυόνη',
      greeting: 'Γεια σας! Είμαι ο ψηφιακός βοηθός του Συλλόγου Αλκυόνη. Είμαι AI και απαντώ μόνο από τους οδηγούς του Συλλόγου. Πώς μπορώ να βοηθήσω;',
      chips: [
        {
          id: 'kepa',
          q: 'Πώς βγάζω πιστοποίηση αναπηρίας από ΚΕΠΑ;',
          a: 'Τρία βήματα:\n1. Ο θεράπων γιατρός σας εκδίδει ηλεκτρονική γνωμάτευση.\n2. Κάνετε την αίτηση στο gov.gr με τους κωδικούς Taxisnet.\n3. Σας καλούν σε υγειονομική επιτροπή ΚΕΠΑ. Πάρτε μαζί όλες τις εξετάσεις σας.\nΑν θέλετε, η κοινωνική λειτουργός του Συλλόγου σάς βοηθά με την αίτηση.',
          src: 'Οδηγός ΚΕΠΑ του Συλλόγου, σ. 3',
          ripples: [{ k: 'metron', t: 'θέμα «ΚΕΠΑ» +1' }],
          explain: [
            'Απάντησε μόνο από τον Οδηγό ΚΕΠΑ που ανέβασε ο Σύλλογος.',
            'Έδειξε την πηγή, για να μπορεί ο άνθρωπος να την ελέγξει.',
            'Το MetronAI κατέγραψε το θέμα. Έτσι βλέπετε τι ρωτούν περισσότερο.',
          ],
        },
        {
          id: 'psy',
          q: 'Μπορεί να με δει η ψυχολόγος αυτή την εβδομάδα;',
          a: 'Η κ. Μαρκάκη έχει δύο ελεύθερες ώρες αυτή την εβδομάδα. Διαλέξτε όποια σας βολεύει:',
          src: 'Ημερολόγιο PraxisAI, σε πραγματικό χρόνο',
          ripples: [{ k: 'metron', t: 'θέμα «Ψυχολογική στήριξη» +1' }],
          explain: [
            'Δεν μάντεψε: διάβασε τις ελεύθερες ώρες από το PraxisAI.',
            'Προτείνει επιλογές. Ο άνθρωπος αποφασίζει.',
            'Διαλέξτε μια ώρα μέσα στη συζήτηση για να δείτε την κράτηση.',
          ],
          slots: [
            { label: 'Τετάρτη 11:00', reply: {
              a: 'Έγινε! Σας περιμένει η κ. Μαρκάκη την Τετάρτη στις 11:00, στο γραφείο του Συλλόγου. Θα λάβετε υπενθύμιση με SMS μία μέρα πριν.',
              ripples: [{ k: 'praxis', t: 'αίτημα ραντεβού καταχωρίστηκε · Αρ. πρωτ. 2026/0145' }],
              explain: [
                'Η κράτηση πήρε αριθμό πρωτοκόλλου, χωρίς να σηκώσει κανείς τηλέφωνο.',
                'Η ψυχολόγος βλέπει το ραντεβού στο ημερολόγιό της στο PraxisAI.',
                'Η υπενθύμιση φεύγει αυτόματα, για λιγότερα χαμένα ραντεβού.',
              ],
            } },
            { label: 'Πέμπτη 17:30', reply: {
              a: 'Έγινε! Σας περιμένει η κ. Μαρκάκη την Πέμπτη στις 17:30, στο γραφείο του Συλλόγου. Θα λάβετε υπενθύμιση με SMS μία μέρα πριν.',
              ripples: [{ k: 'praxis', t: 'αίτημα ραντεβού καταχωρίστηκε · Αρ. πρωτ. 2026/0145' }],
              explain: [
                'Η κράτηση πήρε αριθμό πρωτοκόλλου, χωρίς να σηκώσει κανείς τηλέφωνο.',
                'Η ψυχολόγος βλέπει το ραντεβού στο ημερολόγιό της στο PraxisAI.',
                'Η υπενθύμιση φεύγει αυτόματα, για λιγότερα χαμένα ραντεβού.',
              ],
            } },
          ],
        },
        {
          id: 'greeklish',
          q: 'pws kanw egrafi melos?',
          note: 'Κατάλαβε Greeklish',
          a: 'Η εγγραφή μέλους γίνεται με μια απλή φόρμα, στο γραφείο ή online. Χρειάζεστε την ταυτότητά σας και, αν υπάρχει, τη γνωμάτευση ΚΕΠΑ. Η ετήσια συνδρομή είναι 20 €, για ανέργους δωρεάν. Θέλετε να σας στείλω τη φόρμα εδώ;',
          src: 'Οδηγός Μελών, άρθρο 4',
          ripples: [{ k: 'metron', t: 'θέμα «Εγγραφή μέλους» +1' }],
          explain: [
            'Κατάλαβε Greeklish και απάντησε σε κανονικά ελληνικά.',
            'Τα ποσά τα πήρε από τον Οδηγό Μελών, όχι «από μνήμης».',
            'Πολλοί γράφουν από το κινητό με λατινικούς χαρακτήρες. Δεν χάνεται κανείς.',
          ],
        },
        {
          id: 'urgent',
          q: 'Ο πατέρας μου έπεσε και δεν σηκώνεται',
          urgent: true,
          note: 'Επείγον · σε άνθρωπο',
          a: 'Καλέστε τώρα το 166 (ΕΚΑΒ) ή το 112. Ειδοποιώ ταυτόχρονα την ομάδα του Συλλόγου. Η Ελένη θα σας πάρει τηλέφωνο σε λίγα λεπτά.',
          src: 'Πρωτόκολλο επειγόντων του Συλλόγου',
          ripples: [
            { k: 'praxis', t: 'επείγον προς Ελένη (υπεύθυνη)' },
            { k: 'metron', t: 'παραδόθηκε σε άνθρωπο +1' },
          ],
          explain: [
            'Τα επείγοντα πάνε πάντα σε άνθρωπο.',
            'Πρώτα το 166 και το 112: καμία καθυστέρηση, καμία περιττή ερώτηση.',
            'Η Ελένη ειδοποιήθηκε αμέσως, με όλη τη συζήτηση μπροστά της.',
          ],
        },
      ],
      lang: {
        id: 'lang',
        q: 'Do you speak English?',
        note: 'Απαντά στη γλώσσα του ανθρώπου',
        foreign: 'en',
        a: 'Yes, of course. I can help you in English, Greek and several other languages. What would you like to know about the Association?',
        ripples: [{ k: 'metron', t: 'γλώσσα «Αγγλικά» +1' }],
        explain: [
          'Απαντά στη γλώσσα που του γράφουν.',
          'Οι πηγές μένουν ίδιες: μεταφράζει, δεν επινοεί.',
          'Το MetronAI μετρά τις γλώσσες για την αναφορά αντικτύπου.',
        ],
      },
    },
    en: {
      assistant: 'Alkyoni Association assistant',
      greeting: 'Hello! I am the digital assistant of the Alkyoni Association. I am an AI and I answer only from the Association’s own guides. How can I help?',
      chips: [
        {
          id: 'kepa',
          q: 'How do I get a disability certificate from KEPA?',
          a: 'Three steps:\n1. Your treating doctor issues an electronic medical opinion.\n2. You apply on gov.gr with your Taxisnet credentials.\n3. You are invited to a KEPA medical board. Bring all your test results.\nIf you like, the Association’s social worker can help you with the application.',
          src: 'Association KEPA guide, p. 3',
          ripples: [{ k: 'metron', t: 'topic “KEPA” +1' }],
          explain: [
            'It answered only from the KEPA guide the Association uploaded.',
            'It showed the source, so the person can check it.',
            'MetronAI recorded the topic, so you see what people ask most.',
          ],
        },
        {
          id: 'psy',
          q: 'Can the psychologist see me this week?',
          a: 'Ms Markaki has two free slots this week. Pick the one that suits you:',
          src: 'PraxisAI calendar, in real time',
          ripples: [{ k: 'metron', t: 'topic “Psychological support” +1' }],
          explain: [
            'No guessing: it read the free slots from PraxisAI.',
            'It offers options. The person decides.',
            'Pick a time inside the chat to see the booking.',
          ],
          slots: [
            { label: 'Wednesday 11:00', reply: {
              a: 'Done! Ms Markaki will see you on Wednesday at 11:00, at the Association office. You will get an SMS reminder the day before.',
              ripples: [{ k: 'praxis', t: 'appointment request logged · Ref. 2026/0145' }],
              explain: [
                'The booking got a reference number, with no phone call.',
                'The psychologist sees it in her PraxisAI calendar.',
                'The reminder goes out by itself, so fewer appointments are missed.',
              ],
            } },
            { label: 'Thursday 17:30', reply: {
              a: 'Done! Ms Markaki will see you on Thursday at 17:30, at the Association office. You will get an SMS reminder the day before.',
              ripples: [{ k: 'praxis', t: 'appointment request logged · Ref. 2026/0145' }],
              explain: [
                'The booking got a reference number, with no phone call.',
                'The psychologist sees it in her PraxisAI calendar.',
                'The reminder goes out by itself, so fewer appointments are missed.',
              ],
            } },
          ],
        },
        {
          id: 'greeklish',
          q: 'pws kanw egrafi melos?',
          note: 'Understood Greeklish',
          a: 'Membership sign-up is a short form, at the office or online. You need your ID and, if you have it, your KEPA decision. The yearly fee is €20, free for unemployed members. Shall I send you the form here?',
          src: 'Members’ guide, article 4',
          ripples: [{ k: 'metron', t: 'topic “Membership” +1' }],
          explain: [
            'It understood Greeklish (Greek typed in Latin letters). In Greek it replies in proper Greek.',
            'The amounts come from the members’ guide, not “from memory”.',
            'Many people type on their phone in Latin letters. Nobody gets lost.',
          ],
        },
        {
          id: 'urgent',
          q: 'My father fell and can’t get up',
          urgent: true,
          note: 'Urgent · to a human',
          a: 'Call 166 (ambulance) or 112 now. I am alerting the Association team at the same time. Eleni will call you within a few minutes.',
          src: 'Association emergency protocol',
          ripples: [
            { k: 'praxis', t: 'urgent case to Eleni (coordinator)' },
            { k: 'metron', t: 'handed to a human +1' },
          ],
          explain: [
            'Urgent cases always go to a human.',
            '166 and 112 first: no delay, no needless questions.',
            'Eleni was alerted at once, with the whole conversation in front of her.',
          ],
        },
      ],
      lang: {
        id: 'lang',
        q: 'Vous parlez français ?',
        note: 'Replies in the person’s language',
        foreign: 'fr',
        a: 'Oui, bien sûr. Je peux vous aider en français, en grec, en anglais et dans d’autres langues. Que souhaitez-vous savoir sur l’Association ?',
        ripples: [{ k: 'metron', t: 'language “French” +1' }],
        explain: [
          'It replies in the language people write in.',
          'The sources stay the same: it translates, it does not invent.',
          'MetronAI counts languages for the impact report.',
        ],
      },
    },
  },
  med: {
    el: {
      assistant: 'Βοηθός του Ιατρείου Δρ. Νικολάου',
      greeting: 'Γεια σας! Είμαι ο ψηφιακός βοηθός του ιατρείου του Δρ. Νικολάου. Είμαι AI: κλείνω ραντεβού και απαντώ σε πρακτικές ερωτήσεις, όχι σε ιατρικές. Πώς μπορώ να βοηθήσω;',
      chips: [
        {
          id: 'sat',
          q: 'Έχετε ραντεβού το Σάββατο;',
          a: 'Ναι, το Σάββατο ο Δρ. Νικολάου δέχεται 09:00 με 13:00. Υπάρχουν δύο ελεύθερες ώρες:',
          src: 'Ημερολόγιο του ιατρείου, σε πραγματικό χρόνο',
          ripples: [{ k: 'metron', t: 'θέμα «Ραντεβού» +1' }],
          explain: [
            'Είδε τις ελεύθερες ώρες ζωντανά από το PraxisAI.',
            'Η ερώτηση ήρθε εκτός ωραρίου. Χωρίς βοηθό, θα ήταν αναπάντητη κλήση.',
            'Διαλέξτε μια ώρα μέσα στη συζήτηση για να δείτε την κράτηση.',
          ],
          slots: [
            { label: 'Σάββατο 10:30', reply: {
              a: 'Κλείστηκε! Σάββατο στις 10:30 με τον Δρ. Νικολάου. Θα λάβετε επιβεβαίωση με SMS και υπενθύμιση την Παρασκευή.',
              ripples: [
                { k: 'praxis', t: 'ραντεβού Σάββατο 10:30 · επιβεβαίωση με SMS' },
                { k: 'metron', t: 'ραντεβού από επαφή εκτός ωραρίου +1' },
              ],
              explain: [
                'Το ραντεβού μπήκε στο ημερολόγιο, χωρίς τηλέφωνο.',
                'Το SMS επιβεβαίωσης έφυγε αυτόματα από το PraxisAI.',
                'Το MetronAI το μετρά: ραντεβού που αλλιώς θα χανόταν.',
              ],
            } },
            { label: 'Σάββατο 12:00', reply: {
              a: 'Κλείστηκε! Σάββατο στις 12:00 με τον Δρ. Νικολάου. Θα λάβετε επιβεβαίωση με SMS και υπενθύμιση την Παρασκευή.',
              ripples: [
                { k: 'praxis', t: 'ραντεβού Σάββατο 12:00 · επιβεβαίωση με SMS' },
                { k: 'metron', t: 'ραντεβού από επαφή εκτός ωραρίου +1' },
              ],
              explain: [
                'Το ραντεβού μπήκε στο ημερολόγιο, χωρίς τηλέφωνο.',
                'Το SMS επιβεβαίωσης έφυγε αυτόματα από το PraxisAI.',
                'Το MetronAI το μετρά: ραντεβού που αλλιώς θα χανόταν.',
              ],
            } },
          ],
        },
        {
          id: 'price',
          q: 'Πόσο κοστίζει η επίσκεψη; Παίρνετε ΕΟΠΥΥ;',
          a: 'Η επίσκεψη κοστίζει 50 €. Ναι, το ιατρείο είναι συμβεβλημένο με τον ΕΟΠΥΥ: για ραντεβού μέσω ΕΟΠΥΥ φέρτε τον ΑΜΚΑ σας και η επίσκεψη δεν χρεώνεται.',
          src: 'Τιμοκατάλογος 2026 του ιατρείου',
          ripples: [{ k: 'metron', t: 'θέμα «Τιμές και ΕΟΠΥΥ» +1' }],
          explain: [
            'Η τιμή ήρθε από τον Τιμοκατάλογο 2026 που ανεβάσατε.',
            'Αλλάζετε τον τιμοκατάλογο και αλλάζει αμέσως και η απάντηση.',
            'Αν κάτι δεν υπάρχει στις πηγές, το λέει. Δεν το επινοεί.',
          ],
        },
        {
          id: 'greeklish',
          q: 'Ti wra kleinete simera?',
          note: 'Κατάλαβε Greeklish',
          a: 'Σήμερα κλείνουμε στις 20:00. Είμαστε ανοιχτά 09:00 με 14:00 και 17:00 με 20:00. Θέλετε να σας κλείσω ραντεβού;',
          src: 'Ωράριο ιατρείου, ενημέρωση 1/10',
          ripples: [{ k: 'metron', t: 'θέμα «Ωράριο» +1' }],
          explain: [
            'Κατάλαβε Greeklish και απάντησε σε κανονικά ελληνικά.',
            'Το ωράριο το διάβασε από την πιο πρόσφατη ενημέρωση του ιατρείου.',
            'Κλείνει με πρόταση για ραντεβού: η ερώτηση γίνεται επίσκεψη.',
          ],
        },
        {
          id: 'abx',
          q: 'Μπορώ να πάρω αντιβίωση για πονόλαιμο;',
          note: 'Χωρίς ιατρική συμβουλή',
          a: 'Δεν μπορώ να δώσω ιατρική συμβουλή. Μπορώ να σας κλείσω ραντεβού με τον γιατρό, σήμερα στις 18:00;',
          src: 'Κανόνες ασφαλείας του ιατρείου',
          ripples: [{ k: 'metron', t: 'ιατρική ερώτηση · χωρίς συμβουλή +1' }],
          explain: [
            'Ποτέ διάγνωση ή αγωγή.',
            'Αντί για συμβουλή, φέρνει τον άνθρωπο στον γιατρό.',
            'Τους κανόνες τους ορίζετε εσείς και τους ελέγχουμε κάθε μήνα.',
          ],
          slots: [
            { label: 'Ναι, στις 18:00', reply: {
              a: 'Κλείστηκε για σήμερα στις 18:00. Αν δυσκολευτείτε να αναπνεύσετε ή χειροτερέψετε απότομα, καλέστε το 166.',
              ripples: [{ k: 'praxis', t: 'ραντεβού σήμερα 18:00 · σημείωση «πονόλαιμος»' }],
              explain: [
                'Ο γιατρός βλέπει από πριν τον λόγο της επίσκεψης.',
                'Η ώρα κλείστηκε στο PraxisAI, χωρίς τηλέφωνο.',
                'Για ό,τι επείγον, δείχνει πάντα το 166.',
              ],
            } },
          ],
        },
      ],
      lang: {
        id: 'lang',
        q: 'Do you speak English?',
        note: 'Απαντά στη γλώσσα του ανθρώπου',
        foreign: 'en',
        a: 'Yes, of course. I can help in English, Greek and several other languages. Would you like to book a visit with Dr Nikolaou?',
        ripples: [{ k: 'metron', t: 'γλώσσα «Αγγλικά» +1' }],
        explain: [
          'Απαντά στη γλώσσα που του γράφουν.',
          'Ιδανικό για επισκέπτες και τουρίστες, χωρίς επιπλέον προσωπικό.',
          'Το MetronAI μετρά τις γλώσσες: βλέπετε αν χρειάζεστε κάτι παραπάνω.',
        ],
      },
    },
    en: {
      assistant: 'Dr Nikolaou’s practice assistant',
      greeting: 'Hello! I am the digital assistant of Dr Nikolaou’s practice. I am an AI: I book appointments and answer practical questions, not medical ones. How can I help?',
      chips: [
        {
          id: 'sat',
          q: 'Do you have appointments on Saturday?',
          a: 'Yes, on Saturdays Dr Nikolaou sees patients 09:00 to 13:00. There are two free slots:',
          src: 'Practice calendar, in real time',
          ripples: [{ k: 'metron', t: 'topic “Appointments” +1' }],
          explain: [
            'It read the free slots live from PraxisAI.',
            'The question came in after hours. Without the assistant, it was a missed call.',
            'Pick a time inside the chat to see the booking.',
          ],
          slots: [
            { label: 'Saturday 10:30', reply: {
              a: 'Booked! Saturday at 10:30 with Dr Nikolaou. You will get an SMS confirmation and a reminder on Friday.',
              ripples: [
                { k: 'praxis', t: 'appointment Saturday 10:30 · SMS confirmation' },
                { k: 'metron', t: 'booking from after-hours contact +1' },
              ],
              explain: [
                'The appointment went into the calendar, with no phone call.',
                'PraxisAI sent the SMS confirmation by itself.',
                'MetronAI counts it: a booking that would otherwise be lost.',
              ],
            } },
            { label: 'Saturday 12:00', reply: {
              a: 'Booked! Saturday at 12:00 with Dr Nikolaou. You will get an SMS confirmation and a reminder on Friday.',
              ripples: [
                { k: 'praxis', t: 'appointment Saturday 12:00 · SMS confirmation' },
                { k: 'metron', t: 'booking from after-hours contact +1' },
              ],
              explain: [
                'The appointment went into the calendar, with no phone call.',
                'PraxisAI sent the SMS confirmation by itself.',
                'MetronAI counts it: a booking that would otherwise be lost.',
              ],
            } },
          ],
        },
        {
          id: 'price',
          q: 'How much is a visit? Do you take EOPYY?',
          a: 'A visit costs €50. Yes, the practice is contracted with EOPYY, the national insurer: for an EOPYY appointment bring your AMKA number and the visit is free of charge.',
          src: 'Practice price list 2026',
          ripples: [{ k: 'metron', t: 'topic “Prices and insurance” +1' }],
          explain: [
            'The price came from the 2026 price list you uploaded.',
            'Change the price list and the answer changes at once.',
            'If something is not in the sources, it says so. It does not invent.',
          ],
        },
        {
          id: 'greeklish',
          q: 'Ti wra kleinete simera?',
          note: 'Understood Greeklish',
          a: 'Today we close at 20:00. We are open 09:00 to 14:00 and 17:00 to 20:00. Shall I book you an appointment?',
          src: 'Practice hours, updated 1/10',
          ripples: [{ k: 'metron', t: 'topic “Opening hours” +1' }],
          explain: [
            'It understood Greeklish (Greek typed in Latin letters). In Greek it replies in proper Greek.',
            'It read the hours from the practice’s latest update.',
            'It ends with an offer to book: a question becomes a visit.',
          ],
        },
        {
          id: 'abx',
          q: 'Can I take antibiotics for a sore throat?',
          note: 'No medical advice',
          a: 'I cannot give medical advice. Shall I book you an appointment with the doctor, today at 18:00?',
          src: 'Practice safety rules',
          ripples: [{ k: 'metron', t: 'medical question · no advice +1' }],
          explain: [
            'Never a diagnosis or a treatment.',
            'Instead of advice, it brings the person to the doctor.',
            'You set the rules, and we review them every month.',
          ],
          slots: [
            { label: 'Yes, at 18:00', reply: {
              a: 'Booked for today at 18:00. If you have trouble breathing or suddenly get worse, call 166.',
              ripples: [{ k: 'praxis', t: 'appointment today 18:00 · note “sore throat”' }],
              explain: [
                'The doctor sees the reason for the visit in advance.',
                'The slot was booked in PraxisAI, with no phone call.',
                'For anything urgent, it always points to 166.',
              ],
            } },
          ],
        },
      ],
      lang: {
        id: 'lang',
        q: 'Vous parlez français ?',
        note: 'Replies in the person’s language',
        foreign: 'fr',
        a: 'Oui, bien sûr. Je peux vous aider en français, en grec, en anglais et dans d’autres langues. Voulez-vous prendre rendez-vous avec le Dr Nikolaou ?',
        ripples: [{ k: 'metron', t: 'language “French” +1' }],
        explain: [
          'It replies in the language people write in.',
          'Ideal for visitors and tourists, with no extra staff.',
          'MetronAI counts languages, so you see if you need more.',
        ],
      },
    },
  },
};

const RIPPLE_NAME = { praxis: 'PraxisAI', metron: 'MetronAI' };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener('change', on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', on); else mq.removeListener(on); };
  }, []);
  return reduced;
}

function Mark({ size = 34 }) {
  // compass ring with a λ: the DialogosAI assistant mark
  return (
    <svg className="dgd-mark" width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="16" fill="rgba(106,155,204,.16)" />
      <circle cx="17" cy="17" r="12.5" fill="none" stroke="#6a9bcc" strokeWidth="1.3" />
      <path d="M17 2.8v3M17 28.2v3M2.8 17h3M28.2 17h3" stroke="#6a9bcc" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12.6 24.2 16.4 14.6M13.4 10.2c1.6-.3 2.6.3 3.2 1.8l4.8 12.2" fill="none" stroke="#faf9f5" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 7.4 5.8 10 11 4.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

let uid = 0;
const nextId = () => { uid += 1; return `m${uid}`; };

export default function DialogosDemo({ lang = 'el', ed = 'ngo' }) {
  const L = lang === 'en' ? 'en' : 'el';
  const E = ed === 'med' ? 'med' : 'ngo';
  const t = COPY[L];
  const data = CONTENT[E][L];
  const reduced = usePrefersReducedMotion();

  const [channel, setChannel] = useState('site');
  const [msgs, setMsgs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [explain, setExplain] = useState(null);
  const [asked, setAsked] = useState({});
  const [counts, setCounts] = useState({ dialogos: 0, praxis: 0, metron: 0 });
  const [announce, setAnnounce] = useState('');

  const timers = useRef(new Set());
  const bodyRef = useRef(null);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => { timers.current.delete(id); fn(); }, ms);
    timers.current.add(id);
  }, []);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setMsgs([]);
    setBusy(false);
    setExplain(null);
    setAsked({});
    setCounts({ dialogos: 0, praxis: 0, metron: 0 });
    setAnnounce('');
  }, [clearTimers]);

  // a new edition or language starts a fresh conversation
  useEffect(() => { reset(); }, [E, L, reset]);

  // keep the newest message in view, inside the chat only (never scroll the page)
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reducedRef.current ? 'auto' : 'smooth' });
  }, [msgs]);

  const patch = useCallback((id, fn) => setMsgs((list) => list.map((m) => (m.id === id ? { ...m, ...fn(m) } : m))), []);

  const runTurn = useCallback((userText, bot) => {
    const fast = reducedRef.current;
    setBusy(true);
    const uId = nextId();
    const tId = nextId();
    setMsgs((list) => [...list, { id: uId, role: 'user', text: userText }]);

    later(() => setMsgs((list) => [...list, { id: tId, role: 'typing' }]), fast ? 60 : 380);

    later(() => {
      const tokens = bot.a.match(/\S+\s*/g) || [bot.a];
      const bId = nextId();
      setExplain({ key: bId, rows: bot.explain, note: bot.note, urgent: bot.urgent });
      setMsgs((list) => [
        ...list.filter((m) => m.id !== tId),
        {
          id: bId, role: 'bot', tokens, shown: fast ? tokens.length : 0, done: false,
          src: bot.src, note: bot.note, urgent: bot.urgent, foreign: bot.foreign,
          ripples: bot.ripples || [], rShown: 0, slots: bot.slots || null, picked: null,
        },
      ]);

      const finish = () => {
        patch(bId, () => ({ done: true }));
        setCounts((c) => ({ ...c, dialogos: c.dialogos + 1 }));
        setAnnounce(bot.a);
        const rip = bot.ripples || [];
        let delay = fast ? 0 : 320;
        rip.forEach((r, i) => {
          delay += fast ? 0 : 460;
          later(() => {
            patch(bId, () => ({ rShown: i + 1 }));
            setCounts((c) => ({ ...c, [r.k]: c[r.k] + 1 }));
          }, delay);
        });
        later(() => setBusy(false), delay + (fast ? 0 : 160));
      };

      if (fast) { finish(); return; }
      let i = 0;
      const step = () => {
        i += 1;
        patch(bId, () => ({ shown: i }));
        if (i < tokens.length) later(step, tokens[i - 1].includes('\n') ? 150 : 46);
        else later(finish, 180);
      };
      later(step, 60);
    }, fast ? 120 : 380 + 760);
  }, [later, patch]);

  const ask = (chip) => {
    if (busy) return;
    setAsked((a) => ({ ...a, [chip.id]: true }));
    runTurn(chip.q, chip);
  };

  const pickSlot = (msgId, slot) => {
    if (busy) return;
    patch(msgId, () => ({ picked: slot.label }));
    runTurn(slot.label, slot.reply);
  };

  const ch = CHANNELS.find((c) => c.id === channel) || CHANNELS[0];

  const renderChip = (c) => (
    <button
      key={c.id}
      type="button"
      className={`dgd-chip${asked[c.id] ? ' is-asked' : ''}${c.urgent ? ' is-urgent' : ''}`}
      onClick={() => ask(c)}
      disabled={busy}
    >
      <span className="dgd-chip-q">{c.q}</span>
      <span className="dgd-chip-ic" aria-hidden="true">{asked[c.id] ? <Check /> : '→'}</span>
    </button>
  );

  return (
    <div className="dgd" data-ed={E}>
      <div className="dgd-grid">
        {/* ---------------- chat ---------------- */}
        <div className="dgd-chat" style={{ '--dgd-ch': ch.color }} aria-label={t.chatLabel} role="region">
          <div className="dgd-chat-header">
            <Mark />
            <div className="dgd-who">
              <strong className="dgd-who-name">{data.assistant}</strong>
              <span className="dgd-who-status"><i aria-hidden="true" />{t.status} · {t.via} {ch.name}</span>
            </div>
            <button type="button" className="dgd-reset-btn" onClick={reset} disabled={msgs.length === 0} aria-label={t.reset}>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7a4.5 4.5 0 1 0 1.4-3.3M2.5 1.8v2.4h2.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="dgd-reset-txt">{t.reset}</span>
            </button>
          </div>
          <div className="dgd-channels" role="group" aria-label={t.channelLabel}>
            {CHANNELS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`dgd-ch-btn${c.id === channel ? ' is-on' : ''}`}
                aria-pressed={c.id === channel}
                style={{ '--c': c.color }}
                onClick={() => setChannel(c.id)}
              >
                <i aria-hidden="true" />{c.name}
              </button>
            ))}
          </div>

          <div className="dgd-body" ref={bodyRef} role="log" aria-live="off" tabIndex={0} aria-label={t.chatLabel}>
            <div className="dgd-row is-bot">
              <div className="dgd-bub dgd-bub-bot">{data.greeting}</div>
            </div>
            {msgs.map((m) => {
              if (m.role === 'user') {
                return (
                  <div key={m.id} className="dgd-row is-user">
                    <div className="dgd-bub dgd-bub-user"><span className="dgd-sr">{t.you}: </span>{m.text}</div>
                  </div>
                );
              }
              if (m.role === 'typing') {
                return (
                  <div key={m.id} className="dgd-row is-bot">
                    <div className="dgd-typing" role="status" aria-label={t.typing}><i /><i /><i /></div>
                  </div>
                );
              }
              const text = m.tokens.slice(0, m.shown).join('');
              return (
                <div key={m.id} className={`dgd-row is-bot${m.urgent ? ' is-urgent' : ''}`}>
                  {m.note && <span className="dgd-note-badge">{m.note}</span>}
                  <div className={`dgd-bub dgd-bub-bot${m.urgent ? ' is-urgent' : ''}`} lang={m.foreign || undefined}>
                    {text}
                    {!m.done && <span className="dgd-caret" aria-hidden="true" />}
                  </div>
                  {m.done && m.slots && (
                    <div className="dgd-slots" role="group" aria-label={t.pickSlot}>
                      {m.slots.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          className={`dgd-slot${m.picked === s.label ? ' is-picked' : ''}`}
                          disabled={busy || !!m.picked}
                          aria-pressed={m.picked === s.label}
                          onClick={() => pickSlot(m.id, s)}
                        >
                          {m.picked === s.label && <Check />}{s.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {m.done && m.src && (
                    <span className="dgd-src"><span aria-hidden="true">◆</span> {t.source}: {m.src}</span>
                  )}
                  {m.rShown > 0 && (
                    <div className="dgd-ripples">
                      {m.ripples.slice(0, m.rShown).map((r, i) => (
                        <span key={i} className={`dgd-rip is-${r.k}`}>
                          <span aria-hidden="true">→ </span><b>{RIPPLE_NAME[r.k]}</b>: {r.t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="dgd-sr" aria-live="polite" aria-atomic="true">{announce}</div>

          <div className="dgd-quick" role="group" aria-label={t.quick}>
            {[...data.chips, data.lang].map((c) => (
              <button
                key={c.id}
                type="button"
                className={`dgd-qchip${asked[c.id] ? ' is-asked' : ''}${c.urgent ? ' is-urgent' : ''}`}
                onClick={() => ask(c)}
                disabled={busy}
              >
                {asked[c.id] && <Check />}<span>{c.q}</span>
              </button>
            ))}
          </div>

          <div className="dgd-input" aria-hidden="true">
            <span className="dgd-ph is-wide">{t.input}</span>
            <span className="dgd-ph is-narrow">{t.inputNarrow}</span>
            <span className="dgd-send">
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </div>

        {/* ---------------- side ---------------- */}
        <div className="dgd-side">
          <div className="dgd-card dgd-ask">
            <div className="dgd-side-title">{t.ask}</div>
            <div className="dgd-side-hint">{t.askHint}</div>
            <div className="dgd-chips">{data.chips.map(renderChip)}</div>
            <div className="dgd-sub-title">{t.otherLang}</div>
            <div className="dgd-chips">{renderChip(data.lang)}</div>
          </div>

          <div className={`dgd-card dgd-what${explain && explain.urgent ? ' is-urgent' : ''}`}>
            <div className="dgd-side-title">{t.what}</div>
            {explain ? (
              <ol className="dgd-why" key={explain.key}>
                {explain.rows.map((r, i) => (
                  <li key={i} style={{ '--i': i }}><span className="dgd-why-n" aria-hidden="true">{i + 1}</span><span>{r}</span></li>
                ))}
              </ol>
            ) : (
              <div className="dgd-what-empty">{t.whatEmpty}</div>
            )}

            <div className="dgd-flow" aria-label={t.flowTitle}>
              {t.flow.map((f, i) => (
                <React.Fragment key={f.k}>
                  {i > 0 && <span className="dgd-flow-line" aria-hidden="true" />}
                  <div className={`dgd-flow-node is-${f.k}${counts[f.k] ? ' is-live' : ''}`}>
                    <span className="dgd-flow-role">{f.role}</span>
                    <strong className="dgd-flow-n" key={counts[f.k]}>{counts[f.k]}</strong>
                    <span className="dgd-flow-name">{f.name}</span>
                    <span className="dgd-sr">{f.unit[counts[f.k] === 1 ? 0 : 1]}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dgd-foot">
        <span>{t.foot}</span>
        <span className="dgd-sample-badge">{t.sample}</span>
      </div>
    </div>
  );
}
