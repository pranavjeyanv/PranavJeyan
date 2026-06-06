import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { settingsAPI, skillAPI, projectAPI, experienceAPI, educationAPI, certificationAPI, achievementAPI, messageAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';

const AdminSettings = ({ onBack }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({});
  const [formData, setFormData] = useState({
    siteTitle: '',
    metaDescription: '',
    maintenanceMode: false,
    portfolioVisibility: 'public',
    darkMode: true,
  });

  useEffect(() => {
    fetchSettings();
    fetchStats();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await settingsAPI.getSettings();
      if (res.data.data) {
        setSettings(res.data.data);
        setFormData(res.data.data);
      }
    } catch (error) {
      notify.error('Error fetching settings');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [skills, projects, experiences, educations, certifications, achievements, messages] =
        await Promise.all([
          skillAPI.getSkills(),
          projectAPI.getProjects(),
          experienceAPI.getExperiences(),
          educationAPI.getEducations(),
          certificationAPI.getCertifications(),
          achievementAPI.getAchievements(),
          messageAPI.getMessages(),
        ]);

      setStats({
        totalSkills: skills.data.data?.length || 0,
        totalProjects: projects.data.data?.length || 0,
        totalExperiences: experiences.data.data?.length || 0,
        totalEducations: educations.data.data?.length || 0,
        totalCertifications: certifications.data.data?.length || 0,
        totalAchievements: achievements.data.data?.length || 0,
        totalMessages: messages.data.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await settingsAPI.updateSettings(formData);
      notify.success('Settings updated successfully');
      await fetchSettings();
    } catch (error) {
      notify.error(error.response?.data?.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
      >
        <FiArrowLeft size={20} />
        Back to Dashboard
      </button>
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">Total Skills</p>
          <p className="text-2xl font-bold text-blue-400">{stats.totalSkills || 0}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">Total Projects</p>
          <p className="text-2xl font-bold text-purple-400">{stats.totalProjects || 0}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">Experiences</p>
          <p className="text-2xl font-bold text-green-400">{stats.totalExperiences || 0}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">Messages</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.totalMessages || 0}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">Education</p>
          <p className="text-2xl font-bold text-cyan-400">{stats.totalEducations || 0}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">Certifications</p>
          <p className="text-2xl font-bold text-pink-400">{stats.totalCertifications || 0}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">Achievements</p>
          <p className="text-2xl font-bold text-orange-400">{stats.totalAchievements || 0}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-xs mb-1">All Items</p>
          <p className="text-2xl font-bold text-red-400">
            {Object.values(stats).reduce((a, b) => a + b, 0)}
          </p>
        </div>
      </div>

      {/* General Settings */}
      <div className="glass p-6 rounded-xl border border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold text-white">General Settings</h3>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Site Title</label>
          <input
            type="text"
            name="siteTitle"
            value={formData.siteTitle}
            onChange={handleChange}
            className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows="3"
            className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="glass p-6 rounded-xl border border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold text-white">Visibility & Mode</h3>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio Visibility</label>
          <select
            name="portfolioVisibility"
            value={formData.portfolioVisibility}
            onChange={handleChange}
            className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <p className="text-xs text-gray-400 mt-2">
            {formData.portfolioVisibility === 'public'
              ? 'Your portfolio is visible to everyone'
              : 'Your portfolio is only visible to logged-in users'}
          </p>
        </div>

        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={formData.maintenanceMode}
            onChange={handleChange}
            className="w-4 h-4 rounded"
          />
          <span className="font-medium">Maintenance Mode</span>
        </label>
        {formData.maintenanceMode && (
          <p className="text-xs text-yellow-400">Portfolio will show maintenance message</p>
        )}

        <label className="flex items-center gap-3 text-gray-300">
          <input
            type="checkbox"
            name="darkMode"
            checked={formData.darkMode}
            onChange={handleChange}
            className="w-4 h-4 rounded"
          />
          <span className="font-medium">Dark Mode (Default)</span>
        </label>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? <FiLoader className="animate-spin" /> : <FiSave />}
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </motion.div>
  );
};

export default AdminSettings;
