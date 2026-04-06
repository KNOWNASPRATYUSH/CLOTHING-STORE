'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col justify-end bg-off-white text-charcoal pb-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background large editorial image */}
      <motion.div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] h-[75vh] z-0 overflow-hidden"
        style={{ y: imageY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=80"
          alt="AURA Minimalist Collection"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 70vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Massive Typography overlaid */}
      <motion.div 
        className="relative z-10 w-full flex flex-col items-center text-center mt-auto"
        style={{ y: titleY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-body text-xs tracking-ultra uppercase text-stone mb-6"
        >
          Collection 002 / The AURA Cut
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="font-display font-normal uppercase leading-[0.85] text-charcoal"
          style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
        >
          Silent <br /> <span className="italic">Form</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex gap-6"
        >
          <Link href="/shop" className="btn-primary">
            Explore Collection
          </Link>
          <Link href="/about" className="btn-outline">
            Our Philosophy
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
