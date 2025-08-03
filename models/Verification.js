import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending','verified','rejected'], default: 'pending' },
  documents: [String],
}, { timestamps: true });

const Verification = mongoose.model('Verification', verificationSchema);
export default Verification;

