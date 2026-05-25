/**
 * Retriever Service - Semantic Search using Gemini Embeddings
 */

import knowledgeBase from '../knowledge/chatbotKnowledge.json';
import { getEmbedding } from './geminiService';
import { normalize } from './conversationContext';
import { hasSimasiaTopicSignals } from './scopeGuard';

const OFF_TOPIC_QUERY_REGEX =
  /μητσοτακ|τσιπρα|παπανδρεου|κυβερνηση|κυβέρνηση|πρωθυπουργ|πολιτικ|trump|biden|putin|celebrity|διασημο/i;

const SIMASIA_DOC_REGEX =
  /simasia|σίμασια|σιμασια|hammer|chatbot|frontistiriarxis|product|προϊον|προιον|solution|λύση|λυση/i;

class SemanticRetriever {
  constructor(documents) {
    this.documents = documents;
    this.docEmbeddings = new Map();
    this.isReady = false;
    this.initEmbeddings();
  }

  async initEmbeddings() {
    console.log('🏗️  Initializing Semantic Embeddings knowledge base...');

    const BATCH_SIZE = 3;
    const chunks = [];
    for (let i = 0; i < this.documents.length; i += BATCH_SIZE) {
      chunks.push(this.documents.slice(i, i + BATCH_SIZE));
    }

    let processedCount = 0;
    for (const chunk of chunks) {
      const promises = chunk.map(async (doc) => {
        try {
          const textToEmbed = `${doc.title}\n${doc.content}\nKeywords: ${(doc.keywords || []).join(', ')}`;
          const embedding = await getEmbedding(textToEmbed);
          this.docEmbeddings.set(doc.id, embedding);
        } catch (e) {
          console.warn(`⚠️ Failed to embed doc ${doc.id}: ${e.message}`);
        }
      });
      await Promise.allSettled(promises);
      processedCount += chunk.length;
      console.log(
        `⏳ Indexed ${Math.min(processedCount, this.documents.length)}/${this.documents.length} documents...`
      );
    }

    this.isReady = true;
    console.log(`✅ Embedding Database Ready: ${this.docEmbeddings.size} documents indexed.`);
  }

  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  applyRelevanceAdjustments(score, doc, queryNorm, topicContextNorm = '') {
    const blob = normalize(
      `${doc.title || ''} ${doc.content || ''} ${(doc.keywords || []).join(' ')}`
    );
    const effectiveNorm = `${queryNorm} ${topicContextNorm || ''}`.trim();
    const simasiaQuery = hasSimasiaTopicSignals(effectiveNorm);
    const simasiaDoc = SIMASIA_DOC_REGEX.test(blob);
    const offTopicQuery = OFF_TOPIC_QUERY_REGEX.test(queryNorm);

    if (offTopicQuery) {
      score *= 0.15;
    } else if (simasiaQuery && simasiaDoc) {
      score += 0.12;
    } else if (simasiaQuery && !simasiaDoc) {
      score *= 0.55;
    }

    if (/επικοινων|contact|email|τηλ/.test(effectiveNorm) && /επικοινων|contact|email|phone|τηλ/.test(blob)) {
      score += 0.1;
    }
    if (/προϊον|προιον|product/.test(effectiveNorm) && /προϊον|προιον|product/.test(blob)) {
      score += 0.1;
    }

    return score;
  }

  async search(query, language, topN = 5, topicContext = '') {
    let checks = 0;
    while (!this.isReady && checks < 25) {
      console.log(`⏳ Embeddings still loading... waiting (${checks + 1}/25s)`);
      await new Promise((r) => setTimeout(r, 1000));
      checks++;
    }

    if (!this.isReady) {
      console.warn('⚠️ Search running with partial index (timed out waiting for init)');
    }

    const topicContextNorm = normalize(topicContext || '');
    const embedQuery =
      topicContextNorm && topicContextNorm !== normalize(query)
        ? `${query}\n${topicContext}`
        : query;

    console.log(`🤖 Semantic Search for: "${query}"`);

    let queryVector;
    try {
      queryVector = await getEmbedding(embedQuery);
    } catch (e) {
      console.error('❌ Failed to embed query:', e);
      throw new Error(`Embedding failed: ${e.message}`);
    }

    const queryNorm = normalize(query);
    const queryWords = queryNorm.split(/\s+/).filter((w) => w.length > 2);

    const scoredDocs = this.documents
      .filter((doc) => doc.language === language)
      .map((doc) => {
        const docVector = this.docEmbeddings.get(doc.id);
        let score = docVector ? this.cosineSimilarity(queryVector, docVector) : 0;
        const semanticScore = score;

        let keywordBonus = 0;
        const titleNorm = normalize(doc.title || '');
        if (titleNorm.includes(queryNorm)) keywordBonus += 0.3;

        (doc.keywords || []).forEach((k) => {
          const kNorm = normalize(k);
          queryWords.forEach((qWord) => {
            if (kNorm.includes(qWord) || qWord.includes(kNorm)) keywordBonus += 0.15;
          });
        });

        score += keywordBonus;
        score = this.applyRelevanceAdjustments(score, doc, queryNorm, topicContextNorm);

        return {
          ...doc,
          relevanceScore: score,
          debugScore: `Total: ${score.toFixed(3)} (Sem: ${semanticScore.toFixed(3)} + Boost: ${keywordBonus.toFixed(3)})`,
        };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    console.log('🔍 Top 3 hybrid matches:');
    scoredDocs.slice(0, 3).forEach((d, i) =>
      console.log(`   ${i + 1}. [${d.id}] ${d.title} | ${d.debugScore}`)
    );

    const minScore = OFF_TOPIC_QUERY_REGEX.test(queryNorm) ? 0.42 : 0.28;
    const results = scoredDocs.filter((doc) => doc.relevanceScore > minScore).slice(0, topN);

    console.log(`📊 Found ${results.length} relevant documents (score > ${minScore}):`);
    return results;
  }
}

let retrieverInstance = null;

function getRetriever() {
  if (!retrieverInstance) {
    retrieverInstance = new SemanticRetriever(knowledgeBase.documents);
  }
  return retrieverInstance;
}

export function detectLanguage(text) {
  const greekChars = String(text || '').match(/[α-ωΑ-ΩΆΈΉΊΌΎΏάέήίόύώϊΐϋΰ]/g);
  return greekChars && greekChars.length > 0 ? 'el' : 'en';
}

export async function retrieveRelevantDocs(query, topN = 5, preferredLanguage = null, topicContext = '') {
  if (!query || !String(query).trim()) return [];

  const language = preferredLanguage || detectLanguage(query);
  const retriever = getRetriever();
  return retriever.search(query, language, topN, topicContext);
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

  if (baseTopScore >= 0.4) {
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
  return docs
    .map((doc) => `SOURCE_TITLE: ${doc.title}\nSOURCE_CONTENT:\n${doc.content}`)
    .join('\n\n---\n\n');
}

export function getSuggestedQuestions() {
  return [];
}
