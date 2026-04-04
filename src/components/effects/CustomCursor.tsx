'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with hover (not touch)
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      // Use direct set for the dot to minimize lag
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      // Use short tween for the ring to add "lag" effect
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'sine.out' });
    };

    // Use event delegation for hover effects to handle dynamic content
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-hover]');
      const is3D = target.closest('canvas, .scene-3d');
      
      if (interactive) {
        ring.classList.add('hover');
        ring.innerHTML = '';
      } else if (is3D) {
        ring.classList.add('hover');
        ring.innerHTML = '<span class="cursor-hint">ROTATE</span>';
      } else {
        ring.classList.remove('hover');
        ring.innerHTML = '';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
