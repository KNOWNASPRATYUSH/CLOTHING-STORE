import type { Metadata } from 'next';
import { Bodoni_Moda, Inter } from 'next/font/google';
import './globals.css';
import RootLayoutClient from './RootLayoutClient';
import { Providers } from '@/components/layout/Providers';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUX NOIR — Premium Fashion',
  description: 'Elevated essentials for the modern wardrobe. Explore the LUX NOIR collection — outerwear, dresses, basics, and accessories crafted with intention.',
  keywords: ['luxury fashion', 'premium clothing', 'designer outerwear', 'LUX NOIR'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
