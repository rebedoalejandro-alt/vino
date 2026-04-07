'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Eye, Trash2 } from 'lucide-react';
import { generateMockOrders, OrderStatus } from '@/lib/admin-data';

export default function OrdersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
  const [orders, setOrders] = useState(generateMockOrders());
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const statuses: OrderStatus[] = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm('Â¿EstÃ¡s seguro de que deseas eliminar este pedido?')) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const getStatusColor = (status: OrderStatus) => {
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
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">GestiÃ³n de Pedidos</h1>
        <p className="text-slate-400 mt-2">Total: {filteredOrders.length} pedidos</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nÃºmero, cliente o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | '')}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-amber-500"
          >
            <option value="">Todos los Estados</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range (placeholder) */}
        <div>
          <select
            defaultValue=""
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-amber-500"
          >
            <option value="">Ãltimos 30 dÃ­as</option>
            <option value="7">Ãltimos 7 dÃ­as</option>
            <option value="30">Ãltimos 30 dÃ­as</option>
            <option value="90">Ãltimos 90 dÃ­as</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  NÃºmero
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="contents">
                    <tr className="border-b border-slate-600 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-white">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-slate-400">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        â¬{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setExpandedOrder(
                                expandedOrder === order.id ? null : order.id
                              )
                            }
                            className="p-1 hover:bg-slate-600 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4 text-blue-400" />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-1 hover:bg-slate-600 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Order Details */}
                    {expandedOrder === order.id && (
                      <tr className="border-b border-slate-600 bg-slate-800">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  DIRECCIÃN DE ENVÃO
                                </p>
                                <p className="text-sm text-white">
                                  {order.shippingAddress}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  MÃTODO DE PAGO
                                </p>
                                <p className="text-sm text-white">
                                  {order.paymentMethod}
                                </p>
                              </div>
                            </div>

                            {/* Items */}
                            <div>
                              <p className="text-xs text-slate-400 mb-2">PRODUCTOS</p>
                              <div className="space-y-2">
                                {order.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between text-sm bg-slate-700 p-2 rounded"
                                  >
                                    <span className="text-white">
                                      {item.productName} x{item.quantity}
                                    </span>
                                    <span className="text-amber-400 font-semibold">
                                      â¬{item.total.toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </div>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No se encontraron pedidos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
