import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import RootLayoutClient from './RootLayoutClient';
import { Providers } from '@/components/layout/Providers';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'LUX NOIR — Premium Fashion',
  description: 'Elevated essentials for the modern wardrobe. Explore the LUX NOIR collection — outerwear, dresses, basics, and accessories crafted with intention.',
  keywords: ['luxury fashion', 'premium clothing', 'designer outerwear', 'LUX NOIR'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
