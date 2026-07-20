import { GoogleGenAI } from '@google/genai';
import { ENV } from './src/config/env';

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

async function list() {
  try {
    const response = await ai.models.list();
    for await (const model of response) {
      console.log(model.name);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
list();
