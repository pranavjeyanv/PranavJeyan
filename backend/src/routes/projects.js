import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  testProjectLinks,
  testSingleProjectLink,
} from '../controllers/projectController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Test routes must come BEFORE /:id routes
router.post('/test-links/all', authMiddleware, adminMiddleware, testProjectLinks);
router.post('/test-links/:id', authMiddleware, adminMiddleware, testSingleProjectLink);

// Generic routes
router.get('/', getProjects);
router.post('/', authMiddleware, adminMiddleware, createProject);
router.put('/:id', authMiddleware, adminMiddleware, updateProject);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProject);

export default router;
