'use client';

import React from 'react';

type CriticType = 'Parker' | 'Suckling' | 'Peñín' | 'Tim Atkin' | 'Jancis Robinson';
type BadgeSize = 'sm' | 'md' | 'lg';

interface CriticBadgeProps {
  score: number;
  critic: CriticType;
  size?: BadgeSize;
  className?: string;
}

const criticColors: Record<CriticType, string> = {
  Parker: 'bg-purple-900',
  Suckling: 'bg-blue-900',
  Peñín: 'bg-green-900',
  'Tim Atkin': 'bg-red-900',
  'Jancis Robinson': 'bg-teal-900',
};

const criticAbbreviations: Record<CriticType, string> = {
  Parker: 'RP',
  Suckling: 'JS',
  Peñín: 'PEN',
  'Tim Atkin': 'TA',
  'Jancis Robinson': 'JR',
};

const sizeStyles: Record<BadgeSize, { container: string; score: string; label: string }> = {
  sm: {
    container: 'w-12 h-12',
    score: 'text-base',
    label: 'text-xs',
  },
  md: {
    container: 'w-16 h-16',
    score: 'text-xl',
    label: 'text-xs',
  },
  lg: {
    container: 'w-20 h-20',
    score: 'text-2xl',
    label: 'text-sm',
  },
};

export const CriticBadge: React.FC<CriticBadgeProps> = ({
  score,
  critic,
  size = 'md',
  className = '',
}) => {
  const bgColor = criticColors[critic] || 'bg-gray-900';
  const abbreviation = criticAbbreviations[critic];
  const styles = sizeStyles[size];

  return (
    <div
      className={`${bgColor} rounded-full flex flex-col items-center justify-center text-white ${styles.container} ${className}`}
    >
      <span className={`font-bold ${styles.score}`}>{score}</span>
      <span className={`font-semibold ${styles.label}`}>{abbreviation}</span>
    </div>
  );
};
