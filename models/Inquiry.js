import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  description: { type: String },
  assignedPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending','in-progress','completed'], default: 'pending' },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;