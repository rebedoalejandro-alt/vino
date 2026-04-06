'use client';

import React from 'react';
import Link from 'next/link';

interface TopSalesTag {
  id: string;
  label: string;
  href: string;
}

const tags: TopSalesTag[] = [
  { id: 'tintos', label: 'Vinos tintos', href: '/vinos?tipo=tinto' },
  { id: 'blancos', label: 'Vinos blancos', href: '/vinos?tipo=blanco' },
  { id: 'ribera', label: 'Ribera del Duero', href: '/vinos?region=ribera' },
  { id: 'rioja', label: 'Rioja', href: '/vinos?region=rioja' },
  { id: 'priorat', label: 'Priorat', href: '/vinos?region=priorat' },
  { id: 'champagne', label: 'Champagne', href: '/vinos?tipo=champagne' },
  { id: 'eco', label: 'Vinos ecológicos', href: '/vinos-ecologicos' },
  { id: 'parker', label: 'Parker 90+', href: '/vinos?filter=parker90' },
  { id: 'regalos', label: 'Regalos', href: '/vinos?filter=gifts' },
  { id: 'cavas', label: 'Cavas', href: '/vinos?tipo=cava' },
];

interface TopSalesProps {
  className?: string;
}

export const TopSales: React.FC<TopSalesProps> = ({ className = '' }) => {
  return (
    <section className={`py-8 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-black">Top ventas</h2>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={tag.href}
              className="px-4 py-2 md:px-6 md:py-3 border-2 border-gray-300 rounded-full text-sm md:text-base font-medium text-gray-800 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all duration-300"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
