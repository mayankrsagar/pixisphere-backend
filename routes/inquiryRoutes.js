import express from 'express';

import {
  createInquiry,
  getInquiries,
} from '../controllers/inquiryController.js';
import {
  authorize,
  protect,
} from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/', protect, authorize('client'), createInquiry);
router.get('/', protect, authorize('admin','partner'), getInquiries);
export default router;