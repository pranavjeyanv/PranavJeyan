import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiSearch, FiFilter, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { messageAPI } from '../services/api.js';
import { notify } from '../utils/toast.js';
import { formatDateDisplay } from '../utils/validation.js';

const AdminMessages = ({ onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await messageAPI.getMessages();
      setMessages(res.data.data || []);
    } catch (error) {
      notify.error('Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await messageAPI.deleteMessage(id);
      notify.success('Message deleted successfully');
      setMessages(messages.filter((m) => m._id !== id));
    } catch (error) {
      notify.error('Error deleting message');
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    try {
      await messageAPI.markAsRead(id);
      setMessages(
        messages.map((m) => (m._id === id ? { ...m, read: !isRead } : m))
      );
      notify.success(isRead ? 'Marked as unread' : 'Marked as read');
    } catch (error) {
      notify.error('Error updating message');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterRead === 'read') return matchesSearch && msg.read;
    if (filterRead === 'unread') return matchesSearch && !msg.read;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading messages...</div>
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
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-light border border-gray-600 rounded-lg px-10 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={filterRead}
          onChange={(e) => setFilterRead(e.target.value)}
          className="bg-dark-light border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
        </select>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {messages.length === 0 ? 'No messages yet' : 'No messages match your criteria'}
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`glass p-6 rounded-xl border ${msg.read ? 'border-gray-700' : 'border-blue-500/30 bg-blue-500/5'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{msg.name}</h4>
                    {!msg.read && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{msg.email}</p>
                  <p className="text-gray-400 text-sm">
                    Subject: <span className="text-gray-300 font-medium">{msg.subject}</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    {formatDateDisplay(msg.createdAt)}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{msg.message}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkAsRead(msg._id, msg.read)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors text-sm flex-1"
                >
                  <FiCheck size={14} />
                  {msg.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm flex-1"
                >
                  <FiTrash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-sm">Total Messages</p>
          <p className="text-3xl font-bold text-blue-400">{messages.length}</p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-sm">Unread</p>
          <p className="text-3xl font-bold text-yellow-400">
            {messages.filter((m) => !m.read).length}
          </p>
        </div>

        <div className="glass p-4 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-sm">Read</p>
          <p className="text-3xl font-bold text-green-400">
            {messages.filter((m) => m.read).length}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminMessages;
