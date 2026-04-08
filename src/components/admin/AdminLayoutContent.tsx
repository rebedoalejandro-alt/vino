'use client';

import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export default function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Show sidebar/header only when authenticated and not on login page
  const showChrome = isAuthenticated && !isLoginPage;

  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-900 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500" />
      </div>
    );
  }

  if (!showChrome) {
    return (
      <div className="h-screen bg-slate-900">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
}
