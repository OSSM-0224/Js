import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getAnalyticsByUsername } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/:username/analytics', authMiddleware, getAnalyticsByUsername);

export default router;
