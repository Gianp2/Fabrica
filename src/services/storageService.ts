/**
 * VORTEX CNC - Storage & Data Repository Service
 *
 * Modular architectural layer prepared for future direct integration
 * with Firebase Firestore and Cloudinary asset management.
 * Includes in-memory caching + O(1) index lookups to avoid repeated JSON.parse calls.
 */

import { Product, QuoteRequest, CompanySettings, VideoDemo } from '../types';
import { PRODUCTS_CATALOG, INITIAL_QUOTES, COMPANY_CONFIG, VIDEO_DEMOS } from '../data/mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'vortex_products_v1',
  QUOTES: 'vortex_quotes_v1',
  SETTINGS: 'vortex_settings_v1',
  VIDEOS: 'vortex_videos_v1',
};

let productsCache: Product[] | null = null;
let productsIndexCache: Map<string, Product> | null = null;
let quotesCache: QuoteRequest[] | null = null;
let settingsCache: CompanySettings | null = null;
let videosCache: VideoDemo[] | null = null;

function buildProductIndex(products: Product[]): Map<string, Product> {
  const index = new Map<string, Product>();
  for (const p of products) {
    index.set(p.id, p);
    index.set(p.code.toLowerCase(), p);
  }
  return index;
}

export class StorageService {
  /**
   * Get all products (cached in memory after initial read)
   * Prepared for: getDocs(collection(db, 'products'))
   */
  static getProducts(): Product[] {
    if (productsCache) {
      return productsCache;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        productsCache = JSON.parse(stored) as Product[];
        productsIndexCache = buildProductIndex(productsCache);
        return productsCache;
      }
    } catch {
      // Fallback to catalog seed
    }
    productsCache = PRODUCTS_CATALOG;
    productsIndexCache = buildProductIndex(productsCache);
    return productsCache;
  }

  /**
   * Get product by ID or Code in O(1)
   */
  static getProductById(idOrCode: string): Product | undefined {
    if (!productsIndexCache) {
      this.getProducts();
    }
    return productsIndexCache?.get(idOrCode) ?? productsIndexCache?.get(idOrCode.toLowerCase());
  }

  /**
   * Save / Create a new product
   * Prepared for: addDoc(collection(db, 'products'), product)
   */
  static saveProduct(product: Product): Product[] {
    const products = this.getProducts();
    const existingIndex = products.findIndex((p) => p.id === product.id);
    let updated: Product[];

    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = product;
    } else {
      updated = [product, ...products];
    }

    productsCache = updated;
    productsIndexCache = buildProductIndex(updated);

    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    } catch {
      // ignore quota errors
    }
    return updated;
  }

  /**
   * Delete product
   * Prepared for: deleteDoc(doc(db, 'products', id))
   */
  static deleteProduct(productId: string): Product[] {
    const updated = this.getProducts().filter((p) => p.id !== productId);
    productsCache = updated;
    productsIndexCache = buildProductIndex(updated);

    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return updated;
  }

  /**
   * Get all quote requests (cached in memory)
   * Prepared for: getDocs(query(collection(db, 'quote_requests'), orderBy('date', 'desc')))
   */
  static getQuoteRequests(): QuoteRequest[] {
    if (quotesCache) {
      return quotesCache;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUOTES);
      if (stored) {
        quotesCache = JSON.parse(stored) as QuoteRequest[];
        return quotesCache;
      }
    } catch {
      // Fallback
    }
    quotesCache = INITIAL_QUOTES;
    return quotesCache;
  }

  /**
   * Submit a new quote request
   */
  static submitQuoteRequest(newQuote: Omit<QuoteRequest, 'id' | 'date' | 'status'>): QuoteRequest {
    const quote: QuoteRequest = {
      ...newQuote,
      id: `COT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pendiente',
    };

    const current = this.getQuoteRequests();
    const updated = [quote, ...current];
    quotesCache = updated;

    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return quote;
  }

  /**
   * Update quote status
   */
  static updateQuoteStatus(quoteId: string, status: QuoteRequest['status']): QuoteRequest[] {
    const updated = this.getQuoteRequests().map((q) =>
      q.id === quoteId ? { ...q, status } : q
    );
    quotesCache = updated;

    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return updated;
  }

  /**
   * Get company configuration (cached in memory)
   */
  static getCompanySettings(): CompanySettings {
    if (settingsCache) {
      return settingsCache;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        settingsCache = JSON.parse(stored) as CompanySettings;
        return settingsCache;
      }
    } catch {
      // Fallback
    }
    settingsCache = COMPANY_CONFIG;
    return settingsCache;
  }

  /**
   * Update company configuration
   */
  static updateCompanySettings(settings: CompanySettings): CompanySettings {
    settingsCache = settings;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
    return settings;
  }

  /**
   * Get videos (cached in memory)
   */
  static getVideos(): VideoDemo[] {
    if (videosCache) {
      return videosCache;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      if (stored) {
        videosCache = JSON.parse(stored) as VideoDemo[];
        return videosCache;
      }
    } catch {
      // Fallback
    }
    videosCache = VIDEO_DEMOS;
    return videosCache;
  }

  /**
   * Cloudinary image upload placeholder
   * Future implementation:
   * const formData = new FormData();
   * formData.append('file', file);
   * formData.append('upload_preset', CLOUDINARY_PRESET);
   * const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, ...);
   */
  static async uploadImageToCloudinary(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
