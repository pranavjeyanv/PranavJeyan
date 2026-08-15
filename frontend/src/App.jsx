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
      <h1>Cybersecurity Engineer & Ethical Hacker</h1>
      <ScrollProgress />
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
};

export default App;
