'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/effects/ScrollReveal';

const categories = [
  {
    title: 'The Outerwear',
    href: '/shop?category=outerwear',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80',
  },
  {
    title: 'The Silhouettes',
    href: '/shop?category=dresses',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
  },
  {
    title: 'The Details',
    href: '/shop?category=accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
  },
];

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section ref={sectionRef} className="relative py-32 px-6 bg-paper-white text-charcoal flex flex-col items-center">
        <ScrollReveal variant="fade" delay={0.1}>
          <div className="max-w-3xl text-center mx-auto space-y-8">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight">
              Stripped to its essence
            </h2>
            <p className="font-body opacity-80 max-w-xl mx-auto leading-relaxed">
              We remove the unnecessary to reveal the architecture of modern luxury. 
              Every garment is an exercise in restraint, focusing on precise cuts, 
              uncompromising materials, and enduring form.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-24 px-6 md:px-12 bg-off-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link href={cat.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-light">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <h3 className="font-display text-xl uppercase tracking-wider">{cat.title}</h3>
                  <span className="font-body text-xs tracking-ultra uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Discover
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
