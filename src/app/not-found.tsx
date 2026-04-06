'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Home, Wine } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
          <Wine className="h-24 w-24 text-yellow-500 mx-auto mb-8 opacity-50" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¡Ups! Esta página no existe
        </h1>

        <p className="text-xl text-gray-600 mb-2">
          Parece que este vino se ha agotado...
        </p>

        <p className="text-gray-600 mb-8">
          La página que estás buscando no existe o ha sido movida. Por favor,
          intenta con otra búsqueda o vuelve al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <Button className="flex items-center gap-2 justify-center w-full sm:w-auto">
              <Home className="h-5 w-5" />
              Volver al inicio
            </Button>
          </Link>
          <Link href="/vinos">
            <Button variant="outline" className="flex items-center gap-2 justify-center w-full sm:w-auto">
              <Wine className="h-5 w-5" />
              Explorar vinos
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Búsqueda rápida</h2>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Buscar vino, región, bodega..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
            />
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Search className="h-5 w-5" />
              Buscar
            </button>
          </div>

          <div className="text-left">
            <p className="text-gray-600 text-sm mb-3">Enlaces útiles:</p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/vinos"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center font-semibold"
              >
                Todos los vinos
              </Link>
              <Link
                href="/vinos/tinto"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center font-semibold"
              >
                Vinos tintos
              </Link>
              <Link
                href="/vinos/blanco"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center font-semibold"
              >
                Vinos blancos
              </Link>
              <Link
                href="/ayuda"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-center font-semibold"
              >
                Centro de ayuda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
