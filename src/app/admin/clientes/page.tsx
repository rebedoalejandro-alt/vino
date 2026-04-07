'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Eye, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { generateMockCustomers } from '@/lib/admin-data';

export default function CustomersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(generateMockCustomers());
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = (id: string) => {
    if (confirm('Â¿EstÃ¡s seguro de que deseas eliminar este cliente?')) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">GestiÃ³n de Clientes</h1>
        <p className="text-slate-400 mt-2">Total: {filteredCustomers.length} clientes</p>
      </div>

      {/* Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Sort */}
        <div>
          <select
            defaultValue=""
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-amber-500"
          >
            <option value="">Ordenar por</option>
            <option value="name">Nombre</option>
            <option value="recent">MÃ¡s Recientes</option>
            <option value="spent">Mayor Gasto</option>
            <option value="orders">MÃ¡s Pedidos</option>
          </select>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCustomers.slice(0, 6).map((customer) => (
          <div
            key={customer.id}
            className="bg-slate-700 rounded-lg border border-slate-600 p-6 hover:border-amber-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{customer.email}</p>
              </div>
              <button
                onClick={() =>
                  setExpandedCustomer(
                    expandedCustomer === customer.id ? null : customer.id
                  )
                }
                className="p-1 hover:bg-slate-600 rounded transition-colors"
              >
                <Eye className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            {/* Customer Info */}
            <div className="space-y-2 mb-4 pb-4 border-b border-slate-600">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{customer.city}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-400">Pedidos</p>
                <p className="text-lg font-bold text-white">
                  {customer.totalOrders}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Gasto Total</p>
                <p className="text-lg font-bold text-amber-400">
                  â¬{customer.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={() => handleDelete(customer.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Correo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Ciudad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Gasto Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Se UniÃ³
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-slate-600 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {customer.city}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                        {customer.totalOrders}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      â¬{customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {customer.joinDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setExpandedCustomer(
                              expandedCustomer === customer.id ? null : customer.id
                            )
                          }
                          className="p-1 hover:bg-slate-600 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="p-1 hover:bg-slate-600 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                    No se encontraron clientes
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
