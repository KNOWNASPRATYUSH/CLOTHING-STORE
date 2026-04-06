'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = ['L', 'U', 'X', ' ', 'N', 'O', 'I', 'R'];

export default function Loader3D({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'glitch' | 'exit'>('loading');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Animated counter 0→100 in ~2.8s
    let c = 0;
    intervalRef.current = setInterval(() => {
      c += Math.floor(Math.random() * 4) + 1;
      if (c >= 100) {
        c = 100;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCount(100);
        // Glitch flash at 100
        setTimeout(() => setPhase('glitch'), 100);
        setTimeout(() => setPhase('exit'), 700);
        setTimeout(() => onComplete(), 1700);
      } else {
        setCount(c);
      }
    }, 28);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line

  return (
    <AnimatePresence>
      {(phase === 'loading' || phase === 'glitch' || phase === 'exit') && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
          style={{ background: 'var(--obsidian)' }}
        >
          {/* Animated 3D perspective grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212,175,106,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,175,106,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              transform: 'perspective(600px) rotateX(55deg) translateY(20%)',
              transformOrigin: 'center top',
              opacity: 0.6,
            }}
          />

          {/* Radial gold ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(212,175,106,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Scan line animation */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.4), transparent)' }}
            animate={{ top: ['-2px', '100%'], opacity: [1, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Brand name — letter by letter stagger reveal */}
            <div className="overflow-hidden flex items-end" style={{ gap: '0.02em' }}>
              {BRAND.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.0,
                    delay: 0.1 + i * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className={`font-display inline-block select-none ${
                    char === ' ' ? 'w-6' : ''
                  } ${i >= 4 ? 'text-gold-gradient' : 'text-off-white'}`}
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 7rem)',
                    letterSpacing: '0.4em',
                    fontWeight: 300,
                    lineHeight: 1,
                    filter: phase === 'glitch' ? 'blur(1px)' : 'none',
                    transform: phase === 'glitch' ? `translateX(${(Math.random() - 0.5) * 6}px)` : undefined,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="font-body text-[10px] tracking-[0.6em] uppercase text-stone"
            >
              Elegance in Shadow
            </motion.p>

            {/* Progress container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Counter */}
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display font-light"
                  style={{
                    fontSize: '3rem',
                    color: phase === 'glitch' ? 'var(--gold-light)' : 'var(--off-white)',
                    textShadow: phase === 'glitch' ? '0 0 20px rgba(212,175,106,0.8), 2px 0 0 rgba(255,0,0,0.3), -2px 0 0 rgba(0,255,255,0.3)' : 'none',
                    transition: 'text-shadow 0.1s',
                  }}
                >
                  {count}
                </span>
                <span className="font-body text-sm text-stone">%</span>
              </div>

              {/* Progress bar */}
              <div className="w-48 h-px bg-white/8 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dim via-gold to-gold-light"
                  style={{ width: `${count}%` }}
                  transition={{ ease: 'linear' }}
                />
                {/* Shimmer on bar */}
                <motion.div
                  className="absolute inset-y-0 w-16"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    left: `${count - 10}%`,
                  }}
                />
              </div>

              {/* Sequence label */}
              <p className="font-body text-[9px] tracking-[0.5em] uppercase text-stone/50">
                {count < 30 ? 'Initializing' : count < 60 ? 'Loading Assets' : count < 90 ? 'Rendering Scene' : 'Complete'}
              </p>
            </motion.div>
          </div>

          {/* City line at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 font-body text-[8px] tracking-[1.2em] uppercase text-stone/25"
          >
            London &nbsp;·&nbsp; Paris &nbsp;·&nbsp; New York
          </motion.div>

          {/* Two exit panels */}
          {phase === 'exit' && (
            <>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'var(--obsidian)', zIndex: 10 }}
              />
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'var(--void)', zIndex: 10 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
