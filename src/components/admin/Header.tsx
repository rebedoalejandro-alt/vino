'use client';

import { Clock, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <h2 className="text-lg sm:text-xl font-semibold text-white">Panel de Control</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-5 h-5 hidden sm:block" />
            <span className="text-sm font-mono">{currentTime || '00:00:00'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
