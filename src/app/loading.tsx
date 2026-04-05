'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        {/* Animated brand mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.9] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-gold rounded-full shadow-[0_0_15px_rgba(201,169,110,0.5)]" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-gold text-[10px] tracking-[0.8em] uppercase font-light"
        >
          Entering the Void
        </motion.p>
      </div>
      
      {/* Background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]" />
    </div>
  );
}
