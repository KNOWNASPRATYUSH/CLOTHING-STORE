'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState, useEffect } from 'react';
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
  return (
    <Link
      href={href}
      className={`font-body text-[10px] tracking-widest uppercase transition-colors duration-300 ${active ? 'text-charcoal font-medium' : 'text-stone hover:text-charcoal'}`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-off-white/90 backdrop-blur-md ${scrolled ? 'border-b border-subtle py-4' : 'py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} active={pathname === link.href} />
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-widest uppercase text-charcoal mx-auto"
          >
            AURA
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden md:flex items-center gap-8 mr-4">
              {navLinks.slice(2).map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} active={pathname === link.href} />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 text-charcoal">
              <button aria-label="Search" className="hover:text-stone transition-colors">
                <Search size={16} />
              </button>

              <Link href="/wishlist" className="relative hover:text-stone transition-colors">
                <Heart size={16} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-charcoal text-paper-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-body">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative hover:text-stone transition-colors">
                <ShoppingBag size={16} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-charcoal text-paper-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-body">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
                className="md:hidden hover:text-stone transition-colors"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[9998] flex flex-col bg-paper-white"
          >
            <div className="flex items-center justify-between p-6 border-b border-subtle">
              <span className="font-display text-xl tracking-widest uppercase text-charcoal">
                AURA
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-stone hover:text-charcoal transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col py-10 px-8 gap-6">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-3xl uppercase text-charcoal hover:text-stone transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
