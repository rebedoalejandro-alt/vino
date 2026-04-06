'use client';

import React from 'react';
import Link from 'next/link';

interface SeoLink {
  id: string;
  text: string;
  href: string;
}

const seoLinks: SeoLink[] = [
  { id: '1', text: 'comprar vino online', href: '/vinos' },
  { id: '2', text: 'vino tinto rioja', href: '/vinos?region=rioja&category=tinto' },
  { id: '3', text: 'champagne precio', href: '/vinos?tipo=champagne' },
  { id: '4', text: 'cava español', href: '/vinos?tipo=cava' },
  { id: '5', text: 'vinos ecológicos', href: '/vinos-ecologicos' },
  { id: '6', text: 'ribera del duero vinos', href: '/vinos?region=ribera-del-duero' },
  { id: '7', text: 'vino blanco español', href: '/vinos?tipo=blanco' },
  { id: '8', text: 'vinos naturales', href: '/vinos?filter=natural' },
  { id: '9', text: 'priorat vino tinto', href: '/vinos?region=priorat&category=tinto' },
  { id: '10', text: 'vino para regalar', href: '/vinos?filter=gifts' },
  { id: '11', text: 'vinos parker 90', href: '/vinos?filter=parker90' },
  { id: '12', text: 'prosecco italiano', href: '/vinos?tipo=prosecco' },
];

interface SeoLinksProps {
  className?: string;
}

export const SeoLinks: React.FC<SeoLinksProps> = ({ className = '' }) => {
  return (
    <section className={`py-12 bg-white border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-semibold text-black mb-6">
          Búsquedas populares
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {seoLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-sm text-gray-600 hover:text-yellow-600 hover:underline transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
