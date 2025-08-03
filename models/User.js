import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client','partner','admin'], default: 'client' },
  otp: { code: String, expiresAt: Date },
}, { timestamps: true });

// hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// match password
userSchema.methods.matchPassword = function(entered) {
  return bcrypt.compare(entered, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;