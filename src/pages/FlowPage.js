import React from 'react';
import FlowHome from '../components/flow/FlowHome';
import LiveDemoSection from '../components/LiveDemoSection';
import { FlowProof } from '../components/flow/FlowHomeBlocks';

// /flow: the product page. fλow = DialogosAI (assistant) + PraxisAI (CRM).
const FlowPage = () => (
  <FlowHome
    demo={<LiveDemoSection brandName="DialogosAI" brandShort="DialogosAI" conversationTitle />}
    proof={<FlowProof />}
  />
);

export default FlowPage;
