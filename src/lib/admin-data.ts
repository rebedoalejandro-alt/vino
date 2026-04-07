export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  date: string;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  vintage?: number;
  region?: string;
  bodega?: string;
}

export interface WineCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  productCount: number;
}

const spanishFirstNames = ['Juan', 'María', 'Carlos', 'Ana', 'José', 'Isabel', 'Miguel', 'Rosa', 'Antonio', 'Carmen', 'Francisco', 'Teresa', 'Manuel', 'Dolores', 'Pedro', 'Josefa', 'Diego', 'Luisa', 'Javier', 'María José'];
const spanishLastNames = ['García', 'Rodríguez', 'Martínez', 'Hernández', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Diaz', 'Cruz', 'Morales', 'Gutierrez', 'Ortiz', 'Jimenez', 'Vargas'];
const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'Málaga', 'Alicante', 'Córdoba', 'Valladolid', 'Palma', 'Toledo', 'Alcalá', 'Murcia', 'Cádiz', 'Vigo', 'Gijón', 'La Coruña', 'Elche', 'Burgos'];
const wineProducts = [
  'Marqués de Riscal Reserva',
  'Protos Crianza',
  'Tres Reinos Tempranillo',
  'Cune Gran Reserva',
  'Beronia Crianza',
  'Marqués de Cáceres Roble',
  'Viña Pomal Reserva',
  'Ramón Bilbao Crianza',
  'Coto de Imaz Reserva',
  'Faustino Gran Reserva',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSpanishName(): string {
  return `${getRandomItem(spanishFirstNames)} ${getRandomItem(spanishLastNames)} ${getRandomItem(spanishLastNames)}`;
}

function generateEmail(name: string): string {
  const cleanName = name.toLowerCase().replace(/\s+/g, '.');
  const domains = ['gmail.com', 'outlook.com', 'yahoo.es', 'telefonica.net', 'hotmail.com', 'casadelvino.es'];
  return `${cleanName}@${getRandomItem(domains)}`;
}

function generateZipCode(): string {
  const code = Math.floor(Math.random() * 52000) + 1000;
  return code.toString();
}

function generatePhone(): string {
  const prefix = ['6', '7'];
  let phone = getRandomItem(prefix);
  for (let i = 0; i < 8; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000);
  return `PED${year}${String(random).padStart(5, '0')}`;
}

function getRandomDate(daysBack: number = 90): Date {
  const now = new Date();
  const randomMs = Math.random() * daysBack * 24 * 60 * 60 * 1000;
  return new Date(now.getTime() - randomMs);
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function generateMockOrders(): Order[] {
  const orders: Order[] = [];
  const statuses: OrderStatus[] = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];

  for (let i = 0; i < 50; i++) {
    const customerName = generateSpanishName();
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items: OrderItem[] = [];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const price = Math.floor(Math.random() * 8000) / 100 + 5;
      const quantity = Math.floor(Math.random() * 3) + 1;
      const itemTotal = price * quantity;
      items.push({
        id: `item-${i}-${j}`,
        productName: getRandomItem(wineProducts),
        quantity,
        price,
        total: itemTotal,
      });
      total += itemTotal;
    }

    const orderDate = getRandomDate();

    orders.push({
      id: `order-${i}`,
      orderNumber: generateOrderNumber(),
      customerName,
      customerEmail: generateEmail(customerName),
      status: getRandomItem(statuses),
      date: formatDate(orderDate),
      total: Math.round(total * 100) / 100,
      items,
      shippingAddress: `Calle Principal ${Math.floor(Math.random() * 500) + 1}, ${getRandomItem(cities)}`,
      paymentMethod: getRandomItem(['Tarjeta de crédito', 'PayPal', 'Transferencia bancaria', 'Bizum']),
    });
  }

  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateMockCustomers(): Customer[] {
  const customers: Customer[] = [];

  for (let i = 0; i < 40; i++) {
    const name = generateSpanishName();
    const joinDate = getRandomDate(365);
    const totalOrders = Math.floor(Math.random() * 12) + 1;
    const totalSpent = Math.round((Math.random() * 5000 + 500) * 100) / 100;

    customers.push({
      id: `customer-${i}`,
      name,
      email: generateEmail(name),
      phone: generatePhone(),
      address: `Calle ${['Mayor', 'Principal', 'Real', 'Nueva', 'Vieja'][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 500) + 1}`,
      city: getRandomItem(cities),
      zipCode: generateZipCode(),
      totalOrders,
      totalSpent,
      joinDate: formatDate(joinDate),
    });
  }

  return customers.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
}

export const wineCategories: WineCategory[] = [
  {
    id: 'cat-1',
    name: 'Tinto',
    description: 'Vinos tintos varietales y mezclas',
    slug: 'tinto',
    productCount: 85,
  },
  {
    id: 'cat-2',
    name: 'Blanco',
    description: 'Vinos blancos frescos y aromáticos',
    slug: 'blanco',
    productCount: 42,
  },
  {
    id: 'cat-3',
    name: 'Rosado',
    description: 'Vinos rosados y clarete',
    slug: 'rosado',
    productCount: 18,
  },
  {
    id: 'cat-4',
    name: 'Espumoso',
    description: 'Cavas y vinos espumosos',
    slug: 'espumoso',
    productCount: 24,
  },
  {
    id: 'cat-5',
    name: 'Fortified',
    description: 'Jerez, Oporto y vinos generosos',
    slug: 'fortified',
    productCount: 15,
  },
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Marqués de Riscal Reserva',
    sku: 'MR-RES-2019',
    category: 'Tinto',
    price: 14.99,
    stock: 125,
    image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000093_00_1.jpg',
    vintage: 2019,
    region: 'Rioja',
    bodega: 'Marqués de Riscal',
  },
  {
    id: 'prod-2',
    name: 'Protos Crianza',
    sku: 'PRO-CRI-2021',
    category: 'Tinto',
    price: 11.75,
    stock: 89,
    image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000197_00_1.jpg',
    vintage: 2021,
    region: 'Ribera del Duero',
    bodega: 'Protos',
  },
  {
    id: 'prod-3',
    name: 'Tres Reinos Tempranillo',
    sku: 'TR-TEMP-2021',
    category: 'Tinto',
    price: 7.85,
    stock: 234,
    image: 'https://static.carrefour.es/hd_510x_/img_pim_food/236233_00_1.jpg',
    vintage: 2021,
    region: 'Ribera del Duero',
    bodega: 'Tres Reinos',
  },
  {
    id: 'prod-4',
    name: 'Cune Gran Reserva',
    sku: 'CUN-GR-2019',
    category: 'Tinto',
    price: 8.69,
    stock: 156,
    image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000050_00_1.jpg',
    vintage: 2019,
    region: 'Rioja',
    bodega: 'Cune',
  },
  {
    id: 'prod-5',
    name: 'Martín Códax Blanco',
    sku: 'MC-BLANCO-2023',
    category: 'Blanco',
    price: 8.99,
    stock: 178,
    image: 'https://static.carrefour.es/hd_510x_/img_pim_food/000152_00_1.jpg',
    vintage: 2023,
    region: 'Rías Baixas',
    bodega: 'Martín Códax',
  },
];
