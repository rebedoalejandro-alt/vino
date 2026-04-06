'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, MessageCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FAQItem {
  question: string;
  answer: string;
}

interface Section {
  title: string;
  icon: React.ReactNode;
  faqs: FAQItem[];
}

export default function AyudaPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sections: Section[] = [
    {
      title: 'Transporte y entregas',
      icon: <i className="fas fa-truck" />,
      faqs: [
        {
          question: '¿Cuáles son los plazos de entrega?',
          answer:
            'Los pedidos a España peninsular se entregan en 3-5 días laborales. Islas Baleares y Canarias tardan 5-7 días. Los pedidos internacionales pueden tardar 7-15 días según el destino.',
        },
        {
          question: '¿Puedo rastrear mi pedido?',
          answer:
            'Sí, recibirás un email con el número de seguimiento una vez tu pedido sea despachado. Podrás ver el estado del envío en tiempo real en nuestro sitio web.',
        },
        {
          question: '¿Realizáis envío express?',
          answer:
            'Sí, ofrecemos envío express a España con entrega en 24-48 horas. El coste es de 9,90€ para pedidos menores a 6 botellas.',
        },
        {
          question: '¿Qué pasa si mi pedido llega dañado?',
          answer:
            'Contáctanos inmediatamente con fotos del daño. Te reenviaremos el producto sin coste adicional o procesaremos un reembolso. Todos nuestros pedidos están asegurados.',
        },
        {
          question: '¿Hacen entregas en fin de semana?',
          answer:
            'Nuestros transportistas generalmente entregan de lunes a viernes. En algunos casos puntuales pueden hacer entregas en sábado. Contáctanos para solicitudes especiales.',
        },
      ],
    },
    {
      title: 'Pedidos',
      icon: <i className="fas fa-box" />,
      faqs: [
        {
          question: '¿Puedo cambiar o cancelar mi pedido?',
          answer:
            'Puedes cambiar o cancelar tu pedido si aún no ha sido procesado. Contacta con nuestro equipo lo antes posible. Una vez enviado, se aplican las políticas de devolución.',
        },
        {
          question: '¿Cuál es la política de devoluciones?',
          answer:
            'Tienes 14 días desde la recepción para devolver tu pedido. El producto debe estar en perfecto estado y sin abrir. Los gastos de devolución corren a tu cargo a menos que sea por culpa nuestra.',
        },
        {
          question: '¿Aceptáis cambios de producto?',
          answer:
            'Sí, puedes cambiar un producto dentro de 14 días si está sin abrir. Pagará una pequeña tarifa de gestión a menos que sea por error nuestro.',
        },
        {
          question: '¿Cuándo se procesa el reembolso?',
          answer:
            'Los reembolsos se procesarán una vez que verifiquemos el producto devuelto. Generalmente esto tarda entre 5-7 días laborales. El dinero llegará a tu cuenta entre 1-5 días después.',
        },
        {
          question: '¿Puedo devolver botellas abiertas?',
          answer:
            'No, las botellas abiertas no pueden ser devueltas por razones de seguridad y salud. Si el producto llegó defectuoso, podemos hacer una excepción. Contáctanos.',
        },
      ],
    },
    {
      title: 'Mi cuenta',
      icon: <i className="fas fa-user" />,
      faqs: [
        {
          question: '¿Cómo creo una cuenta?',
          answer:
            'Haz clic en "Registro" en la página principal. Introduce tu email y crea una contraseña. También puedes registrarte con tu cuenta de Google o Facebook.',
        },
        {
          question: '¿He olvidado mi contraseña, ¿qué hago?',
          answer:
            'En la página de login, haz clic en "¿Olvidaste tu contraseña?". Te enviaremos un enlace para restablecerla. Si no recibes el email, revisa tu carpeta de spam.',
        },
        {
          question: '¿Cómo actualizo mi información personal?',
          answer:
            'Ve a tu cuenta, selecciona "Mi cuenta" en el menú lateral y edita tu información. Puedes cambiar tu email, teléfono, dirección y más.',
        },
        {
          question: '¿Cómo elimino mi cuenta?',
          answer:
            'Puedes solicitar la eliminación de tu cuenta contactando a nuestro equipo de soporte. Se conservarán tus datos durante un periodo legal según la RGPD.',
        },
      ],
    },
    {
      title: 'Productos',
      icon: <i className="fas fa-wine-bottle" />,
      faqs: [
        {
          question: '¿De dónde viene tu selección de vinos?',
          answer:
            'Trabajamos con bodegas de toda España y el mundo. Seleccionamos vinos de pequeños productores hasta grandes marcas reconocidas. Todos son auténticos y certificados.',
        },
        {
          question: '¿Garantizáis la autenticidad de los vinos?',
          answer:
            'Sí, 100%. Todos nuestros vinos son auténticos. Trabajamos directamente con bodegas y distribuidores oficiales. Si tienes dudas sobre un producto, contáctanos.',
        },
        {
          question: '¿Puedo devolver una botella defectuosa?',
          answer:
            'Sí, si el vino está defectuoso o en mal estado, podemos procesarte un cambio o reembolso. Contáctanos con detalles del problema.',
        },
        {
          question: '¿Qué significa "vino natural"?',
          answer:
            'Los vinos naturales se producen con intervención mínima. No se añaden sulfitos u otros químicos. Son vinos más "puros" pero requieren mejor almacenamiento.',
        },
      ],
    },
  ];

  const filteredSections = sections.map((section) => ({
    ...section,
    faqs: section.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const hasResults = filteredSections.some((s) => s.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Centro de ayuda</h1>
          <p className="text-gray-600 mb-6">
            Encuentra respuestas a tus preguntas sobre envíos, pedidos, tu
            cuenta y nuestros productos.
          </p>

          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Busca en nuestro centro de ayuda..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {hasResults ? (
          <div className="space-y-8">
            {filteredSections.map((section, sectionIndex) => (
              section.faqs.length > 0 && (
                <section key={sectionIndex}>
                  <h2 className="text-2xl font-bold mb-6">{section.title}</h2>

                  <div className="space-y-3">
                    {section.faqs.map((faq, faqIndex) => {
                      const faqId = `${sectionIndex}-${faqIndex}`;
                      const isOpen = openFAQ === faqId;

                      return (
                        <div
                          key={faqIndex}
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                          <button
                            onClick={() =>
                              setOpenFAQ(isOpen ? null : faqId)
                            }
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 text-left">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                                isOpen ? 'transform rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No encontramos resultados
            </h2>
            <p className="text-gray-600 mb-6">
              Intenta con otras palabras clave o contacta con nuestro equipo.
            </p>
            <Button
              onClick={() => setSearchQuery('')}
              variant="outline"
            >
              Limpiar búsqueda
            </Button>
          </div>
        )}

        <section className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-600 mb-6">
            Contacta con nuestro equipo de atención al cliente. Estamos
            disponibles para ayudarte.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:info@casadelvino.com"
              className="border border-gray-200 rounded-lg p-6 hover:border-yellow-500 transition-colors text-center"
            >
              <Mail className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">info@casadelvino.com</p>
              <p className="text-xs text-gray-500 mt-2">
                Respuesta en 24 horas
              </p>
            </a>

            <a
              href="tel:+34912345678"
              className="border border-gray-200 rounded-lg p-6 hover:border-yellow-500 transition-colors text-center"
            >
              <Phone className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
              <p className="text-gray-600 text-sm">+34 912 345 678</p>
              <p className="text-xs text-gray-500 mt-2">
                Lunes a viernes, 9-18h
              </p>
            </a>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-yellow-500 transition-colors text-center">
              <MessageCircle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Chat</h3>
              <p className="text-gray-600 text-sm">Chat en vivo disponible</p>
              <p className="text-xs text-gray-500 mt-2">
                Lunes a viernes, 10-18h
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
