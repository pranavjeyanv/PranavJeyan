import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toolsData } from '../data/tools';
import { Terminal } from 'lucide-react';

const SecurityArsenal = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(toolsData.map((tool) => tool.category))];

  const filteredTools =
    filterCategory === 'All' ? toolsData : toolsData.filter((tool) => tool.category === filterCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="arsenal" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Security Arsenal</h2>
          <p className="text-cyan-400 text-lg">Tools and technologies for cybersecurity operations</p>
        </motion.div>


        {/* Tools grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
              className="cursor-pointer group"
            >
              <div className="p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="inline-block text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 mt-2">
                      {tool.category}
                    </span>
                  </div>
                </div>

                {/* Expanded info */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: selectedTool === tool.name ? 1 : 0,
                    height: selectedTool === tool.name ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-cyan-400/20 mt-3 pt-3 space-y-2"
                >
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Usage</p>
                    <p className="text-gray-300 text-sm mt-1">{tool.usage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Domain</p>
                    <p className="text-cyan-300 text-sm mt-1">{tool.domain}</p>
                  </div>
                </motion.div>

                {/* Hover indicator */}
                <div className="text-cyan-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click for details →
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Tools', value: toolsData.length },
            { label: 'Categories', value: categories.length - 1 },
            { label: 'Offensive', value: toolsData.filter((t) => t.domain === 'Offensive Security').length },
            { label: 'Defensive', value: toolsData.filter((t) => t.domain === 'Defensive Security').length },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="p-4 rounded-lg bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] border border-cyan-400/30 text-center"
            >
              <p className="text-3xl font-bold text-cyan-400">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityArsenal;
