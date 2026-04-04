'use client';

import Link from 'next/link';

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
  return (
    <footer className="border-t border-white/8 bg-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: Brand + Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-2xl text-off-white tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300">
              LUX NOIR
            </Link>
            <p className="mt-4 text-stone text-sm leading-relaxed max-w-xs">
              Elevated essentials for the modern wardrobe. Crafted with intention. Worn with purpose.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-stone hover:text-gold transition-colors duration-300" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="text-stone hover:text-gold transition-colors duration-300" aria-label="Twitter / X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs tracking-widest uppercase text-stone mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-stone-light text-sm hover:text-off-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl text-off-white">Join the Inner Circle</p>
            <p className="text-stone text-sm mt-1">Receive exclusive access to new collections and private events.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-0 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="Your email"
              className="bg-charcoal border border-white/10 text-off-white placeholder:text-stone px-4 py-3 text-sm flex-1 md:w-64 outline-none focus:border-gold transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-gold text-black px-6 py-3 text-xs tracking-widest uppercase font-body hover:bg-gold-light transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone text-xs">
            © {new Date().getFullYear()} LUX NOIR. All rights reserved. This is a showcase project.
          </p>
          <p className="text-stone/50 text-xs">
            Payments are disabled — For demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
