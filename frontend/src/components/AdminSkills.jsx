import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { skillAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';
import { validateForm, validatePercentage } from '../utils/validation.js';

const AdminSkills = ({ onBack }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    percentage: '',
    icon: '',
  });

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Security', 'Cloud'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await skillAPI.getSkills();
      setSkills(res.data.data || []);
    } catch (error) {
      notify.error('Error fetching skills');
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

  const handleSave = async () => {
    const { isValid, errors } = validateForm(formData, ['name', 'category', 'percentage']);
    if (!isValid) {
      Object.values(errors).forEach((error) => notify.error(error));
      return;
    }

    if (!validatePercentage(formData.percentage)) {
      notify.error('Percentage must be between 0 and 100');
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await skillAPI.updateSkill(editingId, formData);
        notify.success('Skill updated successfully');
      } else {
        await skillAPI.createSkill(formData);
        notify.success('Skill created successfully');
      }
      await fetchSkills();
      setFormData({ name: '', category: 'Frontend', percentage: '', icon: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      notify.error(error.response?.data?.message || 'Error saving skill');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      percentage: skill.percentage,
      icon: skill.icon || '',
    });
    setEditingId(skill._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await skillAPI.deleteSkill(id);
      notify.success('Skill deleted successfully');
      await fetchSkills();
    } catch (error) {
      notify.error('Error deleting skill');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', category: 'Frontend', percentage: '', icon: '' });
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
          <FiPlus /> Add Skill
        </button>
      ) : null}

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Edit Skill' : 'Add New Skill'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Percentage (0-100)
              </label>
              <input
                type="number"
                name="percentage"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon (URL)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
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
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiX /> Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">No skills added yet</div>
        ) : (
          skills.map((skill) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-4 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-white">{skill.name}</h4>
                  <p className="text-sm text-gray-400">{skill.category}</p>
                </div>
                <span className="text-lg font-bold text-blue-400">{skill.percentage}%</span>
              </div>

              <div className="w-full bg-dark-light rounded-full h-2 mb-4">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                >
                  <FiEdit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
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

export default AdminSkills;
