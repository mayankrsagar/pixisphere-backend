import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '7d' });
};

export const sendMockOtp = async (user) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = { code, expiresAt: new Date(Date.now() + 10*60*1000) };
  await user.save();
  return code; // In real, send via email/SMS
};

export const verifyOtp = (user, code) => {
  if (!user.otp || user.otp.code !== code) return false;
  if (user.otp.expiresAt < new Date()) return false;
  user.otp = undefined;
  return true;
};