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
    { label: 'About LUX NOIR', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact', href: '/contact' },
  ],
  Policy: [
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid rgba(212,175,106,0.12)',
        background: 'rgba(5,5,8,0.95)',
        backdropFilter: 'blur(60px)',
      }}
    >
      {/* Glowing top border reveal */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.5), transparent)',
          scaleX: inView ? 1 : 0,
          transition: 'transform 1.5s cubic-bezier(0.23,1,0.32,1)',
          transformOrigin: 'center',
          boxShadow: '0 0 20px rgba(212,175,106,0.3)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="col-span-2 md:col-span-1"
          >
            <Link
              href="/"
              className="font-display text-2xl tracking-[0.3em] uppercase"
              style={{
                background: 'linear-gradient(135deg, var(--gold-dim), var(--gold), var(--gold-light))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gold-shimmer 5s linear infinite',
              }}
            >
              LUX NOIR
            </Link>
            <p
              className="mt-4 font-body text-sm leading-relaxed max-w-xs font-light"
              style={{ color: 'var(--stone)' }}
            >
              Elevated essentials for the modern wardrobe. Crafted with intention. Worn with purpose.
            </p>

            {/* Social icons */}
            <div className="flex gap-5 mt-6">
              {/* Instagram */}
              <a
                href="#"
                className="group transition-colors duration-300"
                style={{ color: 'var(--stone)' }}
                aria-label="Instagram"
              >
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:stroke-gold transition-colors duration-300"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                className="group transition-colors duration-300"
                style={{ color: 'var(--stone)' }}
                aria-label="X / Twitter"
              >
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="currentColor"
                  className="group-hover:fill-gold transition-colors duration-300"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + gi * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h4
                className="font-body text-[10px] tracking-[0.5em] uppercase mb-5"
                style={{ color: 'var(--stone)' }}
              >
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative font-body text-sm font-light inline-flex items-center gap-2 transition-colors duration-300"
                      style={{ color: 'var(--stone-light)' }}
                    >
                      {/* Gold reveal underline */}
                      <span
                        className="absolute -bottom-0.5 left-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                        style={{
                          background: 'var(--gold)',
                          width: '100%',
                          transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)',
                        }}
                      />
                      <span className="group-hover:text-off-white transition-colors duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div>
            <p
              className="font-display text-xl font-light"
              style={{ color: 'var(--off-white)' }}
            >
              Join the Inner Circle
            </p>
            <p className="font-body text-sm mt-1 font-light" style={{ color: 'var(--stone)' }}>
              Receive exclusive access to new collections and private events.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-0 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 md:w-64 px-4 py-3.5 text-sm font-body font-light placeholder:text-stone outline-none transition-all duration-300"
              style={{
                background: 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                color: 'var(--off-white)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.12)'; }}
            />
            <button
              type="submit"
              className="px-8 py-3.5 font-body text-[10px] tracking-[0.5em] uppercase font-light transition-all duration-500 hover:bg-gold-light"
              style={{
                background: 'var(--gold)',
                color: 'var(--obsidian)',
              }}
            >
              Join
            </button>
          </form>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="font-body text-xs font-light" style={{ color: 'var(--stone)' }}>
            © {new Date().getFullYear()} LUX NOIR. All rights reserved. Showcase project.
          </p>
          <p className="font-body text-xs font-light" style={{ color: 'rgba(120,120,128,0.4)' }}>
            Payments disabled — demonstration only.
          </p>
        </div>
      </div>
    </footer>
  );
}
