import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projectAPI } from '../services/api.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const defaultProjects = [
    {
      title: 'NovaCart',
      description: 'E-commerce platform with advanced filtering and checkout system',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://nova-cart-client.vercel.app/',
      githubLink: '#',
      featured: true,
    },
    {
      title: 'Note Maker',
      description: 'Advanced note-taking application with real-time sync',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      liveLink: 'https://note-maker-puce-three.vercel.app/',
      githubLink: '#',
      featured: true,
    },
    {
      title: 'Task Management System',
      description: 'Collaborative task management with drag-and-drop features',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      liveLink: 'https://task-alpha-ruby.vercel.app/',
      githubLink: '#',
      featured: false,
    },
    {
      title: 'N13 Beauty Care',
      description: 'Beauty products e-commerce website with portfolio showcase',
      technologies: ['React', 'Express', 'MongoDB', 'Payment Gateway'],
      liveLink: 'https://n13beautycare.com/',
      githubLink: '#',
      featured: false,
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectAPI.getProjects();
        console.log('API Response:', response);
        const data = response.data?.data || response.data || [];
        console.log('Projects fetched:', data);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to default projects
        console.log('Using default projects');
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    // Handle both full URLs and relative paths
    if (image.startsWith('http')) return image;
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${image}`;
  };

  const handleImageError = (projectIdx) => {
    setImageErrors(prev => ({ ...prev, [projectIdx]: true }));
  };

  return (
    <section id="projects" className="py-20 px-4 bg-dark-light/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore my recent work and side projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(projects.length > 0 ? projects : defaultProjects).map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group glass rounded-xl overflow-hidden card-hover"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 overflow-hidden">
                  {getImageUrl(project.image) && !imageErrors[idx] ? (
                    <img
                      src={getImageUrl(project.image)}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(idx)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-600/20">
                      <div className="text-gray-500 text-4xl">📱</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="text-xs px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && project.githubLink !== '#' && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                      >
                        <FiGithub size={16} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All / View Less Button */}
          {/* Hidden - View All button since we show all projects by default */}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
