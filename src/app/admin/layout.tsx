import type { Metadata } from 'next';
import { AdminAuthProvider } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export const metadata: Metadata = {
  title: 'Panel de Administración | Casa del Vino',
  description: 'Panel de administración para Casa del Vino',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="flex h-screen bg-slate-900">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto bg-slate-800">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}
