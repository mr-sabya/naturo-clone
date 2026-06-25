import { create } from "zustand";

const STORAGE_KEY = "naturo-checkout";

export interface DeliveryInfo {
    name: string;
    phone: string;
    address: string;
    note: string;
    divisionId: number | null;
    divisionName: string;
    districtId: number | null;
    districtName: string;
    cityId: number | null;
    cityName: string;
    deliveryCharge: number;
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
    address: "",
    note: "",
    divisionId: null,
    divisionName: "",
    districtId: null,
    districtName: "",
    cityId: null,
    cityName: "",
    deliveryCharge: 0,
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
                    address: s.address,
                    note: s.note,
                    divisionId: s.divisionId,
                    divisionName: s.divisionName,
                    districtId: s.districtId,
                    districtName: s.districtName,
                    cityId: s.cityId,
                    cityName: s.cityName,
                    deliveryCharge: s.deliveryCharge,
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
