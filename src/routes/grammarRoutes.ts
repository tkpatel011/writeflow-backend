import { Router } from 'express';
import { handleProcessGrammar } from '../controllers/grammarController';

const router = Router();

router.post('/rewrite', handleProcessGrammar);
router.post('/process-grammar', handleProcessGrammar);

export default router;
