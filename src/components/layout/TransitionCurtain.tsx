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
      
      // Auto-finish after a fixed duration that matches the animation
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Snappier duration

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Unique Logo Animation */}
          <div className="relative flex flex-col items-center">
            {/* Minimalist Circular N Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-32 h-32 rounded-full border border-white/20 flex items-center justify-center"
            >
               {/* Inner spinning glow border */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-0 rounded-full border-t border-gold opacity-40 shadow-[0_0_15px_rgba(201,169,110,0.3)]"
               />
               
               <motion.span 
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.5 }}
                 className="font-display text-6xl text-off-white tracking-widest italic drop-shadow-lg"
               >
                 N
               </motion.span>
            </motion.div>
            
            {/* Minimalist Brand Text Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 text-center"
            >
              <h2 className="font-display text-2xl tracking-[0.6em] uppercase text-gold-light">LUX NOIR</h2>
              <div className="mt-4 flex items-center gap-4 justify-center">
                <span className="w-8 h-px bg-white/10" />
                <p className="text-[9px] tracking-[0.6em] text-white/40 uppercase">Elegance in Shadow</p>
                <span className="w-8 h-px bg-white/10" />
              </div>
            </motion.div>
          </div>

          {/* Shimmer Overlay */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
