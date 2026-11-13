import React, { useEffect, memo } from 'react';
import { motion } from 'motion/react';
import { X, Clock } from 'lucide-react';
import { VideoDemo } from '../types';
import { useScrollLock } from '../utils/scrollLock';
import { optimizeImageUrl } from '../utils/imageOptimizer';

interface VideoModalProps {
  video: VideoDemo | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = memo(({ video, onClose }) => {
  useScrollLock('video-modal', Boolean(video));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, onClose]);

  if (!video) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden touch-none overscroll-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video demostración: ${video.title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 14 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-[#10233F] border border-white/20 rounded-md overflow-hidden shadow-2xl flex flex-col max-h-[92dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-5 py-3.5 bg-[#0A1628] border-b border-white/10 flex items-center justify-between gap-3 text-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-mono bg-[#168FD1] px-2.5 py-0.5 rounded-sm font-semibold shrink-0">
              {video.machineModel}
            </span>
            <h3 className="text-xs sm:text-sm font-bold truncate">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors shrink-0 cursor-pointer"
            aria-label="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-black shrink-0">
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
            <img
              src={optimizeImageUrl(video.thumbnail, { width: 1200 })}
              alt={video.title}
              decoding="async"
              className="w-full h-full object-cover filter brightness-75"
              referrerPolicy="no-referrer"
            />
            {/* Real video demo player overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFA319]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Tiempo de demostración: {video.duration}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-4 sm:px-5 py-3 bg-[#0A1628] border-t border-white/10 flex items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <span className="text-[11px] sm:text-xs truncate">Filmado en Centro de Ensayos Vortex CNC</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});
