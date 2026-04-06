'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, Lock, X, CreditCard, Package, User, ArrowRight } from 'lucide-react';
import { View } from '@react-three/drei';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const AmbientLightBeams = lazy(() => import('@/components/3d/AmbientLightBeams'));

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
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-8 bg-off-white text-charcoal">
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-50">
          <View className="w-full h-full">
            <Suspense fallback={null}>
              <AmbientLightBeams />
            </Suspense>
          </View>
        </div>
        <p className="font-display text-4xl text-stone-light tracking-tighter relative z-10">Your inventory is empty.</p>
        <Link href="/shop" className="group flex items-center gap-4 bg-charcoal text-paper-white px-10 py-4 text-[10px] tracking-[0.5em] uppercase font-body hover:bg-off-white hover:text-charcoal border border-charcoal transition-all duration-700 relative z-10">
          <span className="relative z-10">Revert to Shop</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
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

      <div className="w-full px-8 md:px-[5%] relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <Link href="/" className="font-display text-5xl text-mask tracking-[0.5em] uppercase group">
            AURA
          </Link>
          <div className="flex items-center justify-center gap-6 mt-8">
            <span className="h-px w-10 bg-stone-light" />
            <p className="text-stone text-[9px] tracking-[0.6em] uppercase opacity-60">Private Acquisition Terminal</p>
            <span className="h-px w-10 bg-stone-light" />
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-28">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-5">
                  <motion.div
                    animate={{
                      backgroundColor: isDone ? '#1A1A1A' : isActive ? 'transparent' : 'transparent',
                      borderColor: isDone || isActive ? '#1A1A1A' : '#F2F2F2',
                    }}
                    className="w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-700"
                  >
                    {isDone ? (
                      <Check size={16} strokeWidth={1} className="text-paper-white" />
                    ) : (
                      <Icon size={14} strokeWidth={1} className={isActive ? 'text-charcoal' : 'text-stone/30'} />
                    )}
                  </motion.div>
                  <span className={`text-[8px] tracking-[0.5em] uppercase transition-colors duration-700 font-medium ${isActive ? 'text-charcoal' : 'text-stone/40'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-20 md:w-40 h-px mx-6 mb-10 relative">
                    <div className="absolute inset-0 bg-stone-light" />
                    <motion.div 
                      className="absolute inset-0 bg-charcoal"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step > s.id ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-20 lg:gap-32 items-start">
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
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h2 className="font-display text-4xl text-charcoal mb-12 tracking-tight-luxury uppercase">Protocols</h2>
                  <div className="space-y-8">
                    <InputField label="Identity / Email" type="email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="curator@aura.com" />
                    <InputField label="Communication / Phone" type="tel" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="+0 (000) 000-0000" />
                  </div>
                  <button
                    onClick={() => contact.email ? setStep(2) : null}
                    className="mt-16 btn-noir w-full"
                  >
                    <span>Proceed to Logistics</span>
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
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h2 className="font-display text-4xl text-charcoal mb-12 tracking-tight-luxury uppercase">Logistics</h2>
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="First Nomenclature" value={shippingInfo.firstName} onChange={(v) => setShippingInfo({ ...shippingInfo, firstName: v })} placeholder="Jane" />
                      <InputField label="Last Nomenclature" value={shippingInfo.lastName} onChange={(v) => setShippingInfo({ ...shippingInfo, lastName: v })} placeholder="Noir" />
                    </div>
                    <InputField label="Destination Address" value={shippingInfo.address} onChange={(v) => setShippingInfo({ ...shippingInfo, address: v })} placeholder="888 Shadow Blvd." />
                    <div className="grid grid-cols-3 gap-8">
                      <InputField label="City" value={shippingInfo.city} onChange={(v) => setShippingInfo({ ...shippingInfo, city: v })} placeholder="London" />
                      <InputField label="Region" value={shippingInfo.state} onChange={(v) => setShippingInfo({ ...shippingInfo, state: v })} placeholder="City of Westminster" />
                      <InputField label="Post Code" value={shippingInfo.zip} onChange={(v) => setShippingInfo({ ...shippingInfo, zip: v })} placeholder="SW1A" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 mt-16">
                    <button onClick={() => setStep(1)} className="flex-1 text-stone-light text-[9px] tracking-[0.5em] uppercase hover:text-charcoal transition-all duration-700 py-6 border border-transparent hover:border-subtle">
                      Revert
                    </button>
                    <button
                      onClick={() => shippingInfo.address ? setStep(3) : null}
                      className="flex-[2] btn-noir"
                    >
                      <span>Advance to Clearance</span>
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
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h2 className="font-display text-4xl text-charcoal mb-4 tracking-tight-luxury uppercase">Clearance</h2>
                  <p className="text-stone/40 text-[8px] tracking-[0.4em] uppercase mb-12 flex items-center gap-4">
                    <Lock size={10} strokeWidth={1} /> Secure Architectural Channel Active
                  </p>

                  <div className="space-y-8">
                    <InputField label="Cardholder Authority" value={payment.name} onChange={(v) => setPayment({ ...payment, name: v })} placeholder="JANE NOIR" />
                    <InputField label="Acquisition Token / Card" value={payment.card} onChange={(v) => setPayment({ ...payment, card: v })} placeholder="•••• •••• •••• ••••" maxLength={19} />
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Expiry Metric" value={payment.expiry} onChange={(v) => setPayment({ ...payment, expiry: v })} placeholder="MM / YY" />
                      <InputField label="Validation Code" value={payment.cvv} onChange={(v) => setPayment({ ...payment, cvv: v })} placeholder="•••" maxLength={4} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 mt-16">
                    <button onClick={() => setStep(2)} className="flex-1 text-stone-light text-[9px] tracking-[0.5em] uppercase hover:text-charcoal transition-all duration-700 py-6 border border-transparent hover:border-subtle">
                      Revert
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex-[3] btn-noir"
                    >
                      <span className="flex items-center gap-4">
                        <Lock size={12} strokeWidth={1} />
                        Finalize Settlement // {formatPrice(total)}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Side */}
          <div className="lg:col-span-2">
            <div className="glass p-12 sticky top-40">
              <h3 className="font-display text-2xl text-mask mb-10 tracking-tight-luxury uppercase text-center border-b border-subtle pb-8">Manifest</h3>
              <div className="space-y-8 pb-10 border-b border-subtle max-h-80 overflow-y-auto pr-4 no-scrollbar">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-6 group">
                    <div className="relative w-16 h-22 shrink-0 overflow-hidden bg-off-white">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover noir-reveal transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-paper-white text-[9px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 py-1">
                      <p className="text-charcoal text-[11px] tracking-wide leading-snug font-medium uppercase">{item.product.name}</p>
                      <p className="text-stone text-[9px] tracking-[0.4em] uppercase mt-3">Matrix: {item.size}</p>
                    </div>
                    <span className="text-charcoal text-[11px] tracking-widest pt-1">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="py-8 space-y-5">
                <div className="flex justify-between items-center text-stone text-[9px] tracking-[0.4em] uppercase">
                  <span>Subtotal</span><span className="text-charcoal tracking-luxury font-normal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-stone text-[9px] tracking-[0.4em] uppercase">
                  <span>Logistics</span>
                  <span className={shipping === 0 ? 'text-stone italic lowercase font-light' : 'text-charcoal tracking-luxury font-normal'}>{shipping === 0 ? 'complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between items-center text-stone text-[9px] tracking-[0.4em] uppercase font-light">
                  <span>Protocols</span><span className="text-charcoal tracking-luxury font-normal">{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="flex justify-between pt-10 border-t border-subtle items-center">
                <span className="text-stone text-[9px] tracking-[0.6em] uppercase">Total</span>
                <span className="font-display text-4xl text-charcoal tracking-tight-luxury leading-none">{formatPrice(total)}</span>
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
            className="fixed inset-0 z-[100] bg-paper-white/95 backdrop-blur-3xl flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="glass max-w-xl w-full p-16 text-center relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-10 right-10 text-stone hover:text-charcoal transition-all duration-700 hover:rotate-90"
              >
                <X size={24} strokeWidth={1} />
              </button>

              <div className="relative inline-block mb-12">
                <div className="w-24 h-24 mx-auto rounded-full bg-off-white flex items-center justify-center border border-subtle">
                  <Lock className="text-charcoal" size={32} strokeWidth={1} />
                </div>
              </div>

              <h2 className="font-display text-5xl text-mask mb-8 tracking-tight italic">Structural Protocol</h2>
              <p className="text-stone text-lg leading-relaxed mb-12 font-light px-6">
                This environment is a high-fidelity <span className="text-charcoal italic underline underline-offset-8 decoration-subtle">simulacrum</span> intended for design validation. Financial settlement systems are currently inactive within this domain.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="py-6 border-b border-subtle">
                   <p className="text-stone/40 text-[8px] tracking-[0.5em] uppercase mb-3">Security Metric</p>
                   <p className="text-charcoal text-[10px] tracking-[0.3em] uppercase font-medium">AES-256 Valid</p>
                </div>
                <div className="py-6 border-b border-subtle">
                   <p className="text-stone/40 text-[8px] tracking-[0.5em] uppercase mb-3">Void State</p>
                   <p className="text-charcoal text-[10px] tracking-[0.3em] uppercase font-medium">Clearance Verified</p>
                </div>
              </div>

              <div className="space-y-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-noir w-full"
                >
                  <span>Dissolve Manifest</span>
                </button>
                <Link
                  href="/shop"
                  onClick={() => setShowModal(false)}
                  className="block w-full py-4 text-stone/40 text-[9px] tracking-[0.6em] uppercase hover:text-charcoal transition-all duration-700"
                >
                  Return to archive
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
      <label className="block text-[8px] tracking-[0.5em] uppercase text-stone mb-4 ml-1 group-focus-within:text-charcoal transition-all duration-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-transparent border-b border-subtle text-charcoal placeholder:text-stone-light/40 py-4 text-[13px] tracking-wide font-body outline-none focus:border-charcoal transition-all duration-1000"
      />
    </div>
  );
}
