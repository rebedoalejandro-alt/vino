'use client';

import Link from 'next/link';
import { Heart, Package, ShoppingBag, User } from 'lucide-react';
import SearchBar from './SearchBar';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useState } from 'react';

export default function Header() {
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  return (
    <header className="bg-white">
      {/* Top Info Bar */}
      <div className="bg-gray-100 text-center py-2">
        <p className="text-xs text-gray-600 font-medium">
          EnvÃ­o gratuito a partir de 150Ã¢ÂÂ¬
        </p>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0"
              aria-label="Casa del Vino - Inicio"
            >
              <img
                src="/logo.svg"
                alt="Casa del Vino"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex md:flex-1 md:max-w-md lg:max-w-lg">
              <SearchBar />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Language Selector */}
              <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => setLanguage('es')}
                  className={`text-xs font-medium px-2 py-1 transition-colors ${
                    language === 'es'
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ES
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-xs font-medium px-2 py-1 transition-colors ${
                    language === 'en'
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-3 md:gap-4">
                {/* Mi Cuenta */}
                <Link
                  href="/cuenta"
                  className="text-gray-700 hover:text-gray-900 transition-colors p-2"
                  aria-label="Mi Cuenta"
                  title="Mi Cuenta"
                >
                  <User size={20} />
                </Link>

                {/* Favoritos */}
                <Link
                  href="/cuenta/favoritos"
                  className="relative text-gray-700 hover:text-gray-900 transition-colors p-2"
                  aria-label="Favoritos"
                  title="Favoritos"
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Carrito */}
                <Link
                  href="/carrito"
                  className="relative text-gray-700 hover:text-gray-900 transition-colors p-2"
                  aria-label="Carrito de compra"
                  title="Carrito"
                >
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-4">
            <SearchBar />
          </div>

          {/* Bottom Info Row */}
          <div className="flex items-center justify-end gap-4 mt-3 md:mt-4 text-xs">
            <Link
              href="/donde-esta-mi-pedido"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <Package size={16} />
              <span className="hidden sm:inline">Â¿DÃ³nde estÃ¡ mi pedido?</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
