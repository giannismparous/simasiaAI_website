import React from 'react';
import Hero from '../components/Hero';
import ChatbotShowcase from '../components/ChatbotShowcase';
import ProofNumbers from '../components/ProofNumbers';
import UseCases from '../components/UseCases';
import GreenAI from '../components/GreenAI';
import ComplianceSection from '../components/ComplianceSection';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ChatbotShowcase />
      <ProofNumbers />
      <UseCases />
      <GreenAI />
      <ComplianceSection />
      <ContactForm />
    </>
  );
};

export default HomePage;
