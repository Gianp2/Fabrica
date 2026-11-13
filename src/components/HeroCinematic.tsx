import React, { useState, useEffect, useRef, memo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_MACHINES } from '../data/mockData';
import { optimizeImageUrl, getCloudinarySrcSet } from '../utils/imageOptimizer';

interface HeroCinematicProps {
  onSelectMachine: (productCode: string) => void;
  onExploreCatalog: () => void;
}

const SLIDE_ATMOSPHERES = [
  {
    backdropPosition: 'object-[56%_50%]',
    accentEdge: 'from-[#168FD1]/35',
  },
  {
    backdropPosition: 'object-[48%_48%]',
    accentEdge: 'from-[#2874C7]/35',
  },
  {
    backdropPosition: 'object-[60%_52%]',
    accentEdge: 'from-[#168FD1]/30',
  },
];

export const HeroCinematic: React.FC<HeroCinematicProps> = memo(({ onSelectMachine }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeMachine = HERO_MACHINES[currentIndex];
  const activeAtmosphere = SLIDE_ATMOSPHERES[currentIndex % SLIDE_ATMOSPHERES.length];

  // Subtle scroll-only depth parallax (no cursor/pointer movement)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 48]);
  const machineParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 20]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 14]);

  // Defer secondary hero slides preloading until browser is idle so slide 01 LCP loads unimpeded
  useEffect(() => {
    const preloadSecondary = () => {
      HERO_MACHINES.slice(1).forEach((machine) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = optimizeImageUrl(machine.image, { width: 1400 });
      });
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void) => number; cancelIdleCallback: (id: number) => void }).requestIdleCallback(preloadSecondary);
      return () => (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
    }

    const timer = setTimeout(preloadSecondary, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Auto carousel rotation with pause-on-interaction
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_MACHINES.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev + 1) % HERO_MACHINES.length);
  };

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev - 1 + HERO_MACHINES.length) % HERO_MACHINES.length);
  };

  const handleSelect = (idx: number) => {
    setIsPaused(true);
    setCurrentIndex(idx);
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[580px] h-[100dvh] max-h-[960px] bg-[#0A1628] text-white flex flex-col justify-between overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Presentación Cinematográfica de Maquinaria Industrial Vortex CNC"
    >
      {/* =========================================================================
          1. SPLIT INDUSTRIAL BACKGROUND
          - Left: Deep industrial corporate blue with diagonal split
          - Right: Darkened manufacturing hall with coordinated subtle transition
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Right / Lower Industrial Facility Backdrop */}
        <motion.div
          style={prefersReducedMotion ? undefined : { y: bgParallaxY }}
          className="absolute right-0 top-[-5%] bottom-[-5%] w-full lg:w-[64%] overflow-hidden"
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={`bg-${activeMachine.code}`}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: easeSmooth }}
              className="absolute inset-0"
            >
              <img
                src={optimizeImageUrl('/src/assets/images/industrial_facility_backdrop_1794494882651.jpg', { width: 1400 })}
                srcSet={getCloudinarySrcSet('/src/assets/images/industrial_facility_backdrop_1794494882651.jpg', [800, 1200, 1600])}
                sizes="(max-width: 1024px) 100vw, 64vw"
                alt=""
                aria-hidden="true"
                decoding="async"
                className={`w-full h-full object-cover ${activeAtmosphere.backdropPosition} filter brightness-[0.24] contrast-115 saturate-75`}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Clean contrast gradients between facility backdrop, diagonal edge, and equipment */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C36] via-[#0A1628]/60 to-[#0A1628]/35 lg:from-[#0D2240]/92 lg:via-[#0A1628]/45 lg:to-[#0A1628]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/70" />
        </motion.div>

        {/* Left Industrial Blue Division (Diagonal Split on Desktop) */}
        <div
          className="
            absolute left-0 top-0 bottom-0 w-full lg:w-[53%]
            bg-gradient-to-b from-[#10233F] via-[#0E2444]/95 to-[#0A1628]/75
            lg:bg-gradient-to-br lg:from-[#10233F] lg:via-[#0E274B] lg:to-[#133A6C]/90
            lg:[clip-path:polygon(0_0,100%_0,86.5%_100%,0_100%)]
            z-10
          "
        >
          {/* Subtle architectural dot texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        {/* Clean Diagonal Architectural Edge Line (Desktop) */}
        <div
          className={`hidden lg:block absolute inset-y-0 left-0 w-[53.15%] z-10 pointer-events-none lg:[clip-path:polygon(99.7%_0,100%_0,86.65%_100%,86.35%_100%)] bg-gradient-to-b ${activeAtmosphere.accentEdge} via-[#168FD1]/15 to-transparent transition-colors duration-700`}
          aria-hidden="true"
        />
      </div>

      {/* Navbar breathing clearance */}
      <div className="h-16 sm:h-20 shrink-0" aria-hidden="true" />

      {/* =========================================================================
          2. FOREGROUND STAGE: STABLE PROTAGONIST MACHINERY + COORDINATED COPY
         ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center py-2 sm:py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-4 items-center w-full">
          {/* Left Column: Coordinated Editorial Typography & Single CTA */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: textParallaxY }}
            className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 z-20"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeMachine.code}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : 0.06,
                    },
                  },
                  exit: {
                    transition: {
                      duration: 0.18,
                    },
                  },
                }}
                className="space-y-2.5 sm:space-y-3.5 lg:space-y-4"
              >
                {/* Corporate Kicker */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: easeSmooth },
                    },
                    exit: {
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : -6,
                      transition: { duration: 0.18 },
                    },
                  }}
                  className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#168FD1]"
                >
                  <span>VORTEX CNC</span>
                  <span className="w-1 h-1 rounded-full bg-[#FFA319]" aria-hidden="true" />
                  <span className="text-slate-300/90">Ingeniería Industrial</span>
                </motion.div>

                {/* Main Commercial Headline: White + Industrial Blue Accent */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: easeSmooth },
                    },
                    exit: {
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : -8,
                      transition: { duration: 0.18 },
                    },
                  }}
                  className="text-[27px] sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[52px] font-extrabold tracking-[-0.025em] text-white leading-[1.09] text-balance"
                >
                  {activeMachine.titleLead}{' '}
                  <span className="text-[#168FD1] block sm:inline">
                    {activeMachine.titleAccent}
                  </span>
                </motion.h1>

                {/* Concise Executive Description */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.42, ease: easeSmooth },
                    },
                    exit: {
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : -6,
                      transition: { duration: 0.18 },
                    },
                  }}
                  className="text-xs sm:text-sm lg:text-[15px] text-slate-200/90 leading-[1.6] max-w-md font-normal line-clamp-2 sm:line-clamp-3"
                >
                  {activeMachine.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Single Primary CTA: «Conocer más» */}
            <div className="pt-0.5 sm:pt-1">
              <button
                onClick={() => onSelectMachine(activeMachine.code)}
                className="group inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#168FD1] hover:bg-[#1999e0] active:bg-[#0f6ea3] text-white font-bold text-xs sm:text-[13px] uppercase tracking-[0.08em] rounded-sm transition-colors duration-200 shadow-lg shadow-[#168FD1]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA319] whitespace-nowrap cursor-pointer"
              >
                <span>Conocer más</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Stable Protagonist Machine (Zero cursor tracking, zero empty transition gaps) */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: machineParallaxY }}
            className="lg:col-span-7 relative flex items-center justify-center lg:justify-end"
          >
            {/* Fixed-proportion stage prevents CLS and eliminates empty gaps during slide crossfade */}
            <div className="relative w-full max-w-[540px] sm:max-w-[660px] lg:max-w-none lg:w-[105%] xl:w-[108%] lg:-mr-5 xl:-mr-10 aspect-[16/10] sm:aspect-[16/9.5] lg:aspect-[16/9.4]">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={activeMachine.code}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 24, scale: 0.98 }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -18, scale: 0.99 }
                  }
                  transition={{ duration: prefersReducedMotion ? 0.15 : 0.55, ease: easeSmooth }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  <div
                    className="relative w-full h-full"
                    style={{
                      WebkitMaskImage:
                        'radial-gradient(ellipse 96% 92% at 52% 50%, #000 72%, rgba(0,0,0,0.75) 86%, transparent 100%)',
                      maskImage:
                        'radial-gradient(ellipse 96% 92% at 52% 50%, #000 72%, rgba(0,0,0,0.75) 86%, transparent 100%)',
                    }}
                  >
                    <img
                      src={optimizeImageUrl(activeMachine.image, { width: 1400 })}
                      srcSet={getCloudinarySrcSet(activeMachine.image, [640, 1024, 1440])}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      alt={activeMachine.name}
                      loading="eager"
                      decoding="async"
                      fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
                      className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.01]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          3. MINIMALIST CINEMATIC CAROUSEL INDICATORS: 01 / 02 / 03
         ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-4 sm:pb-6 lg:pb-8 shrink-0">
        <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-4 sm:gap-6">
          {/* Numbers 01 / 02 / 03 with Active Progress Line */}
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-10">
            {HERO_MACHINES.map((machine, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={machine.code}
                  onClick={() => handleSelect(idx)}
                  className={`group flex items-center gap-2 sm:gap-3 py-1 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#168FD1] cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  aria-label={`Ver equipo ${machine.index}: ${machine.name}`}
                >
                  <span
                    className={`text-sm sm:text-base font-extrabold tracking-tight transition-colors ${
                      isActive ? 'text-[#168FD1]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {machine.index}
                  </span>

                  {isActive && (
                    <div className="w-9 sm:w-14 lg:w-16 h-[2px] bg-white/20 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-[#168FD1]"
                        initial={{ width: prefersReducedMotion || isPaused ? '100%' : '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: prefersReducedMotion || isPaused ? 0 : 6.5,
                          ease: 'linear',
                        }}
                        key={`${currentIndex}-${isPaused ? 'paused' : 'playing'}`}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Minimalist Manual Arrow Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#168FD1]/25 text-slate-300 hover:text-white transition-colors border border-white/10 hover:border-[#168FD1]/50 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#168FD1] cursor-pointer"
              aria-label="Equipo anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#168FD1]/25 text-slate-300 hover:text-white transition-colors border border-white/10 hover:border-[#168FD1]/50 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#168FD1] cursor-pointer"
              aria-label="Siguiente equipo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
