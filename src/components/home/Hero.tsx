'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { View } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import HeroScene from '@/components/3d/HeroScene';
import MagneticElement from '@/components/effects/MagneticElement';

const STATS = [
  { value: 8, label: 'Years of Craft' },
  { value: 200, label: 'Unique Pieces' },
  { value: 40, label: 'Countries' },
];

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  // Parallax depths for different text layers
  const headY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const headY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const headY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [0.5, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);

  // 3D tilt on mouse move
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientY - cy) / rect.height) * 8;
    const y = ((e.clientX - cx) / rect.width) * -8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[160vh] flex items-center justify-center bg-transparent text-off-white overflow-hidden"
    >
      {/* 3D Canvas */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: sceneOpacity, scale: sceneScale }}
      >
        <View className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </View>
      </motion.div>

      {/* Scroll darkening gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5,5,8,0) 0%, rgba(5,5,8,0.8) 100%)',
          opacity: overlayOpacity,
        }}
      />

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,106,0.06) 0%, transparent 70%)',
            left: '-10%',
            top: '10%',
            y: headY1,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(200,200,212,0.04) 0%, transparent 70%)',
            right: '-5%',
            bottom: '15%',
            y: headY3,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-40 pb-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ y: subtitleY }}
          className="flex items-center gap-6 mb-14 justify-center"
        >
          <span className="h-px w-16 bg-gold/40" />
          <span className="font-body text-[10px] tracking-[0.7em] uppercase text-gold/70">
            Collection 001 &nbsp;/&nbsp; Noir
          </span>
          <span className="h-px w-16 bg-gold/40" />
        </motion.div>

        {/* Giant headline — 3 parallax depth layers */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="text-center cursor-default"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 ? 'transform 0.8s cubic-bezier(0.23,1,0.32,1)' : 'transform 0.1s linear',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Layer 1 — front */}
            <motion.div style={{ y: headY1 }}>
              <h1
                className="font-display font-light uppercase no-select leading-none"
                style={{ fontSize: 'clamp(4rem, 16vw, 14rem)', letterSpacing: '-0.02em' }}
              >
                <span className="block text-off-white" style={{ translate: 'none' }}>
                  Enter
                </span>
              </h1>
            </motion.div>

            {/* Layer 2 — mid depth */}
            <motion.div style={{ y: headY2 }}>
              <h1
                className="font-display font-light uppercase no-select leading-none"
                style={{ fontSize: 'clamp(4rem, 16vw, 14rem)', letterSpacing: '-0.02em' }}
              >
                <span
                  className="block italic font-extralight lowercase"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 40%, var(--gold-light) 70%, var(--gold) 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gold-shimmer 5s linear infinite',
                  }}
                >
                  the
                </span>
              </h1>
            </motion.div>

            {/* Layer 3 — back depth, slowest parallax */}
            <motion.div style={{ y: headY3 }}>
              <h1
                className="font-display font-light uppercase no-select leading-none"
                style={{ fontSize: 'clamp(4rem, 16vw, 14rem)', letterSpacing: '-0.02em' }}
              >
                <span className="block text-off-white/90">
                  Void
                </span>
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          style={{ y: subtitleY }}
          className="font-body text-center text-stone-light text-lg md:text-2xl font-extralight tracking-[0.4em] uppercase mt-10 mb-16 mx-auto max-w-xl"
        >
          A cosmic journey woven&nbsp;in silk.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex justify-center mt-2"
        >
          <MagneticElement strength={0.4} radius={100}>
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-8 overflow-hidden border border-gold/30 px-16 py-6 font-body text-[10px] tracking-[0.7em] uppercase text-gold hover:text-black transition-colors duration-700"
            >
              <span className="relative z-10">Inhale&nbsp;Luxury</span>
              {/* Fill animation */}
              <span
                className="absolute inset-0 bg-gold origin-left"
                style={{
                  transform: 'scaleX(0)',
                  transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scaleX(1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scaleX(0)';
                }}
              />
              {/* Gold glow */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ boxShadow: 'inset 0 0 30px rgba(212,175,106,0.3)' }}
              />
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-28 grid grid-cols-3 gap-0 border border-gold/10 divide-x divide-gold/10"
          style={{ background: 'rgba(13,13,24,0.4)', backdropFilter: 'blur(30px)' }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="py-8 text-center">
              <p
                className="font-display font-light leading-none mb-2"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--gold)' }}
              >
                <CountUp target={stat.value} suffix="+" />
              </p>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-stone">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <span className="font-body text-[8px] tracking-[0.5em] uppercase text-stone/50">Scroll</span>
        <motion.div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(212,175,106,0.6), transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
