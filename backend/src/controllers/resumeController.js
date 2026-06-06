import Resume from '../models/Resume.js';

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json({ success: true, data: resumes });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { type, filename, url } = req.body;

    if (!type || !filename || !url) {
      return res.status(400).json({ success: false, message: 'Type, filename, and url are required' });
    }

    let resume = await Resume.findOne({ type });

    if (resume) {
      resume.filename = filename;
      resume.url = url;
      resume.updatedAt = Date.now();
    } else {
      resume = new Resume({ type, filename, url });
    }

    await resume.save();

    res.json({
      success: true,
      message: 'Resume updated successfully',
      data: resume,
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
