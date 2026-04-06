'use client';

import { useRef, useState } from 'react';

interface MarqueeStripProps {
  items: string[];
  speed?: number;       // base px/s
  direction?: 'left' | 'right';
  className?: string;
  separator?: string;
}

export default function MarqueeStrip({
  items,
  speed = 60,
  direction = 'left',
  className = '',
  separator = '·',
}: MarqueeStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Combine items with separator
  const text = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-6 md:gap-10">
      <span>{item}</span>
      <span style={{ color: 'var(--gold)', opacity: 0.5 }}>{separator}</span>
    </span>
  ));

  // Double for seamless loop
  const doubled = [...text, ...text];

  const animDuration = `${(items.length * 12) / (speed / 30)}s`;

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fade masks on sides */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{ width: 80, background: 'linear-gradient(to right, var(--obsidian), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{ width: 80, background: 'linear-gradient(to left, var(--obsidian), transparent)' }}
      />

      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{
          animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${animDuration} linear infinite`,
          animationPlayState: isHovered ? 'paused' : 'running',
        }}
      >
        {doubled}
      </div>
    </div>
  );
}
