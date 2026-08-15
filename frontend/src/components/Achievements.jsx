import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../data/achievements';
import { Trophy, Award, Star } from 'lucide-react';

const Achievements = () => {
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

  const getIcon = (category) => {
    switch (category) {
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'Hackathon':
        return <Trophy className="w-6 h-6" />;
      case 'Competition':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Awards & Achievements</h2>
            <p className="text-cyan-400 text-lg">Recognition and accomplishments</p>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {achievementsData.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Header with icon and year */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                      {getIcon(achievement.category)}
                    </div>
                    <span className="text-sm font-semibold text-gray-500">{achievement.year}</span>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {achievement.description}
                  </p>

                  {/* Category badge */}
                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
                    {achievement.category}
                  </span>
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
              { label: 'Total Awards', value: achievementsData.length },
              { label: 'Categories', value: new Set(achievementsData.map(a => a.category)).size },
              { label: 'Awards', value: achievementsData.filter(a => a.category === 'Award').length },
              { label: 'Active', value: achievementsData.filter(a => a.year === 'Current').length },
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

export default Achievements;
