import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import {
  generateToken,
  sendMockOtp,
  verifyOtp,
} from '../services/authService.js';

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) res.status(400).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password, role });
  const otp = await sendMockOtp(user);
  res.status(201).json({ user: { id: user._id, email: user.email, role: user.role }, otp });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password, otp: userOtp } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) res.status(401).json({ message: 'Invalid credentials' });

  if (userOtp) {
    const valid = verifyOtp(user, userOtp);
    if (!valid) return res.status(401).json({ message: 'OTP invalid or expired' });
  }

  const token = generateToken(user._id, user.role);
  res.json({ token });
});
