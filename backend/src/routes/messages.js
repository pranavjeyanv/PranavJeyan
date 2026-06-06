import express from 'express';
import {
  getMessages,
  createMessage,
  deleteMessage,
  markAsRead,
} from '../controllers/messageController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', authMiddleware, adminMiddleware, getMessages);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMessage);
router.put('/:id/read', authMiddleware, adminMiddleware, markAsRead);

export default router;
