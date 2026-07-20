import { generateCompletion } from './geminiService';

export const processGrammar = async (data: any): Promise<string> => {
  const { mode, inputText } = data;

  const systemPrompt = `You are an expert editor and proofreader. Your job is to process the user's text based on the specified mode.
Return ONLY the processed text. Do not include any explanations, markdown formatting (unless specifically requested), or conversational filler.`;

  let modeInstruction = '';
  switch (mode) {
    case 'correct-grammar':
      modeInstruction = 'Correct all grammatical, spelling, and punctuation errors in the text while preserving the original meaning and tone.';
      break;
    case 'rewrite-professionally':
      modeInstruction = 'Rewrite the text to sound highly professional, formal, and suitable for business communication.';
      break;
    case 'rewrite-casually':
      modeInstruction = 'Rewrite the text to sound friendly, casual, and conversational.';
      break;
    case 'rewrite-politely':
      modeInstruction = 'Rewrite the text to sound extremely polite, respectful, and diplomatic.';
      break;
    case 'rewrite-confidently':
      modeInstruction = 'Rewrite the text to sound confident, assertive, and persuasive.';
      break;
    case 'humanize-ai':
      modeInstruction = 'Rewrite the text so it sounds more natural, human-like, and less robotic or AI-generated. Vary sentence structure and use natural idioms.';
      break;
    case 'shorten':
      modeInstruction = 'Summarize and shorten the text to be much more concise while retaining the core message.';
      break;
    case 'expand':
      modeInstruction = 'Expand on the text, adding more detail, context, and descriptive language while keeping the core meaning intact.';
      break;
    default:
      modeInstruction = 'Improve the text.';
  }

  const userPrompt = `
Task: ${modeInstruction}

Text to process:
${inputText}
`;

  return await generateCompletion(systemPrompt, userPrompt);
};
