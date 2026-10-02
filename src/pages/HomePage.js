import React from 'react';
import FlowHome from '../components/flow/FlowHome';
import LiveDemoSection from '../components/LiveDemoSection';
import PartnershipsSection from '../components/PartnershipsSection';

// fλow is the main product. DialogosAI is its assistant: the live DialogosAI demo
// sits right after "how it works", and the partnerships prove it in the field.
const HomePage = () => {
  return (
    <FlowHome
      afterHow={<LiveDemoSection brandName="DialogosAI" brandShort="DialogosAI" conversationTitle />}
      afterInsights={<PartnershipsSection />}
    />
  );
};

export default HomePage;
