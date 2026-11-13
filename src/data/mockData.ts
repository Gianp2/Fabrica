import { Product, SectorItem, CategoryInfo, QuoteRequest, VideoDemo, CompanySettings } from '../types';

export const HERO_MACHINES = [
  {
    index: '01',
    code: 'RF-650-PRO',
    name: 'Línea de Roll Forming RF-650 PRO',
    titleLead: 'Líneas de Roll Forming',
    titleAccent: 'de Alta Precisión',
    description: 'Ingeniería avanzada en conformado continuo para perfiles estructurales, montantes de steel framing y chapas conformadas a alta cadencia.',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
  },
  {
    index: '02',
    code: 'FLX-3015-DUAL',
    name: 'Centro de Corte Láser Fibra FLX-3015',
    titleLead: 'Centros de Corte Láser',
    titleAccent: 'por Fibra Óptica',
    description: 'Velocidad y precisión térmica micrométrica con mesa de intercambio continuo para aceros al carbono, inoxidables y metales especiales.',
    image: '/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg',
  },
  {
    index: '03',
    code: 'HBP-250T-4100',
    name: 'Plegadora CNC Hidráulica HBP-250',
    titleLead: 'Plegadoras CNC',
    titleAccent: 'Electro-Hidráulicas',
    description: 'Fuerza extrema de 250 toneladas y compensación activa de flexión para plegados de geometría compleja en chapa gruesa.',
    image: '/src/assets/images/hero_press_brake_machine_1794494882226.jpg',
  }
];

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'roll-forming',
    name: 'Líneas de Roll Forming',
    shortDesc: 'Conformado en frío para steel framing, cubiertas, perfiles estructurales C/Z y paneles trapezoidales.',
    count: 28,
    iconName: 'Layers',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg'
  },
  {
    id: 'corte-laser',
    name: 'Corte Láser por Fibra',
    shortDesc: 'Sistemas de corte de fibra óptica con mesa intercambiable, corte de tubos y fuentes resonadoras de alta potencia.',
    count: 16,
    iconName: 'Zap',
    image: '/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg'
  },
  {
    id: 'plegadoras-cnc',
    name: 'Plegadoras CNC',
    shortDesc: 'Prensas plegadoras electrohidráulicas sincronizadas de 40 a 800 Toneladas con compensación automática de flecha.',
    count: 22,
    iconName: 'Minimize2',
    image: '/src/assets/images/hero_press_brake_machine_1794494882226.jpg'
  },
  {
    id: 'punzonado-prensas',
    name: 'Prensas y Devanadoras',
    shortDesc: 'Devanadores hidráulicos con carro de carga, enderezadores de chapa, prensas excéntricas y punzonadoras CNC.',
    count: 19,
    iconName: 'Cpu',
    image: '/src/assets/images/application_construction_metal_1794494882589.jpg'
  },
  {
    id: 'insumos-repuestos',
    name: 'Insumos y Rodillos de Formado',
    shortDesc: 'Juegos de rodillos mecanizados en Cr12MoV templado, matrices templadas de plegado y repuestos de alta durabilidad.',
    count: 34,
    iconName: 'Wrench',
    image: '/src/assets/images/industrial_facility_backdrop_1794494882651.jpg'
  }
];

export const SECTORS_DATA: SectorItem[] = [
  {
    id: 'steel-framing',
    name: 'Steel Framing & Drywall',
    subtitle: 'Construcción en Seco Industrializada',
    description: 'Líneas continuas para perfiles C y U estructurales, soleras, montantes y perfiles galvanizados de alta velocidad con punzonado integrado para pases de instalaciones.',
    image: '/src/assets/images/application_construction_metal_1794494882589.jpg',
    relatedCategory: 'roll-forming',
    keyProducts: ['RF-SF-150', 'RF-DRY-90', 'RF-650-PRO']
  },
  {
    id: 'cubiertas-cerramientos',
    name: 'Cubiertas y Cerramientos Metálicos',
    subtitle: 'Arquitectura Comercial e Industrial',
    description: 'Conformado de chapa sinusoidal, chapa trapezoidal T-101 / T-90, panel engrapado standing seam y paneles para cubiertas atérmicas con corte hidráulico continuo.',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
    relatedCategory: 'roll-forming',
    keyProducts: ['RF-TRAP-101', 'RF-SIN-850', 'RF-SEAM-400']
  },
  {
    id: 'perfileria-pesada',
    name: 'Perfilería Estructural C, Z y Sigma',
    subtitle: 'Naves Industriales y Puentes Grúa',
    description: 'Líneas pesadas regulables automáticamente por servomotores para perfiles C y Z desde 100 hasta 400 mm de peralte en espesores de hasta 4.0 mm en acero galvanizado.',
    image: '/src/assets/images/industrial_facility_backdrop_1794494882651.jpg',
    relatedCategory: 'roll-forming',
    keyProducts: ['RF-CZ-AUTO-400', 'RF-SIGMA-350', 'HBP-250T-4100']
  },
  {
    id: 'agro-silos',
    name: 'Silos y Almacenamiento Agrícola',
    subtitle: 'Infraestructura Cerealera y Logística',
    description: 'Maquinaria pesada para ondulado profundo de virolas de silos de chapa gruesa, conformadoras de parantes verticales omega y matrices de punzonado múltiple.',
    image: '/src/assets/images/hero_press_brake_machine_1794494882226.jpg',
    relatedCategory: 'roll-forming',
    keyProducts: ['RF-SILO-CORR', 'HBP-400T-6000', 'PUNZ-CNC-60']
  },
  {
    id: 'energia-solar',
    name: 'Estructuras Solares Fotovoltaicas',
    subtitle: 'Parques Solares y Montajes Coplanarios',
    description: 'Perfiles conformados con aleación Magnelis® y zinc-aluminio-magnesio con múltiples patrones de troquelado simultáneo para hincado directo al terreno.',
    image: '/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg',
    relatedCategory: 'roll-forming',
    keyProducts: ['RF-SOLAR-TRACK', 'FLX-3015-DUAL', 'RF-CZ-AUTO-400']
  },
  {
    id: 'automotriz-transporte',
    name: 'Industria Automotriz y Remolques',
    subtitle: 'Chasis, Barandas y Carrocerías',
    description: 'Soluciones de corte láser por fibra para tubos estructurales y plegado de perfiles de alta resistencia para remolques, cajas de carga y barandas de semirremolques.',
    image: '/src/assets/images/hero_press_brake_machine_1794494882226.jpg',
    relatedCategory: 'plegadoras-cnc',
    keyProducts: ['HBP-320T-4100', 'FLX-TUBE-6000', 'FLX-3015-DUAL']
  }
];

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: 'prod-01',
    code: 'RF-650-PRO',
    name: 'Línea de Conformado Continuo RF-650 PRO',
    tagline: 'Solución integral para chapa perfilada estructural de alto rendimiento',
    category: 'roll-forming',
    categoryName: 'Líneas de Roll Forming',
    subcategory: 'Perfiles Estructurales',
    sector: 'Steel Framing & Drywall',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
    gallery: [
      '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
      '/src/assets/images/application_construction_metal_1794494882589.jpg',
      '/src/assets/images/industrial_facility_backdrop_1794494882651.jpg'
    ],
    description: 'La línea RF-650 PRO está diseñada para operaciones continuas 24/7 en plantas de conformado. Cuenta con 24 estaciones de conformado con rodillos en acero Cr12MoV templados por inducción y rectificados, garantizando perfiles sin marcas ni torsión superficial.',
    application: 'Producción de paneles trapezoidales, perfiles portantes y bandejas de cables en aceros laminados en frío, galvanizados y prepintados.',
    specs: [
      { label: 'Velocidad de conformado', value: 'Hasta 45 m/min' },
      { label: 'Cantidad de estaciones', value: '24 estaciones independientes' },
      { label: 'Espesor de chapa', value: '0.8 a 3.2 mm' },
      { label: 'Diámetro de ejes', value: 'Ø 85 mm en acero 40Cr bonificado' },
      { label: 'Sistema de accionamiento', value: 'Motorreductor 30 kW con caja de distribución y cardanes' },
      { label: 'Sistema de corte', value: 'Corte hidráulico al vuelo sin detención de línea' },
      { label: 'Control y automatización', value: 'PLC Siemens S7-1200 + Pantalla táctil HMI 10"' }
    ],
    featured: true,
    status: 'active',
    productionLeadTime: '45 - 60 días'
  },
  {
    id: 'prod-02',
    code: 'FLX-3015-DUAL',
    name: 'Centro de Corte Láser Fibra FLX-3015 DUAL',
    tagline: 'Corte térmico de ultra-alta velocidad con doble mesa de intercambio automático',
    category: 'corte-laser',
    categoryName: 'Corte Láser por Fibra',
    subcategory: 'Mesa Plana de Intercambio',
    sector: 'Industria Automotriz y Remolques',
    image: '/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg',
    gallery: [
      '/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg',
      '/src/assets/images/industrial_facility_backdrop_1794494882651.jpg'
    ],
    description: 'Equipo de corte láser por fibra óptica de grado aeroespacial e industrial. Estructura de bancada monobloque recocida a 600°C para eliminar tensiones residuales, garantizando estabilidad geométrica durante décadas de uso intensivo.',
    application: 'Corte de alta velocidad en chapas de acero al carbono hasta 30mm, acero inoxidable hasta 25mm, aluminio y cobre.',
    specs: [
      { label: 'Potencia de resonador láser', value: '6 kW / 12 kW / 20 kW Maxphotonics/Raycus' },
      { label: 'Área útil de trabajo', value: '3000 × 1500 mm (Opcional 4000 × 2000 mm)' },
      { label: 'Tiempo de intercambio de mesa', value: '≤ 12 segundos' },
      { label: 'Velocidad máxima simultánea', value: '140 m/min' },
      { label: 'Aceleración en vacío', value: '1.5 G' },
      { label: 'Cabezal de corte', value: 'Raytools / Precitec autofocus refrigerado por agua' },
      { label: 'Software CAD/CAM', value: 'CypCut profesional con anidado automático nesting' }
    ],
    featured: true,
    status: 'active',
    productionLeadTime: '30 - 45 días'
  },
  {
    id: 'prod-03',
    code: 'HBP-250T-4100',
    name: 'Plegadora CNC Hidráulica HBP-250T',
    tagline: 'Precisión angular milimétrica con compensación activa de flecha Wila',
    category: 'plegadoras-cnc',
    categoryName: 'Plegadoras CNC',
    subcategory: 'Sincronizadas Electrohidráulicas',
    sector: 'Perfilería Estructural Pesada',
    image: '/src/assets/images/hero_press_brake_machine_1794494882226.jpg',
    gallery: [
      '/src/assets/images/hero_press_brake_machine_1794494882226.jpg',
      '/src/assets/images/industrial_facility_backdrop_1794494882651.jpg'
    ],
    description: 'Prensa plegadora de alta rigidez para plegados exigentes en aceros de alta resistencia como Hardox y Domex. Control en lazo cerrado con reglas ópticas Heidenhain de 0.001 mm de resolución para paralelismo absoluto entre cilindros Y1 y Y2.',
    application: 'Plegado de perfiles para camiones, silos, recipientes a presión y estructura pesada.',
    specs: [
      { label: 'Fuerza de prensado', value: '2500 kN (250 Toneladas métricas)' },
      { label: 'Longitud de plegado', value: '4100 mm' },
      { label: 'Distancia entre columnas', value: '3600 mm' },
      { label: 'Profundidad de escote', value: '450 mm' },
      { label: 'Tope trasero motorizado', value: 'Ejes X + R + Z1 + Z2 controlados por servomotores Yaskawa' },
      { label: 'Sistema de amarre', value: 'Sujeción rápida de punzones tipo Promecam o Wila' },
      { label: 'CNC Controlador', value: 'Delem DA-66T con simulación gráfica tridimensional táctil' }
    ],
    featured: true,
    status: 'active',
    productionLeadTime: '30 días'
  },
  {
    id: 'prod-04',
    code: 'RF-CZ-AUTO-400',
    name: 'Línea de Conformado Perfiles C y Z Automática',
    tagline: 'Cambio de sección C a Z en menos de 5 minutos mediante CNC',
    category: 'roll-forming',
    categoryName: 'Líneas de Roll Forming',
    subcategory: 'Perfiles Pesados C/Z',
    sector: 'Perfilería Estructural Pesada',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
    gallery: ['/src/assets/images/hero_rollforming_machine_1794494880375.jpg'],
    description: 'Equipo de última generación para fabricantes de galpones y naves logísticas. El cambio de altura de alma de 100 mm a 400 mm y el giro de labios de C a Z se realiza íntegramente por software sin herramientas manuales.',
    application: 'Correas de techo y cerramientos laterales en perfiles C y Z autoperforables.',
    specs: [
      { label: 'Rango de perfil alma', value: '100 a 400 mm' },
      { label: 'Rango de alas', value: '40 a 100 mm' },
      { label: 'Espesor procesable', value: '1.2 a 4.0 mm' },
      { label: 'Velocidad de trabajo', value: 'Hasta 35 m/min con punzonado' },
      { label: 'Módulo de punzonado', value: 'Prensa hidráulica previa con matrices para orificios de fijación' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '60 días'
  },
  {
    id: 'prod-05',
    code: 'RF-SF-150',
    name: 'Línea Continua Steel Framing RF-SF-150',
    tagline: 'La columna vertebral para plantas de construcción en seco y módulos habitacionales',
    category: 'roll-forming',
    categoryName: 'Líneas de Roll Forming',
    subcategory: 'Steel Framing',
    sector: 'Steel Framing & Drywall',
    image: '/src/assets/images/application_construction_metal_1794494882589.jpg',
    gallery: ['/src/assets/images/application_construction_metal_1794494882589.jpg'],
    description: 'Línea compacta de alta velocidad diseñada específicamente para perfiles PGC y PGU (perfiles galvanizados para Steel Frame). Incorpora estación de avellanado, corte biselado y perforado para pases de cañerías eléctricas y de agua.',
    application: 'Montantes y soleras para estructuras de viviendas industrializadas de hasta 4 plantas.',
    specs: [
      { label: 'Perfiles compatibles', value: 'PGC 70/90/100/150 y PGU coincidentes' },
      { label: 'Espesores admitidos', value: '0.89 a 1.60 mm' },
      { label: 'Velocidad lineal', value: '50 m/min' },
      { label: 'Conectividad CAD', value: 'Importación directa de archivos BIM/Vertex BD/Revit' }
    ],
    featured: true,
    status: 'active',
    productionLeadTime: '45 días'
  },
  {
    id: 'prod-06',
    code: 'FLX-TUBE-6000',
    name: 'Láser Fibra para Tubos y Perfiles FLX-TUBE-6',
    tagline: 'Corte tridimensional de tubos redondos, cuadrados y perfiles abiertos',
    category: 'corte-laser',
    categoryName: 'Corte Láser por Fibra',
    subcategory: 'Corte de Tubos',
    sector: 'Industria Automotriz y Remolques',
    image: '/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg',
    gallery: ['/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg'],
    description: 'Centro de corte láser rotativo con mandril neumático cuádruple autocentrante y cargador automático de paquetes de caños de hasta 6 metros de longitud.',
    application: 'Mobiliario metálico, carpintería pesada, defensas vehiculares y soportes estructurales.',
    specs: [
      { label: 'Longitud máxima de tubo', value: '6500 mm' },
      { label: 'Diámetro de tubo redondo', value: 'Ø 20 a 220 mm' },
      { label: 'Lado de tubo cuadrado', value: '20 × 20 a 150 × 150 mm' },
      { label: 'Potencia resonador', value: '3000 W / 6000 W' },
      { label: 'Cargador automático', value: 'Incluido con desestibador servoasistido' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '45 días'
  },
  {
    id: 'prod-07',
    code: 'DEV-HYD-10T',
    name: 'Devanador Hidráulico con Carro de Carga 10T',
    tagline: 'Alimentación segura y automatizada para bobinas de acero de gran peso',
    category: 'punzonado-prensas',
    categoryName: 'Prensas y Devanadoras',
    subcategory: 'Devanadores y Enderezadores',
    sector: 'Cubiertas y Cerramientos Metálicos',
    image: '/src/assets/images/industrial_facility_backdrop_1794494882651.jpg',
    gallery: ['/src/assets/images/industrial_facility_backdrop_1794494882651.jpg'],
    description: 'Devanador unipolar de expansión hidráulica con brazo retenedor superior neumático (snubber roll) y carro de elevación con traslación motorizada sobre rieles para carga rápida de bobinas.',
    application: 'Alimentación primaria de bobinas de chapa en líneas de roll forming, corte longitudinal y prensas.',
    specs: [
      { label: 'Capacidad de carga', value: '10.000 kg (10 Toneladas)' },
      { label: 'Ancho admisible de bobina', value: 'Hasta 1300 mm' },
      { label: 'Rango de expansión mandril', value: 'Ø 470 a 530 mm' },
      { label: 'Velocidad de desenrollado', value: '0 a 60 m/min regulada por variador vectorial' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '20 días'
  },
  {
    id: 'prod-08',
    code: 'RF-TRAP-101',
    name: 'Línea de Chapa Trapezoidal T-101 / T-90',
    tagline: 'Producción de techos industriales autoportantes con terminación perfecta',
    category: 'roll-forming',
    categoryName: 'Líneas de Roll Forming',
    subcategory: 'Cubiertas y Techos',
    sector: 'Cubiertas y Cerramientos Metálicos',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
    gallery: ['/src/assets/images/hero_rollforming_machine_1794494880375.jpg'],
    description: 'Diseñada para chapa prepintada blanca, negra y galvanizada sin rayaduras ni microfisuras en la capa de zinc o pintura gracias al pulido a espejo de los rodillos cromados.',
    application: 'Cubiertas de plantas fabriles, centros logísticos y tinglados.',
    specs: [
      { label: 'Paso de perfil', value: 'Trapezoidal T-101 estandarizado' },
      { label: 'Espesor procesable', value: '0.40 a 0.70 mm' },
      { label: 'Velocidad de trabajo', value: '25 a 30 m/min' },
      { label: 'Corte final', value: 'Guillotina hidráulica con matriz Cr12 perfilada' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '40 días'
  },
  {
    id: 'prod-09',
    code: 'PUNZ-CNC-60',
    name: 'Prensa Punzonadora Automática de Torrecilla 30T',
    tagline: 'Perforado, embutido y troquelado de alta cadencia para tableros y cajas',
    category: 'punzonado-prensas',
    categoryName: 'Prensas y Devanadoras',
    subcategory: 'Punzonadoras CNC',
    sector: 'Energía Solar y Estructuras',
    image: '/src/assets/images/application_construction_metal_1794494882589.jpg',
    gallery: ['/src/assets/images/application_construction_metal_1794494882589.jpg'],
    description: 'Torreta portaherramientas de 32 estaciones con estaciones auto-indexadas para giro rotativo libre del punzón. Diseñada para gabinetes eléctricos, bandejas portacables y paneles ventilados.',
    application: 'Fabricación de envolventes metálicas, tableros eléctricos y piezas para climatización.',
    specs: [
      { label: 'Capacidad de punzonado', value: '300 kN (30 Toneladas)' },
      { label: 'Área de trabajo sin reposición', value: '1250 × 2500 mm' },
      { label: 'Golpes por minuto (paso 1mm)', value: 'Hasta 600 golpes/min' },
      { label: 'Estaciones de torreta', value: '32 estaciones con 2 auto-índice rotativas' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '45 días'
  },
  {
    id: 'prod-10',
    code: 'INS-ROD-CR12',
    name: 'Juegos de Rodillos Rectificados Cr12MoV',
    tagline: 'Matrices y rodillos de formado de repuesto mecanizados con CNC de 5 ejes',
    category: 'insumos-repuestos',
    categoryName: 'Insumos y Rodillos de Formado',
    subcategory: 'Herramental y Rodillos',
    sector: 'Perfilería Estructural Pesada',
    image: '/src/assets/images/industrial_facility_backdrop_1794494882651.jpg',
    gallery: ['/src/assets/images/industrial_facility_backdrop_1794494882651.jpg'],
    description: 'Fabricación sobre plano de rodillos de recambio o desarrollo de nuevos perfiles según especificación del cliente. Acero especial para herramientas Cr12MoV con temple al vacío 60-62 HRC y rectificado de acabado fino.',
    application: 'Reemplazo o reconversión de líneas de conformado de cualquier fabricante nacional o importado.',
    specs: [
      { label: 'Material base', value: 'Cr12MoV / D2 / 1.2379 certificado' },
      { label: 'Dureza superficial', value: '60 - 62 HRC tratado al vacío' },
      { label: 'Tolerancia de mecanizado', value: '± 0.01 mm' },
      { label: 'Tratamiento superficial', value: 'Cromado duro 0.05 mm o nitrurado gaseoso' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '15 - 25 días'
  },
  {
    id: 'prod-11',
    code: 'HBP-400T-6000',
    name: 'Plegadora Tándem de Gran Porte HBP-400T',
    tagline: 'Fuerza extrema para calderería pesada, defensas y estructuras de silos',
    category: 'plegadoras-cnc',
    categoryName: 'Plegadoras CNC',
    subcategory: 'Gran Tonelaje',
    sector: 'Silos y Almacenamiento Agrícola',
    image: '/src/assets/images/hero_press_brake_machine_1794494882226.jpg',
    gallery: ['/src/assets/images/hero_press_brake_machine_1794494882226.jpg'],
    description: 'Plegadora sobredimensionada para calderería, postes cónicos de alumbrado y vigas viales. Preparada para trabajar en tándem sincronizado con un segundo equipo para plegar longitudes de hasta 12 metros.',
    application: 'Plegado de chapas de hasta 16 mm de espesor en grandes longitudes.',
    specs: [
      { label: 'Capacidad de prensado', value: '4000 kN (400 Toneladas)' },
      { label: 'Longitud de plegado', value: '6100 mm' },
      { label: 'Escote en columnas', value: '500 mm' },
      { label: 'Compensación de mesa', value: 'Mesa con bombeo motorizado controlado por CNC' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '70 días'
  },
  {
    id: 'prod-12',
    code: 'RF-SEAM-400',
    name: 'Línea de Techo Engrapado Standing Seam',
    tagline: 'Perfiles para techos continuos sin tornillos a la vista y sin perforaciones',
    category: 'roll-forming',
    categoryName: 'Líneas de Roll Forming',
    subcategory: 'Cubiertas y Techos',
    sector: 'Cubiertas y Cerramientos Metálicos',
    image: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
    gallery: ['/src/assets/images/hero_rollforming_machine_1794494880375.jpg'],
    description: 'Línea móvil o de planta para techos tipo engrapado hermético (standing seam). La unión mecánica con máquina engrapadora portátil asegura estanqueidad absoluta aún con pendientes mínimas de 2%.',
    application: 'Centros de distribución, naves comerciales de gran luz y aeropuertos.',
    specs: [
      { label: 'Ancho útil de panel', value: '400 a 430 mm' },
      { label: 'Espesores admitidos', value: '0.50 a 0.80 mm prepintado / cincalum' },
      { label: 'Configuración de transporte', value: 'Disponible en chasis con tráiler para obra' },
      { label: 'Velocidad de conformado', value: '18 m/min' }
    ],
    featured: false,
    status: 'active',
    productionLeadTime: '35 días'
  }
];

export const VIDEO_DEMOS: VideoDemo[] = [
  {
    id: 'vid-01',
    title: 'Línea Continua RF-650 PRO operando a 45 m/min con corte al vuelo',
    machineModel: 'RF-650-PRO',
    duration: '02:45',
    thumbnail: '/src/assets/images/hero_rollforming_machine_1794494880375.jpg',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
    description: 'Demostración de formado de chapa acanalada estructural con sincronización servocontrolada y apilador neumático al final de la línea.'
  },
  {
    id: 'vid-02',
    title: 'Corte Láser Fibra FLX-3015 de chapa de acero de 20 mm',
    machineModel: 'FLX-3015-DUAL',
    duration: '01:58',
    thumbnail: '/src/assets/images/hero_fiber_laser_machine_1794494881289.jpg',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
    description: 'Prueba de precisión de corte con gas auxiliar de oxígeno y perforación rápida Lightning Piercing en placa de acero ASTM A36.'
  },
  {
    id: 'vid-03',
    title: 'Plegadora HBP-250T plegando perfiles de chapa de 6 mm con control Delem 3D',
    machineModel: 'HBP-250T-4100',
    duration: '03:12',
    thumbnail: '/src/assets/images/hero_press_brake_machine_1794494882226.jpg',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1',
    description: 'Secuencia de plegado de 4 pliegues consecutivos con compensación automática de ángulo y verificación por láser digital.'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'COT-8941',
    date: '2026-11-10',
    clientName: 'Ing. Marcelo Rossi',
    company: 'Estructuras Metálicas Andina S.A.',
    email: 'mrossi@andinaestructuras.com',
    phone: '+54 9 11 4452-9901',
    country: 'Argentina',
    productCode: 'RF-650-PRO',
    productName: 'Línea de Conformado Continuo RF-650 PRO',
    thicknessRequired: 'Chapa galvanizada 1.25 a 2.5 mm',
    productionVolume: '150 toneladas mensuales',
    message: 'Solicitamos cotización FOB y puesta en marcha de línea para perfiles de steel framing con cambio rápido de herramental.',
    status: 'pendiente'
  },
  {
    id: 'COT-8940',
    date: '2026-11-09',
    clientName: 'Lic. Claudia Benítez',
    company: 'AgroSilas Industriales',
    email: 'cbenitez@agrosilas.com.py',
    phone: '+595 981 123456',
    country: 'Paraguay',
    productCode: 'HBP-250T-4100',
    productName: 'Plegadora CNC Hidráulica HBP-250T',
    thicknessRequired: '4 mm a 8 mm',
    productionVolume: 'Turno simple de 8 horas',
    message: 'Requerimos especificaciones del controlador Delem y plazo de entrega para exportación a Asunción.',
    status: 'en_seguimiento'
  },
  {
    id: 'COT-8939',
    date: '2026-11-08',
    clientName: 'Carlos Mendonça',
    company: 'Sistemas Modulares del Sur',
    email: 'carlos@modularesdelsur.cl',
    phone: '+56 9 7654 3210',
    country: 'Chile',
    productCode: 'FLX-3015-DUAL',
    productName: 'Centro de Corte Láser Fibra FLX-3015 DUAL',
    thicknessRequired: 'Inox 1.5 a 6 mm, Carbono hasta 16 mm',
    productionVolume: 'Producción continua',
    message: 'Presupuesto con fuente Raycus de 12 kW y sistema de extracción de humos.',
    status: 'cotizado'
  }
];

export const COMPANY_CONFIG: CompanySettings = {
  companyName: 'VORTEX CNC Industrial',
  legalName: 'Vortex Maquinarias & Automatización S.A.',
  tagline: 'Ingeniería en Maquinaria Industrial y Conformado Continuo',
  emailSales: 'ventas@vortexcnc.com',
  emailSupport: 'soporte@vortexcnc.com',
  phoneSales: '+54 11 5263-8890',
  phoneEmergency: '+54 9 11 6543-2100',
  whatsappSales: '+54 9 11 6543-2100',
  whatsappNumberDigits: '5491165432100',
  plantAddress: 'Parque Industrial Tecnológico Ruta 9, Km 42.5, Colectora Oeste',
  showroomAddress: 'Av. Libertador Industrial 4820, Polo Metalmecánico',
  businessHours: 'Lunes a Viernes de 08:00 a 18:00 hs (Guardia técnica 24/7)',
  technicalResponseTime: 'Guardia técnica en planta en menos de 24/48 horas'
};
