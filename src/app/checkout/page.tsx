'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, Lock, X, CreditCard, Package, User, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const STEPS = [
  { id: 1, label: 'Protocols', icon: User },
  { id: 2, label: 'Logistics', icon: Package },
  { id: 3, label: 'Clearance', icon: CreditCard },
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
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-8 bg-transparent">
        <p className="font-display text-4xl text-stone/40 tracking-tighter">Your inventory is empty.</p>
        <Link href="/shop" className="group flex items-center gap-4 bg-gold text-obsidian px-10 py-4 text-[10px] tracking-[0.5em] uppercase font-body hover:bg-off-white transition-all duration-700">
          <span className="relative z-10">Revert to Shop</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Link href="/" className="font-display text-4xl text-off-white tracking-[0.4em] uppercase group">
            LUX <span className="text-gold group-hover:text-off-white transition-colors duration-700">NOIR</span>
          </Link>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="h-px w-8 bg-gold/30" />
            <p className="text-stone/40 text-[9px] tracking-[0.6em] uppercase">Private Acquisition Terminal</p>
            <span className="h-px w-8 bg-gold/30" />
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-24">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{
                      backgroundColor: isDone ? '#D4AF6A' : isActive ? 'transparent' : 'rgba(255,255,255,0.02)',
                      borderColor: isDone || isActive ? (isDone ? '#D4AF6A' : '#D4AF6A') : 'rgba(255,255,255,0.05)',
                      boxShadow: isActive ? '0 0 20px rgba(212,175,106,0.15)' : 'none',
                    }}
                    className="w-12 h-12 rounded-sm border flex items-center justify-center transition-all duration-700"
                  >
                    {isDone ? (
                      <Check size={16} className="text-obsidian" />
                    ) : (
                      <Icon size={16} className={isActive ? 'text-gold' : 'text-stone/20'} />
                    )}
                  </motion.div>
                  <span className={`text-[9px] tracking-[0.4em] uppercase transition-colors duration-700 ${isActive ? 'text-gold' : 'text-stone/30'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-16 md:w-32 h-px mx-4 mb-8 relative">
                    <div className="absolute inset-0 bg-white/5" />
                    <motion.div 
                      className="absolute inset-0 bg-gold/40"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step > s.id ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Form Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Step 1: Contact */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h2 className="font-display text-4xl text-off-white mb-10 tracking-tight">Identification Protocols</h2>
                  <div className="space-y-6">
                    <InputField label="Digital Identifier" type="email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="curator@noir.com" />
                    <InputField label="Secure Link (optional)" type="tel" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="+0 (000) 000-0000" />
                  </div>
                  <button
                    onClick={() => contact.email ? setStep(2) : null}
                    className="mt-12 w-full group relative flex items-center justify-center gap-4 bg-gold text-obsidian py-5 text-[10px] tracking-[0.6em] uppercase font-body hover:bg-off-white transition-all duration-700 overflow-hidden shadow-[0_0_20px_rgba(212,175,106,0.1)]"
                  >
                    <span className="relative z-10 font-medium">Proceed to Logistics</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h2 className="font-display text-4xl text-off-white mb-10 tracking-tight">Logistics Destination</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Given Name" value={shippingInfo.firstName} onChange={(v) => setShippingInfo({ ...shippingInfo, firstName: v })} placeholder="Jane" />
                      <InputField label="Surname" value={shippingInfo.lastName} onChange={(v) => setShippingInfo({ ...shippingInfo, lastName: v })} placeholder="Noir" />
                    </div>
                    <InputField label="Coordinate Address" value={shippingInfo.address} onChange={(v) => setShippingInfo({ ...shippingInfo, address: v })} placeholder="888 Shadow Blvd." />
                    <div className="grid grid-cols-3 gap-4">
                      <InputField label="Metropolis" value={shippingInfo.city} onChange={(v) => setShippingInfo({ ...shippingInfo, city: v })} placeholder="New York" />
                      <InputField label="Province" value={shippingInfo.state} onChange={(v) => setShippingInfo({ ...shippingInfo, state: v })} placeholder="NY" />
                      <InputField label="Index" value={shippingInfo.zip} onChange={(v) => setShippingInfo({ ...shippingInfo, zip: v })} placeholder="10001" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-12">
                    <button onClick={() => setStep(1)} className="flex-1 border border-white/10 text-stone/40 py-5 text-[10px] tracking-[0.5em] uppercase font-body hover:border-white/30 hover:text-off-white transition-all duration-700 bg-white/2 backdrop-blur-md">
                      Revert
                    </button>
                    <button
                      onClick={() => shippingInfo.address ? setStep(3) : null}
                      className="flex-[2] group relative flex items-center justify-center gap-4 bg-gold text-obsidian py-5 text-[10px] tracking-[0.6em] uppercase font-body hover:bg-off-white transition-all duration-700 overflow-hidden shadow-[0_0_20px_rgba(212,175,106,0.1)]"
                    >
                      <span className="relative z-10 font-medium">Enter Clearance State</span>
                      <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h2 className="font-display text-4xl text-off-white mb-4 tracking-tight">Financial Clearance</h2>
                  <p className="text-stone/40 text-[9px] tracking-[0.3em] uppercase mb-10 flex items-center gap-3">
                    <Lock size={10} className="text-gold/60" /> Secure Encryption Channel Active
                  </p>

                  <div className="space-y-6">
                    <InputField label="Holder Identity" value={payment.name} onChange={(v) => setPayment({ ...payment, name: v })} placeholder="JANE NOIR" />
                    <InputField label="Resource Number" value={payment.card} onChange={(v) => setPayment({ ...payment, card: v })} placeholder="•••• •••• •••• ••••" maxLength={19} />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Validity" value={payment.expiry} onChange={(v) => setPayment({ ...payment, expiry: v })} placeholder="MM / YY" />
                      <InputField label="Verification Code" value={payment.cvv} onChange={(v) => setPayment({ ...payment, cvv: v })} placeholder="•••" maxLength={4} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-12">
                    <button onClick={() => setStep(2)} className="flex-1 border border-white/10 text-stone/40 py-5 text-[10px] tracking-[0.5em] uppercase font-body hover:border-white/30 hover:text-off-white transition-all duration-700 bg-white/2 backdrop-blur-md">
                      Revert
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex-[2] group relative flex items-center justify-center gap-4 bg-gold text-obsidian py-5 text-[10px] tracking-[0.6em] uppercase font-body hover:bg-off-white transition-all duration-700 overflow-hidden shadow-[0_0_40px_rgba(212,175,106,0.2)]"
                    >
                      <Lock size={12} className="relative z-10" />
                      <span className="relative z-10 font-bold">Authorize Acquisition // {formatPrice(total)}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-2">
            <div className="glass border-subtle p-8 bg-void/10 backdrop-blur-2xl sticky top-40">
              <h3 className="font-display text-2xl text-off-white mb-8 tracking-tighter">Manifest</h3>
              <div className="space-y-6 pb-8 border-b border-white/5 max-h-72 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 group">
                    <div className="relative w-16 h-20 shrink-0 glass border-subtle overflow-hidden">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-obsidian text-[9px] font-bold rounded-sm flex items-center justify-center border border-obsidian/20">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 py-1">
                      <p className="text-off-white text-xs tracking-wide leading-snug">{item.product.name}</p>
                      <p className="text-stone/40 text-[9px] tracking-widest uppercase mt-2">Matrix: {item.size}</p>
                    </div>
                    <span className="text-gold-gradient text-xs font-medium pt-1">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center text-stone/60 text-[9px] tracking-[0.3em] uppercase">
                  <span>Subtotal</span><span className="text-off-white font-normal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-stone/60 text-[9px] tracking-[0.3em] uppercase">
                  <span>Logistic Allocation</span>
                  <span className={shipping === 0 ? 'text-gold' : 'text-off-white'}>{shipping === 0 ? 'Complementary' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between items-center text-stone/60 text-[9px] tracking-[0.3em] uppercase">
                  <span>Fiscal Factor</span><span className="text-off-white font-normal">{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="flex justify-between pt-6 border-t border-white/5 items-center">
                <span className="text-stone/40 text-[10px] tracking-[0.5em] uppercase">Grand Total</span>
                <span className="font-display text-3xl text-gold-gradient leading-none">{formatPrice(total)}</span>
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
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="glass border-subtle max-w-lg w-full p-12 text-center relative bg-void/20"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-stone/40 hover:text-gold transition-all duration-500 hover:rotate-90"
              >
                <X size={20} strokeWidth={1} />
              </button>

              <div className="relative inline-block mb-10">
                <div className="w-20 h-20 mx-auto rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center">
                  <Lock className="text-gold" size={32} strokeWidth={1.5} />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gold/10 blur-2xl rounded-full"
                />
              </div>

              <h2 className="font-display text-4xl md:text-5xl text-off-white mb-6 tracking-tight italic">Conceptual Architecture</h2>
              <p className="text-stone text-lg leading-relaxed mb-10 font-light px-4">
                This environment is a high-fidelity <span className="text-gold italic underline underline-offset-4 decoration-gold/30">simulacrum</span> intended for design validation. Financial settlement systems are currently inactive within this restricted domain.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 border border-white/5 bg-white/2">
                   <p className="text-gold text-[8px] tracking-[0.4em] uppercase mb-2">Security Stat</p>
                   <p className="text-off-white text-[10px] tracking-widest uppercase">AES-256 Valid</p>
                </div>
                <div className="p-4 border border-white/5 bg-white/2">
                   <p className="text-gold text-[8px] tracking-[0.4em] uppercase mb-2">Protocol</p>
                   <p className="text-off-white text-[10px] tracking-widest uppercase">Verified Void</p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gold text-obsidian py-5 text-[10px] tracking-[0.6em] uppercase font-bold hover:bg-off-white transition-all duration-700 shadow-[0_0_20px_rgba(212,175,106,0.1)]"
                >
                  Dissolve Manifest
                </button>
                <Link
                  href="/shop"
                  onClick={() => setShowModal(false)}
                  className="block w-full py-4 text-stone/40 text-[9px] tracking-[0.5em] uppercase hover:text-gold transition-colors duration-500"
                >
                  Return to Archive
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
interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}

function InputField({
  label, type = 'text', value, onChange, placeholder, maxLength,
}: InputFieldProps) {
  return (
    <div className="group">
      <label className="block text-[10px] tracking-[0.4em] uppercase text-stone/40 mb-3 ml-1 group-focus-within:text-gold transition-colors duration-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-obsidian-light/20 backdrop-blur-md border border-white/5 text-off-white placeholder:text-stone/20 px-5 py-4 text-sm font-body outline-none focus:border-gold/50 focus:bg-white/2 transition-all duration-500"
      />
    </div>
  );
}
