'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  productId: string;
  initialCount?: number;
  onToggle?: (isFavorited: boolean) => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  initialCount = 0,
  onToggle,
  className = '',
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    const favoriteCount = JSON.parse(localStorage.getItem('favoriteCount') || '{}');
    setIsFavorited(!!favorites[productId]);
    setCount(favoriteCount[productId] || initialCount);
  }, [productId, initialCount]);

  const toggleFavorite = () => {
    setIsAnimating(true);

    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    const favoriteCount = JSON.parse(localStorage.getItem('favoriteCount') || '{}');

    if (favorites[productId]) {
      delete favorites[productId];
      favoriteCount[productId] = Math.max(0, (favoriteCount[productId] || 0) - 1);
      setIsFavorited(false);
      setCount((c) => Math.max(0, c - 1));
    } else {
      favorites[productId] = true;
      favoriteCount[productId] = (favoriteCount[productId] || 0) + 1;
      setIsFavorited(true);
      setCount((c) => c + 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('favoriteCount', JSON.stringify(favoriteCount));

    setTimeout(() => setIsAnimating(false), 300);

    if (onToggle) {
      onToggle(!isFavorited);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition-all ${
        isAnimating ? 'scale-110' : 'scale-100'
      } ${className}`}
      aria-label={isFavorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      <Heart
        className={`h-5 w-5 transition-all ${
          isFavorited ? 'fill-red-600 text-red-600' : 'text-gray-400'
        }`}
      />
      {count > 0 && <span className="text-sm font-semibold text-gray-700">{count}</span>}
    </button>
  );
};
