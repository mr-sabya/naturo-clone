"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

// Triggers the persisted-cart rehydration once on the client, after React's first
// render — see the comment on `skipHydration` in cartStore.ts for why this is manual.
export default function CartHydrator() {
    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    return null;
}
