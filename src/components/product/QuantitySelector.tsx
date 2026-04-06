'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
  className = '',
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 border-2 border-yellow-400 rounded-md w-fit ${className}`}
    >
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Reducir cantidad"
      >
        <Minus className="h-4 w-4 text-black" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-12 text-center font-semibold border-0 focus:outline-none text-black"
      />

      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-4 w-4 text-black" />
      </button>
    </div>
  );
};
