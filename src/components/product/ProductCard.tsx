'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { QuantitySelector } from './QuantitySelector';
import { CriticBadge } from './CriticBadge';
import { FavoriteButton } from './FavoriteButton';
import { Truck, Mail } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  mode?: 'grid' | 'list';
  onAddToCart?: (product: Product, quantity: number) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  mode = 'grid',
  onAddToCart,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState('');

  const hasDiscount = !!product.comparePrice && product.comparePrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const highestRating = product.ratings && product.ratings.length > 0
    ? product.ratings.reduce((prev, current) =>
        prev.score > current.score ? prev : current
      )
    : undefined;

  const isOrganic = product.grapes?.some((g) => g.name.toLowerCase().includes('organic'));
  const isNew = new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setQuantity(1);
    }
  };

  const handleEmailAlert = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email alert signup:', emailAlert);
    setEmailAlert('');
    setShowStockAlert(false);
  };

  const productSlug = product.slug || product.id;

  if (mode === 'list') {
    return (
      <Link href={`/vino/${productSlug}`}>
        <div
          className={`flex gap-6 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${className}`}
        >
        <div className="flex-shrink-0 w-32 h-32 sm:w-48 sm:h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain bg-white p-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 150' fill='%23ddd'%3E%3Crect width='100' height='150' rx='5' fill='%23f3f4f6'/%3E%3Cpath d='M45 20h10v60h-10z' fill='%23d1d5db'/%3E%3Ccircle cx='50' cy='100' r='25' fill='%23d1d5db'/%3E%3Cpath d='M42 95h16v10H42z' fill='%23f3f4f6'/%3E%3C/svg%3E";
            }}
          />
        </div>

        <div className="flex-grow py-4 pr-4 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-grow">
              <p className="text-sm text-gray-500 mb-1">{product.bodega?.name}</p>
              <h3 className="font-bold text-lg text-black line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {product.region?.name}, {product.region?.country}
              </p>
            </div>
            <FavoriteButton productId={product.id} />
          </div>

          <p className="text-xs text-gray-500 mb-2">
            {product.grapes?.map((g) => g.name).join(', ')}
          </p>

          <div className="flex items-center gap-2 mb-3">
            {highestRating && (
              <CriticBadge
                score={highestRating.score}
                critic={highestRating.critic as 'Parker' | 'Suckling' | 'Peñín' | 'Tim Atkin' | 'Jancis Robinson'}
                size="sm"
              />
            )}
            {isOrganic && <Badge variant="organic" label="ECO" />}
          </div>

          <div className="flex-grow mb-3">
            <p className="text-sm text-gray-600">{product.description.substring(0, 100)}...</p>
          </div>

          <div className="flex items-center gap-3">
            {hasDiscount && (
              <>
                <span className="text-lg font-bold text-red-600">
                  {product.price.toFixed(2)}€
                </span>
                <span className="text-sm line-through text-gray-400">
                  {product.comparePrice?.toFixed(2)}€
                </span>
                <Badge variant="discount" value={`-${discountPercentage}%`} />
              </>
            )}
            {!hasDiscount && (
              <span className="text-lg font-bold text-black">{product.price.toFixed(2)}€</span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between items-end p-4" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          {product.stock > 0 ? (
            <>
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
              <Button variant="primary" onClick={handleAddToCart} className="mt-4">
                AÑADIR AL CARRITO
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-2">Agotado</p>
              {!showStockAlert && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStockAlert(true)}
                >
                  Avísame
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      </Link>
    );
  }

  return (
    <Link href={`/vino/${productSlug}`}>
      <div
        className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col h-full cursor-pointer ${className}`}
      >
      <div className="relative aspect-square bg-white overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 150' fill='%23ddd'%3E%3Crect width='100' height='150' rx='5' fill='%23f3f4f6'/%3E%3Cpath d='M45 20h10v60h-10z' fill='%23d1d5db'/%3E%3Ccircle cx='50' cy='100' r='25' fill='%23d1d5db'/%3E%3Cpath d='M42 95h16v10H42z' fill='%23f3f4f6'/%3E%3C/svg%3E";
          }}
        />

        {product.featured && (
          <Badge variant="recommended" label="Recomendado" />
        )}

        {isNew && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="new" label="¡Novedad!" />
          </div>
        )}

        {isOrganic && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="organic" label="ECO" />
          </div>
        )}

        <div className="absolute top-2 right-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <FavoriteButton productId={product.id} />
        </div>
      </div>

      <div className="flex-grow p-4 flex flex-col">
        <p className="text-xs text-gray-500 mb-1">{product.bodega?.name}</p>

        <h3 className="font-bold text-sm text-black line-clamp-2 mb-2 h-10">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mb-1">
          {product.region?.name}, {product.region?.country}
        </p>

        <p className="text-xs text-gray-500 mb-3 line-clamp-1">
          {product.grapes?.map((g) => g.name).join(', ')}
        </p>

        {highestRating && (
          <div className="flex justify-center mb-3">
            <CriticBadge score={highestRating.score} critic={highestRating.critic as 'Parker' | 'Suckling' | 'Peñín' | 'Tim Atkin' | 'Jancis Robinson'} />
          </div>
        )}

        {product.stock > 0 && (
          <div className="flex items-center gap-2 text-green-600 text-xs font-semibold mb-3">
            <Truck className="h-4 w-4" />
            Envío inmediato
          </div>
        )}

        <div className="mt-auto mb-4">
          {hasDiscount && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-red-600">
                  {product.price.toFixed(2)}€
                </span>
                <span className="text-sm line-through text-gray-400">
                  {product.comparePrice?.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-center">
                <Badge variant="discount" value={`-${discountPercentage}%`} />
              </div>
            </>
          )}
          {!hasDiscount && (
            <span className="text-lg font-bold text-black block text-center">
              {product.price.toFixed(2)}€
            </span>
          )}
        </div>

        {product.stock > 0 ? (
          <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <div className="mb-3 flex justify-center">
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
            </div>

            <Button variant="primary" fullWidth onClick={handleAddToCart}>
              AÑADIR AL CARRITO
            </Button>
          </div>
        ) : (
          <div className="text-center" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <p className="text-red-600 font-semibold mb-3">Agotado</p>
            {!showStockAlert ? (
              <Button variant="outline" fullWidth onClick={() => setShowStockAlert(true)}>
                Avísame
              </Button>
            ) : (
              <form onSubmit={handleEmailAlert} className="space-y-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  value={emailAlert}
                  onChange={(e) => setEmailAlert(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-400"
                />
                <Button variant="primary" size="sm" fullWidth>
                  <Mail className="h-4 w-4" />
                  Notificarme
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
      </div>
    </Link>
  );
};
