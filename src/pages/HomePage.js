import React from 'react';
import ForbesHero from '../components/ForbesHero';
import LiveDemoSection from '../components/LiveDemoSection';
import PartnershipsSection from '../components/PartnershipsSection';
import EnterpriseCTA from '../components/EnterpriseCTA';

const HomePage = () => {
  return (
    <>
      {/* 1. Hero with logo */}
      <ForbesHero />

      {/* 2. Pyxida conversation demo */}
      <LiveDemoSection brandName="Pyxida" brandShort="Pyxida" conversationTitle />

      {/* 3. Collaborations — trust section */}
      <PartnershipsSection />

      {/* 4. CTA */}
      <EnterpriseCTA />
    </>
  );
};

export default HomePage;

