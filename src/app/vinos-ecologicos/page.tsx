'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Droplet, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EcoProduct {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  region: string;
  wineType: string;
  certification: string;
}

export default function VinosEcologicosPage() {
  const ecoProducts: EcoProduct[] = [
    {
      id: '1',
      name: 'Bodegas Bhilar Ecológico',
      price: 22.50,
      comparePrice: 32.00,
      image: 'https://via.placeholder.com/300x400?text=Eco+Wine+1',
      region: 'Rioja',
      wineType: 'Tinto',
      certification: 'Certificado EC',
    },
    {
      id: '2',
      name: 'Viña Ijalba Reserva Ecológica',
      price: 35.99,
      comparePrice: 52.00,
      image: 'https://via.placeholder.com/300x400?text=Eco+Wine+2',
      region: 'Rioja',
      wineType: 'Tinto',
      certification: 'ECOCERT',
    },
    {
      id: '3',
      name: 'Vega Vino Orgánico',
      price: 18.50,
      comparePrice: 26.00,
      image: 'https://via.placeholder.com/300x400?text=Eco+Wine+3',
      region: 'Penedès',
      wineType: 'Blanco',
      certification: 'Certificado EC',
    },
    {
      id: '4',
      name: 'Emilio Moro Finca Resalso Natural',
      price: 28.75,
      comparePrice: 42.00,
      image: 'https://via.placeholder.com/300x400?text=Eco+Wine+4',
      region: 'Ribera del Duero',
      wineType: 'Tinto',
      certification: 'Vino Natural',
    },
    {
      id: '5',
      name: 'Domaines Gayda Eclat de Terroir',
      price: 16.99,
      comparePrice: 24.00,
      image: 'https://via.placeholder.com/300x400?text=Eco+Wine+5',
      region: 'Languedoc',
      wineType: 'Blanco',
      certification: 'Certificado EC',
    },
    {
      id: '6',
      name: 'Envínate Tábula Natural Wine',
      price: 32.50,
      comparePrice: 48.00,
      image: 'https://via.placeholder.com/300x400?text=Eco+Wine+6',
      region: 'Canarias',
      wineType: 'Rosado',
      certification: 'Vino Natural',
    },
  ];

  const certifications = [
    {
      icon: Leaf,
      title: 'Agricultura Ecológica Certificada',
      description:
        'Viñas cultivadas sin pesticidas sintéticos, respetando el ecosistema natural.',
    },
    {
      icon: Award,
      title: 'Certificaciones Internacionales',
      description:
        'Todos nuestros vinos ecológicos cuentan con certificaciones ECOCERT, EC u otras.',
    },
    {
      icon: Droplet,
      title: 'Métodos de Producción Sostenibles',
      description:
        'Técnicas de vinificación natural con mínima intervención química.',
    },
    {
      icon: Users,
      title: 'Apoyo a Productores Locales',
      description:
        'Trabajamos con bodegas pequeñas y medianas comprometidas con la sostenibilidad.',
    },
  ];

  const benefits = [
    {
      title: 'Mejor para tu salud',
      description:
        'Sin residuos de pesticidas sintéticos, lo que resulta en vinos más puros y saludables.',
    },
    {
      title: 'Mejor para el planeta',
      description:
        'La agricultura ecológica preserva los suelos, el agua y la biodiversidad del territorio.',
    },
    {
      title: 'Sabores auténticos',
      description:
        'Los vinos naturales expresan mejor el terroir y las características del viñedo.',
    },
    {
      title: 'Apoyo a la sostenibilidad',
      description:
        'Tu compra contribuye a mantener modelos de agricultura más responsables.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vinos Ecológicos y Naturales
          </h1>
          <p className="text-xl text-green-100">
            Vinos sostenibles y respetuosos con el medio ambiente
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            ¿Qué hace que un vino sea ecológico?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Un vino ecológico es aquel que proviene de viñas cultivadas bajo
            estrictos principios de agricultura ecológica certificada. Esto
            significa que durante el cultivo de la uva no se utilizan
            pesticidas sintéticos, herbicidas químicos ni fertilizantes
            artificiales. En su lugar, se emplean métodos naturales para
            controlar plagas y enfermedades, como el uso de insectos depredadores,
            rotación de cultivos y técnicas de control biológico.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Los vinos naturales van un paso más allá, minimizando también la
            intervención química durante el proceso de vinificación. Muchos no
            contienen sulfitos añadidos o los mantienen al mínimo, lo que
            resulta en vinos más frescos y expresivos del terroir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
              >
                <div className="flex gap-4">
                  <Icon className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Beneficios de los vinos ecológicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Nuestros vinos ecológicos</h2>
            <Link href="/vinos" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      <Leaf className="h-3 w-3" />
                      {product.certification}
                    </span>
                  </div>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                        -
                        {Math.round(
                          ((product.comparePrice - product.price) /
                            product.comparePrice) *
                            100
                        )}
                        %
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {product.wineType} - {product.region}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price.toFixed(2)}€
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.comparePrice.toFixed(2)}€
                        </span>
                      )}
                    </div>
                  </div>

                  <Link href={`/vinos/${product.id}`} className="block">
                    <Button fullWidth>Añadir al carrito</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-green-50 border border-green-200 rounded-lg p-8 mt-12 text-center">
          <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Comprometidos con la sostenibilidad
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Casa del Vino se compromete a promover la producción vitivinícola
            sostenible. Creemos que el futuro del vino está en prácticas más
            responsables con el medio ambiente y la salud de los consumidores.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            Conocer nuestro compromiso ambiental
          </Button>
        </section>
      </section>
    </div>
  );
}
