import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { otherSkillAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';

const AdminOtherSkills = ({ onBack }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await otherSkillAPI.getOtherSkills();
      setSkills(response.data.data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      notify.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) {
      notify.error('Please enter a skill name');
      return;
    }

    try {
      const response = await otherSkillAPI.createOtherSkill({ name: newSkill });
      setSkills([...skills, response.data.data]);
      setNewSkill('');
      notify.success('Skill added successfully');
    } catch (error) {
      console.error('Error adding skill:', error);
      notify.error(error.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleUpdateSkill = async (id) => {
    if (!editingValue.trim()) {
      notify.error('Please enter a skill name');
      return;
    }

    try {
      const response = await otherSkillAPI.updateOtherSkill(id, { name: editingValue });
      setSkills(skills.map((s) => (s._id === id ? response.data.data : s)));
      setEditingId(null);
      setEditingValue('');
      notify.success('Skill updated successfully');
    } catch (error) {
      console.error('Error updating skill:', error);
        notify.error(error.response?.data?.message || 'Failed to update skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await otherSkillAPI.deleteOtherSkill(id);
        setSkills(skills.filter((s) => s._id !== id));
        notify.success('Skill deleted successfully');
      } catch (error) {
        console.error('Error deleting skill:', error);
        notify.error(error.response?.data?.message || 'Failed to delete skill');
      }
    }
  };

  return (
    <div className="p-6 bg-dark rounded-xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-dark-light rounded-lg transition-colors"
        >
          <FiArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Other Competencies</h2>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* Add New Skill */}
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add new competency"
              className="flex-1 px-4 py-2 bg-dark-light rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <FiPlus size={18} />
              Add
            </button>
          </form>

          {/* Skills List */}
          <div className="space-y-2">
            {skills.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No competencies added yet</p>
            ) : (
              skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  className="flex items-center justify-between p-3 bg-dark-light rounded-lg border border-gray-600 hover:border-indigo-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  {editingId === skill._id ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onBlur={() => handleUpdateSkill(skill._id)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdateSkill(skill._id)}
                      className="flex-1 px-3 py-1 bg-dark rounded-lg border border-indigo-500 text-white focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <span className="text-white flex-1">{skill.name}</span>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(skill._id);
                        setEditingValue(skill.name);
                      }}
                      className="p-2 hover:bg-dark rounded-lg transition-colors text-gray-400 hover:text-indigo-400"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="p-2 hover:bg-dark rounded-lg transition-colors text-gray-400 hover:text-red-400"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOtherSkills;
