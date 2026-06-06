import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { achievementAPI } from '../services/api.js';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await achievementAPI.getAchievements();
        setAchievements(response.data.data || []);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="achievements" className="py-20 px-4 bg-dark-light/30">
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
              <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Recognition and awards throughout my career
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading achievements...</div>
          ) : (
          <>
          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass rounded-xl p-6 card-hover border-l-4 border-indigo-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{achievement.year}</p>
                  </div>
                  <div className="text-4xl">{achievement.icon || '🎖️'}</div>
                </div>
                <p className="text-gray-300">{achievement.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {[
              { label: 'Awards Won', value: `${achievements.length}+` },
              { label: 'Hackathons', value: '3+' },
              { label: 'Projects', value: '15+' },
              { label: 'Clients', value: '100%' },
            ].map((stat, idx) => (
              <div key={idx} className="glass rounded-lg p-6 text-center">
                <p className="text-3xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
