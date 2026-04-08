'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { saveOrder } from '@/lib/orders-store';

type CheckoutStep = 1 | 2 | 3 | 4;
type PaymentMethod = 'card' | 'paypal' | 'transfer';

interface IdentificationForm {
  email: string;
  password: string;
  registerEmail: string;
  registerPassword: string;
  registerConfirmPassword: string;
  guestEmail: string;
}

interface ShippingForm {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  saveAsDefault: boolean;
}

interface PaymentForm {
  method: PaymentMethod;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

export default function CheckoutPage() {
  const { items, getSubtotal, getShippingCost, getTax, getTotalWithShipping, clearCart } = useCart();
  const savedItemsRef = useRef(items);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [authType, setAuthType] = useState<'login' | 'register' | 'guest'>('guest');

  const [identification, setIdentification] = useState<IdentificationForm>({
    email: '',
    password: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
    guestEmail: '',
  });

  const [shipping, setShipping] = useState<ShippingForm>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'ES',
    phone: '',
    saveAsDefault: false,
  });

  const [payment, setPayment] = useState<PaymentForm>({
    method: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const shippingCost = getShippingCost();
  const tax = getTax();
  const total = getTotalWithShipping();

  const getCustomerEmail = () => {
    if (authType === 'login') return identification.email;
    if (authType === 'register') return identification.registerEmail;
    return identification.guestEmail;
  };

  const handleStepComplete = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as CheckoutStep);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as CheckoutStep);
    }
  };

  const handleFinalizeOrder = () => {
    setIsProcessing(true);
    // Save a snapshot of items before clearing
    savedItemsRef.current = [...items];

    const paymentMethodLabel =
      payment.method === 'card' ? 'Tarjeta de crÃ©dito' :
      payment.method === 'paypal' ? 'PayPal' : 'Transferencia bancaria';

    const order = saveOrder({
      customerName: `${shipping.firstName} ${shipping.lastName}`,
      customerEmail: getCustomerEmail(),
      customerPhone: shipping.phone,
      shippingAddress: `${shipping.address}${shipping.apartment ? ', ' + shipping.apartment : ''}, ${shipping.postalCode} ${shipping.city}, ${shipping.country}`,
      paymentMethod: paymentMethodLabel,
      items: items.map(item => ({
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      shippingCost,
      tax,
      total,
    });

    setOrderNumber(order.orderNumber);
    clearCart();
    setIsProcessing(false);
    setCurrentStep(4);
  };

  const isStep1Valid = (
    (authType === 'login' && identification.email && identification.password) ||
    (authType === 'register' && identification.registerEmail && identification.registerPassword && identification.registerConfirmPassword) ||
    (authType === 'guest' && identification.guestEmail)
  );

  const isStep2Valid =
    shipping.firstName &&
    shipping.lastName &&
    shipping.address &&
    shipping.city &&
    shipping.postalCode &&
    shipping.phone;

  const isStep3Valid = payment.method && (
    payment.method !== 'card' ||
    (payment.cardNumber && payment.cardExpiry && payment.cardCVC)
  );

  // Use saved items for display after cart is cleared (step 4)
  const displayItems = currentStep === 4 ? savedItemsRef.current : items;

  if (items.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black mb-4">Tu carrito estÃ¡ vacÃ­o</h1>
            <p className="text-gray-600 mb-8">AÃ±ade productos a tu carrito antes de proceder al pago.</p>
            <Link href="/vinos">
              <Button variant="primary" size="lg">
                Volver a la tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'IdentificaciÃ³n' },
              { step: 2, label: 'EnvÃ­o' },
              { step: 3, label: 'Pago' },
              { step: 4, label: 'ConfirmaciÃ³n' },
            ].map((item, index, array) => (
              <div key={item.step} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                    currentStep > item.step
                      ? 'bg-yellow-400 text-black'
                      : currentStep === item.step
                      ? 'bg-yellow-400 text-black border-2 border-yellow-500'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > item.step ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    item.step
                  )}
                </div>

                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-semibold ${currentStep >= item.step ? 'text-black' : 'text-gray-500'}`}>
                    {item.label}
                  </p>
                </div>

                {index < array.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 sm:mx-4 ${currentStep > item.step ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 sm:p-8">
              {/* Step 1: IdentificaciÃ³n */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6">IdentificaciÃ³n</h2>

                  {/* Login Section */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <label className="flex items-center mb-4">
                      <input
                        type="radio"
                        name="auth"
                        value="login"
                        checked={authType === 'login'}
                        onChange={(e) => setAuthType(e.target.value as 'login' | 'register' | 'guest')}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-black">Â¿Ya tienes cuenta?</span>
                    </label>

                    {authType === 'login' && (
                      <div className="ml-7 space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={identification.email}
                            onChange={(e) => setIdentification({ ...identification, email: e.target.value })}
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">ContraseÃ±a</label>
                          <input
                            type="password"
                            value={identification.password}
                            onChange={(e) => setIdentification({ ...identification, password: e.target.value })}
                            placeholder="â¢â¢â¢â¢â¢â¢â¢â¢"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                          />
                        </div>
                        <a href="#" className="text-sm text-yellow-500 hover:text-yellow-600">
                          Â¿Olvidaste tu contraseÃ±a?
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Register Section */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <label className="flex items-center mb-4">
                      <input
                        type="radio"
                        name="auth"
                        value="register"
                        checked={authType === 'register'}
                        onChange={(e) => setAuthType(e.target.value as 'login' | 'register' | 'guest')}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-black">Crear cuenta</span>
                    </label>

                    {authType === 'register' && (
                      <div className="ml-7 space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={identification.registerEmail}
                            onChange={(e) => setIdentification({ ...identification, registerEmail: e.target.value })}
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">ContraseÃ±a</label>
                          <input
                            type="password"
                            value={identification.registerPassword}
                            onChange={(e) => setIdentification({ ...identification, registerPassword: e.target.value })}
                            placeholder="â¢â¢â¢â¢â¢â¢â¢â¢"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar contraseÃ±a</label>
                          <input
                            type="password"
                            value={identification.registerConfirmPassword}
                            onChange={(e) => setIdentification({ ...identification, registerConfirmPassword: e.target.value })}
                            placeholder="â¢â¢â¢â¢â¢â¢â¢â¢"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Guest Section */}
                  <div>
                    <label className="flex items-center mb-4">
                      <input
                        type="radio"
                        name="auth"
                        value="guest"
                        checked={authType === 'guest'}
                        onChange={(e) => setAuthType(e.target.value as 'login' | 'register' | 'guest')}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-black">Continuar como invitado</span>
                    </label>

                    {authType === 'guest' && (
                      <div className="ml-7">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={identification.guestEmail}
                          onChange={(e) => setIdentification({ ...identification, guestEmail: e.target.value })}
                          placeholder="tu@email.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      disabled={currentStep === 1}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleStepComplete}
                      disabled={!isStep1Valid}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Datos de envÃ­o */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6">Datos de envÃ­o</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                        <input
                          type="text"
                          value={shipping.firstName}
                          onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                          placeholder="Juan"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Apellidos</label>
                        <input
                          type="text"
                          value={shipping.lastName}
                          onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                          placeholder="GarcÃ­a LÃ³pez"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">DirecciÃ³n</label>
                      <input
                        type="text"
                        value={shipping.address}
                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                        placeholder="Calle Principal, 123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Piso/Puerta (opcional)</label>
                      <input
                        type="text"
                        value={shipping.apartment}
                        onChange={(e) => setShipping({ ...shipping, apartment: e.target.value })}
                        placeholder="Apto 4B"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad</label>
                        <input
                          type="text"
                          value={shipping.city}
                          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                          placeholder="Madrid"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CÃ³digo postal</label>
                        <input
                          type="text"
                          value={shipping.postalCode}
                          onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                          placeholder="28001"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">PaÃ­s</label>
                        <select
                          value={shipping.country}
                          onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                        >
                          <option value="ES">EspaÃ±a</option>
                          <option value="PT">Portugal</option>
                          <option value="FR">Francia</option>
                          <option value="IT">Italia</option>
                          <option value="DE">Alemania</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">TelÃ©fono</label>
                        <input
                          type="tel"
                          value={shipping.phone}
                          onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                          placeholder="+34 600 123 456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                    </div>

                    <label className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        checked={shipping.saveAsDefault}
                        onChange={(e) => setShipping({ ...shipping, saveAsDefault: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">Guardar como direcciÃ³n predeterminada</span>
                    </label>
                  </div>

                  <div className="flex justify-between gap-4 mt-8">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Anterior
                    </Button>
                    <Button variant="primary" onClick={handleStepComplete} disabled={!isStep2Valid}>
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: MÃ©todo de pago */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6">MÃ©todo de pago</h2>

                  <div className="space-y-4">
                    {/* Tarjeta */}
                    <label className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-yellow-400 transition-colors">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={payment.method === 'card'}
                          onChange={(e) => setPayment({ ...payment, method: e.target.value as PaymentMethod })}
                          className="w-4 h-4"
                        />
                        <div className="ml-3">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-yellow-500" />
                            <span className="font-semibold text-black">Tarjeta de crÃ©dito/dÃ©bito</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Visa, Mastercard, American Express</p>
                        </div>
                      </div>

                      {payment.method === 'card' && (
                        <div className="ml-7 mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">NÃºmero de tarjeta</label>
                            <input
                              type="text"
                              value={payment.cardNumber}
                              onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Vencimiento</label>
                              <input
                                type="text"
                                value={payment.cardExpiry}
                                onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                                placeholder="MM/AA"
                                maxLength={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">CVC</label>
                              <input
                                type="text"
                                value={payment.cardCVC}
                                onChange={(e) => setPayment({ ...payment, cardCVC: e.target.value })}
                                placeholder="123"
                                maxLength={4}
                             className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </label>

                    {/* PayPal */}
                    <label className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-yellow-400 transition-colors">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={payment.method === 'paypal'}
                          onChange={(e) => setPayment({ ...payment, method: e.target.value as PaymentMethod })}
                          className="w-4 h-4"
                        />
                        <div className="ml-3">
                          <span className="font-semibold text-black">PayPal</span>
                             <p className="text-sm text-gray-500 mt-1">Paga de forma segura con tu cuenta PayPal</p>
                        </div>
                      </div>
                    </label>

                    {/* Bank Transfer */}
                    <label className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-yellow-400 transition-colors">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="transfer"
                          checked={payment.method === 'transfer'}
                          onChange={(e) => setPayment({ ...payment, method: e.target.value as PaymentMethod })}
                          className="w-4 h-4"
                        />
                        <div className="ml-3">
                          <span className="font-semibold text-black">Transferencia bancaria</span>
                          <p className="text-sm text-gray-500 mt-1">Recibimos tu transferencia en nuestra cuenta</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-between gap-4 mt-8">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Anterior
                    </Button>
                    <Button variant="primary" onClick={handleFinalizeOrder} disabled={!isStep3Valid || isProcessing}>
                      {isProcessing ? 'Procesando...' : 'Confirmar pedido'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: ConfirmaciÃ³n */}
              {currentStep === 4 && (
                <div className="text-center">
                  <div className="mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  </div>

                  <h2 className="text-2xl font-bold text-black mb-2">Â¡Pedido confirmado!</h2>
                  <p className="text-gray-600 mb-6">
                    Tu pedido ha sido procesado correctamente. Recibiras un email de confirmaciÃ³n en{' '}
                    <strong>{getCustomerEmail()}</strong>
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                    <p className="text-lg font-semibold text-black mb-2">Tu nÃºmero de pedido es:</p>
                    <p className="text-2xl font-bold text-yellow-500 mb-4">{orderNumber}</p>
                    <p className="text-sm text-gray-600">Conserva este nÃºmero para seguimiento de tu pedido</p>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                    <h3 className="text-lg font-bold text-black mb-4">Resumen del pedido</h3>
                    <div className="space-y-3 mb-4 border-b border-gray-200 pb-4">
                      {displayItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-black">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-black">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>EnvÃ­o:</span>
                        <span>{formatPrice(shippingCost)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>IVA (21%):</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-black pt-2 border-t border-gray-200">
                        <span>Total:</span>
                        <span className="text-yellow-500">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-yellow-500" />
                      DirecciÃ³n de envÃ­o
                    </h3>
                    <p className="text-gray-700">
                      {shipping.firstName} {shipping.lastName}
                      <br />
                      {shipping.address}
                      {shipping.apartment && <>, {shipping.apartment}</>}
                      <br />
                      {shipping.postalCode} {shipping.city}
                      <br />
                      {shipping.country}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/vinos" className="flex-1">
                      <Button variant="outline" fullWidth>
                        Volver a la tienda
                      </Button>
                    </Link>
                    <Link href="/cuenta/pedidos" className="flex-1">
                      <Button variant="primary" fullWidth>
                        Ver mis pedidos
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-black mb-4">Resumen del pedido</h3>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto border-b border-gray-200 pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div>
                      <p className="font-semibold text-black">{item.product.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-black text-right">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>EnvÃ­o:</span>
                  <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>IVA (21%):</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-black pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-yellow-500">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">ð</span>
                  <span className="text-xs text-gray-600">Pago 100% seguro</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">â</span>
                  <span className="text-xs text-gray-600">Compra verificada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
