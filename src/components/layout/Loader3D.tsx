'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader3D({ onComplete }: { onComplete: () => void }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setComplete(true);
      setTimeout(() => onComplete(), 800);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[9999] bg-paper-white flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-display text-4xl text-charcoal tracking-widest uppercase">
              AURA
            </span>
            <div className="w-12 h-px bg-stone-light relative overflow-hidden">
               <motion.div
                 className="absolute inset-y-0 left-0 bg-charcoal"
                 initial={{ width: '0%' }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 1.2, ease: "easeInOut" }}
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
