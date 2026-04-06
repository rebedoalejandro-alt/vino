'use client';

import React, { useState } from 'react';
import { Grid3x3, List } from 'lucide-react';
import { Button } from '../ui/Button';

type ViewMode = 'grid' | 'list';
type SortOption = 'bestseller' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'vintage';

interface SortBarProps {
  productCount?: number;
  onSortChange?: (sort: SortOption) => void;
  onViewModeChange?: (mode: ViewMode) => void;
  className?: string;
}

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'bestseller', label: 'Más vendidos' },
  { id: 'price-asc', label: 'Precio: menor a mayor' },
  { id: 'price-desc', label: 'Precio: mayor a menor' },
  { id: 'rating', label: 'Mejor puntuación' },
  { id: 'newest', label: 'Más recientes' },
  { id: 'vintage', label: 'Añada' },
];

export const SortBar: React.FC<SortBarProps> = ({
  productCount = 0,
  onSortChange,
  onViewModeChange,
  className = '',
}) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>('bestseller');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleSortChange = (sort: SortOption) => {
    setSelectedSort(sort);
    if (onSortChange) {
      onSortChange(sort);
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  return (
    <div
      className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 ${className}`}
    >
      {/* Left: Product count */}
      <div className="text-sm text-gray-600 font-medium min-w-fit">
        Mostrando <span className="font-bold text-black">{productCount}</span> vinos
      </div>

      {/* Center: Sort dropdown */}
      <div className="flex-grow flex justify-center">
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-yellow-400 bg-white text-black font-medium"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Right: View mode toggle */}
      <div className="flex gap-2 ml-auto">
        <Button
          variant={viewMode === 'grid' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleViewModeChange('grid')}
          className="p-2"
          title="Vista en grilla"
        >
          <Grid3x3 className="h-5 w-5" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleViewModeChange('list')}
          className="p-2"
          title="Vista en lista"
        >
          <List className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
