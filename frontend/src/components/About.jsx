import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutAPI, experienceAPI } from '../services/api.js';

const About = () => {
  const [about, setAbout] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, expRes] = await Promise.all([
          aboutAPI.getAbout(),
          experienceAPI.getExperiences(),
        ]);
        if (aboutRes.data.data) {
          setAbout(aboutRes.data.data);
        }
        if (expRes.data.data) {
          setExperiences(expRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <section id="about" className="py-20 px-4 bg-dark-light/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {about?.summary || 'Dynamic Full Stack Developer with expertise in modern web technologies'}
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : about ? (
            <>
          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left side - Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{about.name}</h3>
                <p className="text-gray-300 mb-4">
                  {about.role}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {about.bio}
                </p>
              </div>

              {/* Professional Experience */}
              {experiences.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white">Professional Experience</h4>
                  {experiences.slice(0, 2).map((exp, idx) => (
                    <div key={idx} className="glass rounded-lg p-4 hover:bg-opacity-20 transition-all">
                      <p className="font-semibold text-indigo-400">{exp.role}</p>
                      <p className="text-gray-400 text-sm">{exp.company} {exp.currentPosition ? '- Current' : ''}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right side - Stats */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Quick stats */}
              {[
                {
                  title: 'SPECIALIZATION',
                  desc: 'MERN Stack Development',
                  icon: '💻',
                },
                {
                  title: 'FOCUS',
                  desc: 'Building scalable, secure web applications',
                  icon: '🎯',
                },
                {
                  title: 'APPROACH',
                  desc: 'Clean code, best practices, user-first design',
                  icon: '⚡',
                },
                {
                  title: 'PASSION',
                  desc: 'Learning new technologies & solving complex problems',
                  icon: '🚀',
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass rounded-lg p-6 hover:bg-opacity-20 transition-all"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-sm font-semibold text-indigo-400 mb-1">{stat.title}</p>
                  <p className="text-gray-300">{stat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">Unable to load about data</div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
