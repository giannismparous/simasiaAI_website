import React from 'react';
import About from '../components/About';
import Mission from '../components/Mission';
import BridgeSection from '../components/BridgeSection';
import Values from '../components/Values';
import Philosophy from '../components/Philosophy';

const AboutPage = () => {
  return (
    <>
      <div className="about-mission-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
        <BridgeSection />
        <About />
        <Mission />
      </div>
      <Values />
      <Philosophy />
    </>
  );
};

export default AboutPage;

