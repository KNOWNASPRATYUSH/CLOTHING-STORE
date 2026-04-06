'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { View } from '@react-three/drei';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import ScrollReveal from '@/components/effects/ScrollReveal';

const AmbientLightBeams = lazy(() => import('@/components/3d/AmbientLightBeams'));

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
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
            <ShoppingBag className="text-stone-light mx-auto" size={80} strokeWidth={0.5} />
          </div>
          <h1 className="font-display text-5xl text-charcoal mb-4 tracking-tight">The Bag is Empty</h1>
          <p className="text-stone mb-10 max-w-sm mx-auto font-light leading-relaxed">
            Your personal selection is currently void of items. Explore the collection to begin your journey.
          </p>
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-4 bg-charcoal text-paper-white px-12 py-5 text-[10px] tracking-[0.6em] uppercase font-body hover:bg-off-white hover:text-charcoal border border-charcoal transition-all duration-700 overflow-hidden"
          >
            <span className="relative z-10">Return to Inventory</span>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-stone text-[10px] tracking-[0.6em] uppercase mb-4 flex items-center gap-4">
                <span className="inline-block w-8 h-px bg-stone-light" />
                Inventory / {items.length} {items.length === 1 ? 'Piece' : 'Pieces'}
              </p>
              <h1 className="font-display text-6xl md:text-8xl text-charcoal leading-[0.8] tracking-tighter">Your Bag</h1>
            </div>
            <button
              onClick={clearCart}
              className="text-stone text-[10px] tracking-[0.3em] uppercase hover:text-charcoal transition-colors duration-500 flex items-center gap-2 group pb-2"
            >
              <X size={12} className="group-hover:rotate-90 transition-transform duration-500" />
              Purge All
            </button>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-0 border-t border-subtle">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="flex gap-8 py-10 border-b border-subtle group"
                >
                  {/* Image */}
                  <Link 
                    href={`/product/${item.product.id}`} 
                    className="shrink-0 w-32 h-44 md:w-40 md:h-56 overflow-hidden bg-stone-light border border-subtle relative"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-700" />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-start justify-between gap-6">
                        <div className="space-y-1">
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="font-display text-2xl md:text-3xl text-charcoal hover:text-stone transition-colors duration-500 leading-tight">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-stone text-[10px] tracking-[0.3em] uppercase">{item.product.category}</p>
                        </div>
                        <span className="font-display text-2xl text-charcoal shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-6">
                        <span className="text-stone text-[9px] tracking-[0.3em] uppercase">Matrix:</span>
                        <span className="text-charcoal text-[10px] tracking-widest uppercase border border-subtle px-3 py-1 bg-stone-light/50 font-medium">
                          {item.size}
                        </span>
                      </div>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center bg-off-white border border-subtle backdrop-blur-md">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) removeItem(item.product.id, item.size);
                            else updateQuantity(item.product.id, item.size, item.quantity - 1);
                          }}
                          className="w-10 h-10 flex items-center justify-center text-stone hover:text-charcoal transition-colors duration-500"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-10 text-center text-charcoal text-[11px] font-body tracking-widest">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-stone hover:text-charcoal transition-colors duration-500"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="flex items-center gap-2 text-stone hover:text-charcoal transition-colors duration-500 text-[10px] tracking-widest uppercase font-light"
                      >
                        <Trash2 size={12} className="opacity-60" />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:sticky lg:top-32 h-fit border border-subtle p-10 bg-paper-white/50 backdrop-blur-2xl"
          >
            <h2 className="font-display text-3xl text-charcoal mb-10 tracking-tight text-center">Summary</h2>

            <div className="space-y-5 pb-8 border-b border-subtle">
              <div className="flex justify-between items-center text-stone text-[10px] tracking-[0.3em] uppercase">
                <span>Subtotal</span>
                <span className="text-charcoal tracking-normal font-normal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-stone text-[10px] tracking-[0.3em] uppercase">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-stone tracking-normal font-normal italic' : 'text-charcoal tracking-normal font-normal'}>
                  {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone text-[10px] tracking-[0.3em] uppercase">
                <span>Estimated Tax</span>
                <span className="text-charcoal tracking-normal font-normal">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-8">
              <span className="text-stone text-[10px] tracking-[0.5em] uppercase">Total</span>
              <span className="font-display text-4xl text-charcoal">{formatPrice(total)}</span>
            </div>

            <div className="space-y-4">
              <Link
                href="/checkout"
                className="group relative w-full flex items-center justify-center gap-4 bg-charcoal text-paper-white py-5 text-[10px] tracking-[0.6em] uppercase font-body hover:bg-off-white hover:text-charcoal border border-charcoal transition-all duration-700 overflow-hidden"
              >
                <span className="relative z-10 font-medium">Checkout Flow</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop"
                className="w-full flex items-center justify-center py-4 text-stone/40 text-[9px] tracking-[0.5em] uppercase hover:text-charcoal transition-colors duration-500"
              >
                Continue Search
              </Link>
            </div>
            
            {/* Visual detail */}
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4 opacity-30 grayscale">
              <div className="flex gap-4">
                <div className="w-8 h-5 bg-white/10 rounded-sm" />
                <div className="w-8 h-5 bg-white/10 rounded-sm" />
                <div className="w-8 h-5 bg-white/10 rounded-sm" />
              </div>
              <p className="text-[8px] tracking-widest text-stone uppercase">Encrypted Transaction Secured</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

