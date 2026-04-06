'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard, { ProductCardSkeleton } from '@/components/shop/ProductCard';
import { products, categories, Category } from '@/data/products';
import { View, Preload } from '@react-three/drei';
import Brand3D from '@/components/3d/Brand3D';
import ScrollReveal from '@/components/effects/ScrollReveal';

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

    // Simulate loading
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
    <div className="min-h-screen pt-24 bg-transparent">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-28 border-b border-white/5 relative overflow-hidden group">
        {/* Subtle 3D Decor */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none transition-opacity duration-1000 group-hover:opacity-60">
           <View className="w-full h-full">
             <Suspense fallback={null}>
               <Brand3D />
               <Preload all />
             </Suspense>
           </View>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10"
        >
          <p className="text-gold text-[10px] tracking-[0.6em] uppercase mb-6 flex items-center gap-4">
            <span className="inline-block w-8 h-px bg-gold/40" />
            {filtered.length} Pieces
          </p>
          <h1 className="font-display text-7xl md:text-[10rem] text-off-white leading-[0.8] tracking-tighter">
            {selectedCategory === 'all' ? (
              <>The <span className="text-gold-gradient italic font-extralight lowercase">Noir</span><br/>Collection</>
            ) : (
              selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
            )}
          </h1>
        </motion.div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-20 z-40 bg-obsidian/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          {/* Filter toggle + clear */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${filterOpen ? 'text-gold' : 'text-stone hover:text-off-white'}`}
            >
              <SlidersHorizontal size={14} className={filterOpen ? 'text-gold' : ''} />
              {filterOpen ? 'Close Filters' : 'Filters'}
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-[9px] tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-stone/40 text-[9px] tracking-widest uppercase hidden sm:block">Sort by:</span>
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-off-white text-[10px] tracking-[0.2em] uppercase pr-6 outline-none cursor-pointer hover:text-gold transition-colors duration-300"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-obsidian">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={10} className="absolute right-0 top-1 text-stone/60 pointer-events-none group-hover:text-gold transition-colors" />
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
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="bg-void/50 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Categories */}
                <div className="space-y-6">
                  <h4 className="text-[10px] tracking-[0.4em] uppercase text-stone/60 px-1">Categories</h4>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left px-4 py-2 text-[11px] tracking-widest uppercase transition-all duration-500 border-l-2 ${
                          selectedCategory === cat
                            ? 'border-gold text-gold bg-gold/5'
                            : 'border-transparent text-stone hover:text-off-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-6">
                  <h4 className="text-[10px] tracking-[0.4em] uppercase text-stone/60 px-1">Sizes</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-3 text-[10px] uppercase border transition-all duration-500 ${
                          selectedSizes.includes(size)
                            ? 'border-gold text-gold bg-gold/5'
                            : 'border-white/5 text-stone hover:border-white/20 hover:text-off-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-6">
                  <h4 className="text-[10px] tracking-[0.4em] uppercase text-stone/60 px-1">
                    Price Range: <span className="text-gold tracking-normal font-normal ml-2">${priceRange[0]} – ${priceRange[1]}</span>
                  </h4>
                  <div className="px-1 pt-4">
                    <input
                      type="range"
                      min={0}
                      max={2500}
                      step={50}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-gold"
                    />
                    <div className="flex justify-between mt-3 text-[9px] tracking-widest text-stone/40">
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
          <ScrollReveal variant="fade">
            <div className="text-center py-40">
              <p className="font-display text-4xl text-stone/40 mb-8 italic">No pieces found in the shadows</p>
              <button 
                onClick={clearFilters} 
                className="group relative px-12 py-4 border border-gold/30 text-gold text-[10px] tracking-[0.6em] uppercase hover:text-obsidian transition-colors duration-700"
              >
                <span className="relative z-10">Reset Filters</span>
                <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-obsidian">
        <div className="w-12 h-px bg-gold/30 mb-8 animate-pulse" />
        <span className="text-stone text-[10px] tracking-[1em] uppercase animate-pulse">Initializing Shop</span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
