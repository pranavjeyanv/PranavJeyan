import Experience from '../models/Experience.js';

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { company, role, startDate, endDate, currentPosition, description, technologies } =
      req.body;

    if (!company || !role || !startDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (currentPosition && endDate) {
      return res
        .status(400)
        .json({ message: 'Cannot have end date if current position is true' });
    }

    const experience = new Experience({
      company,
      role,
      startDate,
      endDate,
      currentPosition,
      description,
      technologies: technologies || [],
    });

    await experience.save();

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, startDate, endDate, currentPosition, description, technologies } =
      req.body;

    if (!company || !role || !startDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (currentPosition && endDate) {
      return res
        .status(400)
        .json({ success: false, message: 'Cannot have end date if current position is true' });
    }

    const experience = await Experience.findByIdAndUpdate(
      id,
      {
        company,
        role,
        startDate,
        endDate: currentPosition ? null : endDate,
        currentPosition,
        description,
        technologies: technologies || [],
      },
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    res.json({ success: true, message: 'Experience updated successfully', data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
