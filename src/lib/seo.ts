// Fetches the tenant's SEO config (GET /settings?group=seo) — set from the
// em-group admin panel's Settings screen (group: seo). Kept as its own
// fetch/group, separate from lib/settings.ts's `appearance` group, since SEO
// is a distinct admin concern with its own fields, not part of the visual
// theme.

export interface SeoSettings {
    metaTitle: string | null;
    metaKeywords: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    canonicalUrl: string | null;
    robots: string | null;
    googleSiteVerification: string | null;
}

export async function getSeoSettings(): Promise<SeoSettings> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

    const empty: SeoSettings = {
        metaTitle: null,
        metaKeywords: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        canonicalUrl: null,
        robots: null,
        googleSiteVerification: null,
    };

    try {
        // Matches lib/settings.ts's getSettings() caching (5 min ISR) rather
        // than a raw no-store fetch — this runs in the root layout on every
        // route, so no-store would force the entire site into fully dynamic
        // rendering instead of just this one setting refetching periodically.
        const res = await fetch(`${apiUrl}/settings?group=seo`, {
            headers: { Accept: "application/json", "X-Tenant-Id": tenantId || "" },
            next: { revalidate: 300 },
        });
        if (!res.ok) return empty;

        const json = await res.json();
        const data = (json?.data ?? {}) as Record<string, unknown>;
        const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : null);

        return {
            metaTitle: str(data.seo_meta_title),
            metaKeywords: str(data.seo_meta_keywords),
            ogTitle: str(data.seo_og_title),
            ogDescription: str(data.seo_og_description),
            ogImage: str(data.seo_og_image),
            canonicalUrl: str(data.seo_canonical_url),
            robots: str(data.seo_robots),
            googleSiteVerification: str(data.seo_google_site_verification),
        };
    } catch (err) {
        console.error("getSeoSettings error:", err);
        return empty;
    }
}
