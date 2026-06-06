import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      default: 'My Portfolio',
    },
    metaDescription: {
      type: String,
      default: 'Professional Portfolio',
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    portfolioVisibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
