'use client';

import React from 'react';
import {
  Award,
  Wine,
  Truck,
  ShieldCheck,
} from 'lucide-react';

interface TrustBadgesProps {
  className?: string;
}

interface Badge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const badges: Badge[] = [
  {
    icon: <Award className="h-8 w-8" />,
    title: '25 años de experiencia',
    description: 'Líderes en el sector desde 1999',
  },
  {
    icon: <Wine className="h-8 w-8" />,
    title: '+10.000 referencias',
    description: 'El mayor catálogo de vinos',
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Envío express 24h',
    description: 'Envío rápido y seguro',
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Garantía de satisfacción',
    description: 'Devolución sin preguntas',
  },
];

export const TrustBadges: React.FC<TrustBadgesProps> = ({ className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 rounded-lg border border-gray-200 hover:border-yellow-400 transition-colors"
        >
          <div className="text-yellow-500 mb-3">{badge.icon}</div>
          <h3 className="font-bold text-black text-sm mb-1">{badge.title}</h3>
          <p className="text-xs text-gray-600">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};
