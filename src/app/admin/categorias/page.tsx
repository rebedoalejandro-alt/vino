'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { wineCategories, WineCategory } from '@/lib/admin-data';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<WineCategory[]>(wineCategories);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleDelete = (id: string) => {
    if (confirm('Â¿EstÃ¡s seguro de que deseas eliminar esta categorÃ­a?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">GestiÃ³n de CategorÃ­as</h1>
          <p className="text-slate-400 mt-2">Total: {categories.length} categorÃ­as</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          AÃ±adir CategorÃ­a
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-slate-700 rounded-lg border border-slate-600 p-6 hover:border-amber-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{category.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-600 rounded transition-colors">
                  <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 hover:bg-slate-600 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            {/* Category Stats */}
            <div className="pt-4 border-t border-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Slug:</span>
                <code className="text-xs text-amber-400 font-mono">{category.slug}</code>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-slate-400">Productos:</span>
                <span className="text-sm font-semibold text-white">
                  {category.productCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Table View */}
      <div className="mt-8 bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
        <div className="p-6 border-b border-slate-600">
          <h2 className="text-lg font-semibold text-white">Vista Detallada</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  CategorÃ­a
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  DescripciÃ³n
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Productos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-slate-600 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                      {category.productCount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-600 rounded transition-colors">
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-1 hover:bg-slate-600 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
