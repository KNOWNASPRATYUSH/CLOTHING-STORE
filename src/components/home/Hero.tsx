'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import HeroScene from '@/components/3d/HeroScene';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end pb-24 overflow-hidden bg-black text-off-white">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs tracking-[0.6em] uppercase font-body">NewCollection — 2026</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-7xl md:text-9xl text-off-white leading-[0.9] mb-8"
          >
            Wear <span className="text-gold italic font-light">the</span> Void
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-stone-light text-lg md:text-xl font-body leading-relaxed mb-12 max-w-lg"
          >
            Where darkness meets elegance. A collection born from restraint and refined into perfection.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <Link
              href="/shop"
              className="group flex items-center gap-4 bg-off-white text-black px-10 py-5 text-sm tracking-[0.3em] uppercase font-body hover:bg-gold transition-all duration-500"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
