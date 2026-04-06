'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransitionCurtain() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsTransitioning(true);
      prevPathname.current = pathname;
      const timer = setTimeout(() => setIsTransitioning(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        >
          {/* Left panel — slides in from left, exits left */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-end"
            style={{ background: 'var(--obsidian)' }}
          />

          {/* Right panel — slides in from right, exits right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
            className="absolute inset-y-0 right-0 w-1/2"
            style={{ background: 'var(--void)' }}
          />

          {/* Center logo — fades in when panels meet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
          >
            <div className="relative flex items-center justify-center">
              {/* Spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute w-20 h-20 rounded-full"
                style={{ border: '1px solid rgba(212,175,106,0.3)' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute w-28 h-28 rounded-full"
                style={{ border: '1px solid rgba(212,175,106,0.12)' }}
              />

              {/* N glyph */}
              <span
                className="font-display italic relative z-10"
                style={{ fontSize: '2.5rem', color: 'var(--off-white)' }}
              >
                N
              </span>
            </div>

            <h2
              className="font-display tracking-[0.5em] uppercase"
              style={{ fontSize: '0.9rem', color: 'var(--gold)' }}
            >
              LUX NOIR
            </h2>

            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.04), transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
