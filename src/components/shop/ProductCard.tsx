'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block relative">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-off-white aspect-[3/4] mb-6">
          {!imgError ? (
            <motion.div
              className="w-full h-full"
              initial={{ filter: 'grayscale(1) contrast(1.1)' }}
              whileInView={{ filter: 'grayscale(0) contrast(1)' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-transform duration-[1.5s] ease-silk ${isHovered ? 'scale-105' : 'scale-100'}`}
                onError={() => setImgError(true)}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone/20 font-display text-4xl tracking-luxury">
              AURA
            </div>
          )}

          {/* Quick Info Overlay (Sleek labels) */}
          <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
            <div className="flex gap-4 pointer-events-auto">
               <button
                 onClick={handleQuickAdd}
                 className="text-[9px] tracking-[0.4em] uppercase text-charcoal bg-paper-white/80 backdrop-blur-md px-6 py-3 border border-subtle hover:bg-charcoal hover:text-paper-white transition-all duration-500"
               >
                 {added ? 'In Cart' : 'Selection +'}
               </button>
               <button
                 onClick={handleWishlist}
                 className="text-[9px] tracking-[0.4em] uppercase text-charcoal bg-paper-white/80 backdrop-blur-md px-4 py-3 border border-subtle hover:bg-charcoal hover:text-paper-white transition-all duration-500"
               >
                 {isWishlisted(product.id) ? 'Saved' : 'Keep'}
               </button>
            </div>
          </div>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-6 left-6 text-[8px] tracking-[0.5em] uppercase text-stone font-medium">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-charcoal text-xl tracking-tight-luxury leading-none">
              {product.name}
            </h3>
            <span className="font-body text-charcoal text-[11px] tracking-luxury">{formatPrice(product.price)}</span>
          </div>
          
          <div className="flex justify-between items-center py-1">
            <p className="text-stone text-[9px] tracking-[0.3em] uppercase">{product.category}</p>
            {product.originalPrice && (
              <span className="text-stone/40 text-[9px] line-through tracking-widest">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Skeleton loader
export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] bg-stone-light opacity-50 block w-full" />
      <div className="space-y-2">
        <div className="h-5 bg-stone-light w-3/4" />
        <div className="h-3 bg-stone-light w-1/4" />
      </div>
    </div>
  );
}
