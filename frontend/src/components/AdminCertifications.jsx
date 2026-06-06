import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLoader, FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import { certificationAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';
import { validateUrl, formatDateDisplay } from '../utils/validation.js';

const AdminCertifications = ({ onBack }) => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    certificateImage: '',
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await certificationAPI.getCertifications();
      setCertifications(res.data.data || []);
    } catch (error) {
      notify.error('Error fetching certifications');
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
          certificateImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.issuer || !formData.issueDate) {
      notify.error('Please fill in all required fields');
      return;
    }

    if (formData.credentialUrl && !validateUrl(formData.credentialUrl)) {
      notify.error('Invalid credential URL');
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await certificationAPI.updateCertification(editingId, formData);
        notify.success('Certification updated successfully');
      } else {
        await certificationAPI.createCertification(formData);
        notify.success('Certification created successfully');
      }
      await fetchCertifications();
      resetForm();
    } catch (error) {
      notify.error(error.response?.data?.message || 'Error saving certification');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cert) => {
    setFormData(cert);
    setEditingId(cert._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;

    try {
      await certificationAPI.deleteCertification(id);
      notify.success('Certification deleted successfully');
      await fetchCertifications();
    } catch (error) {
      notify.error('Error deleting certification');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
      certificateImage: '',
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
          <FiPlus /> Add Certification
        </button>
      ) : null}

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Edit Certification' : 'Add New Certification'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Certificate Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Issuer</label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate?.split('T')[0]}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Credential URL
              </label>
              <input
                type="url"
                name="credentialUrl"
                value={formData.credentialUrl}
                onChange={handleChange}
                placeholder="https://example.com/verify"
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Certificate Image
              </label>
              {formData.certificateImage && (
                <img
                  src={formData.certificateImage}
                  alt="Certificate"
                  className="w-32 h-32 rounded-lg object-cover mb-4"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-blue-500 file:text-white hover:file:bg-blue-600"
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

      {/* Certifications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">
            No certifications added yet
          </div>
        ) : (
          certifications.map((cert) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-6 rounded-xl border border-gray-700"
            >
              {cert.certificateImage && (
                <img
                  src={cert.certificateImage}
                  alt={cert.name}
                  className="w-full h-32 rounded-lg object-cover mb-4"
                />
              )}

              <h4 className="text-lg font-semibold text-white mb-1">{cert.name}</h4>
              <p className="text-blue-400 text-sm mb-2">{cert.issuer}</p>
              <p className="text-gray-400 text-sm mb-3">
                {formatDateDisplay(cert.issueDate)}
              </p>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mb-4"
                >
                  <FiExternalLink size={14} /> View Credential
                </a>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cert)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                >
                  <FiEdit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cert._id)}
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

export default AdminCertifications;
