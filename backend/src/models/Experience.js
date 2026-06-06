import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    currentPosition: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    technologies: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);
