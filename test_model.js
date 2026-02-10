/**
 * Quick test to find working embedding model
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyBHS4JzYJN4WCnCMEkQGRmH5WcYEp2a6Ek';
const genAI = new GoogleGenerativeAI(apiKey);

const models = [
    'text-embedding-004',
    'embedding-001',
    'models/text-embedding-004',
    'models/embedding-001',
];

async function test() {
    for (const modelName of models) {
        try {
            console.log(`Testing: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.embedContent('Hello world test');
            if (result && result.embedding && result.embedding.values) {
                console.log(`  ✅ WORKS! Vector dim: ${result.embedding.values.length}`);
            } else {
                console.log(`  ❌ No embedding returned`);
            }
        } catch (e) {
            console.log(`  ❌ ${e.message.substring(0, 120)}`);
        }
    }

    // Also try listing models
    try {
        console.log('\nListing available models...');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        const embModels = data.models?.filter(m => m.supportedGenerationMethods?.includes('embedContent'));
        if (embModels) {
            console.log('Embedding-capable models:');
            embModels.forEach(m => console.log(`  - ${m.name} (${m.displayName})`));
        }
    } catch (e) {
        console.log('Could not list models:', e.message);
    }
}

test();
