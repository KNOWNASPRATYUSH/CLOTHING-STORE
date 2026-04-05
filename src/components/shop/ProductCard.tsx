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
import { Suspense, lazy } from 'react';

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
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      className="product-card group perspective-[1000px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-charcoal aspect-[3/4]">
          {!imgError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`product-card-img object-cover transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-100'}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone/30 font-display text-lg">
              LUX NOIR
            </div>
          )}

          {/* 3D View Overlay */}
          {isHovered && (
            <div className="absolute inset-0 z-10">
              <View className="w-full h-full">
                <Suspense fallback={null}>
                  <ProductScene distort={0.2} />
                </Suspense>
              </View>
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-gold text-black px-2.5 py-1 font-body">
              {product.badge}
            </span>
          )}

          {/* Hover Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-smooth">
            <motion.button
              onClick={handleQuickAdd}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 text-xs tracking-widest uppercase font-body flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? 'bg-gold/20 border border-gold text-gold'
                  : 'bg-black/80 backdrop-blur-sm text-off-white border border-white/10 hover:bg-gold hover:text-black hover:border-gold'
              }`}
            >
              <ShoppingBag size={12} />
              {added ? 'Added!' : 'Quick Add'}
            </motion.button>

            <motion.button
              onClick={handleWishlist}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 flex items-center justify-center border backdrop-blur-sm transition-all duration-300 ${
                isWishlisted(product.id)
                  ? 'bg-gold/20 border-gold text-gold'
                  : 'bg-black/80 border-white/10 text-off-white hover:border-gold hover:text-gold'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={14} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-4 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-off-white text-lg leading-snug group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-off-white font-body text-sm">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="block text-stone text-xs line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>

          <p className="text-stone text-xs tracking-widest uppercase">{product.category}</p>

          {/* Sizes preview */}
          <div className="flex gap-1.5 pt-1">
            {product.sizes.slice(0, 4).map((size) => (
              <span key={size} className="text-[9px] text-stone border border-white/10 px-1.5 py-0.5 uppercase tracking-wider">
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Skeleton loader
export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-[3/4] skeleton" />
      <div className="pt-4 space-y-2">
        <div className="h-5 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-1/3" />
      </div>
    </div>
  );
}
