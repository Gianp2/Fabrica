import React, { memo } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/mockData';

interface FooterProps {
  onNavigate: (view: 'home' | 'catalog' | 'admin', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = memo(({ onNavigate }) => {
  return (
    <footer className="bg-[#0A1628] text-slate-300 border-t border-white/10 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-8">
        {/* Navegación y Contacto */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-7 md:gap-12 pb-6 sm:pb-8">
          {/* Navegación */}
          <div className="md:max-w-md lg:max-w-lg w-full">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white mb-3">
              Navegación
            </h3>
            <nav aria-label="Navegación del pie de página">
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-2 text-[13px] sm:text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="py-0.5 text-slate-300 hover:text-[#168FD1] transition-colors cursor-pointer text-left"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('catalog')}
                    className="py-0.5 text-slate-300 hover:text-[#168FD1] transition-colors cursor-pointer text-left"
                  >
                    Catálogo
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'categorias')}
                    className="py-0.5 text-slate-300 hover:text-[#168FD1] transition-colors cursor-pointer text-left"
                  >
                    Líneas de Producción
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'sectores')}
                    className="py-0.5 text-slate-300 hover:text-[#168FD1] transition-colors cursor-pointer text-left"
                  >
                    Sectores
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'empresa')}
                    className="py-0.5 text-slate-300 hover:text-[#168FD1] transition-colors cursor-pointer text-left"
                  >
                    Nosotros
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home', 'contacto')}
                    className="py-0.5 text-slate-300 hover:text-[#168FD1] transition-colors cursor-pointer text-left"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contacto */}
          <div className="md:max-w-lg w-full">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white mb-3">
              Contacto
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[13px] sm:text-xs text-slate-300">
              <li className="flex items-center gap-2.5 min-w-0">
                <Phone className="w-3.5 h-3.5 text-[#168FD1] shrink-0" />
                <a
                  href={`tel:${COMPANY_CONFIG.phoneSales.replace(/\s+/g, '')}`}
                  className="font-semibold text-white hover:text-[#168FD1] transition-colors truncate"
                >
                  {COMPANY_CONFIG.phoneSales}
                </a>
              </li>
              <li className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-3.5 h-3.5 text-[#168FD1] shrink-0" />
                <a
                  href={`mailto:${COMPANY_CONFIG.emailSales}`}
                  className="hover:text-[#168FD1] transition-colors truncate"
                >
                  {COMPANY_CONFIG.emailSales}
                </a>
              </li>
              <li className="flex items-start gap-2.5 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-[#168FD1] shrink-0 mt-0.5" />
                <span className="text-slate-300/90 leading-snug">
                  {COMPANY_CONFIG.plantAddress}
                </span>
              </li>
              <li className="flex items-start gap-2.5 min-w-0">
                <Clock className="w-3.5 h-3.5 text-[#168FD1] shrink-0 mt-0.5" />
                <span className="text-slate-300/90 leading-snug">
                  {COMPANY_CONFIG.businessHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Derechos reservados */}
        <div className="w-full text-center pt-5 border-t border-white/10 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
          <span>© 2026 {COMPANY_CONFIG.companyName}. </span>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer underline-offset-2 hover:underline inline"
            title="Acceso administrativo interno"
          >
            Todos los derechos reservados.
          </button>
        </div>
      </div>
    </footer>
  );
});
