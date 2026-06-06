import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiDatabase, FiTool } from 'react-icons/fi';
import { skillAPI, otherSkillAPI } from '../services/api.js';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const [skillsResponse, otherSkillsResponse] = await Promise.all([
          skillAPI.getSkills(),
          otherSkillAPI.getOtherSkills()
        ]);
        setSkills(skillsResponse.data.data || []);
        setOtherSkills(otherSkillsResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const categories = ['Frontend', 'Backend', 'Database', 'Tools'];
  const categoryIcons = {
    Frontend: FiCode,
    Backend: FiServer,
    Database: FiDatabase,
    Tools: FiTool,
  };

  const categoryColors = {
    Frontend: 'from-blue-500 to-cyan-500',
    Backend: 'from-purple-500 to-pink-500',
    Database: 'from-green-500 to-emerald-500',
    Tools: 'from-orange-500 to-red-500',
  };

  const skillCategories = categories.map((category) => ({
    title: category,
    icon: categoryIcons[category],
    skills: skills.filter((s) => s.category === category),
    color: categoryColors[category],
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Proficient in modern technologies and best practices
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading skills...</div>
          ) : (
          <>
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group glass rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 card-hover"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  {/* Category Title */}
                  <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIdx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}
                        />
                        <span className="text-gray-300">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="mt-12">
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Other Competencies</h3>
              {otherSkills.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {otherSkills.map((skill, idx) => (
                    <motion.div
                      key={skill._id || idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-4 py-3 text-center text-gray-300 hover:text-indigo-400 transition-colors"
                    >
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No competencies added yet</p>
              )}
            </div>
          </motion.div>
          </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
