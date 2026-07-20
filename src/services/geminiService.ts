import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env';
import { logger } from '../utils/logger';
import { generateGroqCompletion } from './groqService';

let geminiAiClient: GoogleGenAI | null = null;

const getGeminiClient = (): GoogleGenAI => {
  if (!geminiAiClient) {
    if (!ENV.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    geminiAiClient = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });
  }
  return geminiAiClient;
};

export const generateGeminiCompletion = async (
  systemPrompt: string,
  userPrompt: string,
  model = 'gemini-2.5-flash'
): Promise<string> => {
  try {
    const ai = getGeminiClient();
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

/**
 * Universal completion generator.
 * Prefers Groq if GROQ_API_KEY is present; falls back to Gemini if GEMINI_API_KEY is set.
 */
export const generateCompletion = async (
  systemPrompt: string,
  userPrompt: string,
  model?: string
): Promise<string> => {
  if (ENV.GROQ_API_KEY) {
    return await generateGroqCompletion(systemPrompt, userPrompt, model);
  } else if (ENV.GEMINI_API_KEY) {
    return await generateGeminiCompletion(systemPrompt, userPrompt, model || 'gemini-2.5-flash');
  } else {
    const err: any = new Error('No valid API Key found. Please set GROQ_API_KEY in your environment variables.');
    err.statusCode = 500;
    throw err;
  }
};