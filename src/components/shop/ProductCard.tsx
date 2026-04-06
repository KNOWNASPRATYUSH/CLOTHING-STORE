'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-stone-light aspect-[3/4] mb-4">
          {!imgError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-1000 ease-silk ${isHovered ? 'scale-105' : 'scale-100'}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone font-display text-lg">
              AURA
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-charcoal text-paper-white px-3 py-1 font-body">
              {product.badge}
            </span>
          )}

          {/* Hover Overlay Actions */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <button
              onClick={handleQuickAdd}
              className={`flex-1 py-3 text-[10px] tracking-widest uppercase font-body flex items-center justify-center gap-2 transition-colors ${
                added
                  ? 'bg-stone text-paper-white'
                  : 'bg-paper-white text-charcoal hover:bg-charcoal hover:text-paper-white'
              }`}
            >
              <ShoppingBag size={14} />
              {added ? 'Added' : 'Quick Add'}
            </button>

            <button
              onClick={handleWishlist}
              className={`w-12 h-12 flex items-center justify-center bg-paper-white hover:bg-charcoal hover:text-paper-white transition-colors ${
                isWishlisted(product.id) ? 'text-charcoal' : 'text-stone'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-charcoal text-lg">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-body text-charcoal text-sm">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="block text-stone text-[10px] line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>

          <p className="text-stone text-xs">{product.category}</p>
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
