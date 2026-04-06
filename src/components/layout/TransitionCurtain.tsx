'use client';

import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { View } from '@react-three/drei';

const FluidBrand = lazy(() => import('@/components/3d/FluidBrand'));

export default function TransitionCurtain() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsTransitioning(true);
      prevPathname.current = pathname;
      const timer = setTimeout(() => setIsTransitioning(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="curtain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[9999] bg-paper-white flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
          <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-50 flex items-center justify-center">
            <View className="w-full h-full">
              <Suspense fallback={null}>
                <FluidBrand />
              </Suspense>
            </View>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="relative z-10"
          >
            <span className="font-display text-4xl text-charcoal tracking-widest uppercase">
              AURA
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
