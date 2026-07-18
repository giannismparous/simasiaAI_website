import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import ScrollToTop from './components/ScrollToTop';
import OverscrollFill from './components/OverscrollFill';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import CollaborationsPage from './pages/CollaborationsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import BookDemoPage from './pages/BookDemoPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import ProductsPage from './pages/ProductsPage';
import SimasiaChatbotsPage from './pages/SimasiaChatbotsPage';
import SimasiaStudioPage from './pages/SimasiaStudioPage';
import SimasiaDailyPage from './pages/SimasiaDailyPage';
import SimasiaEduPage from './pages/SimasiaEduPage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import ChatbotBubble from './components/ChatbotBubble';
import DocumentTitle from './components/DocumentTitle';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <DocumentTitle />
        <OverscrollFill />
        <div className="App">
          <CursorFollower />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/about" element={<Navigate to="/team" replace />} />
            <Route path="/book-demo" element={<BookDemoPage />} />
            <Route path="/target-audience" element={<TargetAudiencePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/consulting" element={<Navigate to="/services#consulting" replace />} />
            <Route path="/services/education" element={<Navigate to="/services#education" replace />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<ArticlePage />} />
            <Route path="/applications/simasia-chatbots" element={<SimasiaChatbotsPage />} />
            <Route path="/applications/simasia-studio" element={<SimasiaStudioPage />} />
            <Route path="/applications/simasia-daily" element={<SimasiaDailyPage />} />
            <Route path="/applications/simasia-edu" element={<SimasiaEduPage />} />
            <Route path="/products/simasia-chatbots" element={<SimasiaChatbotsPage />} />
            <Route path="/products/simasia-studio" element={<SimasiaStudioPage />} />
            <Route path="/products/simasia-daily" element={<SimasiaDailyPage />} />
            <Route path="/products/simasia-edu" element={<SimasiaEduPage />} />
          </Routes>
          <Footer />
          <ChatbotBubble />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

