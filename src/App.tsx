/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroCinematic } from './components/HeroCinematic';
import { FeaturedProducts } from './components/FeaturedProducts';
import { MachineryCategories } from './components/MachineryCategories';
import { ApplicationSectors } from './components/ApplicationSectors';
import { AboutCompany } from './components/AboutCompany';
import { MediaSection } from './components/MediaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { StorageService } from './services/storageService';
import { Product, ProductCategory, VideoDemo } from './types';

// Code-split secondary routes and heavy modals so the landing bundle stays minimal
const CatalogPage = lazy(() =>
  import('./views/CatalogPage').then((m) => ({ default: m.CatalogPage }))
);
const AdminPanel = lazy(() =>
  import('./views/AdminPanel').then((m) => ({ default: m.AdminPanel }))
);
const ProductDetailModal = lazy(() =>
  import('./components/ProductDetailModal').then((m) => ({ default: m.ProductDetailModal }))
);
const VideoModal = lazy(() =>
  import('./components/VideoModal').then((m) => ({ default: m.VideoModal }))
);

const ViewFallback = () => (
  <div className="min-h-screen bg-slate-50 pt-24 flex items-start justify-center">
    <div className="w-6 h-6 border-2 border-[#168FD1] border-t-transparent rounded-full animate-spin mt-16" />
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoDemo | null>(null);
  const [preSelectedQuoteCode, setPreSelectedQuoteCode] = useState<string | undefined>(undefined);
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [catalogSectorFilter, setCatalogSectorFilter] = useState<string>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const pendingSectionScrollRef = useRef<string | undefined>(undefined);
  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;

  // Listen to popstate or hash for deep links and browser back/forward
  useEffect(() => {
    const syncRouteFromLocation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'catalogo') {
        setCurrentView('catalog');
      } else if (hash === 'admin') {
        setCurrentView('admin');
      } else if (hash.startsWith('producto/')) {
        const code = hash.replace('producto/', '');
        const found = StorageService.getProductById(code);
        if (found) setSelectedProduct(found);
      } else {
        setCurrentView('home');
      }
    };
    syncRouteFromLocation();
    window.addEventListener('hashchange', syncRouteFromLocation);
    window.addEventListener('popstate', syncRouteFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncRouteFromLocation);
      window.removeEventListener('popstate', syncRouteFromLocation);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const header = document.querySelector('header');
    const navHeight = header ? header.getBoundingClientRect().height : 72;
    const heading = el.querySelector('h2') || el;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const headingTop = heading.getBoundingClientRect().top + window.scrollY;

    // Frame the section heading comfortably right beneath the sticky navbar without exposing the prior section
    const desiredTopPadding = 56;
    const targetByHeading = headingTop - navHeight - desiredTopPadding;
    const targetBySection = sectionTop - navHeight;
    const targetY = Math.max(
      0,
      Math.max(targetBySection, Math.min(targetByHeading, sectionTop + 48 - navHeight))
    );

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  // Ensure every view change opens cleanly at the top for reading (unless targeting a specific section)
  useLayoutEffect(() => {
    if (currentView === 'home' && pendingSectionScrollRef.current) {
      const targetId = pendingSectionScrollRef.current;
      pendingSectionScrollRef.current = undefined;
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        scrollToSection(targetId);
      }, 70);
      return () => clearTimeout(timer);
    }
    pendingSectionScrollRef.current = undefined;
    window.scrollTo(0, 0);
    return undefined;
  }, [currentView, scrollToSection]);

  const handleNavigate = useCallback(
    (view: 'home' | 'catalog' | 'admin', sectionId?: string) => {
      const activeView = currentViewRef.current;
      if (view === 'home') {
        window.history.pushState(null, '', '/');
        if (sectionId) {
          if (activeView === 'home') {
            setTimeout(() => {
              scrollToSection(sectionId);
            }, 60);
          } else {
            pendingSectionScrollRef.current = sectionId;
            setCurrentView('home');
          }
        } else {
          pendingSectionScrollRef.current = undefined;
          if (activeView === 'home') {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
          } else {
            setCurrentView('home');
          }
        }
      } else if (view === 'catalog') {
        window.history.pushState(null, '', '#catalogo');
        if (activeView === 'catalog') {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50);
        } else {
          setCurrentView('catalog');
          window.scrollTo(0, 0);
        }
      } else if (view === 'admin') {
        window.history.pushState(null, '', '#admin');
        setCurrentView('admin');
        window.scrollTo(0, 0);
      }
    },
    [scrollToSection]
  );

  const handleReturnFromAdmin = useCallback(() => {
    setProducts(StorageService.getProducts());
    handleNavigate('home');
  }, [handleNavigate]);

  const handleExploreCatalog = useCallback(() => {
    handleNavigate('catalog');
  }, [handleNavigate]);

  const handleSelectMachineFromHero = useCallback(
    (code: string) => {
      const found = StorageService.getProductById(code);
      if (found) {
        setSelectedProduct(found);
      } else {
        handleNavigate('catalog');
      }
    },
    [handleNavigate]
  );

  const handleCategoryClick = useCallback((cat: ProductCategory) => {
    setCatalogCategoryFilter(cat);
    setCatalogSectorFilter('all');
    window.history.pushState(null, '', '#catalogo');
    setCurrentView('catalog');
    window.scrollTo(0, 0);
  }, []);

  const handleSectorClick = useCallback((sectorName: string) => {
    setCatalogSectorFilter(sectorName);
    setCatalogCategoryFilter('all');
    window.history.pushState(null, '', '#catalogo');
    setCurrentView('catalog');
    window.scrollTo(0, 0);
  }, []);

  const handleRequestQuote = useCallback(
    (productCode: string) => {
      setPreSelectedQuoteCode(productCode);
      handleNavigate('home', 'contacto');
    },
    [handleNavigate]
  );

  const handleCloseProduct = useCallback(() => setSelectedProduct(null), []);
  const handleCloseVideo = useCallback(() => setSelectedVideo(null), []);

  const isAnyModalOpen =
    selectedProduct !== null ||
    selectedVideo !== null ||
    isMobileMenuOpen ||
    (currentView === 'catalog' && isFilterSheetOpen);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-[#168FD1] selection:text-white">
        {/* Admin Panel View (Lazy-loaded only when accessed) */}
        {currentView === 'admin' ? (
          <Suspense fallback={<ViewFallback />}>
            <AdminPanel onReturnToSite={handleReturnFromAdmin} />
          </Suspense>
        ) : (
          <>
            {/* Top Navbar */}
            <Navbar
              currentView={currentView}
              onNavigate={handleNavigate}
              isAnyModalOpen={isAnyModalOpen}
              onMobileMenuOpenChange={setIsMobileMenuOpen}
            />

            {/* Main Content Area */}
            <main className="flex-1">
              {currentView === 'home' && (
                <>
                  {/* 1. Hero Cinematográfico (Priority Maximum) */}
                  <HeroCinematic
                    onSelectMachine={handleSelectMachineFromHero}
                    onExploreCatalog={handleExploreCatalog}
                  />

                  {/* 2. Featured Machinery */}
                  <FeaturedProducts
                    products={products}
                    onOpenProduct={setSelectedProduct}
                    onExploreCatalog={handleExploreCatalog}
                  />

                  {/* 3. Machinery Categories */}
                  <MachineryCategories onSelectCategory={handleCategoryClick} />

                  {/* 4. Application Sectors (Horizontal draggable carousel) */}
                  <ApplicationSectors onSelectSector={handleSectorClick} />

                  {/* 5. About Vortex CNC & Industrial Facility */}
                  <AboutCompany />

                  {/* 6. Audiovisual Demonstrations */}
                  <MediaSection onOpenVideoModal={setSelectedVideo} />

                  {/* 7. Contact & Quote Consultation Form */}
                  <ContactSection preSelectedProductCode={preSelectedQuoteCode} />
                </>
              )}

              {currentView === 'catalog' && (
                <Suspense fallback={<ViewFallback />}>
                  <CatalogPage
                    products={products}
                    initialCategory={catalogCategoryFilter}
                    initialSector={catalogSectorFilter}
                    onOpenProduct={setSelectedProduct}
                    onRequestQuote={handleRequestQuote}
                    onFilterSheetOpenChange={setIsFilterSheetOpen}
                  />
                </Suspense>
              )}

              {/* Floating WhatsApp Quick Action Button (Sticky inside main so it docks cleanly above Footer) */}
              <FloatingWhatsApp
                isVisible={!isAnyModalOpen}
                isHomeView={currentView === 'home'}
                prefilledText={
                  selectedProduct
                    ? `Hola Vortex CNC, deseo consultar cotización y ficha técnica del equipo ${selectedProduct.name} (Código: ${selectedProduct.code}).`
                    : 'Hola Vortex CNC, deseo información y cotización técnica sobre maquinarias industriales.'
                }
              />
            </main>

            {/* Compact Corporate Footer with Discrete Admin Link */}
            <Footer onNavigate={handleNavigate} />

            {/* Product Detail Modal (Lazy-loaded on demand) */}
            <Suspense fallback={null}>
              <AnimatePresence>
                {selectedProduct && (
                  <ProductDetailModal
                    key="product-detail-modal"
                    product={selectedProduct}
                    onClose={handleCloseProduct}
                    onSelectProduct={setSelectedProduct}
                    onRequestQuote={handleRequestQuote}
                  />
                )}
              </AnimatePresence>
            </Suspense>

            {/* Video Demonstration Modal (Lazy-loaded on demand) */}
            <Suspense fallback={null}>
              <AnimatePresence>
                {selectedVideo && (
                  <VideoModal
                    key="video-demo-modal"
                    video={selectedVideo}
                    onClose={handleCloseVideo}
                  />
                )}
              </AnimatePresence>
            </Suspense>
          </>
        )}
      </div>
    </MotionConfig>
  );
}
