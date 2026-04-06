'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '../product/ProductCard';
import { useCart } from '@/hooks/useCart';

interface RecommendationsProps {
  products: Product[];
  className?: string;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ products, className = '' }) => {
  const addItem = useCart((state) => state.addItem);

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Recomendaciones para ti</h2>
          <Link
            href="/vinos?sort=featured"
            className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm md:text-base"
          >
            Ver más &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {products.slice(0, 8).map((product) => (
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

interface RecommendationsProps {
  products: Product[];
  className?: string;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ products, className = '' }) => {
  const addItem = useCart((state) => state.addItem);

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Recomendaciones para ti</h2>
          <Link
            href="/vinos?sort=featured"
            className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm md:text-base"
          >
            Ver m\u00e1s &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} onAddToCart={addItem} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
