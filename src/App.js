import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { BillingPreferenceProvider } from './contexts/BillingPreferenceContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import ScrollToTop from './components/ScrollToTop';
import OverscrollFill from './components/OverscrollFill';
import HomePage from './pages/HomePage';
import FlowPage from './pages/FlowPage';
import GoPage from './pages/GoPage';
import PlatformPage from './pages/PlatformPage';
import CollaborationsPage from './pages/CollaborationsPage';
import YpodochiPage from './pages/YpodochiPage';
import TeamPage from './pages/TeamPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import NewsletterPage from './pages/NewsletterPage';
import ChatbotBubble from './components/ChatbotBubble';
import DocumentTitle from './components/DocumentTitle';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import CookieBanner from './components/CookieBanner';
import PricingCalculatorPage from './pages/PricingCalculatorPage';
import './App.css';

/* Old addresses from earlier editions of the site keep working: they land on
   the page that replaced them, keeping ?query (e.g. /flow/build?for=ngo → /go?for=ngo). */
function Moved({ to, hash = '' }) {
  const { search } = useLocation();
  return <Navigate replace to={`${to}${search}${hash}`} />;
}

function App() {
  return (
    <LanguageProvider>
      <BillingPreferenceProvider>
      <Router>
        <ScrollToTop />
        <DocumentTitle />
        <OverscrollFill />
        <div className="App">
          <CursorFollower />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flow" element={<FlowPage />} />
            <Route path="/go" element={<GoPage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/ypodochi" element={<YpodochiPage />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<ArticlePage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/calculator" element={<PricingCalculatorPage />} />
            <Route path="/pricing-calculator" element={<PricingCalculatorPage />} />

            {/* Earlier editions → current pages */}
            <Route path="/flow/build" element={<Moved to="/go" />} />
            <Route path="/demo" element={<Moved to="/go" hash="#book" />} />
            <Route path="/book-demo" element={<Moved to="/go" hash="#book" />} />
            <Route path="/contact" element={<Moved to="/go" hash="#contact" />} />
            <Route path="/about" element={<Navigate to="/team" replace />} />
            <Route path="/solutions" element={<Navigate to="/flow" replace />} />
            <Route path="/target-audience" element={<Navigate to="/flow" replace />} />
            <Route path="/applications" element={<Navigate to="/flow" replace />} />
            <Route path="/applications/simasia-chatbots" element={<Navigate to="/flow" replace />} />
            <Route path="/applications/simasia-studio" element={<Navigate to="/flow" replace />} />
            <Route path="/applications/simasia-daily" element={<Navigate to="/flow" replace />} />
            <Route path="/applications/simasia-edu" element={<Navigate to="/flow" replace />} />
            <Route path="/products" element={<Navigate to="/flow" replace />} />
            <Route path="/products/simasia-chatbots" element={<Navigate to="/flow" replace />} />
            <Route path="/products/simasia-studio" element={<Navigate to="/flow" replace />} />
            <Route path="/products/simasia-daily" element={<Navigate to="/flow" replace />} />
            <Route path="/products/simasia-edu" element={<Navigate to="/flow" replace />} />
            <Route path="/services" element={<Navigate to="/flow" replace />} />
            <Route path="/services/consulting" element={<Navigate to="/flow" replace />} />
            <Route path="/services/education" element={<Navigate to="/flow" replace />} />
            <Route path="/applications/*" element={<Navigate to="/flow" replace />} />
            <Route path="/products/*" element={<Navigate to="/flow" replace />} />
            <Route path="/services/*" element={<Navigate to="/flow" replace />} />
            <Route path="/archive/*" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <ChatbotBubble />
          <CookieBanner />
        </div>
      </Router>
      </BillingPreferenceProvider>
    </LanguageProvider>
  );
}

export default App;

