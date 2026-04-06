'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/shop', label: 'Collection' },
  { href: '/shop?category=outerwear', label: 'Outerwear' },
  { href: '/shop?category=dresses', label: 'Dresses' },
  { href: '/shop?category=accessories', label: 'Accessories' },
];

const mobileLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'All Collection' },
  { href: '/shop?category=outerwear', label: 'Outerwear' },
  { href: '/shop?category=dresses', label: 'Dresses' },
  { href: '/shop?category=accessories', label: 'Accessories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group font-body text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
      style={{
        color: active ? 'var(--gold)' : 'rgba(240,238,232,0.5)',
        transition: 'color 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1)',
        willChange: 'transform',
      }}
    >
      <span style={{ color: 'inherit' }}>{label}</span>
      {/* Sliding underline */}
      <span
        className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500"
        style={{
          width: active ? '100%' : '0%',
          transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)',
        }}
      />
      <span
        className="absolute -bottom-1 left-0 h-px bg-gold/40 w-0 group-hover:w-full transition-all duration-500"
        style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
      />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Logo shimmer on hover
  const handleLogoEnter = () => {
    if (logoRef.current) {
      logoRef.current.style.setProperty('--shimmer-active', '1');
    }
  };
  const handleLogoLeave = () => {
    if (logoRef.current) {
      logoRef.current.style.setProperty('--shimmer-active', '0');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled
            ? 'rgba(5,5,8,0.85)'
            : 'linear-gradient(to bottom, rgba(5,5,8,0.7), transparent)',
          backdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid rgba(212,175,106,0.1)' : '1px solid transparent',
          padding: scrolled ? '16px 0' : '24px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Desktop Left Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} active={pathname === link.href} />
              </li>
            ))}
          </ul>

          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            className="font-display text-2xl tracking-[0.4em] uppercase relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 40%, var(--gold-light) 60%, var(--gold) 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gold-shimmer 5s linear infinite',
            }}
          >
            LUX NOIR
          </Link>

          {/* Desktop Right */}
          <div className="flex items-center gap-8">
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.slice(2).map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} active={pathname === link.href} />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5">
              <button
                aria-label="Search"
                className="group text-stone hover:text-gold transition-colors duration-300"
              >
                <Search size={17} />
              </button>

              <Link href="/wishlist" className="relative text-stone hover:text-gold transition-colors duration-300 group">
                <Heart size={17} className="group-hover:scale-110 transition-transform duration-300" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-body">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative text-stone hover:text-gold transition-colors duration-300 group">
                <ShoppingBag size={17} className="group-hover:scale-110 transition-transform duration-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-body">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
                className="md:hidden text-stone hover:text-gold transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[9998] flex flex-col"
            style={{
              background: 'rgba(5,5,8,0.97)',
              backdropFilter: 'blur(60px)',
            }}
          >
            {/* Close */}
            <div className="flex items-center justify-between p-6">
              <span className="font-display text-xl tracking-[0.4em] uppercase text-gold-gradient">
                LUX NOIR
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-stone hover:text-gold transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-10 gap-2">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.23, 1, 0.32, 1], duration: 0.6 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-5xl font-light tracking-tight uppercase py-3 text-off-white/80 hover:text-gold transition-colors duration-300 border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <div className="px-10 pb-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/5" />
              <span className="font-body text-[9px] tracking-widest uppercase text-stone/40">London · Paris · NY</span>
              <span className="h-px flex-1 bg-white/5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
