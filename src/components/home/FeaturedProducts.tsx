'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { products } from '@/data/products';
import GoldDivider from '@/components/effects/GoldDivider';
import ScrollReveal from '@/components/effects/ScrollReveal';

const featured = products.slice(0, 6);

/* ── Tilt Card ──────────────────────────────────────────────── */
function TiltCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * 12,
      y: ((e.clientX - cx) / rect.width) * -12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, delay: (index % 3) * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? '20px' : '0px'})`,
          transition: tilt.x === 0 && tilt.y === 0
            ? 'transform 0.8s cubic-bezier(0.23,1,0.32,1)'
            : 'transform 0.1s linear',
          transformStyle: 'preserve-3d',
        }}
      >
        <Link
          href={`/product/${product.id}`}
          className="group block relative overflow-hidden"
          style={{
            background: 'rgba(13,13,24,0.5)',
            border: isHovered ? '1px solid rgba(212,175,106,0.25)' : '1px solid rgba(255,255,255,0.04)',
            boxShadow: isHovered
              ? '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,106,0.1)'
              : '0 10px 30px rgba(0,0,0,0.3)',
            transition: 'border-color 0.5s, box-shadow 0.5s',
          }}
        >
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <Image
                src={product.images?.[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                style={{
                  filter: isHovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(20%)',
                  transition: 'filter 0.8s ease',
                }}
              />
            </motion.div>

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(to top, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.1) 50%, transparent 100%)',
                opacity: isHovered ? 1 : 0.6,
              }}
            />

            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(212,175,106,0.12) 50%, transparent 70%)',
              }}
              animate={{ x: isHovered ? ['−100%', '200%'] : '-100%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Category pill */}
            <div
              className="absolute top-4 left-4 font-body text-[9px] tracking-[0.5em] uppercase px-3 py-1.5"
              style={{
                background: 'rgba(5,5,8,0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,106,0.2)',
                color: 'var(--gold)',
              }}
            >
              {product.category}
            </div>
          </div>

          {/* Info panel */}
          <div
            className="p-6"
            style={{
              background: 'rgba(13,13,24,0.8)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <p
              className="font-display font-light text-xl mb-1"
              style={{ color: 'var(--off-white)' }}
            >
              {product.name}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span
                className="font-body text-sm tracking-widest"
                style={{ color: 'var(--gold)' }}
              >
                £{product.price.toFixed(0)}
              </span>
              <motion.span
                animate={{ x: isHovered ? 0 : -4, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="font-body text-[9px] tracking-[0.5em] uppercase"
                style={{ color: 'var(--stone)' }}
              >
                View →
              </motion.span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-transparent">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <ScrollReveal variant="fade" delay={0.1}>
          <p
            className="font-body text-[10px] tracking-[0.8em] uppercase mb-6 flex items-center gap-6"
            style={{ color: 'var(--gold)' }}
          >
            <span className="h-px w-10" style={{ background: 'rgba(212,175,106,0.4)' }} />
            Manifesto / 001
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <ScrollReveal variant="clip-reveal" delay={0.2}>
            <h2
              className="font-display font-light uppercase leading-none"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              Curated&nbsp;
              <em
                className="italic font-extralight lowercase"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-dim), var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                for
              </em>
              <br />
              Immortality
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delay={0.4}>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-4 font-body text-[10px] tracking-[0.6em] uppercase transition-colors duration-500"
              style={{ color: 'var(--stone)' }}
            >
              <span className="group-hover:text-gold transition-colors duration-300">Enter Inventory</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gold"
              >
                →
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <GoldDivider />

      {/* Product grid — 3 cols, 2 rows */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product, i) => (
            <TiltCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <ScrollReveal variant="fade" delay={0.3} className="text-center mt-20">
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-6 overflow-hidden border px-16 py-5 font-body text-[10px] tracking-[0.6em] uppercase transition-all duration-700"
            style={{
              borderColor: 'rgba(212,175,106,0.3)',
              color: 'var(--gold)',
            }}
          >
            <span className="relative z-10">View Full Collection</span>
            <span
              className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
              style={{ background: 'var(--gold)', transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              ({products.length} pieces)
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
