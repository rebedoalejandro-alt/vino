'use client';

import React, { useState } from 'react';
import { Product, Rating } from '@/types';
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

  const highestRating = product.ratings?.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  ) as Rating | undefined;

  const isOrganic = product.grapes?.some((g) => g.name.toLowerCase().includes('organic'));
  const isNew = new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;

  const handleAddToCart = () => {
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

  if (mode === 'list') {
    return (
      <div
        className={`flex gap-6 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${className}`}
      >
        <div className="flex-shrink-0 w-48 h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain bg-white p-4"
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

        <div className="flex flex-col justify-between items-end p-4">
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
    );
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col h-full ${className}`}
    >
      <div className="relative aspect-square bg-white overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
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

        <div className="absolute top-2 right-2">
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

        <div className="mb-4">
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
          <>
            <div className="mb-3 flex justify-center">
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
            </div>

            <Button variant="primary" fullWidth onClick={handleAddToCart}>
              AÑADIR AL CARRITO
            </Button>
          </>
        ) : (
          <div className="text-center">
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
  );
};
