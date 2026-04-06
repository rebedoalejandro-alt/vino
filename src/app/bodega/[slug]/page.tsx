'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Award, Leaf, Grape } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Pagination } from '@/components/common/Pagination';
import { ProductCard } from '@/components/product/ProductCard';
import { SortBar } from '@/components/product/SortBar';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

const PRODUCTS_PER_PAGE = 12;

// Mock bodega data for "Vega Sicilia"
const mockBodegaData = {
  id: '1',
  slug: 'vega-sicilia',
  name: 'Vega Sicilia',
  enologist: 'Javier Úlcano',
  country: 'España',
  region: 'Ribera del Duero',
  founded: 1864,
  mainGrapes: ['Tinto Fino', 'Cabernet Sauvignon', 'Merlot'],
  image: 'https://via.placeholder.com/1200x600?text=Vega+Sicilia+Bodega',
  description: `Vega Sicilia es una bodega legendaria con más de 150 años de historia, fundada en 1864 en la Ribera del Duero. Es uno de los productores de vino más emblemáticos de España y del mundo, reconocido internacionalmente por la excelencia y consistencia de sus vinos.

La bodega fue pionera en introducir la crianza en barriles de roble francés en la Ribera del Duero, una práctica que revolucionó la elaboración de vinos en la región. Desde sus inicios, Vega Sicilia ha mantenido un compromiso inquebrantable con la calidad, utilizando únicamente uvas de sus propios viñedos y aplicando los más estrictos controles de producción.

Con más de 1.000 hectáreas de viñedos, Vega Sicilia produce alrededor de 400.000 botellas anuales de sus distintas líneas. La bodega combina la tradición centenaria con técnicas modernas de viticultura y enología, permitiendo que cada cosecha sea una expresión perfecta del terroir de la Ribera del Duero.

La filosofía de Vega Sicilia se basa en la creencia de que el gran vino es resultado de una cuidadosa selección de uvas, un proceso de elaboración meticuloso, y una paciencia en el envejecimiento que puede durar años. Cada botella de Vega Sicilia es un testimonio de esta dedicación a la excelencia.

Los vinos de Vega Sicilia, especialmente su emblemático Único, han alcanzado puntuaciones históricamente altas de críticos de renombre mundial como Robert Parker, quienes han elogiado consistentemente la complejidad, estructura y potencial de guarda de estos vinos.`,
  regions: ['Ribera del Duero'],
};

function BodegaPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedDescription, setExpandedDescription] = useState(false);

  // Filter products by bodega
  const bodegaProducts = MOCK_PRODUCTS.filter(
    (product) => product.bodega?.id === mockBodegaData.id
  );

  // Simple sorting logic
  const sortedProducts = [...bodegaProducts];

  if (sortBy === 'precio-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'precio-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    sortedProducts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === 'bestseller') {
    sortedProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => {
      const aRating = a.ratings?.[0]?.score ?? 0;
      const bRating = b.ratings?.[0]?.score ?? 0;
      return bRating - aRating;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Bodegas', href: '/bodegas' },
    { label: mockBodegaData.name },
  ];

  const descriptionPreview = mockBodegaData.description
    .split('\n\n')
    .slice(0, 2)
    .join('\n\n');

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-yellow-800 via-amber-700 to-red-900 relative overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #713f12 0%, #b8860b 50%, #8b4513 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4">
              {mockBodegaData.name}
            </h1>
            <p className="text-xl lg:text-2xl font-light">
              Tradición y excelencia desde {mockBodegaData.founded}
            </p>
          </div>
        </div>
      </div>

      {/* Technical Info Cards */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Enologist Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Enólogo</h3>
              </div>
              <p className="text-gray-700 font-medium">
                {mockBodegaData.enologist}
              </p>
            </div>

            {/* Country Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-gray-900">País</h3>
              </div>
              <p className="text-gray-700 font-medium">
                {mockBodegaData.country}
              </p>
            </div>

            {/* Regions Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Leaf className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Regiones</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockBodegaData.regions.map((region) => (
                  <Link
                    key={region}
                    href={`/region/${region.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-100 transition-colors"
                  >
                    {region}
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Grapes Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Grape className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Uvas Principales</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockBodegaData.mainGrapes.map((grape) => (
                  <span
                    key={grape}
                    className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {grape}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Sobre {mockBodegaData.name}
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {expandedDescription ? (
              <>
                {mockBodegaData.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </>
            ) : (
              <p>{descriptionPreview}</p>
            )}
          </div>
          <button
            onClick={() => setExpandedDescription(!expandedDescription)}
            className="mt-6 text-yellow-600 hover:text-yellow-700 font-semibold flex items-center gap-2"
          >
            {expandedDescription ? 'Leer menos' : 'Leer más'}
            <span className="text-lg">
              {expandedDescription ? '▲' : '▼'}
            </span>
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Vinos de {mockBodegaData.name}
          </h2>
          <p className="text-gray-600 mb-8">
            Descubre nuestra colección completa de vinos
          </p>

          {/* Sort Bar */}
          <SortBar
            productCount={bodegaProducts.length}
            onSortChange={(sort) => {
              setSortBy(sort);
              setCurrentPage(1);
            }}
            onViewModeChange={setViewMode}
          />

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      mode="grid"
                      className="h-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mt-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      mode="list"
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600 text-lg">
                No hay vinos disponibles de esta bodega en este momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BodegaPage() {
  return <BodegaPageContent />;
}
