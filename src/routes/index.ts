import { Router } from 'express';
import emailRoutes from './emailRoutes';
import grammarRoutes from './grammarRoutes';
import blogRoutes from './blogRoutes';

const router = Router();

router.use('/', emailRoutes);
router.use('/', grammarRoutes);
router.use('/', blogRoutes);

export default router;
