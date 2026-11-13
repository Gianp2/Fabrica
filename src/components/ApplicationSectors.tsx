import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SECTORS_DATA } from '../data/mockData';
import { SectorItem } from '../types';
import { optimizeImageUrl, getCloudinarySrcSet } from '../utils/imageOptimizer';

interface ApplicationSectorsProps {
  onSelectSector: (sectorName: string) => void;
}

export const ApplicationSectors: React.FC<ApplicationSectorsProps> = memo(({ onSelectSector }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const nextLeft = scrollLeft > 10;
        const nextRight = scrollLeft < scrollWidth - clientWidth - 10;
        const itemWidth = clientWidth * 0.8;
        const nextIdx = Math.min(
          Math.max(Math.round(scrollLeft / (itemWidth || 1)), 0),
          SECTORS_DATA.length - 1
        );

        setCanScrollLeft((prev) => (prev === nextLeft ? prev : nextLeft));
        setCanScrollRight((prev) => (prev === nextRight ? prev : nextRight));
        setActiveIndex((prev) => (prev === nextIdx ? prev : nextIdx));
      }
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollState, { passive: true });
      checkScrollState();
      return () => {
        el.removeEventListener('scroll', checkScrollState);
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
    return undefined;
  }, [checkScrollState]);

  const scrollToIndex = useCallback((idx: number) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[idx] as HTMLElement | undefined;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  }, []);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section id="sectores" className="scroll-mt-24 py-16 lg:py-24 bg-slate-100 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Discrete Circular Desktop Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4"
        >
          <div className="max-w-xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168FD1]">
              Campos de Aplicación
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              Sectores Industriales
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Equipamiento diseñado a medida para industrias que demandan tolerancia geométrica y alta productividad continua.
            </p>
          </div>

          {/* Discrete Circular Controls for Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:border-[#168FD1] hover:text-[#168FD1] text-slate-600 shadow-sm disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168FD1] cursor-pointer"
              aria-label="Sector anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:border-[#168FD1] hover:text-[#168FD1] text-slate-600 shadow-sm disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168FD1] cursor-pointer"
              aria-label="Siguiente sector"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Carousel Track with Peeking Card on Mobile */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SECTORS_DATA.map((sector: SectorItem, idx: number) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -3 }}
              className="snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-[340px] lg:w-[380px] bg-white border border-slate-200/90 rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:border-[#168FD1]/40 transition-shadow duration-200 flex flex-col justify-between group"
            >
              {/* Sector Photography */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={optimizeImageUrl(sector.image, { width: 760 })}
                  srcSet={getCloudinarySrcSet(sector.image, [480, 760])}
                  sizes="(max-width: 640px) 82vw, 380px"
                  alt={sector.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FFA319] block">
                    {sector.subtitle}
                  </span>
                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {sector.name}
                  </h3>
                </div>
              </div>

              {/* Simplified Sector Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {sector.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectSector(sector.name)}
                    className="w-full py-2 px-3 bg-slate-50 hover:bg-[#168FD1] hover:text-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-sm transition-colors flex items-center justify-between cursor-pointer group/btn"
                  >
                    <span>Ver maquinarias</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimalist Carousel Dots Indicator */}
        <div className="mt-4 flex items-center justify-center gap-1.5 sm:hidden">
          {SECTORS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === idx ? 'w-6 bg-[#168FD1]' : 'w-1.5 bg-slate-300'
              }`}
              aria-label={`Ir a sector ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
});
