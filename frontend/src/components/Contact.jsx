import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
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

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'pranavjeyanv@gmail.com',
      href: 'mailto:pranavjeyanv@gmail.com',
      color: 'text-cyan-400',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Pranav Jeyan V',
      href: 'https://www.linkedin.com/in/pranavjeyanv/',
      color: 'text-blue-400',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: '@pranavjeyanv',
      href: 'https://github.com/pranavjeyanv',
      color: 'text-purple-400',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-cyan-400 text-lg">Open to opportunities in cybersecurity and security research</p>
          </motion.div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={idx}
                  href={method.href}
                  target={method.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-8 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 text-center group"
                >
                  <div className={`inline-block p-4 rounded-lg bg-cyan-500/20 mb-4 ${method.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-300">{method.value}</p>
                </motion.a>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ready to collaborate?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm interested in security research, penetration testing opportunities, and cybersecurity roles. Feel free to reach out directly.
            </p>
            <a
              href="mailto:pranavjeyanv@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <Send className="w-5 h-5" />
              Send Email
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="mt-16 flex justify-center gap-6">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a
                  key={idx}
                  href={method.href}
                  target={method.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="p-3 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
