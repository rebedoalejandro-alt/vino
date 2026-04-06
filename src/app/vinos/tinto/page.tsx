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
  { label: 'Tinto' },
];

const tintosDescription = `Los vinos tintos son el resultado de la fermentación del mosto junto con las pieles de la uva, lo que les proporciona su característico color rojo y su sabor profundo.

Ofrecemos una amplia variedad de vinos tintos españoles e internacionales, desde tintos jóvenes y frescos hasta reservas y grandes vinos de guarda. Podrás encontrar los famosos Riojas, Ribera del Dueros, Tooros y Prioorats españoles, así como reconocidos Burdeos franceses y Barolas italianos.

Cada tinto tiene su propia historia y carácter. Los tintos españoles, especialmente aquellos elaborados con Tempranillo, son reconocidos mundialmente por su equilibrio, complejidad y capacidad de envejecimiento.

Explora nuestro catálogo de vinos tintos, filtrados por región, bodega, precio y puntuación de expertos, y descubre tu nuevo tinto favorito.`;

function TintosPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const handleFilterChange = () => {};
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products by wine type
  const filteredProducts = MOCK_PRODUCTS.filter(p => p.wineType === 'tinto');

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
            Vinos Tintos
            <span className="text-yellow-600 ml-2">({filteredProducts.length})</span>
          </h1>

          {/* SEO Text */}
          <SeoText text={tintosDescription} linesBeforeExpand={3} className="mb-6" />
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
          <h2 className="text-2xl font-bold text-black mb-4">Características de los vinos tintos</h2>
          <SeoText
            text={`Los vinos tintos se caracterizan por su color rojo oscuro, que puede variar desde rojo rubí hasta granate dependiendo de la variedad y la edad del vino.

En cuanto al sabor, los tintos suelen ser más complejos y estructurados que otros tipos de vino. Presentan taninos más pronunciados, que son compuestos que proporcionan una sensación de sequedad en la boca. Estos taninos provienen principalmente de las pieles de la uva.

La variedad de uva utilizada es fundamental. El Tempranillo es la variedad más emblemática de España, produciendo vinos con buena acidez, color intenso y sabores a frutas rojas. La Garnacha produce vinos más cálidos y afrutados, mientras que el Pinot Noir francés es conocido por su elegancia y finura.

Los vinos tintos mejoran con la edad gracias al proceso de oxidación controlada y la evolución de sus compuestos. Un gran Rioja Reserva puede seguir evolucionando positivamente durante 20, 30 o más años en bodega.`}
            linesBeforeExpand={2}
          />
        </div>
      </div>
    </div>
  );
}

export default function TintosPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
      <TintosPageContent />
    </Suspense>
  );
}
