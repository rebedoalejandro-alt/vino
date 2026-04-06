'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function FavoritosPage() {
  const wishlistItems = [
    {
      id: '1',
      name: 'Vega Sicilia Unico 2019',
      price: 89.99,
      comparePrice: 129.99,
      image: 'https://via.placeholder.com/300x400?text=Vega+Sicilia',
      region: 'Ribera del Duero',
      wineType: 'Tinto',
      stock: 5,
      addedAt: '10 de marzo, 2024',
    },
    {
      id: '2',
      name: 'La Rioja Alta Gran Reserva 904',
      price: 45.99,
      comparePrice: 65.00,
      image: 'https://via.placeholder.com/300x400?text=La+Rioja',
      region: 'La Rioja',
      wineType: 'Tinto',
      stock: 12,
      addedAt: '5 de marzo, 2024',
    },
    {
      id: '3',
      name: 'Marqués de Murrieta Capellanía',
      price: 32.50,
      comparePrice: 48.00,
      image: 'https://via.placeholder.com/300x400?text=Murrieta',
      region: 'La Rioja',
      wineType: 'Tinto',
      stock: 8,
      addedAt: '1 de marzo, 2024',
    },
    {
      id: '4',
      name: 'Pazo de Señoans Albariño',
      price: 28.99,
      comparePrice: 42.00,
      image: 'https://via.placeholder.com/300x400?text=Albarino',
      region: 'Rías Baixas',
      wineType: 'Blanco',
      stock: 15,
      addedAt: '28 de febrero, 2024',
    },
    {
      id: '5',
      name: 'Raventós i Blanc Gramona',
      price: 55.00,
      comparePrice: 80.00,
      image: 'https://via.placeholder.com/300x400?text=Raventos',
      region: 'Penedès',
      wineType: 'Espumoso',
      stock: 6,
      addedAt: '20 de febrero, 2024',
    },
    {
      id: '6',
      name: 'Domaines Ott Château de Selle',
      price: 38.50,
      comparePrice: 58.00,
      image: 'https://via.placeholder.com/300x400?text=Ott',
      region: 'Provence',
      wineType: 'Rosado',
      stock: 10,
      addedAt: '15 de febrero, 2024',
    },
  ];

  const hasWishlist = wishlistItems.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mi lista de deseos</h1>
          <p className="text-gray-600">
            Guarda tus vinos favoritos para comprarlos más tarde.
          </p>
        </div>

        {hasWishlist ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </button>
                  {item.comparePrice && item.comparePrice > item.price && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="discount" value={`-${Math.round(
                          ((item.comparePrice - item.price) /
                            item.comparePrice) *
                            100
                        )}%`} />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {item.wineType} - {item.region}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {item.price.toFixed(2)}€
                      </span>
                      {item.comparePrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {item.comparePrice.toFixed(2)}€
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">
                      Añadido: {item.addedAt}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Link href={`/vinos/${item.id}`} className="block">
                      <Button fullWidth variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </Link>
                    <Button fullWidth size="sm">
                      Añadir al carrito
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Tu lista de deseos está vacía
            </h2>
            <p className="text-gray-600 mb-6">
              Añade tus vinos favoritos para guardarlos y comprarlos más tarde.
            </p>
            <Link href="/vinos">
              <Button className="flex items-center gap-2 mx-auto">
                Descubrir vinos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
