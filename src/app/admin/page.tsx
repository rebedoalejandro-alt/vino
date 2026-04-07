'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { generateMockOrders, generateMockCustomers } from '@/lib/admin-data';
import RecentOrdersChart from '@/components/admin/RecentOrdersChart';
import SalesChart from '@/components/admin/SalesChart';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const mockOrders = generateMockOrders();
  const mockCustomers = generateMockCustomers();

  // Calculate KPIs
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalCustomers = mockCustomers.length;
  const totalProducts = 180;

  // Recent orders (last 5)
  const recentOrders = mockOrders.slice(0, 5);

  // Revenue trend
  const revenueGrowth = 12.5;
  const ordersGrowth = 8.3;

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">Resumen de tu tienda de vinos</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Ingresos Totales</h3>
            <div className="p-2 bg-amber-600/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">
            €{totalRevenue.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-400">+{revenueGrowth}% mes anterior</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Pedidos Totales</h3>
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{totalOrders}</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-400">+{ordersGrowth}% mes anterior</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Clientes</h3>
            <div className="p-2 bg-green-600/20 rounded-lg">
              <Users className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{totalCustomers}</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-400">+5 nuevos</span>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Productos</h3>
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Package className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{totalProducts}</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowDownRight className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400">-3 bajo stock</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RecentOrdersChart orders={recentOrders.slice(0, 5)} />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
        <div className="p-6 border-b border-slate-600">
          <h2 className="text-lg font-semibold text-white">Pedidos Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Número
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
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-600 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white font-mono">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-white font-semibold">
                    €{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'entregado'
                          ? 'bg-green-900/30 text-green-300'
                          : order.status === 'enviado'
                            ? 'bg-blue-900/30 text-blue-300'
                            : order.status === 'procesando'
                              ? 'bg-yellow-900/30 text-yellow-300'
                              : order.status === 'pendiente'
                                ? 'bg-orange-900/30 text-orange-300'
                                : 'bg-red-900/30 text-red-300'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
