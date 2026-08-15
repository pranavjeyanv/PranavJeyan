import React, { useEffect } from 'react';
import { useUIStore } from '../store/index.js';

const ScrollProgress = () => {
  const { scrollProgress, setScrollProgress } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress]);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-50 transition-all duration-300"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

export default ScrollProgress;
