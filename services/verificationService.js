import Verification from '../models/Verification.js';

export const submitVerification = async (partnerId, docs) => {
  const ver = new Verification({ partner: partnerId, documents: docs });
  return ver.save();
};

export const updateVerificationStatus = async (id, status) => {
  const ver = await Verification.findById(id);
  ver.status = status;
  return ver.save();
};