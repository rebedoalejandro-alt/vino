'use client';

import React, { useState } from 'react';
import { ChevronDown, Truck, Clock, Globe, Package } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ShippingRegion {
  region: string;
  icon: React.ReactNode;
  rates: {
    range: string;
    price: string;
  }[];
}

export default function GastosDeEnvioPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const shippingRegions: ShippingRegion[] = [
    {
      region: 'España peninsular',
      icon: <Package className="h-6 w-6" />,
      rates: [
        { range: '1-2 botellas', price: '5,90€' },
        { range: '3-5 botellas', price: '3,90€' },
        { range: '6+ botellas (>150€)', price: 'Gratis' },
      ],
    },
    {
      region: 'Islas Baleares',
      icon: <Package className="h-6 w-6" />,
      rates: [
        { range: '1-2 botellas', price: '8,90€' },
        { range: '3-5 botellas', price: '6,90€' },
        { range: '6+ botellas (>200€)', price: 'Gratis' },
      ],
    },
    {
      region: 'Islas Canarias',
      icon: <Package className="h-6 w-6" />,
      rates: [
        { range: '1-2 botellas', price: '12,90€' },
        { range: '3-5 botellas', price: '10,90€' },
        { range: '6+ botellas (>250€)', price: 'Gratis' },
      ],
    },
    {
      region: 'Portugal',
      icon: <Globe className="h-6 w-6" />,
      rates: [
        { range: '1-2 botellas', price: '9,90€' },
        { range: '3-5 botellas', price: '7,90€' },
        { range: '6+ botellas (>180€)', price: 'Gratis' },
      ],
    },
    {
      region: 'Francia',
      icon: <Globe className="h-6 w-6" />,
      rates: [
        { range: '1-2 botellas', price: '14,90€' },
        { range: '3-5 botellas', price: '12,90€' },
        { range: '6+ botellas (>200€)', price: 'Gratis' },
      ],
    },
    {
      region: 'Europa (resto)',
      icon: <Globe className="h-6 w-6" />,
      rates: [
        { range: '1-2 botellas', price: '19,90€' },
        { range: '3-5 botellas', price: '17,90€' },
        { range: '6+ botellas (>250€)', price: 'Gratis' },
      ],
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: '¿Cuánto tiempo tarda en llegar mi pedido?',
      answer:
        'Los pedidos a España peninsular generalmente llegan en 3-5 días laborales. Para Baleares y Canarias, pueden tardar entre 5-7 días. Los pedidos internacionales pueden tardar entre 7-15 días según el destino. Te enviaremos un email con el número de seguimiento una vez tu pedido sea enviado.',
    },
    {
      question: '¿Puedo rastrear mi pedido?',
      answer:
        'Sí, todos nuestros pedidos incluyen un número de seguimiento. Recibirás un email con el enlace de seguimiento en cuanto tu pedido sea despachado. Podrás ver el estado de tu envío en tiempo real en nuestra página de rastreo.',
    },
    {
      question: '¿Realizáis envíos internacionales fuera de Europa?',
      answer:
        'Actualmente, realizamos envíos a toda Europa. Para consultas sobre envíos a otros continentes, ponte en contacto con nuestro equipo de atención al cliente a través del formulario de contacto.',
    },
    {
      question: '¿Qué pasa si mi pedido se daña durante el envío?',
      answer:
        'La seguridad de tus vinos es nuestra prioridad. Todos nuestros pedidos están asegurados. Si recibes tu pedido dañado, contáctanos inmediatamente con fotos del daño y te reenviaremos el producto sin coste adicional o procesaremos un reembolso.',
    },
    {
      question: '¿Ofrecéis envío urgente?',
      answer:
        'Sí, ofrecemos envío express a España peninsular. Para activar esta opción, selecciona "Envío express (24-48 horas)" durante el checkout. El coste adicional es de 9,90€ para pedidos menores a 6 botellas.',
    },
    {
      question: '¿Hay gastos de envío en días festivos?',
      answer:
        'Sí, los costes de envío son los mismos todos los días del año. Sin embargo, los envíos realizados en días festivos pueden tardar un día más en ser procesados. Los plazos de entrega mencionados no incluyen fines de semana ni festivos.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Gastos de envío</h1>
          <p className="text-gray-600">
            Consulta nuestras tarifas de envío según tu ubicación y cantidad de
            botellas.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {shippingRegions.map((region, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-yellow-500">{region.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {region.region}
                  </h3>
                </div>
                <div className="space-y-3">
                  {region.rates.map((rate, rateIndex) => (
                    <div
                      key={rateIndex}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600">{rate.range}</span>
                      <span
                        className={`font-semibold ${
                          rate.price === 'Gratis'
                            ? 'text-green-600'
                            : 'text-gray-900'
                        }`}
                      >
                        {rate.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Información sobre envíos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex gap-4">
              <Truck className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Envío seguro</h3>
                <p className="text-gray-600 text-sm">
                  Todos nuestros pedidos se empacan con cuidado especial para
                  garantizar que tus vinos lleguen en perfecto estado.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Entregas rápidas
                </h3>
                <p className="text-gray-600 text-sm">
                  Procesamos los pedidos en 24 horas. Los envíos express llegan
                  en 24-48 horas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Package className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Rastreo incluido
                </h3>
                <p className="text-gray-600 text-sm">
                  Todos los envíos incluyen número de seguimiento para que
                  sepas dónde está tu pedido.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Globe className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cobertura europea
                </h3>
                <p className="text-gray-600 text-sm">
                  Enviamos a toda Europa con tarifas especiales para zonas
                  alejadas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFAQ(openFAQ === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                      openFAQ === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {openFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
