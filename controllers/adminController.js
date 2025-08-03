import asyncHandler from 'express-async-handler';

import Verification from '../models/Verification.js';
import { updateVerificationStatus } from '../services/verificationService.js';

export const listVerifications = asyncHandler(async (req, res) => {
  const list = await Verification.find().populate('partner', 'name email');
  res.json(list);
});

export const changeStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await updateVerificationStatus(id, status);
  res.json(updated);
});