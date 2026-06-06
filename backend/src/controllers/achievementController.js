import Achievement from '../models/Achievement.js';

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.json({ success: true, data: achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAchievement = async (req, res) => {
  try {
    const { title, description, date, achievementImage } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const achievement = new Achievement({
      title,
      description,
      date,
      achievementImage,
    });

    await achievement.save();

    res.status(201).json({
      success: true,
      message: 'Achievement created successfully',
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, achievementImage } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      { title, description, date, achievementImage },
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.json({
      success: true,
      message: 'Achievement updated successfully',
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findByIdAndDelete(id);

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
