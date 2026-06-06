import express from 'express';
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEducations);
router.post('/', authMiddleware, adminMiddleware, createEducation);
router.put('/:id', authMiddleware, adminMiddleware, updateEducation);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEducation);

export default router;
