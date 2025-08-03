import express from 'express';

import {
  addPortfolio,
  submitDocs,
} from '../controllers/partnerController.js';
import {
  authorize,
  protect,
} from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/portfolio', protect, authorize('partner'), addPortfolio);
router.post('/verify', protect, authorize('partner'), submitDocs);
export default router;