/**
 * Hybrid keyword retrieval (POAMSKP-style) — website chunks only, no client embeddings.
 */

import { normalize } from './conversationContext.js';

const BASE = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
const KNOWLEDGE_URL = `${BASE}/data/knowledge-index.json`;
const RULES_URL = `${BASE}/data/retrieval-rules.json`;
const FAQ_URL = `${BASE}/data/simasia-faq.json`;

const GREEKLISH = {
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th',
  ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p',
  ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'y', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o',
};

const QUERY_STOPWORDS_EL = new Set([
  'και', 'της', 'των', 'στο', 'στη', 'για', 'με', 'απο', 'ποια', 'ποιο', 'πως', 'που',
  'ειναι', 'μου', 'σας', 'δεν', 'ναι', 'οχι', 'θα', 'να', 'περισσοτερα',
]);

const QUERY_STOPWORDS_EN = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'what', 'how', 'are', 'can', 'you',
]);

const SIMASIA_SIGNAL_BASE =
  'simasia|σίμασια|σιμασια|sima\\b|simasiachatbots|pyxida|πυξιδα|πυξίδα|dialogosai|dialogos|ψηφιακη|υποδοχη|ypodochi|praxi|απανταει|simasiaedu|simasiastudio|simasiadaily|ai\\s+from\\s+the\\s+human|ανθρωποκεντρ|προϊον|προιον|product|εφαρμογ|application|επικοινων|contact|εταιρ|company|startup|chatbot|slogan|σύνθημα|συνθημα|αποστολ|mission|demo|συνεργ|ομαδ|ομάδ|team|τομει|τομέ|εργαζ|έρευν|research|αξι|φιλοσοφ|vision|όραμα|μελη|μηλος|ιδρυτ|founder';

let scopeSignalRegex = null;

const retrieverState = {
  docs: [],
  rules: {},
  faqEntries: [],
  ready: false,
  loading: null,
};

function escapeRegexToken(token) {
  return String(token || '')
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildScopeSignalRegex(rules = {}) {
  const parts = new Set();
  SIMASIA_SIGNAL_BASE.split('|').forEach((p) => {
    parts.add(p);
    const plain = p.replace(/\\b/g, '');
    if (/[α-ω]/.test(plain)) {
      const gl = foldGreeklishForMatch(toGreeklish(plain));
      if (gl.length >= 3) parts.add(escapeRegexToken(gl));
    }
  });

  const addScopeToken = (token) => {
    const n = normalize(token);
    if (n.length < 3) return;
    parts.add(escapeRegexToken(n));
    const gl = foldGreeklishForMatch(toGreeklish(n));
    if (gl.length >= 3 && gl !== n) parts.add(escapeRegexToken(gl));
  };

  (rules.scopeSignals || []).forEach(addScopeToken);

  (rules.domainPatterns || []).forEach((entry) => {
    (entry.query || []).forEach(addScopeToken);
  });

  (rules.topicBoosts || []).forEach((boost) => {
    (boost.query || []).forEach(addScopeToken);
  });

  return new RegExp(Array.from(parts).join('|'), 'i');
}

function getScopeSignalRegex() {
  if (!scopeSignalRegex) {
    scopeSignalRegex = buildScopeSignalRegex(retrieverState.rules);
  }
  return scopeSignalRegex;
}

export function getRetrievalScopeMinScore() {
  return Number(retrieverState.rules.retrievalScopeMinScore || 0.2);
}

function toGreeklish(text) {
  return normalize(text)
    .split('')
    .map((c) => GREEKLISH[c] || c)
    .join('');
}

/** Fold Greeklish spelling variants (y/i, ei/i, …) for cross-script retrieval. */
function foldGreeklishForMatch(text) {
  return normalize(String(text || ''))
    .replace(/th/g, 't')
    .replace(/ch/g, 'x')
    .replace(/ps/g, 'p')
    .replace(/ou/g, 'u')
    .replace(/ei/g, 'i')
    .replace(/ai/g, 'e')
    .replace(/oi/g, 'i')
    .replace(/y/g, 'i');
}

function sharedPrefixLength(a, b) {
  const fa = foldGreeklishForMatch(a);
  const fb = foldGreeklishForMatch(b);
  let i = 0;
  while (i < fa.length && i < fb.length && fa[i] === fb[i]) i += 1;
  return i;
}

function docGreeklishBlob(doc) {
  return `${doc._titleGreeklish || ''} ${doc._contentGreeklish || ''} ${(doc._keywordGreeklish || []).join(' ')}`;
}

function foldedQueryTokens(queryNorm, queryGreeklish) {
  const folded = foldGreeklishForMatch(`${queryNorm} ${queryGreeklish}`);
  return folded.split(/[^a-z0-9]+/).filter((w) => w.length >= 3);
}

function scoreGreeklishFuzzy(queryWords, doc) {
  const foldedBlob = doc._foldedGreeklishBlob || foldGreeklishForMatch(docGreeklishBlob(doc));
  if (!foldedBlob.trim()) return 0;

  let score = 0;
  const blobWords = foldedBlob.split(/[^a-z0-9]+/).filter((w) => w.length >= 3);

  queryWords.forEach((word) => {
    if (word.length < 4) return;
    const foldedWord = foldGreeklishForMatch(word);

    if (foldedBlob.includes(foldedWord)) {
      score += 0.58;
      return;
    }

    const stem = foldedWord.slice(0, Math.min(6, foldedWord.length));
    if (stem.length >= 5 && foldedBlob.includes(stem)) {
      score += 0.48;
      return;
    }

    let bestPrefix = 0;
    blobWords.forEach((blobWord) => {
      bestPrefix = Math.max(bestPrefix, sharedPrefixLength(foldedWord, blobWord));
    });

    if (bestPrefix >= 6) score += 0.44;
    else if (bestPrefix >= 5) score += 0.34;
    else if (bestPrefix >= 4) score += 0.22;
  });

  return score;
}

function topicTermMatchesQuery(queryNorm, queryGreeklish, term) {
  const tn = normalize(term);
  if (!tn) return false;
  if (queryNorm.includes(tn)) return true;

  const foldedQuery = foldGreeklishForMatch(`${queryNorm} ${queryGreeklish}`);
  const foldedTerm = foldGreeklishForMatch(toGreeklish(term));
  if (foldedTerm.length >= 3 && foldedQuery.includes(foldedTerm)) return true;

  if (foldedTerm.length >= 4) {
    const tokens = foldedQueryTokens(queryNorm, queryGreeklish);
    return tokens.some(
      (qt) =>
        qt.length >= 4 &&
        sharedPrefixLength(qt, foldedTerm) >= Math.min(5, foldedTerm.length, qt.length)
    );
  }
  return false;
}

function querySignalsCollaborations(queryNorm, queryGreeklish) {
  const folded = foldGreeklishForMatch(`${queryNorm} ${queryGreeklish}`);
  return (
    /συνεργ|collaboration|partner|poamskp|myrto|\bk3\b/.test(queryNorm) ||
    /sinerg|synerg|collabor|partner|poamskp|myrto/.test(folded)
  );
}

function querySignalsDemo(queryNorm, queryGreeklish) {
  const folded = foldGreeklishForMatch(`${queryNorm} ${queryGreeklish}`);
  return /demo|ραντεβ|book|κλεισ|randev|kleis/.test(queryNorm) || /demo|randev|kleis/.test(folded);
}

function topicTermMatchesBlob(blob, term) {
  const tn = normalize(term);
  if (!tn) return false;
  if (blob.includes(tn)) return true;
  const foldedBlob = foldGreeklishForMatch(toGreeklish(blob));
  const foldedTerm = foldGreeklishForMatch(toGreeklish(term));
  if (foldedTerm.length >= 3 && foldedBlob.includes(foldedTerm)) return true;
  if (foldedTerm.length >= 4) {
    const blobWords = foldedBlob.split(/[^a-z0-9]+/).filter((w) => w.length >= 3);
    return blobWords.some(
      (bw) => sharedPrefixLength(bw, foldedTerm) >= Math.min(5, foldedTerm.length, bw.length)
    );
  }
  return false;
}

export function detectLanguage(text) {
  const greekChars = String(text || '').match(/[α-ωΑ-ΩΆΈΉΊΌΎΏάέήίόύώϊΐϋΰ]/g);
  return greekChars && greekChars.length > 0 ? 'el' : 'en';
}

/** Reply language: Greek script → Greek; clear English → English; else site default (usually Greek). */
export function detectReplyLanguage(text, uiLanguage = 'el') {
  const raw = String(text || '').trim();
  if (/[α-ωΑ-ΩΆΈΉΊΌΎΏάέήίόύώ]/.test(raw)) return 'el';

  const norm = normalize(raw);
  const englishCue =
    /\b(what|how|who|why|when|where|can|you|your|the|is|are|please|thanks|hello|hi|book|demo)\b/.test(
      norm
    );
  const greeklishCue =
    /\b(ti|poia|poio|pos|pws|einai|eimai|gia|kai|mas|sas|thelw|thelo|melh|omada|iatreio|idiotes|idiotites)\b/.test(
      norm
    );

  if (englishCue && !greeklishCue) return 'en';
  if (greeklishCue) return 'el';
  return uiLanguage === 'en' ? 'en' : 'el';
}

/** Map legacy product names to Pyxida for retrieval & scope. */
export function expandProductAliases(text) {
  return String(text || '')
    .replace(/\bdialogos\s*ai\b/gi, 'Pyxida')
    .replace(/\bdialogosai\b/gi, 'Pyxida')
    .replace(/\bδιαλογος\s*ai\b/gi, 'Pyxida')
    .replace(/\bδιαλογοςαι\b/gi, 'Pyxida');
}

function cleanQueryToken(token) {
  return String(token || '').replace(/[^a-z0-9α-ω]/gi, '').trim();
}

function extractQueryWords(queryNorm, language) {
  const stop = language === 'el' ? QUERY_STOPWORDS_EL : QUERY_STOPWORDS_EN;
  return queryNorm
    .split(/\s+/)
    .map(cleanQueryToken)
    .filter((w) => w.length > 2 && !stop.has(w));
}

function docTextBlob(doc) {
  return normalize(
    `${doc.title || ''} ${doc.content || ''} ${(doc.keywords || []).join(' ')}`
  );
}

function docOrg(doc) {
  if (doc.org) return String(doc.org);
  const url = normalize(String(doc.url || ''));
  if (url.includes('chatbot')) return 'chatbots';
  if (url.includes('edu')) return 'edu';
  if (url.includes('studio')) return 'studio';
  if (url.includes('daily')) return 'daily';
  return 'simasia';
}

function detectTargetOrgs(queryNorm) {
  const targets = new Set();
  (retrieverState.rules.domainPatterns || []).forEach((entry) => {
    (entry.query || []).forEach((token) => {
      const t = normalize(token);
      if (queryNorm.includes(t) || t.includes(queryNorm)) {
        targets.add(entry.org);
      }
    });
  });
  return targets;
}

function hasSimasiaTopicSignals(text) {
  return getScopeSignalRegex().test(normalize(text || ''));
}

/** True when query terms overlap website KB (dynamic, not hardcoded per test). */
export function queryAlignsWithKnowledge(text) {
  const queryNorm = normalize(text || '');
  if (!queryNorm || queryNorm.length < 4) return false;

  const lang = detectLanguage(text);
  const words = extractQueryWords(queryNorm, lang);
  if (!words.length) return false;

  let bestHits = 0;
  for (const doc of retrieverState.docs) {
    const blob = docTextBlob(doc);
    const hits = words.filter((w) => blob.includes(w)).length;
    if (hits > bestHits) bestHits = hits;
    if (hits >= 2) return true;
    if (words.length <= 3 && hits >= 1 && blob.length > 80) return true;
  }
  return false;
}

function faqTriggerMatches(queryNorm, queryGreeklishNorm, trigger) {
  const tn = normalize(trigger);
  const tnGl = toGreeklish(trigger);
  return (
    queryNorm.includes(tn) ||
    queryGreeklishNorm.includes(tn) ||
    queryNorm.includes(tnGl) ||
    queryGreeklishNorm.includes(tnGl)
  );
}

function faqDocsForQuery(query) {
  const qn = normalize(query);
  const qnGl = toGreeklish(query);
  const out = [];
  (retrieverState.faqEntries || []).forEach((entry) => {
    const triggers = entry.triggers || [];
    if (triggers.some((t) => faqTriggerMatches(qn, qnGl, t))) {
      out.push({
        id: entry.id,
        title: entry.title || 'FAQ',
        content: entry.content || '',
        keywords: triggers,
        url: 'faq://simasia',
        language: 'el',
        category: 'faq',
        source: { type: 'faq' },
        org: 'simasia',
        relevanceScore: 4,
        _titleNorm: normalize(entry.title || ''),
        _contentNorm: normalize(entry.content || ''),
        _keywordNorms: triggers.map((t) => normalize(t)),
        _titleGreeklish: toGreeklish(entry.title || ''),
        _contentGreeklish: toGreeklish(entry.content || ''),
        _keywordGreeklish: triggers.map((t) => toGreeklish(t)),
      });
    }
  });
  return out;
}

function applyRetrievalRelevanceAdjustments(score, doc, queryNorm, topicContextNorm = '', queryGreeklish = '') {
  const targets = detectTargetOrgs(queryNorm);
  const blob = docTextBlob(doc);
  const effectiveNorm = `${queryNorm} ${topicContextNorm || ''}`.trim();
  const effectiveGreeklish = `${queryGreeklish || toGreeklish(queryNorm)} ${toGreeklish(topicContextNorm || '')}`.trim();
  const simasiaQuery =
    hasSimasiaTopicSignals(effectiveNorm) ||
    hasSimasiaTopicSignals(foldGreeklishForMatch(effectiveGreeklish));
  const simasiaDoc = getScopeSignalRegex().test(blob);
  const org = docOrg(doc);

  if (simasiaQuery && simasiaDoc) {
    score += 0.22;
  } else if (simasiaQuery && !simasiaDoc) {
    score *= 0.5;
  }

  (retrieverState.rules.topicBoosts || []).forEach((boost) => {
    const qHit = (boost.query || []).some((t) =>
      topicTermMatchesQuery(effectiveNorm, effectiveGreeklish, t)
    );
    const bHit = (boost.blob || []).some((t) => topicTermMatchesBlob(blob, t));
    if (qHit && bHit) score += Number(boost.add || 0.3);
  });

  if (targets.size) {
    if (targets.has(org)) score += Number(retrieverState.rules.domainBoost || 0.45);
    else if (org !== 'simasia' && !targets.has('simasia')) {
      score *= Number(retrieverState.rules.domainPenalty || 0.15);
    }
  }

  if (/επικοινων|contact|email|mail/.test(queryNorm) && /contact@|επικοινων|email|athens/.test(blob)) {
    score += 0.45;
  }

  if (
    /θεσσαλονικ|thessaloniki|πατρα|patras|γραφειο|εδρα|που ειστε|where are you/.test(
      queryNorm
    ) &&
    /αθηνα|athens|contact@/.test(blob)
  ) {
    score += 0.55;
  }

  const identityDoc = doc.category === 'identity' || doc.source?.type === 'core_rag';
  if (identityDoc) {
    score += Number(retrieverState.rules.identityDocBoost || 0.28);
    if (
      /ποιοι|τι ειναι|what is|chatbot|compliant|gdpr|ai act|wcag|demo|ανθρωποκεντρ|b2b|roi/i.test(
        queryNorm
      )
    ) {
      score += 0.22;
    }
  }

  score += Number(doc.priority || 0) * 0.12;

  if (doc.source?.type === 'page_i18n') score *= 1.1;
  else if (doc.source?.type === 'core_rag') score *= 1.05;
  else if (doc.source?.type === 'rag_txt') score *= 0.85;

  const docUrl = String(doc.url || '').trim().replace(/\/+$/, '');
  if (querySignalsCollaborations(queryNorm, queryGreeklish)) {
    if (docUrl === '/collaborations') score += 0.55;
    if (docUrl === '/demo' && !querySignalsDemo(queryNorm, queryGreeklish)) score *= 0.28;
  }

  return score;
}

async function initRetriever() {
  if (retrieverState.ready) return;
  if (retrieverState.loading) {
    await retrieverState.loading;
    return;
  }

  retrieverState.loading = (async () => {
    const [kbRes, rulesRes, faqRes] = await Promise.all([
      fetch(KNOWLEDGE_URL, { cache: 'no-store' }),
      fetch(RULES_URL, { cache: 'no-store' }),
      fetch(FAQ_URL, { cache: 'no-store' }),
    ]);

    if (!kbRes.ok) throw new Error('Failed to load knowledge index');
    const kb = await kbRes.json();
    if (rulesRes.ok) {
      retrieverState.rules = await rulesRes.json();
      scopeSignalRegex = buildScopeSignalRegex(retrieverState.rules);
    }
    if (faqRes.ok) {
      const faqPayload = await faqRes.json();
      retrieverState.faqEntries = faqPayload.entries || [];
    }

    retrieverState.docs = (kb.documents || []).map((doc) => {
      const lang = doc.language || doc.lang || 'en';
      return {
        ...doc,
        language: lang,
        _titleNorm: normalize(doc.title || ''),
        _contentNorm: normalize(doc.content || ''),
        _keywordNorms: (doc.keywords || []).map((k) => normalize(k)),
        _titleGreeklish: toGreeklish(doc.title || ''),
        _contentGreeklish: toGreeklish(doc.content || ''),
        _keywordGreeklish: (doc.keywords || []).map((k) => toGreeklish(k)),
        _foldedGreeklishBlob: foldGreeklishForMatch(
          `${toGreeklish(doc.title || '')} ${toGreeklish(doc.content || '')} ${(doc.keywords || []).map((k) => toGreeklish(k)).join(' ')}`
        ),
      };
    });
    retrieverState.ready = true;
  })();

  await retrieverState.loading;
}

export async function retrieveRelevantDocs(query, topN = 6, preferredLanguage = null, topicContext = '') {
  await initRetriever();

  const rules = retrieverState.rules || {};
  const retrievePool = Number(rules.retrievePool || 20);
  const sendToModel = topN || Number(rules.sendToModel || 6);
  const minScore = Number(rules.minScore || 0.18);
  const maxChunksPerUrl = Number(rules.maxChunksPerUrl || 2);
  const language = preferredLanguage || detectLanguage(query);
  const queryNorm = normalize(query);
  const topicContextNorm = normalize(topicContext || '');
  const queryGreeklish = toGreeklish(query);
  const queryWords = extractQueryWords(queryNorm, language);
  const queryGreeklishWords = extractQueryWords(queryGreeklish, language);

  if (!queryWords.length && !faqDocsForQuery(query).length) return [];

  const normalizeDocUrl = (url) => String(url || '').trim().replace(/\/+$/, '');

  const scored = retrieverState.docs
    .filter((doc) => doc.language === language)
    .map((doc) => {
      const titleNorm = doc._titleNorm || '';
      const contentNorm = doc._contentNorm || '';
      const keywordNorms = doc._keywordNorms || [];
      const titleGreeklish = doc._titleGreeklish || '';
      const contentGreeklish = doc._contentGreeklish || '';
      const keywordGreeklish = doc._keywordGreeklish || [];

      let score = 0;
      if (titleNorm.includes(queryNorm)) score += 1.2;
      if (language === 'el' && titleGreeklish.includes(queryGreeklish)) score += 1.0;

      queryWords.forEach((w) => {
        if (titleNorm.includes(w)) score += 0.5;
        const keywordHits = keywordNorms.reduce(
          (acc, k) => acc + (k.includes(w) || w.includes(k) ? 1 : 0),
          0
        );
        if (keywordHits) score += Math.min(0.45, keywordHits * 0.15);
        if (contentNorm.includes(w)) score += 0.08;
      });

      if (language === 'el') {
        queryGreeklishWords.forEach((w) => {
          if (titleGreeklish.includes(w)) score += 0.45;
          const kwHits = keywordGreeklish.reduce(
            (acc, k) => acc + (k.includes(w) || w.includes(k) ? 1 : 0),
            0
          );
          if (kwHits) score += Math.min(0.4, kwHits * 0.12);
          if (contentGreeklish.includes(w)) score += 0.06;
        });

        const fuzzyWords =
          queryGreeklishWords.length >= queryWords.length ? queryGreeklishWords : queryWords;
        score += scoreGreeklishFuzzy(fuzzyWords, doc);
      }

      score = applyRetrievalRelevanceAdjustments(
        score,
        doc,
        queryNorm,
        topicContextNorm,
        queryGreeklish
      );
      return { ...doc, relevanceScore: score };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .filter((doc) => doc.relevanceScore > minScore);

  const uniqueByPage = [];
  const urlCounts = new Map();
  for (const doc of scored) {
    const pageKey = normalizeDocUrl(doc.url) || doc.id;
    const n = urlCounts.get(pageKey) || 0;
    if (n >= maxChunksPerUrl) continue;
    urlCounts.set(pageKey, n + 1);
    uniqueByPage.push(doc);
    if (uniqueByPage.length >= retrievePool) break;
  }

  const merged = new Map();
  uniqueByPage.forEach((d) => merged.set(d.id, d));
  faqDocsForQuery(query).forEach((d) => merged.set(d.id, d));

  return Array.from(merged.values())
    .sort((a, b) => {
      const aFaq = a.source?.type === 'faq' ? 1 : 0;
      const bFaq = b.source?.type === 'faq' ? 1 : 0;
      if (aFaq !== bFaq) return bFaq - aFaq;
      return b.relevanceScore - a.relevanceScore;
    })
    .slice(0, sendToModel);
}

export async function retrieveRelevantDocsWithContext(
  userText,
  messages,
  topN,
  preferredLanguage,
  lastResolvedQuery = ''
) {
  const base = String(userText || '').trim();
  const topicParts = [];
  for (let i = messages.length - 1; i >= 0 && topicParts.length < 4; i -= 1) {
    const msg = messages[i];
    if (!msg || msg.sender !== 'user' || !msg.text) continue;
    topicParts.push(String(msg.text).trim());
  }
  if (lastResolvedQuery) topicParts.push(lastResolvedQuery);
  const topicContext = topicParts.reverse().join(' ');

  const lang = preferredLanguage || detectLanguage(`${base} ${topicContext}`);
  const baseHits = await retrieveRelevantDocs(base, Math.max(topN * 2, 6), lang, topicContext);
  const baseTopScore = baseHits.length ? Number(baseHits[0].relevanceScore || 0) : 0;

  if (baseTopScore >= 0.32) {
    return baseHits.slice(0, topN);
  }

  const lastUserTopic = topicParts.filter((t) => t !== base).slice(-1)[0] || '';
  const lastBot = (() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const msg = messages[i];
      if (msg && msg.sender === 'bot' && msg.text) return String(msg.text).slice(0, 220);
    }
    return '';
  })();

  const variants = [{ text: base, weight: 1, docs: baseHits }];
  if (lastUserTopic && normalize(lastUserTopic) !== normalize(base)) {
    variants.push({ text: `${base}\n${lastUserTopic}`, weight: 0.78 });
  }
  if (lastBot) {
    variants.push({ text: `${base}\n${lastBot}`, weight: 0.62 });
  }

  const merged = new Map();
  for (const variant of variants) {
    const hits = Array.isArray(variant.docs)
      ? variant.docs
      : await retrieveRelevantDocs(variant.text, Math.max(topN * 2, 6), lang, topicContext);

    hits.forEach((doc) => {
      const weightedScore = Number(doc.relevanceScore || 0) * variant.weight;
      const existing = merged.get(doc.id);
      if (!existing || weightedScore > existing.relevanceScore) {
        merged.set(doc.id, { ...doc, relevanceScore: weightedScore });
      }
    });
  }

  return Array.from(merged.values())
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, topN);
}

export function buildContext(docs) {
  if (!docs || docs.length === 0) return '';
  // Cap each chunk so we never ship near-full pages into the prompt.
  const MAX_CONTENT = 900;
  return docs
    .map((doc) => {
      let content = String(doc.content || '').trim();
      if (content.length > MAX_CONTENT) {
        content = `${content.slice(0, MAX_CONTENT - 1)}…`;
      }
      return `SOURCE_TITLE: ${doc.title}\nSOURCE_CONTENT:\n${content}`;
    })
    .join('\n\n---\n\n');
}

export { hasSimasiaTopicSignals };
