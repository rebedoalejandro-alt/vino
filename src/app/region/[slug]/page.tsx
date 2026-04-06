'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SeoText } from '@/components/common/SeoText';
import { Pagination } from '@/components/common/Pagination';
import { ProductCard } from '@/components/product/ProductCard';
import { SortBar } from '@/components/product/SortBar';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

const PRODUCTS_PER_PAGE = 12;

// Mock region data for "Ribera del Duero"
const mockRegionData = {
  id: '1',
  slug: 'ribera-del-duero',
  name: 'Ribera del Duero',
  country: 'España',
  description: `Ribera del Duero es una de las denominaciones de origen más prestigiosas de España, ubicada en la comunidad autónoma de Castilla y León. Con una tradición vinícola que se remonta a varios siglos, esta región es conocida mundialmente por sus excelentes vinos tintos.

La región se extiende a lo largo del río Duero en las provincias de Burgos, Valladolid, Soria y Segovia. Su terroir único, caracterizado por un clima continental extremo, suelos pobres y bien drenados, y una altitud elevada (800-900 metros), produce vinos de gran complejidad y estructura.

Ribera del Duero es el hogar de algunas de las bodegas más emblemáticas de España, incluyendo Vega Sicilia, que es considerada productora de algunos de los mejores vinos del mundo. La región es especialmente famosa por sus tintos elaborados con Tinto Fino (Tempranillo), una variedad que encuentra en Ribera del Duero su expresión más sublime.

La zona cuenta con aproximadamente 22.000 hectáreas de viñedos y está regulada por una de las denominaciones de origen más estrictas de España. Los vinos de Ribera del Duero son conocidos por su color profundo, tanicidad marcada, aromas intensos y excelente potencial de guarda.

Las bodegas de la región combinan técnicas ancestrales con innovaciones modernas, creando vinos que honran la tradición mientras abrazan la excelencia contemporánea. Visitar Ribera del Duero es sumergirse en una experiencia única que combina paisajes espectaculares, arquitectura bodeguera vanguardista y vinos de clase mundial.`,
};

// Quick filter tags for region
const quickFilterTags = [
  { label: 'Vino tinto', href: '/region/ribera-del-duero?type=tinto', icon: '🍷' },
  { label: 'Vino blanco', href: '/region/ribera-del-duero?type=blanco', icon: '🍇' },
  { label: 'Reserva', href: '/region/ribiera-del-duero?type=reserva', icon: '👑' },
  { label: 'Joven', href: '/region/ribiera-del-duero?type=joven', icon: '🌱' },
  { label: 'Orgánico', href: '/region/ribiera-del-duero?organic=true', icon: '🌿' },
];

function RegionPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const handleFilterChange = () => {};
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products by region
  const regionProducts = MOCK_PRODUCTS.filter(
    (product) => product.region?.id === mockRegionData.id
  );

  // Simple sorting logic
  const sortedProducts = [...regionProducts];

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
    { label: 'Regiones', href: '/regiones' },
    { label: mockRegionData.name },
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
          <h1 className="text-4xl font-bold text-black mb-4">
            Vinos de {mockRegionData.name}
            <span className="text-yellow-600 ml-2">({regionProducts.length})</span>
          </h1>

          {/* SEO Text */}
          <SeoText
            text={mockRegionData.description}
            linesBeforeExpand={3}
            className="mb-6"
          />
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Filtrar por
          </h3>
          <div className="flex flex-wrap gap-3">
            {quickFilterTags.map((tag) => (
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

      {/* Sort Bar */}
      <SortBar
        productCount={regionProducts.length}
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
                  <p className="text-gray-600 text-lg">
                    No hay vinos disponibles en esta región en este momento.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom SEO Text */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-4">
            ¿Por qué elegir vinos de {mockRegionData.name}?
          </h2>
          <SeoText
            text={`Los vinos de Ribera del Duero representan lo mejor de la viticultura española, combinando tradición ancestral con innovación moderna. Esta región es hogar de algunas de las bodegas más prestigiosas del mundo.

Los tintos de Ribera del Duero son especialmente valorados por su complejidad aromática, estructura tánica bien definida, y excelente capacidad de envejecimiento. Cada botella es una expresión única del terroir, reflejando el carácter del río Duero y las particulares condiciones climáticas de la región.

En Casa del Vino seleccionamos cuidadosamente los mejores vinos de Ribera del Duero para garantizar que disfrutes de la máxima calidad. Desde vinos jóvenes y accesibles hasta botellas de colección de bodegas legendarias, tenemos la opción perfecta para cada paladar y ocasión.`}
            linesBeforeExpand={2}
          />
        </div>
      </div>
    </div>
  );
}

export default function RegionPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
      <RegionPageContent />
    </Suspense>
  );
}
