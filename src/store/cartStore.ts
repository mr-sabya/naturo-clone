import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
    items: CartItem[];
    count: number;
    subtotal: number;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: number, variantId?: number) => void;
    updateQuantity: (id: number, quantity: number, variantId?: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

const itemKey = (id: number, variantId?: number) =>
    variantId ? `${id}-${variantId}` : `${id}`;

function derive(items: CartItem[]) {
    return {
        count: items.reduce((sum, i) => sum + i.quantity, 0),
        subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    };
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            count: 0,
            subtotal: 0,

            addItem: (newItem) => {
                set((state) => {
                    const key = itemKey(newItem.product_id, newItem.variant_id);
                    const exists = state.items.find(
                        (i) => itemKey(i.product_id, i.variant_id) === key
                    );
                    const newItems = exists
                        ? state.items.map((i) =>
                              itemKey(i.product_id, i.variant_id) === key
                                  ? { ...i, quantity: i.quantity + 1 }
                                  : i
                          )
                        : [...state.items, { ...newItem, quantity: 1 }];
                    return { items: newItems, ...derive(newItems) };
                });
            },

            removeItem: (id, variantId) => {
                set((state) => {
                    const newItems = state.items.filter(
                        (i) => itemKey(i.product_id, i.variant_id) !== itemKey(id, variantId)
                    );
                    return { items: newItems, ...derive(newItems) };
                });
            },

            updateQuantity: (id, quantity, variantId) => {
                if (quantity < 1) {
                    get().removeItem(id, variantId);
                    return;
                }
                set((state) => {
                    const newItems = state.items.map((i) =>
                        itemKey(i.product_id, i.variant_id) === itemKey(id, variantId)
                            ? { ...i, quantity }
                            : i
                    );
                    return { items: newItems, ...derive(newItems) };
                });
            },

            clearCart: () => set({ items: [], count: 0, subtotal: 0 }),

            totalItems: () => get().count,
            totalPrice: () => get().subtotal,
        }),
        { name: "naturo-cart" }
    )
);
