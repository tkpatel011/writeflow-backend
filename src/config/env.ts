import dotenv from 'dotenv';
dotenv.config();
// Sanitize API key: strip accidental quotes, spaces, newlines
const rawKey = (process.env.GEMINI_API_KEY || '').replace(/^["'\s]+|["'\s]+$/g, '');
export const ENV = {
  PORT: process.env.PORT || 5000,
  GEMINI_API_KEY: rawKey,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};
// Startup diagnostics
if (!ENV.GEMINI_API_KEY) {
  console.error('[FATAL] GEMINI_API_KEY is NOT set. All AI requests will fail.');
  console.error('[HINT] Set GEMINI_API_KEY in Render Dashboard → Environment Variables.');
} else {
  console.log(`[INFO] GEMINI_API_KEY loaded (starts with: ${ENV.GEMINI_API_KEY.substring(0, 6)}...)`);
}