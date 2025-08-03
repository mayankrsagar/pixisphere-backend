import asyncHandler from 'express-async-handler';

import Inquiry from '../models/Inquiry.js';
import { assignPartner } from '../services/leadService.js';

export const createInquiry = asyncHandler(async (req, res) => {
  const { subject, description } = req.body;
  const inquiry = await Inquiry.create({ client: req.user._id, subject, description });
  const updated = await assignPartner(inquiry._id);
  res.status(201).json(updated);
});

export const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().populate('client assignedPartner', 'name email');
  res.json(inquiries);
});