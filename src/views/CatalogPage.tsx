import React, { useState, useMemo, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Grid, List, ArrowRight, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES_DATA, SECTORS_DATA } from '../data/mockData';
import { useScrollLock } from '../utils/scrollLock';
import { optimizeImageUrl, getCloudinarySrcSet } from '../utils/imageOptimizer';

interface CatalogPageProps {
  products: Product[];
  initialCategory?: ProductCategory | 'all';
  initialSector?: string;
  onOpenProduct: (product: Product) => void;
  onRequestQuote: (productCode: string) => void;
  onFilterSheetOpenChange?: (isOpen: boolean) => void;
}

interface CatalogCardProps {
  product: Product;
  idx: number;
  onOpenProduct: (product: Product) => void;
}

const CatalogGridCard = memo(({ product, idx, onOpenProduct }: CatalogCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: Math.min(idx, 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
    onClick={() => onOpenProduct(product)}
    className="group cursor-pointer bg-white border border-slate-200/90 rounded-sm overflow-hidden h-full flex flex-col justify-between hover:border-[#168FD1]/60 hover:shadow-xl transition-all duration-300"
  >
    {/* Large Uncrowded Photography */}
    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden shrink-0">
      <img
        src={optimizeImageUrl(product.image, { width: 720 })}
        srcSet={getCloudinarySrcSet(product.image, [480, 720, 960])}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 left-3 bg-[#10233F]/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-mono text-white font-semibold tracking-wide border border-white/10 shadow-sm">
        {product.code}
      </div>
    </div>

    {/* Card Content with Clear Hierarchy */}
    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider truncate">
          {product.categoryName}
        </span>
        <h3 className="text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-[#168FD1] transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed min-h-[2.25rem]">
          {product.description}
        </p>
      </div>

      {/* Single Clean Primary CTA: «Ver detalles» */}
      <div className="pt-3.5 border-t border-slate-100 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenProduct(product);
          }}
          className="w-full py-2.5 px-3.5 bg-slate-900 group-hover:bg-[#168FD1] active:bg-[#0f6ea3] text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Ver detalles</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </motion.div>
));

const CatalogListCard = memo(({ product, idx, onOpenProduct }: CatalogCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: Math.min(idx, 5) * 0.04, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -2, transition: { duration: 0.15 } }}
    onClick={() => onOpenProduct(product)}
    className="group cursor-pointer bg-white border border-slate-200/90 rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center justify-between hover:border-[#168FD1]/70 hover:shadow-md transition-all duration-200"
  >
    <div className="relative w-full sm:w-48 md:w-52 aspect-[16/10] bg-slate-900 rounded-sm overflow-hidden shrink-0">
      <img
        src={optimizeImageUrl(product.image, { width: 480 })}
        srcSet={getCloudinarySrcSet(product.image, [320, 480])}
        sizes="(max-width: 640px) 100vw, 208px"
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        referrerPolicy="no-referrer"
      />
    </div>

    <div className="flex-1 min-w-0 space-y-1.5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
        <span className="font-mono font-bold text-[#168FD1] shrink-0">
          {product.code}
        </span>
        <span className="text-slate-300" aria-hidden="true">·</span>
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider truncate">
          {product.categoryName}
        </span>
      </div>
      <h3 className="text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-[#168FD1] transition-colors leading-snug line-clamp-2 sm:line-clamp-1">
        {product.name}
      </h3>
      <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl leading-relaxed">
        {product.description}
      </p>
    </div>

    <div className="w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenProduct(product);
        }}
        className="w-full sm:w-auto py-2.5 px-4 bg-slate-900 group-hover:bg-[#168FD1] active:bg-[#0f6ea3] text-white text-xs font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm cursor-pointer"
      >
        <span>Ver detalles</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </motion.div>
));

export const CatalogPage: React.FC<CatalogPageProps> = memo(({
  products,
  initialCategory = 'all',
  initialSector = 'all',
  onOpenProduct,
  onFilterSheetOpenChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [selectedSector, setSelectedSector] = useState<string>(initialSector);
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'code-asc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const filterSheetBodyRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;

  useScrollLock('catalog-filter-sheet', filterSheetOpen);

  useEffect(() => {
    onFilterSheetOpenChange?.(filterSheetOpen);
  }, [filterSheetOpen, onFilterSheetOpenChange]);

  // Sync initialCategory / initialSector when props change
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setCurrentPage(1);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSector) {
      setSelectedSector(initialSector);
      setCurrentPage(1);
    }
  }, [initialSector]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset filter bottom sheet scroll to top when opened
  useEffect(() => {
    if (filterSheetOpen && filterSheetBodyRef.current) {
      filterSheetBodyRef.current.scrollTop = 0;
    }
  }, [filterSheetOpen]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Pre-index lowercase search strings & sector strings once per products update (scales cleanly to 100+ items)
  const indexedProducts = useMemo(() => {
    return products.map((product) => ({
      product,
      searchHaystack: `${product.name} ${product.code} ${product.description} ${product.subcategory}`.toLowerCase(),
      sectorLower: product.sector.toLowerCase(),
    }));
  }, [products]);

  const categoryLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of CATEGORIES_DATA) {
      map.set(cat.id, cat.name);
    }
    return map;
  }, []);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    const sectorQuery = selectedSector === 'all' ? '' : selectedSector.toLowerCase();

    const list: Product[] = [];
    for (const entry of indexedProducts) {
      const p = entry.product;
      if (q !== '' && !entry.searchHaystack.includes(q)) continue;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) continue;
      if (
        sectorQuery !== '' &&
        !entry.sectorLower.includes(sectorQuery) &&
        !sectorQuery.includes(entry.sectorLower)
      ) {
        continue;
      }
      list.push(p);
    }

    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'code-asc') {
      list.sort((a, b) => a.code.localeCompare(b.code));
    } else {
      // Default: featured first
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [indexedProducts, debouncedSearch, selectedCategory, selectedSector, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSector !== 'all' ? 1 : 0) +
    (debouncedSearch ? 1 : 0);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearch('');
    setSelectedCategory('all');
    setSelectedSector('all');
    setSortBy('featured');
    setCurrentPage(1);
  }, []);

  return (
    <div className="pt-20 lg:pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. COMPACT CORPORATE HEADER (Refined, no oversized blocks)
           ========================================================================= */}
        <div className="pt-3 pb-6 border-b border-slate-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#168FD1] block mb-1">
                Líneas de Producción
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Catálogo de Maquinarias
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-normal leading-relaxed">
              Equipos de conformado en frío, corte térmico por fibra y plegado CNC de alta precisión.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. MODERN TOOLBAR (Search, Filters, Sorting & View)
           ========================================================================= */}
        <div className="bg-white p-3 sm:p-4 rounded-sm border border-slate-200/90 shadow-sm mb-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input (Always visible, compact, real-time) */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar maquinaria o modelo..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-300 rounded-sm focus:border-[#168FD1] focus:ring-1 focus:ring-[#168FD1] outline-none transition-colors placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button (Opens Bottom Sheet) */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setFilterSheetOpen(true)}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#168FD1]" />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#168FD1] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Mobile View Toggle */}
              <div className="flex items-center border border-slate-200 rounded-sm bg-slate-50 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-sm text-xs transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-[#168FD1]' : 'text-slate-500'
                  }`}
                  aria-label="Vista cuadrícula"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-sm text-xs transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-[#168FD1]' : 'text-slate-500'
                  }`}
                  aria-label="Vista lista"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Filters & Sorter (Organized inline bar) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white text-slate-700 focus:border-[#168FD1] outline-none cursor-pointer"
              >
                <option value="all">Todas las líneas</option>
                {CATEGORIES_DATA.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Sector Dropdown */}
              <select
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white text-slate-700 focus:border-[#168FD1] outline-none cursor-pointer max-w-[190px] truncate"
              >
                <option value="all">Todos los sectores</option>
                {SECTORS_DATA.map((sec) => (
                  <option key={sec.id} value={sec.name}>
                    {sec.name}
                  </option>
                ))}
              </select>

              {/* Sort Order Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white text-slate-700 focus:border-[#168FD1] outline-none cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="code-asc">Código de modelo</option>
              </select>

              {/* Desktop Grid / List Toggle */}
              <div className="flex items-center border border-slate-200 rounded-sm bg-slate-50 p-0.5 ml-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-sm text-xs transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-[#168FD1]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Vista cuadrícula"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-sm text-xs transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-[#168FD1]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Vista lista"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Chips Strip */}
          {activeFiltersCount > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-medium mr-1">Filtros activos:</span>

              {debouncedSearch && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[11px]">
                  <span>"{debouncedSearch}"</span>
                  <button onClick={() => setSearchTerm('')} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[11px]">
                  <span>{categoryLabelMap.get(selectedCategory)}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSector !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[11px]">
                  <span>Sector: {selectedSector}</span>
                  <button onClick={() => setSelectedSector('all')} className="hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-[11px] text-rose-600 hover:underline ml-auto font-medium"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>

        {/* Counter of matching equipment */}
        <div className="flex items-center justify-between mb-5 text-xs text-slate-500">
          <div>
            Mostrando <strong className="text-slate-800">{paginatedProducts.length}</strong> de{' '}
            <strong className="text-slate-800">{filteredProducts.length}</strong> maquinarias disponibles
          </div>
          {totalPages > 1 && (
            <div className="text-[11px] font-mono text-slate-400">
              Página {currentPage} de {totalPages}
            </div>
          )}
        </div>

        {/* =========================================================================
            3. PRODUCT CARDS (Clean, photographic, single CTA «Ver detalles»)
           ========================================================================= */}
        {filteredProducts.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 text-center rounded-sm border border-slate-200/80 shadow-sm my-6 space-y-3"
          >
            <Search className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              No se encontraron maquinarias
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Intente con otro término o restablezca los filtros seleccionados.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-[#168FD1] text-white text-xs font-semibold rounded-sm hover:bg-[#137eb8] transition-colors uppercase tracking-wider"
            >
              Restablecer filtros
            </button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          /* Grid View: 1 col on mobile, 2 on tablet, 3 on desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product, idx) => (
              <CatalogGridCard
                key={product.id}
                product={product}
                idx={idx}
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {paginatedProducts.map((product, idx) => (
              <CatalogListCard
                key={product.id}
                product={product}
                idx={idx}
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>
        )}

        {/* Minimalist Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-1.5">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 text-xs font-semibold rounded-full transition-colors flex items-center justify-center ${
                  currentPage === page
                    ? 'bg-[#168FD1] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
              aria-label="Siguiente página"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* =========================================================================
          4. ELEGANT MOBILE BOTTOM SHEET (Filters Drawer with Motion)
         ========================================================================= */}
      <AnimatePresence>
        {filterSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden overflow-hidden touch-none overscroll-none">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm touch-none"
              onClick={() => setFilterSheetOpen(false)}
              aria-hidden="true"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-h-[85dvh] bg-white rounded-t-xl shadow-2xl z-10 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Filtros de catálogo"
            >
            {/* Drawer Drag Bar & Header */}
            <div className="pt-3 pb-2 px-5 flex flex-col items-center border-b border-slate-100 shrink-0">
              <div className="w-10 h-1 bg-slate-300 rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Filtros de Maquinaria
                </h3>
                <button
                  onClick={() => setFilterSheetOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
                  aria-label="Cerrar panel de filtros"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Content */}
            <div ref={filterSheetBodyRef} className="p-5 overflow-y-auto overscroll-contain touch-pan-y space-y-5 flex-1 text-xs">
              
              {/* Category Filter */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Línea de Maquinaria
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded text-xs flex items-center justify-between transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#168FD1]/10 text-[#168FD1] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Todas las líneas</span>
                    {selectedCategory === 'all' && <Check className="w-4 h-4 text-[#168FD1]" />}
                  </button>

                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded text-xs flex items-center justify-between transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#168FD1]/10 text-[#168FD1] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <Check className="w-4 h-4 text-[#168FD1]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector Filter */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Sector de Aplicación
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded bg-white text-slate-800 focus:border-[#168FD1] outline-none"
                >
                  <option value="all">Todos los sectores</option>
                  {SECTORS_DATA.map((sec) => (
                    <option key={sec.id} value={sec.name}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Ordenar Resultados
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'featured', label: 'Destacados' },
                    { id: 'name-asc', label: 'Nombre A-Z' },
                    { id: 'code-asc', label: 'Por Código' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id as any)}
                      className={`py-2 px-2 text-center rounded border text-xs font-medium transition-colors ${
                        sortBy === s.id
                          ? 'bg-[#168FD1] border-[#168FD1] text-white font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Sheet Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={clearAllFilters}
                className="text-xs text-slate-600 hover:text-rose-600 font-semibold px-2 py-1"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => setFilterSheetOpen(false)}
                className="flex-1 py-2.5 px-4 bg-[#168FD1] hover:bg-[#137eb8] text-white font-bold text-xs rounded uppercase tracking-wider transition-colors"
              >
                Ver resultados ({filteredProducts.length})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    </div>
  );
});
