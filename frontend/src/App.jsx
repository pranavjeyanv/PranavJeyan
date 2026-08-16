import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import HomePage from './pages/HomePage';
import './globals.css';

const App = () => {
  useEffect(() => {
    // Dark mode by default for cybersecurity aesthetic
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
};

export default App;
