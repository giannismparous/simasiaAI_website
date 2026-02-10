/**
 * RAG Test Script - Tests retrieval with 20 queries (10 Greek, 10 English)
 * Run with: node test_rag.js
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const knowledgeBase = require('./src/chatbot/knowledge/chatbotKnowledge.json');

// API keys from .env
const apiKeys = 'AIzaSyBHS4JzYJN4WCnCMEkQGRmH5WcYEp2a6Ek,AIzaSyBiz8JNtkNAEigg9o3z-Qhb8OKCwTShyvg,AIzaSyC8D_NH27J3qxnnQtoECNmSujT1vZHgHhk,AIzaSyBDemIkcYrE16LbANGceRV25ZWcY7PDfGA,AIzaSyAjxiTHYsytDQ-v_QUEVt7NA9w2nPQ6LbY,AIzaSyD6gG6czKqk4ft7jbtrwsLFbLC4kpu-SeE,AIzaSyAYKorALX6q64UopiYFiaGNSw09DIRgPik,AIzaSyCjdy383w2DQ57fNjJI1MzwW-CiEoLJJh4'.split(',');

function getKey() {
    return apiKeys[Math.floor(Math.random() * apiKeys.length)];
}

async function getEmbedding(text) {
    const apiKey = getKey();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const cleanedText = text.replace(/\n/g, ' ');
    const result = await model.embedContent(cleanedText);
    if (!result || !result.embedding || !result.embedding.values) {
        throw new Error('Empty embedding');
    }
    return result.embedding.values;
}

function cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function detectLanguage(text) {
    const greekChars = text.match(/[α-ωΑ-ΩΆΈΉΊΌΎΏάέήίόύώϊΐϋΰ]/g);
    return greekChars && greekChars.length > 0 ? 'el' : 'en';
}

const TEST_QUERIES = [
    // 10 Greek queries
    'Τι είναι το Simasia AI;',
    'Ποια είναι τα προϊόντα;',
    'Πώς μπορεί το SimasiaAI να βοηθήσει την επιχείρησή μου;',
    'Τι είναι τα SimasiaChatbots;',
    'Ποια είναι η αποστολή σας;',
    'Τι είναι ο Hammer Editor;',
    'Ποιοι είστε;',
    'Τι τεχνολογίες χρησιμοποιείτε;',
    'Πού βρίσκεστε;',
    'Πώς μπορώ να επικοινωνήσω μαζί σας;',
    // 10 English queries
    'What is SimasiaAI?',
    'What products do you offer?',
    'How can SimasiaAI help my business?',
    'What is SimasiaChatbots?',
    'What is your mission?',
    'What is Hammer Editor?',
    'Who are you?',
    'What technologies do you use?',
    'Where are you located?',
    'How can I contact you?',
];

async function main() {
    console.log('=== RAG RETRIEVAL TEST ===');
    console.log(`Knowledge base: ${knowledgeBase.documents.length} documents`);
    
    const elDocs = knowledgeBase.documents.filter(d => d.language === 'el');
    const enDocs = knowledgeBase.documents.filter(d => d.language === 'en');
    console.log(`  Greek docs: ${elDocs.length}`);
    console.log(`  English docs: ${enDocs.length}\n`);

    // Step 1: Embed all documents
    console.log('Step 1: Embedding all documents...');
    const docEmbeddings = new Map();
    let embeddingErrors = 0;
    
    for (let i = 0; i < knowledgeBase.documents.length; i++) {
        const doc = knowledgeBase.documents[i];
        try {
            const textToEmbed = `${doc.title}\n${doc.content}\nKeywords: ${doc.keywords.join(', ')}`;
            const embedding = await getEmbedding(textToEmbed);
            docEmbeddings.set(doc.id, embedding);
            process.stdout.write(`  ✅ ${doc.id} `);
            if ((i + 1) % 5 === 0) console.log('');
            // Small delay to avoid rate limits
            await new Promise(r => setTimeout(r, 200));
        } catch (e) {
            embeddingErrors++;
            console.log(`  ❌ ${doc.id}: ${e.message}`);
            await new Promise(r => setTimeout(r, 2000)); // Longer delay on error
        }
    }
    
    console.log(`\nEmbedded ${docEmbeddings.size}/${knowledgeBase.documents.length} documents (${embeddingErrors} errors)\n`);

    // Step 2: Test all queries
    console.log('Step 2: Testing queries...\n');
    let passed = 0;
    let failed = 0;
    const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    for (const query of TEST_QUERIES) {
        const lang = detectLanguage(query);
        try {
            const queryVector = await getEmbedding(query);
            const queryNorm = normalize(query);
            const queryWords = queryNorm.split(/\s+/).filter(w => w.length > 2);

            const scoredDocs = knowledgeBase.documents
                .filter(doc => doc.language === lang)
                .map(doc => {
                    const docVector = docEmbeddings.get(doc.id);
                    let score = docVector ? cosineSimilarity(queryVector, docVector) : 0;
                    
                    // Keyword boosting
                    let keywordBonus = 0;
                    const titleNorm = normalize(doc.title);
                    if (titleNorm.includes(queryNorm)) keywordBonus += 0.3;
                    doc.keywords.forEach(k => {
                        const kNorm = normalize(k);
                        queryWords.forEach(qWord => {
                            if (kNorm.includes(qWord) || qWord.includes(kNorm)) keywordBonus += 0.15;
                        });
                    });
                    score += keywordBonus;

                    return { id: doc.id, title: doc.title, score, semantic: score - keywordBonus, boost: keywordBonus };
                })
                .sort((a, b) => b.score - a.score);

            const results = scoredDocs.filter(d => d.score > 0.25).slice(0, 3);
            
            if (results.length > 0) {
                passed++;
                console.log(`✅ [${lang.toUpperCase()}] "${query}"`);
                results.forEach((r, i) => {
                    console.log(`   ${i+1}. ${r.title} | Score: ${r.score.toFixed(3)} (Sem: ${r.semantic.toFixed(3)} + Boost: ${r.boost.toFixed(3)})`);
                });
            } else {
                failed++;
                console.log(`❌ [${lang.toUpperCase()}] "${query}" - NO RESULTS`);
                console.log(`   Top 3 (below threshold):`);
                scoredDocs.slice(0, 3).forEach((r, i) => {
                    console.log(`   ${i+1}. ${r.title} | Score: ${r.score.toFixed(3)} (Sem: ${r.semantic.toFixed(3)} + Boost: ${r.boost.toFixed(3)})`);
                });
            }
            console.log('');
            await new Promise(r => setTimeout(r, 300));
        } catch (e) {
            failed++;
            console.log(`❌ [${lang.toUpperCase()}] "${query}" - ERROR: ${e.message}\n`);
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    console.log('=== RESULTS ===');
    console.log(`Passed: ${passed}/${TEST_QUERIES.length}`);
    console.log(`Failed: ${failed}/${TEST_QUERIES.length}`);
    
    if (failed > 0) {
        console.log('\n⚠️  Some queries failed! The RAG needs fixes.');
        process.exit(1);
    } else {
        console.log('\n✅ All queries returned relevant results!');
        process.exit(0);
    }
}

main().catch(e => {
    console.error('Fatal error:', e);
    process.exit(1);
});
