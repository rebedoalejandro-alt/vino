'use client';

import React from 'react';
import { Gift } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReferralBannerProps {
  className?: string;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ className = '' }) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-400 rounded-lg p-8 md:p-12 flex flex-col items-center text-center">
          <Gift className="h-12 w-12 text-black mb-6" />

          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Recomienda y gana 10€ por cada amigo
          </h2>

          <p className="text-lg text-black/80 mb-8 max-w-2xl">
            Comparte tu código y ambos ganáis
          </p>

          <Button
            variant="secondary"
            className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-3"
            onClick={() => window.location.href = '/cuenta/referidos'}
          >
            Descubrir programa
          </Button>
        </div>
      </div>
    </section>
  );
};
