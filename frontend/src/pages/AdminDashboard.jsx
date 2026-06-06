import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiTarget,
  FiMail,
  FiFileText,
  FiSettings,
} from 'react-icons/fi';
import { useAuthStore } from '../store/index.js';
import AdminAbout from '../components/AdminAbout.jsx';
import AdminSkills from '../components/AdminSkills.jsx';
import AdminOtherSkills from '../components/AdminOtherSkills.jsx';
import AdminProjects from '../components/AdminProjects.jsx';
import AdminExperience from '../components/AdminExperience.jsx';
import AdminEducation from '../components/AdminEducation.jsx';
import AdminCertifications from '../components/AdminCertifications.jsx';
import AdminAchievements from '../components/AdminAchievements.jsx';
import AdminMessages from '../components/AdminMessages.jsx';
import AdminResume from '../components/AdminResume.jsx';
import AdminSettings from '../components/AdminSettings.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'about', label: 'About', icon: FiUser },
    { id: 'skills', label: 'Skills', icon: FiCode },
    { id: 'other-skills', label: 'Other Competencies', icon: FiCode },
    { id: 'projects', label: 'Projects', icon: FiBriefcase },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'education', label: 'Education', icon: FiBookOpen },
    { id: 'certifications', label: 'Certifications', icon: FiAward },
    { id: 'achievements', label: 'Achievements', icon: FiTarget },
    { id: 'messages', label: 'Messages', icon: FiMail },
    { id: 'resume', label: 'Resume Manager', icon: FiFileText },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <AdminAbout onBack={() => setActiveTab('dashboard')} />;
      case 'skills':
        return <AdminSkills onBack={() => setActiveTab('dashboard')} />;
      case 'other-skills':
        return <AdminOtherSkills onBack={() => setActiveTab('dashboard')} />;
      case 'projects':
        return <AdminProjects onBack={() => setActiveTab('dashboard')} />;
      case 'experience':
        return <AdminExperience onBack={() => setActiveTab('dashboard')} />;
      case 'education':
        return <AdminEducation onBack={() => setActiveTab('dashboard')} />;
      case 'certifications':
        return <AdminCertifications onBack={() => setActiveTab('dashboard')} />;
      case 'achievements':
        return <AdminAchievements onBack={() => setActiveTab('dashboard')} />;
      case 'messages':
        return <AdminMessages onBack={() => setActiveTab('dashboard')} />;
      case 'resume':
        return <AdminResume onBack={() => setActiveTab('dashboard')} />;
      case 'settings':
        return <AdminSettings onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isLargeScreen || sidebarOpen ? 0 : -300 }}
        className={`${isLargeScreen || sidebarOpen ? 'w-64' : 'w-0'} glass border-r border-gray-700 transition-all duration-300 overflow-hidden flex flex-col fixed lg:static z-40 h-full`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (!isLargeScreen) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-30 glass border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <h2 className="text-3xl font-bold gradient-text capitalize">
              {menuItems.find((m) => m.id === activeTab)?.label || 'Dashboard'}
            </h2>

            <div className="text-sm text-gray-400">
              Welcome, <span className="text-blue-400 font-medium">{user?.email || 'Admin'}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
        />
      )}
    </div>
  );
};

// Dashboard Overview Component
const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Welcome Section */}
      <div className="glass p-8 rounded-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-gray-400">
          Manage your portfolio content with ease. Use the sidebar to navigate to different sections.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Sections"
          value="10"
          description="Manage all portfolio content"
          color="blue"
        />
        <StatCard
          title="Fully Dynamic"
          value="✓"
          description="No hardcoded content"
          color="green"
        />
        <StatCard
          title="Production Ready"
          value="✓"
          description="Secure & optimized"
          color="purple"
        />
        <StatCard
          title="Responsive"
          value="✓"
          description="Mobile friendly design"
          color="yellow"
        />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="Profile Management"
          description="Update your profile image, name, role, and bio"
          icon="👤"
        />
        <FeatureCard
          title="Skills Management"
          description="Add, edit, and delete skills with proficiency levels"
          icon="💻"
        />
        <FeatureCard
          title="Project Showcase"
          description="Manage projects with link validation and health checks"
          icon="🚀"
        />
        <FeatureCard
          title="Experience Timeline"
          description="Add work experiences with technologies used"
          icon="💼"
        />
        <FeatureCard
          title="Education Records"
          description="Maintain educational background and achievements"
          icon="📚"
        />
        <FeatureCard
          title="Certifications"
          description="Showcase your certifications with credentials"
          icon="🏆"
        />
        <FeatureCard
          title="Achievements"
          description="Highlight your major accomplishments"
          icon="⭐"
        />
        <FeatureCard
          title="Message Management"
          description="View and manage contact form submissions"
          icon="💬"
        />
        <FeatureCard
          title="Resume Manager"
          description="Upload and manage your resume files"
          icon="📄"
        />
        <FeatureCard
          title="Settings & SEO"
          description="Configure site settings and SEO metadata"
          icon="⚙️"
        />
      </div>

      {/* Info Section */}
      <div className="glass p-8 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>Dynamic Content:</strong> All portfolio data is stored in MongoDB and loaded
              dynamically
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>Real-time Updates:</strong> Changes are reflected immediately without code
              changes
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>Form Validation:</strong> All forms have proper validation before saving
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>URL Validation:</strong> GitHub and live URLs are validated before saving
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>Link Testing:</strong> Test all project links with one click to verify they
              work
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>Secure Access:</strong> All admin endpoints are protected with JWT
              authentication
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>Toast Notifications:</strong> Real-time feedback for all actions
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400">✓</span>
            <span>
              <strong>Responsive Design:</strong> Works perfectly on all devices
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, description, color }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass p-6 rounded-xl border border-gray-700 bg-gradient-to-br ${colors[color]} bg-opacity-10`}
    >
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

export default AdminDashboard;
