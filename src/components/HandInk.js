import React from 'react';

/*
 * A pencil-like wobble for our drawings, so they read as hand-made rather than
 * machine-perfect. Put <HandInk id="…" /> inside an <svg> and wrap the drawing in
 * <g filter="url(#…)">. The noise is fixed (seeded), so the lines never shimmer.
 */
const HandInk = ({ id, scale = 4, freq = 0.03, seed = 7 }) => (
  <defs>
    <filter id={id} x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed={seed} result="paper" />
      <feDisplacementMap in="SourceGraphic" in2="paper" scale={scale} xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

export default HandInk;
