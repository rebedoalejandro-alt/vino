'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '../product/ProductCard';
import { useCart } from '@/hooks/useCart';

interface OffersSectionProps {
  products: Product[];
  className?: string;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ products, className = '' }) => {
  const addItem = useCart((state) => state.addItem);
  const discountedProducts = products.filter((p) => p.comparePrice && p.comparePrice > p.price);

  return (
    <section className={`py-12 bg-yellow-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Ofertas especiales</h2>
          <Link
            href="/vinos?filter=offers"
            className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm md:text-base"
          >
            Ver todas &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {(discountedProducts.length > 0 ? discountedProducts : products)
            .slice(0, 8)
            .map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} onAddToCart={addItem} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '../product/ProductCard';
import { useCart } from '@/hooks/useCart';

interface OffersSectionProps {
  products: Product[];
  className?: string;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ products, className = '' }) => {
  const addItem = useCart((state) => state.addItem);
  const discountedProducts = products.filter((p) => p.comparePrice && p.comparePrice > p.price);

  return (
    <section className={`py-12 bg-yellow-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Ofertas especiales</h2>
          <Link
            href="/vinos?filter=offers"
            className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm md:text-base"
          >
            Ver todas &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {(discountedProducts.length > 0 ? discountedProducts : products)
            .slice(0, 8)
            .map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} onAddToCart={addItem} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
