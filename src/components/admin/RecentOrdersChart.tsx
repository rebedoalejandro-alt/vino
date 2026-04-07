'use client';

import { ShoppingCart } from 'lucide-react';
import { Order } from '@/lib/admin-data';

interface RecentOrdersChartProps {
  orders: Order[];
}

export default function RecentOrdersChart({ orders }: RecentOrdersChartProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado':
        return 'bg-green-900/30 text-green-300';
      case 'enviado':
        return 'bg-blue-900/30 text-blue-300';
      case 'procesando':
        return 'bg-yellow-900/30 text-yellow-300';
      case 'pendiente':
        return 'bg-orange-900/30 text-orange-300';
      default:
        return 'bg-red-900/30 text-red-300';
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg border border-slate-600 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Últimas Órdenes</h2>
        <ShoppingCart className="w-5 h-5 text-blue-500" />
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-3 bg-slate-800 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-white truncate">
                {order.customerName}
              </p>
              <p className="text-sm font-bold text-amber-400">
                €{order.total.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">{order.orderNumber}</p>
              <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
