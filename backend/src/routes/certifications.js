import express from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCertifications);
router.post('/', authMiddleware, adminMiddleware, createCertification);
router.put('/:id', authMiddleware, adminMiddleware, updateCertification);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCertification);

export default router;
