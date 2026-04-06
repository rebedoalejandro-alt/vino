'use client';

import Link from 'next/link';
import { Gift, Zap, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import MobileMenu from './MobileMenu';

interface MegaMenuItem {
  label: string;
  href: string;
}

interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isYellow?: boolean;
  megaMenu?: MegaMenuColumn[];
}

const megaMenus: Record<string, MegaMenuColumn[]> = {
  VINOS: [
    {
      title: 'Por Tipo',
      items: [
        { label: 'Tinto', href: '/vinos?tipo=tinto' },
        { label: 'Blanco', href: '/vinos?tipo=blanco' },
        { label: 'Rosado', href: '/vinos?tipo=rosado' },
        { label: 'Generoso', href: '/vinos?tipo=generoso' },
        { label: 'Dulce', href: '/vinos?tipo=dulce' },
      ],
    },
    {
      title: 'Por Región',
      items: [
        { label: 'Rioja', href: '/region/rioja' },
        { label: 'Ribera del Duero', href: '/region/ribera-del-duero' },
        { label: 'Priorat', href: '/region/priorat' },
        { label: 'Rías Baixas', href: '/region/rias-baixas' },
        { label: 'Bierzo', href: '/region/bierzo' },
        { label: 'Penedès', href: '/region/penedes' },
      ],
    },
    {
      title: 'Por País',
      items: [
        { label: 'España', href: '/vinos?pais=españa' },
        { label: 'Francia', href: '/vinos?pais=francia' },
        { label: 'Italia', href: '/vinos?pais=italia' },
        { label: 'Portugal', href: '/vinos?pais=portugal' },
      ],
    },
    {
      title: 'Por Uva',
      items: [
        { label: 'Tempranillo', href: '/vinos?uva=tempranillo' },
        { label: 'Garnacha', href: '/vinos?uva=garnacha' },
        { label: 'Mencía', href: '/vinos?uva=mencia' },
        { label: 'Cabernet Sauvignon', href: '/vinos?uva=cabernet-sauvignon' },
        { label: 'Albariño', href: '/vinos?uva=albarino' },
      ],
    },
    {
      title: 'Temas',
      items: [
        { label: 'Ecológicos', href: '/vinos-ecologicos' },
        { label: 'Naturales', href: '/vinos?tema=naturales' },
        { label: 'Parker 90+', href: '/vinos?tema=parker-90' },
        { label: 'Novedades', href: '/vinos?tema=novedades' },
      ],
    },
  ],
  ESPUMOSOS: [
    {
      title: 'Espumosos',
      items: [
        { label: 'Cava', href: '/vinos?tipo=cava' },
        { label: 'Champagne', href: '/vinos?tipo=champagne' },
        { label: 'Prosecco', href: '/vinos?tipo=prosecco' },
        { label: 'Corpinnat', href: '/vinos?tipo=corpinnat' },
        { label: 'Marcas Populares', href: '/vinos?tipo=espumosos-populares' },
      ],
    },
  ],
  BODEGAS: [
    {
      title: 'Por País',
      items: [
        { label: 'España', href: '/bodega?pais=españa' },
        { label: 'Francia', href: '/bodega?pais=francia' },
        { label: 'Italia', href: '/bodega?pais=italia' },
        { label: 'Nuevo Mundo', href: '/bodega?pais=nuevo-mundo' },
      ],
    },
  ],
  DESTILADOS: [
    {
      title: 'Categorías',
      items: [
        { label: 'Whisky', href: '/destilados?tipo=whisky' },
        { label: 'Gin', href: '/destilados?tipo=gin' },
        { label: 'Ron', href: '/destilados?tipo=ron' },
        { label: 'Brandy', href: '/destilados?tipo=brandy' },
        { label: 'Cognac', href: '/destilados?tipo=cognac' },
        { label: 'Vodka', href: '/destilados?tipo=vodka' },
        { label: 'Tequila', href: '/destilados?tipo=tequila' },
        { label: 'Mezcal', href: '/destilados?tipo=mezcal' },
      ],
    },
  ],
};

const navItems: NavItem[] = [
  { label: 'VINOS', href: '/vinos' },
  { label: 'ESPUMOSOS', href: '/espumosos' },
  { label: 'BODEGAS', href: '/bodegas' },
  { label: 'DESTILADOS', href: '/destilados' },
  { label: 'OFERTAS', href: '/ofertas', icon: <Zap size={16} />, isYellow: true },
  {
    label: 'SELECCIONES',
    href: '/selecciones',
    icon: <Gift size={16} />,
  },
];

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (label: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-4 text-sm font-semibold flex items-center gap-2 transition-colors ${
                    item.isYellow
                      ? 'text-yellow-400 hover:text-yellow-300'
                      : 'hover:text-gray-300'
                  }`}
                >
                  {item.label}
                  {item.icon && item.icon}
                </Link>

                {/* Mega Menu */}
                {megaMenus[item.label] && openMenu === item.label && (
                  <div
                    className="absolute left-0 top-full bg-white text-gray-900 shadow-xl rounded-b-lg opacity-0 transition-opacity duration-150 animate-in"
                    style={{
                      animation: 'fadeIn 150ms ease-out forwards',
                    }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 min-w-fit">
                      {megaMenus[item.label].map((column) => (
                        <div key={column.title}>
                          <h3 className="text-xs font-bold uppercase text-gray-900 mb-4 text-yellow-600">
                            {column.title}
                          </h3>
                          <ul className="space-y-2">
                            {column.items.map((menuItem) => (
                              <li key={menuItem.href}>
                                <Link
                                  href={menuItem.href}
                                  className="text-sm text-gray-700 hover:text-gray-900 hover:font-semibold transition-all"
                                >
                                  {menuItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden bg-gray-900 text-white px-4 py-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          onClose={() => setIsMobileMenuOpen(false)}
          items={navItems}
          megaMenus={megaMenus}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeIn 150ms ease-out forwards;
        }
      `}</style>
    </>
  );
}
