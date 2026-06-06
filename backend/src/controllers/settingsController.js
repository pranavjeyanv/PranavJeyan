import Settings from '../models/Settings.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
      await settings.save();
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { siteTitle, metaDescription, maintenanceMode, portfolioVisibility, darkMode } =
      req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({
        siteTitle,
        metaDescription,
        maintenanceMode,
        portfolioVisibility,
        darkMode,
      });
    } else {
      settings.siteTitle = siteTitle || settings.siteTitle;
      settings.metaDescription = metaDescription || settings.metaDescription;
      settings.maintenanceMode =
        maintenanceMode !== undefined ? maintenanceMode : settings.maintenanceMode;
      settings.portfolioVisibility = portfolioVisibility || settings.portfolioVisibility;
      settings.darkMode = darkMode !== undefined ? darkMode : settings.darkMode;
    }

    await settings.save();

    res.json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
