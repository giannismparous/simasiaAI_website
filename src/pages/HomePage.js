import React from 'react';
import ForbesHero from '../components/ForbesHero';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { FlowTeaser, FlowProof, PressBand } from '../components/flow/FlowHomeBlocks';

// Home keeps the company's voice (Μέτρο μας ο Άνθρωπος) and introduces fλow as an idea:
// noise → λ → calm, three doors into /go, the organisations already in flow,
// one calm closing invitation, and the press just above the footer.
const HomePage = () => (
  <>
    <ForbesHero />
    <FlowTeaser />
    <FlowProof />
    <EnterpriseCTA />
    <PressBand />
  </>
);

export default HomePage;
