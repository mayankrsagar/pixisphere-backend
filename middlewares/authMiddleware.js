import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) res.status(401).json({ message: 'Not authorized, no token' });
});

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient rights' });
  }
  next();
};
