// Fetches the tenant's tracking-pixel config (GET /settings?group=pixels) —
// set from the em-group admin panel's Website > Pixels screen. Currently only
// Google Tag Manager is wired into the frontend (see GoogleTagManager.tsx);
// the tiktokPixelId/metaPixelId fields exist on the backend already but
// aren't consumed here yet.

export interface PixelSettings {
    googleGtmId: string | null;
    googleEnabled: boolean;
}

export async function getPixelSettings(): Promise<PixelSettings> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

    try {
        const res = await fetch(`${apiUrl}/settings?group=pixels`, {
            headers: { Accept: "application/json", "X-Tenant-Id": tenantId || "" },
            next: { revalidate: 60, tags: ["settings"] },
        });
        if (!res.ok) return { googleGtmId: null, googleEnabled: false };

        const json = await res.json();
        const data = (json?.data ?? {}) as Record<string, unknown>;

        return {
            googleGtmId: typeof data.pixel_google_gtm_id === "string" ? data.pixel_google_gtm_id : null,
            googleEnabled: data.pixel_google_enabled === true,
        };
    } catch (err) {
        console.error("getPixelSettings error:", err);
        return { googleGtmId: null, googleEnabled: false };
    }
}
