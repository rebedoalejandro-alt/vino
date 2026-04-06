'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  User,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export default function BlogArticlePage() {
  const article = {
    title: 'Guía completa del vino de Rioja',
    author: 'Carlos López',
    date: '15 de marzo, 2024',
    readTime: '8 min',
    category: 'Guías',
    image: 'https://via.placeholder.com/1200x600?text=Vino+Rioja',
  };

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: article.title },
  ];

  const relatedPosts = [
    {
      title: 'Los mejores vinos naturales de 2024',
      slug: 'mejores-vinos-naturales-2024',
      excerpt: 'Descubre nuestra selección de vinos naturales y ecológicos.',
      image: 'https://via.placeholder.com/300x200?text=Vino+Natural',
    },
    {
      title: 'Ribera del Duero: historia y tradición',
      slug: 'ribera-duero-historia',
      excerpt: 'Viaja por la historia y tradición de una región vinícola.',
      image: 'https://via.placeholder.com/300x200?text=Ribera+Duero',
    },
    {
      title: 'Cómo almacenar correctamente tus vinos',
      slug: 'como-almacenar-vinos',
      excerpt: 'Consejos prácticos para almacenar tus botellas de vino.',
      image: 'https://via.placeholder.com/300x200?text=Almacenamiento',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <article className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="relative h-96 bg-gradient-to-br from-yellow-300 to-orange-300">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {article.author}
              </div>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                {article.category}
              </span>
              <span className="text-sm">{article.readTime} de lectura</span>
            </div>

            <div className="prose prose-lg max-w-none mb-12 text-gray-700 leading-relaxed">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Introducción a la región de La Rioja
              </h2>
              <p>
                La Rioja es una de las regiones vinícolas más prestigiosas de
                España, ubicada en el norte del país. Durante siglos, ha sido
                conocida por producir vinos de una calidad excepcional que
                compiten con los mejores vinos del mundo. Sus condiciones
                climáticas únicas, suelos variados y tradición vitivinícola
                hacen de La Rioja un destino imprescindible para cualquier
                amante del vino.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Historia y tradición
              </h2>
              <p>
                La historia de la viticultura en La Rioja se remonta a la época
                romana, pero fue durante la Edad Media cuando la región cobró
                importancia como centro de producción de vino. Los monjes
                medievales fueron los primeros en reconocer el potencial de los
                viñedos riojanos y desarrollaron técnicas de cultivo y
                elaboración que sentarían las bases de la industria vitivinícola
                moderna.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Variedades de uva principales
              </h2>
              <p>
                La variedad Tempranillo es la más cultivada en La Rioja,
                representando el 80% de la producción. Esta uva tinta de
                excelente calidad produce vinos con cuerpo, estructura y una
                capacidad de envejecimiento excepcional. Otras variedades
                importantes incluyen la Garnacha, que aporta frescura y
                fruitiness, y la Mazuela, que añade taninos y complejidad.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Subregiones de La Rioja
              </h2>
              <p>
                La Rioja se divide en tres subregiones principales, cada una
                con características propias. La Rioja Alta, al noroeste, es
                conocida por sus vinos elegantes y longevos. La Rioja Alavesa,
                en el norte, produce vinos más frescos y aromáticos. La Rioja
                Baja, al sureste, elabora vinos con mayor concentración y
                cuerpo.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Características de los vinos riojanos
              </h2>
              <p>
                Los vinos de Rioja se caracterizan por su color rojo profundo,
                aromas complejos que incluyen notas de cereza, ciruela y especias,
                y una estructura equilibrada entre la acidez y los taninos. El
                envejecimiento en barrica de roble es fundamental en la
                elaboración de los riojanos de calidad, aportando notas de vainilla
                y tostado.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Cómo elegir un vino de Rioja
              </h2>
              <p>
                Al elegir un vino de Rioja, es importante tener en cuenta varios
                factores. La cosecha o vintage es fundamental, ya que las buenas
                cosechas producen vinos más estructurados y longevos. El tipo de
                envejecimiento también es crucial: los vinos jóvenes son más
                frescos y afrutados, mientras que los reservas y gran reservas
                ofrecen mayor complejidad y estructura.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Maridaje con vinos de Rioja
              </h2>
              <p>
                Los vinos de Rioja son extremadamente versátiles en la mesa.
                Los vinos jóvenes combinan perfecto con carnes rojas a la
                parrilla, jamón ibérico y quesos curados. Los reservas y gran
                reservas son ideales con guisos, carnes asadas y platos más
                elaborados. La estructura tánnica de estos vinos complementa
                perfectamente las grasas y sabores intensos de la gastronomía
                española.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Conclusión
              </h2>
              <p>
                La Rioja es indudablemente una de las grandes regiones
                vinícolas del mundo. Su tradición, calidad y versatilidad hacen
                de los vinos riojanos una excelente opción para cualquier
                ocasión, desde una comida casual hasta los eventos más especiales.
                Ya sea que prefieras vinos jóvenes y frescos o reservas complejos
                y elegantes, La Rioja tiene algo perfecto para ti.
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-8">
              <p className="text-gray-700 mb-4 font-semibold">
                ¿Te ha gustado este artículo? Comparte con tus amigos:
              </p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <span className="h-4 w-4">f</span>
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <span className="h-4 w-4">𝕏</span>
                  X
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Mail className="h-4 w-4" />
                  Email
                </button>
              </div>
            </div>
          </div>
        </article>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Artículos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 bg-gray-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-yellow-600 font-semibold text-sm">
                    Leer más
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
