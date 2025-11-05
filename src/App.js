import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './App.css';

function App() {
  return (
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

