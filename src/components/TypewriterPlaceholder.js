import React, { useState, useEffect } from 'react';

const TypewriterPlaceholder = ({ phrases, paused = false }) => {
  const [display, setDisplay] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (paused || phrases.length === 0) return undefined;

    const current = phrases[phraseIndex];
    let delay = deleting ? 24 : 38;

    if (!deleting && charIndex === current.length) {
      delay = 2200;
    }

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplay(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else if (charIndex > 0) {
        setCharIndex((c) => c - 1);
        setDisplay(current.slice(0, charIndex - 1));
      } else {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, phraseIndex, phrases, paused]);

  return (
    <span className="typewriter-placeholder" aria-hidden="true">
      {display}
      <span className="typewriter-cursor" />
    </span>
  );
};

export default TypewriterPlaceholder;
