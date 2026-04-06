'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart on successful checkout landing
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-black px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-xl"
      >
        <div className="w-20 h-20 mx-auto mb-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold">
          <Check size={32} />
        </div>
        
        <h1 className="font-display text-5xl md:text-6xl text-off-white mb-6">
          Order <span className="italic font-light text-gold">Confirmed</span>
        </h1>
        
        <p className="text-stone-light text-lg mb-10 leading-relaxed">
          Your pieces are being prepared with the utmost care. We will notify you once your order has been dispatched.
        </p>

        <div className="bg-charcoal/50 border border-white/5 p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-stone text-[10px] tracking-widest uppercase mb-1">Order Number</p>
            <p className="text-off-white font-body">#LX-928374</p>
          </div>
          <div className="text-left">
            <p className="text-stone text-[10px] tracking-widest uppercase mb-1">Est. Delivery</p>
            <p className="text-off-white font-body">Apr 12 – Apr 15</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-3 bg-off-white text-black px-10 py-5 text-xs tracking-widest uppercase font-body hover:bg-gold transition-colors duration-300"
          >
            <ShoppingBag size={14} />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 border border-white/20 text-off-white px-10 py-5 text-xs tracking-widest uppercase font-body hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
      
      {/* Decorative Shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  );
}
