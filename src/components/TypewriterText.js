import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 32, className = '', delay = 900 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(false);

    let currentIndex = 0;
    let timeoutId = null;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));

          const char = text[currentIndex - 1];
          const isPunctuation = [',', '.', ';', ':', '—'].includes(char);
          const nextDelay = isPunctuation ? speed * 3.8 : char === ' ' ? speed * 0.75 : speed;

          timeoutId = setTimeout(typeNextChar, nextDelay);
        } else {
          setIsTyping(false);
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  return (
    <span className={`fh-typewriter ${className}`} aria-label={text}>
      <span>{displayedText}</span>
      <span
        className={`fh-cursor ${isTyping ? 'fh-cursor--typing' : 'fh-cursor--done'}`}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
};

export default TypewriterText;
