import React from 'react';
import Hero from '../components/Hero';
import WhatWeOffer from '../components/WhatWeOffer';
import WhoItsFor from '../components/WhoItsFor';
import HowWeWork from '../components/HowWeWork';
import Impact from '../components/Impact';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <>
      <Hero />
      <WhatWeOffer />
      <WhoItsFor />
      <HowWeWork />
      <Impact />
      <ContactForm />
    </>
  );
};

export default HomePage;
