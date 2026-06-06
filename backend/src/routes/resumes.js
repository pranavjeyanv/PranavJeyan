import express from 'express';
import { getResumes, updateResume } from '../controllers/resumeController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getResumes);
router.put('/', authMiddleware, adminMiddleware, updateResume);

export default router;
