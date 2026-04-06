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

const breadcrumbItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Vinos' },
];

const tagsData = [
  { label: 'Tinto', href: '/vinos/tinto', icon: '🍷' },
  { label: 'Blanco', href: '/vinos/blanco', icon: '🍇' },
  { label: 'Rosado', href: '/vinos/rosado', icon: '🌸' },
  { label: 'Espumoso', href: '/vinos/espumoso', icon: '✨' },
  { label: 'Ecológico', href: '/vinos/ecologico', icon: '🌿' },
  { label: 'Ofertas', href: '/vinos/ofertas', icon: '🏷️' },
  { label: 'Envío inmediato', href: '/vinos/envio-inmediato', icon: '📦' },
];

const catalogDescription = `Descubre nuestra amplia selección de vinos españoles e internacionales cuidadosamente seleccionados para satisfacer todos los paladares.

En Casa del Vino contamos con una extensa variedad de vinos tintos, blancos, rosados y espumosos de las regiones vinícolas más prestigiosas del mundo. Desde clásicos españoles como los Riojas y Ribera del Duero, hasta champagnes franceses y proseccos italianos.

Todos nuestros vinos han sido seleccionados por expertos sommeliers y cuentan con garantía de calidad. Disfrutarás de ofertas exclusivas, envíos rápidos y un servicio de atención al cliente excepcional.

Contamos con vinos para todas las ocasiones y presupuestos, desde vinos jóvenes y accesibles hasta botellas de colección de prestigiosas bodegas. Además, disponemos de una sección especial de vinos ecológicos y biodinámicos para los amantes del vino sostenible.

Explora nuestro catálogo completo, filtra por tipo de vino, región, precio o puntuación de expertos, y encuentra el vino perfecto para tu paladar.`;

function VinosPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFilterChange = () => {
    // Filter handler - currently not implemented
  };

  // Simple sorting logic
  const sortedProducts = [...MOCK_PRODUCTS];

  if (sortBy === 'precio-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'precio-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'bestseller') {
    // Featured products first
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
            Vinos
            <span className="text-yellow-600 ml-2">({MOCK_PRODUCTS.length})</span>
          </h1>

          {/* SEO Text */}
          <SeoText text={catalogDescription} linesBeforeExpand={3} className="mb-6" />
        </div>
      </div>

      {/* Tags Row */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {tagsData.map((tag) => (
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
        productCount={MOCK_PRODUCTS.length}
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
          <h2 className="text-2xl font-bold text-black mb-4">¿Por qué elegirnos?</h2>
          <SeoText
            text={`En Casa del Vino somos especialistas en la venta de vinos premium con más de 20 años de experiencia.

Nuestro equipo de expertos sommeliers selecciona cuidadosamente cada botella para garantizar la máxima calidad. Todos nuestros vinos provienen de bodegas de prestigio y cuentan con certificaciones de autenticidad.

Ofrecemos envíos rápidos y seguros a toda España, con la posibilidad de entrega urgente en 24-48 horas. Disponemos de un servicio de atención al cliente disponible de lunes a viernes de 9:00 a 20:00.

Además, contamos con un programa de devoluciones sin complicaciones en caso de que no quedes completamente satisfecho con tu compra. Tu satisfacción es nuestra prioridad.`}
            linesBeforeExpand={2}
          />
        </div>
      </div>
    </div>
  );
}

export default function VinosPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
      <VinosPageContent />
    </Suspense>
  );
}
