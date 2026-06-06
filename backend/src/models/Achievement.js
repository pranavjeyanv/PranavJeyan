import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    achievementImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Achievement', achievementSchema);
