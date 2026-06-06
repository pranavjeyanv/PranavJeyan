import Certification from '../models/Certification.js';

export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ issueDate: -1 });
    res.json({ success: true, data: certifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCertification = async (req, res) => {
  try {
    const { name, issuer, issueDate, credentialUrl, certificateImage } = req.body;

    if (!name || !issuer || !issueDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Validate URL if provided
    if (credentialUrl) {
      try {
        new URL(credentialUrl);
      } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid credential URL' });
      }
    }

    const certification = new Certification({
      name,
      issuer,
      issueDate,
      credentialUrl,
      certificateImage,
    });

    await certification.save();

    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: certification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCertification = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, issuer, issueDate, credentialUrl, certificateImage } = req.body;

    if (!name || !issuer || !issueDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Validate URL if provided
    if (credentialUrl) {
      try {
        new URL(credentialUrl);
      } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid credential URL' });
      }
    }

    const certification = await Certification.findByIdAndUpdate(
      id,
      { name, issuer, issueDate, credentialUrl, certificateImage },
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }

    res.json({
      success: true,
      message: 'Certification updated successfully',
      data: certification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    const certification = await Certification.findByIdAndDelete(id);

    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }

    res.json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
