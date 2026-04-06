'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const footerLinks = {
  Shop: [
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'Outerwear', href: '/shop?category=outerwear' },
    { label: 'Dresses', href: '/shop?category=dresses' },
    { label: 'Accessories', href: '/shop?category=accessories' },
  ],
  Info: [
    { label: 'About AURA', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact', href: '/contact' },
  ],
  Policy: [
    { label: 'Returns', href: '/returns' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <footer ref={ref} className="bg-paper-white border-t border-subtle">
      <div className="w-full px-8 md:px-[5%] pt-20 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="col-span-2 md:col-span-1"
          >
            <Link href="/" className="font-display text-2xl tracking-widest uppercase text-charcoal">
              AURA
            </Link>
            <p className="mt-4 font-body text-xs leading-relaxed max-w-xs text-stone">
              The architecture of modern minimalist clothing. Designed with restraint.
            </p>
          </motion.div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + gi * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h4 className="font-body text-[10px] tracking-widest uppercase mb-6 text-charcoal font-medium">
                {group}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-stone hover:text-charcoal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[10px] uppercase tracking-widest text-stone">
            © {new Date().getFullYear()} AURA.
          </p>
          <div className="flex gap-6 text-[10px] tracking-widest uppercase text-stone">
            <a href="#" className="hover:text-charcoal transition-colors">Instagram</a>
            <a href="#" className="hover:text-charcoal transition-colors">Journal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
