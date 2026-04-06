'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

type RevealVariant = 'slide-up' | 'slide-left' | 'slide-right' | 'scale-in' | 'fade' | 'clip-reveal';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const variants: Record<RevealVariant, Variants> = {
  'slide-up': {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'clip-reveal': {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
  },
};

export default function ScrollReveal({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.9,
  className = '',
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
