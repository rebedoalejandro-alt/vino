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
  { label: 'Blanco' },
];

const blancosDescription = `Los vinos blancos son vinos elaborados a partir de variedades de uva blanca, fermentados sin contacto con las pieles, lo que les proporciona su característico color amarillo pálido.

España es una de las principales productoras de vinos blancos de calidad mundial, destacando especialmente la región de Rías Baixas con su famoso Albariño, un vino blanco seco con gran carácter y mineralidad.

Nuestro catálogo incluye vinos blancos frescos y ligeros, perfectos para beber jóvenes, así como blancos complejos envejecidos en barrica. Encontrarás desde el clásico Albariño gallego hasta elegantes Blancos de Rioja y sofisticados Blancos de Penedès.

Los vinos blancos son versátiles, maridando perfectamente con pescados, mariscos, carnes blancas y platos de verduras. Son ideales para disfrutar en momentos de relajación y en reuniones sociales.

Descubre nuestra selección premium de vinos blancos españoles e internacionales.`;

function BlancosPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const handleFilterChange = () => {};
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products by wine type
  const filteredProducts = MOCK_PRODUCTS.filter(p => p.wineType === 'blanco');

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
            Vinos Blancos
            <span className="text-yellow-600 ml-2">({filteredProducts.length})</span>
          </h1>

          {/* SEO Text */}
          <SeoText text={blancosDescription} linesBeforeExpand={3} className="mb-6" />
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
          <h2 className="text-2xl font-bold text-black mb-4">Características de los vinos blancos</h2>
          <SeoText
            text={`Los vinos blancos se diferencian de los tintos principalmente por el tipo de uva utilizada y el proceso de elaboración. Mientras que los tintos fermentan en contacto con las pieles de la uva, los blancos se producen a partir del mosto únicamente.

El color caracterísitco de los vinos blancos varía desde el amarillo pálido casi incoloro hasta tonos dorados más intensos. Esta variación depende de la variedad de uva, el tiempo de fermentación y el envejecimiento.

En términos de sabor, los vinos blancos tienden a ser más frescos, ligeros y ácidos que los tintos. Son menos astringentes debido a la ausencia de taninos, lo que los hace ideales para beber jóvenes, aunque algunos vinos blancos envejecidos en barrica pueden adquirir mayor complejidad.

El Albariño es el rey de los blancos españoles, con su carácter mineral y sabroso. Otras variedades importantes incluyen el Verdejo, la Viura y el Godello. A nivel internacional, el Chardonnay francés y el Riesling alemán son igualmente reconocidos por su calidad y versatilidad.

Los vinos blancos son perfectos como aperitivos, acompañando pescados y mariscos, y combinan bien con cocina asiática y mediterránea.`}
            linesBeforeExpand={2}
          />
        </div>
      </div>
    </div>
  );
}

export default function BlancosPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
      <BlancosPageContent />
    </Suspense>
  );
}
