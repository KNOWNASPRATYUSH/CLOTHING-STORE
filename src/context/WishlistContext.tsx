'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type WishlistContextType = {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lux-noir-wishlist');
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('lux-noir-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id: string) => wishlist.includes(id);
  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
