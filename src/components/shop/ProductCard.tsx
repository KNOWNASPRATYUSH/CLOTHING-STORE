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
import { View } from '@react-three/drei';
import { Suspense, lazy, useRef } from 'react';

const ProductScene = lazy(() => import('@/components/3d/ProductScene'));

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.1, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      className="group relative perspective-card"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden glass aspect-[3/4] border-subtle group-hover:border-gold/30 transition-colors duration-700">
          {!imgError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-all duration-1000 ease-silk ${isHovered ? 'scale-110 opacity-30 grayscale-[50%]' : 'scale-100 opacity-90 grayscale-0'}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone/30 font-display text-lg">
              LUX NOIR
            </div>
          )}

          {/* 3D View Overlay */}
          {isHovered && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <View className="w-full h-full">
                <Suspense fallback={null}>
                  <ProductScene color="#D4AF6A" distort={0.15} />
                </Suspense>
              </View>
            </div>
          )}

          {/* Overlay Gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent pointer-events-none transition-opacity duration-700"
            style={{ opacity: isHovered ? 1 : 0.6 }}
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 text-[9px] tracking-[0.3em] uppercase bg-gold text-obsidian px-2.5 py-1 font-body font-medium">
              {product.badge}
            </span>
          )}

          {/* Hover Actions */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-silk z-20">
            <motion.button
              onClick={handleQuickAdd}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3.5 text-[9px] tracking-[0.4em] uppercase font-body flex items-center justify-center gap-2 transition-all duration-500 ${
                added
                  ? 'bg-gold/20 border border-gold text-gold'
                  : 'bg-obsidian/80 backdrop-blur-md text-off-white border border-white/10 hover:bg-gold hover:text-obsidian hover:border-gold'
              }`}
            >
              <ShoppingBag size={12} />
              {added ? 'Added' : 'Quick Add'}
            </motion.button>

            <motion.button
              onClick={handleWishlist}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 flex items-center justify-center border backdrop-blur-md transition-all duration-500 ${
                isWishlisted(product.id)
                  ? 'bg-gold/20 border-gold text-gold'
                  : 'bg-obsidian/80 border-white/10 text-off-white hover:border-gold hover:text-gold'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={14} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-5 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-off-white text-xl leading-tight group-hover:text-gold transition-colors duration-500">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-gold font-body text-sm tracking-widest">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="block text-stone text-[10px] line-through opacity-50">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-stone text-[10px] tracking-[0.3em] uppercase">{product.category}</p>
            {/* Sizes preview */}
            <div className="flex gap-1.5">
              {product.sizes.slice(0, 3).map((size) => (
                <span key={size} className="text-[8px] text-stone/60 border border-white/5 px-1.5 py-0.5 uppercase tracking-wider">
                  {size}
                </span>
              ))}
            </div>
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
      <div className="aspect-[3/4] skeleton rounded-sm border border-white/5" />
      <div className="space-y-2 px-1">
        <div className="h-6 skeleton rounded-sm w-3/4 opacity-50" />
        <div className="h-3 skeleton rounded-sm w-1/4 opacity-30" />
      </div>
    </div>
  );
}
