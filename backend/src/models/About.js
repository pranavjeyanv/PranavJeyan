import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    socialLinks: {
      github: { type: String, default: null },
      linkedin: { type: String, default: null },
      twitter: { type: String, default: null },
      portfolio: { type: String, default: null },
      instagram: { type: String, default: null },
      discord: { type: String, default: null },
    },
    resume: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('About', aboutSchema);
