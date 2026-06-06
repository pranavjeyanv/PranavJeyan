import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAbout);
router.put('/', authMiddleware, adminMiddleware, updateAbout);

export default router;
