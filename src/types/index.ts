// Database Models
export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;
  gallery?: string[];
  sku: string;
  stock: number;
  featured: boolean;
  bodegaId: string;
  bodega?: Bodega;
  regionId: string;
  region?: Region;
  categoryId: string;
  category?: Category;
  grapeIds: string[];
  grapes?: Grape[];
  wineType: WineType;
  vintage: number;
  volume: number;
  alcohol: number;
  acidity: number;
  ratings?: Rating[];
  reviews?: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Bodega {
  id: string;
  name: string;
  description: string;
  country: string;
  region: string;
  founded: number;
  image: string;
  website?: string;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Region {
  id: string;
  name: string;
  country: string;
  description: string;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Grape {
  id: string;
  name: string;
  description: string;
  color: "tinto" | "blanco" | "rosado";
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  productId: string;
  product?: Product;
  critic: string;
  score: number;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  product?: Product;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  products: PackItem[];
  price: number;
  comparePrice?: number;
  discount: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discount?: number;
  couponCode?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  name: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  orders?: Order[];
  wishlist?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = "pendiente" | "confirmado" | "preparando" | "enviado" | "entregado" | "cancelado";
export type PaymentMethod = "tarjeta" | "transferencia" | "paypal" | "klarna";
export type PaymentStatus = "pendiente" | "procesando" | "completado" | "fallido" | "reembolsado";
export type WineType = "tinto" | "blanco" | "rosado" | "espumoso" | "fortified" | "natural";

// Frontend-Specific Types
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onAddToWishlist?: (product: Product) => void;
  showRating?: boolean;
  showPrice?: boolean;
}

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onProductClick?: (product: Product) => void;
}

export interface FilterState {
  wineTypes: WineType[];
  priceRange: [number, number];
  regions: string[];
  grapes: string[];
  ratings: number[];
  bodegas: string[];
  onlyFeatured: boolean;
  inStock: boolean;
  searchQuery?: string;
}

export interface SortOption {
  id: string;
  label: string;
  value: "relevancia" | "precio-asc" | "precio-desc" | "newest" | "bestseller" | "rating";
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface BodegaCardProps {
  bodega: Bodega;
  productCount?: number;
}

export interface ReviewFormData {
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  content: string;
}

export interface RatingBadgeProps {
  critic: string;
  score: number;
  source: string;
}

export interface PriceDisplayProps {
  price: number;
  comparePrice?: number;
  size?: "sm" | "md" | "lg";
  showCurrency?: boolean;
}

export interface SearchResult {
  id: string;
  type: "producto" | "bodega" | "region";
  title: string;
  subtitle?: string;
  image?: string;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  hasSearched: boolean;
}

export interface NotificationItem {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  sameAsBilling: boolean;
  paymentMethod: PaymentMethod;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: Date;
}

export interface CouponCode {
  id: string;
  code: string;
  discount: number;
  discountType: "porcentaje" | "fijo";
  maxUses: number;
  currentUses: number;
  expiresAt: Date;
  minPurchase?: number;
  active: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ImageWithAlt {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
  submenu?: NavLink[];
  icon?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "pinterest" | "youtube";
  url: string;
  icon: string;
}
