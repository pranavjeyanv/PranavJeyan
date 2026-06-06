import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    technologies: [String],
    liveLink: {
      type: String,
      trim: true,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Active', 'Draft'],
      default: 'Active',
    },
    lastChecked: {
      type: Date,
      default: null,
    },
    linkStatus: {
      live: {
        status: { type: String, enum: ['working', 'broken', 'redirect'], default: 'broken' },
        statusCode: { type: Number, default: null },
        lastChecked: { type: Date, default: null },
      },
      github: {
        status: { type: String, enum: ['working', 'broken', 'redirect'], default: 'broken' },
        statusCode: { type: Number, default: null },
        lastChecked: { type: Date, default: null },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
