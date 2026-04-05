'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { View, Preload } from '@react-three/drei';
import Brand3D from '@/components/3d/Brand3D';

const marqueeText = 'OUTERWEAR · DRESSES · BASICS · ACCESSORIES · NEW ARRIVALS · BESTSELLERS · ';

const categories = [
  {
    title: 'Outerwear',
    subtitle: '12 Pieces',
    href: '/shop?category=outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
  },
  {
    title: 'Dresses',
    subtitle: '8 Pieces',
    href: '/shop?category=dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
  },
  {
    title: 'Accessories',
    subtitle: '6 Pieces',
    href: '/shop?category=accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  },
];

export default function BrandStory() {
  return (
    <>
      {/* Brand Story */}
      <section className="py-32 bg-charcoal text-off-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* Interactive 3D Sculpture */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative h-[600px] bg-black/50 border border-white/5 rounded-sm overflow-hidden scene-3d"
          >
            <View className="absolute inset-0 z-0">
              <Suspense fallback={null}>
                <Brand3D />
                <Preload all />
              </Suspense>
            </View>
            <div className="absolute bottom-6 left-6 text-[10px] tracking-widest uppercase text-gold/40 pointer-events-none">
              Resilience / Form / Void
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-gold text-xs tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
              <span className="inline-block w-8 h-px bg-gold" />
              Our Philosophy
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-off-white leading-[1.1] mb-10">
              Made for those who <br /> need no validation.
            </h2>
            <p className="text-stone-light text-lg leading-relaxed mb-8">
              LUX NOIR was founded on a singular belief: true luxury is felt, not displayed. We create pieces that speak in whispers — precise tailoring, ethical materials, and an obsessive attention to the details that most will never notice.
            </p>
            <p className="text-stone leading-relaxed mb-12">
              Every piece in our collection is designed to transcend seasons, trends, and expectations. We make less. We make better.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-off-white border-b border-gold pb-2 hover:text-gold transition-colors duration-500"
            >
              Explore the Collection →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-8 border-y border-white/5 overflow-hidden bg-black">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          <span className="font-display text-3xl px-8 tracking-widest italic uppercase text-white/10">
            {marqueeText} {marqueeText} {marqueeText}
          </span>
        </motion.div>
      </div>

      {/* Category Grid */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl text-off-white mb-20"
          >
            Shop by Category
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <Link href={cat.href} className="group relative block overflow-hidden aspect-[3/4]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-3">{cat.subtitle}</p>
                    <h3 className="font-display text-4xl text-off-white group-hover:text-gold transition-colors duration-500">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
