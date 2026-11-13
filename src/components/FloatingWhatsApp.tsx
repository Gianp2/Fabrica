import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/mockData';

interface FloatingWhatsAppProps {
  isVisible: boolean;
  isHomeView: boolean;
  prefilledText?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = memo(({
  isVisible,
  isHomeView,
  prefilledText = 'Hola Vortex CNC, deseo información y cotización sobre maquinarias industriales.',
}) => {
  const [isHeroBottomVisible, setIsHeroBottomVisible] = useState(isHomeView);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Observe Hero & Footer via IntersectionObserver (zero scroll event listeners)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const footerEl = document.querySelector('footer');
    const heroEl = isHomeView ? document.querySelector('main > section:first-child') : null;

    if (!isHomeView) {
      setIsHeroBottomVisible(false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (footerEl && entry.target === footerEl) {
            setIsFooterVisible(entry.isIntersecting);
          }
          if (heroEl && entry.target === heroEl) {
            // Lift slightly above Hero's bottom-right carousel arrows while Hero fills viewport
            setIsHeroBottomVisible(entry.intersectionRatio >= 0.85);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.85],
      }
    );

    if (footerEl) observer.observe(footerEl);
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, [isHomeView]);

  const whatsappUrl = useMemo(
    () => `https://wa.me/${COMPANY_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(prefilledText)}`,
    [prefilledText]
  );

  // Avoid overlapping Hero carousel arrows on Home top, and dock cleanly above Footer via sticky bottom-0
  const bottomPositionClass =
    isHeroBottomVisible && !isFooterVisible
      ? 'bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))]'
      : 'bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]';

  return (
    <div
      className="pointer-events-none sticky bottom-0 z-30 h-0 w-full overflow-visible"
      aria-hidden={!isVisible}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute right-[calc(1rem+env(safe-area-inset-right,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] ${bottomPositionClass} transition-[bottom] duration-300 ease-out pointer-events-auto`}
            aria-label="Atención directa por WhatsApp"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1ca950] text-white w-10 h-10 sm:w-auto sm:h-auto sm:px-3.5 sm:py-2.5 rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.32)] hover:shadow-[0_10px_26px_rgba(37,211,102,0.45)] border border-white/15 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
              title="Consultar por WhatsApp con un asesor técnico"
              aria-label="Consultar por WhatsApp Ventas"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
              <span className="text-xs font-semibold tracking-wide pr-0.5 hidden sm:inline whitespace-nowrap">
                WhatsApp Ventas
              </span>
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
});
