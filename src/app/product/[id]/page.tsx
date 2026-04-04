'use client';

import { useState, useEffect, useRef, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ShoppingBag, Heart, Star, ChevronDown, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/shop/ProductCard';

import ProductScene from '@/components/3d/ProductScene';
import { Canvas } from '@react-three/fiber';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [is3DView, setIs3DView] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const mainImgRef = useRef<HTMLImageElement>(null);

  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Related products (same category, exclude current)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleImageChange = (idx: number) => {
    setIs3DView(false);
    if (idx === activeImage) return;
    // GSAP crossfade
    gsap.to(mainImgRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.2,
      onComplete: () => {
        setActiveImage(idx);
        gsap.to(mainImgRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      },
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="py-6 flex items-center gap-3 text-xs tracking-widest uppercase text-stone">
          <Link href="/shop" className="hover:text-gold transition-colors duration-300 flex items-center gap-2">
            <ArrowLeft size={12} /> Collection
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-off-white">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 pb-20">
          {/* Left: Images / 3D */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-3 w-20 shrink-0">
              <button
                onClick={() => setIs3DView(true)}
                className={`aspect-square flex flex-col items-center justify-center border-2 transition-all duration-300 bg-charcoal/50 ${
                  is3DView ? 'border-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <div className="text-[10px] tracking-widest uppercase text-gold mb-1">3D</div>
                <div className="w-6 h-6 border border-gold rounded-full opacity-50" />
              </button>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => handleImageChange(i)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-300 ${
                    !is3DView && activeImage === i ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image / 3D Stage */}
            <div className="flex-1 relative overflow-hidden bg-charcoal aspect-[3/4]">
              <AnimatePresence mode="wait">
                {is3DView ? (
                  <motion.div
                    key="3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <Canvas shadows dpr={[1, 2]}>
                      <ProductScene color="#0a0a0a" distort={0.2} />
                    </Canvas>
                    <div className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase text-gold/60 pointer-events-none">
                      Interactive 3D Preview / Rotate & Explore
                    </div>
                  </motion.div>
                ) : (
                  <motion.img
                    key="static"
                    ref={mainImgRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>
              
              {/* Badge */}
              {product.badge && !is3DView && (
                <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-gold text-black px-2.5 py-1 z-10">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col justify-start pt-4"
          >
            {/* Category */}
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">{product.category}</p>

            {/* Name */}
            <h1 className="font-display text-4xl md:text-5xl text-off-white leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.round(product.rating) ? 'text-gold fill-gold' : 'text-stone'}
                  />
                ))}
              </div>
              <span className="text-stone text-xs">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-white/8">
              <span className="font-display text-3xl text-off-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-stone line-through text-lg">{formatPrice(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <span className="text-xs text-gold tracking-widest uppercase">
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-light leading-relaxed mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs tracking-widest uppercase text-stone">Select Size</h3>
                <Link 
                  href="/size-guide"
                  className="text-xs text-stone hover:text-gold transition-colors duration-300 underline underline-offset-2"
                >
                  Size Guide
                </Link>
              </div>
              <AnimatePresence>
                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-400 mb-2"
                  >
                    Please select a size to continue.
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-10 px-3 text-xs uppercase tracking-widest border transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-black'
                        : 'border-white/20 text-stone hover:border-off-white hover:text-off-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 text-xs tracking-widest uppercase font-body transition-all duration-400 ${
                  added
                    ? 'bg-gold/20 border border-gold text-gold'
                    : 'bg-off-white text-black hover:bg-gold'
                }`}
              >
                <ShoppingBag size={14} />
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </motion.button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 border flex items-center justify-center transition-all duration-300 ${
                  isWishlisted(product.id)
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-white/20 text-stone hover:border-gold hover:text-gold'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-white/8">
              <button
                className="w-full flex items-center justify-between py-5 text-xs tracking-widest uppercase text-stone hover:text-off-white transition-colors duration-300"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                Product Details
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${detailsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {detailsOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    {product.details.map((detail, i) => (
                      <li key={i} className="py-2.5 text-stone text-sm flex items-start gap-3 border-b border-white/5">
                        <span className="text-gold mt-0.5">—</span>
                        {detail}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="border-t border-white/8 py-20 bg-dark">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-4xl text-off-white mb-12">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
