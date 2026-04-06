"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { getShippingCost } from "@/lib/utils";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
  getShippingCost: () => number;
  getTax: () => number;
  getTotalWithShipping: () => number;
  getBottleCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: `${product.id}-${Date.now()}`,
                productId: product.id,
                product,
                quantity,
                price: product.price,
                addedAt: new Date(),
              },
            ],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.productId !== productId),
            };
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity,
                  }
                : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },

      getBottleCount: () => {
        const state = get();
        return state.items.reduce((count, item) => {
          // Assumiendo que la mayoría de botellas son de 750ml
          // Podemos calcular botellas equivalentes
          const volume = item.product.volume || 750;
          const bottlesEquivalent = (item.quantity * volume) / 750;
          return count + bottlesEquivalent;
        }, 0);
      },

      getShippingCost: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const bottleCount = state.getBottleCount();
        return getShippingCost(subtotal, bottleCount);
      },

      getTax: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        // Spanish VAT is 21%
        return subtotal * 0.21;
      },

      getTotalWithShipping: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const shipping = state.getShippingCost();
        const tax = state.getTax();
        return subtotal + shipping + tax;
      },

      getTotal: () => {
        const state = get();
        return state.getTotalWithShipping();
      },
    }),
    {
      name: "cart-storage",
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          return persistedState;
        }
        return persistedState;
      },
    }
  )
);

/**
 * Hook to check if a product is in cart
 */
export const useIsInCart = (productId: string): boolean => {
  const items = useCart((state) => state.items);
  return items.some((item) => item.productId === productId);
};

/**
 * Hook to get cart item quantity
 */
export const useCartItemQuantity = (productId: string): number => {
  const items = useCart((state) => state.items);
  const item = items.find((item) => item.productId === productId);
  return item?.quantity || 0;
};

/**
 * Hook to get formatted cart totals
 */
export const useCartTotals = () => {
  const subtotal = useCart((state) => state.getSubtotal());
  const shipping = useCart((state) => state.getShippingCost());
  const tax = useCart((state) => state.getTax());
  const total = useCart((state) => state.getTotalWithShipping());

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
};
