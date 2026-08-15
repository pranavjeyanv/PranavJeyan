import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';
import { Zap } from 'lucide-react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(skillsData)[0]);

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
      transition: { duration: 0.5 },
    },
  };

  const selectedSkills = skillsData[selectedCategory] || [];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Cybersecurity Skills</h2>
            <p className="text-cyan-400 text-lg">Expertise across multiple security domains</p>
          </motion.div>

       
         

          {/* Skills Display */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            key={selectedCategory}
          >
            {selectedSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-cyan-300 text-sm font-medium mt-1">{skill.proficiency}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>

                {/* Proficiency bar */}
                <div className="h-2 rounded-full bg-cyan-500/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Skill Categories', value: Object.keys(skillsData).length },
              { label: 'Total Skills', value: Object.values(skillsData).flat().length },
              { label: 'Advanced Level', value: Object.values(skillsData).flat().filter(s => s.proficiency === 'Advanced').length },
              { label: 'Security Domains', value: '6+' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] border border-cyan-400/30 text-center"
              >
                <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
