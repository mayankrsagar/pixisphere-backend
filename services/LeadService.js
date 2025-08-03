import Inquiry from '../models/Inquiry.js';
import User from '../models/User.js';

export const assignPartner = async (inquiryId) => {
  const inquiry = await Inquiry.findById(inquiryId);
  const partner = await User.findOne({ role: 'partner' }); // simple: first partner
  inquiry.assignedPartner = partner._id;
  inquiry.status = 'in-progress';
  await inquiry.save();
  return inquiry
};