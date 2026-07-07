/**
 * Multi-turn conversation helpers (adapted from POAMSKP chatbot).
 */

export function normalize(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function isShortAffirmative(text) {
  const cleaned = normalize(text)
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return false;
  const words = cleaned.split(' ').filter(Boolean);
  if (words.length > 3) return false;

  const affirmatives = new Set([
    'ναι', 'yes', 'y', 'ok', 'οκ', 'sure', 'βεβαιως', 'βεβαιως', 'σωστα', 'yep', 'yeah',
  ]);
  return affirmatives.has(cleaned);
}

export function isShortAmbiguousFollowUp(text) {
  const cleaned = normalize(text)
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return false;
  const compact = cleaned.replace(/\s+/g, ' ');
  const words = compact.split(' ').filter(Boolean);
  if (words.length > 5) return false;

  const explicit = [
    /^προτειν/,
    /^πες/,
    /^συνεχισ/,
    /^παμε$/,
    /^οκ$/,
    /^ok$/,
    /^tell me/,
    /^suggest/,
    /^continue$/,
    /^go on$/,
    /^more$/,
  ];
  if (explicit.some((rx) => rx.test(compact))) return true;

  const generic = new Set([
    'ok', 'οκ', 'ναι', 'yes', 'sure', 'παμε', 'πάμε', 'more', 'και', 'λοιπον', 'λοιπόν',
  ]);
  if (words.length <= 3 && words.every((w) => generic.has(w) || w.length <= 2)) {
    return true;
  }
  return false;
}

export function isLikelyLowInfoReply(text) {
  const compact = normalize(text)
    .replace(/[^\p{L}\p{N}\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!compact) return false;
  const words = compact.split(' ').filter(Boolean);
  if (words.length <= 2) return true;
  if (words.length <= 4 && compact.length <= 24) return true;
  return false;
}

export function getLastBotMessage(messages) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];
    if (msg && msg.sender === 'bot' && msg.text) return String(msg.text).trim();
  }
  return '';
}

export function getLastBotQuestion(messages) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];
    if (!msg || msg.sender !== 'bot' || !msg.text) continue;
    const matches = String(msg.text).match(/[^?]+\?/g);
    if (matches && matches.length) return matches[matches.length - 1].trim();
  }
  return '';
}

export function getLastSubstantiveUserMessage(messages) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];
    if (!msg || msg.sender !== 'user' || !msg.text) continue;
    const text = String(msg.text).trim();
    if (!text) continue;
    if (isShortAffirmative(text) || isShortAmbiguousFollowUp(text)) continue;
    return text;
  }
  return '';
}

export function getConversationTopic(messages, lastResolvedQuery = '') {
  const parts = [];
  for (let i = messages.length - 1; i >= 0 && parts.length < 4; i -= 1) {
    const msg = messages[i];
    if (!msg || msg.sender !== 'user' || !msg.text) continue;
    const text = String(msg.text).trim();
    if (!text) continue;
    if (isShortAffirmative(text) || isShortAmbiguousFollowUp(text)) continue;
    parts.push(text);
  }
  if (lastResolvedQuery) parts.push(lastResolvedQuery);
  return parts.reverse().join(' ');
}

function overlapRatio(textA, textB) {
  const a = new Set(
    normalize(textA)
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
  const b = new Set(
    normalize(textB)
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
  if (!a.size || !b.size) return 0;
  let shared = 0;
  a.forEach((w) => {
    if (b.has(w)) shared += 1;
  });
  return shared / Math.min(a.size, b.size);
}

export function resolveUserQuery(userText, messages, lastResolvedQuery = '') {
  const text = String(userText || '').trim();
  const lastBot = getLastBotMessage(messages);
  const lastBotQuestion = getLastBotQuestion(messages);
  const lastUserTopic = getLastSubstantiveUserMessage(messages);
  const fallbackTopic = lastUserTopic || lastResolvedQuery || '';
  const isShortReplySignal =
    isShortAffirmative(text) || isShortAmbiguousFollowUp(text) || isLikelyLowInfoReply(text);

  if (lastBotQuestion && isShortReplySignal) {
    const langHint = `${text} ${lastBotQuestion} ${fallbackTopic}`;
    const isEl = /[α-ω]/i.test(langHint);
    if (isEl) {
      return {
        query:
          `Ο χρήστης απάντησε σύντομα ("${text}") στην τελευταία ερώτηση του DialogosAI (ανθρωποκεντρικού ψηφιακού πλοηγού). ` +
          `Απάντησε άμεσα και συγκεκριμένα στην ερώτηση: "${lastBotQuestion}". ` +
          'Μην ζητήσεις επιβεβαίωση και μην επαναδιατυπώσεις την ίδια ερώτηση.',
        isFollowUp: true,
      };
    }
    return {
      query:
        `The user gave a short reply ("${text}") to DialogosAI's last question. ` +
        `Answer that question directly and concretely: "${lastBotQuestion}". ` +
        'Do not ask for confirmation and do not restate the same question.',
      isFollowUp: true,
    };
  }

  const tokenCount = normalize(text).split(/\s+/).filter(Boolean).length;
  const shortMessage = tokenCount <= 6 || text.length <= 42;
  const overlapWithBot = overlapRatio(text, lastBot);
  const overlapWithTopic = overlapRatio(text, fallbackTopic);
  const shouldUseContext =
    Boolean(fallbackTopic || lastBot) &&
    shortMessage &&
    overlapWithBot < 0.25 &&
    overlapWithTopic < 0.25;

  if (!shouldUseContext) {
    return { query: text, isFollowUp: false };
  }

  const isEl = /[α-ω]/i.test(`${text} ${fallbackTopic} ${lastBot}`);
  if (isEl) {
    return {
      query:
        `Τρέχον μήνυμα χρήστη: "${text}". ` +
        `Ερμήνευσέ το με βάση το πρόσφατο θέμα: "${fallbackTopic || '(χωρίς σαφές προηγούμενο θέμα)'}". ` +
        `Τελευταία απάντηση DialogosAI: "${lastBot || '(καμία)'}".`,
      isFollowUp: true,
    };
  }

  return {
    query:
      `Current user message: "${text}". ` +
      `Interpret it using recent topic: "${fallbackTopic || '(no clear previous topic)'}". ` +
      `Last DialogosAI reply: "${lastBot || '(none)'}".`,
    isFollowUp: true,
  };
}

export function buildConversationContext(messages, maxTurns = 6) {
  const usable = (messages || [])
    .filter((m) => m && typeof m.text === 'string' && m.text.trim())
    .slice(-maxTurns);
  return usable
    .map((m) => `${m.sender === 'user' ? 'USER' : 'DIALOGOSAI'}: ${m.text.trim()}`)
    .join('\n');
}

export function isContinuationDirective(resolvedQuery) {
  const n = normalize(resolvedQuery || '');
  return (
    n.includes('ο χρηστης απαντησε') ||
    n.includes('the user gave a short reply') ||
    n.includes('τρεχον μηνυμα χρηστη') ||
    n.includes('current user message')
  );
}
