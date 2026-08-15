import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data/education';
import { BookOpen, Star } from 'lucide-react';

const Education = () => {
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
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Education</h2>
            <p className="text-cyan-400 text-lg">Academic background and achievements</p>
          </motion.div>

          {/* Education Items */}
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-8 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 mb-8 group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-cyan-300 text-lg font-medium">{edu.institution}</p>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mt-2">
                    <span>{edu.location}</span>
                    <span>•</span>
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>

              {/* CGPA */}
              <div className="mb-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">CGPA</p>
                <p className="text-2xl font-bold text-cyan-400">{edu.cgpa}</p>
              </div>

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Key Achievements
                  </h4>
                  <div className="space-y-3">
                    {edu.achievements.map((achievement, achIdx) => (
                      <motion.div
                        key={achIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: achIdx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-cyan-400 mt-1 flex-shrink-0">▸</span>
                        <div>
                          <p className="text-white font-semibold">{achievement.title}</p>
                          <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
