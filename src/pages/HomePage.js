import React from 'react';
import ForbesHero from '../components/ForbesHero';
import LiveDemoSection from '../components/LiveDemoSection';
import MidCTA from '../components/MidCTA';
import LearningLoopSection from '../components/LearningLoopSection';
import AboutSection from '../components/AboutSection';
import PartnershipsSection from '../components/PartnershipsSection';
import EnterpriseCTA from '../components/EnterpriseCTA';

const HomePage = () => {
  return (
    <>
      {/* 1. Hero with logo */}
      <ForbesHero />

      {/* 2. Live Demonstration — auto-typing chatbot */}
      <LiveDemoSection />

      {/* 3. CTA */}
      <MidCTA />

      {/* 4. Continuous learning loop */}
      <LearningLoopSection />

      {/* 5. About — Team, Principles, Mission */}
      <AboutSection />

      {/* 6. Collaborations — trust section */}
      <PartnershipsSection />

      {/* 7. CTA */}
      <EnterpriseCTA />
    </>
  );
};

export default HomePage;
