import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { trackAddToCart, trackRemoveFromCart } from "@/lib/gtm";

interface CartState {
    items: CartItem[];
    count: number;
    subtotal: number;
    // True once the persisted localStorage cart has been rehydrated on the client.
    // Hydration is skipped on store creation (see `skipHydration` below) and driven
    // manually by <CartHydrator /> in layout.tsx, so the server-rendered HTML and the
    // client's first render both start from the same empty state — consumers that
    // render cart-count-dependent UI (e.g. Header's badge) should gate on this to
    // avoid a hydration mismatch.
    hasHydrated: boolean;
    setHasHydrated: (v: boolean) => void;
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
            hasHydrated: false,
            setHasHydrated: (v) => set({ hasHydrated: v }),

            addItem: (newItem) => {
                trackAddToCart(newItem);
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
                    const removed = state.items.find(
                        (i) => itemKey(i.product_id, i.variant_id) === itemKey(id, variantId)
                    );
                    if (removed) trackRemoveFromCart(removed);
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
                const existing = get().items.find(
                    (i) => itemKey(i.product_id, i.variant_id) === itemKey(id, variantId)
                );
                if (existing && quantity !== existing.quantity) {
                    const delta = quantity - existing.quantity;
                    if (delta > 0) trackAddToCart({ ...existing });
                    else trackRemoveFromCart({ ...existing, quantity: -delta });
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
        {
            name: "naturo-cart",
            // Don't auto-rehydrate on store creation (that happens before React's first
            // client render and is what causes the SSR/client mismatch) — <CartHydrator />
            // triggers it explicitly from a useEffect instead.
            skipHydration: true,
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
