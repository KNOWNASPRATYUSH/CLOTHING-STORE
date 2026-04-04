'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const navLinks = [
  { href: '/shop', label: 'All Collection' },
  { href: '/shop?category=outerwear', label: 'Outerwear' },
  { href: '/shop?category=dresses', label: 'Dresses' },
  { href: '/shop?category=accessories', label: 'Accessories' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Desktop Nav - Left */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.slice(0, 2).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[11px] tracking-[0.4em] uppercase font-body transition-colors ${
                  pathname === link.href ? 'text-gold' : 'text-off-white/60 hover:text-off-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-[0.3em] uppercase text-off-white hover:text-gold transition-colors">
          LUX NOIR
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.slice(2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[11px] tracking-[0.4em] uppercase font-body transition-colors ${
                    pathname === link.href ? 'text-gold' : 'text-off-white/60 hover:text-off-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <Search size={18} className="text-off-white/60 cursor-pointer" />
            <Link href="/wishlist" className="relative text-off-white/60 hover:text-gold">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative text-off-white/60 hover:text-gold">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Menu size={20} className="md:hidden text-off-white/60 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
}
