'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductCardListProps {
  products: Product[];
  onAddToCart?: (product: Product, quantity: number) => void;
  className?: string;
}

export const ProductCardList: React.FC<ProductCardListProps> = ({
  products,
  onAddToCart,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          mode="list"
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
