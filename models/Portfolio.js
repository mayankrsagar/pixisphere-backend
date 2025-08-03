import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  link: String,
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;