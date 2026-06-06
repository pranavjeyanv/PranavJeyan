import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Security', 'Cloud'],
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
