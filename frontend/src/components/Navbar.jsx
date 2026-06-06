import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useUIStore } from '../store/index.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { activeSection, setActiveSection } = useUIStore();

  const navLinks = [
    'Home',
    'About',
    'Skills',
    'Projects',
    'Experience',
    'Education',
    'Certifications',
    'Achievements',
    'Contact',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at top
      if (currentScrollY < 50) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        // Show on scroll up, hide on scroll down
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        setIsVisible(scrollDirection === 'up');
        setIsScrolled(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (link) => {
    const sectionId = link.toLowerCase();
    setActiveSection(sectionId);
    setIsOpen(false);
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold gradient-text">
            VPJ
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeSection === link.toLowerCase()
                    ? 'text-indigo-500 border-b-2 border-indigo-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-indigo-500 hover:bg-opacity-20 rounded transition-all"
              >
                {link}
              </button>
            ))}
            {location.pathname !== '/login' && (
              <Link
                to="/login"
                className="block w-full text-left px-4 py-2 text-indigo-400 hover:text-indigo-300"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
