'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function GoldDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center py-10"
      aria-hidden="true"
    >
      {/* Left line */}
      <div
        className="h-px"
        style={{
          flex: 1,
          background: 'linear-gradient(to left, rgba(212,175,106,0.4), transparent)',
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'right',
          transition: 'transform 1.2s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/* Center diamond */}
      <div
        className="w-1.5 h-1.5 rotate-45 mx-4"
        style={{
          background: 'var(--gold)',
          boxShadow: '0 0 12px rgba(212,175,106,0.5)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.4s 0.5s',
        }}
      />

      {/* Right line */}
      <div
        className="h-px"
        style={{
          flex: 1,
          background: 'linear-gradient(to right, rgba(212,175,106,0.4), transparent)',
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1.2s cubic-bezier(0.23,1,0.32,1)',
        }}
      />
    </div>
  );
}
