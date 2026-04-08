import { wineData, bodegas } from './carrefour-products';

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

const spanishFirstNames = ['Juan', 'MarÃ­a', 'Carlos', 'Ana', 'JosÃ©', 'Isabel', 'Miguel', 'Rosa', 'Antonio', 'Carmen', 'Francisco', 'Teresa', 'Manuel', 'Dolores', 'Pedro', 'Josefa', 'Diego', 'Luisa', 'Javier', 'MarÃ­a JosÃ©'];
const spanishLastNames = ['GarcÃ­a', 'RodrÃ­guez', 'MartÃ­nez', 'HernÃ¡ndez', 'LÃ³pez', 'GonzÃ¡lez', 'PÃ©rez', 'SÃ¡nchez', 'RamÃ­rez', 'Torres', 'Flores', 'Rivera', 'GÃ³mez', 'Diaz', 'Cruz', 'Morales', 'Gutierrez', 'Ortiz', 'Jimenez', 'Vargas'];
const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'MÃ¡laga', 'Alicante', 'CÃ³rdoba', 'Valladolid', 'Palma', 'Toledo', 'AlcalÃ¡', 'Murcia', 'CÃ¡diz', 'Vigo', 'GijÃ³n', 'La CoruÃ±a', 'Elche', 'Burgos'];
const wineProducts = wineData.map((w: { name: string }) => w.name);

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
      paymentMethod: getRandomItem(['Tarjeta de crÃ©dito', 'PayPal', 'Transferencia bancaria', 'Bizum']),
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
    productCount: wineData.filter((w: { type: string }) => w.type === 'tinto').length,
  },
  {
    id: 'cat-2',
    name: 'Blanco',
    description: 'Vinos blancos frescos y aromÃ¡ticos',
    slug: 'blanco',
    productCount: wineData.filter((w: { type: string }) => w.type === 'blanco').length,
  },
  {
    id: 'cat-3',
    name: 'Rosado',
    description: 'Vinos rosados y clarete',
    slug: 'rosado',
    productCount: wineData.filter((w: { type: string }) => w.type === 'rosado').length,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryMap: { [key: string]: string } = { tinto: 'Tinto', blanco: 'Blanco', rosado: 'Rosado' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockProducts: Product[] = wineData.map((w: any) => ({
  id: `car-${w.idx}`,
  name: w.name,
  sku: `CAR-${String(w.idx).padStart(3, '0')}`,
  category: categoryMap[w.type] || w.type,
  price: w.price,
  stock: w.featured ? 50 : Math.floor(Math.random() * 200) + 20,
  image: w.image,
  vintage: w.vintage,
  region: bodegas[w.bodega]?.region || '',
  bodega: bodegas[w.bodega]?.name || w.bodega,
}));
