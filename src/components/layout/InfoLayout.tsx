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
    <div className="min-h-screen bg-transparent text-off-white selection:bg-gold selection:text-obsidian">
      {/* Cinematic Header Overlay */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-24 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent z-10" />
          <Image
            src={image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=80'}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale saturate-0"
            priority
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {subtitle && (
              <p className="text-gold text-[10px] tracking-[0.8em] uppercase mb-6 flex items-center gap-6">
                <span className="inline-block w-12 h-px bg-gold/40" />
                {subtitle}
              </p>
            )}
            <h1 className="font-display text-7xl md:text-9xl text-off-white leading-[0.85] tracking-tighter max-w-4xl">
              {title}
            </h1>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 right-10 z-20 hidden md:block"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] tracking-[0.5em] uppercase text-gold/40 rotate-90 origin-right translate-x-full">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Content Area */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-20 lg:gap-32">
          {/* Side Info */}
          <div className="md:col-span-4 lg:col-span-3">
             <div className="sticky top-40 space-y-16">
               <div className="space-y-8">
                 <p className="text-[10px] tracking-[0.6em] uppercase text-gold/40">Compendium</p>
                 <ul className="space-y-6">
                   {[
                     { label: 'About', path: '/about' },
                     { label: 'Sustainability', path: '/sustainability' },
                     { label: 'Shipping', path: '/shipping' },
                     { label: 'Returns', path: '/returns' },
                     { label: 'Privacy', path: '/privacy' },
                     { label: 'Terms', path: '/terms' },
                   ].map((item) => (
                     <li key={item.path}>
                       <Link 
                        href={item.path} 
                        className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-stone/60 hover:text-gold transition-all duration-500"
                       >
                         <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-500" />
                         {item.label}
                       </Link>
                     </li>
                   ))}
                 </ul>
               </div>
               
               <div className="pt-12 border-t border-white/5 space-y-6">
                 <p className="text-[10px] tracking-[0.6em] uppercase text-gold/40">Communication</p>
                 <div className="space-y-2">
                   <p className="text-[11px] text-stone leading-relaxed tracking-wider font-light italic">Dedicated facilitation for all acquisition inquiries.</p>
                   <p className="pt-4 text-off-white text-[11px] tracking-[0.2em] font-medium hover:text-gold transition-colors cursor-pointer">concierge@luxnoir.com</p>
                 </div>
               </div>
               
               {/* Decorative elements */}
               <div className="hidden lg:block opacity-10">
                 <div className="font-display text-8xl leading-none select-none tracking-tighter">LN</div>
               </div>
             </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-8 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="prose prose-invert prose-stone max-w-4xl 
                prose-h2:font-display prose-h2:text-5xl md:prose-h2:text-7xl prose-h2:text-off-white prose-h2:mb-12 prose-h2:tracking-tight prose-h2:leading-tight
                prose-h3:text-gold prose-h3:text-[10px] prose-h3:tracking-[0.6em] prose-h3:uppercase prose-h3:mb-6 prose-h3:font-normal
                prose-p:text-stone prose-p:text-xl md:prose-p:text-2xl prose-p:leading-[1.7] prose-p:mb-16 prose-p:font-light prose-p:tracking-wide
                prose-ul:text-stone prose-li:mb-6 prose-li:text-lg prose-li:font-light"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
