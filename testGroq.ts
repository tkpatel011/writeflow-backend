import Groq from 'groq-sdk';
import { ENV } from './src/config/env';

async function testGroq() {
  console.log('Testing Groq connection...');
  console.log(`Using model: ${ENV.GROQ_MODEL}`);
  
  if (!ENV.GROQ_API_KEY) {
    console.error('Error: GROQ_API_KEY is not set in environment or .env file.');
    process.exit(1);
  }

  const groq = new Groq({ apiKey: ENV.GROQ_API_KEY });

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'user', content: 'Say hello in 5 words or less.' }
      ],
      model: ENV.GROQ_MODEL,
    });
    console.log('Groq Response:', response.choices[0]?.message?.content);
    console.log('Test successful!');
  } catch (error) {
    console.error('Groq Test Failed:', error);
  }
}

testGroq();
