import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data/experience';
import { ChevronDown } from 'lucide-react';

const ExperienceTimeline = () => {
  const [expanded, setExpanded] = useState(null);

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Experience</h2>
          <p className="text-cyan-400 text-lg">Professional journey in cybersecurity</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline connector */}
              {index !== experienceData.length - 1 && (
                <div className="absolute left-8 top-20 w-1 h-12 bg-gradient-to-b from-cyan-400/50 to-transparent" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-4 top-4 w-8 h-8 rounded-full border-2 border-cyan-400 bg-[#0a0e27] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
              </div>

              {/* Experience card */}
              <div className="ml-20">
                <motion.button
                  onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                  className="w-full text-left p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-r from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:bg-cyan-500/5 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-cyan-300 text-lg mt-1">{exp.company}</p>
                      {exp.location && (
                        <p className="text-gray-400 text-sm mt-1">{exp.location}</p>
                      )}
                      <p className="text-gray-500 text-sm mt-2">{exp.period}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 mt-1 flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Expanded content */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expanded === exp.id ? 1 : 0,
                    height: expanded === exp.id ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 ml-6 border-l-2 border-cyan-400/30 pl-6 space-y-6">
                    {/* Description */}
                    <div>
                      <p className="text-gray-300 text-base leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-3">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <span className="text-cyan-400 mt-1">▸</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-3">Skills & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
