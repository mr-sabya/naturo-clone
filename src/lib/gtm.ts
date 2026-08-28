// GA4 Enhanced Ecommerce events pushed to window.dataLayer for Google Tag
// Manager to pick up (a GA4 Configuration/Event tag inside the GTM container
// reads these — no gtag() calls here, GTM owns that). Every helper clears the
// previous `ecommerce` object first, which is GA4/GTM's documented pattern
// to stop old event's fields leaking into the next one via object merging.

import type { CartItem, Product } from "@/types";

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

const CURRENCY = "BDT";

function push(event: Record<string, unknown>) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
}

function pushEcommerce(eventName: string, ecommerce: Record<string, unknown>) {
    push({ ecommerce: null }); // clear the previous ecommerce object first
    push({ event: eventName, ecommerce });
}

interface GA4Item {
    item_id: string | number;
    item_name: string;
    price: number;
    quantity?: number;
    item_variant?: string;
}

function cartItemToGA4(item: CartItem): GA4Item {
    return {
        item_id: item.product_id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        ...(item.variant_name ? { item_variant: item.variant_name } : {}),
    };
}

export function trackViewItem(product: Product, price: number) {
    pushEcommerce("view_item", {
        currency: CURRENCY,
        value: price,
        items: [
            {
                item_id: product.id,
                item_name: product.name,
                price,
                ...(product.category_name ? { item_category: product.category_name } : {}),
            },
        ],
    });
}

/** Call right after useCartStore().addItem() — quantity is always +1 per call. */
export function trackAddToCart(item: Omit<CartItem, "quantity">) {
    pushEcommerce("add_to_cart", {
        currency: CURRENCY,
        value: item.price,
        items: [cartItemToGA4({ ...item, quantity: 1 })],
    });
}

export function trackRemoveFromCart(item: CartItem) {
    pushEcommerce("remove_from_cart", {
        currency: CURRENCY,
        value: item.price * item.quantity,
        items: [cartItemToGA4(item)],
    });
}

export function trackViewCart(items: CartItem[], value: number) {
    pushEcommerce("view_cart", {
        currency: CURRENCY,
        value,
        items: items.map(cartItemToGA4),
    });
}

export function trackBeginCheckout(items: CartItem[], value: number) {
    pushEcommerce("begin_checkout", {
        currency: CURRENCY,
        value,
        items: items.map(cartItemToGA4),
    });
}

export function trackPurchase(params: {
    transactionId: string;
    items: CartItem[];
    value: number;
    shipping?: number;
}) {
    pushEcommerce("purchase", {
        transaction_id: params.transactionId,
        currency: CURRENCY,
        value: params.value,
        ...(params.shipping ? { shipping: params.shipping } : {}),
        items: params.items.map(cartItemToGA4),
    });
}

export function trackSearch(searchTerm: string) {
    push({ event: "search", search_term: searchTerm });
}
