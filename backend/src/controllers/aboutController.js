import About from '../models/About.js';

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ success: false, message: 'About section not found' });
    }
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { name, role, summary, bio, profileImage, email, phone, location, socialLinks, resume } =
      req.body;

    // Validation
    if (!name || !role || !summary || !bio || !email) {
      return res.status(400).json({ success: false, message: 'Name, role, summary, bio, and email are required' });
    }

    let about = await About.findOne();

    if (!about) {
      about = new About({
        name,
        role,
        summary,
        bio,
        profileImage,
        email,
        phone,
        location,
        socialLinks,
        resume,
      });
    } else {
      about.name = name || about.name;
      about.role = role || about.role;
      about.summary = summary || about.summary;
      about.bio = bio || about.bio;
      about.profileImage = profileImage || about.profileImage;
      about.email = email || about.email;
      about.phone = phone || about.phone;
      about.location = location || about.location;
      about.socialLinks = socialLinks || about.socialLinks;
      about.resume = resume || about.resume;
    }

    await about.save();
    res.json({ success: true, message: 'About section updated successfully', data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
