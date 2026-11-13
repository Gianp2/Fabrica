import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/mockData';
import { optimizeImageUrl, getCloudinarySrcSet } from '../utils/imageOptimizer';

export const AboutCompany: React.FC = memo(() => {
  return (
    <section id="empresa" className="scroll-mt-24 py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Industrial Plant Photo with Motion Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-slate-900 shadow-xl border border-slate-200 group">
              <img
                src={optimizeImageUrl('/src/assets/images/industrial_facility_backdrop_1794494882651.jpg', { width: 1000 })}
                srcSet={getCloudinarySrcSet('/src/assets/images/industrial_facility_backdrop_1794494882651.jpg', [600, 900, 1200])}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Planta de Fabricación y Ensayos Vortex CNC"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 sm:p-4 bg-[#10233F]/90 backdrop-blur-md rounded-sm border border-white/10 text-white">
                <span className="text-[11px] font-semibold text-[#168FD1] uppercase tracking-wider block">
                  Planta Matriz & Centro de Ensayos
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block leading-snug">
                  12.500 m² cubiertos dedicados al montaje y calibración previa de líneas completas
                </span>
              </div>
            </div>

            {/* Subtle experience stamp */}
            <div className="absolute -top-3 -right-3 bg-[#168FD1] text-white p-3.5 rounded-sm shadow-lg text-center hidden sm:block">
              <span className="block text-2xl font-extrabold font-mono leading-none">25+</span>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-1 block">
                Años de Trayectoria
              </span>
            </div>
          </motion.div>

          {/* Right Column: Corporate Prose & Operational Pillars with Motion Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#168FD1] block">
                Nuestra Empresa
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                Ingeniería Mecánica Pesada & Automatización CNC
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              En <strong className="text-slate-900 font-semibold">{COMPANY_CONFIG.companyName}</strong> diseñamos, construimos y ponemos en marcha líneas continuas de perfilado en frío (roll forming), centros de corte láser por fibra óptica y prensas plegadoras de gran porte para la industria metalúrgica continental.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cada equipo se entrega probado en vacío y bajo carga con bobina de acero real en nuestra planta, asegurando tolerancias dimensionales estrictas según normas internacionales antes de su despacho y ensamblado final en obra.
            </p>

            {/* Verified Operational Data with Subtle Counter Lift */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-200">
              <div className="space-y-0.5">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#168FD1] font-mono block">
                  +480
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight block">
                  Líneas activas instaladas
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#168FD1] font-mono block">
                  14
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight block">
                  Países con exportaciones
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#168FD1] font-mono block">
                  48h
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight block">
                  Respuesta técnica en planta
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#168FD1] font-mono block">
                  100%
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-tight block">
                  Repuestos Cr12MoV en stock
                </span>
              </div>
            </div>

            {/* Quality & Standards Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm hover:border-[#168FD1]/40 transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#168FD1] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">Norma ISO 9001:2015</span>
                  <span className="text-slate-500 text-[11px]">Trazabilidad metalográfica y control dimensional por láser.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm hover:border-[#168FD1]/40 transition-colors">
                <Cpu className="w-5 h-5 text-[#168FD1] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">Automatización Siemens & Delem</span>
                  <span className="text-slate-500 text-[11px]">Hardware estándar industrial sin candados propietarios.</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
});
