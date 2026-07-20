import { generateCompletion } from './geminiService';

export const generateEmail = async (data: any): Promise<string> => {
  const { emailType, recipientName, recipientRole, subject, keyPoints, tone, senderName, senderRole } = data;

  const systemPrompt = `You are an expert email copywriter. Your task is to write a highly effective, clear, and context-appropriate email based on the user's instructions.
Always adopt the requested tone. Structure the email professionally with a clear subject line (if requested or appropriate), salutation, body paragraphs, and sign-off.
Output ONLY the email text. Do not add any introductory conversational text like "Here is your email:".`;

  const userPrompt = `
Generate a ${emailType} email.
Tone: ${tone || 'Professional'}

From: ${senderName || '[Sender Name]'} ${senderRole ? `(${senderRole})` : ''}
To: ${recipientName || '[Recipient Name]'} ${recipientRole ? `(${recipientRole})` : ''}

Subject/Topic: ${subject}
Key Points to Include:
${keyPoints}

Please write the email now.
`;

  return await generateCompletion(systemPrompt, userPrompt);
};
