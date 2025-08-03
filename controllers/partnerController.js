import asyncHandler from 'express-async-handler';

import Portfolio from '../models/Portfolio.js';
import { submitVerification } from '../services/verificationService.js';

export const addPortfolio = asyncHandler(async (req, res) => {
  const { title, description, link } = req.body;
  const port = await Portfolio.create({ partner: req.user._id, title, description, link });
  res.status(201).json(port);
});

export const submitDocs = asyncHandler(async (req, res) => {
  const docs = req.body.documents; // array of URLs
  const ver = await submitVerification(req.user._id, docs);
  res.status(201).json(ver);
});