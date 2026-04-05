import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import RootLayoutClient from './RootLayoutClient';
import { Providers } from '@/components/layout/Providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUX NOIR — Premium Fashion',
  description: 'Elevated essentials for the modern wardrobe. Explore the LUX NOIR collection — outerwear, dresses, basics, and accessories crafted with intention.',
  keywords: ['luxury fashion', 'premium clothing', 'designer outerwear', 'LUX NOIR'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
