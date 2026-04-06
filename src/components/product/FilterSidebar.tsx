'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

interface FilterValue {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
}

interface FilterSidebarProps {
  onFilterChange?: (filters: Record<string, unknown>) => void;
  className?: string;
}

interface FilterGroup {
  id: string;
  label: string;
  expanded: boolean;
  options: FilterValue[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  className = '',
}) => {
  const [filters, setFilters] = useState<Record<string, FilterGroup>>({
    offers: {
      id: 'offers',
      label: 'Ofertas',
      expanded: true,
      options: [
        { id: 'onSale', label: 'En promoción', checked: false },
      ],
    },
    shipping: {
      id: 'shipping',
      label: 'Envío inmediato',
      expanded: true,
      options: [
        { id: 'immediate', label: 'Disponible ya', checked: false },
      ],
    },
    organic: {
      id: 'organic',
      label: 'Ecológico',
      expanded: true,
      options: [
        { id: 'eco', label: 'Vinos ecológicos', checked: false },
      ],
    },
    parkerScore: {
      id: 'parkerScore',
      label: 'Puntuación Parker',
      expanded: false,
      options: [
        { id: 'parker90-92', label: '90-92 puntos', checked: false },
        { id: 'parker92-94', label: '92-94 puntos', checked: false },
        { id: 'parker94-96', label: '94-96 puntos', checked: false },
        { id: 'parker96+', label: '96+ puntos', checked: false },
      ],
    },
    region: {
      id: 'region',
      label: 'Región',
      expanded: false,
      options: [
        { id: 'rioja', label: 'La Rioja', count: 45, checked: false },
        { id: 'ribera', label: 'Ribera del Duero', count: 38, checked: false },
        { id: 'penedes', label: 'Penedès', count: 32, checked: false },
        { id: 'priorat', label: 'Priorat', count: 18, checked: false },
        { id: 'riojas', label: 'Riojas Alavesas', count: 22, checked: false },
      ],
    },
    price: {
      id: 'price',
      label: 'Precio',
      expanded: true,
      options: [
        { id: 'price0-20', label: '0€ - 20€', checked: false },
        { id: 'price20-50', label: '20€ - 50€', checked: false },
        { id: 'price50-100', label: '50€ - 100€', checked: false },
        { id: 'price100+', label: '100€+', checked: false },
      ],
    },
    grape: {
      id: 'grape',
      label: 'Uva',
      expanded: false,
      options: [
        { id: 'tempranillo', label: 'Tempranillo', count: 52, checked: false },
        { id: 'garnacha', label: 'Garnacha', count: 38, checked: false },
        { id: 'cabernetsauvignon', label: 'Cabernet Sauvignon', count: 28, checked: false },
        { id: 'merlot', label: 'Merlot', count: 24, checked: false },
        { id: 'albariño', label: 'Albariño', count: 15, checked: false },
      ],
    },
    format: {
      id: 'format',
      label: 'Formato',
      expanded: false,
      options: [
        { id: 'bottle750', label: 'Botella 750ml', count: 156, checked: false },
        { id: 'bottle1500', label: 'Botella 1.5L', count: 24, checked: false },
        { id: 'box', label: 'Caja x6', count: 8, checked: false },
      ],
    },
    vintage: {
      id: 'vintage',
      label: 'Añada',
      expanded: false,
      options: [
        { id: 'vintage2023', label: '2023', checked: false },
        { id: 'vintage2022', label: '2022', checked: false },
        { id: 'vintage2021', label: '2021', checked: false },
        { id: 'vintage2020', label: '2020', checked: false },
        { id: 'vintage2019', label: '2019', checked: false },
      ],
    },
    bodega: {
      id: 'bodega',
      label: 'Bodegas',
      expanded: false,
      options: [
        { id: 'marquesderiscal', label: 'Marqués de Riscal', count: 8, checked: false },
        { id: 'lopezheredia', label: 'López Heredia', count: 6, checked: false },
        { id: 'cvne', label: 'CVNE', count: 5, checked: false },
        { id: 'marceladeburgos', label: 'Marcela de Burgos', count: 4, checked: false },
      ],
    },
  });

  const [customPriceMin, setCustomPriceMin] = useState<string>('');
  const [customPriceMax, setCustomPriceMax] = useState<string>('');
  const [showMoreRegions, setShowMoreRegions] = useState(false);
  const [showMoreGrapes, setShowMoreGrapes] = useState(false);
  const [showMoreBodegas, setShowMoreBodegas] = useState(false);

  const toggleFilter = (groupId: string, optionId: string) => {
    setFilters((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        options: prev[groupId].options.map((opt) =>
          opt.id === optionId ? { ...opt, checked: !opt.checked } : opt
        ),
      },
    }));

    if (onFilterChange) {
      const activeFilters = Object.keys(filters).reduce((acc, key) => {
        acc[key] = filters[key].options
          .filter((opt) => opt.checked)
          .map((opt) => opt.id);
        return acc;
      }, {} as Record<string, string[]>);
      onFilterChange(activeFilters);
    }
  };

  const toggleGroupExpanded = (groupId: string) => {
    setFilters((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        expanded: !prev[groupId].expanded,
      },
    }));
  };

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = {
        ...filters[key],
        options: filters[key].options.map((opt) => ({ ...opt, checked: false })),
      };
      return acc;
    }, {} as Record<string, FilterGroup>);

    setFilters(clearedFilters);
    setCustomPriceMin('');
    setCustomPriceMax('');

    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce(
      (count, group) => count + group.options.filter((opt) => opt.checked).length,
      0
    );
  };

  const activeCount = getActiveFiltersCount();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg text-black">Filtros</h2>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700"
          >
            Limpiar ({activeCount})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {Object.values(filters).map((group) => (
          <div key={group.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <button
              onClick={() => toggleGroupExpanded(group.id)}
              className="flex items-center justify-between w-full py-2 font-semibold text-black hover:text-gray-700 transition-colors"
            >
              <span>{group.label}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${group.expanded ? 'rotate-180' : ''}`}
              />
            </button>

            {group.expanded && (
              <div className="mt-3 space-y-2 ml-2">
                {(group.id === 'region' && !showMoreRegions
                  ? group.options.slice(0, 4)
                  : group.id === 'grape' && !showMoreGrapes
                    ? group.options.slice(0, 4)
                    : group.id === 'bodega' && !showMoreBodegas
                      ? group.options.slice(0, 3)
                      : group.options
                ).map((option) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => toggleFilter(group.id, option.id)}
                      className="w-4 h-4 accent-yellow-400 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 flex-grow">{option.label}</span>
                    {option.count && <span className="text-xs text-gray-500">({option.count})</span>}
                  </label>
                ))}

                {group.id === 'region' && group.options.length > 4 && (
                  <button
                    onClick={() => setShowMoreRegions(!showMoreRegions)}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold mt-2"
                  >
                    {showMoreRegions ? 'Ver menos' : 'Ver más'}
                  </button>
                )}

                {group.id === 'grape' && group.options.length > 4 && (
                  <button
                    onClick={() => setShowMoreGrapes(!showMoreGrapes)}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold mt-2"
                  >
                    {showMoreGrapes ? 'Ver menos' : 'Ver más'}
                  </button>
                )}

                {group.id === 'bodega' && group.options.length > 3 && (
                  <button
                    onClick={() => setShowMoreBodegas(!showMoreBodegas)}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold mt-2"
                  >
                    {showMoreBodegas ? 'Ver menos' : 'Ver más'}
                  </button>
                )}

                {group.id === 'price' && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Mín"
                        value={customPriceMin}
                        onChange={(e) => setCustomPriceMin(e.target.value)}
                        className="w-1/2 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-400"
                      />
                      <input
                        type="number"
                        placeholder="Máx"
                        value={customPriceMax}
                        onChange={(e) => setCustomPriceMax(e.target.value)}
                        className="w-1/2 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
