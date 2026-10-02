import React from 'react';
import FlowHome from '../components/flow/FlowHome';
import LiveDemoSection from '../components/LiveDemoSection';
import PartnershipsSection from '../components/PartnershipsSection';

// fλow = DialogosAI (assistant) + PraxisAI (CRM). The live DialogosAI demo
// follows "Λόγος + Πράξη", and the partnerships prove it works in the field.
const HomePage = () => (
  <FlowHome
    demo={<LiveDemoSection brandName="DialogosAI" brandShort="DialogosAI" conversationTitle />}
    proof={<PartnershipsSection />}
  />
);

export default HomePage;
