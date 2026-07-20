import { GoogleGenAI } from '@google/genai';
import { ENV } from './src/config/env';

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

async function test() {
  console.log('Starting generation...');
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Hello world',
    });
    console.log('Response:', response.text);
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('Done.');
}
test();
