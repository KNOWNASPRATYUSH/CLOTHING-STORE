import type { Metadata } from 'next';
import './globals.css';
import RootLayoutClient from './RootLayoutClient';
import { Providers } from '@/components/layout/Providers';

export const metadata: Metadata = {
  title: 'LUX NOIR — Premium Fashion',
  description: 'Elevated essentials for the modern wardrobe. Explore the LUX NOIR collection — outerwear, dresses, basics, and accessories crafted with intention.',
  keywords: ['luxury fashion', 'premium clothing', 'designer outerwear', 'LUX NOIR'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
