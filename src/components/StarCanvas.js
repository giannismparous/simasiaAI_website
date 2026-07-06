import React, { useEffect, useRef } from 'react';
import './StarCanvas.css';

const NUM_STARS = 110;

const StarCanvas = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

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
        r: Math.random() * 1.3 + 0.3,
        opacity: Math.random() * 0.3 + 0.07,
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

    const INFLUENCE_RADIUS = 150;
    const MAX_PULL = 20;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      starsRef.current.forEach(star => {
        const sx = star.x + star.ox;
        const sy = star.y + star.oy;
        const dx = mx - sx;
        const dy = my - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INFLUENCE_RADIUS && dist > 0) {
          const force = (1 - dist / INFLUENCE_RADIUS) * MAX_PULL;
          star.ox += (dx / dist) * force * 0.04;
          star.oy += (dy / dist) * force * 0.04;
        }
        star.ox += -star.ox * 0.06;
        star.oy += -star.oy * 0.06;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250,249,245,${star.opacity})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-canvas" />;
};

export default StarCanvas;
