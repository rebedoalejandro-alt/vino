'use client';

import React, { useState, Suspense } from 'react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SeoText } from '@/components/common/SeoText';
import { Pagination } from '@/components/common/Pagination';
import { ProductCard } from '@/components/product/ProductCard';
import { SortBar } from '@/components/product/SortBar';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

const PRODUCTS_PER_PAGE = 12;

const breadcrumbItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Vinos', href: '/vinos' },
  { label: 'Rosado' },
];

const rosadosDescription = `Los vinos rosados son una categoría versátil que combina características de los vinos tintos y blancos. Su elaboración es similar a la de los tintos, pero con un tiempo de contacto más corto con las pieles de la uva.

Provenza, en Francia, es la cuna de los rosados de calidad mundial, produciendo vinos pálidos y elegantes con gran sofisticación. Sin embargo, España también produce excelentes rosados, especialmente en regiones como Cataluña y Navarra.

Los vinos rosados son perfectos para disfrutar durante el verano o en momentos de relax. Presentan aromas frescos de frutas rojas y un sabor equilibrado entre la frescura de los blancos y la cuerpo de los tintos.

Nuestro catálogo incluye rosados ligeros y afrutados, así como rosados más serios envejecidos en barrica. Descubre la versatilidad de los vinos rosados y encuentra tu favorito.`;

function RosadosPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const handleFilterChange = () => {};
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products by wine type
  const filteredProducts = MOCK_PRODUCTS.filter(p => p.wineType === 'rosado');

  // Sort
  const sortedProducts = [...filteredProducts];
  if (sortBy === 'precio-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'precio-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-4">
            Vinos Rosados
            <span className="text-yellow-600 ml-2">({filteredProducts.length})</span>
          </h1>

          {/* SEO Text */}
          <SeoText text={rosadosDescription} linesBeforeExpand={3} className="mb-6" />
        </div>
      </div>

      {/* Sort Bar */}
      <SortBar
        productCount={filteredProducts.length}
        onSortChange={(sort) => {
          setSortBy(sort);
          setCurrentPage(1);
        }}
        onViewModeChange={setViewMode}
      />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="space-y-4">
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
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom SEO Text */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-4">Características de los vinos rosados</h2>
          <SeoText
            text={`Los vinos rosados ocupan un lugar especial entre los vinos, combinando lo mejor de los tintos y los blancos. Su color varía desde el rosa pálido casi incoloro hasta tonos más profundos, dependiendo del tiempo de maceración con las pieles.

El proceso de elaboración de un rosado comienza como el de un tinto: las uvas se despalillan y se maceran. Sin embargo, el tiempo de contacto con las pieles es mucho más corto, típicamente entre 2 y 24 horas, dependiendo del color deseado.

En términos de sabor, los rosados presentan una gran versatilidad. Suelen ser frescos y afrutados como los blancos, pero con más cuerpo y estructura que éstos. Los aromas típicos incluyen frutas rojas como la fresa, la frambuesa y melocotón, junto con notas florales y herbáceas.

Provenza es el epicentro mundial de los rosados de calidad, pero también se producen excelentes ejemplos en España, Estados Unidos, Italia y otros países productores de vino.

Los rosados son ideales para acompañar una amplia variedad de platos: ensaladas, mariscos, carnes blancas, verduras asadas y cocina asiática. Son el vino perfecto para disfrutar al aire libre durante el verano.`}
            linesBeforeExpand={2}
          />
        </div>
      </div>
    </div>
  );
}

export default function RosadosPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
      <RosadosPageContent />
    </Suspense>
  );
}
