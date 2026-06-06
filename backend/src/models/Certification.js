import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    credentialUrl: {
      type: String,
      default: null,
    },
    certificateImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Certification', certificationSchema);
