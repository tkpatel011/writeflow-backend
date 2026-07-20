import { Request, Response, NextFunction } from 'express';
import { processGrammar } from '../services/grammarService';

export const handleProcessGrammar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mode, inputText } = req.body;

    if (!mode || !inputText) {
      return res.status(400).json({ success: false, error: 'Missing required fields: mode or inputText' });
    }
    
    if (inputText.trim().length < 10) {
       return res.status(400).json({ success: false, error: 'Input text must be at least 10 characters long' });
    }

    const result = await processGrammar(req.body);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
