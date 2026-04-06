'use client';

import { useState, useRef, use, Suspense } from 'react';
import Image from 'next/image';
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
import ScrollReveal from '@/components/effects/ScrollReveal';
import ProductScene from '@/components/3d/ProductScene';
import { View, Preload } from '@react-three/drei';

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
  const mainImgRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Related products (same category, exclude current)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleImageChange = (idx: number) => {
    setIs3DView(false);
    if (idx === activeImage) return;
    
    gsap.to(mainImgRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setActiveImage(idx);
        gsap.to(mainImgRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
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
    <div className="min-h-screen pt-24 pb-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="py-8 flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-stone/60">
          <Link href="/shop" className="hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
            <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-gold/60">{product.category}</span>
          <span className="opacity-30">/</span>
          <span className="text-off-white tracking-widest">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start pb-24">
          {/* Left: Images / 3D */}
          <div className="flex flex-col-reverse md:flex-row gap-6 lg:gap-8 sticky top-32">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 w-full md:w-24 shrink-0 overflow-x-auto no-scrollbar md:overflow-visible">
              <button
                onClick={() => setIs3DView(true)}
                className={`aspect-square min-w-[5rem] md:min-w-0 flex flex-col items-center justify-center border transition-all duration-500 bg-obsidian-light/30 backdrop-blur-md ${
                  is3DView ? 'border-gold shadow-[0_0_15px_rgba(212,175,106,0.15)]' : 'border-white/5 opacity-50 hover:opacity-100 hover:border-white/20'
                }`}
              >
                <div className="text-[9px] tracking-[0.4em] uppercase text-gold mb-2">3D VIEW</div>
                <div className="w-5 h-5 border border-gold/40 rounded-full animate-pulse-slow" />
              </button>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => handleImageChange(i)}
                  className={`relative aspect-square min-w-[5rem] md:min-w-0 overflow-hidden border transition-all duration-700 ${
                    !is3DView && activeImage === i ? 'border-gold shadow-[0_0_15px_rgba(212,175,106,0.15)]' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage */}
            <div className="flex-1 relative overflow-hidden glass border-subtle aspect-[3/4] bg-void/20">
              <AnimatePresence mode="wait">
                {is3DView ? (
                  <motion.div
                    key="3d"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="w-full h-full"
                  >
                    <View className="w-full h-full">
                      <Suspense fallback={null}>
                        <ProductScene color="#D4AF6A" distort={0.1} />
                        <Preload all />
                      </Suspense>
                    </View>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.6em] uppercase text-gold/40 pointer-events-none whitespace-nowrap bg-obsidian/40 backdrop-blur-md px-4 py-2 border border-white/5">
                      Interact to Explore
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="static"
                    ref={mainImgRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={product.images[activeImage]}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover transition-transform duration-2000 ease-silk hover:scale-110"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Badge */}
              {product.badge && !is3DView && (
                <span className="absolute top-6 left-6 text-[9px] tracking-[0.5em] uppercase bg-gold text-obsidian px-3 py-1.5 z-10 font-medium">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col pt-0 md:pt-4"
          >
            {/* Category */}
            <p className="text-gold text-[10px] tracking-[0.6em] uppercase mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-gold/30" />
              {product.category}
            </p>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-7xl text-off-white leading-[0.9] tracking-tight mb-8">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={i < Math.round(product.rating) ? 'text-gold fill-gold shadow-[0_0_8px_rgba(212,175,106,0.3)]' : 'text-stone/30'}
                  />
                ))}
              </div>
              <span className="text-stone/60 text-[10px] tracking-widest uppercase">
                {product.rating} / {product.reviews} Verification Marks
              </span>
            </div>

            {/* Price section */}
            <div className="flex flex-col gap-2 mb-10">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl text-gold-gradient">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-stone/40 line-through text-xl font-light italic">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone/60">
                   Acquisition Advantage: {Math.round((1 - product.price / product.originalPrice) * 100)}% Reduction
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-stone font-light leading-relaxed mb-12 text-lg tracking-wide">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-stone px-1">Dimension Matrix</h3>
                <Link 
                  href="/size-guide"
                  className="text-[9px] tracking-[0.3em] uppercase text-gold hover:text-gold-light transition-colors duration-300"
                >
                  View Guide
                </Link>
              </div>
              
              <AnimatePresence>
                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-red-500 mb-3 tracking-widest uppercase px-1"
                  >
                    ! Required parameter: Select Size
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[4rem] h-12 px-4 text-[10px] uppercase tracking-widest border transition-all duration-500 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-obsidian font-medium'
                        : 'border-white/5 text-stone hover:border-gold/40 hover:text-off-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex-1 flex items-center justify-center gap-4 py-5 text-[10px] tracking-[0.5em] uppercase font-body transition-all duration-700 overflow-hidden ${
                  added
                    ? 'bg-gold/20 border border-gold text-gold shadow-[0_0_20px_rgba(212,175,106,0.1)]'
                    : 'bg-gold text-obsidian hover:bg-off-white border border-gold'
                }`}
              >
                <ShoppingBag size={14} className={added ? 'animate-bounce' : ''} />
                <span className="relative z-10">{added ? 'Secured in Inventory' : 'Add to Collection'}</span>
              </motion.button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full sm:w-20 h-16 border flex items-center justify-center transition-all duration-700 ${
                  isWishlisted(product.id)
                    ? 'border-gold text-gold bg-gold/10 shadow-[0_0_15px_rgba(212,175,106,0.1)]'
                    : 'border-white/10 text-stone hover:border-gold hover:text-gold'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} className="transition-transform duration-500 active:scale-125" />
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-white/5">
              <button
                className="w-full flex items-center justify-between py-6 text-[10px] tracking-[0.4em] uppercase text-stone/80 hover:text-off-white transition-colors duration-500"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                Technical Specifications
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-500 ${detailsOpen ? 'rotate-180 text-gold' : ''}`}
                />
              </button>
              <AnimatePresence>
                {detailsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-8 space-y-4 px-1">
                      {product.details.map((detail, i) => (
                        <li key={i} className="text-stone/60 text-sm flex items-start gap-4">
                          <span className="text-gold mt-1 text-xs px-1">◌</span>
                          <span className="font-light tracking-wide">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="pt-32 border-t border-white/5 mt-20">
            <ScrollReveal variant="clip-reveal">
              <h2 className="font-display text-5xl md:text-7xl text-off-white mb-16 leading-tight">
                Related <em className="italic font-extralight text-gold-gradient normal-case opacity-80 font-serif">Simulacra</em>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
