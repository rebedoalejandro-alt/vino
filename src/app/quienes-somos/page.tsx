'use client';

import React from 'react';
import { Shield, Award, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function QuienesSomosPage() {
  const stats = [
    { label: 'Años de experiencia', value: '25', suffix: '' },
    { label: 'Referencias de vinos', value: '+10.000', suffix: '' },
    { label: 'Clientes satisfechos', value: '+500.000', suffix: '' },
    { label: 'Opiniones positivas', value: '+50.000', suffix: '' },
  ];

  const guarantees = [
    {
      icon: Shield,
      title: 'Autenticidad garantizada',
      description:
        'Todos nuestros vinos son 100% auténticos. Trabajamos directamente con bodegas certificadas.',
    },
    {
      icon: Award,
      title: 'Mejor precio garantizado',
      description:
        'Si encuentras el mismo vino más barato en otra tienda, ajustaremos el precio.',
    },
    {
      icon: Users,
      title: 'Atención personalizada',
      description:
        'Nuestro equipo de expertos en vino está disponible para ayudarte con cualquier duda.',
    },
    {
      icon: Globe,
      title: 'Envío seguro',
      description:
        'Tus pedidos llegan en perfecto estado. Si hay un problema, te lo reemplazamos sin coste.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Quiénes somos
          </h1>
          <p className="text-xl text-yellow-100">
            Tu tienda de vinos de confianza desde 1999
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Nuestra historia</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Casa del Vino nació en 1999 con una pasión simple pero profunda:
              acercar los mejores vinos españoles e internacionales a amantes
              del vino como tú. Lo que comenzó como una pequeña bodega en el
              corazón de Madrid se ha convertido en uno de los principales
              distribuidores de vino online de Europa.
            </p>
            <p>
              Nuestro viaje ha sido guiado por tres principios fundamentales:
              calidad, autenticidad y compromiso con nuestros clientes. Creemos
              que cada botella cuenta una historia, y nuestro trabajo es
              ayudarte a descubrir esas historias.
            </p>
            <p>
              Durante más de dos décadas, hemos establecido relaciones sólidas
              con bodegas de todo el mundo, desde los viñedos tradicionarios de
              La Rioja y Ribera del Duero hasta los modernos productores de
              vinos naturales. Esta red nos permite ofrecerte una selección
              única y exclusiva que no encontrarás en otros lugares.
            </p>
            <p>
              Hoy, con más de 500.000 clientes satisfechos en toda Europa,
              seguimos manteniéndome fieles a nuestros valores originales:
              ofrecer vinos de calidad, precios justos y un servicio
              excepcional.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-yellow-500">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.suffix}</p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Nuestras garantías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500"
                >
                  <div className="flex gap-4">
                    <Icon className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {guarantee.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {guarantee.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Nuestro equipo</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Casa del Vino está formada por un equipo apasionado de expertos en
              vino, especialistas en logística y dedicados profesionales del
              servicio al cliente. Cada miembro del equipo comparte un objetivo
              común: hacer que tu experiencia con nosotros sea excepcional.
            </p>
            <p>
              Nuestros catadores certificados trabajan continuamente para
              seleccionar las mejores botellas. Nuestro equipo de atención al
              cliente está disponible para responder cualquier pregunta sobre
              nuestros vinos. Y nuestros especialistas en envíos garantizan que
              cada pedido llegue en perfecto estado.
            </p>
            <p>
              Creemos que la excelencia no es una destinación, sino un viaje
              constante. Por eso invertimos en formación continua, tecnología y
              en escuchar a nuestros clientes para mejorar cada día.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Tienes preguntas?</h2>
          <p className="text-gray-600 mb-6">
            Contáctanos en cualquier momento. Nuestro equipo está encantado de
            ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Contáctanos</Button>
            <Button variant="outline">Preguntas frecuentes</Button>
          </div>
        </section>
      </section>
    </div>
  );
}
