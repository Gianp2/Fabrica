export type ProductCategory = 
  | 'roll-forming'
  | 'corte-laser'
  | 'plegadoras-cnc'
  | 'punzonado-prensas'
  | 'insumos-repuestos';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryName: string;
  subcategory: string;
  sector: string;
  image: string;
  gallery: string[];
  description: string;
  application: string;
  specs: ProductSpec[];
  featured?: boolean;
  videoUrl?: string;
  status: 'active' | 'draft' | 'archived';
  productionLeadTime: string;
}

export interface SectorItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  relatedCategory: ProductCategory;
  keyProducts: string[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDesc: string;
  count: number;
  iconName: string;
  image: string;
}

export interface QuoteRequest {
  id: string;
  date: string;
  clientName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productCode: string;
  productName: string;
  thicknessRequired?: string;
  productionVolume?: string;
  message: string;
  status: 'pendiente' | 'en_seguimiento' | 'cotizado' | 'descartado';
}

export interface VideoDemo {
  id: string;
  title: string;
  duration: string;
  machineModel: string;
  thumbnail: string;
  videoEmbedUrl: string;
  description: string;
}

export interface CompanySettings {
  companyName: string;
  legalName: string;
  tagline: string;
  emailSales: string;
  emailSupport: string;
  phoneSales: string;
  phoneEmergency: string;
  whatsappSales: string;
  whatsappNumberDigits: string;
  plantAddress: string;
  showroomAddress: string;
  businessHours: string;
  technicalResponseTime: string;
}
