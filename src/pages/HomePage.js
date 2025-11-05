import React from 'react';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Values from '../components/Values';
import Impact from '../components/Impact';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Mission />
      <Values />
      <Impact />
      <CTA />
      <ContactForm />
    </>
  );
};

export default HomePage;

