'use client';

import { ReactNode, useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/effects/SmoothScroll';
import CustomCursor from '@/components/effects/CustomCursor';
import LoadingScreen from '@/components/effects/LoadingScreen';
import TransitionCurtain from '@/components/layout/TransitionCurtain';
import { AnimatePresence } from 'framer-motion';

import Loader3D from '@/components/layout/Loader3D';

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
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
        className={`relative min-h-screen flex flex-col bg-black text-off-white selection:bg-gold selection:text-black transition-opacity duration-1000 ${
          isLoading ? 'opacity-0 pointer-events-none h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
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
