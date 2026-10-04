import React from 'react';
import FlowHome from '../components/flow/FlowHome';
import { FlowProof } from '../components/flow/FlowHomeBlocks';

// /flow: the product page. fλow = DialogosAI (Λόγος) + PraxisAI (Πράξη) + MetronAI (Καταγραφή).
const FlowPage = () => <FlowHome proof={<FlowProof />} />;

export default FlowPage;
