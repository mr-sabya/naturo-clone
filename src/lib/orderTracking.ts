// Reports in-progress (not-yet-submitted) checkouts to the Laravel API as
// "abandoned order" leads, via POST /orders/capture-lead. The backend dedupes
// by tenant+phone within a 6h window and auto-converts the lead into a real
// order once the customer completes checkout with the same phone number, so
// this is safe to call repeatedly (and safe to fire-and-forget).

import { useEffect, useRef } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const BD_PHONE = /^01[3-9]\d{8}$/;

export interface LeadPayload {
    phone: string;
    name?: string | null;
    address?: string | null;
    product_id?: number | string | null;
    variant_id?: number | string | null;
    quantity?: number | null;
}

export function captureLead(payload: LeadPayload) {
    if (!BD_PHONE.test(payload.phone)) return;
    fetch(`${API_BASE}/orders/capture-lead`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Tenant-Id": TENANT_ID,
        },
        body: JSON.stringify(payload),
    }).catch((e) => console.error("orderTracking.captureLead", e));
}

/**
 * Debounced abandoned-order tracking for a checkout form: fires captureLead
 * ~800ms after the customer stops typing a valid BD phone number, and only
 * once per distinct payload (so re-renders don't spam the endpoint).
 */
export function useLeadCapture(payload: LeadPayload, enabled = true) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastSent = useRef<string | null>(null);
    const key = JSON.stringify(payload);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);
        if (!enabled || !BD_PHONE.test(payload.phone)) return;

        timer.current = setTimeout(() => {
            if (key === lastSent.current) return;
            lastSent.current = key;
            captureLead(payload);
        }, 800);

        return () => { if (timer.current) clearTimeout(timer.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, enabled]);
}
