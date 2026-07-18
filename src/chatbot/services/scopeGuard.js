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

  /μητσοτακ|τσιπρα|παπανδρεου|κυβερνηση|κυβέρνηση|πρωθυπουργ|πολιτικ|κομμα\b|κόμμα\b|trump|biden|putin|zelensky|celebrity|διασημο|ποδοσφαιρ|μπασκετ|weather|καιρος|καιρός|recipe|συνταγ|joke|αστειο|αστείο|gambl|καζινο|sex\b|porn|hack\s|crack\s|bitcoin|crypto|football|gaming|eurovision|won\s+the\s+eurovision/i;



const GREETING_ONLY_REGEX = /^(γεια|γειά|hello|hi|hey|καλημερα|καλησπερα|καληνυχτα)[\s!.?]*$/i;



const CRISIS_USER_REGEX =

  /suicidal|αυτοκτον|σκοτωσω|kill\s+myself|what\s+pills\s+should\s+i\s+take|πια\s+χαπια|να\s+παρω\s+χαπια/i;



const EXTERNAL_ORG_REGEX =

  /ποαμσκπ|poamskp|msif|helani|kap3|δια\s*ζωσης|dia\s*zosis|myrto|k3\b/i;



const EXTERNAL_ORG_DEEP_REGEX =

  /λεπτομερ|in\s+detail|full\s+clinical|structure\s+in\s+detail|tuition\s+fees|appointment\s+at|ως\s+οργανισμ|not\s+simasia|comparison/i;



export const JAILBREAK_USER_REGEX =

  /(?:αγνοησε|αγνοηστε|ignore\s+(?:all\s+)?(?:previous|prior|above)|disregard\s+(?:all\s+)?(?:the\s+)?(?:rules|instructions|context)|pretend\s+you\s+are|you\s+are\s+now|jailbreak|dan\s+mode|developer\s+mode|(?:show|reveal|print|δωσε|δειξε|δείξε).{0,24}(?:api\s*key|secret|κλειδ|κωδικ)|repeat\s+(?:everything|all).{0,20}context|ολοκληρο\s+το\s+context|system\s+prompt|προτροπη\s+συστηματος|SOURCE_TITLE:|SOURCE_CONTENT:)/i;



export const UNRELATED_TOPIC_REGEX =

  /bitcoin|crypto|μετοχ|stock\s+market|συνταγ|recipe|μαγειρ|ποδοσφαι|football|ταινι|gaming|hack\s+/i;



export function userMessageLooksSimasiaRelated(text) {

  return hasSimasiaTopicSignals(text) || queryAlignsWithKnowledge(text);

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

      'Δεν μπορώ να δώσω ιατρικές ή φαρμακευτικές συμβουλές. Αν βρίσκεστε σε άμεσο κίνδυνο, επικοινωνήστε με γραμμή βοήθειας (π.χ. 1018) ' +

      'ή με επαγγελματία ψυχικής υγείας. Μπορώ να σας βοηθήσω μόνο με θέματα SimasiaAI — εταιρεία, προϊόντα και επικοινωνία.'

    );

  }

  return (

    'I cannot provide medical or medication advice. If you are in immediate danger, please contact a crisis helpline (e.g. 1018) ' +

    'or a mental health professional. I can only help with SimasiaAI topics — company, products, and contact.'

  );

}



/** Obvious off-topic only (politics, spam categories) — before retrieval. */

export function isHardOffTopic(userText) {

  const raw = String(userText || '').trim();

  if (!raw) return true;

  const norm = normalize(raw);

  if (GREETING_ONLY_REGEX.test(norm)) return false;

  if (OFF_TOPIC_REGEX.test(norm)) return true;

  if (!userMessageLooksSimasiaRelated(raw) && UNRELATED_TOPIC_REGEX.test(norm)) return true;

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
  if (/\/book-demo/i.test(raw)) return true;
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

export function bookDemoSource(language = 'el') {
  return {
    title: language === 'el' ? 'Κλείστε Demo — φόρμα' : 'Book a Demo — form',
    url: '/book-demo',
    category: 'contact',
  };
}

export function contactFormSource(language = 'el') {
  return {
    title: language === 'el' ? 'Φόρμα επικοινωνίας' : 'Contact form',
    url: '/#contact',
    category: 'contact',
  };
}

/** Keep booking answers clean — CTA button + sources carry the link. */
export function ensureBookDemoInAnswer(answer, language = 'el') {
  let t = String(answer || '').trim();
  if (!t) return t;
  // Drop raw path mentions; the UI button opens the form.
  t = t
    .replace(/\s*(?:εδώ|here)?\s*:?\s*\/book-demo\b/gi, '')
    .replace(/\/book-demo\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Point to the button below instead of a vague “via the form”.
  if (language === 'el') {
    t = t
      .replace(
        /μέσω της φόρμας(?!\s*Demo\s*παρακάτω)/gi,
        'μέσω της φόρμας Demo παρακάτω'
      )
      .replace(
        /στη(?:ν)? φόρμα(?!\s*Demo\s*παρακάτω)(?!\s*επικοινων)/gi,
        'στη φόρμα Demo παρακάτω'
      );
  } else {
    t = t
      .replace(
        /via the (?:Demo )?form(?!\s*below)/gi,
        'via the Demo form below'
      )
      .replace(
        /through the (?:Demo )?form(?!\s*below)/gi,
        'through the Demo form below'
      );
  }

  if (/φορμα\s*demo\s*παρακάτω|demo form below|φόρμας Demo παρακάτω/i.test(t)) {
    return t;
  }
  if (/φορμα|φόρμα|form|demo|ραντεβ|book/i.test(t)) return t;
  const line =
    language === 'el'
      ? 'Μπορείτε να κλείσετε demo μέσω της φόρμας Demo παρακάτω.'
      : 'You can book a demo via the Demo form below.';
  return `${t}\n\n${line}`;
}

/** Keep contact answers clean — CTA button + sources carry the link. */
export function ensureContactFormInAnswer(answer, language = 'el') {
  let t = String(answer || '').trim();
  if (!t) return t;
  t = t
    .replace(/\s*(?:εδώ|here)?\s*:?\s*\/#contact\b/gi, '')
    .replace(/\/#contact\b/gi, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (/φορμα|φόρμα|form|επικοινων|contact@/i.test(t)) {
    if (!/contact@simasiaai\.gr/i.test(t)) {
      return language === 'el'
        ? `${t}\n\nEmail: contact@simasiaai.gr`
        : `${t}\n\nEmail: contact@simasiaai.gr`;
    }
    return t;
  }
  const line =
    language === 'el'
      ? 'Μπορείτε να μας γράψετε στη φόρμα επικοινωνίας παρακάτω.\nEmail: contact@simasiaai.gr'
      : 'You can reach us via the contact form below.\nEmail: contact@simasiaai.gr';
  return `${t}\n\n${line}`;
}

export function withBookDemoSource(sources, language = 'el') {
  const list = Array.isArray(sources)
    ? sources.filter((s) => s && s.url !== '/book-demo')
    : [];
  return [bookDemoSource(language), ...list];
}

export function withContactFormSource(sources, language = 'el') {
  const list = Array.isArray(sources)
    ? sources.filter((s) => s && s.url !== '/#contact' && s.url !== '/')
    : [];
  return [contactFormSource(language), ...list];
}

export function toUserFacingError(error, language) {

  const msg = String((error && error.message) || '').toLowerCase();

  const isEl = language === 'el';



  if (msg.includes('gemini_not_configured') || msg.includes('no api key') || msg.includes('keys missing')) {

    return isEl

      ? 'Το chatbot δεν είναι ρυθμισμένο ακόμα στον server. Επικοινωνήστε με την ομάδα ανάπτυξης.'

      : 'The chatbot is not configured on the server yet. Please contact the development team.';

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


