"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, WishlistItem } from "@/types";

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  getItemCount: () => number;
  isInWishlist: (productId: string) => boolean;
  getItem: (productId: string) => WishlistItem | undefined;
  toggleWishlist: (product: Product) => void;
  getItems: () => WishlistItem[];
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some((item) => item.productId === product.id);

          if (exists) {
            return state;
          }

          return {
            items: [
              ...state.items,
              {
                id: `${product.id}-${Date.now()}`,
                productId: product.id,
                product,
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

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        const state = get();
        return state.items.length;
      },

      isInWishlist: (productId: string) => {
        const state = get();
        return state.items.some((item) => item.productId === productId);
      },

      getItem: (productId: string) => {
        const state = get();
        return state.items.find((item) => item.productId === productId);
      },

      toggleWishlist: (product: Product) => {
        const state = get();
        const exists = state.isInWishlist(product.id);

        if (exists) {
          state.removeItem(product.id);
        } else {
          state.addItem(product);
        }
      },

      getItems: () => {
        const state = get();
        return state.items;
      },
    }),
    {
      name: "wishlist-storage",
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
 * Hook to check if a product is in wishlist
 */
export const useIsInWishlist = (productId: string): boolean => {
  return useWishlist((state) => state.isInWishlist(productId));
};

/**
 * Hook to get wishlist item count
 */
export const useWishlistCount = (): number => {
  return useWishlist((state) => state.getItemCount());
};

/**
 * Hook to toggle wishlist for a product
 */
export const useToggleWishlist = () => {
  return useWishlist((state) => state.toggleWishlist);
};

/**
 * Hook to get all wishlist items
 */
export const useWishlistItems = () => {
  return useWishlist((state) => state.items);
};

/**
 * Hook to get wishlist products (just the products)
 */
export const useWishlistProducts = () => {
  const items = useWishlist((state) => state.items);
  return items.map((item) => item.product);
};
