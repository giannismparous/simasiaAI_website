import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './CursorFollower.css';

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const bubbleRef = useRef(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Create transforms that offset by half element size to center on cursor
  // No spring animation - direct following for no wiggle
  const bubbleSize = isHovering ? 120 : 80;
  const cursorXBubble = useTransform(cursorX, (x) => x - bubbleSize / 2);
  const cursorYBubble = useTransform(cursorY, (y) => y - bubbleSize / 2);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    
    // Fade in gradually when mouse moves
    setIsVisible(true);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Fade out gradually after 3 seconds of no movement
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, [cursorX, cursorY]);

  const handleMouseOver = useCallback((e) => {
    const target = e.target;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.value-item') ||
      target.closest('.product-item') ||
      target.closest('.achievement-item') ||
      target.closest('.concern-item') ||
      target.closest('.process-step') ||
      target.closest('.collaboration-card') ||
      target.closest('.cta-card') ||
      target.closest('.b2c-card') ||
      target.closest('.challenge-item') ||
      target.closest('.obstacles-grid') ||
      target.closest('.obstacle-item') ||
      target.closest('.business-type-item') ||
      target.closest('.product-item') ||
      target.closest('.capability-item') ||
      target.closest('.why-item') ||
      target.closest('[style*="borderRadius"]') ||
      target.closest('[style*="border-radius"]') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('select')
    ) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Check if device is touch-capable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave]);

  // Don't render on touch devices
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <motion.div
      ref={bubbleRef}
      className={`cursor-follower ${isHovering ? 'hovering' : ''}`}
      style={{
        x: cursorXBubble,
        y: cursorYBubble,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ 
        opacity: { 
          duration: 1.2, 
          ease: [0.25, 0.1, 0.25, 1]
        } 
      }}
    />
  );
};

export default CursorFollower;

