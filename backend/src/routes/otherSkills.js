import express from 'express';
import {
  getOtherSkills,
  createOtherSkill,
  updateOtherSkill,
  deleteOtherSkill,
} from '../controllers/otherSkillController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getOtherSkills);
router.post('/', authMiddleware, adminMiddleware, createOtherSkill);
router.put('/:id', authMiddleware, adminMiddleware, updateOtherSkill);
router.delete('/:id', authMiddleware, adminMiddleware, deleteOtherSkill);

export default router;
