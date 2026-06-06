import Skill from '../models/Skill.js';

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, percentage: -1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, percentage, icon } = req.body;

    // Validation
    if (!name || !category || percentage === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({ message: 'Percentage must be between 0 and 100' });
    }

    const existingSkill = await Skill.findOne({ name, category });
    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists in this category' });
    }

    const skill = new Skill({ name, category, percentage, icon });
    await skill.save();

    res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, percentage, icon } = req.body;

    if (!name || !category || percentage === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({ message: 'Percentage must be between 0 and 100' });
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      { name, category, percentage, icon },
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

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
