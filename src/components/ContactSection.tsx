import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/mockData';

interface ContactSectionProps {
  preSelectedProductCode?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = memo(({ preSelectedProductCode }) => {
  const whatsappText = preSelectedProductCode
    ? `Hola Vortex CNC, deseo solicitar asesoramiento técnico y cotización sobre el equipo código ${preSelectedProductCode}.`
    : 'Hola Vortex CNC, deseo solicitar asesoramiento técnico y cotización comercial.';
  const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section id="contacto" className="scroll-mt-24 py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10 sm:mb-12 space-y-2.5"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#168FD1]">
            Asesoría Comercial & Técnica
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Canales Oficiales de Atención
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Nuestro departamento de ingeniería evalúa sus planos o muestras de perfiles para asesorarlo sobre la línea ideal y su retorno de inversión.
          </p>
        </motion.div>

        {/* Balanced Direct Corporate Contacts Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200/90 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-sm">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-slate-100 rounded text-[#168FD1] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">Ventas & Proyectos</span>
                <a
                  href={`tel:${COMPANY_CONFIG.phoneSales.replace(/\s+/g, '')}`}
                  className="font-semibold text-slate-800 hover:text-[#168FD1] transition-colors block"
                >
                  {COMPANY_CONFIG.phoneSales}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-slate-100 rounded text-[#168FD1] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">Correo Electrónico</span>
                <a
                  href={`mailto:${COMPANY_CONFIG.emailSales}`}
                  className="font-semibold text-[#168FD1] hover:underline break-all"
                >
                  {COMPANY_CONFIG.emailSales}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-slate-100 rounded text-[#168FD1] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">Planta Industrial & Showroom</span>
                <span className="text-slate-700 leading-snug block text-xs sm:text-sm">{COMPANY_CONFIG.plantAddress}</span>
                <span className="text-xs text-slate-500 mt-0.5 block">{COMPANY_CONFIG.showroomAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-slate-100 rounded text-[#168FD1] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-slate-500 font-medium block">Horario de Ingeniería</span>
                <span className="text-slate-700 block text-xs sm:text-sm leading-snug">{COMPANY_CONFIG.businessHours}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-sm border border-slate-200">
              <strong className="text-slate-800 font-semibold">Guardia de Repuestos & Servicio Técnico: </strong>
              <span>{COMPANY_CONFIG.technicalResponseTime} con técnicos oficiales en sitio.</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-semibold text-xs rounded-sm shadow-sm tracking-wide uppercase inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors self-start sm:self-auto"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
});
