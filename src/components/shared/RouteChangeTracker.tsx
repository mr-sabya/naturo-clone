"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

/**
 * Next.js App Router navigations are client-side (no full page load), so
 * GTM's own History Change trigger can miss them. Pushing `page_view`
 * ourselves on every route change is the standard, reliable pattern for
 * GTM/GA4 inside an App Router app.
 */
export default function RouteChangeTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.toString();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "page_view",
            page_path: query ? `${pathname}?${query}` : pathname,
        });
    }, [pathname, searchParams]);

    return null;
}
