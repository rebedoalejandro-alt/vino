'use client';

import type { Order } from './admin-data';

const ORDERS_STORAGE_KEY = 'casadelvino_orders';

export interface NewOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  items: {
    productName: string;
    productImage?: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000);
  return `CDV-${year}-${String(random).padStart(5, '0')}`;
}

function generateId(): string {
  return 'order-real-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

export function saveOrder(data: NewOrderData): Order {
  const order: Order = {
    id: generateId(),
    orderNumber: generateOrderNumber(),
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    status: 'pendiente',
    date: new Date().toISOString().split('T')[0],
    total: Math.round(data.total * 100) / 100,
    items: data.items.map((item, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      total: Math.round(item.price * item.quantity * 100) / 100,
    })),
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
  };

  const existing = getStoredOrders();
  existing.unshift(order);

  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existing));
  }

  return order;
}

export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function updateOrderStatus(orderId: string, status: Order['status']): void {
  const orders = getStoredOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
}

export function deleteStoredOrder(orderId: string): void {
  const orders = getStoredOrders();
  const filtered = orders.filter(o => o.id !== orderId);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filtered));
}
