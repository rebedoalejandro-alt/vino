'use client';

import Link from 'next/link';
import { ChevronDown, User, Heart, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface MegaMenuItem {
  label: string;
  href: string;
}

interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isYellow?: boolean;
}

interface MobileMenuProps {
  onClose: () => void;
  items: NavItem[];
  megaMenus: Record<string, MegaMenuColumn[]>;
}

export default function MobileMenu({
  onClose,
  items,
  megaMenus,
}: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 md:hidden bg-black bg-opacity-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="py-4">
          {items.map((item) => {
            const hasMegaMenu = megaMenus[item.label];
            const isOpen = openAccordion === item.label;

            return (
              <div key={item.label}>
                {hasMegaMenu ? (
                  <button
                    onClick={() => toggleAccordion(item.label)}
                    className={`w-full px-4 py-3 flex items-center justify-between text-sm font-semibold transition-colors ${
                      item.isYellow
                        ? 'text-yellow-600'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.icon && item.icon}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={`block px-4 py-3 text-sm font-semibold transition-colors ${
                      item.isYellow
                        ? 'text-yellow-600'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.icon && item.icon}
                    </span>
                  </Link>
                )}

                {/* Accordion Content */}
                {hasMegaMenu && isOpen && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    {megaMenus[item.label].map((column) => (
                      <div key={column.title} className="px-4 py-4">
                        <h3 className="text-xs font-bold uppercase text-yellow-600 mb-3">
                          {column.title}
                        </h3>
                        <ul className="space-y-2">
                          {column.items.map((menuItem) => (
                            <li key={menuItem.href}>
                              <Link
                                href={menuItem.href}
                                onClick={handleNavClick}
                                className="text-sm text-gray-700 hover:text-gray-900 hover:font-semibold transition-colors"
                              >
                                {menuItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* User Links */}
        <div className="py-4">
          {/* Mi Cuenta */}
          <Link
            href="/cuenta"
            onClick={handleNavClick}
            className="px-4 py-3 flex items-center gap-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <User size={18} />
            Mi Cuenta
          </Link>

          {/* Favoritos */}
          <Link
            href="/favoritos"
            onClick={handleNavClick}
            className="px-4 py-3 flex items-center gap-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors relative"
          >
            <Heart size={18} />
            <span>Favoritos</span>
            {wishlistCount > 0 && (
              <span className="ml-auto bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-2 py-1">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Carrito */}
          <Link
            href="/carrito"
            onClick={handleNavClick}
            className="px-4 py-3 flex items-center gap-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors relative"
          >
            <ShoppingBag size={18} />
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="ml-auto bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Dónde está mi pedido */}
          <Link
            href="/donde-esta-mi-pedido"
            onClick={handleNavClick}
            className="px-4 py-3 flex items-center gap-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            ¿Dónde está mi pedido?
          </Link>
        </div>
      </div>

      {/* Overlay click to close */}
      <div onClick={onClose} className="absolute inset-0" />
    </div>
  );
}
