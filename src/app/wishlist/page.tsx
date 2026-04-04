'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  // Get full product objects for the wishlist IDs
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-white/10 flex items-center justify-center text-stone/40">
            <Heart size={32} strokeWidth={1} />
          </div>
          <h1 className="font-display text-4xl text-off-white mb-3">Your Wishlist is Empty</h1>
          <p className="text-stone mb-10 max-w-xs mx-auto">
            Save your favorite pieces here to find them easily later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-off-white text-black px-10 py-4 text-xs tracking-widest uppercase font-body hover:bg-gold transition-colors duration-300"
          >
            Explore Collection
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="py-12 border-b border-white/8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-gold" />
              Saved Items
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-off-white">Your Wishlist</h1>
          </motion.div>
          
          <button
            onClick={clearWishlist}
            className="text-stone text-[10px] tracking-widest uppercase hover:text-red-400 transition-colors duration-300 flex items-center gap-2 border border-white/10 px-4 py-2 hover:border-red-400/30"
          >
            <Trash2 size={12} /> Clear Entire Wishlist
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative group"
              >
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md text-red-400 flex items-center justify-center hover:bg-red-400 hover:text-black transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function X({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
