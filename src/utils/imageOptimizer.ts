/**
 * VORTEX CNC - Image Optimization Utility
 *
 * Prepared for Cloudinary responsive delivery (f_auto, q_auto, width scaling).
 * Passes through local assets and data URLs untouched without altering paths.
 */

export interface ImageOptimizeOptions {
  width?: number;
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:eco' | number;
  format?: 'auto' | 'webp' | 'avif';
}

const CLOUDINARY_UPLOAD_MARKER = '/image/upload/';

// Resolve local src/assets/images/* paths to Vite-bundled asset URLs in production builds
// so <link rel="preload"> in index.html and <img> elements share the exact same hashed URL.
const LOCAL_ASSET_MODULES = import.meta.glob<string>('/src/assets/images/*', {
  eager: true,
  import: 'default',
});

export function isCloudinaryUrl(src: string): boolean {
  return typeof src === 'string' && src.includes('res.cloudinary.com') && src.includes(CLOUDINARY_UPLOAD_MARKER);
}

export function optimizeImageUrl(src: string, options: ImageOptimizeOptions = {}): string {
  if (!src) return src;

  if (src.startsWith('/src/assets/images/') && LOCAL_ASSET_MODULES[src]) {
    return LOCAL_ASSET_MODULES[src];
  }

  if (!isCloudinaryUrl(src)) {
    return src;
  }

  const { width, quality = 'auto', format = 'auto' } = options;
  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width) {
    transforms.push(`w_${width}`, 'c_limit');
  }

  const [prefix, rest] = src.split(CLOUDINARY_UPLOAD_MARKER);
  if (!rest) return src;

  // Avoid duplicating f_auto / q_auto if transformations are already present
  if (rest.startsWith('f_') || rest.startsWith('q_') || rest.startsWith('w_')) {
    return src;
  }

  return `${prefix}${CLOUDINARY_UPLOAD_MARKER}${transforms.join(',')}/${rest}`;
}

export function getCloudinarySrcSet(
  src: string,
  widths: number[] = [480, 800, 1200]
): string | undefined {
  if (!isCloudinaryUrl(src)) {
    return undefined;
  }

  return widths
    .map((w) => `${optimizeImageUrl(src, { width: w })} ${w}w`)
    .join(', ');
}
