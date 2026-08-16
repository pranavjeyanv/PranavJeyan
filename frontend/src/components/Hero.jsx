import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../data/hero';
import { Shield, Target, Search, Zap, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const getIcon = (iconName) => {
    const icons = {
      shield: <Shield className="w-8 h-8" />,
      target: <Target className="w-8 h-8" />,
      search: <Search className="w-8 h-8" />,
      zap: <Zap className="w-8 h-8" />,
    };
    return icons[iconName] || null;
  };

  return (
    <section id="hero" className="min-h-screen w-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] flex items-center justify-center overflow-hidden relative pt-20">
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
          animation: 'pulse 20s ease-in-out infinite'
        }} />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div variants={containerVariants} className="space-y-8">
            {/* Animated tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">Cybersecurity Professional</span>
            </motion.div>

            {/* Main title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                {heroData.name}
              </h1>
              <p className="text-xl sm:text-2xl text-cyan-300 font-light tracking-wide">
                {heroData.title}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed max-w-xl"
            >
              {heroData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href={heroData.cta.primary.link}
                className="group px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
              >
                {heroData.cta.primary.text}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={heroData.cta.secondary.link}
                download={heroData.cta.secondary.download}
                className="px-8 py-3 rounded-lg border border-cyan-400/50 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm"
              >
                {heroData.cta.secondary.text}
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <a
                href={heroData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={heroData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${heroData.social.email}`}
                className="p-3 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-96">
              {/* Animated background circles */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border border-blue-400/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-24 rounded-full border border-purple-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center shield */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="relative w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl backdrop-blur-md border border-cyan-400/40 flex items-center justify-center group hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
                  <Shield className="w-16 h-16 text-cyan-400" />
                </div>
              </motion.div>

              {/* Orbital highlights */}
              {heroData.highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute w-20 h-20 flex items-center justify-center"
                  animate={{
                    x: Math.cos((index * Math.PI) / 2) * 120,
                    y: Math.sin((index * Math.PI) / 2) * 120,
                  }}
                  transition={{
                    duration: 15 + index,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] border border-cyan-400/30 text-cyan-400 backdrop-blur-sm">
                    {getIcon(item.icon)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-cyan-400 text-sm font-light">Scroll to explore</span>
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
