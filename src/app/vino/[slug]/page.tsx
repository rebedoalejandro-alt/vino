'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
import { getProductDetailData, CARREFOUR_PRODUCTS } from '@/lib/carrefour-products';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const productDetail = getProductDetailData(slug);

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedQuantityType, setSelectedQuantityType] = useState<'1' | '2' | '3' | 'custom'>('1');
  const [customQuantity, setCustomQuantity] = useState(6);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!productDetail) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Wine className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-8">No hemos encontrado el vino que buscas.</p>
          <Link href="/" className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const product = productDetail;
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const bodegaName = product.bodega?.name || 'Bodega';
  const regionName = product.region?.name || 'España';
  const grapeNames = product.grapes ? product.grapes.map(g => g.name) : [];
  const favoritesCount = 127;
  const reviewsCount = Math.floor(Math.random() * 50) + 10;
  const rating = 4.2 + Math.random() * 0.6;
  const ratingFixed = parseFloat(rating.toFixed(1));

  // Related products (random selection from CARREFOUR_PRODUCTS, excluding current)
  const relatedProducts = CARREFOUR_PRODUCTS
    .filter(p => p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const similarWines = CARREFOUR_PRODUCTS
    .filter(p => p.id !== product.id && p.wineType === product.wineType)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const bodegaWines = CARREFOUR_PRODUCTS
    .filter(p => p.id !== product.id && p.bodega?.name === bodegaName)
    .slice(0, 4);

  const handleAddToCart = () => {
    let quantity = 0;
    if (selectedQuantityType === '1') quantity = 1;
    else if (selectedQuantityType === '2') quantity = 2;
    else if (selectedQuantityType === '3') quantity = 3;
    else if (selectedQuantityType === 'custom') quantity = customQuantity;
    console.log(`Añadido al carrito: ${quantity} botellas de ${product.name}`);
  };

  const getPrice = () => {
    const basePrice = product.price;
    let quantity = 0;
    if (selectedQuantityType === '1') quantity = 1;
    else if (selectedQuantityType === '2') quantity = 2;
    else if (selectedQuantityType === '3') quantity = 3;
    else if (selectedQuantityType === 'custom') quantity = customQuantity;
    return (basePrice * quantity).toFixed(2);
  };

  const renderStars = (r: number, size: string = 'w-5 h-5') => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${i < Math.floor(r) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discount = hasDiscount ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100) : 0;

  // Wine type label
  const wineTypeLabels: Record<string, string> = {
    tinto: 'Tinto',
    blanco: 'Blanco',
    rosado: 'Rosado',
    espumoso: 'Espumoso',
    dulce: 'Dulce',
    generoso: 'Generoso',
  };

  // Customer reviews (generated for each product)
  const customerReviews = [
    {
      id: '1',
      author: 'Jorge M.',
      date: '2024-03-15',
      rating: 5,
      title: 'Muy buen vino',
      comment: `${product.name} es un vino excelente. Muy buena relación calidad-precio. Lo recomiendo para cualquier ocasión.`,
    },
    {
      id: '2',
      author: 'María López',
      date: '2024-02-28',
      rating: 4,
      title: 'Buena compra',
      comment: 'El envío fue rápido y el vino llegó en perfecto estado. El sabor es agradable, volveré a comprarlo.',
    },
    {
      id: '3',
      author: 'Antonio García',
      date: '2024-02-10',
      rating: 5,
      title: 'Sorprendente',
      comment: `Recomendado. ${bodegaName} no defrauda. Un vino con mucho carácter y personalidad.`,
    },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Inicio</Link>
            <span>/</span>
            <Link href="/vinos" className="hover:text-gray-900">Vinos</Link>
            <span>/</span>
            <Link href={`/vinos/${product.wineType}`} className="hover:text-gray-900">
              {wineTypeLabels[product.wineType] || product.wineType}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* LEFT COLUMN - Images */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 h-[300px] md:h-[500px] flex items-center justify-center">
              {product.featured && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">
                  Destacado
                </div>
              )}
              <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="object-contain max-w-full max-h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg border-2 transition-all overflow-hidden ${
                      currentImageIndex === index
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Product Info & Purchase */}
          <div className="lg:col-span-1">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{product.vintage}</p>

            {/* Favorite Button */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
                <span className="text-sm font-medium">{isFavorite ? favoritesCount + 1 : favoritesCount}</span>
              </button>
            </div>

            {/* Tagline */}
            <p className="text-gray-700 italic mb-6 text-base leading-relaxed">
              {product.wineType === 'tinto' ? 'Vino tinto con cuerpo y carácter' :
               product.wineType === 'blanco' ? 'Vino blanco fresco y aromático' :
               product.wineType === 'rosado' ? 'Vino rosado refrescante y afrutado' :
               'Vino con personalidad única'} de {bodegaName}, {regionName}.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              {renderStars(ratingFixed)}
              <span className="text-gray-600">
                {ratingFixed} ({' '}
                <Link href="#opiniones" className="text-blue-600 hover:underline">
                  {reviewsCount} opiniones
                </Link>
                )
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href={`/bodega/${product.bodegaId}`}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {bodegaName}
              </Link>
              <Link
                href={`/region/${product.regionId}`}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {regionName}
              </Link>
              {grapeNames.map((grape, index) => (
                <div key={index} className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                  {grape}
                </div>
              ))}
            </div>

            {/* Purchase Panel */}
            <div className="border-2 border-gray-300 rounded-lg p-6">
              {/* Shipment Info */}
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-6">
                <Truck className="w-5 h-5" />
                <span>Envío inmediato</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {hasDiscount ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-gray-400 line-through text-lg">
                      {product.comparePrice!.toFixed(2)}€
                    </span>
                    <span className="text-3xl font-bold text-red-600">
                      {product.price.toFixed(2)}€
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                      -{discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price.toFixed(2)}€
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="quantity" value="1" checked={selectedQuantityType === '1'} onChange={() => setSelectedQuantityType('1')} className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">1 botella — {(product.price * 1).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="quantity" value="2" checked={selectedQuantityType === '2'} onChange={() => setSelectedQuantityType('2')} className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">2 botellas — {(product.price * 2).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="quantity" value="3" checked={selectedQuantityType === '3'} onChange={() => setSelectedQuantityType('3')} className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">3 botellas — {(product.price * 3).toFixed(2)}€</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="quantity" value="custom" checked={selectedQuantityType === 'custom'} onChange={() => setSelectedQuantityType('custom')} className="w-5 h-5 text-blue-600" />
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCustomQuantity(Math.max(6, customQuantity - 1))} className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">−</button>
                    <input type="number" min="6" value={customQuantity} onChange={(e) => setCustomQuantity(Math.max(6, parseInt(e.target.value) || 6))} className="w-12 text-center border border-gray-300 rounded px-1" />
                    <button onClick={() => setCustomQuantity(customQuantity + 1)} className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">+</button>
                    <span className="text-gray-700">— {getPrice()}€</span>
                  </div>
                </label>
              </div>

              {/* Add to Cart Button */}
              <button onClick={handleAddToCart} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors mb-6 text-lg">
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
          </div>
        </div>
      </div>

      {/* Ficha Técnica */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Ficha técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Tipo', value: wineTypeLabels[product.wineType] || product.wineType },
              { label: 'Denominación', value: regionName },
              { label: 'Uvas', value: grapeNames.join(', ') || 'Tempranillo' },
              { label: 'Bodega', value: bodegaName },
              { label: 'Alérgenos', value: 'Contiene sulfitos' },
              { label: 'Graduación', value: `${product.alcohol}% vol` },
              { label: 'Añada', value: `${product.vintage}` },
              { label: 'Formato', value: productDetail.format.bottle },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 font-medium mb-1">{item.label}</div>
                <div className="text-gray-900 font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          {productDetail.description.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Perfil Sensorial */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Perfil sensorial</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Color', text: productDetail.sensoryProfile.color },
              { title: 'Aroma', text: productDetail.sensoryProfile.aroma },
              { title: 'Paladar', text: productDetail.sensoryProfile.palate },
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notas de Cata */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Notas de cata</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Vista', icon: Eye, text: productDetail.sensoryProfile.color },
            { title: 'Nariz', icon: Flower2, text: productDetail.sensoryProfile.aroma },
            { title: 'Boca', icon: Wine, text: productDetail.sensoryProfile.palate },
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
        {/* Tasting notes tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {productDetail.tastingNotes.map((note: string, index: number) => (
            <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Temperatura y Maridaje */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Temperatura y maridaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Temperatura de servicio</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {productDetail.servingTemperature.min}-{productDetail.servingTemperature.max}°C
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maridaje</h3>
              <div className="space-y-3">
                {productDetail.pairings.map((pairing: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-gray-700">{pairing}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elaboración */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Elaboración</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'Crianza', value: productDetail.winemaking.aging },
            { label: 'Tipo de barrica', value: productDetail.winemaking.barrelType || 'No especificado' },
            { label: 'Método de producción', value: productDetail.winemaking.productionMethod },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Viñedo */}
      <div className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Viñedo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Terroir', value: productDetail.vineyard.terroir },
              { label: 'Clima', value: productDetail.vineyard.climate },
              { label: 'Tipo de suelo', value: productDetail.vineyard.soilType },
            ].map((item, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                <p className="text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opiniones de Clientes */}
      <div id="opiniones" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Opiniones de clientes</h2>
          <div className="flex items-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900">{ratingFixed}</div>
              <div className="flex justify-center my-2">{renderStars(ratingFixed, 'w-6 h-6')}</div>
              <p className="text-gray-600">{reviewsCount} opiniones</p>
            </div>
            <div className="h-20 border-l border-gray-300" />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Escribir una opinión
            </button>
          </div>
          <div className="space-y-6">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
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

      {/* Otros vinos de la bodega */}
      {bodegaWines.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Otros vinos de {bodegaName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bodegaWines.map((p) => (
                <RelatedProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vinos similares */}
      {similarWines.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Vinos similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarWines.map((p) => (
                <RelatedProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Otros clientes también compraron */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Otros clientes también compraron</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <RelatedProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component for Related Products
function RelatedProductCard({ product }: { product: { id: string; slug?: string; name: string; price: number; image: string; bodega?: { name: string }; } }) {
  const linkSlug = product.slug || product.id;
  return (
    <Link href={`/vino/${linkSlug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-all hover:shadow-lg">
        <div className="bg-gray-100 h-64 flex items-center justify-center overflow-hidden group-hover:bg-gray-200 transition-colors">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          {product.bodega && <p className="text-xs text-gray-600 mb-3">{product.bodega.name}</p>}
          <div className="text-lg font-bold text-gray-900">{product.price.toFixed(2)}€</div>
        </div>
      </div>
    </Link>
  );
}
