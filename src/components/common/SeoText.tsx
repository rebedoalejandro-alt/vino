'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SeoTextProps {
  text: string;
  linesBeforeExpand?: number;
  className?: string;
}

export const SeoText: React.FC<SeoTextProps> = ({
  text,
  linesBeforeExpand = 3,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = text.split('\n');
  const isLongText = lines.length > linesBeforeExpand;
  const displayedText = isExpanded ? text : lines.slice(0, linesBeforeExpand).join('\n');

  return (
    <div className={`${className}`}>
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
        <p className="whitespace-pre-wrap">{displayedText}</p>
      </div>

      {isLongText && (
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-yellow-600 hover:text-yellow-700 font-semibold flex items-center gap-1 p-0"
        >
          {isExpanded ? (
            <>
              Leer menos
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Leer más
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
};
