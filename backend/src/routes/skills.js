import express from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', authMiddleware, adminMiddleware, createSkill);
router.put('/:id', authMiddleware, adminMiddleware, updateSkill);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSkill);

export default router;
