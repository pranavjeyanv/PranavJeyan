import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', authMiddleware, adminMiddleware, updateSettings);

export default router;
