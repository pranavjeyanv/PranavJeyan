import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiTrash2, FiDownload, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { resumeAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';

const AdminResume = ({ onBack }) => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState({
    latest: null,
    old: null,
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await resumeAPI.getResumes();
      if (res.data.data) {
        setResumes(res.data.data);
      }
    } catch (error) {
      notify.error('Error fetching resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      notify.error('Please upload a PDF file');
      return;
    }

    try {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // Send to API with correct field names
          await resumeAPI.updateResume(type, {
            filename: file.name,
            url: reader.result, // Base64 encoded PDF
          });
          notify.success(`${type === 'latest' ? 'Latest' : 'Old'} resume updated successfully`);
          await fetchResumes();
          // Reset the input
          e.target.value = '';
        } catch (error) {
          console.error('Resume upload error:', error);
          notify.error(error.response?.data?.message || 'Error uploading resume');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      notify.error('Error reading file');
      setUploading(false);
    }
  };

  const handleDeleteResume = async (type) => {
    if (!window.confirm(`Delete ${type === 'latest' ? 'latest' : 'old'} resume?`)) return;

    try {
      // Just delete by setting null values - backend will handle it
      await resumeAPI.updateResume(type, {
        filename: '',
        url: '',
      });
      notify.success('Resume deleted successfully');
      await fetchResumes();
    } catch (error) {
      console.error('Resume delete error:', error);
      notify.error(error.response?.data?.message || 'Error deleting resume');
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Resume */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Latest Resume</h3>

          {resumes.latest ? (
            <div className="mb-4 space-y-3">
              <div className="p-4 bg-dark-light rounded-lg">
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-medium">File:</span> {resumes.latest.filename}
                </p>
                <p className="text-xs text-gray-400">
                  Updated: {new Date(resumes.latest.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={resumes.latest.url}
                  download={resumes.latest.filename}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <FiDownload size={16} /> Download
                </a>
                <button
                  onClick={() => handleDeleteResume('latest')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-4">No latest resume uploaded</p>
          )}

          <label className="block cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleResumeUpload(e, 'latest')}
              disabled={uploading}
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors hover:bg-blue-500/5">
              {uploading ? (
                <FiLoader className="animate-spin text-blue-400" />
              ) : (
                <>
                  <FiUpload className="text-gray-400" />
                  <span className="text-sm text-gray-400">Upload Latest Resume</span>
                </>
              )}
            </div>
          </label>
        </motion.div>

        {/* Old Resume */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-xl border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Old Resume (Archive)</h3>

          {resumes.old ? (
            <div className="mb-4 space-y-3">
              <div className="p-4 bg-dark-light rounded-lg">
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-medium">File:</span> {resumes.old.filename}
                </p>
                <p className="text-xs text-gray-400">
                  Updated: {new Date(resumes.old.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={resumes.old.url}
                  download={resumes.old.filename}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <FiDownload size={16} /> Download
                </a>
                <button
                  onClick={() => handleDeleteResume('old')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-4">No old resume archived</p>
          )}

          <label className="block cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleResumeUpload(e, 'old')}
              disabled={uploading}
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors hover:bg-blue-500/5">
              {uploading ? (
                <FiLoader className="animate-spin text-blue-400" />
              ) : (
                <>
                  <FiUpload className="text-gray-400" />
                  <span className="text-sm text-gray-400">Upload Old Resume</span>
                </>
              )}
            </div>
          </label>
        </motion.div>
      </div>

      {/* Info */}
      <div className="glass p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Resume Management</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-blue-400">•</span>
            Your latest resume will be displayed on your portfolio
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">•</span>
            Old resume is archived for reference
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">•</span>
            Only PDF files are supported
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">•</span>
            Updates take effect immediately
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AdminResume;
