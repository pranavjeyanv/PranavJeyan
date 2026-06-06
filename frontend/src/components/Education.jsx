import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBook } from 'react-icons/fi';
import { educationAPI } from '../services/api.js';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await educationAPI.getEducations();
        setEducation(response.data.data || []);
      } catch (error) {
        console.error('Error fetching education:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
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
    <section id="education" className="py-20 px-4 bg-dark-light/30">
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
              <span className="gradient-text">Education</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My academic journey and achievements
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading education...</div>
          ) : (
          <>
          {/* Education Cards */}
          <div className="space-y-8">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass rounded-xl p-8 card-hover"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <FiBook className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{edu.institution}</h3>
                      <p className="text-indigo-400 font-semibold text-lg">{edu.degree} in {edu.field}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300">{edu.startYear} - {edu.endYear}</p>
                    {edu.cgpa && <p className="text-indigo-400 font-semibold">CGPA: {edu.cgpa}</p>}
                  </div>
                </div>

                {/* Description */}
                {edu.description && (
                  <div className="mt-4">
                    <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                  </div>
                )}
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

export default Education;
