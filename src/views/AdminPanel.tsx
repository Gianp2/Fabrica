import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Inbox,
  Layers,
  Video,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Search,
  ArrowLeft,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Save,
  Menu,
  X,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { Product, QuoteRequest, CompanySettings, ProductCategory } from '../types';
import { StorageService } from '../services/storageService';
import { CATEGORIES_DATA } from '../data/mockData';
import { useScrollLock } from '../utils/scrollLock';

interface AdminPanelProps {
  onReturnToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onReturnToSite }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'quotes' | 'categories' | 'media' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State from storage
  const [products, setProducts] = useState<Product[]>(StorageService.getProducts());
  const [quotes, setQuotes] = useState<QuoteRequest[]>(StorageService.getQuoteRequests());
  const [settings, setSettings] = useState<CompanySettings>(StorageService.getCompanySettings());
  const [videos] = useState(StorageService.getVideos());

  // Product modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  useScrollLock('admin-product-modal', productModalOpen);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [quoteFilterStatus, setQuoteFilterStatus] = useState<string>('all');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Form state for new/edit product
  const [prodForm, setProdForm] = useState<{
    code: string;
    name: string;
    tagline: string;
    category: ProductCategory;
    subcategory: string;
    sector: string;
    image: string;
    description: string;
    application: string;
    productionLeadTime: string;
    specSpeed: string;
    specStations: string;
    specThickness: string;
    specCNC: string;
  }>({
    code: '',
    name: '',
    tagline: '',
    category: 'roll-forming',
    subcategory: 'Steel Framing',
    sector: 'Steel Framing & Drywall',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
    description: '',
    application: '',
    productionLeadTime: '45 días',
    specSpeed: '40 m/min',
    specStations: '20 estaciones',
    specThickness: '0.8 a 2.5 mm',
    specCNC: 'Siemens S7-1200'
  });

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      code: `RF-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      tagline: '',
      category: 'roll-forming',
      subcategory: 'Perfiles Estructurales',
      sector: 'Steel Framing & Drywall',
      image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
      description: '',
      application: '',
      productionLeadTime: '45 días',
      specSpeed: '35 m/min',
      specStations: '18 estaciones',
      specThickness: '0.9 a 2.5 mm',
      specCNC: 'Siemens S7-1200'
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      code: prod.code,
      name: prod.name,
      tagline: prod.tagline,
      category: prod.category,
      subcategory: prod.subcategory,
      sector: prod.sector,
      image: prod.image,
      description: prod.description,
      application: prod.application,
      productionLeadTime: prod.productionLeadTime,
      specSpeed: prod.specs[0]?.value || '40 m/min',
      specStations: prod.specs[1]?.value || '20 estaciones',
      specThickness: prod.specs[2]?.value || '1.0 a 3.0 mm',
      specCNC: prod.specs[3]?.value || 'Siemens'
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategoryObj = CATEGORIES_DATA.find((c) => c.id === prodForm.category);

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      code: prodForm.code,
      name: prodForm.name,
      tagline: prodForm.tagline || 'Ingeniería industrial de alta precisión',
      category: prodForm.category,
      categoryName: selectedCategoryObj ? selectedCategoryObj.name : 'Líneas Industriales',
      subcategory: prodForm.subcategory,
      sector: prodForm.sector,
      image: prodForm.image,
      gallery: [prodForm.image],
      description: prodForm.description,
      application: prodForm.application || 'Fabricación en serie continua',
      productionLeadTime: prodForm.productionLeadTime,
      status: 'active',
      specs: [
        { label: 'Velocidad operativa', value: prodForm.specSpeed },
        { label: 'Estaciones de conformado', value: prodForm.specStations },
        { label: 'Espesores procesables', value: prodForm.specThickness },
        { label: 'Controlador Numérico', value: prodForm.specCNC }
      ]
    };

    const updated = StorageService.saveProduct(productPayload);
    setProducts(updated);
    setProductModalOpen(false);
    triggerSuccessToast('Maquinaria guardada correctamente en el catálogo.');
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`¿Confirmás la eliminación del equipo "${name}"?`)) {
      const updated = StorageService.deleteProduct(id);
      setProducts(updated);
      triggerSuccessToast('Equipo eliminado del catálogo.');
    }
  };

  const handleUpdateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    const updated = StorageService.updateQuoteStatus(id, status);
    setQuotes(updated);
    triggerSuccessToast(`Estado de cotización actualizado a "${status}".`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = StorageService.updateCompanySettings(settings);
    setSettings(updated);
    triggerSuccessToast('Configuración empresarial guardada exitosamente.');
  };

  const triggerSuccessToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    if (quoteFilterStatus === 'all') return true;
    return q.status === quoteFilterStatus;
  });

  // Filtered products in admin
  const filteredAdminProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.code.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Admin Top Header */}
      <header className="bg-[#10233F] text-white px-4 sm:px-6 py-3.5 border-b border-white/10 flex items-center justify-between z-30 sticky top-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded hover:bg-white/10"
            aria-label="Abrir menú de administración"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#168FD1] rounded-sm flex items-center justify-center font-bold text-white text-base">
              V
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-sm sm:text-base flex items-center gap-1.5">
                VORTEX <span className="text-[#168FD1]">CNC</span>
                <span className="text-slate-400 text-xs font-normal border-l border-white/20 pl-2 ml-1 hidden sm:inline">
                  Panel de Gestión Industrial
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Architecture Badge */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[11px] text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ready for Firebase & Cloudinary</span>
          </div>

          <button
            onClick={onReturnToSite}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Web Pública</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed top-16 right-6 z-50 bg-[#10233F] text-white px-4 py-3 rounded border border-[#168FD1] shadow-xl flex items-center gap-2 text-xs font-medium animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#168FD1]" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Admin Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar / Mobile Drawer */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0A1628] text-slate-300 flex flex-col justify-between transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between lg:hidden text-white pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider">Menú Interno</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'dashboard' ? 'bg-[#168FD1] text-white' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard General</span>
              </button>

              <button
                onClick={() => { setActiveTab('products'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'products' ? 'bg-[#168FD1] text-white' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Gestión de Maquinarias ({products.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('quotes'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'quotes' ? 'bg-[#168FD1] text-white' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <div className="flex items-center justify-between flex-1">
                  <span>Cotizaciones Recibidas</span>
                  {quotes.filter(q => q.status === 'pendiente').length > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#FFA319] text-slate-900 text-[10px] font-bold rounded-full">
                      {quotes.filter(q => q.status === 'pendiente').length}
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('categories'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'categories' ? 'bg-[#168FD1] text-white' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Categorías & Sectores</span>
              </button>

              <button
                onClick={() => { setActiveTab('media'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'media' ? 'bg-[#168FD1] text-white' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Multimedia & Videos ({videos.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold transition-colors ${
                  activeTab === 'settings' ? 'bg-[#168FD1] text-white' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Configuración de Empresa</span>
              </button>
            </nav>
          </div>

          <div className="p-4 border-t border-white/10 text-[11px] text-slate-500 space-y-1">
            <div className="font-semibold text-slate-400">Vortex CNC Core v2.4</div>
            <div>Persistencia en LocalStorage con adapters para Firebase y Cloudinary listos.</div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Panel de Control & Rendimiento
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Métricas de consultas, catálogo activo y estado de cotizaciones comerciales.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase">Maquinarias Activas</span>
                    <Package className="w-4 h-4 text-[#168FD1]" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 font-mono">
                    {products.length}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    En 5 líneas de producción
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase">Cotizaciones este Mes</span>
                    <Inbox className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 font-mono">
                    {quotes.length}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium">
                    +18% comparado al mes anterior
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase">Pendientes de Contacto</span>
                    <Clock className="w-4 h-4 text-[#FFA319]" />
                  </div>
                  <div className="text-3xl font-bold text-[#FFA319] font-mono">
                    {quotes.filter(q => q.status === 'pendiente').length}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Requieren respuesta técnica
                  </div>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold uppercase">Visitas al Catálogo</span>
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 font-mono">
                    3.840
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Desde 14 países industriales
                  </div>
                </div>
              </div>

              {/* Recent Quote Inquiries */}
              <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    Últimas Solicitudes de Cotización Recibidas
                  </h3>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="text-xs font-semibold text-[#168FD1] hover:underline"
                  >
                    Ver todas &rarr;
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Código</th>
                        <th className="py-3 px-4">Fecha</th>
                        <th className="py-3 px-4">Cliente / Empresa</th>
                        <th className="py-3 px-4">Equipo de Interés</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quotes.slice(0, 5).map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-semibold text-[#168FD1]">{q.id}</td>
                          <td className="py-3 px-4 text-slate-500 font-mono">{q.date}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{q.clientName}</span>
                            <span className="text-slate-500 text-[11px]">{q.company}</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-medium text-slate-800">{q.productCode}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              q.status === 'pendiente' ? 'bg-amber-100 text-amber-800' :
                              q.status === 'en_seguimiento' ? 'bg-blue-100 text-blue-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {q.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setActiveTab('quotes')}
                              className="text-slate-600 hover:text-[#168FD1] font-semibold"
                            >
                              Ver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Gestión de Maquinarias en Catálogo
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Altas, modificaciones técnicas y bajas de líneas de conformado, corte y plegado.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2.5 bg-[#168FD1] hover:bg-[#137eb8] text-white text-xs font-semibold rounded flex items-center gap-2 shadow transition-colors uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Nueva Maquinaria</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-white p-4 rounded border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="relative w-full max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Filtrar por código o nombre..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                  />
                </div>
                <div className="text-xs text-slate-500 whitespace-nowrap">
                  Total: <strong className="text-slate-800">{filteredAdminProducts.length}</strong> equipos
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Equipo</th>
                        <th className="py-3 px-4">Código</th>
                        <th className="py-3 px-4">Categoría</th>
                        <th className="py-3 px-4">Sector</th>
                        <th className="py-3 px-4">Plazo</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAdminProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt=""
                                className="w-12 h-9 object-cover rounded bg-slate-900 shrink-0"
                              />
                              <div>
                                <span className="font-bold text-slate-900 block line-clamp-1">{p.name}</span>
                                <span className="text-slate-500 text-[11px] line-clamp-1">{p.subcategory}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-[#168FD1]">{p.code}</td>
                          <td className="py-3 px-4 text-slate-600">{p.categoryName}</td>
                          <td className="py-3 px-4 text-slate-600">{p.sector}</td>
                          <td className="py-3 px-4 text-slate-500 font-mono">{p.productionLeadTime}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 text-slate-600 hover:text-[#168FD1] hover:bg-slate-100 rounded"
                                title="Editar ficha técnica"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                title="Eliminar maquinaria"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUOTE REQUESTS INBOX */}
          {activeTab === 'quotes' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Bandeja de Solicitudes de Cotización
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Consultas formales enviadas por clientes industriales desde la plataforma web.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Filtrar por estado:</span>
                  <select
                    value={quoteFilterStatus}
                    onChange={(e) => setQuoteFilterStatus(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-800"
                  >
                    <option value="all">Todas las cotizaciones</option>
                    <option value="pendiente">Solo Pendientes</option>
                    <option value="en_seguimiento">En Seguimiento</option>
                    <option value="cotizado">Cotizadas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-[#168FD1] bg-slate-100 px-2.5 py-1 rounded">
                          {q.id}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{q.date}</span>
                        <span className="text-xs text-slate-600">Destino: {q.country}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Estado:</span>
                        <select
                          value={q.status}
                          onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                          className="px-2.5 py-1 text-xs border border-slate-300 rounded bg-slate-50 font-semibold"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="en_seguimiento">En Seguimiento</option>
                          <option value="cotizado">Cotizado</option>
                          <option value="descartado">Descartado</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-medium uppercase text-[10px] block">Contacto</span>
                        <strong className="text-slate-900 text-sm block">{q.clientName}</strong>
                        <span className="text-slate-600">{q.company}</span>
                        <div className="mt-1 flex flex-col gap-0.5 text-slate-500">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#168FD1]" /> {q.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#25D366]" /> {q.phone}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 font-medium uppercase text-[10px] block">Maquinaria de Interés</span>
                        <strong className="text-slate-900 block font-mono">{q.productCode}</strong>
                        <span className="text-slate-700">{q.productName}</span>
                        {q.thicknessRequired && (
                          <div className="text-[11px] text-slate-500 mt-1">
                            Espesor requerido: <strong className="text-slate-700">{q.thicknessRequired}</strong>
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-slate-400 font-medium uppercase text-[10px] block">Detalle del Requerimiento</span>
                        <p className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 mt-1 leading-relaxed">
                          "{q.message}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3 text-xs">
                      <a
                        href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${q.clientName}, nos comunicamos desde Vortex CNC respecto a su consulta por el equipo ${q.productCode}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#25D366] text-white rounded font-medium hover:bg-[#20bd5a] transition-colors"
                      >
                        Responder por WhatsApp
                      </a>
                      <a
                        href={`mailto:${q.email}?subject=Cotización Vortex CNC - ${q.productCode}`}
                        className="px-3 py-1.5 bg-[#168FD1] text-white rounded font-medium hover:bg-[#137eb8] transition-colors"
                      >
                        Enviar Email Oficial
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES & SECTORS */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Líneas de Maquinaria & Sectores Industriales
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Estructura de catálogo y campos de aplicación.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {CATEGORIES_DATA.map((c) => (
                  <div key={c.id} className="bg-white p-5 rounded border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                      <span className="text-xs font-mono font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {c.count} modelos
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {c.shortDesc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MULTIMEDIA */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Biblioteca Audiovisual & Demostraciones
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Videos operativos de líneas en planta listos para reproducción en la web.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {videos.map((v) => (
                  <div key={v.id} className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
                    <div className="aspect-video bg-slate-900 relative">
                      <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-mono">
                        {v.duration}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-xs font-mono text-[#168FD1] font-bold">{v.machineModel}</span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{v.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COMPANY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Configuración Institucional de Vortex CNC
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Datos de contacto comercial, guardia técnica y locaciones fabriles.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nombre Comercial de Empresa
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Razón Social Legal
                    </label>
                    <input
                      type="text"
                      value={settings.legalName}
                      onChange={(e) => setSettings({ ...settings, legalName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teléfono Ventas
                    </label>
                    <input
                      type="text"
                      value={settings.phoneSales}
                      onChange={(e) => setSettings({ ...settings, phoneSales: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Oficial
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappSales}
                      onChange={(e) => setSettings({ ...settings, whatsappSales: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Ventas
                    </label>
                    <input
                      type="email"
                      value={settings.emailSales}
                      onChange={(e) => setSettings({ ...settings, emailSales: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dirección de Planta Matriz
                    </label>
                    <input
                      type="text"
                      value={settings.plantAddress}
                      onChange={(e) => setSettings({ ...settings, plantAddress: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Horarios de Planta
                    </label>
                    <input
                      type="text"
                      value={settings.businessHours}
                      onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#168FD1] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#168FD1] hover:bg-[#137eb8] text-white text-xs font-semibold rounded flex items-center gap-2 transition-colors uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* Modal: Add or Edit Machine */}
      {productModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
          onClick={() => setProductModalOpen(false)}
        >
          <div
            className="bg-white rounded-md max-w-2xl w-full p-6 space-y-4 my-8 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingProduct ? 'Editar Maquinaria' : 'Alta de Nueva Maquinaria Industrial'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código de Modelo *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.code}
                    onChange={(e) => setProdForm({ ...prodForm, code: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Línea / Categoría</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  >
                    {CATEGORIES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Comercial de la Máquina *</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="Ej. Línea Continua de Steel Framing RF-SF-200"
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subcategoría</label>
                  <input
                    type="text"
                    value={prodForm.subcategory}
                    onChange={(e) => setProdForm({ ...prodForm, subcategory: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sector Principal</label>
                  <input
                    type="text"
                    value={prodForm.sector}
                    onChange={(e) => setProdForm({ ...prodForm, sector: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción Técnica</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  placeholder="Detalle de prestaciones mecánicas, rodillos y tolerancias..."
                  className="w-full px-3 py-2 border border-slate-300 rounded resize-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">Velocidad</label>
                  <input
                    type="text"
                    value={prodForm.specSpeed}
                    onChange={(e) => setProdForm({ ...prodForm, specSpeed: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">Estaciones</label>
                  <input
                    type="text"
                    value={prodForm.specStations}
                    onChange={(e) => setProdForm({ ...prodForm, specStations: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">Espesores</label>
                  <input
                    type="text"
                    value={prodForm.specThickness}
                    onChange={(e) => setProdForm({ ...prodForm, specThickness: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">Control CNC</label>
                  <input
                    type="text"
                    value={prodForm.specCNC}
                    onChange={(e) => setProdForm({ ...prodForm, specCNC: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#168FD1] hover:bg-[#137eb8] text-white rounded font-semibold uppercase tracking-wider"
                >
                  Guardar Maquinaria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
