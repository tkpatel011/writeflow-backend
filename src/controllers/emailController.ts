import { Request, Response, NextFunction } from 'express';
import { generateEmail } from '../services/emailService';

export const handleGenerateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailType, subject, keyPoints } = req.body;

    if (!emailType || !subject || !keyPoints) {
      return res.status(400).json({ success: false, error: 'Missing required fields: emailType, subject, or keyPoints' });
    }

    const result = await generateEmail(req.body);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
