import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Layers, Zap, Minimize2, Cpu, Wrench } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';
import { ProductCategory } from '../types';
import { optimizeImageUrl } from '../utils/imageOptimizer';

interface MachineryCategoriesProps {
  onSelectCategory: (category: ProductCategory) => void;
}

const getCategoryIcon = (name: string) => {
  switch (name) {
    case 'Layers':
      return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#168FD1]" />;
    case 'Zap':
      return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#168FD1]" />;
    case 'Minimize2':
      return <Minimize2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#168FD1]" />;
    case 'Cpu':
      return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#168FD1]" />;
    default:
      return <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-[#168FD1]" />;
  }
};

export const MachineryCategories: React.FC<MachineryCategoriesProps> = memo(({ onSelectCategory }) => {
  return (
    <section id="categorias" className="scroll-mt-24 py-16 lg:py-24 bg-[#10233F] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10 sm:mb-14 space-y-2.5"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#168FD1]">
            Líneas de Producción
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
            Categorías de Maquinaria Industrial
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Equipamiento robusto diseñado para plantas de conformado continuo, calderería de precisión y talleres de transformación metálica.
          </p>
        </motion.div>

        {/* Categories Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              onClick={() => onSelectCategory(cat.id)}
              className={`group cursor-pointer bg-[#0A1628]/85 border border-white/10 rounded-sm p-6 sm:p-7 flex flex-col justify-between hover:border-[#168FD1] hover:bg-[#0E223D] transition-colors duration-300 relative overflow-hidden shadow-lg ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Subtle background machinery glow */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                <img
                  src={optimizeImageUrl(cat.image, { width: 640 })}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  aria-hidden="true"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-sm group-hover:bg-[#168FD1]/20 group-hover:border-[#168FD1]/40 transition-colors">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">
                      {cat.count} modelos
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-[#168FD1] transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#168FD1] transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
                <span>Ver especificaciones y modelos</span>
                <span className="text-[#168FD1] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explorar línea &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});
