import { create } from "zustand";

const STORAGE_KEY = "naturo-checkout";

export interface DeliveryInfo {
    name: string;
    phone: string;
    email: string;
    address: string;
    note: string;
    deliveryCharge: number;
    // The selected Delivery Option's own label (e.g. "Inside Dhaka City") —
    // used by payment/page.tsx to fill division_name/district_name/city_name
    // instead of guessing a location from the price, now that delivery
    // pricing is admin-managed and no longer a fixed 60/100/130 tier set.
    deliveryLabel: string;
}

interface CheckoutState extends DeliveryInfo {
    paymentMethod: "cod" | "online";
    setDelivery: (info: Partial<DeliveryInfo>) => void;
    setPaymentMethod: (method: "cod" | "online") => void;
    hydrate: () => void;
    saveToSession: () => void;
    clear: () => void;
}

const DEFAULTS: Omit<CheckoutState, "setDelivery" | "setPaymentMethod" | "hydrate" | "saveToSession" | "clear"> = {
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    deliveryCharge: 0,
    deliveryLabel: "",
    paymentMethod: "cod",
};

export const useCheckoutStore = create<CheckoutState>()((set, get) => ({
    ...DEFAULTS,

    setDelivery: (info) => set((state) => ({ ...state, ...info })),

    setPaymentMethod: (method) => set({ paymentMethod: method }),

    hydrate: () => {
        if (typeof window === "undefined") return;
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (raw) set({ ...DEFAULTS, ...JSON.parse(raw) });
        } catch {
            // corrupt sessionStorage — ignore
        }
    },

    saveToSession: () => {
        if (typeof window === "undefined") return;
        const s = get();
        try {
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    name: s.name,
                    phone: s.phone,
                    email: s.email,
                    address: s.address,
                    note: s.note,
                    deliveryCharge: s.deliveryCharge,
                    deliveryLabel: s.deliveryLabel,
                    paymentMethod: s.paymentMethod,
                })
            );
        } catch {
            // storage full or restricted — ignore
        }
    },

    clear: () => {
        set({ ...DEFAULTS });
        if (typeof window !== "undefined") {
            try {
                sessionStorage.removeItem(STORAGE_KEY);
            } catch {}
        }
    },
}));
