"use client";

// Admin-managed delivery-area/charge choices (Admin > Website > Delivery
// Options), shared by both checkout forms — the landing-page checkout
// (components/landing/CheckoutSection.tsx) and the multi-step cart checkout
// (checkout/page.tsx) — so neither one hard-codes its own area/price list.

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { DeliveryOption } from "@/types";

export function useDeliveryOptions() {
    const [options, setOptions] = useState<DeliveryOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        api
            .get<{ data: DeliveryOption[] }>("/delivery-options")
            .then((res) => {
                if (!cancelled) setOptions(res.data ?? []);
            })
            .catch(() => {
                if (!cancelled) setOptions([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { options, loading };
}
