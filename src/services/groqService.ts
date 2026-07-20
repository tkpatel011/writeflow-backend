import Groq from 'groq-sdk';
import { ENV } from '../config/env';
import { logger } from '../utils/logger';

let groqClient: Groq | null = null;

const getGroqClient = (): Groq => {
  if (!groqClient) {
    if (!ENV.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }
    groqClient = new Groq({ apiKey: ENV.GROQ_API_KEY });
  }
  return groqClient;
};

export const generateGroqCompletion = async (
  systemPrompt: string,
  userPrompt: string,
  model = ENV.GROQ_MODEL
): Promise<string> => {
  try {
    const groq = getGroqClient();
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: model,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error: any) {
    logger.error('Groq API Error:', error);
    let errorMessage = 'Failed to generate content from Groq AI';
    let statusCode = 500;

    if (error.status === 429 || (error.message && error.message.includes('429')) || (error.message && error.message.includes('rate limit'))) {
      errorMessage = 'Groq API Rate Limit or Quota Exceeded. Please wait a few seconds and try again.';
      statusCode = 429;
    } else if (error.status === 401 || error.status === 403 || (error.message && error.message.includes('authentication')) || (error.message && error.message.includes('invalid_api_key'))) {
      errorMessage = 'Invalid API Key. Please check your GROQ_API_KEY.';
      statusCode = 401;
    } else {
      errorMessage = error.message || 'Failed to generate content from Groq AI';
    }

    const err: any = new Error(errorMessage);
    err.statusCode = statusCode;
    throw err;
  }
};
