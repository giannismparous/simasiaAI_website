import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Smooth word-by-word reveal animation
export const WordReveal = ({ text, className = '', delay = 0, duration = 0.3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: duration,
            delay: delay + (index * 0.03),
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Smooth character-by-character fade (subtle)
export const CharReveal = ({ text, className = '', delay = 0, speed = 20 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });
  const chars = text.split('');

  return (
    <span ref={ref} className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + (index * speed / 1000),
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Smooth fade-in with slight movement
export const SmoothReveal = ({ children, className = '', delay = 0, yOffset = 20 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.span>
  );
};

