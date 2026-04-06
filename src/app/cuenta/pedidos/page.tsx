'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Eye, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function PedidosPage() {
  const orders = [
    {
      id: '1',
      number: 'CDV-2024-001',
      date: '15 de marzo, 2024',
      status: 'entregado' as const,
      total: 89.99,
      items: 2,
    },
    {
      id: '2',
      number: 'CDV-2024-002',
      date: '8 de marzo, 2024',
      status: 'enviado' as const,
      total: 145.50,
      items: 3,
    },
    {
      id: '3',
      number: 'CDV-2024-003',
      date: '1 de marzo, 2024',
      status: 'entregado' as const,
      total: 79.99,
      items: 1,
    },
    {
      id: '4',
      number: 'CDV-2024-004',
      date: '22 de febrero, 2024',
      status: 'pendiente' as const,
      total: 215.75,
      items: 4,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmado':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'enviado':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'entregado':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelado':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mis pedidos</h1>
          <p className="text-gray-600">
            Gestiona todos tus pedidos y visualiza su estado.
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Nº Pedido
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Artículos
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          {order.number}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{order.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {order.items} producto(s)
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          {order.total.toFixed(2)}€
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/cuenta/pedidos/${order.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            Ver detalle
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes pedidos
            </h2>
            <p className="text-gray-600 mb-6">
              Aún no has realizado ningún pedido. Empieza a explorar nuestra
              tienda.
            </p>
            <Link href="/vinos">
              <Button>Descubrir vinos</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
