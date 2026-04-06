'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  MapPin,
  Users,
  LogOut,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function CuentaPage() {
  const [isLoggedIn] = useState(true);

  const sidebarItems = [
    { label: 'Mi cuenta', icon: User, href: '/cuenta', isActive: true },
    { label: 'Mis pedidos', icon: Package, href: '/cuenta/pedidos' },
    { label: 'Mi lista de deseos', icon: Heart, href: '/cuenta/favoritos' },
    { label: 'Mis direcciones', icon: MapPin, href: '/cuenta/direcciones' },
    { label: 'Programa de referidos', icon: Users, href: '/cuenta/referidos' },
  ];

  const mockOrders = [
    {
      id: '1',
      number: 'CDV-2024-001',
      date: '15 de marzo, 2024',
      status: 'entregado',
      total: 89.99,
      items: 2,
    },
    {
      id: '2',
      number: 'CDV-2024-002',
      date: '8 de marzo, 2024',
      status: 'enviado',
      total: 145.50,
      items: 3,
    },
    {
      id: '3',
      number: 'CDV-2024-003',
      date: '1 de marzo, 2024',
      status: 'entregado',
      total: 79.99,
      items: 1,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <Badge variant="new" label="Pendiente" />;
      case 'confirmado':
        return <Badge variant="new" label="Confirmado" />;
      case 'enviado':
        return <Badge variant="new" label="Enviado" />;
      case 'entregado':
        return <Badge variant="recommended" label="Entregado" />;
      case 'cancelado':
        return <Badge variant="discount" label="Cancelado" />;
      default:
        return <div className="text-sm px-2 py-1 rounded bg-gray-200">{status}</div>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Inicia sesión</h1>
          <p className="text-gray-600 mb-6">
            Por favor inicia sesión para ver tu cuenta y tus pedidos.
          </p>
          <div className="space-y-3">
            <Link href="/auth/login" className="block">
              <Button fullWidth>Iniciar sesión</Button>
            </Link>
            <Link href="/auth/register" className="block">
              <Button variant="outline" fullWidth>
                Crear una cuenta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-md overflow-hidden">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-6 py-4 border-l-4 transition-colors ${
                      item.isActive
                        ? 'border-yellow-500 bg-yellow-50 text-gray-900 font-semibold'
                        : 'border-transparent text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
              <button className="flex items-center gap-3 px-6 py-4 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                <LogOut className="h-5 w-5" />
                Cerrar sesión
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-3">
            <div className="space-y-8">
              <section className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold mb-2">Bienvenido, Juan</h1>
                <p className="text-gray-600">
                  Aquí puedes gestionar tu cuenta y tus pedidos.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <Package className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm mb-1">Total de pedidos</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm mb-1">En lista de deseos</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm mb-1">Dinero ahorrado</p>
                  <p className="text-3xl font-bold">127€</p>
                </div>
              </div>

              <section className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Pedidos recientes</h2>
                  <Link href="/cuenta/pedidos" className="text-yellow-500 hover:text-yellow-600 font-semibold flex items-center gap-1">
                    Ver todos
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">
                          Pedido {order.number}
                        </p>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Fecha</p>
                          <p>{order.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Artículos</p>
                          <p>{order.items} producto(s)</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total</p>
                          <p className="font-semibold text-gray-900">
                            {order.total.toFixed(2)}€
                          </p>
                        </div>
                        <div className="text-right">
                          <Link href={`/cuenta/pedidos/${order.id}`}>
                            <Button size="sm" variant="outline">
                              Ver detalle
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
