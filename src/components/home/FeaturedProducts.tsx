'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '@/components/shop/ProductCard';
import { products } from '@/data/products';

// Feature the first 4 products
const featured = products.slice(0, 4);

export default function FeaturedProducts() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-gold" />
              Curated Pieces
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-off-white">
              Featured
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase text-stone hover:text-gold transition-colors duration-300 border-b border-stone/30 hover:border-gold pb-1"
          >
            View All →
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
