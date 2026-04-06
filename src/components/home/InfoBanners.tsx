'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Gift, Leaf, Droplets } from 'lucide-react';

interface InfoBanner {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  bgColor: string;
}

const banners: InfoBanner[] = [
  {
    id: 'sommelier',
    icon: <Sparkles className="h-8 w-8" />,
    title: 'Sommelier Virtual',
    description: 'Deja que te asesoremos',
    href: '/quienes-somos',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    id: 'gifts',
    icon: <Gift className="h-8 w-8" />,
    title: 'Regala Vino',
    description: 'Packs desde 29,90€',
    href: '/vinos',
    bgColor: 'bg-pink-50 hover:bg-pink-100',
  },
  {
    id: 'organic',
    icon: <Leaf className="h-8 w-8" />,
    title: 'Vinos Ecológicos',
    description: 'Cuida el planeta',
    href: '/vinos-ecologicos',
    bgColor: 'bg-green-50 hover:bg-green-100',
  },
  {
    id: 'natural',
    icon: <Droplets className="h-8 w-8" />,
    title: 'Vinos Naturales',
    description: 'Sin aditivos',
    href: '/vinos?filter=natural',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
  },
];

interface InfoBannersProps {
  className?: string;
}

export const InfoBanners: React.FC<InfoBannersProps> = ({ className = '' }) => {
  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className={`${banner.bgColor} rounded-lg p-6 transition-colors cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-yellow-600 mb-4">{banner.icon}</div>
                <h3 className="font-bold text-lg text-black mb-2">{banner.title}</h3>
                <p className="text-sm text-gray-600">{banner.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
