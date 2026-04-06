'use client';

import React from 'react';
import Link from 'next/link';

interface BlogArticle {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  gradient: string;
  href: string;
}

const articles: BlogArticle[] = [
  {
    id: '1',
    date: '15 de abril de 2026',
    title: 'Guía completa de vinos españoles',
    excerpt: 'Descubre las mejores regiones vitivinícolas de España y sus características únicas.',
    gradient: 'from-red-500 to-red-700',
    href: '/blog/guia-vinos-espanoles',
  },
  {
    id: '2',
    date: '12 de abril de 2026',
    title: 'Cómo elegir el vino perfecto para cada ocasión',
    excerpt: 'Aprende a seleccionar el vino ideal según el tipo de comida y evento.',
    gradient: 'from-purple-500 to-purple-700',
    href: '/blog/elegir-vino-perfecto',
  },
  {
    id: '3',
    date: '8 de abril de 2026',
    title: 'Tendencias en vinos naturales 2026',
    excerpt: 'Explora las últimas tendencias en la producción de vinos naturales y sostenibles.',
    gradient: 'from-green-500 to-green-700',
    href: '/blog/vinos-naturales-2026',
  },
];

interface BlogPreviewProps {
  className?: string;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ className = '' }) => {
  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Noticias y artículos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group cursor-pointer"
            >
              <div
                className={`bg-gradient-to-br ${article.gradient} h-48 md:h-56 rounded-lg shadow-md group-hover:shadow-lg transition-shadow overflow-hidden mb-4`}
              />

              <p className="text-sm text-gray-500 mb-2">{article.date}</p>

              <h3 className="text-lg font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              <span className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm">
                Leer más &gt;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
