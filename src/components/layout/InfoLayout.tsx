'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  image?: string;
};

export default function InfoLayout({ title, subtitle, children, image }: Props) {
  return (
    <div className="min-h-screen bg-black text-off-white selection:bg-gold selection:text-black">
      {/* Cinematic Header Overlay */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <Image
            src={image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=80'}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale opacity-60"
            priority
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {subtitle && (
              <p className="text-gold text-xs tracking-[0.6em] uppercase mb-4 flex items-center gap-4">
                <span className="inline-block w-10 h-px bg-gold" />
                {subtitle}
              </p>
            )}
            <h1 className="font-display text-7xl md:text-9xl text-off-white leading-none">
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16">
          {/* Side Info */}
          <div className="md:col-span-4 lg:col-span-3">
             <div className="sticky top-32 space-y-12">
               <div>
                 <p className="text-[10px] tracking-[0.5em] uppercase text-stone mb-6">Navigation</p>
                 <ul className="space-y-4">
                   <li><Link href="/about" className="text-sm uppercase tracking-widest text-stone hover:text-gold transition-colors">About</Link></li>
                   <li><Link href="/sustainability" className="text-sm uppercase tracking-widest text-stone hover:text-gold transition-colors">Sustainability</Link></li>
                   <li><Link href="/shipping" className="text-sm uppercase tracking-widest text-stone hover:text-gold transition-colors">Shipping</Link></li>
                   <li><Link href="/returns" className="text-sm uppercase tracking-widest text-stone hover:text-gold transition-colors">Returns</Link></li>
                 </ul>
               </div>
               
               <div className="pt-12 border-t border-white/5">
                 <p className="text-[10px] tracking-[0.5em] uppercase text-stone mb-4">Concierge</p>
                 <p className="text-sm text-stone-light leading-relaxed">Available 24/7 for dedicated support and enquiries.</p>
                 <p className="mt-4 text-gold text-sm tracking-widest">concierge@luxnoir.com</p>
               </div>
             </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-8 lg:col-span-9 max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="prose prose-invert prose-stone max-w-none 
                prose-h2:font-display prose-h2:text-5xl prose-h2:text-off-white prose-h2:mb-10 prose-h2:italic prose-h2:font-light
                prose-p:text-stone-light prose-p:text-xl prose-p:leading-relaxed prose-p:mb-12
                prose-ul:text-stone-light prose-li:mb-4 prose-li:text-lg"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
