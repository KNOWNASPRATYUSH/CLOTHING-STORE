'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics provider if needed
    console.error('Noir Error Boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-off-white p-6 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md"
      >
        <span className="text-gold text-xs tracking-[0.6em] uppercase mb-8 block">System Breach</span>
        <h1 className="font-display text-5xl md:text-7xl mb-6 italic">The Void <br/>is Unstable</h1>
        <p className="text-stone-light font-body mb-12 leading-relaxed">
          The cinematic experience was interrupted by a rendering conflict. Re-initializing the sequence...
        </p>
        
        <button
          onClick={() => reset()}
          className="group flex items-center gap-4 bg-off-white text-black px-10 py-5 text-sm tracking-[0.3em] uppercase font-body hover:bg-gold transition-all duration-500 mx-auto"
        >
          Reset Sequence
        </button>
      </motion.div>

      {/* Decorative background element */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
