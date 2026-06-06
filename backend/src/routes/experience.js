import express from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', authMiddleware, adminMiddleware, createExperience);
router.put('/:id', authMiddleware, adminMiddleware, updateExperience);
router.delete('/:id', authMiddleware, adminMiddleware, deleteExperience);

export default router;
