import express from 'express';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAchievements);
router.post('/', authMiddleware, adminMiddleware, createAchievement);
router.put('/:id', authMiddleware, adminMiddleware, updateAchievement);
router.delete('/:id', authMiddleware, adminMiddleware, deleteAchievement);

export default router;
