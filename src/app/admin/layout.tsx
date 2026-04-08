import { Metadata } from 'next';
import { AdminAuthProvider } from '@/lib/admin-auth';
import AdminLayoutContent from '@/components/admin/AdminLayoutContent';

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
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
