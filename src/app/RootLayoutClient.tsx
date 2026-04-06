'use client';

import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/effects/SmoothScroll';
import CustomCursor from '@/components/effects/CustomCursor';
import TransitionCurtain from '@/components/layout/TransitionCurtain';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Loader3D from '@/components/layout/Loader3D';

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
    const safetyTimer = setTimeout(() => setIsLoading(false), 2000);
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
        className={`relative min-h-screen flex flex-col transition-opacity duration-1000 ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ background: 'var(--off-white)' }}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{
            scaleX,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--charcoal)',
            transformOrigin: '0%',
            zIndex: 9995,
          }}
        />

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
