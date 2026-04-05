'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { View, Preload } from '@react-three/drei';
import { Suspense } from 'react';
import HeroScene from '@/components/3d/HeroScene';
import { useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      // Unmount 3D view after 120vh of scroll for absolute safety
      if (window.scrollY > window.innerHeight * 1.2) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-end pb-24 overflow-hidden bg-transparent text-off-white hero-section"
    >
      {/* 3D Viewport Area - Only render when visible to avoid blocking below content */}
      {isVisible && (
        <motion.div 
          style={{ opacity, scale, y }}
          className="absolute inset-0 z-0 scene-3d pointer-events-none"
        >
          <View className="w-full h-full">
            <Suspense fallback={null}>
              <HeroScene />
              <Preload all />
            </Suspense>
          </View>
        </motion.div>
      )}

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
              className="group flex items-center gap-4 border border-gold/50 text-gold px-12 py-5 text-sm tracking-[0.4em] uppercase font-body hover:bg-gold hover:text-black transition-all duration-700 backdrop-blur-sm"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
