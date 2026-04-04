'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Animate counter from 0 to 100
    const duration = 2000; // 2 seconds
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother progress
      const easedProgress = 1 - Math.pow(1 - progress, 4); 
      setCount(Math.round(easedProgress * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Delay slightly before finishing
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-off-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <h1 className="font-display text-4xl md:text-6xl tracking-[0.3em] uppercase mb-8">
          LUX NOIR
        </h1>
        
        <div className="relative w-64 h-px bg-white/10 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 40 }}
          />
        </div>

        <div className="mt-8 font-body text-[10px] tracking-[0.5em] uppercase text-stone">
          Premier Fashion — {count}%
        </div>
      </motion.div>
    </motion.div>
  );
}
