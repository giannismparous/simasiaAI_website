import React from 'react';
import ForbesHero from '../components/ForbesHero';
import LiveDemoSection from '../components/LiveDemoSection';
import HomePyxidaOfferSection from '../components/HomePyxidaOfferSection';
import PartnershipsSection from '../components/PartnershipsSection';
import EnterpriseCTA from '../components/EnterpriseCTA';

const HomePage = () => {
  return (
    <>
      {/* 1. Hero with logo */}
      <ForbesHero />

      {/* 2. Pyxida conversation demo */}
      <LiveDemoSection brandName="Pyxida" brandShort="Pyxida" conversationTitle />

      {/* 3. Pyxida core offer */}
      <HomePyxidaOfferSection />

      {/* 4. Collaborations — trust section */}
      <PartnershipsSection />

      {/* 5. CTA */}
      <EnterpriseCTA />
    </>
  );
};

export default HomePage;

