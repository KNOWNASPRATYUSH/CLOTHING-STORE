'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '@/data/products';

const featured = products.slice(0, 6);

export default function FeaturedProducts() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-paper-white text-charcoal">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight">
            Selected Works
          </h2>
        </div>
        <Link href="/shop" className="text-xs uppercase tracking-widest text-stone hover:text-charcoal transition-colors">
          View All Objects →
        </Link>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
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
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-lg text-charcoal">{product.name}</h3>
                  <p className="font-body text-xs text-stone mt-1 capitalize">{product.category}</p>
                </div>
                <span className="font-body text-sm">£{product.price}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
