import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import CollaborationsPage from './pages/CollaborationsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import AboutPage from './pages/AboutPage';
import BookDemoPage from './pages/BookDemoPage';
import TargetAudiencePage from './pages/TargetAudiencePage';
import ProductsPage from './pages/ProductsPage';
import SimasiaChatbotsPage from './pages/SimasiaChatbotsPage';
import SimasiaStudioPage from './pages/SimasiaStudioPage';
import SimasiaDailyPage from './pages/SimasiaDailyPage';
import SimasiaEduPage from './pages/SimasiaEduPage';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <CursorFollower />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/book-demo" element={<BookDemoPage />} />
            <Route path="/target-audience" element={<TargetAudiencePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/simasia-chatbots" element={<SimasiaChatbotsPage />} />
            <Route path="/products/simasia-studio" element={<SimasiaStudioPage />} />
            <Route path="/products/simasia-daily" element={<SimasiaDailyPage />} />
            <Route path="/products/simasia-edu" element={<SimasiaEduPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

