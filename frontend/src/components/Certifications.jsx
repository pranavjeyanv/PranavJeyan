import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { certificationAPI } from '../services/api.js';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await certificationAPI.getCertifications();
        setCertifications(response.data.data || []);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="certifications" className="py-20 px-4">
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
              <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional certifications and verified skills
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading certifications...</div>
          ) : (
          <>
          {/* Certifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="glass rounded-xl p-6 text-center cursor-pointer card-hover group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {cert.icon || '🎯'}
                </div>
                <p className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {cert.name}
                </p>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-indigo-500/60"
                    />
                  ))}
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

export default Certifications;
