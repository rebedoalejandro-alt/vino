'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Lock, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setSubscriptionMessage('Por favor, ingresa un email válido');
      return;
    }
    // Here you would typically send the email to your backend
    setSubscriptionMessage('Gracias por suscribirte a nuestra newsletter!');
    setEmail('');
    setTimeout(() => setSubscriptionMessage(''), 3000);
  };

  return (
    <footer className="bg-white">
      {/* Newsletter Subscription Section */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                Únete a nuestra newsletter
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Recibe ofertas exclusivas y novedades cada semana
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
                required
              />
              <button
                type="submit"
                className="px-6 md:px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-500 transition-colors whitespace-nowrap text-sm md:text-base"
              >
                Suscribirme
              </button>
            </form>

            {subscriptionMessage && (
              <p className="text-center text-sm mt-3 text-green-600">
                {subscriptionMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Información Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Información</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/quienes-somos"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Quiénes somos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gastos-envio"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Gastos de envío
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ayuda"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Ayuda / FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/donde-esta-mi-pedido"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Dónde está mi pedido
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacidad"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terminos"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aviso-legal"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Aviso legal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tu Cuenta Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Tu cuenta</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registro"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Crear cuenta
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mis-pedidos"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Mis pedidos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lista-deseos"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Mi lista de deseos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mis-direcciones"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Mis direcciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/referidos"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    Programa de referidos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Contacto</h3>
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex gap-3">
                  <Phone size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      900 123 456
                    </p>
                    <p className="text-gray-400 text-xs">
                      L-V 9:00 - 18:00h
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-3">
                  <WhatsAppIcon size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      600 123 456
                    </p>
                    <p className="text-gray-400 text-xs">
                      WhatsApp
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <Mail size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                    info@casadelvino.es
                  </p>
                </div>

                {/* Stores */}
                <div className="flex gap-3">
                  <MapPin size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Barcelona y Madrid
                    </p>
                    <p className="text-gray-400 text-xs">
                      Nuestras tiendas físicas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Síguenos Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Síguenos</h3>

              {/* Social Media Icons */}
              <div className="flex gap-4 mb-8">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FacebookIcon size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  aria-label="X (Twitter)"
                  title="X (Twitter)"
                >
                  <TwitterIcon size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <YoutubeIcon size={20} />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2">
                <p className="text-xs text-gray-400 font-semibold">Sellos de confianza:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    Robert Parker Trusted Retailer
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    Wine-Searcher 5 estrellas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    Trusted Shops
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            {/* Payment Methods and Security */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-300 mb-4">
                Formas de pago y seguridad
              </h4>
              <div className="flex flex-wrap gap-3 items-center mb-4">
                {/* Payment Methods */}
                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded">
                  Visa
                </span>
                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded">
                  Mastercard
                </span>
                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded">
                  PayPal
                </span>
                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded">
                  Transferencia bancaria
                </span>
                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded flex items-center gap-1">
                  <Lock size={12} />
                  SSL Seguro
                </span>
                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded flex items-center gap-1">
                  <Shield size={12} />
                  PSD2 Cumplimiento
                </span>
              </div>
            </div>

            {/* SEO Links Section */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Lo más buscado */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">
                    Lo más buscado
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Rioja',
                      'Ribera del Duero',
                      'Priorat',
                      'Rías Baixas',
                      'Bierzo',
                      'Penedès',
                    ].map((wine) => (
                      <Link
                        key={wine}
                        href={`/vinos?region=${wine.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-xs text-gray-400 hover:text-yellow-400 transition-colors underline"
                      >
                        {wine}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Zonas de elaboración */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">
                    Zonas de elaboración
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Tinto',
                      'Blanco',
                      'Rosado',
                      'Generoso',
                      'Dulce',
                    ].map((type) => (
                      <Link
                        key={type}
                        href={`/vinos?tipo=${type.toLowerCase()}`}
                        className="text-xs text-gray-400 hover:text-yellow-400 transition-colors underline"
                      >
                        {type}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-center md:text-left">
            <p>
              &copy; 2024 Casa del Vino. Todos los derechos reservados.
            </p>
            <p className="md:text-right">
              La venta de bebidas alcohólicas a menores de 18 años está prohibida.
              Bebe con moderación.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper icon components for social media
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

function WhatsAppIcon({ size = 24, ...props }: IconProps) {
  const sizeVal = typeof size === 'number' ? size : 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeVal}
      height={sizeVal}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.672 19.15a9 9 0 1 1 1.415-14.98.5.5 0 0 1 .062.745l-1.735 2.126a.5.5 0 0 1-.645.091 6 6 0 1 0 2.4 2.4.5.5 0 0 1 .091-.645l2.126-1.735a.5.5 0 0 1 .745.062 9 9 0 0 1-3.459 11.016z" />
    </svg>
  );
}

function InstagramIcon({ size = 24, ...props }: IconProps) {
  const sizeVal = typeof size === 'number' ? size : 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeVal}
      height={sizeVal}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  );
}

function FacebookIcon({ size = 24, ...props }: IconProps) {
  const sizeVal = typeof size === 'number' ? size : 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeVal}
      height={sizeVal}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a6 6 0 0 0-6 6v9a9 9 0 0 0 9 9h3V14h-2v-3h2V8a6 6 0 0 0-6-6v0z" />
      <path d="M9 23v-7h2v-3H9V8a2 2 0 0 1 2-2h1V3a8 8 0 0 0-3-0.268" />
    </svg>
  );
}

function TwitterIcon({ size = 24, ...props }: IconProps) {
  const sizeVal = typeof size === 'number' ? size : 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeVal}
      height={sizeVal}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 24, ...props }: IconProps) {
  const sizeVal = typeof size === 'number' ? size : 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeVal}
      height={sizeVal}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0 2 2 0 0 1 1.4 1.4 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0 2 2 0 0 1-1.4-1.4z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}
