'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;       // -1 to 1; negative = slower, positive = faster
  direction?: 'y' | 'x';
}

export default function ParallaxSection({
  children,
  className = '',
  speed = -0.3,
  direction = 'y',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = 200 * speed;

  const yTransform = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const xTransform = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={direction === 'y' ? { y: yTransform } : { x: xTransform }}
      >
        {children}
      </motion.div>
    </div>
  );
}
