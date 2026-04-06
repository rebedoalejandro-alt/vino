'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Pagination } from '@/components/common/Pagination';
import { ProductCard } from '@/components/product/ProductCard';
import { SortBar } from '@/components/product/SortBar';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

const PRODUCTS_PER_PAGE = 12;

// Quick refinement tags
const refinementTags = [
  { label: 'Vino tinto', href: '/buscar?q=vino+tinto', icon: '🍷' },
  { label: 'Vino blanco', href: '/buscar?q=vino+blanco', icon: '🍇' },
  { label: 'Rioja', href: '/buscar?q=Rioja', icon: '🏰' },
  { label: 'Ribera del Duero', href: '/buscar?q=Ribera+del+Duero', icon: '🍃' },
  { label: 'Champagne', href: '/buscar?q=Champagne', icon: '✨' },
  { label: 'Orgánico', href: '/buscar?q=orgánico', icon: '🌿' },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const handleFilterChange = () => {
    // Filter handler - currently not implemented
  };

  // Simple search logic - filters products by name, description, bodega name, region name
  const searchResults = MOCK_PRODUCTS.filter((product) => {
    if (!query.trim()) return true;

    const queryLower = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(queryLower) ||
      product.description.toLowerCase().includes(queryLower) ||
      product.bodega?.name.toLowerCase().includes(queryLower) ||
      product.region?.name.toLowerCase().includes(queryLower) ||
      product.grapes?.some((grape) =>
        grape.name.toLowerCase().includes(queryLower)
      ) ||
      product.category?.name.toLowerCase().includes(queryLower)
    );
  });

  // Simple sorting logic
  const sortedProducts = [...searchResults];

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
    { label: 'Búsqueda' },
  ];

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
          {query.trim() ? (
            <h1 className="text-4xl font-bold text-black mb-2">
              Se ha buscado{' '}
              <span className="text-red-600">
                &quot;{query}&quot;
              </span>
            </h1>
          ) : (
            <h1 className="text-4xl font-bold text-black mb-2">
              Introduce un término de búsqueda
            </h1>
          )}

          {query.trim() && (
            <p className="text-gray-600">
              Se encontraron <span className="font-semibold">{sortedProducts.length}</span> resultado
              {sortedProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Quick Refinement Tags */}
      {query.trim() && (
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Refinar búsqueda
            </h3>
            <div className="flex flex-wrap gap-3">
              {refinementTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-yellow-400 hover:text-yellow-600 transition-colors flex items-center gap-2"
                >
                  <span>{tag.icon}</span>
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {query.trim() ? (
        <>
          {/* Sort Bar */}
          <SortBar
            productCount={sortedProducts.length}
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
                {/* Filter Sidebar - 280px on desktop, hidden on mobile */}
                <div className="hidden lg:block lg:col-span-1">
                  <FilterSidebar onFilterChange={handleFilterChange} />
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                  {paginatedProducts.length > 0 ? (
                    <>
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
                      <p className="text-gray-600 text-lg mb-6">
                        No se han encontrado resultados para tu búsqueda
                      </p>
                      <div className="space-y-4">
                        <p className="text-gray-500">
                          Algunos consejos para mejorar tu búsqueda:
                        </p>
                        <ul className="text-gray-600 space-y-2 inline-block text-left">
                          <li>- Verifica la ortografía de los términos</li>
                          <li>- Prueba con palabras más generales</li>
                          <li>- Utiliza menos palabras en tu búsqueda</li>
                          <li>- Explora nuestras categorías principales</li>
                        </ul>
                      </div>
                      <div className="mt-8">
                        <Link
                          href="/vinos"
                          className="inline-block px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Ir al catálogo de vinos
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Busca los mejores vinos
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Utiliza la barra de búsqueda en el encabezado para encontrar vinos
              por nombre, región, bodega o variedad de uva.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <Link
                href="/vinos"
                className="p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ver todos los vinos
                </h3>
                <p className="text-gray-600">
                  Explora nuestro catálogo completo
                </p>
              </Link>

              <Link
                href="/vinos/tinto"
                className="p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vinos tintos
                </h3>
                <p className="text-gray-600">
                  Descubre nuestros vinos tintos premium
                </p>
              </Link>

              <Link
                href="/vinos/blanco"
                className="p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vinos blancos
                </h3>
                <p className="text-gray-600">
                  Selecciona vinos blancos refrescantes
                </p>
              </Link>

              <Link
                href="/vinos/rosado"
                className="p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vinos rosados
                </h3>
                <p className="text-gray-600">
                  Explora nuestra colección de rosados
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
