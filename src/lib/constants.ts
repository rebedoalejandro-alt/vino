import type { WineType, SortOption, NavLink, TrustBadge, SocialLink } from "@/types";

/**
 * Wine types with icons and colors
 */
export const WINE_TYPES: Array<{
  id: WineType;
  label: string;
  description: string;
  color: string;
  icon: string;
  bgColor: string;
}> = [
  {
    id: "tinto",
    label: "Tinto",
    description: "Vinos tintos con cuerpo y carácter",
    color: "text-red-700",
    icon: "🍷",
    bgColor: "bg-red-100",
  },
  {
    id: "blanco",
    label: "Blanco",
    description: "Vinos blancos frescos y elegantes",
    color: "text-yellow-600",
    icon: "🍾",
    bgColor: "bg-yellow-100",
  },
  {
    id: "rosado",
    label: "Rosado",
    description: "Vinos rosados refrescantes",
    color: "text-pink-500",
    icon: "🌸",
    bgColor: "bg-pink-100",
  },
  {
    id: "espumoso",
    label: "Espumoso",
    description: "Cavas y champagnes",
    color: "text-amber-600",
    icon: "✨",
    bgColor: "bg-amber-100",
  },
  {
    id: "fortified",
    label: "Generoso",
    description: "Vinos fortificados y generosos",
    color: "text-orange-700",
    icon: "🏺",
    bgColor: "bg-orange-100",
  },
  {
    id: "natural",
    label: "Natural",
    description: "Vinos naturales sin aditivos",
    color: "text-green-700",
    icon: "🍃",
    bgColor: "bg-green-100",
  },
];

/**
 * Wine regions
 */
export const REGIONS = [
  { id: "rioja", name: "La Rioja", country: "España" },
  { id: "ribera-duero", name: "Ribera del Duero", country: "España" },
  { id: "penedes", name: "Penedès", country: "España" },
  { id: "priorat", name: "Priorat", country: "España" },
  { id: "riojas-altas", name: "Rioja Alavesa", country: "España" },
  { id: "campo-borja", name: "Campo de Borja", country: "España" },
  { id: "toro", name: "Toro", country: "España" },
  { id: "jumilla", name: "Jumilla", country: "España" },
  { id: "emporda", name: "Empordà", country: "España" },
  { id: "monterrei", name: "Monterrei", country: "España" },
  { id: "rías-baixas", name: "Rías Baixas", country: "España" },
  { id: "albariño", name: "Albariño", country: "España" },
  { id: "sherries", name: "Jerez", country: "España" },
  { id: "montilla", name: "Montilla-Moriles", country: "España" },
  { id: "bordeaux", name: "Burdeos", country: "Francia" },
  { id: "bourgogne", name: "Borgoña", country: "Francia" },
  { id: "champagne", name: "Champagne", country: "Francia" },
  { id: "loire", name: "Loire", country: "Francia" },
  { id: "rhone", name: "Ródano", country: "Francia" },
  { id: "provence", name: "Provenza", country: "Francia" },
  { id: "toscana", name: "Toscana", country: "Italia" },
  { id: "piedmont", name: "Piamonte", country: "Italia" },
  { id: "veneto", name: "Véneto", country: "Italia" },
  { id: "napa", name: "Napa Valley", country: "Estados Unidos" },
  { id: "sonoma", name: "Sonoma", country: "Estados Unidos" },
  { id: "oregon", name: "Oregón", country: "Estados Unidos" },
  { id: "argentina", name: "Mendoza", country: "Argentina" },
  { id: "chile", name: "Valle Central", country: "Chile" },
  { id: "australia", name: "Barossa Valley", country: "Australia" },
  { id: "nz", name: "Marlborough", country: "Nueva Zelanda" },
];

/**
 * Sort options for products
 */
export const SORT_OPTIONS: SortOption[] = [
  {
    id: "relevancia",
    label: "Relevancia",
    value: "relevancia",
  },
  {
    id: "precio-asc",
    label: "Precio: menor a mayor",
    value: "precio-asc",
  },
  {
    id: "precio-desc",
    label: "Precio: mayor a menor",
    value: "precio-desc",
  },
  {
    id: "newest",
    label: "Más recientes",
    value: "newest",
  },
  {
    id: "bestseller",
    label: "Más vendidos",
    value: "bestseller",
  },
  {
    id: "rating",
    label: "Mejor valorados",
    value: "rating",
  },
];

/**
 * Shipping rates and options
 */
export const SHIPPING_RATES = {
  basePrice: 5.95,
  freeAbove: 150,
  perBottleOver6: 0.5,
  maxShipping: 25,
  estimatedDays: {
    standard: "5-7 días",
    express: "2-3 días",
    nextDay: "24 horas",
  },
};

/**
 * Navigation items with mega menu structure
 */
export const NAV_ITEMS: NavLink[] = [
  {
    label: "Tienda",
    href: "/tienda",
    submenu: [
      {
        label: "Por tipo de vino",
        href: "/tienda?tipo=todos",
        submenu: [
          { label: "Tintos", href: "/tienda?tipo=tinto" },
          { label: "Blancos", href: "/tienda?tipo=blanco" },
          { label: "Rosados", href: "/tienda?tipo=rosado" },
          { label: "Espumosos", href: "/tienda?tipo=espumoso" },
          { label: "Generosos", href: "/tienda?tipo=fortified" },
          { label: "Naturales", href: "/tienda?tipo=natural" },
        ],
      },
      {
        label: "Por región",
        href: "/tienda?region=todos",
        submenu: [
          { label: "Rioja", href: "/tienda?region=rioja" },
          { label: "Ribera del Duero", href: "/tienda?region=ribera-duero" },
          { label: "Priorat", href: "/tienda?region=priorat" },
          { label: "Penedès", href: "/tienda?region=penedes" },
          { label: "Rías Baixas", href: "/tienda?region=rías-baixas" },
          { label: "Jerez", href: "/tienda?region=sherries" },
          { label: "Ver todas", href: "/tienda?region=todos" },
        ],
      },
      {
        label: "Packs y ofertas",
        href: "/packs",
      },
      {
        label: "Ofertas especiales",
        href: "/ofertas",
      },
    ],
  },
  {
    label: "Bodegas",
    href: "/bodegas",
    submenu: [
      {
        label: "Bodegas destacadas",
        href: "/bodegas",
        submenu: [
          { label: "Bodegas españolas", href: "/bodegas?pais=españa" },
          { label: "Bodegas francesas", href: "/bodegas?pais=francia" },
          { label: "Bodegas italianas", href: "/bodegas?pais=italia" },
          { label: "Bodegas internacionales", href: "/bodegas?pais=internacional" },
        ],
      },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    submenu: [
      {
        label: "Últimas publicaciones",
        href: "/blog",
      },
      {
        label: "Guías de cata",
        href: "/blog?categoria=guias",
      },
      {
        label: "Maridaje",
        href: "/blog?categoria=maridaje",
      },
      {
        label: "Historia del vino",
        href: "/blog?categoria=historia",
      },
      {
        label: "Consejos de conservación",
        href: "/blog?categoria=conservacion",
      },
    ],
  },
  {
    label: "Suscripción",
    href: "/suscripcion",
    submenu: [
      {
        label: "Nuestras suscripciones",
        href: "/suscripcion",
      },
      {
        label: "Club Casa del Vino",
        href: "/club",
      },
    ],
  },
];

/**
 * Trust badges for homepage
 */
export const TRUST_BADGES: TrustBadge[] = [
  {
    icon: "🚚",
    title: "Envío gratis",
    description: "En compras superiores a 150€",
  },
  {
    icon: "🔒",
    title: "Compra segura",
    description: "Pago con SSL encriptado",
  },
  {
    icon: "↩️",
    title: "Devolución fácil",
    description: "30 días para devolver",
  },
  {
    icon: "📞",
    title: "Atención al cliente",
    description: "Lunes a viernes 9-18h",
  },
  {
    icon: "✓",
    title: "Productos auténticos",
    description: "100% garantizado",
  },
];

/**
 * Footer links
 */
export const FOOTER_LINKS = {
  empresa: [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Contacto", href: "/contacto" },
    { label: "Blog", href: "/blog" },
    { label: "Trabajar con nosotros", href: "/empleos" },
  ],
  servicio: [
    { label: "Mi cuenta", href: "/cuenta" },
    { label: "Pedidos", href: "/pedidos" },
    { label: "Lista de deseos", href: "/deseos" },
    { label: "Carrito", href: "/carrito" },
  ],
  informacion: [
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de devoluciones", href: "/devoluciones" },
    { label: "Política de cookies", href: "/cookies" },
  ],
  legal: [
    { label: "Aviso legal", href: "/aviso-legal" },
    { label: "Responsabilidad civil", href: "/responsabilidad" },
    { label: "Certificaciones", href: "/certificaciones" },
  ],
};

/**
 * Social media links
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "instagram",
    url: "https://instagram.com/casadelvino",
    icon: "instagram",
  },
  {
    platform: "facebook",
    url: "https://facebook.com/casadelvino",
    icon: "facebook",
  },
  {
    platform: "twitter",
    url: "https://twitter.com/casadelvino",
    icon: "twitter",
  },
  {
    platform: "pinterest",
    url: "https://pinterest.com/casadelvino",
    icon: "pinterest",
  },
  {
    platform: "youtube",
    url: "https://youtube.com/casadelvino",
    icon: "youtube",
  },
];

/**
 * Payment methods
 */
export const PAYMENT_METHODS = [
  {
    id: "tarjeta",
    name: "Tarjeta de crédito/débito",
    description: "Visa, Mastercard, American Express",
    icon: "💳",
  },
  {
    id: "transferencia",
    name: "Transferencia bancaria",
    description: "Transferencia directa a nuestra cuenta",
    icon: "🏦",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pago rápido y seguro con PayPal",
    icon: "🔵",
  },
  {
    id: "klarna",
    name: "Klarna",
    description: "Paga en 3 cuotas sin intereses",
    icon: "📱",
  },
];

/**
 * Grape varieties
 */
export const GRAPES = [
  { id: "tempranillo", name: "Tempranillo", color: "tinto" as const },
  { id: "garnacha", name: "Garnacha", color: "tinto" as const },
  { id: "bobal", name: "Bobal", color: "tinto" as const },
  { id: "mencía", name: "Mencía", color: "tinto" as const },
  { id: "monastrell", name: "Monastrell", color: "tinto" as const },
  { id: "cabernet-sauvignon", name: "Cabernet Sauvignon", color: "tinto" as const },
  { id: "merlot", name: "Merlot", color: "tinto" as const },
  { id: "pinot-noir", name: "Pinot Noir", color: "tinto" as const },
  { id: "syrah", name: "Syrah", color: "tinto" as const },
  { id: "grenache", name: "Grenache", color: "tinto" as const },

  { id: "albariño", name: "Albariño", color: "blanco" as const },
  { id: "verdejo", name: "Verdejo", color: "blanco" as const },
  { id: "godello", name: "Godello", color: "blanco" as const },
  { id: "sauvignon-blanc", name: "Sauvignon Blanc", color: "blanco" as const },
  { id: "chardonnay", name: "Chardonnay", color: "blanco" as const },
  { id: "riesling", name: "Riesling", color: "blanco" as const },
  { id: "viura", name: "Viura", color: "blanco" as const },
  { id: "macabeo", name: "Macabeo", color: "blanco" as const },
  { id: "xarel-lo", name: "Xarel-lo", color: "blanco" as const },
  { id: "malvasia", name: "Malvasía", color: "blanco" as const },

  { id: "garnacha-rosada", name: "Garnacha Rosada", color: "rosado" as const },
  { id: "bobal-rosada", name: "Bobal Rosada", color: "rosado" as const },
];

/**
 * Wine tasting notes
 */
export const TASTING_NOTES = [
  "Frutal",
  "Especiado",
  "Floral",
  "Mineral",
  "Afrutado",
  "Ahumado",
  "Herbal",
  "Corpulento",
  "Refrescante",
  "Suave",
  "Taninos suaves",
  "Taninos firmes",
  "Ácido equilibrado",
  "Dulce",
  "Seco",
  "Complejo",
  "Simple",
  "Con cuerpo",
  "Ligero",
  "Persistente",
];

/**
 * Wine certifications
 */
export const CERTIFICATIONS = [
  { id: "dop", name: "Denominación de Origen Protegida", icon: "🏆" },
  { id: "igp", name: "Indicación Geográfica Protegida", icon: "📍" },
  { id: "organic", name: "Vino Ecológico", icon: "🌱" },
  { id: "biodynamic", name: "Biodinámica", icon: "🌙" },
  { id: "vegan", name: "Apto para veganos", icon: "🥗" },
  { id: "natural", name: "Vino Natural", icon: "🍃" },
];

/**
 * Price ranges for filtering
 */
export const PRICE_RANGES = [
  { id: "0-15", label: "Menos de 15€", min: 0, max: 15 },
  { id: "15-25", label: "15€ - 25€", min: 15, max: 25 },
  { id: "25-50", label: "25€ - 50€", min: 25, max: 50 },
  { id: "50-100", label: "50€ - 100€", min: 50, max: 100 },
  { id: "100+", label: "Más de 100€", min: 100, max: Infinity },
];

/**
 * FAQ questions and answers
 */
export const FAQ = [
  {
    id: "envio",
    question: "¿Cuál es el tiempo de envío?",
    answer: "Los pedidos se preparan en 24-48 horas. El envío estándar tarda 5-7 días hábiles. Ofrecemos envío express de 2-3 días.",
  },
  {
    id: "devolucion",
    question: "¿Cuál es la política de devoluciones?",
    answer: "Tienes 30 días desde la compra para devolver un producto en perfecto estado. Reembolsamos el importe del vino pero no los gastos de envío.",
  },
  {
    id: "forma-pago",
    question: "¿Qué formas de pago aceptáis?",
    answer: "Aceptamos tarjeta de crédito, transferencia bancaria, PayPal y Klarna (pago en 3 cuotas sin intereses).",
  },
  {
    id: "factura",
    question: "¿Recibiré factura?",
    answer: "Sí, todas las compras incluyen factura que recibirás por correo electrónico.",
  },
  {
    id: "edad-legal",
    question: "¿Hay restricción de edad?",
    answer: "Sí, nuestros vinos solo pueden venderse a mayores de 18 años. Al comprar confirmas ser mayor de edad.",
  },
  {
    id: "almacenamiento",
    question: "¿Cómo debo almacenar mis vinos?",
    answer: "Guárdalos en posición horizontal, en lugar oscuro, fresco (10-15°C) y con humedad moderada. Evita cambios bruscos de temperatura.",
  },
  {
    id: "crianza",
    question: "¿Cuánto tiempo puedo guardar un vino?",
    answer: "Depende del tipo de vino. Los blancos jóvenes 1-3 años, los tintos de crianza 5-10 años, y los grandes vinos pueden mejora con el tiempo.",
  },
  {
    id: "maridaje",
    question: "¿Cómo hago maridaje?",
    answer: "Consulta nuestras guías de maridaje en el blog o contáctanos. Nuestros expertos te recomendarán vinos según tu menú.",
  },
];

/**
 * Newsletter subscription benefits
 */
export const NEWSLETTER_BENEFITS = [
  "Descuentos exclusivos para suscriptores",
  "Acceso prioritario a nuevos vinos",
  "Consejos de expertos en cata",
  "Guías de maridaje",
  "Promociones especiales en tu cumpleaños",
];

/**
 * Testimonials
 */
export const TESTIMONIALS = [
  {
    id: 1,
    name: "María García",
    location: "Madrid",
    rating: 5,
    text: "Excelente selección de vinos y servicio al cliente impecable. Voltaré a comprar sin dudarlo.",
  },
  {
    id: 2,
    name: "Juan López",
    location: "Barcelona",
    rating: 5,
    text: "La calidad de los productos es excepcional. Los vinos llegaron bien empaquetados y las recomendaciones fueron muy acertadas.",
  },
  {
    id: 3,
    name: "Ana Martínez",
    location: "Valencia",
    rating: 4,
    text: "Buena variedad y precios competitivos. El envío fue rápido y el producto de excelente calidad.",
  },
  {
    id: 4,
    name: "Carlos Ruiz",
    location: "Sevilla",
    rating: 5,
    text: "Encontré los vinos que buscaba a un precio mucho mejor que en otros sitios. Muy recomendable.",
  },
  {
    id: 5,
    name: "Isabel Fernández",
    location: "Bilbao",
    rating: 5,
    text: "Una tienda con mucho carácter. El personal es muy atento y la selección de vinos naturales es increíble.",
  },
];

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: "hola@casadelvino.es",
  phone: "+34 901 234 567",
  address: "Calle Mayor, 123, 28001 Madrid, España",
  businessHours: {
    weekday: "Lunes a viernes: 9:00 - 18:00",
    weekend: "Sábado: 10:00 - 14:00",
    sunday: "Domingo: Cerrado",
  },
};
