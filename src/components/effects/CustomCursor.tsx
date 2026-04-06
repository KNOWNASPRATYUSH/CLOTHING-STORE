'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    // Hover detection
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    const tick = () => {
      // Dot: instant
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;

      // Ring: lagging follow
      ringX += (dotX - ringX) * 0.1;
      ringY += (dotY - ringY) * 0.1;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
        style={{
          width: isClicking ? '4px' : isHovering ? '6px' : '4px',
          height: isClicking ? '4px' : isHovering ? '6px' : '4px',
          background: 'var(--charcoal)',
          transition: 'width 0.3s, height 0.3s, background 0.3s',
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  );
}
