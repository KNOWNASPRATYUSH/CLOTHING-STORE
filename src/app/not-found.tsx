'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <span className="font-display text-xs tracking-[0.6em] uppercase text-gold mb-8 block">Error 404</span>
        <h1 className="font-display text-7xl md:text-9xl text-off-white mb-8 leading-tight">
          Page <br /> <span className="italic font-light">Vanished</span>
        </h1>
        <p className="text-stone-light text-lg mb-12 max-w-md mx-auto">
          The path you seek has been lost to the shadows. It may have moved or no longer exists.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-4 border border-white/20 text-off-white px-10 py-5 text-xs tracking-widest uppercase font-body hover:bg-gold hover:text-black hover:border-gold transition-all duration-500"
        >
          <ArrowLeft size={16} />
          Return to Sanctuary
        </Link>
      </motion.div>
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
      </div>
    </div>
  );
}
