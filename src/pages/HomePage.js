import React from 'react';
import ForbesHero from '../components/ForbesHero';
import LiveDemoSection from '../components/LiveDemoSection';
import MidCTA from '../components/MidCTA';
import LearningLoopSection from '../components/LearningLoopSection';
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

      {/* 5. Collaborations — trust section */}
      <PartnershipsSection />

      {/* 6. CTA */}
      <EnterpriseCTA />
    </>
  );
};

export default HomePage;
