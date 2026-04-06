'use client';

import React, { ReactNode, useRef, useState } from 'react';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;   // 0–1, how strong the magnetic pull is
  radius?: number;     // px radius at which the effect activates
  tag?: keyof React.JSX.IntrinsicElements;
}

export default function MagneticElement({
  children,
  className = '',
  strength = 0.35,
  radius = 80,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      setPos({ x: dx * strength, y: dy * strength });
    }
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0
          ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.15s linear',
        willChange: 'transform',
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
}
