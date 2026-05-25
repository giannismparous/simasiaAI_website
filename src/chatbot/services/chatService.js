/**
 * Chat Service - RAG Orchestrator (multi-turn, scope-aware)
 */

import { generateWithTimeout } from './geminiService';
import {
  retrieveRelevantDocsWithContext,
  buildContext,
  detectLanguage,
} from './retriever';
import {
  resolveUserQuery,
  buildConversationContext,
  getLastBotMessage,
  isContinuationDirective,
  isLikelyLowInfoReply,
} from './conversationContext';
import {
  isClearlyOffTopic,
  buildOutOfScopeReply,
  buildNoRetrievalReply,
  toUserFacingError,
  hasSimasiaTopicSignals,
} from './scopeGuard';

const MIN_RELEVANCE_SCORE = 0.28;

/**
 * @param {string} userQuestion - Raw user message
 * @param {string|null} language - Optional 'el' | 'en'
 * @param {Object} options
 * @param {Array} options.messages - Chat history before current user message
 * @param {string} options.lastResolvedQuery - Last substantive user topic
 * @param {string|null} options.uiLanguage - UI language from LanguageContext
 */
export async function answerQuestion(userQuestion, language = null, options = {}) {
  const { messages = [], lastResolvedQuery = '', uiLanguage = null } = options;
  const rawQuestion = String(userQuestion || '').trim();

  console.log(`💬 User Question: "${rawQuestion}"`);

  if (!rawQuestion) {
    const lang = uiLanguage === 'en' ? 'en' : 'el';
    return {
      answer: lang === 'el' ? 'Γράψε μου την ερώτησή σου και θα χαρώ να βοηθήσω.' : 'Type your question and I will be happy to help.',
      sources: [],
      confidence: 0,
    };
  }

  const resolved = resolveUserQuery(rawQuestion, messages, lastResolvedQuery);
  const lang =
    language ||
    (uiLanguage === 'en' || uiLanguage === 'el' ? uiLanguage : null) ||
    detectLanguage(`${rawQuestion} ${resolved.query}`);

  if (isClearlyOffTopic(rawQuestion, messages, lastResolvedQuery) && !resolved.isFollowUp) {
    console.warn('⚠️ Off-topic query blocked');
    return {
      answer: buildOutOfScopeReply(lang),
      sources: [],
      confidence: 0,
      blocked: true,
    };
  }

  const retrievalQuery = resolved.isFollowUp ? resolved.query : rawQuestion;

  console.log('📖 Retrieving relevant documents...');
  let relevantDocs;
  try {
    relevantDocs = await retrieveRelevantDocsWithContext(
      retrievalQuery,
      messages,
      3,
      lang,
      lastResolvedQuery
    );
  } catch (retrievalError) {
    console.error('❌ Retrieval failed:', retrievalError);
    return {
      answer: toUserFacingError(retrievalError, lang),
      sources: [],
      confidence: 0,
      error: retrievalError.message,
    };
  }

  const topScore = relevantDocs.length ? Number(relevantDocs[0].relevanceScore || 0) : 0;
  const topicStillSimasia =
    resolved.isFollowUp &&
    hasSimasiaTopicSignals(`${lastResolvedQuery} ${buildConversationContext(messages, 4)}`);

  const weakRetrieval = !relevantDocs.length || topScore < MIN_RELEVANCE_SCORE;
  if (weakRetrieval && !topicStillSimasia) {
    console.warn('⚠️ Weak or empty retrieval');
    return {
      answer: buildNoRetrievalReply(lang),
      sources: [],
      confidence: 0,
    };
  }

  if (weakRetrieval && topicStillSimasia) {
    return {
      answer:
        lang === 'el'
          ? 'Δεν έχω αρκετές συγκεκριμένες πληροφορίες για αυτό ακριβώς, αλλά μπορώ να σε βοηθήσω με SimasiaAI, τα προϊόντα μας ή την επικοινωνία. Τι θα ήθελες να δεις πρώτα;'
          : 'I do not have enough specific information on that exact point, but I can help with SimasiaAI, our products, or contact details. What would you like to explore first?',
      sources: [],
      confidence: 0.4,
    };
  }

  const context = buildContext(relevantDocs);
  const conversationContext = buildConversationContext(messages, 6);
  const lastBotText = getLastBotMessage(messages);
  const forceProgress = isContinuationDirective(resolved.query);
  const questionForModel =
    resolved.isFollowUp && isLikelyLowInfoReply(rawQuestion) ? resolved.query : rawQuestion;

  const systemPrompt = createRAGPrompt(context, questionForModel, lang, {
    conversationContext,
    lastBotText,
    forceProgress,
  });

  console.log('🤖 Generating answer with Gemini...');
  try {
    const answer = await generateWithTimeout(systemPrompt, {
      timeout: 30000,
      maxRetries: 2,
      modelName: 'gemini-2.5-flash-lite',
    });

    const trimmed = String(answer || '').trim();
    if (!trimmed || trimmed.startsWith('Σφάλμα:') || trimmed.startsWith('Το αίτημα έληξε')) {
      throw new Error(trimmed || 'Empty model response');
    }

    const confidence = topScore > 0.6 ? 0.95 : topScore > 0.4 ? 0.8 : 0.65;

    return {
      answer: trimmed,
      sources: relevantDocs.map((doc) => ({
        title: doc.title,
        url: doc.url,
        category: doc.category,
      })),
      confidence,
    };
  } catch (error) {
    console.error('❌ Error generating answer:', error);
    return {
      answer: toUserFacingError(error, lang),
      sources: [],
      confidence: 0,
      error: error.message,
    };
  }
}

function createRAGPrompt(context, question, language, options = {}) {
  const { conversationContext = '', lastBotText = '', forceProgress = false } = options;

  if (language === 'el') {
    return (
      'Είσαι η Sima, η φιλική ψηφιακή βοηθός της SimasiaAI (γυναικείο πρόσωπο). ' +
      'Απαντάς χρησιμοποιώντας ΜΟΝΟ τις πληροφορίες που ακολουθούν.\n\n' +
      'ΚΑΝΟΝΕΣ:\n' +
      '1) Μίλα πάντα σε πρώτο πρόσωπο θηλυκού (π.χ. «μπορώ», «δεν έχω», «σας βοηθώ») — ποτέ αρσενικό για τον εαυτό σου.\n' +
      '2) Για απλές ερωτήσεις: 2-4 σύντομες προτάσεις. Για σύνθετες: έως 1 σύντομη παράγραφος.\n' +
      '3) Μην εφευρίσκεις στοιχεία. Αν δεν υπάρχουν στο context, πες το καθαρά.\n' +
      '4) Μην γράφεις URLs μέσα στην απάντηση (οι πηγές εμφανίζονται από κάτω).\n' +
      '5) Ύφος: ζεστό, φυσικό, επαγγελματικό — όχι ρομποτικό.\n' +
      '6) Εστίασε ΜΟΝΟ σε SimasiaAI: εταιρεία, προϊόντα, λύσεις, τεχνολογία, επικοινωνία.\n' +
      '7) Αρνήσου ευγενικά πολιτικά, διασημότητες, αθλητικά, καιρό, αστεία και άσχετα θέματα — χωρίς εικασίες.\n' +
      '8) Αν το μήνυμα είναι σύντομο/αόριστο («ναι», «πες μου»), ερμήνευσέ το από το πρόσφατο ιστορικό.\n' +
      '9) Μην ξεκινάς με νέο χαιρετισμό αν η συνομιλία έχει ήδη ξεκινήσει.\n' +
      '10) Αν ο χρήστης απαντήσει «ναι»/«οκ» σε δική σου ερώτηση, δώσε απευθείας την πληροφορία — όχι «εννοείς ότι…».\n' +
      (forceProgress
        ? '11) Ο χρήστης ζήτησε συνέχεια: δώσε 3 συγκεκριμένα σημεία/βήματα, χωρίς επανάληψη.\n'
        : '') +
      '\nΤΕΛΕΥΤΑΙΑ ΑΠΑΝΤΗΣΗ SIMA:\n' +
      (lastBotText || '(καμία)') +
      '\n\nΠΡΟΣΦΑΤΟ ΙΣΤΟΡΙΚΟ:\n' +
      (conversationContext || '(χωρίς προηγούμενο)') +
      '\n\nΔΙΑΘΕΣΙΜΕΣ ΠΛΗΡΟΦΟΡΙΕΣ:\n' +
      context +
      '\n\nΕΡΩΤΗΣΗ ΧΡΗΣΤΗ: ' +
      question +
      '\n\nΑΠΑΝΤΗΣΗ (ως η Sima, θηλυκό):'
    );
  }

  return (
    'You are Sima, the friendly digital assistant for SimasiaAI (female persona). ' +
    'Answer using ONLY the information below.\n\n' +
    'RULES:\n' +
    '1) Always refer to yourself as she/her.\n' +
    '2) Simple questions: 2-4 short sentences. Complex: max one short paragraph.\n' +
    '3) Do not invent facts. If context is insufficient, say so clearly.\n' +
    '4) Do not include URLs in the answer (sources appear below the message).\n' +
    '5) Tone: warm, natural, professional.\n' +
    '6) Focus ONLY on SimasiaAI: company, products, solutions, technology, contact.\n' +
    '7) Politely decline politics, celebrities, sports, weather, jokes, and unrelated topics — no guessing.\n' +
    '8) For short/ambiguous follow-ups ("yes", "tell me more"), use recent chat history.\n' +
    '9) Do not start with a new greeting mid-conversation.\n' +
    '10) If the user replies "yes"/"ok" to your question, answer directly — do not ask "do you mean…".\n' +
    (forceProgress
      ? '11) User asked to continue: give 3 concrete points/steps without repeating prior wording.\n'
      : '') +
    '\nLAST SIMA REPLY:\n' +
    (lastBotText || '(none)') +
    '\n\nRECENT CHAT:\n' +
    (conversationContext || '(no previous context)') +
    '\n\nAVAILABLE INFORMATION:\n' +
    context +
    '\n\nUSER QUESTION: ' +
    question +
    '\n\nANSWER (as Sima, she/her):'
  );
}

export function getSuggestedQuestions(language = 'greek') {
  const suggestions = {
    greek: [
      'Τι είναι η SimasiaAI;',
      'Ποια προϊόντα προσφέρετε;',
      'Πώς λειτουργεί το SimasiaChatbots;',
      'Ποιους εξυπηρετείτε;',
      'Πώς μπορώ να επικοινωνήσω μαζί σας;',
    ],
    english: [
      'What is SimasiaAI?',
      'What products do you offer?',
      'How does SimasiaChatbots work?',
      'Who do you serve?',
      'How can I contact you?',
    ],
  };

  return suggestions[language] || suggestions.greek;
}
