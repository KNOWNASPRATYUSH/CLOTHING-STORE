'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, useRef } from 'react';
import { View } from '@react-three/drei';
import Brand3D from '@/components/3d/Brand3D';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GoldDivider from '@/components/effects/GoldDivider';
import MarqueeStrip from '@/components/effects/MarqueeStrip';
import ParallaxSection from '@/components/effects/ParallaxSection';

const marqueeItems = [
  'EDITION 001', 'NOIR', 'KINETIC LUXURY', 'WOVEN SHADOWS',
  'THE GOLDEN WEAVER', 'OBSIDIAN THREAD', 'SILK VOID', 'SPATIAL DESIGN',
];

const categories = [
  {
    title: 'Outerwear',
    subtitle: '12 Pieces',
    href: '/shop?category=outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
    accent: 'The Shield',
  },
  {
    title: 'Dresses',
    subtitle: '8 Pieces',
    href: '/shop?category=dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    accent: 'The Form',
  },
  {
    title: 'Accessories',
    subtitle: '6 Pieces',
    href: '/shop?category=accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    accent: 'The Detail',
  },
];

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const textX = useTransform(scrollYProgress, [0, 1], ['-60px', '0px']);
  const imageX = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <>
      {/* ── Brand Story Section ─────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center py-40 px-6 overflow-hidden bg-transparent"
      >
        {/* Background number */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-display font-light"
          style={{
            fontSize: 'clamp(12rem, 30vw, 24rem)',
            color: 'rgba(212,175,106,0.014)',
            letterSpacing: '-0.04em',
          }}
        >
          01
        </div>

        <motion.div
          style={{ opacity }}
          className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center w-full"
        >
          {/* LEFT: 3D Viewport */}
          <motion.div style={{ x: imageX }} className="relative">
            <div
              className="relative h-[500px] md:h-[620px] overflow-hidden"
              style={{
                background: 'rgba(13,13,24,0.5)',
                border: '1px solid rgba(212,175,106,0.12)',
              }}
            >
              <View className="absolute inset-0">
                <Suspense fallback={null}>
                  <Brand3D />
                </Suspense>
              </View>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(5,5,8,0.7) 0%, transparent 50%)',
                }}
              />

              {/* Caption */}
              <div className="absolute bottom-6 left-6">
                <p className="font-body text-[9px] tracking-[0.8em] uppercase" style={{ color: 'rgba(212,175,106,0.5)' }}>
                  Weaving / The / Infinite
                </p>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l" style={{ borderColor: 'rgba(212,175,106,0.3)' }} />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r" style={{ borderColor: 'rgba(212,175,106,0.3)' }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l" style={{ borderColor: 'rgba(212,175,106,0.3)' }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r" style={{ borderColor: 'rgba(212,175,106,0.3)' }} />
            </div>
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div style={{ x: textX }} className="flex flex-col gap-8">
            <ScrollReveal variant="slide-up" delay={0.1}>
              <p
                className="font-body text-[10px] tracking-[0.7em] uppercase flex items-center gap-5"
                style={{ color: 'var(--gold)' }}
              >
                <span className="h-px w-10" style={{ background: 'rgba(212,175,106,0.4)' }} />
                Our Essence
              </p>
            </ScrollReveal>

            {/* Clip-path reveal headline */}
            <div className="overflow-hidden">
              <ScrollReveal variant="clip-reveal" delay={0.2}>
                <h2
                  className="font-display font-light uppercase leading-none"
                  style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
                >
                  Beyond
                </h2>
              </ScrollReveal>
              <ScrollReveal variant="clip-reveal" delay={0.35}>
                <em
                  className="font-display italic font-extralight lowercase block"
                  style={{
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, var(--gold-dim), var(--gold), var(--gold-light))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  the
                </em>
              </ScrollReveal>
              <ScrollReveal variant="clip-reveal" delay={0.5}>
                <h2
                  className="font-display font-light uppercase leading-none"
                  style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
                >
                  Fabric.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fade" delay={0.6}>
              <div
                className="space-y-5 font-body font-extralight leading-relaxed tracking-wide"
                style={{ fontSize: '1.1rem', color: 'var(--stone-light)' }}
              >
                <p>
                  In the heart of the nebula, LUX NOIR was born. We don&apos;t just craft
                  garments; we architect experiences that transcend the physical plane.
                </p>
                <p>
                  Every thread is a line of light, every fold a shadow in the void.
                  Welcome to the future of immersive luxury.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={0.7}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 font-body text-[10px] tracking-[0.6em] uppercase mt-4 transition-colors duration-300"
                style={{ color: 'var(--stone)' }}
              >
                <span className="group-hover:text-gold transition-colors duration-300">Discover Our Story</span>
                <span
                  className="h-px w-8 bg-stone group-hover:w-16 group-hover:bg-gold transition-all duration-500"
                />
              </Link>
            </ScrollReveal>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Marquee Strip ───────────────────────────────────── */}
      <div
        className="relative py-6 overflow-hidden"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(5,5,8,0.5)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          className="font-display italic font-light uppercase"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'rgba(212,175,106,0.12)', letterSpacing: '0.06em' }}
        >
          <MarqueeStrip
            items={marqueeItems}
            speed={40}
          />
        </div>
      </div>

      {/* ── Quote / Mega Text ───────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Huge background text */}
        <ParallaxSection speed={-0.2} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-display italic font-light whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(8rem, 22vw, 20rem)',
              color: 'rgba(212,175,106,0.025)',
              letterSpacing: '-0.04em',
            }}
          >
            Noise
          </span>
        </ParallaxSection>

        <div className="relative max-w-4xl mx-auto text-center">
          <ScrollReveal variant="scale-in" delay={0.1}>
            <blockquote
              className="font-display italic font-light"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', lineHeight: 1.25, color: 'var(--off-white)' }}
            >
              &ldquo;We do not dress the body.&rdquo;
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--gold-dim), var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                &ldquo;We dress the void within.&rdquo;
              </span>
            </blockquote>
            <p className="font-body text-[10px] tracking-[0.6em] uppercase mt-8" style={{ color: 'var(--stone)' }}>
              — Alexandre Noir, Founder
            </p>
          </ScrollReveal>
        </div>
      </section>

      <GoldDivider />

      {/* ── Category Grid ───────────────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <ScrollReveal variant="clip-reveal">
              <h2
                className="font-display font-light uppercase leading-none"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
              >
                Spatial{' '}
                <em
                  className="italic font-extralight lowercase"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold-dim), var(--gold), var(--gold-light))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Inventory
                </em>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  href={cat.href}
                  className="group relative block overflow-hidden aspect-[3/4]"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      style={{ filter: 'grayscale(30%)' }}
                    />
                  </motion.div>

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      background: 'linear-gradient(to top, rgba(5,5,8,0.9) 0%, rgba(5,5,8,0.3) 60%, transparent 100%)',
                    }}
                  />

                  {/* Top label */}
                  <div className="absolute top-6 left-6">
                    <span
                      className="font-body text-[9px] tracking-[0.6em] uppercase"
                      style={{ color: 'rgba(212,175,106,0.6)' }}
                    >
                      {cat.accent}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <p
                      className="font-body text-[9px] tracking-[0.6em] uppercase mb-2"
                      style={{ color: 'var(--gold)' }}
                    >
                      {cat.subtitle}
                    </p>
                    <h3
                      className="font-display font-light uppercase tracking-tight group-hover:text-gold transition-colors duration-700"
                      style={{ fontSize: '2.5rem', color: 'var(--off-white)' }}
                    >
                      {cat.title}
                    </h3>

                    {/* Gold underline reveals on hover */}
                    <div
                      className="mt-3 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
                    />
                  </div>

                  {/* Corner accent */}
                  <div
                    className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, transparent 50%, rgba(212,175,106,0.2) 100%)',
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
