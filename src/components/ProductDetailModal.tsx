import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { X, MessageSquare, FileText, ChevronRight, CheckCircle2, Shield, Wrench, Share2, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_CONFIG, PRODUCTS_CATALOG } from '../data/mockData';
import { useScrollLock } from '../utils/scrollLock';
import { optimizeImageUrl, getCloudinarySrcSet } from '../utils/imageOptimizer';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (productCode: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = memo(({
  product,
  onClose,
  onSelectProduct,
  onRequestQuote
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'application' | 'warranty'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [history, setHistory] = useState<Product[]>([]);
  const isInternalNavRef = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useScrollLock('product-detail-modal', Boolean(product));

  useEffect(() => {
    setActiveImageIndex(0);
    setActiveTab('specs');
    if (!isInternalNavRef.current) {
      setHistory([]);
    }
    isInternalNavRef.current = false;

    if (product && bodyRef.current) {
      bodyRef.current.scrollTop = 0;
      requestAnimationFrame(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTop = 0;
        }
      });
    }
  }, [product]);

  const handleSelectRelated = useCallback(
    (rel: Product) => {
      if (product) {
        isInternalNavRef.current = true;
        setHistory((prev) => [...prev, product]);
      }
      onSelectProduct(rel);
    },
    [product, onSelectProduct]
  );

  const handleGoBack = useCallback(() => {
    if (history.length === 0) return;
    const previousProduct = history[history.length - 1];
    isInternalNavRef.current = true;
    setHistory((prev) => prev.slice(0, -1));
    onSelectProduct(previousProduct);
  }, [history, onSelectProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  const whatsappUrl = useMemo(() => {
    if (!product) return '';
    const whatsappMessage = encodeURIComponent(
      `Hola Vortex CNC, deseo consultar cotización y disponibilidad técnica del equipo ${product.name} (Código: ${product.code}).`
    );
    return `https://wa.me/${COMPANY_CONFIG.whatsappNumberDigits}?text=${whatsappMessage}`;
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS_CATALOG.filter(
      (p) => p.id !== product.id && (p.category === product.category || p.sector === product.sector)
    ).slice(0, 3);
  }, [product]);

  const images = useMemo(() => {
    if (!product) return [];
    return product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  }, [product]);

  const handleShare = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  }, []);

  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-sm overflow-hidden touch-none overscroll-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Ficha Técnica: ${product.name}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl bg-white rounded-md shadow-2xl border border-slate-200 overflow-hidden max-h-[92dvh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-[#10233F] text-white flex items-center justify-between gap-3 shrink-0 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {history.length > 0 && (
              <button
                onClick={handleGoBack}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-white/10 hover:bg-[#168FD1] text-white rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                aria-label="Volver a la máquina anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                <span>Volver</span>
              </button>
            )}
            <span className="text-xs font-mono font-bold bg-[#168FD1] px-2.5 py-1 rounded-sm text-white shrink-0 tracking-wide">
              {product.code}
            </span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline truncate">
              {product.categoryName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {copiedLink && (
              <span className="text-[11px] text-[#FFA319] font-medium mr-1 whitespace-nowrap">¡Copiado!</span>
            )}
            <button
              onClick={handleShare}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Copiar enlace"
              aria-label="Copiar enlace de la ficha"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              aria-label="Cerrar ficha técnica"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div
          ref={bodyRef}
          className="overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-6 lg:p-7 space-y-6 sm:space-y-8 flex-1 min-h-0"
        >
          
          {/* Top Split: Gallery & Commercial Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] bg-slate-900 rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={optimizeImageUrl(images[activeImageIndex] || product.image, { width: 1200 })}
                  srcSet={getCloudinarySrcSet(images[activeImageIndex] || product.image, [640, 1024, 1440])}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  alt={product.name}
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-sm border border-white/10">
                  Foto {activeImageIndex + 1} de {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 sm:w-20 h-11 sm:h-14 rounded-sm overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#168FD1] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Ver foto ${idx + 1} de ${product.name}`}
                    >
                      <img
                        src={optimizeImageUrl(img, { width: 200 })}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview & Direct Actions */}
            <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-[#168FD1] uppercase tracking-wider">
                  {product.sector}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight tracking-tight text-balance">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug pt-0.5">
                  {product.tagline}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {product.description}
                </p>
              </div>

              {/* Lead Time & Status Strip */}
              <div className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs divide-y divide-slate-200/80">
                <div className="flex items-center justify-between gap-3 py-1.5">
                  <span className="text-slate-500 font-medium">Plazo estimado</span>
                  <strong className="text-slate-900 font-semibold text-right">{product.productionLeadTime}</strong>
                </div>
                <div className="flex items-center justify-between gap-3 py-1.5">
                  <span className="text-slate-500 font-medium">Puesta en marcha</span>
                  <span className="text-emerald-700 font-semibold text-right">Técnicos oficiales en sitio</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Quote Request */}
              <div className="space-y-2.5 pt-0.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-semibold text-xs sm:text-[13px] rounded-sm shadow-sm flex items-center justify-center gap-2 transition-colors uppercase tracking-wide text-center leading-tight"
                >
                  <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                  <span>Consultar por WhatsApp con Código</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onRequestQuote(product.code);
                  }}
                  className="w-full py-3 px-4 bg-[#168FD1] hover:bg-[#137eb8] active:bg-[#0f6ea3] text-white font-semibold text-xs sm:text-[13px] rounded-sm shadow-sm flex items-center justify-center gap-2 transition-colors uppercase tracking-wide text-center leading-tight cursor-pointer"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Pedir Cotización Formal</span>
                </button>
              </div>
            </div>

          </div>

          {/* Technical Tabs */}
          <div className="border-t border-slate-200 pt-6">
            <div
              role="tablist"
              aria-label="Información técnica del equipo"
              className="flex items-center gap-5 sm:gap-7 border-b border-slate-200 mb-5 text-xs font-semibold uppercase tracking-wider overflow-x-auto scrollbar-none"
            >
              <button
                role="tab"
                aria-selected={activeTab === 'specs'}
                onClick={() => setActiveTab('specs')}
                className={`py-2.5 transition-colors whitespace-nowrap shrink-0 relative cursor-pointer ${
                  activeTab === 'specs' ? 'text-[#168FD1] font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Especificaciones Técnicas
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#168FD1]" />
                )}
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'application'}
                onClick={() => setActiveTab('application')}
                className={`py-2.5 transition-colors whitespace-nowrap shrink-0 relative cursor-pointer ${
                  activeTab === 'application' ? 'text-[#168FD1] font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Campos de Aplicación
                {activeTab === 'application' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#168FD1]" />
                )}
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'warranty'}
                onClick={() => setActiveTab('warranty')}
                className={`py-2.5 transition-colors whitespace-nowrap shrink-0 relative cursor-pointer ${
                  activeTab === 'warranty' ? 'text-[#168FD1] font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Garantía y Postventa
                {activeTab === 'warranty' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#168FD1]" />
                )}
              </button>
            </div>

            {/* Tab 1: Technical Specs List (Responsive 1-col stacked on mobile, 2-col aligned on tablet/desktop; zero horizontal scroll) */}
            {activeTab === 'specs' && (
              <dl className="bg-white border border-slate-200 rounded-sm divide-y divide-slate-200 overflow-hidden">
                {product.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 text-xs items-baseline ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/75'
                    }`}
                  >
                    <dt className="sm:col-span-5 md:col-span-4 font-semibold text-slate-600 leading-relaxed">
                      {item.label}
                    </dt>
                    <dd className="sm:col-span-7 md:col-span-8 text-slate-900 font-medium font-mono leading-relaxed break-words">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Tab 2: Application Details */}
            {activeTab === 'application' && (
              <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-sm text-xs sm:text-[13px] text-slate-700 space-y-2.5 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Destinado a procesos industriales de alta exigencia:
                </p>
                <p>{product.application}</p>
                <p className="text-xs text-slate-500 pt-1 border-t border-slate-200/70">
                  Apto para bobinas de acero con recubrimiento de zinc Z100 a Z275, acero aluminizado, chapa galvanizada prepintada al horno y aceros estructurales según normas ASTM y UNE.
                </p>
              </div>
            )}

            {/* Tab 3: Warranty and After-Sales */}
            {activeTab === 'warranty' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-xs text-slate-700">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#168FD1] shrink-0" />
                    <strong className="text-slate-900">Garantía Estructural</strong>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    24 meses de garantía escrita contra defectos de mecanizado o fatiga de materiales.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#168FD1] shrink-0" />
                    <strong className="text-slate-900">Puesta en Marcha</strong>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Calibración, nivelación láser y capacitación de operarios a cargo de ingenieros matriculados.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#168FD1] shrink-0" />
                    <strong className="text-slate-900">Repuestos Disponibles</strong>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Despacho inmediato de rodillos, cuchillas y componentes eléctricos Siemens.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Machinery */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-slate-200 pt-6 pb-1">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 mb-3.5">
                Equipos Relacionados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => handleSelectRelated(rel)}
                    className="group cursor-pointer bg-slate-50 border border-slate-200 rounded-sm overflow-hidden hover:border-[#168FD1] hover:bg-white hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden shrink-0">
                      <img
                        src={optimizeImageUrl(rel.image, { width: 500 })}
                        srcSet={getCloudinarySrcSet(rel.image, [320, 480, 640])}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        alt={rel.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#168FD1] font-bold block tracking-wide">
                          {rel.code}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#168FD1] transition-colors leading-snug line-clamp-2 min-h-[2rem]">
                          {rel.name}
                        </h4>
                      </div>
                      <div className="pt-2 border-t border-slate-200/70 text-[11px] font-semibold text-slate-500 group-hover:text-[#168FD1] flex items-center justify-between transition-colors">
                        <span>Ver ficha</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar: STRICTLY ONE SINGLE ROW ("EN UN RENGLÓN") */}
        <div className="py-3 px-4 sm:px-6 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          {history.length > 0 ? (
            <button
              onClick={handleGoBack}
              className="px-3.5 sm:px-4 py-2 bg-white hover:bg-slate-200/80 text-slate-700 border border-slate-300 font-semibold text-xs rounded-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Volver atrás</span>
            </button>
          ) : (
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap truncate">
              Asesoramiento técnico
            </span>
          )}
          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-2 bg-slate-900 hover:bg-[#168FD1] active:bg-[#0f6ea3] text-white font-semibold text-xs rounded-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168FD1] cursor-pointer"
          >
            <X className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Cerrar ficha</span>
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
});
