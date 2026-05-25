/**
 * Scope and off-topic guards for Sima (SimasiaAI website assistant).
 */

import { normalize, getConversationTopic } from './conversationContext';

const SIMASIA_SIGNAL_REGEX =
  /simasia|σίμασια|σιμασια|sima\b|simasiachatbots|hammer\s*editor|frontistiriarxis|ai\s+from\s+the\s+human|προϊον|προιον|product|λύση|λυση|solution|εφαρμογ|application|επικοινων|contact|εταιρ|company|startup|chatbot/i;

const OFF_TOPIC_REGEX =
  /μητσοτακ|τσιπρα|παπανδρεου|κυβερνηση|κυβέρνηση|πρωθυπουργ|υπουργο|βουλη|εκλογ|πολιτικ|κομμα\b|κόμμα\b|trump|biden|putin|zelensky|celebrity|διασημο|ποδοσφαιρ|μπασκετ|weather|καιρος|καιρός|recipe|συνταγ|joke|αστειο|αστείο|gambl|καζινο|sex\b|porn|hack\s|crack\s/i;

const GREETING_ONLY_REGEX = /^(γεια|γειά|hello|hi|hey|καλημερα|καλησπερα|καληνυχτα)[\s!.?]*$/i;

export function hasSimasiaTopicSignals(text) {
  return SIMASIA_SIGNAL_REGEX.test(normalize(text || ''));
}

export function isClearlyOffTopic(userText, messages = [], lastResolvedQuery = '') {
  const raw = String(userText || '').trim();
  if (!raw) return true;

  const norm = normalize(raw);
  if (GREETING_ONLY_REGEX.test(norm)) return false;

  if (OFF_TOPIC_REGEX.test(norm)) return true;

  // Very short generic spam with no prior Simasia topic
  const topicContext = getConversationTopic(messages, lastResolvedQuery);
  const combined = `${norm} ${normalize(topicContext)}`;
  if (raw.length < 3 && !hasSimasiaTopicSignals(combined)) return true;

  // Long unrelated questions with zero Simasia signals and no ongoing Simasia thread
  const wordCount = norm.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 4 && !hasSimasiaTopicSignals(combined) && !hasSimasiaTopicSignals(topicContext)) {
    return true;
  }

  return false;
}

export function buildOutOfScopeReply(language) {
  if (language === 'el') {
    return (
      'Μπορώ να σε βοηθήσω μόνο με θέματα που σχετίζονται με την SimasiaAI — εταιρεία, προϊόντα, λύσεις, τεχνολογία και επικοινωνία. ' +
      'Για πολιτικά ή άσχετα θέματα δεν έχω αξιόπιστες πληροφορίες. Ρώτησέ με π.χ. τι είναι η SimasiaAI, ποια προϊόντα προσφέρουμε ή πώς μπορεί να βοηθήσει την επιχείρησή σου.'
    );
  }
  return (
    'I can only help with topics related to SimasiaAI — company, products, solutions, technology, and contact. ' +
    'I do not have reliable information on politics or unrelated topics. Try asking what SimasiaAI is, which products we offer, or how we can help your business.'
  );
}

export function buildNoRetrievalReply(language) {
  if (language === 'el') {
    return (
      'Δεν βρήκα αρκετές σχετικές πληροφορίες στο υλικό μας για αυτό το ερώτημα. ' +
      'Μπορείς να το διατυπώσεις με άλλα λόγια ή να ρωτήσεις για SimasiaAI, τα προϊόντα μας ή την επικοινωνία.'
    );
  }
  return (
    'I could not find enough relevant information in our materials for that question. ' +
    'Try rephrasing it, or ask about SimasiaAI, our products, or how to contact us.'
  );
}

export function toUserFacingError(error, language) {
  const msg = String((error && error.message) || '').toLowerCase();
  const isEl = language === 'el';

  if (msg.includes('no api key')) {
    return isEl
      ? 'Δεν έχει ρυθμιστεί κλειδί Gemini. Επικοινωνήστε με την ομάδα ανάπτυξης.'
      : 'Gemini API key is not configured. Please contact the development team.';
  }
  if (msg.includes('403') || msg.includes('api key not valid') || msg.includes('permission')) {
    return isEl
      ? 'Πρόβλημα με το κλειδί API. Δοκιμάστε ξανά αργότερα.'
      : 'There is an API key configuration issue. Please try again later.';
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
  if (msg.includes('embedding')) {
    return isEl
      ? 'Δεν μπόρεσα να αναζητήσω πληροφορίες αυτή τη στιγμή. Δοκιμάστε ξανά σε λίγο.'
      : 'Search is temporarily unavailable. Please try again shortly.';
  }

  return isEl
    ? 'Συγγνώμη, κάτι πήγε στραβά. Δοκιμάστε ξανά.'
    : 'Sorry, something went wrong. Please try again.';
}
