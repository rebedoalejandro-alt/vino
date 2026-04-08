import { Product } from '@/types';

const dt = new Date('2024-01-01');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bodegas: { [key: string]: any } = {
  'tres-reinos': { id: 'b1', name: 'Tres Reinos', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 2000, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236233_00_1.jpg' },
  'marques-de-riscal': { id: 'b3', name: 'MarquÃÂ©s de Riscal', country: 'Spain', region: 'La Rioja', founded: 1858, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg' },
  'cune': { id: 'b5', name: 'Cune', country: 'Spain', region: 'La Rioja', founded: 1879, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000044_00_1.jpg' },
  'beronia': { id: 'b6', name: 'Beronia', country: 'Spain', region: 'La Rioja', founded: 1973, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000020_00_1.jpg' },
  'martÃÂ­n-cÃÂ³dax': { id: 'b9', name: 'MartÃÂ­n CÃÂ³dax', country: 'Spain', region: 'Galicia', founded: 1986, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg' },
  'coto-de-imaz': { id: 'b11', name: 'Coto de Imaz', country: 'Spain', region: 'La Rioja', founded: 1970, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000039_00_1.jpg' },
  'faustino': { id: 'b15', name: 'Faustino', country: 'Spain', region: 'La Rioja', founded: 1861, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000054_00_1.jpg' },
  'corazon-laguardia': { id: 'b16', name: 'CorazÃÂ³n de Laguardia', country: 'Spain', region: 'La Rioja', founded: 2010, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/337291_00_1.jpg' },
  'gloria': { id: 'b17', name: 'Glorioso', country: 'Spain', region: 'La Rioja', founded: 1990, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000060_00_1.jpg' },
  'montecruz': { id: 'b18', name: 'Montecruz', country: 'Spain', region: 'Castilla-La Mancha', founded: 1999, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000157_00_1.jpg' },
  'antaÃÂ±o': { id: 'b20', name: 'AntaÃÂ±o', country: 'Spain', region: 'La Rioja', founded: 1985, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000075_00_1.jpg' },
  'dama-lago': { id: 'b23', name: 'Dama del Lago', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 2000, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/484782_00_1.jpg' },
  'estilete': { id: 'b24', name: 'Estilete', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 1998, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/871997_00_1.jpg' },
  'vina-sol': { id: 'b26', name: 'ViÃÂ±a Sol', country: 'Spain', region: 'Catalonia', founded: 1996, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg' },
  'penascal': { id: 'b27', name: 'PeÃÂ±ascal', country: 'Spain', region: 'Multi-region', founded: 1992, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000234_00_1.jpg' },
  'mateus': { id: 'b28', name: 'Mateus', country: 'Portugal', region: 'Douro Valley', founded: 1942, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000233_00_1.jpg' },
  'vina-albali': { id: 'b29', name: 'ViÃÂ±a Albali', country: 'Spain', region: 'Navarre', founded: 1972, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000239_00_1.jpg' },
  'riunite': { id: 'b30', name: 'Riunite', country: 'Italy', region: 'Emilia-Romagna', founded: 1962, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000291_00_1.jpg' },
  'vina-cumbrero': { id: 'b31', name: 'ViÃÂ±a Cumbrero', country: 'Spain', region: 'La Rioja', founded: 1973, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/736159_00_1.jpg' },
  'vina-lobon': { id: 'b32', name: 'ViÃÂ±a LobÃÂ³n', country: 'Spain', region: 'Castilla-La Mancha', founded: 1990, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/087654_00_1.jpg' },
  'pradorey': { id: 'b33', name: 'PradoRey', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 2000, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/329513_00_1.jpg' },
  'senorio-llanos': { id: 'b34', name: 'SeÃÂ±orÃÂ­o de los Llanos', country: 'Spain', region: 'Castilla-La Mancha', founded: 1975, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/280448_00_1.jpg' },
  'campo-viejo': { id: 'b35', name: 'Campo Viejo', country: 'Spain', region: 'La Rioja', founded: 1959, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/048265_00_1.jpg' },
  'mucho-mas': { id: 'b36', name: 'Mucho MÃÂ¡s', country: 'Spain', region: 'Multi-region', founded: 2015, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/696229_00_1.jpg' },
  'yllera': { id: 'b37', name: 'Yllera', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 1970, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/182920_00_1.jpg' },
  'estola': { id: 'b38', name: 'Estola', country: 'Spain', region: 'Castilla-La Mancha', founded: 1969, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/548859_00_1.jpg' },
  'portia': { id: 'b39', name: 'Portia', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 2001, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/073957_00_1.jpg' },
  'vina-espolon': { id: 'b40', name: 'ViÃÂ±a EspolÃÂ³n', country: 'Spain', region: 'La Rioja', founded: 1985, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/334208_00_1.jpg' },
  'enrique-i': { id: 'b41', name: 'Enrique I', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 2005, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/519774_00_1.jpg' },
  'el-coto': { id: 'b43', name: 'El Coto', country: 'Spain', region: 'La Rioja', founded: 1970, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236940_00_1.jpg' },
  'diamante': { id: 'b44', name: 'Diamante', country: 'Spain', region: 'La Rioja', founded: 1935, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/026499_00_1.jpg' },
  'moralinos': { id: 'b45', name: 'Moralinos', country: 'Spain', region: 'Castilla y LeÃÂ³n', founded: 2010, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/722202_00_1.jpg' },
  'sabasan': { id: 'b46', name: 'Sabasan', country: 'Spain', region: 'Navarre', founded: 1995, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/493470_00_1.jpg' },
  'bleu-de-mer': { id: 'b47', name: 'Bleu de Mer', country: 'France', region: 'Languedoc', founded: 2005, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/954502_00_1.jpg' },
  'protos': { id: 'b48', name: 'Protos', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 1927, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000194_00_1.jpg' },
  'celeste': { id: 'b49', name: 'Celeste', country: 'Spain', region: 'Castilla y LeÃ³n', founded: 2004, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/306379_00_1.jpg' },
  'marques-de-caceres': { id: 'b50', name: 'MarquÃ©s de CÃ¡ceres', country: 'Spain', region: 'La Rioja', founded: 1970, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000091_00_1.jpg' },
  // Vinissimus bodegas
  'raul-perez': { id: 'b51', name: 'RaÃºl PÃ©rez Viticultor', country: 'Spain', region: 'Bierzo', founded: 2000, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/ultsj19_anv800_1649944686.png' },
  'palacios-remondo': { id: 'b52', name: 'Bodegas Palacios Remondo', country: 'Spain', region: 'La Rioja', founded: 1945, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/hrem18_anv800_1640191918.png' },
  'remelluri': { id: 'b53', name: 'Granja Ntra. Sra de Remelluri', country: 'Spain', region: 'La Rioja', founded: 1967, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/lirmb20_anv800_1696950144.png' },
  'luna-beberide': { id: 'b54', name: 'Bodegas y ViÃ±edos Luna Beberide', country: 'Spain', region: 'Bierzo', founded: 1987, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/lbflc23_anv800_1753080396.png' },
  'pago-carraovejas': { id: 'b55', name: 'Bodega Pago de Carraovejas', country: 'Spain', region: 'Ribera del Duero', founded: 1987, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/pcarc21_anv800_1698305579.png' },
  'castro-ventosa': { id: 'b56', name: 'Bodegas y ViÃ±edos Castro Ventosa', country: 'Spain', region: 'Bierzo', founded: 1752, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/valtm20_anv800_1649944743.png' },
  'jose-pariente': { id: 'b57', name: 'Bodegas JosÃ© Pariente', country: 'Spain', region: 'Rueda', founded: 1998, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/jpave20_anv800_1637081766.png' },
  'rafael-palacios': { id: 'b58', name: 'Rafael Palacios', country: 'Spain', region: 'Valdeorras', founded: 2004, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/loubl21_anv800_1657199953.png' },
  'terras-gauda': { id: 'b59', name: 'Bodegas Terras Gauda', country: 'Spain', region: 'RÃ­as Baixas', founded: 1990, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/tgau20_anv800_1637082174.png' },
  'enate': { id: 'b60', name: 'Enate', country: 'Spain', region: 'Somontano', founded: 1992, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/e13c221_anv800_1659948933.png' },
  'soto-manrique': { id: 'b61', name: 'Soto y Manrique', country: 'Spain', region: 'Cebreros', founded: 2012, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/amnaz20_anv800_1637237254.png' },
  'izadi': { id: 'b62', name: 'Bodegas Izadi', country: 'Spain', region: 'La Rioja', founded: 1987, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/larro24_anv800_1742559226.png' },
  'chivite': { id: 'b63', name: 'Chivite', country: 'Spain', region: 'Navarra', founded: 1647, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/chfro22_anv800_1688508173.png' },
  'gonzalo-celayeta': { id: 'b64', name: 'Gonzalo Celayeta Wines', country: 'Spain', region: 'Navarra', founded: 2015, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/gchai20_anv800_1637081843.png' },
  'ramon-bilbao': { id: 'b65', name: 'Bodegas RamÃ³n Bilbao', country: 'Spain', region: 'La Rioja', founded: 1924, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/rbiro24_anv800_1759393833.png' },
  'can-rafols': { id: 'b66', name: 'Can RÃ fols dels Caus', country: 'Spain', region: 'PenedÃ¨s', founded: 1979, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/gcaro07_anv800_1768473050.png' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const regions: { [key: string]: any } = {
  'ribera-duero': { id: 'r1', name: 'Ribera del Duero', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000197_00_1.jpg' },
  'rioja': { id: 'r2', name: 'Rioja', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg' },
  'valdepenias': { id: 'r3', name: 'ValdepeÃÂ±as', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000157_00_1.jpg' },
  'rueda': { id: 'r4', name: 'Rueda', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000098_00_1.jpg' },
  'rias-baixas': { id: 'r5', name: 'RÃÂ­as Baixas', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg' },
  'penedes': { id: 'r6', name: 'PenedÃÂ¨s', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg' },
  'toro': { id: 'r7', name: 'Toro', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/217505_00_1.jpg' },
  'navarre': { id: 'r8', name: 'Navarre', country: 'Spain', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000239_00_1.jpg' },
  // Vinissimus regions
  'bierzo': { id: 'r9', name: 'Bierzo', country: 'Spain', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/ultsj19_anv800_1649944686.png' },
  'valdeorras': { id: 'r10', name: 'Valdeorras', country: 'Spain', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/loubl21_anv800_1657199953.png' },
  'somontano': { id: 'r11', name: 'Somontano', country: 'Spain', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/e13c221_anv800_1659948933.png' },
  'cebreros': { id: 'r12', name: 'Cebreros', country: 'Spain', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/amnaz20_anv800_1637237254.png' },
  '3-riberas': { id: 'r13', name: '3 Riberas', country: 'Spain', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/chfro22_anv800_1688508173.png' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const grapes: { [key: string]: any } = {
  'tempranillo': { id: 'g1', name: 'Tempranillo', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg' },
  'verdejo': { id: 'g2', name: 'Verdejo', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000098_00_1.jpg' },
  'albarino': { id: 'g3', name: 'AlbariÃÂ±o', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg' },
  'garnacha': { id: 'g4', name: 'Garnacha', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000234_00_1.jpg' },
  'xarel-lo': { id: 'g5', name: 'XarelÃÂ·lo', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg' },
  // Vinissimus grapes
  'mencia': { id: 'g6', name: 'MencÃÂ­a', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/ultsj19_anv800_1649944686.png' },
  'godello': { id: 'g7', name: 'Godello', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/ulgod20_anv800_1649944655.png' },
  'chardonnay': { id: 'g8', name: 'Chardonnay', image: 'https://cdn.vinissimus.com/prfmtgrande/vi/e13c221_anv800_1659948933.png' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const category: any = {
  id: 'cat1', name: 'Wine', slug: 'wine', image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const wineData: any[] = [
  { idx: 1, name: 'Vino tinto crianza tempranillo 3 Reinos D.O. Ribera del Duero 75 cl.', price: 7.85, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236233_00_1.jpg', type: 'tinto', bodega: 'tres-reinos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 2, name: 'Vino tinto roble tempranillo Tres Reinos D.O. Ribera del Duero 75 cl.', price: 4.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236225_00_1.jpg', type: 'tinto', bodega: 'tres-reinos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 7, name: 'Vino tinto crianza tempranillo MarquÃÂ©s de Riscal D.O.Ca Rioja 75 cl.', price: 9.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000083_00_1.jpg', type: 'tinto', bodega: 'marques-de-riscal', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 8, name: 'Vino tinto crianza Montecruz D.O. ValdepeÃÂ±as 75 cl.', price: 1.79, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000157_00_1.jpg', type: 'tinto', bodega: 'montecruz', region: 'valdepenias', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.0, acidity: 3.6 },
  { idx: 10, name: 'Vino tinto reserva AntaÃÂ±o D.O.Ca Rioja 75 cl.', price: 4.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000075_00_1.jpg', type: 'tinto', bodega: 'antaÃÂ±o', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 11, name: 'Vino tinto crianza tempranillo Glorioso D.O.Ca Rioja 75 cl.', price: 4.75, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000060_00_1.jpg', type: 'tinto', bodega: 'gloria', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 12, name: 'Vino tinto joven D.O.Ca Rioja CorazÃÂ³n de Laguardia 75 cl.', price: 3.69, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/337291_00_1.jpg', type: 'tinto', bodega: 'corazon-laguardia', region: 'rioja', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.7 },
  { idx: 14, name: 'Vino tinto crianza D.O. Ribera del Duero Protos 75 cl.', price: 11.75, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000194_00_1.jpg', type: 'tinto', bodega: 'protos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 15, name: 'Vino tinto roble D.O. Ribera del Duero Protos 75 cl.', price: 7.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000189_00_1.jpg', type: 'tinto', bodega: 'protos', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 17, name: 'Vino tinto crianza D.O.Ca Rioja Coto de Imaz 75 cl.', price: 5.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000039_00_1.jpg', type: 'tinto', bodega: 'coto-de-imaz', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 20, name: 'Vino tinto crianza Cune D.O.Ca Rioja 75 cl.', price: 5.79, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000044_00_1.jpg', type: 'tinto', bodega: 'cune', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 21, name: 'Vino tinto reserva Cune D.O.Ca Rioja 75 cl.', price: 8.69, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000050_00_1.jpg', type: 'tinto', bodega: 'cune', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 22, name: 'Vino tinto roble D.O. Ribera del Duero Celeste 75 cl.', price: 8.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/306379_00_1.jpg', type: 'tinto', bodega: 'celeste', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6, featured: true },
  { idx: 25, name: 'Vino tinto crianza Beronia D.O.Ca Rioja 75 cl.', price: 7.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000020_00_1.jpg', type: 'tinto', bodega: 'beronia', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 27, name: 'Vino tinto reserva D.O.Ca Rioja MarquÃÂ©s de CÃÂ¡ceres 75 cl.', price: 10.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000091_00_1.jpg', type: 'tinto', bodega: 'marques-de-caceres', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 34, name: 'Vino tinto crianza D.O.Ca Rioja Faustino VII 75 cl.', price: 3.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000054_00_1.jpg', type: 'tinto', bodega: 'faustino', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 35, name: 'Vino tinto reserva Faustino V D.O.Ca Rioja 75 cl.', price: 8.55, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000055_00_1.jpg', type: 'tinto', bodega: 'faustino', region: 'rioja', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.5, acidity: 3.4, featured: true },
  { idx: 38, name: 'Vino blanco verdejo Dama del Lago D.O. Rueda 75 cl.', price: 3.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/484782_00_1.jpg', type: 'blanco', bodega: 'dama-lago', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.8 },
  { idx: 39, name: 'Vino blanco verdejo Estilete D.O. Rueda 75 cl.', price: 2.55, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/871997_00_1.jpg', type: 'blanco', bodega: 'estilete', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.8 },
  { idx: 40, name: 'Vino blanco verdejo D.O. Rueda MarquÃÂ©s de Riscal 75 cl.', price: 6.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000098_00_1.jpg', type: 'blanco', bodega: 'marques-de-riscal', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.7, featured: true },
  { idx: 41, name: 'Vino blanco albariÃÂ±o D.O. RÃÂ­as Baixas MartÃÂ­n CÃÂ³dax 75 cl.', price: 8.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg', type: 'blanco', bodega: 'martÃÂ­n-cÃÂ³dax', region: 'rias-baixas', grapes: ['albarino'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.5, featured: true },
  { idx: 43, name: 'Vino blanco semidulce D.O. PenedÃÂ¨s ViÃÂ±a Sol 75 cl.', price: 4.45, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000221_00_1.jpg', type: 'blanco', bodega: 'vina-sol', region: 'penedes', grapes: ['xarel-lo'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.6 },
  { idx: 46, name: 'Vino rosado joven PeÃÂ±ascal 75 cl.', price: 4.25, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000234_00_1.jpg', type: 'rosado', bodega: 'penascal', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.8 },
  { idx: 47, name: 'Vino rosado Mateus 75 cl.', price: 4.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000233_00_1.jpg', type: 'rosado', bodega: 'mateus', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.7, featured: true },
  { idx: 48, name: 'Vino rosado D.O. Navarra ViÃÂ±a Albali 75 cl.', price: 3.25, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000239_00_1.jpg', type: 'rosado', bodega: 'vina-albali', region: 'navarre', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.8 },
  { idx: 49, name: 'Vino rosado Lambrusco dell\'Emilia Riunite 75 cl.', price: 3.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000291_00_1.jpg', type: 'rosado', bodega: 'riunite', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.7 },
  { idx: 51, name: 'Vino tinto crianza ViÃÂ±a Cumbrero D.O.Ca. Rioja 75 cl.', price: 6.39, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/736159_00_1.jpg', type: 'tinto', bodega: 'vina-cumbrero', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 52, name: 'Vino tinto crianza ViÃÂ±a LobÃÂ³n D.O. La Mancha 75 cl.', price: 1.75, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/087654_00_1.jpg', type: 'tinto', bodega: 'vina-lobon', region: 'valdepenias', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.0, acidity: 3.6 },
  { idx: 53, name: 'Vino tinto con crianza tempranillo PradoRey D.O. Ribera del Duero 75 cl.', price: 10.39, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/329513_00_1.jpg', type: 'tinto', bodega: 'pradorey', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 54, name: 'Vino tinto tempranillo SeÃÂ±orÃÂ­o de los Llanos D.O. ValdepeÃÂ±as 75 cl.', price: 2.25, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/280448_00_1.jpg', type: 'tinto', bodega: 'senorio-llanos', region: 'valdepenias', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.0, acidity: 3.6 },
  { idx: 55, name: 'Vino tinto tempranillo Campo Viejo D.O.Ca. Rioja 75 cl.', price: 4.35, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/048265_00_1.jpg', type: 'tinto', bodega: 'campo-viejo', region: 'rioja', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 56, name: 'Vino tinto crianza Campo Viejo D.O.Ca. Rioja 75 cl.', price: 5.95, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/048266_00_1.jpg', type: 'tinto', bodega: 'campo-viejo', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 57, name: 'Vino tinto crianza Mucho MÃÂ¡s 75 cl.', price: 6.99, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/696229_00_1.jpg', type: 'tinto', bodega: 'mucho-mas', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 58, name: 'Vino tinto Yllera D.O. Ribera del Duero 75 cl.', price: 11.09, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/182920_00_1.jpg', type: 'tinto', bodega: 'yllera', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 59, name: 'Vino tinto reserva Estola D.O. La Mancha 75 cl.', price: 4.35, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/548859_00_1.jpg', type: 'tinto', bodega: 'estola', region: 'valdepenias', grapes: ['tempranillo'], vintage: 2019, volume: 750, alcohol: 13.0, acidity: 3.5 },
  { idx: 60, name: 'Vino tinto Portia D.O. Ribera del Duero 75 cl.', price: 11.55, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/073957_00_1.jpg', type: 'tinto', bodega: 'portia', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 61, name: 'Vino tinto tempranillo ViÃÂ±a EspolÃÂ³n D.O.Ca. Rioja 75 cl.', price: 4.79, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/334208_00_1.jpg', type: 'tinto', bodega: 'vina-espolon', region: 'rioja', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 62, name: 'Vino tinto joven tempranillo Enrique I D.O. Ribera del Duero 75 cl.', price: 3.65, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/519774_00_1.jpg', type: 'tinto', bodega: 'enrique-i', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.7 },
  { idx: 64, name: 'Vino blanco El Coto D.O.Ca. Rioja 75 cl.', price: 4.25, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236940_00_1.jpg', type: 'blanco', bodega: 'el-coto', region: 'rioja', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.7 },
  { idx: 65, name: 'Vino blanco verdejo 3 Reinos D.O. Rueda 75 cl.', price: 2.35, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/702060_00_1.jpg', type: 'blanco', bodega: 'tres-reinos', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.8 },
  { idx: 66, name: 'Vino blanco uva blanca Diamante D.O.Ca Rioja 75 cl.', price: 4.65, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/026499_00_1.jpg', type: 'blanco', bodega: 'diamante', region: 'rioja', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.6 },
  { idx: 67, name: 'Vino blanco verdejo Moralinos D.O. Rueda 75 cl.', price: 5.89, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/722202_00_1.jpg', type: 'blanco', bodega: 'moralinos', region: 'rueda', grapes: ['verdejo'], vintage: 2023, volume: 750, alcohol: 12.5, acidity: 3.7 },
  { idx: 68, name: 'Vino rosado joven Tres Reinos D.O.Ca. Rioja 75 cl.', price: 2.95, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/838587_00_1.jpg', type: 'rosado', bodega: 'tres-reinos', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.8 },
  { idx: 69, name: 'Vino rosado Sabasan D.O. Navarra 75 cl.', price: 2.15, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/493470_00_1.jpg', type: 'rosado', bodega: 'sabasan', region: 'navarre', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.8 },
  { idx: 70, name: 'Vino rosado Bleu de Mer D.O. Pays d\'Oc 75 cl.', price: 7.49, image: 'https://static.carrefour.es/hd_510x_/img_pim_food/954502_00_1.jpg', type: 'rosado', bodega: 'bleu-de-mer', region: 'rioja', grapes: ['garnacha'], vintage: 2023, volume: 750, alcohol: 12.0, acidity: 3.7, featured: true },
  // === Vinissimus Tintos ===
  { idx: 71, name: 'Ultreia Saint Jacques D.O. Bierzo 75 cl.', price: 11.20, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/ultsj19_anv800_1649944686.png', type: 'tinto', bodega: 'raul-perez', region: 'bierzo', grapes: ['mencia'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
  { idx: 72, name: 'La Montesa Crianza D.O.Ca. Rioja 75 cl.', price: 16.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/hrem18_anv800_1640191918.png', type: 'tinto', bodega: 'palacios-remondo', region: 'rioja', grapes: ['garnacha'], vintage: 2021, volume: 750, alcohol: 14.0, acidity: 3.4 },
  { idx: 73, name: 'Lindes de Remelluri ViÃÂ±edos de Labastida D.O.Ca. Rioja 75 cl.', price: 15.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/lirmb20_anv800_1696950144.png', type: 'tinto', bodega: 'remelluri', region: 'rioja', grapes: ['tempranillo'], vintage: 2021, volume: 750, alcohol: 14.0, acidity: 3.4, featured: true },
  { idx: 74, name: 'Finca Luna Beberide D.O. Bierzo 75 cl.', price: 11.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/lbflc23_anv800_1753080396.png', type: 'tinto', bodega: 'luna-beberide', region: 'bierzo', grapes: ['mencia'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.5 },
  { idx: 75, name: 'Pago de Carraovejas D.O. Ribera del Duero 75 cl.', price: 39.75, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/pcarc21_anv800_1698305579.png', type: 'tinto', bodega: 'pago-carraovejas', region: 'ribera-duero', grapes: ['tempranillo'], vintage: 2023, volume: 750, alcohol: 14.5, acidity: 3.3, featured: true },
  { idx: 76, name: 'El Castro de Valtuille MencÃÂ­a Joven D.O. Bierzo 75 cl.', price: 8.50, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/valtm20_anv800_1649944743.png', type: 'tinto', bodega: 'castro-ventosa', region: 'bierzo', grapes: ['mencia'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6 },
  // === Vinissimus Blancos ===
  { idx: 77, name: 'Ultreia Godello D.O. Bierzo 75 cl.', price: 14.25, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/ulgod20_anv800_1649944655.png', type: 'blanco', bodega: 'raul-perez', region: 'bierzo', grapes: ['godello'], vintage: 2023, volume: 750, alcohol: 13.5, acidity: 3.6, featured: true },
  { idx: 78, name: 'JosÃÂ© Pariente Verdejo D.O. Rueda 75 cl.', price: 10.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/jpave20_anv800_1637081766.png', type: 'blanco', bodega: 'jose-pariente', region: 'rueda', grapes: ['verdejo'], vintage: 2024, volume: 750, alcohol: 13.0, acidity: 3.7 },
  { idx: 79, name: 'Louro Godello D.O. Valdeorras 75 cl.', price: 20.50, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/loubl21_anv800_1657199953.png', type: 'blanco', bodega: 'rafael-palacios', region: 'valdeorras', grapes: ['godello'], vintage: 2024, volume: 750, alcohol: 14.0, acidity: 3.5, featured: true },
  { idx: 80, name: 'Terras Gauda D.O. RÃÂ­as Baixas 75 cl.', price: 15.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/tgau20_anv800_1637082174.png', type: 'blanco', bodega: 'terras-gauda', region: 'rias-baixas', grapes: ['albarino'], vintage: 2024, volume: 750, alcohol: 12.5, acidity: 3.8 },
  { idx: 81, name: 'Enate Chardonnay 234 D.O. Somontano 75 cl.', price: 10.50, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/e13c221_anv800_1659948933.png', type: 'blanco', bodega: 'enate', region: 'somontano', grapes: ['chardonnay'], vintage: 2025, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 82, name: 'Luna Beberide Godello D.O. Bierzo 75 cl.', price: 9.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/lbgod24_anv800_1753080291.png', type: 'blanco', bodega: 'luna-beberide', region: 'bierzo', grapes: ['godello'], vintage: 2024, volume: 750, alcohol: 13.0, acidity: 3.7 },
  // === Vinissimus Rosados ===
  { idx: 83, name: 'Naranjas Azules Rosado D.O. Cebreros 75 cl.', price: 7.80, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/amnaz20_anv800_1637237254.png', type: 'rosado', bodega: 'soto-manrique', region: 'cebreros', grapes: ['garnacha'], vintage: 2024, volume: 750, alcohol: 13.0, acidity: 3.7 },
  { idx: 84, name: 'Izadi Larrosa RosÃÂ© D.O.Ca. Rioja 75 cl.', price: 8.80, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/larro24_anv800_1742559226.png', type: 'rosado', bodega: 'izadi', region: 'rioja', grapes: ['garnacha'], vintage: 2024, volume: 750, alcohol: 14.0, acidity: 3.6, featured: true },
  { idx: 85, name: 'Chivite Las Fincas Rosado D.O. 3 Riberas 75 cl.', price: 12.90, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/chfro22_anv800_1688508173.png', type: 'rosado', bodega: 'chivite', region: '3-riberas', grapes: ['garnacha'], vintage: 2024, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 86, name: 'La Huella de Aitana Rosado D.O. Navarra 75 cl.', price: 10.50, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/gchai20_anv800_1637081843.png', type: 'rosado', bodega: 'gonzalo-celayeta', region: 'navarre', grapes: ['garnacha'], vintage: 2024, volume: 750, alcohol: 13.5, acidity: 3.6 },
  { idx: 87, name: 'RamÃÂ³n Bilbao Rosado D.O.Ca. Rioja 75 cl.', price: 6.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/rbiro24_anv800_1759393833.png', type: 'rosado', bodega: 'ramon-bilbao', region: 'rioja', grapes: ['garnacha'], vintage: 2024, volume: 750, alcohol: 13.0, acidity: 3.7 },
  { idx: 88, name: 'Gran Caus Rosado D.O. PenedÃÂ¨s 75 cl.', price: 16.95, image: 'https://cdn.vinissimus.com/prfmtgrande/vi/gcaro07_anv800_1768473050.png', type: 'rosado', bodega: 'can-rafols', region: 'penedes', grapes: ['garnacha'], vintage: 2024, volume: 750, alcohol: 13.5, acidity: 3.5, featured: true },
];

export function buildProducts() {
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

export const CARREFOUR_PRODUCTS = buildProducts();

export function getProductBySlug(slug: string): Product | undefined {
  return CARREFOUR_PRODUCTS.find(product => product.slug === slug);
}

interface ExtendedProductDetail extends Product {
  description: string;
  sensoryProfile: {
    color: string;
    aroma: string;
    palate: string;
  };
  tastingNotes: string[];
  servingTemperature: {
    min: number;
    max: number;
  };
  pairings: string[];
  winemaking: {
    aging: string;
    barrelType?: string;
    productionMethod: string;
  };
  vineyard: {
    terroir: string;
    climate: string;
    soilType: string;
  };
  format: {
    bottle: string;
    closure: string;
  };
}

export function getProductDetailData(slug: string): ExtendedProductDetail | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;

  const isRed = product.wineType === 'tinto';
  const isWhite = product.wineType === 'blanco';
  const _isRose = product.wineType === 'rosado';

  // Generate description based on wine characteristics
  const bodegaName = product.bodega?.name || 'Spanish Bodega';
  const regionName = product.region?.name || 'Spanish Wine Region';
  const vintage = product.vintage || new Date().getFullYear();

  const description = `${product.name}. A ${
    isRed ? 'full-bodied red wine' : isWhite ? 'crisp white wine' : _isRose ? 'refreshing rosÃÂ© wine' : 'distinctive wine'
  } from ${bodegaName} in the renowned ${regionName} region. Vintage ${vintage}. With ${product.alcohol}% alcohol and acidity of ${product.acidity}, this wine offers excellent balance and character. Volume: ${product.volume}ml.`;

  // Sensory profile based on wine type
  const sensoryProfile = isRed
    ? {
        color: 'Deep ruby with garnet hues',
        aroma: 'Rich notes of dark fruits, leather, and spice',
        palate: 'Full-bodied with structured tannins and lingering finish'
      }
    : isWhite
    ? {
        color: 'Pale straw yellow with golden reflections',
        aroma: 'Fresh citrus, green apple, and mineral notes',
        palate: 'Crisp and refreshing with vibrant acidity'
      }
    : {
        color: 'Delicate salmon pink',
        aroma: 'Fruity with strawberry and citrus notes',
        palate: 'Light and refreshing with subtle sweetness'
      };

  // Tasting notes based on wine type and region
  const tastingNotes = isRed
    ? ['Dark cherry', 'Plum', 'Leather', 'Vanilla', 'Spice']
    : isWhite
    ? ['Citrus', 'Green apple', 'Mineral', 'Floral', 'Stone fruit']
    : ['Strawberry', 'Watermelon', 'Citrus', 'Floral', 'Subtle sweetness'];

  // Serving temperature based on wine type
  const servingTemperature = isRed
    ? { min: 16, max: 18 }
    : isWhite
    ? { min: 8, max: 12 }
    : { min: 10, max: 13 };

  // Food pairings based on wine type
  const pairings = isRed
    ? [
        'Grilled beef and lamb',
        'Game meats and venison',
        'Cured meats and charcuterie',
        'Aged cheese',
        'Hearty stews and casseroles'
      ]
    : isWhite
    ? [
        'Fresh seafood and shellfish',
        'Grilled fish',
        'Chicken and light poultry',
        'Vegetable dishes',
        'Soft cheese and goat cheese'
      ]
    : [
        'Salmon and lighter fish',
        'Shellfish',
        'Pasta with light sauces',
        'Summer salads',
        'Tapas and cured meats'
      ];

  // Winemaking information based on wine characteristics
  const winemaking = product.vintage >= 2021
    ? {
        aging: 'Aged in oak for 12-18 months (if crianza/reserva)',
        barrelType: 'American oak',
        productionMethod: 'Traditional fermentation'
      }
    : {
        aging: 'Aged in oak for 18-24+ months (premium aging)',
        barrelType: 'French and American oak',
        productionMethod: 'Traditional fermentation with extended aging'
      };

  // Vineyard info based on region
  const regionData: { [key: string]: { terroir: string; climate: string; soilType: string } } = {
    'ribera-duero': {
      terroir: 'Continental plateau with altitude variation',
      climate: 'Continental with extreme temperature variations',
      soilType: 'Rocky, clay-limestone soils'
    },
    'rioja': {
      terroir: 'Mix of alluvial plains and hillsides',
      climate: 'Atlantic influence with continental elements',
      soilType: 'Alluvial, calcareous, and clayey soils'
    },
    'rueda': {
      terroir: 'Flat terrain at moderate altitude',
      climate: 'Continental with cold winters',
      soilType: 'Limestone and sandy soils'
    },
    'rias-baixas': {
      terroir: 'Coastal region with river valleys',
      climate: 'Atlantic maritime climate',
      soilType: 'Granite-based with acidic characteristics'
    },
    'penedes': {
      terroir: 'Mountainous region with diverse elevations',
      climate: 'Mediterranean with Atlantic influence',
      soilType: 'Limestone, clay, and alluvial soils'
    },
    'toro': {
      terroir: 'High plateau in continental zone',
      climate: 'Harsh continental climate',
      soilType: 'Rocky and limestone-rich soils'
    },
    'navarre': {
      terroir: 'Pyrenean foothills and plains',
      climate: 'Transitional between Atlantic and Continental',
      soilType: 'Diverse soils with limestone'
    },
    'valdepenias': {
      terroir: 'Rolling hills and plains',
      climate: 'Hot continental climate',
      soilType: 'Sandy and alluvial soils'
    }
  };

  const regionKey = wineData.find(w => w.idx === parseInt(product.id.split('-')[1]))?.region || 'rioja';
  const vineyard = regionData[regionKey] || regionData['rioja'];

  // Format information
  const format = {
    bottle: `${product.volume}ml standard bottle`,
    closure: 'Cork'
  };

  return {
    ...product,
    description,
    sensoryProfile,
    tastingNotes,
    servingTemperature,
    pairings,
    winemaking,
    vineyard,
    format
  } as ExtendedProductDetail;
}
