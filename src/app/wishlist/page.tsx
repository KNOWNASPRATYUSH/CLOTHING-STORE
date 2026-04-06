'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Trash2, X } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { View } from '@react-three/drei';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import ScrollReveal from '@/components/effects/ScrollReveal';

const AmbientLightBeams = lazy(() => import('@/components/3d/AmbientLightBeams'));

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { addItem } = useCart();

  // Get full product objects for the wishlist IDs
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-8 px-6 bg-off-white text-charcoal">
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-50">
          <View className="w-full h-full">
            <Suspense fallback={null}>
              <AmbientLightBeams />
            </Suspense>
          </View>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center relative z-10"
        >
          <div className="relative inline-block mb-8">
            <Heart className="text-stone-light mx-auto" size={80} strokeWidth={0.5} />
          </div>
          <h1 className="font-display text-5xl text-charcoal mb-4 tracking-tight">The Vault is Empty</h1>
          <p className="text-stone mb-12 max-w-sm mx-auto font-light leading-relaxed tracking-wide">
            You haven&apos;t reserved any pieces in your personal vault yet. Discover the collection to find your next statement.
          </p>
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-4 bg-charcoal text-paper-white px-12 py-5 text-[10px] tracking-[0.6em] uppercase font-body hover:bg-off-white hover:text-charcoal border border-charcoal transition-all duration-700 overflow-hidden"
          >
            <span className="relative z-10">Explore Collection</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-off-white text-charcoal relative">
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-50">
        <View className="w-full h-full">
          <Suspense fallback={null}>
            <AmbientLightBeams />
          </Suspense>
        </View>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal variant="clip-reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-stone text-[10px] tracking-[0.6em] uppercase mb-4 flex items-center gap-4">
                <span className="inline-block w-8 h-px bg-stone-light" />
                The Vault / {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Piece' : 'Pieces'}
              </p>
              <h1 className="font-display text-6xl md:text-8xl text-charcoal leading-[0.8] tracking-tighter">Your Wishlist</h1>
            </div>
            
            <button
              onClick={clearWishlist}
              className="group flex items-center gap-3 text-stone text-[10px] tracking-[0.3em] uppercase hover:text-charcoal transition-all duration-500 py-2 px-6 border border-subtle hover:border-charcoal bg-paper-white/50 backdrop-blur-md"
            >
              <Trash2 size={12} className="group-hover:rotate-12 transition-transform" /> 
              Purge Vault
            </button>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="relative group"
              >
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-10 h-10 rounded-sm bg-paper-white/80 backdrop-blur-md text-charcoal border border-subtle flex items-center justify-center hover:bg-charcoal hover:text-paper-white transition-all duration-500 shadow-sm"
                    title="Remove from wishlist"
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

