/**

 * Scope, jailbreak, and output sanitization (POAMSKP-style, Simasia topics).

 */



import { normalize, getConversationTopic } from './conversationContext.js';

import {

  hasSimasiaTopicSignals,

  queryAlignsWithKnowledge,

  getRetrievalScopeMinScore,

} from './retriever.js';



const OFF_TOPIC_REGEX =

  /μητσοτακ|τσιπρα|παπανδρεου|κυβερνηση|κυβέρνηση|πρωθυπουργ|πολιτικ(?:ος|οι|ους|ων|ου)(?![α-ωa-z])|πολιτικα\s+κομματα|κομμα(?![α-ωa-z])|κόμμα(?![α-ωa-z])|ψηφισω|trump|biden|putin|zelensky|politician|celebrit|διασημο|dating\s+who|ποδοσφαιρ|μπασκετ|weather|recipe|συνταγη\s+για|συνταγες\s+μαγειρ|μουσακα|joke|αστειο|αστείο|gambl|καζινο|sex\b|porn|hack\s|crack\s|malware|ransomware|torrent|bitcoin|crypto|mine\s+crypto|football|gaming|eurovision|ταινια|movie|film\b|oppenheimer|πρωταθλ|champions\s*league|ολυμπιακ|παναθηναικ|παοκ(?![α-ωa-z])|μπαρτσελ|ρεαλ\s+μαδριτ|καιρ(?:ος|ο|ου)(?![α-ωa-z])|θερμοκρασι|βροχ(?:η|ες)(?![α-ωa-z])|temperature|εκλογ|election|ωροσκοπ|ζωδι|horoscope|lotto|τζοκερ|στοιχημ|betting/i;



const GREETING_ONLY_REGEX = /^(γεια|γειά|hello|hi|hey|καλημερα|καλησπερα|καληνυχτα)[\s!.?]*$/i;



const CRISIS_USER_REGEX =

  /suicid|αυτοκτον|σκοτωσω|kill\s+myself|want\s+to\s+die|wanna\s+die|end\s+my\s+life|self[\s-]*harm|hurt\s+myself|what\s+pills\s+should\s+i\s+take|πια\s+χαπια|ποια\s+χαπια|να\s+παρω\s+χαπια|θελω\s+να\s+πεθανω|να\s+πεθανω|δεν\s+θελω\s+να\s+ζω|τελειωσω\s+τη\s+ζωη|βαλω\s+τελος|αυτοτραυματ|κοβομαι|να\s+κοψω\s+τα\s+χερια|thelw\s+na\s+pethanw|na\s+pethano|autoktono/i;



const EXTERNAL_ORG_REGEX =

  /ποαμσκπ|poamskp|msif|helani|kap3|δια\s*ζωσης|dia\s*zosis|myrto|k3\b/i;



const EXTERNAL_ORG_DEEP_REGEX =

  /λεπτομερ|in\s+detail|full\s+clinical|structure\s+in\s+detail|tuition\s+fees|appointment\s+at|ως\s+οργανισμ|not\s+simasia|comparison/i;



export const JAILBREAK_USER_REGEX =

  /(?:αγνοησε|αγνοηστε|ignore\s+(?:all\s+)?(?:previous|prior|above|rules|instructions)|end\s*context|new\s+instructions|^\s*system\s*:|disable\s+safety|answer\s+anything|εισαι\s+τωρα|aiza|\.env\b|(?:your|σας|σου)\s+api\s*keys?|send\s+(?:me\s+)?(?:the\s+)?keys|internal\s+chunk|file\s+paths|full\s+context|disregard\s+(?:all\s+)?(?:the\s+)?(?:rules|instructions|context)|pretend\s+you\s+are|you\s+are\s+now|jailbreak|dan\s+mode|developer\s+mode|(?:show|reveal|print|δωσε|δειξε|δείξε).{0,24}(?:api\s*key|secret|κλειδ|κωδικ)|repeat\s+(?:everything|all).{0,20}context|ολοκληρο\s+το\s+context|system\s+prompt|προτροπη\s+συστηματος|SOURCE_TITLE:|SOURCE_CONTENT:)/i;



export const UNRELATED_TOPIC_REGEX =

  /bitcoin|crypto|μετοχ|stock\s+market|συνταγη\s+για|recipe|μαγειρ|ποδοσφαι|football|ταινι|movie|gaming|hack\s+/i;



export function userMessageLooksSimasiaRelated(text) {

  return hasSimasiaTopicSignals(text) || queryAlignsWithKnowledge(text);

}



const MEDICAL_ADVICE_REGEX =
  /(?:ποια|τι)\s+φαρμακ|φαρμακα\s+(?:για|να\s+παρω)|δοσολογ|dosage|διαγνωσε|diagnose\s+my|my\s+symptoms|τα\s+συμπτωματα\s+μου|εχω\s+(?:μουδιασμα|πονο|πυρετο)|i\s+have\s+(?:numbness|pain|fever)|treatment\s+guidelines|mcdonald\s+(?:diagnostic\s+)?criteria|προγνωση|prognosis/i;

const PERSONAL_DATA_REGEX =
  /αμκα\s*(?:μου)?\s*(?:ειναι|:)|(?:^|\D)\d{11}(?:\D|$)|password|κωδικος\s+μου|my\s+(?:home\s+)?address\s+is|η\s+διευθυνση\s+μου\s+ειναι|iban|αριθμος\s+καρτας|card\s+number/i;

const VAGUE_REGEX = /^(?:[^a-zα-ω0-9]*|[a-zα-ω]{1,2}[;?!.]*|help[.!?]*|βοηθεια[.!?]*|\d{1,4}|asdf\w*|qwer\w*|[asdfghjkl]{6,}|[qwertyuiop]{6,})$/i;

export function isMedicalAdviceRequest(text) {
  return MEDICAL_ADVICE_REGEX.test(normalize(text || ''));
}

export function isPersonalDataMessage(text) {
  return PERSONAL_DATA_REGEX.test(normalize(text || ''));
}

export function isVagueMessage(text) {
  const n = normalize(text || '').trim();
  if (!n) return true;
  if (/^(?:ναι|οχι|οκ|ok|yes|no|nai|oxi)[.!]*$/i.test(n)) return false;
  return VAGUE_REGEX.test(n);
}

export function buildMedicalAdviceReply(language) {
  return language === 'el'
    ? 'Δεν μπορώ να δώσω ιατρικές συμβουλές για φάρμακα, συμπτώματα, διάγνωση ή θεραπεία. Γι᾽ αυτά μιλήστε με τον γιατρό σας. Σε επείγον καλέστε το 166 ή το 112. Μπορώ να σας πω πώς το fλow βοηθά οργανισμούς και ιατρεία να απαντούν στους ανθρώπους τους από εγκεκριμένες πηγές.'
    : 'I cannot give medical advice on medication, symptoms, diagnosis or treatment. Please speak to your doctor. In an emergency call 112. I can tell you how fλow helps organisations and practices answer their people from approved sources.';
}

export function buildPersonalDataReply(language) {
  return language === 'el'
    ? 'Παρακαλώ μη γράφετε εδώ προσωπικά δεδομένα, όπως ΑΜΚΑ, διευθύνσεις ή κωδικούς. Δεν τα αποθηκεύω και δεν τα χρειάζομαι. Μπορώ να βοηθήσω με ερωτήσεις για τη SimasiaAI και το fλow.'
    : 'Please do not share personal data here, such as ID numbers, addresses or passwords. I do not store or need them. I can help with questions about SimasiaAI and fλow.';
}

export function buildVagueReply(language) {
  return language === 'el'
    ? 'Πείτε μου τι θα θέλατε να μάθετε. Για παράδειγμα: τι είναι το fλow, τι κάνουν το DialogosAI, το PraxisAI και το MetronAI, πόσο κοστίζει, ή πώς κλείνετε 30 λεπτά μαζί μας.'
    : 'Tell me what you would like to know. For example: what fλow is, what DialogosAI, PraxisAI and MetronAI do, what it costs, or how to book 30 minutes with us.';
}

export function isCrisisUserMessage(text) {

  return CRISIS_USER_REGEX.test(normalize(text || ''));

}



export function isExternalOrgDeepDive(text) {

  const n = normalize(text || '');

  return EXTERNAL_ORG_REGEX.test(n) && EXTERNAL_ORG_DEEP_REGEX.test(n);

}



export function isBlockedUserMessage(text) {

  const raw = String(text || '').trim();

  if (!raw) return false;

  if (JAILBREAK_USER_REGEX.test(raw)) return true;

  if (!userMessageLooksSimasiaRelated(raw) && UNRELATED_TOPIC_REGEX.test(normalize(raw))) {

    return true;

  }

  return false;

}



export function buildBlockedReply(language) {

  if (language === 'el') {

    return (

      'Μπορώ να σε βοηθήσω μόνο με θέματα που σχετίζονται με την SimasiaAI — εταιρεία, προϊόντα, λύσεις και επικοινωνία. ' +

      'Δεν μπορώ να εκτελέσω άλλες οδηγίες ή να μοιράσω εσωτερικά στοιχεία.'

    );

  }

  return (

    'I can only help with topics related to SimasiaAI — company, products, solutions, and contact. ' +

    'I cannot follow other instructions or share internal details.'

  );

}



export function buildCrisisSafetyReply(language) {

  if (language === 'el') {

    return (

      'Λυπάμαι πολύ που νιώθετε έτσι, και χαίρομαι που το γράψατε. Δεν είστε μόνοι. ' +

      'Αν κινδυνεύετε τώρα, καλέστε αμέσως το 112. Μπορείτε να μιλήσετε με έναν άνθρωπο, ανώνυμα και όλο το 24ωρο, ' +

      'στη Γραμμή Παρέμβασης για την Αυτοκτονία 1018 ή στη Γραμμή Ψυχοκοινωνικής Υποστήριξης 10306. ' +

      'Είμαι ψηφιακός βοηθός και δεν μπορώ να δώσω ιατρική βοήθεια, αλλά εκεί θα σας ακούσουν τώρα.'

    );

  }

  return (

    'I am really sorry you are feeling this way, and I am glad you wrote it down. You are not alone. ' +

    'If you are in danger right now, call 112 immediately. You can talk to a person, anonymously and around the clock, ' +

    'on the suicide intervention line 1018 or the psychosocial support line 10306 (Greece), or your local crisis line. ' +

    'I am a digital assistant and cannot give medical help, but they can listen to you now.'

  );

}



/** Obvious off-topic only (politics, spam categories) — before retrieval. */

export function isHardOffTopic(userText) {

  const raw = String(userText || '').trim();

  if (!raw) return true;

  const norm = normalize(raw);

  if (GREETING_ONLY_REGEX.test(norm)) return false;

  if (OFF_TOPIC_REGEX.test(norm)) return true;

  if (!hasSimasiaTopicSignals(raw) && UNRELATED_TOPIC_REGEX.test(norm)) return true;

  return false;

}



/**

 * After retrieval: reject only when no topic signals AND weak KB match.

 * @param {number} topScore

 * @param {number} docCount

 */

export function shouldRejectAsOffTopic(

  userText,

  messages = [],

  lastResolvedQuery = '',

  topScore = 0,

  docCount = 0

) {

  const raw = String(userText || '').trim();

  if (!raw) return true;



  const norm = normalize(raw);

  if (GREETING_ONLY_REGEX.test(norm)) return false;

  if (OFF_TOPIC_REGEX.test(norm)) return true;



  const topicContext = getConversationTopic(messages, lastResolvedQuery);

  const combined = `${norm} ${normalize(topicContext)}`;



  if (userMessageLooksSimasiaRelated(combined) || userMessageLooksSimasiaRelated(topicContext)) {

    return false;

  }



  const minRetrieval = getRetrievalScopeMinScore();

  if (docCount > 0 && topScore >= minRetrieval) return false;



  if (raw.length < 3) return true;



  const wordCount = norm.split(/\s+/).filter(Boolean).length;

  if (wordCount >= 4) return true;



  return false;

}



/** @deprecated Use isHardOffTopic + shouldRejectAsOffTopic */

export function isClearlyOffTopic(userText, messages = [], lastResolvedQuery = '') {

  return isHardOffTopic(userText) || shouldRejectAsOffTopic(userText, messages, lastResolvedQuery, 0, 0);

}



export function buildOutOfScopeReply(language) {

  if (language === 'el') {

    return (

      'Μπορώ να σε βοηθήσω μόνο με θέματα που σχετίζονται με την SimasiaAI — εταιρεία, προϊόντα, λύσεις, τεχνολογία και επικοινωνία. ' +

      'Ρώτησέ με π.χ. τι είναι η SimasiaAI, ποια προϊόντα προσφέρουμε ή πώς μπορεί να βοηθήσει την επιχείρησή σου.'

    );

  }

  return (

    'I can only help with topics related to SimasiaAI — company, products, solutions, technology, and contact. ' +

    'Try asking what SimasiaAI is, which products we offer, or how we can help your business.'

  );

}



export function buildNoRetrievalReply(language) {

  if (language === 'el') {

    return (

      'Δεν βρήκα αρκετές σχετικές πληροφορίες στο υλικό του site για αυτό το ερώτημα. ' +

      'Μπορείς να το διατυπώσεις διαφορετικά ή να ρωτήσεις για SimasiaAI, τα προϊόντα μας ή την επικοινωνία.'

    );

  }

  return (

    'I could not find enough relevant information on our website for that question. ' +

    'Try rephrasing it, or ask about SimasiaAI, our products, or how to contact us.'

  );

}



const ALT_LOCATION_QUERY_REGEX =
  /θεσσαλονικ|thessaloniki|πατρα|patras|larisa|larissa|ηρακλει|heraklion|κρητη|crete/i;

export function asksLocationNotInContext(question, contextBlob = '') {
  const q = normalize(question || '');
  const blob = normalize(contextBlob || '');
  if (!ALT_LOCATION_QUERY_REGEX.test(q)) return false;
  if (/αθηνα|athens/.test(blob) && !ALT_LOCATION_QUERY_REGEX.test(blob)) return true;
  return false;
}

export function refineLocationAnswer(answer, question, _contextBlob, language) {
  const q = normalize(question || '');
  if (!ALT_LOCATION_QUERY_REGEX.test(q)) return answer;

  if (language === 'el') {
    return (
      'Στο υλικό του site αναφέρεται έδρα στην Αθήνα, Ελλάδα — όχι άλλες πόλεις. ' +
      'Μπορώ να σε βοηθήσω με SimasiaAI, τα προϊόντα μας ή την επικοινωνία (contact@simasiaai.gr).'
    );
  }
  return (
    'Our website lists Athens, Greece as our location — no other cities are mentioned. ' +
    'I can help with SimasiaAI, our products, or contact (contact@simasiaai.gr).'
  );
}

export function sanitizeBotAnswer(text) {
  let t = String(text || '');
  t = t.replace(/\bAIza[A-Za-z0-9_-]{20,}\b/g, '[removed]');
  t = t.replace(/SOURCE_TITLE:\s*[^\n]+/gi, '');
  t = t.replace(/SOURCE_CONTENT:[\s\S]*?(?=\n\n|$)/gi, '');
  return t.replace(/\n{3,}/g, '\n\n').trim();
}

/** Remove markdown artifacts; UI renders plain text, not markdown. */
export function formatPlainTextAnswer(text) {
  let t = String(text || '');
  t = t.replace(/\r\n/g, '\n');
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1');
  t = t.replace(/__([^_]+)__/g, '$1');
  t = t.replace(/\*([^*\n]+)\*/g, '$1');
  t = t.replace(/^#{1,6}\s+/gm, '');
  t = t.replace(/`([^`]+)`/g, '$1');
  t = t.replace(/^\s*[-*]\s+/gm, '• ');
  t = t.replace(/\n{3,}/g, '\n\n');
  return t.trim();
}

/** Drop re-introductions when the UI already showed the welcome message. */
export function stripRepeatGreeting(text, language = 'el') {
  let t = String(text || '').trim();
  const patterns =
    language === 'el'
      ? [
          /^γεια\s+σου[^\n]*\n+/i,
          /^γειά\s+σου[^\n]*\n+/i,
          /^είμαι\s+η\s+sima[^.!?\n]*[.!?]\s*/i,
          /^χαίρω\s+που\s+σας\s+βοηθώ[^\n]*\n+/i,
        ]
      : [
          /^hi\s+there[^\n]*\n+/i,
          /^hello[^\n]*\n+/i,
          /^i(?:'m| am)\s+sima[^\n]*[.\n]+/i,
          /^i\s+am\s+sima[^\n]*[.\n]+/i,
        ];

  let changed = true;
  while (changed) {
    changed = false;
    for (const rx of patterns) {
      if (rx.test(t)) {
        t = t.replace(rx, '');
        changed = true;
      }
    }
  }
  return t.trim();
}

export function polishBotAnswer(text, { language = 'el', conversationStarted = false } = {}) {
  let t = sanitizeBotAnswer(text);
  t = formatPlainTextAnswer(t);
  if (conversationStarted) {
    t = stripRepeatGreeting(t, language);
  }
  return t.trim();
}



export function isPublicWebsiteSource(doc) {

  if (!doc) return false;

  if (doc.source?.type === 'faq') return false;

  const url = String(doc.url || '').trim();

  if (!url || url.startsWith('faq://')) return false;

  return url.startsWith('/');

}



export function buildWebsiteSources(docs) {
  const seen = new Set();
  const out = [];
  (docs || []).forEach((doc) => {
    if (!isPublicWebsiteSource(doc)) return;
    const url = String(doc.url || '').trim();
    if (!url || seen.has(url)) return;
    seen.add(url);
    const title = String(doc.title || url).replace(/\s*\(\d+\/\d+\)\s*$/, '').trim();
    out.push({
      title,
      url,
      category: doc.category || 'website',
    });
  });
  return out;
}

/** User wants to book demo / meeting / appointment */
export function isBookingOrMeetingIntent(text) {
  const q = normalize(String(text || ''));
  if (!q) return false;
  if (
    /book[\s-]*demo|κλεισ(?:ω|τε|ετε)?\s*(?:demo|ραντεβ|συναντ)|ραντεβ|προγραμ+ατισ|schedule\s*(?:a\s*)?(?:demo|meeting|call)|κλειστε\s+ραντεβ|φορμα\s*demo|φόρμα\s*demo|meeting|appointment|δηλωσ(?:η|τε)\s*ενδιαφερ|ενδιαφερομαι|ας\s+συνεργαστ|κλεισ(?:ω|τε)\s+συναντ/i.test(
      q
    )
  ) {
    return true;
  }
  return /demo/.test(q) && /κλεισ|book|ραντεβ|θελω|θέλω|μπορω|μπορώ|πως|πώς|φορμα|φόρμα/.test(q);
}

/**
 * Bot answer invites booking a demo (even if the user didn't ask).
 * Used to show the Demo CTA button whenever the reply pitches the form.
 */
export function answerInvitesBookDemo(text) {
  const raw = String(text || '');
  if (!raw.trim()) return false;
  if (/\/go#book|\/demo\b/i.test(raw)) return true;
  const t = normalize(raw);
  if (
    /κλεισ(?:τε|ετε|ουμε|ω|ει).{0,48}demo|demo.{0,48}κλεισ|book.{0,24}demo|schedule.{0,24}demo|κλεισ(?:τε|ετε|ουμε|ω).{0,40}ραντεβ/.test(
      t
    )
  ) {
    return true;
  }
  if (
    /φορμα.{0,20}demo|demo.{0,20}φορμα|μεσω τησ φορμασ|στη(?:ν)? φορμα|via the (?:demo )?form|through the (?:demo )?form|open demo form|ζητηστε προσβαση/.test(
      t
    )
  ) {
    return true;
  }
  return false;
}

/** User asks how to contact / email / contact form (not specifically demo) */
export function isContactIntent(text) {
  const q = normalize(String(text || ''));
  if (!q) return false;
  if (isBookingOrMeetingIntent(q)) return false;
  return (
    /επικοινων|contact\b|email|e-mail|mail\b|τηλεφων|phone|φορμα\s*επικοινων|φόρμα\s*επικοινων|contact\s*form|πως\s+(?:να\s+)?(?:σας\s+)?(?:βρω|επικοινων)|πώς\s+(?:να\s+)?(?:σας\s+)?(?:βρω|επικοινων)|στελ(?:ω|τε|ετε)\s*(?:μηνυμα|email|μέιλ)|write\s+(?:to\s+)?(?:you|us)|get\s+in\s+touch|reach\s+(?:you|us)/i.test(
      q
    )
  );
}

/** Booking / contact lives on «Go with the fλow»: 30-minute call calendar at /go#book. */
export const BOOK_CALL_URL = '/go#book';

/** Retired booking URLs, still recognised so old answers/sources are replaced by /go#book. */
const LEGACY_BOOKING_URLS = new Set(['/demo', '/book-demo', '/flow/build', '/go', BOOK_CALL_URL]);

export function bookDemoSource(language = 'el') {
  return {
    title: language === 'el' ? 'Κλείστε συνάντηση 30 λεπτών — Go with the fλow' : 'Book a 30-minute call — Go with the fλow',
    url: BOOK_CALL_URL,
    category: 'contact',
  };
}

export function contactFormSource(language = 'el') {
  return bookDemoSource(language);
}

/** Keep booking answers clean — CTA button + sources carry the link. */
export function ensureBookDemoInAnswer(answer, language = 'el') {
  let t = String(answer || '').trim();
  if (!t) return t;
  // Drop raw path mentions; the UI button opens the form.
  t = t
    .replace(/\s*(?:εδώ|here)?\s*:?\s*(?:\/go#book|\/demo\b)/gi, '')
    .replace(/\/go#book|\/demo\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Point to the button below instead of a vague “via the form”.
  if (language === 'el') {
    t = t
      .replace(/(?:μέσω|από) της φόρμας Demo(?: παρακάτω)?/gi, 'από το κουμπί «Κλείστε 30 λεπτά» παρακάτω')
      .replace(/στη(?:ν)? φόρμα Demo(?: παρακάτω)?/gi, 'στο κουμπί «Κλείστε 30 λεπτά» παρακάτω');
  } else {
    t = t
      .replace(/(?:via|through) the Demo form(?: below)?/gi, 'with the «Book 30 minutes» button below');
  }

  if (/φορμα\s*demo\s*παρακάτω|demo form below|φόρμας Demo παρακάτω|κουμπί.{0,30}παρακάτω|button.{0,30}below/i.test(t)) {
    return t;
  }
  if (/φορμα|φόρμα|form|demo|ραντεβ|book/i.test(t)) return t;
  const line =
    language === 'el'
      ? 'Μπορείτε να κλείσετε συνάντηση 30 λεπτών από το κουμπί παρακάτω.'
      : 'You can book a 30-minute call with the button below.';
  return `${t}\n\n${line}`;
}

/** Contact intents use the same demo form CTA. */
export function ensureContactFormInAnswer(answer, language = 'el') {
  return ensureBookDemoInAnswer(answer, language);
}

export function withBookDemoSource(sources, language = 'el') {
  const list = Array.isArray(sources)
    ? sources.filter((s) => s && !LEGACY_BOOKING_URLS.has(String(s.url || '').trim()))
    : [];
  return [bookDemoSource(language), ...list];
}

export function withContactFormSource(sources, language = 'el') {
  return withBookDemoSource(sources, language);
}

const NAV_PAGE_LABELS = {
  '/flow': { el: 'Δείτε το fλow', en: 'Explore fλow' },
  '/go': { el: 'Φτιάξτε το fλow σας', en: 'Build your fλow' },
  '/ypodochi': { el: 'fλow για ιατρεία', en: 'fλow for practices' },
  '/collaborations': { el: 'Δείτε τις συνεργασίες', en: 'View collaborations' },
  '/team': { el: 'Γνωρίστε την ομάδα', en: 'Meet the team' },
  '/news': { el: 'Νέα & άρθρα', en: 'News & articles' },
  '/': { el: 'Αρχική σελίδα', en: 'Home page' },
};

const MODULE_TIER_LABELS = {
  apanta: { el: 'Δείτε το Απαντάει', en: 'Explore Apanta' },
  kleinei: { el: 'Δείτε το module Κλείνει', en: 'Explore Kleinei' },
  fernei: { el: 'Δείτε το module Φέρνει Πίσω', en: 'Explore Fernei' },
  sikonei: { el: 'Δείτε το module Σηκώνει', en: 'Explore Sikonei' },
};

function detectModuleTier(text) {
  const q = normalize(String(text || ''));
  // clinic levels only make sense when the question is about a practice or names a level
  if (!/ιατρει|iatrei|κλινικ|klinik|clinic|practice|γιατρ|doctor|kleinei|κλεινει|fernei|φερνει|sikonei|σηκωνει|apantaei|απανταει|ypodochi/.test(q)) return null;
  const tiers = [
    ['kleinei', /kleinei|κλεινει|module\s*1\b|κρατηση|ραντεβου/],
    ['fernei', /fernei|φερνει|module\s*2\b|πισω|recall|leads/],
    ['sikonei', /sikonei|σηκωνει|module\s*3\b|φωνη|voice|τηλεφων/],
    ['apanta', /apanta|απαντα|απανταει|core\b|βαση\b|βασικ/],
  ];
  for (const [id, rx] of tiers) {
    if (rx.test(q)) return id;
  }
  return null;
}

/** User is exploring a product/page topic (not booking demo or contact). */
export function isProductExploreIntent(text) {
  const q = normalize(String(text || ''));
  if (!q) return false;
  if (isBookingOrMeetingIntent(q) || isContactIntent(q)) return false;
  return /flow|fλow|dialogos|praxis|metron|crm|μκο|ngo|pyxida|πυξιδ|ψηφιακ|υποδοχ|praxi|apanta|απαντα|module|modules|kleinei|fernei|sikonei|κλεινει|φερνει|σηκωνει|product|προιον|τιμ|price|feature|λειτουργ|τι κανει|what does|tell me about|ypodochi|συνεργ|sinerg|synerg|collabor|partner|ομαδ|omada|team|founder|ιδρυτ|νεα|news|αρθρ|τι ειναι|what is|πακετο|tier|προσφορ/i.test(
    q
  );
}

/**
 * CTA to a navbar page inferred from retrieval + question (not FAQ hardcoding).
 * @returns {{ url: string, label: string } | null}
 */
export function resolveProductPageCta({
  question = '',
  answer = '',
  docs = [],
  language = 'el',
  showDemoCta = false,
} = {}) {
  if (showDemoCta) return null;

  const exploreQ = isProductExploreIntent(question);
  const exploreA = isProductExploreIntent(answer);
  if (!exploreQ && !exploreA) return null;

  const lang = language === 'en' ? 'en' : 'el';
  const combined = `${question} ${answer}`;

  const tier = detectModuleTier(combined);
  if (tier && MODULE_TIER_LABELS[tier]) {
    return {
      url: `/ypodochi#tier-${tier}`,
      label: MODULE_TIER_LABELS[tier][lang],
    };
  }

  const allowed = new Set(['/flow', '/go', '/ypodochi', '/collaborations', '/team', '/news', '/']);
  const scores = new Map();

  (docs || []).forEach((doc) => {
    if (!doc || doc.source?.type === 'faq') return;
    let url = String(doc.url || '').trim().replace(/\/+$/, '') || '';
    if (!allowed.has(url)) return;
    const weight = Number(doc.relevanceScore || 0.5);
    scores.set(url, (scores.get(url) || 0) + weight);
  });

  const q = normalize(question);
  if (/pyxida|πυξιδ|ψηφιακ|υποδοχ|praxi|module|ypodochi|απαντα|ιατρει|iatrei|κλινικ|klinik|clinic|γιατρ|doctor/.test(q)) {
    scores.set('/ypodochi', (scores.get('/ypodochi') || 0) + 1.5);
  }
  if (/flow|fλow|dialogos|διαλογ|praxis|πραξις|metron|μετρον|crm|insights|μκο|ngo|συλλογ|χορηγ|sponsor/.test(q)) {
    scores.set('/flow', (scores.get('/flow') || 0) + 1.5);
  }
  if (/τιμ|κοστ|price|pricing|cost|προσφορ|offer|πακετο|πιλοτ|pilot/.test(q)) {
    scores.set('/go', (scores.get('/go') || 0) + 1.2);
  }
  if (/συνεργ|sinerg|synerg|collabor|partner|poamskp|myrto/.test(q)) {
    scores.set('/collaborations', (scores.get('/collaborations') || 0) + 1.5);
  }
  if (/ομαδ|omada|team|founder|ιδρυτ|μελη/.test(q)) {
    scores.set('/team', (scores.get('/team') || 0) + 1.5);
  }
  if (/τυπο|τυπος|εγραψαν|press|media|δημοσιευ/.test(q)) {
    scores.set('/', (scores.get('/') || 0) + 8);
  }
  if (/νεα|news|αρθρ|article/.test(q)) {
    scores.set('/news', (scores.get('/news') || 0) + 1.5);
  }

  let bestUrl = null;
  let bestScore = 0;
  scores.forEach((score, url) => {
    if (score > bestScore) {
      bestScore = score;
      bestUrl = url;
    }
  });

  if (!bestUrl || bestScore < 0.35) {
    if (/pyxida|πυξιδ|ψηφιακ|υποδοχ|praxi|module/.test(q)) bestUrl = '/ypodochi';
    else if (/flow|fλow|dialogos|praxis|metron/.test(q)) bestUrl = '/flow';
    else return null;
  }

  const labels = NAV_PAGE_LABELS[bestUrl];
  if (!labels) return null;
  return { url: bestUrl, label: labels[lang] };
}

export function toUserFacingError(error, language) {

  const msg = String((error && error.message) || '').toLowerCase();

  const isEl = language === 'el';



  if (msg.includes('gemini_not_configured') || msg.includes('no api key') || msg.includes('keys missing')) {

    return isEl

      ? 'Το chatbot δεν είναι ρυθμισμένο ακόμα στον server. Επικοινωνήστε με την ομάδα ανάπτυξης.'

      : 'The chatbot is not configured on the server yet. Please contact the development team.';

  }

  if (
    msg.includes('401') ||
    msg.includes('invalid authentication') ||
    msg.includes('gemini_upstream_error') ||
    msg.includes('api key not valid')
  ) {
    return isEl
      ? 'Το chatbot δεν μπορεί να συνδεθεί με το AI — το API key δεν είναι έγκυρο. Χρειάζεται έγκυρο Google Gemini key στο server.'
      : 'The chatbot cannot reach AI — the API key is invalid. A valid Google Gemini key is required on the server.';
  }

  if (
    msg.includes('econnrefused') ||
    msg.includes('failed to fetch') ||
    msg.includes('networkerror') ||
    msg.includes('proxy url not configured') ||
    msg.includes('504') ||
    msg.includes('gateway timeout') ||
    msg.includes('gemini stream failed') ||
    msg.includes('proxy:')
  ) {
    return isEl
      ? 'Δεν βρέθηκε ο server του chatbot. Τοπικά: τρέξτε «npm run proxy:gemini» σε δεύτερο terminal μαζί με npm start.'
      : 'Chatbot server not reachable. Locally: run «npm run proxy:gemini» in a second terminal alongside npm start.';
  }

  if (msg.includes('403') || msg.includes('origin_not_allowed') || msg.includes('permission')) {

    return isEl

      ? 'Πρόβλημα ρύθμισης πρόσβασης. Δοκιμάστε ξανά αργότερα.'

      : 'There is an access configuration issue. Please try again later.';

  }

  if (msg.includes('429') || msg.includes('quota') || msg.includes('resource_exhausted') || msg.includes('too many')) {

    return isEl

      ? 'Προσωρινό όριο χρήσης AI. Περιμένετε λίγο και δοκιμάστε ξανά.'

      : 'Temporary AI rate limit reached. Please wait a moment and try again.';

  }

  if (msg.includes('timeout') || msg.includes('έληξε')) {

    return isEl

      ? 'Η απάντηση άργησε πολύ. Δοκιμάστε ξανά με πιο σύντομη ερώτηση.'

      : 'The request timed out. Please try again with a shorter question.';

  }

  if (msg.includes('prompt_blocked') || msg.includes('prompt_too_large')) {

    return isEl

      ? 'Δεν μπόρεσα να επεξεργαστώ αυτό το αίτημα. Δοκιμάστε μια πιο σύντομη ερώτηση.'

      : 'Could not process this request. Try a shorter question.';

  }



  return isEl

    ? 'Συγγνώμη, κάτι πήγε στραβά. Δοκιμάστε ξανά.'

    : 'Sorry, something went wrong. Please try again.';

}


