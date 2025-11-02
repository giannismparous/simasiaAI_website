import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mission from './components/Mission';
import Values from './components/Values';
import Philosophy from './components/Philosophy';
import TargetAudience from './components/TargetAudience';
import Solutions from './components/Solutions';
import Products from './components/Products';
import FAQ from './components/FAQ';
import Impact from './components/Impact';
import CTA from './components/CTA';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Mission />
      <Values />
      <Philosophy />
      <TargetAudience />
      <Solutions />
      <Products />
      <FAQ />
      <Impact />
      <CTA />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;

