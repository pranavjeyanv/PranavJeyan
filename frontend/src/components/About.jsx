import React from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, ShieldAlert, Zap, Target } from 'lucide-react';
import Terminal from './Terminal';

const About = () => {
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

  const highlights = [
    {
      icon: ShieldAlert,
      title: 'SOC Operations',
      description: 'Expert in security alert monitoring, incident response, and threat analysis',
    },
    {
      icon: Target,
      title: 'Penetration Testing',
      description: 'Comprehensive vulnerability assessment and security testing methodologies',
    },
    {
      icon: TerminalIcon,
      title: 'Security Research',
      description: 'Active bug bounty hunter and vulnerability researcher on CyberComOlho',
    },
    {
      icon: Zap,
      title: 'Threat Intelligence',
      description: 'MITRE ATT&CK framework correlation and threat pattern analysis',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Me</h2>
            <p className="text-cyan-400 text-lg">Cybersecurity professional with hands-on SOC, penetration testing, and research expertise</p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left side - Professional Summary */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="p-8 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a]">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Professional Summary</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  SOC Analyst at CyboSec Technologies with hands-on experience in security operations, threat detection, and incident response. Actively pursuing bug bounties and security research to identify and responsibly disclose vulnerabilities.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Specialized in SIEM/EDR/XDR platform operations, MITRE ATT&CK framework analysis, and threat intelligence. Passionate about learning emerging security technologies and contributing to the cybersecurity community.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Throughout my internships at leading security firms, I've developed expertise in penetration testing, vulnerability assessment, and security automation. Committed to secure SDLC practices and proactive threat prevention.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Current Role', value: 'SOC Analyst' },
                  { label: 'Focus Areas', value: '5+ Security Domains' },
                  { label: 'Top Skill', value: 'Incident Response' },
                  { label: 'Approach', value: 'Proactive Defense' },
                ].map((fact, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/30"
                  >
                    <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">{fact.label}</p>
                    <p className="text-white font-bold">{fact.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Terminal */}
            <motion.div variants={itemVariants}>
              <Terminal />
            </motion.div>
          </div>

          {/* Highlights grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {highlight.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{highlight.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
