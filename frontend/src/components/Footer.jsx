import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: FiLinkedin,
      url: 'https://www.linkedin.com/in/pranav-jeyan',
      label: 'LinkedIn',
    },
    {
      icon: FiGithub,
      url: 'https://github.com/pranavjeyan',
      label: 'GitHub',
    },
    {
      icon: FiMail,
      url: 'mailto:pranavjeyan0@gmail.com',
      label: 'Email',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-dark-light border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Pranav Jeyan</h3>
            <p className="text-gray-400 text-sm">
              Full Stack Developer crafting beautiful and functional web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect With Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-glass hover:bg-indigo-500 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="text-gray-300 hover:text-indigo-400" size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex justify-center items-center relative">
            <p className="text-gray-400 text-sm text-center">
              © 2026 Pranav Jeyan V. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-glass hover:bg-indigo-500 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 absolute right-0"
              title="Back to top"
            >
              <FiArrowUp className="text-gray-300" size={20} />
            </button>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
