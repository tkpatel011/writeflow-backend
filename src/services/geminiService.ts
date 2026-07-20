import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env';
import { logger } from '../utils/logger';
const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });
export const generateCompletion = async (systemPrompt: string, userPrompt: string, model = 'gemini-2.5-flash'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });
    return response.text || '';
  } catch (error: any) {
    logger.error('Gemini API Error:', error);
    let errorMessage = 'Failed to generate content from AI';
    let statusCode = 500;
    if (error.status === 429 || (error.message && error.message.includes('429')) || (error.message && error.message.includes('quota'))) {
      errorMessage = 'AI API Rate Limit or Quota Exceeded. Please wait a few seconds and try again.';
      statusCode = 429;
    } else if (error.status === 401 || error.status === 403 || (error.message && error.message.includes('authentication'))) {
      errorMessage = 'Invalid API Key. Please check your GEMINI_API_KEY.';
      statusCode = 401;
    } else {
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.error && parsed.error.message) {
          errorMessage = parsed.error.message;
        } else {
          errorMessage = error.message;
        }
      } catch (e) {
        if (error.message === 'fetch failed') {
          errorMessage = 'Network Error: Could not connect to Google Gemini API.';
          statusCode = 503;
        } else {
          errorMessage = error.message || 'Failed to generate content from AI';
        }
      }
    }
    const err: any = new Error(errorMessage);
    err.statusCode = statusCode;
    throw err;
  }
};