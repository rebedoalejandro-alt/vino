'use client';

import React from 'react';

type BadgeVariant = 'discount' | 'new' | 'recommended' | 'organic' | 'score';

interface BadgeProps {
  variant: BadgeVariant;
  value?: string | number;
  label?: string;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  discount: 'bg-red-600 text-white text-xs font-bold px-2 py-1 rounded',
  new: 'bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded',
  recommended: 'bg-black text-white text-xs font-bold px-2 py-1',
  organic: 'bg-green-600 text-white text-xs font-bold px-2 py-1 rounded',
  score: 'bg-gray-900 text-white text-center rounded-full flex items-center justify-center',
};

export const Badge: React.FC<BadgeProps> = ({ variant, value, label, className = '' }) => {
  if (variant === 'recommended') {
    return (
      <div
        className={`fixed top-2 left-2 z-10 ${className}`}
        style={{
          transform: 'rotate(-45deg)',
          transformOrigin: 'top left',
        }}
      >
        <div className="bg-black text-white text-xs font-bold px-6 py-1 whitespace-nowrap">
          {label || 'Recomendado'}
        </div>
      </div>
    );
  }

  if (variant === 'score') {
    return (
      <div className={`${variantStyles[variant]} w-12 h-12 ${className}`}>
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold">{value}</span>
          {label && <span className="text-xs">{label}</span>}
        </div>
      </div>
    );
  }

  return (
    <span className={`${variantStyles[variant]} ${className}`}>
      {value && <span className="font-bold">{value}</span>}
      {label && <span className="ml-1">{label}</span>}
    </span>
  );
};
