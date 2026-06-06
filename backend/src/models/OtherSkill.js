import mongoose from 'mongoose';

const otherSkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('OtherSkill', otherSkillSchema);
