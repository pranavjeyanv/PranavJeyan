import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
  const [displayText, setDisplayText] = useState('');
  const commands = [
    { prompt: 'pranav@security:~$ ', output: 'whoami' },
    { prompt: '> ', output: 'Ethical Hacker | Cybersecurity Analyst | Security Researcher' },
    { prompt: '', output: '' },
    { prompt: 'pranav@security:~$ ', output: 'skills' },
    { prompt: '> ', output: 'SIEM • EDR • Penetration Testing • Web App Security • Incident Response' },
    { prompt: '', output: '' },
    { prompt: 'pranav@security:~$ ', output: 'experience' },
    { prompt: '> ', output: 'SOC Analyst @ CyboSec Technologies | Active Bug Bounty Hunter' },
    { prompt: '', output: '' },
    { prompt: 'pranav@security:~$ ', output: 'get_in_touch' },
    { prompt: '> ', output: 'Open to opportunities in cybersecurity and security research' },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let fullText = '';

    const interval = setInterval(() => {
      if (currentIndex < commands.length) {
        const command = commands[currentIndex];
        const fullCommand = command.prompt + command.output;

        if (charIndex < fullCommand.length) {
          fullText += fullCommand[charIndex];
          setDisplayText(fullText);
          charIndex++;
        } else {
          fullText += '\n';
          setDisplayText(fullText);
          currentIndex++;
          charIndex = 0;
        }
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="bg-[#0a0e27] border border-cyan-400/40 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1a1f3a] to-[#2a2f4a] border-b border-cyan-400/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-gray-400 text-sm ml-4 font-mono">security_terminal</span>
        </div>

        {/* Terminal body */}
        <div className="p-6 font-mono text-sm h-64 overflow-y-auto scrollbar-hide">
          <div className="text-cyan-400 leading-relaxed whitespace-pre-wrap break-words">
            {displayText}
            <span className="animate-pulse">|</span>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default Terminal;
