import React from 'react';
import {
  HeroSlider,
  CategoryIcons,
  TopSales,
  BestSellers,
  BlogPreview,
  InfoBanners,
  NewArrivals,
  OffersSection,
  Recommendations,
  ReferralBanner,
  SeoLinks,
} from '@/components/home';
import { TrustBadges } from '@/components/common/TrustBadges';
import { Product } from '@/types';

const createdAt = new Date('2024-01-01');
const updatedAt = new Date('2024-01-01');

// Lookup tables
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BODEGAS: Record<string, any> = {
'b1': { id: 'b1', name: 'Marqués de Murrieta', description: 'Bodega Marqués de Murrieta fundada en 1852', country: 'España', region: 'Rioja', founded: 1852, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b10': { id: 'b10', name: 'Roda', description: 'Bodega Roda fundada en 1987', country: 'España', region: 'Rioja', founded: 1987, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b11': { id: 'b11', name: 'Remírez de Ganuza', description: 'Bodega Remírez de Ganuza fundada en 1989', country: 'España', region: 'Rioja', founded: 1989, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b12': { id: 'b12', name: 'Ysios', description: 'Bodega Ysios fundada en 2001', country: 'España', region: 'Rioja Alavesa', founded: 2001, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b13': { id: 'b13', name: 'Sierra Cantabria', description: 'Bodega Sierra Cantabria fundada en 1970', country: 'España', region: 'Rioja', founded: 1970, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b14': { id: 'b14', name: 'Conde de Valdemar', description: 'Bodega Conde de Valdemar fundada en 1889', country: 'España', region: 'Rioja', founded: 1889, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b15': { id: 'b15', name: 'Ramón Bilbao', description: 'Bodega Ramón Bilbao fundada en 1924', country: 'España', region: 'Rioja', founded: 1924, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b16': { id: 'b16', name: 'Marqués de Cáceres', description: 'Bodega Marqués de Cáceres fundada en 1970', country: 'España', region: 'Rioja', founded: 1970, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b17': { id: 'b17', name: 'Baigorri', description: 'Bodega Baigorri fundada en 1999', country: 'España', region: 'Rioja', founded: 1999, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b18': { id: 'b18', name: 'Abadia Retuerta', description: 'Bodega Abadia Retuerta fundada en 1982', country: 'España', region: 'Ribera del Duero', founded: 1982, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b19': { id: 'b19', name: 'Vega Sicilia', description: 'Bodega Vega Sicilia fundada en 1864', country: 'España', region: 'Ribera del Duero', founded: 1864, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b2': { id: 'b2', name: 'La Rioja Alta', description: 'Bodega La Rioja Alta fundada en 1890', country: 'España', region: 'Rioja', founded: 1890, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b20': { id: 'b20', name: 'Aalto', description: 'Bodega Aalto fundada en 1999', country: 'España', region: 'Ribera del Duero', founded: 1999, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b21': { id: 'b21', name: 'Dominio de Pingus', description: 'Bodega Dominio de Pingus fundada en 1995', country: 'España', region: 'Ribera del Duero', founded: 1995, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b22': { id: 'b22', name: 'Numanthia', description: 'Bodega Numanthia fundada en 2001', country: 'España', region: 'Toro', founded: 2001, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b23': { id: 'b23', name: 'Bodegas Martín Códax', description: 'Bodega Bodegas Martín Códax fundada en 1986', country: 'España', region: 'Rías Baixas', founded: 1986, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b24': { id: 'b24', name: 'Adega Eidos', description: 'Bodega Adega Eidos fundada en 2000', country: 'España', region: 'Rías Baixas', founded: 2000, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b25': { id: 'b25', name: 'Perelada', description: 'Bodega Perelada fundada en 1923', country: 'España', region: 'Empordà', founded: 1923, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b26': { id: 'b26', name: 'Torres', description: 'Bodega Torres fundada en 1870', country: 'España', region: 'Penedès', founded: 1870, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b27': { id: 'b27', name: 'Marques de Monistrol', description: 'Bodega Marques de Monistrol fundada en 1882', country: 'España', region: 'Penedès', founded: 1882, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b28': { id: 'b28', name: 'Bodegas Temperanillo', description: 'Bodega Bodegas Temperanillo fundada en 1994', country: 'España', region: 'Campo de Borja', founded: 1994, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b29': { id: 'b29', name: 'Orben', description: 'Bodega Orben fundada en 2003', country: 'España', region: 'Campo de Borja', founded: 2003, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b3': { id: 'b3', name: 'Muga', description: 'Bodega Muga fundada en 1932', country: 'España', region: 'Rioja', founded: 1932, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b30': { id: 'b30', name: 'Viñas del Vero', description: 'Bodega Viñas del Vero fundada en 1986', country: 'España', region: 'Somontano', founded: 1986, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b4': { id: 'b4', name: 'CVNE', description: 'Bodega CVNE fundada en 1879', country: 'España', region: 'Rioja', founded: 1879, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b5': { id: 'b5', name: 'López de Heredia', description: 'Bodega López de Heredia fundada en 1877', country: 'España', region: 'Rioja', founded: 1877, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b6': { id: 'b6', name: 'Marqués de Villamagna', description: 'Bodega Marqués de Villamagna fundada en 1986', country: 'España', region: 'Rioja', founded: 1986, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b7': { id: 'b7', name: 'Belondrade y Lurton', description: 'Bodega Belondrade y Lurton fundada en 2000', country: 'España', region: 'Rueda', founded: 2000, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b8': { id: 'b8', name: 'Cillar de Silos', description: 'Bodega Cillar de Silos fundada en 1989', country: 'España', region: 'Ribera del Duero', founded: 1989, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
'b9': { id: 'b9', name: 'Pago de Los Capellanes', description: 'Bodega Pago de Los Capellanes fundada en 1997', country: 'España', region: 'Ribera del Duero', founded: 1997, image: '/images/bodegas/default.jpg', createdAt, updatedAt },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGIONS: Record<string, any> = {
'r1': { id: 'r1', name: 'Rioja', country: 'España', description: 'La denominación de origen más prestigiosa de España', createdAt, updatedAt },
'r10': { id: 'r10', name: 'Somontano', country: 'España', description: 'Diversidad varietal a los pies del Pirineo', createdAt, updatedAt },
'r2': { id: 'r2', name: 'Ribera del Duero', country: 'España', description: 'Tierra de Tempranillo y vinos potentes', createdAt, updatedAt },
'r3': { id: 'r3', name: 'Toro', country: 'España', description: 'Vinos de carácter robusto y accesible', createdAt, updatedAt },
'r4': { id: 'r4', name: 'Rías Baixas', country: 'España', description: 'Destino del Albariño, el vino blanco gallego por excelencia', createdAt, updatedAt },
'r5': { id: 'r5', name: 'Rueda', country: 'España', description: 'Denominación de origen de vinos blancos frescos', createdAt, updatedAt },
'r6': { id: 'r6', name: 'Empordà', country: 'España', description: 'Región vinícola del norte de Cataluña', createdAt, updatedAt },
'r7': { id: 'r7', name: 'Penedès', country: 'España', description: 'Vinos tintos, blancos y espumosos', createdAt, updatedAt },
'r8': { id: 'r8', name: 'Campo de Borja', country: 'España', description: 'Región joven con potencial enológico', createdAt, updatedAt },
'r9': { id: 'r9', name: 'Rioja Alavesa', country: 'España', description: 'Región montañosa de Rioja con vinos elegantes', createdAt, updatedAt },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CATEGORIES: Record<string, any> = {
'cat-tinto': { id: 'cat-tinto', name: 'Vino Tinto', slug: 'vino-tinto', description: 'Vinos tintos', createdAt, updatedAt },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GRAPES: Record<string, any> = {
'g1': { id: 'g1', name: 'Tempranillo', description: 'La uva tinta más noble de España', color: 'tinto' as const, createdAt, updatedAt },
'g11': { id: 'g11', name: 'Syrah', description: 'Variedad internacional de aromas especiados', color: 'tinto' as const, createdAt, updatedAt },
'g12': { id: 'g12', name: 'Moristel', description: 'Uva autóctona de Somontano', color: 'tinto' as const, createdAt, updatedAt },
'g2': { id: 'g2', name: 'Garnacha', description: 'Uva versátil de aromas frutales', color: 'tinto' as const, createdAt, updatedAt },
'g3': { id: 'g3', name: 'Graciano', description: 'Variedad minoritaria que aporta color y acidez', color: 'tinto' as const, createdAt, updatedAt },
'g4': { id: 'g4', name: 'Mazuelo', description: 'También conocida como Cariñena', color: 'tinto' as const, createdAt, updatedAt },
'g5': { id: 'g5', name: 'Cabernet Sauvignon', description: 'La variedad internacional más plantada', color: 'tinto' as const, createdAt, updatedAt },
'g6': { id: 'g6', name: 'Merlot', description: 'Uva suave y afrutada de origen bordelés', color: 'tinto' as const, createdAt, updatedAt },
'g7': { id: 'g7', name: 'Mencía', description: 'Uva autóctona del noroeste peninsular', color: 'tinto' as const, createdAt, updatedAt },
'g8': { id: 'g8', name: 'Monastrell', description: 'Uva mediterránea de gran potencia', color: 'tinto' as const, createdAt, updatedAt },
'g9': { id: 'g9', name: 'Tinta de Toro', description: 'Clon robusto del tempranillo en Toro', color: 'tinto' as const, createdAt, updatedAt },
};

// Compact wine data
const WINES_DATA = [
{ id: 'wine-1', slug: 'marques-de-murrieta-reserva-2019', name: 'Marqués de Murrieta Reserva 2019', description: 'Elegante reserva con notas de cereza madura, vainilla y especias. Paso sedoso con taninos pulidos y final largo. Un clásico de Rioja que refleja la excelencia de su terroir.', price: 18.95, image: '/images/wines/default-red.jpg', sku: 'VT-001', stock: 5, featured: false, bodegaId: 'b1', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Parker', score: 93, source: 'Wine Advocate' }] },
{ id: 'wine-2', slug: 'castillo-ygay-gran-reserva-especial-2012', name: 'Castillo Ygay Gran Reserva Especial 2012', description: 'Obra maestra de Marqués de Murrieta. Complejo bouquet de frutas negras, trufa, tabaco y cuero. Taninos aterciopelados con una acidez vibrante que le confiere una longevidad excepcional.', price: 89.9, image: '/images/wines/default-red.jpg', sku: 'VT-002', stock: 8, featured: true, bodegaId: 'b1', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g4'], wineType: 'tinto' as const, vintage: 2012, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Parker', score: 97, source: 'Wine Advocate' }] },
{ id: 'wine-3', slug: 'vina-ardanza-reserva-2017', name: 'Viña Ardanza Reserva 2017', description: 'Mezcla clásica de tempranillo y garnacha. Aromas de frutos rojos maduros, regaliz y tostados finos. Paladar amplio, equilibrado con un final especiado y persistente.', price: 22.5, image: '/images/wines/default-red.jpg', sku: 'VT-003', stock: 13, featured: false, bodegaId: 'b2', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 13.5, acidity: 3.5, ratings: [{ critic: 'Suckling', score: 94, source: 'JamesSuckling.com' }] },
{ id: 'wine-4', slug: 'gran-reserva-904-2015', name: 'Gran Reserva 904 2015', description: 'Joya de La Rioja Alta. Perfil aromático de cereza confitada, especias orientales y sotobosque. Paladar sedoso, complejo y de gran longitud. Un vino de meditación.', price: 42, image: '/images/wines/default-red.jpg', sku: 'VT-004', stock: 29, featured: true, bodegaId: 'b2', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3'], wineType: 'tinto' as const, vintage: 2015, volume: 750, alcohol: 13.5, acidity: 3.4, ratings: [{ critic: 'Parker', score: 96, source: 'Wine Advocate' }] },
{ id: 'wine-5', slug: 'muga-reserva-2020', name: 'Muga Reserva 2020', description: 'Reserva clásica fermentada en roble. Cereza oscura, chocolate y notas balsámicas. Taninos maduros y redondos con un final elegante y fresco.', price: 16.5, image: '/images/wines/default-red.jpg', sku: 'VT-005', stock: 33, featured: false, bodegaId: 'b3', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4'], wineType: 'tinto' as const, vintage: 2020, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Peñín', score: 92, source: 'Guía Peñín' }] },
{ id: 'wine-6', slug: 'prado-enea-gran-reserva-2016', name: 'Prado Enea Gran Reserva 2016', description: 'El gran vino de Muga. Frutos negros confitados, trufa, cacao y especias nobles. Estructura imponente pero elegante con taninos de seda y acidez vibrante.', price: 58, image: '/images/wines/default-red.jpg', sku: 'VT-006', stock: 40, featured: true, bodegaId: 'b3', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4', 'g5'], wineType: 'tinto' as const, vintage: 2016, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Suckling', score: 96, source: 'JamesSuckling.com' }] },
{ id: 'wine-7', slug: 'cvne-imperial-gran-reserva-2017', name: 'CVNE Imperial Gran Reserva 2017', description: 'Gran reserva emblemática. Notas de cereza negra, vainilla fina, cuero y tabaco dulce. Taninos sedosos con excelente equilibrio entre fruta y madera.', price: 35.5, image: '/images/wines/default-red.jpg', sku: 'VT-007', stock: 42, featured: false, bodegaId: 'b4', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Tim Atkin', score: 95, source: 'Tim Atkin MW' }] },
{ id: 'wine-8', slug: 'vina-real-crianza-2021', name: 'Viña Real Crianza 2021', description: 'Crianza accesible y frutal. Cereza y frambuesa con ligeros tostados. Boca fresca, fácil de beber, ideal para el día a día.', price: 8.95, image: '/images/wines/default-red.jpg', sku: 'VT-008', stock: 5, featured: false, bodegaId: 'b4', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.6, ratings: [{ critic: 'Peñín', score: 88, source: 'Guía Peñín' }] },
{ id: 'wine-9', slug: 'vina-tondonia-reserva-2012', name: 'Viña Tondonia Reserva 2012', description: 'El vino más icónico de López de Heredia. Perfil oxidativo controlado con notas de fresa seca, nuez, cuero fino y especias. Paladar terso con acidez magistral.', price: 32, image: '/images/wines/default-red.jpg', sku: 'VT-009', stock: 26, featured: true, bodegaId: 'b5', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4'], wineType: 'tinto' as const, vintage: 2012, volume: 750, alcohol: 14, acidity: 3.6, ratings: [{ critic: 'Parker', score: 94, source: 'Wine Advocate' }] },
{ id: 'wine-10', slug: 'vina-gravonia-blanco-reserva-2020', name: 'Viña Gravonia Blanco Reserva 2020', description: 'Blanco oxidativo con carácter. Aromas de frutos secos, manzana verde y minerales. Paladar potente y equilibrado con una acidez perfecta.', price: 28, image: '/images/wines/default-red.jpg', sku: 'VT-010', stock: 18, featured: false, bodegaId: 'b5', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2020, volume: 750, alcohol: 13, acidity: 3.7, ratings: [{ critic: 'Suckling', score: 91, source: 'JamesSuckling.com' }] },
{ id: 'wine-11', slug: 'marques-villamagna-reserva-2018', name: 'Marqués de Villamagna Reserva 2018', description: 'Reserva elegante y refinado. Aromas de cereza, especias y vainilla. Taninos maduros con final delicado y persistente.', price: 24, image: '/images/wines/default-red.jpg', sku: 'VT-011', stock: 21, featured: false, bodegaId: 'b6', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g2'], wineType: 'tinto' as const, vintage: 2018, volume: 750, alcohol: 13.8, acidity: 3.5, ratings: [{ critic: 'Parker', score: 91, source: 'Wine Advocate' }] },
{ id: 'wine-12', slug: 'belondrade-lurton-verdejo-2022', name: 'Belondrade y Lurton Verdejo 2022', description: 'Verdejo puro y mineral. Aromas herbáceos frescos con toques de cítricos. Boca viva, fresca y elegante.', price: 18, image: '/images/wines/default-red.jpg', sku: 'VT-012', stock: 15, featured: false, bodegaId: 'b7', regionId: 'r5', categoryId: 'cat-tinto', grapeIds: ['g2'], wineType: 'tinto' as const, vintage: 2022, volume: 750, alcohol: 12.5, acidity: 3.8, ratings: [{ critic: 'Peñín', score: 90, source: 'Guía Peñín' }] },
{ id: 'wine-13', slug: 'cillar-de-silos-crianza-2019', name: 'Cillar de Silos Crianza 2019', description: 'Ribera del Duero fresco y frutal. Cereza y frambuesa con toques de madera integrada. Boca suave y accesible.', price: 14.5, image: '/images/wines/default-red.jpg', sku: 'VT-013', stock: 28, featured: false, bodegaId: 'b8', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 14, acidity: 3.6, ratings: [{ critic: 'Suckling', score: 89, source: 'JamesSuckling.com' }] },
{ id: 'wine-14', slug: 'pago-de-los-capellanes-roble-2020', name: 'Pago de Los Capellanes Roble 2020', description: 'Roble complejo de Ribera del Duero. Frutos negros, especias y vainilla. Taninos potentes y bien integrados.', price: 19.5, image: '/images/wines/default-red.jpg', sku: 'VT-014', stock: 16, featured: false, bodegaId: 'b9', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2020, volume: 750, alcohol: 14.2, acidity: 3.5, ratings: [{ critic: 'Parker', score: 90, source: 'Wine Advocate' }] },
{ id: 'wine-15', slug: 'roda-crianza-2019', name: 'Roda Crianza 2019', description: 'Crianza puro de Rioja. Fragancias frutales con toques especiados. Boca redonda, balanceada y fácil de beber.', price: 15.5, image: '/images/wines/default-red.jpg', sku: 'VT-015', stock: 12, featured: false, bodegaId: 'b10', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 13.8, acidity: 3.5, ratings: [{ critic: 'Peñín', score: 91, source: 'Guía Peñín' }] },
{ id: 'wine-16', slug: 'remírez-de-ganuza-reserva-2017', name: 'Remírez de Ganuza Reserva 2017', description: 'Reserva elegante y potente. Aromas complejos de frutos negros y especias. Paladar amplio con taninos sedosos.', price: 36, image: '/images/wines/default-red.jpg', sku: 'VT-016', stock: 19, featured: true, bodegaId: 'b11', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Suckling', score: 95, source: 'JamesSuckling.com' }] },
{ id: 'wine-17', slug: 'ysios-crianza-2019', name: 'Ysios Crianza 2019', description: 'Crianza moderno de Rioja Alavesa. Frutos rojos maduros con tostados sutiles. Boca equilibrada y vibrante.', price: 17, image: '/images/wines/default-red.jpg', sku: 'VT-017', stock: 22, featured: false, bodegaId: 'b12', regionId: 'r9', categoryId: 'cat-tinto', grapeIds: ['g1', 'g4'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Parker', score: 90, source: 'Wine Advocate' }] },
{ id: 'wine-18', slug: 'sierra-cantabria-crianza-2018', name: 'Sierra Cantabria Crianza 2018', description: 'Crianza elegante de Rioja. Cereza madura, cuero y tabaco. Taninos pulidos con final largo y persistente.', price: 16, image: '/images/wines/default-red.jpg', sku: 'VT-018', stock: 25, featured: false, bodegaId: 'b13', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2018, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Peñín', score: 92, source: 'Guía Peñín' }] },
{ id: 'wine-19', slug: 'conde-de-valdemar-reserva-2016', name: 'Conde de Valdemar Reserva 2016', description: 'Reserva de larga tradición. Aromas maduros con notas de cuero y especias. Estructura potente y elegante.', price: 27, image: '/images/wines/default-red.jpg', sku: 'VT-019', stock: 14, featured: true, bodegaId: 'b14', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g4'], wineType: 'tinto' as const, vintage: 2016, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Suckling', score: 93, source: 'JamesSuckling.com' }] },
{ id: 'wine-20', slug: 'ramon-bilbao-crianza-2019', name: 'Ramón Bilbao Crianza 2019', description: 'Crianza frutal y accesible. Aromas de cereza y frambuesa. Boca fresca con taninos suaves.', price: 11.5, image: '/images/wines/default-red.jpg', sku: 'VT-020', stock: 35, featured: false, bodegaId: 'b15', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 13.8, acidity: 3.5, ratings: [{ critic: 'Parker', score: 88, source: 'Wine Advocate' }] },
{ id: 'wine-21', slug: 'marques-de-caceres-reserva-2017', name: 'Marqués de Cáceres Reserva 2017', description: 'Reserva estructurado y elegante. Frutas negras con matices de cuero. Taninos presentes pero redondos.', price: 26, image: '/images/wines/default-red.jpg', sku: 'VT-021', stock: 20, featured: false, bodegaId: 'b16', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 13.8, acidity: 3.5, ratings: [{ critic: 'Peñín', score: 92, source: 'Guía Peñín' }] },
{ id: 'wine-22', slug: 'baigorri-crianza-2019', name: 'Baigorri Crianza 2019', description: 'Crianza puro y elegante. Aromas de cereza con toques de vainilla. Boca suave y bien estructurada.', price: 18.5, image: '/images/wines/default-red.jpg', sku: 'VT-022', stock: 17, featured: false, bodegaId: 'b17', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 13.8, acidity: 3.5, ratings: [{ critic: 'Suckling', score: 90, source: 'JamesSuckling.com' }] },
{ id: 'wine-23', slug: 'abadia-retuerta-pinta-crianza-2019', name: 'Abadia Retuerta Pinta Crianza 2019', description: 'Crianza accesible de Ribera del Duero. Frutos rojos maduros con toques especiados. Boca fácil y agradable.', price: 13, image: '/images/wines/default-red.jpg', sku: 'VT-023', stock: 30, featured: false, bodegaId: 'b18', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Parker', score: 89, source: 'Wine Advocate' }] },
{ id: 'wine-24', slug: 'vega-sicilia-valbuena-2018', name: 'Vega Sicilia Valbuena 2018', description: 'Valbuena legendario de Vega Sicilia. Complejo aromático con frutas negras y cuero. Boca potente y elegante.', price: 78, image: '/images/wines/default-red.jpg', sku: 'VT-024', stock: 6, featured: true, bodegaId: 'b19', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1', 'g5'], wineType: 'tinto' as const, vintage: 2018, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Peñín', score: 96, source: 'Guía Peñín' }] },
{ id: 'wine-25', slug: 'aalto-crianza-2019', name: 'Aalto Crianza 2019', description: 'Crianza moderno de Ribera del Duero. Frutos negros intensos con tostados elegantes. Boca suave y estructurada.', price: 20, image: '/images/wines/default-red.jpg', sku: 'VT-025', stock: 23, featured: false, bodegaId: 'b20', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Suckling', score: 91, source: 'JamesSuckling.com' }] },
{ id: 'wine-26', slug: 'dominio-de-pingus-2019', name: 'Dominio de Pingus 2019', description: 'Joya de Ribera del Duero. Intensidad y elegancia. Frutos negros, trufa y especias. Estructura magistral.', price: 92, image: '/images/wines/default-red.jpg', sku: 'VT-026', stock: 4, featured: true, bodegaId: 'b21', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Parker', score: 97, source: 'Wine Advocate' }] },
{ id: 'wine-27', slug: 'numanthia-termes-2019', name: 'Numanthia Termes 2019', description: 'Termes potente de Toro. Tinta de Toro pura con carácter. Frutos negros confitados, especias y taninos robustos.', price: 52, image: '/images/wines/default-red.jpg', sku: 'VT-027', stock: 9, featured: true, bodegaId: 'b22', regionId: 'r3', categoryId: 'cat-tinto', grapeIds: ['g9'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 15, acidity: 3.3, ratings: [{ critic: 'Peñín', score: 94, source: 'Guía Peñín' }] },
{ id: 'wine-28', slug: 'martin-codax-albarino-2022', name: 'Martín Códax Albariño 2022', description: 'Albariño puro de Rías Baixas. Minerales, cítricos y frutas blancas. Fresco, elegante y persistente.', price: 13.5, image: '/images/wines/default-red.jpg', sku: 'VT-028', stock: 27, featured: false, bodegaId: 'b23', regionId: 'r4', categoryId: 'cat-tinto', grapeIds: ['g2'], wineType: 'tinto' as const, vintage: 2022, volume: 750, alcohol: 12.5, acidity: 3.7, ratings: [{ critic: 'Suckling', score: 90, source: 'JamesSuckling.com' }] },
{ id: 'wine-29', slug: 'adega-eidos-albarino-2021', name: 'Adega Eidos Albariño 2021', description: 'Albariño de gran complejidad. Frutas tropicales, minerales y floral. Boca amplia y bien estructurada.', price: 14.5, image: '/images/wines/default-red.jpg', sku: 'VT-029', stock: 24, featured: false, bodegaId: 'b24', regionId: 'r4', categoryId: 'cat-tinto', grapeIds: ['g2'], wineType: 'tinto' as const, vintage: 2021, volume: 750, alcohol: 12.8, acidity: 3.6, ratings: [{ critic: 'Parker', score: 89, source: 'Wine Advocate' }] },
{ id: 'wine-30', slug: 'perelada-garnatxa-blanca-2021', name: 'Perelada Garnatxa Blanca 2021', description: 'Garnatxa Blanca de Empordà. Aromas florales y frutales. Boca elegante con buena acidez.', price: 12.5, image: '/images/wines/default-red.jpg', sku: 'VT-030', stock: 18, featured: false, bodegaId: 'b25', regionId: 'r6', categoryId: 'cat-tinto', grapeIds: ['g2'], wineType: 'tinto' as const, vintage: 2021, volume: 750, alcohol: 12.5, acidity: 3.8, ratings: [{ critic: 'Peñín', score: 88, source: 'Guía Peñín' }] },
{ id: 'wine-31', slug: 'torres-sangre-de-toro-2020', name: 'Torres Sangre de Toro 2020', description: 'Clásico de Torres. Garnacha y Cariñena. Frutos rojos maduros, especias y toques herbáceos. Boca accesible.', price: 9.5, image: '/images/wines/default-red.jpg', sku: 'VT-031', stock: 37, featured: false, bodegaId: 'b26', regionId: 'r7', categoryId: 'cat-tinto', grapeIds: ['g2', 'g4'], wineType: 'tinto' as const, vintage: 2020, volume: 750, alcohol: 13.5, acidity: 3.5, ratings: [{ critic: 'Suckling', score: 87, source: 'JamesSuckling.com' }] },
{ id: 'wine-32', slug: 'marques-de-monistrol-reserva-2017', name: 'Marqués de Monistrol Reserva 2017', description: 'Reserva elegante de Penedès. Aromas complejos de frutas negras y especias. Taninos redondos y persistencia.', price: 21.5, image: '/images/wines/default-red.jpg', sku: 'VT-032', stock: 16, featured: false, bodegaId: 'b27', regionId: 'r7', categoryId: 'cat-tinto', grapeIds: ['g1', 'g2', 'g5'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Parker', score: 90, source: 'Wine Advocate' }] },
{ id: 'wine-33', slug: 'bodegas-temperanillo-tinto-2020', name: 'Bodegas Temperanillo Tinto 2020', description: 'Tinto joven de Campo de Borja. Garnacha pura con carácter. Frutos rojos intensos y especias.', price: 10.5, image: '/images/wines/default-red.jpg', sku: 'VT-033', stock: 31, featured: false, bodegaId: 'b28', regionId: 'r8', categoryId: 'cat-tinto', grapeIds: ['g2'], wineType: 'tinto' as const, vintage: 2020, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Peñín', score: 89, source: 'Guía Peñín' }] },
{ id: 'wine-34', slug: 'orben-vinas-viejas-2019', name: 'Orbén Viñas Viejas 2019', description: 'Garnacha de viñas viejas de Campo de Borja. Intenso y potente. Frutos negros confitados y especias.', price: 15.5, image: '/images/wines/default-red.jpg', sku: 'VT-034', stock: 22, featured: false, bodegaId: 'b29', regionId: 'r8', categoryId: 'cat-tinto', grapeIds: ['g2'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 15, acidity: 3.3, ratings: [{ critic: 'Suckling', score: 90, source: 'JamesSuckling.com' }] },
{ id: 'wine-35', slug: 'vinas-del-vero-gran-vino-2018', name: 'Viñas del Vero Gran Vino 2018', description: 'Gran Vino de Somontano. Mezcla elegante de variedades. Aromas complejos con estructura balanceada.', price: 31.5, image: '/images/wines/default-red.jpg', sku: 'VT-035', stock: 11, featured: true, bodegaId: 'b30', regionId: 'r10', categoryId: 'cat-tinto', grapeIds: ['g1', 'g6', 'g11'], wineType: 'tinto' as const, vintage: 2018, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Parker', score: 92, source: 'Wine Advocate' }] },
{ id: 'wine-36', slug: 'marques-de-murrieta-dalmau-2015', name: 'Marqués de Murrieta Dalmau 2015', description: 'Dalmau de Murrieta. Obra maestra envejecida. Complejidad aromática, estructura y elegancia en cada sorbo.', price: 72, image: '/images/wines/default-red.jpg', sku: 'VT-036', stock: 7, featured: true, bodegaId: 'b1', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g5'], wineType: 'tinto' as const, vintage: 2015, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Peñín', score: 95, source: 'Guía Peñín' }] },
{ id: 'wine-37', slug: 'rioja-alta-vina-arana-gran-reserva-2010', name: 'Rioja Alta Viña Arana Gran Reserva 2010', description: 'Gran Reserva de antaño. Aromas evolucionados de fresa seca, cuero y especias. Paladar elegante y persistente.', price: 45, image: '/images/wines/default-red.jpg', sku: 'VT-037', stock: 10, featured: true, bodegaId: 'b2', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3'], wineType: 'tinto' as const, vintage: 2010, volume: 750, alcohol: 13.5, acidity: 3.5, ratings: [{ critic: 'Suckling', score: 94, source: 'JamesSuckling.com' }] },
{ id: 'wine-38', slug: 'muga-gran-reserva-2015', name: 'Muga Gran Reserva 2015', description: 'Gran Reserva de Muga. Estructura clásica y elegante. Frutos negros evolucionados con taninos sedosos.', price: 54, image: '/images/wines/default-red.jpg', sku: 'VT-038', stock: 8, featured: true, bodegaId: 'b3', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4'], wineType: 'tinto' as const, vintage: 2015, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Parker', score: 95, source: 'Wine Advocate' }] },
{ id: 'wine-39', slug: 'abadia-retuerta-reserva-especial-2018', name: 'Abadia Retuerta Reserva Especial 2018', description: 'Reserva Especial de Ribera. Potencia y elegancia. Frutos negros intensos con taninos potentes bien integrados.', price: 68, image: '/images/wines/default-red.jpg', sku: 'VT-039', stock: 5, featured: true, bodegaId: 'b18', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1', 'g5'], wineType: 'tinto' as const, vintage: 2018, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Peñín', score: 94, source: 'Guía Peñín' }] },
{ id: 'wine-40', slug: 'numanthia-numanthia-2018', name: 'Numanthia Numanthia 2018', description: 'Numanthia icónico de Toro. Potencia extrema. Tinta de Toro magníficamente expresada con profundidad.', price: 85, image: '/images/wines/default-red.jpg', sku: 'VT-040', stock: 3, featured: true, bodegaId: 'b22', regionId: 'r3', categoryId: 'cat-tinto', grapeIds: ['g9'], wineType: 'tinto' as const, vintage: 2018, volume: 750, alcohol: 15.5, acidity: 3.2, ratings: [{ critic: 'Suckling', score: 96, source: 'JamesSuckling.com' }] },
{ id: 'wine-41', slug: 'cillar-de-silos-reserva-2017', name: 'Cillar de Silos Reserva 2017', description: 'Reserva concentrado de Ribera. Frutos negros confitados, cacao y especias. Estructura potente y elegante.', price: 38, image: '/images/wines/default-red.jpg', sku: 'VT-041', stock: 7, featured: false, bodegaId: 'b8', regionId: 'r2', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Parker', score: 92, source: 'Wine Advocate' }] },
{ id: 'wine-42', slug: 'cvne-imperial-reserva-2016', name: 'CVNE Imperial Reserva 2016', description: 'Imperial Reserva de CVNE. Complejidad y equilibrio. Aromas evolucionados con boca redonda y persistente.', price: 48, image: '/images/wines/default-red.jpg', sku: 'VT-042', stock: 6, featured: true, bodegaId: 'b4', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4'], wineType: 'tinto' as const, vintage: 2016, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Peñín', score: 93, source: 'Guía Peñín' }] },
{ id: 'wine-43', slug: 'remírez-de-ganuza-gran-reserva-2015', name: 'Remírez de Ganuza Gran Reserva 2015', description: 'Gran Reserva de cuidadosa crianza. Elegancia absoluta. Frutos negros evolucionados con taninos sedosos.', price: 62, image: '/images/wines/default-red.jpg', sku: 'VT-043', stock: 5, featured: true, bodegaId: 'b11', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g5'], wineType: 'tinto' as const, vintage: 2015, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Suckling', score: 95, source: 'JamesSuckling.com' }] },
{ id: 'wine-44', slug: 'torres-milmanda-2019', name: 'Torres Milmanda 2019', description: 'Milmanda de Torres. Cabernet Sauvignon puro de viejo viñedo. Potencia y elegancia en perfecta armonía.', price: 44.5, image: '/images/wines/default-red.jpg', sku: 'VT-044', stock: 8, featured: true, bodegaId: 'b26', regionId: 'r7', categoryId: 'cat-tinto', grapeIds: ['g5'], wineType: 'tinto' as const, vintage: 2019, volume: 750, alcohol: 14.5, acidity: 3.5, ratings: [{ critic: 'Parker', score: 93, source: 'Wine Advocate' }] },
{ id: 'wine-45', slug: 'roda-reserva-2017', name: 'Roda Reserva 2017', description: 'Reserva elegante de Roda. Aromas y sabores bien integrados. Boca redonda con taninos pulidos.', price: 32.5, image: '/images/wines/default-red.jpg', sku: 'VT-045', stock: 9, featured: false, bodegaId: 'b10', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Peñín', score: 92, source: 'Guía Peñín' }] },
{ id: 'wine-46', slug: 'sierra-cantabria-reserva-2017', name: 'Sierra Cantabria Reserva 2017', description: 'Reserva estructurado de Sierra Cantabria. Complejidad aromática y boca amplia con taninos nobles.', price: 29.5, image: '/images/wines/default-red.jpg', sku: 'VT-046', stock: 11, featured: false, bodegaId: 'b13', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g2'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14, acidity: 3.5, ratings: [{ critic: 'Suckling', score: 91, source: 'JamesSuckling.com' }] },
{ id: 'wine-47', slug: 'ysios-reserva-2017', name: 'Ysios Reserva 2017', description: 'Reserva moderno de Ysios. Elegancia y potencia. Frutos negros con toques de cuero y especias.', price: 35.5, image: '/images/wines/default-red.jpg', sku: 'VT-047', stock: 7, featured: true, bodegaId: 'b12', regionId: 'r9', categoryId: 'cat-tinto', grapeIds: ['g1', 'g4', 'g5'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Parker', score: 93, source: 'Wine Advocate' }] },
{ id: 'wine-48', slug: 'conde-de-valdemar-gran-reserva-2014', name: 'Conde de Valdemar Gran Reserva 2014', description: 'Gran Reserva evolucionado. Aromas complejos de cuero, tabaco y especias. Paladar magnífico.', price: 51, image: '/images/wines/default-red.jpg', sku: 'VT-048', stock: 4, featured: true, bodegaId: 'b14', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g4'], wineType: 'tinto' as const, vintage: 2014, volume: 750, alcohol: 14, acidity: 3.4, ratings: [{ critic: 'Peñín', score: 94, source: 'Guía Peñín' }] },
{ id: 'wine-49', slug: 'baigorri-gran-vino-2017', name: 'Baigorri Gran Vino 2017', description: 'Gran Vino de Baigorri. Mezcla sabia de variedades. Equilibrio y complejidad en perfecta armonía.', price: 56.5, image: '/images/wines/default-red.jpg', sku: 'VT-049', stock: 6, featured: true, bodegaId: 'b17', regionId: 'r1', categoryId: 'cat-tinto', grapeIds: ['g1', 'g3', 'g4', 'g11'], wineType: 'tinto' as const, vintage: 2017, volume: 750, alcohol: 14.5, acidity: 3.4, ratings: [{ critic: 'Suckling', score: 94, source: 'JamesSuckling.com' }] },
{ id: 'wine-50', slug: 'vinas-del-vero-collection-2018', name: 'Viñas del Vero Collection 2018', description: 'Collection de Viñas del Vero. Mezcla elegante de Tempranillo, Merlot y Mencía. Boca agradable y bien estructurada.', price: 19, image: '/images/wines/default-red.jpg', sku: 'VT-050', stock: 13, featured: false, bodegaId: 'b30', regionId: 'r10', categoryId: 'cat-tinto', grapeIds: ['g6', 'g1', 'g7'], wineType: 'tinto' as const, vintage: 2018, volume: 750, alcohol: 14, acidity: 3.5 },
];

// Expand wine data into full Product objects
function buildProducts(): Product[] {
  return WINES_DATA.map((w) => ({
    ...w,
    bodega: BODEGAS[w.bodegaId],
    region: REGIONS[w.regionId],
    category: CATEGORIES[w.categoryId],
    grapes: w.grapeIds.map(id => GRAPES[id]),
    ratings: (w.ratings || []).map((r, i) => ({ ...r, id: `rating-${w.id}-${i}`, productId: w.id, createdAt, updatedAt })),
    reviews: [],
    createdAt,
    updatedAt,
  } as Product));
}

const PRODUCTS: Product[] = buildProducts();

export default function Home() {
  return (
    <div className="w-full bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <HeroSlider />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <TrustBadges className="mb-0" />
        </div>
      </div>

      <CategoryIcons />

      <TopSales />

      <BestSellers products={PRODUCTS} />

      <BlogPreview />

      <InfoBanners />

      <NewArrivals products={PRODUCTS} />

      <OffersSection products={PRODUCTS} />

      <Recommendations products={PRODUCTS} />

      <ReferralBanner />

      <SeoLinks />
    </div>
  );
}
