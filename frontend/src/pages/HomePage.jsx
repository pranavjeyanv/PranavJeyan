import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SecurityResearch from '../components/SecurityResearch';
import Skills from '../components/Skills';
import SecurityArsenal from '../components/SecurityArsenal';
import Projects from '../components/Projects';
import ExperienceCertificates from '../components/ExperienceCertificates';
import Certifications from '../components/Certifications';
import Education from '../components/Education';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <ExperienceTimeline />
      <SecurityResearch />
      <Skills />
      <SecurityArsenal />
      <Projects />
      <ExperienceCertificates />
      <Certifications />
      <Education />
      <Achievements />
      <Contact />
    </main>
  );
};

export default HomePage;
