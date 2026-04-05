'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard, { ProductCardSkeleton } from '@/components/shop/ProductCard';
import { products, categories, Category, Product } from '@/data/products';
import { View, Preload } from '@react-three/drei';
import Brand3D from '@/components/3d/Brand3D';

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
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

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
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
    setPriceRange([0, 1500]);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 1500;

  return (
    <div className="min-h-screen pt-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-b border-white/8 relative overflow-hidden group">
        {/* Subtle 3D Decor */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-40 pointer-events-none transition-opacity duration-700 group-hover:opacity-100">
           <View className="w-full h-full">
             <Suspense fallback={null}>
               <Brand3D />
               <Preload all />
             </Suspense>
           </View>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-gold" />
            {filtered.length} Pieces
          </p>
          <h1 className="font-display text-7xl md:text-8xl text-off-white leading-[0.9]">
            {selectedCategory === 'all' ? 'The Collection' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h1>
        </motion.div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 border-b border-white/8">
        {/* Filter toggle + clear */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone hover:text-off-white transition-colors duration-300"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors duration-300"
            >
              <X size={12} /> Clear All
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-stone text-xs tracking-widest uppercase hidden sm:block">Sort:</label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-off-white text-xs tracking-widest uppercase pr-5 outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-black">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={10} className="absolute right-0 top-1 text-stone pointer-events-none" />
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
            transition={{ duration: 0.4 }}
            className="border-b border-white/8 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categories */}
              <div>
                <h4 className="text-xs tracking-widest uppercase text-stone mb-4">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'border-gold text-gold bg-gold/10'
                          : 'border-white/10 text-stone hover:border-white/30 hover:text-off-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs tracking-widest uppercase text-stone mb-4">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-12 h-10 text-xs uppercase border transition-all duration-300 ${
                        selectedSizes.includes(size)
                          ? 'border-gold text-gold bg-gold/10'
                          : 'border-white/10 text-stone hover:border-white/30 hover:text-off-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs tracking-widest uppercase text-stone mb-4">
                  Price: ${priceRange[0]} – ${priceRange[1]}
                </h4>
                <input
                  type="range"
                  min={0}
                  max={1500}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-gold"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="font-display text-3xl text-stone mb-4">No pieces found</p>
            <button onClick={clearFilters} className="text-gold text-sm tracking-widest uppercase hover:text-gold-light transition-colors duration-300">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center text-stone font-display text-2xl">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
