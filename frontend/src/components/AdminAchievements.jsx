import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { achievementAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';
import { formatDateDisplay } from '../utils/validation.js';

const AdminAchievements = ({ onBack }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    achievementImage: '',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await achievementAPI.getAchievements();
      setAchievements(res.data.data || []);
    } catch (error) {
      notify.error('Error fetching achievements');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          achievementImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.date) {
      notify.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await achievementAPI.updateAchievement(editingId, formData);
        notify.success('Achievement updated successfully');
      } else {
        await achievementAPI.createAchievement(formData);
        notify.success('Achievement created successfully');
      }
      await fetchAchievements();
      resetForm();
    } catch (error) {
      notify.error(error.response?.data?.message || 'Error saving achievement');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (ach) => {
    setFormData(ach);
    setEditingId(ach._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;

    try {
      await achievementAPI.deleteAchievement(id);
      notify.success('Achievement deleted successfully');
      await fetchAchievements();
    } catch (error) {
      notify.error('Error deleting achievement');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      achievementImage: '',
    });
    setEditingId(null);
    setShowForm(false);
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
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiPlus /> Add Achievement
        </button>
      ) : null}

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Edit Achievement' : 'Add New Achievement'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date?.split('T')[0]}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Achievement Image
              </label>
              {formData.achievementImage && (
                <img
                  src={formData.achievementImage}
                  alt="Achievement"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {saving ? <FiLoader className="animate-spin" /> : <FiSave />}
              Save
            </button>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiX /> Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Achievements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">
            No achievements added yet
          </div>
        ) : (
          achievements.map((ach) => (
            <motion.div
              key={ach._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-6 rounded-xl border border-gray-700"
            >
              {ach.achievementImage && (
                <img
                  src={ach.achievementImage}
                  alt={ach.title}
                  className="w-full h-40 rounded-lg object-cover mb-4"
                />
              )}

              <h4 className="text-lg font-semibold text-white mb-2">{ach.title}</h4>
              <p className="text-gray-300 text-sm mb-3">{ach.description}</p>
              <p className="text-gray-400 text-sm mb-4">
                {formatDateDisplay(ach.date)}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(ach)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                >
                  <FiEdit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(ach._id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default AdminAchievements;
