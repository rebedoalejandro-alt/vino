'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export function AdminAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('admin_token')
          : null;
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    if (email === 'admin@casadelvino.es' && password === 'admin123') {
      const token = btoa(`${email}:${password}`);
      localStorage.setItem('admin_token', token);
      setIsAuthenticated(true);
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  const value: AdminAuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('admin_token');
}
