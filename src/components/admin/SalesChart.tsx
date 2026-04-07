'use client';

import { BarChart3 } from 'lucide-react';

export default function SalesChart() {
  // Mock data for the last 7 days
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const sales = [2400, 3200, 2800, 4100, 3500, 4800, 3900];
  const maxSales = Math.max(...sales);

  return (
    <div className="bg-slate-700 rounded-lg border border-slate-600 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Ingresos por Día</h2>
        <BarChart3 className="w-5 h-5 text-amber-500" />
      </div>

      <div className="space-y-6">
        {/* Chart */}
        <div className="flex items-end justify-between h-64 gap-4">
          {days.map((day, index) => {
            const height = (sales[index] / maxSales) * 100;
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-slate-600 rounded-t-lg overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-500 transition-all hover:from-amber-500 hover:to-amber-400 cursor-pointer"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                    title={`"��${sales[index]}`}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">{day}</p>
                <p className="text-xs text-slate-300 font-semibold mt-1">
                  €{sales[index]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-600">
          <div>
            <p className="text-slate-400 text-xs mb-1">Total Semana</p>
            <p className="text-xl font-bold text-white">
              €{sales.reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Promedio Diario</p>
            <p className="text-xl font-bold text-white">
              €{Math.round(sales.reduce((a, b) => a + b, 0) / days.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
