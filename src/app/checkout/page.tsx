'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, Lock, X, CreditCard, Package, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const STEPS = [
  { id: 1, label: 'Contact', icon: User },
  { id: 2, label: 'Shipping', icon: Package },
  { id: 3, label: 'Payment', icon: CreditCard },
];

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Form state
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'US',
  });
  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '', name: '' });

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6">
        <p className="font-display text-3xl text-stone">Your bag is empty.</p>
        <Link href="/shop" className="text-gold text-xs tracking-widest uppercase hover:text-gold-light transition-colors duration-300">
          Back to Shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="py-10 text-center">
          <Link href="/" className="font-display text-2xl text-off-white tracking-[0.2em] uppercase">
            LUX NOIR
          </Link>
          <p className="text-stone text-xs tracking-widest uppercase mt-2">Secure Checkout</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-14">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{
                      backgroundColor: isDone ? '#C9A96E' : isActive ? '#F5F5F0' : 'transparent',
                      borderColor: isDone || isActive ? (isDone ? '#C9A96E' : '#F5F5F0') : 'rgba(255,255,255,0.15)',
                    }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                  >
                    {isDone ? (
                      <Check size={14} className="text-black" />
                    ) : (
                      <Icon size={14} className={isActive ? 'text-black' : 'text-stone'} />
                    )}
                  </motion.div>
                  <span className={`text-[10px] tracking-widest uppercase ${isActive ? 'text-off-white' : 'text-stone'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-20 md:w-32 h-px mx-3 mb-5 transition-colors duration-500 ${step > s.id ? 'bg-gold' : 'bg-white/10'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Step 1: Contact */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-display text-3xl text-off-white mb-8">Contact</h2>
                  <div className="space-y-5">
                    <InputField label="Email Address" type="email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="you@example.com" />
                    <InputField label="Phone (optional)" type="tel" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="+1 (555) 000-0000" />
                  </div>
                  <button
                    onClick={() => contact.email ? setStep(2) : null}
                    className="mt-10 w-full bg-off-white text-black py-4 text-xs tracking-widest uppercase font-body hover:bg-gold transition-colors duration-300"
                  >
                    Continue to Shipping
                  </button>
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-display text-3xl text-off-white mb-8">Shipping</h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="First Name" value={shippingInfo.firstName} onChange={(v) => setShippingInfo({ ...shippingInfo, firstName: v })} placeholder="Jane" />
                      <InputField label="Last Name" value={shippingInfo.lastName} onChange={(v) => setShippingInfo({ ...shippingInfo, lastName: v })} placeholder="Noir" />
                    </div>
                    <InputField label="Address" value={shippingInfo.address} onChange={(v) => setShippingInfo({ ...shippingInfo, address: v })} placeholder="123 Fashion St." />
                    <div className="grid grid-cols-3 gap-4">
                      <InputField label="City" value={shippingInfo.city} onChange={(v) => setShippingInfo({ ...shippingInfo, city: v })} placeholder="New York" />
                      <InputField label="State" value={shippingInfo.state} onChange={(v) => setShippingInfo({ ...shippingInfo, state: v })} placeholder="NY" />
                      <InputField label="ZIP" value={shippingInfo.zip} onChange={(v) => setShippingInfo({ ...shippingInfo, zip: v })} placeholder="10001" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-10">
                    <button onClick={() => setStep(1)} className="flex-1 border border-white/15 text-stone py-4 text-xs tracking-widest uppercase font-body hover:border-white/30 hover:text-off-white transition-all duration-300">
                      Back
                    </button>
                    <button
                      onClick={() => shippingInfo.address ? setStep(3) : null}
                      className="flex-1 bg-off-white text-black py-4 text-xs tracking-widest uppercase font-body hover:bg-gold transition-colors duration-300"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-display text-3xl text-off-white mb-2">Payment</h2>
                  <p className="text-stone text-xs mb-8 flex items-center gap-2">
                    <Lock size={11} /> All transactions are secured and encrypted
                  </p>

                  <div className="space-y-5">
                    <InputField label="Name on Card" value={payment.name} onChange={(v) => setPayment({ ...payment, name: v })} placeholder="Jane Noir" />
                    <InputField label="Card Number" value={payment.card} onChange={(v) => setPayment({ ...payment, card: v })} placeholder="4242 4242 4242 4242" maxLength={19} />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Expiry" value={payment.expiry} onChange={(v) => setPayment({ ...payment, expiry: v })} placeholder="MM / YY" />
                      <InputField label="CVV" value={payment.cvv} onChange={(v) => setPayment({ ...payment, cvv: v })} placeholder="123" maxLength={4} />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button onClick={() => setStep(2)} className="flex-1 border border-white/15 text-stone py-4 text-xs tracking-widest uppercase font-body hover:border-white/30 hover:text-off-white transition-all duration-300">
                      Back
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex-1 bg-gold text-black py-4 text-xs tracking-widest uppercase font-body hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Lock size={12} /> Pay {formatPrice(total)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-2">
            <div className="border border-white/8 p-6 bg-charcoal sticky top-28">
              <h3 className="font-display text-2xl text-off-white mb-6">Order</h3>
              <div className="space-y-4 pb-6 border-b border-white/8 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-14 h-18 shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="56px" className="object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone text-black text-[9px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-off-white text-sm font-body leading-snug">{item.product.name}</p>
                      <p className="text-stone text-xs mt-0.5">Size: {item.size}</p>
                    </div>
                    <span className="text-off-white text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="py-4 space-y-3">
                <div className="flex justify-between text-stone text-sm">
                  <span>Subtotal</span><span className="text-off-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone text-sm">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-gold' : 'text-off-white'}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-stone text-sm">
                  <span>Tax</span><span className="text-off-white">{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t border-white/8">
                <span className="font-display text-xl text-off-white">Total</span>
                <span className="font-display text-xl text-off-white">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-charcoal border border-white/10 max-w-md w-full p-10 text-center relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-stone hover:text-off-white transition-colors duration-300"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 border border-gold flex items-center justify-center">
                <Lock className="text-gold" size={24} />
              </div>

              <h2 className="font-display text-3xl text-off-white mb-3">Showcase Only</h2>
              <p className="text-stone leading-relaxed mb-8">
                This store is for showcase purposes only. Payments are disabled.
              </p>
              <p className="text-stone-light text-sm leading-relaxed mb-8">
                No real payment will be processed. This is a demonstration of a premium e-commerce experience built with Next.js.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-off-white text-black py-3.5 text-xs tracking-widest uppercase font-body hover:bg-gold transition-colors duration-300"
                >
                  Continue Browsing
                </button>
                <Link
                  href="/shop"
                  onClick={() => setShowModal(false)}
                  className="block w-full border border-white/15 text-stone py-3.5 text-xs tracking-widest uppercase font-body hover:border-white/30 hover:text-off-white transition-all duration-300"
                >
                  Back to Shop
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Input Field
function InputField({
  label, type = 'text', value, onChange, placeholder, maxLength,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-stone mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-transparent border border-white/15 text-off-white placeholder:text-stone/40 px-4 py-3.5 text-sm font-body outline-none focus:border-gold transition-colors duration-300"
      />
    </div>
  );
}
