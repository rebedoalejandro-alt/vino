'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface CarouselProps {
  children: React.ReactNode[];
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  autoScroll?: boolean;
  autoScrollInterval?: number;
  showNavigationArrows?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  autoScroll = false,
  autoScrollInterval = 5000,
  showNavigationArrows = true,
  className = '',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const itemWidth = container.firstElementChild?.clientWidth || 0;
      const currentItemsPerView = itemsPerView.desktop;
      const scrollAmount = itemWidth * currentItemsPerView;

      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, itemsPerView.desktop]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = container.firstElementChild?.clientWidth || 0;
    const scrollAmount = itemWidth * 2;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            {child}
          </div>
        ))}
      </div>

      {showNavigationArrows && (
        <>
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          {canScrollRight && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </>
      )}
    </div>
  );
};
