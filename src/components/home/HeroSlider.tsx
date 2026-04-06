'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  gradient: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Descubre los mejores vinos de España',
    subtitle: 'Seleccionados por nuestros sommeliers',
    ctaText: 'Ver selección',
    ctaLink: '/vinos',
    gradient: 'from-red-900/80 via-red-800/70 to-red-700/60',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&h=900&fit=crop',
  },
  {
    id: 2,
    title: 'Novedades de temporada',
    subtitle: 'Las últimas añadas ya disponibles',
    ctaText: 'Explorar novedades',
    ctaLink: '/vinos?sort=newest',
    gradient: 'from-purple-900/80 via-purple-800/70 to-purple-700/60',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&h=900&fit=crop',
  },
  {
    id: 3,
    title: 'Ofertas especiales',
    subtitle: 'Hasta -40% en vinos seleccionados',
    ctaText: 'Ver ofertas',
    ctaLink: '/vinos?filter=offers',
    gradient: 'from-amber-900/80 via-amber-800/70 to-amber-700/60',
    image: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=1600&h=900&fit=crop',
  },
  {
    id: 4,
    title: 'Regala vino',
    subtitle: 'Packs y selecciones perfectas para regalar',
    ctaText: 'Ver packs',
    ctaLink: '/vinos',
    gradient: 'from-yellow-900/80 via-yellow-800/70 to-yellow-700/60',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1600&h=900&fit=crop',
  },
];

interface HeroSliderProps {
  className?: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className={`relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          key={slide.id}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-500 ease-in-out`}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-8 z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 text-center mb-8 drop-shadow-lg">
          {slide.subtitle}
        </p>
        <Button
          variant="primary"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3"
          onClick={() => window.location.href = slide.ctaLink}
        >
          {slide.ctaText}
        </Button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 w-2 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
