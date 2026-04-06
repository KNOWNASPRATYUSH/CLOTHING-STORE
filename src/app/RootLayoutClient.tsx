'use client';

import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/effects/SmoothScroll';
import CustomCursor from '@/components/effects/CustomCursor';
import TransitionCurtain from '@/components/layout/TransitionCurtain';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Loader3D from '@/components/layout/Loader3D';
import Scene from '@/components/3d/Scene';

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const eventSource = useRef<HTMLDivElement>(null!);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const safetyTimer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(safetyTimer);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader3D key="loader" onComplete={handleComplete} />}
      </AnimatePresence>

      <div
        ref={eventSource}
        className={`relative min-h-screen flex flex-col transition-opacity duration-[2000ms] ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ background: 'var(--obsidian)' }}
      >
        {/* Scroll progress bar — ultra-thin gold line at top */}
        <motion.div
          style={{
            scaleX,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light))',
            transformOrigin: '0%',
            zIndex: 9995,
            boxShadow: '0 0 8px rgba(212,175,106,0.5)',
          }}
        />

        {/* Film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Vignette overlay */}
        <div className="vignette-overlay" aria-hidden="true" />

        {/* 3D Scene canvas (fixed background) */}
        <Scene eventSource={eventSource} />

        <SmoothScroll>
          <TransitionCurtain />
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}
