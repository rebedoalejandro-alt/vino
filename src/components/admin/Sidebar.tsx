'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  LogOut,
} from 'lucide-react';
import { useAdminAuth } from '@/lib/admin-auth';

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const isActive = (path: string) => pathname.startsWith(path);

  const menuItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/productos',
      label: 'Productos',
      icon: Package,
    },
    {
      href: '/admin/categorias',
      label: 'CategorÃ­as',
      icon: Tag,
    },
    {
      href: '/admin/pedidos',
      label: 'Pedidos',
      icon: ShoppingCart,
    },
    {
      href: '/admin/clientes',
      label: 'Clientes',
      icon: Users,
    },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  return (
    <aside className="w-64 h-full bg-slate-900 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <img
          src="/logo-white.svg"
          alt="Casa del Vino"
          className="h-10 w-auto"
        />
        <p className="text-xs text-slate-400 mt-2">Panel de AdministraciÃ³n</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.href : isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesiÃ³n</span>
        </button>
      </div>
    </aside>
  );
}
