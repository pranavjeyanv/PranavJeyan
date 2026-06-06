import Education from '../models/Education.js';

export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ endYear: -1 });
    res.json({ success: true, data: educations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const { institution, degree, field, startYear, endYear, cgpa, description } = req.body;

    if (!institution || !degree || !field || !startYear || !endYear) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (startYear >= endYear) {
      return res.status(400).json({ message: 'End year must be after start year' });
    }

    const education = new Education({
      institution,
      degree,
      field,
      startYear,
      endYear,
      cgpa,
      description,
    });

    await education.save();

    res.status(201).json({
      success: true,
      message: 'Education created successfully',
      data: education,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { institution, degree, field, startYear, endYear, cgpa, description } = req.body;

    if (!institution || !degree || !field || !startYear || !endYear) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (startYear >= endYear) {
      return res.status(400).json({ success: false, message: 'End year must be after start year' });
    }

    const education = await Education.findByIdAndUpdate(
      id,
      { institution, degree, field, startYear, endYear, cgpa, description },
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    res.json({ success: true, message: 'Education updated successfully', data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
