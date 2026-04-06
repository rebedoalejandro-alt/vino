'use client';

import React from 'react';
import Link from 'next/link';

interface CategoryIcon {
  id: string;
  name: string;
  label: string;
  bgColor: string;
  emoji: string;
  href: string;
}

const categories: CategoryIcon[] = [
  {
    id: 'tinto',
    name: 'Vino Tinto',
    label: 'Vino Tinto',
    bgColor: 'bg-red-600',
    emoji: '🍷',
    href: '/shop?category=tinto',
  },
  {
    id: 'blanco',
    name: 'Vino Blanco',
    label: 'Vino Blanco',
    bgColor: 'bg-yellow-500',
    emoji: '🍯',
    href: '/shop?category=blanco',
  },
  {
    id: 'rose',
    name: 'Vino Rosé',
    label: 'Vino Rosé',
    bgColor: 'bg-pink-500',
    emoji: '🌸',
    href: '/shop?category=rose',
  },
  {
    id: 'generoso',
    name: 'Vino Generoso',
    label: 'Vino Generoso',
    bgColor: 'bg-amber-700',
    emoji: '🥃',
    href: '/shop?category=generoso',
  },
  {
    id: 'dulce',
    name: 'Vino Dulce',
    label: 'Vino Dulce',
    bgColor: 'bg-orange-600',
    emoji: '🍊',
    href: '/shop?category=dulce',
  },
  {
    id: 'cava',
    name: 'Cava',
    label: 'Cava',
    bgColor: 'bg-yellow-400',
    emoji: '🍾',
    href: '/shop?category=cava',
  },
  {
    id: 'champagne',
    name: 'Champagne',
    label: 'Champagne',
    bgColor: 'bg-yellow-600',
    emoji: '🎉',
    href: '/shop?category=champagne',
  },
  {
    id: 'prosecco',
    name: 'Prosecco',
    label: 'Prosecco',
    bgColor: 'bg-green-400',
    emoji: '✨',
    href: '/shop?category=prosecco',
  },
  {
    id: 'vermut',
    name: 'Vermut',
    label: 'Vermut',
    bgColor: 'bg-amber-900',
    emoji: '🌿',
    href: '/shop?category=vermut',
  },
];

interface CategoryIconsProps {
  className?: string;
}

export const CategoryIcons: React.FC<CategoryIconsProps> = ({ className = '' }) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          La Mejor Selección
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className={`${category.bgColor} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-md group-hover:scale-110 transition-transform duration-300 mb-3`}
              >
                {category.emoji}
              </div>
              <p className="text-center text-xs md:text-sm font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">
                {category.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
