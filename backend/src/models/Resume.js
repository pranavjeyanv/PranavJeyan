import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['latest', 'old'],
    required: true,
    unique: true,
  },
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Resume', resumeSchema);
