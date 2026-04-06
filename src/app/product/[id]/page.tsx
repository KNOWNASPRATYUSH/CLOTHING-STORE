'use client';

import { useState, useRef, use, lazy, Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ShoppingBag, Heart, Star, ChevronDown, ArrowLeft } from 'lucide-react';
import { View } from '@react-three/drei';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/shop/ProductCard';

const AmbientLightBeams = lazy(() => import('@/components/3d/AmbientLightBeams'));

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const mainImgRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Related products
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleImageChange = (idx: number) => {
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
    <div className="min-h-screen pt-24 pb-20 bg-off-white text-charcoal relative">
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-50">
        <View className="w-full h-full">
          <Suspense fallback={null}>
            <AmbientLightBeams />
          </Suspense>
        </View>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        {/* Breadcrumb */}
        <div className="py-8 flex items-center gap-3 text-xs tracking-widest uppercase text-stone">
          <Link href="/shop" className="hover:text-charcoal transition-colors flex items-center gap-2 group">
            <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" /> Shop
          </Link>
          <span className="opacity-30">/</span>
          <span>{product.category}</span>
          <span className="opacity-30">/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start pb-24 w-full">
          {/* Left: Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-6 sticky top-32 w-full lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 w-full lg:w-24 shrink-0 overflow-x-auto no-scrollbar lg:overflow-visible">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => handleImageChange(i)}
                  className={`relative aspect-[3/4] lg:aspect-square min-w-[5rem] lg:min-w-0 overflow-hidden border transition-all duration-300 ${
                    activeImage === i ? 'border-charcoal opacity-100' : 'border-subtle opacity-50 hover:opacity-100 hover:border-stone'
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Stage */}
            <div className="flex-1 relative overflow-hidden bg-stone-light aspect-[3/4] w-full">
              <AnimatePresence mode="wait">
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
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col pt-0 lg:pt-4 w-full lg:flex-1"
          >
            <p className="text-stone text-[10px] tracking-widest uppercase mb-4">
              {product.category}
            </p>

            <h1 className="font-display text-4xl md:text-6xl text-charcoal leading-tight mb-6">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-subtle">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={i < Math.round(product.rating) ? 'text-charcoal fill-charcoal' : 'text-stone-light'}
                  />
                ))}
              </div>
              <span className="text-stone text-[10px] tracking-widest uppercase">
                {product.rating} / {product.reviews} Reviews
              </span>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-baseline gap-4">
                <span className="font-body text-3xl font-light">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-stone line-through text-lg">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <p className="text-stone font-light leading-relaxed mb-10 text-base">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs tracking-widest uppercase text-stone">Select Size</h3>
                <Link href="/size-guide" className="text-[10px] tracking-widest uppercase text-charcoal hover:underline">
                  Size Guide
                </Link>
              </div>
              
              <AnimatePresence>
                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-red-500 mb-3 tracking-widest uppercase"
                  >
                    Please select a size
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[4rem] h-12 px-4 text-xs uppercase tracking-widest border transition-colors ${
                      selectedSize === size
                        ? 'border-charcoal bg-charcoal text-paper-white'
                        : 'border-subtle text-charcoal hover:border-charcoal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 text-xs tracking-widest uppercase transition-colors ${
                  added ? 'bg-stone text-paper-white border border-stone' : 'bg-charcoal text-paper-white hover:bg-paper-white hover:text-charcoal border border-charcoal'
                }`}
              >
                <ShoppingBag size={14} />
                <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 flex items-center justify-center border transition-colors ${
                  isWishlisted(product.id)
                    ? 'border-charcoal text-charcoal bg-stone-light'
                    : 'border-subtle text-stone hover:border-charcoal hover:text-charcoal'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Details Accordion */}
            <div className="border-t border-subtle">
              <button
                className="w-full flex items-center justify-between py-6 text-xs tracking-widest uppercase text-charcoal hover:text-stone transition-colors"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                Details & Care
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${detailsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {detailsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-6 space-y-3">
                      {product.details.map((detail, i) => (
                        <li key={i} className="text-stone text-sm flex items-start gap-3">
                          <span className="text-charcoal mt-1 text-[8px]">■</span>
                          <span className="tracking-wide leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pt-24 border-t border-subtle">
            <h2 className="font-display text-4xl text-charcoal mb-12">
              You May Also Like
            </h2>
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
