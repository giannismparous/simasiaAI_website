import React, { useRef, useEffect, useCallback } from 'react';
import './InteractiveConstellation.css';

/**
 * Constellation pattern definitions.
 * Each pattern defines anchor points (normalized 0-1) and connection rules.
 * The canvas renders these as interactive star fields that respond to mouse proximity.
 */
const PATTERNS = {
  /* Neural network — DialogosAI */
  neural: {
    points: [
      // Layer 1 (left)
      { x: 0.08, y: 0.25 }, { x: 0.08, y: 0.5 }, { x: 0.08, y: 0.75 },
      // Layer 2
      { x: 0.25, y: 0.15 }, { x: 0.25, y: 0.4 }, { x: 0.25, y: 0.6 }, { x: 0.25, y: 0.85 },
      // Layer 3 (center)
      { x: 0.45, y: 0.2 }, { x: 0.45, y: 0.45 }, { x: 0.45, y: 0.7 }, { x: 0.45, y: 0.9 },
      // Layer 4
      { x: 0.65, y: 0.15 }, { x: 0.65, y: 0.38 }, { x: 0.65, y: 0.62 }, { x: 0.65, y: 0.85 },
      // Layer 5 (right)
      { x: 0.82, y: 0.3 }, { x: 0.82, y: 0.55 }, { x: 0.82, y: 0.8 },
      // Extra scatter
      { x: 0.15, y: 0.35 }, { x: 0.35, y: 0.32 }, { x: 0.55, y: 0.55 },
      { x: 0.72, y: 0.48 }, { x: 0.9, y: 0.42 }, { x: 0.5, y: 0.1 },
    ],
    maxDist: 0.22,
    baseOpacity: 0.12,
    lineOpacity: 0.06,
    color: [250, 249, 245],
  },

  /* People constellation — Team page */
  people: {
    points: [
      // Person 1 (left)
      { x: 0.15, y: 0.3 }, { x: 0.15, y: 0.38 }, { x: 0.15, y: 0.5 },
      { x: 0.12, y: 0.55 }, { x: 0.18, y: 0.55 }, { x: 0.12, y: 0.7 }, { x: 0.18, y: 0.7 },
      // Person 2
      { x: 0.35, y: 0.25 }, { x: 0.35, y: 0.33 }, { x: 0.35, y: 0.45 },
      { x: 0.32, y: 0.5 }, { x: 0.38, y: 0.5 }, { x: 0.32, y: 0.65 }, { x: 0.38, y: 0.65 },
      // Person 3 (center)
      { x: 0.55, y: 0.28 }, { x: 0.55, y: 0.36 }, { x: 0.55, y: 0.48 },
      { x: 0.52, y: 0.53 }, { x: 0.58, y: 0.53 }, { x: 0.52, y: 0.68 }, { x: 0.58, y: 0.68 },
      // Person 4
      { x: 0.75, y: 0.3 }, { x: 0.75, y: 0.38 }, { x: 0.75, y: 0.5 },
      { x: 0.72, y: 0.55 }, { x: 0.78, y: 0.55 }, { x: 0.72, y: 0.7 }, { x: 0.78, y: 0.7 },
      // Connecting stars
      { x: 0.25, y: 0.4 }, { x: 0.45, y: 0.38 }, { x: 0.65, y: 0.4 },
      { x: 0.5, y: 0.15 }, { x: 0.9, y: 0.45 }, { x: 0.05, y: 0.45 },
    ],
    maxDist: 0.12,
    baseOpacity: 0.1,
    lineOpacity: 0.05,
    color: [250, 249, 245],
  },

  /* Open book — News page */
  book: {
    points: [
      // Spine
      { x: 0.5, y: 0.2 }, { x: 0.5, y: 0.35 }, { x: 0.5, y: 0.5 },
      { x: 0.5, y: 0.65 }, { x: 0.5, y: 0.8 },
      // Left page
      { x: 0.2, y: 0.25 }, { x: 0.2, y: 0.4 }, { x: 0.2, y: 0.55 },
      { x: 0.2, y: 0.7 }, { x: 0.35, y: 0.22 }, { x: 0.35, y: 0.38 },
      { x: 0.35, y: 0.52 }, { x: 0.35, y: 0.68 }, { x: 0.35, y: 0.82 },
      // Right page
      { x: 0.65, y: 0.22 }, { x: 0.65, y: 0.38 }, { x: 0.65, y: 0.52 },
      { x: 0.65, y: 0.68 }, { x: 0.65, y: 0.82 },
      { x: 0.8, y: 0.25 }, { x: 0.8, y: 0.4 }, { x: 0.8, y: 0.55 }, { x: 0.8, y: 0.7 },
      // Text lines (subtle dots)
      { x: 0.25, y: 0.32 }, { x: 0.3, y: 0.32 }, { x: 0.4, y: 0.32 },
      { x: 0.6, y: 0.32 }, { x: 0.7, y: 0.32 }, { x: 0.75, y: 0.32 },
      // Scatter
      { x: 0.1, y: 0.35 }, { x: 0.9, y: 0.35 }, { x: 0.1, y: 0.65 }, { x: 0.9, y: 0.65 },
    ],
    maxDist: 0.18,
    baseOpacity: 0.1,
    lineOpacity: 0.05,
    color: [250, 249, 245],
  },

  /* Briefcase / geometric — Services page */
  briefcase: {
    points: [
      // Briefcase outline
      { x: 0.3, y: 0.3 }, { x: 0.7, y: 0.3 }, { x: 0.7, y: 0.65 }, { x: 0.3, y: 0.65 },
      // Handle
      { x: 0.4, y: 0.3 }, { x: 0.4, y: 0.22 }, { x: 0.6, y: 0.22 }, { x: 0.6, y: 0.3 },
      // Interior
      { x: 0.5, y: 0.35 }, { x: 0.5, y: 0.5 }, { x: 0.5, y: 0.6 },
      { x: 0.38, y: 0.45 }, { x: 0.62, y: 0.45 },
      // Lightbulb (idea)
      { x: 0.82, y: 0.2 }, { x: 0.8, y: 0.28 }, { x: 0.84, y: 0.28 },
      { x: 0.82, y: 0.14 }, { x: 0.78, y: 0.17 }, { x: 0.86, y: 0.17 },
      // Gear
      { x: 0.15, y: 0.5 }, { x: 0.12, y: 0.45 }, { x: 0.18, y: 0.45 },
      { x: 0.12, y: 0.55 }, { x: 0.18, y: 0.55 },
      // Scatter
      { x: 0.1, y: 0.2 }, { x: 0.9, y: 0.6 }, { x: 0.2, y: 0.8 }, { x: 0.8, y: 0.8 },
      { x: 0.5, y: 0.82 }, { x: 0.5, y: 0.12 },
    ],
    maxDist: 0.2,
    baseOpacity: 0.1,
    lineOpacity: 0.05,
    color: [250, 249, 245],
  },

  /* Handshake — Collaborations page */
  handshake: {
    points: [
      // Left hand
      { x: 0.2, y: 0.5 }, { x: 0.28, y: 0.45 }, { x: 0.35, y: 0.42 },
      { x: 0.22, y: 0.55 }, { x: 0.3, y: 0.52 },
      // Right hand
      { x: 0.8, y: 0.5 }, { x: 0.72, y: 0.45 }, { x: 0.65, y: 0.42 },
      { x: 0.78, y: 0.55 }, { x: 0.7, y: 0.52 },
      // Clasp center
      { x: 0.45, y: 0.44 }, { x: 0.5, y: 0.42 }, { x: 0.55, y: 0.44 },
      { x: 0.48, y: 0.48 }, { x: 0.52, y: 0.48 },
      // Arms
      { x: 0.1, y: 0.6 }, { x: 0.15, y: 0.55 },
      { x: 0.9, y: 0.6 }, { x: 0.85, y: 0.55 },
      // Sparkle above
      { x: 0.5, y: 0.25 }, { x: 0.45, y: 0.3 }, { x: 0.55, y: 0.3 },
      { x: 0.42, y: 0.2 }, { x: 0.58, y: 0.2 },
      // Scatter
      { x: 0.1, y: 0.3 }, { x: 0.9, y: 0.3 }, { x: 0.5, y: 0.75 },
      { x: 0.2, y: 0.75 }, { x: 0.8, y: 0.75 }, { x: 0.5, y: 0.1 },
    ],
    maxDist: 0.18,
    baseOpacity: 0.1,
    lineOpacity: 0.05,
    color: [250, 249, 245],
  },

  /* Calendar — Book Demo */
  calendar: {
    points: [
      // Calendar frame
      { x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }, { x: 0.75, y: 0.75 }, { x: 0.25, y: 0.75 },
      // Top bar
      { x: 0.25, y: 0.32 }, { x: 0.75, y: 0.32 },
      // Hooks
      { x: 0.38, y: 0.2 }, { x: 0.38, y: 0.28 },
      { x: 0.62, y: 0.2 }, { x: 0.62, y: 0.28 },
      // Grid dots
      { x: 0.35, y: 0.42 }, { x: 0.5, y: 0.42 }, { x: 0.65, y: 0.42 },
      { x: 0.35, y: 0.52 }, { x: 0.5, y: 0.52 }, { x: 0.65, y: 0.52 },
      { x: 0.35, y: 0.62 }, { x: 0.5, y: 0.62 }, { x: 0.65, y: 0.62 },
      // Scatter
      { x: 0.1, y: 0.4 }, { x: 0.9, y: 0.4 }, { x: 0.5, y: 0.1 },
      { x: 0.1, y: 0.8 }, { x: 0.9, y: 0.8 },
    ],
    maxDist: 0.2,
    baseOpacity: 0.1,
    lineOpacity: 0.05,
    color: [250, 249, 245],
  },

  /* Minimal pulsing — for CTA sections */
  minimal: {
    points: [
      { x: 0.1, y: 0.2 }, { x: 0.3, y: 0.35 }, { x: 0.5, y: 0.15 },
      { x: 0.7, y: 0.4 }, { x: 0.9, y: 0.25 }, { x: 0.2, y: 0.7 },
      { x: 0.4, y: 0.6 }, { x: 0.6, y: 0.75 }, { x: 0.8, y: 0.6 },
      { x: 0.15, y: 0.45 }, { x: 0.85, y: 0.5 }, { x: 0.5, y: 0.5 },
      { x: 0.35, y: 0.85 }, { x: 0.65, y: 0.85 }, { x: 0.5, y: 0.9 },
    ],
    maxDist: 0.28,
    baseOpacity: 0.08,
    lineOpacity: 0.03,
    color: [250, 249, 245],
  },
};

const InteractiveConstellation = ({ pattern = 'minimal', className = '' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);
  const starsRef = useRef([]);
  const isMobileRef = useRef(false);

  const getPattern = useCallback(() => {
    return PATTERNS[pattern] || PATTERNS.minimal;
  }, [pattern]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isMobileRef.current = window.innerWidth < 768;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Initialize stars from pattern
      const pat = getPattern();
      const w = rect.width;
      const h = rect.height;
      starsRef.current = pat.points.map(p => ({
        x: p.x * w,
        y: p.y * h,
        baseX: p.x * w,
        baseY: p.y * h,
        radius: 1.2 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        drift: 2 + Math.random() * 3,
      }));
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const draw = (time) => {
      const w = canvas.style.width ? parseInt(canvas.style.width) : canvas.width;
      const h = canvas.style.height ? parseInt(canvas.style.height) : canvas.height;
      ctx.clearRect(0, 0, w, h);

      const pat = getPattern();
      const stars = starsRef.current;
      const mouse = mouseRef.current;
      const t = time * 0.001;
      const proximityRadius = Math.min(w, h) * 0.3;

      // Update star positions (gentle drift)
      stars.forEach(s => {
        s.x = s.baseX + Math.sin(t * s.speed + s.phase) * s.drift;
        s.y = s.baseY + Math.cos(t * s.speed * 0.7 + s.phase) * s.drift * 0.6;
      });

      // Draw connections
      const maxDist = pat.maxDist * Math.max(w, h);
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            let opacity = pat.lineOpacity * (1 - dist / maxDist);

            // Mouse proximity boost
            const midX = (stars[i].x + stars[j].x) / 2;
            const midY = (stars[i].y + stars[j].y) / 2;
            const mDx = mouse.x - midX;
            const mDy = mouse.y - midY;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            if (mDist < proximityRadius) {
              opacity += 0.12 * (1 - mDist / proximityRadius);
            }

            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(${pat.color.join(',')},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      stars.forEach(s => {
        let opacity = pat.baseOpacity + Math.sin(t * 1.5 + s.phase) * 0.04;
        let radius = s.radius;

        // Mouse proximity boost
        const mDx = mouse.x - s.x;
        const mDy = mouse.y - s.y;
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
        if (mDist < proximityRadius) {
          const boost = 1 - mDist / proximityRadius;
          opacity += 0.35 * boost;
          radius += 1.5 * boost;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pat.color.join(',')},${opacity})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [getPattern]);

  return (
    <canvas
      ref={canvasRef}
      className={`ic-canvas ${className}`}
      aria-hidden="true"
    />
  );
};

export default InteractiveConstellation;
