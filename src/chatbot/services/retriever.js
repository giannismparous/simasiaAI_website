/**
 * Retriever Service - Semantic Search using Gemini Embeddings
 * "Dynamic and works for anything" approach
 */

import knowledgeBase from '../knowledge/chatbotKnowledge.json';
import { getEmbedding } from './geminiService';

class SemanticRetriever {
  constructor(documents) {
    this.documents = documents;
    this.docEmbeddings = new Map(); // Store embeddings by doc ID
    this.isReady = false;
    
    // Initializing in constructor is risky for async, 
    // but we'll trigger it and handle readiness in search
    this.initEmbeddings();
  }

  async initEmbeddings() {
    console.log('🏗️  Initializing Semantic Embeddings knowledge base...');
    
    // Process in batches of 3 to avoid rate limits
    const BATCH_SIZE = 3;
    const chunks = [];
    
    for (let i = 0; i < this.documents.length; i += BATCH_SIZE) {
        chunks.push(this.documents.slice(i, i + BATCH_SIZE));
    }
    
    let processedCount = 0;
    
    for (const chunk of chunks) {
        const promises = chunk.map(async (doc) => {
            try {
                // Embed title + content for rich context
                const textToEmbed = `${doc.title}\n${doc.content}\nKeywords: ${doc.keywords.join(', ')}`;
                const embedding = await getEmbedding(textToEmbed);
                this.docEmbeddings.set(doc.id, embedding);
            } catch (e) {
                console.warn(`⚠️ Failed to embed doc ${doc.id}: ${e.message}`);
                // Retry once?
            }
        });
        
        await Promise.allSettled(promises);
        processedCount += chunk.length;
        console.log(`⏳ Indexed ${Math.min(processedCount, this.documents.length)}/${this.documents.length} documents...`);
    }

    this.isReady = true;
    console.log(`✅ Embedding Database Ready: ${this.docEmbeddings.size} documents indexed.`);
  }

  // Calculate Cosine Similarity
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

  async search(query, language, topN = 5) {
    // Wait for initialization to complete (up to 20 seconds)
    // This fixes the race condition where search runs before indexing finishes
    let checks = 0;
    while (!this.isReady && checks < 20) {
        console.log(`⏳ Embeddings still loading... waiting (${checks + 1}/20s)`);
        await new Promise(r => setTimeout(r, 1000));
        checks++;
    }

    if (!this.isReady) {
        console.warn('⚠️ Search running with partial index (Timed out waiting for init)');
    }

    console.log(`🤖 Semantic Search for: "${query}"`);
    
    // 1. Get query embedding
    let queryVector;
    try {
        queryVector = await getEmbedding(query);
        console.log(`✅ Query embedded successfully (Vector Dimension: ${queryVector.length})`);
    } catch (e) {
        console.error('❌ Failed to embed query:', e);
        return [];
    }
    
    // 2. Normalize text helper
    const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const queryNorm = normalize(query);
    const queryWords = queryNorm.split(/\s+/).filter(w => w.length > 2);

    // 3. Compare with all docs of correct language
    const scoredDocs = this.documents
        .filter(doc => doc.language === language)
        .map(doc => {
            const docVector = this.docEmbeddings.get(doc.id);
            // Base semantic score
            let score = docVector ? this.cosineSimilarity(queryVector, docVector) : 0;
            const semanticScore = score; // Store for debug

            // Keyword Boosting (Hybrid Search)
            let keywordBonus = 0;
            
            // A. Title Match Bonus
            const titleNorm = normalize(doc.title);
            if (titleNorm.includes(queryNorm)) {
                keywordBonus += 0.3; // Strong bonus for title match
            }

            // B. Keyword List Bonus
            doc.keywords.forEach(k => {
                const kNorm = normalize(k);
                queryWords.forEach(qWord => {
                    if (kNorm.includes(qWord) || qWord.includes(kNorm)) {
                        keywordBonus += 0.15;
                    }
                });
            });

            score += keywordBonus;

            return { 
                ...doc, 
                relevanceScore: score,
                debugScore: `Total: ${score.toFixed(3)} (Sem: ${semanticScore.toFixed(3)} + Boost: ${keywordBonus.toFixed(3)})`
            };
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore);

    // DEBUG: Log top 3 matches with breakdown
    console.log('🔍 Top 3 hybrid matches:');
    scoredDocs.slice(0, 3).forEach((d, i) => 
        console.log(`   ${i+1}. [${d.id}] ${d.title} | ${d.debugScore}`)
    );

    const results = scoredDocs
        .filter(doc => doc.relevanceScore > 0.25)
        .slice(0, topN);

    console.log(`📊 Found ${results.length} relevant documents (Hybrid Score > 0.25):`);
    
    return results;
  }
}

// Singleton
let retrieverInstance = null;

function getRetriever() {
  if (!retrieverInstance) {
    retrieverInstance = new SemanticRetriever(knowledgeBase.documents);
  }
  return retrieverInstance;
}

/**
 * Detect language of text
 */
export function detectLanguage(text) {
  const greekChars = text.match(/[α-ωΑ-ΩΆΈΉΊΌΎΏάέήίόύώϊΐϋΰ]/g);
  return greekChars && greekChars.length > 0 ? 'el' : 'en';
}

/**
 * Retrieve relevant documents
 */
export async function retrieveRelevantDocs(query, topN = 5) {
  if (!query || !query.trim()) return [];
  
  const language = detectLanguage(query);
  const retriever = getRetriever();
  
  return await retriever.search(query, language, topN);
}

export function buildContext(docs) {
  if (!docs || docs.length === 0) return '';
  return docs.map((doc, i) => 
    `SOURCE_TITLE: ${doc.title}\nSOURCE_CONTENT:\n${doc.content}`
  ).join('\n\n---\n\n');
}

export function getSuggestedQuestions() {
    return [];
}
