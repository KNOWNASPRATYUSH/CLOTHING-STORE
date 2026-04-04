import { MetadataRoute } from 'next';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://luxnoir.fashion';

  // Base routes
  const routes = [
    '',
    '/shop',
    '/cart',
    '/about',
    '/contact',
    '/sustainability',
    '/size-guide',
    '/privacy',
    '/terms',
    '/shipping',
    '/returns',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...routes, ...productEntries];
}
