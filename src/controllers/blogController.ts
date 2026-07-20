import { Request, Response, NextFunction } from 'express';
import { generateBlog } from '../services/blogService';

export const handleGenerateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mode, topic } = req.body;

    if (!mode || !topic) {
      return res.status(400).json({ success: false, error: 'Missing required fields: mode or topic' });
    }

    if (mode === 'conclusion' && !req.body.existingContent) {
      return res.status(400).json({ success: false, error: 'existingContent is required for conclusion mode' });
    }

    const result = await generateBlog(req.body);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
