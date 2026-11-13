import React, { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { optimizeImageUrl, getCloudinarySrcSet } from '../utils/imageOptimizer';

interface FeaturedProductsProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onExploreCatalog: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = memo(({
  products,
  onOpenProduct,
  onExploreCatalog,
}) => {
  const featuredList = useMemo(
    () => products.filter((p) => p.featured).slice(0, 3),
    [products]
  );

  return (
    <section id="productos" className="scroll-mt-24 py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div className="max-w-xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168FD1]">
              Maquinaria Destacada
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              Equipos de Alto Rendimiento
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Líneas completas diseñadas para ciclos continuos de trabajo y máxima precisión geométrica en perfilado y corte.
            </p>
          </div>

          <button
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#168FD1] hover:text-[#0f6ea3] transition-colors whitespace-nowrap self-start sm:self-end group cursor-pointer"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Featured Products Grid with Staggered Motion Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              onClick={() => onOpenProduct(product)}
              className="group cursor-pointer bg-white border border-slate-200/90 rounded-sm overflow-hidden h-full flex flex-col justify-between hover:border-[#168FD1]/60 hover:shadow-xl transition-all duration-300"
            >
              {/* Product Photography */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden shrink-0">
                <img
                  src={optimizeImageUrl(product.image, { width: 800 })}
                  srcSet={getCloudinarySrcSet(product.image, [480, 800])}
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

              {/* Card Content */}
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
          ))}
        </div>

      </div>
    </section>
  );
});
