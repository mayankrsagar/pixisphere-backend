import express from 'express';

import {
  changeStatus,
  listVerifications,
} from '../controllers/adminController.js';
import {
  authorize,
  protect,
} from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/verifications', protect, authorize('admin'), listVerifications);
router.patch('/verifications/:id', protect, authorize('admin'), changeStatus);
export default router;