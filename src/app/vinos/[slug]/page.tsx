'use client';

import React, { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SeoText } from '@/components/common/SeoText';
import { Pagination } from '@/components/common/Pagination';
import { ProductCard } from '@/components/product/ProductCard';
import { SortBar } from '@/components/product/SortBar';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

const PRODUCTS_PER_PAGE = 12;

// Map slugs to wine types and descriptions
const wineTypeMap: Record<string, { wineType: string; title: string; description: string }> = {
  'espumoso': {
    wineType: 'espumoso',
    title: 'Vinos Espumosos',
    description: `Los vinos espumosos son vinos con gas carbónico, elaborados mediante la fermentación en botella o tanque cerrado. Este proceso produce las características burbujas que hacen estos vinos tan especiales.

España produce algunos de los mejores espumosos del mundo. El Cava es el espumoso español más famoso, elaborado principalmente en Cataluña con las variedades Macabeo, Parellada y Xarel.lo.

Nuestro catálogo incluye Cavas españoles, Champagnes franceses, Proseccos italianos y espumosos de otras regiones. Cada uno con su propio carácter y estilo.

Los espumosos son perfectos para brindar, celebraciones especiales y como aperitivo. Su frescura y elegancia los hacen ideales para cualquier ocasión festiva.`,
  },
  'generoso': {
    wineType: 'fortified',
    title: 'Vinos Generosos',
    description: `Los vinos generosos, también conocidos como vinos fortificados, son vinos a los que se les ha añadido alcohol destilado durante el proceso de fermentación. Esto aumenta su grado alcohólico y los hace especialmente aptos para el envejecimiento.

Los principales vinos generosos españoles son el Jerez, el Manzanilla, el Amontillado, el Oloroso y el Palo Cortado, todos ellos de la región de Jerez en Andalucía.

También incluimos en esta categoría vermuts, Oportos portugueses y Madeiras. Todos ellos son vinos con carácter, complejos y versátiles.

Los generosos se disfrutan como aperitivo, acompañados de tapas y embutidos, o como digestivo al final de la comida.`,
  },
  'ecologico': {
    wineType: 'tinto',
    title: 'Vinos Ecológicos',
    description: `Los vinos ecológicos se elaboran respetando el medio ambiente y sin utilizar productos químicos sintéticos. La viticultura ecológica se basa en prácticas sostenibles que respetan la biodiversidad del viñedo.

En la vinificación, los productores de vino ecológico utilizan métodos naturales para controlar plagas y enfermedades, evitando pesticidas y herbicidas químicos.

Nuestros vinos ecológicos provienen de bodegas comprometidas con la sostenibilidad y la calidad. Muchos de ellos tienen certificaciones oficiales que garantizan su proceso ecológico.

Elegir vinos ecológicos es una opción responsable con el medio ambiente, sin comprometer la calidad ni el sabor. Son vinos complejos y sabrosos, elaborados con respeto a la naturaleza.`,
  },
  'ofertas': {
    wineType: 'tinto',
    title: 'Vinos en Oferta',
    description: `Aquí encontrarás nuestra selección de vinos en oferta especial, con descuentos excepcionales en botellas de gran calidad.

Aprovecha nuestras promociones exclusivas para disfrutar de vinos premium a precios reducidos. Estas ofertas cambian regularmente, así que te recomendamos revisar frecuentemente para no perderte las mejores oportunidades.

Todas nuestras botellas en oferta mantienen el mismo nivel de calidad que el resto de nuestro catálogo. No se trata de liquidación de stock, sino de promociones selectivas en vinos cuidadosamente elegidos.

¿Buscas una buena oportunidad? ¡Aquí las encontrarás!`,
  },
  'envio-inmediato': {
    wineType: 'tinto',
    title: 'Envío Inmediato',
    description: `En Casa del Vino entendemos que a veces necesitas tu vino urgentemente. Por eso, disponemos de una selección de vinos con envío inmediato.

Estos vinos están disponibles en stock y listos para enviar en 24-48 horas. Puedes disfrutar de ellos sin esperas ni demoras.

Nuestro sistema de logística garantiza que tu pedido llega en perfecto estado y en el menor tiempo posible. Disponemos de opciones de envío urgente a toda España.

Elige entre nuestra amplia variedad de vinos con disponibilidad inmediata y disfruta de tu compra sin esperar.`,
  },
};

function DynamicWinePageContent() {
  const params = useParams();
  const slug = params.slug as string;

  const wineInfo = wineTypeMap[slug] || {
    wineType: 'tinto',
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: `Explorar nuestra colección de ${slug}. Descubre una amplia variedad de opciones seleccionadas cuidadosamente.`,
  };

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Vinos', href: '/vinos' },
    { label: wineInfo.title },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevancia');
  const handleFilterChange = () => {};
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products - for generic types, show all; for specific, filter by type
  let filteredProducts = MOCK_PRODUCTS;

  if (slug === 'ofertas') {
    filteredProducts = MOCK_PRODUCTS.filter(p => p.comparePrice && p.comparePrice > p.price);
  } else if (slug === 'envio-inmediato') {
    filteredProducts = MOCK_PRODUCTS.filter(p => p.stock > 0);
  } else if (slug === 'ecologico') {
    filteredProducts = MOCK_PRODUCTS.filter(p =>
      p.grapes?.some(g => g.name.toLowerCase().includes('organic'))
    );
  } else if (wineInfo.wineType !== 'tinto') {
    filteredProducts = MOCK_PRODUCTS.filter(p => p.wineType === wineInfo.wineType);
  }

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
            {wineInfo.title}
            <span className="text-yellow-600 ml-2">({filteredProducts.length})</span>
          </h1>

          {/* SEO Text */}
          <SeoText text={wineInfo.description} linesBeforeExpand={3} className="mb-6" />
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
                  <div className="mt-12 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No hay productos disponibles en esta categoría</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DynamicWinePage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Cargando...</div>}>
      <DynamicWinePageContent />
    </Suspense>
  );
}
