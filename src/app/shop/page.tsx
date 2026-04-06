'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { View } from '@react-three/drei';
import ProductCard, { ProductCardSkeleton } from '@/components/shop/ProductCard';
import { products, categories, Category } from '@/data/products';

const AmbientLightBeams = lazy(() => import('@/components/3d/AmbientLightBeams'));

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Read URL params
  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat && categories.includes(cat)) setSelectedCategory(cat);
    const sort = searchParams.get('sort');
    if (sort) setSortBy(sort);
    const search = searchParams.get('search');
    if (search) setSearchQuery(search);

    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Filter and sort products
  const filtered = products
    .filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        case 'newest': return parseInt(b.id) - parseInt(a.id);
        default: return 0;
      }
    });

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setPriceRange([0, 2500]);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 2500;

  return (
    <div className="min-h-screen pt-24 bg-off-white text-charcoal relative">
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-50">
        <View className="w-full h-full">
          <Suspense fallback={null}>
            <AmbientLightBeams />
          </Suspense>
        </View>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-b border-subtle">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-stone text-[10px] tracking-widest uppercase mb-4 flex items-center gap-4">
            <span className="inline-block w-8 h-px bg-stone-light" />
            {filtered.length} Pieces
          </p>
          <h1 className="font-display text-5xl md:text-8xl tracking-tight">
            {selectedCategory === 'all' ? 'Collection' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h1>
        </motion.div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-20 z-40 bg-off-white/90 backdrop-blur-md border-b border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 text-[10px] tracking-widest uppercase transition-colors ${filterOpen ? 'text-charcoal font-medium' : 'text-stone hover:text-charcoal'}`}
            >
              <SlidersHorizontal size={14} />
              {filterOpen ? 'Close' : 'Filters'}
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-stone hover:text-charcoal transition-colors"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone text-[10px] tracking-widest uppercase hidden sm:block">Sort by:</span>
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-charcoal text-[10px] tracking-widest uppercase pr-6 outline-none cursor-pointer hover:text-stone transition-colors"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={10} className="absolute right-0 top-0.5 text-stone pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="bg-paper-white overflow-hidden border-t border-subtle"
            >
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] tracking-widest uppercase text-stone px-1">Categories</h4>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left px-4 py-2 text-[10px] tracking-widest uppercase transition-all border-l-2 ${
                          selectedCategory === cat
                            ? 'border-charcoal text-charcoal'
                            : 'border-transparent text-stone hover:text-charcoal'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] tracking-widest uppercase text-stone px-1">Sizes</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-3 text-[10px] uppercase border transition-all ${
                          selectedSizes.includes(size)
                            ? 'border-charcoal text-charcoal'
                            : 'border-subtle text-stone hover:border-stone hover:text-charcoal'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] tracking-widest uppercase text-stone px-1">
                    Price Range: <span className="text-charcoal ml-2">${priceRange[0]} – ${priceRange[1]}</span>
                  </h4>
                  <div className="px-1 pt-4">
                    <input
                      type="range"
                      min={0}
                      max={2500}
                      step={50}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-charcoal"
                    />
                    <div className="flex justify-between mt-3 text-[10px] tracking-widest text-stone">
                      <span>MIN: $0</span>
                      <span>MAX: $2500</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-display text-3xl text-stone mb-6 italic">No pieces found</p>
            <button onClick={clearFilters} className="btn-outline">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-off-white text-stone text-[10px] tracking-widest uppercase animate-pulse">
        Initializing Collection
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
