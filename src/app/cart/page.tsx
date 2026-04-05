'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="text-stone mx-auto mb-6" size={48} strokeWidth={1} />
          <h1 className="font-display text-4xl text-off-white mb-3">Your bag is empty</h1>
          <p className="text-stone mb-8">Looks like you haven't added anything yet.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-off-white text-black px-8 py-4 text-xs tracking-widest uppercase font-body hover:bg-gold transition-colors duration-300"
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-gold" />
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </p>
            <h1 className="font-display text-5xl text-off-white">Your Bag</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-stone text-xs tracking-widest uppercase hover:text-red-400 transition-colors duration-300"
          >
            Clear All
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-0 border-t border-white/8">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-6 py-8 border-b border-white/8"
                >
                  {/* Image */}
                  <Link href={`/product/${item.product.id}`} className="shrink-0 w-24 h-32 md:w-32 md:h-44 overflow-hidden bg-charcoal">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="128px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="font-display text-xl text-off-white hover:text-gold transition-colors duration-300">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-stone text-xs tracking-widest uppercase mt-1">{item.product.category}</p>
                        </div>
                        <span className="font-display text-xl text-off-white shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <p className="text-stone text-xs mt-3">
                        Size: <span className="text-off-white uppercase">{item.size}</span>
                      </p>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-white/15">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) removeItem(item.product.id, item.size);
                            else updateQuantity(item.product.id, item.size, item.quantity - 1);
                          }}
                          className="w-9 h-9 flex items-center justify-center text-stone hover:text-off-white transition-colors duration-300"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center text-off-white text-sm font-body">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-stone hover:text-off-white transition-colors duration-300"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="flex items-center gap-1.5 text-stone hover:text-red-400 transition-colors duration-300 text-xs"
                      >
                        <Trash2 size={12} />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-28 h-fit border border-white/8 p-8 bg-charcoal"
          >
            <h2 className="font-display text-2xl text-off-white mb-8">Order Summary</h2>

            <div className="space-y-4 pb-6 border-b border-white/8">
              <div className="flex justify-between text-stone text-sm">
                <span>Subtotal</span>
                <span className="text-off-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone text-sm">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-gold' : 'text-off-white'}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-stone text-sm">
                <span>Tax (8%)</span>
                <span className="text-off-white">{formatPrice(tax)}</span>
              </div>
            </div>

            {subtotal < 200 && subtotal > 0 && (
              <p className="text-gold text-xs mt-4 text-center">
                Add {formatPrice(200 - subtotal)} more for free shipping
              </p>
            )}

            <div className="flex justify-between items-center py-6">
              <span className="font-display text-xl text-off-white">Total</span>
              <span className="font-display text-2xl text-off-white">{formatPrice(total)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-3 bg-off-white text-black py-4 text-xs tracking-widest uppercase font-body hover:bg-gold transition-colors duration-300"
            >
              Proceed to Checkout
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/shop"
              className="w-full flex items-center justify-center mt-4 text-stone text-xs tracking-widest uppercase hover:text-off-white transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
