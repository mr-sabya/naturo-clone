// lib/settings.ts

// ── Types ──────────────────────────────────────────────────────────────────────

/**
 * T lets consumers extend the known fields with their own keys while still
 * getting proper autocomplete. The index signature keeps arbitrary runtime keys
 * (from normalize) assignable without casts.
 *
 * Usage:
 *   type MySettings = AppearanceSettings<{ brand_font?: string }>;
 *   // → s.brand_font is string | undefined (not "any key")
 */
export type AppearanceSettings<
    T extends Record<string, string | undefined> = Record<never, never>
> = {
    primary_color?: string;
    primary_dark_color?: string;
    primary_light_color?: string;
    secondary_color?: string;
    accent_color?: string;
    header_bg_color?: string;
    header_text_color?: string;
    menu_bg_color?: string;
    menu_text_color?: string;
    footer_bg_color?: string;
    footer_text_color?: string;
    body_text_color?: string;
    background_color?: string;
    site_name?: string;
    logo_url?: string;
    logo_text?: string;
    favicon_url?: string;
    [key: string]: string | undefined;
} & T;

export interface SettingsClientConfig<
    T extends Record<string, string | undefined> = Record<never, never>
> {
    /** Base URL of the API, e.g. "https://api.example.com". No trailing slash. */
    apiUrl: string;
    /** Defaults to "/settings?group=appearance". */
    endpoint?: string;
    /** Merged on top of `{ Accept: "application/json" }`. */
    headers?: Record<string, string>;
    /** Merged on top of (overrides) the default CSS_VAR_MAP. */
    cssVarMap?: Record<string, string>;
    /** Replace the built-in normalizer entirely. */
    normalize?: (json: unknown) => AppearanceSettings<T>;
    /**
     * Passed directly to fetch(). Use this for framework-specific extensions:
     *   Next.js:  fetchOptions: { next: { revalidate: 300 } }
     *   Node:     fetchOptions: { signal: AbortSignal.timeout(5000) }
     * Note: headers inside fetchOptions are merged last, after config.headers.
     */
    fetchOptions?: RequestInit;
}

// ── Defaults (exported so callers can spread/extend them) ─────────────────────

export const CSS_VAR_MAP: Record<string, string> = {
    primary_color: "--brand-primary",
    primary_dark_color: "--brand-primary-dark",
    primary_light_color: "--brand-primary-light",
    secondary_color: "--brand-secondary",
    accent_color: "--brand-accent",
    header_bg_color: "--ui-header-bg",
    header_text_color: "--ui-header-text",
    menu_bg_color: "--ui-menu-bg",
    menu_text_color: "--ui-menu-text",
    footer_bg_color: "--ui-footer-bg",
    footer_text_color: "--ui-footer-text",
    body_text_color: "--ui-body-text",
    background_color: "--ui-background",
};

/** Default normalizer. Handles three API shapes:
 *  1. Array of `{ key, value }` rows
 *  2. Nested object  `{ appearance: { primary_color: "#fff", … } }`
 *  3. Flat object    `{ primary_color: "#fff", … }`
 *  Wrapped in `{ data: … }` is unwrapped first.
 */
export function normalize(json: unknown): AppearanceSettings {
    const out: AppearanceSettings = {};
    if (!json) return out;

    const payload = (json as { data?: unknown }).data ?? json;

    if (Array.isArray(payload)) {
        for (const row of payload) {
            if (row && typeof row === "object" && "key" in row) {
                out[(row as { key: string }).key] = (row as { value?: string }).value;
            }
        }
        return out;
    }

    if (payload && typeof payload === "object") {
        // Merge any nested object values first (lower priority)
        for (const v of Object.values(payload as Record<string, unknown>)) {
            if (v && typeof v === "object" && !Array.isArray(v)) {
                Object.assign(out, v as Record<string, string>);
            }
        }
        // Then merge top-level string values (higher priority)
        for (const [k, v] of Object.entries(payload as Record<string, unknown>)) {
            if (typeof v === "string") out[k] = v;
        }
    }

    return out;
}

// ── Standalone buildThemeCss ───────────────────────────────────────────────────

/**
 * Converts an AppearanceSettings object into a `:root { … }` CSS string.
 * Pass a custom `cssVarMap` to override or extend the default mapping.
 *
 * Returns an empty string when no known keys are present (safe to inject as-is).
 */
export function buildThemeCss(
    settings: AppearanceSettings,
    cssVarMap: Record<string, string> = CSS_VAR_MAP
): string {
    const decls: string[] = [];
    for (const [key, cssVar] of Object.entries(cssVarMap)) {
        const val = settings[key];
        if (val) decls.push(`${cssVar}:${val};`);
    }
    return decls.length === 0 ? "" : `:root{${decls.join("")}}`;
}

// ── Factory ────────────────────────────────────────────────────────────────────

/**
 * Creates a settings client bound to a specific API endpoint and tenant config.
 *
 * Returns `{ fetchSettings }` only — `buildThemeCss` is a pure function with no
 * dependency on the HTTP config, so it lives as a standalone export. If you need
 * a pre-bound version: `(s) => buildThemeCss(s, myMap)`.
 *
 * @example — Next.js
 *   const { fetchSettings } = createSettingsClient({
 *     apiUrl: process.env.NEXT_PUBLIC_API_URL!,
 *     headers: { "X-Tenant-ID": process.env.NEXT_PUBLIC_TENANT_ID! },
 *     fetchOptions: { next: { revalidate: 300 } },
 *   });
 *
 * @example — Vite / CRA
 *   const { fetchSettings } = createSettingsClient({
 *     apiUrl: import.meta.env.VITE_API_URL,
 *     headers: { "X-Tenant-ID": import.meta.env.VITE_TENANT_ID },
 *   });
 *
 * @example — Extend AppearanceSettings with custom keys
 *   const { fetchSettings } = createSettingsClient<{ brand_font?: string }>({
 *     apiUrl: "https://api.example.com",
 *   });
 *   const settings = await fetchSettings(); // settings.brand_font is string | undefined
 */
export function createSettingsClient<
    T extends Record<string, string | undefined> = Record<never, never>
>(config: SettingsClientConfig<T>): {
    fetchSettings: () => Promise<AppearanceSettings<T>>;
    cssVarMap: Record<string, string>;
} {
    const {
        apiUrl,
        endpoint = "/settings?group=appearance",
        headers: configHeaders = {},
        cssVarMap: customCssVarMap,
        normalize: customNormalize,
        fetchOptions = {},
    } = config;

    // Merge custom map on top of defaults so callers can override individual vars
    const mergedCssVarMap: Record<string, string> = customCssVarMap
        ? { ...CSS_VAR_MAP, ...customCssVarMap }
        : CSS_VAR_MAP;

    const mergedNormalize = (customNormalize ?? normalize) as (
        json: unknown
    ) => AppearanceSettings<T>;

    async function fetchSettings(): Promise<AppearanceSettings<T>> {
        try {
            const { headers: fetchOptHeaders, ...restFetchOptions } = fetchOptions;
            const res = await fetch(`${apiUrl}${endpoint}`, {
                ...restFetchOptions,
                headers: {
                    Accept: "application/json",
                    ...configHeaders,
                    ...(fetchOptHeaders as Record<string, string> | undefined),
                },
            });
            if (!res.ok) return {} as AppearanceSettings<T>;
            return mergedNormalize(await res.json());
        } catch (err) {
            console.error("[settings] fetchSettings failed:", err);
            return {} as AppearanceSettings<T>;
        }
    }

    // cssVarMap is exposed so callers can pass it straight to buildThemeCss(settings, cssVarMap)
    // without having to re-merge { ...CSS_VAR_MAP, ...myOverrides } themselves.
    return { fetchSettings, cssVarMap: mergedCssVarMap };
}
