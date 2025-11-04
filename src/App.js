import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import EducationPage from './pages/EducationPage';
import AboutPage from './pages/AboutPage';
import BookDemoPage from './pages/BookDemoPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <CursorFollower />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

