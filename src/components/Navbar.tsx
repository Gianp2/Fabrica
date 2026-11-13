import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { COMPANY_CONFIG } from '../data/mockData';
import { useScrollLock } from '../utils/scrollLock';

interface NavbarProps {
  currentView: 'home' | 'catalog' | 'admin';
  onNavigate: (view: 'home' | 'catalog' | 'admin', sectionId?: string) => void;
  isAnyModalOpen: boolean;
  onMobileMenuOpenChange?: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = memo(({ currentView, onNavigate, onMobileMenuOpenChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerNavRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useScrollLock('mobile-nav', mobileMenuOpen);

  useEffect(() => {
    onMobileMenuOpenChange?.(mobileMenuOpen);
  }, [mobileMenuOpen, onMobileMenuOpenChange]);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrolled = window.scrollY > 24;
        setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
      });
    };
    const initialScrolled = window.scrollY > 24;
    setIsScrolled(initialScrolled);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && drawerNavRef.current) {
      drawerNavRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = useCallback(
    (view: 'home' | 'catalog' | 'admin', sectionId?: string) => {
      setMobileMenuOpen(false);
      onNavigate(view, sectionId);
    },
    [onNavigate]
  );

  // Unified glass surface: integrates smoothly with Hero at top of Home and intensifies opacity/glass on scroll or Catalog
  const useElevatedGlass = isScrolled || currentView !== 'home';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-[background-color,padding,border-color,box-shadow,backdrop-filter] duration-300 ease-out ${
          useElevatedGlass
            ? 'bg-[rgba(12,30,55,0.88)] backdrop-blur-[14px] backdrop-saturate-[140%] border-white/[0.11] shadow-[0_8px_28px_rgba(6,16,32,0.28)]'
            : 'bg-[rgba(12,30,55,0.68)] backdrop-blur-[10px] backdrop-saturate-[125%] border-white/[0.06] shadow-none'
        } ${isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-6">
          {/* Brand Zone */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168FD1] rounded-sm shrink-0 cursor-pointer"
            aria-label="Vortex CNC - Inicio"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#168FD1] to-[#2874C7] rounded-sm border border-white/15 flex items-center justify-center font-extrabold text-white text-base sm:text-lg tracking-wider shadow-sm group-hover:brightness-110 group-hover:scale-[1.03] transition-all duration-200">
              V
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-[19px] font-extrabold tracking-[-0.02em] text-white flex items-center gap-1.5">
                VORTEX <span className="text-[#168FD1] font-bold">CNC</span>
              </span>
              <span className="text-[9.5px] uppercase tracking-[0.16em] text-slate-300/85 font-semibold mt-0.5">
                Maquinarias Industriales
              </span>
            </div>
          </button>

          {/* Nav Links: Balanced redistribution across 6 clean items */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] xl:text-sm font-medium text-slate-200/95 tracking-[-0.01em]"
            aria-label="Navegación principal"
          >
            <button
              onClick={() => handleLinkClick('home')}
              aria-current={currentView === 'home' ? 'page' : undefined}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1.5 cursor-pointer ${
                currentView === 'home' ? 'text-white font-semibold' : ''
              }`}
            >
              Inicio
              {currentView === 'home' && (
                <motion.span
                  layoutId={prefersReducedMotion ? undefined : 'activeNavIndicator'}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#168FD1] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
            <button
              onClick={() => handleLinkClick('catalog')}
              aria-current={currentView === 'catalog' ? 'page' : undefined}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1.5 cursor-pointer ${
                currentView === 'catalog' ? 'text-white font-semibold' : ''
              }`}
            >
              Catálogo de Maquinarias
              {currentView === 'catalog' && (
                <motion.span
                  layoutId={prefersReducedMotion ? undefined : 'activeNavIndicator'}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#168FD1] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
            <button
              onClick={() => handleLinkClick('home', 'categorias')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer"
            >
              Líneas de Producción
            </button>
            <button
              onClick={() => handleLinkClick('home', 'sectores')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer"
            >
              Sectores
            </button>
            <button
              onClick={() => handleLinkClick('home', 'empresa')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer"
            >
              Nosotros
            </button>
            <button
              onClick={() => handleLinkClick('home', 'contacto')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Action Zone & Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('home', 'contacto')}
              className="group hidden sm:inline-flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 text-[11px] xl:text-xs font-bold uppercase tracking-[0.07em] text-white bg-[#168FD1] hover:bg-[#1999e0] active:bg-[#0f6ea3] rounded-sm transition-all duration-200 shadow-md shadow-[#168FD1]/20 hover:shadow-lg hover:shadow-[#168FD1]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA319] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Solicitar Cotización</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Compact Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168FD1] cursor-pointer"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay & Panel with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              className="fixed inset-0 z-50 bg-[#0A1628]/80 backdrop-blur-sm cursor-pointer touch-none overscroll-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.1 }
                  : { type: 'spring', damping: 30, stiffness: 300 }
              }
              className="fixed top-0 right-0 z-50 h-[100dvh] max-h-[100dvh] w-full max-w-sm bg-[#10233F] text-white shadow-2xl border-l border-white/10 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
            >
              {/* 1. Drawer Header */}
              <div className="px-5 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#168FD1] to-[#2874C7] rounded-sm border border-white/15 flex items-center justify-center font-extrabold text-white text-base">
                    V
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-extrabold tracking-tight text-lg">
                      VORTEX <span className="text-[#168FD1]">CNC</span>
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-slate-300/80 font-semibold mt-0.5">
                      Maquinarias Industriales
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. Central Navigation (Distributed evenly across available height, scrollable on short screens) */}
              <nav
                ref={drawerNavRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-4 sm:py-6 flex flex-col"
                aria-label="Navegación móvil"
              >
                <div className="my-auto w-full flex flex-col gap-[clamp(0.5rem,2.2dvh,1.25rem)]">
                  {[
                    {
                      label: 'Inicio',
                      isActive: currentView === 'home',
                      onClick: () => handleLinkClick('home'),
                    },
                    {
                      label: 'Catálogo de Maquinarias',
                      isActive: currentView === 'catalog',
                      onClick: () => handleLinkClick('catalog'),
                    },
                    {
                      label: 'Líneas de Producción',
                      isActive: false,
                      onClick: () => handleLinkClick('home', 'categorias'),
                    },
                    {
                      label: 'Sectores de Aplicación',
                      isActive: false,
                      onClick: () => handleLinkClick('home', 'sectores'),
                    },
                    {
                      label: 'Nosotros',
                      isActive: false,
                      onClick: () => handleLinkClick('home', 'empresa'),
                    },
                    {
                      label: 'Contacto Directo',
                      isActive: false,
                      onClick: () => handleLinkClick('home', 'contacto'),
                    },
                  ].map((item, idx) => (
                    <motion.button
                      key={item.label}
                      onClick={item.onClick}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.24,
                        delay: prefersReducedMotion ? 0 : 0.05 + idx * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`group w-full text-left px-4 py-3 rounded-sm text-sm sm:text-[15px] font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        item.isActive
                          ? 'bg-[#168FD1] text-white font-semibold shadow-sm shadow-[#168FD1]/25'
                          : 'text-slate-200 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06]'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          item.isActive
                            ? 'text-white/90'
                            : 'text-slate-400 group-hover:text-white group-hover:translate-x-0.5'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </nav>

              {/* 3. Bottom Contact & CTA (Respects safe-area-inset-bottom) */}
              <div className="px-5 sm:px-6 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] border-t border-white/10 bg-[#0A1628]/70 space-y-3.5 shrink-0">
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-[#168FD1] shrink-0" />
                    <span className="truncate">{COMPANY_CONFIG.phoneSales}</span>
                  </div>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="truncate">WhatsApp: {COMPANY_CONFIG.whatsappSales}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleLinkClick('home', 'contacto')}
                  className="w-full py-3 px-4 bg-[#168FD1] hover:bg-[#1999e0] active:bg-[#0f6ea3] text-white font-bold text-xs sm:text-sm rounded-sm shadow flex items-center justify-center gap-2 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <span>Solicitar Cotización</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});
