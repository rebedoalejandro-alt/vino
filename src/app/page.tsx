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

const dt = new Date('2024-01-01');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bodegas: { [key: string]: any } = {
  'tres-reinos': { id: 'b1', name: 'Tres Reinos', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 2000, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236233_00_1.jpg' },
  'dehesas-del-rey': { id: 'b2', name: 'Dehesas del Rey', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 1995, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/325547_00_1.jpg' },
  'marques-de-riscal': { id: 'b3', name: 'MarquÃ©s de Riscal', country: 'Spain', region: 'La Rioja', founded: 1858, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg' },
  'protos': { id: 'b4', name: 'Protos', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 1927, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000197_00_1.jpg' },
  'cune': { id: 'b5', name: 'Cune', country: 'Spain', region: 'La Rioja', founded: 1879, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000044_00_1.jpg' },
  'beronia': { id: 'b6', name: 'Beronia', country: 'Spain', region: 'La Rioja', founded: 1973, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000020_00_1.jpg' },
  'marques-de-caceres': { id: 'b7', name: 'MarquÃ©s de CÃ¡ceres', country: 'Spain', region: 'La Rioja', founded: 1970, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000086_00_1.jpg' },
  'vina-albina': { id: 'b8', name: 'ViÃ±a Albina', country: 'Spain', region: 'La Rioja', founded: 1999, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000105_00_1.jpg' },
  'martÃ­n-cÃ³dax': { id: 'b9', name: 'MartÃ­n CÃ³dax', country: 'Spain', region: 'Galicia', founded: 1986, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg' },
  'carrefour': { id: 'b10', name: 'Carrefour', country: 'Spain', region: 'Multi-region', founded: 1960, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/513382_00_1.jpg' },
  'coto-de-imaz': { id: 'b11', name: 'Coto de Imaz', country: 'Spain', region: 'La Rioja', founded: 1970, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000039_00_1.jpg' },
  'ramon-bilbao': { id: 'b12', name: 'RamÃ³n Bilbao', country: 'Spain', region: 'La Rioja', founded: 1924, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000068_00_1.jpg' },
  'vina-pomal': { id: 'b13', name: 'ViÃ±a Pomal', country: 'Spain', region: 'La Rioja', founded: 1905, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000111_00_1.jpg' },
  'celeste': { id: 'b14', name: 'Celeste', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 2005, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/252253_00_1.jpg' },
  'faustino': { id: 'b15', name: 'Faustino', country: 'Spain', region: 'La Rioja', founded: 1861, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000054_00_1.jpg' },
  'corazon-laguardia': { id: 'b16', name: 'CorazÃ³n de Laguardia', country: 'Spain', region: 'La Rioja', founded: 2010, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/337291_00_1.jpg' },
  'gloria': { id: 'b17', name: 'Glorioso', country: 'Spain', region: 'La Rioja', founded: 1990, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000060_00_1.jpg' },
  'montecruz': { id: 'b18', name: 'Montecruz', country: 'Spain', region: 'Castilla-La Mancha', founded: 1999, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000157_00_1.jpg' },
  'carrizal': { id: 'b19', name: 'Carrizal', country: 'Spain', region: 'La Rioja', founded: 2001, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/510627_00_1.jpg' },
  'antaÃ±o': { id: 'b20', name: 'AntaÃ±o', country: 'Spain', region: 'La Rioja', founded: 1985, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000075_00_1.jpg' },
  'cyan': { id: 'b21', name: 'Cyan', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 2008, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/217505_00_1.jpg' },
  'pago-carraovejas': { id: 'b22', name: 'Pago de Carraovejas', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 1992, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000173_00_1.jpg' },
  'dama-lago': { id: 'b23', name: 'Dama del Lago', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 2000, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/484782_00_1.jpg' },
  'estilete': { id: 'b24', name: 'Estilete', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 1998, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/871997_00_1.jpg' },
  'jose-pariente': { id: 'b25', name: 'JosÃ© Pariente', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 1997, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/306253_00_1.jpg' },
  'vina-sol': { id: 'b26', name: 'ViÃ±a Sol', country: 'Spain', region: 'Catalonia', founded: 1996, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg' },
  'penascal': { id: 'b27', name: 'PeÃ±ascal', country: 'Spain', region: 'Multi-region', founded: 1992, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000234_00_1.jpg' },
  'mateus': { id: 'b28', name: 'Mateus', country: 'Portugal', region: 'Douro Valley', founded: 1942, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000233_00_1.jpg' },
  'vina-albali': { id: 'b29', name: 'ViÃ±a Albali', country: 'Spain', region: 'Navarre', founded: 1972, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000239_00_1.jpg' },
  'riunite': { id: 'b30', name: 'Riunite', country: 'Italy', region: 'Emilia-Romagna', founded: 1962, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000291_00_1.jpg' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const regions: { [key: string]: any } = {
  'ribera-duero': { id: 'r1', name: 'Ribera del Duero', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000197_00_1.jpg' },
  'rioja': { id: 'r2', name: 'Rioja', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg' },
  'valdepenias': { id: 'r3', name: 'ValdepeÃ±as', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000157_00_1.jpg' },
  'rueda': { id: 'r4', name: 'Rueda', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000098_00_1.jpg' },
  'rias-baixas': { id: 'r5', name: 'RÃ­as Baixas', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg' },
  'penedes': { id: 'r6', name: 'PenedÃÂ¨s', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg' },
  'toro': { id: 'r7', name: 'Toro', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/217505_00_1.jpg' },
  'navarre': { id: 'r8', name: 'Navarre', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000239_00_1.jpg' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const grapes: { [key: string]: any } = {
  'tempranillo': { id: 'g1', name: 'Tempranillo', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg' },
  'verdejo': { id: 'g2', name: 'Verdejo', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000098_00_1.jpg' },
  'albarino': { id: 'g3', name: 'AlbariÃ±o', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg' },
  'garnacha': { id: 'g4', name: 'Garnacha', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000234_00_1.jpg' },
  'xarel-lo': { id: 'g5', name: 'XarelÃÂ·lo', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const category: any = {
  id: 'cat1', name: 'Wine', slug: 'wine', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wineData: any[] = [
  { idx: 1, name: 'Vino tinto crianza tempranillo 3 Reinos D.O. Ribera del Duero 75 cl.', price: 7.85, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236233_00_1.jpg', type: 'tinto', bodega: 'tres-reinos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 2, name: 'Vino tinto roble tempranillo Tres Reinos D.O. Ribera del Duero 75 cl.', price: 4.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236225_00_1.jpg', type: 'tinto', bodega: 'tres-reinos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 3, name: 'Vino tinto joven tempranillo Carrefour Vendimia Seleccionada V.T. 1 l.', price: 1.20, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/513382_00_1.jpg', type: 'tinto', bodega: 'carrefour', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 1000, alcohol: 13.5, acidity: 3.7 },
  { idx: 4, name: 'Vino tinto crianza tempranillo Dehesas del Rey D.O. Ribera del Duero 75 cl.', price: 7.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/325547_00_1.jpg', type: 'tinto', bodega: 'dehesas-del-rey', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 5, name: 'Vino tinto crianza Carrizal D.O.Ca Rioja 75 cl.', price: 2.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/510627_00_1.jpg', type: 'tinto', bodega: 'carrizal', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 6, name: 'Vino tinto reserva tempranillo MarquÃ©s de la Concordia D.O.Ca Rioja 75 cl.', price: 5.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/248714_00_1.jpg', type: 'tinto', bodega: 'marques-de-riscal', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 7, name: 'Vino tinto crianza tempranillo MarquÃ©s de Riscal D.O.Ca Rioja 75 cl.', price: 9.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg', type: 'tinto', bodega: 'marques-de-riscal', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 8, name: 'Vino tinto crianza Montecruz D.O. ValdepeÃ±as 75 cl.', price: 1.79, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000157_00_1.jpg', type: 'tinto', bodega: 'montecruz', region: 'valdepenias', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.0, acidity: 3.6 },
  { idx: 9, name: 'Vino tinto reserva tempranillo MarquÃ©s de Riscal D.O.Ca Rioja 75 cl.', price: 14.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000093_00_1.jpg', type: 'tinto', bodega: 'marques-de-riscal', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 10, name: 'Vino tinto reserva AntaÃ±o D.O.Ca Rioja 75 cl.', price: 4.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000075_00_1.jpg', type: 'tinto', bodega: 'antaÃ±o', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 11, name: 'Vino tinto crianza tempranillo Glorioso D.O.Ca Rioja 75 cl.', price: 4.75, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000060_00_1.jpg', type: 'tinto', bodega: 'gloria', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 12, name: 'Vino tinto joven D.O.Ca Rioja CorazÃ³n de Laguardia 75 cl.', price: 3.69, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/337291_00_1.jpg', type: 'tinto', bodega: 'corazon-laguardia', region: 'rioja', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.7 },
  { idx: 13, name: 'Vino tinto reserva D.O. Ribera del Duero Protos 75 cl.', price: 16.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000197_00_1.jpg', type: 'tinto', bodega: 'protos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 14, name: 'Vino tinto crianza D.O. Ribera del Duero Protos 75 cl.', price: 11.75, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000194_00_1.jpg', type: 'tinto', bodega: 'protos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 15, name: 'Vino tinto roble D.O. Ribera del Duero Protos 75 cl.', price: 7.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000189_00_1.jpg', type: 'tinto', bodega: 'protos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 16, name: 'Vino tinto gran reserva MarquÃ©s de Riscal D.O.Ca Rioja 75 cl.', price: 29.85, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000096_00_1.jpg', type: 'tinto', bodega: 'marques-de-riscal', region: 'rioja', grapes: ['tempranillo'], vintage: 2016, volume: 750, alcohol: 13.5, acidity: 3.3, featured: true },
  { idx: 17, name: 'Vino tinto crianza D.O.Ca Rioja Coto de Imaz 75 cl.', price: 5.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000039_00_1.jpg', type: 'tinto', bodega: 'coto-de-imaz', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 18, name: 'Vino tinto crianza RamÃ³n Bilbao D.O.Ca Rioja 75 cl.', price: 7.55, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000068_00_1.jpg', type: 'tinto', bodega: 'ramon-bilbao', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 19, name: 'Vino tinto reserva Coto de Imaz D.O.Ca Rioja 75 cl.', price: 9.25, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000040_00_1.jpg', type: 'tinto', bodega: 'coto-de-imaz', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 20, name: 'Vino tinto crianza Cune D.O.Ca Rioja 75 cl.', price: 5.79, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000044_00_1.jpg', type: 'tinto', bodega: 'cune', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 21, name: 'Vino tinto reserva Cune D.O.Ca Rioja 75 cl.', price: 8.69, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000050_00_1.jpg', type: 'tinto', bodega: 'cune', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 22, name: 'Vino tinto roble D.O. Ribera del Duero Celeste 75 cl.', price: 8.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/306379_00_1.jpg', type: 'tinto', bodega: 'celeste', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6, featured: true },
  { idx: 23, name: 'Vino tinto crianza D.O. Ribera del Duero Celeste 75 cl.', price: 11.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/252253_00_1.jpg', type: 'tinto', bodega: 'celeste', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 24, name: 'Vino tinto crianza D.O.Ca Rioja ViÃ±a Pomal 75 cl.', price: 6.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000111_00_1.jpg', type: 'tinto', bodega: 'vina-pomal', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 25, name: 'Vino tinto crianza Beronia D.O.Ca Rioja 75 cl.', price: 7.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000020_00_1.jpg', type: 'tinto', bodega: 'beronia', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 26, name: 'Vino tinto crianza D.O.Ca Rioja MarquÃ©s de CÃ¡ceres 75 cl.', price: 6.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000086_00_1.jpg', type: 'tinto', bodega: 'marques-de-caceres', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 27, name: 'Vino tinto reserva D.O.Ca Rioja MarquÃ©s de CÃ¡ceres 75 cl.', price: 10.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000091_00_1.jpg', type: 'tinto', bodega: 'marques-de-caceres', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 28, name: 'Vino tinto reserva Beronia D.O.Ca Rioja 75 cl.', price: 9.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000024_00_1.jpg', type: 'tinto', bodega: 'beronia', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 29, name: 'Vino tinto gran reserva Beronia D.O.Ca Rioja 75 cl.', price: 14.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/200038_00_1.jpg', type: 'tinto', bodega: 'beronia', region: 'rioja', grapes: ['tempranillo'], vintage: 2016, volume: 750, alcohol: 13.5, acidity: 3.3, featured: true },
  { idx: 30, name: 'Vino tinto crianza D.O.Ca Rioja ViÃ±a Albina 75 cl.', price: 5.79, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000105_00_1.jpg', type: 'tinto', bodega: 'vina-albina', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 31, name: 'Vino tinto reserva D.O.Ca Rioja ViÃ±a Albina 75 cl.', price: 8.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000106_00_1.jpg', type: 'tinto', bodega: 'vina-albina', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 32, name: 'Vino tinto roble D.O. Toro Cyan 75 cl.', price: 6.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/217505_00_1.jpg', type: 'tinto', bodega: 'cyan', region: 'toro', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 33, name: 'Vino tinto reserva D.O. Ribera del Duero Pago de Carraovejas 75 cl.', price: 44.90, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000173_00_1.jpg', type: 'tinto', bodega: 'pago-carraovejas', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.3, featured: true },
  { idx: 34, name: 'Vino tinto crianza D.O.Ca Rioja Faustino VII 75 cl.', price: 3.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000054_00_1.jpg', type: 'tinto', bodega: 'faustino', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 35, name: 'Vino tinto reserva Faustino V D.O.Ca Rioja 75 cl.', price: 8.55, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000055_00_1.jpg', type: 'tinto', bodega: 'faustino', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 36, name: 'Vino tinto gran reserva Faustino I D.O.Ca Rioja 75 cl.', price: 19.85, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000056_00_1.jpg', type: 'tinto', bodega: 'faustino', region: 'rioja', grapes: ['tempranillo'], vintage: 2016, volume: 750, alcohol: 13.5, acidity: 3.3, featured: true },
  { idx: 37, name: 'Vino blanco Carrefour Classic brik 1 l.', price: 0.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/513373_00_1.jpg', type: 'blanco', bodega: 'carrefour', region: 'rioja', grapes: ['verdejo'], vintage: 2023, volume: 1000, alcohol: 12.5, acidity: 3.8 },
  { idx: 38, name: 'Vino blanco verdejo Dama del Lago D.O. Rueda 75 cl.', price: 3.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/484782_00_1.jpg', type: 'blanco', bodega: 'dama-lago', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.8 },
  { idx: 39, name: 'Vino blanco verdejo Estilete D.O. Rueda 75 cl.', price: 2.55, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/871997_00_1.jpg', type: 'blanco', bodega: 'estilete', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.8 },
  { idx: 40, name: 'Vino blanco verdejo D.O. Rueda MarquÃ©s de Riscal 75 cl.', price: 6.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000098_00_1.jpg', type: 'blanco', bodega: 'marques-de-riscal', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.7, featured: true },
  { idx: 41, name: 'Vino blanco albariÃ±o D.O. RÃ­as Baixas MartÃ­n CÃ³dax 75 cl.', price: 8.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg', type: 'blanco', bodega: 'martÃ­n-cÃ³dax', region: 'rias-baixas', grapes: ['albarino'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.5, featured: true },
  { idx: 42, name: 'Vino blanco verdejo D.O. Rueda JosÃ© Pariente 75 cl.', price: 8.39, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/306253_00_1.jpg', type: 'blanco', bodega: 'jose-pariente', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.7, featured: true },
  { idx: 43, name: 'Vino blanco semidulce D.O. PenedÃÂ¨s ViÃ±a Sol 75 cl.', price: 4.45, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg', type: 'blanco', bodega: 'vina-sol', region: 'penedes', grapes: ['xarel-lo'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.6 },
  { idx: 44, name: 'Vino blanco verdejo Protos D.O. Rueda 75 cl.', price: 6.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/267505_00_1.jpg', type: 'blanco', bodega: 'protos', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.7 },
  { idx: 45, name: 'Vino rosado Carrefour Classic brik 1 l.', price: 1.31, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/513381_00_1.jpg', type: 'rosado', bodega: 'carrefour', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 1000, alcohol: 12.0, acidity: 3.8 },
  { idx: 46, name: 'Vino rosado joven PeÃ±ascal 75 cl.', price: 4.25, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000234_00_1.jpg', type: 'rosado', bodega: 'penascal', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.8 },
  { idx: 47, name: 'Vino rosado Mateus 75 cl.', price: 4.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000233_00_1.jpg', type: 'rosado', bodega: 'mateus', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.7, featured: true },
  { idx: 48, name: 'Vino rosado D.O. Navarra ViÃ±a Albali 75 cl.', price: 3.25, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000239_00_1.jpg', type: 'rosado', bodega: 'vina-albali', region: 'navarre', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.8 },
  { idx: 49, name: 'Vino rosado Lambrusco dell\'Emilia Riunite 75 cl.', price: 3.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000291_00_1.jpg', type: 'rosado', bodega: 'riunite', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.7 },
  { idx: 50, name: 'Vino rosado Carrefour pack 3 brik 20 cl.', price: 1.55, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/004062_00_1.jpg', type: 'rosado', bodega: 'carrefour', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 200, alcohol: 12.0, acidity: 3.9 },
];

function buildProducts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return wineData.map((w: any) => ({
    id: `car-${w.idx}`,
    name: w.name,
    slug: w.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    description: w.name,
    price: w.price,
    image: w.image,
    sku: `CAR-${String(w.idx).padStart(3, '0')}`,
    stock: w.featured ? 50 : 100,
    featured: w.featured || false,
    bodegaId: bodegas[w.bodega].id,
    bodega: { ...bodegas[w.bodega], description: bodegas[w.bodega].name, createdAt: dt, updatedAt: dt },
    regionId: regions[w.region].id,
    region: { ...regions[w.region], description: regions[w.region].name, createdAt: dt, updatedAt: dt },
    categoryId: category.id,
    category: { ...category, description: 'Vinos', createdAt: dt, updatedAt: dt },
    grapeIds: w.grapes.map((g: string) => grapes[g].id),
    grapes: w.grapes.map((g: string) => ({ ...grapes[g], description: grapes[g].name, createdAt: dt, updatedAt: dt })),
    wineType: w.type,
    vintage: w.vintage,
    volume: w.volume,
    alcohol: w.alcohol,
    acidity: w.acidity,
    ratings: [],
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as Product[];
}

const PRODUCTS = buildProducts();

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
