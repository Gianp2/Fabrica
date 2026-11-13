import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Play, Clock } from 'lucide-react';
import { VIDEO_DEMOS } from '../data/mockData';
import { VideoDemo } from '../types';
import { optimizeImageUrl, getCloudinarySrcSet } from '../utils/imageOptimizer';

interface MediaSectionProps {
  onOpenVideoModal: (video: VideoDemo) => void;
}

export const MediaSection: React.FC<MediaSectionProps> = memo(({ onOpenVideoModal }) => {
  return (
    <section id="multimedia" className="scroll-mt-24 py-16 lg:py-24 bg-[#0A1628] text-white border-b border-white/10 overflow-hidden">
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
            Centro Audiovisual
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
            Demostraciones Operativas en Planta
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Observe nuestros equipos en condiciones reales de trabajo: conformado continuo a 45 m/min, perforación térmica de aceros especiales y plegado de alto tonelaje.
          </p>
        </motion.div>

        {/* Video Grid with Staggered Motion Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {VIDEO_DEMOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              className="group bg-[#10233F] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#168FD1] transition-colors duration-300 shadow-lg"
            >
              {/* Video Thumbnail with Play Button */}
              <div
                onClick={() => onOpenVideoModal(video)}
                className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer"
              >
                <img
                  src={optimizeImageUrl(video.thumbnail, { width: 800 })}
                  srcSet={getCloudinarySrcSet(video.thumbnail, [480, 768, 1024])}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={video.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Center Play Icon with Ambient Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#168FD1]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#168FD1] group-hover:shadow-[#168FD1]/50 transition-all duration-300">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#FFA319]" />
                  <span>{video.duration}</span>
                </div>

                {/* Machine Tag */}
                <div className="absolute top-3 left-3 bg-[#10233F]/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-mono text-[#168FD1] border border-white/10">
                  {video.machineModel}
                </div>
              </div>

              {/* Video Information */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#168FD1] transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenVideoModal(video)}
                  className="pt-2 text-xs font-semibold text-[#168FD1] group-hover:text-white flex items-center gap-1.5 transition-colors self-start"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Reproducir demostración</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});
