/**
 * Gemini Service - Exact port of Frontistiriarxis API implementation
 * Handles API calls with key rotation using google-generativeai library
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Parse API keys from environment (exactly like Frontistiriarxis)
const apiKeysStr = process.env.REACT_APP_GEMINI_API_KEY || '';
const apiKeys = apiKeysStr
  .split(',')
  .map(k => k.trim())
  .filter(k => k);

/**
 * Select random API key for load distribution
 * Exact port of Frontistiriarxis random.choice() logic
 */
function selectRandomKey() {
  if (apiKeys.length === 0) {
    console.error('❌ No API keys found in REACT_APP_GEMINI_API_KEY');
    throw new Error('No API key found');
  }

  // Random selection (equivalent to Python's random.choice())
  const key = apiKeys[Math.floor(Math.random() * apiKeys.length)];
  const keyIndex = apiKeys.indexOf(key) + 1;
  const masked = `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  
  console.log(`🔑 Using Gemini Key Index: ${keyIndex}/${apiKeys.length} (${masked})`);
  
  return key;
}

/**
 * Generate content with timeout and retry logic
 * Exact port of Frontistiriarxis generate_with_timeout function
 * 
 * @param {string} prompt - The prompt to send to Gemini
 * @param {Object} options - Configuration options
 * @param {number} options.timeout - Timeout in milliseconds (default: 30000)
 * @param {number} options.maxRetries - Maximum retry attempts (default: 2)
 * @param {string} options.modelName - Gemini model to use (default: 'gemini-2.5-flash-lite')
 * @param {boolean} options.jsonMode - Enable JSON response mode (default: false)
 * @returns {Promise<string>} - Generated response text
 */
export async function generateWithTimeout(prompt, options = {}) {
  const {
    timeout = 30000,        // 30 seconds (same as Frontistiriarxis)
    maxRetries = 2,         // Max 2 retries (same as Frontistiriarxis)
    modelName = 'gemini-2.5-flash-lite',  // Default model (same as Frontistiriarxis)
    jsonMode = false
  } = options;

  // Select random API key
  const apiKey = selectRandomKey();
  
  // Initialize Gemini client
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Get model
  const model = genAI.getGenerativeModel({ 
    model: modelName 
  });

  console.log(`🤖 Using Gemini model: ${modelName} (JSON Mode: ${jsonMode})`);

  // Configure generation (JSON mode if requested)
  const generationConfig = jsonMode 
    ? { responseMimeType: "application/json" }
    : undefined;

  // Retry loop (same logic as Frontistiriarxis)
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
      );

      // Generate content with timeout
      const resultPromise = model.generateContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig
      });

      // Race between generation and timeout
      const result = await Promise.race([resultPromise, timeoutPromise]);
      const response = await result.response;
      
      return response.text();

    } catch (error) {
      const attemptInfo = `attempt ${attempt + 1}/${maxRetries + 1}`;
      
      if (error.message === 'Timeout') {
        console.error(`⏱️  Timeout generating content (${attemptInfo})`);
        
        if (attempt === maxRetries) {
          throw new Error('Request timed out while generating answer');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } else {
        console.error(`❌ Error generating content (${attemptInfo}):`, error.message);
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          throw error;
        }
      }
    }
  }

  throw new Error('Failed to generate answer');
}

/**
 * Get number of configured API keys
 */
export function getKeyCount() {
  return apiKeys.length;
}

/**
 * Generate embedding for text
 * Uses 'text-embedding-004' model
 */
export async function getEmbedding(text) {
  try {
    const apiKey = selectRandomKey();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    
    // Clean text lightly
    const cleanedText = text.replace(/\n/g, ' ');
    
    // Add 10s timeout
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Embedding Timeout')), 10000)
    );
    
    const resultPromise = model.embedContent(cleanedText);
    const result = await Promise.race([resultPromise, timeoutPromise]);
    
    if (!result || !result.embedding || !result.embedding.values) {
        throw new Error('API returned empty embedding');
    }
    
    const vector = result.embedding.values;
    // console.log(`✅ Embedding generated (dim: ${vector.length})`); // Verbose
    return vector;

  } catch (error) {
    // Explicitly check for Quota/Rate Limit errors
    if (error.message.includes('429') || error.message.includes('Quota') || error.message.includes('Resource has been exhausted')) {
        console.error('🚨🚨🚨 GEMINI QUOTA EXCEEDED 🚨🚨🚨');
        console.error('The API returned a 429 "Too Many Requests" error.');
        console.error('This means we are sending too many requests too fast.');
    } else {
        console.error('❌ Error getting embedding:', error.message);
    }
    throw error;
  }
}

/**
 * Test API connection
 */
export async function testApiConnection() {
// ... rest of file (unchanged)
  try {
    console.log(`🔍 Testing API connection with ${apiKeys.length} keys...`);
    const response = await generateWithTimeout('Test connection', {
      timeout: 10000,
      maxRetries: 0
    });
    console.log('✅ API connection successful');
    return { success: true, message: response };
  } catch (error) {
    console.error('❌ API connection failed:', error);
    return { success: false, error: error.message };
  }
}
