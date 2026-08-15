import React from 'react';
import { motion } from 'framer-motion';
import { certificationsData, certificationCategories } from '../data/certifications';
import { Award } from 'lucide-react';

const Certifications = () => {
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

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Professional Certifications</h2>
            <p className="text-cyan-400 text-lg">Certifications and credentials in cybersecurity</p>
          </motion.div>

          {/* Certifications Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificationsData.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</p>
                    <p className="text-cyan-300 text-sm">{cert.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</p>
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                      cert.status === 'Pursuing'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                        : cert.status === 'In Progress'
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                        : 'bg-green-500/20 text-green-300 border border-green-400/30'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Categories overview */}
          <motion.div
            variants={itemVariants}
            className="mt-16 p-8 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a]"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Certification Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {certificationCategories.map((category, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-cyan-500/10 text-center">
                  <p className="text-white font-semibold text-sm">{category}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {certificationsData.filter(c => c.category === category).length} cert
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
