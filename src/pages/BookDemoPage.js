import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { SmoothReveal, WordReveal } from '../components/TextReveal';
import ContactForm from '../components/ContactForm';
import '../components/ContactForm.css';

const BookDemoPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="book-demo-page" style={{ padding: '8rem 0 6rem', minHeight: '80vh' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <SmoothReveal delay={0.1} yOffset={20}>
            <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              Κλείστε ένα demo
            </h1>
          </SmoothReveal>
          <SmoothReveal delay={0.2} yOffset={15}>
            <p style={{ fontSize: '1.25rem', color: 'var(--gray-medium)', maxWidth: '700px', margin: '0 auto 4rem', textAlign: 'center', lineHeight: 1.8 }}>
              <WordReveal 
                text="Ας δημιουργήσουμε μαζί λύσεις με σημασία για τον άνθρωπο. Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας άμεσα."
                delay={0.25}
                duration={0.25}
              />
            </p>
          </SmoothReveal>
        </motion.div>
        
        <ContactForm />
      </div>
    </section>
  );
};

export default BookDemoPage;

