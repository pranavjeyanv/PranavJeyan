import OtherSkill from '../models/OtherSkill.js';

export const getOtherSkills = async (req, res) => {
  try {
    const skills = await OtherSkill.find().sort({ createdAt: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOtherSkill = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide skill name' });
    }

    const existingSkill = await OtherSkill.findOne({ name });
    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    const skill = new OtherSkill({ name });
    await skill.save();

    res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOtherSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide skill name' });
    }

    const skill = await OtherSkill.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill updated successfully', data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOtherSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await OtherSkill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
