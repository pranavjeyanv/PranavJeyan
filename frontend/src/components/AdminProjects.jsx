import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLoader, FiPlay, FiCheck, FiXCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { projectAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';
import { validateUrl } from '../utils/validation.js';

const AdminProjects = ({ onBack }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    liveLink: '',
    githubLink: '',
    featured: false,
    status: 'Active',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectAPI.getProjects();
      setProjects(res.data.data || []);
    } catch (error) {
      notify.error('Error fetching projects');
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.image) {
      notify.error('Please fill in all required fields');
      return;
    }

    if (formData.liveLink && !validateUrl(formData.liveLink)) {
      notify.error('Invalid live URL format');
      return;
    }

    if (formData.githubLink && !validateUrl(formData.githubLink)) {
      notify.error('Invalid GitHub URL format');
      return;
    }

    try {
      setSaving(true);
      let response;
      if (editingId) {
        response = await projectAPI.updateProject(editingId, formData);
        notify.success('Project updated successfully');
      } else {
        response = await projectAPI.createProject(formData);
        notify.success('Project created successfully');
      }
      console.log('Save response:', response);
      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error saving project';
      notify.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (proj) => {
    setFormData({
      ...proj,
      technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
    });
    setEditingId(proj._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectAPI.deleteProject(id);
      notify.success('Project deleted successfully');
      await fetchProjects();
    } catch (error) {
      notify.error('Error deleting project');
    }
  };

  const handleTestLinks = async () => {
    try {
      setTesting(true);
      const res = await projectAPI.testAllLinks();
      const results = {};
      res.data.data.forEach((result) => {
        results[result.projectId] = result;
      });
      setTestResults(results);
      notify.success('All project links tested successfully');
    } catch (error) {
      notify.error('Error testing links');
    } finally {
      setTesting(false);
    }
  };

  const handleTestSingleLink = async (projectId) => {
    try {
      const res = await projectAPI.testSingleLink(projectId);
      setTestResults({
        ...testResults,
        [projectId]: res.data.data,
      });
      notify.success('Project link tested successfully');
    } catch (error) {
      notify.error('Error testing link');
    }
  };

  const getLinkStatusColor = (status) => {
    switch (status) {
      case 'working':
        return 'text-green-400';
      case 'redirect':
        return 'text-yellow-400';
      case 'broken':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getLinkStatusIcon = (status) => {
    switch (status) {
      case 'working':
        return <FiCheck className="text-green-400" />;
      case 'redirect':
        return <FiAlertCircle className="text-yellow-400" />;
      case 'broken':
        return <FiXCircle className="text-red-400" />;
      default:
        return null;
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      liveLink: '',
      githubLink: '',
      featured: false,
      status: 'Active',
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
      <div className="flex gap-2">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiPlus /> Add Project
          </button>
        ) : null}

        <button
          onClick={handleTestLinks}
          disabled={testing || projects.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
        >
          {testing ? <FiLoader className="animate-spin" /> : <FiPlay />}
          Test All Links
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Image
              </label>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Project"
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

            <div className="md:col-span-2">
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
              <input
                type="url"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded"
                />
                Featured Project
              </label>
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">
            No projects added yet
          </div>
        ) : (
          projects.map((proj) => {
            const result = testResults[proj._id];
            return (
              <motion.div
                key={proj._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass p-4 rounded-xl border border-gray-700"
              >
                {proj.image && (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-40 rounded-lg object-cover mb-4"
                  />
                )}

                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-white flex-1">{proj.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${proj.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {proj.status}
                  </span>
                </div>

                {proj.featured && (
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded mb-2 inline-block">
                    Featured
                  </span>
                )}

                <p className="text-gray-300 text-sm mb-3">{proj.description}</p>

                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {result && (
                  <div className="mb-3 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      {getLinkStatusIcon(result.live.status)}
                      <span className={getLinkStatusColor(result.live.status)}>
                        Live: {result.live.status} {result.live.statusCode && `(${result.live.statusCode})`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getLinkStatusIcon(result.github.status)}
                      <span className={getLinkStatusColor(result.github.status)}>
                        GitHub: {result.github.status} {result.github.statusCode && `(${result.github.statusCode})`}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mb-2">
                  {!result && (
                    <button
                      onClick={() => handleTestSingleLink(proj._id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 transition-colors text-sm"
                    >
                      <FiPlay size={14} /> Test
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(proj)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors text-sm"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default AdminProjects;
