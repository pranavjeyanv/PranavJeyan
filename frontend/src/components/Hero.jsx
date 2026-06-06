import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { experienceAPI, projectAPI } from '../services/api.js';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Full Stack Developer | MERN Stack Expert';
  const [index, setIndex] = useState(0);
  const [yearsExperience, setYearsExperience] = useState('0+');
  const [projectsCount, setProjectsCount] = useState('0+');

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetInTouch = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = async () => {
    try {
      // Use environment variable for API base URL
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiBaseUrl}/resumes`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const resume = data.data[0];
        
        // If resume has a url, download it
        if (resume.url) {
          const link = document.createElement('a');
          link.href = resume.url;
          link.download = resume.filename || 'Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert('Resume file not available. Please try again later.');
        }
      } else {
        alert('No resume found. Please upload a resume in the admin panel.');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please check back soon!');
    }
  };

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [index, fullText]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [expRes, projRes] = await Promise.all([
          experienceAPI.getExperiences(),
          projectAPI.getProjects(),
        ]);

        // Calculate years of experience
        const experiences = expRes.data.data || [];
        if (experiences.length > 0) {
          const latestExp = experiences[0];
          let yearsExp = 0;
          if (latestExp.currentPosition) {
            const startDate = new Date(latestExp.startDate);
            yearsExp = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24 * 365));
          } else {
            const startDate = new Date(latestExp.startDate);
            const endDate = new Date(latestExp.endDate);
            yearsExp = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24 * 365));
          }
          setYearsExperience(`${Math.max(yearsExp, 1)}+`);
        }

        // Count projects
        const projects = projRes.data.data || [];
        setProjectsCount(`${projects.length}+`);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 -z-10" />

      <motion.div
        className="max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm <span className="gradient-text">Pranav Jeyan V</span>
          </h1>
        </motion.div>

        {/* Typing effect */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-xl md:text-2xl text-gray-300 h-12 flex items-center justify-center">
            {displayedText}
            <span className="animate-pulse ml-2">|</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          I craft beautiful, responsive web applications using modern technologies. 
          Specialized in React, Node.js, MongoDB, and creating seamless user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button 
            onClick={handleViewProjects}
            className="btn-primary flex items-center justify-center gap-2"
          >
            View My Projects
            <FiArrowRight />
          </button>
          <button 
            onClick={handleDownloadResume}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <FiDownload />
            Download Resume
          </button>
          <button
            onClick={handleGetInTouch}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: yearsExperience, label: 'Years Experience' },
            { number: projectsCount, label: 'Projects Completed' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat, idx) => (
            <div key={idx} className="glass rounded-lg p-6">
              <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</p>
              <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      
    </section>
  );
};

export default Hero;
