'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Wine, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { TrustBadges } from '@/components/common/TrustBadges';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShippingCost, getTax, getTotalWithShipping } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const shippingCost = getShippingCost();
  const tax = getTax();
  const total = getTotalWithShipping();
  const freeShippingThreshold = 150;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode);
      // In a real app, you would validate the coupon here
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">Tu carrito</h1>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <Wine className="h-24 w-24 text-yellow-400 mb-6" />
            <h2 className="text-2xl font-bold text-black mb-3">Tu carrito está vacío</h2>
            <p className="text-gray-600 text-center mb-8 max-w-md">
              Descubre nuestra selección de vinos premium y añade algunos a tu carrito.
            </p>
            <Link href="/vinos">
              <Button variant="primary" size="lg">
                Descubre nuestros vinos
              </Button>
            </Link>
          </div>

          <div className="mt-20">
            <TrustBadges />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">Tu carrito</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="col-span-2">Imagen</div>
                <div className="col-span-3">Producto</div>
                <div className="col-span-2">Precio</div>
                <div className="col-span-2">Cantidad</div>
                <div className="col-span-2">Subtotal</div>
                <div className="col-span-1"></div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 gap-4">
                      {/* Image */}
                      <div className="md:col-span-2">
                        <div className="h-20 w-16 mx-auto md:mx-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="md:col-span-3 flex flex-col justify-center">
                        <Link href={`/vino/${item.product.id}`} className="font-semibold text-black hover:text-yellow-500 transition-colors">
                          {item.product.name}
                        </Link>
                        {item.product.bodega?.name && (
                          <p className="text-sm text-gray-500">{item.product.bodega.name}</p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                        <span className="md:hidden font-semibold text-sm text-gray-600">Precio:</span>
                        <span className="font-semibold text-black">{formatPrice(item.price)}</span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                        <span className="md:hidden font-semibold text-sm text-gray-600">Cantidad:</span>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Decrementar cantidad"
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border-0 font-semibold outline-none"
                            min="1"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Incrementar cantidad"
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                        <span className="md:hidden font-semibold text-sm text-gray-600">Subtotal:</span>
                        <span className="font-bold text-black">{formatPrice(item.price * item.quantity)}</span>
                      </div>

                      {/* Remove Button */}
                      <div className="md:col-span-1 flex items-center justify-center md:justify-end">
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-6">
              <Link href="/vinos" className="text-yellow-500 hover:text-yellow-600 font-semibold transition-colors">
                ← Seguir comprando
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-black mb-6">Resumen del pedido</h2>

              <div className="space-y-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
                </div>

                {/* Shipping Section */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gastos de envío:</span>
                  {shippingCost === 0 ? (
                    <span className="font-semibold text-green-600">Gratis</span>
                  ) : (
                    <span className="font-semibold text-black">{formatPrice(shippingCost)}</span>
                  )}
                </div>

                {/* Free Shipping Message */}
                {amountForFreeShipping > 0 && shippingCost > 0 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-900">
                      Añade <strong>{formatPrice(amountForFreeShipping)}</strong> más para envío gratis
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">IVA (21%):</span>
                    <span className="font-semibold text-black">{formatPrice(tax)}</span>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-black">Total (con IVA):</span>
                    <span className="text-yellow-500">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Código de descuento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Ingresa tu código"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                  >
                    Aplicar
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2">Código aplicado: {appliedCoupon}</p>
                )}
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button variant="primary" size="lg" fullWidth>
                  FINALIZAR COMPRA
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-700">🔒</span>
                  </div>
                  <span className="text-xs text-gray-600">Pago 100% seguro</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-700">✓</span>
                  </div>
                  <span className="text-xs text-gray-600">Compra verificada</span>
                </div>
              </div>

              {/* Help Link */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a href="#" className="text-sm text-yellow-500 hover:text-yellow-600 font-semibold transition-colors">
                  ¿Necesitas ayuda?
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Bottom */}
        <div className="mt-16">
          <TrustBadges />
        </div>
      </div>
    </div>
  );
}
