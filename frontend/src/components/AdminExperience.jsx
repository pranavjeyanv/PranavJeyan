import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { experienceAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';
import { formatDate, formatDateDisplay } from '../utils/validation.js';

const AdminExperience = ({ onBack }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    currentPosition: false,
    description: '',
    technologies: [],
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await experienceAPI.getExperiences();
      setExperiences(res.data.data || []);
    } catch (error) {
      notify.error('Error fetching experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTechChange = (e) => {
    const techs = e.target.value.split(',').map((t) => t.trim());
    setFormData({
      ...formData,
      technologies: techs.filter((t) => t),
    });
  };

  const handleSave = async () => {
    if (!formData.company || !formData.role || !formData.startDate) {
      notify.error('Please fill in all required fields');
      return;
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      notify.error('End date must be after start date');
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await experienceAPI.updateExperience(editingId, formData);
        notify.success('Experience updated successfully');
      } else {
        await experienceAPI.createExperience(formData);
        notify.success('Experience created successfully');
      }
      await fetchExperiences();
      resetForm();
    } catch (error) {
      notify.error(error.response?.data?.message || 'Error saving experience');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      ...exp,
      technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
    });
    setEditingId(exp._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    try {
      await experienceAPI.deleteExperience(id);
      notify.success('Experience deleted successfully');
      await fetchExperiences();
    } catch (error) {
      notify.error('Error deleting experience');
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      currentPosition: false,
      description: '',
      technologies: [],
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
          <FiPlus /> Add Experience
        </button>
      ) : null}

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formatDate(formData.startDate)}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date {formData.currentPosition && '(N/A)'}
              </label>
              <input
                type="date"
                name="endDate"
                value={formatDate(formData.endDate)}
                onChange={handleChange}
                disabled={formData.currentPosition}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              name="currentPosition"
              checked={formData.currentPosition}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            Currently working here
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies.join(', ')}
              onChange={handleTechChange}
              className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="React, Node.js, MongoDB"
            />
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

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No experiences added yet</div>
        ) : (
          experiences.map((exp) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-6 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white">{exp.company}</h4>
                  <p className="text-blue-400 font-medium">{exp.role}</p>
                </div>
                <span className="text-sm text-gray-400">
                  {formatDateDisplay(exp.startDate)} -{' '}
                  {exp.currentPosition ? 'Present' : formatDateDisplay(exp.endDate)}
                </span>
              </div>

              {exp.description && (
                <p className="text-gray-300 mb-3 text-sm">{exp.description}</p>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                >
                  <FiEdit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
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

export default AdminExperience;
