/**
 * Chat Service - RAG Orchestrator
 * Coordinates Retrieval-Augmented Generation flow
 */

import { generateWithTimeout } from './geminiService';
import { retrieveRelevantDocs, buildContext, detectLanguage } from './retriever';

/**
 * Answer user question using RAG (Retrieve → Augment → Generate)
 * 
 * @param {string} userQuestion - User's question
 * @param {string} language - Language preference ('greek' or 'english')
 * @returns {Promise<Object>} - Answer object with text, sources, and confidence
 */
export async function answerQuestion(userQuestion, language = null) {
  console.log(`💬 User Question: "${userQuestion}"`);
  
  // Auto-detect language if not specified
  if (!language) {
    language = detectLanguage(userQuestion);
  }
  
  // Step 1: Retrieve relevant documents from knowledge base
  // Reduced to 3 to focus on most relevant sources only
  console.log('📖 Step 1: Retrieving relevant documents...');
  const relevantDocs = await retrieveRelevantDocs(userQuestion, 3);
  
  // If no relevant documents found, return fallback
  if (relevantDocs.length === 0) {
    console.warn('⚠️  No relevant documents found');
    return {
      answer: language === 'el' 
        ? 'Συγγνώμη, δεν βρήκα σχετικές πληροφορίες για αυτό το ερώτημα. Μπορείς να το διατυπώσεις διαφορετικά;'
        : 'Sorry, I couldn\'t find relevant information for this question. Could you rephrase it?',
      sources: [],
      confidence: 0.0
    };
  }
  
  // Step 2: Build context from retrieved documents
  console.log('🔨 Step 2: Building context...');
  const context = buildContext(relevantDocs);
  
  // Step 3: Create RAG prompt
  console.log('✍️  Step 3: Creating RAG prompt...');
  const systemPrompt = createRAGPrompt(context, userQuestion, language);
  
  // Step 4: Generate answer using Gemini
  console.log('🤖 Step 4: Generating answer with Gemini...');
  try {
    const answer = await generateWithTimeout(systemPrompt, {
      timeout: 30000,
      maxRetries: 2,
      modelName: 'gemini-2.5-flash-lite'
    });
    
    // Calculate confidence
    const topScore = relevantDocs[0].relevanceScore;
    const confidence = topScore > 0.6 ? 0.95 : topScore > 0.4 ? 0.8 : 0.6;
    
    console.log('✅ Answer generated successfully');
    
    // Filter sources: Prioritize products, limit to 2-3 max visually
    // The UI receives all relevantDocs but the retrieval is already capped at 3
    const finalSources = relevantDocs.map(doc => ({
        title: doc.title,
        url: doc.url,
        category: doc.category
    }));

    return {
      answer: answer.trim(),
      sources: finalSources,
      confidence: confidence
    };
    
  } catch (error) {
    console.error('❌ Error generating answer:', error);
    
    return {
      answer: language === 'el'
        ? 'Συγγνώμη, παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.'
        : 'Sorry, an error occurred. Please try again.',
      sources: [],
      confidence: 0.0,
      error: error.message
    };
  }
}



/**
 * Create RAG prompt with context and question
 */
function createRAGPrompt(context, question, language) {
  if (language === 'el') {
    return `Είσαι ο Simasia Bot, ο έξυπνος βοηθός της SimasiaAI. Απαντάς ερωτήσεις χρησιμοποιώντας ΜΟΝΟ τις πληροφορίες που παρέχονται παρακάτω.

**ΚΑΝΟΝΕΣ:**
1. **Μήκος Απάντησης**: 
   - Για γενικές/απλές ερωτήσεις: 2-3 προτάσεις.
   - Για εξειδικευμένες ερωτήσεις: 1-2 παράγραφοι το πολύ.
2. **Σύνδεσμοι/Πηγές**: 
   - **ΜΗΝ** συμπεριλαμβάνεις συνδέσμους (URL), πηγές ή παραπομπές τύπου [Πηγή 1] μέσα στο κείμενο.
   - Οι πηγές εμφανίζονται αυτόματα κάτω από το μήνυμα.
3. **Ύφος**: Φιλικό, φυσικό, όχι ρομποτικό.
4. **Περιεχόμενο**: Μην εφεύρεις πληροφορίες. Αν δεν ξέρεις, πες το.

**ΔΙΑΘΕΣΙΜΕΣ ΠΛΗΡΟΦΟΡΙΕΣ:**
${context}

**ΕΡΩΤΗΣΗ ΧΡΗΣΤΗ:** ${question}

**ΑΠΑΝΤΗΣΗ:**`;
  } else {
    return `You are Simasia Bot, the smart assistant for SimasiaAI. Answer questions using ONLY the information provided below.

**RULES:**
1. **Response Length**: 
   - For general/simple questions: 2-3 sentences.
   - For specific/complex questions: Max 1-2 paragraphs.
2. **Links/Sources**: 
   - **DO NOT** include links (URLs), sources, or citations like [Source 1] within the answer text.
   - Sources are automatically displayed below the message.
3. **Tone**: Friendly, natural, not robotic.
4. **Content**: Do not invent info. If unsure, say "I don't have enough info".

**AVAILABLE INFORMATION:**
${context}

**USER QUESTION:** ${question}

**ANSWER:**`;
  }
}

/**
 * Get suggested questions based on knowledge base
 */
export function getSuggestedQuestions(language = 'greek') {
  const suggestions = {
    greek: [
      'Τι είναι η SimasiaAI;',
      'Ποια προϊόντα προσφέρετε;',
      'Πώς λειτουργεί το SimasiaChatbots;',
      'Ποιους εξυπηρετείτε;',
      'Πώς μπορώ να επικοινωνήσω μαζί σας;'
    ],
    english: [
      'What is SimasiaAI?',
      'What products do you offer?',
      'How does SimasiaChatbots work?',
      'Who do you serve?',
      'How can I contact you?'
    ]
  };
  
  return suggestions[language] || suggestions.greek;
}
