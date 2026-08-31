/**
 * Archived snapshot of the homepage (Aug 2026).
 * Not linked publicly — route: /archive/old-home
 */
import React from 'react';
import ForbesHero from '../../components/ForbesHero';
import LiveDemoSection from '../../components/LiveDemoSection';
import MidCTA from '../../components/MidCTA';
import LearningLoopSection from '../../components/LearningLoopSection';
import PartnershipsSection from '../../components/PartnershipsSection';
import EnterpriseCTA from '../../components/EnterpriseCTA';
import ArchivePageGuard from '../../components/ArchivePageGuard';

const OldHomePage = () => (
  <>
    <ArchivePageGuard label="old-home" />
    <ForbesHero />
    <LiveDemoSection />
    <MidCTA />
    <LearningLoopSection />
    <PartnershipsSection />
    <EnterpriseCTA />
  </>
);

export default OldHomePage;
