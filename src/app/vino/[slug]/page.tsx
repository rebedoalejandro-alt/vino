'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Star,
  Truck,
  Award,
  Thermometer,
  Eye,
  Flower2,
  Wine,
  MapPin,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';

// Mock data for the product
const mockProduct = {
  id: '1',
  slug: 'vega-sicilia-unico-2013',
  name: 'Vega Sicilia Único',
  vintage: '2013',
  country: 'España',
  region: 'Ribera del Duero',
  bodega: 'Bodegas Vega Sicilia',
  bodegaLink: '/bodegas/vega-sicilia',
  regionLink: '/regiones/ribera-del-duero',
  tagline: 'El vino más icónico de España, expresión de excelencia y tradición',
  price: 189.95,
  comparePrice: 229.95,
  discount: 17,
  image: '/images/vega-sicilia-unico-2013.jpg',
  images: ['/images/vega-sicilia-unico-2013.jpg', '/images/vega-sicilia-2.jpg', '/images/vega-sicilia-3.jpg'],
  isFavorite: false,
  favoritesCount: 1247,
  rating: 4.7,
  reviewsCount: 89,
  recommended: true,
  shipmentText: 'Envío inmediato',

  // Technical specs
  type: 'Tinto de Guarda',
  denomination: 'DO Ribera del Duero',
  grapes: ['Tinto Fino (90%)', 'Cabernet Sauvignon (10%)'],
  producer: 'Bodegas Vega Sicilia',
  allergens: 'Contiene sulfitos',
  alcoholContent: 14.5,
  production: 75000,
  format: '0,75L',

  // Description
  description: `Vega Sicilia Único es la joya de la corona de Bodegas Vega Sicilia, una bodega legendaria con más de 150 años de historia en la Ribera del Duero. Este excepcional vino tinto es resultado de una cuidadosa selección de sus mejores uvas y un proceso de elaboración que combina tradición e innovación.

Con una estructura compleja y elegante, Vega Sicilia Único se distingue por su equilibrio perfecto entre poder y finura. Sus aromas intensos, su paladar profundo y su final persistente hacen de este vino una experiencia inolvidable para cualquier amante del buen vino.

Este es un vino para guardar, que mejora con la edad y revela nuevas facetas a medida que pasan los años. En bodega, atraviesa un proceso de crianza cuidadosamente controlado que realza sus cualidades y le confiere una complejidad característica.`,

  // Sensory profile (1-10 scale)
  sensoryProfile: {
    bodyBalance: 8, // Ligero (0) ← → Robusto (10)
    tannicBalance: 7.5, // Suave (0) ← → Tánico (10)
    dryness: 8, // Seco (0) ← → Dulce (10)
    acidity: 7, // Débil (0) ← → Ácido (10)
  },

  // Tasting notes
  tastingNotes: {
    eye: 'Rojo granate profundo, con ribete cereza. Buena intensidad cromática indicadora de la concentración y potencial de guarda.',
    nose: 'Aromas complejos de ciruela y mora en conserva, hinojo, tabaco rubio, vainilla, cacao y especias suaves. Nariz elegante y envolvente que evolucionará con el tiempo.',
    mouth: 'Entrada tánica firme pero sedosa. Estructura de gran tamaño, con taninos finos bien integrados. Frutas rojas y negras, con toques de cuero y grafito. Final largo y persistente, con una ligera amargura noble característica.',
  },

  // Serving
  servingTemperature: '16-18°C',
  pairings: [
    { name: 'Carnes rojas', icon: '🥩' },
    { name: 'Quesos curados', icon: '🧀' },
    { name: 'Guisos', icon: '🍲' },
    { name: 'Setas y trufas', icon: '🍄' },
    { name: 'Embutidos ibéricos', icon: '🥓' },
  ],

  // Ratings history
  scoresHistory: [
    { vintage: '2013', parker: 95, penin: 94, suckling: 92, atkin: 93 },
    { vintage: '2012', parker: 94, penin: 93, suckling: 91, atkin: 92 },
    { vintage: '2011', parker: 96, penin: 95, suckling: 94, atkin: 95 },
    { vintage: '2010', parker: 94, penin: 92, suckling: 90, atkin: 91 },
  ],

  // Critic badges
  criticScores: [
    { score: 95, critic: 'Parker' },
    { score: 94, critic: 'Peñín' },
    { score: 92, critic: 'Suckling' },
  ],

  // Winemaking
  winemaking: {
    fermentation: 'Fermentación en depósitos de acero inoxidable con control de temperatura. Maceración de 20-25 días.',
    aging: 'Crianza de 24 meses en barrica, seguida de 24 meses adicionales en botella antes de la comercialización.',
    wood: 'Barrica de roble francés de primera y segunda carga (50% de nueva cada año).',
    filtration: 'Ligeramente filtrado antes del embotellado para preservar la máxima expresión varietal.',
  },

  // Vineyard
  vineyard: {
    name: 'Viñedos de Vega Sicilia',
    vinesAge: '25-40 años',
    soil: 'Suelo de arcilla y arena con depósitos calcáreos. Excelente capacidad de drenaje.',
    climate: 'Continental mediterráneo con influencias atlánticas. Inviernos fríos y veranos cálidos.',
    orientation: 'Sur y Sureste',
    surface: '122 hectáreas',
    altitude: '750-850 metros',
  },

  // Packs including this wine
  packs: [
    {
      id: 'pack-1',
      name: 'Pack Ribera Legendaria',
      description: 'Selección de los mejores vinos de Ribera del Duero',
      price: 449.95,
      wines: 3,
      image: '/images/pack-ribera.jpg',
    },
    {
      id: 'pack-2',
      name: 'Pack Premium Selection',
      description: 'Los icónicos españoles más valorados',
      price: 599.95,
      wines: 4,
      image: '/images/pack-premium.jpg',
    },
  ],
};

// Mock related products
const mockRelatedProducts = [
  {
    id: '2',
    name: 'Pago de Carraovejas Pago 2014',
    price: 45.99,
    image: '/images/carraovejas.jpg',
    rating: 4.6,
    bodega: 'Pago de Carraovejas',
  },
  {
    id: '3',
    name: 'Pingus 2015',
    price: 89.99,
    image: '/images/pingus.jpg',
    rating: 4.8,
    bodega: 'Dominio de Pingus',
  },
  {
    id: '4',
    name: 'Aalto 2016',
    price: 34.99,
    image: '/images/aalto.jpg',
    rating: 4.5,
    bodega: 'Aalto',
  },
  {
    id: '5',
    name: 'Emilio Moro 2017',
    price: 28.99,
    image: '/images/emilio-moro.jpg',
    rating: 4.4,
    bodega: 'Emilio Moro',
  },
];

const mockSimilarWines = [
  {
    id: '6',
    name: 'Marqués de Murrieta Castillo Ygay Gran Reserva 2009',
    price: 125.99,
    image: '/images/murrieta.jpg',
    rating: 4.7,
    bodega: 'Marqués de Murrieta',
  },
  {
    id: '7',
    name: 'La Rioja Alta Viña Ardanza 2015',
    price: 59.99,
    image: '/images/viña-ardanza.jpg',
    rating: 4.6,
    bodega: 'La Rioja Alta',
  },
  {
    id: '8',
    name: 'Arzuaga Navarro Reserva 2014',
    price: 42.99,
    image: '/images/arzuaga.jpg',
    rating: 4.5,
    bodega: 'Arzuaga Navarro',
  },
  {
    id: '9',
    name: 'Conde de Assú Reserva 2015',
    price: 38.99,
    image: '/images/conde-assú.jpg',
    rating: 4.4,
    bodega: 'Conde de Assú',
  },
];

const mockCustomerReviews = [
  {
    id: '1',
    author: 'Jorge M.',
    date: '2024-03-15',
    rating: 5,
    title: 'Una verdadera joya',
    comment:
      'Excepcional, tal como esperaba. Un vino que justifica su reputación. La complejidad aromática y la estructura tánica son simplemente perfectas. Lo recomiendo para ocasiones especiales.',
  },
  {
    id: '2',
    author: 'María López',
    date: '2024-02-28',
    rating: 5,
    title: 'El mejor que he probado',
    comment:
      'Impresionante en todos los aspectos. La calidad del producto es indiscutible, y el envío fue rápido y seguro. Definitivamente volveré a comprar.',
  },
  {
    id: '3',
    author: 'Antonio García',
    date: '2024-02-10',
    rating: 4,
    title: 'Muy buen vino, precio algo elevado',
    comment:
      'Es un vino excelente, con una elegancia inconfundible. El precio es elevado, pero la calidad justifica la inversión. Recomendado para coleccionistas.',
  },
];

export default function ProductPage() {
  const [isFavorite, setIsFavorite] = useState(mockProduct.isFavorite);
  const [selectedQuantityType, setSelectedQuantityType] = useState<'1' | '2' | '3' | 'custom'>('1');
  const [customQuantity, setCustomQuantity] = useState(6);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    let quantity = 0;
    if (selectedQuantityType === '1') quantity = 1;
    else if (selectedQuantityType === '2') quantity = 2;
    else if (selectedQuantityType === '3') quantity = 3;
    else if (selectedQuantityType === 'custom') quantity = customQuantity;

    console.log(`Añadido al carrito: ${quantity} botellas de ${mockProduct.name}`);
    // Here you would add to cart logic
  };

  const getPrice = () => {
    const basePrice = mockProduct.price;
    let quantity = 0;

    if (selectedQuantityType === '1') quantity = 1;
    else if (selectedQuantityType === '2') quantity = 2;
    else if (selectedQuantityType === '3') quantity = 3;
    else if (selectedQuantityType === 'custom') quantity = customQuantity;

    return (basePrice * quantity).toFixed(2);
  };

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/paises/espana" className="hover:text-gray-900">
              {mockProduct.country}
            </Link>
            <span>/</span>
            <Link href={mockProduct.regionLink} className="hover:text-gray-900">
              {mockProduct.region}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{mockProduct.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* LEFT COLUMN - Images (60%) */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 h-[300px] md:h-[500px] flex items-center justify-center">
              {mockProduct.recommended && (
                <div className="absolute top-0 right-0 z-10 bg-red-600 text-white px-4 py-1 text-sm font-semibold transform rotate-45 translate-x-12 -translate-y-2">
                  Recomendado
                </div>
              )}
              <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                <img
                  src={mockProduct.images[currentImageIndex]}
                  alt={mockProduct.name}
                  className="object-contain max-w-full max-h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-center">
                  <div>
                    <Wine className="w-24 h-24 mx-auto mb-4 text-gray-300" />
                    <p>Imagen: {mockProduct.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {mockProduct.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-lg border-2 transition-all ${
                    currentImageIndex === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Product Info & Purchase (40%) */}
          <div className="lg:col-span-1">
            {/* Product Title */}
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">{mockProduct.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{mockProduct.vintage}</p>

            {/* Favorite Button */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`}
                />
                <span className="text-sm font-medium">{isFavorite ? mockProduct.favoritesCount + 1 : mockProduct.favoritesCount}</span>
              </button>
            </div>

            {/* Tagline */}
            <p className="text-gray-700 italic mb-6 text-base leading-relaxed">{mockProduct.tagline}</p>

            {/* Critic Scores */}
            <div className="flex flex-wrap gap-3 mb-6">
              {mockProduct.criticScores.map((score, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full"
                >
                  <div className="text-lg font-bold">{score.score}</div>
                  <div className="text-xs text-gray-300">{score.critic}</div>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              {renderStars(mockProduct.rating)}
              <span className="text-gray-600">
                {mockProduct.rating} ({' '}
                <Link href="#opiniones" className="text-blue-600 hover:underline">
                  {mockProduct.reviewsCount} opiniones
                </Link>
                )
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href={mockProduct.bodegaLink}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {mockProduct.producer}
              </Link>
              <Link
                href={mockProduct.regionLink}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {mockProduct.region}
              </Link>
              {mockProduct.grapes.map((grape, index) => (
                <div
                  key={index}
                  className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm"
                >
                  {grape}
                </div>
              ))}
            </div>

            {/* Purchase Panel */}
            <div className="border-2 border-gray-300 rounded-lg p-6">
              {/* Shipment Info */}
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-6">
                <Truck className="w-5 h-5" />
                <span>{mockProduct.shipmentText}</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {mockProduct.discount > 0 ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-gray-400 line-through text-lg">
                      {mockProduct.comparePrice.toFixed(2)}€
                    </span>
                    <span className="text-3xl font-bold text-red-600">
                      {mockProduct.price.toFixed(2)}€
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                      -{mockProduct.discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {mockProduct.price.toFixed(2)}€
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="1"
                    checked={selectedQuantityType === '1'}
                    onChange={() => setSelectedQuantityType('1')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">1 botella — {(mockProduct.price * 1).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="2"
                    checked={selectedQuantityType === '2'}
                    onChange={() => setSelectedQuantityType('2')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">2 botellas — {(mockProduct.price * 2).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="3"
                    checked={selectedQuantityType === '3'}
                    onChange={() => setSelectedQuantityType('3')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">3 botellas — {(mockProduct.price * 3).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="custom"
                    checked={selectedQuantityType === 'custom'}
                    onChange={() => setSelectedQuantityType('custom')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCustomQuantity(Math.max(6, customQuantity - 1))}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="6"
                      value={customQuantity}
                      onChange={(e) => setCustomQuantity(Math.max(6, parseInt(e.target.value) || 6))}
                      className="w-12 text-center border border-gray-300 rounded px-1"
                    />
                    <button
                      onClick={() => setCustomQuantity(customQuantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                    <span className="text-gray-700">— {getPrice()}€</span>
                  </div>
                </label>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors mb-6 text-lg"
              >
                AÑADIR AL CARRITO
              </button>

              {/* Trust Icons */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Envío gratis en compras superiores a 150€</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Seguro de envío incluido</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span>Trusted Shops certificado</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>Envío desde España en 24-48h</span>
                </div>
              </div>
            </div>

            {/* Packs */}
            {mockProduct.packs.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Packs que incluyen este vino</h3>
                <div className="space-y-3">
                  {mockProduct.packs.map((pack) => (
                    <Link
                      key={pack.id}
                      href={`/packs/${pack.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-900">{pack.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{pack.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{pack.wines} vinos</span>
                        <span className="font-bold text-blue-600">{pack.price.toFixed(2)}€</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ficha Técnica (Technical Sheet) */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Ficha técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Tipo', value: mockProduct.type },
              { label: 'Denominación', value: mockProduct.denomination },
              { label: 'Uvas', value: mockProduct.grapes.join(', ') },
              { label: 'Productor', value: mockProduct.producer },
              { label: 'Alérgenos', value: mockProduct.allergens },
              { label: 'Graduación', value: `${mockProduct.alcoholContent}% vol` },
              { label: 'Producción', value: `${mockProduct.production.toLocaleString()} botellas` },
              { label: 'Formato', value: mockProduct.format },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 font-medium mb-1">{item.label}</div>
                <div className="text-gray-900 font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Descripción (Description) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          {mockProduct.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Perfil Sensorial (Sensory Profile) */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Perfil sensorial</h2>
          <div className="space-y-8">
            {[
              { label: 'Ligero', current: mockProduct.sensoryProfile.bodyBalance, endLabel: 'Robusto' },
              { label: 'Suave', current: mockProduct.sensoryProfile.tannicBalance, endLabel: 'Tánico' },
              { label: 'Seco', current: mockProduct.sensoryProfile.dryness, endLabel: 'Dulce' },
              { label: 'Débil', current: mockProduct.sensoryProfile.acidity, endLabel: 'Ácido' },
            ].map((profile, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>{profile.label}</span>
                  <span>{profile.endLabel}</span>
                </div>
                <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${(profile.current / 10) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"
                    style={{ left: `${(profile.current / 10) * 100}%`, transform: 'translate(-50%, -50%)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notas de Cata (Tasting Notes) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Notas de cata</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Vista', icon: Eye, text: mockProduct.tastingNotes.eye },
            { title: 'Nariz', icon: Flower2, text: mockProduct.tastingNotes.nose },
            { title: 'Boca', icon: Wine, text: mockProduct.tastingNotes.mouth },
          ].map((note, index) => {
            const IconComponent = note.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{note.title}</h3>
                <p className="text-gray-700 leading-relaxed">{note.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Temperatura y Maridaje */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Temperatura y maridaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Temperature */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Temperatura de servicio</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockProduct.servingTemperature}</p>
            </div>

            {/* Pairings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maridaje</h3>
              <div className="grid grid-cols-2 gap-4">
                {mockProduct.pairings.map((pairing, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-2xl">{pairing.icon}</span>
                    <span className="text-gray-700">{pairing.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Puntuaciones (Ratings History) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Puntuaciones por añada</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Añada</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Parker</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Peñín</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Suckling</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Tim Atkin</th>
              </tr>
            </thead>
            <tbody>
              {mockProduct.scoresHistory.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 font-semibold text-gray-900">{row.vintage}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 font-bold text-purple-900">
                        {row.parker}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 font-bold text-orange-900">
                        {row.penin}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 font-bold text-green-900">
                        {row.suckling}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 font-bold text-blue-900">
                        {row.atkin}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Opiniones de Clientes (Customer Reviews) */}
      <div id="opiniones" className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Opiniones de clientes</h2>

          {/* Average Rating Summary */}
          <div className="flex items-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900">{mockProduct.rating}</div>
              <div className="flex justify-center my-2">{renderStars(mockProduct.rating, 'w-6 h-6')}</div>
              <p className="text-gray-600">{mockProduct.reviewsCount} opiniones</p>
            </div>
            <div className="h-20 border-l border-gray-300" />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Escribir una opinión
            </button>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {mockCustomerReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>{renderStars(review.rating, 'w-4 h-4')}</div>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elaboración (Winemaking) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Elaboración</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'Fermentación', value: mockProduct.winemaking.fermentation },
            { label: 'Crianza', value: mockProduct.winemaking.aging },
            { label: 'Madera', value: mockProduct.winemaking.wood },
            { label: 'Filtración', value: mockProduct.winemaking.filtration },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Viñedo (Vineyard) */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Viñedo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Nombre del viñedo', value: mockProduct.vineyard.name },
              { label: 'Edad de la viña', value: mockProduct.vineyard.vinesAge },
              { label: 'Suelo', value: mockProduct.vineyard.soil },
              { label: 'Clima', value: mockProduct.vineyard.climate },
              { label: 'Orientación', value: mockProduct.vineyard.orientation },
              { label: 'Superficie', value: mockProduct.vineyard.surface },
              { label: 'Altitud', value: mockProduct.vineyard.altitude },
            ].map((item, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                <p className="text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section 1: Otros vinos de la bodega */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Otros vinos de {mockProduct.producer}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockRelatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Related Products Section 2: Otros clientes también compraron */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Otros clientes también compraron</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRelatedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section 3: Vinos similares */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Vinos similares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSimilarWines.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Card Component for Related Products
function ProductCard({
  product,
}: {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    bodega: string;
  };
}) {
  return (
    <Link href={`/vino/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-all hover:shadow-lg">
        {/* Image */}
        <div className="bg-gray-100 h-64 flex items-center justify-center overflow-hidden group-hover:bg-gray-200 transition-colors">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
            <Wine className="w-12 h-12 text-gray-300" />
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-600 mb-3">{product.bodega}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">{renderStarsStatic(product.rating, 'w-3 h-3')}</div>
            <span className="text-xs text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="text-lg font-bold text-gray-900">{product.price.toFixed(2)}€</div>
        </div>
      </div>
    </Link>
  );
}

// Helper function for rendering stars in ProductCard
function renderStarsStatic(rating: number, size: string = 'w-5 h-5') {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Star,
  Truck,
  Award,
  Thermometer,
  Eye,
  Flower2,
  Wine,
  MapPin,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';

// Mock data for the product
const mockProduct = {
  id: '1',
  slug: 'vega-sicilia-unico-2013',
  name: 'Vega Sicilia Único',
  vintage: '2013',
  country: 'España',
  region: 'Ribera del Duero',
  bodega: 'Bodegas Vega Sicilia',
  bodegaLink: '/bodegas/vega-sicilia',
  regionLink: '/regiones/ribera-del-duero',
  tagline: 'El vino más icónico de España, expresión de excelencia y tradición',
  price: 189.95,
  comparePrice: 229.95,
  discount: 17,
  image: '/images/vega-sicilia-unico-2013.jpg',
  images: ['/images/vega-sicilia-unico-2013.jpg', '/images/vega-sicilia-2.jpg', '/images/vega-sicilia-3.jpg'],
  isFavorite: false,
  favoritesCount: 1247,
  rating: 4.7,
  reviewsCount: 89,
  recommended: true,
  shipmentText: 'Envío inmediato',

  // Technical specs
  type: 'Tinto de Guarda',
  denomination: 'DO Ribera del Duero',
  grapes: ['Tinto Fino (90%)', 'Cabernet Sauvignon (10%)'],
  producer: 'Bodegas Vega Sicilia',
  allergens: 'Contiene sulfitos',
  alcoholContent: 14.5,
  production: 75000,
  format: '0,75L',

  // Description
  description: `Vega Sicilia Único es la joya de la corona de Bodegas Vega Sicilia, una bodega legendaria con más de 150 años de historia en la Ribera del Duero. Este excepcional vino tinto es resultado de una cuidadosa selección de sus mejores uvas y un proceso de elaboración que combina tradición e innovación.

Con una estructura compleja y elegante, Vega Sicilia Único se distingue por su equilibrio perfecto entre poder y finura. Sus aromas intensos, su paladar profundo y su final persistente hacen de este vino una experiencia inolvidable para cualquier amante del buen vino.

Este es un vino para guardar, que mejora con la edad y revela nuevas facetas a medida que pasan los años. En bodega, atraviesa un proceso de crianza cuidadosamente controlado que realza sus cualidades y le confiere una complejidad característica.`,

  // Sensory profile (1-10 scale)
  sensoryProfile: {
    bodyBalance: 8, // Ligero (0) ← → Robusto (10)
    tannicBalance: 7.5, // Suave (0) ← → Tánico (10)
    dryness: 8, // Seco (0) ← → Dulce (10)
    acidity: 7, // Débil (0) ← → Ácido (10)
  },

  // Tasting notes
  tastingNotes: {
    eye: 'Rojo granate profundo, con ribete cereza. Buena intensidad cromática indicadora de la concentración y potencial de guarda.',
    nose: 'Aromas complejos de ciruela y mora en conserva, hinojo, tabaco rubio, vainilla, cacao y especias suaves. Nariz elegante y envolvente que evolucionará con el tiempo.',
    mouth: 'Entrada tánica firme pero sedosa. Estructura de gran tamaño, con taninos finos bien integrados. Frutas rojas y negras, con toques de cuero y grafito. Final largo y persistente, con una ligera amargura noble característica.',
  },

  // Serving
  servingTemperature: '16-18°C',
  pairings: [
    { name: 'Carnes rojas', icon: '🥩' },
    { name: 'Quesos curados', icon: '🧀' },
    { name: 'Guisos', icon: '🍲' },
    { name: 'Setas y trufas', icon: '🍄' },
    { name: 'Embutidos ibéricos', icon: '🥓' },
  ],

  // Ratings history
  scoresHistory: [
    { vintage: '2013', parker: 95, penin: 94, suckling: 92, atkin: 93 },
    { vintage: '2012', parker: 94, penin: 93, suckling: 91, atkin: 92 },
    { vintage: '2011', parker: 96, penin: 95, suckling: 94, atkin: 95 },
    { vintage: '2010', parker: 94, penin: 92, suckling: 90, atkin: 91 },
  ],

  // Critic badges
  criticScores: [
    { score: 95, critic: 'Parker' },
    { score: 94, critic: 'Peñín' },
    { score: 92, critic: 'Suckling' },
  ],

  // Winemaking
  winemaking: {
    fermentation: 'Fermentación en depósitos de acero inoxidable con control de temperatura. Maceración de 20-25 días.',
    aging: 'Crianza de 24 meses en barrica, seguida de 24 meses adicionales en botella antes de la comercialización.',
    wood: 'Barrica de roble francés de primera y segunda carga (50% de nueva cada año).',
    filtration: 'Ligeramente filtrado antes del embotellado para preservar la máxima expresión varietal.',
  },

  // Vineyard
  vineyard: {
    name: 'Viñedos de Vega Sicilia',
    vinesAge: '25-40 años',
    soil: 'Suelo de arcilla y arena con depósitos calcáreos. Excelente capacidad de drenaje.',
    climate: 'Continental mediterráneo con influencias atlánticas. Inviernos fríos y veranos cálidos.',
    orientation: 'Sur y Sureste',
    surface: '122 hectáreas',
    altitude: '750-850 metros',
  },

  // Packs including this wine
  packs: [
    {
      id: 'pack-1',
      name: 'Pack Ribera Legendaria',
      description: 'Selección de los mejores vinos de Ribera del Duero',
      price: 449.95,
      wines: 3,
      image: '/images/pack-ribera.jpg',
    },
    {
      id: 'pack-2',
      name: 'Pack Premium Selection',
      description: 'Los icónicos españoles más valorados',
      price: 599.95,
      wines: 4,
      image: '/images/pack-premium.jpg',
    },
  ],
};

// Mock related products
const mockRelatedProducts = [
  {
    id: '2',
    name: 'Pago de Carraovejas Pago 2014',
    price: 45.99,
    image: '/images/carraovejas.jpg',
    rating: 4.6,
    bodega: 'Pago de Carraovejas',
  },
  {
    id: '3',
    name: 'Pingus 2015',
    price: 89.99,
    image: '/images/pingus.jpg',
    rating: 4.8,
    bodega: 'Dominio de Pingus',
  },
  {
    id: '4',
    name: 'Aalto 2016',
    price: 34.99,
    image: '/images/aalto.jpg',
    rating: 4.5,
    bodega: 'Aalto',
  },
  {
    id: '5',
    name: 'Emilio Moro 2017',
    price: 28.99,
    image: '/images/emilio-moro.jpg',
    rating: 4.4,
    bodega: 'Emilio Moro',
  },
];

const mockSimilarWines = [
  {
    id: '6',
    name: 'Marqués de Murrieta Castillo Ygay Gran Reserva 2009',
    price: 125.99,
    image: '/images/murrieta.jpg',
    rating: 4.7,
    bodega: 'Marqués de Murrieta',
  },
  {
    id: '7',
    name: 'La Rioja Alta Viña Ardanza 2015',
    price: 59.99,
    image: '/images/viña-ardanza.jpg',
    rating: 4.6,
    bodega: 'La Rioja Alta',
  },
  {
    id: '8',
    name: 'Arzuaga Navarro Reserva 2014',
    price: 42.99,
    image: '/images/arzuaga.jpg',
    rating: 4.5,
    bodega: 'Arzuaga Navarro',
  },
  {
    id: '9',
    name: 'Conde de Assú Reserva 2015',
    price: 38.99,
    image: '/images/conde-assú.jpg',
    rating: 4.4,
    bodega: 'Conde de Assú',
  },
];

const mockCustomerReviews = [
  {
    id: '1',
    author: 'Jorge M.',
    date: '2024-03-15',
    rating: 5,
    title: 'Una verdadera joya',
    comment:
      'Excepcional, tal como esperaba. Un vino que justifica su reputación. La complejidad aromática y la estructura tánica son simplemente perfectas. Lo recomiendo para ocasiones especiales.',
  },
  {
    id: '2',
    author: 'María López',
    date: '2024-02-28',
    rating: 5,
    title: 'El mejor que he probado',
    comment:
      'Impresionante en todos los aspectos. La calidad del producto es indiscutible, y el envío fue rápido y seguro. Definitivamente volveré a comprar.',
  },
  {
    id: '3',
    author: 'Antonio García',
    date: '2024-02-10',
    rating: 4,
    title: 'Muy buen vino, precio algo elevado',
    comment:
      'Es un vino excelente, con una elegancia inconfundible. El precio es elevado, pero la calidad justifica la inversión. Recomendado para coleccionistas.',
  },
];

export default function ProductPage() {
  const [isFavorite, setIsFavorite] = useState(mockProduct.isFavorite);
  const [selectedQuantityType, setSelectedQuantityType] = useState<'1' | '2' | '3' | 'custom'>('1');
  const [customQuantity, setCustomQuantity] = useState(6);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    let quantity = 0;
    if (selectedQuantityType === '1') quantity = 1;
    else if (selectedQuantityType === '2') quantity = 2;
    else if (selectedQuantityType === '3') quantity = 3;
    else if (selectedQuantityType === 'custom') quantity = customQuantity;

    console.log(`Añadido al carrito: ${quantity} botellas de ${mockProduct.name}`);
    // Here you would add to cart logic
  };

  const getPrice = () => {
    const basePrice = mockProduct.price;
    let quantity = 0;

    if (selectedQuantityType === '1') quantity = 1;
    else if (selectedQuantityType === '2') quantity = 2;
    else if (selectedQuantityType === '3') quantity = 3;
    else if (selectedQuantityType === 'custom') quantity = customQuantity;

    return (basePrice * quantity).toFixed(2);
  };

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/paises/espana" className="hover:text-gray-900">
              {mockProduct.country}
            </Link>
            <span>/</span>
            <Link href={mockProduct.regionLink} className="hover:text-gray-900">
              {mockProduct.region}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{mockProduct.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-12">
          {/* LEFT COLUMN - Images (60%) */}
          <div className="col-span-2">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 h-[500px] flex items-center justify-center">
              {mockProduct.recommended && (
                <div className="absolute top-0 right-0 z-10 bg-red-600 text-white px-4 py-1 text-sm font-semibold transform rotate-45 translate-x-12 -translate-y-2">
                  Recomendado
                </div>
              )}
              <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                <img
                  src={mockProduct.images[currentImageIndex]}
                  alt={mockProduct.name}
                  className="object-contain max-w-full max-h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-center">
                  <div>
                    <Wine className="w-24 h-24 mx-auto mb-4 text-gray-300" />
                    <p>Imagen: {mockProduct.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {mockProduct.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-lg border-2 transition-all ${
                    currentImageIndex === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Product Info & Purchase (40%) */}
          <div className="col-span-1">
            {/* Product Title */}
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">{mockProduct.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{mockProduct.vintage}</p>

            {/* Favorite Button */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`}
                />
                <span className="text-sm font-medium">{isFavorite ? mockProduct.favoritesCount + 1 : mockProduct.favoritesCount}</span>
              </button>
            </div>

            {/* Tagline */}
            <p className="text-gray-700 italic mb-6 text-base leading-relaxed">{mockProduct.tagline}</p>

            {/* Critic Scores */}
            <div className="flex flex-wrap gap-3 mb-6">
              {mockProduct.criticScores.map((score, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full"
                >
                  <div className="text-lg font-bold">{score.score}</div>
                  <div className="text-xs text-gray-300">{score.critic}</div>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              {renderStars(mockProduct.rating)}
              <span className="text-gray-600">
                {mockProduct.rating} ({' '}
                <Link href="#opiniones" className="text-blue-600 hover:underline">
                  {mockProduct.reviewsCount} opiniones
                </Link>
                )
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href={mockProduct.bodegaLink}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {mockProduct.producer}
              </Link>
              <Link
                href={mockProduct.regionLink}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {mockProduct.region}
              </Link>
              {mockProduct.grapes.map((grape, index) => (
                <div
                  key={index}
                  className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm"
                >
                  {grape}
                </div>
              ))}
            </div>

            {/* Purchase Panel */}
            <div className="border-2 border-gray-300 rounded-lg p-6">
              {/* Shipment Info */}
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-6">
                <Truck className="w-5 h-5" />
                <span>{mockProduct.shipmentText}</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {mockProduct.discount > 0 ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-gray-400 line-through text-lg">
                      {mockProduct.comparePrice.toFixed(2)}€
                    </span>
                    <span className="text-3xl font-bold text-red-600">
                      {mockProduct.price.toFixed(2)}€
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                      -{mockProduct.discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {mockProduct.price.toFixed(2)}€
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="1"
                    checked={selectedQuantityType === '1'}
                    onChange={() => setSelectedQuantityType('1')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">1 botella — {(mockProduct.price * 1).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="2"
                    checked={selectedQuantityType === '2'}
                    onChange={() => setSelectedQuantityType('2')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">2 botellas — {(mockProduct.price * 2).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="3"
                    checked={selectedQuantityType === '3'}
                    onChange={() => setSelectedQuantityType('3')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-700">3 botellas — {(mockProduct.price * 3).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="quantity"
                    value="custom"
                    checked={selectedQuantityType === 'custom'}
                    onChange={() => setSelectedQuantityType('custom')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCustomQuantity(Math.max(6, customQuantity - 1))}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="6"
                      value={customQuantity}
                      onChange={(e) => setCustomQuantity(Math.max(6, parseInt(e.target.value) || 6))}
                      className="w-12 text-center border border-gray-300 rounded px-1"
                    />
                    <button
                      onClick={() => setCustomQuantity(customQuantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                    <span className="text-gray-700">— {getPrice()}€</span>
                  </div>
                </label>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors mb-6 text-lg"
              >
                AÑADIR AL CARRITO
              </button>

              {/* Trust Icons */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Envío gratis en compras superiores a 150€</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Seguro de envío incluido</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span>Trusted Shops certificado</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>Envío desde España en 24-48h</span>
                </div>
              </div>
            </div>

            {/* Packs */}
            {mockProduct.packs.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Packs que incluyen este vino</h3>
                <div className="space-y-3">
                  {mockProduct.packs.map((pack) => (
                    <Link
                      key={pack.id}
                      href={`/packs/${pack.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-900">{pack.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{pack.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{pack.wines} vinos</span>
                        <span className="font-bold text-blue-600">{pack.price.toFixed(2)}€</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ficha Técnica (Technical Sheet) */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Ficha técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Tipo', value: mockProduct.type },
              { label: 'Denominación', value: mockProduct.denomination },
              { label: 'Uvas', value: mockProduct.grapes.join(', ') },
              { label: 'Productor', value: mockProduct.producer },
              { label: 'Alérgenos', value: mockProduct.allergens },
              { label: 'Graduación', value: `${mockProduct.alcoholContent}% vol` },
              { label: 'Producción', value: `${mockProduct.production.toLocaleString()} botellas` },
              { label: 'Formato', value: mockProduct.format },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 font-medium mb-1">{item.label}</div>
                <div className="text-gray-900 font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Descripción (Description) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          {mockProduct.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Perfil Sensorial (Sensory Profile) */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Perfil sensorial</h2>
          <div className="space-y-8">
            {[
              { label: 'Ligero', current: mockProduct.sensoryProfile.bodyBalance, endLabel: 'Robusto' },
              { label: 'Suave', current: mockProduct.sensoryProfile.tannicBalance, endLabel: 'Tánico' },
              { label: 'Seco', current: mockProduct.sensoryProfile.dryness, endLabel: 'Dulce' },
              { label: 'Débil', current: mockProduct.sensoryProfile.acidity, endLabel: 'Ácido' },
            ].map((profile, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>{profile.label}</span>
                  <span>{profile.endLabel}</span>
                </div>
                <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${(profile.current / 10) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm"
                    style={{ left: `${(profile.current / 10) * 100}%`, transform: 'translate(-50%, -50%)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notas de Cata (Tasting Notes) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Notas de cata</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Vista', icon: Eye, text: mockProduct.tastingNotes.eye },
            { title: 'Nariz', icon: Flower2, text: mockProduct.tastingNotes.nose },
            { title: 'Boca', icon: Wine, text: mockProduct.tastingNotes.mouth },
          ].map((note, index) => {
            const IconComponent = note.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{note.title}</h3>
                <p className="text-gray-700 leading-relaxed">{note.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Temperatura y Maridaje */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Temperatura y maridaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Temperature */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Temperatura de servicio</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockProduct.servingTemperature}</p>
            </div>

            {/* Pairings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maridaje</h3>
              <div className="grid grid-cols-2 gap-4">
                {mockProduct.pairings.map((pairing, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-2xl">{pairing.icon}</span>
                    <span className="text-gray-700">{pairing.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Puntuaciones (Ratings History) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Puntuaciones por añada</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Añada</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Parker</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Peñín</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Suckling</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Tim Atkin</th>
              </tr>
            </thead>
            <tbody>
              {mockProduct.scoresHistory.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 font-semibold text-gray-900">{row.vintage}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 font-bold text-purple-900">
                        {row.parker}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 font-bold text-orange-900">
                        {row.penin}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 font-bold text-green-900">
                        {row.suckling}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 font-bold text-blue-900">
                        {row.atkin}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Opiniones de Clientes (Customer Reviews) */}
      <div id="opiniones" className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Opiniones de clientes</h2>

          {/* Average Rating Summary */}
          <div className="flex items-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900">{mockProduct.rating}</div>
              <div className="flex justify-center my-2">{renderStars(mockProduct.rating, 'w-6 h-6')}</div>
              <p className="text-gray-600">{mockProduct.reviewsCount} opiniones</p>
            </div>
            <div className="h-20 border-l border-gray-300" />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Escribir una opinión
            </button>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {mockCustomerReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>{renderStars(review.rating, 'w-4 h-4')}</div>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elaboración (Winemaking) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Elaboración</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'Fermentación', value: mockProduct.winemaking.fermentation },
            { label: 'Crianza', value: mockProduct.winemaking.aging },
            { label: 'Madera', value: mockProduct.winemaking.wood },
            { label: 'Filtración', value: mockProduct.winemaking.filtration },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Viñedo (Vineyard) */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Viñedo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Nombre del viñedo', value: mockProduct.vineyard.name },
              { label: 'Edad de la viña', value: mockProduct.vineyard.vinesAge },
              { label: 'Suelo', value: mockProduct.vineyard.soil },
              { label: 'Clima', value: mockProduct.vineyard.climate },
              { label: 'Orientación', value: mockProduct.vineyard.orientation },
              { label: 'Superficie', value: mockProduct.vineyard.surface },
              { label: 'Altitud', value: mockProduct.vineyard.altitude },
            ].map((item, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                <p className="text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section 1: Otros vinos de la bodega */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Otros vinos de {mockProduct.producer}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockRelatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Related Products Section 2: Otros clientes también compraron */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Otros clientes también compraron</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRelatedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section 3: Vinos similares */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Vinos similares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSimilarWines.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Card Component for Related Products
function ProductCard({
  product,
}: {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    bodega: string;
  };
}) {
  return (
    <Link href={`/vino/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-all hover:shadow-lg">
        {/* Image */}
        <div className="bg-gray-100 h-64 flex items-center justify-center overflow-hidden group-hover:bg-gray-200 transition-colors">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
            <Wine className="w-12 h-12 text-gray-300" />
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-600 mb-3">{product.bodega}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">{renderStarsStatic(product.rating, 'w-3 h-3')}</div>
            <span className="text-xs text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="text-lg font-bold text-gray-900">{product.price.toFixed(2)}€</div>
        </div>
      </div>
    </Link>
  );
}

// Helper function for rendering stars in ProductCard
function renderStarsStatic(rating: number, size: string = 'w-5 h-5') {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </>
  );
}
