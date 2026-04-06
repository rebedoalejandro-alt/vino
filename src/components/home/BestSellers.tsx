'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '../product/ProductCard';
import { Carousel } from '../ui/Carousel';
import { useCart } from '@/hooks/useCart';

interface BestSellersProps {
  products: Product[];
  className?: string;
}

export const BestSellers: React.FC<BestSellersProps> = ({ products, className = '' }) => {
  const addItem = useCart((state) => state.addItem);

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Los m\u00e1s vendidos del mes</h2>
          <Link
            href="/vinos?sort=bestseller"
            className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm md:text-base"
          >
            Ver todos &gt;
          </Link>
        </div>

        <Carousel
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
          autoScroll={false}
          showNavigationArrows={true}
        >
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} onAddToCart={addItem} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
