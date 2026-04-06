'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

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
      className={`font-body text-[9px] tracking-[0.3em] uppercase transition-all duration-500 whitespace-nowrap ${
        active ? 'text-charcoal font-medium' : 'text-stone hover:text-charcoal'
      }`}
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
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'py-4 glass' : 'py-10 bg-transparent'
        }`}
      >
        <div className="w-full px-8 md:px-[5%] flex items-center justify-between">
          {/* Left: Nav */}
          <ul className="hidden lg:flex items-center gap-12 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} active={pathname === link.href} />
              </li>
            ))}
          </ul>

          {/* Center: Logo */}
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-[0.5em] uppercase text-charcoal flex-1 text-center"
          >
            AURA
          </Link>

          {/* Right: Tools & Nav */}
          <div className="flex items-center justify-end gap-10 flex-1">
            <ul className="hidden lg:flex items-center gap-12 mr-4">
              {navLinks.slice(2).map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} active={pathname === link.href} />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 text-charcoal">
              <button aria-label="Search" className="hover:text-stone transition-colors group">
                <Search size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              </button>

              <Link href="/wishlist" className="relative hover:text-stone transition-colors group">
                <Heart size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-charcoal text-paper-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-body">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative hover:text-stone transition-colors group">
                <ShoppingBag size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-charcoal text-paper-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-body">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
                className="lg:hidden hover:text-stone transition-colors"
              >
                <Menu size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-paper-white/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between p-8">
              <span className="font-display text-2xl tracking-[0.4em] uppercase text-charcoal">
                AURA
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-stone hover:text-charcoal transition-colors p-2"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center items-center py-10 px-8 gap-8">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-4xl uppercase text-charcoal hover:text-stone transition-all duration-700"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-12 border-t border-subtle flex justify-between items-center text-[8px] tracking-[0.5em] uppercase text-stone">
              <span>Selected Works</span>
              <div className="flex gap-6">
                <a href="#">IG</a>
                <a href="#">TW</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
