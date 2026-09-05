// lib/settings.ts
// Fetches tenant appearance/theme settings from the em-group Laravel API
// (GET /settings?group=appearance) and turns them into runtime CSS-variable
// overrides + a typed settings object. Mirrors govaly-clone's app/lib/settings.ts.

export interface AppearanceSettings {
    // Brand
    primary_color?: string;
    primary_dark_color?: string;
    primary_light_color?: string;
    secondary_color?: string;
    accent_color?: string;
    // UI surfaces
    header_bg_color?: string;
    header_text_color?: string;
    menu_bg_color?: string;
    menu_text_color?: string;
    footer_bg_color?: string;
    footer_text_color?: string;
    body_text_color?: string;
    background_color?: string;
    // Branding
    site_name?: string;
    site_tagline?: string;
    meta_description?: string;
    logo_url?: string;
    logo_text?: string;
    favicon_url?: string;
    // Footer content
    footer_description?: string;
    footer_phone?: string;
    footer_email?: string;
    footer_address?: string;
    whatsapp_number?: string;
    social_facebook_url?: string;
    social_instagram_url?: string;
    social_youtube_url?: string;
    copyright_text?: string;
    [key: string]: string | undefined;
}

// Maps a settings key -> the CSS source variable it overrides in globals.css
const CSS_VAR_MAP: Record<string, string> = {
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

/**
 * Normalizes the API payload into a flat key/value map. The backend
 * (SettingController::index) always returns { success, data: { key: value, ... } },
 * but this also tolerates a grouped or list shape in case that ever changes.
 */
function normalize(json: unknown): AppearanceSettings {
    const out: AppearanceSettings = {};
    if (!json) return out;

    const payload = (json as { data?: unknown }).data ?? json;

    if (Array.isArray(payload)) {
        for (const row of payload) {
            if (row && typeof row === "object" && "key" in row) {
                out[(row as { key: string }).key] = (row as { value?: string }).value;
            }
        }
    } else if (payload && typeof payload === "object") {
        // Grouped (e.g. { theme: {...}, branding: {...} }) or already flat
        for (const v of Object.values(payload as Record<string, unknown>)) {
            if (v && typeof v === "object" && !Array.isArray(v)) {
                Object.assign(out, v as Record<string, string>);
            }
        }
        // Also copy any top-level scalar keys (flat case — this is what the API actually returns)
        for (const [k, v] of Object.entries(payload as Record<string, unknown>)) {
            if (typeof v === "string") out[k] = v;
        }
    }
    return out;
}

/** Server-side fetch of public appearance settings for the active tenant. */
export async function getSettings(): Promise<AppearanceSettings> {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

    try {
        const res = await fetch(`${apiUrl}/settings?group=appearance`, {
            headers: { Accept: "application/json", "X-Tenant-Id": tenantId || "" },
            next: { revalidate: 300 },
        });
        if (!res.ok) return {};
        return normalize(await res.json());
    } catch (err) {
        console.error("getSettings error:", err);
        return {};
    }
}

/**
 * Builds the inner CSS for a `<style>` tag that overrides the brand/ui source
 * variables on :root. Only emits variables that are actually set, so unset
 * values fall back to the defaults in globals.css / tailwind.config.js.
 */
export function buildThemeCss(settings: AppearanceSettings): string {
    const decls: string[] = [];
    for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
        const val = settings[key];
        if (val) decls.push(`${cssVar}:${val};`);
    }
    if (decls.length === 0) return "";
    return `:root{${decls.join("")}}`;
}
