'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '@/data/products';

const featured = products.slice(0, 6);

export default function FeaturedProducts() {
  return (
    <section className="relative py-24 px-8 md:px-[5%] bg-paper-white text-charcoal">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tight-luxury text-mask">
            Selected Works
          </h2>
        </div>
        <Link href="/shop" className="text-[10px] tracking-[0.4em] uppercase text-stone hover:text-charcoal transition-all duration-500 mb-2">
          View All Objects →
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {featured.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link href={`/product/${product.id}`} className="group block">
              <div className="aspect-[3/4] relative bg-stone-light overflow-hidden mb-4">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover noir-reveal transition-transform duration-[1.5s] ease-silk group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start mt-6">
                <div>
                  <h3 className="font-display text-2xl tracking-tight-luxury text-charcoal">{product.name}</h3>
                  <p className="font-body text-[10px] tracking-luxury text-stone mt-2 uppercase">{product.category}</p>
                </div>
                <span className="font-body text-[11px] tracking-luxury self-start pt-1">£{product.price}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
