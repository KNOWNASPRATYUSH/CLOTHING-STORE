'use client';

import { ReactNode, useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/effects/SmoothScroll';
import CustomCursor from '@/components/effects/CustomCursor';
import TransitionCurtain from '@/components/layout/TransitionCurtain';
import { AnimatePresence } from 'framer-motion';

import Loader3D from '@/components/layout/Loader3D';
import Scene from '@/components/3d/Scene';

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const eventSource = useRef<HTMLDivElement>(null!);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    // Increased safety timer slightly to ensure everything handles properly
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    return () => clearTimeout(safetyTimer);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader3D key="loader" onComplete={handleComplete} />
        )}
      </AnimatePresence>

      <div 
        ref={eventSource}
        className={`relative min-h-screen flex flex-col bg-black text-off-white selection:bg-gold selection:text-black transition-opacity duration-[2000ms] ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
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
