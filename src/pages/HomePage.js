import React from 'react';
import ForbesHero from '../components/ForbesHero';
import EnterpriseCTA from '../components/EnterpriseCTA';
import { FlowTeaser, FlowProof, PressStrip } from '../components/flow/FlowHomeBlocks';

// Home keeps the company's voice (Μέτρο μας ο Άνθρωπος) and introduces fλow as an idea:
// chaos → λ → calm, three doors into the builder, then proof and press.
const HomePage = () => (
  <>
    <ForbesHero bottom={<div className="flh-hero-press"><div className="flh-in"><PressStrip /></div></div>} />
    <FlowTeaser />
    <FlowProof />
    <EnterpriseCTA />
  </>
);

export default HomePage;
