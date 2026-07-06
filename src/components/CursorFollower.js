import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CursorFollower.css';

const MAGNETIC_SELECTORS = ['a','button','.btn','.cta-primary','.nav-demo-button','.value-item','.achievement-item','.collaboration-card','.collab-card','.process-step','.capability-item'];

const getLabel = (el) => {
  if (!el) return '';
  const tag = el.tagName?.toLowerCase();
  const cls = (el.className || '') + ' ' + (el.closest?.('a')?.className || '');
  if (cls.includes('demo') || cls.includes('book')) return 'Demo';
  if (cls.includes('cta') || cls.includes('btn')) return 'Click';
  if (tag === 'a') return 'Open →';
  if (tag === 'button') return 'Click';
  return '';
};

const CursorFollower = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [ring, setRing] = useState({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rafRef = useRef(null);
  const ringTarget = useRef({ x: -200, y: -200 });
  const timeoutRef = useRef(null);

  const animateRing = useCallback(() => {
    setRing(prev => ({
      x: prev.x + (ringTarget.current.x - prev.x) * 0.12,
      y: prev.y + (ringTarget.current.y - prev.y) * 0.12,
    }));
    rafRef.current = requestAnimationFrame(animateRing);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animateRing]);

  const handleMouseMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
    ringTarget.current = { x: e.clientX, y: e.clientY };
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 4000);
  }, []);

  const handleMouseOver = useCallback((e) => {
    const el = e.target;
    const matched = MAGNETIC_SELECTORS.some(sel => el.matches?.(sel) || el.closest?.(sel));
    if (matched) {
      setHovering(true);
      const target = MAGNETIC_SELECTORS.reduce((f, sel) => f || el.closest?.(sel) || (el.matches?.(sel) ? el : null), null);
      setLabel(getLabel(target || el));
    } else {
      setHovering(false);
      setLabel('');
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    setClicking(true);
    const id = Date.now();
    setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  }, []);

  const handleMouseUp = useCallback(() => setTimeout(() => setClicking(false), 100), []);
  const handleMouseLeave = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseDown, handleMouseUp, handleMouseLeave]);

  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouch) return null;

  return (
    <>
      <div className={`cursor-dot${clicking ? ' clicking' : ''}${!visible ? ' hidden' : ''}`}
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }} />
      <div className={`cursor-ring${hovering ? ' hovering' : ''}${clicking ? ' clicking' : ''}${!visible ? ' hidden' : ''}`}
        style={{ transform: `translate(${ring.x - 20}px, ${ring.y - 20}px)` }}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
      {ripples.map(r => (
        <div key={r.id} className="cursor-ripple" style={{ left: r.x, top: r.y }} />
      ))}
    </>
  );
};

export default CursorFollower;
