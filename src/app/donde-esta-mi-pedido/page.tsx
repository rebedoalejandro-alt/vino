'use client';

import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Tab = 'account' | 'guest';

interface TrackingStep {
  status: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function DondeEstaMiPedidoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('guest');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  const trackingSteps: TrackingStep[] = [
    {
      status: 'Pedido confirmado',
      date: '15 de marzo, 2024 - 10:30',
      description: 'Hemos recibido y confirmado tu pedido.',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      completed: true,
    },
    {
      status: 'En preparación',
      date: '15 de marzo, 2024 - 14:20',
      description: 'Estamos preparando tu pedido en nuestro almacén.',
      icon: <Package className="h-6 w-6 text-green-500" />,
      completed: true,
    },
    {
      status: 'Enviado',
      date: '16 de marzo, 2024 - 09:15',
      description:
        'Tu pedido ha sido enviado. Número de seguimiento: ES123456789',
      icon: <Truck className="h-6 w-6 text-green-500" />,
      completed: true,
    },
    {
      status: 'En reparto',
      date: 'Hoy',
      description: 'Tu pedido está siendo repartido. Llegará hoy.',
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      completed: false,
    },
    {
      status: 'Entregado',
      date: 'Pendiente',
      description: 'Tu pedido será entregado hoy.',
      icon: <CheckCircle className="h-6 w-6 text-gray-300" />,
      completed: false,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'account' || (email && orderNumber)) {
      setShowTracking(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">¿Dónde está mi pedido?</h1>
          <p className="text-gray-600">
            Localiza tu pedido y sigue su estado en tiempo real.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('guest');
                setShowTracking(false);
              }}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'guest'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Compré como invitado
            </button>
            <button
              onClick={() => {
                setActiveTab('account');
                setShowTracking(false);
              }}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'account'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Tengo cuenta
            </button>
          </div>

          {activeTab === 'guest' ? (
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Número de pedido
                </label>
                <input
                  type="text"
                  placeholder="CDV-2024-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                fullWidth
                className="flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                Buscar mi pedido
              </Button>
            </form>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Inicia sesión en tu cuenta para ver todos tus pedidos y su
                estado.
              </p>
              <Button fullWidth>Ir a mi cuenta</Button>
            </div>
          )}
        </div>

        {showTracking && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Pedido CDV-2024-001
              </h2>
              <p className="text-gray-600">
                Realizado el 15 de marzo, 2024 - Total: 89,99€
              </p>
            </div>

            <div className="space-y-4">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`rounded-full p-2 ${
                        step.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {step.icon}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`w-1 h-12 my-2 ${
                          trackingSteps[index + 1].completed
                            ? 'bg-green-300'
                            : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>

                  <div className="pb-4 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {step.status}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{step.date}</p>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Truck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">
                    En reparto hoy
                  </p>
                  <p className="text-sm text-blue-800">
                    Tu pedido llegará hoy entre las 09:00 y las 17:00. Puedes
                    rastrear el envío con el número de seguimiento:
                    ES123456789
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" fullWidth>
                Ver detalles del pedido
              </Button>
              <Button fullWidth>Rastrear con transportista</Button>
            </div>
          </div>
        )}

        {!showTracking && activeTab === 'guest' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-yellow-900 mb-2">
              Ingresa tus datos
            </h2>
            <p className="text-yellow-800">
              Proporciona tu email y número de pedido para rastrear tu compra.
            </p>
          </div>
        )}

        <section className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes sobre rastreo</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Cuándo puedo rastrear mi pedido?
              </h3>
              <p className="text-gray-600 text-sm">
                Una vez que tu pedido sea enviado, recibirás un email con el
                número de seguimiento. Esto generalmente ocurre dentro de 24
                horas después de realizar el pedido.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Dónde puedo encontrar mi número de seguimiento?
              </h3>
              <p className="text-gray-600 text-sm">
                El número de seguimiento se envía por email. Si no lo encuentras,
                revisa tu carpeta de spam o usa la opción &quot;¿Dónde está mi
                pedido?&quot; en esta página.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Puedo cambiar la dirección de entrega?
              </h3>
              <p className="text-gray-600 text-sm">
                Si tu pedido aún no ha sido enviado, puedes cambiar la dirección
                contactando a nuestro equipo lo antes posible. Una vez enviado,
                no es posible cambiar la dirección.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Qué pasa si mi pedido no llega?
              </h3>
              <p className="text-gray-600 text-sm">
                Si tu pedido no llega en los plazos estimados, contáctanos
                inmediatamente. Investigaremos con el transportista y te
                proporcionaremos una solución.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
