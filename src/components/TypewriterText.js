import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text, speed = 80, className = '', delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      // Variable speed for more natural typing
      const charSpeed = text[currentIndex] === ' ' ? speed * 0.5 : speed;
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, charSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, hasStarted]);

  return (
    <span className={className}>
      {displayedText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {char}
        </motion.span>
      ))}
      <AnimatePresence>
        {currentIndex < text.length && (
          <motion.span
            key="cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="cursor"
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default TypewriterText;

