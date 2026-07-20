import { generateCompletion } from './geminiService';

export const generateBlog = async (data: any): Promise<string> => {
  const { mode, topic, keywords, tone, wordCount, targetAudience, existingContent, seoOptimized } = data;

  const systemPrompt = `You are an expert SEO content writer and blogger. Your goal is to generate high-quality blog content based on the user's requirements.
${seoOptimized ? 'Apply SEO best practices: use headings (H1, H2, H3), include keywords naturally, and optimize for readability.' : ''}
Output ONLY the requested content. Do not include conversational filler like "Here is the blog post:".
Format the output in clean Markdown.`;

  let modeInstruction = '';
  switch (mode) {
    case 'complete-blog':
      modeInstruction = `Write a complete, full-length blog post. Target word count: ~${wordCount} words.`;
      break;
    case 'generate-title':
      modeInstruction = 'Generate 5 catchy, click-worthy, SEO-optimized blog titles for the topic. Format as a bulleted list.';
      break;
    case 'meta-description':
      modeInstruction = 'Write a compelling SEO meta description (150-160 characters) for the topic.';
      break;
    case 'blog-outline':
      modeInstruction = 'Create a detailed structural outline for a blog post on this topic, including H2 and H3 headings and bullet points for what to cover in each section.';
      break;
    case 'conclusion':
      modeInstruction = `Write a strong conclusion paragraph summarizing the following existing content, ending with a call to action:\n\n${existingContent || '[No content provided]'}`;
      break;
    default:
      modeInstruction = `Generate content for the topic. Target word count: ~${wordCount} words.`;
  }

  const userPrompt = `
Task: ${modeInstruction}
Topic: ${topic}
Keywords to include: ${keywords || 'None'}
Tone: ${tone || 'Informative'}
Target Audience: ${targetAudience || 'General'}

Please generate the content now.
`;

  return await generateCompletion(systemPrompt, userPrompt);
};
