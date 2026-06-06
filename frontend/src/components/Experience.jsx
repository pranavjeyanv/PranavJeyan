import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experienceAPI } from '../services/api.js';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experienceAPI.getExperiences();
        setExperiences(response.data.data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Building amazing products for innovative companies
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading experiences...</div>
          ) : (          <>          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 md:transform md:-translate-x-1/2" />

            {/* Experience Items */}
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`mb-12 ${idx % 2 === 0 ? 'md:mr-auto md:pr-24' : 'md:ml-auto md:pl-24'} pl-24 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-dark-light rounded-full flex items-center justify-center border-4 border-indigo-500 md:transform md:-translate-x-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                </div>

                {/* Card */}
                <div className="glass rounded-xl p-6 md:w-full">
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-indigo-400 font-semibold mb-1">{exp.company}</p>
                  <p className="text-gray-400 text-sm mb-4">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} 
                    {' - '}
                    {exp.currentPosition 
                      ? 'Current' 
                      : new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                    }
                  </p>
                  <p className="text-gray-300 mb-4">{exp.description}</p>

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
