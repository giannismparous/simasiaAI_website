import React from 'react';
import ForbesHero from '../components/ForbesHero';
import LiveDemoSection from '../components/LiveDemoSection';
import MidCTA from '../components/MidCTA';
import LearningLoopSection from '../components/LearningLoopSection';
import InsightsDashboardSection from '../components/InsightsDashboardSection';
import ControlledImprovementSection from '../components/ControlledImprovementSection';
import AboutSection from '../components/AboutSection';
import PartnershipsSection from '../components/PartnershipsSection';
import EnterpriseCTA from '../components/EnterpriseCTA';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <>
      {/* 1. Hero with logo */}
      <ForbesHero />

      {/* 2. Live Demonstration — auto-typing chatbot */}
      <LiveDemoSection />

      {/* 3. CTA */}
      <MidCTA />

      {/* 4. Continuous learning loop */}
      <LearningLoopSection />

      {/* 5. Insights dashboard — what people actually need */}
      <InsightsDashboardSection />

      {/* 6. Controlled improvement flywheel */}
      <ControlledImprovementSection />

      {/* 7. About — Team, Principles, Mission */}
      <AboutSection />

      {/* 8. Collaborations — trust section */}
      <PartnershipsSection />

      {/* 9. Contact form (EmailJS — same as production main) */}
      <ContactForm />

      {/* 10. CTA */}
      <EnterpriseCTA />
    </>
  );
};

export default HomePage;
