require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const knowledge = require('./src/chatbot/knowledge/chatbotKnowledge.json');

const apiKeysStr = process.env.REACT_APP_GEMINI_API_KEY || '';
const API_KEY = apiKeysStr.split(',')[0].trim();

if (!API_KEY) {
    console.error("NO API KEY FOUND IN .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

async function runDebug() {
    console.log("--- STARTING GENERATION TEST ---");
    console.log("Key (masked):", API_KEY.substring(0, 8) + "...");

    const query = "Τι είναι το Simasia AI;";
    // MANUALLY retrieve doc_101
    const targetDoc = knowledge.documents.find(d => d.id === 'doc_101');
    const context = `[Πηγή 1: ${targetDoc.title}]\n${targetDoc.content}`;
    
    const systemPrompt = `Είσαι ο Simasia Bot, ο έξυπνος βοηθός της SimasiaAI. Απαντάς ερωτήσεις χρησιμοποιώντας ΜΟΝΟ τις πληροφορίες που παρέχονται παρακάτω.

**ΔΙΑΘΕΣΙΜΕΣ ΠΛΗΡΟΦΟΡΙΕΣ:**
${context}

**ΕΡΩΤΗΣΗ ΧΡΗΣΤΗ:** ${query}

**ΑΠΑΝΤΗΣΗ:**`;

    console.log("\n=== TEST 3: FULL RAG GENERATION (Manual Context) ===");
    try {
        console.log("   Sending prompt with context...");
        const result = await chatModel.generateContent(systemPrompt);
        const response = result.response.text();
        console.log("\n✅ GEMINI RESPONSE TO 'Τι είναι το Simasia AI?':\n");
        console.log(response.trim());
    } catch (e) {
        console.error("🚨 GENERATION API FAILED:", e.message);
    }
}

runDebug();
