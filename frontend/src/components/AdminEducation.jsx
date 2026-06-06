import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { educationAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';
import { validateYear } from '../utils/validation.js';

const AdminEducation = ({ onBack }) => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    cgpa: '',
    description: '',
  });

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const res = await educationAPI.getEducations();
      setEducations(res.data.data || []);
    } catch (error) {
      notify.error('Error fetching educations');
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
    if (!formData.institution || !formData.degree || !formData.field || !formData.startYear || !formData.endYear) {
      notify.error('Please fill in all required fields');
      return;
    }

    if (!validateYear(formData.startYear) || !validateYear(formData.endYear)) {
      notify.error('Please enter valid years');
      return;
    }

    if (parseInt(formData.startYear) >= parseInt(formData.endYear)) {
      notify.error('End year must be after start year');
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await educationAPI.updateEducation(editingId, formData);
        notify.success('Education updated successfully');
      } else {
        await educationAPI.createEducation(formData);
        notify.success('Education created successfully');
      }
      await fetchEducations();
      resetForm();
    } catch (error) {
      notify.error(error.response?.data?.message || 'Error saving education');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (edu) => {
    setFormData(edu);
    setEditingId(edu._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education?')) return;

    try {
      await educationAPI.deleteEducation(id);
      notify.success('Education deleted successfully');
      await fetchEducations();
    } catch (error) {
      notify.error('Error deleting education');
    }
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      cgpa: '',
      description: '',
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
          <FiPlus /> Add Education
        </button>
      ) : null}

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Edit Education' : 'Add New Education'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="B.Tech, M.S., etc."
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Field of Study</label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleChange}
                placeholder="Computer Science"
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Year</label>
              <input
                type="number"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Year</label>
              <input
                type="number"
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                min="1900"
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">CGPA</label>
              <input
                type="text"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="3.8/4.0"
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
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

      {/* Educations List */}
      <div className="space-y-4">
        {educations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No educations added yet</div>
        ) : (
          educations.map((edu) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-6 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white">{edu.institution}</h4>
                  <p className="text-blue-400 font-medium">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <span className="text-sm text-gray-400">
                  {edu.startYear} - {edu.endYear}
                </span>
              </div>

              {edu.cgpa && (
                <p className="text-gray-300 text-sm mb-2">
                  <span className="font-medium">CGPA:</span> {edu.cgpa}
                </p>
              )}

              {edu.description && <p className="text-gray-300 text-sm mb-4">{edu.description}</p>}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                >
                  <FiEdit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
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

export default AdminEducation;
