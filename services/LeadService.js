import Inquiry from '../models/Inquiry.js';
import User from '../models/User.js';

// Function to assign a partner to an inquiry
// This function finds the first partner and assigns them to the inquiry
// It also updates the status of the inquiry to 'in-progress'
export const assignPartner = async (inquiryId) => {
  const inquiry = await Inquiry.findById(inquiryId);
  const partner = await User.findOne({ role: 'partner' }); // simple: first partner
  inquiry.assignedPartner = partner._id;
  inquiry.status = 'in-progress';
  await inquiry.save();
  return inquiry
};