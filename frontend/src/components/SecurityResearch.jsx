import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Shield, Zap } from 'lucide-react';

const SecurityResearch = () => {
  const stages = [
    {
      title: 'Reconnaissance',
      description: 'Information gathering and target scoping',
      icon: Shield,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Discovery',
      description: 'Identifying potential vulnerabilities',
      icon: Zap,
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Validation',
      description: 'Confirming and assessing findings',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'PoC Development',
      description: 'Creating proof of concept',
      icon: Globe,
      color: 'from-pink-500 to-red-500',
    },
    {
      title: 'Disclosure',
      description: 'Responsible vulnerability disclosure',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
    },
  ];

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
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Security Research</h2>
          <p className="text-cyan-400 text-lg">Bug bounty hunting and vulnerability research methodology</p>
        </motion.div>

        {/* Research methodology flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-stretch">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div key={index} variants={itemVariants} className="flex-1 relative">
                  {/* Card */}
                  <div className={`p-6 rounded-lg h-full bg-gradient-to-br ${stage.color} text-white border border-white/20 backdrop-blur-md relative group hover:shadow-2xl transition-all duration-300`}>
                    <div className="absolute inset-0 bg-black/40 rounded-lg group-hover:bg-black/20 transition-all duration-300" />
                    <div className="relative z-10">
                      <Icon className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                      <p className="text-white/90 text-sm">{stage.description}</p>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  {index < stages.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 origin-left"
                    >
                      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 border-r-2 border-b-2 border-cyan-400 rotate-45" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Research highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'OWASP Top 10',
              description: 'Web application vulnerability classification and testing methodology',
            },
            {
              title: 'Web Application Security',
              description: 'Comprehensive testing of modern web applications and APIs',
            },
            {
              title: 'Reconnaissance Techniques',
              description: 'Advanced information gathering and passive analysis methods',
            },
            {
              title: 'Vulnerability Analysis',
              description: 'Deep technical analysis and impact assessment of findings',
            },
            {
              title: 'PoC Development',
              description: 'Creating reliable proof of concepts for vulnerability verification',
            },
            {
              title: 'Responsible Disclosure',
              description: 'Ethical and coordinated vulnerability reporting practices',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-cyan-400 mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 mb-6">
            Active participant in bug bounty programs. Committed to responsible disclosure and cybersecurity community engagement.
          </p>
          <a
            href="https://cyber.comolho.com/researcher/profile/pranavjeyanv/?hof-page=1&activity-log-page=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            View Research Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityResearch;
