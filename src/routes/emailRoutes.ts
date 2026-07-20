import { Router } from 'express';
import { handleGenerateEmail } from '../controllers/emailController';

const router = Router();

router.post('/generate-email', handleGenerateEmail);

export default router;
