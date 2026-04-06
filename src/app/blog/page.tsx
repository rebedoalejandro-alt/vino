'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Guía completa del vino de Rioja',
      slug: 'guia-vino-rioja',
      excerpt:
        'Descubre todo lo que necesitas saber sobre el vino de La Rioja: sus variedades, características y cómo elegir el perfecto para ti.',
      date: '15 de marzo, 2024',
      author: 'Carlos López',
      category: 'Guías',
      image: 'https://via.placeholder.com/600x400?text=Vino+Rioja',
      readTime: '8 min',
    },
    {
      id: '2',
      title: 'Maridaje: vinos blancos con pescado',
      slug: 'maridaje-vinos-blancos-pescado',
      excerpt:
        'Aprende las mejores combinaciones de vinos blancos con pescados y mariscos para potenciar tus comidas.',
      date: '10 de marzo, 2024',
      author: 'María Fernández',
      category: 'Maridaje',
      image: 'https://via.placeholder.com/600x400?text=Vino+Blanco+Pescado',
      readTime: '6 min',
    },
    {
      id: '3',
      title: 'Cómo almacenar correctamente tus vinos',
      slug: 'como-almacenar-vinos',
      excerpt:
        'Consejos prácticos para almacenar tus botellas de vino en casa y mantener su calidad durante años.',
      date: '5 de marzo, 2024',
      author: 'Juan García',
      category: 'Consejos',
      image: 'https://via.placeholder.com/600x400?text=Almacenamiento+Vino',
      readTime: '7 min',
    },
    {
      id: '4',
      title: 'Los mejores vinos naturales de 2024',
      slug: 'mejores-vinos-naturales-2024',
      excerpt:
        'Descubre nuestra selección de vinos naturales y ecológicos que están revolucionando el mundo del vino.',
      date: '1 de marzo, 2024',
      author: 'Pedro Sánchez',
      category: 'Tendencias',
      image: 'https://via.placeholder.com/600x400?text=Vino+Natural',
      readTime: '9 min',
    },
    {
      id: '5',
      title: 'Espumosos españoles: más que cava',
      slug: 'espumosos-espanoles-cava',
      excerpt:
        'Explora la variedad de espumosos españoles más allá del tradicional cava y encuentra tu favorito.',
      date: '25 de febrero, 2024',
      author: 'Ana Martínez',
      category: 'Guías',
      image: 'https://via.placeholder.com/600x400?text=Espumoso+Español',
      readTime: '6 min',
    },
    {
      id: '6',
      title: 'La sommelier: profesión y pasión',
      slug: 'sommelier-profesion-pasion',
      excerpt:
        'Entrevista con una sommelier experta que nos cuenta su experiencia y recomendaciones vitivinícolas.',
      date: '20 de febrero, 2024',
      author: 'Carlos López',
      category: 'Entrevistas',
      image: 'https://via.placeholder.com/600x400?text=Sommelier',
      readTime: '10 min',
    },
    {
      id: '7',
      title: 'Vinos rosados: perfectos para verano',
      slug: 'vinos-rosados-verano',
      excerpt:
        'Descubre por qué los vinos rosados son la mejor opción para disfrutar durante los meses de verano.',
      date: '15 de febrero, 2024',
      author: 'María Fernández',
      category: 'Temporada',
      image: 'https://via.placeholder.com/600x400?text=Vino+Rosado',
      readTime: '5 min',
    },
    {
      id: '8',
      title: 'Ribera del Duero: historia y tradición',
      slug: 'ribera-duero-historia',
      excerpt:
        'Viaja por la historia y tradición de una de las regiones vinícolas más prestigiosas de España.',
      date: '10 de febrero, 2024',
      author: 'Juan García',
      category: 'Regiones',
      image: 'https://via.placeholder.com/600x400?text=Ribera+Duero',
      readTime: '8 min',
    },
    {
      id: '9',
      title: 'Cata de vinos: técnicas básicas',
      slug: 'cata-vinos-tecnicas',
      excerpt:
        'Aprende las técnicas básicas para degustar vinos como un experto y desarrollar tu paladar.',
      date: '5 de febrero, 2024',
      author: 'Pedro Sánchez',
      category: 'Educación',
      image: 'https://via.placeholder.com/600x400?text=Cata+Vinos',
      readTime: '7 min',
    },
  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Blog del Vino</h1>
          <p className="text-gray-600">
            Artículos, guías y consejos sobre vinos, maridaje y enología.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-yellow-300 to-orange-300 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <div className="absolute top-3 left-3 bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-yellow-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <span>{post.readTime} de lectura</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold"
                >
                  Leer más
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-yellow-500 text-white'
                        : 'border border-gray-300 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
