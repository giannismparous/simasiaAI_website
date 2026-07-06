import React, { useEffect, useRef } from 'react';
import './StarCanvas.css';

const NUM_STARS = 160;
const CONNECT_DIST = 100;
const INFLUENCE_RADIUS = 220;
const MAX_PULL = 38;

const StarCanvas = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const burstRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: NUM_STARS }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        ox: 0, oy: 0,
        vx: 0, vy: 0,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.35 + 0.08,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      }));
    };

    resize();
    initStars();

    const handleResize = () => { resize(); initStars(); };
    window.addEventListener('resize', handleResize);

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // Click burst
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const bx = e.clientX - rect.left;
      const by = e.clientY - rect.top;
      burstRef.current.push({ x: bx, y: by, t: 0 });
    };
    window.addEventListener('click', handleClick);

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      frame++;

      const stars = starsRef.current;

      // Update star positions with physics
      stars.forEach(star => {
        const sx = star.x + star.ox;
        const sy = star.y + star.oy;
        const dx = mx - sx;
        const dy = my - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse repel/attract (attract)
        if (dist < INFLUENCE_RADIUS && dist > 0) {
          const force = (1 - dist / INFLUENCE_RADIUS) * MAX_PULL;
          star.vx += (dx / dist) * force * 0.025;
          star.vy += (dy / dist) * force * 0.025;
        }

        // Spring back
        star.vx += -star.ox * 0.05;
        star.vy += -star.oy * 0.05;

        // Friction
        star.vx *= 0.88;
        star.vy *= 0.88;

        star.ox += star.vx;
        star.oy += star.vy;
      });

      // Draw constellation lines
      ctx.save();
      stars.forEach((a, i) => {
        const ax = a.x + a.ox;
        const ay = a.y + a.oy;
        // Only connect if within cursor influence zone
        const mdist = Math.sqrt((mx - ax) ** 2 + (my - ay) ** 2);
        if (mdist > INFLUENCE_RADIUS * 1.5) return;
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const bx2 = b.x + b.ox;
          const by2 = b.y + b.oy;
          const d = Math.sqrt((ax - bx2) ** 2 + (ay - by2) ** 2);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.18 * (1 - mdist / (INFLUENCE_RADIUS * 1.5));
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx2, by2);
            ctx.strokeStyle = `rgba(250,249,245,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      ctx.restore();

      // Draw stars
      stars.forEach(star => {
        const sx = star.x + star.ox;
        const sy = star.y + star.oy;
        const twinkle = 1 + Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.3;
        const distToMouse = Math.sqrt((mx - sx) ** 2 + (my - sy) ** 2);
        const proximity = Math.max(0, 1 - distToMouse / INFLUENCE_RADIUS);
        const opacity = star.opacity * twinkle + proximity * 0.3;
        const radius = star.r * (1 + proximity * 1.5);

        // Glow for nearby stars
        if (proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(217,119,87,${proximity * 0.08})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250,249,245,${Math.min(opacity, 0.95)})`;
        ctx.fill();
      });

      // Draw click bursts
      burstRef.current = burstRef.current.filter(b => b.t < 1);
      burstRef.current.forEach(burst => {
        burst.t += 0.04;
        const r = burst.t * 60;
        const alpha = (1 - burst.t) * 0.5;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217,119,87,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // inner ring
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, r * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(250,249,245,${alpha * 0.6})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-canvas" />;
};

export default StarCanvas;
