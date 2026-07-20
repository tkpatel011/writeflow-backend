import { Router } from 'express';
import { handleGenerateBlog } from '../controllers/blogController';

const router = Router();

router.post('/generate-blog', handleGenerateBlog);

export default router;
