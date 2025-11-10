import React from 'react';
import Hero from '../components/Hero';
import Obstacles from '../components/Obstacles';
import AICapabilities from '../components/AICapabilities';
import Mission from '../components/Mission';
import Values from '../components/Values';
import Impact from '../components/Impact';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Obstacles />
      <AICapabilities />
      <Mission />
      <Values />
      <Impact />
      <CTA />
      <ContactForm />
    </>
  );
};

export default HomePage;

