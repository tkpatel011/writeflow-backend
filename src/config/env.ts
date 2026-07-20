import dotenv from 'dotenv';
dotenv.config();

// Sanitize API keys: strip accidental quotes, spaces, newlines
const rawGroqKey = (process.env.GROQ_API_KEY || '').replace(/^["'\s]+|["'\s]+$/g, '');
const rawGeminiKey = (process.env.GEMINI_API_KEY || '').replace(/^["'\s]+|["'\s]+$/g, '');

export const ENV = {
  PORT: process.env.PORT || 5000,
  GROQ_API_KEY: rawGroqKey,
  GROQ_MODEL: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
  GEMINI_API_KEY: rawGeminiKey,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

// Startup diagnostics
if (ENV.GROQ_API_KEY) {
  console.log(`[INFO] GROQ_API_KEY loaded (starts with: ${ENV.GROQ_API_KEY.substring(0, 6)}...). Using Groq model: ${ENV.GROQ_MODEL}`);
} else if (ENV.GEMINI_API_KEY) {
  console.log(`[INFO] GEMINI_API_KEY loaded (starts with: ${ENV.GEMINI_API_KEY.substring(0, 6)}...). Using Gemini fallback.`);
} else {
  console.error('[FATAL] Neither GROQ_API_KEY nor GEMINI_API_KEY is set. AI requests will fail.');
  console.error('[HINT] Set GROQ_API_KEY in your environment or .env file.');
}