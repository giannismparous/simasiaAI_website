import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './MissionReveal.css';

/**
 * MissionReveal — blur-to-sharp word cascade.
 * Each word sharpens in sequence; "Pyxida" arrives last with brand accent + glow.
 */
export default function MissionReveal({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  if (!text) return null;

  // Isolate "Pyxida" at the end (handles both "Την Pyxida" and plain "Pyxida")
  const pyxidaIdx = text.lastIndexOf('Pyxida');
  const hasPyxida = pyxidaIdx !== -1;

  // Everything before "Pyxida" — trim trailing space
  const bodyRaw = hasPyxida ? text.slice(0, pyxidaIdx).trimEnd() : text;
  // The word before Pyxida (e.g. "Την") stays visually separate but in same flow
  const bodyWords = bodyRaw.split(' ').filter(Boolean);

  const WORD_STAGGER = 0.042;       // seconds between each word
  const BODY_DURATION = 0.55;
  const PYXIDA_DELAY = bodyWords.length * WORD_STAGGER + 0.18;

  return (
    <p ref={ref} className="mr-root" aria-label={text}>
      {bodyWords.map((word, i) => (
        <motion.span
          key={i}
          className="mr-word"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 0.68, filter: 'blur(0px)' } : {}}
          transition={{
            duration: BODY_DURATION,
            delay: i * WORD_STAGGER,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
      {hasPyxida && (
        <motion.span
          className="mr-pyxida"
          initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.88 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
          transition={{
            duration: 0.75,
            delay: PYXIDA_DELAY,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Pyxida
        </motion.span>
      )}
    </p>
  );
}
